'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { DashboardNav } from '@/components/DashboardNav';
import { DashboardTopNav } from '@/components/DashboardTopNav';
import { useMe } from '@/lib/meContext';

/**
 * Dashboard 布局的客户端外壳（已登录态）。
 * - 跟随 profile 的 style / 主题色（与公开主页一致）；
 * - 渲染顶部横向导航 + 左侧侧边栏 + 内容区。
 * MeContext 由上级服务端布局（app/dashboard/layout.tsx）统一提供。
 */
export function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { me } = useMe();
  const [style, setStyle] = useState('magazine');
  const [primary, setPrimary] = useState<string | undefined>(undefined);

  useEffect(() => {
    const p = me?.profile as
      | { style?: string; theme_color?: string }
      | null
      | undefined;
    if (p) {
      setStyle(p.style || 'magazine');
      setPrimary(p.theme_color || undefined);
    }
  }, [me]);

  return (
    <main
      className="theme-surface min-h-screen"
      data-style={style}
      style={{ '--primary': primary } as CSSProperties}
    >
      <div className="min-h-screen">
        <DashboardTopNav />
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 md:flex-row">
          <DashboardNav />
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </div>
    </main>
  );
}
