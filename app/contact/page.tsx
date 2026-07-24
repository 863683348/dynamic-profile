'use client';

import { useI18n } from '@/lib/i18n';
import { LegalLayout } from '@/components/LegalLayout';

const CONTACT_EMAIL = 'ahmedlzany423@gmail.com';

export default function ContactPage() {
  const { t } = useI18n();
  return (
    <LegalLayout title={t('contact_title')}>
      <p className="text-sm opacity-80">{t('contact_intro')}</p>
      <section className="paper-card p-6">
        <p className="text-sm opacity-70">{t('contact_email_label')}</p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-1 inline-block text-lg font-medium text-primary hover:underline"
        >
          {CONTACT_EMAIL}
        </a>
        <p className="mt-3 text-sm opacity-60">{t('contact_note')}</p>
      </section>
    </LegalLayout>
  );
}
