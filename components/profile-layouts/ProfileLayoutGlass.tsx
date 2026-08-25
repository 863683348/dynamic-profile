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

const GLASS_TABS: { key: TabKey; labelKey: string; icon: LucideIcon }[] = [
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
 * D 玻璃拟态风。
 * 无侧栏/内容区分离。资料卡片浮动在顶部，帖子以瀑布流/网格形式展示。
 * 全局 backdrop-blur + 半透明卡片 + 渐变背景。
 */
export function ProfileLayoutGlass({
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

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-10">
      {/* 浮动资料卡 — 横向宽幅 */}
      <div
        className="glass-panel mb-8 overflow-hidden rounded-2xl"
        style={{
          background: 'rgba(255,255,255,0.5)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.6)',
        }}
      >
        {/* 封面条 */}
        <div
          className="h-28 w-full sm:h-36"
          style={
            cover
              ? {
                  backgroundImage: `url(${cover})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : {
                  background:
                    'linear-gradient(135deg, color-mix(in srgb, var(--primary) 60%, #fff), var(--primary))',
                }
          }
        />
        <div className="px-6 pb-6">
          {/* 头像 + 名字横排 */}
          <div className="-mt-12 flex items-end gap-4">
            <div
              className="h-20 w-20 shrink-0 rounded-2xl border-2 shadow-lg sm:h-24 sm:w-24"
              style={{
                borderColor: 'rgba(255,255,255,0.9)',
                backgroundImage: avatar ? `url(${avatar})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                background: avatar
                  ? undefined
                  : 'linear-gradient(135deg, color-mix(in srgb, var(--primary) 75%, #fff), var(--primary))',
              }}
            />
            <div className="min-w-0 flex-1 pb-1">
              <h1 className="magazine-title text-2xl sm:text-3xl">{profile.display_name}</h1>
              <p className="text-sm opacity-60">@{profile.handle}</p>
            </div>
          </div>

          {/* 简介 + 链接 + 统计 — 三列网格 */}
          {profile.bio && (
            <p className="mt-4 break-words text-sm leading-relaxed opacity-80">
              {profile.bio}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            {links.map((l, i) => (
              <a
                key={i}
                className="inline-flex items-center gap-1.5 rounded-full border bg-white/40 px-3 py-1 text-xs backdrop-blur-sm transition-all hover:bg-white/60"
                style={{ borderColor: 'rgba(0,0,0,0.08)' }}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {linkIcon(l.url)}
                {l.label}
                <ExternalLink className="h-2.5 w-2.5 opacity-50" />
              </a>
            ))}
          </div>

          {/* 统计 — 胶囊标签 */}
          <div className="mt-3 flex gap-2">
            {[
              { v: views, l: t('views') },
              { v: pCount, l: t('posts') },
              { v: followers, l: t('followers') },
            ].map((s) => (
              <span
                key={s.l}
                className="rounded-full bg-white/40 px-3 py-1 text-xs font-medium backdrop-blur-sm tabular-nums"
              >
                <span className="magazine-title">{s.v}</span>{' '}
                <span className="opacity-60">{s.l}</span>
              </span>
            ))}
          </div>

          <div className="mt-3">
            <TipDialog profile={profile} />
          </div>
        </div>
      </div>

      {/* Tab 栏 — 玻璃胶囊风格 */}
      <div className="mb-4 flex gap-2 overflow-x-auto px-1">
        {GLASS_TABS.map((ti) => {
          const active = tab === ti.key;
          const Icon = ti.icon;
          return (
            <button
              key={ti.key}
              type="button"
              onClick={() => setTab(ti.key)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all ${
                active ? '' : 'opacity-60 hover:opacity-80'
              }`}
              style={{
                background: active ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.25)',
                color: active ? 'var(--primary)' : 'var(--ink)',
                boxShadow: active ? '0 2px 12px rgba(0,0,0,0.06)' : undefined,
              }}
            >
              <Icon className="h-3.5 w-3.5" />
              {t(ti.labelKey)}
            </button>
          );
        })}
      </div>

      {/* 内容区 — 瀑布流 / 网格 */}
      <div>
        {tab === 'posts' &&
          (posts.length === 0 ? (
            <p className="py-12 text-center text-sm opacity-50">{t('no_posts')}</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <div
                  key={p.id}
                  className="glass-card rounded-xl p-5"
                  style={{
                    background: 'rgba(255,255,255,0.45)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.55)',
                  }}
                >
                  <PostCard post={p} />
                </div>
              ))}
            </div>
          ))}

        {tab === 'about' && (
          <div
            className="glass-card rounded-xl p-6"
            style={{
              background: 'rgba(255,255,255,0.45)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.55)',
            }}
          >
            <h3 className="magazine-title text-xl">
              {t('about_title', { name: profile.display_name ?? '' })}
            </h3>
            <p className="mt-3 leading-relaxed opacity-90">
              {profile.bio || t('about_empty')}
            </p>
            {profile.status_text && (
              <p className="mt-4 flex items-center gap-2 text-sm opacity-80">
                <span className="status-dot" />
                {t('about_status')} {profile.status_text}
              </p>
            )}
            <dl className="mt-5 space-y-2 text-sm opacity-80">
              <div className="flex gap-3">
                <dt className="w-24 opacity-60">{t('about_handle')}</dt>
                <dd>@{profile.handle}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-24 opacity-60">{t('about_theme')}</dt>
                <dd className="flex items-center gap-2">
                  <span
                    className="inline-block h-3 w-3 rounded-sm"
                    style={{ background: profile.theme_color || 'var(--primary)' }}
                  />
                  {profile.theme_color || t('scheme_default')}
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-24 opacity-60">{t('about_scheme')}</dt>
                <dd>{profile.theme_dark ? t('scheme_dark') : t('scheme_light')}</dd>
              </div>
            </dl>
          </div>
        )}

        {tab === 'works' &&
          (works.length === 0 ? (
            <p className="py-12 text-center text-sm opacity-50">{t('no_works_public')}</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {works.map((w) => (
                <div
                  key={w.id}
                  className="overflow-hidden rounded-xl"
                  style={{
                    background: 'rgba(255,255,255,0.45)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.55)',
                  }}
                >
                  <WorkCard work={w} />
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
