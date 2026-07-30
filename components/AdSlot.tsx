'use client';

import { useEffect, useRef } from 'react';

/**
 * Google AdSense 广告位组件。
 *
 * 用法：在任意页面合适位置放置 <AdSlot /> 即可。
 * 实际展示广告的前提：
 *   1) 本站在生产环境已加载 AdSense 库（components/AdSense.tsx）
 *   2) NEXT_PUBLIC_ADSENSE_CLIENT 已配置
 *   3) 在 Google AdSense 后台为该 site 启用了广告（自动广告或手动单元）
 *
 * 未配置 / 非生产环境时静默渲染空容器，不影响布局。
 * 通过 effect 执行 (adsbygoogle = window.adsbygoogle || []).push({})，
 * 并在已初始化后避免重复 push（防止 React 严格模式 / 重渲染导致重复投放）。
 */
export function AdSlot({
  className = '',
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    // 仅当 AdSense 库已加载、且本广告位尚未 push 过时执行
    const w = window as unknown as {
      adsbygoogle?: unknown[];
      NEXT_PUBLIC_ADSENSE_CLIENT?: string;
    };
    if (
      !w.adsbygoogle ||
      pushed.current ||
      !w.NEXT_PUBLIC_ADSENSE_CLIENT
    ) {
      return;
    }
    try {
      w.adsbygoogle.push({});
      pushed.current = true;
    } catch {
      /* 忽略广告库未就绪的异常，下次 effect 自然重试 */
    }
  }, []);

  return (
    <ins
      ref={ref}
      className={`adsbygoogle block ${className}`}
      style={style ?? { display: 'block' }}
      data-ad-format="auto"
      data-full-width-responsive="true"
      data-ad-layout="in-article"
    />
  );
}
