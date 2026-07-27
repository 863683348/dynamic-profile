import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '定价 · 免费版与 Pro 版功能对比',
  description:
    '动态主页提供免费版和 Pro 版两种方案。免费版免费创建个人主页，Pro 版去除品牌标识、开放高级主题与数据分析面板，按年订阅更优惠。',
  openGraph: {
    title: '定价 · 动态主页 | 免费版与 Pro 版功能对比',
    description:
      '免费创建个人主页，Pro 版解锁更多高级功能。按年订阅更优惠，随时可升级。',
  },
  twitter: {
    title: '定价 · 动态主页 | 免费版与 Pro 版功能对比',
    description:
      '免费创建个人主页，Pro 版解锁更多高级功能。按年订阅更优惠，随时可升级。',
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
