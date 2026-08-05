import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

/**
 * 一次性迁移：新建 visits 明细表，支撑访客分析（Pro 专属）。
 * 部署后访问一次 /api/migrate-visits 即可；IF NOT EXISTS 保证幂等。
 * 迁移完成后可删除此文件。
 */
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS visits (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        handle text NOT NULL REFERENCES profiles(handle) ON DELETE CASCADE ON UPDATE CASCADE,
        visited_at timestamptz NOT NULL DEFAULT now(),
        referrer_domain text,
        section text NOT NULL DEFAULT 'home',
        vid text,
        is_logged_in boolean NOT NULL DEFAULT false
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS idx_visits_handle_visited ON visits(handle, visited_at DESC)`;

    const row = (await sql`
      SELECT table_name FROM information_schema.tables WHERE table_name = 'visits'
    `) as { table_name: string }[];

    return NextResponse.json({
      ok: true,
      exists: row.length > 0,
      message: 'visits table ready',
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
