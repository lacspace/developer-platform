import { DevHeader } from "../../../components/dev-header";
import { DevFooter } from "../../../components/dev-footer";
import { Reveal } from "../../../components/reveal";
import { site } from "../../../lib/seo";
import { TRY_CSS } from "../../try-css";
import { QrTry } from "./qr-try";

const seo = site.page({
  title: "Try lacspace-qr live",
  path: "/tools/qr/try",
  description:
    "Generate a QR code in your browser — text, URL or WiFi, with custom colours and error-correction level, exported as SVG. Runs the real lacspace-qr encoder.",
  keywords: ["qr", "qr code", "qr generator", "wifi qr", "svg", "live", "playground", "tester"],
});
export const metadata = seo.metadata;

export default function QrTryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }} />
      <style dangerouslySetInnerHTML={{ __html: TRY_CSS }} />
      <div className="aurora" />
      <div className="grid-bg" />
      <DevHeader />

      <main className="wrap">
        <section className="hero" style={{ paddingBottom: 8 }}>
          <Reveal><a href="/tools/qr" className="pd-back">← lacspace-qr</a></Reveal>
          <Reveal delay={40}><span className="pill" style={{ marginTop: 14 }}><span className="live" /> Live · runs the real encoder</span></Reveal>
          <Reveal delay={80}><h1>Try <span className="grad">qr</span> live</h1></Reveal>
          <Reveal delay={120}>
            <p className="sub">
              Type a URL or WiFi details, pick colours and error-correction, and get a
              scannable QR — rendered by the real <span className="mono">lacspace-qr</span>{" "}
              encoder and downloadable as SVG.
            </p>
          </Reveal>
        </section>

        <section className="sec" style={{ paddingTop: 24 }}>
          <Reveal><QrTry /></Reveal>
          <p className="pt-note">
            The encoder is spec-correct (Reed–Solomon ECC, auto version/mask). Locally you
            also get PNG and terminal output, vCard/SMS/geo presets and batch mode.
          </p>
        </section>

        <section className="sec">
          <Reveal className="cta" style={{ justifyContent: "center" }}>
            <a className="btn btn-primary" href="https://www.npmjs.com/package/lacspace-qr" target="_blank" rel="noopener">Install from npm ↗</a>
            <a className="btn btn-ghost" href="/tools/qr">Read the full docs</a>
          </Reveal>
        </section>
      </main>

      <DevFooter />
    </>
  );
}
