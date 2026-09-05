"use client";

import { useState } from "react";
import { slugify } from "@lacspace/slugify";
import { money } from "@lacspace/money";
import { camelCase, snakeCase, kebabCase, constantCase, pascalCase } from "@lacspace/case";
import { bytes, number as humanNumber, ordinal, duration } from "@lacspace/humanize";
import { uuidv4, uuidv7, nanoid, shortId } from "@lacspace/id";
import { toRgb, toHsl, lighten, darken } from "@lacspace/color";

function safe<T>(fn: () => T, fallback = "—"): T | string {
  try {
    const v = fn();
    return v === undefined || v === null || v === "" ? fallback : v;
  } catch {
    return "invalid input";
  }
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 12, padding: "7px 0", borderTop: "1px solid var(--hairline)", fontSize: 13.5 }}>
      <span className="mono" style={{ color: "var(--faint)", minWidth: 96 }}>{k}</span>
      <span className="mono" style={{ color: "var(--fg)", wordBreak: "break-all" }}>{v}</span>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--panel-2)",
  border: "1px solid var(--hairline-2)",
  borderRadius: 10,
  color: "var(--fg)",
  padding: "10px 12px",
  fontSize: 14,
  fontFamily: "inherit",
  outline: "none",
};

export function Playground() {
  const [slug, setSlug] = useState("Héllo, World! — Lacspace 2026");
  const [amount, setAmount] = useState("1234.5");
  const [currency, setCurrency] = useState("USD");
  const [text, setText] = useState("Lacspace developer platform");
  const [num, setNum] = useState("1536000");
  const [color, setColor] = useState("#3b82f6");
  const [ids, setIds] = useState<{ v4: string; v7: string; nano: string; short: string }>({
    v4: "click generate →",
    v7: "",
    nano: "",
    short: "",
  });

  const n = Number(num);
  const amt = Number(amount);

  return (
    <div className="kits" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}>
      {/* slugify */}
      <div className="kit">
        <div className="kit-head"><span className="ic" aria-hidden>🔗</span><h3>slugify</h3></div>
        <p style={{ marginBottom: 12 }}><span className="mono" style={{ fontSize: 12 }}>@lacspace/slugify</span></p>
        <input style={inputStyle} value={slug} onChange={(e) => setSlug(e.target.value)} aria-label="Text to slugify" />
        <Row k="slug" v={String(safe(() => slugify(slug)))} />
      </div>

      {/* money */}
      <div className="kit">
        <div className="kit-head"><span className="ic" aria-hidden>💰</span><h3>money</h3></div>
        <p style={{ marginBottom: 12 }}><span className="mono" style={{ fontSize: 12 }}>@lacspace/money</span></p>
        <div style={{ display: "flex", gap: 8 }}>
          <input style={{ ...inputStyle, flex: 2 }} value={amount} onChange={(e) => setAmount(e.target.value)} aria-label="Amount" inputMode="decimal" />
          <input style={{ ...inputStyle, flex: 1 }} value={currency} onChange={(e) => setCurrency(e.target.value.toUpperCase())} aria-label="Currency" />
        </div>
        <Row k="format" v={String(safe(() => money(amt, currency).format()))} />
        <Row k="× 3" v={String(safe(() => money(amt, currency).multiply(3).format()))} />
        <Row k="split /3" v={String(safe(() => money(amt, currency).allocate([1, 1, 1]).map((m) => m.format()).join("  ")))} />
      </div>

      {/* case */}
      <div className="kit">
        <div className="kit-head"><span className="ic" aria-hidden>🔤</span><h3>case</h3></div>
        <p style={{ marginBottom: 12 }}><span className="mono" style={{ fontSize: 12 }}>@lacspace/case</span></p>
        <input style={inputStyle} value={text} onChange={(e) => setText(e.target.value)} aria-label="Text to re-case" />
        <Row k="camel" v={String(safe(() => camelCase(text)))} />
        <Row k="pascal" v={String(safe(() => pascalCase(text)))} />
        <Row k="snake" v={String(safe(() => snakeCase(text)))} />
        <Row k="kebab" v={String(safe(() => kebabCase(text)))} />
        <Row k="constant" v={String(safe(() => constantCase(text)))} />
      </div>

      {/* humanize */}
      <div className="kit">
        <div className="kit-head"><span className="ic" aria-hidden>📏</span><h3>humanize</h3></div>
        <p style={{ marginBottom: 12 }}><span className="mono" style={{ fontSize: 12 }}>@lacspace/humanize</span></p>
        <input style={inputStyle} value={num} onChange={(e) => setNum(e.target.value)} aria-label="A number" inputMode="numeric" />
        <Row k="bytes" v={String(safe(() => bytes(n)))} />
        <Row k="number" v={String(safe(() => humanNumber(n)))} />
        <Row k="ordinal" v={String(safe(() => ordinal(n)))} />
        <Row k="duration" v={String(safe(() => duration(n)))} />
      </div>

      {/* color */}
      <div className="kit">
        <div className="kit-head"><span className="ic" aria-hidden>🎨</span><h3>color</h3></div>
        <p style={{ marginBottom: 12 }}><span className="mono" style={{ fontSize: 12 }}>@lacspace/color</span></p>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input style={inputStyle} value={color} onChange={(e) => setColor(e.target.value)} aria-label="Hex color" />
          <span style={{ width: 34, height: 34, borderRadius: 8, flex: "none", border: "1px solid var(--hairline-2)", background: safe(() => color, "#000") as string }} />
        </div>
        <Row k="rgb" v={String(safe(() => toRgb(color)))} />
        <Row k="hsl" v={String(safe(() => toHsl(color)))} />
        <Row k="lighten .2" v={<span><span style={{ display: "inline-block", width: 12, height: 12, borderRadius: 3, marginRight: 6, verticalAlign: "middle", background: String(safe(() => lighten(color, 0.2), "#000")) }} />{String(safe(() => lighten(color, 0.2)))}</span>} />
        <Row k="darken .2" v={<span><span style={{ display: "inline-block", width: 12, height: 12, borderRadius: 3, marginRight: 6, verticalAlign: "middle", background: String(safe(() => darken(color, 0.2), "#000")) }} />{String(safe(() => darken(color, 0.2)))}</span>} />
      </div>

      {/* id */}
      <div className="kit">
        <div className="kit-head"><span className="ic" aria-hidden>🆔</span><h3>id</h3></div>
        <p style={{ marginBottom: 12 }}><span className="mono" style={{ fontSize: 12 }}>@lacspace/id</span></p>
        <button
          className="btn btn-ghost"
          style={{ width: "100%", justifyContent: "center" }}
          onClick={() =>
            setIds({
              v4: String(safe(() => uuidv4())),
              v7: String(safe(() => uuidv7())),
              nano: String(safe(() => nanoid())),
              short: String(safe(() => shortId())),
            })
          }
        >
          Generate ids ↻
        </button>
        <Row k="uuid v4" v={ids.v4} />
        {ids.v7 && <Row k="uuid v7" v={ids.v7} />}
        {ids.nano && <Row k="nanoid" v={ids.nano} />}
        {ids.short && <Row k="shortId" v={ids.short} />}
      </div>
    </div>
  );
}
