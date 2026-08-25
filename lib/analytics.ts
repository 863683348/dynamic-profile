import { unstable_cache } from 'next/cache';
import { getProfileByOwner, getStats } from '@/lib/db/queries';
import { sql } from '@/lib/db';

export type AnalyticsData = {
  totalViews: number;
  uv: number;
  trend: { day: string; pv: number }[];
  sources: { domain: string; cnt: number }[];
  loggedRatio: number;
  totalVisits: number;
};

export type AnalyticsResult =
  | { kind: 'data'; data: AnalyticsData }
  | { kind: 'proOnly' }
  | { kind: 'unauth' };

/**
 * 服务端加载当前用户的访客分析（Pro 专属）。
 * 5 路查询（stats + 30天趋势 + UV + 来源 + 登录占比）顺序执行，
 * 但放在 SSR 阶段，页面首屏 HTML 直接带数据，客户端不再转圈。
 * 非 Pro / 未登录直接返回标记，由前端渲染对应引导。
 */
export async function loadAnalytics(ownerId: string): Promise<AnalyticsResult> {
  return unstable_cache(
    async () => {
      const profile = await getProfileByOwner(ownerId);
      if (!profile) return { kind: 'unauth' as const };
      if (profile.plan !== 'pro') return { kind: 'proOnly' as const };

      const handle = profile.handle;
      const stats = await getStats(handle);

      // 4 路聚合查询并发执行，避免顺序 await 叠加网络往返。
      const [trend, uvRow, sources, loginRow] = await Promise.all([
        sql`
          SELECT date_trunc('day', visited_at)::date AS day, COUNT(*)::int AS pv
          FROM visits
          WHERE handle = ${handle} AND visited_at >= now() - interval '30 days'
          GROUP BY 1 ORDER BY 1
        ` as Promise<{ day: string; pv: number }[]>,
        sql`
          SELECT COUNT(DISTINCT vid)::int AS uv
          FROM visits
          WHERE handle = ${handle} AND visited_at >= now() - interval '30 days'
        ` as Promise<{ uv: number }[]>,
        sql`
          SELECT COALESCE(referrer_domain, '(直接访问)') AS domain, COUNT(*)::int AS cnt
          FROM visits
          WHERE handle = ${handle} AND visited_at >= now() - interval '90 days'
          GROUP BY 1 ORDER BY cnt DESC LIMIT 8
        ` as Promise<{ domain: string; cnt: number }[]>,
        sql`
          SELECT COUNT(*)::int AS total,
                 SUM(CASE WHEN is_logged_in THEN 1 ELSE 0 END)::int AS logged
          FROM visits WHERE handle = ${handle} AND visited_at >= now() - interval '90 days'
        ` as Promise<{ total: number; logged: number }[]>,
      ]);

      const totalVisits = loginRow[0]?.total ?? 0;
      const loggedVisits = loginRow[0]?.logged ?? 0;

      return {
        kind: 'data' as const,
        data: {
          totalViews: stats?.views ?? 0,
          uv: uvRow[0]?.uv ?? 0,
          trend,
          sources,
          loggedRatio: totalVisits > 0 ? loggedVisits / totalVisits : 0,
          // 近 90 天访客数（与 sources/loginRow 口径一致，避免全表扫描）
          totalVisits,
        },
      };
    },
    ['analytics', ownerId],
    { revalidate: 300, tags: [`analytics:${ownerId}`] },
  )();
}
