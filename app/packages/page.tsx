import { DevHeader } from "../components/dev-header";
import { DevFooter } from "../components/dev-footer";
import { Reveal } from "../components/reveal";
import { CATALOG_TOTAL } from "../lib/catalog";
import { PackagesApp } from "./packages-app";
import { site } from "../lib/seo";

const seo = site.page({
  title: "Packages",
  path: "/packages",
  description:
    "All 80 @lacspace packages — zero-dependency, isomorphic TypeScript. Search, filter by kit, switch package manager, and build a combined install command. Security, SEO, React, backend, mail, data and more.",
});
export const metadata = seo.metadata;

const CLIS = [
  { n: "create-lacspace-app", d: "Scaffold a finished Next.js app from one of 8 templates in ~0.12s — now with --theme." },
  { n: "create-lacspace-seo", d: "Drop a complete SEO setup into an existing Next.js App Router app." },
];

export default function Packages() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }} />
      <div className="aurora" />
      <div className="grid-bg" />
      <DevHeader />
      <main className="wrap">
        <section className="sec" style={{ paddingTop: 48 }}>
          <div className="sec-head center">
            <div className="eyebrow">The catalog</div>
            <h2>{CATALOG_TOTAL} packages, <span className="grad">zero dependencies</span></h2>
            <p>
              Every one is isomorphic TypeScript, dual ESM + CJS, and free under the
              Lacspace Free Licence. Search, filter, switch package manager, and tick
              the ones you need to build a single install command.
            </p>
          </div>

          <PackagesApp />

          {/* CLIs */}
          <div style={{ marginTop: 48 }}>
            <div className="sec-head" style={{ marginBottom: 14 }}>
              <h2 style={{ fontSize: "1.5rem" }}>
                <span aria-hidden style={{ marginRight: 10 }}>🛠️</span>
                CLIs <span style={{ color: "var(--faint)", fontWeight: 400, fontSize: "1rem" }}>· {CLIS.length}</span>
              </h2>
            </div>
            <div className="pk-grid">
              {CLIS.map((p, i) => (
                <Reveal key={p.n} delay={i * 40} className="pk-card">
                  <div className="pk-top">
                    <a href={`https://www.npmjs.com/package/${p.n}`} target="_blank" rel="noopener" className="pk-name">{p.n}</a>
                  </div>
                  <p className="pk-desc">{p.d}</p>
                  <div className="pk-install"><code>npm create lacspace-app@latest</code></div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="cta-band" style={{ marginTop: 64 }}>
            <div className="eyebrow">Prefer a guided tour?</div>
            <h2>Read the <span className="grad">handbook</span></h2>
            <p>Install, use, integrate and upgrade — with real code for the packages you&apos;ll reach for most.</p>
            <div className="cta" style={{ justifyContent: "center" }}>
              <a className="btn btn-primary" href="/handbook">Open the handbook →</a>
              <a className="btn btn-ghost" href="/playground">Try packages live</a>
            </div>
          </Reveal>
        </section>
      </main>
      <DevFooter />
    </>
  );
}
