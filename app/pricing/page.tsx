'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { Crown, Check } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { TopControls } from '@/components/TopControls';
import { SiteFooter } from '@/components/SiteFooter';
import type { PlanStatus } from '@/lib/types';

const POLAR_ENABLED = process.env.NEXT_PUBLIC_POLAR_ENABLED === 'true';

export default function PricingPage() {
  const { t, lang } = useI18n();
  const { data: session, status } = useSession();
  const [sub, setSub] = useState<PlanStatus | null>(null);
  const [upgrading, setUpgrading] = useState<false | 'monthly' | 'yearly'>(false);
  const [error, setError] = useState<string | null>(null);

  const fmtDate = (s: string | null) =>
    s ? new Date(s).toLocaleDateString(lang === 'en' ? 'en-US' : 'zh-CN') : '';

  const loadSub = useCallback(async () => {
    try {
      const res = await fetch('/api/subscription');
      if (res.ok) setSub(await res.json());
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (status === 'authenticated') void loadSub();
  }, [status, loadSub]);

  async function handleUpgrade(plan: 'monthly' | 'yearly') {
    setUpgrading(plan);
    setError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const json = await res.json();
      if (!res.ok || !json.url) throw new Error(json?.message ?? t('plan_upgrading'));
      window.location.href = json.url;
    } catch (e) {
      setUpgrading(false);
      setError(e instanceof Error ? e.message : t('plan_upgrading'));
    }
  }

  const isPro = sub?.plan === 'pro';
  const loggedIn = status === 'authenticated';

  return (
    <main className="theme-surface min-h-screen">
      <TopControls />
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="double-rule mb-8 flex items-center justify-between px-1 py-3">
          <span className="text-xs uppercase tracking-[0.2em] opacity-70">
            {t('nav_pricing')}
          </span>
        </div>

        <h1 className="magazine-title text-3xl sm:text-4xl">{t('pricing_title')}</h1>
        <p className="mt-3 text-lg opacity-80">{t('pricing_sub')}</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {/* Free */}
          <section className="paper-card flex flex-col p-6">
            <h2 className="magazine-title text-2xl">{t('plan_free')}</h2>
            <p className="mt-1 text-sm opacity-70">{t('pricing_for_free')}</p>
            <p className="mt-4 text-3xl font-semibold">
              $0<span className="text-base opacity-60"> / {t('plan_monthly')}</span>
            </p>
            <ul className="my-5 flex-1 space-y-2 text-sm opacity-80">
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {t('free_b1')}
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {t('free_b2')}
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {t('free_b3')}
              </li>
              <li className="mt-3 flex items-start gap-2 opacity-60">
                <span className="mt-0.5 text-primary">·</span>
                {t('pricing_free_limit')}
              </li>
            </ul>
            <a href="/dashboard" className="mag-btn mag-btn-secondary w-full justify-center">
              {t('pricing_cta_free')}
            </a>
          </section>

          {/* Pro */}
          <section className="paper-card relative flex flex-col border-2 border-primary p-6">
            <span className="source-badge absolute -top-3 left-6 bg-primary px-2 py-0.5 text-white">
              {t('pricing_popular')}
            </span>
            <h2 className="magazine-title flex items-center gap-2 text-2xl">
              <Crown className="h-5 w-5 text-primary" />
              {t('plan_pro')}
            </h2>
            <p className="mt-1 text-sm opacity-70">{t('pricing_for_pro')}</p>
            <p className="mt-4 text-3xl font-semibold">{t('plan_yearly_save')}</p>
            <p className="text-sm opacity-60">
              {t('plan_monthly')} / {t('plan_yearly')}
            </p>
            <ul className="my-5 flex-1 space-y-2 text-sm opacity-80">
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {t('plan_b1')}
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {t('plan_b2')}
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {t('plan_b3')}
              </li>
            </ul>

            {isPro ? (
              <div className="space-y-2 text-sm">
                <p className="font-medium text-primary">{t('pricing_you_pro')}</p>
                <p className="opacity-80">
                  {sub?.status === 'canceled' && sub.cancel_at_period_end
                    ? t('plan_canceled', { date: fmtDate(sub.current_period_end) })
                    : t('plan_active')}
                </p>
                {sub?.current_period_end && sub.status !== 'canceled' && (
                  <p className="opacity-60">
                    {t('plan_renew', { date: fmtDate(sub.current_period_end) })}
                  </p>
                )}
                <p className="opacity-60">{t('plan_manage_note')}</p>
              </div>
            ) : loggedIn ? (
              POLAR_ENABLED ? (
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    className="mag-btn w-full justify-center"
                    disabled={!!upgrading}
                    onClick={() => handleUpgrade('monthly')}
                  >
                    {upgrading === 'monthly' ? t('plan_upgrading') : t('plan_monthly')}
                  </button>
                  <button
                    type="button"
                    className="mag-btn mag-btn-secondary w-full justify-center"
                    disabled={!!upgrading}
                    onClick={() => handleUpgrade('yearly')}
                  >
                    {upgrading === 'yearly'
                      ? t('plan_upgrading')
                      : `${t('plan_yearly')} · ${t('plan_yearly_save')}`}
                  </button>
                </div>
              ) : (
                <p className="text-sm opacity-60">{t('plan_comming')}</p>
              )
            ) : (
              <a href="/dashboard" className="mag-btn w-full justify-center">
                {t('pricing_cta_pro')}
              </a>
            )}
          </section>
        </div>

        {!loggedIn && (
          <p className="mt-4 text-center text-sm opacity-60">{t('pricing_login_hint')}</p>
        )}
        {error && <p className="mt-4 text-center text-sm text-primary">{error}</p>}
      </div>
      <SiteFooter />
    </main>
  );
}
