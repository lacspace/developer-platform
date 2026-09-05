import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { graph, softwareSourceCode, breadcrumb } from "@lacspace/seo";
import { DevHeader } from "../../components/dev-header";
import { DevFooter } from "../../components/dev-footer";
import { CodeBlock } from "../../components/code-block";
import { InstallBox } from "../../components/install-box";
import { CATALOG } from "../../lib/catalog";
import { DETAILS } from "../../lib/pkg-detail";
import { site } from "../../lib/seo";

const FLAT = CATALOG.flatMap((g) => g.items.map((p) => ({ ...p, group: g.group, icon: g.icon })));
const find = (slug: string) => FLAT.find((p) => p.n === slug);

const DEMOABLE = new Set(["slugify", "money", "case", "humanize", "color", "id", "validate", "crypto", "jwt", "otp", "password", "markdown", "redact", "csv"]);

export function generateStaticParams() {
  return FLAT.map((p) => ({ slug: p.n }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = find(slug);
  if (!p) return {};
  return site.meta({
    title: `@lacspace/${slug}`,
    path: `/packages/${slug}`,
    description: p.d,
    keywords: p.kw,
  });
}

export default async function PackagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = find(slug);
  if (!p) notFound();
  const detail = DETAILS[slug] ?? { exports: [], usage: "" };
  const related = FLAT.filter((r) => r.group === p.group && r.n !== p.n).slice(0, 6);

  const jsonLd = graph(
    softwareSourceCode({
      name: `@lacspace/${slug}`,
      description: p.d,
      codeRepository: "https://github.com/lacspace/npm-packages",
      programmingLanguage: "TypeScript",
      runtimePlatform: "Node.js, browser, edge",
      license: "https://lacspace.com/licenses/lacspace-free-1.0",
      url: `https://developer.lacspace.com/packages/${slug}`,
    }),
    breadcrumb([
      { name: "Packages", url: "https://developer.lacspace.com/packages" },
      { name: `@lacspace/${slug}`, url: `https://developer.lacspace.com/packages/${slug}` },
    ])
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="aurora" />
      <DevHeader />
      <main className="wrap">
        <section className="sec" style={{ paddingTop: 40, maxWidth: 860, marginInline: "auto" }}>
          <a href="/packages" className="pd-back">← All packages</a>

          <div className="pd-head">
            <span className="pd-icon" aria-hidden>{p.icon}</span>
            <div>
              <h1 className="pd-name">@lacspace/{p.n}</h1>
              <div className="pd-meta">
                <span className="pd-chip">v{p.v}</span>
                <a href={`/packages?kit=${encodeURIComponent(p.group)}`} className="pd-chip">{p.group}</a>
                <span className={"pk-badge" + (p.deps === 0 ? " zero" : "")}>{p.deps === 0 ? "0 deps" : `${p.deps} @lacspace dep${p.deps > 1 ? "s" : ""}`}</span>
              </div>
            </div>
          </div>

          <p className="pd-desc">{p.d}</p>

          <InstallBox pkg={p.n} />

          <div className="pd-actions">
            <a className="btn btn-primary" href={`https://www.npmjs.com/package/@lacspace/${p.n}`} target="_blank" rel="noopener">View on npm ↗</a>
            {DEMOABLE.has(p.n) && <a className="btn btn-ghost" href="/playground">Try in the playground →</a>}
            <a className="btn btn-ghost" href="https://github.com/lacspace/npm-packages" target="_blank" rel="noopener">GitHub ↗</a>
          </div>

          {detail.usage && (
            <div style={{ marginTop: 30 }}>
              <h2 className="pd-h2">Usage</h2>
              <CodeBlock code={detail.usage} label={`${p.n}.ts`} lang="ts" />
            </div>
          )}

          {detail.exports.length > 0 && (
            <div style={{ marginTop: 30 }}>
              <h2 className="pd-h2">Exports <span className="pd-count">{detail.exports.length}</span></h2>
              <div className="pd-exports">
                {detail.exports.map((e) => <code key={e}>{e}</code>)}
              </div>
            </div>
          )}

          {p.kw.length > 0 && (
            <div style={{ marginTop: 26 }}>
              <h2 className="pd-h2">Keywords</h2>
              <div className="pk-kw">{p.kw.map((k) => <span key={k}>{k}</span>)}</div>
            </div>
          )}

          {related.length > 0 && (
            <div style={{ marginTop: 34 }}>
              <h2 className="pd-h2">More in {p.group}</h2>
              <div className="grid">
                {related.map((r) => (
                  <a key={r.n} href={`/packages/${r.n}`} className="kit" style={{ padding: 16, display: "block" }}>
                    <span className="pk" style={{ fontSize: 13.5, color: "#e9d5ff" }}>@lacspace/{r.n}</span>
                    <p style={{ color: "var(--muted)", fontSize: 12.5, margin: "6px 0 0" }}>{r.d}</p>
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="cta" style={{ marginTop: 40, justifyContent: "center" }}>
            <a className="btn btn-ghost" href="/packages">← Browse all 80 packages</a>
            <a className="btn btn-ghost" href="/handbook">Read the handbook</a>
          </div>
        </section>
      </main>
      <DevFooter />
    </>
  );
}
