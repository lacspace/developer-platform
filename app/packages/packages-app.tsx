"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CATALOG, CATALOG_TOTAL, type Pkg } from "../lib/catalog";

type PM = "npm" | "pnpm" | "yarn" | "bun";
const PMS: PM[] = ["npm", "pnpm", "yarn", "bun"];
const ADD: Record<PM, string> = { npm: "npm i", pnpm: "pnpm add", yarn: "yarn add", bun: "bun add" };

type Sort = "kit" | "az" | "za";

function useCopy(): [boolean, (t: string) => void] {
  const [ok, setOk] = useState(false);
  const copy = (t: string) => {
    try {
      navigator.clipboard.writeText(t);
      setOk(true);
      setTimeout(() => setOk(false), 1500);
    } catch { /* clipboard blocked */ }
  };
  return [ok, copy];
}

function CopyBtn({ text, small }: { text: string; small?: boolean }) {
  const [ok, copy] = useCopy();
  return (
    <button className={"pk-copy" + (small ? " sm" : "")} onClick={() => copy(text)} aria-label="Copy install command">
      {ok ? "Copied ✓" : "Copy"}
    </button>
  );
}

function PkgCard({
  p, group, pm, selected, toggle,
}: { p: Pkg; group: string; pm: PM; selected: boolean; toggle: () => void }) {
  const install = `${ADD[pm]} @lacspace/${p.n}`;
  return (
    <div className={"pk-card" + (selected ? " sel" : "")}>
      <div className="pk-top">
        <label className="pk-check" title="Add to install">
          <input type="checkbox" checked={selected} onChange={toggle} />
          <span />
        </label>
        <a href={`/packages/${p.n}`} className="pk-name">
          @lacspace/{p.n}
        </a>
        <span className="pk-ver">v{p.v}</span>
      </div>
      <p className="pk-desc">{p.d}</p>
      {p.kw.length > 0 && (
        <div className="pk-kw">
          {p.kw.slice(0, 4).map((k) => <span key={k}>{k}</span>)}
        </div>
      )}
      <div className="pk-install">
        <code>{install}</code>
        <CopyBtn text={install} small />
      </div>
      <div className="pk-foot">
        <span className={"pk-badge" + (p.deps === 0 ? " zero" : "")}>
          {p.deps === 0 ? "0 deps" : `${p.deps} @lacspace dep${p.deps > 1 ? "s" : ""}`}
        </span>
        <span className="pk-kit">{group}</span>
        <a href={`https://www.npmjs.com/package/@lacspace/${p.n}`} target="_blank" rel="noopener" className="pk-link">npm ↗</a>
      </div>
    </div>
  );
}

export function PackagesApp() {
  const [q, setQ] = useState("");
  const [kit, setKit] = useState("All");
  const [pm, setPm] = useState<PM>("npm");
  const [sort, setSort] = useState<Sort>("kit");
  const [sel, setSel] = useState<Set<string>>(new Set());
  const searchRef = useRef<HTMLInputElement>(null);

  const ql = q.trim().toLowerCase();
  const kits = CATALOG.map((g) => g.group);

  const match = (p: Pkg) =>
    !ql || (p.n + " " + p.d + " " + p.kw.join(" ")).toLowerCase().includes(ql);

  const groups = useMemo(() => {
    return CATALOG.map((g) => ({
      ...g,
      items: g.items.filter(match).sort((a, b) =>
        sort === "za" ? b.n.localeCompare(a.n) : a.n.localeCompare(b.n)
      ),
    })).filter((g) => (kit === "All" || g.group === kit) && g.items.length > 0);
  }, [ql, kit, sort]);

  const total = groups.reduce((n, g) => n + g.items.length, 0);
  const grouped = kit === "All" && !ql && sort === "kit";
  const flat = groups.flatMap((g) => g.items.map((p) => ({ p, group: g.group })))
    .sort((a, b) => (sort === "za" ? b.p.n.localeCompare(a.p.n) : a.p.n.localeCompare(b.p.n)));

  const toggle = (n: string) =>
    setSel((s) => { const next = new Set(s); next.has(n) ? next.delete(n) : next.add(n); return next; });

  const bundleList = Array.from(sel).sort();
  const bundleCmd = `${ADD[pm]} ${bundleList.map((n) => "@lacspace/" + n).join(" ")}`;
  const [bundleCopied, copyBundle] = useCopy();

  useEffect(() => {
    try {
      const k = new URLSearchParams(window.location.search).get("kit");
      if (k && CATALOG.some((g) => g.group === k)) setKit(k);
    } catch { /* no-op */ }
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
      <div className="hb-controls" style={{ top: 62 }}>
        <div className="hb-search">
          <span aria-hidden>🔍</span>
          <input
            ref={searchRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`Search ${CATALOG_TOTAL} packages…  (press /)`}
            aria-label="Search packages"
          />
          {q && <button className="hb-clear" onClick={() => setQ("")} aria-label="Clear">✕</button>}
        </div>
        <div className="hb-pm" role="tablist" aria-label="Package manager">
          {PMS.map((p) => (
            <button key={p} role="tab" aria-selected={pm === p} className={pm === p ? "on" : ""} onClick={() => setPm(p)}>{p}</button>
          ))}
        </div>
        <select className="pk-sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="Sort">
          <option value="kit">Group by kit</option>
          <option value="az">Name A→Z</option>
          <option value="za">Name Z→A</option>
        </select>
      </div>

      <div className="hb-chips">
        {["All", ...kits].map((k) => {
          const n = k === "All" ? CATALOG.reduce((a, g) => a + g.items.length, 0) : (CATALOG.find((g) => g.group === k)?.items.length ?? 0);
          return (
            <button key={k} className={"hb-chip" + (kit === k ? " on" : "")} onClick={() => setKit(k)}>
              {k} <span style={{ opacity: 0.55 }}>{n}</span>
            </button>
          );
        })}
        <span className="hb-count">{total} shown</span>
      </div>

      {total === 0 && (
        <div className="hb-empty">
          <p style={{ fontSize: 40 }}>🔍</p>
          <p>No packages match “{q}”.</p>
          <button className="btn btn-ghost" onClick={() => { setQ(""); setKit("All"); }}>Clear filters</button>
        </div>
      )}

      {grouped ? (
        groups.map((g) => (
          <div key={g.group} style={{ marginTop: 34 }}>
            <div className="sec-head" style={{ marginBottom: 14 }}>
              <h2 style={{ fontSize: "1.5rem" }}>
                <span aria-hidden style={{ marginRight: 10 }}>{g.icon}</span>
                {g.group} <span style={{ color: "var(--faint)", fontWeight: 400, fontSize: "1rem" }}>· {g.items.length}</span>
              </h2>
            </div>
            <div className="pk-grid">
              {g.items.map((p) => (
                <PkgCard key={p.n} p={p} group={g.group} pm={pm} selected={sel.has(p.n)} toggle={() => toggle(p.n)} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="pk-grid" style={{ marginTop: 26 }}>
          {flat.map(({ p, group }) => (
            <PkgCard key={p.n} p={p} group={group} pm={pm} selected={sel.has(p.n)} toggle={() => toggle(p.n)} />
          ))}
        </div>
      )}

      {/* Build-your-install bar */}
      {sel.size > 0 && (
        <div className="pk-bundle">
          <div className="pk-bundle-inner">
            <div className="pk-bundle-cmd">
              <span className="pk-bundle-n">{sel.size}</span>
              <code>{bundleCmd}</code>
            </div>
            <div className="pk-bundle-btns">
              <button className="btn btn-primary" onClick={() => copyBundle(bundleCmd)}>
                {bundleCopied ? "Copied ✓" : "Copy install"}
              </button>
              <button className="btn btn-ghost" onClick={() => setSel(new Set())}>Clear</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
