"use client";

import { useState } from "react";

type Mode = "optimize" | "jsx" | "datauri";

const SAMPLE = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <!-- a friendly checkmark -->
  <title>check</title>
  <g id="unused-group">
    <path fill="#00AA00" d="M9.0000 16.1700l-4.1700-4.1700-1.4200 1.4100 5.5900 5.5900 12.0000-12.0000-1.4100-1.4100z"/>
  </g>
</svg>`;

export function SvgTry() {
  const [mode, setMode] = useState<Mode>("optimize");
  const [svg, setSvg] = useState(SAMPLE);
  const [name, setName] = useState("CheckIcon");
  const [ts, setTs] = useState(true);
  const [encoding, setEncoding] = useState("uri");
  const [css, setCss] = useState(false);
  const [busy, setBusy] = useState(false);
  const [out, setOut] = useState("");
  const [meta, setMeta] = useState("");
  const [err, setErr] = useState("");

  async function run() {
    setErr("");
    setOut("");
    setMeta("");
    setBusy(true);
    try {
      const r = await fetch("/api/svg", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ mode, svg, name, ts, encoding, css }),
      });
      const data = await r.json();
      if (!r.ok || data.error) { setErr(data.error ?? `Failed (${r.status})`); return; }
      setOut(data.output);
      if (mode === "optimize") setMeta(`${data.before} → ${data.after} bytes · saved ${data.savedPct}%`);
      else if (mode === "datauri") setMeta(`${data.bytes} bytes · ${data.encoding}`);
      else setMeta(data.lang);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="pt">
      <div className="pt-modes">
        {([["optimize", "Optimize"], ["jsx", "To React/JSX"], ["datauri", "Data URI"]] as [Mode, string][]).map(([m, l]) => (
          <button key={m} className={`pt-mode ${mode === m ? "on" : ""}`} onClick={() => setMode(m)}>{l}</button>
        ))}
      </div>

      {mode === "jsx" && (
        <div className="pt-controls">
          <label><span className="pt-lbl">Component name</span>
            <input className="pt-select" style={{ width: 160 }} value={name} onChange={(e) => setName(e.target.value)} /></label>
          <label style={{ display: "flex", alignItems: "center", gap: 7, paddingBottom: 9 }}>
            <input type="checkbox" checked={ts} onChange={(e) => setTs(e.target.checked)} /> <span className="pt-lbl" style={{ margin: 0 }}>TypeScript</span></label>
        </div>
      )}
      {mode === "datauri" && (
        <div className="pt-controls">
          <label><span className="pt-lbl">Encoding</span>
            <select className="pt-select" value={encoding} onChange={(e) => setEncoding(e.target.value)}>
              <option value="uri">URL-encoded</option><option value="base64">base64</option>
            </select></label>
          <label style={{ display: "flex", alignItems: "center", gap: 7, paddingBottom: 9 }}>
            <input type="checkbox" checked={css} onChange={(e) => setCss(e.target.checked)} /> <span className="pt-lbl" style={{ margin: 0 }}>CSS background-image</span></label>
        </div>
      )}

      <div className="pt-pane" style={{ marginTop: 6 }}>
        <div className="pt-pane-lbl">Paste your SVG</div>
        <textarea className="pt-area" value={svg} onChange={(e) => setSvg(e.target.value)} spellCheck={false} rows={11} />
      </div>

      <div className="pt-run-row">
        <button className="btn btn-primary pt-run" onClick={run} disabled={busy}>{busy ? "Working…" : "Run →"}</button>
      </div>

      {err && <pre className="pt-err">{err}</pre>}
      {out && !err && (
        <div className="pt-out">
          <div className="pt-out-bar"><span className="pt-ok">{meta}</span><span className="pt-dim">real engine</span></div>
          <pre className="pt-json" style={{ color: "#e8e8f0" }}>{out}</pre>
        </div>
      )}
    </div>
  );
}
