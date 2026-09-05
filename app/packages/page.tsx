import { DevHeader } from "../components/dev-header";
import { DevFooter } from "../components/dev-footer";
import { Reveal } from "../components/reveal";
import { CATALOG, CATALOG_TOTAL } from "../lib/catalog";
import { site } from "../lib/seo";

const seo = site.page({
  title: "Packages",
  path: "/packages",
  description:
    "All 63 @lacspace packages — zero-dependency, isomorphic TypeScript, grouped by kit, with versions and one-line descriptions. Security, SEO, React, backend, mail, data and more.",
});
export const metadata = seo.metadata;

const CLIS = [
  {
    n: "create-lacspace-app",
    d: "Scaffold a finished Next.js app from one of 8 templates in ~0.15s.",
  },
  {
    n: "create-lacspace-seo",
    d: "Drop a complete SEO setup into an existing Next.js App Router app.",
  },
];

export default function Packages() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }}
      />
      <div className="aurora" />
      <div className="grid-bg" />
      <DevHeader />
      <main className="wrap">
        <section className="sec" style={{ paddingTop: 56 }}>
          <div className="sec-head center">
            <div className="eyebrow">The catalog</div>
            <h2>
              {CATALOG_TOTAL} packages,{" "}
              <span className="grad">zero dependencies</span>
            </h2>
            <p>
              Every one is isomorphic TypeScript, dual ESM + CJS, and free under
              the Lacspace Free Licence. Click any package for its full README on
              npm.
            </p>
          </div>

          {/* Nav chips */}
          <div className="chips" style={{ justifyContent: "center", marginBottom: 28 }}>
            {CATALOG.map((g) => (
              <a key={g.group} href={`#${g.group.replace(/[^a-z]/gi, "").toLowerCase()}`}>
                <span>
                  {g.group} · {g.items.length}
                </span>
              </a>
            ))}
            <a href="#clis">
              <span>CLIs · {CLIS.length}</span>
            </a>
          </div>

          {CATALOG.map((g, gi) => (
            <div
              key={g.group}
              id={g.group.replace(/[^a-z]/gi, "").toLowerCase()}
              style={{ scrollMarginTop: 84, marginTop: gi === 0 ? 0 : 40 }}
            >
              <Reveal className="sec-head" style={{ marginBottom: 16 }}>
                <h2 style={{ fontSize: "1.5rem" }}>
                  {g.group}{" "}
                  <span style={{ color: "var(--faint)", fontWeight: 400, fontSize: "1rem" }}>
                    · {g.items.length}
                  </span>
                </h2>
              </Reveal>
              <div className="grid">
                {g.items.map((p, i) => (
                  <Reveal key={p.n} delay={(i % 3) * 40} className="kit" style={{ padding: 18 }}>
                    <a
                      href={`https://www.npmjs.com/package/@lacspace/${p.n}`}
                      target="_blank"
                      rel="noopener"
                      style={{ display: "block" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          justifyContent: "space-between",
                          gap: 10,
                        }}
                      >
                        <span className="pk" style={{ fontSize: 14 }}>
                          @lacspace/{p.n}
                        </span>
                        <span
                          className="mono"
                          style={{ fontSize: 11, color: "var(--faint)" }}
                        >
                          v{p.v}
                        </span>
                      </div>
                      <p
                        style={{
                          color: "var(--muted)",
                          fontSize: 13,
                          margin: "8px 0 0",
                        }}
                      >
                        {p.d}
                      </p>
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}

          {/* CLIs */}
          <div id="clis" style={{ scrollMarginTop: 84, marginTop: 40 }}>
            <Reveal className="sec-head" style={{ marginBottom: 16 }}>
              <h2 style={{ fontSize: "1.5rem" }}>
                CLIs{" "}
                <span style={{ color: "var(--faint)", fontWeight: 400, fontSize: "1rem" }}>
                  · {CLIS.length}
                </span>
              </h2>
            </Reveal>
            <div className="grid">
              {CLIS.map((p, i) => (
                <Reveal key={p.n} delay={i * 40} className="kit" style={{ padding: 18 }}>
                  <a
                    href={`https://www.npmjs.com/package/${p.n}`}
                    target="_blank"
                    rel="noopener"
                    style={{ display: "block" }}
                  >
                    <span className="pk" style={{ fontSize: 14 }}>
                      {p.n}
                    </span>
                    <p style={{ color: "var(--muted)", fontSize: 13, margin: "8px 0 0" }}>
                      {p.d}
                    </p>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="cta-band" style={{ marginTop: 72 }}>
            <div className="eyebrow">Prefer a guided tour?</div>
            <h2>
              Read the <span className="grad">handbook</span>
            </h2>
            <p>
              Install, use, integrate and upgrade — with real code for the
              packages you&apos;ll reach for most.
            </p>
            <div className="cta" style={{ justifyContent: "center" }}>
              <a className="btn btn-primary" href="/handbook">
                Open the handbook →
              </a>
              <a
                className="btn btn-ghost"
                href="https://lacspace.com/docs"
                target="_blank"
                rel="noopener"
              >
                Per-package docs ↗
              </a>
            </div>
          </Reveal>
        </section>
      </main>
      <DevFooter />
    </>
  );
}
