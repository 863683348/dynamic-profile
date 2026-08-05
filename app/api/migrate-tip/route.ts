import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

/**
 * 一次性迁移：为 profiles 表增加打赏相关字段。
 * 访问一次即可；IF NOT EXISTS 保证幂等。
 * 迁移完成后可删除此文件。
 */
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await sql`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS tip_enabled   boolean NOT NULL DEFAULT false`;
    await sql`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS tip_message   text DEFAULT NULL`;
    await sql`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bmc_username  text DEFAULT NULL`;
    await sql`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS wechat_qr_url text DEFAULT NULL`;
    await sql`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS alipay_qr_url text DEFAULT NULL`;

    // 验证
    const row = (await sql`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'profiles' AND column_name IN ('tip_enabled','tip_message','bmc_username','wechat_qr_url','alipay_qr_url')
      ORDER BY ordinal_position
    `) as { column_name: string }[];

    return NextResponse.json({
      ok: true,
      added: row.map((r) => r.column_name),
      message: 'Tip columns migrated successfully',
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
