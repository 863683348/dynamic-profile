'use client';

import { ExternalLink, Github, Globe, Mail, Twitter } from 'lucide-react';
import { Tabs } from '@/components/Tabs';
import type { Post, Work, Profile, Stats } from '@/lib/types';
import { useI18n } from '@/lib/i18n';
import { TipDialog } from '@/components/TipDialog';

type LinkItem = { label: string; url: string };

function linkIcon(url: string) {
  if (url.includes('github.com')) return <Github className="h-3.5 w-3.5" />;
  if (url.includes('twitter.com') || url.includes('x.com')) return <Twitter className="h-3.5 w-3.5" />;
  if (url.startsWith('mailto:')) return <Mail className="h-3.5 w-3.5" />;
  return <Globe className="h-3.5 w-3.5" />;
}

/**
 * A 简约风。
 * 单列居中、无侧栏。资料以紧凑横条（头像+名字+简介+链接）排在顶部，
 * 内容区全宽展示，最大化留白。
 */
export function ProfileLayoutMinimal({
  profile,
  posts,
  works,
  stats,
}: {
  profile: Profile;
  posts: Post[];
  works: Work[];
  stats: Stats | null;
}) {
  const { t } = useI18n();
  const cover = profile.cover_url;
  const avatar = profile.avatar_url;
  const links: LinkItem[] = Array.isArray(profile.links)
    ? (profile.links as LinkItem[])
    : [];
  const views = stats?.views ?? 0;
  const pCount = posts.length;
  const followers = stats?.followers ?? 0;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      {/* 封面（窄幅） */}
      <div
        className="mb-6 h-28 w-full rounded-xl sm:h-32"
        style={
          cover
            ? {
                backgroundImage: `url(${cover})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : {
                background:
                  'linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 55%, #000))',
              }
        }
      />

      {/* 紧凑资料条：头像 + 名字 + 简介 + 链接 横排/紧凑 */}
      <div className="-mt-14 mb-8">
        <div className="flex items-end gap-4">
          {/* 头像 */}
          <div
            className="h-20 w-20 shrink-0 rounded-xl border-2 shadow-sm sm:h-24 sm:w-24"
            style={{
              borderColor: 'var(--paper)',
              backgroundImage: avatar ? `url(${avatar})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              background: avatar
                ? undefined
                : 'linear-gradient(135deg, color-mix(in srgb, var(--primary) 75%, #fff), var(--primary))',
            }}
          />
          {/* 名字 + handle + bio */}
          <div className="min-w-0 flex-1 pb-1">
            <h1 className="magazine-title truncate text-2xl sm:text-3xl">
              {profile.display_name}
            </h1>
            <p className="text-sm opacity-60">@{profile.handle}</p>
            {profile.bio && (
              <p className="mt-2 line-clamp-2 break-words text-sm leading-relaxed opacity-80">
                {profile.bio}
              </p>
            )}
          </div>
        </div>

        {/* 链接 + 统计 + 打赏 */}
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          {links.map((l, i) => (
            <a
              key={i}
              className="link-chip inline-flex items-center gap-1.5 text-xs"
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {linkIcon(l.url)}
              {l.label}
              <ExternalLink className="h-2.5 w-2.5 opacity-50" />
            </a>
          ))}
          <span className="ml-auto text-xs opacity-50 tabular-nums">
            {views} {t('views')} · {pCount} {t('posts')} · {followers} {t('followers')}
          </span>
        </div>

        <div className="mt-3">
          <TipDialog profile={profile} />
        </div>
      </div>

      {/* 分隔线 */}
      <hr className="mb-6 border-[color:var(--rule)]" />

      {/* 全宽内容区 */}
      <Tabs posts={posts} works={works} profile={profile} />
    </div>
  );
}
