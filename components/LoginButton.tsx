'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Mail } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

// 谷歌登录按钮是否展示：需同时配置 AUTH_GOOGLE_ID/AUTH_GOOGLE_SECRET 且把该公开开关置 true
const googleEnabled = process.env.NEXT_PUBLIC_GOOGLE_ENABLED === 'true';

export function LoginButton() {
  const router = useRouter();
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) {
      setError(t('err_invalid'));
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Auth.js Credentials 邮箱登录（MVP：任意合法邮箱即可）
      const res = await signIn('credentials', {
        email: email.trim().toLowerCase(),
        redirect: false,
      });
      if (res?.error) throw new Error(t('err_login'));
      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : t('err_generic'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="paper-card p-6">
      {googleEnabled && (
        <button
          type="button"
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          className="mag-btn mag-btn-secondary w-full justify-center"
        >
          <GoogleIcon />
          {t('login_google')}
        </button>
      )}

      {googleEnabled && (
        <div className="my-4 flex items-center gap-3 text-xs opacity-60">
          <span className="h-px flex-1 bg-current opacity-30" />
          {t('login_or')}
          <span className="h-px flex-1 bg-current opacity-30" />
        </div>
      )}

      <form onSubmit={handleLogin}>
        <label className="mag-label" htmlFor="login-email">
          {t('label_email')}
        </label>
        <div className="flex gap-2">
          <input
            id="login-email"
            type="email"
            className="mag-input min-w-0"
            placeholder={t('ph_email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="mag-btn shrink-0" disabled={loading}>
            <Mail className="h-4 w-4" />
            {loading ? t('login_loading') : t('login')}
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-primary">{error}</p>}
      </form>
    </div>
  );
}

// Google 品牌 "G" 标记（标准四色），仅用于"使用 Google 登录"按钮
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
      />
    </svg>
  );
}
