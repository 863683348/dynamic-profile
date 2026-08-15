'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { PostComposer, type PostDraft } from '@/components/PostComposer';
import type { Post, Work, PostStatus } from '@/lib/types';

export type ContentCategory = 'post' | 'work';

export function ContentManager({ category }: { category: ContentCategory }) {
  const { t, lang } = useI18n();
  const [posts, setPosts] = useState<Post[]>([]);
  const [works, setWorks] = useState<Work[]>([]);
  const [handle, setHandle] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [composerOpen, setComposerOpen] = useState(false);
  const [editing, setEditing] = useState<Post | Work | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const titleKey = category === 'post' ? 'd_manage_posts' : 'd_manage_works';
  const emptyKey = category === 'post' ? 'cm_empty_posts' : 'cm_empty_works';

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/me');
      if (!res.ok) return;
      const json = await res.json();
      setHandle(json.profile?.handle ?? '');
      setPosts((json.posts ?? []) as Post[]);
      setWorks((json.works ?? []) as Work[]);
    } catch {
      /* 忽略 */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const items = (category === 'post' ? posts : works) as Array<Post | Work>;

  async function handleSubmit(data: PostDraft, editingId?: string | null) {
    if (!handle) {
      setError(t('d_need_profile'));
      return;
    }
    setSaving(true);
    setError(null);
    setMsg(null);
    try {
      const apiBase = category === 'post' ? '/api/posts' : '/api/works';
      const body =
        category === 'post'
          ? {
              title: data.title,
              content: data.content,
              status: data.status,
              ...(editingId ? {} : { handle, source: data.source ?? 'manual' }),
            }
          : {
              title: data.title,
              url: data.url ?? null,
              description: data.content,
              status: data.status,
              ...(editingId ? {} : { handle, source: data.source ?? 'manual' }),
            };
      const res = await fetch(
        editingId ? `${apiBase}/${editingId}` : apiBase,
        {
          method: editingId ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.message ?? t('d_err_publish'));
      setMsg(editingId ? t('d_saved_change') : t('d_msg_published'));
      setEditing(null);
      setComposerOpen(false);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : t('d_err_publish'));
    } finally {
      setSaving(false);
    }
  }

  async function toggleStatus(item: Post | Work) {
    const next: PostStatus =
      item.status === 'published' ? 'draft' : 'published';
    const apiBase = category === 'post' ? '/api/posts' : '/api/works';
    const prev =
      category === 'post'
        ? (posts.map((p) => (p.id === item.id ? { ...p, status: next } : p)) as Post[])
        : (works.map((w) => (w.id === item.id ? { ...w, status: next } : w)) as Work[]);
    if (category === 'post') setPosts(prev as Post[]);
    else setWorks(prev as Work[]);
    setError(null);
    try {
      const res = await fetch(`${apiBase}/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error(t('d_err_status'));
    } catch (e) {
      if (category === 'post') setPosts(posts);
      else setWorks(works);
      setError(e instanceof Error ? e.message : t('d_err_status'));
    }
  }

  async function remove(item: Post | Work) {
    if (!confirm(t('d_delete_confirm'))) return;
    setError(null);
    setMsg(null);
    try {
      const apiBase = category === 'post' ? '/api/posts' : '/api/works';
      const res = await fetch(`${apiBase}/${item.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(t('d_err_status'));
      if (editing?.id === item.id) {
        setEditing(null);
        setComposerOpen(false);
      }
      setMsg(t('d_deleted'));
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : t('d_err_status'));
    }
  }

  function startNew() {
    setEditing(null);
    setComposerOpen((v) => !v);
    setError(null);
    setMsg(null);
  }

  function startEdit(item: Post | Work) {
    setEditing(item);
    setComposerOpen(true);
    setError(null);
    setMsg(null);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function cancelEdit() {
    setEditing(null);
    setComposerOpen(false);
  }

  const fmt = (s: string) =>
    new Date(s).toLocaleDateString(lang === 'en' ? 'en-US' : 'zh-CN');

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="magazine-title text-2xl">
          {t(titleKey)}
          <span className="ml-2 text-base opacity-60">({items.length})</span>
        </h1>
        <button
          type="button"
          className="mag-btn shrink-0"
          onClick={startNew}
        >
          <Plus className="h-4 w-4" />
          {category === 'post' ? t('d_new_post') : t('d_new_work')}
        </button>
      </div>

      {msg && <p className="mb-4 text-sm text-primary">{msg}</p>}
      {error && <p className="mb-4 text-sm text-primary">{error}</p>}

      {composerOpen && (
        <div className="mb-8">
          <PostComposer
            onPublish={handleSubmit}
            saving={saving}
            initial={editing}
            lockCategory={category}
          />
          {editing && (
            <button
              type="button"
              className="mag-btn mag-btn-secondary mt-3"
              onClick={cancelEdit}
            >
              {t('cm_cancel')}
            </button>
          )}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-6 w-6 animate-spin opacity-60" />
        </div>
      ) : items.length === 0 ? (
        <p className="text-sm opacity-60">{t(emptyKey)}</p>
      ) : (
        <ul className="space-y-3">
          {items.map((p) => (
            <li
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
                  {fmt(p.created_at)} ·{' '}
                  {p.status === 'published'
                    ? t('d_status_published')
                    : t('d_status_draft')}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  className="mag-btn mag-btn-secondary"
                  onClick={() => startEdit(p)}
                  aria-label={t('d_edit')}
                  title={t('d_edit')}
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="mag-btn mag-btn-secondary"
                  onClick={() => toggleStatus(p)}
                  aria-label={
                    p.status === 'published' ? t('d_draft_aria') : t('d_publish_aria')
                  }
                  title={
                    p.status === 'published' ? t('d_to_draft') : t('d_publish_action')
                  }
                >
                  {p.status === 'published' ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
                <button
                  type="button"
                  className="mag-btn mag-btn-secondary"
                  onClick={() => remove(p)}
                  aria-label={t('d_delete')}
                  title={t('d_delete')}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
