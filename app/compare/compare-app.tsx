"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type PM = "npm" | "pnpm" | "yarn" | "bun";
const PMS: PM[] = ["npm", "pnpm", "yarn", "bun"];
const ADD: Record<PM, string> = { npm: "npm i", pnpm: "pnpm add", yarn: "yarn add", bun: "bun add" };

type Row = { lac: string; alt: string; category: string; why: string };

const ROWS: Row[] = [
  { lac: "validate", alt: "zod", category: "Validation", why: "Same parse / safeParse ergonomics, zero dependencies." },
  { lac: "money", alt: "dinero.js · currency.js", category: "Money", why: "Integer minor units — no floating-point cent bugs." },
  { lac: "jwt", alt: "jsonwebtoken", category: "Auth tokens", why: "Strict expiry / issuer / audience by default, over Web Crypto." },
  { lac: "crypto", alt: "crypto-js", category: "Cryptography", why: "Real AES-256-GCM via SubtleCrypto, not a JS reimplementation." },
  { lac: "mailer", alt: "nodemailer", category: "Email (SMTP)", why: "Tiny SMTP client over raw net/tls, no dependency tree." },
  { lac: "store", alt: "zustand", category: "React state", why: "~1KB, selector-based, no provider — built on useSyncExternalStore." },
  { lac: "query", alt: "swr · react-query", category: "Data fetching", why: "Shared cache + dedupe + SWR in a fraction of the size." },
  { lac: "xlsx", alt: "exceljs", category: "Spreadsheets", why: "Write real .xlsx with zero deps and no headless browser." },
  { lac: "pdf", alt: "pdfkit · puppeteer", category: "PDF", why: "Generate invoices & receipts without a headless browser." },
  { lac: "markdown", alt: "marked · markdown-it", category: "Markdown", why: "Safe MD → HTML with GFM, no plugin sprawl." },
  { lac: "id", alt: "uuid · nanoid", category: "IDs", why: "UUID v4/v7, nano-id-style and short codes in one package." },
  { lac: "cache", alt: "lru-cache", category: "Caching", why: "LRU + TTL + stale-while-revalidate + memoize wrapper." },
  { lac: "humanize", alt: "pretty-bytes · ms · numeral", category: "Formatting", why: "Bytes, durations, relative time and ordinals in one." },
  { lac: "seo", alt: "next-seo", category: "SEO", why: "Typed metadata AND schema.org JSON-LD from one config." },
  { lac: "rate-limit", alt: "express-rate-limit", category: "Rate limiting", why: "Framework-agnostic, fixed / sliding window & token bucket." },
  { lac: "retry", alt: "p-retry", category: "Resilience", why: "Backoff + jitter, per-call timeouts and a circuit breaker." },
];

function CopyBtn({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button className="pk-copy sm" onClick={() => { try { navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1400); } catch {} }} aria-label="Copy install">
      {ok ? "✓" : "Copy"}
    </button>
  );
}

export function CompareApp() {
  const [q, setQ] = useState("");
  const [pm, setPm] = useState<PM>("npm");
  const searchRef = useRef<HTMLInputElement>(null);
  const ql = q.trim().toLowerCase();

  const rows = useMemo(
    () => ROWS.filter((r) => !ql || (r.lac + " " + r.alt + " " + r.category + " " + r.why).toLowerCase().includes(ql)),
    [ql]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      const typing = t.tagName === "INPUT";
      if (e.key === "/" && !typing) { e.preventDefault(); searchRef.current?.focus(); }
      else if (e.key === "Escape" && typing) { setQ(""); searchRef.current?.blur(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="hb-controls" style={{ top: 62, position: "sticky" }}>
        <div className="hb-search">
          <span aria-hidden>🔍</span>
          <input ref={searchRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search — zod, money, jwt…  (press /)" aria-label="Search comparisons" />
          {q && <button className="hb-clear" onClick={() => setQ("")} aria-label="Clear">✕</button>}
        </div>
        <div className="hb-pm" role="tablist" aria-label="Package manager">
          {PMS.map((p) => (
            <button key={p} role="tab" aria-selected={pm === p} className={pm === p ? "on" : ""} onClick={() => setPm(p)}>{p}</button>
          ))}
        </div>
        <span className="hb-count">{rows.length} of {ROWS.length}</span>
      </div>

      {rows.length === 0 ? (
        <div className="hb-empty">
          <p style={{ fontSize: 40 }}>🔍</p>
          <p>Nothing matches “{q}”.</p>
          <button className="btn btn-ghost" onClick={() => setQ("")}>Clear</button>
        </div>
      ) : (
        <div className="bench" style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr><th>Reach for</th><th>Instead of</th><th>Category</th><th>Why</th><th>Install</th></tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.lac}>
                  <td className="win">
                    <a href={`https://www.npmjs.com/package/@lacspace/${r.lac}`} target="_blank" rel="noopener" className="mono" style={{ color: "#e9d5ff" }}>
                      @lacspace/{r.lac}
                    </a>
                  </td>
                  <td className="mono" style={{ color: "var(--faint)" }}>{r.alt}</td>
                  <td>{r.category}</td>
                  <td style={{ color: "var(--muted)" }}>{r.why}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 200 }}>
                      <code className="mono" style={{ fontSize: 12, color: "#e8e8f0", whiteSpace: "nowrap" }}>{ADD[pm]} @lacspace/{r.lac}</code>
                      <CopyBtn text={`${ADD[pm]} @lacspace/${r.lac}`} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
