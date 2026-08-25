'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Github, RefreshCw, Loader2, Upload, ImageIcon, Trash2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import type { Post, Work } from '@/lib/types';
import { workImageDataUrl } from '@/lib/image';

export type PostDraft = {
  title: string;
  content: string;
  url?: string | null;
  image_url?: string | null;
  status: 'draft' | 'published';
  source?: 'manual' | 'github';
};

type GithubActivity = {
  id: string;
  type: string;
  repo: string;
  title: string;
  summary: string;
  url: string;
  created_at: string;
  category: 'post' | 'work';
};

export function PostComposer({
  onPublish,
  saving,
  initial,
  lockCategory,
}: {
  // editingId 非空时走"更新"，否则走"新建"
  onPublish: (data: PostDraft, editingId?: string | null) => void;
  saving: boolean;
  initial?: Post | Work | null;
  lockCategory?: 'post' | 'work';
}) {
  const { t } = useI18n();
  const isEditing = Boolean(initial);
  const isWork = lockCategory === 'work';

  const [source, setSource] = useState<'manual' | 'github'>('manual');

  // 手动模式
  const [title, setTitle] = useState(initial?.title ?? '');
  const [url, setUrl] = useState(
    initial && 'url' in initial ? (initial.url ?? '') : ''
  );
  const [content, setContent] = useState(() => {
    if (!initial) return '';
    return 'content' in initial
      ? (initial.content ?? '')
      : (initial.description ?? '');
  });
  const [status, setStatus] = useState<'draft' | 'published'>(
    initial?.status === 'hidden' ? 'draft' : initial?.status ?? 'published'
  );

  // 作品封面图（仅 isWork 使用）
  const [imageUrl, setImageUrl] = useState<string | null>(
    initial && 'image_url' in initial ? (initial.image_url ?? null) : null
  );
  const imageInput = useRef<HTMLInputElement>(null);
  const [imgBusy, setImgBusy] = useState(false);
  const [imgErr, setImgErr] = useState<string | null>(null);

  // 切换编辑目标 / 取消编辑时，同步表单
  useEffect(() => {
    setTitle(initial?.title ?? '');
    setUrl(initial && 'url' in initial ? (initial.url ?? '') : '');
    setContent(
      initial
        ? 'content' in initial
          ? (initial.content ?? '')
          : (initial.description ?? '')
        : ''
    );
    setStatus(initial?.status === 'hidden' ? 'draft' : initial?.status ?? 'published');
    setImageUrl(initial && 'image_url' in initial ? (initial.image_url ?? null) : null);
    setImgErr(null);
    setSource('manual');
  }, [initial, lockCategory]);

  async function onPickImage(file?: File) {
    if (!file) return;
    setImgBusy(true);
    setImgErr(null);
    try {
      setImageUrl(await workImageDataUrl(file));
    } catch {
      setImgErr(t('img_invalid'));
    } finally {
      setImgBusy(false);
    }
  }

  // GitHub 模式
  const [ghUser, setGhUser] = useState('');
  const [ghItems, setGhItems] = useState<GithubActivity[]>([]);
  const [ghLoading, setGhLoading] = useState(false);
  const [ghError, setGhError] = useState<string | null>(null);

  function handleManualSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onPublish(
      {
        title: title.trim(),
        content: content.trim(),
        url: isWork ? (url.trim() || null) : undefined,
        image_url: isWork ? (imageUrl ?? null) : undefined,
        status,
      },
      initial?.id ?? null
    );
    if (!isEditing) {
      setTitle('');
      setUrl('');
      setContent('');
      setImageUrl(null);
      setStatus('published');
    }
  }

  async function loadGithub() {
    const user = ghUser.trim();
    if (!user) return;
    setGhLoading(true);
    setGhError(null);
    setGhItems([]);
    try {
      const res = await fetch(`/api/github/events?user=${encodeURIComponent(user)}`);
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.message ?? t('gh_err'));
      }
      const j = await res.json();
      setGhItems(j.items ?? []);
    } catch (e) {
      setGhError(e instanceof Error ? e.message : t('gh_err'));
    } finally {
      setGhLoading(false);
    }
  }

  function importGithub(item: GithubActivity) {
    if (isWork) {
      onPublish({
        title: item.title,
        content: item.summary,
        url: item.url,
        status: 'published',
        source: 'github',
      });
    } else {
      onPublish({
        title: item.title,
        content: `${item.summary}\n${item.url}`,
        status: 'published',
        source: 'github',
      });
    }
  }

  return (
    <form
      onSubmit={source === 'manual' ? handleManualSubmit : (e) => e.preventDefault()}
      className="paper-card space-y-3 p-5"
    >
      <div className="flex items-center justify-between">
        <h3 className="magazine-title text-lg">
          {isEditing ? (isWork ? t('pc_editing_work') : t('pc_editing')) : (isWork ? t('pc_title_work') : t('pc_title'))}
        </h3>
      </div>

      {/* 编辑态：隐藏来源切换，仅手动 */}
      {!isEditing && (
        <div className="flex gap-2" role="radiogroup" aria-label={t('pc_source_label')}>
          {(['manual', 'github'] as const).map((s) => (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={source === s}
              onClick={() => setSource(s)}
              className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                source === s
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-300 opacity-70 hover:border-gray-400 hover:opacity-100'
              }`}
            >
              {s === 'github' ? <Github className="h-4 w-4" /> : <Send className="h-4 w-4" />}
              {s === 'github' ? t('pc_src_github') : t('pc_src_manual')}
            </button>
          ))}
        </div>
      )}

      {source === 'manual' ? (
        <>
          <input
            className="mag-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={isWork ? t('pc_ph_title_work') : t('pc_ph_title')}
          />
          {isWork && (
            <input
              className="mag-input"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={t('pc_ph_url_work')}
            />
          )}
          {isWork && (
            <div className="space-y-2">
              <span className="mag-label">{t('pc_upload_image_work')}</span>
              <div className="flex items-center gap-3">
                <div
                  className="h-20 w-28 shrink-0 overflow-hidden rounded-md border"
                  style={{ borderColor: 'var(--rule)' }}
                >
                  {imageUrl ? (
                    <img src={imageUrl} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div
                      className="h-full w-full"
                      style={{
                        background:
                          'linear-gradient(135deg, color-mix(in srgb, var(--primary) 70%, #fff), var(--primary))',
                      }}
                    />
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="mag-btn mag-btn-secondary"
                    onClick={() => imageInput.current?.click()}
                    disabled={imgBusy}
                  >
                    <Upload className="h-4 w-4" />
                    {imageUrl ? t('change_image') : t('pc_upload_image_work')}
                  </button>
                  {imageUrl && (
                    <button
                      type="button"
                      className="mag-btn mag-btn-secondary"
                      onClick={() => setImageUrl(null)}
                      aria-label={t('remove_image')}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <input
                  ref={imageInput}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onPickImage(e.target.files?.[0])}
                />
              </div>
              <p className="text-xs opacity-60">{t('pc_img_work_hint')}</p>
              {imgErr && <p className="text-xs text-primary">{imgErr}</p>}
            </div>
          )}
          <textarea
            className="mag-input min-h-[80px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={isWork ? t('pc_ph_content_work') : t('pc_ph_content')}
          />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={status === 'published'}
                onChange={(e) => setStatus(e.target.checked ? 'published' : 'draft')}
              />
              {isWork ? t('pc_now_work') : t('pc_now')}
            </label>
            <button
              type="submit"
              className="mag-btn shrink-0"
              disabled={saving || !title.trim()}
            >
              <Send className="h-4 w-4" />
              {saving
                ? t('pc_saving')
                : isEditing
                ? (isWork ? t('pc_save_changes_work') : t('pc_save_changes'))
                : status === 'published'
                ? (isWork ? t('pc_publish_work') : t('pc_publish'))
                : t('pc_draft')}
            </button>
          </div>
        </>
      ) : (
        <div className="space-y-3">
          <p className="text-xs opacity-70">{t('gh_hint')}</p>
          <div className="flex gap-2">
            <input
              className="mag-input min-w-0"
              value={ghUser}
              onChange={(e) => setGhUser(e.target.value)}
              placeholder={t('gh_username_ph')}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), loadGithub())}
            />
            <button
              type="button"
              className="mag-btn mag-btn-secondary shrink-0"
              onClick={loadGithub}
              disabled={ghLoading || !ghUser.trim()}
            >
              {ghLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              {ghLoading ? t('gh_loading') : t('gh_load')}
            </button>
          </div>

          {ghError && <p className="text-xs text-primary">{ghError}</p>}

          {ghItems.length === 0 && !ghLoading && !ghError && (
            <p className="text-xs opacity-60">{t('gh_empty')}</p>
          )}

          <ul className="space-y-2">
            {ghItems.map((item) => (
              <li
                key={item.id}
                className="flex items-start justify-between gap-3 rounded-md border p-3"
                style={{ borderColor: 'var(--rule)' }}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{item.title}</p>
                  <p className="mt-0.5 truncate text-xs opacity-60">{item.summary}</p>
                </div>
                <button
                  type="button"
                  className="mag-btn mag-btn-secondary shrink-0 px-3"
                  onClick={() => importGithub(item)}
                  disabled={saving}
                >
                  {t('gh_import')}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}
