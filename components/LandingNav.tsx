'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { LangToggle } from './LangToggle';
import { ThemeToggle } from './ThemeToggle';
import { Logo } from './Logo';

/**
 * 落地页顶栏：左上角 Logo，中部锚点导航，右上角 语言切换 + 亮暗切换。
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

        <div className="flex items-center gap-2">
          <LangToggle />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
