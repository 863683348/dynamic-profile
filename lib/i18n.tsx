'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export type Lang = 'zh' | 'en';

type Dict = Record<string, string>;

const zh: Dict = {
  // Landing
  brand: '动态个人主页',
  hero_a: '把你的动态、作品与链接，',
  hero_b: '排成一本杂志。',
  hero_sub:
    '一个属于你自己的编辑风格个人主页。一站式聚合作品集、动态与社交链接，呈现克制的阅读美感——既是你的个人品牌与数字名片，也是 Linktree 链接树之外更体面的选择。',
  cta_console: '进入控制台',
  cta_sample: '查看样本主页',
  sample_label: '样本：',
  sample_style: '· 风格 B · 杂志编辑风',

  // ProfileCard
  views: '浏览',
  posts: '动态',
  followers: '关注',

  // Tabs
  tab_posts: '动态',
  tab_about: '关于',
  tab_works: '作品',
  no_posts: '还没有发布动态。',
  about_title: '关于 {name}',
  about_empty: '这个人很神秘，还没填写简介。',
  about_status: '当前状态：',
  about_handle: '用户名',
  about_theme: '主题色',
  about_scheme: '配色',
  scheme_light: '浅色',
  scheme_dark: '暗色',
  scheme_default: '默认',
  works_placeholder: '作品占位 {n}',
  works_soon: '作品集模块即将上线',

  // PostCard
  source_github: 'GitHub',
  source_manual: '手动',

  // ProfileForm
  label_name: '显示名称',
  label_handle: 'Handle（小写字母 / 数字 / 下划线，3-20 位）',
  ph_name: '林夕',
  ph_handle: '例如：linxi',
  handle_locked: 'Handle 创建后不可修改。',
  label_status: '状态文字',
  ph_status: '正在构建有趣的东西',
  label_bio: '简介',
  ph_bio: '一句话介绍你自己',
  label_links: '外链',
  ph_link_label: '标签',
  ph_link_url: 'https://...',
  aria_del_link: '删除链接',
  add_link: '添加外链',
  save_saving: '保存中…',
  save: '保存档案',
  theme_color: '主题色',
  use_dark: '使用暗色配色',
  pick_color: '选择主题色 {c}',
  custom_color: '自定义主题色',

  // ThemePicker
  tp_theme: '主题色',
  tp_dark: '使用暗色配色',
  tp_pick: '选择主题色 {c}',
  tp_custom: '自定义主题色',

  // LoginButton
  label_email: '邮箱（任意邮箱即可登录）',
  ph_email: '请输入邮箱',
  err_invalid: '请输入有效的邮箱地址',
  err_login: '登录失败，请重试',
  err_generic: '登录失败',
  login_loading: '登录中',
  login: '登录',

  // PostComposer
  pc_title: '写一条动态',
  pc_ph_title: '标题',
  pc_ph_content: '内容（支持换行）',
  pc_now: '立即发布',
  pc_saving: '发布中…',
  pc_publish: '发布',
  pc_draft: '存为草稿',

  // Dashboard
  d_login_title: '登录控制台',
  d_login_desc: '使用邮箱登录后，即可编辑你的动态主页。',
  d_console: '编辑台',
  d_view_public: '查看公开主页 ↗',
  d_msg_saved: '档案已保存',
  d_err_save: '保存失败',
  d_msg_published: '动态已发布',
  d_err_publish: '发布失败',
  d_need_profile: '请先创建档案',
  d_err_status: '更新状态失败',
  d_section_profile: '档案',
  d_profile_edit: '编辑你的公开信息',
  d_profile_create: '创建你的档案以生成公开主页',
  d_my_posts: '我的动态（{n}）',
  d_no_posts: '还没有动态。',
  d_create_first: '创建档案后即可发布动态。',
  d_status_published: '已发布',
  d_status_draft: '草稿',
  d_to_draft: '转为草稿',
  d_publish_action: '发布',
  d_draft_aria: '转为草稿',
  d_publish_aria: '发布',
};

const en: Dict = {
  brand: 'Dynamic Profile',
  hero_a: 'Turn your updates, work & links',
  hero_b: 'into a magazine.',
  hero_sub:
    'Your own editorial-style personal homepage. One place for your portfolio, updates and social links — a restrained reading aesthetic that doubles as your personal brand and digital business card, and a classier alternative to Linktree.',
  cta_console: 'Open Console',
  cta_sample: 'View Sample',
  sample_label: 'Sample: ',
  sample_style: '· Style B · Magazine Editorial',

  views: 'Views',
  posts: 'Posts',
  followers: 'Followers',

  tab_posts: 'Posts',
  tab_about: 'About',
  tab_works: 'Works',
  no_posts: 'No posts published yet.',
  about_title: 'About {name}',
  about_empty: 'This person is mysterious — no bio yet.',
  about_status: 'Current status: ',
  about_handle: 'Handle',
  about_theme: 'Theme',
  about_scheme: 'Scheme',
  scheme_light: 'Light',
  scheme_dark: 'Dark',
  scheme_default: 'Default',
  works_placeholder: 'Work placeholder {n}',
  works_soon: 'Portfolio module coming soon',

  source_github: 'GitHub',
  source_manual: 'Manual',

  label_name: 'Display name',
  label_handle: 'Handle (lowercase letters / numbers / underscore, 3-20 chars)',
  ph_name: 'Lin Xi',
  ph_handle: 'e.g. linxi',
  handle_locked: 'Handle cannot be changed after creation.',
  label_status: 'Status text',
  ph_status: 'Building something fun',
  label_bio: 'Bio',
  ph_bio: 'One line about you',
  label_links: 'Links',
  ph_link_label: 'Label',
  ph_link_url: 'https://...',
  aria_del_link: 'Remove link',
  add_link: 'Add link',
  save_saving: 'Saving…',
  save: 'Save profile',
  theme_color: 'Theme color',
  use_dark: 'Use dark scheme',
  pick_color: 'Pick theme color {c}',
  custom_color: 'Custom color',

  tp_theme: 'Theme color',
  tp_dark: 'Use dark scheme',
  tp_pick: 'Pick theme color {c}',
  tp_custom: 'Custom color',

  label_email: 'Email (any email works)',
  ph_email: 'you@example.com',
  err_invalid: 'Enter a valid email address',
  err_login: 'Login failed, please retry',
  err_generic: 'Login failed',
  login_loading: 'Signing in',
  login: 'Sign in',

  pc_title: 'Write an update',
  pc_ph_title: 'Title',
  pc_ph_content: 'Content (line breaks supported)',
  pc_now: 'Publish now',
  pc_saving: 'Publishing…',
  pc_publish: 'Publish',
  pc_draft: 'Save draft',

  d_login_title: 'Sign in to Console',
  d_login_desc: 'Sign in with email to edit your dynamic homepage.',
  d_console: 'Editor',
  d_view_public: 'View public page ↗',
  d_msg_saved: 'Profile saved',
  d_err_save: 'Save failed',
  d_msg_published: 'Update published',
  d_err_publish: 'Publish failed',
  d_need_profile: 'Create a profile first',
  d_err_status: 'Failed to update status',
  d_section_profile: 'Profile',
  d_profile_edit: 'Edit your public info',
  d_profile_create: 'Create your profile to generate a public page',
  d_my_posts: 'My updates ({n})',
  d_no_posts: 'No updates yet.',
  d_create_first: 'Create a profile to publish updates.',
  d_status_published: 'Published',
  d_status_draft: 'Draft',
  d_to_draft: 'To draft',
  d_publish_action: 'Publish',
  d_draft_aria: 'Move to draft',
  d_publish_aria: 'Publish',
};

const dicts: Record<Lang, Dict> = { zh, en };

type I18nValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('zh');

  // 读取已保存的语言偏好（localStorage）
  useEffect(() => {
    const saved = localStorage.getItem('lang');
    if (saved === 'zh' || saved === 'en') setLangState(saved);
  }, []);

  // 持久化 + 同步 <html lang>
  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  }, [lang]);

  const t = (key: string, vars?: Record<string, string | number>) => {
    let s = dicts[lang][key] ?? dicts.zh[key] ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        s = s.replace(`{${k}}`, String(v));
      }
    }
    return s;
  };

  const setLang = (l: Lang) => setLangState(l);

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    // 兜底：未在 Provider 内时返回中文
    return {
      lang: 'zh',
      setLang: () => {},
      t: (key: string, vars?: Record<string, string | number>) => {
        let s = dicts.zh[key] ?? key;
        if (vars) for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, String(v));
        return s;
      },
    };
  }
  return ctx;
}
