'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Crown, FileText, Briefcase, ArrowUpRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { LoginButton } from '@/components/LoginButton';
import { fetchMe } from '@/lib/meCache';
import type { Profile, Post, Work, PlanStatus, Stats } from '@/lib/types';

const POLAR_ENABLED = process.env.NEXT_PUBLIC_POLAR_ENABLED === 'true';

export default function DashboardOverviewPage() {
  const { data: session, status } = useSession();
  const { t, lang } = useI18n();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [works, setWorks] = useState<Work[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [sub, setSub] = useState<PlanStatus | null>(null);
  const [upgrading, setUpgrading] = useState<false | 'monthly' | 'yearly'>(false);
  const [error, setError] = useState<string | null>(null);

  const fmtDate = (s: string | null) =>
    s ? new Date(s).toLocaleDateString(lang === 'en' ? 'en-US' : 'zh-CN') : '';

  const loadData = useCallback(async () => {
    try {
      const json = await fetchMe();
      if (!json) return;
      setProfile(json.profile ?? null);
      setPosts(json.posts ?? []);
      setWorks(json.works ?? []);
      setStats(json.stats ?? null);
      const resSub = await fetch('/api/subscription');
      if (resSub.ok) setSub(await resSub.json());
    } catch {
      /* 忽略 */
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('upgraded') === '1') router.replace('/dashboard');
    }
  }, [router]);

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

  useEffect(() => {
    if (status === 'authenticated') void loadData();
  }, [status, loadData]);

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

  const postCount = posts.length;
  const workCount = works.length;

  return (
    <div>
      <div className="double-rule mb-8 flex items-center justify-between px-1 py-3">
        <span className="text-xs uppercase tracking-[0.2em] opacity-70">
          {t('nav_overview')}
        </span>
        {profile?.handle && (
          <a
            href={`/${profile.handle}`}
            className="text-sm text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('d_view_public')}
          </a>
        )}
      </div>

      <div className="mb-8">
        <h1 className="magazine-title text-2xl">
          {t('d_welcome')}
          {profile?.display_name ? `，${profile.display_name}` : ''}
        </h1>
        <p className="mt-1 text-sm opacity-70">{t('d_overview_desc')}</p>
      </div>

      {error && <p className="mb-4 text-sm text-primary">{error}</p>}

      {/* 套餐 */}
      <section className="paper-card mb-6 p-6">
        <div className="flex items-center justify-between">
          <h2 className="magazine-title text-xl">{t('plan_section')}</h2>
          <span
            className={`source-badge flex items-center gap-1 ${
              sub?.plan === 'pro' ? 'text-primary' : ''
            }`}
          >
            {sub?.plan === 'pro' && <Crown className="h-3.5 w-3.5" />}
            {sub?.plan === 'pro' ? t('plan_pro') : t('plan_free')}
          </span>
        </div>
        {sub?.plan === 'pro' ? (
          <div className="mt-4 space-y-2 text-sm">
            <p className="opacity-80">
              {sub.status === 'canceled' && sub.cancel_at_period_end
                ? t('plan_canceled', { date: fmtDate(sub.current_period_end) })
                : t('plan_active')}
            </p>
            {sub.current_period_end && sub.status !== 'canceled' && (
              <p className="opacity-60">
                {t('plan_renew', { date: fmtDate(sub.current_period_end) })}
              </p>
            )}
            <p className="opacity-60">{t('plan_manage_note')}</p>
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-sm opacity-70">{t('plan_upgrade')}</p>
            <ul className="my-3 space-y-1 text-sm opacity-80">
              <li>· {t('plan_b1')}</li>
              <li>· {t('plan_b2')}</li>
              <li>· {t('plan_b3')}</li>
            </ul>
            {POLAR_ENABLED ? (
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="mag-btn"
                  disabled={!!upgrading}
                  onClick={() => handleUpgrade('monthly')}
                >
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
              <p className="text-sm opacity-60">{t('plan_comming')}</p>
            )}
          </div>
        )}
      </section>

      {/* 资料摘要 */}
      {profile && (
        <section className="paper-card mb-6 p-6">
          <div className="flex items-center justify-between">
            <h2 className="magazine-title text-xl">{t('d_profile_summary')}</h2>
            <Link
              href="/dashboard/profile"
              className="mag-btn mag-btn-secondary shrink-0"
            >
              {t('d_edit_profile')}
            </Link>
          </div>
          <div className="mt-4 space-y-1 text-sm">
            <p>
              <span className="opacity-60">{t('label_handle')}：</span>@
              {profile.handle}
            </p>
            {profile.display_name && (
              <p>
                <span className="opacity-60">{t('label_name')}：</span>
                {profile.display_name}
              </p>
            )}
            {profile.bio && (
              <p className="opacity-80">
                <span className="opacity-60">{t('label_bio')}：</span>
                {profile.bio}
              </p>
            )}
            <p className="opacity-60">
              {t('style_label')}：{t(`st_${profile.style}`)}
            </p>
          </div>
        </section>
      )}

      {/* 统计 */}
      <section className="mb-6 grid grid-cols-3 gap-3">
        <div className="paper-card p-4 text-center">
          <p className="magazine-title text-2xl">{postCount}</p>
          <p className="mt-1 text-xs opacity-60">{t('d_stat_posts')}</p>
        </div>
        <div className="paper-card p-4 text-center">
          <p className="magazine-title text-2xl">{workCount}</p>
          <p className="mt-1 text-xs opacity-60">{t('d_stat_works')}</p>
        </div>
        <div className="paper-card p-4 text-center">
          <p className="magazine-title text-2xl">{stats?.views ?? 0}</p>
          <p className="mt-1 text-xs opacity-60">{t('d_stat_views')}</p>
        </div>
      </section>

      {/* 快捷入口 */}
      <section className="grid gap-3 sm:grid-cols-2">
        <Link
          href="/dashboard/posts"
          className="paper-card flex items-center justify-between p-5 transition-colors hover:border-primary"
          style={{ borderColor: 'var(--rule)' }}
        >
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">{t('d_manage_posts')}</p>
              <p className="text-xs opacity-60">{postCount} {t('d_stat_posts')}</p>
            </div>
          </div>
          <ArrowUpRight className="h-4 w-4 opacity-60" />
        </Link>
        <Link
          href="/dashboard/works"
          className="paper-card flex items-center justify-between p-5 transition-colors hover:border-primary"
          style={{ borderColor: 'var(--rule)' }}
        >
          <div className="flex items-center gap-3">
            <Briefcase className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">{t('d_manage_works')}</p>
              <p className="text-xs opacity-60">{workCount} {t('d_stat_works')}</p>
            </div>
          </div>
          <ArrowUpRight className="h-4 w-4 opacity-60" />
        </Link>
      </section>
    </div>
  );
}
