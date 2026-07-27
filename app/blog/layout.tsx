import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '博客 · 个人品牌与作品集建设指南',
  description:
    '关于个人品牌打造、作品集展示技巧、链接树替代方案及零代码建站的深度文章。用杂志风格的个人主页在数字世界脱颖而出。',
  openGraph: {
    title: '动态主页 · 博客',
    description:
      '个人品牌、作品集与动态主页的思考与更新。分享使用技巧、设计思路与产品更新。',
  },
  twitter: {
    title: '动态主页 · 博客',
    description:
      '个人品牌、作品集与动态主页的思考与更新。分享使用技巧、设计思路与产品更新。',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
