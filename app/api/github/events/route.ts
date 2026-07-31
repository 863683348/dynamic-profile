import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// GET /api/github/events?user=torvalds
// 服务端代理 GitHub 公开动态 API，规避浏览器 CORS，并归一化为可导入的内容列表。
// 可选：配置 GITHUB_TOKEN 提升速率上限（未配置则走匿名 60 req/h）。

type GhEvent = {
  type: string;
  repo?: { name?: string };
  created_at?: string;
  payload?: Record<string, any>;
};

export type GithubActivity = {
  id: string;
  type: string;
  repo: string;
  title: string;
  summary: string;
  url: string;
  created_at: string;
  category: "post" | "work";
};

// 1. 校验用户名（字母/数字/连字符/下划线）
const USER_RE = /^[a-zA-Z0-9-_]{1,39}$/;

function normalize(ev: GhEvent): GithubActivity | null {
  const repo = ev.repo?.name ?? "";
  const base = repo ? `https://github.com/${repo}` : "https://github.com";
  const when = ev.created_at ?? new Date().toISOString();
  const id = `${ev.type}-${repo}-${when}`;

  switch (ev.type) {
    case "PushEvent": {
      const commits: any[] = ev.payload?.commits ?? [];
      const msgs = commits
        .map((c) => (c.message ?? "").split("\n")[0])
        .filter(Boolean)
        .slice(0, 3);
      const branch = (ev.payload?.ref ?? "refs/heads/main").replace("refs/heads/", "");
      return {
        id,
        type: "push",
        repo,
        title: `Pushed to ${repo.split("/")[1] ?? repo}`,
        summary: msgs.length
          ? `Branch ${branch}: ${msgs.join(" · ")}`
          : `Pushed to ${branch}`,
        url: `${base}/tree/${branch}`,
        created_at: when,
        category: "post",
      };
    }
    case "PullRequestEvent": {
      const pr = ev.payload?.pull_request;
      if (!pr) return null;
      return {
        id,
        type: "pr",
        repo,
        title: `[PR #${pr.number}] ${pr.title}`,
        summary: `${ev.payload?.action ?? "opened"} · ${repo}`,
        url: pr.html_url ?? base,
        created_at: when,
        category: "work",
      };
    }
    case "ReleaseEvent": {
      const rel = ev.payload?.release;
      if (!rel) return null;
      return {
        id,
        type: "release",
        repo,
        title: `Released ${rel.tag_name ?? rel.name ?? ""} · ${repo.split("/")[1] ?? repo}`,
        summary: rel.name ?? rel.tag_name ?? "",
        url: rel.html_url ?? base,
        created_at: when,
        category: "work",
      };
    }
    case "CreateEvent": {
      const refType = ev.payload?.ref_type ?? "repository";
      if (refType === "repository") {
        return {
          id,
          type: "create",
          repo,
          title: `Created repository ${repo.split("/")[1] ?? repo}`,
          summary: repo,
          url: base,
          created_at: when,
          category: "work",
        };
      }
      return {
        id,
        type: "create",
        repo,
        title: `Created ${refType} ${ev.payload?.ref ?? ""}`,
        summary: repo,
        url: base,
        created_at: when,
        category: "post",
      };
    }
    case "IssuesEvent": {
      const issue = ev.payload?.issue;
      if (!issue) return null;
      return {
        id,
        type: "issue",
        repo,
        title: `[Issue #${issue.number}] ${issue.title}`,
        summary: `${ev.payload?.action ?? "opened"} · ${repo}`,
        url: issue.html_url ?? base,
        created_at: when,
        category: "post",
      };
    }
    case "WatchEvent": {
      return {
        id,
        type: "watch",
        repo,
        title: `Starred ${repo.split("/")[1] ?? repo}`,
        summary: repo,
        url: base,
        created_at: when,
        category: "post",
      };
    }
    default:
      return null;
  }
}

export async function GET(req: NextRequest) {
  const user = req.nextUrl.searchParams.get("user")?.trim() ?? "";
  if (!USER_RE.test(user)) {
    return NextResponse.json(
      { code: 40001, message: "Invalid GitHub username" },
      { status: 400 }
    );
  }

  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "dynamic-profile",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 10000);
  try {
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(user)}/events/public`,
      { headers, signal: ctrl.signal }
    );

    if (res.status === 404) {
      return NextResponse.json({ code: 40401, message: "User not found" }, { status: 404 });
    }
    if (res.status === 403) {
      return NextResponse.json(
        { code: 40301, message: "GitHub rate limit exceeded" },
        { status: 403 }
      );
    }
    if (!res.ok) {
      return NextResponse.json({ code: 50200, message: "GitHub error" }, { status: 502 });
    }

    const events = (await res.json()) as GhEvent[];
    const items = (events ?? [])
      .map(normalize)
      .filter((x): x is GithubActivity => x !== null)
      .slice(0, 20);

    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ code: 50400, message: "Fetch timeout" }, { status: 504 });
  } finally {
    clearTimeout(timer);
  }
}
