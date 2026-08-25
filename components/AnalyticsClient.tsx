'use client';

import Link from 'next/link';
import {
  BarChart3,
  Eye,
  Users,
  Link2,
  Lock,
  ArrowUpRight,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { LoginButton } from '@/components/LoginButton';
import type { AnalyticsData } from '@/lib/analytics';

type Props =
  | { kind: 'unauth' }
  | { kind: 'proOnly' }
  | { kind: 'data'; data: AnalyticsData };

export function AnalyticsClient({ result }: { result: Props }) {
  const { t } = useI18n();

  if (result.kind === 'unauth') {
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

  if (result.kind === 'proOnly') {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Lock className="h-6 w-6" />
        </div>
        <h1 className="magazine-title text-2xl">{t('analytics_pro_only')}</h1>
        <p className="mt-2 text-sm opacity-70">{t('analytics_upgrade')}</p>
        <Link
          href="/pricing"
          className="mag-btn mx-auto mt-6 flex w-fit items-center gap-2"
        >
          <ArrowUpRight className="h-4 w-4" />
          {t('pro_upgrade_link')}
        </Link>
      </div>
    );
  }

  const data = result.data;
  const maxPv = Math.max(1, ...data.trend.map((p) => p.pv));

  return (
    <div>
      <div className="double-rule mb-8 flex items-center justify-between px-1 py-3">
        <span className="text-xs uppercase tracking-[0.2em] opacity-70">
          {t('nav_analytics')}
        </span>
      </div>

      <div className="mb-8">
        <h1 className="magazine-title text-2xl">{t('analytics_title')}</h1>
        <p className="mt-1 text-sm opacity-70">{t('analytics_desc')}</p>
      </div>

      {/* 指标卡 */}
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <Metric
          icon={Eye}
          label={t('analytics_total')}
          value={data.totalViews.toLocaleString()}
        />
        <Metric
          icon={Users}
          label={t('analytics_uv')}
          value={data.uv.toLocaleString()}
        />
        <Metric
          icon={Link2}
          label={t('analytics_loggedin')}
          value={`${Math.round(data.loggedRatio * 100)}%`}
        />
      </div>

      {/* 趋势 */}
      <section className="paper-card mb-6 p-6">
        <h2 className="magazine-title text-xl">{t('analytics_trend')}</h2>
        {data.trend.length === 0 ? (
          <p className="mt-6 text-sm opacity-60">{t('analytics_none')}</p>
        ) : (
          <div className="mt-5 flex h-32 items-end gap-1">
            {data.trend.map((p) => (
              <div
                key={p.day}
                className="group flex flex-1 flex-col items-center justify-end"
                title={`${p.day.slice(5)} · ${p.pv}`}
              >
                <div
                  className="w-full rounded-sm bg-primary/80"
                  style={{ height: `${(p.pv / maxPv) * 100}%`, minHeight: 2 }}
                />
                <span className="mt-1 hidden text-[10px] opacity-50 group-hover:block">
                  {p.day.slice(5)}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 来源 */}
      <section className="paper-card p-6">
        <h2 className="magazine-title text-xl">{t('analytics_sources')}</h2>
        {data.sources.length === 0 ? (
          <p className="mt-6 text-sm opacity-60">{t('analytics_none')}</p>
        ) : (
          <ul className="mt-4 divide-y" style={{ borderColor: 'var(--rule)' }}>
            {data.sources.map((s) => (
              <li
                key={s.domain}
                className="flex items-center justify-between gap-3 py-2.5 text-sm"
                style={{ borderColor: 'var(--rule)' }}
              >
                <span className="truncate">{s.domain}</span>
                <span className="source-badge shrink-0 opacity-70">{s.cnt}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Eye;
  label: string;
  value: string;
}) {
  return (
    <div className="paper-card flex items-center gap-3 p-5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-2xl font-semibold leading-none">{value}</p>
        <p className="mt-1.5 text-xs opacity-60">{label}</p>
      </div>
    </div>
  );
}
