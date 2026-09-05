import { DevHeader } from "../components/dev-header";
import { DevFooter } from "../components/dev-footer";
import { Reveal } from "../components/reveal";
import { CodeBlock } from "../components/code-block";
import { site } from "../lib/seo";

const seo = site.page({
  title: "Documentation",
  path: "/docs",
  description:
    "The documentation home for Lacspace — install and scaffold in seconds, then dive into the per-package reference, the developer handbook, a live playground and the Free Licence. 76 zero-dependency packages, one CLI.",
});
export const metadata = seo.metadata;

const SURFACES = [
  { icon: "📦", title: "Package reference", d: "Every one of the 76 packages — API, exports, install and examples.", href: "/packages", cta: "Browse packages" },
  { icon: "🧭", title: "Developer handbook", d: "Install, use, upgrade, scaffold and ship — guides with runnable recipes.", href: "/handbook", cta: "Open handbook" },
  { icon: "🧪", title: "Live playground", d: "Run packages in your browser — slugify, money, case, humanize, color, id.", href: "/playground", cta: "Open playground" },
  { icon: "⚖️", title: "Compare", d: "How @lacspace stacks up against zod, dinero, jsonwebtoken and friends.", href: "/compare", cta: "Compare" },
  { icon: "🚀", title: "Scaffold an app", d: "create-lacspace-app writes a finished Next.js app in ~0.12s.", href: "/create-app", cta: "create-lacspace-app" },
  { icon: "📄", title: "Free Licence", d: "The permissive licence every open package ships under.", href: "/licenses/lacspace-free-1.0", cta: "Read the licence" },
];

const KITS = [
  { name: "Security Kit", d: "crypto · jwt · otp · passkeys", q: "Security+Kit" },
  { name: "SEO Kit", d: "seo · sitemap · robots · og", q: "SEO+Kit" },
  { name: "React Kit", d: "store · query · theme · hooks", q: "React+Kit" },
  { name: "App & Utils Kit", d: "validate · money · id · cache", q: "App+%26+Utils+Kit" },
  { name: "Backend Kit", d: "signed-url · pdf · webhooks", q: "Backend+Kit" },
  { name: "StockKit", d: "indicators · market · paper-trade", q: "StockKit" },
];

export default function DocsHub() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }} />
      <div className="aurora" />
      <div className="grid-bg" />
      <DevHeader />

      <main className="wrap">
        <section className="sec" style={{ paddingTop: 48 }}>
          <Reveal className="sec-head center">
            <div className="eyebrow">Documentation</div>
            <h1>Everything you need to <span className="grad">build with Lacspace</span></h1>
            <p>
              Install a package or scaffold a whole app in seconds, then go deep with the per-package
              reference, the handbook and a live playground. 76 zero-dependency packages, one CLI.
            </p>
          </Reveal>

          {/* Quickstart */}
          <div className="split" style={{ marginTop: 8 }}>
            <Reveal className="copy">
              <div className="eyebrow">Quickstart</div>
              <h3>Two ways to start</h3>
              <p>
                Install exactly the package you need — every one adds a single dependency — or scaffold a
                finished Next.js app and get the whole stack wired at once.
              </p>
              <div className="chips">
                <span>0 runtime deps</span><span>ESM + CJS</span><span>isomorphic</span><span>100% TypeScript</span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <CodeBlock label="terminal" code={`# add a package
npm i @lacspace/seo @lacspace/validate

# or scaffold a whole app
npm create lacspace-app@latest my-app -- --template saas
cd my-app && npm run dev`} />
            </Reveal>
          </div>
        </section>

        {/* Where to go */}
        <section className="sec">
          <Reveal className="sec-head center">
            <div className="eyebrow">Start here</div>
            <h2>Pick your surface</h2>
            <p>The docs are split across a few focused places. Here&apos;s where each lives.</p>
          </Reveal>
          <div className="kits">
            {SURFACES.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 50} className="kit">
                <div className="kit-head"><span className="ic" aria-hidden>{s.icon}</span><h3>{s.title}</h3></div>
                <p>{s.d}</p>
                <a className="open" href={s.href} style={{ fontSize: 14, fontWeight: 580, color: "var(--fg)" }}>{s.cta} →</a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Kits */}
        <section className="sec">
          <Reveal className="sec-head center">
            <div className="eyebrow">By kit</div>
            <h2>Jump into a <span className="grad">kit</span></h2>
            <p>The catalog is grouped into kits — open the reference filtered to the one you need.</p>
          </Reveal>
          <div className="grid">
            {KITS.map((k, i) => (
              <Reveal key={k.name} delay={(i % 3) * 50} className="kit">
                <div className="kit-head"><h3>{k.name}</h3></div>
                <p className="mono" style={{ fontSize: 13 }}>{k.d}</p>
                <a className="open" href={`/packages?kit=${k.q}`} style={{ fontSize: 14, fontWeight: 580, color: "var(--fg)" }}>Open the kit →</a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* PDF + full docs */}
        <Reveal className="cta-band">
          <div className="eyebrow">Prefer it offline?</div>
          <h2>The full <span className="grad">PDF handbook</span></h2>
          <p>Every package, every guide — as one downloadable, watermarked handbook.</p>
          <div className="cta" style={{ justifyContent: "center" }}>
            <a className="btn btn-primary" href="/docs/pdf">Download the PDF handbook →</a>
            <a className="btn btn-ghost" href="/handbook">Read the handbook online</a>
          </div>
        </Reveal>
      </main>

      <DevFooter />
    </>
  );
}
