"use client";

import { useMemo, useRef, useState } from "react";
import { CATALOG } from "../lib/catalog";

const ALL_PKGS = CATALOG.flatMap((g) => g.items.map((p) => p.n)).sort();

// Hide the URL import from the bundler so it stays a native runtime import.
const importExternal = new Function("u", "return import(u)") as (u: string) => Promise<Record<string, unknown>>;

const fmt = (v: unknown): string => {
  if (typeof v === "string") return v;
  if (v === undefined) return "undefined";
  if (v === null) return "null";
  try {
    return JSON.stringify(
      v,
      (_k, val) => (typeof val === "bigint" ? val.toString() + "n" : val),
      2
    );
  } catch {
    return String(v);
  }
};

const STARTERS: Record<string, string> = {
  slugify: `const { slugify } = await use("slugify");\nreturn slugify("Héllo, Lacspace! — 2026");`,
  money: `const { money } = await use("money");\nreturn money(1234.5, "USD").allocate([1,1,1]).map(m => m.format());`,
  validate: `const { v } = await use("validate");\nconst User = v.object({ email: v.string().email(), age: v.coerce.number().min(18) });\nreturn User.safeParse({ email: "ada@lacspace.com", age: "21" });`,
  jwt: `const { sign, verify } = await use("jwt");\nconst token = await sign({ sub: "user_1" }, "secret", { expiresIn: 60 });\nconsole.log(token);\nreturn await verify(token, "secret");`,
  crypto: `const { encryptWithPassword, decryptWithPassword } = await use("crypto");\nconst blob = await encryptWithPassword("card 4242", "hunter2");\nconsole.log(blob);\nreturn await decryptWithPassword(blob, "hunter2");`,
  otp: `const { generateSecret, totp } = await use("otp");\nconst secret = generateSecret();\nreturn { secret, code: totp(secret) };`,
  humanize: `const { bytes, duration, relativeTime } = await use("humanize");\nreturn { size: bytes(1536000), took: duration(93000), ago: relativeTime(Date.now() - 3600_000) };`,
  id: `const { uuidv7, nanoid, shortId } = await use("id");\nreturn { uuidv7: uuidv7(), nanoid: nanoid(), shortId: shortId() };`,
  color: `const { toRgb, lighten, darken } = await use("color");\nreturn { rgb: toRgb("#3b82f6"), lighter: lighten("#3b82f6", 0.2), darker: darken("#3b82f6", 0.2) };`,
  markdown: `const { markdownToHtml } = await use("markdown");\nreturn markdownToHtml("# Hi\\n\\n- **bold** and \\\`code\\\`");`,
};

const DEFAULT = `// Import any @lacspace package — loaded live from a CDN, no install.
// Write code, hit Run. Use console.log(...) or return a value.

const { slugify } = await use("slugify");
const { money }   = await use("money");

console.log(slugify("Hello, Lacspace!"));
return money(1234.5, "USD").format();`;

export function Repl() {
  const [code, setCode] = useState(DEFAULT);
  const [out, setOut] = useState("");
  const [running, setRunning] = useState(false);
  const [ok, setOk] = useState(false);
  const taRef = useRef<HTMLTextAreaElement>(null);

  const pkgOptions = useMemo(() => ALL_PKGS, []);

  const run = async () => {
    setRunning(true);
    setOut("");
    const logs: string[] = [];
    const con = {
      log: (...a: unknown[]) => logs.push(a.map(fmt).join(" ")),
      error: (...a: unknown[]) => logs.push("⚠ " + a.map(fmt).join(" ")),
      warn: (...a: unknown[]) => logs.push("! " + a.map(fmt).join(" ")),
      info: (...a: unknown[]) => logs.push(a.map(fmt).join(" ")),
    };
    const use = async (pkg: string) => {
      const name = pkg.startsWith("@lacspace/") ? pkg : "@lacspace/" + pkg;
      return importExternal(`https://esm.sh/${name}`);
    };
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function("use", "console", `return (async () => {\n${code}\n})()`);
      const ret = await fn(use, con);
      if (ret !== undefined) logs.push("→ " + fmt(ret));
      setOut(logs.join("\n") || "(ran — no output)");
    } catch (e) {
      setOut(logs.concat("✗ " + (e instanceof Error ? e.message : String(e))).join("\n"));
    } finally {
      setRunning(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const t = e.currentTarget;
      const s = t.selectionStart, en = t.selectionEnd;
      const next = code.slice(0, s) + "  " + code.slice(en);
      setCode(next);
      requestAnimationFrame(() => { t.selectionStart = t.selectionEnd = s + 2; });
    } else if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      run();
    }
  };

  const loadStarter = (pkg: string) => {
    if (!pkg) return;
    const snippet = STARTERS[pkg] ?? `const m = await use("${pkg}");\nconsole.log("exports:", Object.keys(m));\nreturn m;`;
    setCode(snippet);
    setOut("");
    taRef.current?.focus();
  };

  return (
    <div className="repl">
      <div className="repl-bar">
        <span className="repl-title">▶ Run any package</span>
        <select className="pk-sort repl-pick" defaultValue="" onChange={(e) => { loadStarter(e.target.value); e.currentTarget.value = ""; }} aria-label="Load a package example">
          <option value="">Load an example…</option>
          {pkgOptions.map((p) => <option key={p} value={p}>@lacspace/{p}</option>)}
        </select>
        <button className="btn btn-primary repl-run" onClick={run} disabled={running}>
          {running ? "Running…" : "Run ▸"} <span className="repl-kbd">⌘⏎</span>
        </button>
      </div>
      <div className="repl-grid">
        <div className="repl-editor">
          <div className="codebar">
            <span className="dots"><i style={{ background: "#ff5f57" }} /><i style={{ background: "#febc2e" }} /><i style={{ background: "#28c840" }} /></span>
            <span className="codelabel">playground.ts</span>
            <button className="copybtn" onClick={() => { try { navigator.clipboard.writeText(code); setOk(true); setTimeout(() => setOk(false), 1400); } catch {} }}>{ok ? "Copied ✓" : "Copy"}</button>
          </div>
          <textarea
            ref={taRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            aria-label="Code editor"
          />
        </div>
        <div className="repl-out">
          <div className="codebar"><span className="codelabel">output</span></div>
          <pre>{out || "// output appears here — everything runs in your browser"}</pre>
        </div>
      </div>
      <p className="repl-note">
        Packages load live from <a href="https://esm.sh" target="_blank" rel="noopener" className="link">esm.sh</a> and run entirely in your browser —
        nothing is sent to a server. Server-only packages (mailer, pdf, xlsx…) may not run here.
      </p>
    </div>
  );
}
