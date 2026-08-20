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

  // Landing page (extended)
  nav_features: '功能',
  nav_how: '流程',
  nav_showcase: '案例',
  hero_badge: '免费开始 · 无需信用卡',
  stat_t1_num: '3 分钟',
  stat_t1_label: '完成搭建',
  stat_t2_num: '0 行',
  stat_t2_label: '代码门槛',
  stat_t3_num: '∞',
  stat_t3_label: '自定义可能',
  stat_t4_num: '24/7',
  stat_t4_label: '在线展示',

  feat1_t: '一站式聚合',
  feat1_d: '作品集、动态、社交链接与个人简介，全部收进一个精致的主页。',
  feat2_t: '杂志编辑美学',
  feat2_d: '克制的排版与留白，比花哨更体面，像翻阅一本属于你的杂志。',
  feat3_t: '零代码搭建',
  feat3_d: '填表即生成，无需任何技术背景，几分钟上线你的网站。',
  feat4_t: '主题与配色',
  feat4_d: '多套编辑风主题；Pro 解锁自定义主题色，让主页完全像你。',
  feat5_t: '全设备适配',
  feat5_d: '手机、平板、桌面都恰到好处，访客在任何屏幕都赏心悦目。',
  feat6_t: '访客洞察',
  feat6_d: 'Pro 提供访问数据分析面板，看清谁在看、看了什么。',

  how_title: '三步上线',
  how_sub: '从零到上线，只需几分钟。',
  step1_t: '注册并创建档案',
  step1_d: '用邮箱登录，填写你的名字、简介与状态。',
  step2_t: '添加作品与动态',
  step2_d: '发布动态、上传作品、聚合你所有的外链。',
  step3_t: '发布并分享',
  step3_d: '一键发布，把你的 @handle 分享到任何地方。',

  showcase_title: '看看成品',
  showcase_sub: '这是一个真实风格的样本主页，所见即所得。',
  showcase_cap: '样本主页 @linxi',
  showcase_view: '查看完整样本',

  quote1: '终于有一个不像“链接树”的主页了，排版有质感，朋友都说高级。',
  quote1_role: '自由插画师',
  quote2: '我把作品集和博客动态放在一个地方，客户一眼就懂我是谁。',
  quote2_role: '独立摄影师',
  quote3: '几分钟搭好，零代码，省下的时间全用来做正事。',
  quote3_role: '独立开发者',

  pricing_teaser_title: '简单透明的定价',
  pricing_teaser_sub: '免费版足够起步，Pro 解锁更多体面。',
  pricing_teaser_cta: '查看定价方案',

  faq_teaser_title: '常见问题',
  faq_teaser_more: '查看全部问答',

  cta_final_title: '现在就建立你的动态主页',
  cta_final_sub: '免费开始，几分钟内拥有属于你的杂志风个人网站。',
  cta_final_btn: '免费创建主页',
  voices_title: '创作者们怎么说',

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
  handle_change_hint: '修改后主页会迁移到 /新handle，旧地址将不再可用（内容随新地址保留）。',
  style_label: '主页风格（5 选 1）',
  style_hint: '选择一套视觉风格，公开主页与控制台都会套用；强调色仍由上方主题色决定。',
  st_minimal: '简约风',
  st_magazine: '杂志风',
  st_geek: '极客风',
  st_glass: '玻璃拟态',
  st_neon: '霓虹赛博',
  style_free: '免费',
  style_pro: 'Pro',
  style_pick_title: '选择你的主页风格',
  style_pick_sub: '每套风格只改变观感（字体 / 配色 / 卡片质感），结构不变。强调色由上方主题色决定。',
  st_desc_minimal: '留白克制，专注内容本身，最干净。',
  st_desc_magazine: '编辑感衬线大标题，作品集与简历首选。',
  st_desc_geek: '等宽终端风，程序员味十足。',
  st_desc_glass: '半透明玻璃拟态，现代轻盈有质感。',
  st_desc_neon: '霓虹赛博光效，夜场与潮流感拉满。',
  theme_gallery_title: '主题风格预览',
  theme_gallery_sub: '5 套视觉风格随心切换，Pro 会员全部解锁。',
  theme_gallery_upgrade: '升级 Pro 解锁全部 5 套风格',
  nav_center: '个人中心',
  label_status: '状态文字',
  ph_status: '正在构建有趣的东西',
  label_bio: '简介',
  ph_bio: '一句话介绍你自己',
  label_links: '外链',
  ph_link_label: '标签',
  ph_link_url: 'https://...',
  aria_del_link: '删除链接',
  add_link: '添加外链',
  label_avatar: '头像',
  label_cover: '封面',
  upload_avatar: '上传头像',
  upload_cover: '上传封面',
  change_image: '更换',
  remove_image: '移除',
  img_invalid: '请选择图片文件',
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
  pc_source_label: '来源',
  pc_src_manual: '手动',
  pc_src_github: 'GitHub',
  gh_hint: '从你的 GitHub 公开动态导入（Push / PR / Release 等）',
  gh_username_ph: 'GitHub 用户名',
  gh_load: '拉取动态',
  gh_loading: '拉取中…',
  gh_import: '导入',
  gh_empty: '该用户近期没有可导入的公开动态。',
  gh_err: '拉取失败，请检查用户名或稍后重试。',
  pc_editing: '编辑内容',
  pc_save_changes: '保存修改',
  pc_title_work: '新增作品',
  pc_ph_title_work: '作品标题',
  pc_ph_url_work: '作品链接（https://…，可选）',
  pc_ph_content_work: '作品描述（支持换行）',
  pc_now_work: '立即上架',
  pc_publish_work: '保存作品',
  pc_editing_work: '编辑作品',
  pc_save_changes_work: '保存作品修改',
  pc_upload_image_work: '上传作品图',
  pc_img_work_hint: '建议 800×600，自动压缩',

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

  // Dashboard 导航 / 概览 / CRUD
  nav_overview: '概览',
  nav_profile: '资料',
  nav_posts: '动态',
  nav_works: '作品',
  nav_dashboard: '控制台',
  logout: '退出',
  continue_with_google: 'Google',
  d_welcome: '欢迎回来',
  d_overview_desc: '这是你的个人中心，管理资料、动态与作品。',
  d_profile_summary: '资料摘要',
  d_edit_profile: '编辑资料',
  d_stat_posts: '动态',
  d_stat_works: '作品',
  d_stat_views: '浏览量',
  d_manage_posts: '管理动态',
  d_manage_works: '管理作品',
  d_new_post: '写新动态',
  d_new_work: '添加作品',
  d_edit: '编辑',
  d_delete: '删除',
  d_delete_confirm: '确定删除这条内容吗？此操作不可恢复。',
  d_deleted: '已删除',
  d_saved_change: '已保存修改',
  cm_editing: '编辑中',
  cm_new: '新建',
  cm_cancel: '取消',
  cm_empty_posts: '还没有动态，点击上方新建你的第一条。',
  cm_empty_works: '还没有作品，点击上方添加你的第一个作品。',

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

  // 会员中心（个人中心 / Membership）
  nav_membership: '会员中心',
  mem_title: '会员中心',
  mem_desc: '管理你的会员身份、权益与订阅账单。',
  mem_plan: '当前会员',
  mem_status_active: '会员生效中',
  mem_status_canceled: '已取消（保留至 {date}）',
  mem_status_free: '免费会员',
  mem_benefits: '权益清单',
  mem_b_free: '免费版',
  mem_b_pro: 'Pro 专属',
  mem_unlocked: '已解锁',
  mem_locked: '升级解锁',
  mem_billing: '订阅与账单',
  mem_manage: '管理订阅',
  mem_manage_desc: '续费、发票与支付方式均在 Polar 处理。',
  mem_restore: '恢复订阅',
  mem_perks: '会员专属入口',
  mem_soon: '即将上线',
  mem_public: '公开主页',
  mem_public_desc: '你的杂志风个人主页',
  mem_analytics: '访客分析',
  mem_analytics_desc: '看清谁在看、看了什么',
  mem_theme: '自定义主题色',
  mem_theme_desc: '让主页完全像你',
  mem_tips: '打赏收款',
  mem_tips_desc: '开启后访客可为你打赏',
  // 会员专属 / 访客分析
  pro_only_theme: '自定义主题色为 Pro 专属，升级解锁',
  pro_only_style: '5 套视觉风格为 Pro 专属，升级解锁',
  pro_upgrade_link: '升级解锁',
  nav_analytics: '访客分析',
  analytics_title: '访客分析',
  analytics_desc: '谁在看你的主页、从哪儿来',
  analytics_total: '总浏览量',
  analytics_uv: '独立访客（近 30 天）',
  analytics_trend: '近 30 天浏览趋势',
  analytics_sources: '访问来源',
  analytics_loggedin: '已登录访客',
  analytics_none: '暂无数据，分享主页后回来查看',
  analytics_pro_only: '访客分析是 Pro 专属功能',
  analytics_upgrade: '升级 Pro 查看完整访客分析',
  mem_open_portal: '正在打开 Polar 账单中心…',
  mem_open_public: '查看公开主页 ↗',

  // 打赏 / 收款
  tip_section: '打赏设置',
  tip_enable: '开启打赏',
  tip_enable_hint: '开启后，访客可在你的公开主页为你打赏。',
  tip_message: '打赏感谢语',
  ph_tip_message: '感谢你的支持！',
  tip_bmc: 'Buy Me a Coffee 用户名',
  ph_tip_bmc: '你的 BMC 用户名',
  tip_wechat: '微信收款码',
  tip_alipay: '支付宝收款码',
  tip_upload_qr: '上传收款码',
  tip_change_qr: '更换',
  tip_remove_qr: '移除',
  tip_open: '打赏',
  tip_title: '支持一下',
  tip_wechat_pay: '微信支付',
  tip_alipay_pay: '支付宝',
  tip_bmc_coffee: 'Buy Me a Coffee',
  tip_scan: '打开对应 App 扫码支付',
  tip_none: '作者暂未开启打赏',
  tip_thanks: '感谢你的支持',

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
  privacy_ads_h: '广告',
  privacy_ads_b:
    '本服务通过 Google AdSense 展示广告。作为第三方广告供应商，Google 及其合作伙伴会使用 Cookie（包括 DART Cookie）与其它技术，根据你在本站及互联网上其它网站的访问记录，投放与你的兴趣相关的广告，并衡量广告效果。你可以通过 Google 广告设置（https://www.google.com/settings/ads）或 Your Online Choices（http://www.aboutads.info/choices）管理或退出个性化广告；关于 Google 如何使用数据，请参阅其广告隐私政策（https://policies.google.com/technologies/ads）。我们不会将你的个人档案内容用于广告定向。',

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
  faq_q6: '主页「资源」区的 Popular 列表显示什么？',
  faq_a6:
    'Popular 列表会把你添加的各类资源（链接、文件、页面）按访客实际打开的次数排序——被点得最多的资源自动浮到最上面，让新访客第一眼就看到你最受欢迎的内容。',
  faq_q7: '怎么在个人主页上发动态？',
  faq_a7:
    '在控制台（Dashboard）里写一句话、加一张图就能发布，无需重新部署。动态会出现在你主页的实时区，让页面保持活跃。免费版就支持。',
  faq_q8: '动态主页免费吗？',
  faq_a8:
    '免费。免费版就能创建并发布主页、添加作品集与动态、使用子路径域名。Pro 版额外提供自定义域名、更多主题与访客数据分析。',

  // Blog
  blog_title: '博客',
  blog_intro: '关于个人品牌、作品集与动态主页的思考与更新。',
  blog_related: '相关文章',
  blog_post1_tag: '公告',
  blog_post1_title: '欢迎来到动态主页',
  blog_post1_date: '2026 年 7 月',
  blog_post1_body:
    '我们打造动态主页，是为了让每个人都能用最体面的方式呈现自己——像经营一本杂志那样经营你的个人品牌。这篇博客将陆续分享使用技巧、设计思路与产品更新。',

  blog_post2_tag: '教程',
  blog_post2_title: '三分钟从零到上线：你的第一张个人主页',
  blog_post2_date: '2026 年 8 月',
  blog_post2_body:
    '填表单 → 选主题 → 发布，全程无代码。这篇教程带你三分钟做出第一张能展示作品、动态和社交链接的个人主页，并分享三个让页面更好看的小技巧。',

  blog_post3_tag: '观点',
  blog_post3_title: 'Linktree 太普通？你需要的是"个人主页"而非链接页',
  blog_post3_date: '2026 年 8 月',
  blog_post3_body:
    '链接页只是导航，个人主页才是品牌。别人点开你的 Linktree 看到几排图标；点开你的个人主页看到的是作品、动态与个人风格。对自由职业者、创作者和求职者来说，后者才真正赢得信任——这也是我们做 Dynamic Profile 的原因：像经营杂志一样经营你自己。',

  blog_post4_tag: '指南',
  blog_post4_title: '如何打造一个让人记住的个人主页：5 个关键元素',
  blog_post4_date: '2026 年 8 月',
  blog_post4_body:
    '个人主页不是链接的集合，而是你这个人的一次完整表达。下面五个元素，能帮你从一堆图标里跳出来，让人真的记住你。第一，一句清楚的定位：用一句话说清你是谁、为谁解决什么问题，放在最显眼处。第二，精选作品集：不要堆全部，只放三到五件最能代表你水平的作品，并写清你做了什么、结果如何。第三，动态更新区：放最近的动态、文章或项目，让页面活起来，而不是一张静态名片。第四，社会证明：客户评价、合作品牌、数据成果，用具体数字比形容词更有说服力。第五，一致的视觉：统一的配色与字体，让人一眼认出是你。把这五点做扎实，你的主页就不再只是导航，而是会替你说话的个人品牌。',

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

  // Landing page (extended)
  nav_features: 'Features',
  nav_how: 'How it works',
  nav_showcase: 'Showcase',
  hero_badge: 'Free to start · No credit card',
  stat_t1_num: '3 min',
  stat_t1_label: 'to launch',
  stat_t2_num: '0 lines',
  stat_t2_label: 'of code',
  stat_t3_num: '∞',
  stat_t3_label: 'ways to make it yours',
  stat_t4_num: '24/7',
  stat_t4_label: 'online, always',

  feat1_t: 'All in one place',
  feat1_d: 'Portfolio, updates, social links and bio — all on one elegant page.',
  feat2_t: 'Editorial aesthetic',
  feat2_d: 'Restrained typography and whitespace — classy, not flashy. Like reading a magazine that is yours.',
  feat3_t: 'No code required',
  feat3_d: 'Fill in a form and it generates. No technical background needed; live in minutes.',
  feat4_t: 'Themes & colors',
  feat4_d: 'Multiple editorial themes; Pro unlocks custom theme color so it looks exactly like you.',
  feat5_t: 'Responsive everywhere',
  feat5_d: 'Looks right on phone, tablet and desktop — delightful on any screen.',
  feat6_t: 'Visitor insights',
  feat6_d: 'Pro adds a visitor analytics dashboard — see who is looking and at what.',

  how_title: 'Live in three steps',
  how_sub: 'From zero to launched in minutes.',
  step1_t: 'Sign up & create profile',
  step1_d: 'Sign in with email, set your name, bio and status.',
  step2_t: 'Add work & updates',
  step2_d: 'Publish updates, upload works, aggregate all your links.',
  step3_t: 'Publish & share',
  step3_d: 'One click to publish; share your @handle anywhere.',

  showcase_title: 'See it in action',
  showcase_sub: 'A real-style sample profile — what you see is what you get.',
  showcase_cap: 'Sample profile @linxi',
  showcase_view: 'View full sample',

  quote1: 'Finally a homepage that does not look like a link tree. The typography feels premium — friends say it is classy.',
  quote1_role: 'Freelance illustrator',
  quote2: 'I put my portfolio and blog updates in one place; clients get who I am at a glance.',
  quote2_role: 'Independent photographer',
  quote3: 'Set up in minutes, zero code. The time saved went straight to real work.',
  quote3_role: 'Indie developer',

  pricing_teaser_title: 'Simple, transparent pricing',
  pricing_teaser_sub: 'Free is enough to start; Pro unlocks more polish.',
  pricing_teaser_cta: 'View pricing plans',

  faq_teaser_title: 'Frequently asked',
  faq_teaser_more: 'Read all Q&A',

  cta_final_title: 'Build your dynamic homepage now',
  cta_final_sub: 'Start free and own a magazine-style personal site in minutes.',
  cta_final_btn: 'Create your homepage — free',
  voices_title: 'What creators say',

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
  handle_change_hint: 'Changing this moves your page to /newhandle; the old URL will no longer resolve (content stays with the new handle).',
  style_label: 'Profile style (pick 1 of 5)',
  style_hint: 'Choose a visual style applied to both your public page and console; the accent color stays from the theme color above.',
  st_minimal: 'Minimal',
  st_magazine: 'Magazine',
  st_geek: 'Geek',
  st_glass: 'Glass',
  st_neon: 'Neon',
  style_free: 'Free',
  style_pro: 'Pro',
  style_pick_title: 'Pick your profile style',
  style_pick_sub: 'Each style changes only the look (font / color / card texture); the layout stays the same. Accent color comes from the theme color above.',
  st_desc_minimal: 'Restrained whitespace, content-first, cleanest look.',
  st_desc_magazine: 'Editorial serif headlines — best for portfolios & resumes.',
  st_desc_geek: 'Monospace terminal vibe, built for developers.',
  st_desc_glass: 'Translucent glassmorphism, modern and airy.',
  st_desc_neon: 'Neon cyber glow, full nightlife & street energy.',
  theme_gallery_title: 'Style previews',
  theme_gallery_sub: 'Switch among 5 visual styles; Pro unlocks them all.',
  theme_gallery_upgrade: 'Upgrade to Pro to unlock all 5 styles',
  nav_center: 'My Center',
  label_status: 'Status text',
  ph_status: 'Building something fun',
  label_bio: 'Bio',
  ph_bio: 'One line about you',
  label_links: 'Links',
  ph_link_label: 'Label',
  ph_link_url: 'https://...',
  aria_del_link: 'Remove link',
  add_link: 'Add link',
  label_avatar: 'Avatar',
  label_cover: 'Cover',
  upload_avatar: 'Upload avatar',
  upload_cover: 'Upload cover',
  change_image: 'Change',
  remove_image: 'Remove',
  img_invalid: 'Please choose an image file',
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
  pc_source_label: 'Source',
  pc_src_manual: 'Manual',
  pc_src_github: 'GitHub',
  gh_hint: 'Import from your public GitHub activity (pushes, PRs, releases…)',
  gh_username_ph: 'GitHub username',
  gh_load: 'Fetch activity',
  gh_loading: 'Fetching…',
  gh_import: 'Import',
  gh_empty: 'No importable public activity for this user recently.',
  gh_err: 'Fetch failed — check the username or try again later.',
  pc_editing: 'Edit content',
  pc_save_changes: 'Save changes',
  pc_title_work: 'Add a work',
  pc_ph_title_work: 'Work title',
  pc_ph_url_work: 'Work link (https://…, optional)',
  pc_ph_content_work: 'Description (line breaks supported)',
  pc_now_work: 'Publish now',
  pc_publish_work: 'Save work',
  pc_editing_work: 'Edit work',
  pc_save_changes_work: 'Save work changes',
  pc_upload_image_work: 'Upload work image',
  pc_img_work_hint: '800×600 recommended, auto-compressed',

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

  // Dashboard nav / overview / CRUD
  nav_overview: 'Overview',
  nav_profile: 'Profile',
  nav_posts: 'Posts',
  nav_works: 'Works',
  nav_dashboard: 'Dashboard',
  logout: 'Log out',
  continue_with_google: 'Google',
  d_welcome: 'Welcome back',
  d_overview_desc: 'Your personal center — manage profile, updates and works.',
  d_profile_summary: 'Profile summary',
  d_edit_profile: 'Edit profile',
  d_stat_posts: 'Updates',
  d_stat_works: 'Works',
  d_stat_views: 'Views',
  d_manage_posts: 'Manage updates',
  d_manage_works: 'Manage works',
  d_new_post: 'New update',
  d_new_work: 'New work',
  d_edit: 'Edit',
  d_delete: 'Delete',
  d_delete_confirm: 'Delete this item? This cannot be undone.',
  d_deleted: 'Deleted',
  d_saved_change: 'Changes saved',
  cm_editing: 'Editing',
  cm_new: 'New',
  cm_cancel: 'Cancel',
  cm_empty_posts: 'No updates yet — create your first one above.',
  cm_empty_works: 'No works yet — add your first one above.',

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

  // Membership (personal center)
  nav_membership: 'Membership',
  mem_title: 'Membership',
  mem_desc: 'Manage your membership, benefits and billing.',
  mem_plan: 'Current plan',
  mem_status_active: 'Active',
  mem_status_canceled: 'Canceled (until {date})',
  mem_status_free: 'Free member',
  mem_benefits: 'Your benefits',
  mem_b_free: 'Free',
  mem_b_pro: 'Pro',
  mem_unlocked: 'Unlocked',
  mem_locked: 'Upgrade to unlock',
  mem_billing: 'Billing',
  mem_manage: 'Manage subscription',
  mem_manage_desc: 'Renewals, invoices and payment methods are handled by Polar.',
  mem_restore: 'Resume subscription',
  mem_perks: 'Member perks',
  mem_soon: 'Coming soon',
  mem_public: 'Public page',
  mem_public_desc: 'Your magazine-style homepage',
  mem_analytics: 'Visitor analytics',
  mem_analytics_desc: 'See who is looking and at what',
  mem_theme: 'Custom theme',
  mem_theme_desc: 'Make it look exactly like you',
  mem_tips: 'Tips',
  mem_tips_desc: 'Let visitors tip you when enabled',
  // Member-only / Visitor analytics
  pro_only_theme: 'Custom theme color is a Pro feature — upgrade to unlock',
  pro_only_style: 'The 5 visual styles are a Pro feature — upgrade to unlock',
  pro_upgrade_link: 'Upgrade to unlock',
  nav_analytics: 'Analytics',
  analytics_title: 'Visitor analytics',
  analytics_desc: 'Who is viewing your page and from where',
  analytics_total: 'Total views',
  analytics_uv: 'Unique visitors (30d)',
  analytics_trend: 'Views over last 30 days',
  analytics_sources: 'Traffic sources',
  analytics_loggedin: 'Logged-in visitors',
  analytics_none: 'No data yet — share your page and come back',
  analytics_pro_only: 'Analytics is a Pro feature',
  analytics_upgrade: 'Upgrade to Pro to see full visitor analytics',
  mem_open_portal: 'Opening Polar billing…',
  mem_open_public: 'View public page ↗',

  // Tips / Support
  tip_section: 'Tips & Support',
  tip_enable: 'Enable tips',
  tip_enable_hint: 'When enabled, visitors can tip you on your public page.',
  tip_message: 'Thank-you note',
  ph_tip_message: 'Thanks for your support!',
  tip_bmc: 'Buy Me a Coffee username',
  ph_tip_bmc: 'your BMC username',
  tip_wechat: 'WeChat QR',
  tip_alipay: 'Alipay QR',
  tip_upload_qr: 'Upload QR',
  tip_change_qr: 'Change',
  tip_remove_qr: 'Remove',
  tip_open: 'Tip',
  tip_title: 'Support',
  tip_wechat_pay: 'WeChat Pay',
  tip_alipay_pay: 'Alipay',
  tip_bmc_coffee: 'Buy Me a Coffee',
  tip_scan: 'Scan with the matching app',
  tip_none: 'Tips are not enabled yet',
  tip_thanks: 'Thanks for your support',

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
  privacy_ads_h: 'Advertising',
  privacy_ads_b:
    'This service displays ads served by Google AdSense. As a third-party advertising vendor, Google and its partners use cookies (including the DART cookie) and similar technologies to serve ads based on your interests and to measure ad performance, drawing on your visits to this and other websites on the Internet. You can manage or opt out of personalized advertising via Google Ads Settings (https://www.google.com/settings/ads) or Your Online Choices (http://www.aboutads.info/choices); for details on how Google uses data, see its advertising privacy policy (https://policies.google.com/technologies/ads). We do not use your profile content for ad targeting.',

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
  faq_q6: 'What does the Popular list in the Resources section show?',
  faq_a6:
    'The Popular list ranks the resources you have added (links, files, pages) by how often visitors actually open them — your most-clicked items rise to the top, so new visitors see your best content first.',
  faq_q7: 'How do I post updates on my homepage?',
  faq_a7:
    'In the Dashboard, write one line plus an optional image and publish — no rebuild needed. The update appears in the live section of your page and keeps it active. The free plan supports it.',
  faq_q8: 'Is Dynamic Profile free?',
  faq_a8:
    'Yes. The free plan lets you create and publish your homepage, add a portfolio and posts, and use a sub-path domain. Pro adds a custom domain, more themes, and visitor analytics.',

  // Blog
  blog_title: 'Blog',
  blog_intro: 'Thoughts and updates on personal branding, portfolios and dynamic homepages.',
  blog_related: 'Related posts',
  blog_post1_tag: 'Announcement',
  blog_post1_title: 'Welcome to Dynamic Profile',
  blog_post1_date: 'July 2026',
  blog_post1_body:
    'We built Dynamic Profile so everyone can present themselves with dignity — curate your personal brand like editing a magazine. This blog will share tips, design notes and product updates.',
  blog_post2_tag: 'Tutorial',
  blog_post2_title: 'Launch Your First Personal Homepage in 3 Minutes',
  blog_post2_date: 'August 2026',
  blog_post2_body:
    'Fill a form, pick a theme, publish — zero code. This tutorial takes you from zero to your first homepage with portfolio, posts, and social links, plus three tips to make it shine.',

  blog_post3_tag: 'Opinion',
  blog_post3_title: 'Beyond Linktree: Why You Need a Homepage, Not a Link Page',
  blog_post3_date: 'August 2026',
  blog_post3_body:
    'A link page is navigation; a homepage is your brand. When someone opens your Linktree they see rows of icons; when they open your homepage they see your work, your voice, your style. For freelancers, creators and job seekers, the latter is what actually earns trust — that is why we built Dynamic Profile: to run yourself like a magazine.',

  blog_post4_tag: 'Guide',
  blog_post4_title: 'How to Build a Personal Homepage People Remember: 5 Key Elements',
  blog_post4_date: 'August 2026',
  blog_post4_body:
    'A personal homepage is not a pile of links; it is one complete expression of who you are. Five elements will help you stand out from a wall of icons and actually be remembered. First, a clear positioning line: say in one sentence who you are and whose problem you solve, and put it where it is seen first. Second, a curated portfolio: do not dump everything, show only three to five pieces that best represent your level, and state what you did and what the result was. Third, a live updates area: recent posts, projects or activity that keeps the page alive instead of a static business card. Fourth, social proof: client quotes, partner brands, measurable outcomes — concrete numbers beat adjectives. Fifth, consistent visuals: one color scheme and one typeface so people recognize you at a glance. Get these five right and your homepage stops being navigation and becomes a personal brand that speaks for you.',

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
  const [lang, setLangState] = useState<Lang>('en');

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
    // 兜底：未在 Provider 内时返回英文
    return {
      lang: 'en',
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
