'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Mail } from 'lucide-react';

export function LoginButton() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('请输入有效的邮箱地址');
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
      if (res?.error) throw new Error('登录失败，请重试');
      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : '登录失败');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleLogin} className="paper-card p-6">
      <label className="mag-label" htmlFor="login-email">
        邮箱（任意邮箱即可登录）
      </label>
      <div className="flex gap-2">
        <input
          id="login-email"
          type="email"
          className="mag-input"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="mag-btn" disabled={loading}>
          <Mail className="h-4 w-4" />
          {loading ? '登录中' : '登录'}
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-primary">{error}</p>}
    </form>
  );
}
