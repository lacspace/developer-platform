import { DevHeader } from "../../../components/dev-header";
import { DevFooter } from "../../../components/dev-footer";
import { Reveal } from "../../../components/reveal";
import { site } from "../../../lib/seo";
import { TRY_CSS } from "../../try-css";
import { StudioTry } from "./studio-try";

const seo = site.page({
  title: "Logo & Image Studio — generate logos and backgrounds without AI",
  path: "/tools/studio/try",
  description:
    "Type a brand name + keywords and get on-brand SVG logos instantly — no AI. Plus a gradient/pattern background generator with size-budget export. Runs @lacspace/logo and @lacspace/image entirely in your browser.",
  keywords: [
    "logo generator",
    "logo maker",
    "no ai logo",
    "svg logo",
    "brand mark generator",
    "background generator",
    "og image generator",
    "playground",
    "live",
  ],
});
export const metadata = seo.metadata;

export default function StudioTryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }} />
      <style dangerouslySetInnerHTML={{ __html: TRY_CSS }} />
      <div className="aurora" />
      <div className="grid-bg" />
      <DevHeader />

      <main className="wrap">
        <section className="hero" style={{ paddingBottom: 8 }}>
          <Reveal><a href="/packages/logo" className="pd-back">← @lacspace/logo</a></Reveal>
          <Reveal delay={40}><span className="pill" style={{ marginTop: 14 }}><span className="live" /> Live · runs in your browser · no AI</span></Reveal>
          <Reveal delay={80}><h1>Logo &amp; Image <span className="grad">Studio</span></h1></Reveal>
          <Reveal delay={120}>
            <p className="sub">
              Give a name and a few keywords → get real, on-brand <span className="mono">SVG</span> logos
              in a click, with 12 reproducible concepts. Or generate branded backgrounds and export
              them to a size budget. Powered by <span className="mono">@lacspace/logo</span> and{" "}
              <span className="mono">@lacspace/image</span>, entirely client-side.
            </p>
          </Reveal>
        </section>

        <section className="sec" style={{ paddingTop: 20 }}>
          <Reveal><StudioTry /></Reveal>
          <p className="pt-note">
            Deterministic — the same brief always yields the same logo, so you can reproduce or
            version an identity. Everything runs in your browser; nothing is uploaded.
          </p>
        </section>

        <section className="sec">
          <Reveal className="cta" style={{ justifyContent: "center" }}>
            <a className="btn btn-primary" href="https://www.npmjs.com/package/@lacspace/logo" target="_blank" rel="noopener">Install @lacspace/logo ↗</a>
            <a className="btn btn-ghost" href="/packages/image">@lacspace/image →</a>
            <a className="btn btn-ghost" href="/packages/logo">Read the docs</a>
          </Reveal>
        </section>
      </main>

      <DevFooter />
    </>
  );
}
