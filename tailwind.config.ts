import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 主题色由前端 globals.css 用 CSS 变量管理，这里仅保留扩展位
        profile: "var(--profile-theme-color, #c2410c)",
      },
    },
  },
  plugins: [],
};

export default config;
