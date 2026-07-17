'use client';

import { useState } from 'react';
import { PenLine, User, FolderOpen, type LucideIcon } from 'lucide-react';
import type { Post, Profile } from '@/lib/types';
import { PostCard } from './PostCard';

type TabKey = 'posts' | 'about' | 'works';

const TABS: { key: TabKey; label: string; icon: LucideIcon }[] = [
  { key: 'posts', label: '动态', icon: PenLine },
  { key: 'about', label: '关于', icon: User },
  { key: 'works', label: '作品', icon: FolderOpen },
];

export function Tabs({ posts, profile }: { posts: Post[]; profile: Profile }) {
  const [tab, setTab] = useState<TabKey>('posts');

  return (
    <section>
      {/* Tab 头 */}
      <div className="double-rule mb-2 flex gap-4 overflow-x-auto px-1 sm:gap-6">
        {TABS.map((t) => {
          const active = tab === t.key;
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className="flex shrink-0 items-center gap-2 whitespace-nowrap border-b-2 py-3 text-sm font-medium transition-colors"
              style={{
                borderColor: active ? 'var(--primary)' : 'transparent',
                color: active ? 'var(--primary)' : 'var(--ink)',
                opacity: active ? 1 : 0.7,
              }}
            >
              <Icon className="h-4 w-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="pt-2">
        {tab === 'posts' &&
          (posts.length === 0 ? (
            <p className="py-10 text-center text-sm opacity-60">还没有发布动态。</p>
          ) : (
            <div className="posts-list">
              {posts.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          ))}

        {tab === 'about' && (
          <div className="py-6">
            <h3 className="magazine-title text-xl">关于 {profile.display_name}</h3>
            <p className="mt-3 leading-relaxed opacity-90">
              {profile.bio || '这个人很神秘，还没填写简介。'}
            </p>
            {profile.status_text && (
              <p className="mt-4 flex items-center gap-2 text-sm opacity-80">
                <span className="status-dot" />
                当前状态：{profile.status_text}
              </p>
            )}
            <dl className="mt-5 space-y-2 text-sm opacity-80">
              <div className="flex gap-3">
                <dt className="w-20 opacity-60">Handle</dt>
                <dd>@{profile.handle}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-20 opacity-60">主题色</dt>
                <dd className="flex items-center gap-2">
                  <span
                    className="inline-block h-3 w-3 rounded-sm"
                    style={{ background: profile.theme_color || 'var(--primary)' }}
                  />
                  {profile.theme_color || '默认'}
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-20 opacity-60">配色</dt>
                <dd>{profile.theme_dark ? '暗色' : '浅色'}</dd>
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
                  作品占位 {i + 1}
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs opacity-50">作品集模块即将上线</p>
          </div>
        )}
      </div>
    </section>
  );
}
