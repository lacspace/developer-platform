import { NextResponse } from "next/server";
import { makeQr, renderToSvg, wifiPayload, type EccLevel } from "lacspace-qr";

// Runs the REAL lacspace-qr engine server-side (pure, no network) and returns
// an SVG. Kept server-side so the client bundle never has to pull node:zlib
// (used by the package's PNG encoder). Input is capped and rate-limited.
export const runtime = "nodejs";
export const maxDuration = 10;

const MAX_INPUT = 2000;
const ECC = new Set(["L", "M", "Q", "H"]);

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

  let p: {
    mode?: "text" | "wifi";
    text?: string;
    ssid?: string; password?: string; security?: string; hidden?: boolean;
    ecc?: string; fg?: string; bg?: string;
  };
  try { p = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }

  let content = "";
  if (p.mode === "wifi") {
    if (!p.ssid) return NextResponse.json({ error: "A WiFi network name (SSID) is required." }, { status: 400 });
    content = wifiPayload({
      ssid: p.ssid.slice(0, 200),
      password: (p.password ?? "").slice(0, 200),
      security: (p.security as "WPA" | "WEP" | "nopass") ?? "WPA",
      hidden: !!p.hidden,
    });
  } else {
    content = (p.text ?? "").slice(0, MAX_INPUT);
  }
  if (!content) return NextResponse.json({ error: "Enter some text or a URL." }, { status: 400 });

  const ecc = (p.ecc && ECC.has(p.ecc) ? p.ecc : "M") as EccLevel;
  const fg = typeof p.fg === "string" ? p.fg.slice(0, 32) : "#000000";
  const bg = typeof p.bg === "string" ? p.bg.slice(0, 32) : "#ffffff";

  try {
    const qr = makeQr(content, { ecc });
    const svg = renderToSvg(qr, { size: 320, margin: 4, fg, bg });
    return NextResponse.json({ svg, version: qr.version, size: qr.size, ecc });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 400 });
  }
}
