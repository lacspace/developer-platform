import { DevHeader } from "../components/dev-header";
import { DevFooter } from "../components/dev-footer";
import { Playground } from "./playground";
import { site } from "../lib/seo";

const seo = site.page({
  title: "Live Playground",
  path: "/playground",
  description:
    "Run @lacspace packages live in your browser — slugify, money, case, humanize, color and id. Type an input, see the real output. Zero setup.",
});
export const metadata = seo.metadata;

export default function PlaygroundPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }}
      />
      <div className="aurora" />
      <div className="grid-bg" />
      <DevHeader />
      <main className="wrap">
        <section className="sec" style={{ paddingTop: 56 }}>
          <div className="sec-head center">
            <div className="eyebrow">Live Playground</div>
            <h2>
              Run <span className="grad">any package</span>, right here
            </h2>
            <p>
              An open sandbox: write code against <strong style={{ color: "var(--fg)" }}>any</strong> of
              the 76 packages — loaded live from a CDN — and run it in your
              browser. Or poke at the instant demos below. Nothing is sent to a
              server; it all runs on your machine.
            </p>
          </div>
          <Playground />
          <div className="cta" style={{ marginTop: 34, justifyContent: "center" }}>
            <a className="btn btn-primary" href="/packages">See all 76 packages →</a>
            <a className="btn btn-ghost" href="/handbook">Read the handbook</a>
          </div>
        </section>
      </main>
      <DevFooter />
    </>
  );
}
