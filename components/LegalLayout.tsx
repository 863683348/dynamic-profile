'use client';

import type { ReactNode } from 'react';
import { useI18n } from '@/lib/i18n';
import { SiteFooter } from '@/components/SiteFooter';
import { LandingNav } from '@/components/LandingNav';

/**
 * 公共页面统一外壳：顶部 LandingNav（logo + 锚点导航） + 内容 + 底部。
 * 顶部右上角的 谷歌登录 / 用户菜单 / 语言 / 主题 由根布局里挂的浮动 TopControls 全站提供。
 * /pricing /blog /faq 等都用此组件，确保三个页面顶部导航完全一致，登录前后由 TopControls 自动同步。
 */
export function LegalLayout({ title, children }: { title: string; children: ReactNode }) {
  const { t } = useI18n();
  return (
    <main className="theme-surface min-h-screen">
      <LandingNav />
      <div className="mx-auto max-w-3xl px-6 py-12">
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
