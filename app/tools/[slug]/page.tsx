import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { graph, softwareApp, breadcrumb } from "@lacspace/seo";
import { DevHeader } from "../../components/dev-header";
import { DevFooter } from "../../components/dev-footer";
import { Reveal } from "../../components/reveal";
import { CodeBlock } from "../../components/code-block";
import { site } from "../../lib/seo";
import { TOOLS, getTool } from "../../lib/tools";

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = getTool(slug);
  if (!t) return {};
  return site.meta({
    title: `${t.name} — ${t.tagline}`,
    path: `/tools/${slug}`,
    description: t.summary,
    ...(t.keywords ? { keywords: t.keywords } : {}),
  });
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getTool(slug);
  if (!t) notFound();

  const jsonLd = graph(
    softwareApp({
      name: t.name,
      operatingSystem: "Node.js, Web",
      category: "DeveloperApplication",
      price: 0,
      currency: "USD",
    }),
    breadcrumb([
      { name: "Tools", url: "https://developer.lacspace.com/tools" },
      { name: t.name, url: `https://developer.lacspace.com/tools/${slug}` },
    ]),
  );

  const isLive = t.status === "live";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="aurora" />
      <div className="grid-bg" />
      <DevHeader />

      <main className="wrap">
        <section className="hero" style={{ paddingBottom: 8 }}>
          <Reveal>
            <a href="/tools" className="pd-back">← All tools</a>
          </Reveal>
          <Reveal delay={40}>
            <div style={{ fontSize: 52, marginTop: 14 }} aria-hidden>{t.icon}</div>
          </Reveal>
          <Reveal delay={80}>
            <h1 style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: "clamp(1.9rem,5vw,3rem)" }}>{t.name}</h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="sub">{t.tagline}</p>
          </Reveal>
          <Reveal delay={160}>
            <div className="cta" style={{ gap: 8 }}>
              <span className={"tool-badge " + (isLive ? "live" : "soon")} style={{ padding: "5px 12px", borderRadius: 999, border: "1px solid var(--hairline-2)" }}>
                {isLive ? `● Live${t.version ? ` · v${t.version}` : ""}` : "○ Coming soon"}
              </span>
              {t.links?.map((l) => (
                <a key={l.label} className="btn btn-ghost" href={l.href} {...(l.external ? { target: "_blank", rel: "noopener" } : {})}>{l.label}{l.external ? " ↗" : ""}</a>
              ))}
            </div>
          </Reveal>
          {isLive && t.install && (
            <Reveal delay={200} style={{ maxWidth: 680, margin: "22px auto 0" }}>
              <CodeBlock label="terminal" code={t.install} />
            </Reveal>
          )}
        </section>

        {/* Summary */}
        <section className="sec" style={{ paddingTop: 40 }}>
          <Reveal className="sec-head center">
            <div className="eyebrow">What it does</div>
            <h2>{isLive ? "Everything, in one command" : "What we're building"}</h2>
            <p>{t.about ?? t.summary}</p>
          </Reveal>
        </section>

        {/* Features */}
        <section className="sec" style={{ paddingTop: 8 }}>
          <Reveal className="sec-head center">
            <div className="eyebrow">Features</div>
            <h2>What&apos;s <span className="grad">inside</span></h2>
          </Reveal>
          <div className="kits">
            {t.features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 50} className="kit">
                <div className="kit-head"><span className="ic" aria-hidden>{f.icon}</span><h3 style={{ fontSize: 16 }}>{f.title}</h3></div>
                <p style={{ marginBottom: 0 }}>{f.desc}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* How to use */}
        {isLive && t.examples.length > 0 && (
          <section className="sec">
            <Reveal className="sec-head center">
              <div className="eyebrow">How to use</div>
              <h2>Copy, paste, <span className="grad">done</span></h2>
              <p>Real commands and snippets — from a one-liner to the typed library.</p>
            </Reveal>
            <div style={{ maxWidth: 820, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
              {t.examples.map((ex, i) => (
                <Reveal key={ex.label} delay={(i % 2) * 40}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fg)", marginBottom: 8 }}>{ex.label}</div>
                  <CodeBlock label={ex.code.includes("import ") ? "typescript" : "terminal"} code={ex.code} />
                  {ex.note && <p style={{ fontSize: 13, color: "var(--faint)", marginTop: 8 }}>{ex.note}</p>}
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Use cases */}
        <section className="sec">
          <Reveal className="sec-head center">
            <div className="eyebrow">Good for</div>
            <h2>What people build with it</h2>
          </Reveal>
          <div className="grid">
            {t.useCases.map((u, i) => (
              <Reveal key={u} delay={(i % 3) * 50} className="kit" style={{ padding: 18 }}>
                <p style={{ margin: 0, color: "var(--fg)", fontWeight: 550 }}>✓ {u}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <Reveal className="cta-band">
          {isLive ? (
            <>
              <div className="eyebrow">Start now</div>
              <h2>Run <span className="grad mono">{t.name}</span> today</h2>
              <p>Free, open-source, no API keys. It&apos;s a CLI and a typed library.</p>
              {t.install && (
                <div style={{ maxWidth: 620, margin: "18px auto 0" }}>
                  <CodeBlock label="terminal" code={t.install} />
                </div>
              )}
              <div className="cta" style={{ justifyContent: "center", marginTop: 18 }}>
                {t.links?.map((l) => (
                  <a key={l.label} className="btn btn-primary" href={l.href} {...(l.external ? { target: "_blank", rel: "noopener" } : {})}>{l.label}{l.external ? " ↗" : ""}</a>
                ))}
                <a className="btn btn-ghost" href="/tools">All tools →</a>
              </div>
            </>
          ) : (
            <>
              <div className="eyebrow">Coming soon</div>
              <h2><span className="grad mono">{t.name}</span> is on the way</h2>
              <p>It&apos;s on the roadmap. In the meantime, explore the tools that are live today.</p>
              <div className="cta" style={{ justifyContent: "center", marginTop: 18 }}>
                <a className="btn btn-primary" href="/tools">See live tools →</a>
              </div>
            </>
          )}
        </Reveal>
      </main>

      <DevFooter />
    </>
  );
}
