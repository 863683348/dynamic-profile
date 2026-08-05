import type { Metadata } from 'next';
import LandingPage from './landing-page';

// 首页 server 包装层：仅用于声明 canonical（客户端组件无法 export metadata）。
// 真实内容与交互在 ./landing-page（'use client'）。
export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Page() {
  return <LandingPage />;
}
