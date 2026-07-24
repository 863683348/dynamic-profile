import { sql } from "./index";
import type {
  Profile,
  Post,
  Stats,
  ProfileInput,
  PostInput,
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

/** 获取某 handle 下已发布的内容（按时间倒序）。 */
export async function getPublishedPosts(handle: string): Promise<Post[]> {
  // 使用字符串拼接查询（绕过 @neondatabase/serverless 在 RSC / API Route
  // 上下文中对某些 handle 值的参数化查询返回空结果的 bug）。
  // handle 已通过 HANDLE_RE = /^[a-z0-9_]{3,20}$/ 校验，此处做转义双重防护。
  const safeH = handle.replace(/[^a-z0-9_]/g, '').slice(0, 20);
  const rows = (await sql(
    [`SELECT id, handle, title, content, source, category, status, created_at FROM posts WHERE handle = '${safeH}' AND status = 'published' ORDER BY created_at DESC`] as any,
  )) as Post[];
  return rows;
}

/** 获取某 owner 名下的全部内容（含草稿），用于后台管理。 */
export async function getOwnerPosts(ownerId: string): Promise<Post[]> {
  const profile = await getProfileByOwner(ownerId);
  if (!profile) return [];

  const rows = (await sql`
    SELECT id, handle, title, content, source, category, status, created_at
    FROM posts
    WHERE handle = ${profile.handle}
    ORDER BY created_at DESC
  `) as Post[];
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
 */
export async function upsertProfile(input: ProfileInput, ownerId: string): Promise<Profile> {
  if (!isValidHandle(input.handle)) {
    throw new Error("INVALID_HANDLE");
  }

  // 抢注防护：存在但不属于自己的 handle 直接拒绝
  const existing = await getProfileByHandle(input.handle);
  if (existing && existing.owner_id !== ownerId) {
    throw new Error("FORBIDDEN_HANDLE");
  }

  const links = JSON.stringify(input.links ?? []);
  const rows = (await sql`
    INSERT INTO profiles (
      handle, owner_id, display_name, bio, avatar_url, cover_url,
      theme_color, theme_dark, status_text, links
    )
    VALUES (
      ${input.handle}, ${ownerId},
      ${input.display_name ?? null}, ${input.bio ?? null},
      ${input.avatar_url ?? null}, ${input.cover_url ?? null},
      ${input.theme_color ?? "#c2410c"}, ${input.theme_dark ?? false},
      ${input.status_text ?? null}, ${links}::jsonb
    )
    ON CONFLICT (handle) DO UPDATE SET
      display_name = EXCLUDED.display_name,
      bio = EXCLUDED.bio,
      avatar_url = EXCLUDED.avatar_url,
      cover_url = EXCLUDED.cover_url,
      theme_color = EXCLUDED.theme_color,
      theme_dark = EXCLUDED.theme_dark,
      status_text = EXCLUDED.status_text,
      links = EXCLUDED.links
    WHERE profiles.owner_id = ${ownerId}
    RETURNING *
  `) as Profile[];

  const profile = rows[0];
  if (!profile) throw new Error("UPSERT_FAILED");
  return profile;
}

/**
 * 新建内容。要求 input.handle 属于该 owner。
 */
export async function createPost(input: PostInput, ownerId: string): Promise<Post> {
  const profile = await getProfileByOwner(ownerId);
  if (!profile || profile.handle !== input.handle) {
    throw new Error("FORBIDDEN_HANDLE");
  }

  const rows = (await sql`
    INSERT INTO posts (handle, title, content, source, category, status)
    VALUES (
      ${input.handle},
      ${input.title ?? null},
      ${input.content ?? null},
      ${input.source ?? "manual"},
      ${input.category ?? "post"},
      ${input.status ?? "draft"}
    )
    RETURNING id, handle, title, content, source, category, status, created_at
  `) as Post[];
  return rows[0];
}

/**
 * 更新内容状态（draft / published / hidden）。仅 owner 可操作
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
