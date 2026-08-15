import { auth } from '@/auth';
import { loadDashboardMe } from '@/lib/me';
import { MeProvider } from '@/lib/meContext';
import { DashboardShell } from '@/components/DashboardShell';

/**
 * Dashboard 布局（Server Component）。
 * - 服务端用 auth() 取会话，已登录则 loadMe() 预取全部后台数据；
 * - 数据通过 <MeProvider initialMe> 注入客户端 MeContext，
 *   子页面首屏即带数据，无需客户端再转圈拉取。
 * - MeProvider 始终包裹 children（含未登录分支），保证 useMe() 不抛错；
 *   未登录时仅渲染窄容器 + 子页自行显示登录引导，不渲染后台导航。
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const ownerId = session?.user?.id;
  // 仅注入轻量数据（profile+stats），posts/works 由各页按需自拉，
  // 避免 membership/analytics 等非内容页被重查询拖慢。
  const me = ownerId ? await loadDashboardMe(ownerId) : null;

  return (
    <MeProvider initialMe={me}>
      {ownerId ? (
        <DashboardShell>{children}</DashboardShell>
      ) : (
        <main className="theme-surface min-h-screen">
          <div className="mx-auto max-w-3xl px-6 py-10">{children}</div>
        </main>
      )}
    </MeProvider>
  );
}
