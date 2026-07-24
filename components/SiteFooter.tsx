'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';

export function SiteFooter() {
  const { t } = useI18n();
  const links = [
    { href: '/pricing', label: t('nav_pricing') },
    { href: '/privacy', label: t('nav_privacy') },
    { href: '/terms', label: t('nav_terms') },
    { href: '/faq', label: t('nav_faq') },
    { href: '/blog', label: t('nav_blog') },
    { href: '/contact', label: t('nav_contact') },
  ];

  return (
    <footer className="mt-16 border-t border-black/10 pt-8">
      <div className="mx-auto max-w-3xl px-6">
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm opacity-80">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:text-primary hover:underline"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="mt-4 text-xs opacity-60">{t('footer_brand')}</p>
      </div>
    </footer>
  );
}
