import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

/**
 * 一次性迁移：为 profiles 表补 style 列（5 套视觉风格），支撑风格门禁持久化。
 * 部署后访问一次 /api/migrate-style 即可；IF NOT EXISTS 保证幂等。
 * 迁移完成后可删除此文件。
 */
export async function GET() {
  try {
    await sql`
      ALTER TABLE profiles
      ADD COLUMN IF NOT EXISTS style text NOT NULL DEFAULT 'magazine'
    `;

    const row = (await sql`
      SELECT column_name FROM information_schema.columns
      WHERE table_name = 'profiles' AND column_name = 'style'
    `) as { column_name: string }[];

    return NextResponse.json({
      ok: true,
      exists: row.length > 0,
      message: 'profiles.style ready',
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
