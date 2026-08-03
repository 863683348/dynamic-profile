import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { Polar } from "@polar-sh/sdk";

export const dynamic = "force-dynamic";

// 根据 POLAR_ENV 选择 Polar 环境（sandbox 用于本地/测试，production 用于正式）。
function getPolar(): Polar | null {
  const token = process.env.POLAR_ACCESS_TOKEN;
  if (!token) return null;
  const server = process.env.POLAR_ENV === "production" ? "production" : "sandbox";
  return new Polar({ accessToken: token, server });
}

// POST /api/customer-portal
// 鉴权后为当前登录用户（externalCustomerId = 登录邮箱）创建 Polar 客户会话，
// 返回托管账单中心地址 customerPortalUrl，前端新标签页打开即可管理订阅
// （续费、发票、支付方式、取消/恢复）。若无对应 Polar 客户（如从未订阅的免费用户）返回 404。
export async function POST() {
  const session = await auth();
  const ownerEmail = session?.user?.id;
  if (!ownerEmail) {
    return NextResponse.json({ code: 40101, message: "未登录" }, { status: 401 });
  }

  const polar = getPolar();
  if (!polar) {
    return NextResponse.json({ code: 50001, message: "支付未配置" }, { status: 500 });
  }

  try {
    const cs = await polar.customerSessions.create({
      externalCustomerId: ownerEmail,
    });
    return NextResponse.json({ url: cs.customerPortalUrl, token: cs.token });
  } catch (e) {
    // 客户在 Polar 不存在（免费用户未订阅过）→ 视为无订阅记录
    console.error("[api/customer-portal] create failed", e);
    return NextResponse.json(
      { code: 40400, message: "未找到订阅记录" },
      { status: 404 }
    );
  }
}
