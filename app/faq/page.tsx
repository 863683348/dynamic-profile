'use client';

import { useI18n } from '@/lib/i18n';
import { LegalLayout } from '@/components/LegalLayout';

export default function FaqPage() {
  const { t } = useI18n();
  const items = [
    { q: t('faq_q1'), a: t('faq_a1') },
    { q: t('faq_q2'), a: t('faq_a2') },
    { q: t('faq_q3'), a: t('faq_a3') },
    { q: t('faq_q4'), a: t('faq_a4') },
    { q: t('faq_q5'), a: t('faq_a5') },
    { q: t('faq_q6'), a: t('faq_a6') },
    { q: t('faq_q7'), a: t('faq_a7') },
    { q: t('faq_q8'), a: t('faq_a8') },
  ];

  // FAQPage结构化数据：捕获富媒体结果（Featured Snippet / 富摘要），并覆盖排名9的"popular list"长尾问句
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <LegalLayout title={t('faq_title')}>
        <div className="space-y-5">
          {items.map((it, i) => (
            <section key={i}>
              <h2 className="magazine-title mb-1 text-lg">{it.q}</h2>
              <p className="text-sm opacity-80">{it.a}</p>
            </section>
          ))}
        </div>
      </LegalLayout>
    </>
  );
}
