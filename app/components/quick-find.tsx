"use client";

import { useMemo, useState } from "react";
import { CATALOG } from "../lib/catalog";

const ALL = CATALOG.flatMap((g) => g.items.map((p) => ({ ...p, group: g.group })));

export function QuickFind() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const ql = q.trim().toLowerCase();

  const results = useMemo(() => {
    if (!ql) return [];
    return ALL.filter((p) => (p.n + " " + p.d + " " + p.kw.join(" ")).toLowerCase().includes(ql)).slice(0, 7);
  }, [ql]);

  return (
    <div className="qf">
      <div className="qf-box">
        <span aria-hidden>🔍</span>
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Find a package — jwt, money, seo…"
          aria-label="Find a package"
        />
        <a className="qf-all" href={`/packages${ql ? "" : ""}`}>Browse all 76 →</a>
      </div>
      {open && ql && (
        <div className="qf-drop">
          {results.length === 0 ? (
            <div className="qf-empty">No package matches “{q}”.</div>
          ) : (
            results.map((p) => (
              <a key={p.n} href={`https://www.npmjs.com/package/@lacspace/${p.n}`} target="_blank" rel="noopener" className="qf-row">
                <span className="qf-name">@lacspace/{p.n}</span>
                <span className="qf-desc">{p.d}</span>
                <span className="qf-grp">{p.group}</span>
              </a>
            ))
          )}
        </div>
      )}
    </div>
  );
}
