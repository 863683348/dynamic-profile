'use client';

import { useI18n } from '@/lib/i18n';

// PRD US-03：从 6 个预设主题色中点选。
// 统一暖色编辑风调性，不含紫/粉（避免 P0-2 紫粉渐变套路）。
const PRESETS = [
  '#c2410c', // terracotta 赤陶（默认）
  '#9a3412', // rust 铁锈
  '#b45309', // amber 琥珀
  '#a16207', // ochre 赭石
  '#0f766e', // teal 墨绿
  '#1d4ed8', // navy 藏蓝
];

export function ThemePicker({
  color,
  dark,
  onChangeColor,
  onChangeDark,
  disabled,
}: {
  color: string;
  dark: boolean;
  onChangeColor: (v: string) => void;
  onChangeDark: (v: boolean) => void;
  disabled?: boolean;
}) {
  const { t } = useI18n();
  return (
    <div className={disabled ? 'pointer-events-none opacity-60' : undefined}>
      <span className="mag-label">{t('tp_theme')}</span>
      <div className="flex flex-wrap items-center gap-2">
        {PRESETS.map((c) => {
          const selected = color.toLowerCase() === c.toLowerCase();
          return (
            <button
              key={c}
              type="button"
              onClick={() => onChangeColor(c)}
              disabled={disabled}
              aria-label={t('tp_pick', { c })}
              className="h-7 w-7 rounded-sm border"
              style={{
                background: c,
                borderColor: selected ? 'var(--ink)' : 'var(--rule)',
                outline: selected ? '2px solid var(--primary)' : 'none',
                outlineOffset: 2,
              }}
            />
          );
        })}
        <input
          type="color"
          value={color}
          onChange={(e) => onChangeColor(e.target.value)}
          disabled={disabled}
          className="h-7 w-10 cursor-pointer rounded-sm border bg-transparent"
          style={{ borderColor: 'var(--rule)' }}
          aria-label={t('tp_custom')}
        />
      </div>
      <label className="mt-4 flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={dark}
          onChange={(e) => onChangeDark(e.target.checked)}
          disabled={disabled}
        />
        {t('tp_dark')}
      </label>
    </div>
  );
}
