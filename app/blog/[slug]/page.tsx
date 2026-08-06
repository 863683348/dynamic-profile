import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BLOG_POSTS, getPostBySlug } from '@/lib/blog-posts';
import { BlogPostClient } from './BlogPostClient';

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
    inLanguage: ['en', 'zh-CN'],
    author: { '@type': 'Organization', name: 'Dynamic Profile' },
    publisher: {
      '@type': 'Organization',
      name: 'Dynamic Profile',
      url: SITE,
    },
    url,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BlogPostClient post={post} />
    </>
  );
}
