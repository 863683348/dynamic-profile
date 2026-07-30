import type { MetadataRoute } from 'next';
import { sql } from '@/lib/db/index';

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://dynamic-profile.shop';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${SITE}/pricing`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${SITE}/privacy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${SITE}/terms`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${SITE}/faq`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${SITE}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.5 },
    { url: `${SITE}/contact`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.4 },
    // AdSense 授权文件（ads.txt）由 Google 爬虫抓取验证
    ...(process.env.ADS_TXT_CONTENT
      ? [{ url: `${SITE}/ads.txt`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.1 }]
      : []),
  ];

  let dynamic: MetadataRoute.Sitemap = [];
  try {
    const rows = (await sql`SELECT handle FROM profiles`) as {
      handle: string;
    }[];
    dynamic = rows.map((r) => ({
      url: `${SITE}/${r.handle}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch {
    // DB 不可用时至少保留静态路由
  }

  return [...staticRoutes, ...dynamic];
}
