"use client";

import { useEffect, useState } from "react";
import { slugify } from "@lacspace/slugify";
import { money } from "@lacspace/money";
import { camelCase, snakeCase, kebabCase, constantCase, pascalCase } from "@lacspace/case";
import { bytes, number as humanNumber, ordinal, duration } from "@lacspace/humanize";
import { uuidv4, uuidv7, nanoid, shortId } from "@lacspace/id";
import { toRgb, toHsl, lighten, darken } from "@lacspace/color";
import { v } from "@lacspace/validate";
import { encryptWithPassword, decryptWithPassword } from "@lacspace/crypto";
import { sign as jwtSign, verify as jwtVerify } from "@lacspace/jwt";
import { generateSecret, totp } from "@lacspace/otp";
import { hash as pwHash, strength as pwStrength } from "@lacspace/password";
import { markdownToHtml } from "@lacspace/markdown";
import { redactString } from "@lacspace/redact";
import { parse as csvParse } from "@lacspace/csv";
import { Repl } from "./repl";

function safe<T>(fn: () => T, fb = "—"): T | string {
  try { const v = fn(); return v === undefined || v === null || v === "" ? fb : v; } catch { return "invalid input"; }
}
const fmt = (v: unknown) => { try { return typeof v === "string" ? v : JSON.stringify(v); } catch { return String(v); } };

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="pg-row">
      <span className="mono pg-k">{k}</span>
      <span className="mono pg-v">{v}</span>
    </div>
  );
}
const inp: React.CSSProperties = {
  width: "100%", background: "var(--panel-2)", border: "1px solid var(--hairline-2)",
  borderRadius: 10, color: "var(--fg)", padding: "9px 12px", fontSize: 14, fontFamily: "inherit", outline: "none",
};

/* ---------- individual demos ---------- */
function Slugify() {
  const [s, setS] = useState("Héllo, World! — Lacspace 2026");
  return (<><input style={inp} value={s} onChange={(e) => setS(e.target.value)} aria-label="slugify input" /><Row k="slug" v={String(safe(() => slugify(s)))} /></>);
}
function Money() {
  const [a, setA] = useState("1234.5"); const [c, setC] = useState("USD"); const n = Number(a);
  return (<>
    <div style={{ display: "flex", gap: 8 }}>
      <input style={{ ...inp, flex: 2 }} value={a} onChange={(e) => setA(e.target.value)} inputMode="decimal" aria-label="amount" />
      <input style={{ ...inp, flex: 1 }} value={c} onChange={(e) => setC(e.target.value.toUpperCase())} aria-label="currency" />
    </div>
    <Row k="format" v={String(safe(() => money(n, c).format()))} />
    <Row k="× 3" v={String(safe(() => money(n, c).multiply(3).format()))} />
    <Row k="split /3" v={String(safe(() => money(n, c).allocate([1, 1, 1]).map((m) => m.format()).join("  ")))} />
  </>);
}
function Case() {
  const [t, setT] = useState("Lacspace developer platform");
  return (<><input style={inp} value={t} onChange={(e) => setT(e.target.value)} aria-label="case input" />
    <Row k="camel" v={String(safe(() => camelCase(t)))} /><Row k="pascal" v={String(safe(() => pascalCase(t)))} />
    <Row k="snake" v={String(safe(() => snakeCase(t)))} /><Row k="kebab" v={String(safe(() => kebabCase(t)))} />
    <Row k="constant" v={String(safe(() => constantCase(t)))} /></>);
}
function Humanize() {
  const [num, setNum] = useState("1536000"); const n = Number(num);
  return (<><input style={inp} value={num} onChange={(e) => setNum(e.target.value)} inputMode="numeric" aria-label="number" />
    <Row k="bytes" v={String(safe(() => bytes(n)))} /><Row k="number" v={String(safe(() => humanNumber(n)))} />
    <Row k="ordinal" v={String(safe(() => ordinal(n)))} /><Row k="duration" v={String(safe(() => duration(n)))} /></>);
}
function Color() {
  const [c, setC] = useState("#3b82f6");
  return (<><div style={{ display: "flex", gap: 8, alignItems: "center" }}>
    <input style={inp} value={c} onChange={(e) => setC(e.target.value)} aria-label="hex" />
    <span style={{ width: 34, height: 34, borderRadius: 8, flex: "none", border: "1px solid var(--hairline-2)", background: safe(() => c, "#000") as string }} /></div>
    <Row k="rgb" v={String(safe(() => toRgb(c)))} /><Row k="hsl" v={String(safe(() => toHsl(c)))} />
    <Row k="lighten .2" v={String(safe(() => lighten(c, 0.2)))} /><Row k="darken .2" v={String(safe(() => darken(c, 0.2)))} /></>);
}
function Id() {
  const [ids, setIds] = useState({ v4: "click generate →", v7: "", nano: "", short: "" });
  return (<><button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }} onClick={() => setIds({ v4: String(safe(() => uuidv4())), v7: String(safe(() => uuidv7())), nano: String(safe(() => nanoid())), short: String(safe(() => shortId())) })}>Generate ids ↻</button>
    <Row k="uuid v4" v={ids.v4} />{ids.v7 && <Row k="uuid v7" v={ids.v7} />}{ids.nano && <Row k="nanoid" v={ids.nano} />}{ids.short && <Row k="shortId" v={ids.short} />}</>);
}
function Validate() {
  const [j, setJ] = useState('{ "email": "ada@lacspace.com", "age": "21" }');
  const schema = v.object({ email: v.string().email(), age: v.coerce.number().int().min(18) });
  let result = ""; try { result = fmt(schema.safeParse(JSON.parse(j || "{}"))); } catch { result = "invalid JSON"; }
  return (<><textarea style={{ ...inp, minHeight: 64, resize: "vertical" }} value={j} onChange={(e) => setJ(e.target.value)} spellCheck={false} aria-label="json" />
    <Row k="safeParse" v={result} /></>);
}
function Crypto() {
  const [text, setText] = useState("card 4242 4242 4242"); const [pw, setPw] = useState("hunter2");
  const [blob, setBlob] = useState(""); const [dec, setDec] = useState("");
  const run = async () => { try { const b = await encryptWithPassword(text, pw); setBlob(b); setDec(await decryptWithPassword(b, pw)); } catch { setBlob("error"); setDec(""); } };
  return (<><div style={{ display: "flex", gap: 8 }}>
    <input style={{ ...inp, flex: 2 }} value={text} onChange={(e) => setText(e.target.value)} aria-label="plaintext" />
    <input style={{ ...inp, flex: 1 }} value={pw} onChange={(e) => setPw(e.target.value)} aria-label="password" /></div>
    <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }} onClick={run}>Encrypt → Decrypt 🔐</button>
    {blob && <Row k="cipher" v={blob.length > 46 ? blob.slice(0, 46) + "…" : blob} />}{dec && <Row k="decrypted" v={dec} />}</>);
}
function Jwt() {
  const [secret, setSecret] = useState("s3cret"); const [tok, setTok] = useState(""); const [ver, setVer] = useState("");
  const run = async () => { try { const t = await jwtSign({ sub: "user_1", role: "admin" }, secret, { expiresIn: 60 }); setTok(t); setVer(fmt(await jwtVerify(t, secret))); } catch (e) { setVer(String(e)); } };
  return (<><input style={inp} value={secret} onChange={(e) => setSecret(e.target.value)} aria-label="secret" />
    <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }} onClick={run}>Sign &amp; verify 🎫</button>
    {tok && <Row k="token" v={tok.slice(0, 40) + "…"} />}{ver && <Row k="payload" v={ver} />}</>);
}
function Otp() {
  const [secret, setSecret] = useState(""); const [code, setCode] = useState("");
  useEffect(() => {
    if (!secret) return;
    const tick = () => { totp(secret).then(setCode).catch(() => {}); };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [secret]);
  return (<><button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }} onClick={() => { const s = generateSecret(); setSecret(s); }}>Generate secret 🔑</button>
    {secret && <Row k="secret" v={secret.slice(0, 24) + "…"} />}{code && <Row k="live TOTP" v={<span style={{ fontSize: 18, letterSpacing: 2, color: "var(--fg)" }}>{code}</span>} />}</>);
}
function Password() {
  const [pw, setPw] = useState("Tr0ub4dour&3xy"); const [score, setScore] = useState(-1); const [h, setH] = useState("");
  const run = async () => { setScore(pwStrength(pw).score); setH(await pwHash(pw)); };
  return (<><input style={inp} value={pw} onChange={(e) => setPw(e.target.value)} aria-label="password" />
    <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }} onClick={run}>Hash &amp; score</button>
    {score >= 0 && <Row k="strength" v={`${score} / 4 ${["🔴", "🟠", "🟡", "🟢", "🟢"][score]}`} />}{h && <Row k="phc hash" v={h.slice(0, 40) + "…"} />}</>);
}
function Markdown() {
  const [md, setMd] = useState("# Hello\n\n- **bold**, _italic_ and `code`\n- [links](https://lacspace.com)");
  return (<><textarea style={{ ...inp, minHeight: 74, resize: "vertical" }} value={md} onChange={(e) => setMd(e.target.value)} spellCheck={false} aria-label="markdown" />
    <div className="pg-md" dangerouslySetInnerHTML={{ __html: String(safe(() => markdownToHtml(md), "")) }} /></>);
}
function Redact() {
  const [t, setT] = useState("Email ada@lacspace.com, card 4242 4242 4242 4242, token sk_live_abc123");
  return (<><textarea style={{ ...inp, minHeight: 64, resize: "vertical" }} value={t} onChange={(e) => setT(e.target.value)} spellCheck={false} aria-label="text" />
    <Row k="redacted" v={String(safe(() => redactString(t)))} /></>);
}
function Csv() {
  const [t, setT] = useState('name,role\nAda,"Engineer, lead"\nAlan,Researcher');
  let rows = ""; try { rows = fmt(csvParse(t)); } catch { rows = "parse error"; }
  return (<><textarea style={{ ...inp, minHeight: 64, resize: "vertical" }} value={t} onChange={(e) => setT(e.target.value)} spellCheck={false} aria-label="csv" />
    <Row k="parsed" v={rows} /></>);
}

type Demo = { id: string; title: string; icon: string; pkg: string; kit: string; Comp: () => React.JSX.Element };
const DEMOS: Demo[] = [
  { id: "slugify", title: "slugify", icon: "🔗", pkg: "slugify", kit: "Text", Comp: Slugify },
  { id: "case", title: "case", icon: "🔤", pkg: "case", kit: "Text", Comp: Case },
  { id: "markdown", title: "markdown", icon: "📝", pkg: "markdown", kit: "Text", Comp: Markdown },
  { id: "redact", title: "redact", icon: "🖊️", pkg: "redact", kit: "Text", Comp: Redact },
  { id: "humanize", title: "humanize", icon: "📏", pkg: "humanize", kit: "Text", Comp: Humanize },
  { id: "money", title: "money", icon: "💰", pkg: "money", kit: "Data", Comp: Money },
  { id: "validate", title: "validate", icon: "✅", pkg: "validate", kit: "Data", Comp: Validate },
  { id: "csv", title: "csv", icon: "📑", pkg: "csv", kit: "Data", Comp: Csv },
  { id: "color", title: "color", icon: "🎨", pkg: "color", kit: "Data", Comp: Color },
  { id: "id", title: "id", icon: "🆔", pkg: "id", kit: "Data", Comp: Id },
  { id: "crypto", title: "crypto", icon: "🔐", pkg: "crypto", kit: "Security", Comp: Crypto },
  { id: "jwt", title: "jwt", icon: "🎫", pkg: "jwt", kit: "Security", Comp: Jwt },
  { id: "otp", title: "otp", icon: "🔑", pkg: "otp", kit: "Security", Comp: Otp },
  { id: "password", title: "password", icon: "🛡️", pkg: "password", kit: "Security", Comp: Password },
];
const KITS = ["Text", "Data", "Security"];

export function Playground() {
  const [q, setQ] = useState(""); const [kit, setKit] = useState("All");
  const ql = q.trim().toLowerCase();
  const shown = DEMOS.filter((d) => (kit === "All" || d.kit === kit) && (!ql || (d.title + " " + d.pkg + " " + d.kit).toLowerCase().includes(ql)));
  return (
    <>
      <Repl />

      <div className="sec-head center" style={{ marginTop: 56, marginBottom: 18 }}>
        <div className="eyebrow">Instant demos</div>
        <h2>Or poke at the popular ones</h2>
        <p>Real packages running in your browser — change an input, watch the output.</p>
      </div>

      <div className="hb-controls" style={{ position: "static", background: "none", backdropFilter: "none", borderBottom: 0, padding: 0, marginBottom: 12 }}>
        <div className="hb-search">
          <span aria-hidden>🔍</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter demos…" aria-label="Filter demos" />
          {q && <button className="hb-clear" onClick={() => setQ("")} aria-label="Clear">✕</button>}
        </div>
      </div>
      <div className="hb-chips" style={{ marginBottom: 18 }}>
        {["All", ...KITS].map((k) => (
          <button key={k} className={"hb-chip" + (kit === k ? " on" : "")} onClick={() => setKit(k)}>{k}</button>
        ))}
        <span className="hb-count">{shown.length} demos</span>
      </div>

      <div className="kits" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}>
        {shown.map((d) => (
          <div className="kit" key={d.id}>
            <div className="kit-head">
              <span className="ic" aria-hidden>{d.icon}</span>
              <h3>{d.title}</h3>
            </div>
            <a href={`https://www.npmjs.com/package/@lacspace/${d.pkg}`} target="_blank" rel="noopener" className="mono" style={{ fontSize: 12, color: "var(--faint)", display: "block", marginBottom: 12 }}>@lacspace/{d.pkg} ↗</a>
            <d.Comp />
          </div>
        ))}
      </div>
    </>
  );
}
