# 动态个人主页 (Dynamic Profile) — MVP

一个基于 **Next.js 14 (App Router) + Supabase + TypeScript + Tailwind** 的动态个人主页。
用户可拥有自定义 `handle` 的主页（`/[handle]`），编辑档案与内容，并查看浏览量统计。

> 本仓库为 MVP 后端脚手架 + 数据层。**前端页面 / 组件 / 全局样式由前端同事负责**（见「职责边界」）。

## 技术栈

- Next.js 14（App Router、TypeScript）
- Supabase（Postgres + Auth + RLS），通过 `@supabase/supabase-js` + `@supabase/ssr`
- Tailwind CSS

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

```bash
cp .env.example .env.local
```

在 `.env.local` 填入 Supabase 项目凭证（控制台 → Project Settings → API）：

| 变量 | 说明 |
|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | 项目 URL（公开，浏览器可见） |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon key（公开，受 RLS 限制） |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role key（**私密，仅服务端**，切勿暴露到浏览器） |

### 3. 初始化数据库

在 Supabase **SQL Editor** 依次执行：

1. `supabase/schema.sql` —— 建表 / 索引 / 函数 / 触发器 / RLS
2. `supabase/seed.sql` —— 示例档案 `linxi`（含 3 条已发布内容 + 统计）

> 或使用 CLI：`supabase db push`（seed 仍需手动执行或 `supabase db execute --file supabase/seed.sql`）。
> 详见 `supabase/README.md`。

### 4. 本地运行

```bash
npm run dev
# 打开 http://localhost:3000/linxi 查看示例主页
```

## 目录结构（后端相关）

```
.
├── app/
│   ├── api/                       # API 路由（后端边界）
│   │   ├── profile/route.ts                 # POST 创建/更新档案
│   │   ├── posts/route.ts                   # POST 创建内容
│   │   ├── posts/[id]/route.ts              # PATCH 更新内容状态
│   │   └── profile/[handle]/view/route.ts   # POST 浏览量 +1（公开）
│   └── auth/callback/route.ts     # GET 服务端兑换 Magic Link code → 302 /dashboard
├── lib/
│   ├── types.ts                  # Profile / Post / Stats 类型
│   └── supabase/
│       ├── client.ts             # 浏览器端 client（anon）
│       ├── server.ts             # 服务端 client（cookies 会话透传）
│       └── queries.ts            # 类型化数据访问函数
├── supabase/
│   ├── schema.sql                # 表 / 索引 / 函数 / 触发器 / RLS
│   ├── seed.sql                  # 示例数据
│   └── README.md                 # 数据库执行说明
├── .env.example
├── package.json / tsconfig.json / next.config.mjs
├── tailwind.config.ts / postcss.config.mjs / next-env.d.ts
└── README.md
```

## API 速览

| 方法 | 路径 | 鉴权 | 说明 |
|------|------|------|------|
| POST | `/api/profile` | ✅ | 创建/更新当前用户档案（body 含 `handle`），返回 `{ ok, profile }` |
| POST | `/api/posts` | ✅ | 在指定 `handle` 下创建内容（body 必带 `handle`），返回 `{ post }` |
| PATCH | `/api/posts/[id]` | ✅ | 更新内容状态 `draft/published/hidden` |
| POST | `/api/profile/[handle]/view` | ❌ | 浏览量 +1，返回 `{ views }` |
| GET | `/api/auth/callback` | ❌ | Supabase Magic Link/OAuth 回调：服务端 `exchangeCodeForSession` 后 302 `/dashboard` |

> 写接口已直接返回完整 `profile` / `post` 对象，前端无需本地重建。
> 后台读取（dashboard）：登录用户可经浏览器端 `createClient()` 直连 Supabase 读 `profiles`(按 `owner_id`) 与 `posts`(按 `handle`，含草稿)，由 RLS 约束（见下）。

错误返回统一带 `code` / `message`，例如未登录 `40101`、handle 非法 `40002`。

## 职责边界（与前端约定）

- **后端负责**：上述 `app/api/*`、所有 `lib/*`、`supabase/*`、配置文件、`.env.example`、本 README。
- **前端负责**：`app/layout.tsx`、`app/globals.css`、`app/page.tsx`、`app/[handle]/page.tsx`、`app/dashboard/**`、`components/**`。

### 给前端的约定

- 主题色读取 `profiles.theme_color`（默认 `#c2410c`）与 `profiles.theme_dark`，由前端 `globals.css` 的 CSS 变量驱动。
- 路径别名 `@/*` → 项目根；服务端取数统一走 `lib/supabase/queries.ts` 的导出函数（如 `getProfileByHandle`、`getPublishedPosts`、`getStats`、`incrementViews`）。
- `handle` 格式约束：`^[a-z0-9_]{3,20}$`（前后端保持一致）。
- 浏览器端如需直接读公开数据，可用 `lib/supabase/client.ts` 的 `createClient()`。

## 安全要点

- 所有写入受 **RLS** 约束：档案/内容仅 owner（`auth.uid()`）可写，浏览量只能经 `security definer` 函数自增。
- `service_role` key 仅服务端使用，绝不进浏览器包。
