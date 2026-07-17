'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

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
      <h3 className="magazine-title text-lg">写一条动态</h3>
      <input
        className="mag-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="标题"
      />
      <textarea
        className="mag-input min-h-[80px]"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="内容（支持换行）"
      />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={status === 'published'}
            onChange={(e) => setStatus(e.target.checked ? 'published' : 'draft')}
          />
          立即发布
        </label>
          <button
            type="submit"
            className="mag-btn shrink-0"
            disabled={saving || !title.trim()}
          >
          <Send className="h-4 w-4" />
          {saving ? '发布中…' : status === 'published' ? '发布' : '存为草稿'}
        </button>
      </div>
    </form>
  );
}
