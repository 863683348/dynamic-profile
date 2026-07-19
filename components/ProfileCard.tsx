'use client';

import { ExternalLink, Github, Globe, Mail, Twitter } from 'lucide-react';
import type { Profile, Stats } from '@/lib/types';
import { useI18n } from '@/lib/i18n';

type LinkItem = { label: string; url: string };

function linkIcon(url: string) {
  if (url.includes('github.com')) return <Github className="h-3.5 w-3.5" />;
  if (url.includes('twitter.com') || url.includes('x.com')) return <Twitter className="h-3.5 w-3.5" />;
  if (url.startsWith('mailto:')) return <Mail className="h-3.5 w-3.5" />;
  return <Globe className="h-3.5 w-3.5" />;
}

export function ProfileCard({
  profile,
  stats,
  postCount,
}: {
  profile: Profile;
  stats?: Stats | null;
  postCount?: number;
}) {
  const { t } = useI18n();
  const cover = profile.cover_url;
  const avatar = profile.avatar_url;
  const links: LinkItem[] = Array.isArray(profile.links)
    ? (profile.links as LinkItem[])
    : [];
  const views = stats?.views ?? 0;
  const posts = postCount ?? 0;
  const followers = stats?.followers ?? 0;

  return (
    <article className="paper-card overflow-hidden">
      {/* 封面大图（无图时用 terracotta 渐变占位） */}
      <div
        className="h-32 w-full sm:h-40"
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

      <div className="px-5 pb-5">
        {/* 头像（圆角叠加在封面上） */}
        <div className="-mt-12 mb-3">
          <div
            className="h-20 w-20 rounded-lg border-2 shadow-sm sm:h-24 sm:w-24"
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
        </div>

        <h1 className="magazine-title break-words text-2xl sm:text-3xl">{profile.display_name}</h1>
        <p className="mt-1 text-sm opacity-70">@{profile.handle}</p>

        {profile.status_text && (
          <p className="mt-3 flex items-center gap-2 break-words text-sm">
            <span className="status-dot" />
            <span className="opacity-90">{profile.status_text}</span>
          </p>
        )}

        {profile.bio && (
          <p className="mt-4 break-words text-[0.9375rem] leading-relaxed opacity-90">
            {profile.bio}
          </p>
        )}

        {links.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {links.map((l, i) => (
              <a
                key={i}
                className="link-chip"
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {linkIcon(l.url)}
                {l.label}
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
            ))}
          </div>
        )}

        {/* 统计条：浏览 / 动态 / 关注 */}
        <div className="double-rule mt-5 flex items-center justify-between px-1 py-2 text-sm">
          <span>
            <strong className="magazine-title">{views}</strong> {t('views')}
          </span>
          <span>
            <strong className="magazine-title">{posts}</strong> {t('posts')}
          </span>
          <span>
            <strong className="magazine-title">{followers}</strong> {t('followers')}
          </span>
        </div>
      </div>
    </article>
  );
}
