'use client';

import { useState } from 'react';
import { PenLine, User, FolderOpen, type LucideIcon } from 'lucide-react';
import type { Post, Profile } from '@/lib/types';
import { PostCard } from './PostCard';
import { useI18n } from '@/lib/i18n';

type TabKey = 'posts' | 'about' | 'works';

const TABS: { key: TabKey; labelKey: string; icon: LucideIcon }[] = [
  { key: 'posts', labelKey: 'tab_posts', icon: PenLine },
  { key: 'about', labelKey: 'tab_about', icon: User },
  { key: 'works', labelKey: 'tab_works', icon: FolderOpen },
];

export function Tabs({ posts, profile }: { posts: Post[]; profile: Profile }) {
  const { t } = useI18n();
  const [tab, setTab] = useState<TabKey>('posts');

  return (
    <section>
      {/* Tab 头 */}
      <div className="double-rule mb-2 flex gap-4 overflow-x-auto px-1 sm:gap-6">
        {TABS.map((tabItem) => {
          const active = tab === tabItem.key;
          const Icon = tabItem.icon;
          return (
            <button
              key={tabItem.key}
              type="button"
              onClick={() => setTab(tabItem.key)}
              className="flex shrink-0 items-center gap-2 whitespace-nowrap border-b-2 py-3 text-sm font-medium transition-colors"
              style={{
                borderColor: active ? 'var(--primary)' : 'transparent',
                color: active ? 'var(--primary)' : 'var(--ink)',
                opacity: active ? 1 : 0.7,
              }}
            >
              <Icon className="h-4 w-4" />
              {t(tabItem.labelKey)}
            </button>
          );
        })}
      </div>

      <div className="pt-2">
        {tab === 'posts' &&
          (posts.length === 0 ? (
            <p className="py-10 text-center text-sm opacity-60">{t('no_posts')}</p>
          ) : (
            <div className="posts-list">
              {posts.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          ))}

        {tab === 'about' && (
          <div className="py-6">
            <h3 className="magazine-title text-xl">
              {t('about_title', { name: profile.display_name ?? '' })}
            </h3>
            <p className="mt-3 leading-relaxed opacity-90">
              {profile.bio || t('about_empty')}
            </p>
            {profile.status_text && (
              <p className="mt-4 flex items-center gap-2 text-sm opacity-80">
                <span className="status-dot" />
                {t('about_status')}
                {profile.status_text}
              </p>
            )}
            <dl className="mt-5 space-y-2 text-sm opacity-80">
              <div className="flex gap-3">
                <dt className="w-20 opacity-60">{t('about_handle')}</dt>
                <dd>@{profile.handle}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-20 opacity-60">{t('about_theme')}</dt>
                <dd className="flex items-center gap-2">
                  <span
                    className="inline-block h-3 w-3 rounded-sm"
                    style={{ background: profile.theme_color || 'var(--primary)' }}
                  />
                  {profile.theme_color || t('scheme_default')}
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-20 opacity-60">{t('about_scheme')}</dt>
                <dd>{profile.theme_dark ? t('scheme_dark') : t('scheme_light')}</dd>
              </div>
            </dl>
          </div>
        )}

        {tab === 'works' && (
          <div className="py-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="paper-card flex h-40 items-center justify-center text-sm opacity-50"
                >
                  {t('works_placeholder', { n: i + 1 })}
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs opacity-50">{t('works_soon')}</p>
          </div>
        )}
      </div>
    </section>
  );
}
