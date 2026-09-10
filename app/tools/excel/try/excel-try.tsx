"use client";

import { useMemo, useState } from "react";
import { convert, detect, parseInput, inferSchema, type Format } from "@lacspace/convert";
import { computeColumn, check, FUNCTION_DOCS } from "@lacspace/formula";
import { listTemplates, buildTemplate, templateToTables } from "lacspace-excel";

type Mode = "convert" | "inspect" | "formula" | "templates";
const TEXT_FORMATS: Format[] = ["json", "csv", "tsv", "ndjson", "yaml", "toml", "markdown", "html", "sql"];
const ALL_FORMATS: Format[] = ["xlsx", ...TEXT_FORMATS];

const SAMPLE = `[
  { "order": "SO-1001", "customer": { "name": "A. Sharma", "city": "Pokhara" }, "qty": 2, "rate": 850,  "paid": true,  "date": "2026-09-01" },
  { "order": "SO-1002", "customer": { "name": "M. Chen",   "city": "Singapore" }, "qty": 1, "rate": 2400, "paid": false, "date": "2026-09-03" },
  { "order": "SO-1003", "customer": { "name": "L. Okafor", "city": "Lagos" },    "qty": 5, "rate": 450,  "paid": true,  "date": "2026-09-05" }
]`;

function download(bytes: Uint8Array | string, name: string, type: string) {
  const blob = new Blob([bytes as BlobPart], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = name; document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function ExcelTry() {
  const [mode, setMode] = useState<Mode>("convert");
  const [input, setInput] = useState(SAMPLE);
  const [file, setFile] = useState<{ name: string; bytes: Uint8Array } | null>(null);
  const [from, setFrom] = useState<Format | "auto">("auto");
  const [to, setTo] = useState<Format>("xlsx");
  const [flatten, setFlatten] = useState(true);
  const [formula, setFormula] = useState("=qty * rate");
  const [column, setColumn] = useState("amount");
  const templates = useMemo(() => listTemplates(), []);
  const [templateId, setTemplateId] = useState("invoice");
  const [out, setOut] = useState("");
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const source = (): string | Uint8Array => (file ? file.bytes : input);
  const sourceName = file ? file.name : "data";

  const cli = useMemo(() => {
    if (mode === "convert") return `lacspace-excel convert ${sourceName}${file ? "" : ".json"} --to ${to}${flatten ? " --flatten" : ""}${to === "xlsx" ? ` -o ${sourceName}.xlsx` : ""}`;
    if (mode === "inspect") return `lacspace-excel inspect ${sourceName}${file ? "" : ".json"}`;
    if (mode === "formula") return `lacspace-excel formula ${sourceName}${file ? "" : ".json"} --add "${column}=${formula.replace(/^=/, "")}"`;
    return `lacspace-excel template ${templateId} -o ${templateId}.xlsx`;
  }, [mode, sourceName, file, to, flatten, column, formula, templateId]);

  async function onFile(f: File | undefined) {
    if (!f) return;
    const buf = new Uint8Array(await f.arrayBuffer());
    setFile({ name: f.name, bytes: buf });
    setFrom("auto");
    setOk(`Loaded ${f.name} (${(buf.length / 1024).toFixed(1)} KB)`);
  }

  async function run() {
    setErr(""); setOk(""); setOut("");
    try {
      const src = source();
      const fromOpt = from === "auto" ? undefined : from;
      if (mode === "convert") {
        const result = await convert(src, { from: fromOpt, to, flatten });
        if (typeof result === "string") { setOut(result); setOk(`${fromOpt ?? detect(src) ?? "input"} → ${to}`); }
        else { download(result, `${sourceName.replace(/\.[a-z]+$/i, "")}.xlsx`, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"); setOk(`Downloaded ${sourceName.replace(/\.[a-z]+$/i, "")}.xlsx (${(result.length / 1024).toFixed(1)} KB)`); setOut("A real .xlsx was generated in your browser and downloaded."); }
      } else if (mode === "inspect") {
        const tables = await parseInput(src, fromOpt);
        const report = tables.map((t) => {
          const schema = inferSchema(t.rows);
          const cols = schema.map((c) => `  ${c.name.padEnd(22)} ${c.type}${c.nullable ? " (nullable)" : ""}`).join("\n");
          const sample = t.rows.slice(0, 3).map((r) => "  " + JSON.stringify(r)).join("\n");
          return `Sheet: ${t.name ?? "data"} — ${t.rows.length} rows × ${schema.length} columns\n${cols}\nSample:\n${sample}`;
        }).join("\n\n");
        setOut(report); setOk(`${tables.length} table${tables.length === 1 ? "" : "s"} · format: ${fromOpt ?? detect(src) ?? "?"}`);
      } else if (mode === "formula") {
        const valid = check(formula);
        if (!valid.ok) throw new Error(`Formula: ${valid.error}${valid.position !== undefined ? ` (at ${valid.position})` : ""}`);
        const tables = await parseInput(src, fromOpt);
        const table = tables[0];
        if (!table) throw new Error("No rows found.");
        const flat = (await parseInput(await convert(table.rows, { to: "json", flatten: true }) as string, "json"))[0]?.rows ?? table.rows;
        const values = computeColumn(formula, flat);
        const rows = flat.map((r, i) => ({ ...r, [column || "result"]: values[i] }));
        setOut(JSON.stringify(rows, null, 2)); setOk(`${rows.length} rows · new column "${column || "result"}"`);
      } else {
        const bytes = buildTemplate(templateId);
        const preview = templateToTables(templateId).map((t) => `${t.name}\n` + t.rows.slice(0, 4).map((r) => "  " + JSON.stringify(r)).join("\n")).join("\n\n");
        download(bytes, `${templateId}.xlsx`, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        setOut(preview); setOk(`Downloaded ${templateId}.xlsx (${(bytes.length / 1024).toFixed(1)} KB) — live formulas inside`);
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    }
  }

  const fnHint = useMemo(() => {
    const m = /([A-Za-z]+)\s*\(/.exec(formula);
    const doc = m ? FUNCTION_DOCS.find((d) => d.name === m[1]!.toUpperCase()) : undefined;
    return doc ? `${doc.signature} — ${doc.description}` : "Bare names read the row (qty * rate); SUM(rate) reads the column.";
  }, [formula]);

  return (
    <div className="pt">
      <div className="pt-modes">
        {(["convert", "inspect", "formula", "templates"] as Mode[]).map((m) => (
          <button key={m} className={`pt-mode ${mode === m ? "on" : ""}`} onClick={() => setMode(m)}>
            {m[0]!.toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>

      {mode !== "templates" && (
        <>
          <div className="pt-controls">
            <label>
              <span className="pt-lbl">From</span>
              <select className="pt-select" value={from} onChange={(e) => setFrom(e.target.value as Format | "auto")}>
                <option value="auto">auto-detect</option>
                {ALL_FORMATS.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </label>
            {mode === "convert" && (
              <>
                <span className="pt-arrow">→</span>
                <label>
                  <span className="pt-lbl">To</span>
                  <select className="pt-select" value={to} onChange={(e) => setTo(e.target.value as Format)}>
                    {ALL_FORMATS.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <input type="checkbox" checked={flatten} onChange={(e) => setFlatten(e.target.checked)} />
                  <span className="pt-lbl" style={{ margin: 0 }}>flatten nested</span>
                </label>
              </>
            )}
            <label style={{ marginLeft: "auto" }}>
              <span className="pt-lbl">or a file (.xlsx / .csv / .json …)</span>
              <input type="file" accept=".xlsx,.csv,.tsv,.json,.ndjson,.yaml,.yml,.toml,.md,.html,.sql,.txt" onChange={(e) => void onFile(e.target.files?.[0])} />
            </label>
          </div>

          <div className="pt-grid">
            <div className="pt-pane">
              <div className="pt-pane-lbl">{file ? `File: ${file.name}` : "Input (paste JSON, CSV, YAML, Markdown table or SQL)"}</div>
              {file ? (
                <div className="pt-area" style={{ minHeight: 80 }}>
                  {file.name} · {(file.bytes.length / 1024).toFixed(1)} KB{" "}
                  <button className="pt-mode" onClick={() => { setFile(null); setOk(""); }}>use pasted text instead</button>
                </div>
              ) : (
                <textarea className="pt-area" value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} rows={12} />
              )}
            </div>
          </div>
        </>
      )}

      {mode === "formula" && (
        <div className="pt-controls">
          <label style={{ flex: 1 }}>
            <span className="pt-lbl">New column</span>
            <input className="pt-input" value={column} onChange={(e) => setColumn(e.target.value)} spellCheck={false} placeholder="amount" />
          </label>
          <label style={{ flex: 3 }}>
            <span className="pt-lbl">Formula</span>
            <input className="pt-input" value={formula} onChange={(e) => setFormula(e.target.value)} spellCheck={false} placeholder="=IF(paid, qty*rate, 0)" />
          </label>
          <div className="pt-dim" style={{ flexBasis: "100%", fontSize: 12 }}>{fnHint}</div>
        </div>
      )}

      {mode === "templates" && (
        <div className="pt-controls">
          <label style={{ flex: 1 }}>
            <span className="pt-lbl">Template</span>
            <select className="pt-select" value={templateId} onChange={(e) => setTemplateId(e.target.value)}>
              {templates.map((t) => <option key={t.id} value={t.id}>{t.name} — {t.category}</option>)}
            </select>
          </label>
          <div className="pt-dim" style={{ flexBasis: "100%", fontSize: 12 }}>
            {templates.find((t) => t.id === templateId)?.description}
          </div>
        </div>
      )}

      <div className="pt-cli"><code>{cli}</code></div>

      <div className="pt-run-row">
        <button className="btn btn-primary pt-run" onClick={() => void run()}>
          {mode === "templates" ? "Download template →" : mode === "convert" && to === "xlsx" ? "Convert & download →" : "Run →"}
        </button>
      </div>

      {err && <pre className="pt-err">{err}</pre>}
      {(out || ok) && !err && (
        <div className="pt-out">
          <div className="pt-out-bar"><span className="pt-ok">{ok}</span><span className="pt-dim">runs in your browser</span></div>
          {out && <pre className="pt-json">{out}</pre>}
        </div>
      )}
    </div>
  );
}
