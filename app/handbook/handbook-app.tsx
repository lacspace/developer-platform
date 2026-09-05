"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CodeBlock } from "../components/code-block";
import { SECTIONS, KIT_ORDER, RESOURCES, MENTIONED_PKGS, type Recipe } from "./content";

type PM = "npm" | "pnpm" | "yarn" | "bun";
const PMS: PM[] = ["npm", "pnpm", "yarn", "bun"];

function pmTransform(code: string, pm: PM): string {
  if (pm === "npm") return code;
  const add: Record<PM, string> = { npm: "npm i", pnpm: "pnpm add", yarn: "yarn add", bun: "bun add" };
  const create: Record<PM, string> = { npm: "npm create", pnpm: "pnpm create", yarn: "yarn create", bun: "bun create" };
  const dlx: Record<PM, string> = { npm: "npx", pnpm: "pnpm dlx", yarn: "yarn dlx", bun: "bunx" };
  const run: Record<PM, string> = { npm: "npm run", pnpm: "pnpm", yarn: "yarn", bun: "bun" };
  return code
    .replace(/\bnpm create /g, create[pm] + " ")
    .replace(/\bnpm i(nstall)? /g, add[pm] + " ")
    .replace(/\bnpx /g, dlx[pm] + " ")
    .replace(/\bnpm run /g, run[pm] + " ")
    .replace(/\bnpm outdated\b/g, pm + " outdated")
    .replace(/\bnpm update\b/g, pm === "yarn" ? "yarn upgrade" : pm + " update");
}

// Render `inline code` inside prose text.
function Fmt({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("`") && p.endsWith("`") ? <code key={i}>{p.slice(1, -1)}</code> : <span key={i}>{p}</span>
      )}
    </>
  );
}

function recipeText(r: Recipe): string {
  return [
    r.title, r.blurb, r.note, r.code, ...(r.pkgs ?? []), ...(r.bullets ?? []),
    ...(r.rows?.flatMap((row) => row) ?? []), ...(r.faqs?.flatMap((f) => [f.q, f.a]) ?? []),
  ].filter(Boolean).join(" ").toLowerCase();
}

export function HandbookApp() {
  const [q, setQ] = useState("");
  const [kit, setKit] = useState("All");
  const [pm, setPm] = useState<PM>("npm");
  const [active, setActive] = useState(SECTIONS[0]!.id);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const ql = q.trim().toLowerCase();

  const filtered = useMemo(() => {
    return SECTIONS.map((s) => ({
      ...s,
      recipes: s.recipes.filter((r) => !ql || recipeText(r).includes(ql)),
    })).filter((s) => (kit === "All" || s.kit === kit) && s.recipes.length > 0);
  }, [ql, kit]);

  const totalHits = filtered.reduce((n, s) => n + s.recipes.length, 0);

  // scroll: reading progress + scrollspy + back-to-top
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        setProgress(max > 0 ? (doc.scrollTop / max) * 100 : 0);
        setShowTop(doc.scrollTop > 600);
        let current = filtered[0]?.id ?? "";
        for (const s of filtered) {
          const el = document.getElementById("sec-" + s.id);
          if (el && el.getBoundingClientRect().top <= 140) current = s.id;
        }
        if (current) setActive(current);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [filtered]);

  // keyboard: "/" focuses search, Esc clears
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      const typing = t.tagName === "INPUT" || t.tagName === "TEXTAREA";
      if (e.key === "/" && !typing) { e.preventDefault(); searchRef.current?.focus(); }
      else if (e.key === "Escape" && typing) { setQ(""); searchRef.current?.blur(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="hb-progress" style={{ width: progress + "%" }} />

      {/* Controls */}
      <div className="hb-controls">
        <div className="hb-search">
          <span aria-hidden>🔍</span>
          <input
            ref={searchRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search recipes, packages, code…  (press /)"
            aria-label="Search the handbook"
          />
          {q && <button className="hb-clear" onClick={() => setQ("")} aria-label="Clear">✕</button>}
        </div>
        <div className="hb-pm" role="tablist" aria-label="Package manager">
          {PMS.map((p) => (
            <button key={p} role="tab" aria-selected={pm === p} className={pm === p ? "on" : ""} onClick={() => setPm(p)}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="hb-chips">
        {["All", ...KIT_ORDER].map((k) => {
          const count = k === "All" ? SECTIONS.length : SECTIONS.filter((s) => s.kit === k).length;
          if (count === 0) return null;
          return (
            <button key={k} className={"hb-chip" + (kit === k ? " on" : "")} onClick={() => setKit(k)}>
              {k}
            </button>
          );
        })}
        {ql && <span className="hb-count">{totalHits} result{totalHits === 1 ? "" : "s"}</span>}
      </div>

      <div className="hb">
        {/* TOC + resources */}
        <aside className="hb-toc hb-toc2">
          <div className="toc-title">On this page</div>
          {filtered.map((s) => (
            <a key={s.id} href={"#sec-" + s.id} className={active === s.id ? "on" : ""}>
              <span aria-hidden style={{ marginRight: 8 }}>{s.icon}</span>
              {s.label}
              <span className="hb-toc-n">{s.recipes.length}</span>
            </a>
          ))}

          <div className="hb-res">
            <div className="toc-title">Resources</div>
            {RESOURCES.map((r) => (
              <a key={r.label} href={r.href} {...(r.external ? { target: "_blank", rel: "noopener" } : {})} className="hb-res-a">
                <span aria-hidden>{r.icon}</span> {r.label}
              </a>
            ))}
          </div>
        </aside>

        {/* Content */}
        <div className="hb-body">
          {filtered.length === 0 && (
            <div className="hb-empty">
              <p style={{ fontSize: 40 }}>🔍</p>
              <p>No recipes match “{q}”.</p>
              <button className="btn btn-ghost" onClick={() => { setQ(""); setKit("All"); }}>Clear filters</button>
            </div>
          )}

          {filtered.map((s) => (
            <section key={s.id} id={"sec-" + s.id} style={{ scrollMarginTop: 150 }}>
              <h2 style={{ marginTop: 40 }}>
                <span aria-hidden style={{ marginRight: 10 }}>{s.icon}</span>
                {s.label}
              </h2>
              {s.intro && <p className="hb-lead" style={{ fontSize: "1rem" }}>{s.intro}</p>}

              {s.recipes.map((r) => (
                <div key={r.id} className="hb-recipe">
                  {(s.recipes.length > 1 || r.title !== s.label) && <h3>{r.title}</h3>}
                  {r.pkgs && r.pkgs.length > 0 && (
                    <div className="hb-pkgs">
                      {r.pkgs.map((p) => (
                        <a key={p} href={`https://www.npmjs.com/package/@lacspace/${p}`} target="_blank" rel="noopener" className="hb-pkg">
                          @lacspace/{p}
                        </a>
                      ))}
                    </div>
                  )}
                  {r.blurb && <p><Fmt text={r.blurb} /></p>}
                  {r.bullets && (
                    <ul>{r.bullets.map((b, i) => <li key={i}><Fmt text={b} /></li>)}</ul>
                  )}
                  {r.rows && (
                    <table className="hb-tpl-table">
                      <tbody>
                        {r.rows.map(([k, v], i) => (
                          <tr key={i}><td className="k">{k}</td><td><Fmt text={v} /></td></tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  {r.faqs && r.faqs.map((f, i) => (
                    <div key={i}><h3 style={{ fontSize: "1.05rem" }}>{f.q}</h3><p><Fmt text={f.a} /></p></div>
                  ))}
                  {r.code && <CodeBlock code={pmTransform(r.code, pm)} label={r.label} lang={r.lang} />}
                  {r.note && <div className="callout"><Fmt text={r.note} /></div>}
                  {r.playground && (
                    <a className="hb-try" href="/playground">Try it in the playground →</a>
                  )}
                </div>
              ))}
            </section>
          ))}

          {/* Package index */}
          {kit === "All" && !ql && (
            <section style={{ marginTop: 52 }}>
              <h2>Packages in this guide</h2>
              <p className="hb-lead" style={{ fontSize: "1rem" }}>
                Every package referenced above — jump straight to its README on npm.
              </p>
              <div className="hb-pkgs" style={{ marginTop: 14 }}>
                {MENTIONED_PKGS.map((p) => (
                  <a key={p} href={`https://www.npmjs.com/package/@lacspace/${p}`} target="_blank" rel="noopener" className="hb-pkg">
                    @lacspace/{p}
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <button
        className={"hb-top" + (showTop ? " on" : "")}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        ↑
      </button>
    </>
  );
}
