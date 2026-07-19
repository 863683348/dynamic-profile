'use client';

import { useI18n } from '@/lib/i18n';

const PRESETS = [
  '#c2410c', // terracotta（默认）
  '#9a3412',
  '#b45309',
  '#7c2d12',
  '#a16207',
  '#9333ea',
  '#0f766e',
  '#1d4ed8',
];

export function ThemePicker({
  color,
  dark,
  onChangeColor,
  onChangeDark,
}: {
  color: string;
  dark: boolean;
  onChangeColor: (v: string) => void;
  onChangeDark: (v: boolean) => void;
}) {
  const { t } = useI18n();
  return (
    <div>
      <span className="mag-label">{t('tp_theme')}</span>
      <div className="flex flex-wrap items-center gap-2">
        {PRESETS.map((c) => {
          const selected = color.toLowerCase() === c.toLowerCase();
          return (
            <button
              key={c}
              type="button"
              onClick={() => onChangeColor(c)}
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
        />
        {t('tp_dark')}
      </label>
    </div>
  );
}
