'use client';

import Link from 'next/link';
import {
  ArrowRight,
  LayoutGrid,
  PenTool,
  Code2,
  Palette,
  Smartphone,
  BarChart3,
  Check,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { LandingNav } from '@/components/LandingNav';
import { SiteFooter } from '@/components/SiteFooter';

const FEATURE_ICONS = [LayoutGrid, PenTool, Code2, Palette, Smartphone, BarChart3];

export default function LandingPage() {
  const { t } = useI18n();

  const features = [
    { t: t('feat1_t'), d: t('feat1_d') },
    { t: t('feat2_t'), d: t('feat2_d') },
    { t: t('feat3_t'), d: t('feat3_d') },
    { t: t('feat4_t'), d: t('feat4_d') },
    { t: t('feat5_t'), d: t('feat5_d') },
    { t: t('feat6_t'), d: t('feat6_d') },
  ];

  const steps = [
    { t: t('step1_t'), d: t('step1_d') },
    { t: t('step2_t'), d: t('step2_d') },
    { t: t('step3_t'), d: t('step3_d') },
  ];

  const quotes = [
    { q: t('quote1'), r: t('quote1_role') },
    { q: t('quote2'), r: t('quote2_role') },
    { q: t('quote3'), r: t('quote3_role') },
  ];

  const stats = [
    { n: t('stat_t1_num'), l: t('stat_t1_label') },
    { n: t('stat_t2_num'), l: t('stat_t2_label') },
    { n: t('stat_t3_num'), l: t('stat_t3_label') },
    { n: t('stat_t4_num'), l: t('stat_t4_label') },
  ];

  const faqs = [
    { q: t('faq_q1'), a: t('faq_a1') },
    { q: t('faq_q2'), a: t('faq_a2') },
    { q: t('faq_q3'), a: t('faq_a3') },
  ];

  return (
    <main className="theme-surface min-h-screen">
      <LandingNav />

      {/* ───────── Hero ───────── */}
      <section className="relative mx-auto max-w-6xl px-5 pb-10 pt-14 sm:pt-20">
        <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--rule)] px-3 py-1 text-xs opacity-80">
          <span className="status-dot" />
          {t('hero_badge')}
        </span>

        <h1 className="magazine-title mt-5 max-w-3xl text-4xl leading-[1.1] sm:text-5xl md:text-6xl">
          {t('hero_a')}
          <br />
          {t('hero_b')}
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-80">
          {t('hero_sub')}
        </p>

        <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Link href="/dashboard" className="mag-btn w-full justify-center sm:w-auto">
            {t('cta_console')}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/linxi"
            className="mag-btn mag-btn-secondary w-full justify-center sm:w-auto"
          >
            {t('cta_sample')}
          </Link>
        </div>

        {/* 样本主页 mockup（浏览器框） */}
        <div className="paper-card mx-auto mt-14 max-w-3xl overflow-hidden text-left">
          <div className="flex items-center gap-1.5 border-b border-[color:var(--rule)] px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--rule)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--rule)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--rule)]" />
            <span className="ml-3 truncate text-xs opacity-50">
              dynamic-profile.shop/linxi
            </span>
          </div>
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--primary)] magazine-title text-2xl text-primary">
                L
              </div>
              <div>
                <h3 className="magazine-title text-2xl">林夕 Linxi</h3>
                <p className="text-sm opacity-60">{t('about_handle')}: @linxi · 正在构建有趣的东西</p>
              </div>
            </div>
            <p className="mt-4 text-sm opacity-80">
              独立设计师，把日常灵感与作品排成一本杂志。
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="link-chip">作品集 ↗</span>
              <span className="link-chip">GitHub ↗</span>
              <span className="link-chip">邮箱 ↗</span>
            </div>
            <div className="posts-list mt-6 border-t border-[color:var(--rule)]">
              <article>
                <p className="text-xs uppercase tracking-[0.18em] opacity-50">
                  {t('posts')}
                </p>
                <h4 className="magazine-title mt-1 text-lg">新的视觉实验</h4>
                <p className="mt-1 text-sm opacity-75">
                  本周尝试了编辑风网格排版，记录在这里。
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 统计带 ───────── */}
      <section className="border-y border-[color:var(--rule)] bg-[color:var(--paper)]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="px-5 py-8 text-center">
              <div className="magazine-title text-3xl text-[color:var(--primary)] sm:text-4xl">
                {s.n}
              </div>
              <div className="mt-1 text-sm opacity-70">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ───────── 功能 ───────── */}
      <section id="features" className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--primary)]">
          {t('nav_features')}
        </p>
        <h2 className="magazine-title mt-2 text-3xl sm:text-4xl">
          {t('feat1_t')} · {t('feat2_t')} · {t('feat6_t')}
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = FEATURE_ICONS[i];
            return (
              <div
                key={f.t}
                className="paper-card p-6 transition-colors hover:border-[color:var(--primary)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-[color:var(--rule)] text-[color:var(--primary)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="magazine-title mt-4 text-xl">{f.t}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-80">{f.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ───────── 三步流程 ───────── */}
      <section id="how" className="bg-[color:var(--paper)]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--primary)]">
            {t('nav_how')}
          </p>
          <h2 className="magazine-title mt-2 text-3xl sm:text-4xl">{t('how_title')}</h2>
          <p className="mt-2 opacity-70">{t('how_sub')}</p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.t} className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--primary)] text-[color:var(--primary)] magazine-title">
                  {i + 1}
                </div>
                <h3 className="magazine-title mt-4 text-xl">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-80">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 案例展示 ───────── */}
      <section id="showcase" className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--primary)]">
              {t('nav_showcase')}
            </p>
            <h2 className="magazine-title mt-2 text-3xl sm:text-4xl">
              {t('showcase_title')}
            </h2>
            <p className="mt-3 max-w-md opacity-80">{t('showcase_sub')}</p>
            <Link
              href="/linxi"
              className="mag-btn mt-6 w-full justify-center sm:w-auto"
            >
              {t('showcase_view')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="paper-card overflow-hidden">
            <div className="flex items-center gap-4 border-b border-[color:var(--rule)] p-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--primary)] magazine-title text-xl text-primary">
                L
              </div>
              <div>
                <h3 className="magazine-title text-xl">林夕 Linxi</h3>
                <p className="text-sm opacity-60">@linxi</p>
              </div>
            </div>
            <div className="p-6">
              <div className="posts-list">
                <article>
                  <p className="text-xs uppercase tracking-[0.18em] opacity-50">
                    {t('posts')}
                  </p>
                  <h4 className="magazine-title mt-1 text-lg">周末的排版练习</h4>
                  <p className="mt-1 text-sm opacity-75">
                    用网格系统重排了三篇旧文，阅读节奏舒服多了。
                  </p>
                </article>
                <article>
                  <h4 className="magazine-title mt-1 text-lg">新作品上架</h4>
                  <p className="mt-1 text-sm opacity-75">
                    一组关于城市光影的插画，已放进作品集。
                  </p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 用户评价 ───────── */}
      <section className="bg-[color:var(--paper)]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <h2 className="magazine-title text-3xl sm:text-4xl">{t('voices_title')}</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {quotes.map((c) => (
              <figure
                key={c.r}
                className="paper-card flex flex-col p-6"
              >
                <blockquote className="flex-1 text-sm leading-relaxed opacity-85">
                  “{c.q}”
                </blockquote>
                <figcaption className="mt-4 border-t border-[color:var(--rule)] pt-3 text-sm">
                  <span className="text-[color:var(--primary)]">— </span>
                  {c.r}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 定价引导 ───────── */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="paper-card flex flex-col items-center gap-6 p-8 text-center sm:p-12">
          <h2 className="magazine-title max-w-2xl text-3xl sm:text-4xl">
            {t('pricing_teaser_title')}
          </h2>
          <p className="max-w-md opacity-80">{t('pricing_teaser_sub')}</p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm opacity-80">
            <li className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-[color:var(--primary)]" />
              {t('free_b1')}
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-[color:var(--primary)]" />
              {t('plan_b1')}
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-[color:var(--primary)]" />
              {t('plan_b3')}
            </li>
          </ul>
          <Link href="/pricing" className="mag-btn w-full justify-center sm:w-auto">
            {t('pricing_teaser_cta')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ───────── FAQ 引导 ───────── */}
      <section className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
        <h2 className="magazine-title text-3xl sm:text-4xl">{t('faq_teaser_title')}</h2>
        <div className="mt-8 space-y-6">
          {faqs.map((f) => (
            <div key={f.q} className="border-t border-[color:var(--rule)] pt-5">
              <h3 className="magazine-title text-lg">{f.q}</h3>
              <p className="mt-2 text-sm leading-relaxed opacity-80">{f.a}</p>
            </div>
          ))}
        </div>
        <Link
          href="/faq"
          className="mag-btn mag-btn-secondary mt-8 w-full justify-center sm:w-auto"
        >
          {t('faq_teaser_more')}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* ───────── 最终 CTA ───────── */}
      <section className="border-t border-[color:var(--rule)] bg-[color:var(--paper)]">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:py-20">
          <h2 className="magazine-title text-3xl sm:text-4xl">{t('cta_final_title')}</h2>
          <p className="mx-auto mt-3 max-w-md opacity-80">{t('cta_final_sub')}</p>
          <Link href="/dashboard" className="mag-btn mt-8 w-full justify-center sm:w-auto">
            {t('cta_final_btn')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
