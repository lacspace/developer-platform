"use client";

import { useState } from "react";

type Mode = "text" | "wifi";
type Result = { svg: string; version: number; size: number; ecc: string };

const PRESETS = [
  { label: "URL", text: "https://developer.lacspace.com" },
  { label: "Email", text: "mailto:hello@lacspace.com" },
  { label: "Phone", text: "tel:+9779800000000" },
  { label: "Geo", text: "geo:27.7172,85.3240" },
];

export function QrTry() {
  const [mode, setMode] = useState<Mode>("text");
  const [text, setText] = useState("https://developer.lacspace.com");
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [security, setSecurity] = useState("WPA");
  const [ecc, setEcc] = useState("M");
  const [fg, setFg] = useState("#0a0e17");
  const [bg, setBg] = useState("#ffffff");
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState<Result | null>(null);
  const [err, setErr] = useState("");

  async function run() {
    setErr("");
    setRes(null);
    setBusy(true);
    try {
      const body = mode === "wifi"
        ? { mode, ssid, password, security, ecc, fg, bg }
        : { mode, text, ecc, fg, bg };
      const r = await fetch("/api/qr", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
      const data = await r.json();
      if (!r.ok || data.error) setErr(data.error ?? `Failed (${r.status})`);
      else setRes(data as Result);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  function download() {
    if (!res) return;
    const blob = new Blob([res.svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qr.svg";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="pt">
      <div className="pt-modes">
        {(["text", "wifi"] as Mode[]).map((m) => (
          <button key={m} className={`pt-mode ${mode === m ? "on" : ""}`} onClick={() => setMode(m)}>
            {m === "text" ? "Text / URL" : "WiFi"}
          </button>
        ))}
      </div>

      <div className="pt-qr-wrap">
        <div className="pt-qr-controls">
          {mode === "text" ? (
            <>
              <div className="pt-controls" style={{ marginBottom: 8 }}>
                <span className="pt-lbl" style={{ alignSelf: "center", margin: 0 }}>Presets</span>
                {PRESETS.map((p) => (
                  <button key={p.label} className="pt-add" style={{ marginTop: 0 }} onClick={() => setText(p.text)}>{p.label}</button>
                ))}
              </div>
              <div className="pt-field" style={{ marginTop: 4 }}>
                <span className="pt-lbl">Text or URL</span>
                <textarea className="pt-area" style={{ minHeight: 80 }} value={text} onChange={(e) => setText(e.target.value)} rows={3} spellCheck={false} />
              </div>
            </>
          ) : (
            <>
              <div className="pt-field"><span className="pt-lbl">Network name (SSID)</span>
                <input className="pt-input" value={ssid} onChange={(e) => setSsid(e.target.value)} placeholder="Home-WiFi" spellCheck={false} /></div>
              <div className="pt-field"><span className="pt-lbl">Password</span>
                <input className="pt-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="s3cret" spellCheck={false} /></div>
              <div className="pt-controls" style={{ marginTop: 12 }}>
                <label><span className="pt-lbl">Security</span>
                  <select className="pt-select" value={security} onChange={(e) => setSecurity(e.target.value)}>
                    <option>WPA</option><option>WEP</option><option value="nopass">None</option>
                  </select></label>
              </div>
            </>
          )}

          <div className="pt-controls" style={{ marginTop: 14 }}>
            <label><span className="pt-lbl">Error correction</span>
              <select className="pt-select" value={ecc} onChange={(e) => setEcc(e.target.value)}>
                <option value="L">L — 7%</option><option value="M">M — 15%</option><option value="Q">Q — 25%</option><option value="H">H — 30%</option>
              </select></label>
            <label><span className="pt-lbl">Dark</span>
              <input className="pt-color" type="color" value={fg} onChange={(e) => setFg(e.target.value)} /></label>
            <label><span className="pt-lbl">Light</span>
              <input className="pt-color" type="color" value={bg} onChange={(e) => setBg(e.target.value)} /></label>
          </div>

          <div className="pt-run-row">
            <button className="btn btn-primary pt-run" onClick={run} disabled={busy}>{busy ? "Rendering…" : "Generate QR →"}</button>
          </div>
        </div>

        <div className="pt-qr-preview">
          {err && <pre className="pt-err" style={{ marginTop: 0 }}>{err}</pre>}
          {res && !err && (
            <>
              <div className="pt-qr-img" dangerouslySetInnerHTML={{ __html: res.svg }} />
              <div className="pt-qr-meta">v{res.version} · {res.size}×{res.size} · ECC {res.ecc}</div>
              <button className="pt-add" onClick={download} style={{ marginTop: 10 }}>Download SVG ↓</button>
            </>
          )}
          {!res && !err && <div className="pt-qr-placeholder">Your QR code appears here</div>}
        </div>
      </div>
    </div>
  );
}
