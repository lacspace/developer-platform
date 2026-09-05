import { DevHeader } from "../components/dev-header";
import { DevFooter } from "../components/dev-footer";
import { CodeBlock } from "../components/code-block";
import { site } from "../lib/seo";

const FAQ = [
  {
    question: "Are the @lacspace packages really zero-dependency?",
    answer:
      "Yes. Verify any of them with `npm view @lacspace/crypto dependencies`. The only dependencies you'll ever see are other @lacspace packages.",
  },
  {
    question: "Do I have to use the whole ecosystem?",
    answer:
      "No — each package stands alone. Install one, or scaffold a whole app with create-lacspace-app; both are first-class.",
  },
  {
    question: "What does it cost?",
    answer:
      "Everything is free under the Lacspace Free Licence — a permissive, free-to-use licence. Use it in personal and commercial projects at no cost.",
  },
];

const seo = site.faq(FAQ, {
  title: "Developer Handbook",
  path: "/handbook",
  description:
    "The end-to-end guide to the Lacspace ecosystem — install, use, integrate, scaffold and upgrade 63 zero-dependency TypeScript packages and the create-lacspace-app CLI.",
});
export const metadata = seo.metadata;

const TOC = [
  { id: "getting-started", label: "Getting started" },
  { id: "principles", label: "How it's built" },
  { id: "usage", label: "Using packages" },
  { id: "scaffold", label: "Scaffold an app" },
  { id: "integrations", label: "Integrations" },
  { id: "upgrading", label: "Upgrading" },
  { id: "compare", label: "Compare" },
  { id: "licence", label: "Licence" },
  { id: "faq", label: "FAQ" },
];

export default function Handbook() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }}
      />
      <div className="aurora" />
      <DevHeader />
      <main className="wrap">
        <section className="sec" style={{ paddingTop: 56 }}>
          <div className="sec-head">
            <div className="eyebrow">Developer Handbook</div>
            <h2>Build with the Lacspace ecosystem</h2>
            <p className="hb-lead">
              Everything you need to go from <code>npm install</code> to
              production — how the packages are built, how to use them, how to
              scaffold a whole app, and how to keep it up to date.
            </p>
          </div>

          <div className="hb">
            {/* TOC */}
            <aside className="hb-toc">
              <div className="toc-title">On this page</div>
              {TOC.map((t) => (
                <a key={t.id} href={`#${t.id}`}>
                  {t.label}
                </a>
              ))}
            </aside>

            {/* Body */}
            <div className="hb-body">
              <h2 id="getting-started">Getting started</h2>
              <p>
                Every package is published to npm under the{" "}
                <code>@lacspace</code> org. They&apos;re zero-dependency,
                isomorphic (they run in Node, the browser and edge runtimes) and
                ship both ESM and CommonJS with full TypeScript types. Install
                only what you need:
              </p>
              <CodeBlock
                label="terminal"
                code={`npm i @lacspace/validate @lacspace/money @lacspace/slugify
# pnpm add / yarn add / bun add all work too`}
              />
              <div className="callout">
                <strong>Requirements:</strong> Node 18+ for most packages. A few
                that use Web Crypto (<code>@lacspace/crypto</code>,{" "}
                <code>jwt</code>, <code>otp</code>, <code>webauthn</code>,{" "}
                <code>signed-url</code>) require Node 20+, where{" "}
                <code>globalThis.crypto</code> is available by default.
              </div>

              <h2 id="principles">How it&apos;s built</h2>
              <p>
                The whole catalog follows the same four rules — which is what
                makes it feel like one standard library rather than 63 random
                packages:
              </p>
              <ul>
                <li>
                  <strong>Zero runtime dependencies.</strong> No transitive
                  supply chain. <code>npm view @lacspace/seo dependencies</code>{" "}
                  returns <code>{`{}`}</code>. The only exception is a package
                  depending on another <code>@lacspace</code> sibling.
                </li>
                <li>
                  <strong>Isomorphic.</strong> One build runs in Node, browsers
                  and edge — no <code>fs</code>, no Node-only globals unless the
                  package is explicitly server-side.
                </li>
                <li>
                  <strong>Dual ESM + CJS.</strong> Built with{" "}
                  <code>tsup</code>; <code>import</code> and <code>require</code>{" "}
                  both work, with <code>.d.ts</code> types for each.
                </li>
                <li>
                  <strong>Web Crypto, never hand-rolled.</strong> Anything
                  cryptographic uses the platform&apos;s{" "}
                  <code>SubtleCrypto</code> — AES-256-GCM, PBKDF2, HMAC — not a
                  bespoke implementation.
                </li>
              </ul>

              <h2 id="usage">Using packages</h2>
              <p>
                The APIs aim to be boring in the best way — small, typed, and
                predictable. A few representative examples:
              </p>

              <h3>Validation — @lacspace/validate</h3>
              <p>The ergonomics of zod, in a tiny zero-dependency package.</p>
              <CodeBlock
                label="validate.ts"
                lang="ts"
                code={`import { v, type Infer } from "@lacspace/validate";

const User = v.object({
  name: v.string().min(2).trim(),
  email: v.string().email().toLowerCase(),
  age: v.coerce.number().int().min(0).optional(),
  role: v.enum(["admin", "user"]).default("user"),
});

type User = Infer<typeof User>;

User.parse(input);      // typed data, or throws ValidationError
User.safeParse(input);  // { success: true, data } | { success: false, error }`}
              />

              <h3>Money — @lacspace/money</h3>
              <p>Integer minor units, so the cent never vanishes.</p>
              <CodeBlock
                label="money.ts"
                lang="ts"
                code={`import { money } from "@lacspace/money";

const price = money(19.99, "USD");    // 1999 minor units, exact
price.multiply(3).format();           // "$59.97"

// Split a bill three ways — sums back to exactly $10.00
money(10, "USD").allocate([1, 1, 1]).map((m) => m.format());
// ["$3.34", "$3.33", "$3.33"]

money(9.99, "USD").add(money(1, "EUR")); // throws: currency mismatch`}
              />

              <h3>Auth tokens — @lacspace/jwt</h3>
              <p>Strict expiry, issuer and audience checks by default.</p>
              <CodeBlock
                label="jwt.ts"
                lang="ts"
                code={`import { sign, verify, JwtError } from "@lacspace/jwt";

const token = await sign({ sub: "user_1", role: "admin" }, process.env.JWT_SECRET!, {
  expiresIn: 3600,
  issuer: "lacspace",
});

try {
  const payload = await verify(token, process.env.JWT_SECRET!, { issuer: "lacspace" });
  payload.sub; // "user_1"
} catch (e) {
  if (e instanceof JwtError) console.log(e.code); // "expired" | "signature" | …
}`}
              />

              <h3>Field encryption — @lacspace/crypto</h3>
              <p>Authenticated AES-256-GCM over Web Crypto.</p>
              <CodeBlock
                label="crypto.ts"
                lang="ts"
                code={`import { generateKey, encrypt, decrypt } from "@lacspace/crypto";

const key = generateKey();                 // 256-bit base64url key — store securely
const blob = await encrypt("card: 4242…", key); // "v1:<iv>:<ciphertext+tag>"
const plain = await decrypt(blob, key);    // "card: 4242…"`}
              />

              <h3>SEO metadata — @lacspace/seo</h3>
              <p>Typed Next.js metadata + schema.org JSON-LD from one call.</p>
              <CodeBlock
                label="app/pricing/page.tsx"
                lang="tsx"
                code={`import { seoMetadata } from "@lacspace/seo";

export const metadata = seoMetadata({
  title: "Pricing — Lacspace",
  description: "Simple, transparent plans.",
  canonical: "/pricing",
  image: "https://lacspace.com/og/pricing.png",
  baseUrl: "https://lacspace.com",
});`}
              />

              <h2 id="scaffold">Scaffold an app</h2>
              <p>
                Don&apos;t start from an empty page. <code>create-lacspace-app</code>{" "}
                writes a finished Next.js 15 + React 19 + Tailwind v4 app in about
                0.15 seconds — every page filled, SEO and security headers wired,
                and a 26-component UI kit included.
              </p>
              <CodeBlock
                label="terminal"
                code={`# scaffold from any of 8 templates
npm create lacspace-app@latest my-app -- --template saas

# grow it later — drop prebuilt, themed sections into an existing app
npx create-lacspace-app add pricing faq testimonials

cd my-app && npm run dev`}
              />
              <p>
                Templates: <code>personal</code>, <code>business</code>,{" "}
                <code>ecommerce</code>, <code>saas</code>, <code>blog</code>,{" "}
                <code>docs</code>, <code>dashboard</code>,{" "}
                <code>restaurant</code>. Every one is live to click through at{" "}
                <a className="link" href="https://templates.lacspace.com" target="_blank" rel="noopener">
                  templates.lacspace.com
                </a>
                .
              </p>

              <h2 id="integrations">Integrations</h2>
              <p>
                Because the packages are isomorphic, they slot into whatever
                you&apos;re already using:
              </p>
              <table className="hb-tpl-table">
                <thead>
                  <tr>
                    <th>Environment</th>
                    <th>How it fits</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="k">Next.js (App Router)</td>
                    <td>
                      <code>seoMetadata()</code> in <code>metadata</code>,{" "}
                      <code>@lacspace/headers</code> in <code>next.config</code>,{" "}
                      sitemap/robots as route handlers, <code>@lacspace/og</code>{" "}
                      for OG images.
                    </td>
                  </tr>
                  <tr>
                    <td className="k">Node backends</td>
                    <td>
                      <code>jwt</code>, <code>password</code>, <code>mailer</code>
                      , <code>rate-limit</code>, <code>webhooks</code>,{" "}
                      <code>pdf</code>, <code>xlsx</code> — no native addons, no
                      headless browser.
                    </td>
                  </tr>
                  <tr>
                    <td className="k">Edge runtimes</td>
                    <td>
                      Web-Crypto-based packages (<code>crypto</code>,{" "}
                      <code>signed-url</code>, <code>otp</code>) run on the edge
                      where <code>SubtleCrypto</code> exists.
                    </td>
                  </tr>
                  <tr>
                    <td className="k">React apps</td>
                    <td>
                      <code>@lacspace/hooks</code>, <code>store</code>,{" "}
                      <code>query</code>, <code>theme</code>, <code>ui</code> —
                      SSR-safe, ship <code>&quot;use client&quot;</code> where
                      needed.
                    </td>
                  </tr>
                </tbody>
              </table>

              <h2 id="upgrading">Upgrading</h2>
              <p>
                Packages follow semver. Minor and patch releases are safe to take
                anytime; breaking changes only land in majors. To pull the latest
                across all <code>@lacspace</code> packages in a project:
              </p>
              <CodeBlock
                label="terminal"
                code={`# see what's outdated
npm outdated

# upgrade within your semver range
npm update

# jump to the newest majors of every @lacspace package
npx npm-check-updates -f "@lacspace/*" -u && npm install`}
              />
              <div className="callout">
                <strong>One thing to watch:</strong> the crypto-using packages
                moved their <code>engines</code> floor to Node&nbsp;20. If an
                upgrade warns about <code>EBADENGINE</code>, bump your runtime to
                Node 20+ — that&apos;s the only environment change the ecosystem
                has required.
              </div>
              <p>
                Pin exact versions in libraries you publish; use ranges (
                <code>^</code>) in apps so security patches flow in automatically.
              </p>

              <h2 id="compare">Compare</h2>
              <p>
                The point of the ecosystem is fewer, smaller, auditable
                dependencies. A rough sense of what each package replaces:
              </p>
              <table className="hb-tpl-table">
                <thead>
                  <tr>
                    <th>Instead of</th>
                    <th>Reach for</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>zod</td>
                    <td className="k">@lacspace/validate</td>
                  </tr>
                  <tr>
                    <td>dinero.js / currency.js</td>
                    <td className="k">@lacspace/money</td>
                  </tr>
                  <tr>
                    <td>jsonwebtoken</td>
                    <td className="k">@lacspace/jwt</td>
                  </tr>
                  <tr>
                    <td>nodemailer</td>
                    <td className="k">@lacspace/mailer</td>
                  </tr>
                  <tr>
                    <td>zustand</td>
                    <td className="k">@lacspace/store</td>
                  </tr>
                  <tr>
                    <td>swr / react-query</td>
                    <td className="k">@lacspace/query</td>
                  </tr>
                  <tr>
                    <td>exceljs</td>
                    <td className="k">@lacspace/xlsx</td>
                  </tr>
                </tbody>
              </table>
              <p style={{ color: "var(--faint)", fontSize: 14 }}>
                These aren&apos;t drop-in clones — they&apos;re smaller, focused
                takes with zero dependencies. Pick them when the extra surface
                area of the big library isn&apos;t worth it.
              </p>

              <h2 id="licence">Licence</h2>
              <p>
                Everything is free under the{" "}
                <a
                  className="link"
                  href="https://lacspace.com/licenses/lacspace-free-1.0"
                  target="_blank"
                  rel="noopener"
                >
                  Lacspace Free Licence v1.0
                </a>{" "}
                — a permissive, free-to-use licence. Use it in personal and
                commercial projects at no cost; what you build is yours.
              </p>

              <h2 id="faq">FAQ</h2>
              <h3>Are these really zero-dependency?</h3>
              <p>
                Yes. Verify any of them:{" "}
                <code>npm view @lacspace/crypto dependencies</code>. The only
                dependencies you&apos;ll ever see are other <code>@lacspace</code>{" "}
                packages.
              </p>
              <h3>Do I have to use the whole thing?</h3>
              <p>
                No — each package stands alone. Install one, or scaffold a whole
                app; both are first-class.
              </p>
              <h3>Where are the full per-package docs?</h3>
              <p>
                Every package has a detailed README on npm, and there&apos;s a
                browsable catalog with a downloadable PDF handbook at{" "}
                <a className="link" href="https://lacspace.com/docs" target="_blank" rel="noopener">
                  lacspace.com/docs
                </a>
                . Start from{" "}
                <a className="link" href="/packages">
                  the package list
                </a>{" "}
                here.
              </p>
            </div>
          </div>
        </section>
      </main>
      <DevFooter />
    </>
  );
}
