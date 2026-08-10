import type { MetadataRoute } from 'next';
import { sql } from '@/lib/db/index';
import { BLOG_POSTS } from '@/lib/blog-posts';

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://dynamic-profile.shop';

// 缓存 24 小时：sitemap 仅在新主页/博客发布时变化，
// 但 Googlebot 高频抓取，每次都执行 SELECT handle FROM profiles 会推高 FOT；
// 整站缓存后绝大部分抓取直接命中边缘，不再触发函数执行。
export const revalidate = 86400;

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

  const blogPosts: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${SITE}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogPosts, ...dynamic];
}
