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
  {
    id: 6,
    slug: 'homepage-5-must-have-sections',
    publishedAt: '2026-08-08',
    tag: { zh: '指南', en: 'Guide' },
    title: { zh: '个人主页上放什么？5 个必填模块', en: 'What Goes on Your Homepage? 5 Must-Have Sections' },
    date: { zh: '2026 年 8 月', en: 'August 2026' },
    body: {
      zh: '第一次做个人主页，最容易犯的错是"什么都想放"。结果页面变成一个超链接垃圾桶，访客 3 秒就划走了。把重心收回到 homepage sections 上，其实只需要 5 个模块，就能把一张主页从"还行"变成"这人靠谱"。\n\n第一，一句话定位。放在最顶部，用一句话说清你是谁、为谁解决什么问题。别写"热爱生活、追求卓越"，那是简历里的废话；写"帮独立开发者做产品落地"这种能让人立刻判断要不要继续看下去的话。\n\n第二，精选作品。放 3 到 5 件最能代表你水平的作品，每件写清楚你做了什么、结果如何。宁缺毋滥——一件有数据支撑的作品，胜过十个没有上下文的截图。\n\n第三，动态区。最近在做什么、写了什么文章、发布了什么项目。这一块让页面"活着"，也是访客判断你还在不在活跃期的依据。动态更新的人，比一张三年没动过的名片可信得多。\n\n第四，社交证明。客户评价、合作过的品牌、公开的数据成果。用具体数字：不是"客户很满意"，而是"服务过 40+ 客户，复购率 70%"。\n\n第五，联系入口。一个醒目的 CTA，加上邮箱或社交链接。很多人主页做得很漂亮，但访客想联系时找不到按钮——这是最亏的流失。\n\n这 5 个模块就是 personal page sections 的基本盘。想看得更细，可以看看我们之前写的三分钟上线教程（https://dynamic-profile.shop/blog/launch-first-homepage-3-minutes），或者直接去首页（https://dynamic-profile.shop）把内容填起来。免费版就支持全部 5 个模块，不用升级也能做出体面的主页。',
      en: 'The most common mistake on a first personal homepage is trying to include everything. The result is a link dump that visitors scroll past in three seconds. If you focus on homepage sections instead, five modules are enough to take a page from "okay" to "this person is solid."\n\nFirst, a one-line positioning statement at the very top: who you are and whose problem you solve, in one sentence. Skip the resume filler like "passionate about excellence"; write something that lets a visitor instantly decide whether to keep reading.\n\nSecond, a curated portfolio of three to five pieces that best represent your level, each stating what you did and what happened as a result. Fewer pieces with evidence beat ten screenshots with no context.\n\nThird, an updates area. What you are working on, recent writing, shipped projects. This is what makes the page feel alive, and it is how visitors judge whether you are still active. Someone who updates regularly reads as far more credible than a business card that has not moved in three years.\n\nFourth, social proof: client quotes, brands you have worked with, public numbers. Be concrete: not "clients love working with me" but "40+ clients served, 70% repeat rate."\n\nFifth, a contact path. A clear CTA plus an email or social link. It is surprisingly common to see a beautiful page with no way to reach its owner, and that is the most expensive leak in personal branding.\n\nThese five are the core of what to put on homepage. For a closer look, see our three-minute launch guide (https://dynamic-profile.shop/blog/launch-first-homepage-3-minutes), or just start filling in your content on the homepage (https://dynamic-profile.shop). The free plan supports all five modules, so you can build a respectable page without upgrading.',
    },
  },
  {
    id: 7,
    slug: 'your-handle-digital-business-card',
    publishedAt: '2026-08-09',
    tag: { zh: '指南', en: 'Guide' },
    title: { zh: '你的 @handle 就是你的数字名片', en: 'Your @handle Is Your Digital Business Card' },
    date: { zh: '2026 年 8 月', en: 'August 2026' },
    body: {
      zh: '在社交媒体时代，你的 @handle 就是你的数字名片——它出现在简历、邮件签名、直播间和每一次转发里。一个别扭的 handle，等于在名片上印错名字。这篇聊聊怎么选 handle、怎么在 dynamic-profile 上把它变成一张真正能用的主页。\n\n先解决最基础的问题：handle 应该是什么。三个原则：短，好记，不用下划线凑数。短意味着别人能口头传播，好记意味着不用查第二遍，不用下划线是因为它丑且容易打错。如果理想的名字被占了，加一个稳定的后缀（比如真实行业词或你的城市缩写），不要靠随机数字。\n\n然后是分享问题：很多人把 handle 散落在各个平台，别人要记五六个名字才能找到你。解决方式是让所有平台指向一个地方。这就是 share handle profile 的核心：在个人主页里放上全部社交链接，把主页 URL 印在简历和名片上，所有平台都用同一个 handle。这样你要分享的只是一个链接，而不是一堆账号。\n\ncustom handle 的意义更进一步：在你的个人主页上，handle 不只是用户名，它是你的品牌前缀。你可以自定义主页展示的名字、简介和链接，让 handle 与你的个人品牌一致。求职时 HR 搜你的名字，第一个跳出来的应该是你的主页，而不是某个平台的空账号。\n\n实操建议：先在 dynamic-profile 建好主页，再把主页链接更新到你所有平台的简介栏，最后把简历和名片上的联系方式换成主页 URL。三步做完，你的个人主页 链接 分享这件事就闭环了。免费版就够用，不用升级。',
      en: 'In the social media era, your @handle is your digital business card. It shows up on resumes, email signatures, live streams and every retweet. A clumsy handle is like a typo on a printed card. This post covers how to pick a handle, and how to turn it into a real working homepage on dynamic-profile.\n\nStart with the basics: what a handle should be. Three rules: short, memorable, no underscores as filler. Short means people can say it out loud, memorable means nobody has to look it up twice, no underscores because they are ugly and easy to mistype. If the ideal name is taken, add a stable suffix like your industry word or city abbreviation, never random digits.\n\nThen the sharing problem. Most people scatter their handles across platforms, and others have to remember five names to find them. The fix is to point every platform at one place. That is the core of share handle profile: put all your social links on one homepage, print that URL on your resume and business card, and use the same handle everywhere. What you share is one link, not a pile of accounts.\n\ncustom handle takes it further: on your homepage the handle is not just a username, it is your brand prefix. You can customize the displayed name, bio and links so the handle matches your personal brand. When an HR person searches your name, the first result should be your homepage, not an empty account on some platform.\n\nPractical steps: build the homepage on dynamic-profile first, update your bio fields on every platform to point to it, then replace the contact info on your resume and cards with the homepage URL. Three steps and the personal homepage link sharing loop is closed. The free plan is enough; no upgrade needed.',
    },
  },
  {
    id: 8,
    slug: 'why-editorial-aesthetic-fits-creators',
    publishedAt: '2026-08-10',
    tag: { zh: '观点', en: 'Opinion' },
    title: { zh: '设计不设限：为什么编辑风更适合创作者', en: 'Why the Editorial Aesthetic Fits Creators' },
    date: { zh: '2026 年 8 月', en: 'August 2026' },
    body: {
      zh: '先说个观察：同样是个人主页，编辑风（editorial aesthetic）的作品比普通模板主页耐看得多。不是因为它更"花"，恰恰相反，它更像一本杂志的版面：大标题、克制配色、明确的阅读节奏。对创作者来说，这种风格天然适合展示作品、观点和成长轨迹，这篇讲讲为什么。\n\n编辑风来自杂志与报纸的版面设计传统：内容优先，装饰让路。一个 editorial design personal site 通常有这些特征：大而有力的标题排版，一句话就能抓住注意力；克制的配色，通常一个主色加中性色；明确的栅格与留白，段落之间有呼吸感；图片与文字交替，像在翻一本杂志。它不是"性冷淡风"的另一个名字，重点是把内容编排得有层次，让访客愿意往下读。\n\n为什么它适合创作者？第一，作品需要语境：一张图片配一句说明，比满屏画廊更能讲清你的想法。第二，观点需要节奏：长文、短评、项目笔记混排时，栅格帮你保持可读性。第三，品牌需要一致性：统一的排版风格比贴纸式装饰更能形成记忆点。对比一下：卡片风主页适合快速浏览、电商式展示；编辑风主页适合深度阅读、叙事式表达。如果你靠文字和作品吃饭，设计师、写作者、独立开发者，magazine style portfolio 是更贴脸的选项。\n\n一个编辑风主页怎么搭？三步。第一，定一个主视觉词，比如"克制""温度""锐利"，所有排版决策都围绕它。第二，把作品按叙事排序，而不是按时间倒序：开头放你最想让人记住的那件。第三，给每件作品写一句话语境，讲清楚你做了什么、解决了什么问题。这三点做完，你的页面就有了"编辑感"，不需要会设计软件。\n\n很多人分不清编辑风和极简风。极简风追求"删到不能再删"，编辑风追求"编排出层次"。极简主页可能只有一句标语加一个按钮；编辑风主页会有大标题、引言、三件作品、一段个人经历，每块都有明确的阅读顺序。对创作者来说，后者能承载的信息量明显更大，也更像"你"而不是"一张名片"。\n\n到 Dynamic Profile（dynamic-profile.shop）的首页直接开始搭建，或先读读我们的欢迎文了解产品理念。免费版就能做出编辑风主页。',
      en: 'A quick observation before anything else: editorial aesthetic homepages age better than template pages. Not because they are fancier, quite the opposite. They look like a magazine spread: big headlines, restrained color, a clear reading rhythm. For creators, this style is a natural fit for showing work, opinions and progress. Here is why.\n\nThe editorial aesthetic comes from magazine and newspaper layout: content first, decoration steps aside. An editorial design personal site usually has: big, confident headline typography that grabs attention in one line; a restrained palette, usually one main color plus neutrals; clear grids and whitespace, room to breathe between sections; image and text alternating, like flipping through a magazine. It is not just another name for minimalism. Editorial is about arranging content with hierarchy so visitors want to keep reading.\n\nWhy it fits creators. First, work needs context: one image with one line of explanation beats a full-screen gallery. Second, opinions need rhythm: when long posts, short notes and project logs mix, the grid keeps things readable. Third, brand needs consistency: a unified typographic style is more memorable than sticker-style decoration. Compare the alternatives: card-style pages are built for quick scanning and shop-style display; editorial pages are built for deep reading and narrative. If you live on words and work, a designer, writer or indie developer, a magazine style portfolio fits you better.\n\nBuilding an editorial homepage in 3 steps. First, pick one visual keyword for the page, such as restrained, warm, or sharp, and make every layout decision follow it. Second, sort your work by narrative, not by date: lead with the piece you most want people to remember. Third, write one sentence of context for each piece, what you did and what problem it solved. Those three steps give your page editorial feel, no design software required.\n\nPeople mix editorial and minimalist up a lot. Minimalist means delete until nothing is left; editorial means arrange until the hierarchy is clear. A minimalist homepage might be one tagline plus a button; an editorial homepage has a big headline, an intro paragraph, three pieces of work and a short bio, each with an obvious reading order. For creators, the latter carries far more of who you are.\n\nHead to the homepage of Dynamic Profile (dynamic-profile.shop) and start building, or read our welcome post first. The free plan is enough for an editorial-style page.',
    },
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getPostById(id: number): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.id === id);
}
