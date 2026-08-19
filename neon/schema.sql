-- 动态个人主页 MVP · Neon(Postgres) schema
-- 与 Supabase 版差异：去掉 auth.users 引用与 RLS，owner 校验下沉到应用层
-- （lib/db/queries.ts 中的 WHERE owner_id = $1）。

CREATE TABLE IF NOT EXISTS profiles (
  handle text PRIMARY KEY,
  owner_id text UNIQUE NOT NULL,
  display_name text,
  bio text,
  avatar_url text,
  cover_url text,
  theme_color text NOT NULL DEFAULT '#c2410c',
  theme_dark boolean NOT NULL DEFAULT false,
  status_text text,
  links jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  handle text NOT NULL REFERENCES profiles(handle) ON DELETE CASCADE ON UPDATE CASCADE,
  title text,
  content text,
  source text NOT NULL DEFAULT 'manual',
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'hidden')),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 作品表（2026-08-15 与动态拆分开）：作品 = 项目 / 作品集，可带链接、描述与封面图。
CREATE TABLE IF NOT EXISTS works (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  handle text NOT NULL REFERENCES profiles(handle) ON DELETE CASCADE ON UPDATE CASCADE,
  title text,
  url text,
  description text,
  image_url text,
  source text NOT NULL DEFAULT 'manual',
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'hidden')),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 兼容旧库：works 表已存在但缺 image_url 列时补齐（2026-08-15 加封面字段）
-- 若上一版误加了 cover_url，自动重命名为 image_url，与 lib/types.ts 一致。
ALTER TABLE works ADD COLUMN IF NOT EXISTS image_url text;
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'works' AND column_name = 'cover_url'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'works' AND column_name = 'image_url'
  ) THEN
    ALTER TABLE works RENAME COLUMN cover_url TO image_url;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS stats (
  handle text PRIMARY KEY REFERENCES profiles(handle) ON DELETE CASCADE ON UPDATE CASCADE,
  views integer NOT NULL DEFAULT 0,
  followers integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_posts_handle_created ON posts(handle, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_works_handle_created ON works(handle, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_owner ON profiles(owner_id);

-- 内容分类：post = 动态（状态更新），work = 作品（项目/作品集）
-- 2026-08-15：作品已拆到独立 works 表。以下迁移把旧 posts.category='work' 的数据
-- 迁入 works 表（title/content → title/description），随后删除 posts.category 列。
-- 可安全重复执行（幂等：仅在 works 表尚不存在对应数据时插入）。
INSERT INTO works (id, handle, title, description, source, status, created_at)
SELECT id, handle, title, content, source, status, created_at
FROM posts
WHERE category = 'work'
  AND NOT EXISTS (
    SELECT 1 FROM works w WHERE w.id = posts.id
  );

-- 删除动态表中的 category 列（作品数据已迁移，动态行 category 恒为 'post'）
ALTER TABLE posts DROP COLUMN IF EXISTS category;

-- 2026-08-15（追加）：作品支持 1 张封面图。图片经前端缩放后以 data URL 形式
-- 存入 text 字段（与 avatar_url / cover_url 同方案），无需图床或对象存储。
-- 幂等：可重复执行。
ALTER TABLE works ADD COLUMN IF NOT EXISTS image_url text;

-- 视觉风格（对应原型 A–E）：minimal / magazine / geek / glass / neon
-- 仅改变观感（字体 / 配色 / 卡片质感），与 theme_color（强调色）正交。
-- 已有库默认 'magazine'（杂志编辑风），不影响现有数据。
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS style text NOT NULL DEFAULT 'magazine';

-- 浏览量 +1
CREATE OR REPLACE FUNCTION increment_views(p_handle text)
RETURNS integer AS $$
DECLARE
  new_views integer;
BEGIN
  UPDATE stats SET views = views + 1, updated_at = now()
  WHERE handle = p_handle
  RETURNING views INTO new_views;
  RETURN COALESCE(new_views, 0);
END;
$$ LANGUAGE plpgsql;

-- 新建档案时自动建 stats 行
CREATE OR REPLACE FUNCTION create_stats_for_profile()
RETURNS trigger AS $$
BEGIN
  INSERT INTO stats (handle) VALUES (NEW.handle)
  ON CONFLICT (handle) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_profile_stats ON profiles;
CREATE TRIGGER trg_profile_stats
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION create_stats_for_profile();

-- ============================================================================
-- 订阅 / 收付款（Polar.sh）· 2026-07-19 新增，支持 Pro 订阅（月/年）
-- 以下语句均带 IF NOT EXISTS / IF NOT EXISTS 列，可安全重复执行（含旧库迁移）。
-- ============================================================================

-- profiles 增加 plan 列：free（默认）/ pro（付费）
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS plan text NOT NULL DEFAULT 'free';

-- 订阅记录：Polar 为唯一权威，webhook 将状态同步到此表
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_email text NOT NULL,
  polar_subscription_id text UNIQUE NOT NULL,
  polar_customer_id text,
  plan text NOT NULL DEFAULT 'pro',
  status text NOT NULL,
  cancel_at_period_end boolean NOT NULL DEFAULT false,
  current_period_end timestamptz,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_owner ON subscriptions(owner_email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_polar_id ON subscriptions(polar_subscription_id);

-- webhook 去重：按 Polar webhook-id 幂等，避免重试导致重复副作用
CREATE TABLE IF NOT EXISTS webhook_events (
  id text PRIMARY KEY,
  type text,
  processed_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================================================
-- 打赏 / 收款（访客给作者支持）· 2026-08-02 新增
-- 微信/支付宝收款码（作者上传，存为 data URL 或个人图床 URL）+ Buy Me a Coffee 用户名 + 感谢语
-- 以下语句带 IF NOT EXISTS 列，可安全重复执行（含旧库迁移）。
-- ============================================================================

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS tip_enabled boolean NOT NULL DEFAULT false;

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS tip_message text;

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS bmc_username text;

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS wechat_qr_url text;

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS alipay_qr_url text;

-- ============================================================================
-- 访客分析明细（Pro 专属）· 2026-08-03 新增
-- 记录每次主页访问：handle / 时间 / 来源域名 / 板块 / 匿名访客ID / 是否登录。
-- 用于 /dashboard/analytics 聚合（PV / UV / 来源等）。不存储个人身份信息。
-- ============================================================================

CREATE TABLE IF NOT EXISTS visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  handle text NOT NULL REFERENCES profiles(handle) ON DELETE CASCADE ON UPDATE CASCADE,
  visited_at timestamptz NOT NULL DEFAULT now(),
  referrer_domain text,
  section text NOT NULL DEFAULT 'home',
  vid text,
  is_logged_in boolean NOT NULL DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_visits_handle_visited ON visits(handle, visited_at DESC);
