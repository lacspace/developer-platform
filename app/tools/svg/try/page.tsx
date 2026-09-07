import { DevHeader } from "../../../components/dev-header";
import { DevFooter } from "../../../components/dev-footer";
import { Reveal } from "../../../components/reveal";
import { site } from "../../../lib/seo";
import { TRY_CSS } from "../../try-css";
import { SvgTry } from "./svg-try";

const seo = site.page({
  title: "Try lacspace-svg live",
  path: "/tools/svg/try",
  description:
    "Optimize an SVG, convert it to a React/JSX component, or turn it into a data: URI — right in your browser. Runs the real lacspace-svg engine.",
  keywords: ["svg", "svgo", "svg optimizer", "svg to jsx", "data uri", "live", "playground", "tester"],
});
export const metadata = seo.metadata;

export default function SvgTryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }} />
      <style dangerouslySetInnerHTML={{ __html: TRY_CSS }} />
      <div className="aurora" />
      <div className="grid-bg" />
      <DevHeader />

      <main className="wrap">
        <section className="hero" style={{ paddingBottom: 8 }}>
          <Reveal><a href="/tools/svg" className="pd-back">← lacspace-svg</a></Reveal>
          <Reveal delay={40}><span className="pill" style={{ marginTop: 14 }}><span className="live" /> Live · runs the real engine</span></Reveal>
          <Reveal delay={80}><h1>Try <span className="grad">svg</span> live</h1></Reveal>
          <Reveal delay={120}>
            <p className="sub">
              Paste an SVG and optimize it, turn it into a React component, or encode it
              as a <span className="mono">data:</span> URI — powered by the real{" "}
              <span className="mono">lacspace-svg</span> engine.
            </p>
          </Reveal>
        </section>

        <section className="sec" style={{ paddingTop: 24 }}>
          <Reveal><SvgTry /></Reveal>
          <p className="pt-note">
            Locally you also get the sprite builder, folder globs, a safety inspector and
            stdin piping — and it runs offline in your CI.
          </p>
        </section>

        <section className="sec">
          <Reveal className="cta" style={{ justifyContent: "center" }}>
            <a className="btn btn-primary" href="https://www.npmjs.com/package/lacspace-svg" target="_blank" rel="noopener">Install from npm ↗</a>
            <a className="btn btn-ghost" href="/tools/svg">Read the full docs</a>
          </Reveal>
        </section>
      </main>

      <DevFooter />
    </>
  );
}
