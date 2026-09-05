import { DevHeader } from "../components/dev-header";
import { DevFooter } from "../components/dev-footer";
import { Reveal } from "../components/reveal";
import { CodeBlock } from "../components/code-block";
import { CreateDemo } from "./create-demo";
import { site } from "../lib/seo";

const seo = site.page({
  title: "create-lacspace-app",
  path: "/create-app",
  description:
    "create-lacspace-app scaffolds a finished Next.js 15 app in ~0.12s — 8 production-ready templates, SEO, security headers, sitemap, robots and a dynamic OG image wired from the first render. Not a blank page: a finished one.",
});
export const metadata = seo.metadata;

const TEMPLATES = [
  { key: "personal", name: "Personal", desc: "Portfolio + contact" },
  { key: "business", name: "Business", desc: "Services + strong CTA" },
  { key: "ecommerce", name: "E-commerce", desc: "Storefront + product grid" },
  { key: "saas", name: "SaaS", desc: "Features + pricing" },
  { key: "blog", name: "Blog", desc: "Markdown → SSG posts" },
  { key: "docs", name: "Docs", desc: "Sidebar + on-this-page" },
  { key: "dashboard", name: "Dashboard", desc: "Sidebar + stat cards" },
  { key: "restaurant", name: "Restaurant", desc: "Menu + reservations" },
];

const WIRED = [
  { icon: "🔎", name: "@lacspace/seo", d: "Metadata, canonical, Open Graph and JSON-LD from one defineSite() — plus a CI gate that fails below grade A." },
  { icon: "🖼️", name: "@lacspace/og", d: "A dynamic social card at /og — auto-fit titles, your gradient, no design tool." },
  { icon: "🛡️", name: "@lacspace/headers", d: "HSTS, CSP, X-Frame-Options and Referrer-Policy hardened in next.config." },
  { icon: "🤖", name: "@lacspace/robots", d: "A robots.txt route from your config — block AI crawlers with a flag." },
  { icon: "🗺️", name: "@lacspace/sitemap", d: "A sitemap.xml from bare paths — no repeating your domain on every row." },
  { icon: "🌗", name: "@lacspace/theme", d: "Dark / light / system, persisted, painted before first frame. No flash." },
  { icon: "⌨️", name: "⌘K palette", d: "A command palette wired in with @lacspace/hotkeys." },
  { icon: "✅", name: "@lacspace/form", d: "A real /contact form — typed, validated and spam-proof with @lacspace/validate." },
];

const STEPS = [
  { n: "01", t: "Run one command", d: "npm create lacspace-app@latest — no config files, no setup wizard." },
  { n: "02", t: "Choose a template", d: "Eight production-ready templates — portfolio to dashboard." },
  { n: "03", t: "Start building", d: "cd in, npm run dev, and you’re live — SEO and headers already wired." },
];

const CMP = [
  { m: "Scaffold time (5 runs)", a: "0.24s", b: "0.12s", hot: true },
  { m: "Files produced", a: "18", b: "70", hot: true },
  { m: "Pages (finished)", a: "1 blank", b: "11", hot: true },
  { m: "Templates", a: "1", b: "8", hot: true },
  { m: "SEO + JSON-LD", a: "✗", b: "✓", hot: false },
  { m: "Dynamic OG images", a: "✗", b: "✓", hot: false },
  { m: "sitemap + robots", a: "✗", b: "✓", hot: false },
  { m: "Security headers", a: "✗", b: "✓", hot: false },
];

const FAQ = [
  { q: "How is this different from create-next-app?", a: "create-next-app gives you a blank starter. create-lacspace-app gives you a finished-looking app — a polished template already wired with SEO, security headers, a sitemap, robots.txt, a dynamic OG image and a working contact form." },
  { q: "Is it free?", a: "Yes — free and open under the Lacspace Free Licence. The app you generate is entirely yours, including for commercial use." },
  { q: "Which stack does it use?", a: "Next.js 15 with the App Router, Tailwind CSS v4 and TypeScript. Every generated app builds cleanly out of the box." },
  { q: "Do the blog and docs templates really work?", a: "Yes. The blog template turns content/posts/*.md into statically-generated pages with Article JSON-LD and sitemap entries (via @lacspace/markdown); the docs template is a full Markdown docs site with an auto-generated sidebar, on-this-page TOC and prev/next." },
  { q: "Can I add more later?", a: "Yes — npx create-lacspace-app add pricing faq testimonials drops prewired, themed sections into any page, and installs the UI kit automatically if it’s missing." },
];

const DEMO_CSS = `
.cd{margin-top:8px}
.cd-chips{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:18px}
.cd-chip{border:1px solid var(--hairline-2);background:var(--panel);color:var(--muted);border-radius:999px;padding:7px 15px;font-size:13px;font-weight:560;cursor:pointer;transition:.18s;font-family:inherit}
.cd-chip:hover{color:var(--fg);border-color:var(--accent-mid)}
.cd-chip.on{border-color:transparent;background:linear-gradient(135deg,var(--accent-from),var(--accent-to));color:#07060F;font-weight:700}
.cd-live{display:inline-flex;align-items:center;gap:7px;font-size:12px;color:var(--faint);margin-left:4px}
.cd-live .dot{width:7px;height:7px;border-radius:50%;background:var(--faint)}
.cd-live .dot.pulse{background:#34D399;animation:cdpulse 1.4s infinite}
@keyframes cdpulse{0%,100%{opacity:1}50%{opacity:.35}}
.cd-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media(max-width:860px){.cd-grid{grid-template-columns:1fr}}
.cd-term,.cd-prev{border:1px solid var(--hairline);border-radius:14px;overflow:hidden;background:#0A0E18}
.cd-bar{display:flex;align-items:center;gap:7px;padding:10px 14px;border-bottom:1px solid var(--hairline);background:#0E1424}
.cd-bar i{width:11px;height:11px;border-radius:50%;display:inline-block}
.cd-title,.cd-url{margin-left:8px;font-family:var(--font-mono,monospace);font-size:12px;color:var(--faint)}
.cd-status{margin-left:auto;font-size:11px;color:var(--faint)}
.cd-status.on{color:#34D399}
.cd-pre{margin:0;padding:16px;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:12.5px;line-height:1.7;min-height:210px;white-space:pre-wrap;word-break:break-word}
.cd-cursor{color:#8B5CF6;animation:cdblink 1s steps(2) infinite}
@keyframes cdblink{50%{opacity:0}}
.cd-app{padding:16px;min-height:210px;transition:opacity .4s}
.cd-hero{border-radius:10px;padding:16px;display:flex;flex-direction:column;gap:8px;margin-bottom:12px}
.cd-h1{height:12px;width:55%;border-radius:6px;background:rgba(255,255,255,.9)}
.cd-h2{height:8px;width:75%;border-radius:5px;background:rgba(255,255,255,.5)}
.cd-btn{height:22px;width:96px;border-radius:6px;background:rgba(0,0,0,.28);margin-top:4px}
.cd-cards{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px}
.cd-cards span{height:46px;border-radius:8px;border:1px solid var(--hairline);background:var(--panel)}
.cd-name{margin-top:12px;font-size:12.5px;color:var(--faint)}
.ca-proof{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:16px}
.ca-proof span{display:inline-flex;align-items:center;gap:7px;border:1px solid var(--hairline-2);background:var(--panel);border-radius:999px;padding:7px 14px;font-size:13px;font-weight:600;color:var(--fg)}
.ca-cmp{width:100%;border:1px solid var(--hairline);border-radius:14px;overflow:hidden;background:var(--panel)}
.ca-cmp .row{display:grid;grid-template-columns:1.6fr 1fr 1fr;align-items:center;padding:12px 18px;font-size:14px;border-top:1px solid var(--hairline)}
.ca-cmp .row.head{border-top:none;background:var(--panel-2);font-weight:700}
.ca-cmp .c{text-align:center}
.ca-cmp .b{color:transparent;background:linear-gradient(90deg,var(--accent-from),var(--accent-to));-webkit-background-clip:text;background-clip:text;font-weight:800}
.ca-tpls{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
@media(max-width:820px){.ca-tpls{grid-template-columns:repeat(2,1fr)}}
.ca-tpl{border:1px solid var(--hairline);border-radius:14px;overflow:hidden;background:var(--panel);transition:.2s;text-decoration:none;color:inherit;display:block}
.ca-tpl:hover{transform:translateY(-3px);border-color:var(--accent-mid)}
.ca-tpl .sw{aspect-ratio:16/10;display:flex;align-items:center;justify-content:center}
.ca-tpl .bd{padding:14px}
.ca-tpl .bd b{font-weight:700}
.ca-tpl .bd .k{display:block;margin-top:6px;font-family:ui-monospace,monospace;font-size:12px;color:var(--accent-mid)}
`;

const GRADS = ["#60A5FA,#6366F1", "#6366F1,#8B5CF6", "#2DD4BF,#34D399", "#8B5CF6,#EC4899", "#3B82F6,#60A5FA", "#34D399,#2DD4BF", "#FBBF24,#FB7185", "#FB7185,#FBBF24"];

export default function CreateAppPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }} />
      <style dangerouslySetInnerHTML={{ __html: DEMO_CSS }} />
      <div className="aurora" />
      <div className="grid-bg" />
      <DevHeader />

      <main className="wrap">
        {/* Hero */}
        <section className="hero">
          <Reveal><span className="pill"><span className="live" /> Open source · 8 templates · 0.12s scaffold</span></Reveal>
          <Reveal delay={60}>
            <h1>One command.<br /><span className="grad">A finished Next.js app.</span></h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="sub">
              <span className="mono">create-next-app</span> hands you a blank page. This hands you a
              finished-looking site — portfolio, store, SaaS, blog, dashboard and more — already wired
              with SEO, security, sitemap and robots. Stop configuring. Start building.
            </p>
          </Reveal>
          <Reveal delay={160} style={{ maxWidth: 620, margin: "22px auto 0" }}>
            <CodeBlock label="terminal" code="npm create lacspace-app@latest my-app" />
          </Reveal>
          <Reveal delay={200} className="ca-proof">
            <span>⚡ 0.12s to scaffold</span>
            <span>📊 ~2× faster than create-next-app</span>
            <span>🧩 70 files, already finished</span>
          </Reveal>
          <Reveal delay={240}>
            <div className="cta" style={{ marginTop: 22 }}>
              <a className="btn btn-primary" href="https://www.npmjs.com/package/create-lacspace-app" target="_blank" rel="noopener">View on npm ↗</a>
              <a className="btn btn-ghost" href="https://templates.lacspace.com" target="_blank" rel="noopener">See them live ↗</a>
              <a className="btn btn-ghost" href="/handbook#scaffold">Read the guide</a>
            </div>
          </Reveal>
        </section>

        {/* Stat band */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <Reveal className="stats">
            <div className="stat"><b className="grad">8</b><span>templates</span></div>
            <div className="stat"><b className="grad">0.12s</b><span>to scaffold</span></div>
            <div className="stat"><b className="grad">70</b><span>files each</span></div>
            <div className="stat"><b className="grad">76</b><span>packages ready</span></div>
            <div className="stat"><b className="grad">100%</b><span>TypeScript</span></div>
            <div className="stat"><b className="grad">Free</b><span>licence</span></div>
          </Reveal>
        </section>

        {/* Interactive demo */}
        <section className="sec">
          <Reveal className="sec-head center">
            <div className="eyebrow">Watch it build</div>
            <h2>Setup, in <span className="grad">real time</span></h2>
            <p>Tap a template and watch the command run — and the app assemble itself right beside it.</p>
          </Reveal>
          <Reveal><CreateDemo /></Reveal>
        </section>

        {/* Benchmark */}
        <section className="sec">
          <Reveal className="sec-head center">
            <div className="eyebrow">Measured, not marketed</div>
            <h2>A finished app in <span className="grad">0.12s</span></h2>
            <p>We ran it on Node 22, calling the CLI directly — a complete 70-file app in about a tenth of a second, the same on all five runs.</p>
          </Reveal>
          <Reveal style={{ maxWidth: 760, margin: "0 auto 18px" }}>
            <CodeBlock label="benchmark — zsh" code={`$ time node create-lacspace-app my-app --template saas --no-install
✔ scaffolded 70 files
real  0.12s   ·   run 2: 0.12s   run 3: 0.12s   run 4: 0.12s   run 5: 0.12s`} />
          </Reveal>
          <Reveal className="ca-cmp" style={{ maxWidth: 760, margin: "0 auto" }}>
            <div className="row head"><span>Metric</span><span className="c">create-next-app</span><span className="c">create-lacspace-app</span></div>
            {CMP.map((r) => (
              <div className="row" key={r.m}>
                <span>{r.m}</span>
                <span className="c" style={{ color: "var(--muted)" }}>{r.a}</span>
                <span className={`c ${r.hot ? "b" : ""}`} style={r.hot ? {} : { color: "#34D399" }}>{r.b}</span>
              </div>
            ))}
          </Reveal>
          <p className="center" style={{ marginTop: 12, fontSize: 13, color: "var(--faint)" }}>
            Scaffold-only, dependency install excluded from both. It builds on Next.js 15 — the win is skipping the boilerplate.
          </p>
        </section>

        {/* Templates gallery */}
        <section className="sec">
          <Reveal className="sec-head center">
            <div className="eyebrow">Eight starting points</div>
            <h2>Pick a template, <span className="grad">open it live</span></h2>
            <p>Every one a production-ready Next.js 15 + Tailwind app. Choose during setup, or with <span className="mono">--template</span>.</p>
          </Reveal>
          <div className="ca-tpls">
            {TEMPLATES.map((t, i) => (
              <Reveal key={t.key} delay={(i % 4) * 40}>
                <a className="ca-tpl" href={`https://templates.lacspace.com/${t.key}`} target="_blank" rel="noopener">
                  <div className="sw" style={{ background: `linear-gradient(135deg, ${GRADS[i]})` }}>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "rgba(255,255,255,.92)", fontSize: 22 }}>Aa</span>
                  </div>
                  <div className="bd">
                    <b>{t.name}</b>
                    <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 3 }}>{t.desc}</div>
                    <span className="k">--template {t.key}</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* What's wired */}
        <section className="sec">
          <Reveal className="sec-head center">
            <div className="eyebrow">Batteries included</div>
            <h2>The libraries are <span className="grad">already doing their job</span></h2>
            <p>Every generated app arrives with these Lacspace packages installed and wired — working from the first <span className="mono">npm run dev</span>.</p>
          </Reveal>
          <div className="kits">
            {WIRED.map((w, i) => (
              <Reveal key={w.name} delay={(i % 3) * 50} className="kit">
                <div className="kit-head"><span className="ic" aria-hidden>{w.icon}</span><h3 style={{ fontSize: 15 }} className="mono">{w.name}</h3></div>
                <p style={{ marginBottom: 0 }}>{w.d}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="sec">
          <Reveal className="sec-head center">
            <div className="eyebrow">How it works</div>
            <h2>Three steps to shipped</h2>
          </Reveal>
          <div className="grid">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 60} className="kit">
                <div className="kit-head"><span className="grad" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22 }}>{s.n}</span><h3>{s.t}</h3></div>
                <p style={{ marginBottom: 0 }}>{s.d}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* add subcommand */}
        <section className="sec">
          <div className="split">
            <Reveal className="copy">
              <div className="eyebrow">New — grow anytime</div>
              <h3>It doesn’t stop after <span className="grad">day one</span></h3>
              <p>
                Unlike other <span className="mono">create-*</span> tools, this one keeps giving. Drop prewired,
                themed sections into any page — and it installs the UI kit automatically if it’s missing, so it
                works in <strong style={{ color: "var(--fg)" }}>any</strong> Next.js app.
              </p>
              <div className="chips">
                {["hero", "features", "pricing", "faq", "testimonials", "team", "stats", "cta", "bento"].map((s) => <span key={s}>{s}</span>)}
              </div>
            </Reveal>
            <Reveal delay={80}>
              <CodeBlock label="add-a-section.sh" code={`# drop sections into any page
npx create-lacspace-app add pricing faq testimonials

# then, in app/page.tsx
import { PricingSection } from "@/components/sections/pricing";`} />
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="sec">
          <Reveal className="sec-head center">
            <div className="eyebrow">FAQ</div>
            <h2>Questions</h2>
          </Reveal>
          <div className="grid">
            {FAQ.map((f, i) => (
              <Reveal key={f.q} delay={(i % 2) * 50} className="kit">
                <div className="kit-head"><h3 style={{ fontSize: 16 }}>{f.q}</h3></div>
                <p style={{ marginBottom: 0 }}>{f.a}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <Reveal className="cta-band">
          <div className="eyebrow">Start beautiful</div>
          <h2>Your next app is <span className="grad">one command away</span></h2>
          <p>Free, open-source, and yours to keep.</p>
          <div style={{ maxWidth: 560, margin: "18px auto 0" }}>
            <CodeBlock label="terminal" code="npm create lacspace-app@latest my-app" />
          </div>
          <div className="cta" style={{ justifyContent: "center", marginTop: 18 }}>
            <a className="btn btn-primary" href="https://www.npmjs.com/package/create-lacspace-app" target="_blank" rel="noopener">View on npm ↗</a>
            <a className="btn btn-ghost" href="https://templates.lacspace.com" target="_blank" rel="noopener">See them live ↗</a>
          </div>
        </Reveal>
      </main>

      <DevFooter />
    </>
  );
}
