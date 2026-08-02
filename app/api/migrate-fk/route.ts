import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

/**
 * 一次性迁移：为 posts.handle / stats.handle 引用 profiles(handle) 的外键
 * 增加 ON UPDATE CASCADE（原仅有 ON DELETE CASCADE，导致改 handle 时被 FK 拦截）。
 * 访问一次即可；DROP/ADD 带 IF EXISTS 保证幂等。
 */
export async function GET() {
  const results: string[] = [];
  try {
    // posts
    await sql`ALTER TABLE posts DROP CONSTRAINT IF EXISTS posts_handle_fkey`;
    await sql`ALTER TABLE posts ADD CONSTRAINT posts_handle_fkey
      FOREIGN KEY (handle) REFERENCES profiles(handle) ON DELETE CASCADE ON UPDATE CASCADE`;
    results.push('posts_handle_fkey -> ON UPDATE CASCADE');

    // stats
    await sql`ALTER TABLE stats DROP CONSTRAINT IF EXISTS stats_handle_fkey`;
    await sql`ALTER TABLE stats ADD CONSTRAINT stats_handle_fkey
      FOREIGN KEY (handle) REFERENCES profiles(handle) ON DELETE CASCADE ON UPDATE CASCADE`;
    results.push('stats_handle_fkey -> ON UPDATE CASCADE');

    return NextResponse.json({ ok: true, results });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message, partial: results }, { status: 500 });
  }
}
