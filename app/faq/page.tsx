import { DevHeader } from "../components/dev-header";
import { DevFooter } from "../components/dev-footer";
import { Reveal } from "../components/reveal";
import { site } from "../lib/seo";
import { FAQ_GROUPS, FAQS, FAQ_COUNT, faqPlain } from "../lib/faqs";

const seo = site.page({
  title: "FAQ — Frequently Asked Questions",
  path: "/faq",
  description:
    "Answers to common questions about the Lacspace developer platform — the free zero-dependency @lacspace packages, the standalone developer tools, and the create-lacspace-app scaffolder. Licensing, runtimes, TypeScript support, CI usage, docs and more.",
  keywords: [
    "lacspace faq",
    "lacspace packages",
    "lacspace developer tools",
    "create-lacspace-app",
    "free npm packages",
    "zero dependency typescript",
    "lacspace free licence",
  ],
});
export const metadata = seo.metadata;

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: faqPlain(f.a) },
  })),
};

/** Render an answer string, turning `code` spans into <code>. */
function Answer({ text }: { text: string }) {
  const parts = text.split("`");
  return (
    <p>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <code key={i} className="faq-code">
            {p}
          </code>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </p>
  );
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const CSS = `
.faq-nav{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:8px 0 8px}
.faq-nav a{font-size:13px;color:var(--muted);border:1px solid var(--hairline);background:var(--panel);border-radius:999px;padding:7px 14px;transition:color .15s,border-color .15s,background .15s}
.faq-nav a:hover{color:var(--fg);border-color:var(--accent);background:var(--panel-2)}
.faq-group{margin-top:44px;scroll-margin-top:84px}
.faq-group h2{font-size:clamp(1.3rem,3vw,1.7rem);letter-spacing:-.02em;margin-bottom:14px}
.faq-list{display:flex;flex-direction:column;gap:10px}
.faq-item{border:1px solid var(--hairline);border-radius:14px;background:var(--panel);overflow:hidden;transition:border-color .15s,background .15s}
.faq-item[open]{border-color:var(--accent-soft);background:var(--panel-2)}
.faq-item summary{list-style:none;cursor:pointer;padding:16px 18px;display:flex;align-items:flex-start;gap:12px;font-weight:560;font-size:15.5px;color:var(--fg)}
.faq-item summary::-webkit-details-marker{display:none}
.faq-item summary:hover{color:#fff}
.faq-q-ic{flex:none;width:20px;height:20px;border-radius:6px;border:1px solid var(--hairline-2);color:var(--accent);display:grid;place-items:center;font-size:14px;line-height:1;transition:transform .2s,background .2s,color .2s;margin-top:1px}
.faq-item[open] .faq-q-ic{transform:rotate(45deg);background:var(--accent);color:#0a0e17;border-color:transparent}
.faq-item .faq-body{padding:0 18px 18px 50px}
.faq-item .faq-body p{color:var(--muted);font-size:14.5px;line-height:1.65;margin:0}
.faq-code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12.5px;background:#0A0E18;border:1px solid var(--hairline);border-radius:6px;padding:1px 6px;color:#e8e8f0;white-space:nowrap}
`;

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="aurora" />
      <div className="grid-bg" />
      <DevHeader />

      <main className="wrap">
        <section className="hero" style={{ paddingBottom: 8 }}>
          <Reveal>
            <span className="pill"><span className="live" /> {FAQ_COUNT} answers · updated regularly</span>
          </Reveal>
          <Reveal delay={60}>
            <h1>Frequently asked <span className="grad">questions</span></h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="sub">
              Everything about the free <span className="mono">@lacspace</span> packages, the
              developer tools and <span className="mono">create-lacspace-app</span> — licensing,
              runtimes, TypeScript, CI, docs and more.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <nav className="faq-nav" aria-label="FAQ categories">
              {FAQ_GROUPS.map((g) => (
                <a key={g.category} href={`#${slugify(g.category)}`}>{g.category}</a>
              ))}
            </nav>
          </Reveal>
        </section>

        <section className="sec" style={{ paddingTop: 8 }}>
          {FAQ_GROUPS.map((g) => (
            <div key={g.category} id={slugify(g.category)} className="faq-group">
              <Reveal><h2>{g.category}</h2></Reveal>
              <div className="faq-list">
                {g.items.map((f) => (
                  <Reveal key={f.q}>
                    <details className="faq-item">
                      <summary>
                        <span className="faq-q-ic" aria-hidden>+</span>
                        <span>{f.q}</span>
                      </summary>
                      <div className="faq-body"><Answer text={f.a} /></div>
                    </details>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </section>

        <Reveal className="cta-band">
          <div className="eyebrow">Still have a question?</div>
          <h2>We&apos;re on <span className="grad">GitHub</span></h2>
          <p>Open an issue for anything that isn&apos;t answered here — bugs, ideas or a package you wish existed.</p>
          <div className="cta" style={{ justifyContent: "center", marginTop: 18 }}>
            <a className="btn btn-primary" href="https://github.com/lacspace/npm-packages/issues" target="_blank" rel="noopener">Open an issue →</a>
            <a className="btn btn-ghost" href="/docs">Read the docs</a>
          </div>
        </Reveal>
      </main>

      <DevFooter />
    </>
  );
}
