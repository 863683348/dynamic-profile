'use client';

import { useState } from 'react';
import { Send, Github, RefreshCw, Loader2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import type { PostCategory } from '@/lib/types';

export type PostDraft = {
  title: string;
  content: string;
  category: PostCategory;
  status: 'draft' | 'published';
  source?: 'manual' | 'github';
};

type GithubActivity = {
  id: string;
  type: string;
  repo: string;
  title: string;
  summary: string;
  url: string;
  created_at: string;
  category: 'post' | 'work';
};

export function PostComposer({
  onPublish,
  saving,
}: {
  onPublish: (data: PostDraft) => void;
  saving: boolean;
}) {
  const { t } = useI18n();
  const [source, setSource] = useState<'manual' | 'github'>('manual');

  // 手动模式
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<PostCategory>('post');
  const [status, setStatus] = useState<'draft' | 'published'>('published');

  // GitHub 模式
  const [ghUser, setGhUser] = useState('');
  const [ghItems, setGhItems] = useState<GithubActivity[]>([]);
  const [ghLoading, setGhLoading] = useState(false);
  const [ghError, setGhError] = useState<string | null>(null);

  function handleManualSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onPublish({ title: title.trim(), content: content.trim(), category, status });
    setTitle('');
    setContent('');
    setCategory('post');
    setStatus('published');
  }

  async function loadGithub() {
    const user = ghUser.trim();
    if (!user) return;
    setGhLoading(true);
    setGhError(null);
    setGhItems([]);
    try {
      const res = await fetch(`/api/github/events?user=${encodeURIComponent(user)}`);
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.message ?? t('gh_err'));
      }
      const j = await res.json();
      setGhItems(j.items ?? []);
    } catch (e) {
      setGhError(e instanceof Error ? e.message : t('gh_err'));
    } finally {
      setGhLoading(false);
    }
  }

  function importGithub(item: GithubActivity) {
    onPublish({
      title: item.title,
      content: `${item.summary}\n${item.url}`,
      category: item.category,
      status: 'published',
      source: 'github',
    });
  }

  return (
    <form
      onSubmit={source === 'manual' ? handleManualSubmit : (e) => e.preventDefault()}
      className="paper-card space-y-3 p-5"
    >
      <div className="flex items-center justify-between">
        <h3 className="magazine-title text-lg">{t('pc_title')}</h3>
      </div>

      {/* 来源切换：手动 / GitHub */}
      <div className="flex gap-2" role="radiogroup" aria-label={t('pc_source_label')}>
        {(['manual', 'github'] as const).map((s) => (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={source === s}
            onClick={() => setSource(s)}
            className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
              source === s
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-gray-300 opacity-70 hover:border-gray-400 hover:opacity-100'
            }`}
          >
            {s === 'github' ? <Github className="h-4 w-4" /> : <Send className="h-4 w-4" />}
            {s === 'github' ? t('pc_src_github') : t('pc_src_manual')}
          </button>
        ))}
      </div>

      {source === 'manual' ? (
        <>
          {/* 类型切换：动态 / 作品 */}
          <div className="flex gap-2" role="radiogroup" aria-label={t('pc_category_label')}>
            {(['post', 'work'] as PostCategory[]).map((cat) => (
              <button
                key={cat}
                type="button"
                role="radio"
                aria-checked={category === cat}
                onClick={() => setCategory(cat)}
                className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                  category === cat
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-gray-300 opacity-70 hover:border-gray-400 hover:opacity-100'
                }`}
              >
                {cat === 'post' ? t('pc_cat_post') : t('pc_cat_work')}
              </button>
            ))}
          </div>

          <input
            className="mag-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t('pc_ph_title')}
          />
          <textarea
            className="mag-input min-h-[80px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t('pc_ph_content')}
          />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={status === 'published'}
                onChange={(e) => setStatus(e.target.checked ? 'published' : 'draft')}
              />
              {t('pc_now')}
            </label>
            <button
              type="submit"
              className="mag-btn shrink-0"
              disabled={saving || !title.trim()}
            >
              <Send className="h-4 w-4" />
              {saving ? t('pc_saving') : status === 'published' ? t('pc_publish') : t('pc_draft')}
            </button>
          </div>
        </>
      ) : (
        <div className="space-y-3">
          <p className="text-xs opacity-70">{t('gh_hint')}</p>
          <div className="flex gap-2">
            <input
              className="mag-input min-w-0"
              value={ghUser}
              onChange={(e) => setGhUser(e.target.value)}
              placeholder={t('gh_username_ph')}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), loadGithub())}
            />
            <button
              type="button"
              className="mag-btn mag-btn-secondary shrink-0"
              onClick={loadGithub}
              disabled={ghLoading || !ghUser.trim()}
            >
              {ghLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              {ghLoading ? t('gh_loading') : t('gh_load')}
            </button>
          </div>

          {ghError && <p className="text-xs text-primary">{ghError}</p>}

          {ghItems.length === 0 && !ghLoading && !ghError && (
            <p className="text-xs opacity-60">{t('gh_empty')}</p>
          )}

          <ul className="space-y-2">
            {ghItems.map((item) => (
              <li
                key={item.id}
                className="flex items-start justify-between gap-3 rounded-md border p-3"
                style={{ borderColor: 'var(--rule)' }}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{item.title}</p>
                  <p className="mt-0.5 truncate text-xs opacity-60">{item.summary}</p>
                </div>
                <button
                  type="button"
                  className="mag-btn mag-btn-secondary shrink-0 px-3"
                  onClick={() => importGithub(item)}
                  disabled={saving}
                >
                  {t('gh_import')}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}
