'use client';

import { useI18n } from '@/lib/i18n';
import { STYLE_IDS, type StyleId } from '@/lib/styles';
import { StylePreviewCard } from './StylePreviewCard';

// 5 套风格的「选择卡」：每张卡用 data-style 直接套用该风格的全局 CSS，
// 预览即所见即所得（字体 / 配色 / 卡片质感随风格变化）。
export function StylePicker({
  value,
  onChange,
  disabled,
}: {
  value: StyleId;
  onChange: (s: StyleId) => void;
  disabled?: boolean;
}) {
  const { t } = useI18n();
  return (
    <div className={disabled ? 'pointer-events-none opacity-60' : undefined}>
      <span className="mag-label">{t('style_label')}</span>
      <p className="mb-2 text-xs opacity-60">{t('style_pick_sub')}</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {STYLE_IDS.map((id) => (
          <StylePreviewCard
            key={id}
            id={id}
            active={value === id}
            disabled={disabled}
            onClick={() => onChange(id)}
            showDesc
          />
        ))}
      </div>
    </div>
  );
}
