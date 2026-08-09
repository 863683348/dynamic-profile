import { redirect } from 'next/navigation';
import { handlers } from '@/auth';

/**
 * 拦截直接 GET /api/auth/signin/:provider 的请求。
 *
 * Auth.js 的 provider-specific signin 路由只接受前端 signIn() 发起的 POST，
 * 如果用户复制链接在新标签页打开、浏览器扩展预检或被搜索引擎收录后直接访问，
 * 会抛 UnknownAction 并渲染 error=Configuration（500）。
 *
 * GET 重定向回登录页；POST 照常交给 Auth.js 处理 OAuth 起手。
 */
export function GET(
  request: Request,
  { params }: { params: { provider: string } }
) {
  const { provider } = params;
  const url = new URL('/login', request.url);
  url.searchParams.set('provider', provider);
  url.searchParams.set('error', 'direct_signin_link');
  redirect(url.toString());
}

/**
 * 关键：此路由优先级高于 [...nextauth]/route.ts，
 * 如果只导出 GET，前端 signIn('google') 的 POST 请求会落到本路由并返回 405。
 * 因此必须把 POST 透传给 Auth.js 的 handlers.POST。
 */
export const POST = handlers.POST;
