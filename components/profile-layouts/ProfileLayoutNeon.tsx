'use client';

import { ExternalLink, Github, Globe, Mail, Twitter } from 'lucide-react';
import type { Post, Work, Profile, Stats } from '@/lib/types';
import { useI18n } from '@/lib/i18n';
import { TipDialog } from '@/components/TipDialog';
import { PostCard } from '@/components/PostCard';
import { WorkCard } from '@/components/WorkCard';
import { useState } from 'react';
import { PenLine, User, FolderOpen, type LucideIcon } from 'lucide-react';

type LinkItem = { label: string; url: string };
type TabKey = 'posts' | 'about' | 'works';

const NEON_TABS: { key: TabKey; labelKey: string; icon: LucideIcon }[] = [
  { key: 'posts', labelKey: 'tab_posts', icon: PenLine },
  { key: 'about', labelKey: 'tab_about', icon: User },
  { key: 'works', labelKey: 'tab_works', icon: FolderOpen },
];

function linkIcon(url: string) {
  if (url.includes('github.com')) return <Github className="h-3 w-3" />;
  if (url.includes('twitter.com') || url.includes('x.com')) return <Twitter className="h-3 w-3" />;
  if (url.startsWith('mailto:')) return <Mail className="h-3 w-3" />;
  return <Globe className="h-3 w-3" />;
}

/**
 * E 霓虹赛博风。
 * 暗色底 + 发光边框 + 大写宽距标题 + 水平分区。
 * 扫描线背景纹理，卡片带霓虹光晕。
 */
export function ProfileLayoutNeon({
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
  const [tab, setTab] = useState<TabKey>('posts');
  const cover = profile.cover_url;
  const avatar = profile.avatar_url;
  const links: LinkItem[] = Array.isArray(profile.links)
    ? (profile.links as LinkItem[])
    : [];
  const views = stats?.views ?? 0;
  const pCount = posts.length;
  const followers = stats?.followers ?? 0;

  const glowStyle = {
    borderColor: `color-mix(in srgb, var(--primary) 45%, var(--rule))`,
    boxShadow: `0 0 16px color-mix(in srgb, var(--primary) 15%, transparent), inset 0 0 16px color-mix(in srgb, var(--primary) 5%, transparent)`,
  };

  return (
    <div className="neon-page mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* ====== SECTION 1: HERO ====== */}
      <section
        className="mb-8 overflow-hidden rounded-lg border p-6"
        style={glowStyle}
      >
        {/* 封面 */}
        <div
          className="-mx-6 -mt-6 mb-5 h-32 w-[calc(100%+3rem)] sm:h-40"
          style={
            cover
              ? {
                  backgroundImage: `url(${cover})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : {
                  background:
                    'linear-gradient(135deg, color-mix(in srgb, var(--primary) 70%, #000), var(--primary), #000)',
                }
          }
        />

        {/* 头像 + 名字 — 大字发光标题 */}
        <div className="flex items-start gap-5">
          <div
            className="h-20 w-20 shrink-0 rounded-lg border-2 sm:h-24 sm:w-24"
            style={{
              ...glowStyle,
              backgroundImage: avatar ? `url(${avatar})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              background: avatar
                ? undefined
                : 'linear-gradient(135deg, var(--primary), #000)',
            }}
          />
          <div className="min-w-0 flex-1">
            <h1
              className="magazine-title break-words text-2xl uppercase tracking-wider sm:text-3xl"
              style={{
                textShadow: `0 0 12px color-mix(in srgb, var(--primary) 50%, transparent)`,
              }}
            >
              {profile.display_name}
            </h1>
            <p className="mt-1 text-xs uppercase tracking-widest opacity-50">
              @{profile.handle} // {t('designer')}
            </p>
            {profile.status_text && (
              <p className="mt-2 text-sm opacity-70">
                <span
                  style={{ textShadow: `0 0 8px color-mix(in srgb, var(--primary) 40%, transparent)` }}
                >
                  ▸ {profile.status_text}
                </span>
              </p>
            )}
          </div>
        </div>

        {/* 简介 */}
        {profile.bio && (
          <p className="mt-4 break-words text-sm leading-relaxed opacity-80">
            {profile.bio}
          </p>
        )}

        {/* 链接 — 发光 chip */}
        {links.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {links.map((l, i) => (
              <a
                key={i}
                className="link-chip inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs transition-all hover:brightness-125"
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  borderColor: `color-mix(in srgb, var(--primary) 35%, var(--rule))`,
                  boxShadow: `0 0 10px color-mix(in srgb, var(--primary) 12%, transparent)`,
                }}
              >
                {linkIcon(l.url)}
                {l.label}
                <ExternalLink className="h-2.5 w-2.5 opacity-50" />
              </a>
            ))}
          </div>
        )}
      </section>

      {/* ====== SECTION 2: STATS BAR ====== */}
      <section
        className="mb-8 grid grid-cols-3 gap-3"
      >
        {[
          { v: views, l: t('views'), icon: '◈' },
          { v: pCount, l: t('posts'), icon: '▣' },
          { v: followers, l: t('followers'), icon: '◎' },
        ].map((s) => (
          <div
            key={s.l}
            className="rounded-md border px-4 py-3 text-center"
            style={glowStyle}
          >
            <div className="text-xs uppercase tracking-widest opacity-40">{s.icon} {s.l}</div>
            <div className="magazine-title mt-1 text-xl tabular-nums">{s.v}</div>
          </div>
        ))}
      </section>

      {/* 打赏 */}
      <div className="-mt-6 mb-8">
        <TipDialog profile={profile} />
      </div>

      {/* ====== SECTION 3: CONTENT TABS ====== */}
      <section>
        {/* Tab 栏 — 霓虹下划线风格 */}
        <div className="mb-5 flex gap-1 overflow-x-auto border-b pb-px" style={{ borderColor: `color-mix(in srgb, var(--primary) 25%, var(--rule))` }}>
          {NEON_TABS.map((ti) => {
            const active = tab === ti.key;
            const Icon = ti.icon;
            return (
              <button
                key={ti.key}
                type="button"
                onClick={() => setTab(ti.key)}
                className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-medium uppercase tracking-wider transition-all ${
                  active ? '' : 'opacity-50 hover:opacity-80'
                }`}
                style={{
                  borderColor: active ? 'var(--primary)' : 'transparent',
                  color: active ? 'var(--primary)' : 'var(--ink)',
                  textShadow: active ? `0 0 8px color-mix(in srgb, var(--primary) 35%, transparent)` : undefined,
                }}
              >
                <Icon className="h-3.5 w-3.5" />
                {t(ti.labelKey)}
              </button>
            );
          })}
        </div>

        {/* 内容区 */}
        <div>
          {tab === 'posts' &&
            (posts.length === 0 ? (
              <p className="py-12 text-center text-sm opacity-50">
                <span className="uppercase tracking-widest">[ {t('no_posts')} ]</span>
              </p>
            ) : (
              <div className="space-y-4">
                {posts.map((p) => (
                  <article
                    key={p.id}
                    className="rounded-md border p-5"
                    style={glowStyle}
                  >
                    <PostCard post={p} />
                  </article>
                ))}
              </div>
            ))}

          {tab === 'about' && (
            <div
              className="rounded-md border p-6"
              style={glowStyle}
            >
              <h3
                className="magazine-title text-lg uppercase tracking-wider"
                style={{
                  textShadow: `0 0 8px color-mix(in srgb, var(--primary) 30%, transparent)`,
                }}
              >
                // {t('about_title', { name: profile.display_name ?? '' })}
              </h3>
              <pre className="mt-4 whitespace-pre-wrap break-words font-mono text-xs leading-relaxed opacity-80">
{`/*
 * ${profile.display_name} (@${profile.handle})
 */

${profile.bio || t('about_empty')}

${profile.status_text ? `> STATUS: ${profile.status_text}` : ''}

--- META ---
handle   @${profile.handle}
theme   ${profile.theme_color || t('scheme_default')}
mode     ${profile.theme_dark ? 'DARK' : 'LIGHT'}
`}
              </pre>
            </div>
          )}

          {tab === 'works' &&
            (works.length === 0 ? (
              <p className="py-12 text-center text-sm opacity-50">
                <span className="uppercase tracking-widest">[ {t('no_works_public')} ]</span>
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {works.map((w) => (
                  <div
                    key={w.id}
                    className="overflow-hidden rounded-md border"
                    style={glowStyle}
                  >
                    <WorkCard work={w} />
                  </div>
                ))}
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
