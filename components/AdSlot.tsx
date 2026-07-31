'use client';

import { useEffect, useRef } from 'react';

/**
 * Google AdSense 广告位组件。
 *
 * 用法：在任意页面合适位置放置 <AdSlot /> 即可。
 * 实际展示广告的前提：
 *   1) 本站在生产环境已加载 AdSense 库（components/AdSense.tsx）
 *   2) NEXT_PUBLIC_ADSENSE_CLIENT 已配置（格式 ca-pub-XXXXXXXXXXXXXXXX）
 *   3) 在 Google AdSense 后台为该 site 启用了广告（自动广告或手动单元）
 *
 * 未配置时静默渲染空容器，不影响布局。
 *
 * 说明：
 *   - NEXT_PUBLIC_ 前缀的环境变量在构建期被内联进客户端 bundle，
 *     直接在客户端组件里读 process.env.NEXT_PUBLIC_ADSENSE_CLIENT 即可，
 *     它不会（也不应该）出现在 window 上。
 *   - Google 官方模式：(adsbygoogle = window.adsbygoogle || []).push({})
 *     即使库尚未加载也安全——push 只是把请求放进队列，库加载后统一处理。
 *     因此不要用「!w.adsbygoogle 就 return」的判断，那会错过加载时序。
 */
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

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
    // 未配置 client ID：静默跳过
    if (pushed.current || !ADSENSE_CLIENT) return;

    const w = window as unknown as { adsbygoogle?: unknown[] };
    try {
      // Google 官方队列模式：库未加载时先入队，加载后自动处理
      w.adsbygoogle = w.adsbygoogle || [];
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
