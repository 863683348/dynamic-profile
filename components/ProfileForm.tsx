'use client';

import { useState } from 'react';
import type { Profile } from '@/lib/types';
import { ThemePicker } from './ThemePicker';
import { Plus, Trash2 } from 'lucide-react';

export type LinkItem = { label: string; url: string };

export type ProfileFormData = {
  handle?: string;
  display_name: string;
  bio: string;
  status_text: string;
  links: LinkItem[];
  theme_color: string;
  theme_dark: boolean;
};

export function ProfileForm({
  initial,
  onSubmit,
  saving,
}: {
  initial?: Profile | null;
  onSubmit: (data: ProfileFormData) => void;
  saving: boolean;
}) {
  const [displayName, setDisplayName] = useState(initial?.display_name ?? '');
  const [handle, setHandle] = useState(initial?.handle ?? '');
  const [bio, setBio] = useState(initial?.bio ?? '');
  const [statusText, setStatusText] = useState(initial?.status_text ?? '');
  const [themeColor, setThemeColor] = useState(initial?.theme_color ?? '#c2410c');
  const [themeDark, setThemeDark] = useState(initial?.theme_dark ?? false);
  const [links, setLinks] = useState<LinkItem[]>(
    Array.isArray(initial?.links) ? (initial!.links as LinkItem[]) : []
  );

  const handleExists = !!initial?.handle;

  function updateLink(i: number, key: keyof LinkItem, value: string) {
    setLinks((prev) => prev.map((l, idx) => (idx === i ? { ...l, [key]: value } : l)));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      handle: handle.trim(),
      display_name: displayName.trim(),
      bio: bio.trim(),
      status_text: statusText.trim(),
      links,
      theme_color: themeColor,
      theme_dark: themeDark,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mag-label" htmlFor="pf-name">
          显示名称
        </label>
        <input
          id="pf-name"
          className="mag-input"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="林夕"
        />
      </div>

      <div>
        <label className="mag-label" htmlFor="pf-handle">
          Handle（小写字母 / 数字 / 下划线，3-20 位）
        </label>
        <input
          id="pf-handle"
          className="mag-input"
          value={handle}
          onChange={(e) => setHandle(e.target.value.toLowerCase())}
          placeholder="linxi"
          pattern="^[a-z0-9_]{3,20}$"
          disabled={handleExists}
        />
        {handleExists && <p className="mt-1 text-xs opacity-60">Handle 创建后不可修改。</p>}
      </div>

      <div>
        <label className="mag-label" htmlFor="pf-status">
          状态文字
        </label>
        <input
          id="pf-status"
          className="mag-input"
          value={statusText}
          onChange={(e) => setStatusText(e.target.value)}
          placeholder="正在构建有趣的东西"
        />
      </div>

      <div>
        <label className="mag-label" htmlFor="pf-bio">
          简介
        </label>
        <textarea
          id="pf-bio"
          className="mag-input min-h-[100px]"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="一句话介绍你自己"
        />
      </div>

      <div>
        <span className="mag-label">外链</span>
        {links.map((l, i) => (
          <div key={i} className="mb-2 flex gap-2">
            <input
              className="mag-input"
              style={{ maxWidth: '38%' }}
              value={l.label}
              onChange={(e) => updateLink(i, 'label', e.target.value)}
              placeholder="标签"
            />
            <input
              className="mag-input"
              value={l.url}
              onChange={(e) => updateLink(i, 'url', e.target.value)}
              placeholder="https://..."
            />
            <button
              type="button"
              className="mag-btn mag-btn-secondary"
              onClick={() => setLinks((p) => p.filter((_, idx) => idx !== i))}
              aria-label="删除链接"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          className="mag-btn mag-btn-secondary mt-1"
          onClick={() => setLinks((p) => [...p, { label: '', url: '' }])}
        >
          <Plus className="h-4 w-4" /> 添加外链
        </button>
      </div>

      <ThemePicker
        color={themeColor}
        dark={themeDark}
        onChangeColor={setThemeColor}
        onChangeDark={setThemeDark}
      />

      <button type="submit" className="mag-btn" disabled={saving}>
        {saving ? '保存中…' : '保存档案'}
      </button>
    </form>
  );
}
