import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

/**
 * 一次性迁移 API：为 profiles 表增加打赏 5 列。
 * GET /api/migrate-tip
 *
 * 幂等：IF NOT EXISTS，重复调用安全。
 * 用完后建议删除此文件或返回 410。
 */
const COLUMNS = [
  ["tip_enabled",   "boolean NOT NULL DEFAULT false"],
  ["tip_message",   "text DEFAULT NULL"],
  ["bmc_username",  "text DEFAULT NULL"],
  ["wechat_qr_url", "text DEFAULT NULL"],
  ["alipay_qr_url", "text DEFAULT NULL"],
];

export async function GET() {
  try {
    const existing = await sql`SELECT column_name FROM information_schema.columns WHERE table_name='profiles'`;
    const names = existing.map((r: any) => r.column_name);

    const results: string[] = [];
    for (const [col, def] of COLUMNS) {
      if (names.includes(col)) {
        results.push(`SKIP ${col} (exists)`);
        continue;
      }
      await sql.unsafe(`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS ${col} ${def}`);
      results.push(`OK ${col}`);
    }

    // 验证
    const after = await sql`
      SELECT column_name FROM information_schema.columns 
      WHERE table_name='profiles' 
      AND column_name IN ('tip_enabled','tip_message','bmc_username','wechat_qr_url','alipay_qr_url')
    `;
    return NextResponse.json({
      ok: true,
      migration: results,
      verified: after.map((r: any) => r.column_name),
      note: "可删除 app/api/migrate-tip/route.ts",
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e.message },
      { status: 500 }
    );
  }
}
