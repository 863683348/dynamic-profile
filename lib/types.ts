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
  style: string; // 'minimal' | 'magazine' | 'geek' | 'glass' | 'neon'
  plan: string; // 'free' | 'pro'
  created_at: string; // timestamptz -> ISO 字符串
  // 打赏（访客给作者支持）：微信/支付宝收款码 + Buy Me a Coffee 用户名 + 感谢语
  tip_enabled: boolean;
  tip_message: string | null;
  bmc_username: string | null; // Buy Me a Coffee 用户名（不含域名）
  wechat_qr_url: string | null; // 微信收款码（data URL 或个人图床 URL）
  alipay_qr_url: string | null; // 支付宝收款码
}

export type PostStatus = "draft" | "published" | "hidden";

// 订阅（Polar.sh）记录，与 neon/schema.sql 的 subscriptions 表对应。
export interface Subscription {
  id: string;
  owner_email: string;
  polar_subscription_id: string;
  polar_customer_id: string | null;
  plan: string;
  status: string;
  cancel_at_period_end: boolean;
  current_period_end: string | null;
  metadata: unknown;
  created_at: string;
  updated_at: string;
}

// /api/subscription 返回的套餐状态（供 dashboard 展示）
export interface PlanStatus {
  plan: string; // 'free' | 'pro'
  status: string | null; // active / canceled / revoked / trialing ...
  cancel_at_period_end: boolean;
  current_period_end: string | null;
}

// 动态（状态更新）：文字为主，无结构化链接
export interface Post {
  id: string;
  handle: string;
  title: string | null;
  content: string | null;
  source: string;
  status: PostStatus;
  created_at: string;
}

// 作品（项目 / 作品集）：可带 URL 与描述
export interface Work {
  id: string;
  handle: string;
  title: string | null;
  url: string | null;
  description: string | null;
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
  style?: string;
  // 打赏设置
  tip_enabled?: boolean;
  tip_message?: string | null;
  bmc_username?: string | null;
  wechat_qr_url?: string | null;
  alipay_qr_url?: string | null;
}

// 创建动态时的输入
export interface PostInput {
  handle: string;
  title?: string | null;
  content?: string | null;
  source?: string;
  status?: PostStatus;
}

// 创建作品时的输入
export interface WorkInput {
  handle: string;
  title?: string | null;
  url?: string | null;
  description?: string | null;
  source?: string;
  status?: PostStatus;
}
