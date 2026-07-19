'use client';

import { useEffect } from 'react';

/**
 * 公开主页主题初始化：访客未手动切换过时，
 * 按主人设定的亮/暗作为默认。一旦访客切换（ThemeToggle 写入 localStorage），
 * 本组件不再覆盖，访客偏好优先。
 */
export function ProfileThemeInit({ dark }: { dark: boolean }) {
  useEffect(() => {
    if (!localStorage.getItem('theme')) {
      document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    }
  }, [dark]);
  return null;
}
