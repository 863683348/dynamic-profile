'use client';

import { Github, PenLine, ExternalLink } from 'lucide-react';
import type { Work } from '@/lib/types';
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

export function WorkCard({ work }: { work: Work }) {
  const { t, lang } = useI18n();
  const isGithub = work.source === 'github';
  return (
    <article className="paper-card overflow-hidden">
      {work.image_url && (
        <div className="aspect-[4/3] w-full overflow-hidden bg-[color:var(--bg)]">
          <img
            src={work.image_url}
            alt={work.title ?? ''}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="p-5">
        <div className="mb-2 flex items-center justify-between gap-3 text-xs opacity-70">
          <time dateTime={work.created_at}>{formatDate(work.created_at, lang)}</time>
          <span className="source-badge">
            {isGithub ? <Github className="h-3 w-3" /> : <PenLine className="h-3 w-3" />}
            {isGithub ? t('source_github') : t('source_manual')}
          </span>
        </div>
        <h2 className="magazine-title break-words text-xl">
          {work.url ? (
            <a
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:underline"
              style={{ color: 'var(--primary)' }}
            >
              {work.title}
              <ExternalLink className="h-4 w-4 shrink-0" />
            </a>
          ) : (
            work.title
          )}
        </h2>
        {work.description && (
          <p className="mt-2 break-words whitespace-pre-line text-sm leading-relaxed opacity-90">
            {work.description}
          </p>
        )}
      </div>
    </article>
  );
}
