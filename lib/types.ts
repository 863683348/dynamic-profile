// 与 neon/schema.sql 中的表结构一一对应。
// 字段命名与数据库列名保持一致（snake_case），便于直接映射查询结果。
// 注意：owner_id 现为普通文本（登录邮箱），不再引用 Supabase auth.users。

export interface Profile {
  handle: string;
  owner_id: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  cover_url: string | null;
  theme_color: string;
  theme_dark: boolean;
  status_text: string | null;
  links: unknown[] | null;
  created_at: string; // timestamptz -> ISO 字符串
}

export type PostStatus = "draft" | "published" | "hidden";

export interface Post {
  id: string;
  handle: string;
  title: string | null;
  content: string | null;
  source: string;
  status: PostStatus;
  created_at: string;
}

export interface Stats {
  handle: string;
  views: number;
  followers: number;
  updated_at: string;
}

// 写入档案时的输入（不含系统字段）
export interface ProfileInput {
  handle: string;
  display_name?: string | null;
  bio?: string | null;
  avatar_url?: string | null;
  cover_url?: string | null;
  theme_color?: string;
  theme_dark?: boolean;
  status_text?: string | null;
  links?: unknown[] | null;
}

// 创建内容时的输入
export interface PostInput {
  handle: string;
  title?: string | null;
  content?: string | null;
  source?: string;
  status?: PostStatus;
}
