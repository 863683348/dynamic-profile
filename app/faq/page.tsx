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
  ];
  return (
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
  );
}
