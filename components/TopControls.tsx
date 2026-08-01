'use client';

import { useEffect, useState } from 'react';
import { useSession, signIn, signOut, getProviders } from 'next-auth/react';
import { LangToggle } from './LangToggle';
import { ThemeToggle } from './ThemeToggle';
import { LogOut, User } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

// 从 getProviders 返回值推导 provider 元素类型（该版本 next-auth 未导出 ClientSafeProvider）
type AnyProvider = NonNullable<Awaited<ReturnType<typeof getProviders>>>[string];

// Google 品牌 "G" 标记（标准四色）
function GoogleIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-${size / 4} w-${size / 4}`} style={{ width: size, height: size }} aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z" />
    </svg>
  );
}

/**
 * 右上角统一控制簇：语言（中/EN）+ 亮暗切换 + Google 登录/用户菜单。
 * 固定悬浮于页面右上角，所有页面复用。
 */
export function TopControls() {
  const { data: session, status } = useSession();
  const { t } = useI18n();

  // Google provider 探测（与 LoginButton 同一逻辑）
  const [googleProvider, setGoogleProvider] = useState<AnyProvider | null>(null);
  const [providersLoading, setProvidersLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getProviders()
      .then((providers) => {
        if (!active) return;
        setGoogleProvider(providers?.google ?? null);
      })
      .catch(() => {
        if (active) setGoogleProvider(null);
      })
      .finally(() => {
        if (active) setProvidersLoading(false);
      });
    return () => { active = false; };
  }, []);

  const googleEnabled = Boolean(googleProvider);

  async function handleGoogleLogin() {
    await signIn('google', { callbackUrl: '/dashboard' });
  }

  async function handleLogout() {
    await signOut({ callbackUrl: '/' });
  }

  return (
    <div className="fixed right-4 top-3 z-50 flex items-center gap-2">
      {/* 未登录 + Google 可用 → 显示 Google 登录按钮 */}
      {status !== 'loading' && status !== 'authenticated' && googleEnabled && !providersLoading && (
        <button
          type="button"
          onClick={handleGoogleLogin}
          aria-label="Sign in with Google"
          className="flex h-7 items-center gap-1.5 rounded-full border border-[color:var(--rule)] bg-white px-2.5 text-xs font-medium transition-colors hover:bg-gray-50"
          style={{ backdropFilter: 'blur(4px)' }}
        >
          <GoogleIcon size={14} />
          <span className="hidden sm:inline">Google</span>
        </button>
      )}

      {/* 已登录 → 显示用户名 + 退出链接 */}
      {status === 'authenticated' && (
        <div className="flex items-center gap-2">
          <span className="max-w-[120px] truncate text-xs font-medium text-[color:var(--ink)]">
            {session.user?.name || session.user?.email || 'User'}
          </span>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1 rounded-full border border-[color:var(--rule)] bg-[color:var(--paper)] px-2 py-1 text-xs transition-colors hover:border-red-300 hover:text-red-500"
            style={{ backdropFilter: 'blur(4px)' }}
          >
            <LogOut className="h-3 w-3" />
            <span className="hidden sm:inline">{t('logout') || '退出'}</span>
          </button>
        </div>
      )}

      <LangToggle />
      <ThemeToggle />
    </div>
  );
}
