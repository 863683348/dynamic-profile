'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import type { PostCategory } from '@/lib/types';

export type PostDraft = {
  title: string;
  content: string;
  category: PostCategory;
  status: 'draft' | 'published';
};

export function PostComposer({
  onPublish,
  saving,
}: {
  onPublish: (data: PostDraft) => void;
  saving: boolean;
}) {
  const { t } = useI18n();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<PostCategory>('post');
  const [status, setStatus] = useState<'draft' | 'published'>('published');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onPublish({ title: title.trim(), content: content.trim(), category, status });
    setTitle('');
    setContent('');
    setCategory('post');
    setStatus('published');
  }

  return (
    <form onSubmit={handleSubmit} className="paper-card space-y-3 p-5">
      <h3 className="magazine-title text-lg">{t('pc_title')}</h3>

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
    </form>
  );
}
