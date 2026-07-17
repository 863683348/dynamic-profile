import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { updatePostStatus } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

// PATCH /api/posts/[id]
// 鉴权后更新某条内容的状态（draft / published / hidden）。body: { status }
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const ownerId = session?.user?.id;
  if (!ownerId) {
    return NextResponse.json({ code: 40101, message: "未登录" }, { status: 401 });
  }

  let body: { status?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { code: 40001, message: "请求体不是合法 JSON" },
      { status: 400 }
    );
  }

  const status = body?.status;
  if (!["draft", "published", "hidden"].includes(status ?? "")) {
    return NextResponse.json(
      { code: 40003, message: "status 必须是 draft / published / hidden" },
      { status: 400 }
    );
  }

  try {
    const ok = await updatePostStatus(params.id, status as never, ownerId);
    if (!ok) {
      return NextResponse.json(
        { code: 40401, message: "内容不存在或无权操作" },
        { status: 404 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/posts/[id]] update failed", e);
    return NextResponse.json(
      { code: 50000, message: "服务器错误" },
      { status: 500 }
    );
  }
}
