import { NextResponse } from "next/server";
import {
  parseHTML,
  autoExtract,
  applySchema,
  applySchemaItems,
  parseRobots,
  type Schema,
  type FieldSpec,
  type ScrapeRecord,
} from "lacspace-scraper";
import { guardUrl } from "../../lib/url-guard";

// This route runs the REAL lacspace-scraper extraction engine server-side, so
// the output matches `npx lacspace-scraper <url>` (default http engine). It is
// SSRF-guarded, follows redirects manually (re-guarding each hop), respects
// robots.txt, and caps time + size — a safe public demo of the local tool.
export const runtime = "nodejs";
export const maxDuration = 15;

const UA = "Mozilla/5.0 (compatible; lacspace-scraper-tester/0.1; +https://developer.lacspace.com/tools/scraper)";
const AUTO_KEYS = ["metadata", "headings", "links", "images", "emails", "phones", "openGraph", "jsonLd", "feeds", "text", "tables"];

// Best-effort in-memory rate limit (per warm lambda): 15 requests / 60s per IP.
const HITS = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const win = (HITS.get(ip) ?? []).filter((t) => now - t < 60_000);
  win.push(now);
  HITS.set(ip, win);
  return win.length > 15;
}

async function safeFetch(start: URL, timeoutMs: number): Promise<{ finalUrl: string; html: string; status: number }> {
  let current = start;
  for (let hop = 0; hop < 5; hop++) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    let res: Response;
    try {
      res = await fetch(current.href, {
        redirect: "manual",
        signal: ctrl.signal,
        headers: { "user-agent": UA, accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" },
      });
    } finally {
      clearTimeout(timer);
    }
    const loc = res.headers.get("location");
    if (res.status >= 300 && res.status < 400 && loc) {
      const next = new URL(loc, current.href);
      const g = await guardUrl(next.href);
      if (!g.ok) throw new Error(`Redirect blocked: ${g.reason}`);
      current = next;
      continue;
    }
    const buf = await res.arrayBuffer();
    const html = new TextDecoder("utf-8").decode(buf.slice(0, 3_000_000));
    return { finalUrl: current.href, html, status: res.status };
  }
  throw new Error("Too many redirects.");
}

async function robotsAllows(url: URL): Promise<boolean> {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 5000);
    const res = await fetch(new URL("/robots.txt", url.origin).href, { signal: ctrl.signal, headers: { "user-agent": UA } }).finally(() => clearTimeout(timer));
    if (!res.ok) return true;
    return parseRobots(await res.text()).isAllowed(url.pathname + url.search, UA);
  } catch {
    return true;
  }
}

function capValue(v: unknown): unknown {
  if (Array.isArray(v)) return v.slice(0, 50).map(capValue);
  if (typeof v === "string") return v.length > 5000 ? v.slice(0, 5000) + "…" : v;
  return v;
}
function capRecords(records: ScrapeRecord[]): ScrapeRecord[] {
  return records.slice(0, 200).map((r) => {
    const out: ScrapeRecord = {};
    for (const [k, v] of Object.entries(r)) out[k] = capValue(v);
    return out;
  });
}

interface Body {
  url?: string;
  mode?: "auto" | "custom";
  auto?: string[];
  fields?: { name?: string; selector?: string; attr?: string; all?: boolean }[];
  item?: string;
}

export async function POST(req: Request): Promise<Response> {
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0]?.trim() || "anon";
  if (rateLimited(ip)) return NextResponse.json({ error: "Too many requests — give it a minute, then try again." }, { status: 429 });

  let body: Body;
  try { body = (await req.json()) as Body; } catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }

  const url = typeof body.url === "string" ? body.url : "";
  if (!url) return NextResponse.json({ error: "Enter a URL to scrape." }, { status: 400 });

  const guard = await guardUrl(url);
  if (!guard.ok) return NextResponse.json({ error: guard.reason }, { status: 400 });
  if (!(await robotsAllows(guard.url))) {
    return NextResponse.json({ error: "This page is disallowed by the site's robots.txt (the tester stays polite)." }, { status: 403 });
  }

  const started = Date.now();
  let fetched: { finalUrl: string; html: string; status: number };
  try {
    fetched = await safeFetch(guard.url, 10_000);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message || "Could not fetch that page." }, { status: 502 });
  }

  const root = parseHTML(fetched.html);
  let records: ScrapeRecord[];

  if (body.mode === "custom" && Array.isArray(body.fields) && body.fields.some((f) => f?.name && f?.selector)) {
    const schema: Schema = {};
    for (const f of body.fields) {
      if (!f || !f.name || !f.selector) continue;
      const spec: FieldSpec = { selector: f.selector };
      if (f.attr) spec.attr = f.attr;
      if (f.all) spec.all = true;
      schema[f.name] = spec;
    }
    const item = typeof body.item === "string" ? body.item.trim() : "";
    records = item
      ? applySchemaItems(root, item, schema, fetched.finalUrl).map((r) => ({ url: fetched.finalUrl, ...r }))
      : [{ url: fetched.finalUrl, status: fetched.status, ...applySchema(root, schema, fetched.finalUrl) }];
  } else {
    const picked = Array.isArray(body.auto) ? body.auto.filter((k) => AUTO_KEYS.includes(k)) : [];
    const autoOpts = picked.length ? Object.fromEntries(picked.map((k) => [k, true])) : true;
    records = [{ url: fetched.finalUrl, status: fetched.status, ...autoExtract(root, fetched.finalUrl, autoOpts as never) }];
  }

  return NextResponse.json({ ok: true, records: capRecords(records), pages: 1, tookMs: Date.now() - started });
}
