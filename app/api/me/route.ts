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
  const posts = profile ? await getOwnerPosts(ownerId) : [];
  const works = profile ? await getOwnerWorks(ownerId) : [];
  const stats = profile ? await getStats(profile.handle) : null;
  return NextResponse.json({ profile, posts, works, stats });
}
