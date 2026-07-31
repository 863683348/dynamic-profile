'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, FileText, Briefcase, type LucideIcon } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

type NavItem = {
  href: string;
  labelKey: string;
  icon: LucideIcon;
  exact?: boolean;
};

const ITEMS: NavItem[] = [
  { href: '/dashboard', labelKey: 'nav_overview', icon: Home, exact: true },
  { href: '/dashboard/profile', labelKey: 'nav_profile', icon: User },
  { href: '/dashboard/posts', labelKey: 'nav_posts', icon: FileText },
  { href: '/dashboard/works', labelKey: 'nav_works', icon: Briefcase },
];

export function DashboardNav() {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <nav
      aria-label={t('nav_overview')}
      className="mb-8 flex gap-2 overflow-x-auto border-b pb-2 md:mb-0 md:w-48 md:shrink-0 md:flex-col md:border-b-0 md:border-r md:pb-0 md:pr-6"
      style={{ borderColor: 'var(--rule)' }}
    >
      {ITEMS.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? 'bg-primary/10 text-primary'
                : 'opacity-70 hover:bg-black/5 hover:opacity-100 dark:hover:bg-white/10'
            }`}
            aria-current={active ? 'page' : undefined}
          >
            <Icon className="h-4 w-4" />
            {t(item.labelKey)}
          </Link>
        );
      })}
    </nav>
  );
}
