import { redirect } from 'next/navigation';

/**
 * 拦截直接 GET /api/auth/signin/:provider 的请求。
 *
 * Auth.js 的 provider-specific signin 路由只接受前端 signIn() 发起的 POST，
 * 如果用户复制链接在新标签页打开、浏览器扩展预检或被搜索引擎收录后直接访问，
 * 会抛 UnknownAction 并渲染 error=Configuration（500）。
 *
 * 这里把它友好地重定向回登录页，而不是展示冰冷的 Server error。
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
