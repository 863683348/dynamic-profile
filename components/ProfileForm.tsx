'use client';

import { useState } from 'react';
import type { Profile } from '@/lib/types';
import { ThemePicker } from './ThemePicker';
import { Plus, Trash2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

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

  const { t } = useI18n();
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
          {t('label_name')}
        </label>
        <input
          id="pf-name"
          className="mag-input"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder={t('ph_name')}
        />
      </div>

      <div>
        <label className="mag-label" htmlFor="pf-handle">
          {t('label_handle')}
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
        {handleExists && <p className="mt-1 text-xs opacity-60">{t('handle_locked')}</p>}
      </div>

      <div>
        <label className="mag-label" htmlFor="pf-status">
          {t('label_status')}
        </label>
        <input
          id="pf-status"
          className="mag-input"
          value={statusText}
          onChange={(e) => setStatusText(e.target.value)}
          placeholder={t('ph_status')}
        />
      </div>

      <div>
        <label className="mag-label" htmlFor="pf-bio">
          {t('label_bio')}
        </label>
        <textarea
          id="pf-bio"
          className="mag-input min-h-[100px]"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder={t('ph_bio')}
        />
      </div>

      <div>
        <span className="mag-label">{t('label_links')}</span>
        {links.map((l, i) => (
          <div key={i} className="mb-2 flex gap-2">
              <input
                className="mag-input min-w-0"
                style={{ maxWidth: '38%' }}
                value={l.label}
              onChange={(e) => updateLink(i, 'label', e.target.value)}
              placeholder={t('ph_link_label')}
            />
              <input
                className="mag-input min-w-0"
                value={l.url}
              onChange={(e) => updateLink(i, 'url', e.target.value)}
              placeholder={t('ph_link_url')}
            />
              <button
                type="button"
                className="mag-btn mag-btn-secondary shrink-0 px-2 sm:px-3"
                onClick={() => setLinks((p) => p.filter((_, idx) => idx !== i))}
                aria-label={t('aria_del_link')}
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
          <Plus className="h-4 w-4" /> {t('add_link')}
        </button>
      </div>

      <ThemePicker
        color={themeColor}
        dark={themeDark}
        onChangeColor={setThemeColor}
        onChangeDark={setThemeDark}
      />

      <button type="submit" className="mag-btn" disabled={saving}>
        {saving ? t('save_saving') : t('save')}
      </button>
    </form>
  );
}
