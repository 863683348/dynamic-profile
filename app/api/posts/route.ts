import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { createPost } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

// POST /api/posts
// 鉴权后在指定 handle 下创建一条内容。body 需包含 handle。
export async function POST(req: NextRequest) {
  const session = await auth();
  const ownerId = session?.user?.id;
  if (!ownerId) {
    return NextResponse.json({ code: 40101, message: "未登录" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { code: 40001, message: "请求体不是合法 JSON" },
      { status: 400 }
    );
  }

  try {
    const post = await createPost(body as never, ownerId);
    return NextResponse.json({ post });
  } catch (e) {
    if (e instanceof Error && e.message === "FORBIDDEN_HANDLE") {
      return NextResponse.json(
        { code: 40301, message: "无权在该 handle 下创建内容" },
        { status: 403 }
      );
    }
    console.error("[api/posts] create failed", e);
    return NextResponse.json(
      { code: 50000, message: "服务器错误" },
      { status: 500 }
    );
  }
}
