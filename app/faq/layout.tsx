import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '常见问题 · 动态主页帮助中心',
  description:
    '关于动态主页注册、使用、付费和功能的常见问题解答。零代码搭建个人主页遇到问题？从这里开始。',
  openGraph: {
    title: '常见问题 · 动态主页帮助中心',
    description:
      '关于动态主页注册、使用、付费和功能的常见问题解答。零代码搭建个人主页遇到问题？从这里开始。',
  },
  twitter: {
    title: '常见问题 · 动态主页帮助中心',
    description:
      '关于动态主页注册、使用、付费和功能的常见问题解答。零代码搭建个人主页遇到问题？从这里开始。',
  },
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
