'use client';

import { useEffect } from 'react';

/**
 * 公开主页浏览量累加器。
 *
 * 为什么放在客户端而不是 Server Component：
 * 公开主页是 ISR 页面（revalidate = 60），Server Component 仅在重新生成时执行，
 * 若把 incrementViews 放在服务端，60 秒内多次访问只会 +1，严重少算浏览量。
 * 改为由客户端在每次真实访问时调用 POST /api/profile/[handle]/view（贝洛奇确认的公开接口），
 * 既保证每次访问都 +1，也与后端契约一致，避免与 API 路由重复计数。
 *
 * 失败时静默忽略，不影响页面渲染。
 */
export function ViewTracker({ handle }: { handle: string }) {
  useEffect(() => {
    void fetch(`/api/profile/${encodeURIComponent(handle)}/view`, {
      method: 'POST',
    }).catch(() => {});
  }, [handle]);

  return null;
}
