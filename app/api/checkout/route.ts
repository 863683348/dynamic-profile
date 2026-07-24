import { NextRequest, NextResponse } from "next/server";
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

// POST /api/checkout
// 鉴权后按请求中的 plan(monthly/yearly) 在服务端选取对应产品 ID（绝不信赖客户端传值），
// 创建 Polar 收银台会话，返回 { url } 供前端跳转。
export async function POST(req: NextRequest) {
  const session = await auth();
  const ownerEmail = session?.user?.id;
  if (!ownerEmail) {
    return NextResponse.json({ code: 40101, message: "未登录" }, { status: 401 });
  }

  // 解析 plan，默认 monthly
  let plan: "monthly" | "yearly" = "monthly";
  try {
    const body = await req.json();
    if (body && body.plan === "yearly") plan = "yearly";
  } catch {
    /* 默认 monthly */
  }

  // 价格 ID 完全由服务端环境变量决定，客户端无法篡改
  const productId =
    plan === "yearly"
      ? process.env.POLAR_PRO_YEARLY_PRODUCT_ID
      : process.env.POLAR_PRO_MONTHLY_PRODUCT_ID;

  const polar = getPolar();
  if (!polar || !productId) {
    return NextResponse.json(
      { code: 50001, message: "支付未配置" },
      { status: 500 }
    );
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
  const successUrl = `${origin}/dashboard?upgraded=1&checkout_id={CHECKOUT_ID}`;

  try {
    const checkout = await polar.checkouts.create({
      products: [productId],
      successUrl,
      // externalCustomerId 把 Polar 客户与本站登录邮箱绑定，便于回链
      customerEmail: ownerEmail,
      externalCustomerId: ownerEmail,
      // metadata 会复制到生成的订阅，webhook 据此找到对应用户
      metadata: { owner_email: ownerEmail, plan },
    });
    return NextResponse.json({ url: checkout.url });
  } catch (e) {
    console.error("[api/checkout] create failed", e);
    return NextResponse.json(
      { code: 50000, message: "创建收银台失败" },
      { status: 500 }
    );
  }
}
