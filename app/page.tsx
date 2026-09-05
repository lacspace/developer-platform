import { softwareApp, graph, breadcrumb } from "@lacspace/seo";
import { DevHeader } from "./components/dev-header";
import { DevFooter } from "./components/dev-footer";
import { Reveal } from "./components/reveal";
import { CodeBlock } from "./components/code-block";
import { Counter } from "./components/counter";
import { QuickFind } from "./components/quick-find";
import { CodeTabs } from "./components/code-tabs";
import { KITS } from "./lib/data";

const SHORTCUTS = [
  { icon: "📦", label: "Browse 80 packages", href: "/packages" },
  { icon: "🧭", label: "Read the handbook", href: "/handbook" },
  { icon: "🧪", label: "Run the playground", href: "/playground" },
  { icon: "🚀", label: "Scaffold an app", href: "/handbook#scaffold" },
  { icon: "🖥️", label: "Live templates", href: "https://templates.lacspace.com", external: true },
  { icon: "⚖️", label: "Compare", href: "/compare" },
];

const WHY = [
  { img: "/brand/spot-security.png", title: "Zero runtime dependencies", body: "No transitive supply chain to audit. npm view returns an empty dependency object — the only deps are other @lacspace packages." },
  { img: "/brand/spot-cloud.png", title: "Isomorphic by design", body: "One build runs in Node, the browser and edge runtimes. Cryptography uses Web Crypto, never a hand-rolled reimplementation." },
  { img: "/brand/spot-automation.png", title: "Typed, dual ESM + CJS", body: "Built with tsup — import and require both work, each with full .d.ts types. TypeScript strict, everywhere." },
  { img: "/brand/spot-growth.png", title: "Free & permissively licensed", body: "Everything is free under the Lacspace Free Licence. Use it in personal and commercial projects at no cost." },
];

const POPULAR = [
  { n: "seo", d: "Typed metadata + schema.org JSON-LD from one config." },
  { n: "jwt", d: "JWTs with strict expiry/issuer checks over Web Crypto." },
  { n: "validate", d: "Zod-style typed schema validation, zero-dependency." },
  { n: "money", d: "Integer minor units — no floating-point cent bugs." },
  { n: "store", d: "Global React state in ~1KB, no provider." },
  { n: "query", d: "Data fetching with a shared cache (SWR-lite)." },
  { n: "crypto", d: "Authenticated AES-256-GCM over Web Crypto." },
  { n: "slugify", d: "Clean, transliterated, SEO-friendly URL slugs." },
];

const HOME_LD = graph(
  softwareApp({
    name: "create-lacspace-app",
    operatingSystem: "Web, Node.js",
    category: "DeveloperApplication",
    price: 0,
    currency: "USD",
  }),
  breadcrumb([{ name: "Home", url: "https://developer.lacspace.com" }])
);

type Surface = {
  icon: string;
  title: string;
  desc: string;
  href: string;
  cta: string;
  external?: boolean;
  soon?: boolean;
};

const SURFACES: Surface[] = [
  {
    icon: "📦",
    title: "npm Packages",
    desc: "All 80 zero-dependency packages — grouped by kit, with versions and one-line docs.",
    href: "/packages",
    cta: "Browse packages",
  },
  {
    icon: "📖",
    title: "Documentation",
    desc: "Per-package guides, the concepts, and a downloadable PDF handbook.",
    href: "https://lacspace.com/docs",
    cta: "Read the docs",
    external: true,
  },
  {
    icon: "🧭",
    title: "Developer Handbook",
    desc: "Install, use, upgrade, scaffold and ship — the end-to-end guide to the ecosystem.",
    href: "/handbook",
    cta: "Open handbook",
  },
  {
    icon: "🚀",
    title: "Scaffold an App",
    desc: "create-lacspace-app writes a finished Next.js app in ~0.12s — 8 templates, SEO wired.",
    href: "/handbook#scaffold",
    cta: "Scaffold now",
  },
  {
    icon: "🖥️",
    title: "Deployed Apps",
    desc: "Eight finished templates, live and clickable — see exactly what one command produces.",
    href: "https://templates.lacspace.com",
    cta: "Open templates",
    external: true,
  },
  {
    icon: "🔌",
    title: "Integrations",
    desc: "Drop the packages into Next.js, Node, edge runtimes, React — isomorphic by design.",
    href: "/handbook#integrations",
    cta: "See integrations",
  },
  {
    icon: "⚖️",
    title: "Compare Packages",
    desc: "How @lacspace stacks up against the usual dependencies — zod, dinero, jsonwebtoken and more.",
    href: "/compare",
    cta: "Compare",
  },
  {
    icon: "🧪",
    title: "Live Playground",
    desc: "Run packages in your browser — slugify, money, case, humanize, color and id, live.",
    href: "/playground",
    cta: "Open playground",
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_LD) }}
      />
      <div className="aurora" />
      <div className="grid-bg" />
      <DevHeader />

      <main className="wrap">
        {/* Hero */}
        <section className="hero">
          <Reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="hero-mark" src="/brand/mark.png" alt="Lacspace" width={96} height={96} />
          </Reveal>
          <Reveal delay={40}>
            <span className="pill">
              <span className="live" /> 80 packages · one CLI · real docs
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h1>
              The Lacspace <br />
              <span className="grad">Developer Platform</span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="sub">
              80 zero-dependency, isomorphic TypeScript packages — the standard
              library your backend and frontend keep re-inventing — plus a CLI
              that scaffolds a finished Next.js app, and the docs to build with
              all of it.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div className="cta">
              <a className="btn btn-primary" href="/packages">
                Explore 80 packages →
              </a>
              <a className="btn btn-ghost" href="/handbook">
                Read the handbook
              </a>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <QuickFind />
          </Reveal>

          <Reveal delay={240}>
            <div className="stats">
              <div className="stat">
                <b className="grad"><Counter to={63} /></b>
                <span>packages</span>
              </div>
              <div className="stat">
                <b className="grad"><Counter to={0} /></b>
                <span>runtime deps</span>
              </div>
              <div className="stat">
                <b className="grad">ESM+CJS</b>
                <span>dual output</span>
              </div>
              <div className="stat">
                <b className="grad"><Counter to={8} /></b>
                <span>templates</span>
              </div>
              <div className="stat">
                <b className="grad"><Counter to={100} suffix="%" /></b>
                <span>TypeScript</span>
              </div>
              <div className="stat">
                <b className="grad">Free</b>
                <span>licence</span>
              </div>
            </div>
          </Reveal>

          {/* Shortcuts */}
          <Reveal delay={280}>
            <div className="shortcuts">
              {SHORTCUTS.map((s) => (
                <a key={s.label} href={s.href} {...(s.external ? { target: "_blank", rel: "noopener" } : {})} className="shortcut">
                  <span aria-hidden className="sc-i">{s.icon}</span>
                  <span>{s.label}</span>
                  <span aria-hidden className="sc-arrow">→</span>
                </a>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Surfaces */}
        <section id="surfaces" className="sec">
          <Reveal className="sec-head center">
            <div className="eyebrow">Everything developer, in one place</div>
            <h2>The platform</h2>
            <p>
              Documentation, packages, the handbook, scaffolding and live apps —
              the surfaces you need to go from install to production.
            </p>
          </Reveal>
          <div className="kits">
            {SURFACES.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 50} className="kit">
                <div className="kit-head">
                  <span className="ic" aria-hidden>
                    {s.icon}
                  </span>
                  <h3>
                    {s.title}
                    {s.soon && (
                      <span
                        style={{
                          marginLeft: 8,
                          fontSize: 11,
                          padding: "2px 8px",
                          borderRadius: 999,
                          border: "1px solid var(--hairline-2)",
                          color: "var(--faint)",
                          verticalAlign: "middle",
                        }}
                      >
                        soon
                      </span>
                    )}
                  </h3>
                </div>
                <p>{s.desc}</p>
                <a
                  className="open"
                  href={s.href}
                  {...(s.external ? { target: "_blank", rel: "noopener" } : {})}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 14,
                    fontWeight: 580,
                    color: s.soon ? "var(--faint)" : "var(--fg)",
                    pointerEvents: s.soon ? "none" : "auto",
                  }}
                >
                  {s.cta} <span aria-hidden>{s.soon ? "" : "→"}</span>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Code showcase */}
        <section className="sec">
          <Reveal className="sec-head center">
            <div className="eyebrow">The API</div>
            <h2>Small, typed, <span className="grad">boring in the best way</span></h2>
            <p>Real snippets — pick a task and see how little code it takes.</p>
          </Reveal>
          <Reveal delay={60} style={{ maxWidth: 780, margin: "0 auto" }}>
            <CodeTabs />
          </Reveal>
        </section>

        {/* Ecosystem preview */}
        <section id="ecosystem" className="sec">
          <Reveal className="sec-head center">
            <div className="eyebrow">The ecosystem</div>
            <h2>
              A <span className="grad">standard library</span> for the modern web
            </h2>
            <p>
              Twelve kits, eighty packages, zero runtime dependencies. Import
              only what you use — every package is isomorphic and tree-shakeable.
            </p>
          </Reveal>
          <div className="kits">
            {KITS.map((k, i) => (
              <Reveal key={k.name} delay={(i % 3) * 50} className="kit">
                <div className="kit-head">
                  <span className="ic" aria-hidden>
                    {k.icon}
                  </span>
                  <h3>{k.name}</h3>
                </div>
                <p>{k.blurb}</p>
                <ul>
                  {k.packages.slice(0, 5).map((p) => (
                    <li key={p.name}>
                      <span className="pk">@lacspace/{p.name}</span>
                      <span className="pd">{p.desc}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <Reveal className="cta" style={{ marginTop: 30 }}>
            <a className="btn btn-ghost" href="/packages">
              See all 80 packages →
            </a>
          </Reveal>
        </section>

        {/* Why different */}
        <section className="sec">
          <Reveal className="sec-head center">
            <div className="eyebrow">Why it&apos;s different</div>
            <h2>A standard library that <span className="grad">respects your app</span></h2>
            <p>The same four rules hold across all 80 packages.</p>
          </Reveal>
          <div className="why-grid">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={(i % 2) * 60} className="why-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={w.img} alt="" className="why-img" width={72} height={72} />
                <div>
                  <h3>{w.title}</h3>
                  <p>{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Popular packages */}
        <section className="sec">
          <Reveal className="sec-head center">
            <div className="eyebrow">Developer favourites</div>
            <h2>Start with the <span className="grad">popular ones</span></h2>
            <p>The packages developers reach for first — one npm install away.</p>
          </Reveal>
          <div className="grid">
            {POPULAR.map((p, i) => (
              <Reveal key={p.n} delay={(i % 3) * 50} className="kit" style={{ padding: 18 }}>
                <a href={`https://www.npmjs.com/package/@lacspace/${p.n}`} target="_blank" rel="noopener" style={{ display: "block" }}>
                  <span className="pk" style={{ fontSize: 14, color: "#e9d5ff" }}>@lacspace/{p.n}</span>
                  <p style={{ color: "var(--muted)", fontSize: 13, margin: "8px 0 10px" }}>{p.d}</p>
                  <code className="mono" style={{ fontSize: 12, color: "var(--faint)" }}>npm i @lacspace/{p.n}</code>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal className="cta" style={{ marginTop: 28 }}>
            <a className="btn btn-ghost" href="/packages">See all 80 packages →</a>
          </Reveal>
        </section>

        {/* Scaffold showcase */}
        <section id="scaffold-cta" className="sec">
          <div className="split">
            <Reveal className="copy">
              <div className="eyebrow">From zero to shipped</div>
              <h3>One command. A finished app.</h3>
              <p>
                <span className="mono">create-lacspace-app</span> scaffolds a real
                Next.js 15 + React 19 + Tailwind v4 app — every page filled, SEO
                and security headers wired, a 26-component UI kit included — in
                about 0.12 seconds. Then it&apos;s a normal app you own.
              </p>
              <div className="chips">
                <span>--template saas</span>
                <span>SEO wired</span>
                <span>OG images</span>
                <span>security headers</span>
                <span>sitemap + robots</span>
                <span>⌘K palette</span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <CodeBlock
                label="terminal"
                code={`# install a package
npm i @lacspace/validate @lacspace/money

# or scaffold a whole app
npm create lacspace-app@latest my-app -- --template saas
cd my-app && npm run dev`}
              />
            </Reveal>
          </div>
        </section>

        {/* CTA band */}
        <Reveal className="cta-band">
          <div className="eyebrow">Start building</div>
          <h2>
            Batteries included, <span className="grad">dependencies excluded</span>
          </h2>
          <p>
            Everything here is free under the Lacspace Free Licence. Pick a
            package, read a guide, or scaffold an app — you&apos;re one command
            from shipping.
          </p>
          <div className="cta" style={{ justifyContent: "center" }}>
            <a className="btn btn-primary" href="/packages">
              Browse the packages →
            </a>
            <a
              className="btn btn-ghost"
              href="https://templates.lacspace.com"
              target="_blank"
              rel="noopener"
            >
              See live templates ↗
            </a>
          </div>
        </Reveal>
      </main>

      <DevFooter />
    </>
  );
}
