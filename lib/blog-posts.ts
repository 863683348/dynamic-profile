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
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getPostById(id: number): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.id === id);
}
