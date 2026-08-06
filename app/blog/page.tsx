'use client';

import { useI18n } from '@/lib/i18n';
import { LegalLayout } from '@/components/LegalLayout';
import { AdSlot } from '@/components/AdSlot';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://dynamic-profile.shop';

const POST_IDS = [1, 2, 3, 4] as const;

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
  ],
};

function RelatedPosts({
  current,
  t,
}: {
  current: number;
  t: (key: string) => string;
}) {
  const others = POST_IDS.filter((n) => n !== current);
  return (
    <nav
      aria-label={t('blog_related')}
      className="mt-5 border-t border-[color:var(--rule)] pt-4"
    >
      <h3 className="text-xs uppercase tracking-[0.2em] opacity-70">
        {t('blog_related')}
      </h3>
      <ul className="mt-2 space-y-1">
        {others.map((n) => (
          <li key={n}>
            <a
              href={`/blog#blog-post-${n}`}
              className="text-sm text-primary underline-offset-2 hover:underline"
            >
              {t(`blog_post${n}_title`)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function BlogPage() {
  const { t } = useI18n();
  return (
    <LegalLayout title={t('blog_title')}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <p className="text-sm opacity-80">{t('blog_intro')}</p>
      <article id="blog-post-1" className="paper-card scroll-mt-24 p-6">
        <div className="flex items-center gap-2">
          <span className="source-badge text-primary">{t('blog_post1_tag')}</span>
          <span className="text-xs opacity-60">{t('blog_post1_date')}</span>
        </div>
        <h2 className="magazine-title mb-2 mt-3 text-2xl">{t('blog_post1_title')}</h2>
        <p className="text-sm leading-relaxed opacity-80">{t('blog_post1_body')}</p>
        <RelatedPosts current={1} t={t} />
      </article>
      <article id="blog-post-2" className="paper-card scroll-mt-24 p-6">
        <div className="flex items-center gap-2">
          <span className="source-badge text-primary">{t('blog_post2_tag')}</span>
          <span className="text-xs opacity-60">{t('blog_post2_date')}</span>
        </div>
        <h2 className="magazine-title mb-2 mt-3 text-2xl">{t('blog_post2_title')}</h2>
        <p className="text-sm leading-relaxed opacity-80">{t('blog_post2_body')}</p>
        <RelatedPosts current={2} t={t} />
      </article>
      <article id="blog-post-3" className="paper-card scroll-mt-24 p-6">
        <div className="flex items-center gap-2">
          <span className="source-badge text-primary">{t('blog_post3_tag')}</span>
          <span className="text-xs opacity-60">{t('blog_post3_date')}</span>
        </div>
        <h2 className="magazine-title mb-2 mt-3 text-2xl">{t('blog_post3_title')}</h2>
        <p className="text-sm leading-relaxed opacity-80">{t('blog_post3_body')}</p>
        <RelatedPosts current={3} t={t} />
      </article>
      <article id="blog-post-4" className="paper-card scroll-mt-24 p-6">
        <div className="flex items-center gap-2">
          <span className="source-badge text-primary">{t('blog_post4_tag')}</span>
          <span className="text-xs opacity-60">{t('blog_post4_date')}</span>
        </div>
        <h2 className="magazine-title mb-2 mt-3 text-2xl">{t('blog_post4_title')}</h2>
        <p className="text-sm leading-relaxed opacity-80">{t('blog_post4_body')}</p>
        <RelatedPosts current={4} t={t} />
      </article>
      <AdSlot className="my-8 min-h-[120px]" />
    </LegalLayout>
  );
}
