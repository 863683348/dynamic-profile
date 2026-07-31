// 5 套视觉风格（对应原型 A–E），仅改变「观感」（字体 / 配色 / 卡片质感），
// 不改动页面结构。每套风格通过 [data-style="<id>"] 在 globals.css 中落地。
// 强调色 --primary 仍由用户自选 theme_color 决定（内联在容器上，优先级最高），
// 风格只负责字体、背景、卡片质感与发光/模糊等氛围，二者正交组合。

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
