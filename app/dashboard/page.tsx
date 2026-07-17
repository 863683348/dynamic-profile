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

export default function DashboardPage() {
  const { data: session, status } = useSession();
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
      if (!res.ok) throw new Error(json?.message ?? '保存失败');

      const saved = json.profile as Profile;
      setProfile(saved);
      setMsg('档案已保存');
    } catch (e) {
      setError(e instanceof Error ? e.message : '保存失败');
    } finally {
      setSavingProfile(false);
    }
  }

  async function handlePublish(data: PostDraft) {
    if (!profile?.handle) {
      setError('请先创建档案');
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
      if (!res.ok) throw new Error(json?.message ?? '发布失败');

      const created = json.post as Post;
      setPosts((prev) => [created, ...prev]);
      setMsg('动态已发布');
    } catch (e) {
      setError(e instanceof Error ? e.message : '发布失败');
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
      if (!res.ok) throw new Error('更新状态失败');
    } catch (e) {
      // 失败回滚
      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? { ...p, status: post.status } : p))
      );
      setError(e instanceof Error ? e.message : '更新状态失败');
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
        <div className="mx-auto max-w-md px-6 py-20">
          <h1 className="magazine-title text-3xl">登录控制台</h1>
          <p className="mt-2 text-sm opacity-80">
            使用邮箱登录后，即可编辑你的动态主页。
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
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="double-rule mb-8 flex items-center justify-between px-1 py-3">
          <span className="text-xs uppercase tracking-[0.2em] opacity-70">编辑台</span>
          {profile?.handle && (
            <a
              href={`/${profile.handle}`}
              className="text-sm text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              查看公开主页 ↗
            </a>
          )}
        </div>

        {msg && <p className="mb-4 text-sm text-primary">{msg}</p>}
        {error && <p className="mb-4 text-sm text-primary">{error}</p>}

        <section className="paper-card mb-8 p-6">
          <h2 className="magazine-title text-xl">档案</h2>
          <p className="mb-4 text-sm opacity-70">
            {profile ? '编辑你的公开信息' : '创建你的档案以生成公开主页'}
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
            <p className="text-sm opacity-60">创建档案后即可发布动态。</p>
          )}
        </section>

        <section>
          <h2 className="magazine-title mb-4 text-xl">我的动态（{posts.length}）</h2>
          {posts.length === 0 ? (
            <p className="text-sm opacity-60">还没有动态。</p>
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
                        {p.source === 'github' ? 'GitHub' : '手动'}
                      </span>
                    </div>
                    <p className="mt-1 text-xs opacity-60">
                      {new Date(p.created_at).toLocaleDateString('zh-CN')} ·{' '}
                      {p.status === 'published' ? '已发布' : '草稿'}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="mag-btn mag-btn-secondary shrink-0"
                    onClick={() => handleToggleStatus(p)}
                    title={p.status === 'published' ? '转为草稿' : '发布'}
                  >
                    {p.status === 'published' ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    {p.status === 'published' ? '下架' : '发布'}
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
