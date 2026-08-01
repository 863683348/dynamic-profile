// 浏览器端图片处理工具：把用户选择的图片文件缩放并转成 data URL，
// 直接存入 profiles.avatar_url / cover_url（text 字段），无需额外图床或上传服务。
// 这样在不引入新依赖、不配置对象存储的前提下，满足 PRD US-02 的"上传头像/封面"。

export type ResizeOpts = {
  maxW: number;
  maxH: number;
  quality?: number;
  mime?: string;
};

const DEFAULTS: Required<Omit<ResizeOpts, "maxW" | "maxH">> = {
  quality: 0.82,
  mime: "image/jpeg",
};

/**
 * 读取图片文件 -> 等比缩放至 maxW×maxH 以内 -> 导出为 data URL（base64）。
 * 失败时抛错，由调用方静默处理（保留原图/提示用户）。
 */
export async function fileToResizedDataUrl(
  file: File,
  opts: ResizeOpts
): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("NOT_IMAGE");
  }

  const mime = opts.mime ?? DEFAULTS.mime;
  const quality = opts.quality ?? DEFAULTS.quality;

  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(opts.maxW / bitmap.width, opts.maxH / bitmap.height, 1);
    const w = Math.max(1, Math.round(bitmap.width * scale));
    const h = Math.max(1, Math.round(bitmap.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("NO_CTX");
    ctx.drawImage(bitmap, 0, 0, w, h);
    return canvas.toDataURL(mime, quality);
  } finally {
    bitmap.close?.();
  }
}

/** 头像：256×256，质量 0.82（典型输出 20–40KB 的 data URL）。 */
export function avatarDataUrl(file: File): Promise<string> {
  return fileToResizedDataUrl(file, { maxW: 256, maxH: 256, quality: 0.82 });
}

/** 封面：1200×400，质量 0.78（典型输出 60–120KB 的 data URL）。 */
export function coverDataUrl(file: File): Promise<string> {
  return fileToResizedDataUrl(file, { maxW: 1200, maxH: 400, quality: 0.78 });
}

/** 收款码：400×400 正方形，PNG 无损，保证二维码扫码清晰（典型输出 <40KB 的 data URL）。 */
export function qrDataUrl(file: File): Promise<string> {
  return fileToResizedDataUrl(file, { maxW: 400, maxH: 400, quality: 0.95, mime: "image/png" });
}
