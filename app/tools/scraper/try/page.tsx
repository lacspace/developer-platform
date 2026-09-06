import { DevHeader } from "../../../components/dev-header";
import { DevFooter } from "../../../components/dev-footer";
import { Reveal } from "../../../components/reveal";
import { site } from "../../../lib/seo";
import { ScraperTry } from "./scraper-try";

const seo = site.page({
  title: "Try lacspace-scraper live",
  path: "/tools/scraper/try",
  description:
    "Test lacspace-scraper in your browser — paste a URL, pick auto-detect or CSS-selector fields, and see the exact JSON you'd get locally. Runs the real scraper engine server-side, robots-aware.",
  keywords: ["scraper", "web-scraping", "css-selector", "live", "tester", "playground"],
});
export const metadata = seo.metadata;

const CSS = `
.st{max-width:900px;margin:0 auto}
.st-presets{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:14px}
.st-lbl{font-size:13px;color:var(--faint)}
.st-chip{border:1px solid var(--hairline-2);background:var(--panel);color:var(--muted);border-radius:999px;padding:6px 13px;font-size:12.5px;font-family:inherit;cursor:pointer;transition:.15s}
.st-chip:hover{color:var(--fg);border-color:var(--accent-mid)}
.st-row{display:flex;gap:10px}
@media(max-width:560px){.st-row{flex-direction:column}}
.st-url{flex:1;min-width:0;background:var(--panel-2);border:1px solid var(--hairline-2);border-radius:11px;padding:12px 14px;color:var(--fg);font-family:ui-monospace,Menlo,monospace;font-size:14px;outline:none}
.st-url:focus{border-color:var(--accent-mid);box-shadow:0 0 0 3px var(--accent-soft)}
.st-run{flex:none;white-space:nowrap}
.st-run:disabled{opacity:.6;cursor:default}
.st-modes{display:inline-flex;border:1px solid var(--hairline-2);border-radius:10px;overflow:hidden;margin:16px 0 12px}
.st-mode{background:none;border:0;border-right:1px solid var(--hairline);color:var(--muted);padding:8px 16px;font-size:13.5px;font-family:inherit;cursor:pointer;transition:.15s}
.st-mode:last-child{border-right:0}
.st-mode.on{background:var(--grad);color:#fff}
.st-mode:not(.on):hover{color:var(--fg);background:var(--panel-hover)}
.st-auto{display:flex;flex-wrap:wrap;gap:8px}
.st-tag{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--hairline);background:var(--panel);border-radius:8px;padding:6px 11px;font-size:12.5px;color:var(--muted);cursor:pointer;transition:.15s;user-select:none}
.st-tag.on{color:var(--fg);border-color:var(--accent-mid);background:var(--accent-soft)}
.st-tag input{accent-color:var(--accent-to)}
.st-custom{display:flex;flex-direction:column;gap:8px}
.st-field-lbl{font-size:13px;color:var(--muted)}
.st-dim{color:var(--faint)}
.st-input{background:var(--panel-2);border:1px solid var(--hairline-2);border-radius:9px;padding:9px 11px;color:var(--fg);font-family:ui-monospace,Menlo,monospace;font-size:13px;outline:none;width:100%}
.st-input:focus{border-color:var(--accent-mid)}
.st-fields{display:flex;flex-direction:column;gap:7px;margin-top:6px}
.st-fhead,.st-frow{display:grid;grid-template-columns:1fr 1.6fr .9fr 42px 34px;gap:8px;align-items:center}
.st-fhead{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--faint);padding:0 2px}
.st-check{display:flex;justify-content:center}
.st-check input,.st-frow input[type=checkbox]{accent-color:var(--accent-to)}
.st-del{background:none;border:0;color:var(--faint);cursor:pointer;font-size:14px}
.st-del:hover{color:#fb7185}
.st-add{align-self:flex-start;background:var(--panel-2);border:1px solid var(--hairline-2);border-radius:9px;color:var(--muted);padding:7px 14px;font-size:13px;font-family:inherit;cursor:pointer;margin-top:2px}
.st-add:hover{color:var(--fg);border-color:var(--accent-mid)}
@media(max-width:560px){.st-fhead{display:none}.st-frow{grid-template-columns:1fr 1fr;grid-auto-rows:auto}.st-attr{grid-column:1/2}.st-check{justify-content:flex-start}}
.st-cli{display:flex;align-items:center;gap:10px;background:#0A0E18;border:1px solid var(--hairline);border-radius:11px;padding:11px 13px;margin-top:16px;overflow:hidden}
.st-cli code{flex:1;font-family:ui-monospace,Menlo,monospace;font-size:12.5px;color:#e8e8f0;overflow-x:auto;white-space:nowrap}
.st-err{margin-top:14px;border:1px solid rgba(251,113,133,.4);background:rgba(251,113,133,.08);color:#fda4af;border-radius:11px;padding:12px 14px;font-size:14px}
.st-out{margin-top:16px;border:1px solid var(--hairline-2);border-radius:13px;overflow:hidden;background:#0A0E18}
.st-out-bar{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid var(--hairline);background:var(--panel-2)}
.st-ok{color:#34D399;font-size:13px;font-weight:600}
.st-json{margin:0;padding:16px;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:12.5px;line-height:1.6;color:#a7f3d0;overflow:auto;max-height:520px;white-space:pre-wrap;word-break:break-word}
.st-note{margin-top:16px;font-size:12.5px;color:var(--faint);line-height:1.6;text-align:center;max-width:680px;margin-left:auto;margin-right:auto}
`;

export default function ScraperTryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }} />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="aurora" />
      <div className="grid-bg" />
      <DevHeader />

      <main className="wrap">
        <section className="hero" style={{ paddingBottom: 8 }}>
          <Reveal><a href="/tools/scraper" className="pd-back">← lacspace-scraper</a></Reveal>
          <Reveal delay={40}><span className="pill" style={{ marginTop: 14 }}><span className="live" /> Live · runs the real engine</span></Reveal>
          <Reveal delay={80}><h1>Try the <span className="grad">scraper</span> live</h1></Reveal>
          <Reveal delay={120}>
            <p className="sub">
              Paste a URL, pick auto-detect or your own CSS-selector fields, and hit run.
              It calls the real <span className="mono">lacspace-scraper</span> engine — the exact
              output you&apos;d get on your machine.
            </p>
          </Reveal>
        </section>

        <section className="sec" style={{ paddingTop: 24 }}>
          <Reveal><ScraperTry /></Reveal>
        </section>

        <section className="sec">
          <Reveal className="sec-head center">
            <div className="eyebrow">Then take it local</div>
            <h2>Run it your way</h2>
            <p>The tester uses the fast HTTP engine. Locally you also get browser rendering, crawling, more formats and no limits.</p>
          </Reveal>
          <Reveal className="cta" style={{ justifyContent: "center" }}>
            <a className="btn btn-primary" href="https://www.npmjs.com/package/lacspace-scraper" target="_blank" rel="noopener">Install from npm ↗</a>
            <a className="btn btn-ghost" href="/tools/scraper">Read the full docs</a>
          </Reveal>
        </section>
      </main>

      <DevFooter />
    </>
  );
}
