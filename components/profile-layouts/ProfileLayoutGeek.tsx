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

const GEEK_TABS: { key: TabKey; labelKey: string; icon: LucideIcon }[] = [
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
 * C 极客风（终端 / 等宽）。
 * 模拟终端窗口：标题栏（红黄绿圆点 + 路径）+ 等宽字体 + 数据表格风格。
 * 暗色底，代码块风格的帖子/作品卡片。
 */
export function ProfileLayoutGeek({
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
  const avatar = profile.avatar_url;
  const links: LinkItem[] = Array.isArray(profile.links)
    ? (profile.links as LinkItem[])
    : [];
  const views = stats?.views ?? 0;
  const pCount = posts.length;
  const followers = stats?.followers ?? 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* 终端窗口 */}
      <div
        className="overflow-hidden rounded-lg border"
        style={{ borderColor: 'var(--rule)' }}
      >
        {/* 标题栏 */}
        <div
          className="flex items-center gap-2 px-4 py-2.5 text-xs opacity-80"
          style={{ background: 'color-mix(in srgb, var(--primary) 8%, var(--bg))' }}
        >
          <span className="inline-block h-3 w-3 rounded-full bg-red-500/70" />
          <span className="inline-block h-3 w-3 rounded-full bg-yellow-500/70" />
          <span className="inline-block h-3 w-3 rounded-full bg-green-500/70" />
          <span className="ml-2 font-mono opacity-50">~/profile/{profile.handle}</span>
        </div>

        {/* 终端内容区 */}
        <div className="p-5 sm:p-6">
          {/* 头部：头像 + 名字 + handle */}
          <div className="flex items-start gap-4 border-b pb-5" style={{ borderColor: 'var(--rule)' }}>
            <div
              className="h-14 w-14 shrink-0 rounded-md border"
              style={{
                borderColor: 'var(--rule)',
                backgroundImage: avatar ? `url(${avatar})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                background: avatar
                  ? undefined
                  : 'linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 60%, #000))',
              }}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-sm opacity-50">$</span>
                <h1 className="magazine-title text-xl">{profile.display_name}</h1>
              </div>
              <p className="font-mono text-xs opacity-50">@{profile.handle} · {t('designer')}</p>
              {profile.status_text && (
                <p className="mt-1 font-mono text-xs opacity-70">
                  <span className="text-[color:var(--primary)]">●</span> {profile.status_text}
                </p>
              )}
            </div>
          </div>

          {/* 数据表格 */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { label: t('views'), value: views },
              { label: t('posts'), value: pCount },
              { label: t('followers'), value: followers },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-md border px-3 py-2.5 text-center"
                style={{ borderColor: 'var(--rule)', background: 'color-mix(in srgb, var(--primary) 4%, transparent)' }}
              >
                <div className="magazine-title text-lg tabular-nums">{s.value}</div>
                <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider opacity-50">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* 链接 */}
          {links.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {links.map((l, i) => (
                <a
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-xs transition-colors hover:border-[color:var(--primary)]"
                  style={{ borderColor: 'var(--rule)' }}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="opacity-60">{linkIcon(l.url)}</span>
                  <span>{l.label}</span>
                  <ExternalLink className="h-2.5 w-2.5 opacity-40" />
                </a>
              ))}
            </div>
          )}

          {/* 打赏 */}
          <div className="mt-4">
            <TipDialog profile={profile} />
          </div>

          {/* Tab 栏 — 终端风格 */}
          <div className="mt-6 flex gap-1 border-b pb-0" style={{ borderColor: 'var(--rule)' }}>
            {GEEK_TABS.map((ti) => {
              const active = tab === ti.key;
              const Icon = ti.icon;
              return (
                <button
                  key={ti.key}
                  type="button"
                  onClick={() => setTab(ti.key)}
                  className={`flex items-center gap-1.5 border-b-2 px-3 py-2 font-mono text-xs transition-colors ${
                    active ? '' : 'opacity-50 hover:opacity-80'
                  }`}
                  style={{
                    borderColor: active ? 'var(--primary)' : 'transparent',
                    color: active ? 'var(--primary)' : 'var(--ink)',
                  }}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {t(ti.labelKey)}
                </button>
              );
            })}
          </div>

          {/* 内容区 */}
          <div className="mt-4">
            {tab === 'posts' &&
              (posts.length === 0 ? (
                <p className="py-8 font-mono text-center text-sm opacity-50">
                  <span className="opacity-30">$</span> {t('no_posts')}
                </p>
              ) : (
                <div className="space-y-3">
                  {posts.map((p) => (
                    <div
                      key={p.id}
                      className="rounded-md border p-4 font-mono text-sm"
                      style={{ borderColor: 'var(--rule)' }}
                    >
                      <PostCard post={p} />
                    </div>
                  ))}
                </div>
              ))}

            {tab === 'about' && (
              <div className="py-4 font-mono text-sm leading-relaxed opacity-90">
                <h3 className="magazine-title mb-3 text-base">
                  $ cat about.txt
                </h3>
                <pre className="whitespace-pre-wrap break-words opacity-90">
{`# ${profile.display_name}

${profile.bio || t('about_empty')}

${profile.status_text ? `> ${profile.status_text}` : ''}
---
handle:   @${profile.handle}
theme:    ${profile.theme_color || t('scheme_default')}
mode:     ${profile.theme_dark ? t('scheme_dark') : t('scheme_light')}
`}
                </pre>
              </div>
            )}

            {tab === 'works' &&
              (works.length === 0 ? (
                <p className="py-8 font-mono text-center text-sm opacity-50">
                  <span className="opacity-30">$</span> {t('no_works_public')}
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {works.map((w) => (
                    <div
                      key={w.id}
                      className="overflow-hidden rounded-md border"
                      style={{ borderColor: 'var(--rule)' }}
                    >
                      <WorkCard work={w} />
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
