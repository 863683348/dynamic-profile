'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState, type CSSProperties } from 'react';
import { DashboardNav } from '@/components/DashboardNav';
import { fetchMe } from '@/lib/meCache';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const [style, setStyle] = useState('magazine');
  const [primary, setPrimary] = useState<string | undefined>(undefined);

  // 跟随所选风格 + 主题色（与公开主页一致）
  useEffect(() => {
    if (status !== 'authenticated') return;
    fetchMe()
      .then((j) => {
        if (j?.profile) {
          setStyle((j.profile as { style?: string }).style || 'magazine');
          setPrimary((j.profile as { theme_color?: string }).theme_color || undefined);
        }
      })
      .catch(() => {});
  }, [status]);

  return (
    <main
      className="theme-surface min-h-screen"
      data-style={style}
      style={{ '--primary': primary } as CSSProperties}
    >
      {status === 'authenticated' ? (
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 md:flex-row">
          <DashboardNav />
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      ) : (
        <div className="mx-auto max-w-3xl px-6 py-10">{children}</div>
      )}
    </main>
  );
}
