"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { generateLogo, generateLogoSet, generateBrandKit, PALETTES, FONTS, ICONS, type LogoBrief } from "@lacspace/logo";

/* ─────────────────────────────  helpers  ───────────────────────────── */

function downloadBlob(data: BlobPart, type: string, filename: string) {
  const url = URL.createObjectURL(new Blob([data], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
async function svgToPngBlob(svg: string, min = 512): Promise<Blob | null> {
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  try {
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const el = new Image();
      el.onload = () => res(el);
      el.onerror = rej;
      el.src = url;
    });
    const w = img.naturalWidth || min;
    const h = img.naturalHeight || min;
    const scale = Math.max(1, min / Math.max(w, h));
    const cv = document.createElement("canvas");
    cv.width = Math.round(w * scale);
    cv.height = Math.round(h * scale);
    const ctx = cv.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0, cv.width, cv.height);
    return await new Promise((res) => cv.toBlob((b) => res(b), "image/png"));
  } finally {
    URL.revokeObjectURL(url);
  }
}
async function downloadPng(svg: string, filename: string) {
  const blob = await svgToPngBlob(svg);
  if (blob) downloadBlob(await blob.arrayBuffer(), "image/png", filename);
}
const slug = (s: string) => s.replace(/\s+/g, "-").toLowerCase().replace(/[^a-z0-9-]/g, "") || "logo";

/* ─────────────────────────────  Logo studio  ───────────────────────────── */

const PRESETS = [
  { label: "☕ Coffee", name: "Kopi House", keywords: "coffee, cozy, artisanal, warm" },
  { label: "💳 Fintech", name: "Ledgerly", keywords: "fintech, finance, trust, secure, money" },
  { label: "🌿 Eco", name: "Verdant", keywords: "eco, green, organic, sustainable, plant" },
  { label: "🤖 AI / Tech", name: "Orbit Labs", keywords: "ai, tech, network, fast, startup" },
  { label: "👑 Luxury", name: "Aurelia", keywords: "luxury, premium, gold, elegant, beauty" },
  { label: "🚚 Delivery", name: "SwiftShip", keywords: "delivery, logistics, fast, shipping" },
  { label: "🩺 Medical", name: "PulseCare", keywords: "medical, health, clinic, care, wellness" },
  { label: "⚖️ Legal", name: "LawShield", keywords: "legal, law, attorney, justice, trust" },
  { label: "🎓 Education", name: "Scholarly", keywords: "education, university, learn, course" },
  { label: "🏋️ Fitness", name: "FitForge", keywords: "gym, fitness, workout, sport, energy" },
];
const ENGINES = ["auto", "monogram", "wordmark", "abstract", "emblem", "lettermark"] as const;
const BACKGROUNDS = ["surface", "transparent", "gradient", "solid"] as const;
const SHAPES = ["auto", "circle", "rounded", "squircle", "hexagon", "shield", "seal", "diamond", "blob", "none"] as const;

function LogoStudio() {
  const [name, setName] = useState("Orbit Labs");
  const [keywords, setKeywords] = useState("ai, tech, network, fast, startup");
  const [engine, setEngine] = useState<(typeof ENGINES)[number]>("auto");
  const [background, setBackground] = useState<(typeof BACKGROUNDS)[number]>("surface");
  const [palette, setPalette] = useState("auto");
  const [font, setFont] = useState("auto");
  const [shape, setShape] = useState<(typeof SHAPES)[number]>("auto");
  const [icon, setIcon] = useState("auto");
  const [seed, setSeed] = useState(1);
  const [pick, setPick] = useState(0);
  const [mode, setMode] = useState<"concepts" | "brandkit">("concepts");
  const [copied, setCopied] = useState(false);

  const brief: LogoBrief = useMemo(() => {
    const b: LogoBrief = { name: name || "Brand", keywords, background, seed };
    if (engine !== "auto") b.engine = engine;
    if (palette !== "auto") b.palette = palette;
    if (font !== "auto") b.font = font;
    if (shape !== "auto") b.shape = shape;
    if (icon !== "auto") b.icon = icon;
    return b;
  }, [name, keywords, engine, background, palette, font, shape, icon, seed]);

  const concepts = useMemo(() => { try { return generateLogoSet(brief, 12); } catch { return []; } }, [brief]);
  const main = concepts[Math.min(pick, concepts.length - 1)] ?? null;
  const kit = useMemo(() => { try { return mode === "brandkit" ? generateBrandKit(brief) : null; } catch { return null; } }, [brief, mode]);

  return (
    <div className="pt">
      <div className="st-controls">
        <label className="st-field"><span className="pt-lbl">Brand name</span>
          <input className="pt-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Orbit Labs" /></label>
        <label className="st-field"><span className="pt-lbl">Keywords (what it does / the vibe)</span>
          <input className="pt-input" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="coffee, cozy, warm" /></label>
      </div>

      <div className="st-chips">
        {PRESETS.map((p) => (
          <button key={p.label} className="st-chip" onClick={() => { setName(p.name); setKeywords(p.keywords); setPick(0); }}>{p.label}</button>
        ))}
      </div>

      <div className="pt-controls" style={{ flexWrap: "wrap" }}>
        <label><span className="pt-lbl">Style</span>
          <select className="pt-select" value={engine} onChange={(e) => setEngine(e.target.value as typeof engine)}>{ENGINES.map((x) => <option key={x} value={x}>{x}</option>)}</select></label>
        <label><span className="pt-lbl">Palette</span>
          <select className="pt-select" value={palette} onChange={(e) => setPalette(e.target.value)}><option value="auto">auto</option>{PALETTES.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></label>
        <label><span className="pt-lbl">Type</span>
          <select className="pt-select" value={font} onChange={(e) => setFont(e.target.value)}><option value="auto">auto</option>{FONTS.map((f) => <option key={f.id} value={f.id}>{f.display}</option>)}</select></label>
        <label><span className="pt-lbl">Shape</span>
          <select className="pt-select" value={shape} onChange={(e) => setShape(e.target.value as typeof shape)}>{SHAPES.map((x) => <option key={x} value={x}>{x}</option>)}</select></label>
        <label><span className="pt-lbl">Icon</span>
          <select className="pt-select" value={icon} onChange={(e) => setIcon(e.target.value)}><option value="auto">auto</option>{ICONS.map((i) => <option key={i.key} value={i.key}>{i.key}</option>)}</select></label>
        <label><span className="pt-lbl">Background</span>
          <select className="pt-select" value={background} onChange={(e) => setBackground(e.target.value as typeof background)}>{BACKGROUNDS.map((x) => <option key={x} value={x}>{x}</option>)}</select></label>
        <button className="btn btn-ghost" onClick={() => { setSeed((s) => s + 1); setPick(0); }} style={{ alignSelf: "flex-end" }}>🎲 Shuffle</button>
      </div>

      <div className="pt-modes" style={{ marginTop: 16 }}>
        <button className={`pt-mode ${mode === "concepts" ? "on" : ""}`} onClick={() => setMode("concepts")}>12 concepts</button>
        <button className={`pt-mode ${mode === "brandkit" ? "on" : ""}`} onClick={() => setMode("brandkit")}>✨ Brand kit</button>
      </div>

      {mode === "concepts" && main && (
        <>
          <div className="st-stage">
            <div className="st-stage-art" dangerouslySetInnerHTML={{ __html: main.svg }} />
            <div className="st-stage-meta">
              <div className="st-badges">
                <span className="pt-ok">{main.engine}</span><span className="pt-dim">{main.layout}</span>
                <span className="pt-dim">{main.palette.name}</span>{main.icon && <span className="pt-dim">icon: {main.icon}</span>}
              </div>
              <p className="pt-note" style={{ marginTop: 8 }}>{main.interpreted.notes.join(" · ")}</p>
              <div className="pt-run-row" style={{ marginTop: 12, gap: 8, flexWrap: "wrap" }}>
                <button className="btn btn-primary" onClick={() => downloadBlob(main.svg, "image/svg+xml", `${slug(name)}-logo.svg`)}>SVG ↓</button>
                <button className="btn btn-ghost" onClick={() => downloadPng(main.svg, `${slug(name)}-logo.png`)}>PNG ↓</button>
              </div>
            </div>
          </div>
          <div className="pt-out-bar" style={{ marginTop: 18 }}>
            <span className="pt-ok">12 concepts</span><span className="pt-dim">deterministic — tap one, or Shuffle for a new set</span>
          </div>
          <div className="st-grid">
            {concepts.map((c, i) => (
              <button key={i} className={"st-cell" + (i === pick ? " on" : "")} onClick={() => setPick(i)} title={`${c.engine} · ${c.palette.name}`}>
                <div dangerouslySetInnerHTML={{ __html: c.svg }} />
              </button>
            ))}
          </div>
        </>
      )}

      {mode === "brandkit" && kit && (
        <>
          <div className="pt-out-bar" style={{ marginTop: 16 }}>
            <span className="pt-ok">Brand kit for “{kit.name}”</span><span className="pt-dim">one brief → a whole identity</span>
          </div>
          <div className="st-kit">
            {([["Primary", kit.primary], ["Stacked", kit.stacked], ["Mark", kit.mark], ["Wordmark", kit.wordmark], ["Mono", kit.mono]] as const).map(([label, r]) => (
              <figure key={label} className="st-kit-cell">
                <div className="st-kit-art" dangerouslySetInnerHTML={{ __html: r.svg }} />
                <figcaption>
                  <span>{label}</span>
                  <span className="st-kit-dl">
                    <button onClick={() => downloadBlob(r.svg, "image/svg+xml", `${slug(kit.name)}-${label.toLowerCase()}.svg`)}>SVG</button>
                    <button onClick={() => downloadPng(r.svg, `${slug(kit.name)}-${label.toLowerCase()}.png`)}>PNG</button>
                  </span>
                </figcaption>
              </figure>
            ))}
            <figure className="st-kit-cell">
              <div className="st-kit-art st-fav">
                {kit.favicon.sizes.filter((s) => [64, 32, 16].includes(s.size)).map((s) => (
                  <span key={s.size} dangerouslySetInnerHTML={{ __html: s.svg }} />
                ))}
              </div>
              <figcaption><span>Favicon set</span>
                <span className="st-kit-dl"><button onClick={() => downloadBlob(kit.favicon.svg, "image/svg+xml", `${slug(kit.name)}-favicon.svg`)}>SVG</button><button onClick={() => downloadPng(kit.favicon.svg, `${slug(kit.name)}-icon.png`)}>PNG</button></span>
              </figcaption>
            </figure>
          </div>

          <div className="st-swatches">
            {kit.colors.map((c) => (
              <div key={c.role} className="st-swatch" title={c.hex}>
                <span style={{ background: c.hex }} />
                <b>{c.role}</b><code>{c.hex}</code>
              </div>
            ))}
          </div>

          <div className="st-copy">
            <div className="pt-out-bar"><span className="pt-ok">CSS variables</span>
              <button className="pt-dim" style={{ cursor: "pointer", background: "none", border: 0 }} onClick={() => { try { navigator.clipboard.writeText(kit.css); setCopied(true); setTimeout(() => setCopied(false), 1400); } catch {} }}>{copied ? "Copied ✓" : "Copy"}</button>
            </div>
            <pre className="pt-json">{kit.css}</pre>
          </div>
        </>
      )}
    </div>
  );
}

/* ──────────────────────────  Background studio  ────────────────────────── */

const DIMS = [
  { label: "OG 1200×630", w: 1200, h: 630 },
  { label: "Square 1080", w: 1080, h: 1080 },
  { label: "Wide 1920×1080", w: 1920, h: 1080 },
  { label: "Story 1080×1920", w: 1080, h: 1920 },
];
const PATTERNS = ["none", "dots", "grid", "stripes", "mesh"] as const;

function hashStr(s: string) { let h = 2166136261 >>> 0; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function rngOf(seed: number) { let s = seed >>> 0 || 1; return () => { s |= 0; s = (s + 0x6d2b79f5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

function drawBackground(cv: HTMLCanvasElement, o: { w: number; h: number; c1: string; c2: string; angle: number; pattern: (typeof PATTERNS)[number] }) {
  cv.width = o.w; cv.height = o.h;
  const ctx = cv.getContext("2d")!;
  if (o.pattern === "mesh") {
    // quick mesh: two radial blobs of c1/c2 over a blend base
    const g = ctx.createLinearGradient(0, 0, o.w, o.h); g.addColorStop(0, o.c1); g.addColorStop(1, o.c2); ctx.fillStyle = g; ctx.fillRect(0, 0, o.w, o.h);
    const rand = rngOf(hashStr(o.c1 + o.c2 + o.angle));
    for (const c of [o.c1, o.c2, o.c1]) { const x = rand() * o.w, y = rand() * o.h, r = (0.4 + rand() * 0.4) * Math.max(o.w, o.h); const rg = ctx.createRadialGradient(x, y, 0, x, y, r); rg.addColorStop(0, c + "cc"); rg.addColorStop(1, c + "00"); ctx.fillStyle = rg; ctx.fillRect(0, 0, o.w, o.h); }
    return;
  }
  const a = (o.angle * Math.PI) / 180, x = Math.cos(a), y = Math.sin(a);
  const g = ctx.createLinearGradient(o.w / 2 - (x * o.w) / 2, o.h / 2 - (y * o.h) / 2, o.w / 2 + (x * o.w) / 2, o.h / 2 + (y * o.h) / 2);
  g.addColorStop(0, o.c1); g.addColorStop(1, o.c2); ctx.fillStyle = g; ctx.fillRect(0, 0, o.w, o.h);
  ctx.fillStyle = "rgba(255,255,255,0.10)"; const s = Math.max(24, Math.round(o.w / 32));
  if (o.pattern === "dots") for (let py = s / 2; py < o.h; py += s) for (let px = s / 2; px < o.w; px += s) { ctx.beginPath(); ctx.arc(px, py, s / 8, 0, 7); ctx.fill(); }
  if (o.pattern === "grid") { for (let px = 0; px < o.w; px += s) ctx.fillRect(px, 0, 1, o.h); for (let py = 0; py < o.h; py += s) ctx.fillRect(0, py, o.w, 1); }
  if (o.pattern === "stripes") for (let px = -o.h; px < o.w; px += s * 2) { ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px + o.h, o.h); ctx.lineTo(px + o.h + s, o.h); ctx.lineTo(px + s, 0); ctx.fill(); }
}

function BackgroundStudio() {
  const cv = useRef<HTMLCanvasElement>(null);
  const [c1, setC1] = useState("#0BB9D9");
  const [c2, setC2] = useState("#7C3AED");
  const [angle, setAngle] = useState(60);
  const [pattern, setPattern] = useState<(typeof PATTERNS)[number]>("dots");
  const [dim, setDim] = useState(0);
  const [fmt, setFmt] = useState<"png" | "jpeg">("png");
  const [budgetKb, setBudgetKb] = useState(0);
  const [info, setInfo] = useState("");
  const d = DIMS[dim]!;
  useEffect(() => { if (cv.current) { drawBackground(cv.current, { w: d.w, h: d.h, c1, c2, angle, pattern }); setInfo(`${d.w}×${d.h}`); } }, [c1, c2, angle, pattern, dim, d]);

  async function exportImage() {
    const cvv = cv.current; if (!cvv) return;
    const type = fmt === "png" ? "image/png" : "image/jpeg";
    const toBlob = (q?: number) => new Promise<Blob | null>((res) => cvv.toBlob((b) => res(b), type, q));
    let blob: Blob | null; let q = 0.92;
    if (fmt === "jpeg" && budgetKb > 0) {
      let lo = 0.3, hi = 0.95, best: Blob | null = null;
      for (let i = 0; i < 8; i++) { const mid = (lo + hi) / 2; const b = await toBlob(mid); if (b && b.size <= budgetKb * 1024) { best = b; q = mid; lo = mid; } else hi = mid; }
      blob = best ?? (await toBlob(0.3));
    } else blob = await toBlob(fmt === "jpeg" ? q : undefined);
    if (!blob) return;
    setInfo(`${d.w}×${d.h} · ${(blob.size / 1024).toFixed(1)} KB${fmt === "jpeg" ? ` · q${Math.round(q * 100)}` : ""}`);
    downloadBlob(await blob.arrayBuffer(), type, `background-${d.w}x${d.h}.${fmt === "jpeg" ? "jpg" : "png"}`);
  }

  return (
    <div className="pt">
      <div className="pt-controls" style={{ flexWrap: "wrap" }}>
        <label><span className="pt-lbl">Color A</span><input className="pt-color" type="color" value={c1} onChange={(e) => setC1(e.target.value)} /></label>
        <label><span className="pt-lbl">Color B</span><input className="pt-color" type="color" value={c2} onChange={(e) => setC2(e.target.value)} /></label>
        <label><span className="pt-lbl">Angle {angle}°</span><input type="range" min={0} max={180} value={angle} onChange={(e) => setAngle(+e.target.value)} /></label>
        <label><span className="pt-lbl">Pattern</span><select className="pt-select" value={pattern} onChange={(e) => setPattern(e.target.value as typeof pattern)}>{PATTERNS.map((p) => <option key={p}>{p}</option>)}</select></label>
        <label><span className="pt-lbl">Size</span><select className="pt-select" value={dim} onChange={(e) => setDim(+e.target.value)}>{DIMS.map((x, i) => <option key={x.label} value={i}>{x.label}</option>)}</select></label>
      </div>
      <div className="st-canvas-wrap"><canvas ref={cv} className="st-canvas" /></div>
      <div className="pt-controls" style={{ flexWrap: "wrap", marginTop: 12 }}>
        <label><span className="pt-lbl">Format</span><select className="pt-select" value={fmt} onChange={(e) => setFmt(e.target.value as "png" | "jpeg")}><option value="png">PNG</option><option value="jpeg">JPG</option></select></label>
        {fmt === "jpeg" && <label><span className="pt-lbl">Target size (KB, 0 = off)</span><input className="pt-input" style={{ width: 120 }} type="number" min={0} value={budgetKb} onChange={(e) => setBudgetKb(+e.target.value)} /></label>}
        <button className="btn btn-primary" style={{ alignSelf: "flex-end" }} onClick={exportImage}>Download {fmt.toUpperCase()} ↓</button>
        <span className="pt-dim" style={{ alignSelf: "flex-end" }}>{info}</span>
      </div>
      <p className="pt-note">The library (@lacspace/image) adds pure-JS PNG/JPEG in Node, identicon/mesh/placeholder generators, and a <span className="mono">fit()</span> that hits an exact KB/MB budget.</p>
    </div>
  );
}

/* ───────────────────────────────  Shell  ──────────────────────────────── */

export function StudioTry() {
  const [tab, setTab] = useState<"logo" | "bg">("logo");
  return (
    <div>
      <div className="pt-modes">
        <button className={`pt-mode ${tab === "logo" ? "on" : ""}`} onClick={() => setTab("logo")}>🅛 Logo &amp; brand</button>
        <button className={`pt-mode ${tab === "bg" ? "on" : ""}`} onClick={() => setTab("bg")}>🖼 Background</button>
      </div>
      {tab === "logo" ? <LogoStudio /> : <BackgroundStudio />}
    </div>
  );
}
