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
  {
    id: 9,
    slug: 'everything-on-one-page',
    publishedAt: '2026-08-11',
    tag: { zh: '指南', en: 'Guide' },
    title: { zh: '作品集、博客、动态、链接一页全收', en: 'Portfolio, Updates, Links: Everything on One Page' },
    date: { zh: '2026 年 8 月', en: 'August 2026' },
    body: {
      zh: '别人搜到你名字，点进来看到的应该是什么？不是社交平台主页，也不是一堆散落的链接，而是一张 one page personal site，作品集、博客、动态、社交链接全部收在一页里。这篇讲讲"一页聚合"为什么是个人主页的最佳形态，以及怎么搭。\n\n传统思路是把网站拆成作品集页、博客页、关于页，访客要点三下才知道你是谁。一页聚合的逻辑相反：首屏放你是谁，往下是代表作，再往下是动态和全部链接。访客从上往下滑一遍，就完成了从认识你到 follow 你的完整路径。对创作者尤其重要：你的访客大多是路过的，耐心有限。all in one portfolio 把决策成本降到最低，别人不用猜你的主页在哪，因为你只给了一个地址。\n\n一页里应该有什么，按顺序：你是谁（一句话定位、头像、名字）；代表作 3-5 件，不是全部，放最能代表你的；最近动态（作品更新、文章、项目进度），让页面活起来；全部链接（社交媒体、邮箱、店铺）一处收齐；一句 CTA（想让你做的事，加个邮箱或约聊按钮）。顺序有讲究：作品在前，链接垫底。先让人记住你，再给人 follow 你的理由。\n\n很多人担心一页站会死，建完就扔在那里。解决办法是加一个动态区：作品更新、博客新文、项目进度都往这里放。updates and links page 的模式就是这样：静态的作品集负责你是谁，动态区负责你最近在干嘛。两者结合，访客每次来都有新东西看，也有理由回访。\n\n链接页解决的是链接太多的问题，但它只有链接，没有内容。访客点进去看到一排按钮，对你的认知停留在这个人有五个账号。一页聚合解决的是我是谁的问题：先展示你，再给链接。前者是目录，后者是主页。这也是为什么越来越多人从链接页升级到一页个人站。\n\n到 Dynamic Profile（dynamic-profile.shop）的首页直接开始搭建，几分钟就能上线自己的 one page personal site，免费版就够用。第一次用的话，可以先读读我们的三分钟上线教程。',
      en: 'When someone searches your name and clicks through, what should they land on? Not a social profile, and not a pile of scattered links. A one page personal site, with portfolio, blog, updates and links all on a single page. This post explains why the everything-on-one-page format is the best shape for a personal homepage, and how to build one.\n\nThe traditional approach splits a site into portfolio, blog and about pages, and visitors need three clicks to figure out who you are. The one-page logic is the opposite: the first screen says who you are, scrolling shows your best work, then your updates, then all your links. A visitor who scrolls top to bottom completes the whole journey from meeting you to following you. This matters most for creators. Most visitors are passersby with limited patience. An all in one portfolio cuts the decision cost: people never wonder where your homepage is, because you only gave them one address.\n\nWhat belongs on the page, in order: who you are (one-line positioning, photo, name); best work, 3-5 pieces, not everything, the ones that represent you; recent updates (new work, articles, project progress) that keep the page alive; all links (social, email, store) collected in one place; one CTA, the thing you want people to do, an email box or a book-a-call button. The order matters. Work first, links last. Get people to remember you, then give them a reason to follow.\n\nA common worry is that a one-pager goes stale, built once and abandoned. The fix is an updates section: new work, new posts, project progress all land here. The updates and links page pattern works like this: the static portfolio answers who you are, the updates section answers what you are doing lately. Together, visitors always find something new, and there is a reason to come back.\n\nA link-in-bio page solves the too-many-links problem, but it only has links, no content. Visitors see a column of buttons and learn little more than this person has five accounts. The one-page approach answers the bigger question: show the person first, then the links. One is a table of contents, the other is a homepage. That is why more people are upgrading from link pages to one-page personal sites.\n\nHead to the homepage of Dynamic Profile (dynamic-profile.shop) and start building. Your one page personal site can be live in minutes, and the free plan is enough. First time here? Read our three-minute launch guide.',
    },
  },  {
    id: 10,
    slug: 'visitor-insights-pro-guide',
    publishedAt: '2026-08-12',
    tag: { zh: '指南', en: 'Guide' },
    title: { zh: '访客分析（Pro）：知道谁在看你', en: "Visitor Insights (Pro): See Who's Looking" },
    date: { zh: '2026 年 8 月', en: 'August 2026' },
    body: {
      zh: '访客分析是 Pro 计划里最容易被低估的功能。这篇讲它到底能告诉你什么：访问量趋势、流量来源、设备分布、停留时长——以及看完这些数据之后，你该怎么改自己的主页。\n\n## 访问量趋势：数字告诉你主页的"呼吸"\n趋势曲线是最基础也最有用的一张图。它把主页访问量按天画出来，你能一眼看到：发了一条动态后访问量有没有涨、改了文案之后有没有变化、周末是不是掉得厉害。别盯着单日数字看，看趋势。单日波动是噪音，连续两周的上升才是信号。\n\n## 流量来源：访客从哪来\n访客不会凭空出现。来源分布告诉你流量是从搜索引擎、社交媒体、还是直接访问来的。这个数据的价值在于归因：你在 Twitter 发的东西带来了多少访问？Google 搜索又带来了多少？知道来源，你才知道该往哪里用力。\n\n## 设备与地域：谁在看、用什么看\n设备分布和地域分布回答了同一个问题的两个侧面：你的访客是移动端多还是桌面端多？集中在哪个时区？移动端占大头意味着你的主页必须在手机上好看；集中在某个时区意味着你发动态的时间可以更精准。\n\n## 看完数据之后：三个动作\n第一，把访问量最高的页面置顶或强化。第二，把跳出率最高的部分改掉或删掉。第三，根据流量来源决定下一步动作：搜索流量多就多写内容，社交流量多就多互动。数据本身不产生价值，看完数据做的决定才产生价值。\n\n访客分析在 Dynamic Profile 的 Pro 计划里。想升级，去定价页看看，或者直接在主页仪表盘里点升级按钮。',
      en: 'Visitor insights is the most underrated feature in the Pro plan. This post covers what it actually tells you: traffic trends, source breakdown, device split, visit duration, and what to change on your page after you read them.\n\n## Traffic trends: the pulse of your page\nThe trend line is the most basic and most useful chart. It plots daily visits, and you can see at a glance: did that new update bump the numbers? Did the copy change move anything? Do weekends always dip? Do not stare at single-day numbers. Trends, not spikes. One day is noise, two weeks of rising line is a signal.\n\n## Source breakdown: where visitors come from\nVisitors do not appear out of thin air. The source split tells you whether traffic comes from search engines, social media, or direct visits. The value is attribution: how much traffic did that post on Twitter actually drive? How much does Google send? Know the source, and you know where to put effort.\n\n## Devices and geography: who is looking, on what\nDevice split and geography answer two sides of one question: mobile or desktop? Which timezone? If mobile dominates, your page must look good on a phone. If one timezone dominates, you can time your posts better.\n\n## After the data: three moves\nFirst, pin or strengthen whatever page gets the most visits. Second, cut or fix whatever has the highest bounce. Third, act on the source split: if search drives traffic, write more; if social does, engage more. Data on its own produces nothing. Decisions made after reading data produce everything.\n\nVisitor insights ships in the Dynamic Profile Pro plan. To upgrade, check the pricing page, or hit the upgrade button in your dashboard.',
    },
  },  {
    id: 11,
    slug: 'how-no-code-generator-works',
    publishedAt: '2026-08-13',
    tag: { zh: '指南', en: 'Guide' },
    title: { zh: '无代码生成器如何工作？填表即建站', en: 'How a No-Code Generator Works: Form to Website' },
    date: { zh: '2026 年 8 月', en: 'August 2026' },
    body: {
      zh: '很多人第一次听说"填个表就能建站"时都以为是个噱头。这篇拆开看一个 no code website generator 的内部：你填的那些字段去了哪里，它们怎么变成页面，以及哪些事情它替你做了、哪些事情它没做。\n\n## 你填的表单，最终变成什么\n一个个人主页生成器，核心是把结构化信息变成结构化页面。你的名字、简介、头像、社交链接、作品列表——每一项都对应页面上的一个区块。生成器做的事和工程师做的事一样：读取数据，套用模板，输出页面。区别只是你不需要写代码。\n\n## 模板是骨架，数据是血肉\nform based website builder 的原理可以概括成一句话：模板决定长什么样，数据决定里面是什么。你选一个模板，填完信息，生成器把两者拼起来。同一个模板，两个人填不同内容，出来的就是两个完全不同的主页。这也是为什么生成器能这么快，模板是提前做好的，你只是填内容。\n\n## 它替你做了什么\n第一，布局。区块怎么排、间距怎么调、响应式怎么处理，模板里都写好了。第二，部署。生成器直接把页面发布到线上，给你一个可以分享的链接，你不用碰服务器。第三，维护。想改内容，回到表单改一行，重新生成就完事。\n\n## 它没替你做什么\n没有银弹。你仍然需要想清楚：你的简介要传达什么、放哪张照片最合适、作品集里放什么。生成器处理的是"怎么呈现"，不处理"呈现什么"。这也是为什么两个用同一款工具的人，主页水平可以差很多。\n\n## 什么时候该用生成器\n你需要一个体面的个人主页，但不想为它投入几周时间。你在找工作或接活，需要一个能快速更新的门面。你试过自己写代码，但发现维护成本超过了收益。这些场景里，一个 no code website generator 是合理的工程决策，不是偷懒。\n\n想试试填表即建站？去 Dynamic Profile 首页点"开始"，五分钟内拿到你的第一个链接。',
      en: 'When people hear "fill a form, get a website", most assume it is a gimmick. This post opens up the hood of a no code website generator: where your form fields go, how they become a page, and which parts it does for you and which it does not.\n\n## What your form becomes\nA personal page generator is really about turning structured info into a structured page. Your name, bio, avatar, social links, portfolio items, every field maps to a block on the page. The generator does what an engineer does: read data, apply a template, output a page. The only difference is you skip the coding.\n\n## Template is the skeleton, data is the flesh\nThe principle behind a form based website builder fits in one sentence: the template decides how it looks, the data decides what is in it. You pick a template, fill in your info, and the generator combines the two. Same template, two different people, two completely different homepages. That is why generators are fast: templates are built in advance, you only fill in content.\n\n## What it does for you\nFirst, layout. Block order, spacing, responsive behavior, all baked into the template. Second, deployment. The generator publishes the page live and hands you a shareable link, no server on your side. Third, maintenance. Want to change something? Edit a line in the form, regenerate, done.\n\n## What it does not do\nThere is no silver bullet. You still have to decide what your bio should say, which photo works best, what goes in the portfolio. The generator handles presentation, not content. That is also why two people using the same tool can end up with very different pages.\n\n## When a generator makes sense\nYou need a decent personal page and do not want to sink weeks into it. You are job hunting or freelancing and need a storefront you can update fast. You tried hand-coding and found the maintenance cost beats the benefit. In these cases a no code website generator is a reasonable engineering decision, not laziness.\n\nWant to try form-to-website? Hit "Start" on the Dynamic Profile homepage and get your first link in five minutes.',
    },
  },
  {
    id: 12,
    slug: 'first-week-checklist-60-to-90',
    publishedAt: '2026-08-14',
    tag: { zh: '指南', en: 'Guide' },
    title: { zh: '第一周清单：让主页从 60 分到 90 分', en: 'First-Week Checklist: From 60 to 90 Points' },
    date: { zh: '2026 年 8 月', en: 'August 2026' },
    body: {
      zh: `你刚把第一张个人主页做上线，感觉……还行。没坏，也不惊艳。如果给它打个 60 分，其实你已经比大多数人强了，很多人连 30 分都到不了。这份第一周清单的目标，是让主页从 60 分一路提升到 90 分，也就是真正"拿得出手"的程度。你不需要重做，只需要一次集中的优化：改动几个地方，就能改变陌生人点开你页面头十秒里的印象。下面就是我们在 Dynamic Profile 给每个新用户第一周的标准动作。

## 先用主页 优化 清单，而不是急着改版

很多人第一周最容易犯的错，是一上来就处处改：换配色、换字体、挪照片，然后全部撤回。什么都没定下来。与其这样，不如先写一张主页 优化 清单，只做清单上的事。清单给你一条终点线；没有它，你会一直改下去，页面永远不"完工"。

我们最信得过的五项：一句话定位、三到五件代表作、一个活的动态区、一个清楚的联系按钮、一套统一的视觉。就这五条，其余都是装饰。

## 把个人主页文案打磨到只剩一句话

如果说 60 分和 90 分之间只差一样东西，那就是顶部那句话。多数第一版主页写着"热爱创作、喜欢折腾"，访客看完啥也不知道。把个人主页文案打磨到第一句就说清：你是谁、你解决谁的问题。"我帮独立创始人做出第一个落地页"胜过任何形容词堆砌。

作品描述也照做一遍。每件作品写清你做了什么、结果如何。"重做结账流程，转化 +18%"比"负责 UI"有力十倍。具体永远胜过花哨。

## 第一周清单，逐条过

把清单列成一张可以今天勾完的表：

- [ ] 一句话定位钉在页面最顶部
- [ ] 展示三到五件代表作，不是全部存档
- [ ] 每件作品都带一个结果或数字
- [ ] 动态区至少有一条近期更新
- [ ] 一个联系按钮，不是一整面链接墙
- [ ] 全站一套配色、一种字体
- [ ] 一张真的是你的头像或封面
- [ ] 用手机测过，因为多数访客从手机来

八条全勾完，你已经到 80 分。最后十分来自下面两个动作。

## 三个悄悄拉低 60 分的小坑

第一，砍掉链接堆。一排十个社交图标是噪音。先让人记住你，链接放最底下。第二，藏起空模块。一个空的"作品"标签页，比没有更糟。第三，收住滚动节奏。90 分的页面从上到下讲一个故事；60 分的像一张设置页。

这些都不是大改动，却决定了别人觉得"这人有个站"还是"这人值得聊"。

## 第七天之后，继续优化你的个人主页

主页不是纹身。分数最高的人，是把第一周当起点而不是终点的人。每两周丢一条动态，做完一件事写一句话。页面活着，印象也活着。

在 Dynamic Profile 上这很轻松：打开控制台，发条动态，完事。不用重新构建，不用部署。

## 常见问题

**第一周这一遍要花多久？**
多数人一小时内能勾完八条清单。难的不是加什么，是删什么。

**要开 Pro 才能到 90 分吗？**
不用。清单上的每条在免费版都能做。Pro 帮你绑定自定义域名、看数据，但一张利落的免费主页胜过乱糟糟的 Pro 主页。

**性价比最高的一处改动是什么？**
顶部那句话定位。人人都先看它，多数页面却写错了。

**该重做还是只改？**
只改。重做会浪费你第一周。用主页 优化 清单，先上线，再根据真实反馈迭代。

## 准备好从 60 分到 90 分了吗？

你现在有了完整的第一周动作：一张清单、几个悄悄的修复、一个让页面活着的习惯。最快的落地方式，是到 dynamic-profile.shop 建好你的主页，边做边勾。去 dynamic-profile.shop 免费开始，你的 90 分主页，午饭前就能上线。`,
      en: `You just shipped your first personal homepage and it feels... fine. Not broken, not great. If you scored it a 60, that is actually a decent spot, most people never clear 30. The goal of this first-week checklist is to improve your personal homepage from a passable 60 to a page that reads like a 90. You do not need a redesign. You need one focused pass: a few edits that change how a stranger reads you in the first ten seconds. Here is the exact routine we hand every new Dynamic Profile user in their first seven days.

## Start with a homepage checklist, not a redesign

The mistake most people make in week one is editing everything at once. Pick a color, change a font, move a photo, then undo it all. Nothing sticks. Instead, write down a homepage checklist of five things and do only those. A checklist gives you a finish line. Without one, you will keep polishing forever and your page will never go live.

The five items we trust most: a one-line positioning statement, three to five representative works, a live updates section, a single clear contact button, and one consistent visual style. That is the whole list. Everything else is decoration.

## Polish your personal site copy down to one line

If there is one thing that separates a 60 from a 90, it is the top line. Most first pages say something like "passionate creator who loves building things." That tells a visitor nothing. Polish your personal site copy until the first sentence says who you are and whose problem you solve. "I help indie founders ship their first landing page" beats any adjective salad.

Do the same pass on your work descriptions. Each piece should state what you did and what happened. "Redesigned checkout, +18% conversion" reads ten times stronger than "worked on UI." Concrete beats clever every time.

## The first-week checklist, point by point

Here is the checklist as a list you can tick off today:

- [ ] One-line positioning statement pinned to the top of the page
- [ ] Three to five works shown, not your whole archive
- [ ] A result or number attached to each work
- [ ] An updates section with at least one recent post
- [ ] A single contact button, not a wall of links
- [ ] One color scheme and one typeface used everywhere
- [ ] A photo or avatar that is actually you
- [ ] Tested on a phone, because most visitors arrive there

If all eight are done, you are already at an 80. The last ten points come from the next two fixes.

## Three quiet fixes that move a 60 to a 90

First, cut the link dump. A column of ten social icons is noise. Lead with who you are, and put links at the bottom. Second, remove the dead sections. If a module is empty, hide it, an empty "Works" tab looks worse than no tab at all. Third, tighten the scroll. A 90-point page tells one story top to bottom; a 60-point page feels like a settings screen.

These are not big changes. They are the difference between "this person has a site" and "this person is worth talking to."

## Keep improving your personal homepage after day seven

A homepage is not a tattoo. The people who score highest are the ones who treat week one as the start, not the end. Drop a new update every week or two. When you finish something, write one line about it. The page stays alive, and so does the impression it makes.

On Dynamic Profile this is painless: open the console, post an update, done. No rebuild, no deploy.

## FAQ

**How long should the first-week pass take?**
Most people finish the eight-item checklist in under an hour. The hard part is deciding what to cut, not what to add.

**Do I need Pro to hit 90 points?**
No. Every item on this checklist works on the free plan. Pro helps with custom domains and analytics, but a sharp free page beats a messy Pro page.

**What is the single highest-impact edit?**
The one-line positioning statement. It is the first thing anyone reads, and most pages get it wrong.

**Should I redesign or just edit?**
Edit. A redesign wastes your first week. Use the homepage checklist, ship it, then improve from real feedback.

## Ready to go from 60 to 90?

You now have the full first-week routine to improve your personal homepage: a checklist, the quiet fixes, and a habit to keep it alive. The fastest way to apply it is to build your page on dynamic-profile.shop and tick the boxes as you go. Start free at dynamic-profile.shop and your 90-point homepage can be live before lunch.`,
    },
  },
  {
    id: 13,
    slug: 'photographer-portfolio-layout-guide',
    publishedAt: '2026-08-15',
    tag: { zh: '指南', en: 'Guide' },
    title: { zh: '摄影师作品集怎么排版？让照片自己开口说话', en: 'Portfolio Layout for Photographers: Let Photos Speak' },
    date: { zh: '2026 年 8 月', en: 'August 2026' },
    body: {
      zh: `客户打开你的摄影师作品集，第一眼看的不是你的名字，是照片。photo portfolio page 排版的核心就一句话：让照片自己开口说话，你不抢戏。

## 先分清两种主流布局

一种是沉浸式大图，适合风光、人像、婚礼——单张照片就够撑满一屏，纵深强，滑起来像看片。另一种是网格缩略图，适合街拍、产品、多题材混合作品——信息密度高，方便快速扫。选哪种，取决于你照片的单张成色：一张图扛得起整屏就上大图，需要靠数量堆出广度就上网格。混着用也没问题：首页给一张主视觉大图，下面接网格，这是 photography portfolio layout 里很稳的组合。

## 留白不是浪费，是呼吸

新手最常见的问题是把页面塞满，照片之间没有间距，观感就糊成一团。建议图距至少 24px，大图之间留到 48px 以上。留白让眼睛知道"这张结束了，下一张开始"，照片反而更有分量。

## 每个项目给一个案例块

别只堆图。每个作品配一个案例块，里面放：项目名称和拍摄时间、一两句拍摄背景或思路、4-8 张成片、客户或题材标签。访客看到的就不只是"拍得好看"，还有你的专业度。案例块的标题里带上项目关键词，也是作品集页 SEO 的好载体。

## 移动端是主战场

手机上浏览作品的人比电脑多得多。移动端的习惯是竖滑：首屏放一张大图加名字和一句定位，下面直接进作品流，联系方式固定在底部或角落菜单，随时能点到。

## 联系方式放在最后，也要放在最容易被找到的地方

拍得再好，客户找不到你的邮箱，等于白拍。作品集页末尾放一个醒目的联系块，页脚再重复一遍，别让客户往回翻。

## 动态个人主页：知道谁在看你的作品

普通作品集页是个哑巴，你不知道谁来过。用访客画像功能，你能看到来访者大概从哪个渠道进来（站内直达、Instagram，还是搜索）、停留了多久、看了哪些项目、是手机还是电脑打开的。对摄影师来说，这些信息直接决定你怎么跟进：从 Instagram 点进来的，多半是看了你发的新片，适合私信补一句；从搜索引擎来的，可能是主动找服务的客户，适合发作品集之外的报价说明。具体操作三步就能上线：在编辑器里选作品集模板，替换成自己的照片；每个项目建一个案例块，填好标题和拍摄背景；发布后打开访客画像面板，看真实来访数据。

想从模板开始，回到 dynamic-profile.shop 首页选一个顺眼的版式；布局的更多细节可以在博客列表里翻之前几篇。

## FAQ

**摄影师作品集页放多少张照片合适？**
20-40 张精选就够了，质量优先。放几百张反而稀释重点。

**大图布局和网格布局哪个更好？**
没有绝对答案，取决于你的题材。单张成色好就大图，题材广就网格。

**访客画像能告诉我具体是谁在看吗？**
不能精确到个人，但能看到渠道、时长和浏览行为。`,
      en: `A client opening your photographer portfolio doesn't look for your name first. They look at the photos. Most portfolio pages fail not because the work is weak, but because the layout gets in the way. This guide shows you how to make the layout disappear.

## Two main layouts: immersive large images vs grid thumbnails

Immersive large images suit landscape, portrait and wedding work — single shots that can carry a full screen, cinematic scroll. Grid thumbnails suit street, product and mixed genres — dense, quick to scan. The choice depends on how strong your individual shots are. If one image can hold a full screen, go large. If you need volume to show range, go grid. Mixing works too: a hero image on top, a grid below, that's a stable photography portfolio layout that rarely misses.

## White space is not waste

The most common beginner mistake is packing the page full. When photos have no gap between them, everything blurs into one grey soup. Keep at least 24px between images, and 48px for the large ones. White space tells the eye "this one ended, the next begins." The photos actually feel heavier when they get room to breathe.

## Give each project its own case block

Don't just dump images. Each project deserves a case block with: project name and shoot date, one or two lines about the background or approach, four to eight finished shots, and a tag for the client or the genre. What you're showing is not just "the photos look good" — you're showing process and professionalism. Case blocks also carry SEO weight, so put the project keyword in the heading.

## Mobile is the main battlefield

More people view a photo portfolio page on a phone than on a desktop. On mobile the habit is vertical scrolling: the first screen has to be one large image, your name and a one-line positioning. Right after that, the work flow. Contact fixed in a corner menu or at the bottom, always one tap away.

## Contact goes last, but must be impossible to miss

If the client can't find your email after seeing great work, the whole page was pointless. Put a visible contact block at the end, and repeat it in the footer. Don't make them scroll back up to hunt for it.

## Dynamic profile: know who is looking at your work

This is where a dynamic profile page beats a static one. A regular portfolio is a dummy page — it never tells you who came. With visitor profiles, you can see which channel the visitor came from (direct, Instagram, or search), how long they stayed and which projects they opened, and whether they were on phone or desktop. For a photographer this decides how you follow up: someone arriving from Instagram probably saw your newest post, so a quick private message works; someone arriving from search is hunting for services, so they'd rather get a pricing note. Three steps to set it up: pick a portfolio template in the editor and swap in your photos; build a case block for each project with a title and context; publish, then open the visitor profile panel and read the real data.

Start from a template on the dynamic-profile.shop homepage, and browse the blog list for more layout thinking from earlier posts.

## FAQ

**How many photos should a photographer portfolio hold?**
Twenty to forty curated shots is enough. More just dilutes the focus.

**Which is better, large-image or grid layout?**
There's no absolute answer. It depends on your subject. Single strong shots suit large images, wide ranges suit grids.

**Can visitor profiles tell me exactly who is viewing?**
Not the exact person. But you get the source channel, the time spent, and what they browsed.`,
    },
  },
  {
    id: 14,
    slug: 'photographer-portfolio-layout-guide',
    publishedAt: '2026-08-15',
    tag: { zh: '指南', en: 'Guide' },
    title: { zh: "摄影师作品集怎么排版？让照片自己开口说话", en: "Portfolio Layout for Photographers: Let Photos Speak" },
    date: { zh: '2026 年 8 月', en: 'August 2026' },
    body: {
      zh: `客户打开你的摄影师作品集，第一眼看的不是你的名字，是照片。photo portfolio page 排版的核心就一句话：让照片自己开口说话，你不抢戏。

## 先分清两种主流布局

| 布局 | 适合 | 观感 |
|---|---|---|
| 大图沉浸式 | 风光、人像、婚礼，单张照片就够撑满一屏 | 纵深强，滑起来像看片 |
| 网格缩略图 | 街拍、产品、多题材混合作品 | 信息密度高，方便快速扫 |

选哪种，取决于你照片的单张成色。一张图扛得起整屏，就上大图；需要靠数量堆出作品广度，就上网格。混着用也没问题：首页给一张主视觉大图，下面接网格，这是 photography portfolio layout 里很稳的组合。

## 留白不是浪费，是呼吸

新手最常见的问题，是把页面塞满。照片之间没有间距，观感就糊成一团。我的建议是图距至少 24px，大图之间留到 48px 以上。留白让眼睛知道"这张结束了，下一张开始"，照片反而更有分量。

## 每个项目给一个案例块

别只堆图。每个作品配一个案例块，里面放：

- 项目名称和拍摄时间
- 一两句拍摄背景或思路
- 4–8 张成片
- 客户或题材标签

访客看到的就不只是"拍得好看"，还有你的专业度。案例块的标题里带上项目关键词，也是作品集页 SEO 的好载体。

## 移动端是主战场

手机上浏览作品的人比电脑多得多。移动端的习惯是竖滑，首屏就要给大图，别放一大段自我介绍。

- 首屏：一张大图 + 名字 + 一句定位
- 下面直接进作品流，越往后越精彩
- 联系方式固定在底部或角落菜单，随时能点到

## 联系方式放在最后，也要放在最容易被找到的地方

拍得再好，客户找不到你的邮箱，等于白拍。作品集页末尾放一个醒目的联系块，页脚再重复一遍。别让客户往回翻。

## 动态个人主页：知道谁在看你的作品

这是零代码动态个人主页最值钱的地方。普通作品集页是个哑巴，你不知道谁来过。用访客画像功能，你能看到：

- 来访者大概从哪个渠道进来（站内直达、Instagram，还是搜索）
- 停留了多久、看了哪些项目
- 是手机还是电脑打开的

对摄影师来说，这些信息直接决定你怎么跟进。从 Instagram 点进来的，多半是看了你发的新片，适合私信补一句；从搜索引擎来的，可能是主动找服务的客户，适合发作品集之外的报价说明。

具体操作三步就能上线：

1. 在编辑器里选作品集模板，替换成自己的照片
2. 每个项目建一个案例块，填好标题和拍摄背景
3. 发布后打开访客画像面板，看真实来访数据

想从模板开始，回到[首页](/)选一个顺眼的版式。布局思路的更多细节，可以翻我之前写的 [Day 7](/blog.html#day7) 和 [Day 8](/blog.html#day8) 两篇。

## FAQ

**摄影师作品集页放多少张照片合适？**
20–40 张精选就够了，质量优先。放几百张反而稀释重点。
How many photos should a photographer portfolio hold? Twenty to forty curated shots is enough.

**大图布局和网格布局哪个更好？**
没有绝对答案，取决于你的题材。单张成色好就大图，题材广就网格。
Which is better, large-image or grid layout? It depends on your subject matter.

**访客画像能告诉我具体是谁在看吗？**
不能精确到个人，但能看到渠道、时长和浏览行为。
Can visitor profiles tell me exactly who is viewing? Not the exact person, but you get the source, time and behavior.`,
      en: `A client opening your photographer portfolio doesn't look for your name first. They look at the photos. Most portfolio pages fail not because the work is weak, but because the layout gets in the way. What I want to do here is show you how to make the layout disappear.

## Two main layouts: immersive large images vs grid thumbnails

| Layout | Best for | Feel |
|---|---|---|
| Immersive large image | landscape, portrait, wedding; single shots that can carry a full screen | cinematic scroll |
| Grid thumbnails | street, product, mixed genres | dense, quick to scan |

The choice depends on how strong your individual shots are. If one image can hold a full screen, go large. If you need volume to show range, go grid. Mixing works too. A hero image on top, a grid below, that's a stable photography portfolio layout that rarely misses.

## White space is not waste

The most common beginner mistake is packing the page full. When photos have no gap between them, everything blurs into one grey soup. Keep at least 24px between images, and 48px for the large ones. White space tells the eye "this one ended, the next begins." The photos actually feel heavier when they get room to breathe.

## Give each project its own case block

Don't just dump images. Each project deserves a case block with:

- project name and shoot date
- one or two lines about the background or approach
- four to eight finished shots
- a tag for the client or the genre

What you're showing is not just "the photos look good." You're showing process and professionalism. Case blocks also carry SEO weight, so put the project keyword in the heading.

## Mobile is the main battlefield

More people view your photo portfolio page on a phone than on a desktop, full stop. On mobile the habit is vertical scrolling, and the first screen has to be an image. Not a paragraph about yourself.

- First screen: one large image, your name, a one-line positioning.
- Right after that, the work flow. Keep the strongest shots toward the end.
- Contact fixed in a corner menu or at the bottom, always one tap away.

## Contact goes last, but must be impossible to miss

If the client can't find your email after seeing great work, the whole page was pointless. Put a visible contact block at the end, and repeat it in the footer. Don't make them scroll back up to hunt for it.

## Dynamic profile: know who is looking at your work

This is where a dynamic profile page beats a static one. A regular portfolio is a dummy page. It never tells you who came. With visitor profiles, you can see:

- which channel the visitor came from (direct, Instagram, or search)
- how long they stayed and which projects they opened
- phone or desktop

For a photographer this decides how you follow up. Someone arriving from Instagram probably saw your newest post, so a quick private message works. Someone arriving from search is hunting for services, so they'd rather get a pricing note than a "thanks for looking."

Three steps to set it up:

1. Pick a portfolio template in the editor and swap in your photos.
2. Build a case block for each project with a title and context.
3. Publish, then open the visitor profile panel and read the real data.

Start from a template on the [homepage](/). For more layout thinking, the [Day 7](/blog.html#day7) and [Day 8](/blog.html#day8) posts cover related ground.

## FAQ

**How many photos should a photographer portfolio hold?**
Twenty to forty curated shots is enough. More just dilutes the focus. 摄影师作品集页放多少张照片合适？20–40 张精选就足够。

**Which is better, large-image or grid layout?**
There's no absolute answer. It depends on your subject. Single strong shots suit large images, wide ranges suit grids. 大图布局和网格布局哪个更好？看题材，没有标准答案。

**Can visitor profiles tell me exactly who is viewing?**
Not the exact person. But you get the source channel, the time spent, and what they browsed. 访客画像能看到具体是谁吗？看不到个人，但渠道、时长和浏览行为都有。

Head back to the [homepage](/) and grab a portfolio template that fits your work. The layout is the easy part. The photos were already speaking for you.`,
    },
  },

  {
    id: 15,
    slug: 'illustrator-portfolio-process-guide',
    publishedAt: '2026-08-16',
    tag: { zh: '指南', en: 'Guide' },
    title: { zh: "插画师主页怎么搭？把过程也放进作品集", en: "Illustrator Homepages: Show Your Process Too" },
    date: { zh: '2026 年 8 月', en: 'August 2026' },
    body: {
      zh: `插画师做主页，最亏的做法是只放成品图。甲方看得懂成图，但真正让甲方觉得"这个人靠谱"的，是过程。ill portfolio 的进阶玩法，就是把草稿、线稿、配色方案也摆上桌面，让访客看到一张图是怎么从零长出来的。

## 为什么过程稿比成图更打动人

成图只能证明你画得完，过程稿能证明你会思考。一张完整的插画主页，通常放三类过程素材：

- 草稿/缩略图（thumbnails）：展示构图思路，说明你不是瞎画
- 线稿或黑白稿：展示造型能力，线条干净程度一眼可见
- 配色方案/色彩研究：展示审美判断，为什么选这组颜色

甲方看商业插画，最担心的是"沟通成本"。过程稿等于提前回答了"你是怎么想的"，比任何自我介绍都管用。

## 怎么排版：时间线比瀑布流更合适

插画作品的排版，我建议用时间线（timeline）而不是纯瀑布流。瀑布流适合量大而均匀的照片，插画每张的观看时长差异很大，时间线能让访客按你的成长顺序看，也方便你在每个节点插一段创作思路的文字。

- 顶部：一张代表作品 + 名字 + 一句话定位
- 中间：按年份或项目排的 timeline，每段配 3-6 张过程稿
- 底部：联系方式 + 一句"接单中/开放合作"的状态

## 每张作品配一段"创作笔记"

不用长，两三句就够：这张图的客户是谁、风格要求是什么、你做了什么取舍。创作笔记的价值在于，它把"插画作品集"升级成"插画师个人网站"——访客看完记住的不是单张图，而是你这个人的工作方式。

## 过程稿也会被搜到

草稿图一样能参与搜索。给每张过程稿写 alt 文本的时候，别只写"草图 1"，写成"角色设计草稿 女性 奇幻"，零成本把 illustrator personal site 的覆盖面扩大一倍。

## 别把过程做成流水账

放过程稿有个度：选每个项目 3-6 张有代表性的，别把一百张废稿全传上去。过程是证明思考的工具，不是工作量展览。挑得出重点，本身也是一种专业度。

## 动态个人主页：知道谁在看你的插画

这是零代码动态个人主页（dynamic profile）最值钱的地方：访客画像会告诉你，看你的插画页的人是甲方、同行还是收藏爱好者，从哪个渠道来，停留了多久。把"最受欢迎的作品"放到首页，把"停留时间最短的页面"删掉或重做——用数据调整你的 illustrator portfolio，比拍脑袋强十倍。

**插画师主页必须放过程稿吗？** 不是必须，但强烈建议。商业插画的甲方普遍担心沟通成本，过程稿是降低这个成本最直接的方式，尤其是中大型项目。

**过程稿放多少合适？** 每个项目 3-6 张，选有代表性的：构图草稿、线稿、配色研究各一张，别把废稿全传上去。

**动态主页对插画师有用吗？** 有用。访客画像能看到谁在看、看了多久、从哪来，帮你判断哪些作品最受欢迎，把首页空间留给真正有吸引力的插画。

想搭一个带过程展示和访客画像的插画师主页？回[首页](/)选一个模板，五分钟就能上线。`,
      en: `The biggest mistake illustrators make on a personal site is showing only finished pieces. Clients can read a final image, but what makes them trust you is the process. The advanced play for an illustrator portfolio is putting sketches, line work, and color studies on the table, so visitors can watch an image grow from zero.

## Why process shots beat finals

A finished piece proves you can finish. Process shots prove you can think. A strong illustrator personal site usually shows three kinds of process material:

- Thumbnails: composition thinking, proof you are not drawing blind
- Line art or grayscale: draftsmanship, clean lines are visible at a glance
- Color studies: aesthetic judgment, why these colors

Commercial clients worry about communication cost. Process shots answer "how do you think" in advance, which works better than any bio.

## Layout: timeline beats masonry

For illustration, use a timeline instead of a pure masonry grid. Masonry suits large uniform photo sets; illustration viewing time varies wildly per piece. A timeline lets visitors follow your growth in order and lets you drop a short note at each stage.

- Top: one hero piece + name + one-line positioning
- Middle: timeline by year or project, 3-6 process shots each
- Bottom: contact + a clear "open for commissions" status

## Add a short creation note to every piece

Two or three sentences are enough: who the client was, what style was requested, what you traded off. The note upgrades an illustrator portfolio into an actual illustrator personal site. Visitors remember your working style, not just one image.

## Process shots are searchable too

Sketches rank as well. When you write alt text, skip "sketch 1" and write "character design sketch woman fantasy". It doubles the reach of your art portfolio process pages for free.

## Do not turn process into a logbook

Pick 3-6 representative shots per project. Nobody needs a hundred failed drafts. Editing is a professional skill, and showing restraint is part of the pitch.

## Dynamic profile: know who views your art

This is where a no-code dynamic profile shines: visitor analytics tell you whether clients, peers, or collectors are looking at your pages, where they came from, and how long they stayed. Put the most-viewed pieces on the homepage and rework or cut the pages nobody watches. Data beats guesswork for tuning your illustrator portfolio.

**Does an illustrator homepage need process shots?** Not required, but strongly recommended. Commercial clients worry about communication cost, and process shots lower it directly, especially on mid-size and large projects.

**How many process shots per project?** Three to six, representative ones: a composition sketch, line art, and a color study. Do not upload every failed draft.

**Is a dynamic profile useful for illustrators?** Yes. Visitor analytics show who is looking, how long they stay, and where they came from, so you can feature the pieces that actually attract attention.

Want an illustrator homepage with process display and visitor analytics? Head back to the [homepage](/) and pick a template. Five minutes to launch.`,
    },
  },

  {
    id: 16,
    slug: 'indie-developer-homepage-guide',
    publishedAt: '2026-08-17',
    tag: { zh: '指南', en: 'Guide' },
    title: { zh: "独立开发者的个人主页：代码之外的故事", en: "Indie Developer Homepages: Stories Beyond Code" },
    date: { zh: '2026 年 8 月', en: 'August 2026' },
    body: {
      zh: `"独立开发者的个人主页，最容易写成“简历的网页版”：头像、技术栈、项目链接，三点一线。但真正让访客记住你的，从来不是你会什么技术，而是你为什么做这些东西。indie dev homepage 的进阶玩法，是把“代码之外的故事”也放上去。\n\n## 简历式主页的问题\n\n技术栈列表是给机器看的，不是给人看的。访客在主页上停留的前 30 秒，决定了他会不会继续看你的项目。满屏的 React / Next.js / TypeScript 标签，和一句“我用三年时间做了一个没有人用的产品，然后把它重写了一遍”，哪个更让人想往下读？\n\n答案是后者。dev portfolio personal site 的竞争不在技术深度，在叙事能力。\n\n## 三件代码之外必放的事\n\n- 你的“为什么”：为什么做独立开发，为什么是这几个方向，一句话讲清楚\n- 你的失败：做砸过的产品、放弃过的方向、踩过的坑。失败比成功更能建立信任\n- 你的日常：正在做什么、下一步想做什么。让人看到你的进程，而不是只有结果\n\n## 怎么放项目：故事优先，代码其次\n\n项目展示的顺序，建议按“叙事价值”而不是“技术含量”排。每个项目配三段话：\n\n- 这个产品解决什么问题\n- 你是怎么发现这个问题的（这往往是最有趣的部分）\n- 结果如何，包括不理想的结果\n\n技术栈放底部一行小字就够了。想深入看代码的人会自己去 GitHub，主页的责任是让他产生这个念头。\n\n## 动态主页：让访客画像帮你迭代\n\n独立开发者的主页应该常改常新，但改哪里？零代码动态个人主页（dynamic profile）的访客画像会告诉你：哪些页面停留时间长、访客从哪来、是同行还是潜在用户。用数据决定主页改版方向，比凭感觉强。\n\n比如你发现“项目页”停留时间远超“关于我”，说明访客更关心产品而不是你的故事——那就把项目前置。反过来，如果“关于我”更受欢迎，说明你的故事本身就是差异化，多写。\n\n## 让主页开始工作\n\n独立开发者的主页不是名片，是产品。它要回答三个问题：你是谁、你为什么做这个、你现在在做什么。代码之外的故事，是这三个问题的答案里最有辨识度的部分。\n\n**独立开发者主页一定要放失败经历吗？** 不是必须，但强烈建议。失败经历是建立信任最高效的方式之一，它证明你真实、你在场、你做过事。不需要惨烈，一两句诚实的复盘就够。\n\n**技术栈还要不要放？** 要放，但放底部。技术栈是给筛选简历的人和搜索引擎看的，不是给访客的。把它压缩成一行，把页面空间留给故事。\n\n**动态主页对独立开发者有用吗？** 非常有用。访客画像能看到谁在看你的主页、停留多久、从哪来，直接指导你下次改版改哪里。\n\n想搭一个带访客画像的独立开发者主页？回[首页](/)选一个模板，把“代码之外的故事”写上去，五分钟上线。"`,
      en: `"An indie developer homepage is the easiest page on the internet to write as a resume: photo, tech stack, three project links. But what visitors remember is never the technologies you know. It is why you make the things you make. The advanced play for an indie dev homepage is putting the story beyond code on it.\n\n## The problem with resume-style homepages\n\nA tech stack list is written for machines, not people. The first 30 seconds on your homepage decide whether someone keeps scrolling. A wall of React / Next.js / TypeScript badges, versus one line like “I spent three years building a product nobody used, then rebuilt it from scratch” — which one makes you want to read on?\n\nThe second one. An indie developer personal site competes on storytelling, not technical depth.\n\n## Three things beyond code that belong on the page\n\n- Your why: why indie development, why these directions, in one sentence\n- Your failures: products that flopped, directions you abandoned, mistakes you made. Failures build trust faster than wins\n- Your now: what you are working on and what is next. Show process, not just results\n\n## How to present projects: story first, code second\n\nOrder projects by narrative value, not technical impressiveness. Give each project three short paragraphs:\n\n- What problem does it solve\n- How you discovered that problem — usually the most interesting part\n- What happened, including what did not work out\n\nThe tech stack goes in one small line at the bottom. People who want to read code will find your GitHub. The homepage's job is to make them want to.\n\n## Dynamic profile: let visitor data drive iteration\n\nAn indie homepage should change often. But where? A no-code dynamic profile's visitor analytics tells you which sections hold attention, where visitors come from, and whether they are peers or potential users. Data beats guesswork for deciding what to redesign.\n\nIf your projects page holds attention far longer than your about section, visitors care about products more than your story — put projects first. If the reverse, your story is the differentiator. Write more of it.\n\n## Let the homepage do work\n\nAn indie developer homepage is not a business card. It is a product. It answers three questions: who you are, why you build, and what you are building now. The story beyond code is the most distinctive part of all three answers.\n\n**Do I have to include failures?** Not required, but strongly recommended. Failures are one of the fastest ways to build trust. They prove you are real, you showed up, you shipped. One or two honest lines are enough.\n\n**Should I still list my tech stack?** Yes, at the bottom. The stack is for recruiters skimming and search engines, not for visitors. Compress it to one line and give the space to the story.\n\n**Is a dynamic profile useful for indie developers?** Very. Visitor analytics show who looks at your page, how long they stay, and where they come from, which directly tells you what to change next.\n\nWant an indie developer homepage with visitor analytics? Head back to the [homepage](/) and pick a template. Write your story beyond code and launch in five minutes."`,
    },
  },
  {
    id: 17,
    slug: 'making-homepage-alive-with-posts',
    publishedAt: '2026-08-18',
    tag: { zh: '指南', en: 'Guide' },
    title: { zh: '动态（Posts）怎么玩：让主页活起来', en: 'Making Your Homepage Alive with Posts' },
    date: { zh: '2026 年 8 月', en: 'August 2026' },
    body: {
      zh: `很多人主页做完就再也没碰过，像一张印好就压箱底的传单。其实 Dynamic Profile 里最容易被忽略的，是“动态（Posts）”——它就是让一张静态个人主页活起来的东西。如果你想让自己的个人主页保持动态、又不知道从哪开始，这篇就聊聊怎么玩。

## 动态到底是什么：主页上的“第二层内容”

简单说，动态是你主页上的一块实时内容区。和作品集不同，作品集是你“做过什么”，动态是你“最近在干嘛”。发一条新动态，访客一进来就能看到，不用去翻你的社交账号。

它长这样：一句话 + 一张图（可选）+ 一个时间。没有排版压力，写完就发。

## 为什么个人主页需要动态，而不只是作品集

静态主页的问题是：建完那天最漂亮，之后只会越来越旧。带动态的主页，每次有人来都有新东西看。两者差别其实挺明显：

| 对比 | 静态主页 | 带动态的主页 |
|---|---|---|
| 访客每次来访 | 看到同一张旧脸 | 看到你最近在做什么 |
| 信任感 | 像一张名片 | 像一个有在活动的人 |
| 回访理由 | 几乎没有 | “他最近又发了什么” |

我自己体感最深的，是动态给了我一个不发长文也能保持存在的理由。不是每个人都愿意写博客，但几乎人人都能发一条“这周做了个小东西”。

## 三种更新频率：哪种适合你

- 每天一条：适合正在做项目、想让人看到进度的人。成本最低，写一句就完事。
- 每周两三条：大多数人的甜点区。有节奏，又不至于变成噪音。
- 随缘更新：只在真有事时说一声。比不更新强，但别指望它带来回访。

别逼自己日更。动态的价值不在频率，在于“你还在”。两条有内容的动态，胜过三十条“早安”。

## 动态写什么：4 个不费劲的角度

1. 做完了什么：上线一个功能、交了稿、画完一张图，配一句背景。
2. 学到了什么：踩了个坑、读了篇好文、想到一个点子。
3. 在做什么：把进行中的事摆出来，哪怕没做完。过程本身有人看。
4. 推荐点什么：一本书、一个工具、一个方法。顺手就发。

关键是具体。把“今天也在努力”换成“今天把结账流程重做了一遍，转化 +12%”，访客才知道你是真的在做事。

## 用访客画像，反推该发什么

这是免费版也能用的思路：动态发出去之后，看谁在看、看了多久。如果某条动态的停留明显更长，说明这类内容你的访客买账，那就多往这个方向发。主页不是发了就完，发了看反馈、再调整，才转得起来。

想从模板开始，回[首页](/)选一个顺眼的版式；更多布局思路可以翻 [Day 8：一页聚合](/blog/everything-on-one-page) 和 [Day 12：第一周清单](/blog/first-week-checklist-60-to-90)。

## 常见问题

**动态要每天发吗？**
不用。每天发适合做项目的人，大多数人每周两三条就够。重点是持续，不是高频。

**动态和博客有什么区别？**
动态是一两句话的短更新，随手就发；博客是长文，要构思。动态是日常，博客是深度，两者互补。

**免费版能用动态吗？**
能用。动态在免费版就开放，不用升级。想看谁在看你的动态，再考虑 Pro 的访客画像。

## 让你的主页活起来

你不需要重做主页，只要在[首页](/)建好之后，发第一条动态。哪怕只是“今天把作品集整理了一遍”。主页活了，访客才记得住你。去 [dynamic-profile.shop](/) 免费开始，五分钟发出你的第一条。`,
      en: `Most people ship a personal homepage and then never touch it again, like a flyer printed and shoved in a drawer. The most underused thing in Dynamic Profile is Posts: short updates that keep a page alive. If you want your personal site posts to actually say something about you, here's how I'd play it.

## What Posts actually are: a second layer on your page

In plain terms, Posts are a live section on your homepage. A portfolio shows what you've done; Posts show what you're doing lately. Drop one and a visitor sees it the moment they land, no need to dig through your socials.

It's a line of text plus an optional image plus a timestamp. No layout pressure. Write and ship.

## Why a homepage needs posts, not just a portfolio

A static homepage looks best on launch day and only gets staler after. A page with Posts gives returning visitors something new each time. The gap is bigger than people think:

| | Static homepage | Homepage with Posts |
|---|---|---|
| Each visit | the same old face | what you did this week |
| Trust | reads like a card | reads like a person |
| Reason to return | almost none | "what did they post now" |

What hit me most is that Posts gave me a reason to stay present without writing a full article. Not everyone wants a blog, but almost anyone can post "shipped a small thing this week."

## Three posting rhythms: which fits you

- Daily: good if you're mid-project and want people to see progress. Cheapest to do, one line and done.
- Two or three a week: the sweet spot for most. Rhythmic without becoming noise.
- Whenever: only speak up when there's real news. Better than silence, but don't expect return visits.

Don't force a daily streak. The value isn't frequency, it's "you're still here." Two posts with substance beat thirty "good mornings."

## What to post: four low-effort angles

1. What you finished: a feature shipped, a draft delivered, a sketch done, with one line of context.
2. What you learned: a bug, a good read, a small idea.
3. What you're doing: show work in progress, even unfinished. The process has an audience.
4. What you'd recommend: a book, a tool, a method. Post it on the spot.

Be specific. Swap "still grinding today" for "rebuilt the checkout flow, +12% conversion" and visitors know you're actually doing things.

## Use visitor insights to decide what to post

This works on the free plan too: after you post, see who looked and how long. If one post holds attention noticeably longer, your visitors like that kind, so post more of it. A homepage isn't fire-and-forget; post, read the feedback, adjust, repeat.

To start from a template, head back to the [homepage](/) and pick a layout you like. For more layout thinking, the [Day 8: everything on one page](/blog/everything-on-one-page) and [Day 12: first-week checklist](/blog/first-week-checklist-60-to-90) posts cover related ground.

## FAQ

**Do I need to post every day?**
No. Daily suits people in the middle of a project; two or three a week is enough for most. The point is consistency, not volume.

**How is a Post different from a blog?**
A Post is a one- or two-line update you fire off in seconds. A blog is a long piece that needs planning. Posts are the daily, the blog is the deep dive; they cover each other.

**Does the free plan support Posts?**
Yes. Posts are open on the free plan, no upgrade needed. If you want to see who's reading them, that's where Pro's visitor insights come in.

## Make your homepage alive

You don't need to rebuild anything. Just create your page on the [homepage](/), then post your first update, even if it's only "tidied my portfolio today." A live page is a page people remember. Start free at [dynamic-profile.shop](/) and post your first line within five minutes.`,
    },
  },];
;

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getPostById(id: number): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.id === id);
}
