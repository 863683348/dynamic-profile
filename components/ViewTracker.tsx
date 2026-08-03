'use client';

import { useEffect } from 'react';

/**
 * 匿名访客标识：仅用于近似统计独立访客（UV），不含任何个人身份信息。
 * 存于浏览器 localStorage，无法跨设备/跨浏览器去重，仅作趋势参考。
 */
function getVid(): string {
  try {
    let vid = localStorage.getItem('dp_vid');
    if (!vid) {
      vid =
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `v_${Date.now()}_${Math.random().toString(16).slice(2)}`;
      localStorage.setItem('dp_vid', vid);
    }
    return vid;
  } catch {
    return '';
  }
}

/**
 * 公开主页浏览量累加 + 访客明细记录。
 *
 * 放在客户端而非 Server Component：公开主页是 ISR 页面（revalidate = 60），
 * 服务端仅在重新生成时执行，放服务端 60 秒内多次访问只会 +1，严重少算；
 * 改为客户端每次真实访问调用 POST /api/profile/[handle]/view，
 * 既保证每次访问都 +1，也写入 visits 明细供 Pro 访客分析使用。
 *
 * 失败时静默忽略，不影响页面渲染。
 */
export function ViewTracker({ handle }: { handle: string }) {
  useEffect(() => {
    const vid = getVid();
    void fetch(`/api/profile/${encodeURIComponent(handle)}/view`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vid }),
    }).catch(() => {});
  }, [handle]);

  return null;
}
