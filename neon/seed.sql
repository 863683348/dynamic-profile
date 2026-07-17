-- 示例数据：让 /linxi 公开主页直接有内容（无需登录即可浏览）。
-- owner_id 用占位邮箱 'demo@linxi.dev'：用该邮箱登录即可编辑此档案
-- （MVP 阶段任意合法邮箱均可登录）。

INSERT INTO profiles (handle, owner_id, display_name, bio, theme_color, theme_dark, status_text, links)
VALUES (
  'linxi',
  'demo@linxi.dev',
  '林夕',
  '独立开发者 / 写代码也写诗。这里记录我的动态与作品。',
  '#c2410c',
  false,
  '在折腾中前进',
  '[{"label":"GitHub","url":"https://github.com/"},{"label":"博客","url":"https://example.com/"}]'::jsonb
)
ON CONFLICT (handle) DO NOTHING;

INSERT INTO posts (handle, title, content, source, status) VALUES
  ('linxi', '上线了动态个人主页', '用杂志编辑风搭建了一个属于自己的小角落，记录日常与作品。', 'manual', 'published'),
  ('linxi', '本周在读', '重读《代码大全》，才发现很多当年没嚼透的细节。', 'manual', 'published'),
  ('linxi', '一个小工具开源了', '把常用的 JSON 格式化脚本抽成了 CLI，欢迎来玩。', 'manual', 'published')
ON CONFLICT DO NOTHING;

-- stats 由触发器自动生成；这里确保有一行初始浏览量
INSERT INTO stats (handle, views) VALUES ('linxi', 128)
ON CONFLICT (handle) DO UPDATE SET views = EXCLUDED.views;
