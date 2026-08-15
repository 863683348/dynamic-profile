import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getProfileByOwner, getOwnerPosts, getOwnerWorks, getStats } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

// GET /api/me
// 鉴权后返回当前登录用户的档案、全部动态、全部作品（含草稿）与浏览量统计，供编辑台读取。
export async function GET() {
  const session = await auth();
  const ownerId = session?.user?.id;
  if (!ownerId) {
    return NextResponse.json({ code: 40101, message: "未登录" }, { status: 401 });
  }

  const profile = await getProfileByOwner(ownerId);
  // 仅取一次 profile，再用其 handle 并发拉取 动态/作品/统计；
  // 避免原先 getOwnerPosts/getOwnerWorks 内部各重复查一次 profile
  // （一次 /api/me 从 6 次顺序查询降为「profile + 3 路并发」≈ 2 个网络往返）。
  const [posts, works, stats] = profile
    ? await Promise.all([
        getOwnerPosts(profile.handle),
        getOwnerWorks(profile.handle),
        getStats(profile.handle),
      ])
    : [[], [], null];
  return NextResponse.json({ profile, posts, works, stats });
}
