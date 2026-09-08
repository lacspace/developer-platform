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
    "create-lacspace-app scaffolds a finished Next.js 15 app in ~0.12s — 9 production-ready templates, SEO, security headers, sitemap, robots and a dynamic OG image wired from the first render, plus a catalog of 11 composable add-ons: AI chat, chat-with-your-docs RAG, content, search, auth, analytics, payments, email, i18n, quality gates and uploads — added with --with, keyless and free-first, and the backend ones auto-upgrade you to full-stack. Not a blank page: a finished one.",
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
  { key: "marketplace", name: "Marketplace", desc: "Cart, checkout & payments" },
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

const ADDONS = [
  { icon: "💬", key: "ai-chat", name: "ai-chat", d: "A streaming AI chat route + UI on local Ollama — keyless." },
  { icon: "📚", key: "rag", name: "rag", d: "Chat with your docs: index Markdown, answer grounded questions with sources — keyless." },
  { icon: "📝", key: "content", name: "content", d: "A Markdown content section at /updates for any template, plus an RSS feed and llms.txt." },
  { icon: "🔍", key: "search", name: "search", d: "Instant, keyless full-text search (BM25) over your Markdown — box + /search + API. No service." },
  { icon: "🔐", key: "auth-pages", name: "auth-pages", d: "Account management on the built-in login/register: edit profile, change password, TOTP 2FA with backup codes.", fs: true },
  { icon: "📈", key: "analytics", name: "analytics", d: "Privacy-first, cookieless web analytics: tracker + MongoDB collector + dashboard.", fs: true },
  { icon: "💳", key: "payments", name: "payments", d: "Checkout wired to eSewa & Khalti: orders and integer-safe money. The signed eSewa flow works end-to-end in TEST with no credentials; Khalti activates with a secret.", fs: true },
  { icon: "✉️", key: "email", name: "email", d: "Transactional email: a ready mail service, beautiful templates and address validation. Logs to the console until you add SMTP, then delivers for real.", fs: true },
  { icon: "🌐", key: "i18n", name: "i18n", d: "Multi-language UI: a tiny dependency-free t() translator + a language switcher, with English + Nepali locales and an i18n:check lint script." },
  { icon: "🧪", key: "quality", name: "quality", d: "One-command quality gates from the Lacspace dev-tools — bundle-size budget, dependency audit and fake fixtures — plus a ready GitHub Actions CI workflow." },
  { icon: "📤", key: "uploads", name: "uploads", d: "Authenticated file uploads stored in MongoDB, served via signed, expiring URLs — no S3 required.", fs: true },
];

const STEPS = [
  { n: "01", t: "Run one command", d: "npm create lacspace-app@latest — no config files, no setup wizard." },
  { n: "02", t: "Pick a template + add-ons", d: "Nine templates. Choose static (frontend only) or --fullstack — frontend plus a real Node/Express/MongoDB/Redis backend. Then layer on any of 11 add-ons with --with ai-chat,rag,content,search,auth-pages,analytics,payments,email,i18n,quality,uploads — AI, content, search, auth, analytics, payments, email, i18n, quality gates and uploads, all keyless and free-first. The backend ones auto-upgrade a static project to full-stack." },
  { n: "03", t: "Start building", d: "cd in, npm run dev, and you’re live — SEO, headers and (optionally) a working AI already wired." },
];

const CMP = [
  { m: "Scaffold time (5 runs)", a: "0.24s", b: "0.12s", hot: true },
  { m: "Files produced", a: "18", b: "70", hot: true },
  { m: "Pages (finished)", a: "1 blank", b: "11", hot: true },
  { m: "Templates", a: "1", b: "9", hot: true },
  { m: "Prebuilt add-on catalog", a: "✗", b: "11: AI, auth, payments, email, analytics, search, content, i18n, quality, uploads", hot: true },
  { m: "Backend included", a: "—", b: "Express + MongoDB + Redis + JWT + CRUD, optional", hot: true },
  { m: "SEO + JSON-LD", a: "✗", b: "✓", hot: false },
  { m: "Dynamic OG images", a: "✗", b: "✓", hot: false },
  { m: "sitemap + robots", a: "✗", b: "✓", hot: false },
  { m: "Security headers", a: "✗", b: "✓", hot: false },
];

const FAQ = [
  { q: "How is this different from create-next-app?", a: "create-next-app gives you a blank starter. create-lacspace-app gives you a finished-looking app — a polished template already wired with SEO, security headers, a sitemap, robots.txt, a dynamic OG image and a working contact form — and then lets you layer on real features with one flag, including a streaming AI chat or chat-with-your-docs RAG that runs free and keyless on local Ollama." },
  { q: "Is it free?", a: "Yes — free and open under the Lacspace Free Licence. The app you generate is entirely yours, including for commercial use." },
  { q: "Which stack does it use?", a: "Next.js 15 with the App Router, Tailwind CSS v4 and TypeScript. Every generated app builds cleanly out of the box." },
  { q: "Can it scaffold a backend, not just a frontend?", a: "Yes. Add --fullstack (alias --dynamic) and you get an npm-workspaces monorepo: a frontend/ Next.js app wired to the API with a typed client and /login, /register and a protected /account page; a backend/ Node · Express · MongoDB · Redis · TypeScript API that boots as a working app — JWT auth (register, login, me) and an example per-user CRUD resource, built on zero-dep @lacspace packages (password hashing, JWT, request validation, typed env, rate limiting); and a shared types/ package imported by both, so the API contract can't drift. One npm install, one npm run dev runs the API on :4000 and the frontend on :3000 together. The default stays static — a single frontend-only app, byte-for-byte unchanged." },
  { q: "Do I need Docker or Redis for the full-stack app?", a: "No. Redis is optional — with no REDIS_URL the API falls back to an in-memory cache automatically, so it runs with zero infrastructure. MongoDB can be a local Docker container (a root docker-compose.yml with Mongo + Redis is included) or a free Atlas cluster. It's keyless and free-first, and every generated file carries plain \"how this works\" teaching comments." },
  { q: "Do the blog and docs templates really work?", a: "Yes. The blog template turns content/posts/*.md into statically-generated pages with Article JSON-LD and sitemap entries (via @lacspace/markdown); the docs template is a full Markdown docs site with an auto-generated sidebar, on-this-page TOC and prev/next." },
  { q: "Can I add more later?", a: "Yes — npx create-lacspace-app add pricing faq testimonials drops prewired, themed sections into any page, and add ai-chat or rag drops a whole feature (routes, UI and wiring) into an existing project. The UI kit installs automatically if it’s missing." },
  { q: "What add-ons are included?", a: "Eleven, each requested with --with <key>, in the interactive picker, or add <key> later: ai-chat (a streaming AI chat on local Ollama), rag (chat with your Markdown docs, grounded with sources), content (a /updates Markdown section + RSS + llms.txt), search (instant keyless BM25 full-text search over your Markdown — no key, no service), auth-pages (profile editing, password change and TOTP 2FA on the built-in login), analytics (privacy-first, cookieless web analytics with a MongoDB collector and dashboard), payments (checkout wired to eSewa & Khalti with integer-safe money), email (transactional email with ready templates that logs to the console until you add SMTP), i18n (a dependency-free t() translator and language switcher with English + Nepali locales), quality (one-command quality gates — bundle-size budget, dependency audit and fake fixtures — plus a GitHub Actions CI workflow) and uploads (authenticated file uploads stored in MongoDB, served via signed, expiring URLs — no S3). Everything is keyless and free-first; the backend ones — auth-pages, analytics, payments, email and uploads — contribute real Express routes and models via a route manifest and auto-upgrade a static project to full-stack, while i18n and quality are frontend/tooling add-ons." },
  { q: "Can I scaffold a whole product at once?", a: "Yes — a recipe bundles a template, full-stack mode and a set of add-ons into one command. npx create-lacspace-app my-app --recipe ai-saas gives you a SaaS with accounts, payments, a streaming AI chat and analytics; other recipes are store (e-commerce + eSewa/Khalti checkout + email + analytics), blog (content + search), docs-ai (RAG + search) and internal-tool (dashboard + auth + analytics + email). Explicit --template, --with and --fullstack flags still merge on top." },
  { q: "Does the AI cost anything?", a: "No. The ai-chat and rag add-ons default to local Ollama — free, keyless and private (nothing leaves your machine). Install Ollama, pull a model, and it just works; or set LACSPACE_AI_* to point at any hosted OpenAI-compatible model instead. It’s built on the zero-dependency @lacspace AI packages, so the code is yours to read and own." },
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
          <Reveal><span className="pill"><span className="live" /> Open source · 9 templates · 11 add-ons · full-stack mode · 0.12s scaffold</span></Reveal>
          <Reveal delay={60}>
            <h1>One command.<br /><span className="grad">A finished Next.js app.</span></h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="sub">
              <span className="mono">create-next-app</span> hands you a blank page. This hands you a
              finished-looking site — portfolio, store, SaaS, blog, dashboard and more — already wired
              with SEO, security, sitemap and robots. Or add <span className="mono">--fullstack</span> for a
              whole app: the Next.js frontend plus a real Node · Express · MongoDB · Redis backend with JWT
              auth and CRUD. Stop configuring. Start building.
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
            <div className="stat"><b className="grad">9</b><span>templates</span></div>
            <div className="stat"><b className="grad">0.12s</b><span>to scaffold</span></div>
            <div className="stat"><b className="grad">70</b><span>files each</span></div>
            <div className="stat"><b className="grad">104</b><span>packages ready</span></div>
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
                  <div className="sw" style={{ background: "var(--panel-2)", border: "1px solid var(--hairline)" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--accent)", fontSize: 22 }}>Aa</span>
                  </div>
                  <div className="bd">
                    <b>{t.name}{t.key === "marketplace" && <span style={{ marginLeft: 6, fontSize: 10, fontWeight: 700, color: "#0d9488", verticalAlign: "middle" }}>NEW</span>}</b>
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

        {/* Add-on catalog */}
        <section className="sec">
          <Reveal className="sec-head center">
            <div className="eyebrow">A catalog, not a checkbox</div>
            <h2>Eleven add-ons, <span className="grad">one flag each</span></h2>
            <p>Request any of these with <span className="mono">--with &lt;key&gt;</span>, tick them in the interactive picker, or <span className="mono">add &lt;key&gt;</span> to an existing project. All keyless and free-first — and the full-stack ones contribute real Express routes and models to the generated backend, auto-upgrading a static project to full-stack.</p>
          </Reveal>
          <div className="kits">
            {ADDONS.map((w, i) => (
              <Reveal key={w.key} delay={(i % 3) * 50} className="kit">
                <div className="kit-head">
                  <span className="ic" aria-hidden>{w.icon}</span>
                  <h3 style={{ fontSize: 15 }} className="mono">{w.name}</h3>
                  {w.fs && <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, color: "#0d9488" }}>FULL-STACK</span>}
                </div>
                <p style={{ marginBottom: 0 }}>{w.d}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={80} style={{ maxWidth: 620, margin: "18px auto 0" }}>
            <CodeBlock label="terminal" code="npm create lacspace-app@latest my-app --with ai-chat,search,payments" />
          </Reveal>
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
