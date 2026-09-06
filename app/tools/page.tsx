import { DevHeader } from "../components/dev-header";
import { DevFooter } from "../components/dev-footer";
import { Reveal } from "../components/reveal";
import { site } from "../lib/seo";
import { TOOLS, TOOLS_LIVE, TOOLS_SOON } from "../lib/tools";

const seo = site.page({
  title: "Developer Tools",
  path: "/tools",
  description:
    "Free, open-source developer tools by Lacspace — lacspace-leads (Google Maps lead finder) and lacspace-scraper (website scraper), with more on the way. CLIs and typed libraries, no API keys, export to JSON, CSV or Excel.",
});
export const metadata = seo.metadata;

const toolsLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Lacspace Developer Tools",
  itemListElement: TOOLS_LIVE.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "SoftwareApplication",
      name: t.name,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Node.js, Web",
      description: t.summary,
      url: `https://developer.lacspace.com/tools/${t.slug}`,
      offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
    },
  })),
};

const CSS = `
.tools-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
@media(max-width:760px){.tools-grid{grid-template-columns:1fr}}
.tool-card{border:1px solid var(--hairline);border-radius:18px;overflow:hidden;background:var(--panel);display:flex;flex-direction:column;text-decoration:none;color:inherit;transition:transform .2s,border-color .2s,background .2s}
.tool-card:hover{transform:translateY(-3px);border-color:var(--accent-mid);background:var(--panel-2)}
.tool-sw{height:72px;display:flex;align-items:center;justify-content:flex-start;padding:0 20px;font-size:26px;background:var(--panel-2);border-bottom:1px solid var(--hairline)}
.tool-bd{padding:18px 20px 20px;display:flex;flex-direction:column;gap:8px;flex:1}
.tool-name{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:15px;font-weight:650;color:var(--fg);display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.tool-badge{font-size:10.5px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;border-radius:999px;padding:2px 8px;border:1px solid var(--hairline-2);color:var(--faint)}
.tool-badge.live{color:#34D399;border-color:rgba(52,211,153,.35)}
.tool-badge.soon{color:#FBBF24;border-color:rgba(251,191,36,.35)}
.tool-tag{color:var(--muted);font-size:14px;line-height:1.5}
.tool-meta{display:flex;align-items:center;gap:10px;margin-top:auto;padding-top:8px;font-size:12.5px;color:var(--faint)}
.tool-cmd{margin-top:6px;background:#0A0E18;border:1px solid var(--hairline);border-radius:10px;padding:9px 12px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;color:#e8e8f0;overflow-x:auto;white-space:nowrap}
.tool-open{color:var(--accent-to);font-weight:600}
`;

export default function ToolsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsLd) }} />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="aurora" />
      <div className="grid-bg" />
      <DevHeader />

      <main className="wrap">
        {/* Hero */}
        <section className="hero">
          <Reveal><span className="pill"><span className="live" /> {TOOLS_LIVE.length} tools live{TOOLS_SOON.length ? ` · ${TOOLS_SOON.length} coming soon` : ""} · all free</span></Reveal>
          <Reveal delay={60}>
            <h1>Developer <span className="grad">Tools</span></h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="sub">
              Standalone, open-source tools that each do one job well — find leads,
              scrape sites, monitor changes, enrich companies and extract from PDFs.
              Every one is a CLI <em>and</em> a typed library, needs no API keys, and
              exports to JSON, CSV or Excel.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div className="cta">
              <a className="btn btn-primary" href="#tools">Explore the tools ↓</a>
              <a className="btn btn-ghost" href="/packages">Browse the packages →</a>
            </div>
          </Reveal>
        </section>

        {/* Live tools */}
        <section id="tools" className="sec">
          <Reveal className="sec-head center">
            <div className="eyebrow">Ready to use</div>
            <h2>Tools you can run <span className="grad">right now</span></h2>
            <p>One <span className="mono">npx</span> away. Full docs, demos and examples on each tool&apos;s page.</p>
          </Reveal>
          <div className="tools-grid">
            {TOOLS_LIVE.map((t, i) => (
              <Reveal key={t.slug} delay={(i % 2) * 60}>
                <a className="tool-card" href={`/tools/${t.slug}`}>
                  <div className="tool-sw" aria-hidden>{t.icon}</div>
                  <div className="tool-bd">
                    <div className="tool-name">{t.name} <span className="tool-badge live">Live</span>{t.version && <span className="tool-badge">v{t.version}</span>}</div>
                    <div className="tool-tag">{t.tagline}</div>
                    {t.install && <div className="tool-cmd">{t.install}</div>}
                    <div className="tool-meta">
                      <span className="tool-open">Open docs &amp; demos →</span>
                      {t.tryHref && <span style={{ marginLeft: "auto", color: "#34D399", fontWeight: 600 }}>Try it live ▸</span>}
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Coming soon */}
        {TOOLS_SOON.length > 0 && (
        <section className="sec">
          <Reveal className="sec-head center">
            <div className="eyebrow">On the roadmap</div>
            <h2>Coming <span className="grad">soon</span></h2>
            <p>The toolkit is growing. These are next — same principles: free, keyless, typed, any-format.</p>
          </Reveal>
          <div className="tools-grid">
            {TOOLS_SOON.map((t, i) => (
              <Reveal key={t.slug} delay={(i % 2) * 60}>
                <a className="tool-card" href={`/tools/${t.slug}`} style={{ opacity: 0.92 }}>
                  <div className="tool-sw" aria-hidden>{t.icon}</div>
                  <div className="tool-bd">
                    <div className="tool-name">{t.name} <span className="tool-badge soon">Soon</span></div>
                    <div className="tool-tag">{t.tagline}</div>
                    <div className="tool-meta"><span className="tool-open">Preview →</span></div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>
        )}

        {/* Why */}
        <section className="sec">
          <Reveal className="sec-head center">
            <div className="eyebrow">Same principles, every tool</div>
            <h2>Free, keyless, <span className="grad">and yours</span></h2>
          </Reveal>
          <div className="grid">
            {[
              { icon: "💸", t: "No API keys, no bills", d: "Every tool uses open sources and the open web — nothing to sign up for, nothing metered." },
              { icon: "⌨️", t: "CLI and library", d: "Run it from your terminal, or import the same engine as a fully-typed ESM + CJS package." },
              { icon: "🔄", t: "Any format out", d: "JSON, NDJSON, CSV or Excel — with a built-in converter between all four, both ways." },
              { icon: "🛡️", t: "Polite & permissive", d: "Robots-aware where it matters, and free under the Lacspace Free Licence for commercial use." },
            ].map((w, i) => (
              <Reveal key={w.t} delay={(i % 2) * 50} className="kit">
                <div className="kit-head"><span className="ic" aria-hidden>{w.icon}</span><h3 style={{ fontSize: 16 }}>{w.t}</h3></div>
                <p style={{ marginBottom: 0 }}>{w.d}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <Reveal className="cta-band">
          <div className="eyebrow">Have a tool in mind?</div>
          <h2>More tools are <span className="grad">on the way</span></h2>
          <p>Start with the ones that are live — and tell us what you&apos;d automate next.</p>
          <div className="cta" style={{ justifyContent: "center", marginTop: 18 }}>
            {TOOLS_LIVE.map((t) => (
              <a key={t.slug} className="btn btn-ghost" href={`/tools/${t.slug}`}>{t.name} →</a>
            ))}
          </div>
        </Reveal>
      </main>

      <DevFooter />
    </>
  );
}
