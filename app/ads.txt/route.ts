import { NextResponse } from 'next/server';

/**
 * AdSense ads.txt 授权文件。
 *
 * Google AdSense 要求站点根路径 /ads.txt 返回授权内容，用于验证广告投放授权、
 * 防止广告造假（ad fraud）。内容通常为单行：
 *   google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
 *
 * 该内容由环境变量 ADS_TXT_CONTENT 提供（来自 AdSense 后台站点授权码）。
 * 留空时返回 404，避免暴露空文件。
 */
export const dynamic = 'force-static';

export function GET() {
  const content = process.env.ADS_TXT_CONTENT?.trim();
  if (!content) {
    return new NextResponse(null, { status: 404 });
  }
  return new NextResponse(content + '\n', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
