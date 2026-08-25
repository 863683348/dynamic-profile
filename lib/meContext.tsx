'use client';

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import { fetchMe, clearMeCache } from '@/lib/meCache';
import type { MeData } from '@/lib/me';

type MeContextValue = {
  /** 当前登录用户的后台数据；SSR 首屏已由布局预取注入，客户端导航不丢失。 */
  me: MeData | null;
  /** mutation 后强制刷新（清缓存 + 重新拉 /api/me）。 */
  refresh: () => Promise<void>;
};

const MeContext = createContext<MeContextValue | null>(null);

export function MeProvider({
  initialMe,
  children,
}: {
  initialMe: MeData | null;
  children: ReactNode;
}) {
  const [me, setMe] = useState<MeData | null>(initialMe);

  const refresh = useCallback(async () => {
    clearMeCache();
    const json = await fetchMe(true);
    if (json) setMe(json);
  }, []);

  return (
    <MeContext.Provider value={{ me, refresh }}>{children}</MeContext.Provider>
  );
}

/** 便捷 hook：直接取订阅信息（membership 页用）。 */
export function useSubscription() {
  const { me } = useMe();
  return (me?.sub ?? null) as Awaited<ReturnType<typeof import('@/lib/db/queries').getSubscription>> | null;
}

export function useMe(): MeContextValue {
  const ctx = useContext(MeContext);
  if (!ctx) throw new Error('useMe must be used within <MeProvider>');
  return ctx;
}
