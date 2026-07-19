'use client';

import { Github, PenLine } from 'lucide-react';
import type { Post } from '@/lib/types';
import { useI18n } from '@/lib/i18n';

function formatDate(iso: string, lang: string) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString(lang === 'en' ? 'en-US' : 'zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function PostCard({ post }: { post: Post }) {
  const { t, lang } = useI18n();
  const isGithub = post.source === 'github';
  return (
    <article>
      <div className="mb-2 flex items-center gap-3 text-xs opacity-70">
        <time dateTime={post.created_at}>{formatDate(post.created_at, lang)}</time>
        <span className="source-badge">
          {isGithub ? <Github className="h-3 w-3" /> : <PenLine className="h-3 w-3" />}
          {isGithub ? t('source_github') : t('source_manual')}
        </span>
      </div>
      <h2 className="magazine-title break-words text-2xl">{post.title}</h2>
      {post.content && (
        <p className="mt-2 break-words whitespace-pre-line leading-relaxed opacity-90">
          {post.content}
        </p>
      )}
    </article>
  );
}
