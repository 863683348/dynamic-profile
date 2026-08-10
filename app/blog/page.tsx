'use client';

import { useI18n } from '@/lib/i18n';
import { LegalLayout } from '@/components/LegalLayout';
import { AdSlot } from '@/components/AdSlot';
import { BLOG_POSTS } from '@/lib/blog-posts';

export default function BlogPage() {
  const { t, lang } = useI18n();
  return (
    <LegalLayout title={t('blog_title')}>
      <p className="text-sm opacity-80">{t('blog_intro')}</p>

      <ul className="mt-6 space-y-4">
        {[...BLOG_POSTS]
          .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
          .map((p) => {
          const excerpt =
            p.body[lang].length > 120
              ? p.body[lang].slice(0, 117) + '…'
              : p.body[lang];
          return (
            <li key={p.slug}>
              <a
                href={`/blog/${p.slug}`}
                className="paper-card block p-6 transition hover:opacity-90"
              >
                <div className="flex items-center gap-2">
                  <span className="source-badge text-primary">{p.tag[lang]}</span>
                  <span className="text-xs opacity-60">
                    {new Date(p.publishedAt).toLocaleDateString(
                      lang === "zh" ? "zh-CN" : "en-US",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </span>
                </div>
                <h2 className="magazine-title mb-2 mt-3 text-2xl">{p.title[lang]}</h2>
                <p className="text-sm leading-relaxed opacity-80">{excerpt}</p>
              </a>
            </li>
          );
        })}
      </ul>

      <AdSlot className="my-8 min-h-[120px]" />
    </LegalLayout>
  );
}
