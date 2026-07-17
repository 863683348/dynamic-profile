# 部署指南（Neon + Auth.js 版）

动态个人主页 MVP 已从 Supabase 迁移到 **Neon(Postgres) + Auth.js**。
本文件覆盖从 0 到上线的完整步骤，分「本地运行」与「Vercel 部署」两段。

---

## 0. 准备

- Node.js 18+（推荐 20+）
- 一个 Neon 项目（免费，https://console.neon.tech → New Project）
- （部署）GitHub 仓库 + Vercel 账号

---

## 1. 本地运行

### 1.1 配置环境变量

```bash
cp .env.example .env.local
```

编辑 `.env.local` 填入两个值：

| 变量 | 来源 |
| :--- | :--- |
| `DATABASE_URL` | Neon 控制台 → Project → Connection Details → 复制 `postgresql://...` |
| `AUTH_SECRET` | 任意长随机串，例如 `openssl rand -base64 32` 的输出 |

### 1.2 初始化数据库

Neon 控制台 → SQL Editor，依次执行：

1. `neon/schema.sql`（建表 + 索引 + `increment_views` 函数 + 触发器）
2. `neon/seed.sql`（示例档案 `linxi`，让 `/linxi` 直接有内容可看）

> seed 中 `owner_id = 'demo@linxi.dev'` 是占位邮箱；用该邮箱登录即可编辑此档案
> （MVP 阶段任意合法邮箱均可登录，无密码）。

### 1.3 启动

```bash
npm install
npm run dev
```

打开：

- `http://localhost:3000` — 落地页
- `http://localhost:3000/linxi` — 示例公开主页（已 seeded）
- `http://localhost:3000/dashboard` — 编辑台（输入任意邮箱登录）

登录后：填档案 → 保存 → 发动态 → 打开 `/{你的handle}` 查看 SSR 主页（浏览量自动 +1）。

---

## 2. Vercel 部署

### 2.1 推送代码

```bash
git init
git add .
git commit -m "dynamic profile mvp (neon + auth.js)"
git remote add origin <你的 GitHub 仓库>
git push -u origin main
```

### 2.2 导入 Vercel

- Vercel 控制台 → New Project → 导入该仓库
- Framework Preset 选 **Next.js**（无需 vercel.json，仓库已无此文件）
- 不需要额外 Build Command / Output Directory

### 2.3 配置环境变量

Vercel → Project → Settings → Environment Variables，填入：

- `DATABASE_URL`（同本地，Neon 连接串）
- `AUTH_SECRET`（同本地，或重新生成）

> 注意：Vercel 上 `AUTH_SECRET` **必填**，否则 jwt 会话会报错。

### 2.4 部署

点 Deploy。默认域名 `*.vercel.app`，`/[handle]` 即公开主页。

数据库仍需在 Neon SQL Editor 执行一遍 `neon/schema.sql` + `neon/seed.sql`
（Vercel 不会自动跑 SQL）。

---

## 3. 与原 Supabase 版的关键差异

| 项 | Supabase 版 | Neon + Auth.js 版 |
| :--- | :--- | :--- |
| 数据库 | Supabase Postgres | Neon Postgres（同 SQL，去掉 RLS） |
| 鉴权 | Supabase Magic Link | Auth.js Credentials 邮箱登录（MVP 无密码） |
| owner 校验 | RLS 策略 | 应用层 `WHERE owner_id = 登录邮箱` |
| 会话 | Supabase cookie | Auth.js JWT（`middleware.ts` 保护 /dashboard） |
| 编辑台读取 | 浏览器直连 Supabase | `GET /api/me`（服务端查库，浏览器不直接连 DB） |

---

## 4. 上线前建议

- **生产鉴权**：当前 MVP 任意邮箱可登录，仅适合演示。生产应改为
  邮件验证码 / GitHub OAuth（`next-auth/providers/github`）+ 真实密码。
- **`AUTH_SECRET` 必须独立且保密**，不要用示例值。
- **Neon 自动休眠**：免费层空闲后会暂停，首次请求有冷启动延迟；用量上来可升付费层或切 Supabase。
- 完整 E2E（真实登录/发布/浏览量+1）必须连真实 Neon 实例，本机/CI 无凭证只能验证构建与类型。

---

## 5. 部署就绪自查清单

- [ ] `.env.local` 已填 `DATABASE_URL` 与 `AUTH_SECRET`
- [ ] Neon 已执行 `neon/schema.sql`
- [ ] （可选）Neon 已执行 `neon/seed.sql`（`/linxi` 有示例数据）
- [ ] `npm install` 成功
- [ ] `npm run dev` 启动，`/` 正常渲染
- [ ] `/dashboard` 输入邮箱可登录、可保存档案、可发动态
- [ ] `/{handle}` 公开主页 SSR 渲染、浏览量 +1
