'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Loader2,
  Crown,
  Check,
  Globe,
  BarChart3,
  Palette,
  Heart,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { LoginButton } from '@/components/LoginButton';
import { StylePreviewCard } from '@/components/StylePreviewCard';
import { useMe } from '@/lib/meContext';
import { STYLE_IDS } from '@/lib/styles';
import type { Profile, PlanStatus } from '@/lib/types';

const POLAR_ENABLED = process.env.NEXT_PUBLIC_POLAR_ENABLED === 'true';

type Benefit = {
  key: string;
  tier: 'free' | 'pro';
};

// 权益清单：免费版与 Pro 各有哪些。order 即展示顺序。
const BENEFITS: Benefit[] = [
  { key: 'free_b1', tier: 'free' },
  { key: 'free_b2', tier: 'free' },
  { key: 'free_b3', tier: 'free' },
  { key: 'plan_b1', tier: 'pro' },
  { key: 'plan_b2', tier: 'pro' },
  { key: 'plan_b3', tier: 'pro' },
];

export default function MembershipPage() {
  const { data: session, status } = useSession();
  const { t, lang } = useI18n();
  const router = useRouter();
  const { me } = useMe();
  // SSR 已预取 me：profile 首屏直接用，零转圈。
  const [profile, setProfile] = useState<Profile | null>(
    () => (me?.profile as Profile | null) ?? null
  );
  const [sub, setSub] = useState<PlanStatus | null>(null);
  const [upgrading, setUpgrading] = useState<false | 'monthly' | 'yearly'>(false);
  const [openingPortal, setOpeningPortal] = useState(false);
  const [portalError, setPortalError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [justUpgraded, setJustUpgraded] = useState(false);

  const fmtDate = (s: string | null) =>
    s
      ? new Date(s).toLocaleDateString(lang === 'en' ? 'en-US' : 'zh-CN')
      : '';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('upgraded') === '1') {
        setJustUpgraded(true);
        router.replace('/dashboard/membership');
      }
    }
  }, [router]);

  // 订阅状态走独立端点（与 dashboard overview 一致），避免 SSR me.sub 的 Date 序列化问题。
  useEffect(() => {
    if (status !== 'authenticated') return;
    let cancelled = false;
    fetch('/api/subscription')
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (!cancelled) setSub(j ?? null);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [status]);

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

  async function handleManage() {
    setOpeningPortal(true);
    setPortalError(null);
    try {
      const res = await fetch('/api/customer-portal', { method: 'POST' });
      const json = await res.json();
      if (!res.ok || !json.url) throw new Error(json?.message ?? '');
      window.open(json.url, '_blank', 'noopener,noreferrer');
    } catch (e) {
      setPortalError(
        e instanceof Error && e.message
          ? e.message
          : t('plan_manage_note')
      );
    } finally {
      setOpeningPortal(false);
    }
  }

  const isPro = sub?.plan === 'pro';
  const isCanceled = sub?.status === 'canceled' && sub?.cancel_at_period_end;

  // me 已由 SSR 预取：已登录用户直接渲染内容，跳过客户端转圈。
  if (!me) {
    if (status === 'loading') {
      return (
        <div className="flex justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin opacity-60" />
        </div>
      );
    }

    if (!session?.user) {
      return (
        <div className="mx-auto max-w-md px-6 py-20">
          <h1 className="magazine-title text-3xl">{t('d_login_title')}</h1>
          <p className="mt-2 text-sm opacity-80">{t('d_login_desc')}</p>
          <div className="mt-8">
            <LoginButton />
          </div>
        </div>
      );
    }
  }

  return (
    <div>
      <div className="double-rule mb-8 flex items-center justify-between px-1 py-3">
        <span className="text-xs uppercase tracking-[0.2em] opacity-70">
          {t('nav_membership')}
        </span>
        {profile?.handle && (
          <a
            href={`/${profile.handle}`}
            className="text-sm text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('mem_open_public')}
          </a>
        )}
      </div>

      <div className="mb-8">
        <h1 className="magazine-title text-2xl">{t('mem_title')}</h1>
        <p className="mt-1 text-sm opacity-70">{t('mem_desc')}</p>
      </div>

      {justUpgraded && (
        <div className="mb-6 rounded-md border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-primary">
          {t('plan_thanks')}
        </div>
      )}
      {error && <p className="mb-4 text-sm text-primary">{error}</p>}

      {/* 会员身份卡 */}
      <section className="paper-card mb-6 overflow-hidden p-0">
        <div
          className="flex items-center gap-4 border-b p-6"
          style={{ borderColor: 'var(--rule)' }}
        >
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt=""
              className="h-14 w-14 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Crown className="h-6 w-6" />
            </div>
          )}
          <div className="min-w-0">
            <p className="magazine-title truncate text-lg">
              {profile?.display_name || session?.user?.name || profile?.handle || t('mem_plan')}
            </p>
            {profile?.handle && (
              <p className="truncate text-sm opacity-60">@{profile.handle}</p>
            )}
          </div>
          <span
            className={`source-badge ml-auto flex items-center gap-1 ${
              isPro ? 'text-primary' : ''
            }`}
          >
            {isPro && <Crown className="h-3.5 w-3.5" />}
            {isPro ? t('plan_pro') : t('plan_free')}
          </span>
        </div>
        <div className="p-6 text-sm">
          {isPro ? (
            isCanceled ? (
              <p className="opacity-80">
                {t('mem_status_canceled', {
                  date: fmtDate(sub?.current_period_end ?? null),
                })}
              </p>
            ) : (
              <p className="opacity-80">{t('mem_status_active')}</p>
            )
          ) : (
            <p className="opacity-80">{t('mem_status_free')}</p>
          )}
          {isPro && !isCanceled && sub?.current_period_end && (
            <p className="mt-1 opacity-60">
              {t('plan_renew', { date: fmtDate(sub.current_period_end) })}
            </p>
          )}
        </div>
      </section>

      {/* 权益清单 */}
      <section className="paper-card mb-6 p-6">
        <h2 className="magazine-title text-xl">{t('mem_benefits')}</h2>
        <ul className="mt-4 divide-y" style={{ borderColor: 'var(--rule)' }}>
          {BENEFITS.map((b) => {
            const unlocked = b.tier === 'free' || isPro;
            return (
              <li
                key={b.key}
                className="flex items-center justify-between gap-3 py-3"
                style={{ borderColor: 'var(--rule)' }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full ${
                      unlocked
                        ? 'bg-primary/15 text-primary'
                        : 'bg-black/5 text-black/30 dark:bg-white/10 dark:text-white/30'
                    }`}
                  >
                    <Check className="h-3 w-3" />
                  </span>
                  <span className={unlocked ? '' : 'opacity-60'}>{t(b.key)}</span>
                </div>
                <span
                  className={`source-badge shrink-0 ${
                    b.tier === 'pro' ? 'text-primary' : 'opacity-60'
                  }`}
                >
                  {b.tier === 'pro' ? t('mem_b_pro') : t('mem_b_free')}
                  {b.tier === 'pro' && (isPro ? ` · ${t('mem_unlocked')}` : ` · ${t('mem_locked')}`)}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      {/* 订阅与账单 */}
      <section className="paper-card mb-6 p-6">
        <h2 className="magazine-title text-xl">{t('mem_billing')}</h2>
        {isPro ? (
          <div className="mt-4 space-y-3 text-sm">
            <p className="opacity-80">{t('mem_manage_desc')}</p>
            {portalError && <p className="text-primary">{portalError}</p>}
            <button
              type="button"
              className="mag-btn flex items-center gap-2"
              disabled={openingPortal}
              onClick={handleManage}
            >
              {openingPortal ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ExternalLink className="h-4 w-4" />
              )}
              {isCanceled ? t('mem_restore') : t('mem_manage')}
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-sm opacity-70">{t('plan_upgrade')}</p>
            {POLAR_ENABLED ? (
              <div className="mt-3 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="mag-btn flex items-center gap-2"
                  disabled={!!upgrading}
                  onClick={() => handleUpgrade('monthly')}
                >
                  <Sparkles className="h-4 w-4" />
                  {upgrading === 'monthly' ? t('plan_upgrading') : t('plan_monthly')}
                </button>
                <button
                  type="button"
                  className="mag-btn mag-btn-secondary"
                  disabled={!!upgrading}
                  onClick={() => handleUpgrade('yearly')}
                >
                  {upgrading === 'yearly'
                    ? t('plan_upgrading')
                    : `${t('plan_yearly')} · ${t('plan_yearly_save')}`}
                </button>
              </div>
            ) : (
              <p className="mt-3 text-sm opacity-60">{t('plan_comming')}</p>
            )}
          </div>
        )}
      </section>

      {/* 会员专属入口 */}
      <section className="mb-2">
        <h2 className="magazine-title mb-4 text-xl">{t('mem_perks')}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <PerkCard
            icon={Globe}
            title={t('mem_public')}
            desc={t('mem_public_desc')}
            href={profile?.handle ? `/${profile.handle}` : undefined}
            external
          />
          <PerkCard
            icon={BarChart3}
            title={t('mem_analytics')}
            desc={t('mem_analytics_desc')}
            href="/dashboard/analytics"
          />
          <PerkCard
            icon={Palette}
            title={t('mem_theme')}
            desc={t('mem_theme_desc')}
            href="/dashboard/profile"
            locked={!isPro}
          />
          <PerkCard
            icon={Heart}
            title={t('mem_tips')}
            desc={t('mem_tips_desc')}
            href="/dashboard/profile"
          />
        </div>
      </section>

      {/* 主题风格预览：把 5 套视觉风格的真实预览放上来，给升级前的用户做引导 */}
      <section className="mt-2">
        <div className="double-rule mb-4 flex items-center justify-between px-1 py-3">
          <span className="magazine-title text-xl">{t('theme_gallery_title')}</span>
          <span className="text-xs uppercase tracking-[0.2em] opacity-70">
            {t('nav_profile')}
          </span>
        </div>
        <p className="mb-5 text-sm opacity-70">{t('theme_gallery_sub')}</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {STYLE_IDS.map((id) => (
            <StylePreviewCard
              key={id}
              id={id}
              badge={isPro ? null : 'pro'}
              showDesc
            />
          ))}
        </div>
        {!isPro && POLAR_ENABLED && (
          <div className="mt-5">
            <a href="/pricing" className="mag-btn flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              {t('theme_gallery_upgrade')}
            </a>
          </div>
        )}
      </section>
    </div>
  );
}

function PerkCard({
  icon: Icon,
  title,
  desc,
  href,
  external,
  locked,
  soon,
}: {
  icon: typeof Globe;
  title: string;
  desc: string;
  href?: string;
  external?: boolean;
  locked?: boolean;
  soon?: boolean;
}) {
  const { t } = useI18n();
  const inner = (
    <div
      className={`paper-card flex h-full items-start gap-3 p-5 transition-colors ${
        href && !locked ? 'hover:border-primary' : ''
      } ${locked ? 'opacity-70' : ''}`}
      style={{ borderColor: 'var(--rule)' }}
    >
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="font-medium">{title}</p>
          {soon && (
            <span className="source-badge opacity-60">{t('mem_soon')}</span>
          )}
          {locked && (
            <span className="source-badge text-primary">{t('mem_locked')}</span>
          )}
        </div>
        <p className="mt-0.5 text-xs opacity-60">{desc}</p>
      </div>
      {external && href && (
        <ExternalLink className="h-4 w-4 shrink-0 opacity-50" />
      )}
    </div>
  );

  if (href && !locked) {
    return (
      <Link href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
        {inner}
      </Link>
    );
  }
  return inner;
}
