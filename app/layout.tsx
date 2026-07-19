import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Providers } from './providers';
import { Analytics } from '@/components/Analytics';

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://dynamic-profile-ten.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: '动态主页 · 个人杂志',
    template: '%s · 动态主页',
  },
  description:
    '用杂志编辑风，构建你的动态个人主页。记录动态、展示作品，呈现克制的阅读美感。',
  keywords: ['动态主页', '个人主页', '杂志风', '个人品牌', 'Dynamic Profile'],
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
    title: '动态主页 · 个人杂志',
    description:
      '用杂志编辑风，构建你的动态个人主页。记录动态、展示作品，呈现克制的阅读美感。',
    url: SITE,
  },
  twitter: {
    card: 'summary_large_image',
    title: '动态主页 · 个人杂志',
    description:
      '用杂志编辑风，构建你的动态个人主页。记录动态、展示作品，呈现克制的阅读美感。',
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

  return (
    <html lang="zh-CN">
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.dataset.theme=t;}}catch(e){}`,
          }}
        />
        <Providers>{children}</Providers>
        <Analytics isProd={isProd} />
      </body>
    </html>
  );
}
