import { NextResponse } from "next/server";

// dashboard 自身已在客户端通过 useSession() 判断登录态并显示登录 UI，
// 因此不需要 middleware 强制保护 /dashboard。
// 注意：不要把 /dashboard 同时设为 next-auth 的 signIn 页
// （pages.signIn: "/dashboard"）——那会让客户端 useSession 永远停在
// loading，表现即「控制台一直转圈」，这是 next-auth v5 的已知冲突。
// API 路由（/api/me、/api/profile…）各自在 handler 内调用 auth() 自行鉴权。
export function middleware() {
  return NextResponse.next();
}

export const config = {
  // 不匹配任何路径，使本 middleware 实际不执行拦截逻辑；
  // 日后若需 server 端保护，可在此放开 matcher 并另行设置独立登录页。
  matcher: [],
};
