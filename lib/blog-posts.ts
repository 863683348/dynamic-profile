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
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getPostById(id: number): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.id === id);
}
