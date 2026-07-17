import Link from 'next/link';
import { ArrowRight, Newspaper } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="theme-surface min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <div className="double-rule mb-10 flex items-center justify-between px-1 py-3">
          <span className="text-xs uppercase tracking-[0.2em] opacity-70">动态个人主页</span>
          <Newspaper className="h-5 w-5 text-primary" />
        </div>

        <h1 className="magazine-title text-5xl leading-tight md:text-6xl">
          把你的动态，<br />
          排成一本杂志。
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-80">
          一个属于你自己的编辑风格主页。记录动态、展示作品，用衬线大标题与双线分隔，呈现克制的阅读美感。
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link href="/dashboard" className="mag-btn">
            进入控制台
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/linxi" className="mag-btn mag-btn-secondary">
            查看样本主页
          </Link>
        </div>

        <div className="double-rule mt-16 px-1 py-4 text-sm opacity-70">
          样本：
          <Link href="/linxi" className="text-primary underline-offset-2 hover:underline">
            @linxi
          </Link>{' '}
          · 风格 B · 杂志编辑风
        </div>
      </div>
    </main>
  );
}
