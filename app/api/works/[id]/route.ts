import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  updateWorkStatus,
  updateWork,
  deleteWork,
  revalidateOwnerContent,
} from "@/lib/db/queries";

export const dynamic = "force-dynamic";

// PATCH /api/works/[id]
// 鉴权后更新某条作品。body 可包含：
//   - status      : draft / published / hidden（仅改状态时只传这个）
//   - title/url/description/status : 整条编辑（按需部分更新）
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const ownerId = session?.user?.id;
  if (!ownerId) {
    return NextResponse.json({ code: 40101, message: "未登录" }, { status: 401 });
  }

  let body: {
    title?: string | null;
    url?: string | null;
    description?: string | null;
    image_url?: string | null;
    status?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { code: 40001, message: "请求体不是合法 JSON" },
      { status: 400 }
    );
  }

  const hasStatus = body.status !== undefined;
  const hasTitle = body.title !== undefined;
  const hasUrl = body.url !== undefined;
  const hasDesc = body.description !== undefined;

  if (!hasStatus && !hasTitle && !hasUrl && !hasDesc) {
    return NextResponse.json(
      { code: 40003, message: "至少需要提供一个要更新的字段" },
      { status: 400 }
    );
  }

  // 仅改状态：沿用原逻辑
  if (hasStatus && !hasTitle && !hasUrl && !hasDesc) {
    if (!["draft", "published", "hidden"].includes(body.status ?? "")) {
      return NextResponse.json(
        { code: 40003, message: "status 必须是 draft / published / hidden" },
        { status: 400 }
      );
    }
    try {
      const ok = await updateWorkStatus(params.id, body.status as never, ownerId);
      if (!ok) {
        return NextResponse.json(
          { code: 40401, message: "作品不存在或无权操作" },
          { status: 404 }
        );
      }
      await revalidateOwnerContent(ownerId);
      return NextResponse.json({ ok: true });
    } catch (e) {
      console.error("[api/works/[id]] status update failed", e);
      return NextResponse.json(
        { code: 50000, message: "服务器错误" },
        { status: 500 }
      );
    }
  }

  // 整条编辑
  if (body.status !== undefined && !["draft", "published", "hidden"].includes(body.status)) {
    return NextResponse.json(
      { code: 40003, message: "status 必须是 draft / published / hidden" },
      { status: 400 }
    );
  }

  try {
    const ok = await updateWork(
      params.id,
      {
        title: body.title,
        url: body.url,
        description: body.description,
        image_url: body.image_url,
        status: body.status as never,
      },
      ownerId
    );
    if (!ok) {
      return NextResponse.json(
        { code: 40401, message: "作品不存在或无权操作" },
        { status: 404 }
      );
    }
    await revalidateOwnerContent(ownerId);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/works/[id]] update failed", e);
    return NextResponse.json(
      { code: 50000, message: "服务器错误" },
      { status: 500 }
    );
  }
}

// DELETE /api/works/[id]
// 鉴权后删除某条作品（仅 owner 可操作）。
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const ownerId = session?.user?.id;
  if (!ownerId) {
    return NextResponse.json({ code: 40101, message: "未登录" }, { status: 401 });
  }

  try {
    const ok = await deleteWork(params.id, ownerId);
    if (!ok) {
      return NextResponse.json(
        { code: 40401, message: "作品不存在或无权操作" },
        { status: 404 }
      );
    }
    await revalidateOwnerContent(ownerId);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/works/[id]] delete failed", e);
    return NextResponse.json(
      { code: 50000, message: "服务器错误" },
      { status: 500 }
    );
  }
}
