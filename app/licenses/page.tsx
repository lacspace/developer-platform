import { DevHeader } from "../components/dev-header";
import { DevFooter } from "../components/dev-footer";
import { Reveal } from "../components/reveal";
import { site } from "../lib/seo";
import { FREE_LICENCE as L } from "../lib/licence";

const seo = site.page({
  title: "Licence",
  path: "/licenses",
  description:
    "Every openly published @lacspace package ships under the Lacspace Free Licence v1.0 — a free, permissive, MIT-equivalent licence. Use it in personal and commercial projects at no cost.",
});
export const metadata = seo.metadata;

const TIERS = [
  { badge: "Free", name: "Lacspace Free Licence", note: "The openly published @lacspace packages.", href: "/licenses/lacspace-free-1.0", live: true },
  { badge: "Commercial", name: "Commercial Licence", note: "Lacspace products sold to businesses.", href: "https://lacspace.com/licenses", live: false },
  { badge: "Client", name: "Client Licence", note: "Bespoke software built for a client.", href: "https://lacspace.com/licenses", live: false },
  { badge: "Private", name: "Private Licence", note: "Company-internal, unpublished code.", href: "https://lacspace.com/licenses", live: false },
];

export default function LicensesHub() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }} />
      <div className="aurora" />
      <div className="grid-bg" />
      <DevHeader />

      <main className="wrap">
        <section className="sec" style={{ paddingTop: 48 }}>
          <Reveal className="sec-head center">
            <div className="eyebrow">Licence</div>
            <h1>Free to build with. <span className="grad">Forever.</span></h1>
            <p>
              Every package you install from the public <span className="mono">@lacspace</span> scope
              ships under the <strong style={{ color: "var(--fg)" }}>Lacspace Free Licence v1.0</strong> —
              a permissive, MIT-equivalent licence. Use it in personal and commercial products at no cost;
              just keep the notice.
            </p>
          </Reveal>

          <Reveal className="stats" style={{ marginTop: 8, marginBottom: 8 }}>
            <div className="stat"><b className="grad">Free</b><span>for any use</span></div>
            <div className="stat"><b className="grad">MIT</b><span>equivalent</span></div>
            <div className="stat"><b className="grad">63</b><span>packages covered</span></div>
            <div className="stat"><b className="grad">1</b><span>condition: keep notice</span></div>
          </Reveal>

          {/* The free licence, front and centre */}
          <Reveal className="callout" style={{ marginTop: 18 }}>
            <div className="kit-head">
              <span className="ic" aria-hidden style={{ color: "#34D399" }}>✓</span>
              <h3>{L.name} v{L.version}</h3>
            </div>
            <p>{L.tagline} {L.summary}</p>
            <div className="cta" style={{ marginTop: 14 }}>
              <a className="btn btn-primary" href="/licenses/lacspace-free-1.0">Read the licence →</a>
              <a className="btn btn-ghost" href="/licenses/lacspace-free-1.0/text">Raw text</a>
            </div>
          </Reveal>
        </section>

        {/* The tiers — free is live here, the rest on lacspace.com */}
        <section className="sec">
          <Reveal className="sec-head center">
            <div className="eyebrow">The landscape</div>
            <h2>One free tier here — the rest in the full Centre</h2>
            <p>
              Lacspace&apos;s licensing spans four tiers. Only the free one governs the open packages, so
              it lives here; commercial, client and private tiers are on the full Licence Centre.
            </p>
          </Reveal>
          <div className="grid">
            {TIERS.map((t, i) => (
              <Reveal key={t.badge} delay={(i % 2) * 50} className="kit">
                <div className="kit-head">
                  <span className="pill" style={{ padding: "2px 10px", fontSize: 12 }}>{t.badge}</span>
                  <h3>{t.name}</h3>
                </div>
                <p>{t.note}</p>
                <a className="open" href={t.href} {...(t.live ? {} : { target: "_blank", rel: "noopener" })}
                  style={{ fontSize: 14, fontWeight: 580, color: "var(--fg)" }}>
                  {t.live ? "Read it here" : "On lacspace.com"} {t.live ? "→" : "↗"}
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal className="cta-band">
          <div className="eyebrow">Start building</div>
          <h2>Free, permissive, <span className="grad">yours to ship</span></h2>
          <p>Install any package and you already comply. The licence travels with the code.</p>
          <div className="cta" style={{ justifyContent: "center" }}>
            <a className="btn btn-primary" href="/packages">Browse the packages →</a>
            <a className="btn btn-ghost" href="/licenses/lacspace-free-1.0">Read the Free Licence</a>
          </div>
        </Reveal>
      </main>

      <DevFooter />
    </>
  );
}
