import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import type { DefaultSession } from "next-auth";

// 谷歌登录是否启用：仅当 AUTH_GOOGLE_ID / AUTH_GOOGLE_SECRET 都配置时才注册 provider，
// 避免本地 / 未配置环境下因缺少环境变量导致 Auth.js 初始化报错。
const googleEnabled = Boolean(
  process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
);

// Auth.js v5（beta）配置：Credentials 邮箱登录。
// MVP 阶段：任意合法邮箱即可登录（无密码、无 SMTP），owner_id 直接使用邮箱。
// 生产环境应替换为真实验证（邮件验证码 / GitHub OAuth 等）。
export const { handlers, auth, signIn, signOut } = NextAuth({
  // Vercel 等反向代理后，必须信任请求的 Host header 才能正确推断
  // callback/redirect_uri 与 state 校验所需的 URL，否则回调会被误判为
  // 不信任来源，state/PKCE 校验对不上 → 渲染成 error=Configuration。
  trustHost: true,
  // 调试开关：已定位并修复 OAuth 回调 iss 缺失问题，关闭以免生产日志泄露敏感信息。
  debug: false,
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "")
          .trim()
          .toLowerCase();
        if (!email || !email.includes("@")) return null;
        return { id: email, email, name: email };
      },
    }),
    ...(googleEnabled
        ? [
          Google({
            // 同一邮箱通过"邮箱登录"与"谷歌登录"进入时合并为同一账号
            allowDangerousEmailAccountLinking: true,
            // 显式给出 Google 的 OAuth 端点，跳过 OIDC discovery。
            // 原因：Google 的发现文档声明 authorization_response_iss_parameter_supported:true，
            // 但回跳的授权响应里并不携带 iss 参数，导致 oauth4webapi 在
            // validateAuthResponse 阶段抛 "response parameter iss (issuer) missing"。
            // 显式给出 token/userinfo 端点后，@auth/core 走手工构造 as 的分支，
            // 不再带该标志，从而绕开此校验（id_token 校验仍保留）。
            authorization: {
              url: "https://accounts.google.com/o/oauth2/v2/auth",
              params: {
                scope: "openid email profile",
                prompt: "select_account",
              },
            },
            token: { url: "https://oauth2.googleapis.com/token" },
            userinfo: { url: "https://openidconnect.googleapis.com/v1/userinfo" },
          }),
        ]
      : []),
  ],
  callbacks: {
    jwt({ token, user }) {
      // 统一以邮箱作为账号 id（Credentials 与 Google 一致），保证同一人无论哪种方式登录都映射到同一 profile
      if (user) token.id = user.email ?? user.id;
      return token;
    },
    session({ session, token }) {
      if (session.user) session.user.id = (token.id as string) ?? "";
      return session;
    },
  },
});

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: { id: string } & DefaultSession["user"];
  }
}
