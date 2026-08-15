import {
  getProfileByOwner,
  getCachedOwnerPosts,
  getCachedOwnerWorks,
  getStats,
  getSubscription,
} from '@/lib/db/queries';
import type { Subscription } from '@/lib/types';

export type MeData = {
  profile: Awaited<ReturnType<typeof getProfileByOwner>>;
  posts: Awaited<ReturnType<typeof getCachedOwnerPosts>>;
  works: Awaited<ReturnType<typeof getCachedOwnerWorks>>;
  stats: Awaited<ReturnType<typeof getStats>>;
  sub: Awaited<ReturnType<typeof getSubscription>>;
};

/**
 * 服务端一次性加载当前登录用户的全部后台数据（档案 + 动态 + 作品 + 统计 + 订阅）。
 * 供 /api/me 路由与 dashboard 布局的 SSR 预取共用，避免重复查询 profile。
 *
 * 查询结构：先取一次 profile（序列化），再用其 owner_id + handle 并发拉取
 * 动态 / 作品 / 统计 / 订阅（4 路并发 ≈ 1 个网络往返），共约 2 个 DB 往返。
 */
export async function loadMe(ownerId: string): Promise<MeData> {
  const profile = await getProfileByOwner(ownerId);
  const [posts, works, stats, sub] = profile
    ? await Promise.all([
        getCachedOwnerPosts(profile.handle),
        getCachedOwnerWorks(profile.handle),
        getStats(profile.handle),
        getSubscription(ownerId),
      ])
    : [[], [], null, null];
  return { profile, posts, works, stats, sub: serializeSub(sub) };
}

// Neon 的 timestamptz 字段默认返回 JS Date 对象；Next.js RSC 向客户端组件传 props 时
// Date 序列化在不同版本/边界下可能不稳定，统一转成 ISO 字符串避免 membership 等页崩溃。
function serializeSub(sub: Subscription | null): Subscription | null {
  if (!sub) return null;
  const toIso = (v: unknown) => (v instanceof Date ? v.toISOString() : v);
  return {
    ...sub,
    created_at: toIso(sub.created_at) as string,
    updated_at: toIso(sub.updated_at) as string,
    current_period_end: toIso(sub.current_period_end) as string | null,
  };
}
