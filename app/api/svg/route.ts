import { NextResponse } from "next/server";
import { optimize, toJsx, toDataUri } from "lacspace-svg";

// Runs the REAL lacspace-svg engine server-side (pure, no network). Input is
// capped and rate-limited; nothing is fetched or executed.
export const runtime = "nodejs";
export const maxDuration = 10;

const MAX_INPUT = 200_000; // 200KB of SVG text

const HITS = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const win = (HITS.get(ip) ?? []).filter((t) => now - t < 60_000);
  win.push(now);
  HITS.set(ip, win);
  return win.length > 40;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return NextResponse.json({ error: "Rate limit reached — try again shortly." }, { status: 429 });

  let p: { mode?: string; svg?: string; name?: string; ts?: boolean; encoding?: string; css?: boolean };
  try { p = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }

  const svg = (p.svg ?? "").slice(0, MAX_INPUT);
  if (!svg.trim()) return NextResponse.json({ error: "Paste an SVG first." }, { status: 400 });
  if (!svg.includes("<svg")) return NextResponse.json({ error: "That doesn't look like an SVG (no <svg> tag)." }, { status: 400 });

  try {
    if (p.mode === "jsx") {
      const out = toJsx(svg, { name: (p.name || "Icon").replace(/[^A-Za-z0-9_]/g, "").slice(0, 40) || "Icon", typescript: !!p.ts });
      return NextResponse.json({ output: out, lang: p.ts ? "tsx" : "jsx" });
    }
    if (p.mode === "datauri") {
      const enc = p.encoding === "base64" ? "base64" : "uri";
      const r = toDataUri(svg, { encoding: enc as "uri" | "base64", css: !!p.css });
      return NextResponse.json({ output: r.output, bytes: r.bytes, encoding: r.encoding });
    }
    // default: optimize
    const r = optimize(svg, { multipass: true });
    return NextResponse.json({ output: r.data, before: r.before, after: r.after, savedPct: r.savedPct });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 400 });
  }
}
