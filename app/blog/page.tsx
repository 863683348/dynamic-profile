'use client';

import { useI18n } from '@/lib/i18n';
import { LegalLayout } from '@/components/LegalLayout';

export default function BlogPage() {
  const { t } = useI18n();
  return (
    <LegalLayout title={t('blog_title')}>
      <p className="text-sm opacity-80">{t('blog_intro')}</p>
      <article className="paper-card p-6">
        <div className="flex items-center gap-2">
          <span className="source-badge text-primary">{t('blog_post1_tag')}</span>
          <span className="text-xs opacity-60">{t('blog_post1_date')}</span>
        </div>
        <h2 className="magazine-title mb-2 mt-3 text-2xl">{t('blog_post1_title')}</h2>
        <p className="text-sm leading-relaxed opacity-80">{t('blog_post1_body')}</p>
      </article>
    </LegalLayout>
  );
}
