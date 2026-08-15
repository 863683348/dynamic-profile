// 5 套视觉与排版风格（对应原型 A–E）。
// 每套风格不仅改变观感（字体 / 配色 / 卡片质感），还改变页面布局结构：
//   magazine  → 双栏侧栏+内容（经典编辑风）
//   minimal  → 单列居中、无侧栏（极简留白）
//   geek     → 终端窗口框架 + 等宽字体 + 数据表格
//   glass    → 浮动毛玻璃面板 + 瀑布流网格
//   neon     → 发光边框 + 大写标题 + 水平分区
// 通过 [data-style="<id>"] 在 globals.css 落地 CSS 变量，
// 通过 ProfileLayoutDispatcher 在 [handle]/page.tsx 落地布局。

export const STYLE_IDS = [
  "minimal", // A 简约风
  "magazine", // B 杂志编辑风（默认）
  "geek", // C 极客风（终端 / 等宽）
  "glass", // D 玻璃拟态风
  "neon", // E 霓虹赛博风
] as const;

export type StyleId = (typeof STYLE_IDS)[number];

export const DEFAULT_STYLE: StyleId = "magazine";

export function isStyleId(v: unknown): v is StyleId {
  return typeof v === "string" && (STYLE_IDS as readonly string[]).includes(v);
}

// 各风格在「选择器预览卡」里使用的代表强调色（仅供预览展示，
// 真实站点仍以用户 theme_color 为准）。
export const STYLE_ACCENT: Record<StyleId, string> = {
  minimal: "#18181b",
  magazine: "#c2410c",
  geek: "#16a34a",
  glass: "#0ea5e9",
  neon: "#22d3ee",
};
