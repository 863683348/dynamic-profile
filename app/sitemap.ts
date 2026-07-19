import type { MetadataRoute } from 'next';
import { sql } from '@/lib/db/index';

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://dynamic-profile-ten.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE}/linxi`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
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
