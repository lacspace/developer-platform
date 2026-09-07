import { NextResponse } from "next/server";
import { assembleRequest, sendRequest } from "lacspace-http";
import { guardUrl } from "../../lib/url-guard";

// Runs the REAL lacspace-http engine server-side so the output matches the local
// CLI. Because this endpoint sends a request on the user's behalf, it is
// SSRF-GUARDED: every fetch (including redirect hops) is re-checked with
// guardUrl(), which blocks localhost/loopback, private/link-local/CGNAT/ULA
// ranges and the cloud metadata IP. Time, size, redirects and rate are capped.
export const runtime = "nodejs";
export const maxDuration = 15;

const TIMEOUT_MS = 12_000;
const MAX_SIZE = 2 * 1024 * 1024; // 2MB body cap for the public demo
const ALLOWED_METHODS = new Set(["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]);

// Best-effort in-memory rate limit (per warm lambda): 15 requests / 60s per IP.
const HITS = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const win = (HITS.get(ip) ?? []).filter((t) => now - t < 60_000);
  win.push(now);
  HITS.set(ip, win);
  return win.length > 15;
}

/** A fetch that re-guards every URL it is handed (covers redirect hops). */
const guardedFetch: typeof fetch = async (input, init) => {
  const href = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
  const g = await guardUrl(href);
  if (!g.ok) throw new Error(`Blocked by SSRF guard: ${g.reason}`);
  return fetch(g.url.href, init);
};

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Rate limit reached — try again in a minute, or run it locally." }, { status: 429 });
  }

  let payload: { method?: string; url?: string; headers?: string[]; body?: string; json?: string };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const url = (payload.url ?? "").trim();
  const method = (payload.method ?? "GET").toUpperCase();
  if (!url) return NextResponse.json({ error: "A URL is required." }, { status: 400 });
  if (!ALLOWED_METHODS.has(method)) {
    return NextResponse.json({ error: `Method ${method} is not allowed here.` }, { status: 400 });
  }

  const g = await guardUrl(url);
  if (!g.ok) {
    return NextResponse.json({ error: `Blocked: ${g.reason}. This tester can't reach private or local addresses — run lacspace-http locally for that.` }, { status: 400 });
  }

  try {
    const headers = (payload.headers ?? []).filter((h) => typeof h === "string" && h.includes(":"));
    const spec = assembleRequest(g.url.href, {
      method,
      headers,
      data: payload.body && payload.body.length ? payload.body : undefined,
      json: payload.json && payload.json.length ? payload.json : undefined,
    });
    const res = await sendRequest(spec, { timeoutMs: TIMEOUT_MS, maxSize: MAX_SIZE, fetchImpl: guardedFetch });
    return NextResponse.json({
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
      timeMs: res.timeMs,
      size: res.size,
      truncated: res.truncated,
      url: res.url,
      redirected: res.redirected,
      crossHostRedirect: res.crossHostRedirect,
      body: res.body,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
