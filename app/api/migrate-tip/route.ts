import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

/**
 * 一次性迁移 API：为 profiles 表增加打赏 5 列。
 * GET /api/migrate-tip
 *
 * 幂等：IF NOT EXISTS，重复调用安全。
 * 用完后建议删除此文件或返回 410。
 */
const TARGETS = [
  "tip_enabled",
  "tip_message",
  "bmc_username",
  "wechat_qr_url",
  "alipay_qr_url",
];

export async function GET() {
  try {
    const before: string[] = (
      await sql`
        SELECT column_name FROM information_schema.columns WHERE table_name = 'profiles'
      `
    ).map((r: any) => r.column_name);

    const needed = TARGETS.filter((c) => !before.includes(c));

    // 列名 / 类型为写死的字面量，用静态 tagged-template 即可，无需 .unsafe。
    // ADD COLUMN IF NOT EXISTS 自带幂等，重复调用安全。
    if (needed.includes("tip_enabled"))
      await sql`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS tip_enabled boolean NOT NULL DEFAULT false`;
    if (needed.includes("tip_message"))
      await sql`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS tip_message text DEFAULT NULL`;
    if (needed.includes("bmc_username"))
      await sql`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bmc_username text DEFAULT NULL`;
    if (needed.includes("wechat_qr_url"))
      await sql`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS wechat_qr_url text DEFAULT NULL`;
    if (needed.includes("alipay_qr_url"))
      await sql`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS alipay_qr_url text DEFAULT NULL`;

    const migration = TARGETS.map((c) =>
      before.includes(c) ? `SKIP ${c} (exists)` : `OK ${c}`
    );

    const after: string[] = (
      await sql`
        SELECT column_name FROM information_schema.columns
        WHERE table_name = 'profiles'
        AND column_name IN ('tip_enabled','tip_message','bmc_username','wechat_qr_url','alipay_qr_url')
      `
    ).map((r: any) => r.column_name);

    return NextResponse.json({
      ok: true,
      migration,
      verified: after,
      note: "可删除 app/api/migrate-tip/route.ts",
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
