'use client';

import { useEffect, useRef, useState } from 'react';
import type { Profile } from '@/lib/types';
import { ThemePicker } from './ThemePicker';
import { StylePicker } from './StylePicker';
import type { StyleId } from '@/lib/styles';
import { Plus, Trash2, Upload, Image as ImageIcon, QrCode, Lock } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { avatarDataUrl, coverDataUrl, qrDataUrl } from '@/lib/image';

export type LinkItem = { label: string; url: string };

export type ProfileFormData = {
  handle?: string;
  display_name: string;
  bio: string;
  status_text: string;
  links: LinkItem[];
  theme_color: string;
  theme_dark: boolean;
  style: StyleId;
  avatar_url?: string | null;
  cover_url?: string | null;
  // 打赏设置
  tip_enabled: boolean;
  tip_message: string;
  bmc_username: string;
  wechat_qr_url?: string | null;
  alipay_qr_url?: string | null;
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
  const [avatarUrl, setAvatarUrl] = useState(initial?.avatar_url ?? null);
  const [coverUrl, setCoverUrl] = useState(initial?.cover_url ?? null);
  const [links, setLinks] = useState<LinkItem[]>(
    Array.isArray(initial?.links) ? (initial!.links as LinkItem[]) : []
  );
  const [style, setStyle] = useState<StyleId>(
    (initial?.style as StyleId) ?? "magazine"
  );
  const [imgErr, setImgErr] = useState<string | null>(null);
  const [imgBusy, setImgBusy] = useState(false);

  // 打赏设置
  const [tipEnabled, setTipEnabled] = useState(initial?.tip_enabled ?? false);
  const [tipMessage, setTipMessage] = useState(initial?.tip_message ?? '');
  const [bmcUsername, setBmcUsername] = useState(initial?.bmc_username ?? '');
  const [wechatQr, setWechatQr] = useState(initial?.wechat_qr_url ?? null);
  const [alipayQr, setAlipayQr] = useState(initial?.alipay_qr_url ?? null);
  const [qrErr, setQrErr] = useState<string | null>(null);
  const [qrBusy, setQrBusy] = useState(false);
  const wechatInput = useRef<HTMLInputElement>(null);
  const alipayInput = useRef<HTMLInputElement>(null);

  const { t } = useI18n();
  const isPro = initial?.plan === 'pro';

  // 当父组件异步加载到 profile 后回填表单；以 handle 为版本标识，
  // 避免父组件无关重渲染覆盖用户正在输入的未保存内容。
  const lastHandle = useRef(initial?.handle);
  useEffect(() => {
    if (initial?.handle === lastHandle.current) return;
    lastHandle.current = initial?.handle;
    setDisplayName(initial?.display_name ?? '');
    setHandle(initial?.handle ?? '');
    setBio(initial?.bio ?? '');
    setStatusText(initial?.status_text ?? '');
    setThemeColor(initial?.theme_color ?? '#c2410c');
    setThemeDark(initial?.theme_dark ?? false);
    setAvatarUrl(initial?.avatar_url ?? null);
    setCoverUrl(initial?.cover_url ?? null);
    setLinks(Array.isArray(initial?.links) ? (initial!.links as LinkItem[]) : []);
    setStyle((initial?.style as StyleId) ?? 'magazine');
    setTipEnabled(initial?.tip_enabled ?? false);
    setTipMessage(initial?.tip_message ?? '');
    setBmcUsername(initial?.bmc_username ?? '');
    setWechatQr(initial?.wechat_qr_url ?? null);
    setAlipayQr(initial?.alipay_qr_url ?? null);
  }, [initial?.handle]);

  const avatarInput = useRef<HTMLInputElement>(null);
  const coverInput = useRef<HTMLInputElement>(null);

  async function onPickAvatar(file?: File) {
    if (!file) return;
    setImgBusy(true);
    setImgErr(null);
    try {
      setAvatarUrl(await avatarDataUrl(file));
    } catch {
      setImgErr(t('img_invalid'));
    } finally {
      setImgBusy(false);
    }
  }

  async function onPickCover(file?: File) {
    if (!file) return;
    setImgBusy(true);
    setImgErr(null);
    try {
      setCoverUrl(await coverDataUrl(file));
    } catch {
      setImgErr(t('img_invalid'));
    } finally {
      setImgBusy(false);
    }
  }

  async function onPickWechat(file?: File) {
    if (!file) return;
    setQrBusy(true);
    setQrErr(null);
    try {
      setWechatQr(await qrDataUrl(file));
    } catch {
      setQrErr(t('img_invalid'));
    } finally {
      setQrBusy(false);
    }
  }

  async function onPickAlipay(file?: File) {
    if (!file) return;
    setQrBusy(true);
    setQrErr(null);
    try {
      setAlipayQr(await qrDataUrl(file));
    } catch {
      setQrErr(t('img_invalid'));
    } finally {
      setQrBusy(false);
    }
  }

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
      theme_color: isPro ? themeColor : (initial?.theme_color ?? '#c2410c'),
      theme_dark: themeDark,
      style,
      avatar_url: avatarUrl,
      cover_url: coverUrl,
      tip_enabled: tipEnabled,
      tip_message: tipMessage.trim(),
      bmc_username: bmcUsername.trim(),
      wechat_qr_url: wechatQr,
      alipay_qr_url: alipayQr,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* 封面 + 头像上传 */}
      <div className="space-y-3">
        <div>
          <span className="mag-label">{t('label_cover')}</span>
          <div className="flex items-center gap-3">
            <div
              className="h-16 w-28 shrink-0 overflow-hidden rounded-md border"
              style={{ borderColor: 'var(--rule)' }}
            >
              {coverUrl ? (
                <img
                  src={coverUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
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
                onClick={() => coverInput.current?.click()}
                disabled={imgBusy}
              >
                <Upload className="h-4 w-4" />
                {coverUrl ? t('change_image') : t('upload_cover')}
              </button>
              {coverUrl && (
                <button
                  type="button"
                  className="mag-btn mag-btn-secondary"
                  onClick={() => setCoverUrl(null)}
                  aria-label={t('remove_image')}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
            <input
              ref={coverInput}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onPickCover(e.target.files?.[0])}
            />
          </div>
        </div>

        <div>
          <span className="mag-label">{t('label_avatar')}</span>
          <div className="flex items-center gap-3">
            <div
              className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2"
              style={{ borderColor: 'var(--paper)' }}
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  className="h-full w-full"
                  style={{
                    background:
                      'linear-gradient(135deg, color-mix(in srgb, var(--primary) 75%, #fff), var(--primary))',
                  }}
                />
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="mag-btn mag-btn-secondary"
                onClick={() => avatarInput.current?.click()}
                disabled={imgBusy}
              >
                <ImageIcon className="h-4 w-4" />
                {avatarUrl ? t('change_image') : t('upload_avatar')}
              </button>
              {avatarUrl && (
                <button
                  type="button"
                  className="mag-btn mag-btn-secondary"
                  onClick={() => setAvatarUrl(null)}
                  aria-label={t('remove_image')}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
            <input
              ref={avatarInput}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onPickAvatar(e.target.files?.[0])}
            />
          </div>
        </div>

        {imgErr && <p className="text-xs text-primary">{imgErr}</p>}
      </div>

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
          placeholder={t('ph_handle')}
          pattern="^[a-z0-9_]{3,20}$"
        />
        <p className="mt-1 text-xs opacity-60">{t('handle_change_hint')}</p>
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

      <div className="relative">
        <ThemePicker
          color={themeColor}
          dark={themeDark}
          onChangeColor={setThemeColor}
          onChangeDark={setThemeDark}
          disabled={!isPro}
        />
        {!isPro && (
          <p className="mt-2 flex items-center gap-1.5 text-xs text-primary">
            <Lock className="h-3.5 w-3.5 shrink-0" />
            <span>{t('pro_only_theme')}</span>
            <a href="/pricing" className="underline hover:opacity-80">
              {t('pro_upgrade_link')}
            </a>
          </p>
        )}
      </div>

      <StylePicker value={style} onChange={setStyle} />

      {/* 打赏设置 */}
      <div className="double-rule space-y-4 pt-4">
        <div>
          <span className="mag-label">{t('tip_section')}</span>
          <label className="mt-2 flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={tipEnabled}
              onChange={(e) => setTipEnabled(e.target.checked)}
              className="h-4 w-4 accent-[color:var(--primary)]"
            />
            <span className="text-sm">{t('tip_enable')}</span>
          </label>
          <p className="mt-1 text-xs opacity-60">{t('tip_enable_hint')}</p>
        </div>

        {tipEnabled && (
          <div className="space-y-4">
            <div>
              <label className="mag-label" htmlFor="pf-tip-msg">
                {t('tip_message')}
              </label>
              <input
                id="pf-tip-msg"
                className="mag-input"
                value={tipMessage}
                onChange={(e) => setTipMessage(e.target.value)}
                placeholder={t('ph_tip_message')}
              />
            </div>

            <div>
              <label className="mag-label" htmlFor="pf-bmc">
                {t('tip_bmc')}
              </label>
              <input
                id="pf-bmc"
                className="mag-input"
                value={bmcUsername}
                onChange={(e) => setBmcUsername(e.target.value)}
                placeholder={t('ph_tip_bmc')}
              />
            </div>

            {/* 微信收款码 */}
            <div>
              <span className="mag-label">{t('tip_wechat')}</span>
              <div className="flex items-center gap-3">
                <div
                  className="h-20 w-20 shrink-0 overflow-hidden rounded-md border"
                  style={{ borderColor: 'var(--rule)' }}
                >
                  {wechatQr ? (
                    <img
                      src={wechatQr}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-[color:var(--muted)]" />
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="mag-btn mag-btn-secondary"
                    onClick={() => wechatInput.current?.click()}
                    disabled={qrBusy}
                  >
                    <QrCode className="h-4 w-4" />
                    {wechatQr ? t('tip_change_qr') : t('tip_upload_qr')}
                  </button>
                  {wechatQr && (
                    <button
                      type="button"
                      className="mag-btn mag-btn-secondary"
                      onClick={() => setWechatQr(null)}
                      aria-label={t('tip_remove_qr')}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <input
                  ref={wechatInput}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onPickWechat(e.target.files?.[0])}
                />
              </div>
            </div>

            {/* 支付宝收款码 */}
            <div>
              <span className="mag-label">{t('tip_alipay')}</span>
              <div className="flex items-center gap-3">
                <div
                  className="h-20 w-20 shrink-0 overflow-hidden rounded-md border"
                  style={{ borderColor: 'var(--rule)' }}
                >
                  {alipayQr ? (
                    <img
                      src={alipayQr}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-[color:var(--muted)]" />
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="mag-btn mag-btn-secondary"
                    onClick={() => alipayInput.current?.click()}
                    disabled={qrBusy}
                  >
                    <QrCode className="h-4 w-4" />
                    {alipayQr ? t('tip_change_qr') : t('tip_upload_qr')}
                  </button>
                  {alipayQr && (
                    <button
                      type="button"
                      className="mag-btn mag-btn-secondary"
                      onClick={() => setAlipayQr(null)}
                      aria-label={t('tip_remove_qr')}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <input
                  ref={alipayInput}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onPickAlipay(e.target.files?.[0])}
                />
              </div>
            </div>

            {qrErr && <p className="text-xs text-primary">{qrErr}</p>}
          </div>
        )}
      </div>

      <button type="submit" className="mag-btn" disabled={saving}>
        {saving ? t('save_saving') : t('save')}
      </button>
    </form>
  );
}
