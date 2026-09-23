"use client";

import { useEffect, useMemo, useState } from "react";
import { DARK_MODES, FONT_KEYS, PACKS, PARTS, type DarkMode, type FontKey, type Pack, type Part } from "../lib/css-cdn";
import "./builder.css";

const PRESETS = ["#4d9fff", "#7c3aed", "#ec4899", "#f97316", "#00b894", "#0ea5e9", "#f59e0b", "#ef4444"];

const PART_LABEL: Record<Part, string> = {
  base: "Tokens, buttons, inputs, cards",
  overlay: "Modals, drawers, popovers, toasts",
  navigation: "Tabs, accordions, menus, pagination",
  display: "Avatars, stats, timelines, tags, trees",
  form: "Sliders, comboboxes, pickers, uploads",
  layout: "Stacks, grids, containers, type",
};

const DARK_LABEL: Record<DarkMode, string> = {
  media: "Follow the OS",
  class: "A .dark class",
  attr: 'data-theme="dark"',
  off: "Light only",
};

const fmtKb = (bytes: number): string => `${(bytes / 1024).toFixed(1)} KB`;

export function CssBuilder() {
  const [accent, setAccent] = useState("#4d9fff");
  const [radius, setRadius] = useState(10);
  const [control, setControl] = useState(38);
  const [font, setFont] = useState<FontKey | "">("");
  const [webfont, setWebfont] = useState(false);
  const [dark, setDark] = useState<DarkMode>("media");
  const [parts, setParts] = useState<Part[]>([...PARTS]);
  const [packs, setPacks] = useState<Pack[]>(["components"]);
  const [copied, setCopied] = useState(false);
  const [size, setSize] = useState<number | null>(null);

  const query = useMemo(() => {
    const q = new URLSearchParams();
    if (packs.length !== 1 || packs[0] !== "components") q.set("packs", packs.join(","));
    if (parts.length !== PARTS.length) q.set("only", parts.filter((p) => p !== "base").join(","));
    if (dark !== "media") q.set("dark", dark);
    if (accent !== "#4d9fff") q.set("accent", accent);
    if (radius !== 10) q.set("radius", String(radius));
    if (control !== 38) q.set("control", String(control));
    if (font) q.set("font", font);
    if (font && webfont) q.set("webfont", "1");
    return q.toString();
  }, [accent, radius, control, font, webfont, dark, parts, packs]);

  const path = `/css/v1${query ? `?${query}` : ""}`;
  const href = `https://developer.lacspace.com${path}`;

  // Measure the real response rather than guessing — the number is the whole
  // argument for subsetting, so it has to be the number people will actually get.
  useEffect(() => {
    let cancelled = false;
    const id = setTimeout(() => {
      fetch(path)
        .then((r) => r.text())
        .then((text) => {
          if (!cancelled) setSize(new TextEncoder().encode(text).byteLength);
        })
        .catch(() => {
          if (!cancelled) setSize(null);
        });
    }, 220);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [path]);

  const toggle = <T,>(items: T[], item: T, set: (next: T[]) => void, locked?: T): void => {
    if (item === locked) return;
    set(items.includes(item) ? items.filter((i) => i !== item) : [...items, item]);
  };

  const copy = (): void => {
    try {
      void navigator.clipboard.writeText(`<link rel="stylesheet" href="${href}">`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked — the URL is selectable anyway */
    }
  };

  return (
    <div className="cdnb">
      <div className="cdnb-panel">
        <div className="cdnb-group">
          <div className="cdnb-h">Accent</div>
          <div className="cdnb-swatches">
            {PRESETS.map((hex) => (
              <button
                key={hex}
                type="button"
                className="cdnb-swatch"
                style={{ background: hex }}
                data-on={accent === hex}
                aria-label={`Accent ${hex}`}
                onClick={() => setAccent(hex)}
              />
            ))}
            <input
              type="color"
              className="cdnb-swatch"
              value={accent}
              aria-label="Custom accent colour"
              onChange={(e) => setAccent(e.target.value)}
            />
          </div>
        </div>

        <div className="cdnb-group">
          <div className="cdnb-h">Shape &amp; size</div>
          <div className="cdnb-rows">
            <label className="cdnb-row">
              Corner radius
              <input type="range" min={0} max={24} value={radius} onChange={(e) => setRadius(Number(e.target.value))} />
              <span className="cdnb-num">{radius}px</span>
            </label>
            <label className="cdnb-row">
              Control height
              <input type="range" min={28} max={56} value={control} onChange={(e) => setControl(Number(e.target.value))} />
              <span className="cdnb-num">{control}px</span>
            </label>
          </div>
        </div>

        <div className="cdnb-group">
          <div className="cdnb-h">Typeface</div>
          <div className="cdnb-seg">
            <button type="button" data-on={font === ""} onClick={() => setFont("")}>
              keep
            </button>
            {FONT_KEYS.map((key) => (
              <button key={key} type="button" data-on={font === key} onClick={() => setFont(key)}>
                {key}
              </button>
            ))}
          </div>
          {font && (
            <label className="cdnb-check" style={{ marginTop: 9 }}>
              <input type="checkbox" checked={webfont} onChange={(e) => setWebfont(e.target.checked)} />
              Load it from Google Fonts too
            </label>
          )}
        </div>

        <div className="cdnb-group">
          <div className="cdnb-h">Dark mode</div>
          <div className="cdnb-seg">
            {DARK_MODES.map((mode) => (
              <button key={mode} type="button" data-on={dark === mode} onClick={() => setDark(mode)}>
                {DARK_LABEL[mode]}
              </button>
            ))}
          </div>
        </div>

        <div className="cdnb-group">
          <div className="cdnb-h">What to include</div>
          <div className="cdnb-checks">
            {PARTS.map((part) => (
              <label key={part} className="cdnb-check" data-locked={part === "base"}>
                <input
                  type="checkbox"
                  checked={parts.includes(part)}
                  disabled={part === "base"}
                  onChange={() => toggle(parts, part, setParts, "base")}
                />
                <span>
                  {part}
                  <span style={{ color: "var(--faint)", fontSize: 12 }}> — {PART_LABEL[part]}</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="cdnb-group">
          <div className="cdnb-h">Extra packages</div>
          <div className="cdnb-checks">
            {PACKS.filter((p) => p !== "components").map((pack) => (
              <label key={pack} className="cdnb-check">
                <input
                  type="checkbox"
                  checked={packs.includes(pack)}
                  onChange={() => toggle(packs, pack, setPacks, "components")}
                />
                @lacspace/{pack}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="cdnb-out">
        <div className="cdnb-url">
          <button type="button" className="cdnb-copy" onClick={copy}>
            {copied ? "Copied" : "Copy"}
          </button>
          <code>
            <span className="tag">&lt;link rel=&quot;stylesheet&quot; href=&quot;</span>
            {href}
            <span className="tag">&quot;&gt;</span>
          </code>
        </div>

        <div className="cdnb-meta">
          <span>
            Served: <b>{size === null ? "…" : fmtKb(size)}</b>
          </span>
          <span>
            Families: <b>{parts.length}</b> of {PARTS.length}
          </span>
          <span>
            Packages: <b>{packs.length}</b>
          </span>
          <span>Cached at the edge · immutable per query</span>
        </div>

        <div className="cdnb-frame">
          <div className="cdnb-frame-bar">
            <span className="cdnb-dot" />
            <span className="cdnb-dot" />
            <span className="cdnb-dot" />
            <span style={{ marginLeft: 6 }}>a plain HTML page — no React, no npm, no build step</span>
          </div>
          {/* Deliberately an iframe with a real <link>: the demo is the claim. */}
          <iframe src={`/css/preview${query ? `?${query}` : ""}`} title="Live preview" loading="lazy" />
        </div>
      </div>
    </div>
  );
}
