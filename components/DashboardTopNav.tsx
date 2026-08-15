'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, FileText, Briefcase, Crown, BarChart3, type LucideIcon } from 'lucide-react';
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
  { href: '/dashboard/membership', labelKey: 'nav_membership', icon: Crown },
  { href: '/dashboard/analytics', labelKey: 'nav_analytics', icon: BarChart3 },
];

/**
 * Dashboard 顶部横向导航栏（登录后后台页面使用）。
 * 与 DashboardNav（侧边栏）共享同一套 ITEMS + i18n key，
 * 但以 sticky top bar 形式呈现，方便移动端和桌面端快速切换。
 */
export function DashboardTopNav() {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--rule)] bg-[color:var(--paper)]/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center gap-1 overflow-x-auto px-4 py-2 md:gap-2">
        {ITEMS.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? 'bg-primary/10 text-primary'
                  : 'opacity-70 hover:bg-black/5 hover:opacity-100 dark:hover:bg-white/10'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className="h-4 w-4" />
              <span className="whitespace-nowrap">{t(item.labelKey)}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
