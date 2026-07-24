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
  no_works_public: '该用户还没有发布作品。',

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
  login_google: '使用 Google 登录',
  login_or: '或',

  // PostComposer
  pc_title: '写一条动态',
  pc_ph_title: '标题',
  pc_ph_content: '内容（支持换行）',
  pc_now: '立即发布',
  pc_saving: '发布中…',
  pc_publish: '发布',
  pc_draft: '存为草稿',
  pc_category_label: '内容类型',
  pc_cat_post: '动态',
  pc_cat_work: '作品',

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
  d_my_works: '我的作品（{n}）',
  d_no_works: '还没有作品。',
  d_create_first: '创建档案后即可发布动态。',
  d_status_published: '已发布',
  d_status_draft: '草稿',
  d_to_draft: '转为草稿',
  d_publish_action: '发布',
  d_draft_aria: '转为草稿',
  d_publish_aria: '发布',

  // Plan / 收付款（Polar.sh）
  plan_section: '套餐',
  plan_free: '免费版',
  plan_pro: 'Pro',
  plan_current: '当前套餐',
  plan_upgrade: '升级到 Pro',
  plan_monthly: '按月',
  plan_yearly: '按年',
  plan_yearly_save: '年付更省',
  plan_b1: '去除页脚品牌标识',
  plan_b2: '高级主题与自定义配色',
  plan_b3: '访客数据分析面板',
  plan_upgrading: '正在跳转收银台…',
  plan_active: 'Pro 已生效',
  plan_canceled: '已取消（权益保留至 {date}）',
  plan_renew: '下次续费：{date}',
  plan_thanks: '升级成功，感谢支持！',
  plan_manage_note: '可在 Polar 发送的邮件中管理订阅。',
  plan_comming: '支付即将上线',

  // Pricing page
  pricing_title: '定价',
  pricing_sub: '选择最适合你的方案',
  pricing_for_free: '适合个人尝鲜与试水',
  pricing_for_pro: '适合认真经营个人品牌与作品集',
  pricing_popular: '最受欢迎',
  pricing_includes: '包含',
  pricing_free_limit: '含页脚品牌标识',
  pricing_cta_free: '免费开始',
  pricing_cta_pro: '升级到 Pro',
  pricing_login_hint: '登录后即可升级',
  pricing_current: '你当前的方案',
  pricing_you_free: '你正在使用免费版',
  pricing_you_pro: '你已是 Pro 会员',
  free_b1: '创建并发布你的主页',
  free_b2: '基础主题与配色',
  free_b3: '聚合动态、作品与链接',

  // Footer nav
  nav_pricing: '定价',
  nav_privacy: '隐私政策',
  nav_terms: '服务条款',
  nav_faq: '常见问题',
  nav_blog: '博客',
  nav_contact: '联系我们',
  footer_brand: '由 动态主页 强力驱动',

  // Privacy
  privacy_title: '隐私政策',
  privacy_effective: '生效日期：2026 年 7 月',
  privacy_intro:
    '我们重视你的隐私。本政策说明动态主页（以下简称"本服务"）如何收集、使用与保护你的信息。',
  privacy_collect_h: '我们收集的信息',
  privacy_collect_b:
    '当你注册时，我们收集你的邮箱地址；你主动填写的显示名称、简介、状态、主题设置与外链等档案内容；以及发布到主页的动态。我们也会记录基本的访问统计用于改进服务。',
  privacy_payment_h: '支付与订阅',
  privacy_payment_b:
    '付费订阅通过 Polar.sh（商户代收银）处理。你输入的银行卡等支付信息由 Polar 直接收集与保管，我们不会收到或存储你的卡号。我们只保存订阅状态、周期等必要信息以开通对应权益。',
  privacy_cookies_h: 'Cookie 与本地存储',
  privacy_cookies_b:
    '我们使用浏览器本地存储记住你的语言与明暗主题偏好，并记录必要的会话信息以维持登录状态。我们不使用这些数据进行广告追踪。',
  privacy_rights_h: '你的权利',
  privacy_rights_b:
    '你可以随时登录控制台修改或删除你的档案与动态。如需删除账号或导出数据，请联系我们，我们将在合理时间内处理。',
  privacy_contact_h: '联系我们',
  privacy_contact_b: '关于本政策的任何问题，欢迎通过下方邮箱联系我们。',

  // Terms
  terms_title: '服务条款',
  terms_intro: '使用动态主页即表示你同意以下条款。请仔细阅读。',
  terms_account_h: '账号',
  terms_account_b:
    '你需对账号下的活动负责，并保证所填写信息真实、合法。请勿使用本服务发布违法、侵权或骚扰性内容。',
  terms_use_h: '可接受使用',
  terms_use_b:
    '你可以将本服务用于个人主页、作品集与链接聚合等正当用途。禁止用于欺诈、垃圾信息、钓鱼或任何侵犯他人权益的行为。',
  terms_sub_h: '订阅与续费',
  terms_sub_b:
    'Pro 为周期性订阅（按月或按年）。订阅在你取消前自动续费；取消后权益保留至当前计费周期结束。具体计费与退税由 Polar.sh 作为商户代收银方处理。',
  terms_liability_h: '责任限制',
  terms_liability_b:
    '本服务按"现状"提供。在法律允许的最大范围内，我们对因使用本服务产生的间接损失不承担责任。',
  terms_contact_h: '联系我们',
  terms_contact_b: '对条款有疑问，可通过下方邮箱联系我们。',

  // FAQ
  faq_title: '常见问题',
  faq_q1: '动态主页是什么？',
  faq_a1:
    '一个零代码、杂志编辑风的个人主页生成器，一站式聚合作品集、动态与社交链接，几分钟就能搭好你的个人网站与数字名片。',
  faq_q2: '免费版和 Pro 有什么区别？',
  faq_a2:
    '免费版即可创建并发布你的主页；Pro 去除页脚品牌标识、解锁高级主题与自定义配色，并提供访客数据分析面板。',
  faq_q3: '如何付款？',
  faq_a3:
    '我们通过 Polar.sh 收款（商户代收银，自动处理税费）。支持主流信用卡，具体以结账页为准。',
  faq_q4: '可以随时取消订阅吗？',
  faq_a4:
    '可以。在 Polar 发送的邮件中即可管理或取消订阅；取消后 Pro 权益保留到当前计费周期结束。',
  faq_q5: '我的数据保存在哪里？',
  faq_a5:
    '档案与动态保存在我们的数据库（Neon Postgres）。支付信息由 Polar 保管，我们不会接触你的银行卡号。',

  // Blog
  blog_title: '博客',
  blog_intro: '关于个人品牌、作品集与动态主页的思考与更新。',
  blog_post1_tag: '公告',
  blog_post1_title: '欢迎来到动态主页',
  blog_post1_date: '2026 年 7 月',
  blog_post1_body:
    '我们打造动态主页，是为了让每个人都能用最体面的方式呈现自己——像经营一本杂志那样经营你的个人品牌。这篇博客将陆续分享使用技巧、设计思路与产品更新。',

  // Contact
  contact_title: '联系我们',
  contact_intro: '有任何问题、建议或合作意向，欢迎随时联系我们。',
  contact_email_label: '邮箱',
  contact_note: '我们通常会在 1–2 个工作日内回复。',
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
  no_works_public: 'No works published yet.',

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
  login_google: 'Continue with Google',
  login_or: 'or',

  pc_title: 'Write an update',
  pc_ph_title: 'Title',
  pc_ph_content: 'Content (line breaks supported)',
  pc_now: 'Publish now',
  pc_saving: 'Publishing…',
  pc_publish: 'Publish',
  pc_draft: 'Save draft',
  pc_category_label: 'Content type',
  pc_cat_post: 'Post',
  pc_cat_work: 'Work',

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
  d_my_works: 'My works ({n})',
  d_no_works: 'No works yet.',
  d_create_first: 'Create a profile to publish updates.',
  d_status_published: 'Published',
  d_status_draft: 'Draft',
  d_to_draft: 'To draft',
  d_publish_action: 'Publish',
  d_draft_aria: 'Move to draft',
  d_publish_aria: 'Publish',

  // Plan / Payments (Polar.sh)
  plan_section: 'Plan',
  plan_free: 'Free',
  plan_pro: 'Pro',
  plan_current: 'Current plan',
  plan_upgrade: 'Upgrade to Pro',
  plan_monthly: 'Monthly',
  plan_yearly: 'Yearly',
  plan_yearly_save: 'Save with yearly',
  plan_b1: 'Remove footer branding',
  plan_b2: 'Premium themes & custom colors',
  plan_b3: 'Visitor analytics dashboard',
  plan_upgrading: 'Redirecting to checkout…',
  plan_active: 'Pro active',
  plan_canceled: 'Canceled (access until {date})',
  plan_renew: 'Renews on {date}',
  plan_thanks: 'Upgrade successful — thank you!',
  plan_manage_note: 'Manage your subscription from the email Polar sends you.',
  plan_comming: 'Payments coming soon',

  // Pricing page
  pricing_title: 'Pricing',
  pricing_sub: 'Choose the plan that fits you best',
  pricing_for_free: 'For trying it out and getting started',
  pricing_for_pro: 'For building a real personal brand & portfolio',
  pricing_popular: 'Most popular',
  pricing_includes: 'Includes',
  pricing_free_limit: 'Includes footer branding',
  pricing_cta_free: 'Start free',
  pricing_cta_pro: 'Upgrade to Pro',
  pricing_login_hint: 'Sign in to upgrade',
  pricing_current: 'Your current plan',
  pricing_you_free: "You're on the Free plan",
  pricing_you_pro: 'You are a Pro member',
  free_b1: 'Create & publish your homepage',
  free_b2: 'Basic themes & colors',
  free_b3: 'Aggregate updates, works & links',

  // Footer nav
  nav_pricing: 'Pricing',
  nav_privacy: 'Privacy Policy',
  nav_terms: 'Terms of Service',
  nav_faq: 'FAQ',
  nav_blog: 'Blog',
  nav_contact: 'Contact',
  footer_brand: 'Powered by Dynamic Profile',

  // Privacy
  privacy_title: 'Privacy Policy',
  privacy_effective: 'Effective: July 2026',
  privacy_intro:
    'We respect your privacy. This policy explains how Dynamic Profile (the "Service") collects, uses and protects your information.',
  privacy_collect_h: 'What we collect',
  privacy_collect_b:
    'When you sign up we collect your email address; profile content you provide such as display name, bio, status, theme settings and links; and the updates you publish. We also keep basic visit stats to improve the service.',
  privacy_payment_h: 'Payments & subscriptions',
  privacy_payment_b:
    'Paid subscriptions are processed by Polar.sh (merchant of record). Your payment details such as card numbers are collected and stored by Polar directly — we never receive or store your card number. We only keep subscription status and period needed to grant benefits.',
  privacy_cookies_h: 'Cookies & local storage',
  privacy_cookies_b:
    'We use browser local storage to remember your language and light/dark preference, and to keep you signed in. We do not use this for ad tracking.',
  privacy_rights_h: 'Your rights',
  privacy_rights_b:
    'You can edit or delete your profile and updates anytime from the console. To delete your account or export your data, contact us and we will act within a reasonable time.',
  privacy_contact_h: 'Contact us',
  privacy_contact_b: 'For any questions about this policy, reach us via the email below.',

  // Terms
  terms_title: 'Terms of Service',
  terms_intro: 'By using Dynamic Profile you agree to the following terms. Please read carefully.',
  terms_account_h: 'Accounts',
  terms_account_b:
    'You are responsible for activity under your account and must provide truthful, lawful information. Do not publish illegal, infringing or harassing content.',
  terms_use_h: 'Acceptable use',
  terms_use_b:
    'You may use the Service for legitimate purposes such as a personal homepage, portfolio or link hub. Fraud, spam, phishing or anything that violates others’ rights is prohibited.',
  terms_sub_h: 'Subscriptions',
  terms_sub_b:
    'Pro is a recurring subscription (monthly or yearly). It renews automatically until canceled; benefits remain until the end of the current billing period after cancellation. Billing and tax are handled by Polar.sh as merchant of record.',
  terms_liability_h: 'Limitation of liability',
  terms_liability_b:
    'The Service is provided "as is". To the maximum extent permitted by law, we are not liable for any indirect damages arising from its use.',
  terms_contact_h: 'Contact us',
  terms_contact_b: 'Questions about the terms? Reach us via the email below.',

  // FAQ
  faq_title: 'FAQ',
  faq_q1: 'What is Dynamic Profile?',
  faq_a1:
    'A no-code, magazine-style personal homepage builder that brings your portfolio, updates and social links together — set up your personal site and digital business card in minutes.',
  faq_q2: 'What is the difference between Free and Pro?',
  faq_a2:
    'The Free plan lets you create and publish your homepage. Pro removes footer branding, unlocks premium themes & custom colors, and adds a visitor analytics dashboard.',
  faq_q3: 'How do I pay?',
  faq_a3:
    'We use Polar.sh (merchant of record, taxes handled automatically). Major cards are supported — see the checkout page for specifics.',
  faq_q4: 'Can I cancel anytime?',
  faq_a4:
    'Yes. Manage or cancel from the email Polar sends you; Pro benefits remain until the end of the current billing period after cancellation.',
  faq_q5: 'Where is my data stored?',
  faq_a5:
    'Your profile and updates are stored in our database (Neon Postgres). Payment info is held by Polar — we never touch your card number.',

  // Blog
  blog_title: 'Blog',
  blog_intro: 'Thoughts and updates on personal branding, portfolios and dynamic homepages.',
  blog_post1_tag: 'Announcement',
  blog_post1_title: 'Welcome to Dynamic Profile',
  blog_post1_date: 'July 2026',
  blog_post1_body:
    'We built Dynamic Profile so everyone can present themselves with dignity — curate your personal brand like editing a magazine. This blog will share tips, design notes and product updates.',

  // Contact
  contact_title: 'Contact',
  contact_intro: 'Questions, feedback or partnership ideas — we would love to hear from you.',
  contact_email_label: 'Email',
  contact_note: 'We usually reply within 1–2 business days.',
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
