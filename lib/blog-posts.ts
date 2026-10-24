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
    tag: { zh: '指南', en: 'Guide' },
    publishedAt: '2026-08-11',
    title: { zh: '作品集、博客、动态、链接一页全收', en: 'Portfolio, Updates, Links: Everything on One Page' },
    date: { zh: '2026 年 8 月', en: 'August 2026' },
    body: {
      zh: '别人搜到你名字，点进来看到的应该是什么？不是社交平台主页，也不是一堆散落的链接，而是一张 one page personal site，作品集、博客、动态、社交链接全部收在一页里。这篇讲讲"一页聚合"为什么是个人主页的最佳形态，以及怎么搭。\n\n传统思路是把网站拆成作品集页、博客页、关于页，访客要点三下才知道你是谁。一页聚合的逻辑相反：首屏放你是谁，往下是代表作，再往下是动态和全部链接。访客从上往下滑一遍，就完成了从认识你到 follow 你的完整路径。对创作者尤其重要：你的访客大多是路过的，耐心有限。all in one portfolio 把决策成本降到最低，别人不用猜你的主页在哪，因为你只给了一个地址。\n\n一页里应该有什么，按顺序：你是谁（一句话定位、头像、名字）；代表作 3-5 件，不是全部，放最能代表你的；最近动态（作品更新、文章、项目进度），让页面活起来；全部链接（社交媒体、邮箱、店铺）一处收齐；一句 CTA（想让你做的事，加个邮箱或约聊按钮）。顺序有讲究：作品在前，链接垫底。先让人记住你，再给人 follow 你的理由。\n\n很多人担心一页站会死，建完就扔在那里。解决办法是加一个动态区：作品更新、博客新文、项目进度都往这里放。updates and links page 的模式就是这样：静态的作品集负责你是谁，动态区负责你最近在干嘛。两者结合，访客每次来都有新东西看，也有理由回访。\n\n链接页解决的是链接太多的问题，但它只有链接，没有内容。访客点进去看到一排按钮，对你的认知停留在这个人有五个账号。一页聚合解决的是我是谁的问题：先展示你，再给链接。前者是目录，后者是主页。这也是为什么越来越多人从链接页升级到一页个人站。\n\n到 Dynamic Profile（dynamic-profile.shop）的首页直接开始搭建，几分钟就能上线自己的 one page personal site，免费版就够用。第一次用的话，可以先读读我们的三分钟上线教程。',
      en: 'When someone searches your name and clicks through, what should they land on? Not a social profile, and not a pile of scattered links. A one page personal site, with portfolio, blog, updates and links all on a single page. This post explains why the everything-on-one-page format is the best shape for a personal homepage, and how to build one.\n\nThe traditional approach splits a site into portfolio, blog and about pages, and visitors need three clicks to figure out who you are. The one-page logic is the opposite: the first screen says who you are, scrolling shows your best work, then your updates, then all your links. A visitor who scrolls top to bottom completes the whole journey from meeting you to following you. This matters most for creators. Most visitors are passersby with limited patience. An all in one portfolio cuts the decision cost: people never wonder where your homepage is, because you only gave them one address.\n\nWhat belongs on the page, in order: who you are (one-line positioning, photo, name); best work, 3-5 pieces, not everything, the ones that represent you; recent updates (new work, articles, project progress) that keep the page alive; all links (social, email, store) collected in one place; one CTA, the thing you want people to do, an email box or a book-a-call button. The order matters. Work first, links last. Get people to remember you, then give them a reason to follow.\n\nA common worry is that a one-pager goes stale, built once and abandoned. The fix is an updates section: new work, new posts, project progress all land here. The updates and links page pattern works like this: the static portfolio answers who you are, the updates section answers what you are doing lately. Together, visitors always find something new, and there is a reason to come back.\n\nA link-in-bio page solves the too-many-links problem, but it only has links, no content. Visitors see a column of buttons and learn little more than this person has five accounts. The one-page approach answers the bigger question: show the person first, then the links. One is a table of contents, the other is a homepage. That is why more people are upgrading from link pages to one-page personal sites.\n\nHead to the homepage of Dynamic Profile (dynamic-profile.shop) and start building. Your one page personal site can be live in minutes, and the free plan is enough. First time here? Read our three-minute launch guide.',
    },
  },
  {
    id: 10,
    slug: 'coach-personal-page',
    tag: { zh: '指南', en: 'Guide' },
    publishedAt: '2026-08-26',
    title: { zh: '咖啡师、教练、讲师：服务型个人主页', en: 'Service Pros: Homepages for Coaches & Trainers' },
    date: { zh: '2026 年 8 月', en: 'August 2026' },
    body: {
      zh: '教练和培训师面临一个独特的挑战：你的产品就是你本人。不像产品公司，你不能发布功能或在定价上进行 A/B 测试。你能控制的是如何在线展示自己。\n\n服务专业人士的主页需要产品页面不具备的三个要素：①可信信号——认证、客户推荐、工作经验年限；②个性——访客需要感觉与你合作会愉快；③明确的下一步——预订电话、下载指南或发送消息。最好的教练主页将这三者融合，同时不显得过于销售化。\n\n通用传记读起来像简历。"我是一名持证生活教练，有 10 年经验"什么也说不出来。相反，从一个具体时刻开始。"我在自己的职业倦怠改变了我对工作的看法后开始做教练。"或者"我的客户通常是需要帮助设定边界的疲惫专业人士。"细节很重要，因为它们帮助访客自我选择。读到 burnout 恢复的人立刻知道你是否是合适的教练。\n\n推荐是简短的引用。案例研究是迷你故事。两者都有价值，但服务不同目的。"与 Sarah 合作改变了我的生活"这样的推荐很温暖但模糊。案例研究则讲述前后：客户当时处境如何，教练过程是什么样的，以及什么改变了。两者都用。推荐用于主页的社会证明。案例研究放在专门部分或博客文章中。\n\n到 Dynamic Profile（dynamic-profile.shop）构建你的教练主页，或查看定价页面获取计划详情。',
      en: 'Coaches and trainers face a unique challenge: your product is yourself. Unlike product companies, you cannot ship features or run A/B tests on pricing. What you can control is how you present yourself online.\n\nA service professional homepage needs three things that product pages do not: ① Credibility signals — certifications, client testimonials, years of experience; ② Personality — visitors need to feel they would enjoy working with you; ③ Clear next steps — booking a call, downloading a guide, or sending a message. The best coach homepages blend all three without feeling salesy.\n\nGeneric bios read like resumes. "I am a certified life coach with 10 years of experience" tells nothing about what it is like to work with you. Instead, lead with a specific moment. "I started coaching after my own career burnout changed how I thought about work." Details matter because they help visitors self-select. Someone reading about burnout recovery knows immediately whether you are the right coach.\n\nTestimonials are short quotes. Case studies are mini-stories. Both have value, but they serve different purposes. "Working with Sarah changed my life" is warm but vague. A case study walks through the before, during, and after. Use both. Testimonials for social proof on the homepage. Case studies in a dedicated section or blog posts.\n\nBuild your coach homepage on Dynamic Profile (dynamic-profile.shop) or check the pricing page for plan details.',
    },
  },
  {
    id: 11,
    slug: 'update-personal-site-posts',
    tag: { zh: '指南', en: 'Guide' },
    publishedAt: '2026-08-29',
    title: { zh: '个人主页也要"更新"：动态内容的力量', en: 'Your Homepage Should Update: The Power of Posts' },
    date: { zh: '2026 年 8 月', en: 'August 2026' },
    body: {
      zh: '很多人建完个人主页就把它扔到一边，仿佛一张主页建好就永远不需要再看它了。但事实恰恰相反：一个长期有效的个人主页，恰恰需要持续的更新。动态内容不是可有可无的装饰，而是让主页"活"起来的核心机制。\n\n为什么更新很重要？访客记住的是"你还在做事"，不是"你曾经做过事"。一个三年没更新的页面，即使内容曾经很出色，也会传递出"这个人已经不在这个领域活跃了"的信号。反之，一个最近两周有更新的页面，哪怕内容不算完美，也会让人愿意相信你现在还能交付。\n\n动态内容包含哪些？第一，新作品：最近完成的项目、设计、文章或代码仓库，放一张图加一段说明。第二，动态日志：最近在学什么、参加了什么活动、读了什么书。第三，状态更新：你目前是否开放合作、正在找工作、或准备发布新产品。\n\n在 dynamic-profile 上，更新动态内容非常简单。不需要懂代码，不需要部署，只需要在后台添加一篇新帖子，它就会出现在主页的动态区。访客每次回来都能看到新内容，搜索引擎也会因为内容更新而重新抓取你的页面，这对个人品牌的长期可见性至关重要。\n\n很多人担心更新频率。不需要每天发，一周一次、两周一次就足够。关键是持续性：规律的更新比偶尔的大更新更有价值。访客会形成一个习惯——定期回来看看你又在做什么。\n\n个人主页不是墓碑，它是你当前状态的实时快照。让你的主页保持更新，就是让你的个人品牌保持鲜活。到 dynamic-profile.shop 开始搭建你的动态主页，或阅读三分钟上线教程了解更多。\n\nThe same logic applies in English: a homepage that hasn\'t been touched in years reads as abandoned, even if the content was once excellent. Regular updates signal that you are still active, still building, still worth paying attention to. Add a post every one or two weeks — a new project, a learning note, a status update — and watch your personal brand stay visible. Build yours on dynamic-profile.shop.',
      en: 'Many people build a personal homepage and then abandon it, as if one construction session is enough for life. The reality is the opposite: a homepage that stays effective over time depends on regular updates. Dynamic content is not decoration; it is the mechanism that keeps a page alive.\n\nWhy do updates matter? Visitors remember that you are still working, not that you worked once. A page untouched for three years sends the signal "this person is no longer active in this field." A page updated two weeks ago, even with imperfect content, tells visitors you can still deliver.\n\nWhat counts as dynamic content? First, new work: recently completed projects, designs, articles, or repos — one image with a short description. Second, activity logs: what you are learning, events you attended, books you read. Third, status updates: whether you are open to collaboration, looking for work, or preparing to launch something new.\n\nOn dynamic-profile, updating is straightforward. No code, no deployment — just add a new post in the backend and it appears in the updates section. Visitors always find something new, and search engines re-crawl your page because the content changed, which matters for long-term personal brand visibility.\n\nHow often? Once a week or once every two weeks is enough. Consistency beats occasional bursts. Visitors form a habit of returning to see what you are doing next.\n\nA personal homepage is not a tombstone. It is a live snapshot of your current state. Keep it updated, and your personal brand stays fresh. Start building on dynamic-profile.shop or read the three-minute launch guide for more.',
    },
  },
  {
    id: 12,
    slug: 'bilingual-homepages-international-brand',
    tag: { zh: '指南', en: 'Guide' },
    publishedAt: '2026-08-30',
    title: { zh: '双语主页：打造真正的国际化品牌', en: 'Bilingual Homepages: A Truly International Brand' },
    date: { zh: '2026 年 8 月', en: 'August 2026' },
    body: {
      zh: '在如今高度互联的世界里，拥有一个双语主页不再是有没有都行的加分项，而是触达全球受众的必要条件。无论你是开发者、设计师还是创作者，用多种语言展示你的作品，传递的是专业性和包容性。\n\n为什么双语很重要？首先，你的潜在受众直接翻倍。那些原本可能错过你内容的中文使用者，现在可以用自己的方式与你互动。其次，展示翻译投入意味着尊重你的国际受众，传递的信息是"我足够重视你，愿意用你的语言交流"。\n\n技术实现上，推荐使用 Next.js 配合 next-intl 或类似方案。关键页面如首页、关于页、联系页建议专业翻译，其他页面可以用机器翻译加人工审核。记住，导航、标题、价值主张这些核心内容一定要人工翻译。\n\n常见错误包括：翻译质量差（差的翻译比不翻译更伤人）、忽视文化语境（英文能打动人的例子中文可能不适用）、更新不一致（一种语言更新了另一种还停留在过去）、忘记移动端（双语站点内容更多，移动端适配很重要）。\n\n到 Dynamic Profile 构建你的双语主页，让作品在国际舞台发光。',
      en: 'In today\'s connected world, having a bilingual homepage is no longer optional — it is essential for reaching a global audience. Whether you are a developer, designer, or creator, presenting your work in multiple languages signals professionalism and inclusivity.\n\nWhy does bilingual matter? First, your potential audience doubles. Chinese speakers who might otherwise miss your content can now engage with you on their terms. Second, showing translation effort demonstrates respect for your international audience. It says "I value you enough to speak your language."\n\nOn the technical side, Next.js with next-intl is a solid choice. Key pages like homepage, about, and contact should use professional translation. Other pages can use machine translation with human review. Remember, navigation, headlines, and value propositions need human translation.\n\nCommon mistakes include poor translation quality (bad translation hurts more than no translation), ignoring cultural context (what works in English may not resonate in Chinese), inconsistent updates (one language updates while another stays stale), and forgetting mobile (bilingual sites have more content, so mobile适配 is critical).\n\nBuild your bilingual homepage on Dynamic Profile and let your work shine on the global stage.',
    },
  },

  {
    id: 13,
    slug: 'bilingual-homepages',
    publishedAt: '2026-08-31',
    tag: { zh: '教程', en: 'Tutorial' },
    title: { zh: '多语言主页：中英双语个人品牌', en: '' },
    date: { zh: '2026 年 8 月', en: 'August 2026' },
    body: {
      zh: `<p><strong>主关键词：</strong> 中英双语主页</p>
<p><strong>长尾关键词：</strong> bilingual personal site, english chinese portfolio, 个人品牌 双语</p>
<p><strong>日期：</strong> 2026-08-31</p>
<p>---</p>
<p>在全球化时代，一个双语个人主页不再只是"加分项"，而是必需品。无论你是在寻找国际客户、申请海外职位，还是建立跨国品牌，双语主页都是你数字形象的关键组成部分。</p>
<h2>为什么双语主页重要</h2>
<p><strong>更广泛的受众：</strong></p>
<p>中文内容触达华语社区，英文内容触达全球开发者、设计师和客户。两个市场，一次投资。</p>
<p><strong>专业形象：</strong></p>
<p>双语能力本身就是一种信号——你理解跨文化沟通，你愿意为不同受众调整信息。</p>
<p><strong>SEO 优势：</strong></p>
<p>中英双语内容覆盖更多搜索词，提升你在两个搜索引擎生态中的可见度。</p>
<h2>双语主页的设计原则</h2>
<p><strong>1. 内容对等，不重复</strong></p>
<p>中文和英文内容应该是"对等"的——传达相同的信息，但使用相同的语言风格和文化语境。不要简单翻译，要本地化。</p>
<p><strong>2. 明确的切换机制</strong></p>
<p>语言切换按钮应该明显、易用。用户不应该在两个语言版本之间迷路。</p>
<p><strong>3. 一致的视觉设计</strong></p>
<p>中英文版本应该保持相同的视觉风格、排版和用户体验。切换语言不应该感觉像访问了两个不同的网站。</p>
<p><strong>4. 文化敏感度</strong></p>
<p>某些内容在一种文化中有效，在另一种文化中可能无效甚至冒犯。确保内容经过文化审查。</p>
<h2>Dynamic Profile 的双语支持</h2>
<p>Dynamic Profile 从第一天起就支持双语内容。你可以：</p>
<li>为每个模块设置中英文版本</li>
<li>独立管理语言内容</li>
<li>自动处理语言检测和重定向</li>
<li>使用 SEO 友好的 hreflang 标签</li>
<h2>常见错误</h2>
<p><strong>机器翻译依赖：</strong></p>
<p>避免完全依赖机器翻译。高质量的双语内容需要人工编写或深度编辑。</p>
<p><strong>内容不对等：</strong></p>
<p>英文版过于详细，中文版过于简略——这种不平衡会让读者感到困惑。</p>
<p><strong>忽视移动端：</strong></p>
<p>双语内容在移动端显示时，字体大小、行高、布局都需要调整。</p>
<h2>FAQ</h2>
<p><strong>Q: 我应该先做中文还是英文版本？</strong></p>
<p>A: 根据你的目标受众决定。如果主要服务中国市场，先做中文。如果面向国际，先做英文。但最好同时规划两个版本。</p>
<p><strong>Q: 双语内容会增加多少工作量？</strong></p>
<p>A: 大约增加 50-70% 的内容创作时间。但可以通过模板和组件复用减少。</p>
<p><strong>Q: 搜索引擎如何处理双语内容？</strong></p>
<p>A: 正确的 hreflang 标签帮助搜索引擎理解内容语言，确保每个语言版本出现在正确的搜索结果中。</p>
<p><strong>Q: 我可以用不同语言面向不同地区吗？</strong></p>
<p>A: 是的，Dynamic Profile 支持基于用户位置的语言检测和重定向。</p>
<h2>关于 Dynamic Profile</h2>
<p>Dynamic Profile 帮助你创建杂志风格的个人主页，支持中英文双语内容。三分钟上线，无需代码。访问 [dynamic-profile.shop](/) 开始创建你的双语主页。</p>
<p>---</p>`,
      en: `<p><strong>Main Keyword:</strong> bilingual portfolio</p>
<p><strong>Long-tail Keywords:</strong> bilingual personal site, english chinese portfolio, personal branding bilingual</p>
<p><strong>Date:</strong> 2026-08-31</p>
<p>---</p>
<p>In a globalized era, a bilingual personal homepage is no longer just a "nice to have" — it's a necessity. Whether you're seeking international clients, applying for overseas positions, or building a cross-border brand, a bilingual homepage is a key component of your digital presence.</p>
<h2>Why Bilingual Homepages Matter</h2>
<p><strong>Wider Audience:</strong></p>
<p>Chinese content reaches the Chinese-speaking community, English content reaches global developers, designers, and clients. Two markets, one investment.</p>
<p><strong>Professional Image:</strong></p>
<p>Bilingual capability itself is a signal — you understand cross-cultural communication, you're willing to adapt messaging for different audiences.</p>
<p><strong>SEO Advantage:</strong></p>
<p>Bilingual content covers more search terms, increasing your visibility in both search engine ecosystems.</p>
<h2>Design Principles for Bilingual Homepages</h2>
<p><strong>1. Content Equivalence, Not Duplication</strong></p>
<p>Chinese and English content should be "equivalent" — conveying the same information but using the appropriate language style and cultural context. Don't just translate; localize.</p>
<p><strong>2. Clear Switching Mechanism</strong></p>
<p>Language switch buttons should be prominent and easy to use. Users shouldn't get lost between language versions.</p>
<p><strong>3. Consistent Visual Design</strong></p>
<p>Chinese and English versions should maintain the same visual style, typography, and user experience. Switching languages shouldn't feel like visiting two different websites.</p>
<p><strong>4. Cultural Sensitivity</strong></p>
<p>Some content works in one culture but not another — or may even offend. Ensure content is culturally reviewed.</p>
<h2>Dynamic Profile's Bilingual Support</h2>
<p>Dynamic Profile has supported bilingual content from day one. You can:</p>
<li>Set Chinese and English versions for each module</li>
<li>Manage language content independently</li>
<li>Auto-handle language detection and redirection</li>
<li>Use SEO-friendly hreflang tags</li>
<h2>Common Mistakes</h2>
<p><strong>Machine Translation Dependence:</strong></p>
<p>Avoid relying entirely on machine translation. High-quality bilingual content requires human writing or deep editing.</p>
<p><strong>Content Imbalance:</strong></p>
<p>English version too detailed, Chinese version too brief — this imbalance confuses readers.</p>
<p><strong>Ignoring Mobile:</strong></p>
<p>When bilingual content displays on mobile, font size, line height, and layout all need adjustment.</p>
<h2>FAQ</h2>
<p><strong>Q: Should I start with Chinese or English version?</strong></p>
<p>A: Decide based on your target audience. If primarily serving the Chinese market, start with Chinese. If targeting international, start with English. But it's best to plan both versions simultaneously.</p>
<p><strong>Q: How much additional work does bilingual content require?</strong></p>
<p>A: Approximately 50-70% more content creation time. But can be reduced through templates and component reuse.</p>
<p><strong>Q: How do search engines handle bilingual content?</strong></p>
<p>A: Proper hreflang tags help search engines understand content language, ensuring each language version appears in the correct search results.</p>
<p><strong>Q: Can I target different regions with different languages?</strong></p>
<p>A: Yes, Dynamic Profile supports language detection and redirection based on user location.</p>
<h2>About Dynamic Profile</h2>
<p>Dynamic Profile helps you create magazine-style personal homepages with bilingual content support. Launch in three minutes, no code required. Visit [dynamic-profile.shop](/) to start building your bilingual homepage.</p>`,
    },
  },
  {
    id: 15,
    slug: '7-pillars-of-personal-branding',
    publishedAt: '2026-09-02',
    tag: { zh: '教程', en: 'Tutorial' },
    title: { zh: '个人品牌的 7 个支柱', en: 'The 7 Pillars of Personal Branding' },
    date: { zh: '2026 年 9 月', en: 'September 2026' },
    body: {
      zh: `个人品牌不是关于创造一个人设。它是关于识别和放大使你成为你的核心元素。

把你的个人品牌想象成一座建筑。没有支柱，它会倒塌。有了坚固的支柱，它会高耸并支持你建造的一切。

个人品牌的 7 个支柱

1. 真实性——基础。你的品牌必须忠于你是谁。虚假的人设会在压力下崩溃。真实性意味着拥有你的优势，承认你的弱点，并在各平台上保持一致。

2. 专业知识——价值主张。你知道别人不知道的什么？你的专业知识是你的竞争优势。它可能是技术技能、行业知识或独特的视角。

3. 一致性——粘合剂。无论某人是在 LinkedIn、你的网站还是在会议上遇到你，你的品牌应该感觉很熟悉。一致的信息、视觉身份和语气建立认可和信任。

4. 可见性——触达。如果你的品牌无人知晓，那毫无意义。可见性来自于定期露面、分享你的作品和与你的受众互动。

5. 关系——网络。个人品牌不是独自完成的。它是通过与他人的联系建立的。导师、同行和关注者都为你的品牌生态系统做出贡献。

6. 演变——成长。你的品牌不是静态的。随着你的成长，你的品牌也应该演变。最好的个人品牌在适应的同时保持忠于他们的核心价值观。

7. 影响力——目的。你想造成什么不同？你的品牌应该服务于超越你自身的目的。无论是帮助他人学习、解决问题还是创造机会，影响力给你的品牌意义。

构建你的品牌支柱从回答这些问题开始：我的核心价值观是什么？我希望因什么技能而闻名？我的目标受众是谁？我希望人们在与我互动时有什么感受？你的答案成为你品牌支柱的基础。

Dynamic Profile 让你在一个地方展示所有七个支柱。与静态简历或社交媒体个人资料不同，个人网站可以随着你而演变，以连贯的方式展示你的专业知识、项目和个性。

你的品牌是你的故事。确保它值得讲述。`,
      en: `Personal branding isn't about creating a persona. It's about identifying and amplifying the core elements that make you, you.

Think of your personal brand as a building. Without pillars, it collapses. With strong pillars, it stands tall and supports everything else you build.

The 7 pillars of personal branding:

1. Authenticity — The Foundation. Your brand must be true to who you are. Fake personas crumble under pressure. Authenticity means owning your strengths, acknowledging your weaknesses, and staying consistent across platforms.

2. Expertise — The Value Proposition. What do you know that others don't? Your expertise is your competitive advantage. It could be technical skills, industry knowledge, or a unique perspective.

3. Consistency — The Glue. Your brand should feel familiar whether someone encounters you on LinkedIn, your website, or at a conference. Consistent messaging, visual identity, and tone build recognition and trust.

4. Visibility — The Reach. Your brand means nothing if no one knows it exists. Visibility comes from showing up regularly, sharing your work, and engaging with your audience.

5. Relationships — The Network. Personal branding isn't solo. It's built through connections with others. Mentors, peers, and followers all contribute to your brand ecosystem.

6. Evolution — The Growth. Your brand isn't static. As you grow, your brand should evolve too. The best personal brands adapt while staying true to their core values.

7. Impact — The Purpose. What difference do you want to make? Your brand should serve a purpose beyond yourself. Whether it's helping others learn, solving problems, or creating opportunities, impact gives your brand meaning.

Building your brand pillars starts by answering these questions: What are my core values? What skills do I want to be known for? Who is my target audience? How do I want people to feel when they interact with me? Your answers become the foundation for your brand pillars.

A dynamic profile lets you showcase all seven pillars in one place. Unlike static resumes or social media profiles, a personal website can evolve with you, displaying your expertise, projects, and personality in a cohesive way. Your brand is your story. Make sure it's worth telling.`,
    },
  },
  {
    id: 16,
    slug: 'tone-and-personality-homepage',
    publishedAt: '2026-09-03',
    tag: { zh: '观点', en: 'Opinion' },
    title: { zh: '与受众对话：主页语气与人格', en: 'Tone & Personality: Talking to Your Audience on Your Page' },
    date: { zh: '2026 年 9 月', en: 'September 2026' },
    body: {
      zh: `大多数个人主页读起来像是由一个从未见过你的委员会写的。语法没问题，但完全记不住："充满热情的设计师"、"交付创新解决方案"、"很高兴分享我的旅程"。这种主页语气不会主动伤害你——它只会让访客在八秒后停止阅读。

主页的声音，是"被人扫过"和"被人记住"之间的区别。而且不同于 logo 或配色，改语气的成本是零。你今天坐下来改一次就能见效。

为什么语气比设计更重要

访客的判断很快。眼动研究反复得出同一个结论：大多数人在一页上读到的词不到 20%。他们扫你的标题、第一句自我介绍、一条项目描述和联系按钮——这四个位置承载了你全部的人格。如果四处都很模板化，你读起来就是模板，哪怕作品很出色。

还有信任效应。一句具体、有立场的文案（"我给生鲜 App 设计结算流程"）证明背后有真人。一句放之四海皆准的话，谁都能写，包括模板本身。2026 年 AI 文本铺天盖地，"听起来像真人"的门槛只会更高。

三组可以直接抄的改写

1. 自我介绍那一句。
改前："我是一名充满热情的前端工程师，拥有 5 年以上现代 Web 应用开发经验。"
改后："这五年我一直在让 React 应用变快。卡顿的后台系统是我的私人仇敌。"
第一句能套在一万个人头上，第二句只可能是你。

2. 项目描述。
改前："该项目展示了我在 UI 设计和响应式布局方面的能力。"
改后："重新设计了一家诊所的预约表单，每天有 200 位患者填写。把 11 个字段砍到 6 个之后，中途放弃率下降了三分之一。"
事实和数字自带人格，"展示了我的能力"什么也不带。

3. 行动按钮。
改前："欢迎随时联系，探讨潜在的合作机会。"
改后："在招人？给我发邮件，一个工作日内必回。"
语气也包括按钮。"欢迎随时"是没人要求的许可；一个具体的承诺才是自信。

语气住在主页的哪几个位置

四个地方，按影响力排序：

标题。说清你为谁做什么，用大白话。"给独立书店做网站"胜过"用热情打造的数字体验"。

自我介绍的第一句。先给具体的主张，再谈形容词。

项目描述。一句结果，一句背景。欢迎放数字。

按钮和链接文字。"看诊所这个项目"胜过"了解更多"——它告诉人家要去哪。

你不需要讲段子，也不必堆网络流行语。语气不等于幽默。安静、精确的文风也是一种声音。如果你本人写字偏干，一个偏干的主页反而显得诚实，完全没问题。真正杀死一个页面的不是文风平淡，而是内容空泛。

什么时候该收着写

有些受众惩罚"放飞"。如果你面对的是银行、律所或政府相关客户，去掉玩笑，保留具体——上面的改写一个口语词都不用也能成立。英语是第二语言的话，别硬用你自己开会都不会说的俚语，蹩脚的随意比干净的正式更减分。

还有一条：别掉进"假随意"的坑。"嘿，流浪者，欢迎来到我的小角落"只是另一件戏服。按你向站在旁边的客户解释工作的方式来写，就够了。

一次 20 分钟的语气体检

打开你的主页，做四件事：

把标题改到能点名一类具体受众或工作。

把简介里每个形容词（"热情""专注""有创造力"）换成一个事实。

给每条项目描述加一个数字：用户数、省下的时间、营收、工期。

把联系按钮从"邀请"改写成"承诺"。

最后把整页朗读一遍。任何一句你对真人说不出口的话，重写它。测试就这一个。

关于 Dynamic Profile

Dynamic Profile（dynamic-profile.shop）是一个无需代码的杂志风个人主页生成器，内置博客与中英双语支持，三分钟即可上线。如果你正在重写主页的声音，建议先读主页必备要素指南（/blog/5-key-elements-memorable-homepage）和个人品牌七支柱（/blog/7-pillars-of-personal-branding），然后把改好的语气直接发布到你自己的 dynamic-profile.shop 主页上。`,
      en: `Most personal homepages read like they were written by a committee that has never met you. The grammar is fine and the words are completely forgettable: "passionate designer", "delivering innovative solutions", "excited to share my journey". A personal page tone like that doesn't actively hurt you — it just makes visitors stop reading after eight seconds.

Your homepage voice is the difference between a page people skim and a page people remember. And unlike a logo or a color scheme, tone costs nothing to change. You can fix it in one editing session today.

Why tone matters more than design

Visitors decide fast. Eye-tracking studies keep landing on the same conclusion: most people read fewer than 20% of the words on a page. They scan your headline, your first bio line, one project description, and the contact button. Those four spots carry your entire personality. If all four sound generic, you read as generic — even if your work is excellent.

There's also a trust effect. A specific, opinionated line ("I design checkout flows for grocery apps") proves a human wrote it. A generic one could have come from anyone, including a template. In 2026, with AI text everywhere, the bar for "sounds like a real person" has only moved up.

Three rewrites you can steal

1. The bio line.
Before: "I'm a passionate frontend developer with 5+ years of experience building modern web applications."
After: "I've spent five years making React apps load faster. Slow dashboards are my personal enemy."
The first sentence could describe ten thousand people. The second could only describe you.

2. The project blurb.
Before: "This project demonstrates my skills in UI design and responsive layout."
After: "Redesigned a clinic booking form that 200 patients fill in daily. Drop-off fell by a third after we cut it from 11 fields to 6."
Facts and numbers carry personality. "Demonstrates my skills" carries nothing.

3. The call to action.
Before: "Feel free to reach out to discuss potential opportunities."
After: "Hiring? Email me. I answer within one working day."
A personal tone of voice includes your buttons. "Feel free" is permission nobody asked for; a concrete promise is confidence.

Where tone lives on your page

Four places, in order of impact:

The headline. Say what you do and for whom, in plain words. "Websites for independent bookshops" beats "Digital experiences crafted with passion".

The first bio sentence. Lead with a specific claim, not an adjective.

Project blurbs. One sentence of outcome, one of context. Numbers welcome.

Button and link labels. "See the clinic project" beats "Learn more" — it tells people where they're going.

You don't need jokes or slang. Tone is not the same thing as humor. A quiet, precise voice is still a voice. If your natural writing is dry, a dry homepage reads as honest — that's fine. What kills pages is not a bland style but vague content.

When to keep the volume down

Some audiences punish looseness. If you pitch banks, law firms, or government-adjacent clients, drop the jokes and keep the specificity — the rewrites above work without a single casual word. If English is your second language, don't force idioms you wouldn't use in a meeting; awkward casualness reads worse than clean formality.

And skip the fake-casual trap: "hey wanderer, welcome to my little corner of the internet" is just another costume. Write the way you'd explain your work to a client standing next to you.

A 20-minute tone pass

Open your homepage and make four edits:

Rewrite the headline so it names a specific audience or type of work.

Replace every adjective in your bio ("passionate", "dedicated", "creative") with a fact.

Add one number to each project blurb — users, hours saved, revenue, deadlines.

Rewrite the contact button as a promise, not an invitation.

Then read the page out loud once. Any sentence you would never say to a real person, rewrite it. That's the whole test.

About Dynamic Profile

Dynamic Profile (dynamic-profile.shop) is a no-code builder for magazine-style personal homepages, with a built-in blog and bilingual support — launch in three minutes. If you're reworking your voice, start with the homepage essentials guide (/blog/5-key-elements-memorable-homepage) and the personal branding pillars post (/blog/7-pillars-of-personal-branding), then publish the result on your own page at dynamic-profile.shop.`,
    },
  },
  {
    id: 17,
    slug: 'lightweight-seo-for-personal-sites',
    publishedAt: '2026-09-04',
    tag: { zh: `指南`, en: `Guide` },
    title: { zh: `让主页被搜到：个人站的轻量 SEO`, en: `Lightweight SEO for Personal Sites` },
    date: { zh: `2026 年 9 月`, en: `September 2026` },
    body: {
      zh: `大多数个人主页从没出现在搜索结果里，原因很少是能力问题，而是主人把 SEO 当成了只有大博客才需要的事。个人站 SEO 比你想的轻：几下改动，花一个下午，能管好几年。

为什么个人主页值得做 SEO

作品集或个人站，是全网你唯一完全掌控的页面。当客户或猎头搜你名字时，你想让这一页排在最上面。轻量 SEO，就是"碰巧被找到"和"被主动找到"之间的差别。

从搜索引擎真正读的三件事做起

- 页面标题：放上人们真正搜的词，比如"里斯本摄影师"或"Python 开发者作品集"，而不只是你的名字。
- 标题层级：一个清楚的 H1，再用 H2 对应访客会问的问题。
- 图片命名：上传前把 portfolio-01.jpg 改成 lisbon-wedding-ceremony.jpg。

这些都不需要装插件，每个花十分钟。

一份轻量页面清单

1. 写一句话，大白话说明你帮谁、怎么帮。
2. 主关键词放进标题、第一段、和一个小标题里。
3. 加内链，连到你的作品、关于页、联系页。
4. 提交到搜索控制台，让收录更快。

做到这几点，你的个人主页就从隐形变成可搜到。

作品集 SEO 和完整博客的区别

个人站 SEO 比运营内容站窄。你不用每天发文章，只要让一个强页面，为几个意图明确的词排上去。这是更小、更轻松的活，也正好适配无代码生成器。

我在自己页面上改了什么

我把每张图都改了名，在头图下面写了一句大白话，再把作品集连到联系页。两周后，页面开始出现在"我的名字 + 我提供的服务"的搜索里。没找代理，没买月费工具。

Dynamic Profile 在哪

Dynamic Profile（dynamic-profile.shop）是无代码、杂志风的个人主页生成器，支持双语和内置博客。如果你想把 SEO 基本盘交给工具、自己专注作品，可以先看页面要点指南（/blog/5-key-elements-memorable-homepage），再看讲用动态保持站点新鲜的那篇（/blog/update-personal-site-posts），然后在 dynamic-profile.shop 发布你自己的主页。

常见问题

问：做个人站 SEO 需要开博客吗？
答：不需要。一个结构清晰的页面，就能为你的名字和服务排上名次。只有你真会持续更新，博客才有用。

问：个人站多久能在 Google 出现？
答：提交到搜索控制台后，通常几周。好的标题和图片命名能加速，但收录本身需要时间。

问：作品集 SEO 和普通网站不一样吗？
答：更窄。你只瞄准几个意图明确的词，而不是每天发文，所以这是更小、更轻松的活。

问：无代码生成器也能做 SEO 吗？
答：能。标题、层级、图片命名、内链这些基本盘，在无代码平台同样有效。Dynamic Profile 不用写代码就能处理好。`,
      en: `Most personal sites never show up in search, and the reason is rarely talent. It is that the owner treated SEO as something only big blogs need. Personal site SEO is lighter than you think: a handful of fixes that take an afternoon and keep paying off for years.

Why a personal homepage deserves SEO

A portfolio or personal site is the one place on the web you fully control. When a client or recruiter Googles your name, this is the page you want on top. Lightweight SEO is the difference between found by accident and found on purpose.

Start with the three things search engines actually read

- Your page title: use the real phrase people search, like "photographer in Lisbon" or "Python developer portfolio", not just your name.
- Your headings: one clear H1, then H2s that match the questions your visitors ask.
- Your image names: rename portfolio-01.jpg to lisbon-wedding-ceremony.jpg before uploading.

None of these need a plugin. They need ten minutes each.

A tiny on-page checklist

1. Write one sentence that says who you help and how, in plain words.
2. Use your main keyword in the title, the first paragraph, and one heading.
3. Add internal links to your work, your about page, and your contact page.
4. Submit the page to search consoles so it gets indexed faster.

Do this and your personal homepage becomes findable instead of invisible.

Portfolio SEO versus running a blog

Personal site SEO is narrower than running a content site. You are not publishing daily. You are making one strong page rank for a few intent-rich phrases. That is a smaller, easier job, and it fits a no-code builder perfectly.

What I changed on my own page

I renamed every image, wrote one plain-English sentence under the hero, and linked my portfolio to my contact page. Two weeks later the page showed for my name plus the service I offer. No agency, no monthly tool.

Where Dynamic Profile fits

Dynamic Profile (dynamic-profile.shop) is a no-code builder for magazine-style personal homepages, with bilingual support and a built-in blog. If you want the SEO basics handled while you focus on the work, start with the page essentials guide (/blog/5-key-elements-memorable-homepage) and the post about keeping your site fresh with updates (/blog/update-personal-site-posts), then publish your own at dynamic-profile.shop.

FAQ

Q: Do I need a blog for personal site SEO?
A: No. One well-structured page can rank for your name and your service. A blog helps only if you will actually post.

Q: How long until a personal site shows in Google?
A: Often a few weeks after you submit it to a search console. Good titles and image names speed it up, but indexing still takes time.

Q: Is portfolio SEO different from a normal website?
A: It is narrower. You target a few intent-rich phrases instead of publishing daily, which makes it a smaller and easier job.

Q: Can a no-code builder do SEO?
A: Yes. The basics, titles, headings, image names, and internal links, work on no-code platforms too. Dynamic Profile handles them without code.`,
    },
  },
  {
    id: 18,
    slug: 'one-page-everywhere-ending-card-anxiety',
    publishedAt: '2026-09-06',
    tag: { zh: '指南', en: 'Guide' },
    title: { zh: '名片焦虑终结者：一张主页发遍全网', en: 'One Page, Everywhere: Ending the Card Anxiety' },
    date: { zh: '2026 年 9 月', en: 'September 2026' },
    body: {
      zh: `名片焦虑是真的：你明明只想给一个人一个能找到你的方式，结果微信、邮箱、小红书、GitHub、个人站……塞了五六个，对方一个都没记住。这篇讲怎么用一张 digital business card（数字名片）把这些都收口，一个链接，发遍全网。

## 名片焦虑从哪来

问题不在你没有联系方式，而在它们散落在八个平台。别人要加你，得先决定去哪个平台搜你；搜完还要判断哪个账号是真的你。每一步都在流失。焦虑的本质，是"我该给你哪个"这件事你自己也没想清。

## 一张主页，一个链接

解法很朴素：把所有身份收进一张个人主页，再只对外发那一个地址。Dynamic Profile 的主页把作品、动态、社交链接聚在一页，你印在名片和简历上的，永远是同一个 URL。

- 一个链接代替五个：微信、邮箱、GitHub、店铺，全收进主页。
- 链接稳定：改了简介不用重发，URL 永远不变。
- 体面：比一排图标更像"一个人"，而不是"一堆账号"。

## 怎么把链接发出去

有了主页，下一步是让它出现在所有该出现的地方。三个高频位最值得先占：

1. 简历和名片：联系方式直接换成主页 URL。
2. 各平台简介栏：把"主页链接"统一成同一个。
3. 邮件签名：一行字，放主页地址。

这一步做完，"分享哪条"的焦虑就消失了，你只有一条。

## 数字名片 vs 链接页

链接页（Linktree 那类）只解决问题的一半：它收了链接，但没有内容。别人点进去看到一排按钮，对你的认知停留在"这人有几个账号"。数字名片式的主页先展示你，再给链接，它是你的门面，不是目录。

## 常见问题

问：一张主页真的够用吗？
答：对绝大多数人够用。作品、动态、联系方式都在一页，访客从上滑到下就认识了你。想更深再开博客。

问：链接换了怎么办？
答：主页 URL 不变，你只改主页里的内容。不用通知任何人，旧链接依然有效。

问：免费版能做数字名片吗？
答：能。免费版就支持全部模块，把主页当数字名片发出去完全够用。

## 关于 Dynamic Profile

Dynamic Profile（dynamic-profile.shop）是无代码、杂志风的个人主页生成器，支持双语和内置博客，三分钟上线。先把你的联系方式收进一张主页，再读读"你的 @handle 就是你的数字名片"（/blog/your-handle-digital-business-card）那篇，然后把唯一的主页链接印到所有地方。免费版就够用，不用升级。`,
      en: `Card anxiety is real: you just want to give one person a way to find you, yet you end up handing over WeChat, email, Xiaohongshu, GitHub, a personal site — five or six of them, and the other person remembers none. This post is about collapsing all of that into one digital business card: a single link you can send everywhere.

## Where card anxiety comes from

The problem isn't that you lack contact details. It's that they're scattered across eight platforms. To add you, someone has to decide which platform to search, then judge which account is really you. Every step leaks attention. The anxiety is really about not having settled, yourself, which link to give.

## One homepage, one link

The fix is plain: pull every identity into one personal homepage, then hand out only that address. A dynamic-profile homepage gathers your work, your updates, and your social links on a single page, so the URL on your card and resume is always the same one.

- One link instead of five: WeChat, email, GitHub, store — all live on the homepage.
- The link stays put: edit your bio without re-sending anything; the URL never changes.
- It looks like a person: a column of icons reads as "a bunch of accounts," a homepage reads as "someone."

## Where to put the link

Once the homepage exists, the next job is showing up in the right places. Three spots are worth claiming first:

1. Resume and business card: swap the contact line for the homepage URL.
2. Every platform bio: make the "link" field the same everywhere.
3. Email signature: one line, the homepage address.

Do this and the "which link do I send" anxiety disappears — you only have one.

## Digital business card vs link page

A link page (the Linktree kind) solves half the problem: it collects links but has no content. People who click see a column of buttons and learn little beyond "this person has a few accounts." A digital-business-card homepage shows you first, then gives the links — it's your front door, not a directory.

## FAQ

Q: Is one homepage really enough?
A: For most people, yes. Work, updates, and contact details sit on one page; a visitor knows you after one scroll. Open a blog later if you want more depth.

Q: What if I change my links?
A: The homepage URL doesn't change; you only edit what's inside it. Nobody needs a new link, and the old one still works.

Q: Can the free plan be my digital business card?
A: Yes. The free plan supports every module, so sending your homepage out as a card is more than enough.

## About Dynamic Profile

Dynamic Profile (dynamic-profile.shop) is a no-code builder for magazine-style personal homepages, with bilingual support and a built-in blog — live in three minutes. Gather your contact details onto one homepage first, then read the post on your @handle as a digital business card (/blog/your-handle-digital-business-card), and put that one homepage link everywhere. The free plan is enough;     no upgrade needed.`,
    },
  },

  {
    id: 37,
    slug: 'ai-personal-branding-tools-2026',
    publishedAt: '2026-09-08',
    tag: { zh: '技巧', en: 'Tips' },
    title: { zh: '2026 年最实用的 AI 个人品牌工具推荐', en: 'Top AI Personal Branding Tools for 2026' },
    date: { zh: '2026 年 9 月', en: 'September 2026' },
    body: {
      zh: `在个人品牌建设越来越重要的今天，AI 工具成为了每个专业人才的必备武器。2026 年，AI 个人品牌工具已经从简单的内容生成器进化为全方位的品牌管理平台。

## AI 内容创作工具

### ChatGPT Plus 与 Claude Pro
这两款 AI 助手是目前最强大的个人品牌内容创作工具。它们不仅能帮你写博客、社交媒体帖子，还能帮你规划内容日历、优化 SEO 关键词。

### Jasper AI
Jasper 专为营销人员设计，提供大量品牌模板和语调调整功能。对于需要保持统一品牌声音的专业人士来说，Jasper 是理想选择。

## AI 视觉设计工具

### Canva AI
Canva 的 AI 功能让你无需设计背景就能创建专业级的品牌素材。从 Logo 设计到社交媒体配图，AI 都能帮你快速生成。

### Midjourney V6
对于需要独特视觉内容的个人品牌，Midjourney 能生成高质量的图像素材，让你的品牌在视觉上脱颖而出。

## AI 内容优化与分析

### Surfer SEO
AI 驱动的内容优化工具，帮你分析竞争对手内容，提供具体的优化建议，让每篇内容都能获得更好的搜索排名。

### Grammarly Business
不仅是语法检查，Grammarly 的 AI 还能帮你调整语气、提升专业度，确保你的品牌内容在所有平台上保持一致。

## 如何选择适合自己的 AI 工具？

选择 AI 工具时，考虑以下因素：
1. **你的品牌定位**：专业严肃的品牌适合 ChatGPT 和 Jasper，创意品牌可以考虑 Midjourney
2. **预算范围**：从免费工具到专业订阅，选择适合你预算的方案
3. **学习曲线**：选择界面友好、易上手的工具
4. **集成需求**：确认工具能否与你现有的工作流集成

## 未来趋势

2026 年，AI 个人品牌工具将继续向以下方向发展：
- 更智能的个性化推荐
- 多平台内容同步发布
- 实时数据分析与优化建议
- 自动化内容日历管理

无论是自由职业者、创业者还是企业员工，选择合适的 AI 工具都能显著提升个人品牌的建立效率。`,
      en: `In today's world where personal branding is increasingly important, AI tools have become essential weapons for every professional. In 2026, AI personal branding tools have evolved from simple content generators to comprehensive brand management platforms.

## AI Content Creation Tools

### ChatGPT Plus and Claude Pro
These two AI assistants are currently the most powerful personal branding content creation tools. They can not only help you write blog posts and social media content, but also plan content calendars and optimize SEO keywords.

### Jasper AI
Jasper is designed specifically for marketers, offering numerous brand templates and tone adjustment features. For professionals who need to maintain consistent brand voice, Jasper is an ideal choice.

## AI Visual Design Tools

### Canva AI
Canva's AI features let you create professional-grade brand materials without a design background. From logo design to social media graphics, AI can help you generate content quickly.

### Midjourney V6
For personal brands that need unique visual content, Midjourney can generate high-quality image materials, helping your brand stand out visually.

## AI Content Optimization and Analytics

### Surfer SEO
An AI-driven content optimization tool that helps you analyze competitor content and provides specific optimization suggestions, ensuring each piece of content achieves better search rankings.

### Grammarly Business
Not just grammar checking — Grammarly's AI can also help you adjust tone and improve professionalism, ensuring your brand content remains consistent across all platforms.

## How to Choose the Right AI Tools?

When selecting AI tools, consider these factors:
1. **Your brand positioning**: Professional brands suit ChatGPT and Jasper, creative brands might prefer Midjourney
2. **Budget range**: From free tools to professional subscriptions, choose what fits your budget
3. **Learning curve**: Select tools with user-friendly interfaces
4. **Integration needs**: Confirm the tool can integrate with your existing workflow

## Future Trends

In 2026, AI personal branding tools will continue to evolve in these directions:
- Smarter personalized recommendations
- Multi-platform content synchronization
- Real-time data analysis and optimization suggestions
- Automated content calendar management

Whether you're a freelancer, entrepreneur, or corporate employee, choosing the right AI tools can significantly improve the efficiency of building your personal brand.`,
    },

  },

  {
    id: 38,
    slug: 'vs-bento-grid-magazine',
    publishedAt: '2026-09-10',
    tag: { zh: '对比', en: 'Comparison' },
    title: { zh: '对比 Bento：网格还是杂志排版？', en: 'vs Bento: Grid or Magazine Layout?' },
    date: { zh: '2026年9月', en: 'September 2026' },
    body: {
      zh: `### 对比 Bento：网格还是杂志布局？

Bento.me 已成为创作者的首选个人网站构建器，但它适合每个人吗？这是与 Dynamic Profile 的诚实对比。

#### 什么是 Bento？

Bento 是一个可视化、拖拽式的个人网站构建器，专注于"便当盒"网格布局。每个卡片是一个组件——简介、社交链接、项目、嵌入。它快速、可视化，无需编码。

#### Dynamic Profile vs Bento：关键差异

| 功能 | Bento.me | Dynamic Profile |
|------|----------|-----------------|
| 布局 | 网格/便当卡片 | 杂志/滚动 |
| 自定义 | 有限主题 | 完全设计控制 |
| 博客 | 基础 | 功能完整 |
| 价格 | 免费+Pro（$12/月）| 免费+Pro（$8/月）|
| 编码需求 | 无 | 可选（高级）|
| SEO | 基础 | 高级（JSON-LD、canonical）|
| 多语言 | 无 | 有 |
| 分析 | 基础 | 高级 |

#### Bento 适合谁

- 想要快速可视化作品集的设计师
- 不想碰代码的创作者
- 偏好便当网格美学的人
- 需要零维护的人

#### Dynamic Profile 适合谁

- 想要内容优先网站的博主
- 想要完全自定义的开发者
- 多语言网站（EN + ZH）
- 想要开箱即用的高级 SEO
- 建设有深度的个人品牌的人

#### 结论

Bento 在速度和视觉吸引力上获胜。Dynamic Profile 在灵活性、SEO 和长期可扩展性上获胜。如果你需要博客或多语言内容，Dynamic Profile 是更好的选择。如果你只需要 10 分钟内一个漂亮的作品集，Bento 也可以。

#### 关于 dynamic-profile.shop

以你的方式构建个人网站。访问我们的[首页](/)免费开始，或查看我们的[定价](/pricing)获取 Pro 功能。`,
      en: `## English Version

Bento.me has become the go-to personal site builder for creators, but is it the right choice for everyone? Here's an honest comparison with Dynamic Profile.

### What Is Bento?

Bento is a visual, drag-and-drop personal site builder focused on the "bento box" grid layout. Each card is a widget — bio, social links, projects, embeds. It's fast, visual, and requires zero coding.

### Dynamic Profile vs Bento: Key Differences

| Feature | Bento.me | Dynamic Profile |
|---------|----------|-----------------|
| Layout | Grid/bento cards | Magazine/scroll |
| Customization | Limited themes | Full design control |
| Blog | Basic | Full-featured blog |
| Cost | Free tier + Pro ($12/mo) | Free + Pro ($8/mo) |
| Coding needed | None | Optional (advanced) |
| SEO | Basic | Advanced (JSON-LD, canonical) |
| Multi-language | No | Yes |
| Analytics | Basic | Advanced |

### Who Bento Is For

- Designers who want a quick, visual portfolio
- Creators who don't want to touch code
- People who prefer the bento grid aesthetic
- Those who want zero maintenance

### Who Dynamic Profile Is For

- Bloggers who want a content-first site
- Developers who want full customization
- Multi-language sites (EN + ZH)
- People who want advanced SEO out of the box
- Those building a personal brand with depth

### The Verdict

Bento wins on speed and visual appeal. Dynamic Profile wins on flexibility, SEO, and long-term scalability. If you need a blog or multilingual content, Dynamic Profile is the better pick. If you just need a pretty portfolio in 10 minutes, Bento is fine.

### About dynamic-profile.shop

Build your personal site your way. Visit our [homepage](/) to start for free, or check our [pricing](/pricing) for Pro features.

---`,
    },
  },
  {
    id: 39,
    slug: 'vs-beacons-selling-vs-branding',
    publishedAt: '2026-09-11',
    tag: { zh: '对比', en: 'Comparison' },
    title: { zh: '对比 Beacons：卖货 vs 立人设', en: 'vs Beacons: Selling vs Branding' },
    date: { zh: '2026年9月', en: 'September 2026' },
    body: {
      zh: `Beacons 和 Dynamic Profile 都能给你一个 link-in-bio 页面，但相似之处也就到此为止。一个为卖货而生，一个为展示一个人而生。选错了，你每周都要跟工具较劲。

### Beacons 优化什么

Beacons 起家是商店，默认布局推着你放商品卡、打赏按钮、结账入口。如果你的收入来自卖数字商品，这种偏向是优点：页面就是想要成交。

代价是 Beacons 页面看起来像家店。每个区块都在要你做决定。对一个靠品味吃饭的作者或设计师来说，这个第一印象是错的。

### Dynamic Profile 优化什么

Dynamic Profile 从个人资料出发，而不是购物车。你搭出来的页面读起来像作品集：你是谁、做过什么、怎么联系你。也能卖东西，但成交从来不是页面上最响的声音。

如果你做的东西在被理解之后就能自己卖出去，这就是对的默认值。先立人设，再谈成交。

### 对比表

| 维度 | Beacons | Dynamic Profile |
|------|---------|-----------------|
| 首要目标 | 卖产品 | 展示一个人 |
| 默认布局 | 商品网格 | 作品集分区 |
| 适合 | 数字商品、周边 | 写作者、设计师、顾问 |
| 可定制程度 | 受模板限制 | 布局级控制 |
| 上手难度 | 极低 | 低 |
| 不适合 | 你没有东西可卖 | 你开的是店 |

### 五分钟做决定

只问一个问题：访客落到你页面上时，你要他买，还是要他懂？答案是买，用 Beacons；答案是懂，用 Dynamic Profile。如果两者都要，就在 Beacons 上卖，再链到一个 Dynamic Profile 讲故事。

### 要避免的错误

别让一个工具干另一个的活。Beacons 硬掰成作品集模式，像一家熄了灯的店。Dynamic Profile 塞满商品卡，像一本宣传册上焊了个收银机。

### 常见问题

#### 之后能迁移吗？
可以。两边本质都是 link-in-bio 页面，内容是可携带的。真正的工作量在于重新决定首屏放什么。

#### Dynamic Profile 支持收款吗？
支持外链收款。如果你需要页面内结账，Beacons 更合适。

### 关于 dynamic-profile.shop

以你的方式搭个人网站。访问[首页](/)免费开始，或看[定价](/pricing)了解 Pro 功能。`,
      en: `Beacons and Dynamic Profile both hand you a link-in-bio page. That is where the similarity stops. One is built to sell. The other is built to present a person. Pick the wrong one and you fight it every week.

### What Beacons optimizes for

Beacons started life as a storefront. Its defaults push product cards, tip jars, and checkout. If your income comes from digital goods, that bias is a feature: the page wants a transaction.

The cost is that a Beacons page reads like a shop. Every section asks for a decision. For a writer or a designer whose value is taste, that is the wrong first impression.

### What Dynamic Profile optimizes for

Dynamic Profile starts from the profile, not the cart. You build something that reads like a portfolio: who you are, what you have made, how to reach you. Commerce is possible, but it is never the loudest thing on the page.

That is the right default when your work sells itself once people understand it. Brand first, transaction second.

### The comparison

| Dimension | Beacons | Dynamic Profile |
|-----------|---------|-----------------|
| Primary goal | Sell products | Present a person |
| Default layout | Product grid | Portfolio sections |
| Best for | Digital goods, merch | Writers, designers, consultants |
| Customization | Template-bound | Layout-level control |
| Learning curve | Very low | Low |
| Wrong fit if | You sell nothing | You run a store |

### How to decide in five minutes

Ask one question: when someone lands on your page, do you want them to buy, or to understand? If the answer is buy, use Beacons. If it is understand, use Dynamic Profile. If you need both, sell on Beacons and link to a Dynamic Profile for the story.

### The mistake to avoid

Do not make one tool do the other's job. A Beacons page forced into portfolio mode looks like a shop with the lights off. A Dynamic Profile page stuffed with product cards reads like a brochure with a cash register bolted on.

### FAQ

#### Can I migrate from Beacons later?
Yes. Both are link-in-bio pages, so your content is portable. The real work is re-deciding what sits above the fold.

#### Does Dynamic Profile support payments?
It supports linking out to payment. If you need an in-page checkout, Beacons is the better fit.

### About dynamic-profile.shop

Build a personal site your way. Visit our [homepage](/) to start free, or see [pricing](/pricing) for Pro features.`,
    },
  },
  {
    id: 40,
    slug: 'personal-site-builder-landscape',
    publishedAt: '2026-09-12',
    tag: { zh: '盘点', en: 'Roundup' },
    title: { zh: '个人站生成器全景：一图看懂 8 款工具', en: 'The Personal Site Builder Landscape: 8 Tools Mapped' },
    date: { zh: '2026 年 9 月', en: 'September 2026' },
    body: {
      zh: `挑个人站生成器之所以让人头大，是因为这个品类悄悄吞并了三种不同的产品：link-in-bio 页面、单页作品集、以及带自定义域名的完整博客。如果拿一张功能清单去比，它们看起来都差不多。换个角度，按「它默认你手上有多少内容」来分类，候选会在几分钟内缩到两三个。本文就是这张地图，覆盖八款工具，外加一个用来筛选的问题。

## 这个品类到底包含什么

三种形态占主流。link-in-bio 工具默认你只需要一页加一串跳转入口。作品集生成器默认你有作品要展示、有客户要说服。带 CMS 的建站工具默认你会持续发布，并且指望搜索流量。有些产品横跨两种形态，而恰恰是这个交叠区让大多数对比文章写歪了。什么都做一点的工具，通常在你最要紧的那件事上做得比专才差。

## 八款工具，一张图看清

下表按主要形态、免费档、以及它明确不做的事来排序。

| 工具 | 主要形态 | 免费档 | 自定义域名 | 最擅长 |
|------|----------|--------|------------|--------|
| Dynamic Profile | 个人资料 + CMS | 有 | 有 | 中英双语的个人站，带真正的博客 |
| Bento | 网格作品集 | 有 | 有 | 视觉化卡片布局 |
| Beacons | link-in-bio 商店 | 有 | 有 | 快速卖数字商品 |
| Carrd | 单页站点 | 有 | 付费 | 一小时内上线单页 |
| Notion + Super | Notion 托管站点 | 有 | 付费 | 本来就活在 Notion 里的人 |
| Framer | 设计优先站点 | 有 | 有 | 像素级设计控制 |
| Linktree | link-in-bio | 有 | 付费 | 最快开始 |
| WordPress | CMS 站点 | 有（自托管） | 有 | 大规模长文发布 |

## 按场景挑最好的个人网站生成器

没有通用冠军，只有匹配与否。按月更新内容的人，从带 CMS 的工具起步，比如 Dynamic Profile 或 WordPress。作品以视觉为主、长期不怎么变的人，网格类工具当天就能上线。靠卖数字产品吃饭的人，先选商店型工具，收款路径最短。

## 自己做一轮首页工具盘点

与其读十篇评测，不如自己跑一遍，一个晚上足够。

1. 写下你最想让陌生人复述的那句话
2. 判断这句话需要的是一页，还是一个持续更新的列表
3. 只挑两款匹配的工具，其余六款直接忽略
4. 用同一个晚上，在两款里各搭一遍
5. 留下那款一小时之后你不再跟它较劲的

## FAQ

**2026 年个人站要花多少钱？**
免费档通常够放一个单页。想绑自定义域名、加页面、开分析，一般落在每月 8 到 20 美元这个区间，Dynamic Profile 的 Pro 在这个区间的低位。

**一定要自定义域名吗？**
如果你的站要挂在职业身份上用，要。子域名读起来像草稿。上面多数工具在付费档支持绑定。

**以后能换工具吗？**
多数可以。把文案存成一个纯文本文件，图片放一个文件夹，迁移就是一个下午的事，而不是重写。

## 关于 dynamic-profile.shop

以你的方式搭个人网站。从[首页](/)免费开始，在[博客](/blog)看更多拆解，需要自定义域名和更多分区时再看[定价](/pricing)。上面八款没有排名，因为答案取决于你现在要的是一页，还是一个习惯。`,
      en: `Choosing among personal site builders gets confusing fast, because the category quietly swallowed three different products: link-in-bio pages, one-page portfolios, and full blogs on a custom domain. Compare them on a feature grid and everything looks the same. Map them by what they assume about your content instead, and the choice narrows to two or three candidates within minutes. This is that map, covering eight tools and the one question that sorts them.

## What the category actually contains

Three shapes dominate. Link-in-bio tools assume you want one page and a list of destinations. Portfolio builders assume you have work to show and a client to convince. Site builders with a CMS assume you will publish regularly and want search traffic. A few products straddle two shapes, and that overlap is where most comparison articles go wrong. A tool that does a little of everything usually does your primary job worse than a specialist does.

Shape also predicts your maintenance load. A one-page site can go two years without an edit and still look current. A feed demands updates, and an empty feed damages trust more than a stale page does. Before you pick a tool, decide how often you are honestly willing to publish, then let that answer eliminate half of this list.

## The eight tools, mapped

The table sorts each tool by its main shape, its free tier, and the job it declines to do.

| Tool | Primary shape | Free tier | Custom domain | Strongest at |
|------|---------------|-----------|---------------|--------------|
| Dynamic Profile | Profile plus CMS | Yes | Yes | Bilingual personal site with a real blog |
| Bento | Grid portfolio | Yes | Yes | Visual, card-based layouts |
| Beacons | Link-in-bio store | Yes | Yes | Selling digital goods quickly |
| Carrd | Single-page site | Yes | Paid | One-page sites live within an hour |
| Notion + Super | Notion-hosted site | Yes | Paid | People who already live in Notion |
| Framer | Design-first site | Yes | Yes | Pixel-level design control |
| Linktree | Link-in-bio | Yes | Paid | The fastest possible start |
| WordPress | CMS site | Yes (self-hosted) | Yes | Long-form publishing at scale |

Two patterns jump out. Custom domains used to be a premium feature and are now standard on a free tier, which removes the main reason people once upgraded. Paid tiers now sell volume instead of legitimacy: more pages and more detailed analytics. That shift is good news if you are starting today, because the single-page version of every tool here is genuinely usable.

## Finding the best personal website builders for your case

There is no universal winner, only a match or a mismatch. If you publish monthly or more, start with a CMS tool such as Dynamic Profile or WordPress. If your work is visual and stays mostly still, a grid tool gets you live the same day. If a digital product pays your bills, pick a storefront tool first, because the path to payment is shortest there. One more test: open the tool on your phone. Half of these products feel pleasant on a desktop and clumsy on mobile, and most of your visitors will arrive on a phone.

## Run your own homepage tool roundup

Reading ten reviews takes longer than testing two tools yourself, and one evening is enough.

1. Write the single sentence you want a stranger to repeat about you
2. Decide whether that sentence needs a page or a feed
3. Pick two matching tools and ignore the other six
4. Build the same page in both over one evening
5. Keep the one you stopped fighting after an hour

## FAQ

**What should a personal site cost in 2026?**
Expect a free tier that covers a single page, and a paid tier between $8 and $20 per month for a custom domain, extra pages, and analytics. Dynamic Profile keeps Pro near the low end of that range.

**Do I need a custom domain?**
Yes if the site carries your name professionally. A subdomain reads as a draft. Most tools above let you attach a domain on the paid tier.

**Can I move to another tool later?**
Usually yes. Keep your copy in one plain text file and your images in one folder, and migration becomes an afternoon rather than a rewrite.

## About dynamic-profile.shop

Build a personal site your way. Start from the [homepage](/) for free, read more breakdowns on the [blog](/blog), or check [pricing](/pricing) when you need a custom domain and extra sections. The eight tools above are not ranked, because the right pick depends on whether you are building a page or a habit.`,
    },
  },
  {
    id: 41,
    slug: 'vs-carrd-magazine-layout',
    publishedAt: '2026-09-09',
    tag: { zh: '对比', en: 'Comparison' },
    title: { zh: '对比 Carrd：当你想更“杂志”一点', en: 'vs Carrd: When You Want More "Magazine"' },
    date: { zh: '2026年9月', en: 'September 2026' },
    body: {
      zh: `Carrd 很适合简单的单页网站。但如果你想要更多编辑感，它就使不上劲了。这篇对比帮你看清什么时候该选 Dynamic Profile，什么时候不该。

## Carrd 强在哪

Carrd 快、便宜、干净：
- 五分钟以内就能搭好
- 单页模板本身就很好看
- Pro 一年 $19
- 做一个 link-in-bio 页面够用

如果这份清单正好是你要的，可以直接用 Carrd。

## Dynamic Profile 走得更远的地方

**1. 编辑式布局**
Carrd 停在单页。Dynamic Profile 支持多区块布局，有杂志式网格、特色内容区和清晰的视觉层级。

**2. 装得下真正的内容**
Carrd 做信息页很稳。Dynamic Profile 做作品集、博客、案例研究，布局不会散架。

**3. 对排版和留白的控制**
Carrd 让你调整模板。Dynamic Profile 让你控制字体、间距和层级。

**4. 更完整的观感**
杂志式布局读起来像被精心编排过。对创意工作者、顾问、以及靠网站撑职业第一印象的人来说，这一点很重要。

## 继续用 Carrd 的情况

- 你只需要一个简单的链接页
- 搭建速度比设计深度更重要
- 预算是决定性因素
- 你永远只做一页

## 换到 Dynamic Profile 的情况

- 你想要杂志式布局
- 你需要多个内容区块
- 设计质感是你品牌的一部分
- 你在展示创意作品

## 功能对比

| 功能 | Carrd | Dynamic Profile |
|------|-------|-----------------|
| 页面 | 1-3 | 无限 |
| 布局 | 单页 | 多区块 |
| 模板 | 50+ | 30+ 编辑式 |
| 自定义 | 中等 | 深度 |
| 博客 | 无 | 有 |
| 定价 | $19/年 | 免费/Pro |

## 结论

Carrd 适合快速、简单的网站。Dynamic Profile 适合那种应该读起来像一本精心编排的杂志的个人网站：有层次，经过考虑。

## 常见问题

### 能把 Carrd 站点导入 Dynamic Profile 吗？
不能直接导入。你要在 Dynamic Profile 编辑器里重做内容。简单站点大约半小时。

### Dynamic Profile 比 Carrd 贵吗？
Dynamic Profile 有免费档。Pro 起价有竞争力，不少用户觉得多出来的区块值这个价。

### 做作品集哪个更好？
Dynamic Profile 就是为杂志式作品集布局做的。Carrd 在这方面弱一些。

## 关于 dynamic-profile.shop

搭建你的杂志式个人网站。访问[首页](/)开始，或看[定价](/pricing)了解 Pro。`,
      en: `Carrd is excellent for simple one-page sites. It is the wrong tool when you want an editorial feel. This comparison shows when Dynamic Profile is the better pick, and when it is not.

## Where Carrd wins

Carrd is fast, cheap, and clean:
- Setup in five minutes or less
- One-page templates that already look good
- $19 a year for the Pro plan
- A solid link-in-bio page

If that list matches your job, use Carrd and move on.

## Where Dynamic Profile goes further

**1. Editorial layouts**
Carrd stays on a single page. Dynamic Profile supports multi-section layouts with magazine-style grids, a featured area, and a clear visual hierarchy.

**2. Room for real content**
Carrd handles an info page well. Dynamic Profile handles portfolios, blogs, and case studies without the layout falling apart.

**3. Control over type and space**
Carrd lets you adjust a template. Dynamic Profile gives you control over typography, spacing, and hierarchy.

**4. A more finished look**
The magazine layout reads as curated. That matters for creatives, consultants, and anyone whose site carries a professional first impression.

## Stay on Carrd if

- You need one simple link page
- Setup speed matters more than design depth
- Budget is the deciding factor
- One page is all you will ever build

## Move to Dynamic Profile if

- You want a magazine-style layout
- You need several content sections
- Design quality is part of your brand
- You are showing creative work

## Feature comparison

| Feature | Carrd | Dynamic Profile |
|---------|-------|-----------------|
| Pages | 1-3 | Unlimited |
| Layout | Single page | Multi-section |
| Templates | 50+ | 30+ editorial |
| Customization | Moderate | Deep |
| Blog | No | Yes |
| Pricing | $19/year | Free/Pro |

## The verdict

Carrd is the right choice for a quick, simple site. Dynamic Profile is for a personal site that should read like a curated magazine: layered and considered.

## FAQ

### Can I import my Carrd site to Dynamic Profile?
Not directly. You recreate the content in the Dynamic Profile editor. A simple site takes about 30 minutes.

### Is Dynamic Profile more expensive than Carrd?
Dynamic Profile has a free tier. Pro starts at a competitive price, and many users find the extra sections worth it.

### Which is better for portfolios?
Dynamic Profile is built for portfolios with magazine-style layouts. Carrd does less here.

## About dynamic-profile.shop

Build your magazine-style personal site. Visit [dynamic-profile.shop](/) to start, or see [pricing](/pricing) for Pro.`,
    },
  },
{
  "id": 42,
  "slug": "themes-colors-pro-custom-color",
  "publishedAt": "2026-09-14",
  "tag": {
    "zh": "教程",
    "en": "Tutorial"
  },
  "title": {
    "zh": "主题与配色：用好 Pro 的自定义颜色",
    "en": "Themes & Colors: Getting Real Use Out of Pro Custom Color"
  },
  "date": {
    "zh": "2026年9月",
    "en": "September 2026"
  },
  "body": {
    "zh": "Pro 的自定义配色面板看起来是个小功能，用起来却是个大功能。它决定了你的页面\"像一张模板\"还是\"像某个具体的人\"。\n\n## 这个面板到底控制什么\n\n只有三项设置，但它们互相影响：\n\n- **强调色。** 用在链接、按钮，以及引导视线的小高亮上。\n- **表面色。** 卡片和区块的底色。\n- **对比度模式。** 文字与表面色之间拉开多少。\n\n多数人只改强调色，然后纳闷为什么还是显得很一般。强调色是最响的那个旋钮，也是最不重要的那个。\n\n## 从表面色开始，而不是强调色\n\n在你读到一个字之前，表面色就已经决定了页面偏暖、偏冷还是中性。先把表面色定下来，饱和度压低；然后选一个明显比表面色更饱和的强调色。如果两者强度相当，页面就会显得吵，而且靠排版是救不回来的。\n\n一条实用规则：表面色控制在接近中性，把全部色彩预算花在强调色上。一个用得克制的强色，胜过三个到处用的中等色。\n\n## 对比度是可用性决定，不是审美决定\n\n对比度模式是唯一会影响真实读者的选项。文字与表面色分得清，在日光下的手机屏幕上就读得下去。如果你为了\"柔和\"调低对比度，发之前到户外看一眼。在明亮显示器上看着很平静的配色，在手机上可能根本读不了。\n\n## 三套不会出错的配色\n\n- **中性表面 + 单一暖色强调。** 编辑感、平静，很难做坏。\n- **冷灰表面 + 高饱和强调。** 技术感、精确，适合内容密集的作品集。\n- **带色调的表面 + 低饱和强调。** 柔和、私人，但需要更高的对比度模式才够清晰。\n\n避开第四种：深色表面配深色强调。在编辑器里看着很有氛围，到小屏幕上就变成一整团灰。\n\n## 十分钟工作流\n\n1. 先定表面色，饱和度压低。\n2. 选一个强调色，只用在链接和按钮上。\n3. 设好对比度模式，然后在手机满亮度下预览。\n4. 离开一小时再回来，看看还有没有哪个地方显得吵。\n5. 存下这套配色，在所有区块复用，让整页读起来是一套设计。\n\n## 常见问题\n\n### 自定义配色需要 Pro 吗？\n自定义配色属于 Pro 功能。免费档包含内置主题，那些主题的对比度已经调好，如果还没试过，建议先从内置主题入手。\n\n### 之后改颜色会打乱版式吗？\n不会。颜色和版式是分开的，改配色不会移动任何区块。这是刻意的设计：意味着你可以在上线前一周把整页重新配色，而不用重做结构。\n\n### 个人主页用几种颜色合适？\n一个强调色加一个中性表面，其余交给照片和作品本身。颜色和你的作品抢的越多，作品就越不容易被记住。\n\n## 关于 dynamic-profile.shop\n\n在 dynamic-profile.shop 上搭建你的杂志式个人站点，字体、间距、配色都能自己控制。从[首页](/)开始，Pro 的配色面板在[定价页](/pricing)有说明，免费档足够先把版式试出来。",
    "en": "Pro's custom color panel looks like a small feature and behaves like a large one. It is the difference between a page that looks like a template and one that looks like it belongs to a specific person.\n\n## What the panel actually controls\n\nThere are three settings, and they interact:\n\n- **Accent color.** Used for links, buttons and the small highlights that guide the eye.\n- **Surface tint.** The base colour your cards and sections sit on.\n- **Contrast mode.** How far the text separates from the surface.\n\nMost people change only the accent and wonder why the result still feels generic. The accent is the loudest control and the least important one.\n\n## Start with the surface, not the accent\n\nThe surface decides whether the page feels warm, cool, or neutral before a single word is read. Pick the surface first, at low saturation, then choose an accent that is clearly more saturated than the surface. If both are equally strong, the page reads as noisy and no amount of layout work fixes it.\n\nA practical rule: keep the surface within a few percent of neutral and spend all your colour budget on the accent. One strong colour, used sparingly, outperforms three medium ones used everywhere.\n\n## Contrast is a readability decision, not a taste decision\n\nContrast mode is where people make the only choice that affects real users. Text that separates well from its surface is easier to read on a phone in daylight. If you drop contrast to make a page feel softer, check it outdoors before you publish. What looks calm on a bright monitor can be unreadable on a phone.\n\n## Three palettes that work\n\n- **Neutral surface, single warm accent.** Reads editorial and calm. Hard to get wrong.\n- **Cool grey surface, saturated accent.** Reads technical and precise. Good for portfolios with dense content.\n- **Tinted surface, muted accent.** Reads soft and personal. Needs higher contrast mode to stay legible.\n\nAvoid the fourth one: dark surface with a dark accent. It looks moody in the editor and turns into a single grey mass on a smaller screen.\n\n## A ten-minute workflow\n\n1. Pick the surface first and keep saturation low.\n2. Choose one accent and use it for links, buttons and nothing else.\n3. Set contrast mode, then preview on your phone at full brightness.\n4. Walk away for an hour, come back and check whether anything still feels loud.\n5. Save the palette, then reuse it across every section so the page reads as one design.\n\n## FAQ\n\n### Do I need Pro for custom colors?\nCustom color is a Pro feature. The free tier covers the built-in themes, which are already tuned for contrast, so if you have not tried those first, start there.\n\n### Can I change colors later without breaking my layout?\nYes. Colors are separate from layout, so changing the palette never moves a block. That is deliberate: it means you can restyle the whole page the week before a launch without redoing the structure.\n\n### How many colors should a personal page use?\nOne accent plus a neutral surface, and let photography or work samples supply everything else. The more your colours compete with your work, the less memorable the work becomes.\n\n## About dynamic-profile.shop\n\nBuild your magazine-style personal site with full control over type, spacing and colour. Start at [dynamic-profile.shop](/) — the Pro colour panel is documented on the [pricing page](/pricing), and the free tier is enough to test the layout first."
  }
},
  {
    id: 42,
    slug: 'mobile-first-responsive-design',
    publishedAt: '2026-09-15',
    tag: { zh: '设计', en: 'Design' },
    title: { zh: '手机端才是主战场：响应式设计的意义', en: 'Mobile-First Reality: Why Responsive Matters' },
    date: { zh: '2026 年 9 月', en: 'September 2026' },
    body: {
      zh: `你的个人主页有多少访问来自手机？对多数人来说答案是七成以上，而设计时间几乎全花在桌面端预览上。

## 先看真实数据

个人主页的流量结构和大站不同。访问者大多来自社交平台的链接，点开时人在手机前站着、排队、或者躺在床上。桌面端访问主要来自两种情况：你自己检查页面，或者潜在的客户在正式场合看你。

两种访问者都需要照顾，但比例差得很远。

## 响应式保的是内容，不是布局

很多人把响应式理解为「小屏自动缩小」。那不是响应式，那是缩放。真正的响应式保证的是：在任何宽度下，最重要的内容仍然第一眼看到。

## 手机上最容易出问题的三处

1. 首屏信息过多。桌面上两列排开的简介、头像、链接，在手机上会堆成三屏。访客在第一屏看不到重点就走了。
2. 点击目标太小。桌面端舒服的按钮在手机上是误触来源。拇指的接触面积比鼠标指针大得多。
3. 图片没做尺寸适配。一张桌面上好看的横幅图，在手机上会被裁掉一半，或者拖慢加载。

## 一个简单的检查方法

在真实手机上打开你的主页，关掉 WiFi 用一次流量。这时候你会看到访客看到的东西：加载时间、首屏内容、按钮是否好点。桌面浏览器模拟器不会告诉你这些。

## 常见问题

**手机端要单独做一版吗？** 不需要，也不建议。响应式一套代码适配所有宽度，维护成本更低。

**字体在手机上要多小？** 正文不要低于 16 像素。低于这个数，iOS 会自动放大页面，布局随之破损。

**图片要准备几个尺寸？** 至少两个：一个给手机，一个给桌面。用 srcset 让浏览器自己选。

从手机视角重新看一遍你的主页，在 dynamic-profile.shop 上开一个页面就能立刻验证。`,
      en: `How much of your personal homepage traffic comes from a phone? For most people the answer is more than seventy percent, while nearly all the design time goes into checking the desktop preview.

## Look at the real numbers first

The traffic pattern for a personal homepage is different from a large site. Visitors arrive from a link on a social platform, phone in hand, standing in a queue or lying in bed. Desktop visits come from two situations: you checking your own page, and a potential client looking at you in a formal setting.

Both matter, but the proportions are far apart.

## Responsive protects the content, not the layout

Many people read responsive as "it shrinks on small screens". That is scaling, not responsive design. Real responsive work guarantees that at any width, the most important content is still the first thing you see.

## The three places phones break first

1. Too much in the first screen. A bio, avatar and links laid out in two columns on desktop will stack into three screens on a phone. Visitors who cannot see the point in screen one leave.
2. Touch targets that are too small. A button that feels comfortable with a mouse is a source of mis-taps on a phone. A thumb covers far more area than a pointer.
3. Images without size adaptation. A banner that looks good on desktop gets cropped in half on a phone, or slows the load to a crawl.

## One check that tells you more than any tool

Open your homepage on a real phone with WiFi off, using mobile data once. You will see what visitors see: load time, first-screen content, and whether the buttons are easy to hit. A desktop browser emulator will not tell you any of that.

## FAQ

**Do I need a separate mobile version?** No, and it is a bad idea. One responsive codebase covers every width and costs less to maintain.

**How small can body text go on a phone?** Never below 16 pixels. Under that, iOS zooms the page automatically and the layout breaks.

**How many image sizes do I need?** At least two: one for phones, one for desktop. Use srcset and let the browser choose.

Look at your homepage again from a phone. Open a page on dynamic-profile.shop and you can verify it immediately.`,
    },
  },
  {
    id: 43,
    slug: 'editorial-layout-grid-whitespace',
    publishedAt: '2026-09-13',
    tag: { zh: '设计', en: 'Design' },
    title: { zh: '杂志排版入门：栅格、留白与层级', en: 'Editorial Layout 101: Grids, Whitespace and Hierarchy' },
    date: { zh: '2026年9月13日', en: 'September 13, 2026' },
    body: {
      zh: `## 杂志排版和网页排版到底差在哪

杂志排版（editorial layout）解决的是一件事：让读者愿意从第一行读到下一行，再从这一段读到下一段。它不追求一屏放下所有信息，而是控制阅读的节奏。

个人主页最容易犯的错，是把所有内容塞进首屏，然后靠缩小字号来解决。杂志做法相反：先用栅格定骨架，再用留白切分节奏，最后用层级告诉眼睛先看哪里。

## 栅格先定，内容后填

栅格（grid layout）是列宽和间距的规则。常见的是 12 列，因为 12 能被 2、3、4、6 整除，一块内容可以轻松占 4 列、6 列或 8 列。

- 栏宽决定每行多少字。正文一行 45 到 75 个字符最好读。
- 沟槽决定呼吸感。列之间太窄，两块内容会黏在一起。
- 边距决定版面气质。边距大显得正式，边距小显得紧凑。

先画栅格，再把内容往上放。反过来做，最后一定在调间距上耗掉大部分时间。

## 留白光靠加间距是不够的

留白（whitespace）不是把 padding 调大。它是在内容之间制造层级差：段落之间要小，章节之间要大，章节标题上方要比下方大。

判断方法很简单：把页面缩小到看不清文字，如果还能看出结构，说明留白起了作用；如果缩下去变成一团灰，说明间距太平。

## 层级只做三档

层级（hierarchy）最容易失控。很多人会给标题做四种字号、三种字重、两种颜色，结果是每个标题都在喊。

三档就够：一个主标题，一个章节标题，一个正文。字号差至少要 1.5 倍才看得出来，字重不要同时变太多。层级是靠对比做出来的，不是靠变化数量。

## 常见问题

- 栅格会让版面死板吗？不会。栅格是骨架，不是模板。内容需要时可以跨列。
- 留白多了是不是浪费空间？在个人主页上，留白换来的是停留时间。
- 移动端怎么处理？先定单栏，再决定哪些块要并排，不要反过来。

想看看这套做法在真实页面上怎么用，回到[首页](/)看几个排版示例。`,
      en: `## What editorial layout actually solves

Editorial layout solves one problem: getting a reader to move from the first line to the next, and from that paragraph to the one after it. It is not about fitting everything above the fold. It is about controlling the pace of reading.

The most common mistake on personal sites is cramming everything into the first screen and then shrinking the type until it fits. Magazines do the opposite. The grid sets the skeleton, whitespace sets the rhythm, and hierarchy tells the eye where to land first.

## Set the grid before you place content

A grid is a rule for column widths and gaps. Twelve columns is the common choice, because 12 divides by 2, 3, 4 and 6, so a block can span 4, 6 or 8 columns without awkward remainders.

- Column width decides how many characters sit on a line. Body text reads best between 45 and 75 characters.
- The gutter decides breathing room. Columns too close together make separate blocks look glued.
- Margins set the tone. Wide margins read as formal, narrow margins read as dense.

Draw the grid first, then place content into it. Doing it the other way around means most of your time goes into nudging spacing at the end.

## Whitespace is not just extra padding

Whitespace is not about increasing padding. It is about creating a difference in level: small gaps between paragraphs, larger gaps between sections, and more space above a section heading than below it.

There is a simple test. Zoom the page out until the text is unreadable. If the structure is still visible, the whitespace is doing its job. If it collapses into a grey block, your spacing is too even.

## Hierarchy needs three levels, not six

Hierarchy is the easiest thing to lose control of. People end up with four heading sizes, three weights and two colors, and every heading is shouting.

Three levels are enough: one page title, one section heading, one body size. A size difference needs to reach roughly 1.5x to register, and you should not change weight and color at the same time. Hierarchy comes from contrast, not from the number of variations.

## FAQ

- Does a grid make a layout rigid? No. A grid is a skeleton, not a template. Blocks can span columns when the content needs it.
- Is whitespace wasted space? On a personal site, whitespace buys attention.
- How do you handle mobile? Set the single-column layout first, then decide which blocks sit side by side. Not the other way round.

To see how this plays out on a real page, look at the layout examples on the [home page](/).`,
    },
  },

  {
    id: 44,
    slug: "above-the-fold-design-rules",
    publishedAt: "2026-09-17",
    tag: { zh: "设计", en: "Design" },
    title: {
      zh: "首屏设计法则：第一屏决定转化",
      en: "Above the Fold: First-Screen Design Rules",
    },
    date: { zh: "2026 年 9 月", en: "September 2026" },
    body: {
      zh: "「首屏」（above the fold）指访问者不滚动就能看到的一切。对个人品牌页来说，这一屏决定了他会不会继续往下看。页面其余部分再完美，首屏没做好，几乎没人会知道。\n\n## 第一屏要完成的事\n\n首屏只有一个任务：赢得下一秒钟的注意力。三个元素承担了大部分工作：\n- 清晰的价值主张——一句话说清你是谁、交付什么，而不是一句口号。\n- 一个明确的动作——一个按钮（联系、作品集、订阅），而不是五个互相竞争的按钮。\n- 看得见的可信度——名字、面孔、一个关键数字，或别人认识你的 logo。\n\n这三样如果任何一样要滚动才能找到，说明页面在要求它还没挣到的努力。\n\n## 常见的首屏错误\n\n- 主标题在描述行业而不是描述你（「为现代商业提供创意解决方案」没有说任何关于你的信息）。\n- 导航挤占首屏。每多一个链接，都在向真正想要的那个决定收取小额的注意力税。\n- 动效延迟内容。一个 2 秒的 intro 可能赶走带着问题来的访问者。\n\n## 任何屏幕都成立的规则\n\n先设计单列的手机版布局，再往宽做。手机版逼你把顺序收紧，桌面版通常只需要加间距。主标题尽量控制在十个词以内，把动作按钮放在视线自然落下的位置——通常是主标题正下方，而不是埋在菜单里。\n\n## 怎么测试你的首屏\n\n打开页面，看三秒，然后回答两个问题：这个人做什么？我接下来该做什么？两个都答不上来，首屏就需要返工。一个快速的兜底检查：在手机上再做一次同样的测试——手机上的首屏要短得多。\n\n想看这些法则落地，可以在[首页](/)浏览布局示例，或阅读杂志式布局如何处理层级。",
      en: "Above the fold describes everything a visitor sees before scrolling — and for a personal-brand page, that first screen decides whether they scroll at all. The rest of your page can be perfect; if the fold fails, almost nobody finds out.\n\n## What the first screen must do\n\nThe fold has one job: earn the next second of attention. Three elements do the heavy lifting:\n- A clear value proposition — one sentence that says who you are and what you deliver, not a slogan.\n- One obvious action — a single button (contact, portfolio, newsletter) instead of five competing ones.\n- Proof within view — a name, a face, a headline number, or a logo people already know you by.\n\nIf any of these needs a scroll to find, the page is asking for effort it has not earned.\n\n## Common first-screen mistakes\n\n- Hero copy that describes the industry instead of the person ('Creative solutions for modern businesses' says nothing about you).\n- Navigation that crowds the fold. Every extra link is a small tax on the decision you actually want visitors to make.\n- Animation that delays content. A two-second intro can lose the visitor who arrived with a question.\n\n## Rules that hold up on any screen\n\nDesign the single-column mobile layout first, then widen it. Mobile forces you to keep the sequence tight, and desktop usually just needs spacing. Keep the headline under ten words where you can, and put the action button where the eye lands naturally — typically just under the headline, not buried in a menu.\n\n## How to test your fold\n\nLoad the page, look at it for three seconds, then answer two questions: what does this person do, and what am I supposed to do next? If you cannot answer both, the fold needs work. A quick sanity check: run the same test on a phone, because the fold is much shorter there.\n\nTo see these rules applied, browse the layout examples on the [home page](/), or read how the magazine layout handles hierarchy.",
    },
  },
  {
    id: 45,
    slug: "speaking-with-whitespace",
    publishedAt: "2026-09-19",
    tag: { zh: "设计", en: "Design" },
    title: {
      zh: "用留白说话：为什么空的地方也是设计",
      en: "Speaking with Whitespace: Empty Is Also Design",
    },
    date: { zh: "2026 年 9 月", en: "September 2026" },
    body: {
      zh: `留白不是空洞，是设计语言中最有力的一种表达。好的设计师知道何时该空出来，让内容自己说话。

## 留白是什么

留白是页面上未被内容占据的区域。它可以是白色背景，也可以是任何颜色。关键不在于颜色，而在于它是否存在、是否有意为之。

## 为什么留白重要

留白做三件事：引导视线、创造节奏、提升可读性。没有留白的页面像没有标点的文章——信息全都在，但你读起来很累。

## 个人品牌页的留白策略

首屏需要大量留白。价值主张、头像、行动按钮之间留出呼吸空间，访问者才能快速理解页面意图。内容区块之间用留白分隔，比用线条或背景色更优雅。

## 常见误区

- 害怕空白，用内容填满每个角落
- 留白不均匀，某些地方拥挤、某些地方空旷
- 忽略移动端留白，桌面版好看、手机版拥挤

## 怎么检查你的留白

把页面缩小到手机尺寸，看内容是否还能呼吸。如果文字互相挤压，留白就不够。

想查看更多设计技巧，可以在[首页](/)查看布局示例，或阅读关于层级设计的文章。`,
      en: `Whitespace is not empty space. It is one of the most powerful tools in a designer's vocabulary. Good designers know when to leave things empty and let the content speak for itself.

## What whitespace actually is

Whitespace is any area on the page that does not contain content. It can be white, or any other color. The key is not the color but the presence of intentional space.

## Why whitespace matters

Whitespace does three things: it guides the eye, creates rhythm, and improves readability. A page without whitespace is like an article without punctuation—all the information is there, but reading it is exhausting.

## Whitespace strategy for personal brand pages

The first screen needs generous whitespace. Leave breathing room between the value proposition, avatar, and call-to-action so visitors can quickly understand the page intent. Separate content sections with whitespace rather than lines or background colors for a more elegant result.

## Common mistakes

- Fear of blank space, filling every corner with content
- Uneven whitespace, some areas cramped while others feel empty
- Ignoring mobile whitespace, looking good on desktop but cramped on phone

## How to check your whitespace

Shrink the page to mobile width and see whether the content can still breathe. If text is crowding each other, you do not have enough whitespace.

To see these principles applied, browse the layout examples on the [home page](/), or read more about design hierarchy.`,
    },
  },

  {
    id: 46,
    slug: 'visual-rhythm-ordering-your-work-on-purpose',
    publishedAt: '2026-09-21',
    tag: { zh: '设计', en: 'Design' },
    title: { zh: '视觉节奏：如何安排作品顺序', en: 'Visual Rhythm: Ordering Your Work on Purpose' },
    date: { zh: '2026 年 9 月', en: 'September 2026' },
    body: {
      zh: '作品集不是把作品按时间堆起来就完事。访客的注意力在头三屏就决定了，而决定这头三屏的不是单件作品有多好，是你把它们排成什么顺序。这篇讲视觉节奏的四种基本手法，以及怎么用它组织一整页作品。',
      en: 'A portfolio is not a chronological dump of your work. Visitors decide in the first two or three screens, and what they see there is determined less by how good any single piece is than by the order you put them in. Here are four basic moves for building visual rhythm, and how to use them across a whole page.',
    },
  },

  {
    id: 47,
    slug: 'visitor-analytics-101-reading-data',
    publishedAt: '2026-09-23',
    tag: { zh: '分析', en: 'Analytics' },
    title: { zh: '访客分析入门：看懂你的主页数据', en: 'Visitor Analytics 101: Reading Your Data' },
    date: { zh: '2026 年 9 月', en: 'September 2026' },
    body: {
      zh: '访客分析不只是数字游戏。每一个访问背后都有一个故事。这篇指南帮助你像专业人士一样解读数据，理解访客行为，并做出明智的决策。',
      en: 'Visitor analytics is not just about numbers. It is about understanding the story behind each visit. This guide will help you interpret your data like a pro and make informed decisions about your content strategy.',
    },
  },

  {
    id: 48,
    slug: 'freelancer-website-homepage',
    publishedAt: '2026-10-02',
    tag: { zh: '自由职业', en: 'Freelance' },
    title: {
      zh: '客户问"你有官网吗"？主页就是答案',
      en: '"Do You Have a Website?" The Homepage Is the Answer',
    },
    date: { zh: '2026 年 10 月', en: 'October 2026' },
    body: {
      zh: `客户问「你有官网吗」，通常出现在他正在决定要不要信任你的那一刻，而多数自由职业者答得很糟：甩一个链接页、一份 PDF 作品集，或者一个网盘文件夹。这三种回答说的是同一件事——我有作品，但我没想好怎么呈现它。一个 freelancer 网站用对方提问的形式回答：一个地址，一页，一个站得住的整体印象。

## 他真正在问什么

没人问这句话是为了确认你有没有域名。他在问你好不好合作。这句话底下藏着三个更小的问题：我不问你能不能看到你做什么、能不能看出你现在接不接活、能不能不开会就找到付款方式。

PDF 作品集能回答第一个，但很慢。链接页一个都答不好，因为一排图标把排序的工作丢给了访客。主页能按客户的思考顺序把三个都答了。

## freelancer 网站的最低配置

第一天的 freelancer 网站不需要博客、不需要预约系统、也不需要独立域名。四个区块就覆盖了绝大多数情况：

- 一句话说清你服务谁、交付什么，用客户的话写，不要用行业黑话
- 三到五件作品，按意图排序，而不是按时间
- 一小段工作方式说明——周期、修改次数，或者第一周长什么样
- 一个按钮，联系或预约，放在视线扫过标题后落下的地方

其它都是可选项。页面失败的原因很少是只有四个元素，更多是有十二个互相打架的元素。

## 客户第一印象：三秒测试

client first impression 在任何一句话被读到之前就已经形成了。大约三秒之内，访客会判断这个页面是不是还在维护、这个人是不是真的、值不值得继续往下读。承载这个判断的是三个信号。

- 新鲜度。一条有日期的动态，或者一份在更新的项目列表，说明这门生意还在运转。
- 一张脸。署名的作品配上一个具体的人，比一个 logo 更像「可以被追责」。
- 克制。一个明确的动作胜过五个，因为五个动作意味着访客在还没决定任何事之前就得先做选择。

测试方法：打开页面，看三秒，然后回答两个问题——这个人做什么？我接下来该做什么？任何一个答不上来，说明页面在索取它还没挣到的注意力。

## 从链接页升级到主页

如果你已经在用链接页，别删。把它指向主页，而不是反过来。链接页继续当简介里那个入口，主页则成为有人真的在评估你时你发出的那个东西。这个拆分还顺手解决了一个尴尬场景：潜在客户和招聘方看到的是同一排图标。

分三轮搬：把真正会被点的链接挪进主页；删掉没人点的；最后补上顶部那句话——那才是自始至终缺的那部分。

## 常见问题

- 一定要有独立域名吗？一开始不必。 hosted 地址够你测试页面上到底该放什么，等这页真的带来机会了再加域名。
- 单页够用吗？对多数独立接活的人来说够。客户很少滑到第三屏以外，一页做得紧实，胜过好几页都很空。
- 多久更新一次？一个月一次就够。加一件或重排一件作品，页面就还是活的。
- 链接页会损害可信度吗？不至于损害，只是回答得不够。它告诉别人去哪找你，但没告诉别人为什么该雇你。

## 今天就把它做出来

把「你有官网吗」的答案放进一页里。从 dynamic-profile.shop 的[首页](/)开始，看看主页和链接页的差别，读 [Beyond Linktree](/blog/beyond-linktree)，再照着 [搭建步骤](/blog/launch-first-homepage-3-minutes) 走一遍。`,
      en: `"Do you have a website?" is the question a client asks at the exact moment they are deciding whether to trust you, and most freelancers answer it badly. They paste a link page, a PDF portfolio, or a shared folder. Each of those answers says the same thing: I have work, but I have not decided how to present it. A freelancer website answers in the form the question was asked — one address, one page, one impression that holds together.

## What the client is actually asking

Nobody asks this to confirm that you own a domain. They are asking whether you are easy to hire. Under the question sit three smaller ones: can I see what you do without sending a message, can I tell whether you are taking work right now, and can I find a way to pay you without booking a call.

A PDF portfolio answers the first one slowly, because the file has to be opened, downloaded and read. A link page answers none of them cleanly, since a wall of icons hands the sorting work to the visitor. A homepage answers all three in the order the client thinks about them, which is why it converts a conversation into a decision so much faster than a folder.

## The minimum a freelancer website needs

A freelancer website does not need a blog, a booking system or a custom domain on day one. Four blocks cover almost every case:

- One sentence saying who you serve and what you deliver, written in the client's words rather than your industry's
- Three to five pieces of work, ordered on purpose rather than by date
- A short note on how you work — turnaround, revision count, or what the first week looks like
- One button, contact or book, placed where the eye lands after the headline

Everything else is optional. Pages fail far more often from carrying twelve competing elements than from carrying four, and the fix is almost always subtraction.

Two details decide whether those four blocks hold together. The headline has to fit above the fold on a phone, because that is where a first visit usually happens, so keep it short enough to read without scrolling. The samples below it go in the order a client cares about: the piece closest to the work they want first, not the one you are proudest of.

## Client first impression: the three-second test

Client first impression forms before a single word gets read. In roughly three seconds a visitor decides whether the page is current, whether the person behind it is real, and whether reading on is worth the effort. Three signals carry that decision.

- Recency. A dated update or a project list that keeps changing tells the visitor the practice is running.
- A face. Named work with a person attached reads as accountable in a way a logo does not.
- Restraint. One obvious action beats five, because five actions force the visitor to choose before they have decided anything at all.

Run the test by loading your page, looking at it for three seconds, then answering two questions: what does this person do, and what am I supposed to do next. If either answer is missing, the page is asking for attention it has not earned.

## From link page to homepage

If you already run a link page, keep it and point it at the homepage instead of the other way round. The link page stays as the thing you put in a social bio; the homepage becomes the thing you send when someone is genuinely evaluating you. That split also removes the awkward case where a prospect and a recruiter land on the same row of icons.

Move in three passes. Copy across the links people actually click. Delete the ones nobody touches. Then write the sentence at the top, which is the part that was missing the whole time.

Expect the first version to look thin. That is normal. A homepage takes its final shape after you have sent it to five real people and noticed which part each of them asks about.

## FAQ

- Do I need my own domain? Not at the start. A hosted address is enough while you work out what belongs on the page, and you can add a domain once the page starts earning it.
- Is a one-page site enough? For most independent work, yes. Clients rarely scroll past the third screen, so a tight single page beats a thin site with several empty ones.
- How often should I update it? Once a month is plenty. Add or reorder one project and the page stays current.
- Does a link page hurt my credibility? It under-answers rather than damaging. It tells people where to find you without telling them why to hire you.

## Build yours today

Put the answer to "do you have a website?" on a single page. Start from the [home page](/) at dynamic-profile.shop, see how a homepage differs from a link page in [Beyond Linktree](/blog/beyond-linktree), then follow the [setup walkthrough](/blog/launch-first-homepage-3-minutes).`,
    },
  },
  {
    id: 49,
    slug: 'portfolio-trust-homepage-first',
    publishedAt: '2026-10-03',
    tag: { zh: '信任', en: 'Trust' },
    title: {
      zh: '设计师接单前先发主页：信任建立学',
      en: 'Send Your Homepage First: How Portfolio Trust Gets Built',
    },
    date: { zh: '2026 年 10 月', en: 'October 2026' },
    body: {
      zh: `先发报价单的设计师，是在请一个陌生人评估一份承诺；先发主页的设计师，是在请他评估一份证据。portfolio trust 就是这两者的差别，而它决定的第一单，比报价单上那个数字决定的多得多。

客户在收到你的消息之前，已经默认你会迟到、会超支、会交出跟样品不一样的东西。这不是偏见，是他被上一个人骗过。你要做的不是反驳这个预设，而是让他在点开链接的三十秒内自己推翻它。

## 为什么主页要走在报价单前面

报价单是承诺，主页是证据。承诺需要对方先信你才能生效，证据不需要。这就是为什么在没有 portfolio trust 的情况下谈价格，谈的其实不是价格，是风险折价——客户把「可能出问题」的成本提前从你的报价里扣掉了。

把主页先发出去，等于把这一步提前了。他看到的是一个已经存在的东西：有作品、有更新时间、有联系方式。这些都不能直接证明你做得好，但能证明你是个在做事的人，而后者才是陌生客户真正缺的信息。

## 主页要摆出什么才配得上信任

不是作品越多越好。堆二十件作品的人传递的信号是「我不知道哪个好」，而不是「我很能干」。

- 三到五件作品，每件写清你负责哪部分、最后发生了什么
- 一个说明你在接活的信号，哪怕只是一行字
- 一句用客户的话写的定位，不要用行业黑话
- 一个真人：名字、照片，或者一段有语气的手写说明
- 一个不需要开会就能联系到你的入口

这五样凑齐，portfolio credibility 基本就成立了。缺第二项和第三项最常见，也最伤——客户看完不知道你现在接不接活，也不知道你到底服务谁。

## 前三屏要按客户的检查顺序排

客户不是从上往下读的，他是按疑问往下找的。

- 第一屏：你是谁、你服务谁。答案必须在手机上一屏之内读完
- 第二屏：你做过什么，按跟客户手头这件活最接近的程度排序，不要按时间
- 第三屏：怎么合作、怎么联系，最好不用发消息就能判断

把这三屏排好，剩下的部分是加分项。排不好，后面写得再满也补不回来。

## 哪些信任信号造不了假，哪些可以

网上 build trust online 的建议有一半不值得做，因为它们太容易复制。

- 难造假：具体数字、带名字的客户评价、能点进去的真实项目、持续更新的时间线
- 易造假：徽章墙、"trusted by" 一排灰 logo、没有出处的五星评分

易造假的那些不是不能用，而是用多了会压过难造假的那些。客户分不清哪个徽章是真的，于是把所有徽章一起打折扣，连你真正硬的那部分也跟着折了。

## FAQ

- 作品不够三件怎么办？两件也行，但要写得更细。宁可两件带过程和结果，也不要八件只有图。
- 主页要多久更新一次？一个月一次足够。换掉一件作品、改一句定位，页面就还是活的。
- 没有大客户背书怎么办？用你交付之后对方那句原话。一句具体的话比一排 logo 更有用。
- 先发主页会不会显得我不专业？不会。它回答的是客户本来就要问的问题，早回答比晚回答省一轮来回。

## 先把主页发出去

下次有人问你能不能接，先发主页，再谈价格。从[首页](/)，把三到五件作品和一句定位放上去；不知道页面该放什么，读 [让人记住的主页的五个元素](/blog/5-key-elements-memorable-homepage)；对方是自由职业客户的话，[客户问你有官网吗](/blog/freelancer-website-homepage)那篇讲得更具体。`,
      en: `A designer who sends a proposal first is asking a stranger to evaluate a promise. A designer who sends a homepage first is asking them to evaluate evidence. That gap is what portfolio trust is made of, and it decides more first contracts than the number on the proposal ever does.

Before a client ever reads your message, they already assume you will run late, run over budget, and deliver something that does not quite match the sample. That is not prejudice; it is what the last person taught them. Your job is not to argue against the assumption. It is to let them overturn it themselves within thirty seconds of opening a link.

## Why the homepage goes out before the proposal

A proposal is a promise. A homepage is evidence. A promise only works once the other person already trusts you; evidence works without that head start. This is why talking about price without portfolio trust is never really about price. It is a risk discount, and the client has already subtracted the cost of things going wrong from your number.

Sending the homepage first moves that step earlier. What the client sees is something that already exists: work, a recent update, a way to reach you. None of it proves you are good. All of it proves you are operating, and operating is the piece of information a stranger is actually missing.

## What a portfolio has to show before it earns trust

More work is not better. Twenty pieces read as "I cannot tell which ones are good" rather than "I am good."

- Three to five pieces, each stating which part you owned and what happened afterwards
- One signal that you are taking work right now, even if it is a single line
- One positioning sentence written in the client's words rather than your industry's
- A person: a name, a face, or a note written in an actual voice
- A way to reach you that does not require booking a call

Those five are roughly what portfolio credibility is. The second and third are the ones most often missing, and they are the most costly, because the client finishes the page not knowing whether you are available or who you serve.

## The first three screens, in the order a client checks them

Clients do not read top to bottom. They search downward, question by question.

- Screen one: who you are and who you serve. It has to fit on a phone without scrolling.
- Screen two: what you have done, ordered by closeness to the job the client has in hand rather than by date
- Screen three: how working together works and how to reach you, ideally without sending a message first

Get those three right and everything below them is upside. Get them wrong and no amount of text further down recovers the page.

## Trust signals nobody can fake, and the ones anyone can

About half the advice about how to build trust online is not worth following, because the signals it recommends are trivially copyable.

- Hard to fake: specific numbers, named testimonials, live projects someone can click into, a timeline that keeps moving
- Easy to fake: badge walls, a row of grey "trusted by" logos, five-star ratings with no source

The easy ones are not forbidden. They are just dangerous in quantity, because a client who cannot tell which badge is real discounts all of them at once, and the part of your page that was genuinely solid gets discounted along with them.

## FAQ

- What if I only have two pieces of work? Two is fine, written in more detail. Two with process and outcome beats eight images with nothing attached.
- How often should I update the page? Once a month is plenty. Swap one project or reword the positioning line and the page stays alive.
- What if no big client will vouch for me? Use the sentence they actually said after you delivered. One concrete quote beats a row of logos.
- Does sending the homepage first look unprofessional? No. It answers the question the client was going to ask anyway, and answering it early saves a round trip.

## Send the page first

Next time someone asks whether you are available, send the homepage before you send the price. Start from the [home page](/) and put three to five pieces of work plus one positioning line on it. If you are unsure what belongs on the page, read [the five elements of a memorable homepage](/blog/5-key-elements-memorable-homepage), and for freelance clients specifically, [the one about being asked whether you have a website](/blog/freelancer-website-homepage).`,
    },
  },
  {
    id: 50,
    slug: 'monetize-personal-page-side-hustle',
    publishedAt: '2026-10-04',
    tag: { zh: '指南', en: 'Guide' },
    title: { zh: '副业启动：个人主页怎么开始变现', en: 'Side Hustle: Monetizing Your Personal Page' },
    date: { zh: '2026 年 10 月', en: 'October 2026' },
    body: {
      zh: '副业把个人主页当成作品集来做，是多数人收不到钱的原因。作品集回答的是「我做过什么」，不会回答「我卖什么」。主页 变现要补的就是这一句：告诉访客往哪里付钱，付了能拿到什么。monetize personal page 从来不是加个收款按钮那么简单，它要求你把页面从展示逻辑换成交易逻辑。\n\n第一笔钱通常不是最大的一笔，但它决定有没有第二笔。这篇讲的是怎么把主页从「作品展示」切到「能收款」，以及哪些做法看着热闹其实收不到钱。\n\n## 第一笔钱来自哪里\n\n主页变现的起点几乎都是服务，不是产品。你能做、别人愿意掏钱的那件事，一般已经在你的作品里了，只是你没给它标价格。\n\n把最近三件作品拿出来问自己：哪一件被别人主动问过？问的那个人就是你的第一个客户画像。side project monetization 基本都从这个动作开始——把被问过的那件事单独拆出来，写成一条明确的报价，放到主页上。\n\n不要先做产品。产品要猜需求，服务不用，因为需求已经以「你能不能帮我做一个」的形式出现过一次了。\n\n## 四条能立刻上手的路径\n\n- 接单服务：你能交付的具体工作，按件或按小时报价。起步最快，天花板也最明显。\n- 数字商品：模板、预设、小工具、PDF 手册。做一次卖多次，前提是作品已经证明了你的审美或方法。\n- 付费咨询：按次收费的答疑或评审。有行业经验的人门槛最低，第一周就能收。\n- 联盟推荐：推荐你真在用、也真觉得好的工具拿佣金。收入最慢，但跟主页内容天然贴合。\n\n| 路径 | 第一笔收入 | 需要的前置 | 天花板 |\n|---|---|---|---|\n| 接单服务 | 一到两周 | 三件能看的作品 | 受时间限制 |\n| 数字商品 | 一到三个月 | 可复用的方法论 | 能复制 |\n| 付费咨询 | 一周以内 | 可被验证的经验 | 受时间限制 |\n| 联盟推荐 | 三到六个月 | 持续的内容更新 | 随流量增长 |\n\n选一条，不要四条一起上。四条一起上的结果是主页变成杂货铺，访客不知道你到底卖什么。\n\n## 页面要改成什么样才卖得动\n\n展示型主页和收款型主页差三个地方。\n\n第一，顶部那句定位改成「我帮谁解决什么」，而不是「我是做什么的」。前者是买家的句子，后者是简历的句子。\n\n第二，每件作品下面加一行结果，不是说明。说明写「用 Figma 做的落地页」，结果写「上线两周，注册转化率从 1.8% 到 3.4%」。付钱的人只在意后面那句。\n\n第三，加一个不需要发消息就能下单的入口。收款这一步是 personal page income 流失最严重的地方：访客已经被说服了，却找不到怎么付钱，于是去别处找。一个写清楚的价格加一个收款链接，比一段「欢迎私信详谈」有用得多。\n\n## 定价和收款的现实问题\n\n第一笔报价宁低不高，但范围要写死。低价换来的是第一个案例和第一句可复用的评价，这两样比那点差价值钱。范围必须写死，是因为副业客户默认会加需求，「顺便再改一版」是时间黑洞。\n\n收款方式按客户类型分：国内客户用微信或支付宝的收款链接，海外客户用 Stripe 或 PayPal。别为了显得专业去搭一套复杂的结算系统，一个能用的链接就够了。\n\n要不要在主页公开价格？客户是个人和小团队，公开。公开价格筛掉的是永远不会成交的那批人，省下的沟通时间够你多做一单。客户是企业，写「起价」，然后留一个约聊入口。\n\n## 副业变现要避开的三个坑\n\n- 先建站再想卖什么：页面做得再漂亮，没有可买的东西也收不到钱。顺序反过来。\n- 把主页做成作品集画廊：画廊让人欣赏，不让人付款。付款需要价格、范围和入口三样齐全。\n- 等流量自己来：主页不会自己涨流量。每发一条动态、每交付一次单，都要把链接带出去一次。\n\n## FAQ\n\n- 没有作品能不能开始变现？可以，从咨询开始。回答一个问题不需要作品集，需要的是能被验证的经验。\n- 需要独立域名吗？开始不用。等你的名字开始被人搜索了再绑，那时域名才有意义。\n- 一个月能有多少收入？多数人前三个月是几百到一两千。差距出现在第六个月以后，那时你有案例、有评价、有复购。\n- 该不该一开始就做数字商品？已经有可复用的方法论就做；如果只是想避开跟客户打交道，别做，卖不出去。\n\n## 今天就能做的三件事\n\n第一，从作品里挑一件被问过的，写成一条带价格的报价。第二，把主页顶部那句定位改成买家能读懂的话。第三，加一个不用私信就能付款的入口。做完这三件，你的主页就从名片变成了柜台。\n\n从[首页](/)，把报价和收款入口加上去；不知道页面该怎么排，读 [客户问你有官网吗](/blog/freelancer-website-homepage)；想知道有没有人真的在看，看 [主页数据怎么看](/blog/visitor-analytics-101-reading-data)。',
      en: 'Most people build a personal homepage as a portfolio and then wait for work to arrive. It rarely does, and the reason is plain: a portfolio answers "what have you done" and never answers "what are you selling." Monetizing a personal page means adding that line, telling a visitor where the money goes and what comes back.\n\nThe first payment is seldom the largest one. It decides whether there is a second. This post covers switching a page from display to checkout, and which of the popular approaches look busy and earn nothing.\n\n## Where the first money comes from\n\nPersonal page income almost always starts with a service, not a product. The thing you can do that someone will pay for is usually already sitting in your work. You have not put a price on it.\n\nTake your three most recent pieces and ask which one somebody has already asked you about. That person is your first customer profile. Side project monetization nearly always begins with this move: pull out the thing people enquired about, write one clear price for it, put it on the page.\n\nDo not build a product first. A product makes you guess at demand. A service does not, because demand already showed up once in the form of a message asking whether you could do it.\n\n## Four routes you can start this week\n\n- Client work: a specific deliverable, priced per project or per hour. Fastest to start, clearest ceiling.\n- Digital goods: templates, presets, small tools, PDF guides. Built once and sold repeatedly, provided your work already proves taste or method.\n- Paid advice: per-session reviews or Q&A. Lowest barrier if you have experience someone can check, and collectable in the first week.\n- Referrals and affiliate links: tools you actually use and actually like. Slowest, but it fits what a homepage already does.\n\n| Route | First revenue | What it needs | Ceiling |\n|---|---|---|---|\n| Client work | One to two weeks | Three pieces worth showing | Bound by hours |\n| Digital goods | One to three months | A repeatable method | Scales |\n| Paid advice | Under a week | Verifiable experience | Bound by hours |\n| Referrals | Three to six months | Steady updates | Grows with traffic |\n\nPick one. Running all four turns the page into a general store where nobody can tell what you sell.\n\n## What changes when the page has to sell\n\nA display page and a page that collects money differ in three places.\n\nOne: the line at the top becomes who you help and what you fix, not what your job title is. The first is a buyer\'s sentence, the second belongs on a resume.\n\nTwo: every piece of work gets a result line, not a description line. The description says "landing page built in Figma." The result says "signup rate went from 1.8% to 3.4% in two weeks." People who pay care about the second one.\n\nThree: add a way to buy that does not require sending a message. This is where most personal page income leaks. The visitor is convinced, cannot find out how to pay, and goes looking somewhere else. A stated price plus a payment link beats a polite "DM me for details" every time.\n\n## Pricing and getting paid\n\nPrice the first one low, but fix the scope in writing. A low first price buys you a case study and a quote you can reuse, and both are worth more than the difference. Fix the scope because side clients expand it by default, and "one more small revision" is where the hours go.\n\nPayment method follows the client: a transfer link for domestic clients, Stripe or PayPal for international ones. Skip building an elaborate checkout system to look established. One working link is enough.\n\nShould the price be public? If your clients are individuals and small teams, yes. Publishing a price filters out the people who were never going to buy, and the time saved covers another job. If you sell to companies, write "from" and leave a booking link.\n\n## Three ways this goes wrong\n\n- Building the page before deciding what to sell. A beautiful page with nothing purchasable on it earns nothing. Reverse the order.\n- Turning the page into a gallery. Galleries get admired, not paid. Payment needs a price, a scope and an entry point.\n- Waiting for traffic. A homepage does not grow its own. Every update you post and every job you finish should carry the link out with it.\n\n## FAQ\n\n- Can I start with nothing to show? Yes, start with advice. You do not need a portfolio to answer a question; you need experience someone can check.\n- Do I need my own domain? Not at first. Bind one when people start searching your name, which is when it starts paying off.\n- How much per month? Most people see a few hundred in the first three months. The gap opens after month six, once you have cases, quotes and repeat clients.\n- Should I build a digital product straight away? If you already have a repeatable method, yes. If you are doing it to avoid talking to clients, no, it will not sell.\n\n## Three things you can do today\n\nPick the piece of work people have asked about and write a price for it. Rewrite the top line in a buyer\'s words. Add a way to pay without a DM. Do those three and the page stops being a business card and starts being a counter.\n\nStart from the [home page](/) and add your price and payment link. If you are unsure how to order the page, read [the one about being asked whether you have a website](/blog/freelancer-website-homepage), and for whether anyone is actually looking, [reading your visitor data](/blog/visitor-analytics-101-reading-data).',
    },
  },
  {
    id: 51,
    slug: 'graduate-portfolio-page-guide',
    publishedAt: '2026-10-05',
    tag: { zh: '指南', en: 'Guide' },
    title: { zh: '招聘季：应届生作品集主页指南', en: "Graduates' Portfolio Page Guide" },
    date: { zh: '2026 年 10 月', en: 'October 2026' },
    body: {
      zh: '应届生作品集主页最容易做错的一件事，是把「我还没什么经验」当成需要道歉的事。招聘方打开 graduate portfolio 的时候，评估的不是你的水平，而是你能不能尽快上手。这两件事差别很大：水平可以教，上手速度不能。\n\n你手上多半只有课程作业、一两个比赛和一段实习。这是个正常的起点。真正让人关掉页面的，是看不出这些东西跟你申请的岗位有什么关系。这篇讲怎么把这些素材排成一个 new grad portfolio，让招聘方在前三屏就拿到他想要的答案。\n\n## 招聘方在看应届生主页时，脑子里在问什么\n\n他们不是从上往下读，是带着问题往下扫。\n\n- 这个人做过什么，跟我们手上这个岗位像不像\n- 每件作品里，哪一块是他做的\n- 他现在能不能接活，怎么联系\n\n三个问题回答完，页面就算合格；答不上来，后面写得再多也补不回来。entry level design portfolio 被刷掉，多数不是因为做得不好，而是因为看不出做了什么。\n\n## 三到五件就够，但每件要写这四行\n\n应届生容易走向两个极端：放两件，或者放十八件。两件让人以为你没东西，十八件让人没耐心看。三到五件是能撑起一次判断的量。\n\n每一件按这个格式写：\n\n| 要写的东西 | 写什么 | 别写什么 |\n|---|---|---|\n| 背景 | 谁要的、给谁用、什么时间 | 「课程作业」四个字 |\n| 你的角色 | 你负责哪一块，几个人一起做 | 「参与设计」 |\n| 过程 | 中间改过什么，为什么改 | 铺满整屏的用户旅程图 |\n| 结果 | 有没有上线，数据或反馈是什么 | 「老师给了 A」 |\n\n四行里第三行最值钱。招聘方看应届生，主要就是看你有没有「被否掉之后改一遍」的经历，因为上班以后这事每天都在发生。把一次改稿写出来，比再补三张成品图有用。\n\n## 没有真实项目，就把课程作业改写成项目\n\n课程作业和项目的差别不在质量，在有没有约束条件。\n\n改写按这个顺序来：先补一句背景（谁在什么情况下需要这个），再补一次你推翻过的决定（放弃了哪个方案、为什么），最后补一个结果（哪怕只是「三个同学试了，两个卡在同一步」）。三步走完，一份课程作业就能放进 graduate portfolio。\n\n比赛的产出离真实项目更近，但团队分工要写清楚。写「负责视觉与交付」比写「组员」有用，写「独立完成主页改版」比写「队长」有用。\n\n## 主页结构上，应届生和在职设计师只差两处\n\n第一，把「正在找工作」放在第一屏，一句话说清你在找什么方向的岗位。在职的人不需要这行，你需要。招聘方看到这行，才知道该用哪套标准要求你。\n\n第二，简历和作品集放在同一页，别拆成两个链接。招聘方不会点第二次。页脚挂一份可下载的 PDF 就够了，主页面本身就是你的第二简历。\n\n剩下的跟在职的人一样：一件作品一张卡片，卡片下面写结果不写说明，页脚留一个不用发消息就能联系到你的入口。\n\n## 应届生主页最容易踩的三个坑\n\n- 用作品数量补信心：十八件里只要有两件弱的，整体印象就掉了。删比加管用。\n- 把过程图铺满整屏：过程要有结论跟着，不是把每一版都贴出来。挑一次改动讲清楚就够。\n- 不放联系方式，或者只放一个表单：招聘方的时间是按分钟算的。邮箱直接写出来，比一句「欢迎留言」有用。\n\n## FAQ\n\n- 只有课程作业能不能做作品集主页？能，但要按项目的格式重写一遍。缺的是约束条件，不是工作量。\n- 需要几件作品才够？三到五件。少于三件就把每件的过程挖深，多于五件就删掉最弱的那几件。\n- 主页要不要放成绩和证书？放一行就够，不要占一整屏。招聘方看的是你做过什么，不是你考了多少分。\n- 没有实习经历怎么办？把课程项目和比赛写成完整项目，再补一句你现在在学什么、想找什么方向的岗位。诚实比包装更容易过关。\n\n## 现在就能做的三件事\n\n挑三件最强的作品，按「背景 / 角色 / 过程 / 结果」四行重写一遍。在第一屏加一句你在找什么方向的岗位。把邮箱直接写在页脚。做完这三件，你的应届生作品集主页就从作业合集变成了一份能回答问题的材料。\n\n从[首页](/)，把这三件事做完；不确定主页该有哪几块，看 [主页必备的五个板块](/blog/homepage-5-must-have-sections)；想知道每一块具体写什么，读 [让人记住的主页五个要素](/blog/5-key-elements-memorable-homepage)。',
      en: 'The most common mistake in a graduate portfolio is treating "I do not have much experience yet" as something to apologise for. Whoever opens a graduate portfolio is not grading your skill. They are guessing how quickly you could be useful. Those are separate questions, and only the second one decides whether you get the interview.\n\nWhat you have is coursework, one or two competitions and maybe one internship. That is a normal starting point. What closes a page is the inability to see what any of it has to do with the job on offer. This is about arranging that material into a new grad portfolio that answers the three questions a reviewer is actually asking, inside the first three screens.\n\n## What a reviewer is asking while they scroll\n\nThey are not reading top to bottom. They are searching downward, question by question.\n\n- Has this person done anything close to the role we have open\n- Which part of each piece was theirs\n- Are they available now, and how do I reach them\n\nAnswer those three and the page passes. Miss them and nothing further down recovers it. A rejected entry level design portfolio is usually not rejected for being weak. It is rejected for being unreadable.\n\n## Three to five pieces, and four lines under each\n\nNew graduates tend toward two extremes: two pieces, or eighteen. Two suggests there is nothing there. Eighteen suggests nobody edited. Three to five is the range where a judgement can actually be made.\n\nWrite each one in this shape:\n\n| Line | What goes in it | What does not |\n|---|---|---|\n| Context | Who needed it, for whom, and when | The words "course assignment" |\n| Your role | Which part was yours, and how many people | "Contributed to the design" |\n| Process | What you changed and why | A journey map covering the whole screen |\n| Result | Whether it shipped, plus numbers or feedback | "Got an A" |\n\nThe third line is the one that pays. A reviewer reading a graduate portfolio is mostly checking whether you have ever been told no and revised, because that is the work. One documented revision is worth three more finished images.\n\n## Coursework becomes a project with three additions\n\nThe distance between coursework and a project is not quality. It is constraints.\n\nAdd them in this order: one line of context about who needed it and under what conditions; one decision you reversed, naming what you dropped and why; one outcome, even a small one such as "three classmates tried it and two got stuck at the same step." Those three turn an assignment into something that belongs on the page.\n\nCompetition work sits closer to real projects, but the split has to be spelled out. "Owned visual design and handoff" beats "team member." "Rebuilt the homepage alone" beats "team lead."\n\n## Two places a graduate page differs from a working designer\'s\n\nOne: put what you are looking for on the first screen, in a single line naming the kind of role. Someone already employed does not need that line. You do, because it tells the reader which standard to hold you to.\n\nTwo: keep the resume and the portfolio on one page rather than behind two links. Nobody clicks twice. A downloadable PDF in the footer is enough, since the page itself already works as a second resume.\n\nEverything else matches what an employed designer does. One card per piece, a result line rather than a description line, and a way to reach you in the footer that does not require filling in a form.\n\n## Three ways this goes wrong\n\n- Padding the count to feel safer. Two weak pieces among eighteen drag the whole page down. Deleting works better than adding.\n- Wallpapering the screen with process images. Process needs a conclusion attached, not every version you made. Pick one change and explain it.\n- Burying the contact details, or offering only a form. Reviewers work in minutes. A written email address beats a "say hello" box.\n\n## FAQ\n\n- Can I build this from coursework alone? Yes, but rewrite each piece in the project shape. What is missing is constraints, not effort.\n- How many pieces? Three to five. Under three, go deeper on each one. Over five, cut the weakest.\n- Should grades and certificates be on the page? One line, not a screen. Reviewers care what you made, not what you scored.\n- What if I have no internship? Write the coursework and competition pieces as full projects, then add a line on what you are learning and the kind of role you want. Plain honesty passes more often than packaging.\n\n## Three things you can do today\n\nRewrite your three strongest pieces in the four-line shape. Add one line on the first screen saying what kind of role you are after. Put your email in the footer as plain text. Do those three and the page stops being a folder of assignments and starts being an answer.\n\nStart from the [home page](/), then check [the five sections every homepage needs](/blog/homepage-5-must-have-sections) and [the five elements of a memorable homepage](/blog/5-key-elements-memorable-homepage) if you want the details.',
    },
  },
  {
    id: 52,
    slug: 'updating-page-before-career-move',
    publishedAt: '2026-10-06',
    tag: { zh: '职业', en: 'Career' },
    title: { zh: '跳槽时主页怎么改？离职前的数字化', en: 'Updating Your Page Before a Career Move' },
    date: { zh: '2026 年 10 月', en: 'October 2026' },
    body: {
      zh: 'career change portfolio 回答的是一个简历答不了的问题：没人替你润色的时候，你的工作成果长什么样。跳槽期间，简历会按每一条招聘要求重写一遍；而挂在公司官网上那些案例，从你离职那天起就不再属于你了。你自己托管的主页，是唯一能跟着你走完这次变动的版本，而且它通常是面试官打完电话之后第一个点开的东西。\n\n大部分人错在时间。改主页这件事被拖到辞职之后那一周，那时页头还挂着旧职位，三条链接指向一家已经不雇你的公司。这篇讲的是 pre-job switch portfolio 应该在那之前就写成什么样、旧工作里有哪些东西要带走，以及哪些必须删掉。\n\n## 为什么转型时，主页比简历更重\n\n简历是被拿来「筛掉」的，主页是被拿来「看懂」的。跳槽改主页之所以重要，是因为看你转行的人，并不是拿一份要求清单来对照你；他在判断你能不能做那件新的事。\n\n这是另一个问题，需要的证据也不一样。三件像目标岗位的作品，胜过十件像你正要离开的那份工作。从市场转产品设计，那份 campaign 提案就不如你业余做的一个原型有用，哪怕原型粗糙得多。\n\n## 交辞呈之前要改的三件事\n\n趁你还有权限、也还不急的时候做。\n\n- 把你做的东西都备份一遍：截图、导出、链接。权限消失的速度比多数人预想的快，常常就在离职当天。\n- 趁数字还新鲜，把结果那一行写掉。半年后你不会记得转化率从 1.8% 到 3.4%。\n- 现在就要两句评价。走之前跟主管或客户要一句话，比走之后容易得多。\n- 先确认什么能公开。有些合同有限制，先发了再发现问题，顺序就反了。\n\n## 留什么、改什么、删什么\n\n| 留下 | 重写 | 删掉 |\n|---|---|---|\n| 形状像目标岗位的作品 | 只在旧公司里才看得懂的职位名 | 任何还在保密期的内容 |\n| 你能讲出声的过程 | 写给内部人看的描述 | 十件几乎一样的作品 |\n| 每件一个能衡量的结果 | 「参与设计」这类说法 | 页头那个旧职位 |\n\n中间那一列才是活儿。一个读起来还像内部 wiki 的 career pivot page，等于告诉对方你还没真正迈出去。\n\n## 全职上班时的两周排期\n\n| 什么时候 | 做什么 | 为什么是这个时间 |\n|---|---|---|\n| 第一周，两个晚上 | 把要留的东西导出、截图 | 你这时还有权限 |\n| 第一周，一个晚上 | 写新方向的那句定位 | 下面所有内容都靠它 |\n| 第二周，两个晚上 | 按新形状重写三件作品 | 三件足够做判断 |\n| 第二周，一个晚上 | 清掉旧职位和旧链接 | 第一印象在页头 |\n\n是两周的晚上，不是一个周末。赶出来的结果是主页改一半，而改一半比明显过时更糟。\n\n## FAQ\n\n- 主页上要写「正在看机会」吗？第一屏写一行，说清方向。知道你要什么的人，才知道该用哪套标准看你。\n- 最好的作品属于现在的公司怎么办？写清问题和你的角色，有公开版本就链过去。招聘方能理解限制，理解不了含糊。\n- 需要换域名吗？不用。地址保持不变，因为已经拿到你链接的人应该还能找到你。\n- 置顶作品要多新？尽量一年以内。如果更旧，补一句你之后在做什么。\n\n## 离职第一天你希望线上是什么版本\n\n你要的是在任何人知道你要走之前，这页就已经是完成品：三件作品指向新方向，一行说明你在找什么，旧职位一点痕迹都不留。趁你还有从容修改的余地，把它挂到 dynamic-profile.shop 上，然后在别人开口问之前先发过去。\n\n从[首页](/)，先把页头换掉；不确定该展示多少，读 [客户在信任你之前需要看到什么](/blog/portfolio-trust-homepage-first)；想知道每件作品具体怎么写，看 [让人记住的主页五个要素](/blog/5-key-elements-memorable-homepage)。',
      en: 'A career change portfolio answers a question your resume cannot: what does your work look like when nobody is editing it? During a job switch the resume gets rewritten to match each posting, and the case studies on your employer\'s site stop being yours the day you leave. The page you host yourself is the only version that survives the move, and it is usually the first thing a hiring manager opens after the call.\n\nThe timing is where most people go wrong. Editing starts the week after resigning, when the header still carries the old title and three links point at a company that no longer employs you. This post covers what a pre-job switch portfolio should say before that week arrives, what to carry over from the old role, and what to delete.\n\n## Why a career pivot page carries more weight than a resume\n\nA resume is read to reject. A portfolio page is read to understand. During a pivot that difference matters, because a reviewer looking at someone switching fields is not comparing you against a list of requirements. They are trying to work out whether you can do the new thing.\n\nThat is a different question, and it needs different evidence. Three pieces that look like the target role beat ten that look like the job you are leaving. If you are moving from marketing into product design, the campaign deck is less useful than the one prototype you built on the side, even if the prototype is rougher.\n\n## What to change before you hand in notice\n\nDo this while you still have access and while you are not in a hurry.\n\n- Take copies of anything you made. Screenshots, exports, links. Access disappears on your last day more often than people expect.\n- Write the result lines while the numbers are still fresh. Six months later you will not remember that conversion moved from 1.8% to 3.4%.\n- Ask for two quotes now. A sentence from a manager or a client is easier to get before you leave than after.\n- Check what you can publish. Some contracts restrict this, and finding out after you publish is the bad order.\n\n## What to keep, and what to drop\n\n| Keep | Rewrite | Drop |\n|---|---|---|\n| Work shaped like the target role | Titles that only make sense inside the old company | Anything still under NDA |\n| Process you can explain out loud | Descriptions written for an internal audience | Ten near-identical pieces |\n| One measurable result per piece | "Contributed to" phrasing | The old job title in the header |\n\nThe middle column is where the work is. A page that still reads like an internal wiki tells the reader you have not made the move yet.\n\n## A two-week schedule around a full-time job\n\n| When | What | Why then |\n|---|---|---|\n| Week one, two evenings | Export and screenshot everything you want to keep | You still have access |\n| Week one, one evening | Write the positioning line for the new direction | Everything below it depends on this |\n| Week two, two evenings | Rewrite three pieces in the new shape | Three is enough for a judgement |\n| Week two, one evening | Strip the old title and links | First impression is the header |\n\nTwo weeks of evenings, not a weekend. Rushing this is how pages end up half updated, which reads worse than an obviously old one.\n\n## FAQ\n\n- Should the page say I am looking? One line on the first screen, naming the direction. A reviewer who knows what you want can hold you to the right standard.\n- What if my best work belongs to my current employer? Describe the problem and your role, and link to the public version if one exists. Reviewers understand constraints better than vagueness.\n- Do I need to change the domain? No. Keep the same address, since anyone who already has it should still find you.\n- How recent should the top piece be? Within the last year if you can. If it is older, say what you have been doing since.\n\n## The version you want live on day one\n\nYou want a page that reads as finished before anyone knows you are leaving: three pieces pointed at the new direction, one line saying what you are after, and no trace of the title you are giving up. Put it up on dynamic-profile.shop while you still have the luxury of a calm edit, then send it before anyone asks.\n\nStart from the [home page](/) and swap the header first. If you are unsure how much to show, read [what a client needs before they trust you](/blog/portfolio-trust-homepage-first), and for the shape of the pieces themselves, [the five elements of a memorable homepage](/blog/5-key-elements-memorable-homepage).',
    },
  },

  {
    id: 53,
    slug: 'employee-to-freelancer-page-transition',
    publishedAt: '2026-10-07',
    tag: { zh: '职业', en: 'Career' },
    title: { zh: '自由职业转型：从上班族到靠主页接单', en: 'From Employee to Freelancer: Page-Led Transition' },
    date: { zh: '2026 年 10 月', en: 'October 2026' },
    body: {
      zh: 'freelancer transition 真正难的不是找客户，是把「我在某公司做某个岗位」翻译成「我能帮你解决什么」。转型自由职业卡住的人，多数卡在这一步：简历上那句话在你离职当天就失效了，而客户要看的是另一句话。\n\n主页在这个过程里的位置很特殊。它是唯一一个你能一边上班一边准备好、辞呈一交就能发出去的资产。等辞职之后再做，你要同时应付没有收入、没有作品链接、没有客户这三件事，那时候做出来的大概率是仓促版，而仓促版还得再修一遍。\n\n这篇讲三件事：还在上班的时候该备好什么，主页上那三句话该怎么写，以及从零到第一单大概要多久。\n\n## 为什么主页要早于辞呈\n\n客户决定要不要联系你，用的不是你的履历长度，是他能不能在两分钟内判断出你做不做这件事。going freelance portfolio 的作用，就是把这两分钟压到三十秒。\n\n公司招牌在这里是负担。写在某家大厂做过三年，小客户读到的其实是「他很贵，而且我不确定他愿不愿意接小单」。你离职之后这句招牌也没了，因为那从来不是你的，是公司的。\n\n所以转型期的主页要做一次身份切换：从「我是谁的人」改成「我能修什么问题」。这不是改措辞，是整个页面的排序逻辑变了——定位句排到最前，作品按你想接的客户排，价格和联系入口放到页脚。\n\n## 上班期间先做完的四件事\n\n趁你还有收入、还有权限、也还不慌的时候做。\n\n- 把能带走的成果都存一份：截图、导出文件、公开链接。权限消失的速度比你预想的快，很多人是在离职当天下午才想起来的。\n- 现在就去要两句评价。走之前跟主管或客户要一句话，比走之后容易十倍。\n- 先确认什么能公开。有些合同写明项目不能外发，先发了再被发现，顺序就反了。\n- 算清楚你的底线数字：能撑几个月，以及最低能接多少钱的单。这个数字决定你之后是在挑客户，还是在接活。\n\n## 主页上必须写清的三句话\n\n第一句在页头，写「我帮谁解决什么」，不要写职位名。写「我帮独立品牌做上线前的落地页改版」，比写「前某厂设计师」有用，因为前者是买家读得懂的句子。\n\n第二句在每件作品下面，写结果不写说明。说明是「用 Figma 做的落地页」，结果是「上线两周，注册转化率从 1.8% 到 3.4%」。付钱的人只看后面那句。\n\n第三句在页脚，写清楚怎么开始。一个标好的价格区间，加一个不用私信就能下单的入口，比一段「欢迎详谈」有用得多。quit job freelancing 之后最先崩的地方往往不是能力，是客户找不到付款的地方。\n\n## 从零到第一单大概要多久\n\n| 阶段 | 通常耗时 | 这一步要拿到什么 |\n|---|---|---|\n| 备料 | 一到两周 | 三件能看的作品，两句可引用的评价 |\n| 上线主页 | 一个晚上 | 定位句、三件作品、联系入口 |\n| 第一批接触 | 两到四周 | 十次真实对话，其中一两次会成单 |\n| 第一单 | 四到八周 | 一个能复用的案例和一句评价 |\n\n八周是多数人的数字，不是承诺。走得快的通常是还在上班就把主页发出去的那批人；走得慢的，多半是等到辞职之后才开始做页面。\n\n## 报价怎么定才不至于亏\n\n第一单宁低不高，但范围要写死。低价换的是第一个案例和第一句能引用的评价，这两样比那点差价值钱。范围必须写死，是因为客户默认会加需求，「顺便再改一版」是时间黑洞。\n\n要不要在主页公开价格？客户是个人和小团队，公开。公开价格筛掉的是永远不会成交的那批人，省下的沟通时间够你多接一单。客户是企业，写「起价」，再留一个约聊入口。\n\n收款方式按客户类型分：国内客户用微信或支付宝的收款链接，海外客户用 Stripe 或 PayPal。别为了显得专业去搭一套复杂的结算系统，一个能用的链接就够了。\n\n## 转型期最容易踩的三个坑\n\n- 把主页做成简历的翻版：简历按时间排，主页按你能解决的问题排，两件事的顺序是反的。\n- 等作品完美再上线：第一版主页的任务是拿到第一个客户，不是拿奖。先上线，再用真实反馈改。\n- 只靠一个渠道：主页不会自己涨流量。每交付一次单、每发一条动态，都把链接带出去一次。\n\n## FAQ\n\n- 还在上班就能做主页吗？能做，也应该做。用你自己的名字和你自己的作品，不碰在职项目的保密内容就行。\n- 没有客户案例怎么开始？从你做过的事里挑三件能公开的，写成项目格式：谁要的、你负责哪一块、改过什么、结果是什么。\n- 需要独立域名吗？开始不用。等你的名字开始被人搜索了再绑，那时候域名才有意义。\n- 第一单该报多少？按你上班时的时薪乘二到三倍起步，再按客户规模调。报低了涨不上去，报高了又没有案例撑着。\n- 上班时接单有风险吗？先查合同里的竞业和兼职条款。有疑虑就把主页做成展示，等离职后再开始报价。\n\n## 今天就能做的三件事\n\n从在职成果里挑三件能公开的，按「背景 / 角色 / 过程 / 结果」四行重写一遍。把页头那句改成「我帮谁解决什么」。加一个不用私信就能付款或预约的入口。\n\n做完这三件，你的主页就从一份履历变成了一个柜台。趁你还有从容修改的余地，把它挂到 dynamic-profile.shop 上，然后在别人开口问之前先发过去。\n\n从[首页](/)，把这三件事做完；不确定主页该有哪几块，看 [主页必备的五个板块](/blog/homepage-5-must-have-sections)；想知道第一笔钱从哪来，读 [副业变现](/blog/monetize-personal-page-side-hustle)。',
      en: 'The hard part of a freelancer transition is not finding clients. It is translating "I held a role at a company" into "I solve this problem for you." Most people who stall on the way into freelance work stall right there: the sentence on the resume stops working the day you leave, and what a client needs to read is a different sentence.\n\nA personal page has a particular place in this. It is the one asset you can build while still employed and send out the day the notice goes in. Build it afterwards and you are handling no income, no portfolio links and no clients at the same time, which is how pages end up rushed and then need rebuilding.\n\nThree things follow: what to prepare while the salary still arrives, how to write the three lines that carry the page, and how long zero to first invoice usually takes.\n\n## Why the page comes before the notice\n\nA client deciding whether to contact you is not measuring the length of your history. They are working out whether you do the thing they need, and they are doing it quickly. A going freelance portfolio is what compresses that check.\n\nThe company name works against you here. Three years at a large brand reads to a small client as expensive and probably not interested in a small job. It disappears anyway, because it was never yours to begin with.\n\nSo the page needs an identity switch: from whose you are to what you fix. That is not a wording change, it reorders everything. The positioning line moves to the top, the work gets sorted by the client you want, and the price plus a way to start sit in the footer.\n\n## Four things to do while you are still employed\n\nDo these while there is income, access, and no panic attached.\n\n- Copy everything you can carry out. Screenshots, exports, public links. Access tends to vanish the same afternoon, and people remember after it has gone.\n- Collect two quotes now. One sentence from a manager or a client is far easier to get before you leave than after.\n- Check what you are allowed to publish. Some contracts restrict it, and finding out after you posted gets the order backwards.\n- Work out your floor. How many months of expenses you can cover, and the smallest job you would accept. That number decides whether you pick clients or take whatever arrives.\n\n## The three lines the page has to carry\n\nLine one sits at the top and names who you help and what you fix. Skip the job title. "I rewrite landing pages for independent brands before launch" beats "former designer at X", because the first one is a sentence a buyer can act on.\n\nLine two goes under each piece of work and reports a result rather than a description. The description says "landing page built in Figma". The result says "conversion moved from 1.8% to 3.4% in two weeks". Only the second one gets read by whoever pays.\n\nLine three lives in the footer and says how to start. A stated price range plus an entry point that does not require a direct message beats a paragraph inviting people to chat. After quitting a job for freelancing, the first thing to break is usually not skill. It is the client failing to find where to pay.\n\n## How long zero to first invoice takes\n\n| Stage | Typical time | What you walk away with |\n|---|---|---|\n| Gathering material | One to two weeks | Three presentable pieces, two quotes |\n| Publishing the page | One evening | Positioning line, three pieces, a contact path |\n| First conversations | Two to four weeks | Ten real conversations, one or two become work |\n| First invoice | Four to eight weeks | One reusable case study and one quote |\n\nEight weeks is the common figure, not a promise. The people who move faster are usually the ones who published while still employed. The slower ones mostly waited until after they had left.\n\n## Pricing so the first job is not a loss\n\nKeep the first price low, and keep the scope fixed. The low price buys a first case study and a first quotable line, and those are worth more than the difference in money. Scope has to be written down because clients add requirements by default, and "one more revision while you are there" is where the hours go.\n\nShould the price be public? For individuals and small teams, yes. A public price removes the people who were never going to buy, and the time that saves covers another job. For companies, publish a starting figure and leave a booking link.\n\nPayment method follows the client. WeChat or Alipay links for domestic clients, Stripe or PayPal for overseas ones. Do not build an elaborate billing system to look established. One link that works is enough.\n\n## Three mistakes that slow this down\n\n- Rebuilding the resume as a page. A resume runs in time order; a page runs by the problems you solve. The two are sorted in opposite directions.\n- Waiting for the work to be perfect. The first version of the page exists to get the first client, not to win an award. Publish it, then revise on real feedback.\n- Relying on one channel. A page does not grow traffic by itself. Every delivery and every update is one more chance to send the link out.\n\n## FAQ\n\n- Can I build the page while employed? Yes, and you should. Use your own name and your own work, and stay clear of anything under NDA at your current job.\n- What if I have no client work yet? Take three things you have already done and can show, and write them as projects. Who needed it, which part was yours, what you changed, what happened.\n- Do I need my own domain? Not at the start. Bind one once people begin searching your name, which is when it starts to matter.\n- How much should the first job cost? Start at two to three times your employed hourly rate, then adjust for client size. Too low and it never climbs. Too high and there is no case study behind it.\n- Is taking work while employed risky? Check the non-compete and moonlighting clauses first. If there is doubt, publish the page as a portfolio and start quoting after you leave.\n\n## Three things to do today\n\nPick three pieces from your current work that you can show, and rewrite each in four lines: context, role, process, result. Change the top line to who you help and what you fix. Add an entry point where someone can pay or book without sending a message first.\n\nDo those three and the page stops being a record of where you worked and starts working as a counter. Put it up on dynamic-profile.shop while you still have room to edit calmly, and send it out before anyone asks.\n\nStart from the [home page](/), do those three things; if you are unsure which sections a page needs, read [the five sections every homepage needs](/blog/homepage-5-must-have-sections); for where the first money comes from, read [monetizing a personal page](/blog/monetize-personal-page-side-hustle).',
    },
  },

  {
    id: 54,
    slug: 'portfolio-style-editorial-vs-minimal-vs-card',
    publishedAt: '2026-10-08',
    tag: { zh: '设计', en: 'Design' },
    title: { zh: '编辑风 vs 极简风 vs 卡片风：主页风格怎么选', en: 'Editorial vs Minimal vs Card: Picking Your Portfolio Style' },
    date: { zh: '2026 年 10 月', en: 'October 2026' },
    body: {
      zh: '选 portfolio style，多数人卡在「哪个好看」，但主页 风格 选择真正的分歧点不在审美，在你有多少东西要给人看。编辑风、极简风、卡片风这三种 portfolio design style，表面差的是版式，底下差的是它们各自假设你有多少内容、访客打算停留多久。\n\n拿这套 homepage style guide 对照自己，比跟自己的喜好争论快得多。\n\n## 三种风格真正的差别在三件事\n\n第一，内容密度。编辑风假设你有多件作品要排；极简风假设你只有一句话要讲；卡片风假设你有一堆链接要分发。\n\n第二，阅读路径。编辑风是线性的，从上往下读；极简风是一屏读完；卡片风是随机点，访客点哪个算哪个。\n\n第三，更新成本。这点最容易被跳过。编辑风每月要补内容才不显得荒掉，极简风半年不动也没关系，卡片风换一个链接只要一分钟。\n\n挑错的结果不是变丑，是再也维护不动。\n\n## 一张表看清该选哪个\n\n| 风格 | 适合的内容量 | 访客停留 | 维护频率 | 最容易做砸的地方 |\n|---|---|---|---|---|\n| 编辑风 | 五件以上作品，还在更新 | 一到三分钟 | 每月 | 留白不够，字挤着字 |\n| 极简风 | 一句话加三个链接 | 二十秒 | 半年一次 | 信息太少，访客不知道你会什么 |\n| 卡片风 | 十个以上外部链接 | 随缘 | 每次加链接 | 卡片超过九个，等于没有重点 |\n\n这张表看行列交集就够了：内容多、又能每月更新的人选编辑风；只有一件事要讲的人选极简风；手上散着一堆资源的人选卡片风。\n\n## 编辑风：给内容多的人\n\n编辑风从杂志来，它的核心是有权重——有一条视觉主线，其他内容按重要性往下排。摄影师、插画师、独立开发者这类手上持续有产出的人，通常适合这条路。\n\n做编辑风最容易错的地方是留白。留白不要钱，但多数人舍不得给，于是标题贴着图片、正文贴着下面的卡片，整页看着很忙。留白不是省略，是给眼睛一个能停下来的地方。拿不准的时候，把行距和段间距先各加一半，通常一眼就能看出差别。\n\n## 极简风与卡片风：给链接多、内容少的人\n\n极简风出问题是「给得太少」，不是太素。一句话定位、两三个作品链接、一个联系方式，这是它的下限；低于这个下限，访客读完不知道你是干什么的。\n\n卡片风的问题正好反着：卡片加得太快。每多一张，前面每张的价值就掉一点。九个以内是人还能做选择的量，超过之后访客只看第一张，其余等于白放。\n\n这两种都不需要频繁照看，所以它们适合主页不是主战场的人——你的重点在别处，页面只负责把人送过去。\n\n## FAQ\n\n- 可以混着用吗？可以，但要有主次。多数人做成卡片风，第一屏再加一段编辑风的描述，效果不错；三种平均分配，就变成没有风格。\n- 换风格要重做页面吗？不用。改的是排序和密度，不是内容。先把首屏换成新风格，下面的板块下周再调。\n- 作品还不多先用哪种？先用极简风，摆三件最强的加一句定位。攒到五件以上再换编辑风，那时才有东西可排。\n- 风格跟目标有关系吗？有。要让人评判你的作品，编辑风；要往别处导流，卡片风；要留个联系方式让人记得你，极简风。\n\n## 选定之后的三步\n\n先看你现在手上有什么，而不是你想要什么样的主页。三件作品做极简风，五件以上做编辑风，一堆链接做卡片风。第二步只改首屏，别一次推翻整页。最后把跟这次选择无关的东西删掉，密度对了，风格才立得住。\n\n方向定下来之后，从[首页](/)，挑一个靠近的主题先试；想看板块怎么排，读 [主页必备的五个板块](/blog/homepage-5-must-have-sections)；编辑风具体怎么留白，看 [网格与留白](/blog/editorial-layout-grid-whitespace)。在 dynamic-profile.shop 上换主题不用重做页面，改完看一眼就知道这次选得对不对。',
      en: 'Choosing a portfolio style usually stalls on "which one looks better", but that is not where the three options differ. Editorial, minimal and card each assume something different about you: how much work you have to show, and how long a visitor plans to stay. Two different homepage style guide questions hide inside one aesthetic question.\n\nChecking yourself against that list moves faster than arguing with your own taste.\n\n## Three things that actually differ\n\nContent density. Editorial assumes several pieces to arrange. Minimal assumes one sentence to say. Card assumes a pile of links to hand out.\n\nReading path. Editorial reads top to bottom. Minimal reads in one screen. Card gets clicked at random, and whichever tile gets clicked wins.\n\nUpkeep. This is the row people skip. An editorial page needs new work every month or it starts to look abandoned. A minimal page can sit untouched for six months. Card costs nothing until you add or change a link.\n\nPick the wrong one and the page does not turn ugly. It stops getting maintained, which is worse.\n\n## Which one, in one table\n\n| Style | How much content | Visit length | Upkeep | How it usually goes wrong |\n|---|---|---|---|---|\n| Editorial | Five or more pieces, still shipping | One to three minutes | Monthly | Not enough whitespace, everything touching |\n| Minimal | One line plus three links | Twenty seconds | Twice a year | Too little said, nobody learns what you do |\n| Card | Ten or more outbound links | Whatever lands | Each time you add one | Past nine tiles, nothing stands out |\n\nRead the row matching your situation and the choice is mostly made. Plenty of work and a monthly habit points to editorial. One thing to say points to minimal. A scattered pile of resources points to card.\n\n## Editorial, for people with a lot to show\n\nEditorial comes from magazines, and the operative idea is weight. One visual lead, everything else ranked underneath. Photographers, illustrators and indie developers fit here, because the work keeps arriving.\n\nWhitespace is where this version fails. It costs nothing and people still ration it, so the headline touches the image and the body copy touches the card below, and the whole page looks busy. Whitespace is not omission. It is somewhere for the eye to stop. If you cannot judge it, add half again to the line spacing and paragraph spacing, then look once more.\n\n## Minimal and card, for links rather than work\n\nMinimal goes wrong by giving too little, not by being plain. One positioning line, two or three links to work, one way to reach you. That is the floor. Below it a visitor reaches the bottom without learning what you do.\n\nCard goes wrong in the opposite direction, because tiles accumulate. Each new one lowers the value of everything above it. Nine is roughly the point where someone can still choose; past that most visitors take the first tile and the rest are decoration.\n\nNeither asks for much attention afterwards, which suits anyone whose real work lives elsewhere and whose page only has to move people along.\n\n## FAQ\n\n- Can they be mixed? Yes, with one leading. A card grid under an editorial introduction across the top works well. Splitting a page evenly between all three reads as no decision at all.\n- Does switching mean starting over? No. It changes the ordering and the density rather than the content. Rebuild the first screen, then adjust what follows next week.\n- What if I do not have much work yet? Start minimal with your three strongest pieces and one line of positioning. Move to editorial once there are five or more things to arrange.\n- Does the goal change the answer? Yes. Editorial if someone has to judge your work, card if you are routing people outwards, minimal if you want to be remembered and easy to reach.\n\n## Three steps once you have picked\n\nLook at what you have today rather than the page you wish you had. Three pieces means minimal, five or more means editorial, a pile of links means card. Change only the first screen next, instead of overthrowing the whole page. Then cut whatever does not serve the choice, since density is what makes a style readable.\n\nOnce the direction is settled, pick a theme near it from the [home page](/). For how to order the sections, read [the five sections every homepage needs](/blog/homepage-5-must-have-sections), and for the whitespace itself, [grid and whitespace in an editorial layout](/blog/editorial-layout-grid-whitespace). Swapping themes on dynamic-profile.shop does not rebuild anything, so one look afterwards tells you whether the call was right.',
    },
  },

  {
    id: 55,
    slug: 'brand-consistency-one-page-every-platform',
    publishedAt: '2026-10-09',
    tag: { zh: '品牌', en: 'Branding' },
    title: { zh: '一张主页走天下：跨平台的个人品牌一致性', en: 'One Page, Every Platform: Brand Consistency' },
    date: { zh: '2026 年 10 月', en: 'October 2026' },
    body: {
      zh: '品牌 一致性 之所以难，是因为多数人把它当成设计活：定一个颜色，换同一张头像，就算做完了。真正会散掉的不是视觉，是那句自我介绍。同一个人在领英上写「产品设计师」，在 X 上写「前大厂，正在做点东西」，在作品集站上又是另一套说法。视觉上挑不出错，但访客拼不出这三处是不是同一个人。\n\n这篇讲的是 主页 一致性 里最枯燥的那部分：一致的个人品牌到底要一致什么，哪些不必一致，以及怎么用一张自己托管的主页把维护成本压下来。\n\n## 一致的个人品牌要一致什么\n\n每个平台奖励的语气不一样。领英奖励职位，X 奖励观点，Instagram 奖励画面，作品集站奖励过程。你在每个地方都按当地的写法写一遍，最后得到四个人，四个都是你。\n\n识别这件事是反过来的。招聘方在一个平台读到你，再去搜你的名字，他要的是第二处确认第一处。两处说法冲突，动摇的是他对你的判断，不是对平台的判断：这个人还没想清楚自己是谁。\n\n## 哪些要一致，哪些不必\n\n| 元素 | 要不要一致 | 原因 |\n|---|---|---|\n| 名字和 handle | 全平台 | 这是别人第二次找到你的方式 |\n| 头像 | 全平台同一张 | 人脸比 logo 好记 |\n| 那一句自我介绍 | 全平台同一句 | 这句话就是品牌本身 |\n| 语气 | 方向一致即可 | X 上短一点没问题，价值观不同就有问题 |\n| 完整履历 | 只放在自己的主页 | 主页才是长版本 |\n| 版式和排版 | 不必 | 平台各自的版式是预期内的 |\n\n看两列就够了：名字、头像、那一句话，全平台固定；其余都可以动。多数争论都出在「语气」这一行，而这一行恰恰是最不需要统一的。\n\n## 跨平台身份：让一张主页当源头\n\n自己托管一份长版本，理由不是情怀，是租来的平台会改规则。简介字段变短、版式调整、链接被埋掉，你花一下午写的那一版忽然哪里都放不下。\n\n你自己的主页放长版本：完整介绍、作品、联系入口。别处一律指回来。要改那句话的时候，只改一次。\n\n这就是全部的技巧。跨平台身份不再是一个同步问题，变成一页被其他地方引用的原文。你仍然在每个平台按当地语气发帖，只是那个「你是谁」的句子永远只有一个版本。\n\n## 每月一次的检查\n\n- 每月搜一次自己的名字，重点看第二、第三条结果，不是第一条。\n- 把你真在用的四个平台那一句简介并排看一遍。有两处不一致，当天就改。\n- 头像要换就一起换，要不就都不换。只在一个平台换掉的头像，看着像废弃账号。\n- 不用的账号注销掉。挂着旧职位的旧档案，比没有档案更伤。\n- 确认每个简介里的链接还能打开。简介里的死链是最常见的失败，也最容易漏。\n\n一个月二十分钟。改成每季度做一次，四个版本的你又会攒回来。\n\n## FAQ\n\n- 一致性是不是等于每个平台发一样的内容？不是。一致的是「人」，不是「内容」。帖子该不一样，说明你是谁的那句不该不一样。\n- 我在某个平台用了别的名字怎么办？职业平台统一用职业名，个人平台允许不一致。想一次统一所有地方，通常是哪里都不再更新的开始。\n- 那句简介要多接近？第一句逐字一致。会被记住、被复述的就是这一句。\n- 几乎不用的平台怎么处理？要么更新，要么关掉。挂着旧职位的档案会和现在这份互相打架。\n\n## 一张主页，然后才是各处\n\n把长版本写在自己的主页上，再让其他每个档案都引用它：同一个名字、同一张头像、同一句开头。先把这页挂到 dynamic-profile.shop，然后把那句话复制到你真在用的四个平台。\n\n不确定页面上该有哪几块，读 [主页必备的五个板块](/blog/homepage-5-must-have-sections)；想把语气定下来，看 [主页的语气与个性](/blog/tone-and-personality-homepage)。从[首页](/)开始做，一处权威版本，其余才便宜。',
      en: 'Brand consistency is easier to want than to hold. Most people treat it as a design job: pick a colour, reuse the headshot, done. The part that comes apart is the description. The same person is a product designer on one platform, "ex-big-tech, building things" on another, and a third thing entirely on a portfolio site. Nothing looks wrong, and a visitor still cannot work out whether the three belong to one human being.\n\nWhat follows is the boring half of a consistent personal brand: what has to match, what does not, and how one page you host yourself makes the rest cheap to maintain.\n\n## What a consistent personal brand actually requires\n\nEvery platform rewards a different register. LinkedIn rewards the title, X rewards the opinion, Instagram rewards the image, and a portfolio site rewards the process. Write natively in each one and you end up with four people, all of them you.\n\nRecognition runs the other way. A recruiter reads your profile on one site, then searches your name, and what they want is the second result confirming the first. When the two contradict each other, the doubt lands on you rather than on the platform: this person has not decided who they are.\n\n## What has to match, and what does not\n\n| Element | Match | Why |\n|---|---|---|\n| Name and handle | Everywhere | This is how somebody finds you a second time |\n| Headshot | One photo, everywhere | Faces get remembered better than logos |\n| The one-line description | The same sentence, everywhere | That sentence is the brand |\n| Tone | Direction, not degree | Shorter on X is fine; different values are not |\n| Full work history | On your own page only | The page is the long version |\n| Layout and formatting | Does not matter | Platform-specific layout is expected |\n\nTwo columns settle most arguments. Name, face and one sentence stay fixed everywhere. Everything else is allowed to move. The tone row is where people argue longest, and it is the row that needs uniformity least.\n\n## Cross platform identity: one page as the source\n\nThe reason to host the long version yourself is not sentiment. Rented platforms change their rules without asking. A bio field shrinks, a layout moves, a link gets buried, and the paragraph you spent an afternoon on stops fitting anywhere.\n\nYour own page holds the long version: the full description, the work, the way to reach you. Everywhere else points back at it. When the sentence needs rewriting, it gets rewritten once.\n\nThat is the whole trick. Cross platform identity stops being a synchronisation problem and becomes one page that everything else quotes. You still write natively on each platform. The sentence saying who you are only ever has one version.\n\n## The monthly check\n\n- Search your own name once a month. Look at the second and third results, not the first.\n- Line up the one-line description across the four platforms you actually use. If two disagree, fix them the same day.\n- Change the headshot everywhere at once or not at all. A photo that updates on one profile reads as an abandoned account.\n- Close accounts you no longer use. An old profile carrying an old job title does more damage than no profile.\n- Check that every link in a bio still resolves. Dead links in bios are the most common failure and the easiest to miss.\n\nTwenty minutes a month. Move to quarterly and the four versions of you accumulate again.\n\n## FAQ\n\n- Does consistency mean posting the same thing everywhere? No. It means the same person. The posts should differ; the line explaining who is posting should not.\n- I use a different name on one platform. Keep the professional name on professional platforms and accept that the personal one will not match. Trying to unify everything at once is usually how people stop updating anything.\n- How close does the description have to be? Word for word on the first sentence. That is the one that gets remembered and repeated.\n- What about platforms I barely use? Update them or close them. A profile carrying an old title argues with the current one.\n\n## One page, then everywhere else\n\nWrite the long version once, on your own page, then let every other profile quote it: same name, same photo, same opening sentence. Put that page up on dynamic-profile.shop, then copy the sentence into the four platforms you actually use.\n\nFor what belongs on the page, read [the five sections every homepage needs](/blog/homepage-5-must-have-sections), and for the voice behind the words, [tone and personality on a homepage](/blog/tone-and-personality-homepage). Start from the [home page](/). One canonical version is what makes the rest cheap.',
    },
  },

  {
    id: 56,
    slug: 'homepage-mistakes-anti-patterns',
    publishedAt: '2026-10-11',
    tag: { zh: '技巧', en: 'Tips' },
    title: { zh: '个人主页的"反例"：5 个常见错误', en: 'Personal Page Anti-Patterns: 5 Common Mistakes' },
    date: { zh: '2026 年 10 月', en: 'October 2026' },
    body: {
      zh: '主页 常见错误通常不长在审美上。它们长在顺序、证据和维护成本这三处，而这恰恰是 homepage mistakes 里最少被讨论的部分。\n\n看过的页面里，视觉挑不出毛病的占多数，但读完仍然不知道该联系你、该相信你、还是该翻到下一页。差别不在设计水平，在五个惯性动作：每个单看都没做错，合起来把转化推到零。\n\n下面拆的是 portfolio mistakes 里复现率最高的五个反例，长什么样，为什么会出现，以及为什么改一个通常只要十分钟。\n\n## 反例一：定位句写在第三段\n\n第一屏放一张大图，第二段放一句欢迎语，第三段才说「我帮独立品牌做上线前的落地页改版」。写的人觉得这是铺垫，读的人在前两段就把决定做完了。\n\n访客判断这里有没有他要的东西，用的时间不到十秒。这十秒里他只查一件事：你是不是做这类事的人。放在第三段的定位句，等于把答案停在多数人不会到达的位置。\n\n改法不用重写任何内容：把那句话挪到名字下面第一行，图往下压。这一步改的是顺序，不是文案。\n\n## 反例二：作品只有图，没有结果\n\n六张漂亮的截图，下面配一句「用 Figma 做的」。这是 portfolio mistakes 里最常见的一条：能看的都放上去了，能说服人的那部分留在了外面。\n\n付钱的人不读说明，读结果。「上线两周，注册转化率从 1.8% 到 3.4%」才是一句有用的标注，因为它回答了后面的那个问题。\n\n每件作品补两行就够：改了什么，数字变成了什么。确实没有数字的时候，一句客户原话也比一串工具名有用。\n\n## 反例三：联系入口等于没有\n\npersonal site errors 里最贵的一个，是把联系做成一道关卡。常见三种形态：只留邮箱，让对方自己组织一封邮件；只留私信，让对方先关注你；或者表单要填五个字段才提交。\n\n每一步都在筛人，而筛掉最稳的恰恰是真想问的那批。便宜的做法是一个你当晚就会回复的地址，或者一个不用先发消息就能预约的时间链接。\n\n判断方法很粗暴：下班路上用手机，二十秒内能联系起来吗。你自己做不到，别人也不会做到。\n\n## 反例四：版式撑不住你的更新频率\n\n挑版式时想的是「现在有多少东西」，用起来才知道要喂给它多少。编辑风每月要补内容，三个月不补，页面看着像搁置了；极简风半年不动也没事，但你明明每月都有东西发。\n\n主页 常见错误里这条最隐蔽，因为它在三个月之后才发芽。选中之前先问一句：我一个月真的能补几次？次数决定该用哪种版式，反过来挑，就是给自己预定一个必然停更的页面。\n\n## 反例五：移动端是事后补的\n\n桌面上排好的三栏，到手机上挤成一行半的列宽；三十六像素的标题在窄屏上要断三次。多数人是坐在电脑前看着自己做页面的，所以这一类 personal site errors 永远不会被制造它的人看见。\n\n补起来不用重做：把正文行宽压到一句话能装下，标题降一档，按钮放到拇指够得到的地方。然后用你自己的手机从头读一遍。\n\n## 五个反例放在一起\n\n| 反例 | 访客读到的信号 | 修复成本 |\n|---|---|---|\n| 定位句在第三段 | 不知道你是做什么的 | 五分钟，挪位置 |\n| 作品没有结果 | 看着好看，说不清价值 | 每件补两行 |\n| 联系入口太重 | 想问，但要先跨一道坎 | 换成当晚能回的地址 |\n| 版式重于更新频率 | 页面看着停更了 | 改密度，或改节奏 |\n| 移动端是补丁 | 手机上读完就退出 | 压行宽，手机自查 |\n\n## FAQ\n\n- 五个里先改哪个？先挪定位句。它不需要新写任何内容，而它不到第一位，剩下四个就没有评判的基准。\n- 页面已经带着这些毛病很久了怎么办？不要一次推倒。一次改一处，从第一屏开始，隔周再看，多数页面三轮之内就够了。\n- 怎么判断改完之后有没有用？只看一个数：读到联系人那一段的比例。其余的先不看。\n\n## 今晚的十分钟\n\n把定位句挪到第一行，给三件作品各补一行结果，把联系地址换成当天能回的那种。做完这三件，你的主页就从一份陈列品变成了一个柜台。\n\n从[首页](/)开始做；不确定板块该怎么排，读[主页必备的五个板块](/blog/homepage-5-must-have-sections)；留白和密度怎么拿捏，看[网格与留白](/blog/editorial-layout-grid-whitespace)。在 dynamic-profile.shop 上改这些不用重建页面，换主题也不会动你的内容。',
      en: 'Most homepage mistakes are not aesthetic. They sit in the order things appear, in whether there is any evidence, and in how much upkeep the layout demands. Those three are also the parts discussed least often.\n\nPlenty of pages I have looked at had nothing wrong with the design, and a visitor still reached the bottom without learning whether to contact you, trust you, or close the tab. The difference is not skill. It is five habits, each defensible alone, which together push conversion to zero.\n\nBelow are the five portfolio mistakes with the highest recurrence rate: what they look like, why they happen, and why fixing one usually takes ten minutes.\n\n## Anti-pattern 1: the positioning line in paragraph three\n\nA large image takes the first screen. A greeting takes the second. The sentence saying "I rewrite landing pages for independent brands before launch" arrives third. To whoever wrote it, that reads as build-up. To whoever is reading, the decision was already made.\n\nVisitors spend well under ten seconds deciding whether this is what they came for, and in those seconds they check one thing: do you do this kind of work. A positioning line sitting third is an answer parked where most people never arrive.\n\nNothing needs rewriting. Move the sentence under your name and push the image down. The change is in the order, not the copy.\n\n## Anti-pattern 2: work shown without outcomes\n\nSix attractive screenshots and, underneath, "built in Figma". This is the most common of the portfolio mistakes: everything visible made it onto the page, and everything persuasive stayed off it.\n\nWhoever pays reads results, not descriptions. "Conversion moved from 1.8% to 3.4% in two weeks" is a useful caption because it answers the question that comes next. Two lines under each piece cover it: what changed, what the number became. When there is genuinely no number, one sentence quoted from the client beats a list of tools.\n\n## Anti-pattern 3: a contact path that costs too much\n\nThe most expensive of the personal site errors turns contact into an obstacle. Three versions turn up repeatedly: an email address only, so the visitor composes a message from scratch; a direct message only, so they have to follow you first; or a form asking for five fields before it submits.\n\nEvery step filters somebody, and the people filtered out most reliably are the ones who actually wanted to ask. A cheaper version is an address you answer the same evening, or a booking link that needs no message first.\n\nThe test is blunt. On the way home, pull out your phone and try to reach yourself in twenty seconds. If you cannot, nobody else will either.\n\n## Anti-pattern 4: a layout heavier than your cadence\n\nLayouts get chosen for what you have today and judged by what you will have to feed them. An editorial page needs new work each month; leave it for three and it reads as abandoned. Minimal tolerates six months untouched, which is wrong if you publish every month.\n\nThis is the most hidden of the homepage mistakes, because it germinates about three months later. Before choosing, ask one question: how many times a month will I really add something. That number picks the layout. Choosing first and finding out later builds a page you are guaranteed to stop maintaining.\n\n## Anti-pattern 5: mobile as an afterthought\n\nThree columns that sit well on a desktop compress to a line and a half on a phone. A headline set at thirty-six pixels breaks three times on a narrow screen. Most people build the page from a laptop, so this class of personal site errors never gets seen by whoever caused it.\n\nThe repair is not a rebuild. Narrow the measure until a sentence fits on one line, drop the headline a size, put the button where a thumb lands. Then read the whole thing on your own phone.\n\n## The five side by side\n\n| Anti-pattern | What a visitor takes from it | Cost to fix |\n|---|---|---|\n| Positioning line in paragraph three | Unknown what you do | Five minutes, move it |\n| Work without results | Pretty, nothing said about value | Two lines per piece |\n| Contact path too heavy | Wants to ask, has to climb first | One address answered the same day |\n| Layout heavier than cadence | Page looks abandoned | Change density or rhythm |\n| Mobile as a patch | Reads it, leaves | Narrow the measure, check on a phone |\n\n## FAQ\n\n- Which one first? Move the positioning line. It needs no new copy, and while it sits below the fold the other four cannot be judged fairly.\n- My page has carried several of these for months. Do not rebuild it in one pass. One change at a time, starting at the first screen, checking a week later. Most pages are right within three rounds.\n- How do I know whether the fix worked? Watch one number: how many people reach the contact block. Ignore the rest for now.\n\n## Ten minutes, tonight\n\nMove the positioning line to the top. Give three pieces one line of result each. Replace the contact address with one you answer the same day. Those three turn a display cabinet into a counter.\n\nStart from the [home page](/). For how to order the sections, read [the five sections every homepage needs](/blog/homepage-5-must-have-sections), and for density and whitespace, [grid and whitespace in an editorial layout](/blog/editorial-layout-grid-whitespace). On dynamic-profile.shop none of this rebuilds anything, and changing themes leaves your content alone.',
    },
  },


  {
    id: 57,
    slug: 'cut-homepage-copy-by-half',
    publishedAt: '2026-10-12',
    tag: { zh: '文案', en: 'Copywriting' },
    title: {
      zh: '主页文案的减法艺术：删掉 50% 字',
      en: 'The Art of Removing Words: Cut 50% of Your Copy',
    },
    date: { zh: '2026 年 10 月', en: 'October 2026' },
    body: {
      zh: '主页文案的减法这件事，最有效的时机不是写的时候，是改的时候。多数人把主页文案当填空题做：标题、简介、三个板块、联系入口，填满就发布。填完回头再看，页面上没有一个字是错的，也没有一句是别人会记住的。\n\n主页 文案 减法的难点不在找不到词，在舍不得删。你写下的每句话都在替你担责，删掉就像承认那部分不重要。可你的主页只有十五秒左右，每留一句，就挤掉另一句。\n\n这篇讲三刀下去砍掉一半字的方法，以及为什么砍完之后联系率通常会往上走。\n\n## 为什么主页越长，读的人越少\n\n访客不是从上往下读的。他用两三秒扫一遍，找到跟自己有关的词，再决定要不要认真看。页面上的字越多，跟他有关的那句被扫到的概率越低。\n\nconcise homepage text 之所以有用，不是因为短本身有魔力，是因为短意味着你已经替他做完了筛选。一份塞满形容词的简介，等于把筛选的工作推给了一个正在赶时间的人，而赶时间的人会直接退出。\n\n## 第一刀：删形容词\n\n打开你的主页，把「专业」「丰富」「多元」「独特」这类词全部标出来，然后整句删掉，不要找同义词替换。\n\n这类词谁都能写，所以它传递的信息量是零。真正有区分度的句子永远带着具体：服务过多少个客户、把什么数值改到了什么数值、接哪一类活、不接哪一类。形容词删完之后剩下的通常还有一半以上，那部分才是真正在说话的。\n\n## 第二刀：删重复\n\n中英两版经常不是翻译关系，而是把同一件事说了两遍。还有一种更隐蔽的重复：标题写着「品牌设计师」，简介第一句又写「我是一名品牌设计师」。\n\n逐句过一遍，只问一句：这行字消失，访客会不会少知道一件事？不会，就删。多数主页走到这一步能减掉三成，读起来完全不缺东西。\n\n## 第三刀：删自我说明\n\n「我一直对设计充满热情」「从小喜欢画画」这一类句子，写的时候是真心的，读的时候是噪声。访客问的是你能做什么，不是你为什么走到这一步。\n\n换法很简单：把感受换成一件做过的具体的事。喜欢画画 → 上周交了三张封面稿。同一层意思，后者能验证。\n\n## 改前改后\n\n| 位置 | 改前 | 改后 |\n|---|---|---|\n| 简介 | 我是一名充满热情的多元设计师，善于捕捉独特灵感 | 我给独立品牌做上线前的落地页改版 |\n| 作品说明 | 用 Figma 精心制作的高质量页面 | 上线两周，注册转化率 1.8% → 3.4% |\n| 联系区 | 如有兴趣欢迎随时与我联系 | 周三前发邮件，我当天回 |\n| 标题下的副句 | 致力于为客户提供卓越的解决方案 | （删掉） |\n\ncopy editing portfolio 这件事值得单独讲一句：作品说明是最容易被形容词汇总淹没的地方，因为它看着是「介绍」，实际是「证据」。每行留一件事实，比一行华丽的话有用得多。\n\n## FAQ\n\n- 砍掉一半会不会显得太干？念一遍就知道了。太干是你听见句子互相解释的那种感觉，信息密的页面读起来是快的，不是空的。\n- 中英两版要字数对齐吗？不用。对齐的是信息顺序。同样的内容中文天然更短，跨语言数字数只会逼你把短的那一版注水。\n- 改完怎么判断有没有变好？只看一个数：读到联系人那一段的比例。前两周其他都先不看。\n- 整页都要改，从哪开始？只改第一屏。先定位句，再简介，再联系入口。下面的板块可以等。\n\n## 今晚的十分钟\n\n打开主页，删掉所有形容词，再用自己的手机从头读一遍。你要推读到联系人那一段的每一句，都是下一句要删的。\n\n上面三刀就是全部方法，而且在 dynamic-profile.shop 上跑这套不用重建页面：换主题不动你的字。从[首页](/)开始；板块顺序拿不准，对照[主页必备的五个板块](/blog/homepage-5-must-have-sections)；句子砍短之后还想保留个人语气，读[主页的语气与人格](/blog/tone-and-personality-homepage)。',
      en: 'Homepage copywriting improves when you stop writing and start cutting. Most people treat the page as a form to fill: headline, blurb, three sections, a contact line, publish. Read it back and nothing on the page is wrong. Nothing on it is memorable either.\n\nFinding words was never the problem. Deleting them is. Every line you remove feels like admitting that part did not matter, and your page gets around fifteen seconds. Each sentence you keep pushes another one out.\n\nThree passes, half the words. Here is the method, and why the contact rate usually moves up afterwards.\n\n## Why longer pages get read less\n\nVisitors do not read top to bottom. They scan for two or three seconds, find the phrase that concerns them, then decide whether to settle in. The more text sits on the page, the lower the chance that phrase gets found.\n\nConcise homepage text works not because brevity is magic, but because it means the filtering already happened. A blurb packed with adjectives hands that filtering to somebody who is short on time, and somebody short on time closes the tab.\n\n## Pass one: delete the adjectives\n\nOpen the page and mark every word like professional, extensive, diverse, or unique. Then delete the whole sentence instead of swapping in a synonym.\n\nThose words carry no information because anybody could write them. The sentences that separate you always carry specifics: how many clients, which number moved where, what kind of work you take, what you refuse. Whatever survives this pass is usually the half that was doing the talking.\n\n## Pass two: delete the repetition\n\nEnglish and Chinese versions often are not translations of each other so much as the same thing said twice. There is a quieter kind too: the headline says "brand designer" and the first line of the blurb says "I am a brand designer."\n\nGo sentence by sentence with one question: if this line disappeared, would a visitor know one fewer thing. When the answer is no, cut it. Most pages lose a third here and read no thinner for it.\n\n## Pass three: delete the self-explanation\n\n"I have always been passionate about design" and "I have drawn since I was small" are sincere when written and noise when read. Visitors want to know what you can do, not how you got there.\n\nThe substitution is simple: trade the feeling for something you did. Enjoy drawing becomes delivered three cover drafts last week. Same intent, and only one of them can be checked.\n\n## Before and after\n\n| Spot | Before | After |\n|---|---|---|\n| Blurb | A passionate, diverse designer with a unique eye | I rewrite pre-launch landing pages for independent brands |\n| Piece caption | A high quality page built carefully in Figma | Conversion moved 1.8% to 3.4% in two weeks |\n| Contact | Feel free to reach out anytime | Email before Wednesday, I answer the same day |\n| Sub-headline | Committed to delivering excellent solutions | (deleted) |\n\nOne note on copy editing portfolio work: captions are where adjectives pile up fastest, because a caption looks like an introduction when it is actually evidence. One fact per line beats one elegant line.\n\n## FAQ\n\n- Will cutting half make the page feel thin? Read it out loud once. Thin is what you hear when sentences only restate each other. Information-dense reads quick, not sparse.\n- Should English and Chinese versions match in length? Not word for word. Match the order of information. Chinese runs shorter for the same content, so counting words across languages only encourages padding.\n- How do I know whether the edit worked? Watch one number: how many visitors reach the contact block. Ignore the rest for the first two weeks.\n- The whole page needs it. Where do I start? First screen only. Positioning line, then blurb, then contact. Lower sections can wait.\n\n## Ten minutes tonight\n\nOpen the page, delete every adjective, then read the whole thing once on your own phone. Whatever you have to push past to reach the contact line is the next thing to cut.\n\nThose three passes are the whole method, and running them on dynamic-profile.shop rebuilds nothing: themes change, your words stay. Start from the [home page](/), check section order against [the five sections every homepage needs](/blog/homepage-5-must-have-sections), and once the sentences are short enough to still sound like you, read [tone and personality on a homepage](/blog/tone-and-personality-homepage).',
    },
  },

  {
    id: 58,
    slug: 'portfolio-examples-3-benchmarks',
    publishedAt: '2026-10-13',
    tag: { zh: '案例', en: 'Case Study' },
    title: { zh: '优秀主页巡礼：拆解 3 个标杆案例', en: 'Great Homepages: Deconstructing 3 Benchmarks' },
    date: { zh: '2026 年 10 月', en: 'October 2026' },
    body: {
      zh: '看 portfolio examples 通常是卡住的开始。你打开十几个站，个个都好看，关掉标签页时只留下一股情绪，没有任何方法。这篇反着来：三个优秀主页案例，逐个拆开，看清楚到底是哪一处决定撑起了整页。\n\n## 三件事是共通的\n\n三页都没有把自我介绍放在最前面。开口的是作品或者答案，人排在后面。这个顺序就是全部的技巧，也是多数 homepage inspiration 文章唯一不写的部分。\n\n也都只服务一类读者。摄影师不写给招聘方看，开发者不写给广告公司看，顾问不写给在校生看。写给所有人的页面，读起来就像没有写给任何人。\n\n## 案例一：一张图，压过一切\n\n一位旅行摄影师的主页，首屏只有一张满宽照片。没有轮播，没有十二张缩略图的网格，也没有「精选作品」这种标签。图下一行字：拍摄地点，以及谁委托的。\n\n这里的勇气是做减法。十二张图让访客去比较，一张图让访客去看。联系方式就压在那行字下面，整页因此不需要替自己辩解。\n\n## 案例二：写过程，不写交付物\n\n一位独立开发者的主页上只有三个项目，每个项目下面一段话，讲当时最要紧的那个决定：为什么换了数据库，为什么砍掉了表单，为什么上线推迟了一周。\n\n这就是作品集和文件列表的区别。截图展示的是做出来什么；关于取舍的那句话展示的是你怎么想，后者才是被雇佣的理由。\n\n## 案例三：滚动之前先回答一个问题\n\n一位顾问的主页，在访客滚动之前就回答了「这套东西对我要不要试用」。行业、常见周期、价格区间，全在首屏。客户名单之类的其余内容放在下面。\n\n服务型页面习惯把价格藏起来，理由是数字会吓跑人。真正吓跑人的是什么都不肯说的页面。\n\n## 各自赢在哪\n\n| 页面 | 首屏 | 去掉了什么 | 代价 |\n|---|---|---|---|\n| 摄影师 | 一张满宽图 | 选择瘫痪 | 展示的样片变少 |\n| 开发者 | 一个项目 + 取舍说明 | 截图墙 | 写起来更费时间 |\n| 顾问 | 周期 + 价格区间 | 猜测 | 会过滤掉随便看看的人 |\n\n## 怎么借，而不是怎么抄\n\n按你的问题挑那一列，别挑你最喜欢的那张页面。访客到不了联系方式，就学摄影师的顺序；到了联系方式还在问你到底做了什么，就学开发者那句取舍；第一封邮件就在问价格，就学顾问的首屏。\n\n## FAQ\n\n- 需要三个案例才显得可信吗？不需要。一个写透的案例胜过四张缩略图。三个是上限，不是门槛。\n- 作品要放在自我介绍上面吗？对多数人来说是的。喜欢作品的访客会回头读介绍，不喜欢的什么都不会读。\n- 写价格区间有风险吗？区间比沉默的风险小。沉默把对话推到邮件里，同一个问题你要反复回答。\n- 要改多少？一周改一屏。顺序优先，然后是每件作品下面那句话，联系方式那一行排在第三轮。\n\n## 给自己十分钟\n\n打开你的主页，用手或一张纸把首屏以下全部盖住。剩下的内容必须让一个陌生人知道你是做什么的、做给谁的。做不到，你就找到了今晚该改的那一段。\n\n这三个页面就是值得研究的 portfolio examples，而且它们都没有重新设计：每一页只是把本来就有的东西挪了位置。来 dynamic-profile.shop 做你的主页，从[首页](/)开始，用[个人主页必有的五个模块](/blog/homepage-5-must-have-sections)核对基础，布局还没定的话再读[编辑风 vs 极简风 vs 卡片风](/blog/portfolio-style-editorial-vs-minimal-vs-card)。',
      en: 'Looking at portfolio examples is usually where people stall. You open a dozen sites, every one of them handsome, and you close the tab with a mood and no method. This piece goes the other way: three great portfolio examples, each taken apart to show which single decision carries the page.\n\n## What the three have in common\n\nNone of them opens with a biography. The work arrives first, or the answer does, and the person comes second. That ordering is the whole trick, and it is the part most homepage inspiration posts leave out.\n\nEach one also commits to a single reader. The photographer does not write for recruiters, the developer does not write for agencies, and the consultant does not write for students. A page written for everybody reads like it was written for nobody.\n\n## Benchmark one: one image, above everything\n\nA travel photographer\'s page opens with a single frame at full width. No carousel, no grid of twelve thumbnails, no label reading selected work. Under the photo sits one line: where it was shot, and who commissioned it.\n\nThe nerve here is subtraction. Twelve images ask a visitor to compare, and one image asks them to look. Her contact block sits directly beneath that line, so the page never has to argue for itself.\n\n## Benchmark two: the process, not the deliverable\n\nAn independent developer\'s page carries three project entries, and under each one a short paragraph about the decision that mattered: why the database was replaced, why the form got cut, why launch slipped a week.\n\nThat is the gap between a portfolio and a list of files. Screenshots show what came out. A sentence about the trade-off shows how you think, and that is the part people hire.\n\n## Benchmark three: one question answered before the scroll\n\nA consultant\'s page answers "will this work for a company like mine" inside the first screen. Industry, typical timeline and a price range sit up top. The client list and everything else waits below.\n\nService pages tend to bury the price, on the theory that a number scares people off. What scares people off is a page that declines to tell them anything.\n\n## Where each one wins\n\n| Page | First screen | What it removes | What it costs |\n|---|---|---|---|\n| Photographer | One full-width image | Choice paralysis | Fewer samples on show |\n| Developer | One project plus the trade-off | Screenshot walls | Takes longer to write |\n| Consultant | Timeline and price range | Guesswork | Filters out browsers |\n\n## Stealing from them without copying\n\nPick the column that matches your problem rather than the page you liked most. If visitors never reach your contact block, take the photographer\'s ordering. If they reach it and still ask what you actually did, take the developer\'s trade-off line. If the first email asks about price, take the consultant\'s first screen.\n\n## FAQ\n\n- Do I need three case studies to look credible? No. One written properly beats four thumbnails. Three is a ceiling, not a threshold.\n- Should the work sit above the introduction? For most people, yes. A visitor who likes the work will read the introduction afterwards, and one who does not will read nothing.\n- Is a price range risky? A range carries less risk than silence. Silence moves the conversation into email, where you answer the same question repeatedly.\n- How much should I rewrite? One screen a week. Ordering first, then the sentence under each piece, then the contact line.\n\n## Ten minutes on your own page\n\nOpen your page and cover everything below the first screen with your hand or a sheet of paper. Whatever is left has to tell a stranger what you do and who it is for. If it does not, you have found tonight\'s job.\n\nThose three are the portfolio examples worth studying, and none of them needed a redesign: each one moved something that was already on the page. Build yours on dynamic-profile.shop, start at the [home page](/), check the basics against [the five sections every homepage needs](/blog/homepage-5-must-have-sections), and if the layout is still open, read [editorial vs minimal vs card](/blog/portfolio-style-editorial-vs-minimal-vs-card).',
    },
  },

  {
    id: 59,
    slug: 'no-code-site-builder-wave',
    publishedAt: '2026-10-14',
    tag: { zh: '趋势', en: 'Trend' },
    title: {
      zh: '生成器生态观察：无代码建站的新浪潮',
      en: 'The No-Code Site Builder Wave',
    },
    date: { zh: '2026 年 10 月', en: 'October 2026' },
    body: {
      zh: '无代码 趋势 这件事的起点其实很土：有人周五之前必须有个页面，又雇不起人，于是填了个表单、挑了个模板、发布了。当时这看着是个凑合的办法。没人料到的是，凑合出来的页面后来经常比外包做的更好，原因也直白——做页面的人，就是之后要一直跟这个页面相处的人。\n\n我们自己就在做这类工具，所以看 no code movement 的眼光是有偏向的。但真正让我意外的地方跟代码没关系。builder trend 2026 这场讨论的实质是「个人主页到底用来干什么」，而这个问题到现在也没有定论。\n\n## 2021 到 2026，到底变了什么\n\n三个变化，其中只有一个跟功能有关。\n\n第一，成品不再一眼看出是模板。早年的无代码页面很好认：同样的头图、同样的三栏、同样的圆角按钮。后来版式变好，不是因为选项变多，而是因为模板库开始有主张。给你九个版式的工具是在逼你做选择；给你六十个的，只是丢一个下拉框给你然后转身走开。\n\n第二，改页面从一个项目变成了一个动作。这条比第一条重要。四分钟能更新完的页面，跟需要专门腾出一个周六的页面，是两种不同的东西。能活下来的页面都是同一种：发一件新作品的成本，比决定要不要发还低。\n\n第三，买的人换了。2021 年用无代码的多半是请不起设计公司的小商家；到 2026 年，很大一部分变成了个人——设计师、摄影师、教练、手上有副业项目的开发者。他们绕开开发不是因为预算，是因为交接。他们要说的话每个月都在变。\n\n## 无代码这件事已经分成两派\n\n一派把它当成更便宜的外包：先写需求，再做设计稿，最后建站验收。成品拿去跟设计师做的页面比，细节上通常要输。\n\n另一派把生成器当成媒介本身。你在里面写，你在里面发，页面永远没有做完的那天。编辑风版式就是从这一派里长出来的，也是为什么这类页面看着像杂志——杂志本来就是为「按周期修订的东西」设计的版式。\n\n两派在自己的场景里都对。出问题的是拿一派的工具去做另一派的事。想做一次就扔在那儿的页面，限制多的生成器反而合适，灵活的那种是干扰；想每周更新的正好反过来，一个对版式毫无主张的工具会慢慢变成负担。\n\n## 2026 年生成器还差在哪\n\n| 短板 | 什么时候会碰到 | 下单前该问什么 |\n|---|---|---|\n| 导出与归属 | 你想搬走，版式带不走 | 能不能导出 HTML，导出来的还能不能看 |\n| 独立域名 | 地址里还挂着平台的名字 | 自定义域名在免费档，还是只在付费档 |\n| SEO 控制权 | 标题、描述、canonical 都是它替你生成的 | 能不能逐页改 meta |\n| 加载速度 | 页面带着一堆你没要求过的脚本 | 用手机流量试，别用办公室的 wifi |\n| 定价往上走 | 你需要的那个功能被挪到了更贵的档位 | 你离不了的那个功能在哪一档 |\n\n最后一行造成的后悔最多。免费档通常很大方，大方到你需要的那一项刚好在墙后面，而发现这件事的时候，你的链接已经全都迁过去了。\n\n## 谁该用，谁不该用\n\n该用的情况：页面归你自己维护，而且内容会变。摄影师每月上新作品，教练排一个等待名单，开发者手上有三个副业项目。这些场景的共同点是，最懂内容的人和最方便更新的人恰好是同一个，而一次交接的成本比更新本身还高。\n\n不该用的情况：页面要跟别的东西接起来。有自己的逻辑的预约系统，带税率规则的结算流程，任何需要登录的东西。无代码擅长呈现，不擅长对接，省下来的钱最后会花在胶水上。\n\n还有一种中间情况值得单独说：会写代码的人也在用生成器。以前这看着像偷懒，现在看着像合理的分配，因为个人主页里真正难的部分是写，不是标签。\n\n## FAQ\n\n- 无代码做的页面够不够拿去当正式作品集？多数情况够。看的人在意的是作品本身，以及能不能联系到你，这两样都不取决于页面是怎么搭出来的。\n- 生成器做的页面能被搜到吗？能，前提是你自己能控制标题、描述和 URL。发任何东西之前先确认这三样。\n- 用了生成器，内容还算我的吗？看导出条款。文字和图片是你的，版式通常不是，而版式只在你要走的那天才有意义。\n- 做第一个页面要多久？上线二十分钟，能发给客户两小时。中间差的那些时间基本都花在写字上。\n\n## 接下来该做什么\n\n先想清楚自己在哪一派，再挑工具，因为这个选择决定了后面所有的事。页面会每周改，就选对版式有主张、四分钟能发一次的；只发一次，就选限制最多但看着过得去的那个，赶紧做完。\n\ndynamic-profile.shop 是明确站在第一派的：填表单、选主题、发布，之后更新不用重建任何东西。从[首页](/)开始，再拿[主页必备的五个板块](/blog/homepage-5-must-have-sections)对一遍结构；如果你做教练或顾问而不是设计，[教练的个人主页该怎么做](/blog/coach-personal-page)这篇更贴你的情况。二十分钟能在 dynamic-profile.shop 上线一张页面，之后想换版式改个主题就行，内容不动。',
      en: 'The no code website trend started as a workaround. Somebody needed a page by Friday, could not hire anyone, so they filled in a form, picked a template and published. It looked like a compromise at the time. What nobody predicted was that the compromise would keep producing better pages than the commissioned ones, and the reason is plain: the person building the page is the person who has to live with it afterwards.\n\nI build one of these tools, so my view of the no code movement is not neutral. Still, the part that surprises me has nothing to do with code. Underneath the builder trend 2026 argument sits a different question, which is what a personal page is actually for. That question is still open.\n\n## What changed between 2021 and 2026\n\nThree shifts, and only one of them is a feature.\n\nThe output stopped looking like a template. Early no-code pages were recognisable at a glance: same hero image, same three columns, same rounded buttons. Layouts improved not because there were more of them but because the libraries started having opinions. A tool that offers nine layouts forces you to choose. One that offers sixty hands you a dropdown and leaves the room.\n\nEditing turned from a project into a move. This one matters more than the first. A page you can update in four minutes behaves differently from one that needs a Saturday. The pages that survive share a property: publishing a new piece of work costs less than deciding whether to publish it.\n\nThe buyer changed. In 2021 most no-code customers were small businesses that could not afford an agency. By 2026 a large share are individuals: designers, photographers, coaches, developers with side projects. They are not avoiding a developer over budget. They are avoiding the handoff, because what they want to say changes monthly.\n\n## The no code movement split in two\n\nOne camp treats it as cheaper outsourcing. Brief, mockup, build, sign-off. Judged against a designed page, the result usually loses on the details.\n\nThe other camp treats the builder as the medium. You write in it, you publish in it, and the page never finishes. Editorial layouts came out of this camp, which is why so many of these pages look like magazines. A magazine is a format built for something that gets revised on a schedule.\n\nEach camp is right inside its own case. Where people get burned is buying a tool from one camp and expecting the other. If the page ships once and sits there, a constrained builder suits you and a flexible one is a distraction. If you will revise it weekly, the reverse holds, and a builder with no opinion about layout becomes a chore.\n\n## Where builders fall short in 2026\n\n| Gap | When you run into it | What to ask before you commit |\n|---|---|---|\n| Export and ownership | You want to leave and cannot take the layout | Can you export the HTML, and is the export readable |\n| Custom domain friction | The URL still carries the platform name | Is a custom domain on the free tier or paid only |\n| SEO controls | Titles, descriptions and canonical are generated for you | Can you edit meta tags per page |\n| Load speed | The page ships scripts you never asked for | Test on mobile data, not on office wifi |\n| Pricing creep | The feature you need moved up a tier | Which tier owns the feature you cannot live without |\n\nThat last row causes most of the regret. Free tiers are generous right up to the point where the one thing you need sits behind a wall, and you find out after your links have already moved over.\n\n## Who should use one, and who should not\n\nUse one when the page is yours to maintain and the content changes. A photographer adding work every month, a coach running a waitlist, a developer with three side projects. What these share is that the person who knows the content is also the person around to update it, so a handoff would cost more than the update.\n\nSkip it when the page has to connect to something. Booking systems with their own logic, checkout flows with tax rules, anything behind a login. No-code handles presentation well and handoffs badly, and the money you saved goes into glue.\n\nOne middle case deserves its own line: people who can code and use a builder anyway. That used to read as lazy. Now it reads as a reasonable allocation, because the hard part of a personal page is the writing.\n\n## FAQ\n\n- Is a no-code page good enough for a professional portfolio? For most, yes. Reviewers look at the work and at whether they can reach you. Neither depends on how the page was built.\n- Will a builder page rank? It can, as long as you control titles, descriptions and URLs. Check those three before publishing anything.\n- Do I still own my content? Read the export terms. Your words and images are yours. The layout usually is not, which only matters on the day you leave.\n- How long does a first page take? Twenty minutes to something live, two hours to something you would send to a client. The gap is mostly writing.\n\n## What to do next\n\nDecide which camp you are in before choosing a tool, because that choice sets everything downstream. If the page will change weekly, pick the builder with opinions about layout and a publishing flow you can use in four minutes. If it ships once, pick the most constrained thing that looks acceptable and get it done.\n\ndynamic-profile.shop sits deliberately in the first camp: form, theme, publish, and updates afterwards that never require rebuilding anything. Start from the [homepage](/), then check your structure against [the five sections every homepage needs](/blog/homepage-5-must-have-sections). If you are a coach or consultant rather than a designer, [how a coach should build a personal page](/blog/coach-personal-page) is closer to your situation. Twenty minutes gets a live page on dynamic-profile.shop, and changing your mind about the layout later costs a theme switch, not a rebuild.',
    },
  },


  {
    id: 60,
    slug: 'chinese-creators-global-personal-brand',
    publishedAt: '2026-10-15',
    tag: { zh: '出海', en: 'Global' },
    title: {
      zh: '中文创作者的个人品牌出海',
      en: 'Chinese Creators Going Global with Personal Brands',
    },
    date: { zh: '2026 年 10 月', en: 'October 2026' },
    body: {
      zh: '中文创作者出海这件事，多数人第一步做的是翻译。把简介翻成英文，把作品说明翻成英文，发出去，然后等。等到第三个月还是没人联系，再回头看那张页面，问题不在英文：那页只是把一份中文简历塞进了英文句子里，它回答的是「你做过什么」，不是海外读者想问的「你能替我做什么」。\n\n搜 中文创作者出海 出来的攻略，九成在讲平台：哪一个给流量，哪一个能提现，哪一个会限流。几乎没有一篇在讲读者最终落在的那张页面，而决定要不要联系你的，恰恰是那张页面。\n\n这篇讲三件事：出海之后读者的问题怎么变了，跨语言时最容易失真的是哪几处，以及怎么用一张自己托管的主页把版本问题一次解决掉。\n\n## 出海之后，读者的问题变了\n\n国内读者默认带着上下文进来。平台、关注数、公司名，每一样都替你解释了一部分。海外读者没有这份上下文。他点进来只有十秒，要在这十秒里搞清楚你做什么、做给谁、怎么联系。\n\n个人品牌出海的第一个动作因此不是翻译，是补上下文。把「某厂高级设计师」改成「给 B 端 SaaS 做上线前的改版」，两句说的是同一件事，只有后一句能被一个没听过那家公司的人读懂。\n\n## 三处最容易在翻译里失真\n\n| 位置 | 国内版写法 | 出海版写法 | 为什么 |\n|---|---|---|---|\n| 头衔 | 资深设计师、团队负责人 | 做哪一类项目，做给谁 | 头衔靠公司名撑着，出了公司就失效 |\n| 作品说明 | 用了什么工具、做了多久 | 上线前后哪个数字变了 | 工具不是结果，数字才是 |\n| 联系入口 | 加微信详谈 | 一个当天会回的邮箱 | 海外读者不会为了问一句话去装一个软件 |\n\n第三行最常被忽略。国内默认联系方式是微信，而多数海外读者的动作停在「找不到一个正常邮箱」这一步，他不会留言告诉你这件事。\n\n## 别做两个版本，做一个源头\n\n中文创作者出海之后最容易失控的是版本。中文站说你在做 A，英文站还停在 B，社交档案上写着第三个方向。三处分开看都不算错，合起来就是「这个人还没想清楚」。\n\n处理办法是分主次，不是做同步。自己托管一个长版本当源头，其余位置只放一句介绍和一个链接指回来。要改的时候改一次，不用改三遍。\n\n这也顺带解决了语言问题：主页放两版，读者自己选。中英双语主页的字段顺序怎么排，[多语言主页：中英双语个人品牌](/blog/bilingual-homepages-international-brand) 这篇讲得更细。\n\n## 一份今晚就能跑的清单\n\n- 第一句用「给谁做什么」开头，不要用公司名或从业年限开头。\n- 每件作品留一个数字：转化、留存、交付周期，哪个能验证就写哪个。\n- 联系入口只放一个当天会回的邮箱，不要放三个。\n- 各平台简介里那句介绍逐字一致，其余按当地语气写。\n- 每季度搜一次自己的名字，看第二、三条结果，不是第一条。\n\n## FAQ\n\n- 英文写得不够好，要不要先等等？不用。读者判断的是你做什么，不是从句写得漂不漂亮。语法一般但有内容的页面，比没有页面强得多。\n- 中英两版要放一样多的内容吗？不用。对齐的是信息顺序，不是字数。中文天然更短。\n- 还没有海外客户，现在出海有意义吗？有。等有了客户再做，页面恰好在最需要它的那几个月里是空的。\n- 用国内平台还是海外平台？看你的人在哪儿。这条没有通用答案，但页面必须放在你自己的域名上，因为平台会换，域名不会。\n\n## 先把那一句改好\n\n出海真正要动的是「你是谁」这句话：把它改成一个手边没有任何上下文的人也能读懂的版本。剩下的翻译工作都很便宜。\n\n在 dynamic-profile.shop 上做这件事不用重建页面：填表单、选主题、发布，中英两版放在同一个地址上。从[首页](/)开始，把第一句改成「给谁做什么」，再照[多语言主页：中英双语个人品牌](/blog/bilingual-homepages-international-brand)把两版的字段顺序对齐。二十分钟够改完，之后加新作品不用再动结构。',
      en: 'Most chinese creator global advice starts with platforms. Which site pays, which one already has the audience you want. Almost none of it is about the page that audience lands on, and that page is where the decision to contact you gets made.\n\nFor a chinese creator abroad, the first instinct is translation. The bio goes into English, the project captions go into English, and then nothing happens for three months. The page is not wrong. It answers a question nobody overseas is asking, because it says what you did rather than what you would do for them.\n\nThree things follow: how the reader\'s question changes once you leave, which three spots lose the most in translation, and how one page you host yourself ends the version drift.\n\n## The question changes when the reader does\n\nA domestic reader arrives with context already loaded. The platform, the follower count and the company name each carry part of the explanation. An overseas reader has none of it. Ten seconds, three questions: what you do, who you do it for, how to reach you.\n\nSo the first move in personal brand china work is not translation, it is context. "Senior designer at a large tech company" becomes "I rewrite pre-launch flows for B2B SaaS." One sentence describes the same job, and only one of them survives being read by somebody who has never heard of the employer.\n\n## Three spots that lose the most\n\n| Spot | Domestic version | Version that travels | Why |\n|---|---|---|---|\n| Title | Senior designer, team lead | Which projects, and for whom | A title leans on the employer\'s name and stops working the moment you leave it |\n| Project caption | Tools used, hours spent | Which number moved after launch | Tools are not outcomes |\n| Contact | Message me on WeChat | An email answered the same day | An overseas reader will not install an app to ask one question |\n\nThat last row does the most damage. WeChat is the default at home, and the reader who cannot find an ordinary email address leaves without telling you why.\n\n## One source, not two versions\n\nWhat breaks next is versions. The Chinese page says you are doing A, the English page still says B, and a social profile somewhere says a third thing. Each is defensible on its own. Together they read as somebody who has not decided.\n\nThe fix is hierarchy rather than synchronisation. Host one long version yourself. Everywhere else carries a single sentence and a link back to it. When it changes, it changes once.\n\nThat settles the language question too, since the page can carry both versions and the reader picks. For how to order the fields on a bilingual page, see [bilingual homepages for an international brand](/blog/bilingual-homepages-international-brand).\n\n## A checklist you can run tonight\n\n- Open with who you do it for and what, not with an employer name or years of experience.\n- Give every project one number: conversion, retention, delivery time, whichever can be checked.\n- One contact route, an email you answer the same day.\n- Keep the one-line description word for word across platforms, and let the tone follow local habits.\n- Once a quarter, search your own name and read the second and third results rather than the first.\n\n## FAQ\n\n- My English is not good enough. Should I wait? No. Readers judge what you do, not how your subordinate clauses are built. A page with uneven grammar beats no page at all.\n- Do the two language versions need the same amount of text? No. Match the order of the information, not the word count. Chinese runs shorter for the same content.\n- No overseas clients yet. Is this worth doing now? Yes. Build it after the first client arrives and the page is empty during the months it mattered most.\n- Home platforms or foreign ones? Whichever is where your readers are. There is no general answer, but the page has to sit on a domain you own, because platforms change and domains do not.\n\n## Fix the one sentence first\n\nGoing global means rewriting the sentence that says who you are, so that it works without any context around it. Adding a second language after that is the cheap part.\n\nOn dynamic-profile.shop none of it rebuilds the page: fill a form, pick a theme, publish, and both languages live at the same address. Start at the [home page](/), change the opening line to who and what, then line the fields up across both versions using [bilingual homepages for an international brand](/blog/bilingual-homepages-international-brand). Twenty minutes covers it, and new work after that needs no structural change.',
    },
  },



  {
    id: 61,
    slug: 'personal-homepage-ai-age',
    publishedAt: '2026-10-20',
    tag: { zh: '观点', en: 'Opinion' },
    title: { zh: '个人主页与 AI 时代的个人展示', en: 'Personal Homepages in the AI Age' },
    date: { zh: '2026 年 10 月', en: 'October 2026' },
    body: {
      zh: '个人主页在 AI 时代还值不值得做，这个问题我自己反复过。答案先放这儿：值得，而且比两年前更值得，理由跟审美没关系。\n\n三十秒能写出一份自我介绍，能给作品配一段听着专业的说明，甚至能直接生成一整页排版干净的站点。生成这件事的成本掉到了零，于是「有没有一个页面」不再传递任何信息。AI 时代 个人展示里真正开始传递信息的是另一件东西：页面上的那句话，能不能一路追溯到某件你真的做过的事。\n\n这篇讲三件事：AI 把哪一步做便宜了，个人主页剩下的价值长在哪，以及一份今晚能跑完的改法。\n\n## AI 把哪一步做便宜了\n\n便宜的是「从没有到有」。\n\n以前一张主页的成本里，大半是排版和写代码。填表单、调间距、改移动端，这些现在都不用你动手。我们自己在做这类生成器，所以这话我说得很实在：把建站这一步做到几乎免费，是这个品类本来就想要的结果，不是副作用。\n\n贵的那一步从来不是建站。是决定放什么，以及每隔几个月回来更新一次。今天卡在生成器里的人，卡住的仍然是这两处，跟 2021 年一样。生成变便宜之后，读者的判断标准就跟着往上抬了一格：两三年前，一个排版干净的页面本身就能说明点什么，因为它意味着这个人至少愿意花时间；现在排版的信号值是零，读者默认你的页面是生成的，也默认文字里有 AI 参与过。ai era personal page 这个词组最近出现得越来越多，讨论的其实都是这一层。\n\n## 三处 AI 替不了的地方\n\n带数字的那一句。「上线两周，注册转化率从 1.8% 到 3.4%」这种句子模型编不出来，因为它要么真发生过，要么一问就穿。每件作品留一个数字，是成本最低、也最难伪造的一层。\n\n你承认过的取舍。为什么那个功能砍掉了，为什么上线推迟一周。这类句子里带着你的判断，而判断是从具体处境里长出来的，通用模型给不了。这也是招聘方读完会约你聊、而不是回一封模板拒信的那种内容。\n\n你愿意公开站在哪一边。不接哪类活，不接受什么条件，跟谁合作过、不跟谁合作。立场是排除法，而模型写东西的策略是尽量不得罪任何人，两者方向相反。\n\n## AI 能做什么，你要做什么\n\n| 位置 | AI 十秒能给的 | 只有你能补的 |\n|---|---|---|\n| 简介 | 一段通顺的自我介绍 | 给谁做、做什么，具体到行业 |\n| 作品说明 | 通用描述 | 上线前后哪个数字变了 |\n| 更新动态 | 一篇像样的周更 | 这周真实卡住你的那件事 |\n| 联系方式 | 一个表单 | 一个你当天会回的地址 |\n| 语气 | 得体的中性腔 | 你自己说话时的那几个词 |\n\n右边那一列加起来不到两百字，它就是 ai personal brand 里唯一抄不走的部分。\n\n## 今晚四十分钟怎么改\n\n1. 打开主页，把简介里的形容词全部删掉，换成「给谁做什么」的一句话。\n2. 挑三件作品，每件补一行：改了什么，数字变成什么。确实没有数字，就写一句客户原话。\n3. 发一条动态，写这周真实卡住你的一个问题，两百字以内，不用给结论。\n4. 联系入口只留一个当天会回的邮箱，其余删掉。\n5. 用自己的手机从头读一遍。\n\n五步做完，页面大概会变短，读起来却更慢，因为每一行都在说一件具体的事。\n\n## FAQ\n\n- AI 生成的页面会被搜索引擎降权吗？不会以「是不是 AI 写的」作为判断依据。能排上去的仍然是回答了某个具体问题的页面，而通用生成的内容通常答不到那么具体。\n- 要不要标注哪些内容用了 AI？作品说明这类要标。你声称做过的事，读者会默认是你做的。\n- 文字是我的，但语气是模型的，这算问题吗？算。语气是读者判断「这是不是同一个人写的」的主要依据，两处不一致，页面读起来像两个人。\n- 每周要花多少时间维护？十五分钟。发一条动态，改一处数字。需要腾出一个下午才能更新的页面，最后都会停更。\n\n## 现在该动的那一步\n\n别重写整页。把简介换成「给谁做什么」，给三件作品各补一行数字，发一条这周真实的动态。三件事四十分钟，做完你的页面就从一份陈列品变成了一个能被验证的东西。\n\n在 dynamic-profile.shop 上做这些不用重建页面，换主题也不会动你的内容。从[首页](/)开始；不确定板块怎么排，对照[主页必备的五个板块](/blog/homepage-5-must-have-sections)；语气怎么拿回自己的，读[主页的语气与人格](/blog/tone-and-personality-homepage)；AI 工具该用在哪一步，[2026 年最实用的 AI 个人品牌工具](/blog/ai-personal-branding-tools-2026) 这篇拆得更细。',
      en: 'I keep going back and forth on whether a personal homepage is still worth building in the AI age. Here is where I have landed: yes, and more than two years ago, for reasons that have nothing to do with design.\n\nThirty seconds gets you a polished bio, a professional-sounding caption for each project, and a clean one-page site with the layout already handled. Generation is free now, so having a page at all tells a reader nothing. What carries information instead is this: whether the sentences on the page trace back to something you actually did.\n\nThree things below: which step AI made cheap, where the remaining value of an ai era personal page sits, and a set of edits you can finish tonight.\n\n## The step AI made cheap\n\nGoing from nothing to something.\n\nMost of the cost of a homepage used to be layout and markup. Forms, spacing and the mobile pass no longer need your hands. I build one of these generators, so I will say this plainly: making the build step nearly free is what this category was always aiming at, not a side effect.\n\nThe expensive step was never building. It is deciding what goes on the page, then coming back every few months. The people who stall inside a generator today stall in those two places, same as in 2021. Once generation got cheap, the reader\'s bar moved up a notch: two years ago a tidy layout said something, because it meant somebody had spent time on it. Layout says nothing now. Readers assume the page was generated and assume the copy had help, and what they actually check is whether the page contains one thing too specific to invent. That is what most of the ai era personal page argument is really about.\n\n## Three places AI cannot fill in\n\nThe sentence with a number in it. "Conversion moved from 1.8% to 3.4% in two weeks" cannot be produced on demand, because either it happened or it collapses on the first question. One number under each piece of work is the cheapest layer of proof and the hardest to fake.\n\nThe trade-off you admitted to. Why the feature got cut, why launch slipped a week. Sentences like that carry your judgment, and judgment grows out of a specific situation, which is exactly what a general model does not have. It is also the part that earns a call instead of a templated rejection.\n\nWhere you are willing to stand. What work you refuse, what terms you do not take, who you work with and who you do not. A position is an act of exclusion, and models are trained to offend nobody. The two pull in opposite directions.\n\n## What AI does, what you do\n\n| Spot | What AI gives in ten seconds | What only you can add |\n|---|---|---|\n| Bio | A fluent paragraph | Who you do it for, named by industry |\n| Project caption | A generic description | Which number moved after launch |\n| Updates | A decent weekly post | The thing that actually blocked you this week |\n| Contact | A form | An address you answer the same day |\n| Voice | Competent neutrality | The few words you actually use |\n\nThe right column totals under two hundred words, and it is the only part of ai personal brand work that cannot be copied.\n\n## Forty minutes tonight\n\n1. Open the page, delete every adjective in the bio, and replace it with one sentence naming who you do it for.\n2. Pick three pieces of work and add one line to each: what changed, what the number became. No number available? One sentence quoted from the client.\n3. Post one update about the problem that actually blocked you this week. Under two hundred words, no conclusion required.\n4. Leave one contact address you answer the same day. Delete the rest.\n5. Read the whole thing on your own phone.\n\nThe page gets shorter. It reads slower, because every line is about something specific.\n\n## FAQ\n\n- Do AI-generated pages get penalised in search? Not for being generated. What ranks is a page that answers a specific question, and generic generation rarely gets that specific.\n- Should I disclose where I used AI? For project captions, yes. Whatever you claim to have done, the reader assumes you did it.\n- The words are mine but the voice is the model\'s. Does that matter? It does. Voice is the main signal a reader uses to decide whether one person wrote the page. When it drifts, the page reads like two people.\n- How much upkeep per week? Fifteen minutes. One update, one number revised. A page that needs an afternoon rarely survives.\n\n## The one step to take\n\nDo not rewrite the page. Swap the bio for a sentence naming who you do it for, add one number under three pieces of work, and post one real update from this week. Forty minutes, and the page stops being a display case and becomes something a reader can check.\n\nNone of this requires rebuilding on dynamic-profile.shop, and switching themes leaves your content alone. Start from the [homepage](/); if the section order is still undecided, check [the five sections every homepage needs](/blog/homepage-5-must-have-sections); to get your voice back, read [tone and personality on your homepage](/blog/tone-and-personality-homepage); for where AI tools belong in the workflow, [Top AI Personal Branding Tools for 2026](/blog/ai-personal-branding-tools-2026) breaks it down further.',
    },
  },

  {
    id: 62,
    slug: "homepage-resume-portfolio-working-as-a-set",
    publishedAt: "2026-10-21",
    tag: { zh: "职业", en: "Career" },
    title: { zh: "主页、简历、作品集三件套如何配合", en: "Homepage + Resume + Portfolio: Working as a Set" },
    date: { zh: "2026 年 10 月", en: "October 2026" },
    body: {
      zh: "resume portfolio homepage 这套三件套最容易做错的地方，是让三个入口重复同一份经历。招聘方打开简历，是为了在几十秒内判断你是否匹配；点进作品集，是为了核对你到底做过什么；再看个人主页，是为了知道你现在在做什么、该怎么联系。三页内容可以重叠，但任务不能重叠。\n\n我见过最费力的一种做法，是每次改项目都同时改三份长文。结果通常是简历写着旧职位，作品集还放着两年前的截图，主页则堆满没有上下文的链接。更省事的做法，是先给三页分工，再让它们按固定顺序交接读者。\n\n## resume vs portfolio：先把职责分开\n\n| 页面 | 读者想知道什么 | 最适合放什么 | 不该承担什么 |\n|---|---|---|---|\n| 简历 | 你是否符合岗位条件 | 职位、时间、职责、可核对的结果 | 完整项目故事 |\n| 作品集 | 你的工作质量如何 | 过程、取舍、成品、结果 | 全部职业经历 |\n| 个人主页 | 你是谁、现在做什么 | 定位、精选入口、最近动态、联系方法 | 每个项目的所有细节 |\n\n简历负责筛选，作品集负责举证，个人主页负责把两者连起来。把这个顺序记住，比纠结页面该做多长更有用。\n\n## 围绕一句承诺搭好 three piece set\n\n先写一句能同时放进三个入口的话，格式很简单：我为哪类人解决什么问题。比如「我给独立软件团队做注册流程改版」，比「资深产品设计师」更容易贯穿三页。\n\n接着做四次小改动：\n\n1. 简历顶部保留这句定位，再列与目标岗位直接相关的经历。\n2. 每段经历只挂一个作品集链接，落到对应案例，不要都指向作品集首页。\n3. 作品集案例结尾写清你的职责、结果，以及回到个人主页的路径。\n4. 个人主页只精选两到四个入口，并标出最近一次更新日期。\n\n这样处理之后，读者不会在三个页面之间迷路。每一次点击都回答一个新问题。\n\n## 不同读者会走不同路线\n\n招聘方通常从 PDF 简历开始。他先扫职位和数字，再点一个案例确认你是否夸大，最后才打开主页看最近状态。自由职业客户往往反过来：先从社交简介落到主页，看到服务范围后再读案例，只有采购或合同阶段才需要简历。\n\n所以，不必强迫所有人走同一条线。真正需要一致的是事实：项目日期、职责和结果数字在三处不能打架。表达方式可以不同。简历写「注册完成率提高 18%」；作品集解释做了哪次取舍；主页只写「注册流程改版案例」，再把人送到完整版。\n\n## 做一次交接测试\n\n找一个没参与过项目的人，让他从任意一页开始，完成下面四个动作：\n\n- 在三十秒内说出你做什么。\n- 找到一个与目标职位相关的案例。\n- 核对你在案例里的职责。\n- 找到一个真的会回复的联系入口。\n\n只要有一步超过两次点击，就该缩短路径。常见问题不是内容太少，而是链接文字写成「了解更多」，读者不知道下一页会得到什么。把它改成「查看支付流程案例」或「下载一页简历」，动作会清楚很多。\n\n## FAQ\n\n- 简历和个人主页需要放完全相同的经历吗？不需要。简历按岗位筛选，主页按你当前的方向筛选，但日期和结果必须一致。\n- 作品集没有量化结果怎么办？写清限制、你的决定和交付后的反馈。不要为了好看编数字。\n- 三件套都要中英双语吗？面向双语岗位时要。两版的信息顺序一致即可，字数不必对齐。\n- 应该先改哪一个？先改个人主页的第一屏，因为另外两页最终都会把人带到这里。\n\n## 今晚把三件套接起来\n\n先打开三页，把重复且过时的段落删掉，再为每一页写一句任务说明。随后检查每个链接是否把读者送到明确的下一步。整套工作不需要重新设计，重点只是分工和交接。\n\n在 dynamic-profile.shop 可以把作品、动态和联系入口放进同一张个人主页。从[首页](/)开始搭第一屏，再用[应届生作品集主页指南](/blog/graduate-portfolio-page-guide)检查简历入口，更多主页写法都在[博客](/blog)。",
      en: "A resume portfolio homepage set works best when you stop asking each page to hold the whole story. A recruiter opens the resume to decide whether you match the role. They open the portfolio to check what you actually made. They open the personal homepage to see what you are doing now and how to reach you. The material may overlap, but the jobs should not.\n\nThe most tiring setup I have seen makes the owner rewrite the same long history in three places. A few months later, the resume has an old title, the portfolio has screenshots from a retired product, and the homepage has links with no context. There is an easier arrangement: assign one job to each page, then make the handoffs obvious.\n\n## Resume vs portfolio: give each page one job\n\n| Page | What the reader wants | What belongs there | What it should not carry |\n|---|---|---|---|\n| Resume | Do you fit this role? | Titles, dates, scope, verifiable results | A full project narrative |\n| Portfolio | How good is the work? | Process, trade-offs, output, outcome | Your entire employment history |\n| Homepage | Who are you now? | Positioning, selected routes, recent activity, contact | Every detail from every project |\n\nThe resume filters. The portfolio supplies evidence. The homepage connects them and shows that the person behind both is active. That sequence is more useful than a universal page-length rule.\n\n## Build the three piece set around one promise\n\nWrite one sentence that can appear in all three places: who you help and what you do for them. \"I redesign signup flows for independent software teams\" travels better than \"senior product designer\" because a reader can picture the work.\n\nThen make four small edits:\n\n1. Put the promise at the top of the resume, followed by experience relevant to the target role.\n2. Give each role one direct portfolio link. Send it to the matching case study, not the portfolio index.\n3. End each case study with your responsibility, the result, and a route back to the homepage.\n4. Keep two to four selected routes on the homepage and show when it was last updated.\n\nNow every click answers a new question instead of repeating the previous page.\n\n## Different readers take different routes\n\nA recruiter often starts with the PDF. They scan titles and numbers, open one case study to check the claim, then visit the homepage to see recent work. A freelance client often moves in reverse. They arrive from a social bio, read the service line on the homepage, open a case study, and ask for a resume only when procurement or a formal contract requires it.\n\nThere is no need to force both readers down one path. The facts are what must agree: project dates, responsibility, and result numbers cannot change between pages. The wording can. A resume might say \"completion rose 18%.\" The case study explains the decision behind that result. The homepage labels it \"signup flow redesign\" and sends the reader to the full account.\n\n## Run a handoff test\n\nAsk somebody who did not work on the project to start on any one of the pages and complete these four actions:\n\n- Say what you do within thirty seconds.\n- Find one case study related to the target role.\n- Confirm what part of the work was yours.\n- Find a contact route that you really answer.\n\nIf an action takes more than two clicks, shorten the route. The usual problem is not missing material. It is link text such as \"learn more,\" which gives no clue what waits on the next page. \"Read the checkout redesign case\" or \"download the one-page resume\" makes the choice plain.\n\n## FAQ\n\n- Should the resume and homepage list exactly the same roles? No. Filter the resume for the position and the homepage for your current direction. Dates and outcomes still need to agree.\n- What if a portfolio project has no metric? Explain the constraint, your decision, and the feedback after delivery. Do not invent a number for decoration.\n- Does the whole set need English and Chinese versions? For bilingual roles, yes. Keep the information order consistent; the word counts can differ.\n- Which page should I fix first? Start with the homepage first screen, because the other two routes eventually send readers there.\n\n## Connect the set tonight\n\nOpen all three pages, remove repeated or stale paragraphs, and write one job description for each page. Then check that every link sends the reader to a named next step. No redesign is required. This is an editing and routing job.\n\nUse dynamic-profile.shop to keep selected work, current updates, and contact details on one personal page. Start at the [homepage](/), use the [graduate portfolio page guide](/blog/graduate-portfolio-page-guide) to check the resume route, and browse the [blog](/blog) for more page-writing examples.",
    },
  },

  {
    id: 63,
    slug: "five-second-test-first-impression-homepage",
    publishedAt: '2026-10-22',
    tag: { zh: '教程', en: 'Tutorial' },
    title: { zh: "主页五秒测试：第一印象该怎么检验", en: "The Five-Second Test for Your Homepage First Impression" },
    date: { zh: '2026 年 10 月', en: 'October 2026' },
    body: {
      zh: "个人主页 第一印象 是在别人读完第一句之前就形成的。五秒，可能更短。访客在这段时间里决定要不要往下滚，而他手上几乎没有信息：一个标题、一张图，以及页面加载得够不够快。\n\n五秒测试 这个方法出自可用性实验室：把页面展示五秒，收起来，问对方记住了什么。拿它测自己的主页，答案通常不好看。多数人说不出你是做什么的。\n\n这篇讲三件事：不招人也能跑起来的测试办法，首屏该检查哪几项，以及真正经得起访客检验的几条建议。\n\n## 五秒测试 到底在测什么\n\n测的是回忆，不是审美。五秒之后，看的人应该能说出三件事：你做什么、做给谁、下一步点哪里。\n\n注意不在这张清单上的东西：没人被问这个页面好不好看。好看的页面经常在这项测试上翻车，因为一个舒服的版式没有可供复述的内容。一句具体的句子反而能。\n\n它之所以有效，是因为五秒大约就是一个陌生人愿意给你的时间。不是因为人没礼貌，是因为你后面那个标签页只有一个按键的距离。\n\n## 首屏 检查清单\n\n首屏指的是中端手机不滚动就能看到的部分，不是你笔记本上的那一屏。用手机查。两者之间的差距，通常就是第一印象丢掉的地方。\n\n| 元素 | 必须回答 | 常见失误 |\n|---|---|---|\n| 标题 | 你做什么，做给谁 | 一个没有宾语的职位名 |\n| 开头那句 | 为什么要继续看 | 三句形容词 |\n| 一张图 | 你的工作长什么样 | 一张办公桌的图库照片 |\n| 主行动 | 下一步去哪儿 | 两个等重的按钮 |\n| 联系方式 | 今天怎么找到你 | 一个没人看的表单 |\n\n五行里有四行的失误是同一种：页面在描述这个人，而不是这份工作。「八年经验资深设计师」回答的是没人问的问题；「我给小型 SaaS 团队重做注册流程」回答的是被问到的那个。\n\n## 你大概会拿到三种结果\n\n第一种是空白。对方只记得一个颜色。说明你的标题是装饰性的，把它改写成一句关于具体工作的说法。\n\n第二种是误读。对方以为你做的是相邻的某件事。这很少是对方的错。在三个方向之间摇摆的页面，会被读成中间那个。\n\n第三种是答对了，然后补一句「接着我不知道该去哪儿」。标题没问题，页面缺下一步。一个显眼的入口就够了。\n\n## 几条经得起检验的建议\n\n把作品放在自我介绍上面。喜欢作品的访客会回头读介绍；先读介绍的人，很少能走到作品那里。\n\n标题砍成一句。需要两句，说明第一句没干完活。\n\n两个等重的按钮删掉一个。同时给「看作品」和「了解我」是在让访客做选择，而这个选择就是让你失去这一次滚动的东西。\n\n写上最近一次更新日期。一个最近的日期是「这个页面还活着」最便宜的信号；没有日期的页面即使内容不错，读起来也像废弃的。\n\n找没看过的人测。认识你的人带着你删不掉的上下文进来，他的五秒不是同一个五秒。\n\n## FAQ\n\n- 要通过这个测试是不是得找设计师？不用。测试奖励的是具体，而具体的成本是写字的时间，不是设计的时间。\n- 要找几个人测？三个。第一个几乎说明不了什么；到第三个，同一个问题会重复出现，你就知道该改哪里了。\n- 测手机版还是桌面版？手机版。个人主页的首次访问多半从社交简介进入，用的是手机。\n- 标题过了，页面还是显得弱，接下来看什么？看图。强标题下面配一张弱图会被读成不配套，而访客更信图。\n\n## 今晚就跑一次\n\n在手机上打开你的主页，交给别人看五秒，然后问「我是做什么的」。说不出来，今晚就改标题，明天再测一遍。\n\n在 dynamic-profile.shop 上这件事成本很低：填表单、选主题、发布，之后改一次只要几分钟，不用腾出一个下午。从[首页](/)开始，拿[主页必备的五个板块](/blog/homepage-5-must-have-sections)核对首屏，版式部分读[首屏设计规则](/blog/above-the-fold-design-rules)，常见坑对照[主页常见错误与反模式](/blog/homepage-mistakes-anti-patterns)，文案怎么砍在[把主页文案砍掉一半](/blog/cut-homepage-copy-by-half)。",
      en: "A portfolio first impression forms before anyone reads a sentence. Five seconds, sometimes less. In that window a visitor decides whether to scroll, and they do it with almost nothing to go on: a headline, one image, and whether the page loaded fast enough to be worth the wait.\n\nThe five second test website method comes out of usability labs. Show a page for five seconds, hide it, then ask what the person remembers. Run it on your own homepage and the answer is usually uncomfortable. Most viewers cannot say what you do.\n\nBelow: how to run the test without recruiting anyone, what a homepage above the fold checklist should contain, and the personal page first impression tips that hold up once a real visitor shows up.\n\n## What the five second test website method measures\n\nIt measures recall, not taste. After five seconds the viewer should be able to say three things out loud: what you do, who you do it for, and what to click next.\n\nNotice what is not on that list. Nobody is asked whether the page is attractive. Attractive pages fail this test constantly, because a pleasing layout gives the viewer nothing to repeat. A plain page with one specific sentence does.\n\nIt works because five seconds is roughly how long a stranger gives you. Not because people are rude. Because the tab behind yours is one keystroke away.\n\n## A homepage above the fold checklist\n\nAbove the fold means what fits without scrolling on a mid-range phone, not on your laptop. Check it on a phone. The gap between the two views is usually where the first impression is lost.\n\n| Element | Must answer | Common failure |\n|---|---|---|\n| Headline | What you do, and for whom | A job title with no object |\n| Opening line | Why someone should stay | Three sentences of adjectives |\n| One visual | What the work looks like | A stock photo of a desk |\n| Primary action | Where to go next | Two buttons of equal weight |\n| Contact route | How to reach you today | A form nobody checks |\n\nFour of the five rows fail in the same way: the page describes the person instead of the work. \"Senior designer with eight years of experience\" answers a question no visitor asked. \"I redesign signup flows for small SaaS teams\" answers the one they did.\n\n## Three results you will probably get\n\nThe first is a blank. The viewer remembers a colour and nothing else. Your headline is decorative, so rewrite it as a claim about one specific kind of work.\n\nThe second is a misread. The viewer thinks you do something adjacent to what you do. This is rarely their fault. A page that hedges across three directions gets read as the middle one.\n\nThe third is a correct answer followed by \"and then I did not know where to go\". The headline works and the page has no next step. One visible action is enough.\n\n## Personal page first impression tips that hold up\n\nPut the work above the biography. Visitors who like what they see come back for the biography. Visitors who read a biography first rarely reach the work.\n\nCut the headline to one sentence. Two sentences means the first was not doing the job.\n\nDelete one of two equal buttons. A page offering both view work and read about me is asking the visitor to choose, and the choice is what costs you the scroll.\n\nSay when you last updated. A recent date is the cheapest signal that the page is alive. An undated page reads as abandoned even when the content is good.\n\nTest with someone who has never seen it. People who know you arrive with context you cannot remove, so their five seconds are not the same five seconds.\n\n## FAQ\n\n- Do I need a designer to pass this test? No. The test rewards specificity, and specificity costs writing time rather than design time.\n- How many people should I test with? Three. The first tells you almost nothing. By the third, the same failure repeats and you know what to fix.\n- Should I test the mobile or desktop version? Mobile. Most first visits to a personal page arrive from a social profile, on a phone.\n- My headline passes but the page still feels weak. What next? Look at the visual. A weak image under a strong headline reads as a mismatch, and visitors trust the image.\n\n## Run it tonight\n\nOpen your homepage on a phone, hand it to someone for five seconds, then ask what you do. If they cannot say it, change the headline tonight and test again tomorrow.\n\ndynamic-profile.shop keeps this cheap. Fill a form, pick a theme, publish, and later edits take minutes instead of an afternoon. Start from the [homepage](/), check your first screen against [主页必备的五个板块](/blog/homepage-5-must-have-sections), read [首屏设计规则](/blog/above-the-fold-design-rules) for the layout side, and compare notes with [主页常见错误与反模式](/blog/homepage-mistakes-anti-patterns). Cutting the copy is covered in [把主页文案砍掉一半](/blog/cut-homepage-copy-by-half).",
    },
  },

  {
    id: 64,
    slug: 'mobile-page-polish-fonts-spacing-touch',
    publishedAt: '2026-10-24',
    tag: { zh: '移动端', en: 'Mobile' },
    title: { zh: '移动端主页优化：字体、间距与触控', en: 'Mobile Page Polish: Fonts, Spacing, Touch' },
    date: { zh: '2026 年 10 月', en: 'October 2026' },
    body: {
      zh: '移动端优化这件事，多数人是被提醒才去做的。页面在电脑上看没问题，等有人用手机打开说一句「字太小了」，才回头补。常见的补法是整体缩放：桌面版等比缩小，正文跟着掉到 14 像素，于是所有努力都花在了维持一个难读的页面上。\n\n真正要动的只有三处：字体、间距、触控。都不需要重写任何一个字，二十分钟能完整过一遍。\n\n## 手机上真正会出问题的地方\n\n两类几乎每个页面都有。标题在窄屏上断成三行，因为它当初是对着桌面栏宽调的；正文行宽超出屏幕，因为首屏那张图把左右留白挤掉了。第三类大概占一半：点击区域只有 28 像素，而指尖需要 44 像素左右。\n\n这些在笔记本上全都看不出来。手机上会被读成「这个页面不是给我做的」，而这个判断访客几秒钟就做完了，之后也很少推翻。\n\n## 移动端字体：三个数字\n\n正文字号不低于 17 像素。再小，多数人会双指放大，而放大之后的页面通常比小字更容易把人赶走。\n\n行宽控制在每行 34 到 40 个字，按 375 像素宽的屏幕算。这是移动端字体里最容易跳过的一条：占满整行的段落，被打断之后很难找回来，而手机阅读本身就是一连串的打断。\n\n标题比桌面版小一档，不要小两档。桌面能装下的标题，缩 20% 在手机上通常也能放下。缩过头，页面看着就变成了同一份文档的敷衍版。\n\n正文行高放在 1.5 到 1.6 之间。低于 1.5，在高密度屏幕上相邻两行会粘在一起。\n\n## 间距：用拇指量，不要用像素量\n\n桌面端的间距跟着栅格走，手机端该跟着「不用换手就能够到」走。屏幕下面三分之一是舒服的区域，上面两个角不是，尤其在 6.1 英寸以上的机型上。\n\n你在意的那个动作，放在靠下或者居中的位置。钉在手机首屏顶部的联系方式，比放在一小段作品之后的同一个按钮更难点到。\n\n板块之间的纵向留白要比桌面感觉更大。块间 48 像素、块内 8 到 12 像素是稳的；再紧一点，分开的板块在手臂距离外就糊成一团灰。\n\n## 触控：点击区和单手范围\n\n每个能点的东西不小于 44×44 CSS 像素。图标算，画成按钮样式的都算。段落里的文字链接可以宽松一些，但也有限度。\n\n相邻的可点区域之间留 8 像素。作品集网格里两个挨在一起的图标，几乎必然产生误触。\n\n用自己的手、单手、站着测一遍。够取导航需要换握姿，这个范围就是错的，跟页面好不好看无关。\n\n## 二十分钟自查表\n\n| 元素 | 桌面取值 | 手机目标 | 手机上怎么验 |\n|---|---|---|---|\n| 正文 | 16px | 17-18px，行高 1.5-1.6 | 不放大能不能读完一段 |\n| 标题 | 36-48px | 降一档，最多两行 | 数一下断成几行 |\n| 行宽 | 自适应 | 34-40 字 | 数一数中段某一行 |\n| 点击区 | 鼠标精度 | 最小 44×44 | 每个快速点五次 |\n| 主动作 | 右上角 | 下三分之一或居中 | 单手能不能够到 |\n| 板块间距 | 紧贴栅格 | 48px 以上 | 板块还能分开读吗 |\n\n## FAQ\n\n- 每个机型都要单独断点吗？不用。640px 一个断点能解决大部分问题，页面里有宽表格再考虑加第二个。\n- 主题已经说自己响应式了，还要查吗？查一件事：它保留了自己的间距比例，还是把桌面版整体缩小？整体缩小的结果就是手机上的 14 像素正文。\n- 移动端要不要隐藏板块？只隐藏跟别处重复的。为了省地方把作品集网格藏起来，等于删掉了多数访客来的理由。\n- 多久复查一次？每次改完内容复查，另外每年换新手机的时候复查一次。屏幕尺寸变得慢，手不会变。\n\n## 今晚的二十分钟\n\n用自己的手机打开主页，先别动桌面版，做三件事：正文提到 17 像素，按钮给到 44 像素，联系方式挪到下面三分之一。做完这三件就可以等下一轮再看了。\n\n在 dynamic-profile.shop 上，移动端版式读的是同一份内容，所以改这几处不用重建页面，之后换主题也不会把它们改回去。从[首页](/)开始做；间距那一半拿不准，对照[用留白说话](/blog/speaking-with-whitespace)；想把手机区间再细拆一层，看[移动端优先的响应式设计](/blog/mobile-first-responsive-design)。测试有个地方要提醒：你在安静房间里读自己的页面不算测试，我知道每个元素原本要说什么，所以我是最不准的那个人。',
      en: 'mobile homepage design is where personal pages quietly lose their visitors. Most of the dashboards I have looked at put mobile traffic above 60 percent, and the layout work still happens on a desktop screen. There are three knobs worth turning, and none of them require rewriting anything: mobile typography, spacing, and touch targets. Twenty minutes covers all three.\n\n## What phones actually break\n\nTwo failures show up on nearly every page I check. Headlines wrap into three lines because they were tuned against a desktop column. Body text runs wider than the screen because the hero image pushed horizontal padding inward. A third failure appears in about half: tap targets sit at 28 pixels when a fingertip needs roughly 44.\n\nNone of this is visible on a laptop. On a phone it reads as a page that was not built for the person holding it, and that judgement forms in seconds.\n\n## Mobile typography: three numbers\n\nSet body text at 17 pixels or larger. Below that, most readers pinch to zoom, and zoomed pages lose people faster than small text does.\n\nKeep the measure between 34 and 40 characters on a 375 pixel wide screen. This is the piece of mobile typography that gets skipped most often: a paragraph using the full width is hard to return to after an interruption, and mobile reading is mostly interruptions.\n\nDrop headings one step from their desktop size, not two. A title that fits a desktop column usually fits a phone after a 20 percent reduction. Going further turns the page into a smaller, weaker version of itself.\n\nLine height belongs between 1.5 and 1.6 for body copy. Under 1.5, adjacent lines merge visually on high density displays.\n\n## Spacing: measure in thumbs, not pixels\n\nDesktop spacing follows the grid. Mobile spacing should follow whatever a thumb can reach without repositioning the hand. The bottom third of the screen is comfortable. The top corners are not, especially past 6.1 inches.\n\nPut the one action you care about low or centred. A contact button pinned to the top of a mobile layout is harder to hit than the same button sitting after a short block of work.\n\nVertical padding between sections needs to be larger on phones than it feels on desktop. Around 48 pixels between blocks and 8 to 12 pixels inside them works. Anything tighter reads as one grey mass at arm\'s length.\n\n## Touch friendly page: targets and one thumb reach\n\nEvery interactive element should clear 44 by 44 CSS pixels. Icons count. Anything drawn to look like a button counts. Inline text links inside a paragraph can get away with less, though not by much.\n\nLeave 8 pixels between neighbouring targets. Two small icons touching each other produce most of the mis-taps I see on portfolio grids.\n\nTest with your own hand, one handed, standing up. If reaching the navigation means shifting your grip, the reach is wrong.\n\n## The twenty minute checklist\n\n| Element | Desktop value | Mobile target | How to check on your phone |\n|---|---|---|---|\n| Body text | 16px | 17-18px, line height 1.5-1.6 | Read one paragraph without zooming |\n| Headline | 36-48px | One step down, two lines max | Count the wrapped lines |\n| Line length | Auto | 34-40 characters | Count one mid-paragraph line |\n| Tap target | Mouse precision | 44x44px minimum | Tap each one five times, fast |\n| Primary action | Top right | Bottom third or centred | Reach it one handed |\n| Section gap | Tight grid | 48px or more | Do sections read as separate |\n\n## FAQ\n\n- Do I need a breakpoint for every device? One at 640px handles most of it. Add a second if your page carries a wide table.\n- My theme already claims to be responsive. Then check one thing: does it keep its own spacing ratios, or does it scale the desktop layout down? Scaling produces 14px body text on a phone.\n- Should I hide sections on mobile? Only ones repeating information available elsewhere. Hiding the portfolio grid to save space removes the reason most visitors arrived.\n- How often should I re-check? After any content change, and once a year when you buy a new phone. Screen sizes drift slowly. Hands do not.\n\n## Start tonight\n\nOpen your page on your own phone and do three things before touching the desktop version: raise body text to 17px, give every button 44px, move the contact link into the bottom third. Stop after those three.\n\nOn dynamic-profile.shop the mobile layout reads the same content, so changing these values does not mean rebuilding anything, and switching themes later leaves them alone. Start from [the homepage](/), keep [用留白说话](/blog/speaking-with-whitespace) open for the spacing half, and cross-check the foundation in [移动端优先的响应式设计](/blog/mobile-first-responsive-design). One caveat about testing: reading your own page in a quiet room is not the test. I am a bad judge of mine, because I already know what everything is supposed to say.',
    },
  },
  {
    id: 65,
    slug: 'changelogs-on-personal-pages',
    publishedAt: '2026-10-25',
    tag: { zh: '迭代', en: 'Iteration' },
    title: { zh: '主页更新日志：记录你的迭代过程', en: 'Changelogs on Personal Pages: Iteration as Content' },
    date: { zh: '2026 年 10 月', en: 'October 2026' },
    body: {
      zh: '个人主页的更新日志，就是一份带日期的记录：你改了什么，为什么改。软件团队发 changelog 有两个用处——回来的人知道哪里动了，写的人能看见事情在往前走。个人主页几乎没人做这件事，但恰恰是个人主页，改动最碎、最容易被自己忘掉。\n\n多数人把主页当成一件做完就结束的事：选个主题，贴五条链接，发布，然后不再打开。八个月之后页面看着像废弃了，而你已经想不起来哪版自我介绍的效果更好。更新日志同时解决这两头：小改动有地方放，访客也有理由回头看。\n\n## 什么值得记\n\n门槛要低。你开始犹豫「这算不算值得写一条」的时候，通常就该写了。\n\n三类能覆盖大多数情况。内容改动：新增一个项目、重写一段简介、删掉一个板块。设计改动：换主题、改强调色、收紧间距、换头像。结构改动：板块换顺序、联系方式挪到作品集上面、加了动态区。别人问你「这个月主页动过什么」，你会说出口的那些，都该在列表里。\n\n不该记的：改错别字、换一条链接、访客永远看不出来的东西。把这些也写进去，日志会变成噪音，而噪音在下一次清理时会被整体删掉。\n\n## 怎么迭代个人主页而不推倒重来\n\n整体重做是好页面的死法。重做完的两三周通常更差，因为你一次改了六处，说不清是哪一处让你少了本来会来的询问。\n\n一次只改一处。换标题，放一周，看有没有人把这句话复述给你听。然后挪联系方式。然后删一个板块。最后再决定主题的事。每一步都能撤回，每一步教给你的都是关于「你真正有的这个页面」，而不是你想象中的那个。\n\n## 更新日志放在哪\n\n三种位置都成立，选哪个取决于你的页面还有多少空间。\n\n| 位置 | 形式 | 适合谁 |\n|---|---|---|\n| 页面底部单独一个小节 | 三到五条带日期的短行 | 多数页面；不抢新访客的注意力 |\n| 放进动态区 | 每月一条，打个标签 | 本来就在每周更新的页面 |\n| 独立页面，导航里挂链接 | 完整存档 | 把主页也当工作日志用的人 |\n\n露出来的一小段胜过藏起来的完整存档。三条最近的、带日期的记录，比一份没人会滚到底的完整历史有用。\n\n## 十分钟能写完的格式\n\n每条留三个字段：日期、改了什么、一句为什么。「因为两个人说找不到联系方式，所以把它挪到作品集上面」是可执行的信息；只写「挪了联系方式」，六个月后就只剩记录价值。为什么那一句最容易被跳过，也最值钱。\n\n新的放最前面。可见列表留五条，其余进存档，或者干脆让它们消失。没人审计你。\n\n## FAQ\n\n- 页面很少改动，还需要日志吗？需要。日志会记下「它很少改动」这件事，这本身就是信息。一季度一条也可以。\n- 访客会看到我的草稿和半成品吗？不会，只记已经上线的改动，不记计划。\n- 旧的日志会让页面显得过时吗？只在最后一条停在两年前的时候。如果你不再更新，把这一节删掉，别留着当证据。\n- 这对搜索有用吗？有一点。带日期的更新说明页面有人在维护，维护中的页面更容易被链接。但更大的作用在你自己身上，不在排名上。\n\n## 今晚就开始\n\n打开你的主页，在底部加一个叫「更新」的小节，凭记忆补上最近三个月的三条，日期写个大概。十分钟就够，这也是整件事里唯一不能拖到以后的部分——再过一个月，你就不记得改过什么了。\n\n从[首页](/)开始。如果你反复重写的其实是文案，[把主页文案砍掉一半](/blog/cut-homepage-copy-by-half)那篇给的清单更短，更好下手动刀。想让更新变成内容而不只是记录，该看的是[动态区那一篇](/blog/update-personal-site-posts)。',
      en: 'A personal changelog is a dated list of what you changed on your homepage and why you changed it. Software teams publish one because it does two jobs at once: returning readers see what moved, and the person writing it gets proof that the work is moving. Personal pages almost never have one, which is strange given how much quiet iteration goes into them.\n\nThe usual pattern is that a homepage gets treated as something you finish. You pick a theme, paste five links, publish, and stop. Eight months later the page reads as abandoned, and you cannot remember which version of your intro line worked better. A site changelog fixes both halves of that problem. It gives small changes somewhere to live, and it gives visitors a reason to come back.\n\n## What is worth logging\n\nThe threshold should be low. If you are asking whether a change deserves an entry, it probably does.\n\nThree categories cover most of it. Content changes: a new project, a rewritten bio, a removed section. Design changes: a new theme, a different accent colour, tighter spacing, a new portrait. Structural changes: sections reordered, a contact block moved above the portfolio, an updates feed added. Anything you would mention if someone asked what you did to the page this month belongs on the list.\n\nWhat does not belong: fixing a typo, swapping one link for another, or anything a visitor would never notice. Logging those turns the changelog into noise, and noise gets deleted in the next cleanup.\n\n## How to iterate a personal site without rebuilding it\n\nFull redesigns are where good pages go to die. The version after a redesign is usually worse for two or three weeks, because you changed six things at once and cannot tell which one cost you the enquiries you used to get.\n\nChange one thing per sitting instead. Swap the headline, leave it for a week, and watch whether anyone repeats it back to you. Then move the contact block. Then cut a section. Then decide about the theme. Each step is reversible, and each one teaches you something about the page you actually have rather than the one you imagine.\n\n## Where the changelog goes\n\nThree placements work, and the right one depends on how much space you have.\n\n| Placement | Format | Best for |\n|---|---|---|\n| Dedicated section at the bottom | Three to five dated lines | Most pages; costs no attention from first time visitors |\n| Inside the updates feed | One entry per month, tagged | Pages that already update weekly |\n| Separate page linked from the nav | Full archive | People whose page is also their work log |\n\nA short visible section beats a hidden archive. Three recent entries with dates do more for a visitor than a complete history nobody scrolls to.\n\n## A format that takes ten minutes\n\nKeep three fields per entry: date, what changed, and one line on why. The reason line is the one people skip, and it is the one that carries the value. "Moved contact above the portfolio" is a record. "Moved contact above the portfolio because two people said they could not find it" is information you can act on six months later.\n\nWrite entries newest first. Cap the visible list at five and move the rest to an archive, or just let them fall off. Nobody is auditing you.\n\n## FAQ\n\n- Do I need a changelog if my page rarely changes? Then the changelog records that it rarely changes, which is itself useful. One entry a quarter is fine.\n- Will visitors see my drafts and half finished ideas? No. Log changes you shipped, not plans.\n- Does an old changelog make the page look stale? Only when the last entry is from two years ago. If you stop updating, remove the section rather than leave it as evidence.\n- Does this matter for search? Slightly. Dated updates signal a maintained page, and a maintained page is easier to justify linking to. The bigger effect is on you, not on rankings.\n\n## Start tonight\n\nOpen your page, add a small section at the bottom called Updates, and write three entries from memory for the last three months. Date them roughly. It takes ten minutes and it is the only part you cannot do later, because in another month you will not remember what you changed.\n\nStart from the [homepage](/), and if the wording is the part you keep rewriting, the [copy self-check](/blog/cut-homepage-copy-by-half) gives you a shorter list to argue with. When you want the updates to show up as content rather than a log, the [updates section](/blog/update-personal-site-posts) is where they belong.',
    },
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getPostById(id: number): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.id === id);
}
