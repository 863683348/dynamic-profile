/**
 * 一次性迁移：为 profiles 表增加打赏 5 列（幂等）。
 * 用法（在项目目录下）：node migrate-tip-columns.mjs
 */
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { neon } from "@neondatabase/serverless";

const __dirname = dirname(fileURLToPath(import.meta.url));

// 手动读 .env.local
let dbUrl = "";
try {
  const envContent = readFileSync(resolve(__dirname, ".env.local"), "utf-8");
  for (const line of envContent.split("\n")) {
    const m = line.match(/^DATABASE_URL=(.+)$/);
    if (m) { dbUrl = m[1].trim(); break; }
  }
} catch {
  // ignore
}
if (!dbUrl || /localhost|placeholder/i.test(dbUrl)) {
  console.error("ERROR: 未在 .env.local 找到有效 DATABASE_URL");
  process.exit(1);
}

const sql = neon(dbUrl);

const columns = [
  ["tip_enabled",   "boolean NOT NULL DEFAULT false"],
  ["tip_message",   "text DEFAULT NULL"],
  ["bmc_username",  "text DEFAULT NULL"],
  ["wechat_qr_url", "text DEFAULT NULL"],
  ["alipay_qr_url", "text DEFAULT NULL"],
];

async function migrate() {
  const existing = await sql`SELECT column_name FROM information_schema.columns WHERE table_name='profiles'`;
  const names = existing.map(r => r.column_name);

  console.log("开始迁移 — 增加 profiles 打赏列...\n");
  for (const [col, def] of columns) {
    if (names.includes(col)) {
      console.log(`  SKIP ${col} (已存在)`);
      continue;
    }
    try {
      await sql.unsafe(`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS ${col} ${def}`);
      console.log(`  OK   ${col}`);
    } catch (e) {
      console.error(`  ERR  ${col}: ${e.message}`);
    }
  }

  // 验证
  const after = await sql`
    SELECT column_name FROM information_schema.columns 
    WHERE table_name='profiles' 
    AND column_name IN ('tip_enabled','tip_message','bmc_username','wechat_qr_url','alipay_qr_url')
    ORDER BY ordinal_position
  `;
  console.log("\n验证结果:");
  after.forEach(r => console.log(`  + ${r.column_name}`));
  if (after.length === 0) console.log("  (无打赏列 — 可能已存在但查询未返回)");
  console.log("\n迁移完成！");
}

migrate().catch(e => { console.error("FATAL:", e.message); process.exit(1); });
