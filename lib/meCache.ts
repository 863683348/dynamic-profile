// /api/me 结果的前端去重 + 短缓存。
// 痛点：dashboard 布局（读 style/主题色）与各个子页面（读 posts/works/stats）
// 都会在挂载时各自 fetch('/api/me')，同一页面加载会并发 2 次甚至更多，
// 而每次 /api/me 都要打若干次数据库查询（Neon serverless 每次 ~300ms+ 往返），
// 于是「后台管理页」整体显得特别慢。
//
// 这里把请求合并：并发的多次 fetchMe() 复用同一次在途请求；
// 短时间内（TTL）的重复调用直接返回缓存，避免 mutation 之外的多余请求。
// force=true 时清空缓存（用于提交/删除后主动刷新）。

import type { Profile, Post, Work, Stats, Subscription } from '@/lib/types';

type MeData = {
  profile: Profile | null;
  posts: Post[];
  works: Work[];
  stats: Stats | null;
  sub: Subscription | null;
} | null;

let inflight: Promise<MeData> | null = null;
let cached: { data: MeData; ts: number } | null = null;
const TTL = 5000;

export function clearMeCache(): void {
  cached = null;
}

export function fetchMe(force = false): Promise<MeData> {
  if (force) cached = null;

  const now = Date.now();
  if (!force && cached && now - cached.ts < TTL) {
    return Promise.resolve(cached.data);
  }
  // 并发去重：若已有在途请求，复用它（它完成后会写缓存）
  if (inflight) return inflight;

  inflight = (async () => {
    try {
      const res = await fetch('/api/me');
      const data = res.ok ? ((await res.json()) as MeData) : null;
      if (data) cached = { data, ts: Date.now() };
      return data;
    } finally {
      inflight = null;
    }
  })();

  return inflight;
}
