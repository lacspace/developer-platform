"use client";

import { useMemo, useState } from "react";
import { queryAll, convert, validateSchema, type Format } from "lacspace-json";

type Mode = "query" | "convert" | "validate";
const FORMATS: Format[] = ["json", "yaml", "toml", "csv", "ndjson"];

const SAMPLE = `{
  "users": [
    { "name": "Ada",   "age": 36, "active": true,  "email": "ada@example.com" },
    { "name": "Linus", "age": 54, "active": false, "email": "linus@example.com" },
    { "name": "Grace", "age": 41, "active": true,  "email": "grace@example.com" }
  ]
}`;

const SAMPLE_SCHEMA = `{
  "type": "object",
  "required": ["users"],
  "properties": {
    "users": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["name", "age"],
        "properties": {
          "name": { "type": "string" },
          "age":  { "type": "number", "minimum": 0 }
        }
      }
    }
  }
}`;

export function JsonTry() {
  const [mode, setMode] = useState<Mode>("query");
  const [input, setInput] = useState(SAMPLE);
  const [query, setQuery] = useState(".users[] | select(.active) | .email");
  const [from, setFrom] = useState<Format>("json");
  const [to, setTo] = useState<Format>("yaml");
  const [schema, setSchema] = useState(SAMPLE_SCHEMA);
  const [out, setOut] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const [ok, setOk] = useState<string>("");

  const cli = useMemo(() => {
    if (mode === "query") return `cat data.json | lacspace-json -q '${query}'`;
    if (mode === "convert") return `lacspace-json convert data.${from} --to ${to}`;
    return `lacspace-json validate data.json --schema schema.json`;
  }, [mode, query, from, to]);

  function run() {
    setErr("");
    setOk("");
    setOut("");
    try {
      if (mode === "query") {
        const data = JSON.parse(input);
        const results = queryAll(data, query);
        setOut(JSON.stringify(results.length === 1 ? results[0] : results, null, 2));
        setOk(`${results.length} result${results.length === 1 ? "" : "s"}`);
      } else if (mode === "convert") {
        const result = convert(input, from, to);
        setOut(result);
        setOk(`${from} → ${to}`);
      } else {
        const data = JSON.parse(input);
        const parsedSchema = JSON.parse(schema);
        const res = validateSchema(data, parsedSchema);
        if (res.valid) {
          setOk("Valid ✓");
          setOut("The document is valid against the schema.");
        } else {
          setErr(
            `Invalid — ${res.errors.length} error${res.errors.length === 1 ? "" : "s"}:\n` +
              res.errors.map((e) => `  • ${e.path || "(root)"}: ${e.message}`).join("\n")
          );
        }
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    }
  }

  return (
    <div className="pt">
      <div className="pt-modes">
        {(["query", "convert", "validate"] as Mode[]).map((m) => (
          <button key={m} className={`pt-mode ${mode === m ? "on" : ""}`} onClick={() => setMode(m)}>
            {m[0]!.toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>

      {mode === "convert" && (
        <div className="pt-controls">
          <label>
            <span className="pt-lbl">From</span>
            <select className="pt-select" value={from} onChange={(e) => setFrom(e.target.value as Format)}>
              {FORMATS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </label>
          <span className="pt-arrow">→</span>
          <label>
            <span className="pt-lbl">To</span>
            <select className="pt-select" value={to} onChange={(e) => setTo(e.target.value as Format)}>
              {FORMATS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </label>
        </div>
      )}

      <div className={`pt-grid ${mode === "validate" ? "two" : ""}`}>
        <div className="pt-pane">
          <div className="pt-pane-lbl">{mode === "convert" ? `Input (${from})` : "Input data (JSON)"}</div>
          <textarea className="pt-area" value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} rows={12} />
        </div>
        {mode === "validate" && (
          <div className="pt-pane">
            <div className="pt-pane-lbl">JSON Schema</div>
            <textarea className="pt-area" value={schema} onChange={(e) => setSchema(e.target.value)} spellCheck={false} rows={12} />
          </div>
        )}
      </div>

      {mode === "query" && (
        <div className="pt-field">
          <span className="pt-lbl">Query</span>
          <input className="pt-input" value={query} onChange={(e) => setQuery(e.target.value)} spellCheck={false} placeholder=".users[] | select(.active) | .email" />
        </div>
      )}

      <div className="pt-cli"><code>{cli}</code></div>

      <div className="pt-run-row">
        <button className="btn btn-primary pt-run" onClick={run}>Run →</button>
      </div>

      {err && <pre className="pt-err">{err}</pre>}
      {(out || ok) && !err && (
        <div className="pt-out">
          <div className="pt-out-bar"><span className="pt-ok">{ok}</span><span className="pt-dim">runs in your browser</span></div>
          <pre className="pt-json">{out}</pre>
        </div>
      )}
    </div>
  );
}
