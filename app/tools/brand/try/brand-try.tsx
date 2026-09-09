"use client";

import { useMemo, useState } from "react";
import {
  mark,
  craftMark,
  pulseMark,
  floatMark,
  revealMark,
  shimmerMark,
  installable,
  brandCss,
  COLORS,
  type MarkVariant,
  type MarkStyle,
} from "@lacspace/brand";

type Tab = "mark" | "motion" | "install" | "colors";
type Bg = "transparent" | "ink" | "off-white";

const VARIANTS: MarkVariant[] = ["fullcolor", "white", "black", "mono", "violet", "orange", "blue", "cyan"];
const STYLES: MarkStyle[] = ["filled", "line", "glyph"];
const ANIMS = [
  { k: "craft", label: "✨ Self-craft" },
  { k: "pulse", label: "Pulse" },
  { k: "float", label: "Float" },
  { k: "reveal", label: "Reveal" },
  { k: "shimmer", label: "Shimmer" },
] as const;

function download(name: string, data: string, type = "image/svg+xml") {
  const blob = new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function Copy({ text, label = "Copy" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      className="bc-btn bc-btn-ghost"
      onClick={() => {
        navigator.clipboard?.writeText(text).then(() => {
          setDone(true);
          setTimeout(() => setDone(false), 1200);
        });
      }}
    >
      {done ? "✓ Copied" : label}
    </button>
  );
}

function Frame({ svg, bg }: { svg: string; bg: Bg }) {
  const ground = bg === "ink" ? "#0A101C" : bg === "off-white" ? "#FAFAFA" : "transparent";
  return (
    <div
      className={`bc-stage ${bg === "transparent" ? "bc-checker" : ""}`}
      style={{ background: bg === "transparent" ? undefined : ground }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export function BrandTry() {
  const [tab, setTab] = useState<Tab>("motion");

  // Mark tab
  const [variant, setVariant] = useState<MarkVariant>("fullcolor");
  const [style, setStyle] = useState<MarkStyle>("filled");
  const [network, setNetwork] = useState(true);
  const [markBg, setMarkBg] = useState<Bg>("ink");
  const [rounded, setRounded] = useState(false);

  const markSvg = useMemo(
    () => mark({ size: 320, variant, style, network, background: markBg, rounded }),
    [variant, style, network, markBg, rounded],
  );

  // Motion tab
  const [anim, setAnim] = useState<(typeof ANIMS)[number]["k"]>("craft");
  const [loop, setLoop] = useState(false);
  const [motionBg, setMotionBg] = useState<Bg>("ink");
  const [replay, setReplay] = useState(0);
  const motionSvg = useMemo(() => {
    const opts = { size: 320, loop, background: motionBg, uid: `${anim}${replay}` };
    return anim === "craft" ? craftMark(opts)
      : anim === "pulse" ? pulseMark(opts)
      : anim === "float" ? floatMark(opts)
      : anim === "reveal" ? revealMark(opts)
      : shimmerMark(opts);
  }, [anim, loop, motionBg, replay]);

  // Install tab
  const [base, setBase] = useState("/brand/");
  const [appName, setAppName] = useState("My App");
  const kit = useMemo(() => installable({ base, name: appName }), [base, appName]);

  return (
    <div className="bc">
      <div className="bc-tabs">
        {(["motion", "mark", "install", "colors"] as Tab[]).map((t) => (
          <button key={t} className={`bc-tab ${tab === t ? "on" : ""}`} onClick={() => setTab(t)}>
            {t === "motion" ? "✨ Animations" : t === "mark" ? "Mark" : t === "install" ? "Installable" : "Colors"}
          </button>
        ))}
      </div>

      {tab === "motion" && (
        <div className="bc-grid">
          <div className="bc-preview">
            <Frame svg={motionSvg} bg={motionBg} />
            <div className="bc-actions">
              <button className="bc-btn bc-btn-primary" onClick={() => setReplay((r) => r + 1)}>↻ Replay</button>
              <button className="bc-btn bc-btn-ghost" onClick={() => download(`lacspace-${anim}.svg`, motionSvg)}>⬇ SVG</button>
              <Copy text={motionSvg} label="Copy SVG" />
            </div>
          </div>
          <div className="bc-panel">
            <label className="pt-lbl">Animation</label>
            <div className="bc-chips">
              {ANIMS.map((a) => (
                <button key={a.k} className={`bc-chip ${anim === a.k ? "on" : ""}`} onClick={() => { setAnim(a.k); setReplay((r) => r + 1); }}>{a.label}</button>
              ))}
            </div>
            <label className="pt-lbl" style={{ marginTop: 16 }}>Background</label>
            <div className="bc-chips">
              {(["ink", "off-white", "transparent"] as Bg[]).map((b) => (
                <button key={b} className={`bc-chip ${motionBg === b ? "on" : ""}`} onClick={() => setMotionBg(b)}>{b}</button>
              ))}
            </div>
            <label className="bc-check">
              <input type="checkbox" checked={loop} onChange={(e) => setLoop(e.target.checked)} /> Loop
            </label>
            <p className="bc-hint">
              Self-contained animated SVG — pure CSS, zero JS, honours <code>prefers-reduced-motion</code>. Drop it
              into any page, README or email.
            </p>
            <div className="bc-code">
              <code>{`craftMark({ size: 320${loop ? ", loop: true" : ""} })`}</code>
            </div>
          </div>
        </div>
      )}

      {tab === "mark" && (
        <div className="bc-grid">
          <div className="bc-preview">
            <Frame svg={markSvg} bg={markBg} />
            <div className="bc-actions">
              <button className="bc-btn bc-btn-primary" onClick={() => download(`lacspace-mark-${variant}.svg`, markSvg)}>⬇ SVG</button>
              <Copy text={markSvg} label="Copy SVG" />
            </div>
          </div>
          <div className="bc-panel">
            <label className="pt-lbl">Variant</label>
            <div className="bc-chips">
              {VARIANTS.map((v) => (
                <button key={v} className={`bc-chip ${variant === v ? "on" : ""}`} onClick={() => setVariant(v)}>{v}</button>
              ))}
            </div>
            <label className="pt-lbl" style={{ marginTop: 16 }}>Style</label>
            <div className="bc-chips">
              {STYLES.map((s) => (
                <button key={s} className={`bc-chip ${style === s ? "on" : ""}`} onClick={() => setStyle(s)}>{s}</button>
              ))}
            </div>
            <label className="pt-lbl" style={{ marginTop: 16 }}>Background</label>
            <div className="bc-chips">
              {(["ink", "off-white", "transparent"] as Bg[]).map((b) => (
                <button key={b} className={`bc-chip ${markBg === b ? "on" : ""}`} onClick={() => setMarkBg(b)}>{b}</button>
              ))}
            </div>
            <label className="bc-check"><input type="checkbox" checked={network} onChange={(e) => setNetwork(e.target.checked)} /> Show neural network</label>
            <label className="bc-check"><input type="checkbox" checked={rounded} onChange={(e) => setRounded(e.target.checked)} /> App-icon tile (rounded)</label>
            <div className="bc-code"><code>{`mark({ variant: "${variant}", style: "${style}"${network ? "" : ", network: false"} })`}</code></div>
          </div>
        </div>
      )}

      {tab === "install" && (
        <div className="bc-grid">
          <div className="bc-preview">
            <Frame svg={kit.svg} bg="ink" />
            <div className="bc-actions">
              <button className="bc-btn bc-btn-primary" onClick={() => download("favicon.svg", kit.svg)}>⬇ favicon.svg</button>
              <Copy text={kit.dataUri} label="Copy data URI" />
            </div>
          </div>
          <div className="bc-panel">
            <label className="pt-lbl">Base path</label>
            <input className="pt-input" value={base} onChange={(e) => setBase(e.target.value)} />
            <label className="pt-lbl" style={{ marginTop: 12 }}>App name</label>
            <input className="pt-input" value={appName} onChange={(e) => setAppName(e.target.value)} />
            <div className="bc-block">
              <div className="bc-block-bar"><span>&lt;head&gt; links</span><Copy text={kit.headLinks} /></div>
              <pre className="bc-pre">{kit.headLinks}</pre>
            </div>
            <div className="bc-block">
              <div className="bc-block-bar"><span>site.webmanifest</span><Copy text={JSON.stringify(kit.manifest, null, 2)} /></div>
              <pre className="bc-pre">{JSON.stringify(kit.manifest, null, 2)}</pre>
            </div>
          </div>
        </div>
      )}

      {tab === "colors" && (
        <div>
          <div className="bc-swatches">
            {COLORS.map((c) => (
              <button key={c.token} className="bc-swatch" onClick={() => navigator.clipboard?.writeText(c.hex)} title="Copy hex">
                <span className="bc-swatch-chip" style={{ background: c.hex }} />
                <span className="bc-swatch-name">{c.name}</span>
                <span className="bc-swatch-hex">{c.hex}</span>
                <span className="bc-swatch-role">{c.role}</span>
              </button>
            ))}
          </div>
          <div className="bc-block" style={{ marginTop: 18 }}>
            <div className="bc-block-bar"><span>brandCss()</span><Copy text={brandCss()} /></div>
            <pre className="bc-pre">{brandCss()}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
