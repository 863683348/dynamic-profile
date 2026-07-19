'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export type PostDraft = {
  title: string;
  content: string;
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
  const [status, setStatus] = useState<'draft' | 'published'>('published');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onPublish({ title: title.trim(), content: content.trim(), status });
    setTitle('');
    setContent('');
    setStatus('published');
  }

  return (
    <form onSubmit={handleSubmit} className="paper-card space-y-3 p-5">
      <h3 className="magazine-title text-lg">{t('pc_title')}</h3>
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
