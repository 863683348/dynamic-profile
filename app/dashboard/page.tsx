'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import type { Profile, Post } from '@/lib/types';
import { LoginButton } from '@/components/LoginButton';
import {
  ProfileForm,
  type ProfileFormData,
} from '@/components/ProfileForm';
import { PostComposer, type PostDraft } from '@/components/PostComposer';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { TopControls } from '@/components/TopControls';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const { t, lang } = useI18n();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 已登录后，经 GET /api/me 读取当前用户的档案与动态（浏览器不直接连库）。
  const loadData = useCallback(async () => {
    try {
      const res = await fetch('/api/me');
      if (!res.ok) return;
      const json = await res.json();
      setProfile(json.profile ?? null);
      setPosts(json.posts ?? []);
    } catch {
      /* 忽略：下次进入再加载 */
    }
  }, []);

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

        <section>
          <h2 className="magazine-title mb-4 text-xl">{t('d_my_posts', { n: posts.length })}</h2>
          {posts.length === 0 ? (
            <p className="text-sm opacity-60">{t('d_no_posts')}</p>
          ) : (
            <div className="space-y-3">
              {posts.map((p) => (
                <article
                  key={p.id}
                  className="paper-card flex items-start justify-between gap-4 p-4"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="magazine-title truncate text-lg">{p.title}</h3>
                      <span className="source-badge">
                        {p.source === 'github' ? t('source_github') : t('source_manual')}
                      </span>
                    </div>
                    <p className="mt-1 text-xs opacity-60">
                      {new Date(p.created_at).toLocaleDateString(lang === 'en' ? 'en-US' : 'zh-CN')} ·{' '}
                      {p.status === 'published' ? t('d_status_published') : t('d_status_draft')}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="mag-btn mag-btn-secondary shrink-0"
                    onClick={() => handleToggleStatus(p)}
                    title={p.status === 'published' ? t('d_draft_aria') : t('d_publish_aria')}
                  >
                    {p.status === 'published' ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    {p.status === 'published' ? t('d_to_draft') : t('d_publish_action')}
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
