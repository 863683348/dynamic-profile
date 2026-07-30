import type { MetadataRoute } from 'next';

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://dynamic-profile.shop';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
    // AdSense 授权文件（ads.txt）由 app/ads.txt/route.ts 提供
    // 此处显式声明，便于 Google 广告爬虫发现与校验
    ...(process.env.ADS_TXT_CONTENT ? { 'ads.txt': `${SITE}/ads.txt` } : {}),
  } as MetadataRoute.Robots;
}
