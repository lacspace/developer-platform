"use client";

import { useState } from "react";

type Mode = "auto" | "custom";
interface Field { name: string; selector: string; attr: string; all: boolean }

const AUTO_KEYS = ["metadata", "headings", "links", "images", "emails", "phones", "openGraph", "jsonLd", "feeds", "text", "tables"];

const PRESETS: { label: string; url: string; mode: Mode; auto?: string[]; item?: string; fields?: Field[] }[] = [
  { label: "example.com · auto", url: "https://example.com", mode: "auto", auto: ["metadata", "headings", "links"] },
  { label: "books · products", url: "https://books.toscrape.com", mode: "custom", item: "article.product_pod", fields: [
    { name: "title", selector: "h3 a", attr: "@title", all: false },
    { name: "price", selector: ".price_color", attr: "", all: false },
    { name: "url", selector: "h3 a", attr: "@href", all: false },
  ] },
  { label: "quotes · items", url: "https://quotes.toscrape.com", mode: "custom", item: ".quote", fields: [
    { name: "quote", selector: ".text", attr: "", all: false },
    { name: "author", selector: ".author", attr: "", all: false },
    { name: "tags", selector: ".tag", attr: "", all: true },
  ] },
];

export function ScraperTry() {
  const [url, setUrl] = useState("https://books.toscrape.com");
  const [mode, setMode] = useState<Mode>("custom");
  const [auto, setAuto] = useState<Set<string>>(new Set(["metadata", "headings", "links"]));
  const [item, setItem] = useState("article.product_pod");
  const [fields, setFields] = useState<Field[]>([
    { name: "title", selector: "h3 a", attr: "@title", all: false },
    { name: "price", selector: ".price_color", attr: "", all: false },
    { name: "url", selector: "h3 a", attr: "@href", all: false },
  ]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ records: unknown[]; tookMs: number } | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  const toggleAuto = (k: string) => setAuto((s) => { const n = new Set(s); n.has(k) ? n.delete(k) : n.add(k); return n; });
  const setField = (i: number, patch: Partial<Field>) => setFields((f) => f.map((row, j) => (j === i ? { ...row, ...patch } : row)));
  const addField = () => setFields((f) => [...f, { name: "", selector: "", attr: "", all: false }]);
  const delField = (i: number) => setFields((f) => f.filter((_, j) => j !== i));

  const applyPreset = (p: (typeof PRESETS)[number]) => {
    setUrl(p.url); setMode(p.mode); setResult(null); setError("");
    if (p.mode === "auto") setAuto(new Set(p.auto ?? []));
    else { setItem(p.item ?? ""); setFields(p.fields ?? []); }
  };

  const cli = (() => {
    if (mode === "auto") {
      const list = [...auto];
      return `npx lacspace-scraper ${url} --auto${list.length ? " " + list.join(",") : ""} -f json`;
    }
    const parts = fields.filter((f) => f.name && f.selector).map((f) => `--field "${f.name}=${f.selector}${f.attr ? "@" + f.attr.replace(/^@/, "") : ""}${f.all ? "[]" : ""}"`);
    return `npx lacspace-scraper ${url}${item ? ` --item "${item}"` : ""} ${parts.join(" ")} -f json`;
  })();

  const run = async () => {
    setLoading(true); setError(""); setResult(null);
    try {
      const payload = mode === "auto"
        ? { url, mode, auto: [...auto] }
        : { url, mode, item, fields: fields.filter((f) => f.name && f.selector) };
      const res = await fetch("/api/scrape", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Something went wrong."); return; }
      setResult({ records: data.records, tookMs: data.tookMs });
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = (text: string, tag: string) => {
    try { navigator.clipboard.writeText(text); setCopied(tag); setTimeout(() => setCopied(""), 1400); } catch { /* blocked */ }
  };

  return (
    <div className="st">
      <div className="st-presets">
        <span className="st-lbl">Try:</span>
        {PRESETS.map((p) => <button key={p.label} className="st-chip" onClick={() => applyPreset(p)}>{p.label}</button>)}
      </div>

      <div className="st-row">
        <input className="st-url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" spellCheck={false} aria-label="URL to scrape" />
        <button className="btn btn-primary st-run" onClick={run} disabled={loading}>{loading ? "Scraping…" : "Run ▸"}</button>
      </div>

      <div className="st-modes">
        <button className={"st-mode" + (mode === "auto" ? " on" : "")} onClick={() => setMode("auto")}>Auto-detect</button>
        <button className={"st-mode" + (mode === "custom" ? " on" : "")} onClick={() => setMode("custom")}>Custom fields</button>
      </div>

      {mode === "auto" ? (
        <div className="st-auto">
          {AUTO_KEYS.map((k) => (
            <label key={k} className={"st-tag" + (auto.has(k) ? " on" : "")}>
              <input type="checkbox" checked={auto.has(k)} onChange={() => toggleAuto(k)} /> {k}
            </label>
          ))}
        </div>
      ) : (
        <div className="st-custom">
          <label className="st-field-lbl">Repeating item selector <span className="st-dim">(optional — one record per match)</span></label>
          <input className="st-input" value={item} onChange={(e) => setItem(e.target.value)} placeholder='e.g. article.product_pod' spellCheck={false} />
          <div className="st-fields">
            <div className="st-fhead"><span>Field</span><span>CSS selector</span><span>Attr</span><span>All</span><span /></div>
            {fields.map((f, i) => (
              <div className="st-frow" key={i}>
                <input className="st-input" value={f.name} onChange={(e) => setField(i, { name: e.target.value })} placeholder="name" spellCheck={false} />
                <input className="st-input" value={f.selector} onChange={(e) => setField(i, { selector: e.target.value })} placeholder=".price" spellCheck={false} />
                <input className="st-input st-attr" value={f.attr} onChange={(e) => setField(i, { attr: e.target.value })} placeholder="text / @href" spellCheck={false} />
                <label className="st-check"><input type="checkbox" checked={f.all} onChange={(e) => setField(i, { all: e.target.checked })} /></label>
                <button className="st-del" onClick={() => delField(i)} aria-label="Remove field">✕</button>
              </div>
            ))}
          </div>
          <button className="st-add" onClick={addField}>+ Add field</button>
        </div>
      )}

      <div className="st-cli">
        <code>{cli}</code>
        <button className="pk-copy" onClick={() => copy(cli, "cli")}>{copied === "cli" ? "Copied ✓" : "Copy"}</button>
      </div>

      {error && <div className="st-err">✗ {error}</div>}

      {result && (
        <div className="st-out">
          <div className="st-out-bar">
            <span className="st-ok">✔ {result.records.length} record{result.records.length === 1 ? "" : "s"} · {result.tookMs} ms</span>
            <button className="pk-copy" onClick={() => copy(JSON.stringify(result.records, null, 2), "json")}>{copied === "json" ? "Copied ✓" : "Copy JSON"}</button>
          </div>
          <pre className="st-json">{JSON.stringify(result.records, null, 2)}</pre>
        </div>
      )}

      <p className="st-note">
        Runs the real <span className="mono">lacspace-scraper</span> engine server-side (default HTTP mode) — the same output you get locally. It respects robots.txt, caps time and size, and blocks private hosts. JavaScript-rendered pages need the local <span className="mono">--browser</span> mode.
      </p>
    </div>
  );
}
