import { DevHeader } from "../../components/dev-header";
import { DevFooter } from "../../components/dev-footer";
import { Reveal } from "../../components/reveal";
import { CodeBlock } from "../../components/code-block";
import { site } from "../../lib/seo";
import { FREE_LICENCE as L, RULE_META, type RuleKind } from "../../lib/licence";

const seo = site.page({
  title: "Lacspace Free Licence v1.0",
  path: "/licenses/lacspace-free-1.0",
  description: L.description,
});
export const metadata = seo.metadata;

const KINDS: RuleKind[] = ["permission", "condition", "limitation"];

export default function FreeLicencePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }} />
      <div className="aurora" />
      <div className="grid-bg" />
      <DevHeader />

      <main className="wrap">
        {/* Hero */}
        <section className="sec" style={{ paddingTop: 40 }}>
          <Reveal>
            <a className="pd-back" href="/licenses">← Licence</a>
          </Reveal>
          <Reveal className="sec-head" delay={40} style={{ maxWidth: 780 }}>
            <div className="eyebrow">Lacspace Free Licence</div>
            <h1 style={{ margin: "6px 0 0" }}>
              {L.name} <span className="grad">v{L.version}</span>
            </h1>
            <p style={{ marginTop: 12 }}>{L.tagline} — {L.summary}</p>
            <div className="chips" style={{ marginTop: 18 }}>
              <span>Free &amp; permissive</span>
              <span>Permissive</span>
              <span className="mono">{L.spdxId}</span>
              <span>Released {L.released}</span>
            </div>
            <div className="cta" style={{ marginTop: 20 }}>
              <a className="btn btn-primary" href="/licenses/lacspace-free-1.0/text">View raw text →</a>
              <a className="btn btn-ghost" href="/licenses/lacspace-free-1.0/text" download="LICENSE">Download LICENSE</a>
              <a className="btn btn-ghost" href="/packages">Browse the packages</a>
            </div>
            <p className="mono" style={{ marginTop: 14, fontSize: 13, color: "var(--faint)" }}>
              {L.availabilityNote}
            </p>
          </Reveal>
        </section>

        {/* In plain language */}
        <section className="sec">
          <Reveal className="sec-head center">
            <div className="eyebrow">In plain language</div>
            <h2>What this licence <span className="grad">actually means</span></h2>
            <p>The legal text is short and permissive. Here it is, in one breath.</p>
          </Reveal>
          <div className="grid">
            {L.plainLanguage.map((p, i) => (
              <Reveal key={p} delay={(i % 3) * 50} className="kit">
                <div className="kit-head">
                  <span className="ic" aria-hidden style={{ color: "#34D399" }}>✓</span>
                  <h3 style={{ fontSize: 15.5 }}>{p}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Permissions / conditions / limitations */}
        <section className="sec">
          <Reveal className="sec-head center">
            <div className="eyebrow">The matrix</div>
            <h2>Permissions, conditions &amp; limitations</h2>
            <p>Every right you get, the one thing you must do, and what isn&apos;t covered.</p>
          </Reveal>
          <div className="kits" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            {KINDS.map((kind, i) => {
              const meta = RULE_META[kind];
              const rules = L.rules.filter((r) => r.kind === kind);
              return (
                <Reveal key={kind} delay={i * 60} className="kit">
                  <div className="kit-head">
                    <span className="ic" aria-hidden style={{ color: meta.color }}>{meta.icon}</span>
                    <h3>{meta.label}</h3>
                  </div>
                  <ul>
                    {rules.map((r) => (
                      <li key={r.label}>
                        <span className="pk" style={{ color: "var(--fg)" }}>{r.label}</span>
                        <span className="pd">{r.detail}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* How to comply / apply */}
        <section className="sec">
          <div className="split">
            <Reveal className="copy">
              <div className="eyebrow">How to comply</div>
              <h3>You already do</h3>
              <p>
                Install a package and the <span className="mono">LICENSE</span> file ships inside it —
                the notice travels with the code in <span className="mono">node_modules</span>. There is
                nothing to sign and no attribution page to build. The only time you act is if you
                <em> vendor or fork</em> the source.
              </p>
              <ol className="hb-toc" style={{ marginTop: 8 }}>
                {L.apply.map((s) => (
                  <li key={s.title} style={{ marginBottom: 10 }}>
                    <strong style={{ color: "var(--fg)" }}>{s.title}.</strong>{" "}
                    <span style={{ color: "var(--muted)" }}>{s.detail}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={80}>
              <CodeBlock
                label="package.json"
                lang="json"
                code={`{
  "name": "@lacspace/seo",
  "version": "1.6.2",
  "license": "SEE LICENSE IN LICENSE",
  "files": ["dist", "LICENSE", "README.md"]
}

// SPDX-style reference: ${L.spdxId}`}
              />
            </Reveal>
          </div>
        </section>

        {/* Ecosystems */}
        <section className="sec">
          <Reveal className="sec-head center">
            <div className="eyebrow">One licence, every language</div>
            <h2>Where it applies</h2>
            <p>The same licence covers our npm packages today and the registries we publish to next.</p>
          </Reveal>
          <Reveal className="chips" style={{ justifyContent: "center" }}>
            {L.ecosystems.map((e) => (
              <span key={e.label} style={{ opacity: e.status === "live" ? 1 : 0.6 }}>
                {e.status === "live" ? "● " : "○ "}{e.label}
                <span style={{ color: "var(--faint)", marginLeft: 6, fontSize: 11 }}>
                  {e.status === "live" ? "live" : "planned"}
                </span>
              </span>
            ))}
          </Reveal>
        </section>

        {/* Full text */}
        <section className="sec">
          <Reveal className="sec-head center">
            <div className="eyebrow">The whole thing</div>
            <h2>Full licence text</h2>
            <p>Verbatim and canonical. Copy it, or grab the <a href="/licenses/lacspace-free-1.0/text">raw text</a>.</p>
          </Reveal>
          <Reveal>
            <CodeBlock label="LICENSE" lang="text" code={L.fullText} />
          </Reveal>
        </section>

        {/* FAQ */}
        <section className="sec">
          <Reveal className="sec-head center">
            <div className="eyebrow">FAQ</div>
            <h2>Common questions</h2>
          </Reveal>
          <div className="grid">
            {L.faq.map((f, i) => (
              <Reveal key={f.q} delay={(i % 2) * 50} className="kit">
                <div className="kit-head"><h3 style={{ fontSize: 16 }}>{f.q}</h3></div>
                <p style={{ marginBottom: 0 }}>{f.a}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA — point to full centre for other tiers */}
        <Reveal className="cta-band">
          <div className="eyebrow">Need a different tier?</div>
          <h2>This is the <span className="grad">free</span> tier</h2>
          <p>
            The Lacspace Free Licence covers the packages we publish openly. Commercial, client and
            private tiers — for products, bespoke work and company-internal code — live in the full
            Licence Centre on lacspace.com.
          </p>
          <div className="cta" style={{ justifyContent: "center" }}>
            <a className="btn btn-primary" href="/packages">Browse the packages →</a>
            <a className="btn btn-ghost" href="https://lacspace.com/licenses" target="_blank" rel="noopener">Full Licence Centre ↗</a>
          </div>
        </Reveal>
      </main>

      <DevFooter />
    </>
  );
}
