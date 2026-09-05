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
    question: "Can I use these on the edge / in the browser?",
    answer:
      "Most packages are isomorphic and run in Node, the browser and edge runtimes. Anything cryptographic uses Web Crypto, which the edge provides. A few (mailer, pdf, xlsx) are server-side by nature.",
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
    "The complete, example-driven guide to the Lacspace ecosystem — secure auth, SEO, backend building blocks, money, data, React and resilience, with real runnable recipes for 63 zero-dependency TypeScript packages.",
});
export const metadata = seo.metadata;

const TOC = [
  { id: "getting-started", label: "Getting started" },
  { id: "principles", label: "How it's built" },
  { id: "auth", label: "Auth & security" },
  { id: "seo", label: "SEO, done right" },
  { id: "backend", label: "Backend building blocks" },
  { id: "data", label: "Data, money & validation" },
  { id: "react", label: "React" },
  { id: "resilience", label: "Resilience & speed" },
  { id: "scaffold", label: "Scaffold an app" },
  { id: "integrations", label: "Integrations" },
  { id: "upgrading", label: "Upgrading" },
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
              A practical, example-first guide: install a package, wire it into a
              real feature, and ship. Every snippet below is real API you can copy
              — grouped by what you&apos;re actually trying to do.
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
              {/* GETTING STARTED */}
              <h2 id="getting-started">Getting started</h2>
              <p>
                Every package lives on npm under the <code>@lacspace</code> org.
                They&apos;re zero-dependency, isomorphic, and ship both ESM and
                CommonJS with full TypeScript types. Install only what you need —
                there&apos;s no core runtime to pull in first:
              </p>
              <CodeBlock
                label="terminal"
                code={`npm i @lacspace/validate @lacspace/money @lacspace/jwt
# pnpm add / yarn add / bun add all work too`}
              />
              <p>
                Then import named functions and go. Nothing is global, nothing
                monkey-patches, and tree-shaking keeps your bundle to exactly what
                you use:
              </p>
              <CodeBlock
                label="quickstart.ts"
                lang="ts"
                code={`import { slugify } from "@lacspace/slugify";
import { money } from "@lacspace/money";

slugify("Hello, World! — 2026");   // "hello-world-2026"
money(19.99, "USD").format();       // "$19.99"`}
              />
              <div className="callout">
                <strong>Requirements:</strong> Node 18+ for most packages. A few
                that use Web Crypto (<code>@lacspace/crypto</code>, <code>jwt</code>
                , <code>otp</code>, <code>webauthn</code>, <code>signed-url</code>)
                want Node 20+, where <code>globalThis.crypto</code> is available by
                default. On the edge and in browsers it&apos;s always there.
              </div>

              {/* PRINCIPLES */}
              <h2 id="principles">How it&apos;s built</h2>
              <p>
                Four rules hold across the whole catalog — which is what makes 63
                packages feel like one standard library:
              </p>
              <ul>
                <li>
                  <strong>Zero runtime dependencies.</strong> No transitive supply
                  chain to audit. <code>npm view @lacspace/seo dependencies</code>{" "}
                  returns <code>{`{}`}</code>; the only exception is a package
                  depending on another <code>@lacspace</code> sibling.
                </li>
                <li>
                  <strong>Isomorphic.</strong> One build runs in Node, browsers and
                  edge — no Node-only globals unless the package is explicitly
                  server-side.
                </li>
                <li>
                  <strong>Dual ESM + CJS.</strong> Built with <code>tsup</code>;{" "}
                  <code>import</code> and <code>require</code> both work, each with{" "}
                  <code>.d.ts</code> types.
                </li>
                <li>
                  <strong>Web Crypto, never hand-rolled.</strong> Anything
                  cryptographic uses <code>SubtleCrypto</code> — real AES-256-GCM,
                  PBKDF2 and HMAC, not a bespoke reimplementation.
                </li>
              </ul>

              {/* AUTH */}
              <h2 id="auth">Auth &amp; security</h2>
              <p>
                The Security Kit covers the whole login surface. Here&apos;s a
                complete, production-shaped auth flow built from four small
                packages — hashing, brute-force lockout, signing a session, and
                rate limiting.
              </p>

              <h3>1 · Register — hash the password</h3>
              <p>
                <code>@lacspace/password</code> uses PBKDF2-HMAC-SHA256 (OWASP
                iterations) and returns a portable PHC string you store as-is. Gate
                weak passwords with <code>strength()</code>.
              </p>
              <CodeBlock
                label="register.ts"
                lang="ts"
                code={`import { hash, strength } from "@lacspace/password";

export async function register(email: string, password: string) {
  if (strength(password).score < 2) {
    throw new Error("Please choose a stronger password.");
  }
  const passwordHash = await hash(password);
  // "$pbkdf2-sha256$i=600000$<salt>$<hash>" — store this exact string
  await db.users.create({ email, passwordHash });
}`}
              />

              <h3>2 · Log in — verify, lock out, sign a token</h3>
              <p>
                <code>@lacspace/lock</code> stops brute force with exponential
                backoff; <code>@lacspace/password</code> verifies (and tells you
                when to re-hash after you bump iterations); <code>@lacspace/jwt</code>{" "}
                mints the session with strict claims.
              </p>
              <CodeBlock
                label="login.ts"
                lang="ts"
                code={`import { verify, hash, needsRehash } from "@lacspace/password";
import { lockout } from "@lacspace/lock";
import { sign } from "@lacspace/jwt";

const guard = lockout({ maxAttempts: 5, baseDelayMs: 60_000, maxDelayMs: 3_600_000 });

export async function login(email: string, password: string) {
  const status = await guard.check(email);
  if (status.locked) {
    throw new Error("Too many attempts — try again later.");
  }

  const user = await db.users.findByEmail(email);
  const ok = user && (await verify(password, user.passwordHash));
  if (!ok) {
    const s = await guard.record(email);            // count the failure
    throw new Error(s.locked ? "Account locked." : \`\${s.remaining} attempts left\`);
  }
  await guard.reset(email);                          // success — clear strikes

  if (needsRehash(user.passwordHash)) {              // params moved on since sign-up
    await db.users.update(user.id, { passwordHash: await hash(password) });
  }

  return sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET!, {
    expiresIn: 3600,
    issuer: "lacspace",
  });
}`}
              />
              <p>
                Verifying the token on later requests is the mirror image — and it
                throws a typed <code>JwtError</code> you can branch on:
              </p>
              <CodeBlock
                label="session.ts"
                lang="ts"
                code={`import { verify, JwtError } from "@lacspace/jwt";

export async function currentUser(token: string) {
  try {
    const claims = await verify(token, process.env.JWT_SECRET!, { issuer: "lacspace" });
    return { id: claims.sub, role: claims.role };
  } catch (e) {
    if (e instanceof JwtError) return null; // "expired" | "signature" | …
    throw e;
  }
}`}
              />

              <h3>3 · Rate-limit the endpoint</h3>
              <p>
                <code>@lacspace/rate-limit</code> is framework-agnostic — fixed
                window, sliding window or token bucket over any store. Guard the
                login route by IP:
              </p>
              <CodeBlock
                label="app/api/login/route.ts"
                lang="ts"
                code={`import { rateLimit } from "@lacspace/rate-limit";

const limiter = rateLimit({ limit: 10, windowMs: 60_000, algorithm: "sliding" });

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "anon";
  const { success, retryAfter } = await limiter.check(ip);
  if (!success) {
    return new Response("Too many requests", {
      status: 429,
      headers: { "retry-after": String(retryAfter) },
    });
  }
  // …proceed to login()
}`}
              />

              <h3>Two-factor with TOTP</h3>
              <p>
                <code>@lacspace/otp</code> is Google-Authenticator compatible.
                Generate a secret, show a QR (<code>keyuri</code>), then verify the
                6-digit code with <code>verifyTotp</code>.
              </p>
              <CodeBlock
                label="twofa.ts"
                lang="ts"
                code={`import { generateSecret, keyuri, verifyTotp } from "@lacspace/otp";

// enrol
const secret = generateSecret();                       // store encrypted per user
const uri = keyuri({ secret, label: user.email, issuer: "Lacspace" });
// render \`uri\` as a QR code for the authenticator app

// verify at login
if (!verifyTotp(codeFromUser, secret)) {
  throw new Error("Invalid 2FA code.");
}`}
              />

              <h3>API keys for a public API</h3>
              <p>
                <code>@lacspace/apikey</code> issues prefixed, high-entropy keys and
                stores only the SHA-256 — you show the raw key once and verify in
                constant time.
              </p>
              <CodeBlock
                label="apikeys.ts"
                lang="ts"
                code={`import { generateApiKey, verifyApiKey } from "@lacspace/apikey";

// on create — return \`key\` to the user ONCE, store the rest
const { key, hash, prefix, last4 } = await generateApiKey({ prefix: "lac_live" });
await db.keys.create({ hash, prefix, last4, userId });

// on each request
const record = await db.keys.findByPrefix(presentedPrefix);
if (!record || !(await verifyApiKey(presentedKey, record.hash))) {
  return new Response("Unauthorized", { status: 401 });
}`}
              />

              <h3>Encrypt sensitive fields</h3>
              <p>
                <code>@lacspace/crypto</code> wraps authenticated AES-256-GCM over
                Web Crypto — encrypt a value before it touches your database.
              </p>
              <CodeBlock
                label="crypto.ts"
                lang="ts"
                code={`import { generateKey, encrypt, decrypt } from "@lacspace/crypto";

const key = process.env.DATA_KEY!;              // a 256-bit base64url key
const blob = await encrypt("card: 4242…", key); // "v1:<iv>:<ciphertext+tag>"
const plain = await decrypt(blob, key);         // "card: 4242…"`}
              />

              {/* SEO */}
              <h2 id="seo">SEO, done right</h2>
              <p>
                The SEO Kit is configure-once. <code>defineSite()</code> takes your
                brand a single time, then every page&apos;s <code>&lt;title&gt;</code>,
                canonical, Open Graph, Twitter card and JSON-LD becomes a one-liner.
                (This very site runs on exactly this setup.)
              </p>
              <CodeBlock
                label="lib/seo.ts"
                lang="ts"
                code={`import { defineSite } from "@lacspace/seo";

export const site = defineSite({
  name: "Acme",
  url: "https://acme.com",
  ogImage: "/og",                 // dynamic social cards, zero design work
  twitter: "acmehq",
  searchUrl: "https://acme.com/search?q={search_term_string}",
});`}
              />
              <p>
                Drop the Organization + WebSite graph into your root layout once,
                then each page spreads its metadata and renders its JSON-LD:
              </p>
              <CodeBlock
                label="app/pricing/page.tsx"
                lang="tsx"
                code={`import { site } from "@/lib/seo";

const { metadata, jsonLd } = site.page({ title: "Pricing", path: "/pricing" });
export { metadata };  // canonical + OG + Twitter + og:image, all filled in

export default function Pricing() {
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* … */}
    </>
  );
}`}
              />
              <p>
                <code>site.faq()</code>, <code>site.softwareApp()</code>,{" "}
                <code>site.article()</code> and <code>site.product()</code> each
                return matching rich-results JSON-LD. The sitemap, robots and OG
                image are three more small files:
              </p>
              <CodeBlock
                label="app/sitemap.ts · app/robots.ts · app/og/route.tsx"
                lang="ts"
                code={`import { toNextSitemap } from "@lacspace/sitemap";
export default () => toNextSitemap([{ loc: "https://acme.com/", priority: 1 }]);

import { toNextRobots } from "@lacspace/robots";
export const robots = () => toNextRobots({ groups: [{ userAgent: "*", allow: ["/"] }],
  sitemap: "https://acme.com/sitemap.xml" });

// app/og/route.tsx — dynamic 1200×630 cards
import { ImageResponse } from "next/og";
import { ogCard } from "@lacspace/og";
export const runtime = "edge";
export const GET = (req: Request) => new ImageResponse(
  ogCard({ title: new URL(req.url).searchParams.get("title") ?? "Acme", logo: "A" }),
  { width: 1200, height: 630 });`}
              />

              {/* BACKEND */}
              <h2 id="backend">Backend building blocks</h2>

              <h3>Typed environment variables</h3>
              <p>
                <code>@lacspace/env</code> validates <code>process.env</code> at
                boot, so a missing or malformed variable fails fast with a clear
                message instead of a mystery <code>undefined</code> at runtime.
              </p>
              <CodeBlock
                label="env.ts"
                lang="ts"
                code={`import { createEnv, str, port, url, bool, oneOf } from "@lacspace/env";

export const env = createEnv({
  NODE_ENV: oneOf(["development", "production", "test"], { default: "development" }),
  PORT: port({ default: 3000 }),
  DATABASE_URL: url(),
  SMTP_HOST: str(),
  DEBUG: bool({ default: false }),
});
// env.PORT is a number, env.DATABASE_URL is a validated URL — all typed`}
              />

              <h3>Send email over SMTP</h3>
              <p>
                <code>@lacspace/mailer</code> is a tiny SMTP client with no
                dependency tree; <code>@lacspace/email-templates</code> composes
                bulletproof, dark-mode-aware HTML from blocks.
              </p>
              <CodeBlock
                label="mail.ts"
                lang="ts"
                code={`import { createMailer, presets } from "@lacspace/mailer";
import { welcomeEmail, render } from "@lacspace/email-templates";

const mail = createMailer(
  presets.hostinger({ user: "no-reply@acme.com", pass: process.env.SMTP_PASS! }),
);

await mail.send({
  to: "customer@example.com",
  subject: "Welcome to Acme ✨",
  html: render(welcomeEmail({ name: "Ada", ctaUrl: "https://acme.com/start" })),
});`}
              />

              <h3>Receive webhooks safely — and exactly once</h3>
              <p>
                Verify the signature against the <em>raw</em> body (never the parsed
                JSON) with <code>@lacspace/webhooks</code>, then make the handler
                idempotent with <code>@lacspace/idempotency</code> so a provider
                retry can&apos;t double-charge.
              </p>
              <CodeBlock
                label="app/api/webhook/route.ts"
                lang="ts"
                code={`import { verify } from "@lacspace/webhooks";
import { idempotent } from "@lacspace/idempotency";

export async function POST(req: Request) {
  const raw = await req.text(); // raw body, not await req.json()
  const r = await verify(raw, req.headers.get("webhook-signature"), {
    secret: process.env.WEBHOOK_SECRET!,
    toleranceSec: 300, // reject replays older than 5 min
  });
  if (!r.valid) return new Response(\`rejected: \${r.reason}\`, { status: 400 });

  const event = JSON.parse(raw);
  const { value, replayed } = await idempotent(event.id, () => fulfil(event));
  return Response.json({ ok: true, replayed });
}`}
              />

              <h3>Signed, expiring links</h3>
              <p>
                <code>@lacspace/signed-url</code> makes tamper-proof magic links and
                download URLs over HMAC. <code>verify()</code> never throws — it
                returns a result you branch on.
              </p>
              <CodeBlock
                label="reset-link.ts"
                lang="ts"
                code={`import { sign, verify } from "@lacspace/signed-url";

const token = await sign({ userId: 42, action: "reset" }, {
  secret: process.env.LINK_SECRET!,
  expiresIn: 3600,
});
const link = \`https://acme.com/reset?t=\${token}\`;

// later
const r = await verify<{ userId: number }>(token, { secret: process.env.LINK_SECRET! });
if (r.valid) grantReset(r.data.userId);
else console.log(r.reason); // "malformed" | "bad-signature" | "expired"`}
              />

              <h3>Generate a real PDF invoice</h3>
              <p>
                <code>@lacspace/pdf</code> writes real PDFs with zero dependencies
                and no headless browser — invoices, receipts, documents.
              </p>
              <CodeBlock
                label="invoice.ts"
                lang="ts"
                code={`import { invoice } from "@lacspace/pdf";

const bytes = invoice({
  brand: "Acme", number: "INV-1024", date: "2026-09-05",
  from: { name: "Acme Inc.", email: "billing@acme.com" },
  to:   { name: "Client Ltd.", email: "ap@client.com" },
  items: [{ description: "Consulting", quantity: 10, rate: 120 }],
  currency: "$", taxRate: 13,
});

return new Response(bytes, {
  headers: { "content-type": "application/pdf",
             "content-disposition": 'attachment; filename="INV-1024.pdf"' },
});`}
              />

              {/* DATA */}
              <h2 id="data">Data, money &amp; validation</h2>

              <h3>Validate untrusted input</h3>
              <p>
                <code>@lacspace/validate</code> gives you zod-style schemas with{" "}
                <code>parse</code>/<code>safeParse</code> and full type inference —
                and <code>coerce</code> for the reality that FormData and query
                strings are all strings.
              </p>
              <CodeBlock
                label="schema.ts"
                lang="ts"
                code={`import { v, type Infer } from "@lacspace/validate";

const Signup = v.object({
  email: v.string().email().toLowerCase(),
  age: v.coerce.number().int().min(18),         // "21" → 21
  role: v.enum(["admin", "user"]).default("user"),
});

type Signup = Infer<typeof Signup>;
const result = Signup.safeParse(await req.json());
if (!result.success) return Response.json(result.error, { status: 422 });`}
              />

              <h3>Handle money without float bugs</h3>
              <p>
                <code>@lacspace/money</code> stores integer minor units, so a cent
                never disappears. <code>allocate()</code> splits a total so the
                remainder is distributed, not lost.
              </p>
              <CodeBlock
                label="money.ts"
                lang="ts"
                code={`import { money } from "@lacspace/money";

const price = money(19.99, "USD");        // 1999 minor units, exact
price.multiply(3).format();               // "$59.97"

money(10, "USD").allocate([1, 1, 1])      // split a bill three ways
  .map((m) => m.format());                // ["$3.34", "$3.33", "$3.33"] — sums to $10.00

money(9.99, "USD").add(money(1, "EUR"));  // throws: currency mismatch`}
              />

              <h3>Export to Excel &amp; parse CSV</h3>
              <p>
                <code>@lacspace/xlsx</code> writes real <code>.xlsx</code> with no
                headless browser; <code>@lacspace/csv</code> parses RFC-4180 CSV
                correctly (quoted fields, escaped quotes, embedded newlines).
              </p>
              <CodeBlock
                label="export.ts"
                lang="ts"
                code={`import { jsonToXlsx } from "@lacspace/xlsx";
import { parse } from "@lacspace/csv";

// objects → a downloadable spreadsheet
const bytes = jsonToXlsx([
  { name: "Ada", signups: 12, active: true },
  { name: "Alan", signups: 7, active: false },
]);

// CSV text → typed rows
const rows = parse<{ id: string; qty: string }>(csvText);`}
              />

              {/* REACT */}
              <h2 id="react">React</h2>
              <p>
                The React Kit is tiny, SSR-safe and dependency-free — global state,
                data fetching, theming and 28 essential hooks.
              </p>

              <h3>Global state in ~1KB</h3>
              <p>
                <code>@lacspace/store</code> is a Zustand-shaped store with no
                provider. Select a slice; only components using that slice re-render.
              </p>
              <CodeBlock
                label="store.ts"
                lang="ts"
                code={`import { create } from "@lacspace/store";

const useCounter = create<{ count: number; inc: () => void }>((set) => ({
  count: 0,
  inc: () => set((s) => ({ count: s.count + 1 })),
}));

function Counter() {
  const count = useCounter((s) => s.count);   // re-renders only on count change
  const inc = useCounter((s) => s.inc);
  return <button onClick={inc}>{count}</button>;
}`}
              />

              <h3>Data fetching with a shared cache</h3>
              <p>
                <code>@lacspace/query</code> is SWR-shaped: components using the same
                key share the cache, de-dupe in-flight requests, and revalidate
                together.
              </p>
              <CodeBlock
                label="Profile.tsx"
                lang="tsx"
                code={`import { useQuery } from "@lacspace/query";

function Profile() {
  const { data, error, isLoading } = useQuery(
    "/api/me",
    (url) => fetch(url as string).then((r) => r.json()),
  );
  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Something went wrong.</p>;
  return <h1>Hi, {data.name}</h1>;
}`}
              />

              <h3>Theming with no flash</h3>
              <p>
                <code>@lacspace/theme</code> is a next-themes-lite: a tiny provider,
                a <code>useTheme</code> hook, and a no-flash inline script for
                dark / light / system.
              </p>
              <CodeBlock
                label="app/layout.tsx"
                lang="tsx"
                code={`import { ThemeProvider } from "@lacspace/theme";

export default function App({ children }: { children: React.ReactNode }) {
  return <ThemeProvider defaultTheme="system" enableSystem>{children}</ThemeProvider>;
}`}
              />
              <p style={{ color: "var(--faint)", fontSize: 14 }}>
                Plus <code>@lacspace/hooks</code> — <code>useDebounce</code>,{" "}
                <code>useLocalStorage</code>, <code>useCopyToClipboard</code>,{" "}
                <code>useIntersectionObserver</code> and 24 more — and{" "}
                <code>@lacspace/ui</code> for scroll reveals, counters and a ⌘K
                palette.
              </p>

              {/* RESILIENCE */}
              <h2 id="resilience">Resilience &amp; speed</h2>
              <p>
                Flaky third-party calls are a fact of life. <code>@lacspace/retry</code>{" "}
                adds exponential backoff with jitter and a circuit breaker;{" "}
                <code>@lacspace/cache</code> is an LRU + TTL with
                stale-while-revalidate and request de-duplication.
              </p>
              <CodeBlock
                label="resilient.ts"
                lang="ts"
                code={`import { retry } from "@lacspace/retry";
import { createCache } from "@lacspace/cache";

const cache = createCache<Rate>({ max: 500, ttl: 60_000 });

async function getRate(pair: string) {
  const hit = cache.get(pair);
  if (hit) return hit;

  const rate = await retry(() => fetch(\`/fx/\${pair}\`).then((r) => r.json()), {
    retries: 4,
    minDelay: 300,
    shouldRetry: (err) => isTransient(err),   // don't retry 4xx
  });
  cache.set(pair, rate);
  return rate;
}`}
              />

              {/* SCAFFOLD */}
              <h2 id="scaffold">Scaffold a whole app</h2>
              <p>
                Don&apos;t start from an empty page. <code>create-lacspace-app</code>{" "}
                writes a finished Next.js 15 + React 19 + Tailwind v4 app in about
                0.15 seconds — every page filled, SEO and security headers wired, a
                26-component UI kit included.
              </p>
              <CodeBlock
                label="terminal"
                code={`# scaffold from any of 8 templates
npm create lacspace-app@latest my-app -- --template saas

# grow an existing app — drop in prebuilt, themed sections
npx create-lacspace-app add pricing faq testimonials

cd my-app && npm run dev`}
              />
              <p>
                Every template is live to click through at{" "}
                <a className="link" href="https://templates.lacspace.com" target="_blank" rel="noopener">
                  templates.lacspace.com
                </a>
                .
              </p>

              {/* INTEGRATIONS */}
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
                      <code>defineSite()</code> for metadata + JSON-LD,{" "}
                      <code>@lacspace/headers</code> in <code>next.config</code>,{" "}
                      <code>sitemap.ts</code>/<code>robots.ts</code> route files, and{" "}
                      <code>@lacspace/og</code> for OG images.
                    </td>
                  </tr>
                  <tr>
                    <td className="k">Node backends</td>
                    <td>
                      <code>jwt</code>, <code>password</code>, <code>mailer</code>,{" "}
                      <code>rate-limit</code>, <code>webhooks</code>, <code>pdf</code>
                      , <code>xlsx</code> — no native addons, no headless browser.
                    </td>
                  </tr>
                  <tr>
                    <td className="k">Edge runtimes</td>
                    <td>
                      Web-Crypto packages (<code>crypto</code>, <code>signed-url</code>
                      , <code>otp</code>, <code>jwt</code>) run wherever{" "}
                      <code>SubtleCrypto</code> exists.
                    </td>
                  </tr>
                  <tr>
                    <td className="k">React apps</td>
                    <td>
                      <code>store</code>, <code>query</code>, <code>theme</code>,{" "}
                      <code>hooks</code>, <code>ui</code> — SSR-safe, ship{" "}
                      <code>&quot;use client&quot;</code> where needed.
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* UPGRADING */}
              <h2 id="upgrading">Upgrading</h2>
              <p>
                Packages follow semver. Minor and patch releases are safe anytime;
                breaking changes land only in majors.
              </p>
              <CodeBlock
                label="terminal"
                code={`npm outdated                                   # what's behind
npm update                                     # upgrade within your ranges
npx npm-check-updates -f "@lacspace/*" -u && npm install   # jump to newest majors`}
              />
              <div className="callout">
                <strong>One thing to watch:</strong> the crypto-using packages moved
                their <code>engines</code> floor to Node&nbsp;20. If an upgrade warns{" "}
                <code>EBADENGINE</code>, bump your runtime to Node 20+ — that&apos;s
                the only environment change the ecosystem has ever required.
              </div>
              <p>
                Pin exact versions in libraries you publish; use ranges (
                <code>^</code>) in apps so security patches flow in automatically.
                Not sure a package is worth the swap?{" "}
                <a className="link" href="/compare">See how each one compares</a> to
                the usual dependency, or{" "}
                <a className="link" href="/playground">try it live</a>.
              </p>

              {/* FAQ */}
              <h2 id="faq">FAQ</h2>
              {FAQ.map((f) => (
                <div key={f.question}>
                  <h3>{f.question}</h3>
                  <p>{f.answer}</p>
                </div>
              ))}
              <p style={{ marginTop: 24 }}>
                Every package also has a detailed README on npm and a page in{" "}
                <a className="link" href="/packages">the catalog</a>. There&apos;s a
                downloadable PDF handbook at{" "}
                <a className="link" href="https://lacspace.com/docs" target="_blank" rel="noopener">
                  lacspace.com/docs
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <DevFooter />
    </>
  );
}
