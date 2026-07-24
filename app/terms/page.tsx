'use client';

import { useI18n } from '@/lib/i18n';
import { LegalLayout, Block } from '@/components/LegalLayout';

export default function TermsPage() {
  const { t } = useI18n();
  return (
    <LegalLayout title={t('terms_title')}>
      <p className="text-sm opacity-80">{t('terms_intro')}</p>
      <Block h={t('terms_account_h')} b={t('terms_account_b')} />
      <Block h={t('terms_use_h')} b={t('terms_use_b')} />
      <Block h={t('terms_sub_h')} b={t('terms_sub_b')} />
      <Block h={t('terms_liability_h')} b={t('terms_liability_b')} />
      <Block h={t('terms_contact_h')} b={t('terms_contact_b')} />
    </LegalLayout>
  );
}
