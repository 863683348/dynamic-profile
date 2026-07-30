import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Providers } from './providers';
import { Analytics } from '@/components/Analytics';
import { AdSense } from '@/components/AdSense';

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://dynamic-profile.shop';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'Dynamic Profile · No-Code Personal Homepage Builder | Magazine-Style Portfolio & Link in Bio',
    template: '%s · Dynamic Profile',
  },
  description:
    'Build your own magazine-style personal homepage in minutes — no coding required. A sleek portfolio, social links & bio all in one place. A more elegant alternative to Linktree. Free to start →',
  keywords: [
    // English keywords (primary - default language)
    'Dynamic Profile',
    'personal website',
    'link in bio',
    'linktree alternative',
    'personal homepage',
    'portfolio website',
    'digital business card',
    'no-code website builder',
    'personal brand',
    'creator economy',
    'micro-site builder',
    'bio link',
    'link hub',
    'magazine style',
    'personal page generator',
    // Chinese keywords (secondary)
    '动态主页',
    '个人主页',
    '个人网站',
    '作品集',
    '个人品牌',
    '链接聚合',
    '链接树替代',
    '数字名片',
    '零代码建站',
    '个人主页生成器',
    '创作者主页',
  ],
  alternates: {
    languages: {
      'x-default': '/',
      en: '/',
      'zh-CN': '/',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Dynamic Profile',
    locale: 'en_US',
    alternateLocale: 'zh_CN',
    title: 'Dynamic Profile · No-Code Personal Homepage Builder | Magazine-Style Portfolio & Link in Bio',
    description:
      'Build your own magazine-style personal homepage in minutes — no coding. A sleek portfolio, social links & bio all in one place. The elegant Linktree alternative.',
    url: SITE,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dynamic Profile · No-Code Personal Homepage Builder',
    description:
      'Build your own magazine-style personal homepage in minutes — no coding required. Portfolio, social links & bio. Free to start.',
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
        name: 'Dynamic Profile',
        url: SITE,
        description:
          'Magazine-style personal homepage builder. Portfolio, social links & bio — no coding required. Elegant Linktree alternative.',
        inLanguage: ['en', 'zh-CN'],
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Dynamic Profile',
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
        <AdSense isProd={isProd} />
      </body>
    </html>
  );
}
