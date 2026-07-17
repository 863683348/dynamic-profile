import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { DefaultSession } from "next-auth";

// Auth.js v5（beta）配置：Credentials 邮箱登录。
// MVP 阶段：任意合法邮箱即可登录（无密码、无 SMTP），owner_id 直接使用邮箱。
// 生产环境应替换为真实验证（邮件验证码 / GitHub OAuth 等）。
export const { handlers, auth, signIn, signOut } = NextAuth({
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
  ],
  pages: {
    signIn: "/dashboard",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id;
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
