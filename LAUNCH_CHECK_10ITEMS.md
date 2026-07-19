# dynamic-profile · 上线 10 项工作完成度检查

> 依据：`dafeixiang-saas-launch` skill 的 10 项 MVP 上线工作清单
> 检查时间：2026-07-13
> 项目：dynamic-profile（Next.js 14 App Router + TS + Tailwind + Auth.js v5 + Neon Postgres）
> 部署：Vercel（已 Ready，但存在 500 报错待查）

---

## 一、总览

| 状态 | 项数 | 项目 |
|------|------|------|
| ✅ 完成 | 2/10 | ② MVP 搭建、⑧ 移动端适配 |
| ⚠️ 部分 | 3/10 | ① 需求设计、④ 亮黑 UI 设定、⑩ SEO 操作 |
| ❌ 未做/未过 | 5/10 | ③ i18n、⑤ 谷歌登录、⑥ 收付款、⑦ GA4/热力、⑨ 安全检测 |

**结论：10 项里完全达标的只有 2 项，还有 8 项未达标（5 项完全没碰，3 项只做了一半）。**
其中两项是上线硬阻塞：**⑨ 安全闸门未过**（Next.js 有已公开 critical 漏洞）、**⑤⑥ 出海变现链全断**（无谷歌登录、无支付）。

---

## 二、逐项明细

| # | 工作项 | 状态 | 证据（实际代码/配置） | 缺口 |
|---|--------|------|----------------------|------|
| ① | 需求设计 | ⚠️ 部分 | 产品定位清晰（"动态主页·个人杂志"），前期有 PRD/Spec 过程文档 | 缺出海 SaaS 标准需求文档（目标市场、用户画像、竞品、定价模型） |
| ② | MVP 搭建（含 i18n/主题/移动骨架） | ✅ 完成 | Next.js14 + TS + Tailwind；`app/page.tsx`(落地)/`app/[handle]/page.tsx`(公开主页)/`app/dashboard/page.tsx`(编辑)；本会话完成移动端骨架；`globals.css` 双主题变量已定义 | — |
| ③ | 中英文 i18n | ❌ 未做 | 无任何 i18n 配置、无 `locales/`/`messages/` 文件，全中文硬编码 | 需引入 next-intl 或 App Router i18n，抽取全部文案 |
| ④ | 亮黑 UI 设定 | ⚠️ 半完成 | `globals.css` 有 `:root` + `[data-theme='dark']` 双套变量；`ThemePicker.tsx` 提供暗色勾选并存库；`[handle]/page.tsx:49` `data-theme={profile.theme_dark ? 'dark':'light'}` | **缺你明确要求的"右上角站点级切换 + localStorage 持久化"**。当前暗色是"主人设定"，访客不能自己切 |
| ⑤ | 谷歌登录 | ❌ 未做 | `auth.ts` 仅 `Credentials` 邮箱登录（任意合法邮箱免密，无 SMTP） | 需加 Google OAuth provider + `AUTH_GOOGLE_ID`/`AUTH_GOOGLE_SECRET` 环境变量 |
| ⑥ | 收付款对接 | ❌ 未做 | 无支付依赖、无支付代码 | 需接 Stripe/PayPal（出海核心变现链） |
| ⑦ | GA4 + 热力 | ❌ 未做 | 全代码库无 `gtag`/`plausible`/`hotjar`/analytics 注入 | 需装 `@next/third-parties` 或手动注入 GA4 + 热力图 |
| ⑧ | 移动端适配 | ✅ 完成 | 本会话改完 `ProfileCard`/`Tabs`/`PostCard`/`ProfileForm`/`LoginButton`/`PostComposer`/布局；`next build` 通过；已 push + 部署 Vercel | 生产环境 375px 真机回归尚未做 |
| ⑨ | 安全检测（Phase5 闸门） | ❌ 未过 | `npm audit`：next 14.2.15 含多个 critical（含中间件鉴权绕过 `GHSA-f82v-jwr5-mffw`，14.2.25 才修）；`next.config.mjs` **无任何安全响应头** | 升级 Next.js ≥14.2.25；加 CSP / X-Frame-Options / HSTS / X-Content-Type-Options；跑 `npm audit fix` |
| ⑩ | SEO 操作 | ⚠️ 部分 | `layout.tsx` 有 `title`/`description` metadata | 缺 `sitemap.xml` / `robots.txt` / JSON-LD / `hreflang` / OG 分享图 |

---

## 三、skill 定义的依赖链与当前卡点

**阻塞链（必须顺序）：** ① 需求 → ② MVP → ⑤ 谷歌登录 → ⑥ 收付款
- 现状：② 通，但 ⑤⑥ 全断 → 产品无法对外收费、海外用户无法用谷歌一键注册。

**并行项：** ⑦ GA4/热力、⑧ 移动端、⑨ 安全、⑩ SEO
- 现状：⑧ 完成；⑦⑩ 未做；⑨ 未过（最危险）。

**Phase5 安全闸门**：skill 规定安全不过不能上线。当前 ⑨ 未过，且部署后你还报了 500 错误 —— 生产环境本身也待排查。

---

## 四、建议优先级（按"风险/出海必需/你已点名"排序）

1. **🔴 立即修 · ⑨ 安全**
   - `npm i next@14.2.25`（或最新 14.2.x）消除 critical 漏洞
   - `next.config.mjs` 加 `headers()` 安全响应头
   - 重新 `npm audit` 确认 0 critical
2. **🟠 出海必需 · ⑤ 谷歌登录 → ⑥ 收付款**
   - 先加 Google provider（海外注册主入口），再接 Stripe/PayPal
3. **🟡 你已明确要求 · ④ 右上角主题切换**
   - 新增全局 `ThemeToggle` 组件（Sun/Moon 图标，fixed 右上角）
   - 用 localStorage 持久化站点级 light/dark（区别于现有的 per-profile 主人设定）
4. **🟢 体验/合规收尾**
   - ③ i18n（中英文切换）
   - ⑩ SEO（sitemap/robots/JSON-LD/hreflang/OG 图）
   - ⑦ GA4 + 热力图
   - ① 补一份标准出海需求文档

---

## 五、附：待排查的生产问题（不在 10 项内但阻塞交付）

- **Vercel 部署后 500 错误**（你报告的错误 ID `c326d6114c584a3b51e9e3bdd0a2ef9a/...`）：移动端适配重新部署后出现，根因未定位（疑与 `.vercelignore` 排除 `.env*.local` 后构建/RSC 查询或 debug 路由移除有关，变量本身已通过 `vercel env add` 注入）。
- 移动端生产真机回归（375px 无溢出、safe-area 正常）。

---

*检查方式：读取 `auth.ts` / `next.config.mjs` / `package.json` / `layout.tsx` / `[handle]/page.tsx` / `ThemePicker.tsx`，Glob 确认无 i18n/sitemap/robots/analytics 文件，npm audit 安全扫描。*
