import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getProfileByOwner, getStats } from "@/lib/db/queries";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/analytics
// Pro 专属：返回当前用户主页的访客分析聚合（PV / UV / 来源 / 登录占比）。
export async function GET() {
  const session = await auth();
  const ownerId = session?.user?.id;
  if (!ownerId) {
    return NextResponse.json({ code: 40101, message: "未登录" }, { status: 401 });
  }

  const profile = await getProfileByOwner(ownerId);
  if (!profile) {
    return NextResponse.json({ code: 40401, message: "尚未创建主页" }, { status: 404 });
  }
  if (profile.plan !== "pro") {
    return NextResponse.json(
      { code: 40301, message: "访客分析为 Pro 专属功能", proOnly: true },
      { status: 403 }
    );
  }

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

  return NextResponse.json({
    totalViews: stats?.views ?? 0,
    uv: uvRow[0]?.uv ?? 0,
    trend,
    sources,
    loggedRatio: totalVisits > 0 ? loggedVisits / totalVisits : 0,
    totalVisits,
  });
}
