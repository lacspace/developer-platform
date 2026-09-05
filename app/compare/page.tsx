import { DevHeader } from "../components/dev-header";
import { DevFooter } from "../components/dev-footer";
import { Reveal } from "../components/reveal";
import { CompareApp } from "./compare-app";
import { site } from "../lib/seo";

const seo = site.page({
  title: "Compare Packages",
  path: "/compare",
  description:
    "How @lacspace packages compare to the usual dependencies — zod, dinero, jsonwebtoken, nodemailer, zustand, swr, exceljs and more. Search, switch package manager, and copy the install. Zero runtime dependencies, isomorphic, dual ESM + CJS.",
});
export const metadata = seo.metadata;

export default function Compare() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }} />
      <div className="aurora" />
      <div className="grid-bg" />
      <DevHeader />
      <main className="wrap">
        <section className="sec" style={{ paddingTop: 48 }}>
          <div className="sec-head center">
            <div className="eyebrow">Compare</div>
            <h2>Fewer, smaller, <span className="grad">auditable</span> dependencies</h2>
            <p>
              Every <span className="mono">@lacspace</span> package ships{" "}
              <strong style={{ color: "var(--fg)" }}>zero runtime dependencies</strong>,
              runs isomorphically, and outputs dual ESM + CJS with types. Search the
              table, switch your package manager, and copy the install.
            </p>
          </div>

          <Reveal className="stats" style={{ marginTop: 8, marginBottom: 8 }}>
            <div className="stat"><b className="grad">0</b><span>runtime deps</span></div>
            <div className="stat"><b className="grad">76</b><span>packages</span></div>
            <div className="stat"><b className="grad">ESM+CJS</b><span>dual output</span></div>
            <div className="stat"><b className="grad">100%</b><span>TypeScript</span></div>
            <div className="stat"><b className="grad">Iso</b><span>node · edge · browser</span></div>
            <div className="stat"><b className="grad">Free</b><span>licence</span></div>
          </Reveal>

          <CompareApp />

          <Reveal className="callout" style={{ maxWidth: 820, margin: "24px auto 0" }}>
            <strong>Honest framing:</strong> these aren&apos;t drop-in clones of the
            libraries they replace — they&apos;re smaller, focused takes with zero
            dependencies. Reach for them when the extra surface area (and supply
            chain) of the bigger library isn&apos;t worth it. When you need the full
            feature set of a mature library, use it.
          </Reveal>

          <div className="cta" style={{ marginTop: 30, justifyContent: "center" }}>
            <a className="btn btn-primary" href="/packages">Browse all 76 packages →</a>
            <a className="btn btn-ghost" href="/playground">Try them live</a>
          </div>
        </section>
      </main>
      <DevFooter />
    </>
  );
}
