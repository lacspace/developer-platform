"use client";

import { useMemo, useState } from "react";
import { inferSchema, jsonToTs, schemaToExample } from "lacspace-schema";

type Mode = "infer" | "types" | "example";

const SAMPLE = `{
  "id": 42,
  "email": "ada@example.com",
  "role": "admin",
  "active": true,
  "tags": ["dev", "founder"],
  "profile": { "name": "Ada", "joined": "2026-09-07T10:00:00Z" }
}`;

const SAMPLE_SCHEMA = `{
  "type": "object",
  "required": ["id", "email"],
  "properties": {
    "id": { "type": "integer" },
    "email": { "type": "string", "format": "email" },
    "role": { "type": "string", "enum": ["admin", "user"] }
  }
}`;

export function SchemaTry() {
  const [mode, setMode] = useState<Mode>("infer");
  const [input, setInput] = useState(SAMPLE);
  const [name, setName] = useState("Root");
  const [out, setOut] = useState("");
  const [ok, setOk] = useState("");
  const [err, setErr] = useState("");

  const cli = useMemo(() => {
    if (mode === "infer") return `cat data.json | lacspace-schema infer`;
    if (mode === "types") return `lacspace-schema types data.json --name ${name}`;
    return `lacspace-schema example schema.json`;
  }, [mode, name]);

  function loadSampleFor(m: Mode) {
    setMode(m);
    setInput(m === "example" ? SAMPLE_SCHEMA : SAMPLE);
    setOut("");
    setOk("");
    setErr("");
  }

  function run() {
    setErr("");
    setOk("");
    setOut("");
    try {
      const parsed = JSON.parse(input);
      if (mode === "example") {
        const ex = schemaToExample(parsed);
        setOut(JSON.stringify(ex, null, 2));
        setOk("example instance");
        return;
      }
      const samples = Array.isArray(parsed) ? parsed : [parsed];
      if (mode === "infer") {
        const schema = inferSchema(samples);
        setOut(JSON.stringify(schema, null, 2));
        setOk(`draft-07 · from ${samples.length} sample${samples.length === 1 ? "" : "s"}`);
      } else {
        const ts = jsonToTs(samples, { name: name.replace(/[^A-Za-z0-9_]/g, "") || "Root" });
        setOut(ts);
        setOk("TypeScript");
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    }
  }

  return (
    <div className="pt">
      <div className="pt-modes">
        {([["infer", "Infer schema"], ["types", "To TypeScript"], ["example", "Schema → example"]] as [Mode, string][]).map(([m, l]) => (
          <button key={m} className={`pt-mode ${mode === m ? "on" : ""}`} onClick={() => loadSampleFor(m)}>{l}</button>
        ))}
      </div>

      {mode === "types" && (
        <div className="pt-controls">
          <label><span className="pt-lbl">Root type name</span>
            <input className="pt-select" style={{ width: 160 }} value={name} onChange={(e) => setName(e.target.value)} /></label>
        </div>
      )}

      <div className="pt-pane" style={{ marginTop: 6 }}>
        <div className="pt-pane-lbl">{mode === "example" ? "Paste a JSON Schema" : "Paste JSON (an object, or an array of samples)"}</div>
        <textarea className="pt-area" value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} rows={12} />
      </div>

      <div className="pt-cli"><code>{cli}</code></div>

      <div className="pt-run-row">
        <button className="btn btn-primary pt-run" onClick={run}>Run →</button>
      </div>

      {err && <pre className="pt-err">{err}</pre>}
      {out && !err && (
        <div className="pt-out">
          <div className="pt-out-bar"><span className="pt-ok">{ok}</span><span className="pt-dim">runs in your browser</span></div>
          <pre className="pt-json" style={{ color: mode === "types" ? "#e8e8f0" : "#a7f3d0" }}>{out}</pre>
        </div>
      )}
    </div>
  );
}
