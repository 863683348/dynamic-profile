import { handlers } from "@/auth";

export const { GET, POST } = handlers;

// 关键：退出静态生成，避免 Next 在沙箱里用 jest-worker 预渲染该 catch-all 路由时崩溃
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
