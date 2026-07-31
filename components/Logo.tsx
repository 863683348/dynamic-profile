'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';

/**
 * 品牌标识：SVG 刊头标记 + 文字 wordmark。
 * 标记取材设计系统的“双线分隔”母题（杂志刊头/标题块），纯 SVG、可矢量缩放、无 emoji。
 * wordmark 跟随语言切换（t('brand')）。
 */
export function Logo({ size = 28 }: { size?: number }) {
  const { t } = useI18n();
  return (
    <Link
      href="/"
      aria-label={t('brand')}
      className="group flex items-center gap-2"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="shrink-0 transition-opacity group-hover:opacity-80"
      >
        <rect
          x="2.5"
          y="2.5"
          width="27"
          height="27"
          rx="5"
          stroke="var(--primary)"
          strokeWidth="2"
        />
        <line
          x1="9"
          y1="12"
          x2="23"
          y2="12"
          stroke="var(--primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="9"
          y1="17"
          x2="19"
          y2="17"
          stroke="var(--primary)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="9"
          y1="21"
          x2="21"
          y2="21"
          stroke="var(--primary)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="magazine-title text-lg leading-none tracking-tight text-[color:var(--ink)]">
        {t('brand')}
      </span>
    </Link>
  );
}
