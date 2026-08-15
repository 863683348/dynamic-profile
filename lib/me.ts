import {
  getProfileByOwner,
  getOwnerPosts,
  getOwnerWorks,
  getStats,
  getSubscription,
} from '@/lib/db/queries';

export type MeData = {
  profile: Awaited<ReturnType<typeof getProfileByOwner>>;
  posts: Awaited<ReturnType<typeof getOwnerPosts>>;
  works: Awaited<ReturnType<typeof getOwnerWorks>>;
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
        getOwnerPosts(profile.handle),
        getOwnerWorks(profile.handle),
        getStats(profile.handle),
        getSubscription(ownerId),
      ])
    : [[], [], null, null];
  return { profile, posts, works, stats, sub };
}
