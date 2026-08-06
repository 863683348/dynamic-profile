'use client';

import { useI18n } from '@/lib/i18n';
import { LegalLayout } from '@/components/LegalLayout';
import { AdSlot } from '@/components/AdSlot';
import { BLOG_POSTS, type BlogPost } from '@/lib/blog-posts';

export function BlogPostClient({ post }: { post: BlogPost }) {
  const { t, lang } = useI18n();
  const others = BLOG_POSTS.filter((p) => p.slug !== post.slug);

  return (
    <LegalLayout title={post.title[lang]}>
      <article className="paper-card p-6">
        <div className="flex items-center gap-2">
          <span className="source-badge text-primary">{post.tag[lang]}</span>
          <span className="text-xs opacity-60">{post.date[lang]}</span>
        </div>
        <div className="mt-3 space-y-4 text-sm leading-relaxed opacity-80">
          {post.body[lang].split('\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <nav
          aria-label={t('blog_related')}
          className="mt-5 border-t border-[color:var(--rule)] pt-4"
        >
          <h2 className="text-xs uppercase tracking-[0.2em] opacity-70">
            {t('blog_related')}
          </h2>
          <ul className="mt-2 space-y-1">
            {others.map((p) => (
              <li key={p.slug}>
                <a
                  href={`/blog/${p.slug}`}
                  className="text-sm text-primary underline-offset-2 hover:underline"
                >
                  {p.title[lang]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </article>
      <AdSlot className="my-8 min-h-[120px]" />
    </LegalLayout>
  );
}
