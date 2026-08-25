import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BLOG_POSTS, getPostBySlug } from '@/lib/blog-posts';
import { BlogPostClient } from './BlogPostClient';

// 从正文 markdown 的 "## FAQ" 区块解析问答，派生 FAQPage 结构化数据。
// 正文 FAQ 为可见内容（BlogPostClient 渲染），Schema 与可见内容一致，合规。
function parseFaq(body: string): { q: string; a: string }[] {
  const idx = body.toLowerCase().indexOf('## faq');
  if (idx === -1) return [];
  const faqText = body.slice(idx + 6);
  const lines = faqText.split('\n');
  const pairs: { q: string; a: string }[] = [];
  let cur: { q: string; a: string } | null = null;
  for (const raw of lines) {
    const line = raw.trim();
    const m = line.match(/^\*\*(.+?)\*\*$/);
    if (m) {
      if (cur) pairs.push(cur);
      cur = { q: m[1].trim(), a: '' };
    } else if (cur && line !== '') {
      cur.a += (cur.a ? ' ' : '') + line;
    }
  }
  if (cur) pairs.push(cur);
  return pairs
    .map((p) => ({ q: p.q, a: p.a.replace(/\s+/g, ' ').trim() }))
    .filter((p) => p.q.length > 0 && p.a.length > 10)
    .slice(0, 8);
}

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://dynamic-profile.shop';

// Only the known slugs are valid; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const path = `/blog/${post.slug}`;
  const desc =
    post.body.en.length > 155
      ? post.body.en.slice(0, 152) + '...'
      : post.body.en;

  return {
    title: post.title.en,
    description: desc,
    alternates: {
      canonical: path,
      languages: {
        'x-default': path,
        en: path,
        'zh-CN': path,
      },
    },
    openGraph: {
      type: 'article',
      title: post.title.en,
      description: desc,
      url: `${SITE}${path}`,
      siteName: 'Dynamic Profile',
      locale: 'en_US',
      alternateLocale: 'zh_CN',
      publishedTime: post.publishedAt,
      modifiedTime: post.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title.en,
      description: desc,
    },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const url = `${SITE}/blog/${post.slug}`;
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: post.title.en,
    description: post.body.en,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    image: SITE + '/og-image.svg',
    inLanguage: ['en', 'zh-CN'],
    author: { '@type': 'Organization', name: 'Dynamic Profile', url: SITE, '@id': SITE + '#organization' },
    publisher: {
      '@type': 'Organization',
      name: 'Dynamic Profile',
      url: SITE,
    },
    url,
  };

  const faqItems = parseFaq(post.body.en);
  const faqJsonLd = faqItems.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((it) => ({
          '@type': 'Question',
          name: it.q,
          acceptedAnswer: { '@type': 'Answer', text: it.a },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <BlogPostClient post={post} />
    </>
  );
}
