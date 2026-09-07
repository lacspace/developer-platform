import { DevHeader } from "../../../components/dev-header";
import { DevFooter } from "../../../components/dev-footer";
import { Reveal } from "../../../components/reveal";
import { site } from "../../../lib/seo";
import { TRY_CSS } from "../../try-css";
import { HttpTry } from "./http-try";

const seo = site.page({
  title: "Try lacspace-http live",
  path: "/tools/http/try",
  description:
    "Send an HTTP request from your browser — pick a method, URL, headers and body and see the status, timing and response. Runs the real lacspace-http engine server-side, SSRF-guarded.",
  keywords: ["http", "http-client", "rest-client", "api-client", "curl", "live", "playground", "tester"],
});
export const metadata = seo.metadata;

export default function HttpTryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }} />
      <style dangerouslySetInnerHTML={{ __html: TRY_CSS }} />
      <div className="aurora" />
      <div className="grid-bg" />
      <DevHeader />

      <main className="wrap">
        <section className="hero" style={{ paddingBottom: 8 }}>
          <Reveal><a href="/tools/http" className="pd-back">← lacspace-http</a></Reveal>
          <Reveal delay={40}><span className="pill" style={{ marginTop: 14 }}><span className="live" /> Live · runs the real engine</span></Reveal>
          <Reveal delay={80}><h1>Try <span className="grad">http</span> live</h1></Reveal>
          <Reveal delay={120}>
            <p className="sub">
              Pick a method, URL, headers and body, and send. It calls the real{" "}
              <span className="mono">lacspace-http</span> engine server-side — the same
              output you&apos;d get from the CLI.
            </p>
          </Reveal>
        </section>

        <section className="sec" style={{ paddingTop: 24 }}>
          <Reveal><HttpTry /></Reveal>
          <p className="pt-note">
            This tester is SSRF-guarded — it can&apos;t reach localhost or private
            networks, is rate-limited and caps the response at 2&nbsp;MB. Run{" "}
            <span className="mono">lacspace-http</span> locally to hit your own services,
            run a <span className="mono">.http</span> file with assertions, and chain tokens.
          </p>
        </section>

        <section className="sec">
          <Reveal className="cta" style={{ justifyContent: "center" }}>
            <a className="btn btn-primary" href="https://www.npmjs.com/package/lacspace-http" target="_blank" rel="noopener">Install from npm ↗</a>
            <a className="btn btn-ghost" href="/tools/http">Read the full docs</a>
          </Reveal>
        </section>
      </main>

      <DevFooter />
    </>
  );
}
