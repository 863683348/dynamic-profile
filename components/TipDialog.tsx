'use client';

import { useState } from 'react';
import { Coffee, Heart, QrCode, X } from 'lucide-react';
import type { Profile } from '@/lib/types';
import { useI18n } from '@/lib/i18n';

/**
 * 打赏入口 + 弹窗。访客在公开主页点「打赏」后，弹窗展示作者配置的收款方式：
 *   - 微信支付 / 支付宝：作者上传的收款码，访客扫码支付（无需商户 API）
 *   - Buy Me a Coffee：跳转到作者的 BMC 页面
 * 仅当 tip_enabled 且至少配置一种方式时才渲染入口。
 * 图标全部走 lucide（项目锁定图标库），无 emoji、无紫粉渐变。
 */
export function TipDialog({ profile }: { profile: Profile }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const hasWechat = Boolean(profile.wechat_qr_url);
  const hasAlipay = Boolean(profile.alipay_qr_url);
  const hasBmc = Boolean(profile.bmc_username);

  // 未开启或没有任何收款方式 → 不渲染入口
  if (!profile.tip_enabled || (!hasWechat && !hasAlipay && !hasBmc)) return null;

  const bmcUrl = profile.bmc_username
    ? `https://buymeacoffee.com/${profile.bmc_username.replace(/^@/, '')}`
    : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mag-btn mt-4 w-full"
        aria-label={t('tip_open')}
      >
        <Heart className="h-4 w-4" />
        {t('tip_open')}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={t('tip_title')}
        >
          <div
            className="paper-card w-full max-w-sm overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[color:var(--rule)] px-5 py-3">
              <h3 className="magazine-title text-lg">{t('tip_title')}</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="close"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--rule)] transition-colors hover:border-[color:var(--primary)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-5 px-5 py-5">
              {profile.tip_message && (
                <p className="text-center text-sm opacity-80">{profile.tip_message}</p>
              )}

              {/* 微信支付 */}
              {hasWechat && (
                <div className="flex flex-col items-center gap-2">
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <QrCode className="h-4 w-4" style={{ color: 'var(--primary)' }} />
                    {t('tip_wechat_pay')}
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={profile.wechat_qr_url!}
                    alt={t('tip_wechat_pay')}
                    className="h-44 w-44 rounded-md border border-[color:var(--rule)] object-contain"
                  />
                </div>
              )}

              {/* 支付宝 */}
              {hasAlipay && (
                <div className="flex flex-col items-center gap-2">
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <QrCode className="h-4 w-4" style={{ color: 'var(--primary)' }} />
                    {t('tip_alipay_pay')}
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={profile.alipay_qr_url!}
                    alt={t('tip_alipay_pay')}
                    className="h-44 w-44 rounded-md border border-[color:var(--rule)] object-contain"
                  />
                </div>
              )}

              {/* Buy Me a Coffee */}
              {hasBmc && bmcUrl && (
                <a
                  href={bmcUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mag-btn flex w-full items-center justify-center gap-2"
                >
                  <Coffee className="h-4 w-4" />
                  {t('tip_bmc_coffee')}
                </a>
              )}

              <p className="text-center text-xs opacity-60">{t('tip_scan')}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
