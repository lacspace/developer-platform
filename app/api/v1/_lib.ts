/**
 * Shared helpers for the Lacspace Media API (v1) — the free hosted lane over the
 * open @lacspace/{logo,image,brand} packages. Server-only (Node runtime).
 */
import { NextResponse } from "next/server";

export const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

/** Simple per-IP sliding-window rate limit. In-memory (best-effort on serverless);
 * a real limit + API keys land with the Pro tier. */
const HITS = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const FREE_LIMIT = 60; // requests / minute / IP

export function rateLimit(ip: string): { ok: boolean; remaining: number; reset: number } {
  const now = Date.now();
  const arr = (HITS.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  const ok = arr.length < FREE_LIMIT;
  if (ok) arr.push(now);
  HITS.set(ip, arr);
  if (HITS.size > 5000) for (const [k, v] of HITS) if (!v.some((t) => now - t < WINDOW_MS)) HITS.delete(k);
  return { ok, remaining: Math.max(0, FREE_LIMIT - arr.length), reset: Math.ceil(WINDOW_MS / 1000) };
}

export function clientIp(req: Request): string {
  const h = req.headers;
  return (h.get("x-forwarded-for")?.split(",")[0] || h.get("x-real-ip") || "anon").trim();
}

/** Read params from the query string (GET) merged with a JSON body (POST). */
export async function readParams(req: Request): Promise<Record<string, string>> {
  const url = new URL(req.url);
  const out: Record<string, string> = {};
  url.searchParams.forEach((v, k) => (out[k] = v));
  if (req.method === "POST") {
    try {
      const body = await req.json();
      if (body && typeof body === "object") for (const [k, v] of Object.entries(body)) out[k] = String(v);
    } catch {
      /* no/invalid body — query params only */
    }
  }
  return out;
}

export function guard(req: Request): NextResponse | null {
  const { ok, remaining, reset } = rateLimit(clientIp(req));
  if (!ok) {
    return NextResponse.json(
      { error: "rate_limited", message: `Free tier is ${FREE_LIMIT} requests/min. Pro lifts this — see /media-api.` },
      { status: 429, headers: { ...CORS, "Retry-After": String(reset), "X-RateLimit-Remaining": String(remaining) } },
    );
  }
  return null;
}

export function err(status: number, code: string, message: string): NextResponse {
  return NextResponse.json({ error: code, message }, { status, headers: CORS });
}

export function bin(bytes: Uint8Array, type: string, filename?: string): NextResponse {
  return new NextResponse(bytes as unknown as BodyInit, {
    status: 200,
    headers: {
      ...CORS,
      "Content-Type": type,
      "Cache-Control": "public, max-age=31536000, immutable",
      ...(filename ? { "Content-Disposition": `inline; filename="${filename}"` } : {}),
    },
  });
}

export function optionsResponse(): NextResponse {
  return new NextResponse(null, { status: 204, headers: CORS });
}

// ── minimal dependency-free STORE zip (CRC32 + local headers + central dir) ──
const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
function crc32(b: Uint8Array) { let c = 0xffffffff; for (let i = 0; i < b.length; i++) c = CRC[(c ^ b[i]!) & 0xff]! ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
function cat(arr: Uint8Array[]) { let n = 0; for (const a of arr) n += a.length; const out = new Uint8Array(n); let o = 0; for (const a of arr) { out.set(a, o); o += a.length; } return out; }

export function zip(files: { name: string; data: Uint8Array }[]): Uint8Array {
  const enc = new TextEncoder();
  const u16 = (n: number) => new Uint8Array([n & 255, (n >> 8) & 255]);
  const u32 = (n: number) => new Uint8Array([n & 255, (n >> 8) & 255, (n >> 16) & 255, (n >> 24) & 255]);
  const locals: Uint8Array[] = []; const central: Uint8Array[] = []; let offset = 0;
  for (const f of files) {
    const name = enc.encode(f.name); const data = f.data; const c = crc32(data);
    const lh = cat([u32(0x04034b50), u16(20), u16(0), u16(0), u16(0), u16(0), u32(c), u32(data.length), u32(data.length), u16(name.length), u16(0), name, data]);
    locals.push(lh);
    central.push(cat([u32(0x02014b50), u16(20), u16(20), u16(0), u16(0), u16(0), u16(0), u32(c), u32(data.length), u32(data.length), u16(name.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(offset), name]));
    offset += lh.length;
  }
  const cd = cat(central);
  const eocd = cat([u32(0x06054b50), u16(0), u16(0), u16(files.length), u16(files.length), u32(cd.length), u32(offset), u16(0)]);
  return cat([cat(locals), cd, eocd]);
}

export const str = (s: string) => new TextEncoder().encode(s);
