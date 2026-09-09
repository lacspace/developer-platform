"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { generateLogo, generateLogoSet, type LogoBrief } from "@lacspace/logo";

/* ─────────────────────────────  Logo studio  ───────────────────────────── */

const PRESETS: { label: string; name: string; keywords: string }[] = [
  { label: "☕ Coffee", name: "Kopi House", keywords: "coffee, cozy, artisanal, warm" },
  { label: "💳 Fintech", name: "Ledgerly", keywords: "fintech, finance, trust, secure, money" },
  { label: "🌿 Eco", name: "Verdant", keywords: "eco, green, organic, sustainable, plant" },
  { label: "🤖 AI / Tech", name: "Orbit Labs", keywords: "ai, tech, network, fast, startup" },
  { label: "👑 Luxury", name: "Aurelia", keywords: "luxury, premium, gold, elegant, beauty" },
  { label: "🚚 Delivery", name: "SwiftShip", keywords: "delivery, logistics, fast, shipping" },
  { label: "🩺 Medical", name: "PulseCare", keywords: "medical, health, clinic, care, wellness" },
  { label: "🎨 Creative", name: "Pixel Forge", keywords: "creative, design, studio, agency" },
];

const ENGINES = ["auto", "monogram", "wordmark", "abstract", "emblem", "lettermark"] as const;
const BACKGROUNDS = ["surface", "transparent", "gradient", "solid"] as const;

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

function LogoStudio() {
  const [name, setName] = useState("Orbit Labs");
  const [keywords, setKeywords] = useState("ai, tech, network, fast, startup");
  const [engine, setEngine] = useState<(typeof ENGINES)[number]>("auto");
  const [background, setBackground] = useState<(typeof BACKGROUNDS)[number]>("surface");
  const [seed, setSeed] = useState(1);
  const [pick, setPick] = useState(0);

  const brief: LogoBrief = useMemo(() => {
    const b: LogoBrief = { name: name || "Brand", keywords, background, seed };
    if (engine !== "auto") b.engine = engine;
    return b;
  }, [name, keywords, engine, background, seed]);

  const concepts = useMemo(() => {
    try {
      return generateLogoSet(brief, 12);
    } catch {
      return [];
    }
  }, [brief]);

  const main = concepts[Math.min(pick, concepts.length - 1)] ?? (() => {
    try {
      return generateLogo(brief);
    } catch {
      return null;
    }
  })();

  return (
    <div className="pt">
      <div className="st-controls">
        <label className="st-field">
          <span className="pt-lbl">Brand name</span>
          <input className="pt-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Orbit Labs" />
        </label>
        <label className="st-field">
          <span className="pt-lbl">Keywords (what it does / the vibe)</span>
          <input className="pt-input" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="coffee, cozy, warm" />
        </label>
      </div>

      <div className="st-chips">
        {PRESETS.map((p) => (
          <button key={p.label} className="st-chip" onClick={() => { setName(p.name); setKeywords(p.keywords); setPick(0); }}>
            {p.label}
          </button>
        ))}
      </div>

      <div className="pt-controls" style={{ flexWrap: "wrap" }}>
        <label><span className="pt-lbl">Style</span>
          <select className="pt-select" value={engine} onChange={(e) => setEngine(e.target.value as typeof engine)}>
            {ENGINES.map((x) => <option key={x} value={x}>{x}</option>)}
          </select></label>
        <label><span className="pt-lbl">Background</span>
          <select className="pt-select" value={background} onChange={(e) => setBackground(e.target.value as typeof background)}>
            {BACKGROUNDS.map((x) => <option key={x} value={x}>{x}</option>)}
          </select></label>
        <button className="btn btn-ghost" onClick={() => { setSeed((s) => s + 1); setPick(0); }} style={{ alignSelf: "flex-end" }}>🎲 Shuffle</button>
      </div>

      {main && (
        <>
          <div className="st-stage">
            <div className="st-stage-art" dangerouslySetInnerHTML={{ __html: main.svg }} />
            <div className="st-stage-meta">
              <div className="st-badges">
                <span className="pt-ok">{main.engine}</span>
                <span className="pt-dim">{main.layout}</span>
                <span className="pt-dim">{main.palette.name}</span>
                {main.icon && <span className="pt-dim">icon: {main.icon}</span>}
              </div>
              <p className="pt-note" style={{ marginTop: 8 }}>{main.interpreted.notes.join(" · ")}</p>
              <div className="pt-run-row" style={{ marginTop: 12 }}>
                <button className="btn btn-primary" onClick={() => downloadBlob(main.svg, "image/svg+xml", `${name.replace(/\s+/g, "-").toLowerCase()}-logo.svg`)}>Download SVG ↓</button>
              </div>
            </div>
          </div>

          <div className="pt-out-bar" style={{ marginTop: 18 }}>
            <span className="pt-ok">12 concepts</span>
            <span className="pt-dim">deterministic — tap one, or Shuffle for a new set</span>
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
    </div>
  );
}

/* ──────────────────────────  Background studio  ────────────────────────── */

const DIMS: { label: string; w: number; h: number }[] = [
  { label: "OG 1200×630", w: 1200, h: 630 },
  { label: "Square 1080", w: 1080, h: 1080 },
  { label: "Wide 1920×1080", w: 1920, h: 1080 },
  { label: "Story 1080×1920", w: 1080, h: 1920 },
];
const PATTERNS = ["none", "dots", "grid", "stripes"] as const;

function drawBackground(
  cv: HTMLCanvasElement,
  o: { w: number; h: number; c1: string; c2: string; angle: number; pattern: (typeof PATTERNS)[number] },
) {
  cv.width = o.w;
  cv.height = o.h;
  const ctx = cv.getContext("2d")!;
  const a = (o.angle * Math.PI) / 180;
  const x = Math.cos(a), y = Math.sin(a);
  const g = ctx.createLinearGradient(o.w / 2 - (x * o.w) / 2, o.h / 2 - (y * o.h) / 2, o.w / 2 + (x * o.w) / 2, o.h / 2 + (y * o.h) / 2);
  g.addColorStop(0, o.c1);
  g.addColorStop(1, o.c2);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, o.w, o.h);
  ctx.fillStyle = "rgba(255,255,255,0.10)";
  const s = Math.max(24, Math.round(o.w / 32));
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
  useEffect(() => {
    if (cv.current) {
      drawBackground(cv.current, { w: d.w, h: d.h, c1, c2, angle, pattern });
      setInfo(`${d.w}×${d.h}`);
    }
  }, [c1, c2, angle, pattern, dim, d]);

  async function exportImage() {
    const cvv = cv.current;
    if (!cvv) return;
    const type = fmt === "png" ? "image/png" : "image/jpeg";
    const toBlob = (q?: number) => new Promise<Blob | null>((res) => cvv.toBlob((b) => res(b), type, q));
    let blob: Blob | null;
    let q = 0.92;
    if (fmt === "jpeg" && budgetKb > 0) {
      // binary-search quality to fit the KB budget
      let lo = 0.3, hi = 0.95, best: Blob | null = null;
      for (let i = 0; i < 8; i++) {
        const mid = (lo + hi) / 2;
        const b = await toBlob(mid);
        if (b && b.size <= budgetKb * 1024) { best = b; q = mid; lo = mid; } else hi = mid;
      }
      blob = best ?? (await toBlob(0.3));
    } else {
      blob = await toBlob(fmt === "jpeg" ? q : undefined);
    }
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
        <label><span className="pt-lbl">Pattern</span>
          <select className="pt-select" value={pattern} onChange={(e) => setPattern(e.target.value as typeof pattern)}>{PATTERNS.map((p) => <option key={p}>{p}</option>)}</select></label>
        <label><span className="pt-lbl">Size</span>
          <select className="pt-select" value={dim} onChange={(e) => setDim(+e.target.value)}>{DIMS.map((x, i) => <option key={x.label} value={i}>{x.label}</option>)}</select></label>
      </div>

      <div className="st-canvas-wrap"><canvas ref={cv} className="st-canvas" /></div>

      <div className="pt-controls" style={{ flexWrap: "wrap", marginTop: 12 }}>
        <label><span className="pt-lbl">Format</span>
          <select className="pt-select" value={fmt} onChange={(e) => setFmt(e.target.value as "png" | "jpeg")}><option value="png">PNG</option><option value="jpeg">JPG</option></select></label>
        {fmt === "jpeg" && (
          <label><span className="pt-lbl">Target size (KB, 0 = off)</span>
            <input className="pt-input" style={{ width: 120 }} type="number" min={0} value={budgetKb} onChange={(e) => setBudgetKb(+e.target.value)} /></label>
        )}
        <button className="btn btn-primary" style={{ alignSelf: "flex-end" }} onClick={exportImage}>Download {fmt.toUpperCase()} ↓</button>
        <span className="pt-dim" style={{ alignSelf: "flex-end" }}>{info}</span>
      </div>
      <p className="pt-note">The library (@lacspace/image) adds pure-JS PNG/JPEG in Node and a <span className="mono">fit()</span> that hits an exact KB/MB budget across PNG/JPEG/WebP.</p>
    </div>
  );
}

/* ───────────────────────────────  Shell  ──────────────────────────────── */

export function StudioTry() {
  const [tab, setTab] = useState<"logo" | "bg">("logo");
  return (
    <div>
      <div className="pt-modes">
        <button className={`pt-mode ${tab === "logo" ? "on" : ""}`} onClick={() => setTab("logo")}>🅛 Logo generator</button>
        <button className={`pt-mode ${tab === "bg" ? "on" : ""}`} onClick={() => setTab("bg")}>🖼 Background generator</button>
      </div>
      {tab === "logo" ? <LogoStudio /> : <BackgroundStudio />}
    </div>
  );
}
