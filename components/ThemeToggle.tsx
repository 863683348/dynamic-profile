'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

/**
 * 右上角亮/暗切换（④ 亮黑 UI 设定）。
 * 把 light/dark 写到 <html data-theme> 并持久化到 localStorage('theme')。
 * 公开主页在没有访客偏好时由 ProfileThemeInit 按其主人设定初始化。
 */
export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') {
      document.documentElement.dataset.theme = saved;
      setDark(saved === 'dark');
    }
    // 无保存值：不动（公开主页可能已按主人设定初始化；其它页默认浅色）
  }, []);

  function toggle() {
    const next = dark ? 'light' : 'dark';
    setDark(next === 'dark');
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? '切换到浅色' : '切换到暗色'}
      className="flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--rule)] bg-[color:var(--paper)]"
      style={{ backdropFilter: 'blur(4px)' }}
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
