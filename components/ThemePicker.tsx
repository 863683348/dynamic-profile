'use client';

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
  return (
    <div>
      <span className="mag-label">主题色</span>
      <div className="flex flex-wrap items-center gap-2">
        {PRESETS.map((c) => {
          const selected = color.toLowerCase() === c.toLowerCase();
          return (
            <button
              key={c}
              type="button"
              onClick={() => onChangeColor(c)}
              aria-label={`选择主题色 ${c}`}
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
          aria-label="自定义主题色"
        />
      </div>
      <label className="mt-4 flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={dark}
          onChange={(e) => onChangeDark(e.target.checked)}
        />
        使用暗色配色
      </label>
    </div>
  );
}
