'use client';

import Script from 'next/script';

/**
 * Google AdSense 注入（GEO / 技术 SEO 变现）。
 *
 * 与 components/Analytics.tsx 一致的生产环境约束：
 *   - 仅生产环境加载（isProd），避免 localhost / Vercel 预览泄漏真实广告展示
 *   - isProd 由 server 端 layout 计算后 props 传入（VERCEL_ENV 非 NEXT_PUBLIC_）
 *   - 读取 NEXT_PUBLIC_ADSENSE_CLIENT（格式 ca-pub-XXXXXXXXXXXXXXXX）
 *     未配置 / 非生产环境时完全不注入脚本，不影响渲染
 *
 * 安全：
 *   - 仅注入 Google 官方 AdSense 域名脚本（googletagmanager.com / pagead2.googlesyndication.com）
 *   - 实际广告位由各页面通过 <ins class="adsbygoogle"> 自行放置（见 components/AdSlot.tsx）
 *   - 自动广告（page-level ads）由 AdSense 后台控制开关，此处仅加载库，不强制开启
 */
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export function AdSense({ isProd }: { isProd: boolean }) {
  // 非生产环境 / 未配置 client ID：不注入任何脚本
  if (!isProd || !ADSENSE_CLIENT) return null;

  return (
    <Script
      id="adsense-init"
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
    />
  );
}
