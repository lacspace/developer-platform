import { DevHeader } from "../../../components/dev-header";
import { DevFooter } from "../../../components/dev-footer";
import { Reveal } from "../../../components/reveal";
import { site } from "../../../lib/seo";
import { TRY_CSS } from "../../try-css";
import { SchemaTry } from "./schema-try";

const seo = site.page({
  title: "Try lacspace-schema live",
  path: "/tools/schema/try",
  description:
    "Infer a JSON Schema from data, generate TypeScript types, or build an example from a schema — right in your browser. Runs the real lacspace-schema engine client-side, nothing is uploaded.",
  keywords: ["json schema", "json to typescript", "infer schema", "codegen", "live", "playground", "tester"],
});
export const metadata = seo.metadata;

export default function SchemaTryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }} />
      <style dangerouslySetInnerHTML={{ __html: TRY_CSS }} />
      <div className="aurora" />
      <div className="grid-bg" />
      <DevHeader />

      <main className="wrap">
        <section className="hero" style={{ paddingBottom: 8 }}>
          <Reveal><a href="/tools/schema" className="pd-back">← lacspace-schema</a></Reveal>
          <Reveal delay={40}><span className="pill" style={{ marginTop: 14 }}><span className="live" /> Live · runs in your browser</span></Reveal>
          <Reveal delay={80}><h1>Try <span className="grad">schema</span> live</h1></Reveal>
          <Reveal delay={120}>
            <p className="sub">
              Paste a JSON response and infer a draft-07 schema, generate TypeScript
              types, or turn a schema into an example — the real{" "}
              <span className="mono">lacspace-schema</span> engine, entirely in your browser.
            </p>
          </Reveal>
        </section>

        <section className="sec" style={{ paddingTop: 24 }}>
          <Reveal><SchemaTry /></Reveal>
          <p className="pt-note">
            Runs client-side, so nothing is uploaded. Locally you also get NDJSON + glob
            inputs, schema→TS with $ref, and a breaking-change schema diff for CI.
          </p>
        </section>

        <section className="sec">
          <Reveal className="cta" style={{ justifyContent: "center" }}>
            <a className="btn btn-primary" href="https://www.npmjs.com/package/lacspace-schema" target="_blank" rel="noopener">Install from npm ↗</a>
            <a className="btn btn-ghost" href="/tools/schema">Read the full docs</a>
          </Reveal>
        </section>
      </main>

      <DevFooter />
    </>
  );
}
