'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { DashboardTopNav } from '@/components/DashboardTopNav';
import { useMe } from '@/lib/meContext';

/**
 * Dashboard 布局的客户端外壳（已登录态）。
 * - 跟随 profile 的 style / 主题色（与公开主页一致）；
 * - 渲染顶部横向导航 + 内容区（左侧侧边栏已移除，菜单统一在顶栏）。
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
        <div className="mx-auto max-w-5xl px-4 py-8">
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </main>
  );
}
