import { DevHeader } from "../components/dev-header";
import { DevFooter } from "../components/dev-footer";
import { Reveal } from "../components/reveal";
import { site } from "../lib/seo";

const seo = site.page({
  title: "Lacspace Media API — hosted logo, image & brand-kit generation (no AI)",
  path: "/media-api",
  description:
    "A free hosted HTTP API that generates logos, images and full brand kits without AI. GET a logo as SVG or PNG, build a gradient/pattern image to an exact size budget, or download a whole brand kit as a ZIP — no install, no key to start. Built on the open @lacspace/logo, @lacspace/image and @lacspace/brand packages.",
  keywords: [
    "logo api", "image generation api", "brand kit api", "svg to png api", "no ai logo api",
    "favicon api", "og image api", "rest api", "hosted", "keyless",
  ],
});
export const metadata = seo.metadata;

const CSS = `
.ma-hero .sub{max-width:680px}
.ma-badges{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.ma-badge{font-size:12.5px;color:var(--muted);border:1px solid var(--hairline-2);border-radius:999px;padding:5px 13px}
.ma-ep{border:1px solid var(--hairline-2);border-radius:16px;background:var(--panel);overflow:hidden;margin-top:22px}
.ma-ep-head{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:16px 18px;border-bottom:1px solid var(--hairline);background:var(--panel-2)}
.ma-verb{font-family:ui-monospace,Menlo,monospace;font-size:12px;font-weight:700;color:#0a0e17;background:var(--accent);border-radius:7px;padding:3px 9px}
.ma-path{font-family:ui-monospace,Menlo,monospace;font-size:15px;color:var(--fg);font-weight:600}
.ma-ep-desc{color:var(--muted);font-size:13.5px;margin-left:auto}
.ma-ep-body{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:0}
@media(max-width:820px){.ma-ep-body{grid-template-columns:1fr}}
.ma-col{padding:18px}
.ma-col+.ma-col{border-left:1px solid var(--hairline)}
@media(max-width:820px){.ma-col+.ma-col{border-left:0;border-top:1px solid var(--hairline)}}
.ma-params{list-style:none;padding:0;margin:0 0 14px;font-size:13px}
.ma-params li{padding:5px 0;border-bottom:1px solid var(--hairline);display:flex;gap:10px}
.ma-params code{font-family:ui-monospace,Menlo,monospace;color:var(--accent-to);flex:none;min-width:74px}
.ma-params span{color:var(--muted)}
.ma-code{background:#0A0E18;border:1px solid var(--hairline);border-radius:10px;padding:12px 13px;overflow-x:auto}
.ma-code code{font-family:ui-monospace,Menlo,monospace;font-size:12.5px;color:#a7f3d0;white-space:pre;line-height:1.65}
.ma-demo{display:flex;align-items:center;justify-content:center;min-height:150px;background:var(--panel-2);border-radius:12px;padding:16px;overflow:hidden}
.ma-demo img{max-width:100%;max-height:170px;height:auto;border-radius:6px}
.ma-demo-lbl{font-size:11px;color:var(--faint);text-align:center;margin-top:8px;font-family:ui-monospace,Menlo,monospace}
.ma-tiers{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:16px;margin-top:20px}
.ma-tier{border:1px solid var(--hairline-2);border-radius:16px;padding:22px;background:var(--panel)}
.ma-tier.pro{border-color:var(--accent);position:relative}
.ma-tier h3{font-size:1.15rem}
.ma-tier .price{font-size:1.6rem;font-weight:700;margin:6px 0 2px;letter-spacing:-0.02em}
.ma-tier .price small{font-size:.9rem;color:var(--faint);font-weight:400}
.ma-tier ul{list-style:none;padding:0;margin:14px 0 0;font-size:13.5px;color:var(--muted)}
.ma-tier li{padding:5px 0;padding-left:22px;position:relative}
.ma-tier li::before{content:"→";position:absolute;left:0;color:var(--accent)}
.ma-soon{position:absolute;top:16px;right:16px;font-size:11px;color:var(--accent);border:1px solid var(--accent);border-radius:999px;padding:2px 9px}
`;

function Endpoint({ verb, path, desc, params, curl, demo, demoLabel }: {
  verb: string; path: string; desc: string; params: [string, string][]; curl: string; demo?: string; demoLabel?: string;
}) {
  return (
    <div className="ma-ep">
      <div className="ma-ep-head">
        <span className="ma-verb">{verb}</span>
        <span className="ma-path">{path}</span>
        <span className="ma-ep-desc">{desc}</span>
      </div>
      <div className="ma-ep-body">
        <div className="ma-col">
          <ul className="ma-params">
            {params.map(([k, v]) => (<li key={k}><code>{k}</code><span>{v}</span></li>))}
          </ul>
          <div className="ma-code"><code>{curl}</code></div>
        </div>
        <div className="ma-col">
          <div className="ma-demo">
            {demo ? <img src={demo} alt="Live API example" loading="lazy" /> : <span className="ma-demo-lbl">Downloads a file</span>}
          </div>
          {demoLabel && <div className="ma-demo-lbl">{demoLabel}</div>}
        </div>
      </div>
    </div>
  );
}

export default function MediaApiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }} />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="aurora" />
      <div className="grid-bg" />
      <DevHeader />

      <main className="wrap">
        <section className="hero ma-hero" style={{ paddingBottom: 8 }}>
          <Reveal><span className="pill"><span className="live" /> Free · hosted · no API key to start</span></Reveal>
          <Reveal delay={60}><h1>Lacspace <span className="grad">Media API</span></h1></Reveal>
          <Reveal delay={100}>
            <p className="sub">
              Generate <strong>logos</strong>, <strong>images</strong> and full <strong>brand kits</strong> over HTTP —
              <span className="mono"> no AI</span>, no install, no key to start. Get a logo as SVG or PNG, build an
              image to an exact <span className="mono">KB</span> budget, or download a whole brand kit as a ZIP.
              It&apos;s the hosted front door to the open <span className="mono">@lacspace/logo</span>,{" "}
              <span className="mono">@lacspace/image</span> and <span className="mono">@lacspace/brand</span> packages.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <div className="ma-badges">
              <span className="ma-badge">Base URL · <span className="mono">developer.lacspace.com/api/v1</span></span>
              <span className="ma-badge">60 req/min free</span>
              <span className="ma-badge">SVG · PNG · JPEG · WebP · ZIP</span>
              <span className="ma-badge">CORS-enabled</span>
            </div>
          </Reveal>
        </section>

        <section className="sec" style={{ paddingTop: 20 }}>
          <Reveal><h2 className="pd-h2">Endpoints</h2></Reveal>
          <Reveal delay={40}>
            <Endpoint
              verb="GET" path="/api/v1/logo" desc="Name + keywords → a logo"
              params={[["name", "required — the brand name"], ["keywords", "comma list, steers icon + palette"], ["engine", "monogram · wordmark · abstract · emblem · lettermark"], ["format", "svg (default) · png · json"], ["size", "png pixel size (64–2048)"], ["seed", "integer — spin variations"]]}
              curl={`curl "https://developer.lacspace.com/api/v1/logo\\\n  ?name=Orbit%20Labs&keywords=ai,network&format=png"`}
              demo="/api/v1/logo?name=Orbit%20Labs&keywords=ai,network&format=png&size=420"
              demoLabel="live: format=png"
            />
          </Reveal>
          <Reveal delay={40}>
            <Endpoint
              verb="GET" path="/api/v1/image" desc="A raster image, to a size budget"
              params={[["type", "gradient · radial · pattern · mesh · placeholder"], ["colors", "comma hex, e.g. #0BB9D9,#7C3AED"], ["width / height", "up to 4096"], ["pattern", "checker · grid · dots · stripes · noise"], ["format", "png · jpeg · webp"], ["maxSize", "budget, e.g. 200kb — binary-searched to fit"]]}
              curl={`curl "https://developer.lacspace.com/api/v1/image\\\n  ?type=mesh&colors=%230BB9D9,%237C3AED&format=webp&maxSize=80kb"`}
              demo="/api/v1/image?type=mesh&colors=%230BB9D9,%233B82F6,%237C3AED&width=640&height=360&format=png&maxSize=80kb"
              demoLabel="live: type=mesh"
            />
          </Reveal>
          <Reveal delay={40}>
            <Endpoint
              verb="GET" path="/api/v1/brand-kit" desc="A whole identity as a ZIP"
              params={[["name", "required — the brand name"], ["keywords", "comma list"], ["seed", "integer"], ["→ returns", "ZIP: svg/ lockups + favicon, png/ rasters (1600/1024/512/256), brand.css, colors.json"]]}
              curl={`curl -OJ "https://developer.lacspace.com/api/v1/brand-kit\\\n  ?name=Orbit%20Labs&keywords=ai,network"`}
              demoLabel="downloads orbit-labs-brand-kit.zip"
            />
          </Reveal>
          <p className="pt-note">
            Every response is CORS-enabled and cacheable — drop a logo or OG image straight into an{" "}
            <span className="mono">&lt;img&gt;</span> tag. GET params also work as a JSON body on POST.
          </p>
        </section>

        <section className="sec">
          <Reveal><h2 className="pd-h2">Free today · Pro soon</h2></Reveal>
          <div className="ma-tiers">
            <Reveal className="ma-tier">
              <h3>Free</h3>
              <div className="price">$0</div>
              <ul>
                <li>60 requests / minute</li>
                <li>Logos as SVG &amp; PNG</li>
                <li>Images up to 4096px, size budgets</li>
                <li>Brand-kit ZIP (SVG + PNG)</li>
                <li>No key required to start</li>
              </ul>
            </Reveal>
            <Reveal className="ma-tier pro" delay={60}>
              <span className="ma-soon">Soon</span>
              <h3>Pro</h3>
              <div className="price">TBD<small> / mo</small></div>
              <ul>
                <li>Much higher limits + API keys</li>
                <li>Premium curated packs (500+ icons, pro palettes)</li>
                <li>Remove attribution</li>
                <li>Signed cache-CDN render URLs</li>
                <li>Priority support</li>
              </ul>
            </Reveal>
            <Reveal className="ma-tier" delay={120}>
              <h3>Self-host</h3>
              <div className="price">Free</div>
              <ul>
                <li>Everything, in your own runtime</li>
                <li><span className="mono">npm i @lacspace/logo @lacspace/image @lacspace/brand</span></li>
                <li>Zero-dependency, isomorphic</li>
                <li>Lacspace Free Licence v1.0</li>
              </ul>
            </Reveal>
          </div>
          <Reveal className="cta" style={{ justifyContent: "center", marginTop: 26 }}>
            <a className="btn btn-primary" href="/tools/studio/try">Open the Studio →</a>
            <a className="btn btn-ghost" href="/packages/logo">@lacspace/logo docs</a>
            <a className="btn btn-ghost" href="/tools/brand/try">Brand Center</a>
          </Reveal>
        </section>
      </main>

      <DevFooter />
    </>
  );
}
