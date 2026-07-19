'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Mail } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

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
    <form onSubmit={handleLogin} className="paper-card p-6">
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
  );
}
