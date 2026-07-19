'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { TopControls } from '@/components/TopControls';

export default function LandingPage() {
  const { t } = useI18n();

  return (
    <main className="theme-surface min-h-screen">
      <TopControls />
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-6 sm:py-20">
        <div className="double-rule mb-10 flex items-center justify-between px-1 py-3">
          <span className="text-xs uppercase tracking-[0.2em] opacity-70">
            {t('brand')}
          </span>
        </div>

        <h1 className="magazine-title text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
          {t('hero_a')}
          <br />
          {t('hero_b')}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-80">
          {t('hero_sub')}
        </p>

        <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
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

        <div className="double-rule mt-16 px-1 py-4 text-sm opacity-70">
          {t('sample_label')}
          <Link href="/linxi" className="text-primary underline-offset-2 hover:underline">
            @linxi
          </Link>{' '}
          {t('sample_style')}
        </div>
      </div>
    </main>
  );
}
