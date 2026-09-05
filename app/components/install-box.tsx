"use client";

import { useState } from "react";

type PM = "npm" | "pnpm" | "yarn" | "bun";
const PMS: PM[] = ["npm", "pnpm", "yarn", "bun"];
const ADD: Record<PM, string> = { npm: "npm i", pnpm: "pnpm add", yarn: "yarn add", bun: "bun add" };

export function InstallBox({ pkg }: { pkg: string }) {
  const [pm, setPm] = useState<PM>("npm");
  const [ok, setOk] = useState(false);
  const cmd = `${ADD[pm]} @lacspace/${pkg}`;
  return (
    <div className="ib">
      <div className="ib-tabs">
        {PMS.map((p) => (
          <button key={p} className={pm === p ? "on" : ""} onClick={() => setPm(p)}>{p}</button>
        ))}
      </div>
      <div className="ib-cmd">
        <code>{cmd}</code>
        <button className="pk-copy" onClick={() => { try { navigator.clipboard.writeText(cmd); setOk(true); setTimeout(() => setOk(false), 1400); } catch {} }}>
          {ok ? "Copied ✓" : "Copy"}
        </button>
      </div>
    </div>
  );
}
