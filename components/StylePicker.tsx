'use client';

import { Check } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { STYLE_IDS, STYLE_ACCENT, type StyleId } from '@/lib/styles';

// 5 套风格的「选择卡」：每张卡用 data-style 直接套用该风格的全局 CSS，
// 因此预览即所见即所得（字体 / 配色 / 卡片质感随风格变化）。
// 预览内联 --primary 为该风格代表色（仅预览用），真实站点仍以用户 theme_color 为准。
export function StylePicker({
  value,
  onChange,
}: {
  value: StyleId;
  onChange: (s: StyleId) => void;
}) {
  const { t } = useI18n();
  return (
    <div>
      <span className="mag-label">{t('style_label')}</span>
      <p className="mb-3 text-xs opacity-60">{t('style_hint')}</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {STYLE_IDS.map((id) => {
          const active = value === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              aria-pressed={active}
              className="relative overflow-hidden rounded-lg border-2 bg-[color:var(--paper)] text-left transition"
              style={{ borderColor: active ? 'var(--primary)' : 'var(--rule)' }}
            >
              <div
                data-style={id}
                className="style-preview p-3"
                style={{ ['--primary' as string]: STYLE_ACCENT[id] } as React.CSSProperties}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-7 w-7 shrink-0 rounded-full border-2"
                    style={{ background: 'var(--primary)', borderColor: 'var(--paper)' }}
                  />
                  <span className="magazine-title truncate text-sm">{t(`st_${id}`)}</span>
                </div>
                <span
                  className="mt-3 inline-block rounded px-2 py-1 text-xs font-medium"
                  style={{ background: 'var(--primary)', color: '#fff' }}
                >
                  Aa
                </span>
              </div>
              {active && (
                <span
                  className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full"
                  style={{ background: 'var(--primary)', color: '#fff' }}
                >
                  <Check className="h-3 w-3" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
