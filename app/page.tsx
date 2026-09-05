import { softwareApp, graph, breadcrumb } from "@lacspace/seo";
import { DevHeader } from "./components/dev-header";
import { DevFooter } from "./components/dev-footer";
import { Reveal } from "./components/reveal";
import { CodeBlock } from "./components/code-block";
import { Counter } from "./components/counter";
import { QuickFind } from "./components/quick-find";
import { KITS } from "./lib/data";

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
    desc: "All 63 zero-dependency packages — grouped by kit, with versions and one-line docs.",
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
    desc: "create-lacspace-app writes a finished Next.js app in ~0.15s — 8 templates, SEO wired.",
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
              <span className="live" /> 63 packages · one CLI · real docs
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
              63 zero-dependency, isomorphic TypeScript packages — the standard
              library your backend and frontend keep re-inventing — plus a CLI
              that scaffolds a finished Next.js app, and the docs to build with
              all of it.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div className="cta">
              <a className="btn btn-primary" href="/packages">
                Explore 63 packages →
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

        {/* Ecosystem preview */}
        <section id="ecosystem" className="sec">
          <Reveal className="sec-head center">
            <div className="eyebrow">The ecosystem</div>
            <h2>
              A <span className="grad">standard library</span> for the modern web
            </h2>
            <p>
              Ten kits, sixty-three packages, zero runtime dependencies. Import
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
              See all 63 packages →
            </a>
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
                about 0.15 seconds. Then it&apos;s a normal app you own.
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
