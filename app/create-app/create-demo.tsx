"use client";

import { useEffect, useState } from "react";

type Tpl = { key: string; name: string; desc: string; from: string; to: string };
const TEMPLATES: Tpl[] = [
  { key: "personal", name: "Personal", desc: "Portfolio + contact", from: "#60A5FA", to: "#6366F1" },
  { key: "business", name: "Business", desc: "Services + strong CTA", from: "#6366F1", to: "#8B5CF6" },
  { key: "ecommerce", name: "E-commerce", desc: "Storefront + product grid", from: "#2DD4BF", to: "#34D399" },
  { key: "saas", name: "SaaS", desc: "Features + pricing", from: "#8B5CF6", to: "#EC4899" },
  { key: "blog", name: "Blog", desc: "Markdown → SSG posts", from: "#3B82F6", to: "#60A5FA" },
  { key: "docs", name: "Docs", desc: "Sidebar + TOC", from: "#34D399", to: "#2DD4BF" },
  { key: "dashboard", name: "Dashboard", desc: "Sidebar + stat cards", from: "#FBBF24", to: "#FB7185" },
  { key: "restaurant", name: "Restaurant", desc: "Menu + reservations", from: "#FB7185", to: "#FBBF24" },
];

function lines(t: Tpl) {
  return [
    { t: `$ npm create lacspace-app@latest my-app -- --template ${t.key}`, c: "#4ADE80" },
    { t: `◆ create-lacspace-app`, c: "#C4B5FD" },
    { t: `✔ scaffolded 70 files  ·  ${t.name} template`, c: "#EAF0FB" },
    { t: `  + app/  + lib/site.ts  + og/  + sitemap  + robots`, c: "#8698B5" },
    { t: `real 0.12s`, c: "#34D399" },
    { t: `→ cd my-app && npm run dev`, c: "#FBBF24" },
  ];
}

export function CreateDemo() {
  const [key, setKey] = useState("saas");
  const [auto, setAuto] = useState(true);
  const [n, setN] = useState(0);
  const t = TEMPLATES.find((x) => x.key === key)!;
  const L = lines(t);

  // reveal terminal lines one by one
  useEffect(() => {
    setN(0);
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setN(L.length); return; }
    let i = 0;
    const id = setInterval(() => { i += 1; setN(i); if (i >= L.length) clearInterval(id); }, 260);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // auto-advance until the visitor picks
  useEffect(() => {
    if (!auto) return;
    if (n < L.length) return;
    const id = setTimeout(() => {
      const idx = TEMPLATES.findIndex((x) => x.key === key);
      setKey(TEMPLATES[(idx + 1) % TEMPLATES.length].key);
    }, 1900);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto, n, key]);

  const built = n >= L.length;
  const pick = (k: string) => { setAuto(false); setKey(k); };

  return (
    <div className="cd">
      <div className="cd-chips">
        {TEMPLATES.map((tp) => (
          <button key={tp.key} onClick={() => pick(tp.key)} className={`cd-chip ${tp.key === key ? "on" : ""}`}>
            {tp.name}
          </button>
        ))}
        <span className="cd-live"><span className={auto ? "dot pulse" : "dot"} />{auto ? "auto-playing" : "you’re driving"}</span>
      </div>

      <div className="cd-grid">
        {/* terminal */}
        <div className="cd-term">
          <div className="cd-bar">
            <i style={{ background: "#ff5f57" }} /><i style={{ background: "#febc2e" }} /><i style={{ background: "#28c840" }} />
            <span className="cd-title">zsh — my-app</span>
          </div>
          <pre className="cd-pre">
            {L.slice(0, n).map((ln, i) => (
              <div key={i} style={{ color: ln.c }}>{ln.t}</div>
            ))}
            {!built && <div className="cd-cursor">▋</div>}
          </pre>
        </div>

        {/* preview */}
        <div className="cd-prev">
          <div className="cd-bar">
            <i style={{ background: "#ff5f57" }} /><i style={{ background: "#febc2e" }} /><i style={{ background: "#28c840" }} />
            <span className="cd-url">{built ? `${t.key}.lacspace.app` : "localhost:3000"}</span>
            <span className={`cd-status ${built ? "on" : ""}`}>{built ? "● live" : "…"}</span>
          </div>
          <div className="cd-app" style={{ opacity: built ? 1 : 0.45 }}>
            <div className="cd-hero" style={{ background: "var(--panel-2)", borderBottom: "1px solid var(--hairline)" }}>
              <span className="cd-h1" />
              <span className="cd-h2" />
              <span className="cd-btn" />
            </div>
            <div className="cd-cards">
              <span /><span /><span />
            </div>
            <div className="cd-name">{t.name} — {t.desc}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
