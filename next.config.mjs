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
              // 主题切换等内联脚本需要 unsafe-inline；Auth.js 与 GA4/Clarity 走 https 域名
              "script-src 'self' 'unsafe-inline' https://*.googletagmanager.com https://*.clarity.ms",
              "style-src 'self' 'unsafe-inline'",
              // 头像 / OG 图来自外部 https 域名，data: 用于内联 SVG
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://*.google-analytics.com https://*.clarity.ms https://*.googletagmanager.com https://api.polar.sh https://sandbox-api.polar.sh",
              // Polar 收银台为整页跳转（非 iframe），此处仍放开其域名以策万全
              "frame-src 'self' https://polar.sh https://sandbox.polar.sh",
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
