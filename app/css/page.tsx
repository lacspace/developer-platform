import { DevHeader } from "../components/dev-header";
import { DevFooter } from "../components/dev-footer";
import { Reveal } from "../components/reveal";
import { CodeBlock } from "../components/code-block";
import { CssBuilder } from "./builder";
import { site } from "../lib/seo";

const seo = site.page({
  title: "CSS CDN",
  path: "/css",
  description:
    "The Lacspace component kit as one <link> tag — themed at the edge. Pick an accent, radius, typeface and dark-mode strategy, include only the families you use, and get a stylesheet URL. No npm, no bundler, no build step: works in plain HTML, WordPress, Rails, Django, Laravel, Astro or anything else that can serve a page.",
});
export const metadata = seo.metadata;

const SNIPPETS: { label: string; lang: string; code: string }[] = [
  {
    label: "html",
    lang: "html",
    code: `<link rel="stylesheet" href="https://developer.lacspace.com/css/v1?accent=%2300b894&radius=12">

<button class="lac lac-btn" data-variant="solid">Save changes</button>
<span class="lac lac-badge" data-tone="success" data-variant="soft">Live</span>`,
  },
  {
    label: "wordpress (functions.php)",
    lang: "php",
    code: `add_action( 'wp_enqueue_scripts', function () {
  wp_enqueue_style(
    'lacspace',
    'https://developer.lacspace.com/css/v1?accent=%237c3aed&radius=14&dark=class',
    [],
    null
  );
} );`,
  },
  {
    label: "rails / erb",
    lang: "html",
    code: `<%= stylesheet_link_tag "https://developer.lacspace.com/css/v1?accent=%23ec4899&only=form,overlay",
      media: "all", "data-turbo-track": "reload" %>`,
  },
  {
    label: "next.js / react",
    lang: "tsx",
    code: `// app/layout.tsx — no install needed for the styles
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://developer.lacspace.com/css/v1?dark=class" />
      </head>
      <body>{children}</body>
    </html>
  );
}`,
  },
];

const PARAMS: [string, string, string][] = [
  ["accent", "#hex", "Brand colour. Hover, active, soft, ring and the label colour on top are derived from it — the label flips to dark or light by luminance so it stays readable."],
  ["radius", "0–40", "Corner radius in px. The small, large and extra-large steps scale with it."],
  ["control", "24–72", "Height of a medium control in px. Small and large scale with it."],
  ["font", "system · inter · manrope · space-grotesk · dm-sans · sora · serif · mono", "Typeface stack. An allowlist, never your own text."],
  ["webfont", "1", "With a Google font, also emit the @import so you don't need a second tag."],
  ["dark", "media · class · attr · off", "How your app switches to dark. `class` rewrites the kit's theme blocks to a `.dark` class; `off` drops the dark palette entirely and halves the file."],
  ["darkClass", "a class name", "Use with dark=class when your class isn't `dark`."],
  ["only", "overlay,navigation,display,form,layout", "Include only these families. Tokens, buttons, inputs and cards are always in."],
  ["packs", "components,charts,table,date", "Add the chart, data-table or date-picker stylesheets."],
  ["pretty", "1", "Skip minifying, for reading it."],
];

export default function CssCdn() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }} />
      <div className="aurora" />
      <div className="grid-bg" />
      <DevHeader />

      <main className="wrap">
        <section className="sec" style={{ paddingTop: 48, paddingBottom: 12 }}>
          <div className="sec-head center">
            <div className="eyebrow">CSS CDN</div>
            <h2>
              The whole kit, <span className="grad">one link tag</span>
            </h2>
            <p>
              The component library is built entirely on CSS variables, so a theme is just one more
              block of declarations — which means we can generate a stylesheet that already wears
              your brand and serve it from a URL. No npm, no bundler, no build step. Paste one tag
              into plain HTML, WordPress, Rails, Django, Laravel or anything else that serves a page.
            </p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: 8 }}>
          <CssBuilder />
        </section>

        <section className="sec">
          <Reveal className="sec-head">
            <div className="eyebrow">Drop it in</div>
            <h2>
              Anywhere that can serve <span className="grad">a page</span>
            </h2>
            <p>
              Components are plain markup: a class and a few <code>data-*</code> attributes. That is
              the whole API when you use it this way — no JavaScript is loaded or required.
            </p>
          </Reveal>
          <div className="grid" style={{ gap: 16 }}>
            {SNIPPETS.map((s) => (
              <Reveal key={s.label}>
                <CodeBlock label={s.label} lang={s.lang} code={s.code} />
              </Reveal>
            ))}
          </div>
        </section>

        <section className="sec">
          <Reveal className="sec-head">
            <div className="eyebrow">Parameters</div>
            <h2>
              Every knob, <span className="grad">and what it does</span>
            </h2>
            <p>
              Anything unrecognised is ignored and falls back to the default — a malformed value can
              never end up inside the stylesheet.
            </p>
          </Reveal>
          <Reveal className="cdn-scroll">
            <table className="cdn-params">
              <thead>
                <tr>
                  <th scope="col">Parameter</th>
                  <th scope="col">Values</th>
                  <th scope="col">What it does</th>
                </tr>
              </thead>
              <tbody>
                {PARAMS.map(([name, values, what]) => (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{values}</td>
                    <td>{what}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </section>

        <section className="sec">
          <Reveal className="sec-head">
            <div className="eyebrow">The fine print</div>
            <h2>
              What you can <span className="grad">rely on</span>
            </h2>
          </Reveal>
          <div className="grid" style={{ gap: 16 }}>
            <Reveal className="kit" style={{ padding: 18 }}>
              <h3 style={{ fontSize: "1.05rem" }}>v1 will not break your page</h3>
              <p style={{ color: "var(--muted)", fontSize: 13.5, marginTop: 6, lineHeight: 1.6 }}>
                The <code>v1</code> in the path pins the major version of the kit. The bytes behind a
                given query string can gain fixes, but nothing that already works will stop working.
                A breaking change would arrive as <code>v2</code>, at its own URL.
              </p>
            </Reveal>
            <Reveal className="kit" style={{ padding: 18 }}>
              <h3 style={{ fontSize: "1.05rem" }}>Cached, and cheap to re-fetch</h3>
              <p style={{ color: "var(--muted)", fontSize: 13.5, marginTop: 6, lineHeight: 1.6 }}>
                Every response carries an <code>ETag</code> and long edge-cache headers, so repeat
                visits answer <code>304</code> with no body. The response depends only on the query
                string, so two sites asking for the same theme share the same cached object.
              </p>
            </Reveal>
            <Reveal className="kit" style={{ padding: 18 }}>
              <h3 style={{ fontSize: "1.05rem" }}>Nothing you send reaches the CSS</h3>
              <p style={{ color: "var(--muted)", fontSize: 13.5, marginTop: 6, lineHeight: 1.6 }}>
                Colours are parsed as hex, sizes as bounded integers, fonts and modes matched against
                an allowlist. Every declaration is re-emitted from our own literals, so a stylesheet
                served from this domain can never be made to carry someone else&rsquo;s rules.
              </p>
            </Reveal>
            <Reveal className="kit" style={{ padding: 18 }}>
              <h3 style={{ fontSize: "1.05rem" }}>Or install it properly</h3>
              <p style={{ color: "var(--muted)", fontSize: 13.5, marginTop: 6, lineHeight: 1.6 }}>
                If you already have a build step, <code>npm i @lacspace/components</code> gives you
                the React components, the types and the same stylesheet locally. The CDN exists for
                everywhere that doesn&rsquo;t.{" "}
                <a className="link" href="/components">
                  See all 143 components →
                </a>
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <DevFooter />
    </>
  );
}
