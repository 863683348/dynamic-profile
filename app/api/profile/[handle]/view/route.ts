import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { incrementViews } from "@/lib/db/queries";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

// POST /api/profile/[handle]/view
// 公开接口：为主页浏览量 +1，并写入 visits 明细（Pro 访客分析用）。无需登录。
export async function POST(
  req: NextRequest,
  { params }: { params: { handle: string } }
) {
  try {
    // 匿名访客 ID（容错：无 body 也不影响 +1）
    let vid: string | null = null;
    try {
      const body = await req.json();
      if (body && typeof body.vid === "string" && body.vid) {
        vid = body.vid.slice(0, 64);
      }
    } catch {
      /* 无 body 容错 */
    }

    // 来源域名（只存域名，不存完整 URL，降低隐私面）
    let referrerDomain: string | null = null;
    const ref = req.headers.get("referer");
    if (ref) {
      try {
        referrerDomain = new URL(ref).hostname || null;
      } catch {
        referrerDomain = null;
      }
    }

    const session = await auth();
    const isLoggedIn = !!session?.user;

    // 浏览量 +1（保留原逻辑）
    const views = await incrementViews(params.handle);

    // 访客明细（写入失败不影响主页渲染与 +1）
    try {
      await sql`
        INSERT INTO visits (handle, referrer_domain, section, vid, is_logged_in)
        VALUES (${params.handle}, ${referrerDomain}, 'home', ${vid}, ${isLoggedIn})
      `;
    } catch (e) {
      console.error("[api/profile/[handle]/view] visit record failed", e);
    }

    return NextResponse.json({ views });
  } catch (e) {
    console.error("[api/profile/[handle]/view] failed", e);
    return NextResponse.json(
      { code: 50000, message: "服务器错误" },
      { status: 500 }
    );
  }
}
