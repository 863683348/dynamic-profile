import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '联系我们 · 动态主页',
  description:
    '有疑问或建议？联系我们获取帮助。动态主页 — 零代码杂志风个人主页生成器。',
  openGraph: {
    title: '联系我们 · 动态主页',
    description:
      '有疑问或建议？联系我们获取帮助。动态主页 — 零代码杂志风个人主页生成器。',
  },
  twitter: {
    title: '联系我们 · 动态主页',
    description:
      '有疑问或建议？联系我们获取帮助。动态主页 — 零代码杂志风个人主页生成器。',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
