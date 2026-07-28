<div align="center">
  <br/>
  <h1>📰 Dynamic Profile</h1>
  <p><strong>Magazine-style personal homepage builder</strong></p>
  <p>
    <a href="https://dynamic-profile.shop" target="_blank">🌐 dynamic-profile.shop</a>
    ·
    <a href="#features">Features</a>
    ·
    <a href="#getting-started">Getting Started</a>
    ·
    <a href="#tech-stack">Tech Stack</a>
  </p>
  <br/>
</div>

**Dynamic Profile** lets you create a beautiful, magazine-style personal homepage in minutes — no coding required. It's a more elegant alternative to Linktree, designed for creators, artists, freelancers, and anyone who wants to present their portfolio, social links, and updates in one place.

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js" alt="Next.js 14"/>
  <img src="https://img.shields.io/badge/TypeScript-5.6-blue?style=flat&logo=typescript" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Neon-Postgres-green?style=flat&logo=postgresql" alt="Neon Postgres"/>
  <img src="https://img.shields.io/badge/Auth.js-v5-orange?style=flat" alt="Auth.js v5"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-cyan?style=flat&logo=tailwindcss" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Vercel-Deployed-black?style=flat&logo=vercel" alt="Vercel"/>
</p>

---

## ✨ Features

- **🎨 Magazine-Style Layouts** — Choose from multiple editorial-style themes for your personal page
- **🔗 Link in Bio, Done Right** — Aggregate your portfolio, social links, and latest updates in one elegant page
- **📝 Posts & Portfolio** — Share updates (posts) and showcase your work (portfolio) with separate tabs
- **🌐 Multi-Language** — Built-in Chinese/English i18n with runtime language switching
- **🎭 Custom Themes** — Pick your own accent color, light/dark mode, and typography
- **📊 Visit Analytics** — Track page views (Pro plan)
- **🔒 Auth.js Authentication** — Sign in with email magic link or Google OAuth
- **📱 Mobile-First** — Fully responsive, optimized for all devices
- **⚡ Blazing Fast** — Built on Next.js 14 with Vercel Edge Network
- **🆓 Free to Start** — Create and publish your homepage at no cost

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Neon](https://neon.tech) Postgres database
- (Optional) A [Polar.sh](https://polar.sh) account for payment processing

### 1. Clone & Install

```bash
git clone https://github.com/863683348/dynamic-profile.git
cd dynamic-profile
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env.local
```

Fill in your credentials:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Neon Postgres connection string |
| `AUTH_SECRET` | Auth.js secret (`openssl rand -base64 32`) |
| `AUTH_GOOGLE_ID` | Google OAuth client ID (optional) |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret (optional) |
| `NEXT_PUBLIC_SITE_URL` | Your deployed URL |
| `POLAR_ACCESS_TOKEN` | Polar.sh API token (optional) |
| `NEXT_PUBLIC_POLAR_ENABLED` | Enable Polar.sh payments (optional) |

### 3. Database Setup

Run the schema in your Neon database console:

```sql
-- Execute supabase/schema.sql (tables, indexes, functions, RLS)
-- Then seed sample data:
-- supabase/seed.sql — creates sample profile "linxi" with 3 posts
```

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — visit `/linxi` to see the sample profile.

---

## 🏗️ Project Structure

```
app/
├── [handle]/              # Dynamic user profile pages (SSR)
│   └── page.tsx           # Public profile page
├── api/                   # API routes
│   ├── auth/              # Auth.js endpoints
│   ├── checkout/          # Polar.sh checkout
│   ├── posts/             # Post CRUD
│   ├── profile/           # Profile CRUD
│   ├── subscription/      # Subscription management
│   └── webhook/           # Polar.sh webhooks
├── blog/                  # Blog
├── contact/               # Contact page
├── dashboard/             # User dashboard (profile editor)
├── faq/                   # FAQ page
├── pricing/               # Pricing page
├── layout.tsx             # Root layout with SEO metadata
├── sitemap.ts             # Dynamic sitemap generation
└── robots.ts              # Robots.txt configuration

components/                # Reusable UI components
├── ProfileCard.tsx        # User profile card
├── Tabs.tsx               # Posts / About / Works tabs
├── LangToggle.tsx         # Language switcher
├── TopControls.tsx        # Top bar (language + theme toggle)
├── SiteFooter.tsx         # Site footer
└── ...

lib/
├── db/                    # Database layer (Neon serverless)
│   ├── index.ts           # Connection
│   └── queries.ts         # Typed queries
├── i18n.tsx               # Chinese/English i18n
└── types.ts               # TypeScript types

supabase/
├── schema.sql             # Database schema
└── seed.sql               # Sample data
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router, RSC) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Database** | [Neon](https://neon.tech/) (serverless Postgres) |
| **ORM** | Raw SQL via `@neondatabase/serverless` |
| **Auth** | [Auth.js v5](https://authjs.dev/) (Credentials + Google) |
| **Payments** | [Polar.sh](https://polar.sh) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) + CSS variables |
| **Icons** | [Lucide](https://lucide.dev/) |
| **Hosting** | [Vercel](https://vercel.com/) (Edge Network) |

---

## 🔒 Security

- **Content Security Policy** — Strict CSP headers configured
- **HSTS Preload** — HTTPS enforced with 2-year HSTS
- **XSS Protection** — X-Frame-Options DENY, X-Content-Type-Options nosniff
- **SQL Injection** — Handle validation + parameterized queries
- **Auth** — Server-side session validation via Auth.js

---

## 🌐 Internationalization

Dynamic Profile supports **Chinese (zh-CN)** and **English (en)**. The default language is English. Users can switch between languages at any time via the toggle in the top-right corner. Language preference is persisted in localStorage.

---

## 📈 SEO

This project is optimized for search engines:

- ✅ Semantic HTML with proper heading hierarchy
- ✅ Unique `<title>` and `<meta description>` per page
- ✅ JSON-LD structured data (WebSite + SoftwareApplication + ProfilePage/Person)
- ✅ Dynamic sitemap.xml with static + user-generated routes
- ✅ robots.txt with proper crawl directives
- ✅ Open Graph + Twitter Card metadata
- ✅ Core Web Vitals optimized (Vercel CDN)
- ✅ Hreflang tags for multi-language support

---

## 📄 License

MIT © Dynamic Profile

---

<p align="center">
  Made with ❤️ for the creator economy.
  <br/>
  <a href="https://dynamic-profile.shop">🌐 dynamic-profile.shop</a>
</p>
