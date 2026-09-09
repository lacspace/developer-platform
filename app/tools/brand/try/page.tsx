import { DevHeader } from "../../../components/dev-header";
import { DevFooter } from "../../../components/dev-footer";
import { Reveal } from "../../../components/reveal";
import { site } from "../../../lib/seo";
import { TRY_CSS } from "../../try-css";
import { BrandTry } from "./brand-try";

const seo = site.page({
  title: "Lacspace Brand Center — the mark, animations & installable icons",
  path: "/tools/brand/try",
  description:
    "Preview and download the official Lacspace mark in every colour variant, play the signature self-crafting animation (and pulse/float/reveal/shimmer), grab installable favicon / PWA app-icon code, and copy the palette. Powered by @lacspace/brand — zero-dep, runs in your browser.",
  keywords: [
    "lacspace brand",
    "brand center",
    "logo animation",
    "animated svg logo",
    "favicon generator",
    "pwa app icon",
    "brand assets",
    "lottie logo",
    "brand guidelines",
    "live",
  ],
});
export const metadata = seo.metadata;

export default function BrandTryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }} />
      <style dangerouslySetInnerHTML={{ __html: TRY_CSS }} />
      <div className="aurora" />
      <div className="grid-bg" />
      <DevHeader />

      <main className="wrap">
        <section className="hero" style={{ paddingBottom: 8 }}>
          <Reveal><a href="/packages/brand" className="pd-back">← @lacspace/brand</a></Reveal>
          <Reveal delay={40}><span className="pill" style={{ marginTop: 14 }}><span className="live" /> Live · runs in your browser · zero-dep</span></Reveal>
          <Reveal delay={80}><h1>Lacspace <span className="grad">Brand Center</span></h1></Reveal>
          <Reveal delay={120}>
            <p className="sub">
              The official Lacspace mark, for everyone to use. Play the signature{" "}
              <span className="mono">self-crafting</span> animation, pick any colour variant, grab{" "}
              <span className="mono">installable</span> favicon / PWA app-icon code, and copy the palette —
              all from <span className="mono">@lacspace/brand</span>, entirely client-side.
            </p>
          </Reveal>
        </section>

        <section className="sec" style={{ paddingTop: 20 }}>
          <Reveal><BrandTry /></Reveal>
          <p className="pt-note">
            Free to reference and integrate with Lacspace — the marks may not be altered or used to imply
            endorsement. See the <a href="https://lacspace.com/brand" target="_blank" rel="noopener">Brand Usage Licence</a>.
            The pixel-exact master artwork, Lottie motion and full favicon set ship bundled in the package.
          </p>
        </section>

        <section className="sec">
          <Reveal className="cta" style={{ justifyContent: "center" }}>
            <a className="btn btn-primary" href="https://www.npmjs.com/package/@lacspace/brand" target="_blank" rel="noopener">Install @lacspace/brand ↗</a>
            <a className="btn btn-ghost" href="/packages/brand">Read the docs</a>
            <a className="btn btn-ghost" href="/tools/studio/try">Logo &amp; Image Studio →</a>
          </Reveal>
        </section>
      </main>

      <DevFooter />
    </>
  );
}
