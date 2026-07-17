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
  handle text NOT NULL REFERENCES profiles(handle) ON DELETE CASCADE,
  title text,
  content text,
  source text NOT NULL DEFAULT 'manual',
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'hidden')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS stats (
  handle text PRIMARY KEY REFERENCES profiles(handle) ON DELETE CASCADE,
  views integer NOT NULL DEFAULT 0,
  followers integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_posts_handle_created ON posts(handle, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_owner ON profiles(owner_id);

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
