'use client';

import type { ReactNode } from 'react';
import { useI18n } from '@/lib/i18n';
import { TopControls } from '@/components/TopControls';
import { SiteFooter } from '@/components/SiteFooter';

export function LegalLayout({ title, children }: { title: string; children: ReactNode }) {
  const { t } = useI18n();
  return (
    <main className="theme-surface min-h-screen">
      <TopControls />
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="double-rule mb-8 flex items-center justify-between px-1 py-3">
          <span className="text-xs uppercase tracking-[0.2em] opacity-70">
            {t('brand')}
          </span>
        </div>
        <h1 className="magazine-title text-3xl sm:text-4xl">{title}</h1>
        <div className="mt-8 space-y-7 leading-relaxed">{children}</div>
      </div>
      <SiteFooter />
    </main>
  );
}

export function Block({ h, b }: { h: string; b: string }) {
  return (
    <section>
      <h2 className="magazine-title mb-2 text-xl">{h}</h2>
      <p className="text-sm opacity-80">{b}</p>
    </section>
  );
}
