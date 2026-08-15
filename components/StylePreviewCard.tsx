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

  // 每种风格渲染不同的迷你布局，体现排版差异（不仅是颜色）
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
      {id === 'geek' ? (
        // ====== C 极客风：终端窗口 ======
        <div className="rounded border" style={{ borderColor: 'var(--rule)' }}>
          <div
            className="flex items-center gap-1.5 px-2 py-1.5 text-[9px] opacity-70"
            style={{ background: 'color-mix(in srgb, var(--primary) 8%, var(--bg))' }}
          >
            <span className="inline-block h-2 w-2 rounded-full bg-red-500/70" />
            <span className="inline-block h-2 w-2 rounded-full bg-yellow-500/70" />
            <span className="inline-block h-2 w-2 rounded-full bg-green-500/70" />
            <span className="ml-1 font-mono opacity-40">~/profile/xiaoman</span>
          </div>
          <div className="space-y-2 p-2">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 shrink-0 rounded bg-[color:var(--primary)]" />
              <div>
                <p className="magazine-title text-[11px] font-bold">$ 林小满</p>
                <p className="text-[8px] opacity-50 font-mono">@xiaoman · 设计中</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {['1.2K 浏览', '8 动态', '42 关注'].map((s) => (
                <span key={s} className="rounded border px-1 py-0.5 text-center text-[8px] font-mono" style={{ borderColor: 'var(--rule)' }}>{s}</span>
              ))}
            </div>
            <div className="flex gap-1">
              <span className="rounded border px-1.5 py-0.5 text-[8px] font-mono" style={{ borderColor: 'var(--rule)' }}>个人网站</span>
              <span className="rounded border px-1.5 py-0.5 text-[8px] font-mono" style={{ borderColor: 'var(--rule)' }}>GitHub</span>
            </div>
          </div>
        </div>
      ) : id === 'glass' ? (
        // ====== D 玻璃拟态：浮动卡片 + 渐变底 ======
        <div
          className="overflow-hidden rounded-lg"
          style={{
            background: 'linear-gradient(135deg, #eef4ff, #ecfeff)',
          }}
        >
          <div
            className="h-5 w-full"
            style={{ background: `linear-gradient(135deg, ${accent}80, ${accent})` }}
          />
          <div className="p-2">
            <div className="-mt-4 flex items-end gap-2">
              <span className="h-7 w-7 shrink-0 rounded-lg border-2 bg-white/80 shadow-sm" style={{ borderColor: 'rgba(255,255,255,0.9)', background: `linear-gradient(135deg, ${accent}90, ${accent})` }} />
              <div>
                <p className="magazine-title text-[11px] font-semibold">林小满</p>
                <p className="text-[8px] opacity-60">@xiaoman · 设计中</p>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              <span className="rounded-full bg-white/50 px-1.5 py-0.5 text-[8px] backdrop-blur-sm">个人网站</span>
              <span className="rounded-full bg-white/50 px-1.5 py-0.5 text-[8px] backdrop-blur-sm">GitHub</span>
              <span className="ml-auto rounded-full bg-white/50 px-1.5 py-0.5 text-[8px] tabular-nums backdrop-blur-sm">1.2K / 8 / 42</span>
            </div>
            <div className="mt-1.5">
              <span className="block w-full rounded-full bg-white/50 py-1 text-center text-[9px] backdrop-blur-sm">请我喝杯咖啡</span>
            </div>
          </div>
        </div>
      ) : id === 'neon' ? (
        // ====== E 霓虹赛博：发光边框 + 大写标题 ======
        <div
          className="overflow-hidden rounded-md border p-2"
          style={{
            borderColor: `${accent}66`,
            boxShadow: `0 0 10px ${accent}25`,
          }}
        >
          <div
            className="mb-2 h-5 w-full"
            style={{ background: `linear-gradient(135deg, ${accent}aa, ${accent}, #000)` }}
          />
          <div className="flex items-start gap-2">
            <span className="h-7 w-7 shrink-0 rounded-md border" style={{ borderColor: `${accent}55`, background: `linear-gradient(135deg, ${accent}, #000)`, boxShadow: `0 0 8px ${accent}30` }} />
            <div>
              <p className="magazine-title text-[11px] uppercase tracking-wider" style={{ textShadow: `0 0 6px ${accent}60` }}>林小满</p>
              <p className="text-[8px] uppercase tracking-widest opacity-40">@XIAOMAN // 设计中</p>
            </div>
          </div>
          <div className="mt-1.5 grid grid-cols-3 gap-1">
            {['◈ 1.2K', '▣ 8', '◎ 42'].map((s) => (
              <span key={s} className="border px-1 py-0.5 text-center text-[8px]" style={{ borderColor: `${accent}33`, boxShadow: `0 0 4px ${accent}15` }}>{s}</span>
            ))}
          </div>
          <div className="mt-1.5">
            <span className="block w-full rounded border py-1 text-center text-[9px]" style={{ borderColor: `${accent}44`, boxShadow: `0 0 6px ${accent}20` }}>请我喝杯咖啡</span>
          </div>
        </div>
      ) : id === 'minimal' ? (
        // ====== A 简约风：紧凑横条 ======
        <div>
          <div
            className="mb-2 h-5 w-full rounded-t-md"
            style={{ background: `linear-gradient(135deg, ${accent}99, ${accent}55)` }}
          />
          <div className="flex items-end gap-2">
            <span className="h-7 w-7 -mt-3 shrink-0 rounded-lg border-2 bg-white shadow-sm" style={{ borderColor: '#fff', background: `linear-gradient(135deg, ${accent}bb, ${accent})` }} />
            <div className="min-w-0 flex-1 pb-0.5">
              <p className="magazine-title truncate text-[11px] leading-tight">林小满</p>
              <p className="truncate text-[8px] opacity-50">@xiaoman · 设计中</p>
            </div>
          </div>
          <div className="mt-1.5 flex items-center gap-1.5 text-[8px] opacity-60">
            <span>个人网站</span><span>·</span><span>GitHub</span>
            <span className="ml-auto tabular-nums">1.2K · 8 · 42</span>
          </div>
        </div>
      ) : (
        // ====== B 杂志风（默认）：经典卡片 ======
        <>
          <div
            className="h-5 w-full"
            style={{
              background:
                'linear-gradient(135deg, color-mix(in srgb, var(--primary) 78%, #fff), var(--primary))',
            }}
          />
          <div className="px-3 pb-3 pt-2">
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
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              <span className="link-chip">个人网站</span>
              <span className="link-chip">GitHub</span>
            </div>
            <div className="mt-2.5">
              <span className="mag-btn block w-full text-center text-[11px]">请我喝杯咖啡</span>
            </div>
          </div>
        </>
      )}
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
