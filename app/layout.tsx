import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Providers } from './providers';
import { Analytics } from '@/components/Analytics';

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://dynamic-profile.shop';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: '动态主页 · 杂志风个人主页 / 作品集 / 链接聚合',
    template: '%s · 动态主页',
  },
  description:
    '杂志编辑风的动态个人主页生成器：一站式聚合作品集、动态与个人品牌，是 Linktree 链接树之外的更体面选择。零代码、移动端友好、SEO 友好，几分钟搭好你的个人网站与数字名片。',
  keywords: [
    // 中文趋势词
    '动态主页',
    '个人主页',
    '个人网站',
    '作品集',
    '个人品牌',
    '链接聚合',
    '链接树',
    '链接树替代',
    '数字名片',
    '自媒体主页',
    '一站式个人主页',
    '杂志风',
    '零代码建站',
    '个人主页生成器',
    '动态作品集',
    '创作者主页',
    '个人 IP 主页',
    // 英文趋势词
    'Dynamic Profile',
    'personal website',
    'link in bio',
    'linktree alternative',
    'personal brand',
    'portfolio website',
    'digital business card',
    'micro-site builder',
    'bio link',
    'creator economy',
    'link hub',
    'personal homepage',
    'magazine style',
    'no-code website',
  ],
  alternates: {
    languages: {
      'zh-CN': '/',
      en: '/',
    },
  },
  openGraph: {
    type: 'website',
    siteName: '动态主页',
    locale: 'zh_CN',
    title: '动态主页 · 杂志风个人主页 / 作品集 / 链接聚合',
    description:
      '杂志编辑风的动态个人主页生成器：一站式聚合作品集、动态与个人品牌，是 Linktree 链接树之外的更体面选择。零代码、移动端友好、SEO 友好。',
    url: SITE,
  },
  twitter: {
    card: 'summary_large_image',
    title: '动态主页 · 杂志风个人主页 / 作品集 / 链接聚合',
    description:
      '杂志编辑风的动态个人主页生成器：一站式聚合作品集、动态与个人品牌，是 Linktree 链接树之外的更体面选择。零代码、移动端友好、SEO 友好。',
  },
};

export const viewport: Viewport = {
  themeColor: '#c2410c',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 仅生产环境加载 GA4 / 热力（skill ⑦ 规范），避免 localhost / 预览污染真实数据。
  // VERCEL_ENV 是 server-only 变量，须在 server 端计算后传入客户端组件。
  const isProd =
    process.env.NODE_ENV === 'production' &&
    process.env.VERCEL_ENV !== 'preview';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: '动态主页',
        url: SITE,
        description:
          '杂志编辑风的动态个人主页生成器：一站式聚合作品集、动态与个人品牌，是 Linktree 链接树之外的更体面选择。',
        inLanguage: ['zh-CN', 'en'],
      },
      {
        '@type': 'SoftwareApplication',
        name: '动态主页',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
    ],
  };

  return (
    <html lang="zh-CN">
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.dataset.theme=t;}}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
        <Analytics isProd={isProd} />
      </body>
    </html>
  );
}
