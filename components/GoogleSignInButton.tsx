'use client';

import { useEffect, useState } from 'react';
import { signIn, getProviders } from 'next-auth/react';

// next-auth/react (v5 beta) 未导出 Provider 类型，这里从 getProviders 返回值推导
type AnyProvider = NonNullable<Awaited<ReturnType<typeof getProviders>>>[string];

/** Google 四色品牌标记（品牌 logo，非 emoji） */
export function GoogleIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

/**
 * 谷歌登录按钮：运行时通过 getProviders() 探测 google provider 是否注册，
 * 注册才渲染（避免“死按钮”漂移）。点击走 Auth.js 的 google 登录流。
 */
export function GoogleSignInButton({
  label = 'Google',
  callbackUrl = '/dashboard',
  className = '',
}: {
  label?: string;
  callbackUrl?: string;
  className?: string;
}) {
  const [googleProvider, setGoogleProvider] = useState<AnyProvider | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getProviders()
      .then((p) => {
        if (active) setGoogleProvider(p?.google ?? null);
      })
      .catch(() => {
        if (active) setGoogleProvider(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  if (loading || !googleProvider) return null;

  return (
    <button
      type="button"
      onClick={() => signIn('google', { callbackUrl })}
      className={
        'inline-flex h-8 items-center gap-2 rounded-full border border-[color:var(--rule)] bg-[color:var(--paper)] px-3 text-xs font-medium text-[color:var(--ink)] transition-colors hover:border-[color:var(--primary)] ' +
        className
      }
    >
      <GoogleIcon />
      <span>{label}</span>
    </button>
  );
}
