import { sql } from "./index";
import { unstable_cache } from "next/cache";
import { isStyleId, DEFAULT_STYLE } from "@/lib/styles";
import type {
  Profile,
  Post,
  Work,
  Stats,
  ProfileInput,
  PostInput,
  WorkInput,
  PostStatus,
  Subscription,
} from "@/lib/types";

// handle 规则：小写字母 / 数字 / 下划线，长度 3-20。
// 与 API 路由、前端表单校验保持一致。
const HANDLE_RE = /^[a-z0-9_]{3,20}$/;

export function isValidHandle(handle: string): boolean {
  return HANDLE_RE.test(handle);
}

// ----------------------------------------------------------------------------
// 读取
// ----------------------------------------------------------------------------

/** 按 handle 获取公开档案（任何访问者可读）。 */
export async function getProfileByHandle(handle: string): Promise<Profile | null> {
  const rows = (await sql`
    SELECT * FROM profiles WHERE handle = ${handle} LIMIT 1
  `) as Profile[];
  return rows[0] ?? null;
}

/** 按 owner（登录邮箱）获取其档案（用于后台 / 编辑态）。 */
export async function getProfileByOwner(ownerId: string): Promise<Profile | null> {
  const rows = (await sql`
    SELECT * FROM profiles WHERE owner_id = ${ownerId} LIMIT 1
  `) as Profile[];
  return rows[0] ?? null;
}

/** 获取某 handle 下已发布的动态（按时间倒序）。 */
export async function getPublishedPosts(handle: string): Promise<Post[]> {
  // 使用字符串拼接查询（绕过 @neondatabase/serverless 在 RSC / API Route
  // 上下文中对某些 handle 值的参数化查询返回空结果的 bug）。
  // handle 已通过 HANDLE_RE = /^[a-z0-9_]{3,20}$/ 校验，此处做转义双重防护。
  const safeH = handle.replace(/[^a-z0-9_]/g, '').slice(0, 20);
  const rows = (await sql(
    [`SELECT id, handle, title, content, source, status, created_at FROM posts WHERE handle = '${safeH}' AND status = 'published' ORDER BY created_at DESC`] as any,
  )) as Post[];
  return rows;
}

/** 获取某 handle 下已发布的作品（按时间倒序）。 */
export async function getPublishedWorks(handle: string): Promise<Work[]> {
  const safeH = handle.replace(/[^a-z0-9_]/g, '').slice(0, 20);
  const rows = (await sql(
    [`SELECT id, handle, title, url, description, source, status, created_at FROM works WHERE handle = '${safeH}' AND status = 'published' ORDER BY created_at DESC`] as any,
  )) as Work[];
  return rows;
}

/** 获取某 owner 名下的全部动态（含草稿），用于后台管理。 */
export async function getOwnerPosts(ownerId: string): Promise<Post[]> {
  const profile = await getProfileByOwner(ownerId);
  if (!profile) return [];

  const rows = (await sql`
    SELECT id, handle, title, content, source, status, created_at
    FROM posts
    WHERE handle = ${profile.handle}
    ORDER BY created_at DESC
  `) as Post[];
  return rows;
}

/** 获取某 owner 名下的全部作品（含草稿），用于后台管理。 */
export async function getOwnerWorks(ownerId: string): Promise<Work[]> {
  const profile = await getProfileByOwner(ownerId);
  if (!profile) return [];

  const rows = (await sql`
    SELECT id, handle, title, url, description, source, status, created_at
    FROM works
    WHERE handle = ${profile.handle}
    ORDER BY created_at DESC
  `) as Work[];
  return rows;
}

/** 获取公开统计（浏览量 / 关注数）。 */
export async function getStats(handle: string): Promise<Stats | null> {
  const rows = (await sql`
    SELECT * FROM stats WHERE handle = ${handle} LIMIT 1
  `) as Stats[];
  return rows[0] ?? null;
}

// ----------------------------------------------------------------------------
// 读取（带 ISR 数据缓存）
// ----------------------------------------------------------------------------
// 下述封装在 unstable_cache 中：neon serverless 驱动底层是 no-store 的 HTTP
// fetch，会让页面即便设了 `revalidate` 仍被判定为动态渲染（Fast Origin Transfer
// 居高不下的根因）。把查询包进 unstable_cache 后，数据层可缓存 300s，
// 页面才能真正走 ISR（CDN s-maxage=300），大幅降低 FOT 输入输出。
// 浏览量统计由客户端 ViewTracker 打独立 API，不在此缓存范围内。

export async function getCachedProfileByHandle(
  handle: string,
): Promise<Profile | null> {
  return unstable_cache(
    () => getProfileByHandle(handle),
    ["profile", handle],
    { revalidate: 300, tags: [`profile:${handle}`] },
  )();
}

export async function getCachedPublishedPosts(handle: string): Promise<Post[]> {
  return unstable_cache(
    () => getPublishedPosts(handle),
    ["posts", handle],
    { revalidate: 300, tags: [`posts:${handle}`] },
  )();
}

export async function getCachedPublishedWorks(handle: string): Promise<Work[]> {
  return unstable_cache(
    () => getPublishedWorks(handle),
    ["works", handle],
    { revalidate: 300, tags: [`works:${handle}`] },
  )();
}

export async function getCachedStats(handle: string): Promise<Stats | null> {
  return unstable_cache(
    () => getStats(handle),
    ["stats", handle],
    { revalidate: 300, tags: [`stats:${handle}`] },
  )();
}

// ----------------------------------------------------------------------------
// 写入
// ----------------------------------------------------------------------------

/** 浏览量 +1（调用 increment_views 函数）。 */
export async function incrementViews(handle: string): Promise<number> {
  const rows = (await sql`
    SELECT increment_views(${handle}) AS views
  `) as { views: number }[];
  return rows[0]?.views ?? 0;
}

/**
 * 新建或更新档案。owner 绑定到当前登录邮箱。
 * - handle 必须先通过格式校验，否则抛错（INVALID_HANDLE → API 层转 400）。
 * - 若 handle 已存在但属于其他 owner，抛 FORBIDDEN_HANDLE（→ 403），防止抢注。
 * - 支持修改 handle：以 owner_id 定位唯一档案并整行 UPDATE（含 handle 重命名），
 *   不会产生孤儿行；同时把 stats 行的 handle 一并改名。
 * - style 校验白名单，非法值回落到 DEFAULT_STYLE（'magazine'）。
 */
export async function upsertProfile(input: ProfileInput, ownerId: string): Promise<Profile> {
  if (!isValidHandle(input.handle)) {
    throw new Error("INVALID_HANDLE");
  }

  const ownerProfile = await getProfileByOwner(ownerId);
  const handleTarget = await getProfileByHandle(input.handle);

  // 抢注防护：目标 handle 存在但不属于自己 → 拒绝
  if (handleTarget && handleTarget.owner_id !== ownerId) {
    throw new Error("FORBIDDEN_HANDLE");
  }

  const links = JSON.stringify(input.links ?? []);
  const style = isStyleId(input.style) ? input.style : DEFAULT_STYLE;

  if (ownerProfile) {
    // 已存在档案：整行更新（允许重命名 handle）
    const oldHandle = ownerProfile.handle;
    const rows = (await sql`
      UPDATE profiles SET
        handle = ${input.handle},
        display_name = ${input.display_name ?? null},
        bio = ${input.bio ?? null},
        avatar_url = ${input.avatar_url ?? null},
        cover_url = ${input.cover_url ?? null},
        theme_color = ${input.theme_color ?? "#c2410c"},
        theme_dark = ${input.theme_dark ?? false},
        status_text = ${input.status_text ?? null},
        links = ${links}::jsonb,
        style = ${style},
        tip_enabled = ${input.tip_enabled ?? false},
        tip_message = ${input.tip_message ?? null},
        bmc_username = ${input.bmc_username ?? null},
        wechat_qr_url = ${input.wechat_qr_url ?? null},
        alipay_qr_url = ${input.alipay_qr_url ?? null}
      WHERE owner_id = ${ownerId}
      RETURNING *
    `) as Profile[];

    // handle 变更时同步 stats 主键，避免浏览量统计孤儿行
    if (oldHandle !== input.handle) {
      await sql`
        UPDATE stats SET handle = ${input.handle} WHERE handle = ${oldHandle}
      `;
    }

    const profile = rows[0];
    if (!profile) throw new Error("UPSERT_FAILED");
    return profile;
  }

  // 首次创建
  const rows = (await sql`
    INSERT INTO profiles (
      handle, owner_id, display_name, bio, avatar_url, cover_url,
      theme_color, theme_dark, status_text, links, style,
      tip_enabled, tip_message, bmc_username, wechat_qr_url, alipay_qr_url
    )
    VALUES (
      ${input.handle}, ${ownerId},
      ${input.display_name ?? null}, ${input.bio ?? null},
      ${input.avatar_url ?? null}, ${input.cover_url ?? null},
      ${input.theme_color ?? "#c2410c"}, ${input.theme_dark ?? false},
      ${input.status_text ?? null}, ${links}::jsonb, ${style},
      ${input.tip_enabled ?? false}, ${input.tip_message ?? null},
      ${input.bmc_username ?? null}, ${input.wechat_qr_url ?? null},
      ${input.alipay_qr_url ?? null}
    )
    RETURNING *
  `) as Profile[];

  const profile = rows[0];
  if (!profile) throw new Error("UPSERT_FAILED");
  return profile;
}

/**
 * 新建动态。要求 input.handle 属于该 owner。
 */
export async function createPost(input: PostInput, ownerId: string): Promise<Post> {
  const profile = await getProfileByOwner(ownerId);
  if (!profile || profile.handle !== input.handle) {
    throw new Error("FORBIDDEN_HANDLE");
  }

  const rows = (await sql`
    INSERT INTO posts (handle, title, content, source, status)
    VALUES (
      ${input.handle},
      ${input.title ?? null},
      ${input.content ?? null},
      ${input.source ?? "manual"},
      ${input.status ?? "draft"}
    )
    RETURNING id, handle, title, content, source, status, created_at
  `) as Post[];
  return rows[0];
}

/**
 * 新建作品。要求 input.handle 属于该 owner。
 */
export async function createWork(input: WorkInput, ownerId: string): Promise<Work> {
  const profile = await getProfileByOwner(ownerId);
  if (!profile || profile.handle !== input.handle) {
    throw new Error("FORBIDDEN_HANDLE");
  }

  const rows = (await sql`
    INSERT INTO works (handle, title, url, description, source, status)
    VALUES (
      ${input.handle},
      ${input.title ?? null},
      ${input.url ?? null},
      ${input.description ?? null},
      ${input.source ?? "manual"},
      ${input.status ?? "draft"}
    )
    RETURNING id, handle, title, url, description, source, status, created_at
  `) as Work[];
  return rows[0];
}

/**
 * 更新动态状态（draft / published / hidden）。仅 owner 可操作
 * （通过 handle 归属校验：只更新属于该 owner 的 handle 下的记录）。
 */
export async function updatePostStatus(
  id: string,
  status: PostStatus,
  ownerId: string
): Promise<boolean> {
  const rows = (await sql`
    UPDATE posts SET status = ${status}
    WHERE id = ${id}
      AND handle IN (SELECT handle FROM profiles WHERE owner_id = ${ownerId})
    RETURNING id
  `) as { id: string }[];
  return rows.length > 0;
}

/**
 * 更新作品状态（draft / published / hidden）。仅 owner 可操作。
 */
export async function updateWorkStatus(
  id: string,
  status: PostStatus,
  ownerId: string
): Promise<boolean> {
  const rows = (await sql`
    UPDATE works SET status = ${status}
    WHERE id = ${id}
      AND handle IN (SELECT handle FROM profiles WHERE owner_id = ${ownerId})
    RETURNING id
  `) as { id: string }[];
  return rows.length > 0;
}

/**
 * 整条更新动态（标题 / 内容 / 状态，按需部分更新）。仅 owner 可操作。
 * 通过 handle 归属校验保证只能改自己名下的内容。
 */
export async function updatePost(
  id: string,
  patch: {
    title?: string | null;
    content?: string | null;
    status?: PostStatus;
  },
  ownerId: string
): Promise<boolean> {
  // 先取现有行，未提供的字段保留原值（仍走参数化，避免 SQL 注入）
  const existing = (await sql`
    SELECT title, content, status
    FROM posts
    WHERE id = ${id}
      AND handle IN (SELECT handle FROM profiles WHERE owner_id = ${ownerId})
    LIMIT 1
  `) as Array<{
    title: string | null;
    content: string | null;
    status: PostStatus;
  }>;
  const cur = existing[0];
  if (!cur) return false;

  const title = patch.title !== undefined ? (patch.title ?? null) : cur.title;
  const content = patch.content !== undefined ? (patch.content ?? null) : cur.content;
  const status = patch.status !== undefined ? patch.status : cur.status;

  const rows = (await sql`
    UPDATE posts
    SET title = ${title}, content = ${content}, status = ${status}
    WHERE id = ${id}
      AND handle IN (SELECT handle FROM profiles WHERE owner_id = ${ownerId})
    RETURNING id
  `) as unknown as { id: string }[];
  return rows.length > 0;
}

/**
 * 整条更新作品（标题 / URL / 描述 / 状态，按需部分更新）。仅 owner 可操作。
 */
export async function updateWork(
  id: string,
  patch: {
    title?: string | null;
    url?: string | null;
    description?: string | null;
    status?: PostStatus;
  },
  ownerId: string
): Promise<boolean> {
  const existing = (await sql`
    SELECT title, url, description, status
    FROM works
    WHERE id = ${id}
      AND handle IN (SELECT handle FROM profiles WHERE owner_id = ${ownerId})
    LIMIT 1
  `) as Array<{
    title: string | null;
    url: string | null;
    description: string | null;
    status: PostStatus;
  }>;
  const cur = existing[0];
  if (!cur) return false;

  const title = patch.title !== undefined ? (patch.title ?? null) : cur.title;
  const url = patch.url !== undefined ? (patch.url ?? null) : cur.url;
  const description =
    patch.description !== undefined ? (patch.description ?? null) : cur.description;
  const status = patch.status !== undefined ? patch.status : cur.status;

  const rows = (await sql`
    UPDATE works
    SET title = ${title}, url = ${url}, description = ${description}, status = ${status}
    WHERE id = ${id}
      AND handle IN (SELECT handle FROM profiles WHERE owner_id = ${ownerId})
    RETURNING id
  `) as unknown as { id: string }[];
  return rows.length > 0;
}

/**
 * 删除动态。仅 owner 可操作（同理归属校验）。
 */
export async function deletePost(id: string, ownerId: string): Promise<boolean> {
  const rows = (await sql`
    DELETE FROM posts
    WHERE id = ${id}
      AND handle IN (SELECT handle FROM profiles WHERE owner_id = ${ownerId})
    RETURNING id
  `) as { id: string }[];
  return rows.length > 0;
}

/**
 * 删除作品。仅 owner 可操作（同理归属校验）。
 */
export async function deleteWork(id: string, ownerId: string): Promise<boolean> {
  const rows = (await sql`
    DELETE FROM works
    WHERE id = ${id}
      AND handle IN (SELECT handle FROM profiles WHERE owner_id = ${ownerId})
    RETURNING id
  `) as { id: string }[];
  return rows.length > 0;
}

// ----------------------------------------------------------------------------
// 订阅 / 收付款（Polar.sh）
// ----------------------------------------------------------------------------

/** 获取 owner 最新的订阅记录（按更新时间倒序）。 */
export async function getSubscription(ownerEmail: string): Promise<Subscription | null> {
  const rows = (await sql`
    SELECT * FROM subscriptions WHERE owner_email = ${ownerEmail}
    ORDER BY updated_at DESC LIMIT 1
  `) as Subscription[];
  return rows[0] ?? null;
}

/**
 * 写入 / 更新一条订阅（按 polar_subscription_id 幂等 upsert）。
 * 同时把权益同步到 profiles.plan（pro / free）。
 */
export async function upsertSubscription(input: {
  ownerEmail: string;
  polarSubscriptionId: string;
  polarCustomerId?: string | null;
  status: string;
  cancelAtPeriodEnd?: boolean;
  currentPeriodEnd?: string | null;
  metadata?: unknown;
  grantPlan: boolean; // true=授予 Pro，false=收回
}): Promise<void> {
  const plan = input.grantPlan ? "pro" : "free";
  await sql`
    INSERT INTO subscriptions (
      owner_email, polar_subscription_id, polar_customer_id,
      plan, status, cancel_at_period_end, current_period_end, metadata
    )
    VALUES (
      ${input.ownerEmail}, ${input.polarSubscriptionId}, ${input.polarCustomerId ?? null},
      ${plan}, ${input.status}, ${input.cancelAtPeriodEnd ?? false},
      ${input.currentPeriodEnd ?? null}, ${JSON.stringify(input.metadata ?? {}) ?? "{}"}::jsonb
    )
    ON CONFLICT (polar_subscription_id) DO UPDATE SET
      plan = EXCLUDED.plan,
      status = EXCLUDED.status,
      cancel_at_period_end = EXCLUDED.cancel_at_period_end,
      current_period_end = EXCLUDED.current_period_end,
      metadata = EXCLUDED.metadata,
      updated_at = now()
  `;
  // 同步 profiles.plan（若用户已建档案；未建则仅记录订阅，后续建档案默认 free）
  await sql`
    UPDATE profiles SET plan = ${plan} WHERE owner_id = ${input.ownerEmail}
  `;
}

/**
 * webhook 去重：插入 webhook-id，若已存在则视为重复（返回 false）。
 * 用唯一主键冲突实现幂等，避免 Polar 重试导致重复副作用。
 */
export async function tryProcessWebhook(id: string, type: string): Promise<boolean> {
  const rows = (await sql`
    INSERT INTO webhook_events (id, type) VALUES (${id}, ${type})
    ON CONFLICT (id) DO NOTHING
    RETURNING id
  `) as { id: string }[];
  return rows.length > 0;
}
