'use client';

import { useI18n, type Lang } from '@/lib/i18n';

/**
 * 右上角语言切换器（中 / EN）。
 * fixed=true 时悬浮在页面右上角（用于无顶栏的公开主页）。
 */
export function LangToggle({ fixed = false }: { fixed?: boolean }) {
  const { lang, setLang } = useI18n();

  const btn = (l: Lang, label: string) => (
    <button
      type="button"
      onClick={() => setLang(l)}
      aria-pressed={lang === l}
      className="px-2 py-1 transition-colors"
      style={{
        color: lang === l ? 'var(--primary)' : 'var(--ink)',
        opacity: lang === l ? 1 : 0.55,
        fontWeight: lang === l ? 700 : 500,
      }}
    >
      {label}
    </button>
  );

  return (
    <div
      className={
        'flex items-center rounded-full border text-xs ' +
        (fixed
          ? 'fixed right-4 top-4 z-40 '
          : ' ') +
        'border-[color:var(--rule)] bg-[color:var(--paper)]'
      }
      style={{ backdropFilter: 'blur(4px)' }}
    >
      {btn('zh', '中')}
      <span className="opacity-30">·</span>
      {btn('en', 'EN')}
    </div>
  );
}
