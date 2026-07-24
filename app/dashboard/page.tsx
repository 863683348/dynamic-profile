'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LoginButton } from '@/components/LoginButton';
import {
  ProfileForm,
  type ProfileFormData,
} from '@/components/ProfileForm';
import { PostComposer, type PostDraft } from '@/components/PostComposer';
import { Loader2, Eye, EyeOff, Crown } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { TopControls } from '@/components/TopControls';
import type { Profile, Post, PlanStatus, PostCategory } from '@/lib/types';

const POLAR_ENABLED = process.env.NEXT_PUBLIC_POLAR_ENABLED === 'true';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const { t, lang } = useI18n();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [sub, setSub] = useState<PlanStatus | null>(null);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const [upgrading, setUpgrading] = useState<false | 'monthly' | 'yearly'>(false);
  const [thanks, setThanks] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fmtDate = (s: string | null) =>
    s ? new Date(s).toLocaleDateString(lang === 'en' ? 'en-US' : 'zh-CN') : '';

  // 单条内容卡片（动态/作品共用）
  function PostItem({ post, onToggle, t: _t, lang: _lang }: {
    post: Post; onToggle: (p: Post) => void; t: (k: string, r?: Record<string, string>) => string; lang: string;
  }) {
    return (
      <article className="paper-card flex items-start justify-between gap-4 p-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="magazine-title truncate text-lg">{post.title}</h3>
            <span className="source-badge">
              {post.source === 'github' ? _t('source_github') : _t('source_manual')}
            </span>
          </div>
          <p className="mt-1 text-xs opacity-60">
            {new Date(post.created_at).toLocaleDateString(_lang === 'en' ? 'en-US' : 'zh-CN')} ·{' '}
            {post.status === 'published' ? _t('d_status_published') : _t('d_status_draft')}
          </p>
        </div>
        <button
          type="button"
          className="mag-btn mag-btn-secondary shrink-0"
          onClick={() => onToggle(post)}
          title={post.status === 'published' ? _t('d_draft_aria') : _t('d_publish_aria')}
        >
          {post.status === 'published' ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
          {post.status === 'published' ? _t('d_to_draft') : _t('d_publish_action')}
        </button>
      </article>
    );
  }

  // 已登录后，经 GET /api/me 读取当前用户的档案与动态（浏览器不直接连库）。
  const loadData = useCallback(async () => {
    try {
      const res = await fetch('/api/me');
      if (!res.ok) return;
      const json = await res.json();
      setProfile(json.profile ?? null);
      setPosts(json.posts ?? []);
      // 套餐状态
      const resSub = await fetch('/api/subscription');
      if (resSub.ok) setSub(await resSub.json());
    } catch {
      /* 忽略：下次进入再加载 */
    }
  }, []);

  // 升级成功回跳（?upgraded=1）时显示感谢提示
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('upgraded') === '1') setThanks(true);
    }
  }, []);

  async function handleUpgrade(plan: 'monthly' | 'yearly') {
    setUpgrading(plan);
    setError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const json = await res.json();
      if (!res.ok || !json.url) throw new Error(json?.message ?? t('plan_upgrading'));
      window.location.href = json.url;
    } catch (e) {
      setUpgrading(false);
      setError(e instanceof Error ? e.message : t('plan_upgrading'));
    }
  }

  useEffect(() => {
    if (status === 'authenticated') void loadData();
  }, [status, loadData]);

  async function handleSaveProfile(data: ProfileFormData) {
    setSavingProfile(true);
    setError(null);
    setMsg(null);
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message ?? t('d_err_save'));

      const saved = json.profile as Profile;
      setProfile(saved);
      setMsg(t('d_msg_saved'));
    } catch (e) {
      setError(e instanceof Error ? e.message : t('d_err_save'));
    } finally {
      setSavingProfile(false);
    }
  }

  async function handlePublish(data: PostDraft) {
    if (!profile?.handle) {
      setError(t('d_need_profile'));
      return;
    }
    setSavingPost(true);
    setError(null);
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // createPost 要求 body 带 handle（归属校验）
        body: JSON.stringify({
          handle: profile.handle,
          title: data.title,
          content: data.content,
          category: data.category,
          status: data.status,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message ?? t('d_err_publish'));

      const created = json.post as Post;
      setPosts((prev) => [created, ...prev]);
      setMsg(t('d_msg_published'));
    } catch (e) {
      setError(e instanceof Error ? e.message : t('d_err_publish'));
    } finally {
      setSavingPost(false);
    }
  }

  async function handleToggleStatus(post: Post) {
    const next = post.status === 'published' ? 'draft' : 'published';
    // 乐观更新
    setPosts((prev) =>
      prev.map((p) => (p.id === post.id ? { ...p, status: next } : p))
    );
    try {
      const res = await fetch(`/api/posts/${post.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error(t('d_err_status'));
    } catch (e) {
      // 失败回滚
      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? { ...p, status: post.status } : p))
      );
      setError(e instanceof Error ? e.message : t('d_err_status'));
    }
  }

  if (status === 'loading') {
    return (
      <main className="theme-surface flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin opacity-60" />
      </main>
    );
  }

  // 未登录：展示邮箱登录
  if (!session?.user) {
    return (
      <main className="theme-surface min-h-screen">
        <TopControls />
        <div className="mx-auto max-w-md px-6 py-20">
          <h1 className="magazine-title text-3xl">{t('d_login_title')}</h1>
          <p className="mt-2 text-sm opacity-80">
            {t('d_login_desc')}
          </p>
          <div className="mt-8">
            <LoginButton />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="theme-surface min-h-screen">
      <TopControls />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="double-rule mb-8 flex items-center justify-between px-1 py-3">
          <span className="text-xs uppercase tracking-[0.2em] opacity-70">{t('d_console')}</span>
          {profile?.handle && (
            <a
              href={`/${profile.handle}`}
              className="text-sm text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('d_view_public')}
            </a>
          )}
        </div>

        {msg && <p className="mb-4 text-sm text-primary">{msg}</p>}
        {error && <p className="mb-4 text-sm text-primary">{error}</p>}

        <section className="paper-card mb-8 p-6">
          <div className="flex items-center justify-between">
            <h2 className="magazine-title text-xl">{t('plan_section')}</h2>
            <span
              className={`source-badge flex items-center gap-1 ${
                sub?.plan === 'pro' ? 'text-primary' : ''
              }`}
            >
              {sub?.plan === 'pro' && <Crown className="h-3.5 w-3.5" />}
              {sub?.plan === 'pro' ? t('plan_pro') : t('plan_free')}
            </span>
          </div>

          {thanks && <p className="mt-3 text-sm text-primary">{t('plan_thanks')}</p>}

          {sub?.plan === 'pro' ? (
            <div className="mt-4 space-y-2 text-sm">
              <p className="opacity-80">
                {sub.status === 'canceled' && sub.cancel_at_period_end
                  ? t('plan_canceled', { date: fmtDate(sub.current_period_end) })
                  : t('plan_active')}
              </p>
              {sub.current_period_end && sub.status !== 'canceled' && (
                <p className="opacity-60">
                  {t('plan_renew', { date: fmtDate(sub.current_period_end) })}
                </p>
              )}
              <p className="opacity-60">{t('plan_manage_note')}</p>
            </div>
          ) : (
            <div className="mt-4">
              <p className="text-sm opacity-70">{t('plan_upgrade')}</p>
              <ul className="my-3 space-y-1 text-sm opacity-80">
                <li>· {t('plan_b1')}</li>
                <li>· {t('plan_b2')}</li>
                <li>· {t('plan_b3')}</li>
              </ul>
              {POLAR_ENABLED ? (
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="mag-btn"
                    disabled={!!upgrading}
                    onClick={() => handleUpgrade('monthly')}
                  >
                    {upgrading === 'monthly' ? t('plan_upgrading') : t('plan_monthly')}
                  </button>
                  <button
                    type="button"
                    className="mag-btn mag-btn-secondary"
                    disabled={!!upgrading}
                    onClick={() => handleUpgrade('yearly')}
                  >
                    {upgrading === 'yearly'
                      ? t('plan_upgrading')
                      : `${t('plan_yearly')} · ${t('plan_yearly_save')}`}
                  </button>
                </div>
              ) : (
                <p className="text-sm opacity-60">{t('plan_comming')}</p>
              )}
            </div>
          )}
        </section>

        <section className="paper-card mb-8 p-6">
          <h2 className="magazine-title text-xl">{t('d_section_profile')}</h2>
          <p className="mb-4 text-sm opacity-70">
            {profile ? t('d_profile_edit') : t('d_profile_create')}
          </p>
          <ProfileForm
            initial={profile}
            saving={savingProfile}
            onSubmit={handleSaveProfile}
          />
        </section>

        <section className="mb-8">
          {profile ? (
            <PostComposer onPublish={handlePublish} saving={savingPost} />
          ) : (
            <p className="text-sm opacity-60">{t('d_create_first')}</p>
          )}
        </section>

        {/* ===== 动态区（category = post）===== */}
        <section>
          <h2 className="magazine-title mb-4 text-xl">{t('d_my_posts', { n: posts.filter(p => p.category === 'post').length })}</h2>
          {posts.filter(p => p.category === 'post').length === 0 ? (
            <p className="text-sm opacity-60">{t('d_no_posts')}</p>
          ) : (
            <div className="space-y-3">
              {posts.filter(p => p.category === 'post').map((p) => (
                <PostItem key={p.id} post={p} onToggle={handleToggleStatus} t={t} lang={lang} />
              ))}
            </div>
          )}
        </section>

        {/* ===== 作品区（category = work）===== */}
        <section>
          <h2 className="magazine-title mb-4 text-xl">{t('d_my_works', { n: posts.filter(p => p.category === 'work').length })}</h2>
          {posts.filter(p => p.category === 'work').length === 0 ? (
            <p className="text-sm opacity-60">{t('d_no_works')}</p>
          ) : (
            <div className="space-y-3">
              {posts.filter(p => p.category === 'work').map((p) => (
                <PostItem key={p.id} post={p} onToggle={handleToggleStatus} t={t} lang={lang} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
