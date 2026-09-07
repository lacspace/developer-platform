import { DevHeader } from "../../../components/dev-header";
import { DevFooter } from "../../../components/dev-footer";
import { Reveal } from "../../../components/reveal";
import { site } from "../../../lib/seo";
import { TRY_CSS } from "../../try-css";
import { FakeTry } from "./fake-try";

const seo = site.page({
  title: "Try lacspace-fake live",
  path: "/tools/fake/try",
  description:
    "Generate realistic fake / seed data in your browser — describe fields and get JSON, NDJSON, CSV or SQL inserts. Deterministic with a seed, Nepal-aware. Runs the real engine client-side.",
  keywords: ["fake-data", "seed-data", "mock-data", "sql-insert", "faker", "live", "playground", "tester"],
});
export const metadata = seo.metadata;

export default function FakeTryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }} />
      <style dangerouslySetInnerHTML={{ __html: TRY_CSS }} />
      <div className="aurora" />
      <div className="grid-bg" />
      <DevHeader />

      <main className="wrap">
        <section className="hero" style={{ paddingBottom: 8 }}>
          <Reveal><a href="/tools/fake" className="pd-back">← lacspace-fake</a></Reveal>
          <Reveal delay={40}><span className="pill" style={{ marginTop: 14 }}><span className="live" /> Live · runs in your browser</span></Reveal>
          <Reveal delay={80}><h1>Try <span className="grad">fake</span> live</h1></Reveal>
          <Reveal delay={120}>
            <p className="sub">
              Describe a few fields and generate realistic rows as JSON, CSV or SQL
              inserts. Same seed, same output — it runs the real{" "}
              <span className="mono">lacspace-fake</span> engine right in your browser.
            </p>
          </Reveal>
        </section>

        <section className="sec" style={{ paddingTop: 24 }}>
          <Reveal><FakeTry /></Reveal>
          <p className="pt-note">
            Runs client-side, capped at 200 rows here. Locally there&apos;s no cap, plus a
            JSON-schema file mode, 60+ generators and the <span className="mono">list</span> command.
          </p>
        </section>

        <section className="sec">
          <Reveal className="cta" style={{ justifyContent: "center" }}>
            <a className="btn btn-primary" href="https://www.npmjs.com/package/lacspace-fake" target="_blank" rel="noopener">Install from npm ↗</a>
            <a className="btn btn-ghost" href="/tools/fake">Read the full docs</a>
          </Reveal>
        </section>
      </main>

      <DevFooter />
    </>
  );
}
