import type { MetadataRoute } from 'next';
import { unstable_cache } from 'next/cache';
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

  // profiles 列表走数据缓存（unstable_cache，revalidate=86400），
  // 否则 neon no-store 查询会强制 sitemap 动态渲染，Googlebot 高频抓取
  // 仍会触发函数执行与 FOT。缓存后整张 sitemap 可静态生成并命中边缘。
  const getCachedProfileHandles = unstable_cache(
    async () => {
      const rows = (await sql`SELECT handle FROM profiles`) as {
        handle: string;
      }[];
      return rows.map((r) => r.handle);
    },
    ["sitemap-profiles"],
    { revalidate: 86400 },
  );

  let dynamic: MetadataRoute.Sitemap = [];
  try {
    const handles = await getCachedProfileHandles();
    dynamic = handles.map((h) => ({
      url: `${SITE}/${h}`,
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
