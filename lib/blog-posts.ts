// Single source of truth for blog content + routing.
// Consumed by:
//   - app/blog/[slug]/page.tsx  (per-post server route: canonical + hreflang + Article JSON-LD)
//   - app/blog/[slug]/BlogPostClient.tsx (bilingual rendering via client i18n toggle)
//   - app/blog/page.tsx (index list)
//   - app/sitemap.ts (post URLs)
// NOTE: lib/i18n.tsx still carries mirrored `blog_post{N}_*` flat keys for legacy UI parity;
// keep the two in sync if post copy changes.

export type Lang = 'zh' | 'en';

export interface BlogPost {
  id: number;
  slug: string;
  /** ISO date used for datePublished / dateModified in schema + sitemap lastModified */
  publishedAt: string;
  tag: Record<Lang, string>;
  title: Record<Lang, string>;
  /** Human-readable date label, e.g. 'July 2026' */
  date: Record<Lang, string>;
  body: Record<Lang, string>;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: 'welcome-to-dynamic-profile',
    publishedAt: '2026-07-01',
    tag: { zh: '公告', en: 'Announcement' },
    title: { zh: '欢迎来到动态主页', en: 'Welcome to Dynamic Profile' },
    date: { zh: '2026 年 7 月', en: 'July 2026' },
    body: {
      zh: '我们打造动态主页，是为了让每个人都能用最体面的方式呈现自己——像经营一本杂志那样经营你的个人品牌。这篇博客将陆续分享使用技巧、设计思路与产品更新。',
      en: 'We built Dynamic Profile so everyone can present themselves with dignity — curate your personal brand like editing a magazine. This blog will share tips, design notes and product updates.',
    },
  },
  {
    id: 2,
    slug: 'launch-first-homepage-3-minutes',
    publishedAt: '2026-08-01',
    tag: { zh: '教程', en: 'Tutorial' },
    title: { zh: '三分钟从零到上线：你的第一张个人主页', en: 'Launch Your First Personal Homepage in 3 Minutes' },
    date: { zh: '2026 年 8 月', en: 'August 2026' },
    body: {
      zh: '填表单 → 选主题 → 发布，全程无代码。这篇教程带你三分钟做出第一张能展示作品、动态和社交链接的个人主页，并分享三个让页面更好看的小技巧。',
      en: 'Fill a form, pick a theme, publish — zero code. This tutorial takes you from zero to your first homepage with portfolio, posts, and social links, plus three tips to make it shine.',
    },
  },
  {
    id: 3,
    slug: 'beyond-linktree',
    publishedAt: '2026-08-01',
    tag: { zh: '观点', en: 'Opinion' },
    title: { zh: 'Linktree 太普通？你需要的是"个人主页"而非链接页', en: 'Beyond Linktree: Why You Need a Homepage, Not a Link Page' },
    date: { zh: '2026 年 8 月', en: 'August 2026' },
    body: {
      zh: '链接页只是导航，个人主页才是品牌。别人点开你的 Linktree 看到几排图标；点开你的个人主页看到的是作品、动态与个人风格。对自由职业者、创作者和求职者来说，后者才真正赢得信任——这也是我们做 Dynamic Profile 的原因：像经营杂志一样经营你自己。',
      en: 'A link page is navigation; a homepage is your brand. When someone opens your Linktree they see rows of icons; when they open your homepage they see your work, your voice, your style. For freelancers, creators and job seekers, the latter is what actually earns trust — that is why we built Dynamic Profile: to run yourself like a magazine.',
    },
  },
  {
    id: 4,
    slug: '5-key-elements-memorable-homepage',
    publishedAt: '2026-08-01',
    tag: { zh: '指南', en: 'Guide' },
    title: { zh: '如何打造一个让人记住的个人主页：5 个关键元素', en: 'How to Build a Personal Homepage People Remember: 5 Key Elements' },
    date: { zh: '2026 年 8 月', en: 'August 2026' },
    body: {
      zh: '个人主页不是链接的集合，而是你这个人的一次完整表达。下面五个元素，能帮你从一堆图标里跳出来，让人真的记住你。第一，一句清楚的定位：用一句话说清你是谁、为谁解决什么问题，放在最显眼处。第二，精选作品集：不要堆全部，只放三到五件最能代表你水平的作品，并写清你做了什么、结果如何。第三，动态更新区：放最近的动态、文章或项目，让页面活起来，而不是一张静态名片。第四，社会证明：客户评价、合作品牌、数据成果，用具体数字比形容词更有说服力。第五，一致的视觉：统一的配色与字体，让人一眼认出是你。把这五点做扎实，你的主页就不再只是导航，而是会替你说话的个人品牌。',
      en: 'A personal homepage is not a pile of links; it is one complete expression of who you are. Five elements will help you stand out from a wall of icons and actually be remembered. First, a clear positioning line: say in one sentence who you are and whose problem you solve, and put it where it is seen first. Second, a curated portfolio: do not dump everything, show only three to five pieces that best represent your level, and state what you did and what the result was. Third, a live updates area: recent posts, projects or activity that keeps the page alive instead of a static business card. Fourth, social proof: client quotes, partner brands, measurable outcomes — concrete numbers beat adjectives. Fifth, consistent visuals: one color scheme and one typeface so people recognize you at a glance. Get these five right and your homepage stops being navigation and becomes a personal brand that speaks for you.',
    },
  },
  {
    id: 5,
    slug: 'free-vs-pro-which-plan',
    publishedAt: '2026-08-07',
    tag: { zh: '指南', en: 'Guide' },
    title: { zh: '免费 vs Pro：哪个适合你', en: 'Free vs Pro: Which Plan Is Right for You' },
    date: { zh: '2026 年 8 月', en: 'August 2026' },
    body: {
      zh: '关于 dynamic profile pricing，最常被问的一句是"免费版到底够不够用"。直接给结论：够用——如果你只想要一张拿得出手的个人主页，免费版完全可以；想把它当个人品牌运营，再考虑 Pro。\n\n免费版能做什么：一个可自定义的个人主页，能展示作品、动态和社交链接，支持基础主题和自定义头像，域名是 dynamic-profile.shop 下的子路径。对求职者、自由职业者和刚开始经营个人品牌的创作者来说，这个程度已经能撑起门面了。\n\nPro 版多出来的东西，集中在三块：第一，绑定你自己的域名，名片和简历上印的就是你的名字；第二，更多主题和更深的自定义（字体、配色、布局）；第三，动态与作品集的高级展示，比如置顶、分类、数据统计。\n\n怎么选？三个信号帮你判断：你在简历上会放这个主页 → 值得 Pro；你要在多个平台反复推广自己 → 值得 Pro；你只是需要一个"比 Linktree 体面一点"的链接页 → 免费版足够了。\n\n最后提醒一句：先免费跑一周，把内容填起来，再决定要不要升级。多数人填完内容之后就清楚自己需要什么了。查看完整定价与功能对比，见 pricing 页面：https://dynamic-profile.shop/pricing 。',
      en: 'The most common question about dynamic profile pricing is whether the free plan is actually enough. Short answer: yes, if you just want a respectable personal homepage. Consider Pro when you want to run your page like a personal brand.\n\nWhat the free plan covers: a customizable homepage that shows your work, your updates, and your social links, with a base set of themes and a custom avatar. Your page lives at a sub-path of dynamic-profile.shop. For job seekers, freelancers, and creators starting out, that already does the job.\n\nPro adds three things that matter: a custom domain, so the URL on your business card is your name; more themes plus deeper customization of fonts, colors, and layout; and advanced portfolio features like pinning, categories, and stats.\n\nHow to decide? Three signals: put this page on your resume → Pro. Promoting yourself across platforms repeatedly → Pro. You just want something more dignified than a link page → free is plenty.\n\nOne practical tip: run free for a week and actually fill in your content before deciding. Most people know exactly which plan they need once the page is alive. Full feature comparison is on the pricing page: https://dynamic-profile.shop/pricing .',
    },
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getPostById(id: number): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.id === id);
}
