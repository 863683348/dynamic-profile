import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getSubscription } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

// GET /api/subscription
// 鉴权后返回当前 owner 的套餐状态（plan / status / 续费日期 / 是否期末取消），
// 供 dashboard 「套餐」区块展示。权益真相以 subscriptions 表为准。
export async function GET() {
  const session = await auth();
  const ownerEmail = session?.user?.id;
  if (!ownerEmail) {
    return NextResponse.json({ code: 40101, message: "未登录" }, { status: 401 });
  }

  const sub = await getSubscription(ownerEmail);
  return NextResponse.json({
    plan: sub?.plan ?? "free",
    status: sub?.status ?? null,
    cancel_at_period_end: sub?.cancel_at_period_end ?? false,
    current_period_end: sub?.current_period_end ?? null,
  });
}
