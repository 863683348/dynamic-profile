import { auth } from "@/auth";

// 用 next-auth v5 官方 middleware：自动保护 matcher 路由，
// 未登录跳转到 pages.signIn（/dashboard），且内置「当前已是登录页则不重跳」守卫，
// 避免 /dashboard 同时是 signIn 页导致的重定向死循环。
export { auth as middleware };

export const config = {
  matcher: ["/dashboard/:path*"],
};
