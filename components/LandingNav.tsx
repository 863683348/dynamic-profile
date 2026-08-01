'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { Logo } from './Logo';

/**
 * 落地页顶栏：左上角 Logo，中部锚点导航。
 * 右上角的 谷歌登录 / 语言切换 / 亮暗切换 由根布局统一挂的浮动 TopControls 提供（全站一致）。
 * sticky 固定，半透明纸面 + 模糊，承载 design tokens。
 */
export function LandingNav() {
  const { t } = useI18n();
  const links = [
    { href: '#features', label: t('nav_features') },
    { href: '#how', label: t('nav_how') },
    { href: '#showcase', label: t('nav_showcase') },
    { href: '/pricing', label: t('nav_pricing') },
    { href: '/blog', label: t('nav_blog') },
    { href: '/faq', label: t('nav_faq') },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--rule)] bg-[color:var(--paper)]">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5">
        <Logo />

        <div className="hidden items-center gap-6 text-sm md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="opacity-80 transition-opacity hover:text-[color:var(--primary)] hover:opacity-100"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
