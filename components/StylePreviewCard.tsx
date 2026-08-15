'use client';

import type { CSSProperties } from 'react';
import { Check, Lock, Sparkles } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { STYLE_ACCENT, type StyleId } from '@/lib/styles';

type Badge = 'free' | 'pro' | null;

/**
 * 风格预览卡：用该风格真实的全局 CSS（[data-style]）渲染一个迷你主页缩略图，
 * 所见即所得——字体 / 配色 / 卡片质感 / 霓虹光效全部随风格变化。
 * 预览内联 --primary 为该风格代表色（仅供预览展示，真实站点仍以用户 theme_color 为准）。
 *
 * 复用于两处：
 *  1) StylePicker：作为可点击的选择卡（onClick 存在时渲染为 <button>）
 *  2) 会员页风格画廊：作为静态展示卡（无 onClick，带免费/Pro 徽章与引导文案）
 */
export function StylePreviewCard({
  id,
  active = false,
  disabled = false,
  onClick,
  badge = null,
  showDesc = false,
}: {
  id: StyleId;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  badge?: Badge;
  showDesc?: boolean;
}) {
  const { t } = useI18n();
  const accent = STYLE_ACCENT[id];
  // 防御：若 id 非法或 CSS 变量缺失，不渲染避免整页白屏。
  if (!accent) return null;
  // 暗色风格（极客 / 霓虹）在缩略图里露出真实暗底，所见即所得；
  // 其余风格用统一浅底，保证白底画廊里整齐可读。
  const isDarkStyle = id === 'geek' || id === 'neon';

  // 迷你主页缩略图：封面 + 头像 + 名字/状态 + 外链 chip + 打赏按钮，
  // 全部复用公开主页的真实 class（magazine-title / link-chip / mag-btn），
  // 外层 data-style 决定观感。
  const mockup = (
    <div
      data-style={id}
      className="style-preview"
      style={
        isDarkStyle
          ? ({ '--primary': accent } as CSSProperties)
          : ({
              '--primary': accent,
              '--bg': '#f7f6f2',
              '--paper': '#ffffff',
              '--ink': '#1c1917',
              '--rule': 'rgba(28,25,23,0.14)',
            } as CSSProperties)
      }
    >
      {/* 封面条 */}
      <div
        className="h-5 w-full"
        style={{
          background:
            'linear-gradient(135deg, color-mix(in srgb, var(--primary) 78%, #fff), var(--primary))',
        }}
      />
      <div className="px-3 pb-3 pt-2">
        {/* 头像 + 名字 */}
        <div className="flex items-center gap-2">
          <span
            className="h-7 w-7 shrink-0 rounded-full border-2"
            style={{ background: 'var(--primary)', borderColor: 'var(--paper)' }}
          />
          <div className="min-w-0">
            <p className="magazine-title truncate text-sm leading-tight">林小满</p>
            <p className="truncate text-[10px] opacity-60">@xiaoman · 设计中</p>
          </div>
        </div>
        {/* 外链 chip */}
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          <span className="link-chip">个人网站</span>
          <span className="link-chip">GitHub</span>
        </div>
        {/* 打赏 / CTA 按钮 */}
        <div className="mt-2.5">
          <span className="mag-btn block w-full text-center text-[11px]">请我喝杯咖啡</span>
        </div>
      </div>
    </div>
  );

  const chrome = (
    <>
      {badge && (
        <span
          className="absolute left-2 top-2 z-10 flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium"
          style={
            badge === 'pro'
              ? { background: 'var(--primary)', color: '#fff' }
              : { background: 'rgba(0,0,0,0.06)', color: 'rgba(0,0,0,0.6)' }
          }
        >
          {badge === 'pro' && <Sparkles className="h-2.5 w-2.5" />}
          {badge === 'pro' ? t('style_pro') : t('style_free')}
        </span>
      )}
      {active && (
        <span
          className="absolute right-1.5 top-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full"
          style={{ background: 'var(--primary)', color: '#fff' }}
        >
          <Check className="h-3 w-3" />
        </span>
      )}
      {disabled && (
        <span className="absolute inset-0 z-10 flex items-center justify-center bg-black/5 backdrop-blur-[1px]">
          <Lock className="h-4 w-4" style={{ color: 'rgba(0,0,0,0.4)' }} />
        </span>
      )}
      {showDesc && (
        <p className="px-3 pb-3 text-xs opacity-70">{t(`st_desc_${id}`)}</p>
      )}
    </>
  );

  const className = `relative block w-full overflow-hidden rounded-lg border-2 bg-[color:var(--paper)] text-left transition ${
    disabled ? 'cursor-not-allowed' : ''
  }`;
  const style = { borderColor: active ? 'var(--primary)' : 'var(--rule)' } as CSSProperties;

  if (onClick && !disabled) {
    return (
      <button type="button" onClick={onClick} aria-pressed={active} className={className} style={style}>
        {mockup}
        {chrome}
      </button>
    );
  }
  return (
    <div className={className} style={style}>
      {mockup}
      {chrome}
    </div>
  );
}
