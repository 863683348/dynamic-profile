import { neon } from "@neondatabase/serverless";

// Neon serverless driver（HTTP 模式，基于 fetch）。
// 连接串来自环境变量 DATABASE_URL（Neon 控制台 → Connection Details 复制）。
const raw = process.env.DATABASE_URL?.trim();
const connectionString =
  raw && raw.length > 0
    ? raw
    : "postgresql://localhost:5432/placeholder";

// 是否已配置「真实」数据库连接（排除占位串 / localhost）。
// 占位串仅用于在缺少 DATABASE_URL 时让 `next build` 不报错；
// 真正的连接错误在运行时出现，这里提前给出可读提示。
const isConfigured = !!raw && !/localhost|placeholder/i.test(connectionString);

const neonSql = neon(connectionString);

/**
 * 包装后的查询函数：未配置真实 DATABASE_URL 时立即抛出可读错误，
 * 避免运行时出现难以定位的 “fetch failed / 服务器错误”。
 * 配置正常时透传给 neon 驱动。
 */
export async function sql(
  strings: TemplateStringsArray,
  ...values: unknown[]
): Promise<any[]> {
  if (!isConfigured) {
    throw new Error(
      "DB_NOT_CONFIGURED: 数据库未配置。请在 .env.local 填入真实 Neon DATABASE_URL 并执行 neon/schema.sql"
    );
  }
  return (await (neonSql as any)(strings, ...values)) as any[];
}

export { connectionString, isConfigured };
