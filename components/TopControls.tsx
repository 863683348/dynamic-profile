'use client';

import { LangToggle } from './LangToggle';
import { ThemeToggle } from './ThemeToggle';

/**
 * 右上角统一控制簇：语言（中/EN）+ 亮暗切换。
 * 固定悬浮于页面右上角，所有页面复用。
 */
export function TopControls() {
  return (
    <div className="fixed right-4 top-3 z-50 flex items-center gap-2">
      <LangToggle />
      <ThemeToggle />
    </div>
  );
}
