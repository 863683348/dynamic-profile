import { NextResponse } from "next/server";
import { unstable_cache, revalidateTag } from "next/cache";
import { auth } from "@/auth";
import { getSubscription } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

// GET /api/subscription
// 鉴权后返回当前 owner 的套餐状态（plan / status / 续费日期 / 是否期末取消），
// 供 dashboard 「套餐」 区块展示。权益真相以 subscriptions 表为准。
//
// 用 unstable_cache 包 120s：membership / overview 高频拉取时免去重复 DB 往返，
// 缩短 TTFB；Pro 升降级由 webhook 调 revalidateTag(`sub:${ownerEmail}`) 主动失效。
async function loadSub(ownerEmail: string) {
  return unstable_cache(
    async () => {
      const sub = await getSubscription(ownerEmail);
      return {
        plan: sub?.plan ?? "free",
        status: sub?.status ?? null,
        cancel_at_period_end: sub?.cancel_at_period_end ?? false,
        current_period_end: sub?.current_period_end ?? null,
      };
    },
    ["subscription", ownerEmail],
    { revalidate: 120, tags: [`sub:${ownerEmail}`] },
  )();
}

export async function GET() {
  const session = await auth();
  const ownerEmail = session?.user?.id;
  if (!ownerEmail) {
    return NextResponse.json({ code: 40101, message: "未登录" }, { status: 401 });
  }

  const json = await loadSub(ownerEmail);
  return NextResponse.json(json);
}
