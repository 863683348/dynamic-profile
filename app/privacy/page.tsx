'use client';

import { useI18n } from '@/lib/i18n';
import { LegalLayout, Block } from '@/components/LegalLayout';

export default function PrivacyPage() {
  const { t } = useI18n();
  return (
    <LegalLayout title={t('privacy_title')}>
      <p className="text-sm opacity-60">{t('privacy_effective')}</p>
      <p className="text-sm opacity-80">{t('privacy_intro')}</p>
      <Block h={t('privacy_collect_h')} b={t('privacy_collect_b')} />
      <Block h={t('privacy_payment_h')} b={t('privacy_payment_b')} />
      <Block h={t('privacy_cookies_h')} b={t('privacy_cookies_b')} />
      <Block h={t('privacy_rights_h')} b={t('privacy_rights_b')} />
      <Block h={t('privacy_contact_h')} b={t('privacy_contact_b')} />
    </LegalLayout>
  );
}
