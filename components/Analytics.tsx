'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

/**
 * 分析与热力图注入（⑦ GA4 + 热力）。
 *
 * 关键约束（来自 dafeixiang-saas-launch skill 上线规范）：
 *   GA4 / 热力【仅生产环境加载】，避免 localhost 与 Vercel 预览环境污染真实数据。
 *   isProd = NODE_ENV==='production' && VERCEL_ENV!=='preview'
 *   该判断在 server 端（layout.tsx）计算后通过 props 传入，因为 VERCEL_ENV
 *   不是 NEXT_PUBLIC_ 变量，不会被打进客户端包。
 *
 * - GA4：读取 NEXT_PUBLIC_GA_ID（格式 G-XXXXXXXXXX）
 * - 热力图：Microsoft Clarity，读取 NEXT_PUBLIC_CLARITY_ID
 * 任一 ID 未配置或非生产环境时自动跳过，不影响渲染。
 *
 * SPA 路由追踪：App Router 的 <Link> 客户端导航不刷新页面，
 * 需在 pathname 变化时重新 gtag('config', …, {page_path}) 以统计新页面。
 * 首屏 page_view 已由下方 ga4-init 的 config 发送，故 effect 跳过首次执行。
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export function Analytics({ isProd }: { isProd: boolean }) {
  const pathname = usePathname();
  const firstRun = useRef(true);

  useEffect(() => {
    if (!isProd || !GA_ID) return;
    // 跳过首屏：首屏 page_view 已由 ga4-init 的 gtag('config') 发送，
    // 这里只在客户端路由变化后补发，避免重复计数
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const w = window as unknown as { gtag?: (...a: unknown[]) => void };
    if (typeof w.gtag === 'function') {
      w.gtag('config', GA_ID, { page_path: pathname });
    }
  }, [pathname, isProd]);

  // 非生产环境 / 未配置 ID：不注入任何脚本（避免 localhost / 预览污染数据）
  if (!isProd) return null;
  if (!GA_ID && !CLARITY_ID) return null;

  return (
    <>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { page_path: window.location.pathname });
            `}
          </Script>
        </>
      )}
      {CLARITY_ID && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window,document,"clarity","script","${CLARITY_ID}");
          `}
        </Script>
      )}
    </>
  );
}
