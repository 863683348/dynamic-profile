import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '服务条款 · 动态主页',
  description:
    '动态主页服务条款，使用我们的个人主页生成器即表示同意以下条款和条件。',
  robots: { index: false, follow: true },
  openGraph: {
    title: '服务条款 · 动态主页',
    description:
      '动态主页服务条款，使用我们的个人主页生成器即表示同意以下条款和条件。',
  },
  twitter: {
    title: '服务条款 · 动态主页',
    description:
      '动态主页服务条款，使用我们的个人主页生成器即表示同意以下条款和条件。',
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
