import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { upsertProfile, getProfileByOwner } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

// POST /api/profile
// 鉴权后创建/更新当前用户的档案。body 需包含 handle（其余字段可选）。
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
    // 真门禁：非 Pro 用户锁定自定义主题色，沿用现有值，防止前端绕过
    const raw = body as Record<string, unknown>;
    if (typeof raw.theme_color === 'string') {
      const existing = await getProfileByOwner(ownerId);
      if (!existing || existing.plan !== 'pro') {
        raw.theme_color = existing?.theme_color ?? '#c2410c';
      }
    }
    const profile = await upsertProfile(raw as never, ownerId);
    return NextResponse.json({ ok: true, profile });
  } catch (e) {
    if (e instanceof Error && e.message === "INVALID_HANDLE") {
      return NextResponse.json(
        {
          code: 40002,
          message: "handle 格式不合法（小写字母/数字/下划线，3-20 位）",
        },
        { status: 400 }
      );
    }
    if (e instanceof Error && e.message === "FORBIDDEN_HANDLE") {
      return NextResponse.json(
        { code: 40301, message: "该 handle 已被他人占用" },
        { status: 403 }
      );
    }
    if (e instanceof Error && e.message.startsWith("DB_NOT_CONFIGURED")) {
      return NextResponse.json(
        {
          code: 50300,
          message: "数据库未配置：请在 .env.local 设置 DATABASE_URL 并执行 neon/schema.sql",
        },
        { status: 503 }
      );
    }
    console.error("[api/profile] upsert failed", e);
    return NextResponse.json(
      { code: 50000, message: "服务器错误" },
      { status: 500 }
    );
  }
}
