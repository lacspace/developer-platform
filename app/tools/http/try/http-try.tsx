"use client";

import { useMemo, useState } from "react";

const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"];
type Header = { k: string; v: string };
type Resp = {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  timeMs: number;
  size: number;
  truncated: boolean;
  url: string;
  redirected: boolean;
  crossHostRedirect: boolean;
  body: string;
};

const PRESETS: { label: string; method: string; url: string }[] = [
  { label: "GET httpbin", method: "GET", url: "https://httpbin.org/get" },
  { label: "POST JSON", method: "POST", url: "https://httpbin.org/post" },
  { label: "GitHub API", method: "GET", url: "https://api.github.com/repos/lacspace/npm-packages" },
  { label: "Status 404", method: "GET", url: "https://httpbin.org/status/404" },
];

function prettyBody(body: string, contentType?: string): string {
  if (contentType && contentType.includes("json")) {
    try {
      return JSON.stringify(JSON.parse(body), null, 2);
    } catch {
      /* fall through */
    }
  }
  return body;
}

export function HttpTry() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("https://httpbin.org/get");
  const [headers, setHeaders] = useState<Header[]>([{ k: "", v: "" }]);
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [resp, setResp] = useState<Resp | null>(null);
  const [err, setErr] = useState("");

  const hasBody = method === "POST" || method === "PUT" || method === "PATCH";

  const cli = useMemo(() => {
    let c = `npx lacspace-http ${method !== "GET" ? method + " " : ""}${url}`;
    for (const h of headers) if (h.k.trim()) c += ` -H "${h.k}: ${h.v}"`;
    if (hasBody && body.trim()) c += ` --json '${body.replace(/\n/g, "").slice(0, 60)}${body.length > 60 ? "…" : ""}'`;
    return c;
  }, [method, url, headers, body, hasBody]);

  function setHeader(i: number, patch: Partial<Header>) {
    setHeaders((hs) => hs.map((h, j) => (j === i ? { ...h, ...patch } : h)));
  }

  async function send() {
    setErr("");
    setResp(null);
    setBusy(true);
    try {
      const hdrs = headers.filter((h) => h.k.trim()).map((h) => `${h.k.trim()}: ${h.v}`);
      const isJsonBody = hasBody && body.trim().startsWith("{");
      const r = await fetch("/api/http", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          method,
          url,
          headers: hdrs,
          ...(hasBody && body.trim() ? (isJsonBody ? { json: body } : { body }) : {}),
        }),
      });
      const data = await r.json();
      if (!r.ok || data.error) {
        setErr(data.error ?? `Request failed (${r.status})`);
      } else {
        setResp(data as Resp);
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  const statusColor = resp ? (resp.status < 300 ? "#34D399" : resp.status < 400 ? "#FBBF24" : "#FB7185") : "";

  return (
    <div className="pt">
      <div className="pt-controls" style={{ marginBottom: 10 }}>
        <span className="pt-lbl" style={{ alignSelf: "center", margin: 0 }}>Presets</span>
        {PRESETS.map((p) => (
          <button key={p.label} className="pt-add" style={{ marginTop: 0 }} onClick={() => { setMethod(p.method); setUrl(p.url); }}>
            {p.label}
          </button>
        ))}
      </div>

      <div className="pt-row">
        <select className="pt-select" value={method} onChange={(e) => setMethod(e.target.value)}>
          {METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
        <input className="pt-input pt-url" value={url} onChange={(e) => setUrl(e.target.value)} spellCheck={false} placeholder="https://api.example.com/…" onKeyDown={(e) => { if (e.key === "Enter") send(); }} />
        <button className="btn btn-primary pt-run" onClick={send} disabled={busy || !url.trim()}>{busy ? "Sending…" : "Send →"}</button>
      </div>

      <div style={{ marginTop: 14 }}>
        <span className="pt-lbl">Headers</span>
        <div className="pt-kv">
          {headers.map((h, i) => (
            <div className="pt-kv-row" key={i}>
              <input className="pt-input" value={h.k} onChange={(e) => setHeader(i, { k: e.target.value })} placeholder="Header" spellCheck={false} />
              <input className="pt-input" value={h.v} onChange={(e) => setHeader(i, { v: e.target.value })} placeholder="Value" spellCheck={false} />
              <button className="pt-del" onClick={() => setHeaders((hs) => hs.filter((_, j) => j !== i).length ? hs.filter((_, j) => j !== i) : [{ k: "", v: "" }])} aria-label="Remove header">✕</button>
            </div>
          ))}
        </div>
        <button className="pt-add" onClick={() => setHeaders((hs) => [...hs, { k: "", v: "" }])}>+ Add header</button>
      </div>

      {hasBody && (
        <div className="pt-field">
          <span className="pt-lbl">Body {body.trim().startsWith("{") ? "(sent as JSON)" : "(raw)"}</span>
          <textarea className="pt-area" style={{ minHeight: 120 }} value={body} onChange={(e) => setBody(e.target.value)} spellCheck={false} placeholder='{ "name": "Ada" }' rows={5} />
        </div>
      )}

      <div className="pt-cli"><code>{cli}</code></div>

      {err && <pre className="pt-err">{err}</pre>}
      {resp && (
        <div className="pt-out">
          <div className="pt-meta">
            <span><b style={{ color: statusColor }}>{resp.status} {resp.statusText}</b></span>
            <span><b>{resp.timeMs}</b> ms</span>
            <span><b>{(resp.size / 1024).toFixed(1)}</b> KB{resp.truncated ? " (capped)" : ""}</span>
            {resp.redirected && <span>↪ redirected{resp.crossHostRedirect ? " (cross-host)" : ""}</span>}
          </div>
          <pre className="pt-json">{prettyBody(resp.body, resp.headers["content-type"])}</pre>
        </div>
      )}
    </div>
  );
}
