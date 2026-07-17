import { NextRequest, NextResponse } from "next/server";
import { incrementViews } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

// POST /api/profile/[handle]/view
// 公开接口：为主页浏览量 +1，返回最新浏览数。无需登录。
export async function POST(
  _req: NextRequest,
  { params }: { params: { handle: string } }
) {
  try {
    const views = await incrementViews(params.handle);
    return NextResponse.json({ views });
  } catch (e) {
    console.error("[api/profile/[handle]/view] increment failed", e);
    return NextResponse.json(
      { code: 50000, message: "服务器错误" },
      { status: 500 }
    );
  }
}
