import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '隐私政策 · 动态主页',
  description:
    '动态主页隐私政策，说明我们如何收集、使用和保护您的个人信息。',
  robots: { index: false, follow: true },
  openGraph: {
    title: '隐私政策 · 动态主页',
    description: '动态主页隐私政策，说明我们如何收集、使用和保护您的个人信息。',
  },
  twitter: {
    title: '隐私政策 · 动态主页',
    description: '动态主页隐私政策，说明我们如何收集、使用和保护您的个人信息。',
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
