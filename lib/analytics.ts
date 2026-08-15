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
  const profile = await getProfileByOwner(ownerId);
  if (!profile) return { kind: 'unauth' };
  if (profile.plan !== 'pro') return { kind: 'proOnly' };

  const handle = profile.handle;
  const stats = await getStats(handle);

  const trend = (await sql`
    SELECT date_trunc('day', visited_at)::date AS day, COUNT(*)::int AS pv
    FROM visits
    WHERE handle = ${handle} AND visited_at >= now() - interval '30 days'
    GROUP BY 1 ORDER BY 1
  `) as { day: string; pv: number }[];

  const uvRow = (await sql`
    SELECT COUNT(DISTINCT vid)::int AS uv
    FROM visits
    WHERE handle = ${handle} AND visited_at >= now() - interval '30 days'
  `) as { uv: number }[];

  const sources = (await sql`
    SELECT COALESCE(referrer_domain, '(直接访问)') AS domain, COUNT(*)::int AS cnt
    FROM visits
    WHERE handle = ${handle}
    GROUP BY 1 ORDER BY cnt DESC LIMIT 8
  `) as { domain: string; cnt: number }[];

  const loginRow = (await sql`
    SELECT COUNT(*)::int AS total,
           SUM(CASE WHEN is_logged_in THEN 1 ELSE 0 END)::int AS logged
    FROM visits WHERE handle = ${handle}
  `) as { total: number; logged: number }[];

  const totalVisits = loginRow[0]?.total ?? 0;
  const loggedVisits = loginRow[0]?.logged ?? 0;

  return {
    kind: 'data',
    data: {
      totalViews: stats?.views ?? 0,
      uv: uvRow[0]?.uv ?? 0,
      trend,
      sources,
      loggedRatio: totalVisits > 0 ? loggedVisits / totalVisits : 0,
      totalVisits,
    },
  };
}
