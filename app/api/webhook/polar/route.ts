import { NextRequest, NextResponse } from "next/server";
import { Webhook, WebhookVerificationError } from "standardwebhooks";
import { upsertSubscription, tryProcessWebhook } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

// POST /api/webhook/polar
// Polar 订阅事件回调。流程：
//   1. 用 POLAR_WEBHOOK_SECRET（Polar 后台给的 base64 密钥）验签（失败 403）
//   2. 按 webhook-id 去重（已处理直接 202，保证幂等）
//   3. 按 Polar 权威数据重算权益并落库（订阅事件）
// 注意：本路由不可加鉴权，且需读取原始 body 用于验签。
//
// 为何不用 @polar-sh/sdk 的 validateEvent：
// 其实现会先对 secret 做 base64(utf8(secret)) 再交给 Webhook，而 Webhook 又 base64 解码，
// 导致最终 HMAC 密钥变成 utf8(secret) —— 与 Polar 用 base64decode(secret) 签名的算法不一致，
// 会拒绝所有真实回调。直接用 standardwebhooks 的 Webhook（base64 解码 secret）才正确。
export async function POST(req: NextRequest) {
  const secret = process.env.POLAR_WEBHOOK_SECRET;
  if (!secret) {
    return new NextResponse("", { status: 500 });
  }

  const rawBody = await req.text();
  const headers = {
    "webhook-id": req.headers.get("webhook-id") ?? "",
    "webhook-timestamp": req.headers.get("webhook-timestamp") ?? "",
    "webhook-signature": req.headers.get("webhook-signature") ?? "",
  };

  let event: { type?: string; data?: Record<string, any> };
  try {
    event = new Webhook(secret).verify(rawBody, headers) as any;
  } catch (error) {
    if (error instanceof WebhookVerificationError) {
      return new NextResponse("", { status: 403 });
    }
    return new NextResponse("", { status: 403 });
  }

  // 幂等：同一 webhook-id 仅处理一次
  const eventId = headers["webhook-id"];
  const firstTime = await tryProcessWebhook(eventId, event.type ?? "unknown");
  if (!firstTime) {
    return new NextResponse("", { status: 202 });
  }

  try {
    await handleEvent(event);
  } catch (e) {
    // 处理失败也返回 202，避免 Polar 无限重试；错误已记入日志
    console.error("[webhook/polar] handle failed", e);
  }
  return new NextResponse("", { status: 202 });
}

async function handleEvent(event: { type?: string; data?: Record<string, any> }) {
  const type = event.type;
  // 只处理订阅相关事件
  if (!type || !type.startsWith("subscription.")) return;

  const d = event.data ?? {};
  // 优先用 checkout 时写入的 metadata.owner_email 回链；其次 external_customer_id
  const ownerEmail: string | undefined =
    d?.metadata?.owner_email || d?.external_customer_id;
  if (!ownerEmail) {
    console.warn("[webhook/polar] missing owner_email", type, d?.id);
    return;
  }

  const status: string = d?.status ?? "unknown";
  const cancelAtPeriodEnd: boolean = Boolean(d?.cancel_at_period_end);
  const currentPeriodEnd: string | null = d?.current_period_end ?? null;

  // 用 Polar 权威数据重算权益：
  //   active / trialing / 已取消但保留至周期末 → 授予 Pro
  //   revoked / 立即取消（cancel_at_period_end=false）→ 收回
  const grant =
    status === "active" ||
    status === "trialing" ||
    (status === "canceled" && cancelAtPeriodEnd);

  await upsertSubscription({
    ownerEmail,
    polarSubscriptionId: d.id,
    polarCustomerId: d.customer_id,
    status,
    cancelAtPeriodEnd,
    currentPeriodEnd,
    metadata: d.metadata,
    grantPlan: grant,
  });
}
