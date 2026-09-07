"use client";

import { useMemo, useState } from "react";
import { parseFields, generateRows, formatRows } from "lacspace-fake";

type Fmt = "json" | "ndjson" | "csv" | "sql";
const FORMATS: Fmt[] = ["json", "ndjson", "csv", "sql"];
const LOCALES = ["en", "ne"] as const;

const PRESETS: { label: string; fields: string }[] = [
  { label: "Users", fields: "id:autoincrement,name:fullName,email:email,age:int(18..65),active:bool" },
  { label: "Products", fields: "id:uuid,name:productName,price:float(5..500),sku:sku,category:oneOf(books|tech|home)" },
  { label: "Orders", fields: "id:autoincrement,customer:fullName,total:int(1000..50000),status:oneOf(paid|pending|refunded),placed:past" },
  { label: "Contacts (Nepal)", fields: "name:fullName,phone:phone,city:city,email:email" },
];

export function FakeTry() {
  const [fields, setFields] = useState(PRESETS[0]!.fields);
  const [count, setCount] = useState(5);
  const [format, setFormat] = useState<Fmt>("json");
  const [table, setTable] = useState("users");
  const [seed, setSeed] = useState("42");
  const [locale, setLocale] = useState<(typeof LOCALES)[number]>("en");
  const [out, setOut] = useState("");
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const cli = useMemo(() => {
    let c = `npx lacspace-fake --fields "${fields}" -n ${count} -f ${format}`;
    if (format === "sql") c += ` --table ${table}`;
    if (seed) c += ` --seed ${seed}`;
    if (locale === "ne") c += ` --locale ne`;
    return c;
  }, [fields, count, format, table, seed, locale]);

  function run() {
    setErr("");
    setOk("");
    setOut("");
    try {
      const n = Math.max(1, Math.min(200, Math.floor(count) || 1));
      const parsed = parseFields(fields);
      const rows = generateRows(parsed, { count: n, seed: seed || undefined, locale });
      const text = formatRows(rows, { format, pretty: format === "json", table });
      setOut(text);
      setOk(`${n} row${n === 1 ? "" : "s"} · ${format}${seed ? ` · seed ${seed}` : ""}`);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    }
  }

  return (
    <div className="pt">
      <div className="pt-controls" style={{ marginBottom: 10 }}>
        <span className="pt-lbl" style={{ alignSelf: "center", margin: 0 }}>Presets</span>
        {PRESETS.map((p) => (
          <button key={p.label} className="pt-add" style={{ marginTop: 0 }} onClick={() => { setFields(p.fields); if (p.label.includes("Nepal")) setLocale("ne"); }}>
            {p.label}
          </button>
        ))}
      </div>

      <div className="pt-field" style={{ marginTop: 4 }}>
        <span className="pt-lbl">Fields — <code>name:generator</code>, comma-separated</span>
        <input className="pt-input" value={fields} onChange={(e) => setFields(e.target.value)} spellCheck={false} />
      </div>

      <div className="pt-controls" style={{ marginTop: 14 }}>
        <label>
          <span className="pt-lbl">Rows</span>
          <input className="pt-select" style={{ width: 84 }} type="number" min={1} max={200} value={count} onChange={(e) => setCount(Number(e.target.value))} />
        </label>
        <label>
          <span className="pt-lbl">Format</span>
          <select className="pt-select" value={format} onChange={(e) => setFormat(e.target.value as Fmt)}>
            {FORMATS.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </label>
        {format === "sql" && (
          <label>
            <span className="pt-lbl">Table</span>
            <input className="pt-select" style={{ width: 120 }} value={table} onChange={(e) => setTable(e.target.value)} />
          </label>
        )}
        <label>
          <span className="pt-lbl">Seed</span>
          <input className="pt-select" style={{ width: 96 }} value={seed} onChange={(e) => setSeed(e.target.value)} placeholder="(random)" />
        </label>
        <label>
          <span className="pt-lbl">Locale</span>
          <select className="pt-select" value={locale} onChange={(e) => setLocale(e.target.value as (typeof LOCALES)[number])}>
            {LOCALES.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </label>
      </div>

      <div className="pt-cli"><code>{cli}</code></div>

      <div className="pt-run-row">
        <button className="btn btn-primary pt-run" onClick={run}>Generate →</button>
      </div>

      {err && <pre className="pt-err">{err}</pre>}
      {out && !err && (
        <div className="pt-out">
          <div className="pt-out-bar"><span className="pt-ok">{ok}</span><span className="pt-dim">runs in your browser · deterministic</span></div>
          <pre className="pt-json">{out}</pre>
        </div>
      )}
    </div>
  );
}
