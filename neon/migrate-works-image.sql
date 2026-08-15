-- 作品封面图迁移：为 works 表追加 image_url 列（data URL 存 text 字段）。
-- 与 profiles.avatar_url / cover_url 同方案，无需图床。
-- 幂等，可重复执行。在 Neon 控制台或 psql 直接跑此文件即可。
ALTER TABLE works ADD COLUMN IF NOT EXISTS image_url text;
