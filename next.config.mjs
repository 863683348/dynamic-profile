/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 注意：experimental.workerThreads/cpus 仅用于沙箱内 next build（防 jest-worker 崩溃）。
  // 本地 next dev 开启会卡在 Starting...，故 dev 预览时临时注释，需要沙箱构建时再打开。
  // experimental: {
  //   workerThreads: true,
  //   cpus: 1,
  // },
  async headers() {
    // dev 模式下 Next.js HMR/客户端运行时依赖 eval，必须放开 'unsafe-eval' 否则浏览器
    // 会因 CSP 拒绝执行 dev 客户端脚本，导致整页不 hydration、所有交互失效。
    // 生产构建不使用 eval，故仅 dev 放开，保持生产 CSP 收紧。
    const isDev = process.env.NODE_ENV !== 'production';
    const scriptSrcExtra = isDev ? " 'unsafe-eval'" : '';
    return [
      {
        source: '/:path*',
        headers: [
          // 防御点击劫持：禁止被 iframe 嵌套
          { key: 'X-Frame-Options', value: 'DENY' },
          // 禁止 MIME 嗅探
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // 限制 referrer 泄露
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // 强制 HTTPS（HSTS）
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // 收敛浏览器敏感能力
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          // 内容安全策略：限制资源来源，缓解 XSS / 注入
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // 主题切换等内联脚本需要 unsafe-inline；dev 需 unsafe-eval 以支持 HMR 客户端运行时
              `script-src 'self' 'unsafe-inline'${scriptSrcExtra} https://*.googletagmanager.com https://*.clarity.ms https://pagead2.googlesyndication.com https://securepubads.g.doubleclick.net https://*.adsensecustomsearchads.com https://*.google.com https://*.gstatic.com`,
              "style-src 'self' 'unsafe-inline'",
              // 头像 / OG 图来自外部 https 域名，data: 用于内联 SVG；放开广告创意所需的三方图
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://*.google-analytics.com https://*.clarity.ms https://*.googletagmanager.com https://api.polar.sh https://sandbox-api.polar.sh https://pagead2.googlesyndication.com https://securepubads.g.doubleclick.net",
              // Polar 收银台为整页跳转（非 iframe），此处仍放开其域名以策万全
              "frame-src 'self' https://polar.sh https://sandbox.polar.sh https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://pagead2.googlesyndication.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
