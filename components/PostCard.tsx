import { Github, PenLine } from 'lucide-react';
import type { Post } from '@/lib/types';

function formatDate(iso: string) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function PostCard({ post }: { post: Post }) {
  const isGithub = post.source === 'github';
  return (
    <article>
      <div className="mb-2 flex items-center gap-3 text-xs opacity-70">
        <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
        <span className="source-badge">
          {isGithub ? <Github className="h-3 w-3" /> : <PenLine className="h-3 w-3" />}
          {isGithub ? 'GitHub' : '手动'}
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
