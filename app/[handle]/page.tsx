import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import {
  getCachedProfileByHandle,
  getCachedPublishedPosts,
  getCachedStats,
} from '@/lib/db/queries';
import type { Post, Profile, Stats } from '@/lib/types';
import { ProfileCard } from '@/components/ProfileCard';
import { Tabs } from '@/components/Tabs';
import { ViewTracker } from '@/components/ViewTracker';
import { ProfileThemeInit } from '@/components/ProfileThemeInit';
import { AdSlot } from '@/components/AdSlot';

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://dynamic-profile.shop';

// ISR 缓存 5 分钟：个人主页数据（资料/帖子/统计）变更不频繁，
// 此前为 force-dynamic 导致每次请求都执行函数 + 3 次 DB 查询，
// 是 Fast Origin Transfer（输入输出）居高不下的主因。
// 浏览量统计由客户端 ViewTracker 独立打 API，不受影响。
export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const profile = await getCachedProfileByHandle(params.handle);
  if (!profile) {
    return { title: 'User not found' };
  }

  const displayName = profile.display_name || `@${profile.handle}`;
  const bio = profile.bio || `${displayName}'s personal homepage — portfolio, social links & bio`;
  const title = `${displayName} · Portfolio & Personal Brand on Dynamic Profile`;
  const desc = bio.length > 155 ? bio.slice(0, 152) + '...' : bio;

  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      url: `${SITE}/${profile.handle}`,
      ...(profile.avatar_url ? { images: [{ url: profile.avatar_url }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
    },
    alternates: {
      canonical: `${SITE}/${profile.handle}`,
    },
  };
}

export default async function ProfilePage({
  params,
}: {
  params: { handle: string };
}) {
  const handle = params.handle;
  const profile = await getCachedProfileByHandle(handle);
  if (!profile) notFound();

  // 已发布内容走数据缓存（unstable_cache，revalidate=300），
  // 与 getProfileByHandle / getStats 一同打破 neon no-store 对 ISR 的阻断。
  const posts = await getCachedPublishedPosts(handle);

  const stats = await getCachedStats(handle);

  const themeStyle = (profile.theme_color
    ? { '--primary': profile.theme_color }
    : {}) as unknown as CSSProperties;

  const pageStyle = profile.style || 'magazine';

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
    <main className="theme-surface min-h-screen" style={themeStyle} data-style={pageStyle}>
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

      {/* 内容广告位（仅生产环境 + 已配置 AdSense 时展示） */}
      <AdSlot className="mx-auto my-10 max-w-5xl px-4" />
    </main>
  );
}
