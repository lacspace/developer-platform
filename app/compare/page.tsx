import { DevHeader } from "../components/dev-header";
import { DevFooter } from "../components/dev-footer";
import { Reveal } from "../components/reveal";
import { site } from "../lib/seo";

const seo = site.page({
  title: "Compare Packages",
  path: "/compare",
  description:
    "How @lacspace packages compare to the usual dependencies — zod, dinero, jsonwebtoken, nodemailer, zustand, swr, exceljs and more. Zero runtime dependencies, isomorphic, dual ESM + CJS.",
});
export const metadata = seo.metadata;

type Row = { lac: string; alt: string; category: string; why: string };

const ROWS: Row[] = [
  { lac: "validate", alt: "zod", category: "Validation", why: "Same parse / safeParse ergonomics, zero dependencies." },
  { lac: "money", alt: "dinero.js · currency.js", category: "Money", why: "Integer minor units — no floating-point cent bugs." },
  { lac: "jwt", alt: "jsonwebtoken", category: "Auth tokens", why: "Strict expiry / issuer / audience by default, over Web Crypto." },
  { lac: "crypto", alt: "crypto-js", category: "Cryptography", why: "Real AES-256-GCM via SubtleCrypto, not a JS reimplementation." },
  { lac: "mailer", alt: "nodemailer", category: "Email (SMTP)", why: "Tiny SMTP client over raw net/tls, no dependency tree." },
  { lac: "store", alt: "zustand", category: "React state", why: "~1KB, selector-based, no provider — built on useSyncExternalStore." },
  { lac: "query", alt: "swr · react-query", category: "Data fetching", why: "Shared cache + dedupe + SWR in a fraction of the size." },
  { lac: "xlsx", alt: "exceljs", category: "Spreadsheets", why: "Write real .xlsx with zero deps and no headless browser." },
  { lac: "pdf", alt: "pdfkit · puppeteer", category: "PDF", why: "Generate invoices & receipts without a headless browser." },
  { lac: "markdown", alt: "marked · markdown-it", category: "Markdown", why: "Safe MD → HTML with GFM, no plugin sprawl." },
  { lac: "id", alt: "uuid · nanoid", category: "IDs", why: "UUID v4/v7, nano-id-style and short codes in one package." },
  { lac: "cache", alt: "lru-cache", category: "Caching", why: "LRU + TTL + stale-while-revalidate + memoize wrapper." },
  { lac: "humanize", alt: "pretty-bytes · ms · numeral", category: "Formatting", why: "Bytes, durations, relative time and ordinals in one." },
  { lac: "seo", alt: "next-seo", category: "SEO", why: "Typed metadata AND schema.org JSON-LD from one config." },
  { lac: "rate-limit", alt: "express-rate-limit", category: "Rate limiting", why: "Framework-agnostic, fixed / sliding window & token bucket." },
  { lac: "retry", alt: "p-retry", category: "Resilience", why: "Backoff + jitter, per-call timeouts and a circuit breaker." },
];

export default function Compare() {
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
            <div className="eyebrow">Compare</div>
            <h2>
              Fewer, smaller, <span className="grad">auditable</span> dependencies
            </h2>
            <p>
              Every <span className="mono">@lacspace</span> package ships{" "}
              <strong style={{ color: "var(--fg)" }}>zero runtime dependencies</strong>,
              runs isomorphically, and outputs dual ESM + CJS with types. Here&apos;s
              what each one replaces.
            </p>
          </div>

          <Reveal className="stats" style={{ marginTop: 8 }}>
            <div className="stat"><b className="grad">0</b><span>runtime deps</span></div>
            <div className="stat"><b className="grad">63</b><span>packages</span></div>
            <div className="stat"><b className="grad">ESM+CJS</b><span>dual output</span></div>
            <div className="stat"><b className="grad">100%</b><span>TypeScript</span></div>
            <div className="stat"><b className="grad">Iso</b><span>node · edge · browser</span></div>
            <div className="stat"><b className="grad">Free</b><span>licence</span></div>
          </Reveal>

          <Reveal className="bench" style={{ marginTop: 34, overflowX: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th>Reach for</th>
                  <th>Instead of</th>
                  <th>Category</th>
                  <th>Why</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.lac}>
                    <td className="win"><b className="mono">@lacspace/{r.lac}</b></td>
                    <td className="mono" style={{ color: "var(--faint)" }}>{r.alt}</td>
                    <td>{r.category}</td>
                    <td style={{ color: "var(--muted)" }}>{r.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <Reveal className="callout" style={{ maxWidth: 820, margin: "24px auto 0" }}>
            <strong>Honest framing:</strong> these aren&apos;t drop-in clones of the
            libraries they replace — they&apos;re smaller, focused takes with zero
            dependencies. Reach for them when the extra surface area (and supply
            chain) of the bigger library isn&apos;t worth it. When you need the full
            feature set of a mature library, use it.
          </Reveal>

          <div className="cta" style={{ marginTop: 30, justifyContent: "center" }}>
            <a className="btn btn-primary" href="/packages">Browse all 63 packages →</a>
            <a className="btn btn-ghost" href="/playground">Try them live</a>
          </div>
        </section>
      </main>
      <DevFooter />
    </>
  );
}
