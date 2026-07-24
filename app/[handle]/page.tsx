import { notFound } from 'next/navigation';
import type { CSSProperties } from 'react';
import { sql } from '@/lib/db/index';
import {
  getProfileByHandle,
  getStats,
} from '@/lib/db/queries';
import type { Post, Profile, Stats } from '@/lib/types';
import { ProfileCard } from '@/components/ProfileCard';
import { Tabs } from '@/components/Tabs';
import { ViewTracker } from '@/components/ViewTracker';
import { TopControls } from '@/components/TopControls';
import { ProfileThemeInit } from '@/components/ProfileThemeInit';

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://dynamic-profile.shop';

export const dynamic = "force-dynamic";

/**
 * 安全的 handle 转义（防止 SQL 注入）。
 * handle 已通过 HANDLE_RE = /^[a-z0-9_]{3,20}$/ 校验，
 * 这里做双重防护，确保只保留合法字符。
 */
function escHandle(handle: string): string {
  return handle.replace(/[^a-z0-9_]/g, '').slice(0, 20);
}

export default async function ProfilePage({
  params,
}: {
  params: { handle: string };
}) {
  const handle = params.handle;
  const profile = await getProfileByHandle(handle);
  if (!profile) notFound();

  // 使用字符串拼接查询（绕过 @neondatabase/serverless 在 RSC 上下文中
  // 对某些 handle 值的参数化查询返回空结果的 bug）
  const safeH = escHandle(handle);
  const postsRaw = await sql(
    [`SELECT id, handle, title, content, source, category, status, created_at FROM posts WHERE handle = '${safeH}' AND status = 'published' ORDER BY created_at DESC`] as any,
  );
  const posts = postsRaw as Post[];

  const stats = await getStats(handle);

  const themeStyle = (profile.theme_color
    ? { '--primary': profile.theme_color }
    : {}) as unknown as CSSProperties;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: profile.display_name,
      alternateName: `@${profile.handle}`,
      description: profile.bio || '',
      url: `${SITE}/${profile.handle}`,
      ...(profile.avatar_url ? { image: profile.avatar_url } : {}),
    },
  };

  return (
    <main className="theme-surface min-h-screen" style={themeStyle}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ViewTracker handle={handle} />
      <script
        dangerouslySetInnerHTML={{
          __html: `try{var t=localStorage.getItem('theme');if(t!=='dark'&&t!=='light'){document.documentElement.dataset.theme=${profile.theme_dark ? "'dark'" : "'light'"};}}catch(e){}`,
        }}
      />
      <ProfileThemeInit dark={profile.theme_dark} />
      <TopControls />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-10 md:grid md:grid-cols-[320px_1fr] md:gap-8">
        <aside className="md:sticky md:top-4 md:self-start">
          <ProfileCard profile={profile} stats={stats} postCount={posts.length} />
        </aside>
        <div>
          <Tabs posts={posts} profile={profile} />
        </div>
      </div>

      {/* 页脚品牌标识：仅免费版显示，Pro 去除（收付款 ⑥ 权益之一） */}
      {profile.plan !== 'pro' && (
        <footer className="mx-auto max-w-5xl px-4 pb-10 pt-2 text-center text-xs opacity-50">
          <a
            href={SITE}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            由 动态主页 强力驱动
          </a>
        </footer>
      )}
    </main>
  );
}
