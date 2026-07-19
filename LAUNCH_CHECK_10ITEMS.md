# dynamic-profile · 上线 10 项工作完成度检查（复查）

> 依据：`dafeixiang-saas-launch` skill 的 10 项 MVP 上线工作清单
> 检查时间：2026-07-19（复查；上一版 2026-07-13 已过时）
> 项目：dynamic-profile（Next.js 14 App Router + TS + Tailwind + Auth.js v5 + Neon Postgres）
> 部署：Vercel（main 自动部署）

---

## 一、总览

| 状态 | 项数 | 项目 |
|------|------|------|
| ✅ 完成 | 9/10 | ① 需求设计、② MVP 搭建、③ i18n、④ 亮黑 UI、⑤ 谷歌登录、⑧ 移动端、⑨ 安全检测、⑩ SEO |
| ⚠️ 部分 | 1/10 | ⑦ GA4 + 热力（代码就绪，生产未激活） |
| ❌ 未做 | 1/10 | ⑥ 收付款 |

**结论：相比 2026-07-13 的「2 完成 / 3 部分 / 5 未做」，本轮已补齐 ③④⑨⑩，并落地 ① 定位文案与 ⑦ GA4 代码。**
剩下真正"没做"的只有 **⑤ 谷歌登录** 与 **⑥ 收付款**——即 skill 阻塞链 `①→②→⑤→⑥` 在 ⑤ 处断裂，出海变现链仍未通。
⑦ 不是代码问题，是你加一个 Vercel 环境变量就能激活。

---

## 二、逐项明细（2026-07-19）

| # | 工作项 | 状态 | 证据（实际代码/配置） | 缺口 / 待办 |
|---|--------|------|----------------------|------|
| ① | 需求设计 | ✅ 完成 | PRD/Spec 过程文档齐（`动态个人主页-MVP-PRD.md` 等）；落地页 hero 已落地 2026 趋势定位文案（个人主页/作品集/链接聚合/个人品牌/数字名片/Linktree 替代） | — |
| ② | MVP 搭建（含 i18n/主题/移动骨架） | ✅ 完成 | `app/page.tsx`(落地)/`app/[handle]/page.tsx`(公开主页)/`app/dashboard/page.tsx`(编辑) + API 路由齐全；`tsc`/`next build` 通过 | — |
| ③ | 中英文 i18n | ✅ 完成 | `lib/i18n.tsx`（zh/en 字典，默认中文）；全站文案走 `t(key)`；本轮回填了 Tabs/LoginButton/ProfileForm 遗漏的硬编码串 | — |
| ④ | 亮黑 UI 设定 | ✅ 完成 | `ThemeToggle`+`TopControls`(右上角 语言+亮暗 簇)+`ProfileThemeInit`；`layout.tsx` 阻塞内联脚本防 FOUC；访客偏好 + 主人设定双轨 | — |
| ⑤ | 谷歌登录 | ✅ 完成 | `auth.ts` 加 `Google` provider（凭据齐才注册）；`LoginButton` 新增「使用 Google 登录」按钮（内联 G 标）；同邮箱两方式自动合并 | 生产需 Vercel 加 `AUTH_GOOGLE_ID`/`AUTH_GOOGLE_SECRET`+`NEXT_PUBLIC_GOOGLE_ENABLED=true`，并在 Google Cloud Console 配回调 URI |
| ⑥ | 收付款对接 | ❌ 未做 | 全代码库无 `stripe`/`paypal`/`checkout`/`webhook` 任何痕迹 | 需接 Stripe/PayPal（出海核心变现链），并做 webhook 验签 |
| ⑦ | GA4 + 热力 | ⚠️ 部分 | `components/Analytics.tsx` 已就绪：仅生产加载（`isProd` server 端计算）、SPA 路由补发 page_view；ID `G-KZ9V2Z95X1` 已在 `.env.local`；OG/热力域名已进 CSP | **生产未激活**：需在 Vercel Production 加 `NEXT_PUBLIC_GA_ID=G-KZ9V2Z95X1` 触发重部署。热力图(Clarity)仅占位、未真正启用 |
| ⑧ | 移动端适配 | ✅ 完成 | viewport/safe-area + 各组件响应式（commit 74294c8）；`next build` 通过、已部署 | 生产 375px 真机回归尚未做（可选） |
| ⑨ | 安全检测（Phase5 闸门） | ✅ 完成 | `next` 14.2.15→**14.2.35**（消除中间件鉴权绕过 critical `GHSA-f82v-jwr5-mffw`）；`next.config.mjs` 加 CSP/X-Frame-Options=DENY/X-Content-Type-Options/Referrer-Policy/HSTS/Permissions-Policy；`npm audit` **0 critical** | 剩 1 high + 1 moderate（均为 DoS 类），仅能经 `next@16` 破坏性升级修复，超出本次范围 |
| ⑩ | SEO 操作 | ✅ 完成 | `layout.tsx` metadata 扩到 ~31 关键词（中+英趋势词）+ OG/Twitter；新增 JSON-LD（WebSite+SoftwareApplication）；`sitemap.ts`(查 profiles)+`robots.ts` 已生成 | — |

---

## 三、skill 依赖链与当前卡点

**阻塞链（必须顺序）：** ① 需求 → ② MVP → ⑤ 谷歌登录 → ⑥ 收付款
- 现状：①✅ ②✅ ⑤✅，但 **⑥❌ 全断**。产品能展示、能邮箱/谷歌注册，但**仍无法收费**。

**并行项：** ⑦ GA4/热力、⑧ 移动端、⑨ 安全、⑩ SEO
- 现状：⑧⑨⑩ ✅；⑦ 代码✅、生产未激活（你加 env 即好）。

**Phase5 安全闸门**：✅ 已过（0 critical），不再阻塞上线。

---

## 四、还需做的（按优先级）

1. **🔴 出海硬阻塞 · ⑥ 收付款（⑤ 已完成，仅待 Vercel 环境变量）**
   - ⑤：代码已完成并接入凭据，本地可测；生产需在 Vercel 加 `AUTH_GOOGLE_ID`/`AUTH_GOOGLE_SECRET`+`NEXT_PUBLIC_GOOGLE_ENABLED=true`，并在 Google Cloud Console 把 `https://<域名>/api/auth/callback/google` 加入授权回调 URI。
   - ⑥：接 Stripe 或 PayPal（skill 推荐 PayPal 出海）；webhook HMAC 验签、plan/amount 服务端取、幂等发额度。
2. **🟠 一行激活 · ⑦ GA4**
   - Vercel Production 环境变量加 `NEXT_PUBLIC_GA_ID=G-KZ9V2Z95X1` → 重部署即生效（代码已就绪）。
3. **🟢 可选收尾**
   - 热力图：真启用 Clarity（`NEXT_PUBLIC_CLARITY_ID`）。
   - 移动端生产 375px 真机回归。

---

*检查方式：读 `auth.ts` / `next.config.mjs` / `layout.tsx` / `lib/i18n.tsx` / `components/Analytics.tsx` / `components/LoginButton.tsx`；Grep `google`(仅 GA4)/`paypal|stripe|payment`(无命中)；`npm audit` 复核。*
