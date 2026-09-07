import { DevHeader } from "../../../components/dev-header";
import { DevFooter } from "../../../components/dev-footer";
import { Reveal } from "../../../components/reveal";
import { site } from "../../../lib/seo";
import { TRY_CSS } from "../../try-css";
import { JsonTry } from "./json-try";

const seo = site.page({
  title: "Try lacspace-json live",
  path: "/tools/json/try",
  description:
    "Test lacspace-json in your browser — run a jq-style query, convert between JSON/YAML/TOML/CSV/NDJSON, or validate against a JSON Schema. Runs the real engine entirely client-side, nothing leaves your browser.",
  keywords: ["json", "jq", "yaml", "toml", "csv", "json-schema", "live", "playground", "tester"],
});
export const metadata = seo.metadata;

export default function JsonTryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }} />
      <style dangerouslySetInnerHTML={{ __html: TRY_CSS }} />
      <div className="aurora" />
      <div className="grid-bg" />
      <DevHeader />

      <main className="wrap">
        <section className="hero" style={{ paddingBottom: 8 }}>
          <Reveal><a href="/tools/json" className="pd-back">← lacspace-json</a></Reveal>
          <Reveal delay={40}><span className="pill" style={{ marginTop: 14 }}><span className="live" /> Live · runs in your browser</span></Reveal>
          <Reveal delay={80}><h1>Try <span className="grad">json</span> live</h1></Reveal>
          <Reveal delay={120}>
            <p className="sub">
              Run a jq-style query, convert between formats, or validate against a JSON
              Schema. It runs the real <span className="mono">lacspace-json</span> engine
              entirely in your browser — nothing is uploaded.
            </p>
          </Reveal>
        </section>

        <section className="sec" style={{ paddingTop: 24 }}>
          <Reveal><JsonTry /></Reveal>
          <p className="pt-note">
            This tester runs the published package client-side, so your data never leaves
            your machine. Locally you also get diff, deep-merge, globs and stdin piping.
          </p>
        </section>

        <section className="sec">
          <Reveal className="cta" style={{ justifyContent: "center" }}>
            <a className="btn btn-primary" href="https://www.npmjs.com/package/lacspace-json" target="_blank" rel="noopener">Install from npm ↗</a>
            <a className="btn btn-ghost" href="/tools/json">Read the full docs</a>
          </Reveal>
        </section>
      </main>

      <DevFooter />
    </>
  );
}
