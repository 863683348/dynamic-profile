/**
 * 一次性迁移脚本：为 profiles 表增加打赏相关 5 列（幂等，可重复执行）。
 * 用法：npx tsx migrate-tip-columns.ts
 */
import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { readFileSync } from "fs";
import { resolve } from "path";

const raw = process.env.DATABASE_URL?.trim();
if (!raw || /localhost|placeholder/i.test(raw)) {
  console.error("ERROR: DATABASE_URL 未配置或指向本地。请在 .env.local 填入 Neon 连接串。");
  process.exit(1);
}

const sql = neon(raw);

const columns = [
  { name: "tip_enabled", def: "boolean NOT NULL DEFAULT false" },
  { name: "tip_message", def: "text DEFAULT NULL" },
  { name: "bmc_username", def: "text DEFAULT NULL" },
  { name: "wechat_qr_url", def: "text DEFAULT NULL" },   // data URL (base64 PNG)
  { name: "alipay_qr_url", def: "text DEFAULT NULL" },    // data URL (base64 PNG)
];

async function migrate() {
  // 检查已有列
  const existing = await sql`SELECT column_name FROM information_schema.columns WHERE table_name='profiles'`;
  const names = existing.map((r: any) => r.column_name);

  for (const col of columns) {
    if (names.includes(col.name)) {
      console.log(`  SKIP ${col.name} (已存在)`);
      continue;
    }
    try {
      await sql.unsafe(`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS ${col.name} ${col.def}`);
      console.log(`  OK   ${col.name} 已添加`);
    } catch (e: any) {
      console.error(`  ERR  ${col.name}: ${e.message}`);
    }
  }

  // 验证
  const after = await sql`SELECT column_name FROM information_schema.columns WHERE table_name='profiles' ORDER BY ordinal_position`;
  const tipCols = after.filter((r: any) => r.column_name.startsWith("tip_") || ["bmc_username","wechat_qr_url","alipay_qr_url"].includes(r.column_name));
  console.log("\n验证 — profiles 表打赏列:");
  tipCols.forEach((r: any) => console.log(`  - ${r.column_name}`));
  console.log("\n迁移完成！");
}

migrate().catch((e) => {
  console.error("迁移失败:", e.message);
  process.exit(1);
});
