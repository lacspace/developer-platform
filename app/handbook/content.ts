// Structured, searchable handbook content. The interactive app in handbook-app.tsx
// renders this with search, kit filters, a scrollspy TOC and a package-manager switcher.

export type Recipe = {
  id: string;
  title: string;
  pkgs?: string[]; // @lacspace/* used — for the filter/search index + chips
  blurb?: string;
  code?: string;
  lang?: string;
  label?: string;
  note?: string;
  bullets?: string[];
  rows?: [string, string][];
  faqs?: { q: string; a: string }[];
  playground?: boolean; // show a "Try in the playground" link
};

export type Section = {
  id: string;
  label: string;
  icon: string;
  kit: string; // filter bucket
  intro?: string;
  recipes: Recipe[];
};

export const KIT_ORDER = [
  "Start",
  "Auth",
  "SEO",
  "Backend",
  "Data",
  "React",
  "Resilience",
  "Ship",
  "Reference",
];

export const SECTIONS: Section[] = [
  {
    id: "getting-started",
    label: "Getting started",
    icon: "🚀",
    kit: "Start",
    intro:
      "Every package lives on npm under the @lacspace org — zero-dependency, isomorphic, dual ESM + CJS with types. Install only what you need.",
    recipes: [
      {
        id: "install",
        title: "Install",
        blurb: "Add exactly the packages you use — there's no core runtime to pull in first.",
        label: "terminal",
        lang: "bash",
        code: `npm i @lacspace/validate @lacspace/money @lacspace/jwt`,
      },
      {
        id: "quickstart",
        title: "First calls",
        blurb: "Import named functions and go. Nothing is global; tree-shaking keeps your bundle tiny.",
        label: "quickstart.ts",
        lang: "ts",
        code: `import { slugify } from "@lacspace/slugify";
import { money } from "@lacspace/money";

slugify("Hello, World! — 2026");   // "hello-world-2026"
money(19.99, "USD").format();       // "$19.99"`,
        pkgs: ["slugify", "money"],
        playground: true,
      },
      {
        id: "requirements",
        title: "Requirements",
        blurb:
          "Node 18+ for most packages. Web-Crypto packages (crypto, jwt, otp, webauthn, signed-url) want Node 20+, where globalThis.crypto is available by default — and it's always there on the edge and in browsers.",
        note: "Isomorphic by design: the same build runs in Node, the browser and edge runtimes.",
      },
    ],
  },
  {
    id: "principles",
    label: "How it's built",
    icon: "🧱",
    kit: "Start",
    intro: "Four rules hold across the whole catalog — which is what makes 63 packages feel like one standard library.",
    recipes: [
      {
        id: "rules",
        title: "The four rules",
        bullets: [
          "Zero runtime dependencies — no transitive supply chain. `npm view @lacspace/seo dependencies` returns `{}`.",
          "Isomorphic — one build runs in Node, browsers and edge, with no Node-only globals unless the package is explicitly server-side.",
          "Dual ESM + CJS — built with tsup; `import` and `require` both work, each with `.d.ts` types.",
          "Web Crypto, never hand-rolled — real AES-256-GCM, PBKDF2 and HMAC via SubtleCrypto.",
        ],
      },
    ],
  },
  {
    id: "auth",
    label: "Auth & security",
    icon: "🛡️",
    kit: "Auth",
    intro: "A complete, production-shaped login surface built from small packages — hashing, brute-force lockout, signing a session, rate limiting, 2FA and API keys.",
    recipes: [
      {
        id: "register",
        title: "Register — hash the password",
        pkgs: ["password"],
        blurb: "PBKDF2-HMAC-SHA256 (OWASP iterations) → a portable PHC string you store as-is. Gate weak passwords with strength().",
        label: "register.ts",
        lang: "ts",
        code: `import { hash, strength } from "@lacspace/password";

export async function register(email: string, password: string) {
  if (strength(password).score < 2) {
    throw new Error("Please choose a stronger password.");
  }
  const passwordHash = await hash(password);
  // "$pbkdf2-sha256$i=600000$<salt>$<hash>" — store this exact string
  await db.users.create({ email, passwordHash });
}`,
      },
      {
        id: "login",
        title: "Log in — verify, lock out, sign a token",
        pkgs: ["password", "lock", "jwt"],
        blurb: "lock stops brute force with exponential backoff; password verifies; jwt mints the session with strict claims.",
        label: "login.ts",
        lang: "ts",
        code: `import { verify, hash, needsRehash } from "@lacspace/password";
import { lockout } from "@lacspace/lock";
import { sign } from "@lacspace/jwt";

const guard = lockout({ maxAttempts: 5, baseDelayMs: 60_000, maxDelayMs: 3_600_000 });

export async function login(email: string, password: string) {
  const status = await guard.check(email);
  if (status.locked) throw new Error("Too many attempts — try again later.");

  const user = await db.users.findByEmail(email);
  const ok = user && (await verify(password, user.passwordHash));
  if (!ok) {
    const s = await guard.record(email);
    throw new Error(s.locked ? "Account locked." : \`\${s.remaining} attempts left\`);
  }
  await guard.reset(email);

  if (needsRehash(user.passwordHash)) {
    await db.users.update(user.id, { passwordHash: await hash(password) });
  }
  return sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET!, {
    expiresIn: 3600, issuer: "lacspace",
  });
}`,
      },
      {
        id: "session",
        title: "Verify the session token",
        pkgs: ["jwt"],
        blurb: "The mirror image — a typed JwtError you branch on.",
        label: "session.ts",
        lang: "ts",
        code: `import { verify, JwtError } from "@lacspace/jwt";

export async function currentUser(token: string) {
  try {
    const claims = await verify(token, process.env.JWT_SECRET!, { issuer: "lacspace" });
    return { id: claims.sub, role: claims.role };
  } catch (e) {
    if (e instanceof JwtError) return null; // "expired" | "signature" | …
    throw e;
  }
}`,
      },
      {
        id: "rate-limit",
        title: "Rate-limit the endpoint",
        pkgs: ["rate-limit"],
        blurb: "Framework-agnostic — fixed window, sliding window or token bucket over any store.",
        label: "app/api/login/route.ts",
        lang: "ts",
        code: `import { rateLimit } from "@lacspace/rate-limit";

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
}`,
      },
      {
        id: "twofa",
        title: "Two-factor with TOTP",
        pkgs: ["otp"],
        blurb: "Google-Authenticator compatible. Generate a secret, show a QR, verify the 6-digit code.",
        label: "twofa.ts",
        lang: "ts",
        code: `import { generateSecret, keyuri, verifyTotp } from "@lacspace/otp";

// enrol
const secret = generateSecret();                       // store encrypted per user
const uri = keyuri({ secret, label: user.email, issuer: "Lacspace" });
// render the uri as a QR code for the authenticator app

// verify at login
if (!verifyTotp(codeFromUser, secret)) {
  throw new Error("Invalid 2FA code.");
}`,
      },
      {
        id: "apikeys",
        title: "API keys for a public API",
        pkgs: ["apikey"],
        blurb: "Prefixed, high-entropy keys; store only the SHA-256. Show the raw key once, verify in constant time.",
        label: "apikeys.ts",
        lang: "ts",
        code: `import { generateApiKey, verifyApiKey } from "@lacspace/apikey";

// on create — return \`key\` to the user ONCE, store the rest
const { key, hash, prefix, last4 } = await generateApiKey({ prefix: "lac_live" });
await db.keys.create({ hash, prefix, last4, userId });

// on each request
const record = await db.keys.findByPrefix(presentedPrefix);
if (!record || !(await verifyApiKey(presentedKey, record.hash))) {
  return new Response("Unauthorized", { status: 401 });
}`,
      },
      {
        id: "crypto",
        title: "Encrypt sensitive fields",
        pkgs: ["crypto"],
        blurb: "Authenticated AES-256-GCM over Web Crypto — encrypt a value before it touches your database.",
        label: "crypto.ts",
        lang: "ts",
        code: `import { generateKey, encrypt, decrypt } from "@lacspace/crypto";

const key = process.env.DATA_KEY!;              // a 256-bit base64url key
const blob = await encrypt("card: 4242…", key); // "v1:<iv>:<ciphertext+tag>"
const plain = await decrypt(blob, key);         // "card: 4242…"`,
      },
    ],
  },
  {
    id: "seo",
    label: "SEO, done right",
    icon: "🔎",
    kit: "SEO",
    intro: "Configure-once. defineSite() takes your brand a single time, then every page's title, canonical, Open Graph, Twitter card and JSON-LD is a one-liner. This very site runs on it.",
    recipes: [
      {
        id: "definesite",
        title: "Set your brand once",
        pkgs: ["seo"],
        label: "lib/seo.ts",
        lang: "ts",
        code: `import { defineSite } from "@lacspace/seo";

export const site = defineSite({
  name: "Acme",
  url: "https://acme.com",
  ogImage: "/og",                 // dynamic social cards, zero design work
  twitter: "acmehq",
  searchUrl: "https://acme.com/search?q={search_term_string}",
});`,
      },
      {
        id: "seo-page",
        title: "One-line metadata + JSON-LD per page",
        pkgs: ["seo"],
        blurb: "Spread the metadata, render the JSON-LD. site.faq(), site.softwareApp(), site.article(), site.product() and site.collection() each return matching rich-results schema.",
        label: "app/pricing/page.tsx",
        lang: "tsx",
        code: `import { site } from "@/lib/seo";

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
}`,
      },
      {
        id: "seo-routes",
        title: "Sitemap, robots & OG image",
        pkgs: ["sitemap", "robots", "og"],
        blurb: "Three more small files — and dynamic 1200×630 social cards from @lacspace/og.",
        label: "app/sitemap.ts · robots.ts · og/route.tsx",
        lang: "ts",
        code: `import { toNextSitemap } from "@lacspace/sitemap";
export default () => toNextSitemap([{ loc: "https://acme.com/", priority: 1 }]);

import { toNextRobots } from "@lacspace/robots";
export const robots = () => toNextRobots({ groups: [{ userAgent: "*", allow: ["/"] }],
  sitemap: "https://acme.com/sitemap.xml" });

// app/og/route.tsx
import { ImageResponse } from "next/og";
import { ogCard } from "@lacspace/og";
export const runtime = "edge";
export const GET = (req: Request) => new ImageResponse(
  ogCard({ title: new URL(req.url).searchParams.get("title") ?? "Acme", logo: "A" }),
  { width: 1200, height: 630 });`,
      },
    ],
  },
  {
    id: "backend",
    label: "Backend building blocks",
    icon: "⚙️",
    kit: "Backend",
    intro: "Server plumbing without the servers — typed config, SMTP, webhooks, signed links and PDFs.",
    recipes: [
      {
        id: "env",
        title: "Typed environment variables",
        pkgs: ["env"],
        blurb: "Validate process.env at boot — a missing or malformed var fails fast with a clear message.",
        label: "env.ts",
        lang: "ts",
        code: `import { createEnv, str, port, url, bool, oneOf } from "@lacspace/env";

export const env = createEnv({
  NODE_ENV: oneOf(["development", "production", "test"], { default: "development" }),
  PORT: port({ default: 3000 }),
  DATABASE_URL: url(),
  SMTP_HOST: str(),
  DEBUG: bool({ default: false }),
});`,
      },
      {
        id: "mailer",
        title: "Send email over SMTP",
        pkgs: ["mailer", "email-templates"],
        blurb: "A tiny SMTP client with no dependency tree, plus bulletproof, dark-mode-aware HTML from blocks.",
        label: "mail.ts",
        lang: "ts",
        code: `import { createMailer, presets } from "@lacspace/mailer";
import { welcomeEmail, render } from "@lacspace/email-templates";

const mail = createMailer(
  presets.hostinger({ user: "no-reply@acme.com", pass: process.env.SMTP_PASS! }),
);

await mail.send({
  to: "customer@example.com",
  subject: "Welcome to Acme ✨",
  html: render(welcomeEmail({ name: "Ada", ctaUrl: "https://acme.com/start" })),
});`,
      },
      {
        id: "webhooks",
        title: "Receive webhooks — exactly once",
        pkgs: ["webhooks", "idempotency"],
        blurb: "Verify the signature against the raw body, then make the handler idempotent so a provider retry can't double-charge.",
        label: "app/api/webhook/route.ts",
        lang: "ts",
        code: `import { verify } from "@lacspace/webhooks";
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
}`,
      },
      {
        id: "signed-url",
        title: "Signed, expiring links",
        pkgs: ["signed-url"],
        blurb: "Tamper-proof magic links and download URLs over HMAC. verify() never throws.",
        label: "reset-link.ts",
        lang: "ts",
        code: `import { sign, verify } from "@lacspace/signed-url";

const token = await sign({ userId: 42, action: "reset" }, {
  secret: process.env.LINK_SECRET!,
  expiresIn: 3600,
});
const link = \`https://acme.com/reset?t=\${token}\`;

const r = await verify<{ userId: number }>(token, { secret: process.env.LINK_SECRET! });
if (r.valid) grantReset(r.data.userId);
else console.log(r.reason); // "malformed" | "bad-signature" | "expired"`,
      },
      {
        id: "pdf",
        title: "Generate a real PDF invoice",
        pkgs: ["pdf"],
        blurb: "Real PDFs with zero dependencies and no headless browser.",
        label: "invoice.ts",
        lang: "ts",
        code: `import { invoice } from "@lacspace/pdf";

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
});`,
      },
    ],
  },
  {
    id: "data",
    label: "Data, money & validation",
    icon: "🧮",
    kit: "Data",
    intro: "The pieces every app repeats — validation, money that never loses a cent, and spreadsheet I/O.",
    recipes: [
      {
        id: "validate",
        title: "Validate untrusted input",
        pkgs: ["validate"],
        blurb: "zod-style schemas with parse/safeParse and full inference — plus coerce, because FormData and query strings are all strings.",
        label: "schema.ts",
        lang: "ts",
        playground: true,
        code: `import { v, type Infer } from "@lacspace/validate";

const Signup = v.object({
  email: v.string().email().toLowerCase(),
  age: v.coerce.number().int().min(18),         // "21" → 21
  role: v.enum(["admin", "user"]).default("user"),
});

type Signup = Infer<typeof Signup>;
const result = Signup.safeParse(await req.json());
if (!result.success) return Response.json(result.error, { status: 422 });`,
      },
      {
        id: "money",
        title: "Handle money without float bugs",
        pkgs: ["money"],
        blurb: "Integer minor units, so a cent never disappears. allocate() splits a total so the remainder is distributed, not lost.",
        label: "money.ts",
        lang: "ts",
        playground: true,
        code: `import { money } from "@lacspace/money";

const price = money(19.99, "USD");        // 1999 minor units, exact
price.multiply(3).format();               // "$59.97"

money(10, "USD").allocate([1, 1, 1])      // split a bill three ways
  .map((m) => m.format());                // ["$3.34", "$3.33", "$3.33"] — sums to $10.00

money(9.99, "USD").add(money(1, "EUR"));  // throws: currency mismatch`,
      },
      {
        id: "export",
        title: "Export to Excel & parse CSV",
        pkgs: ["xlsx", "csv"],
        blurb: "Write real .xlsx with no headless browser; parse RFC-4180 CSV correctly.",
        label: "export.ts",
        lang: "ts",
        code: `import { jsonToXlsx } from "@lacspace/xlsx";
import { parse } from "@lacspace/csv";

const bytes = jsonToXlsx([
  { name: "Ada", signups: 12, active: true },
  { name: "Alan", signups: 7, active: false },
]);

const rows = parse<{ id: string; qty: string }>(csvText);`,
      },
    ],
  },
  {
    id: "react",
    label: "React",
    icon: "⚛️",
    kit: "React",
    intro: "Tiny, SSR-safe and dependency-free — global state, data fetching, theming and 28 essential hooks.",
    recipes: [
      {
        id: "store",
        title: "Global state in ~1KB",
        pkgs: ["store"],
        blurb: "A Zustand-shaped store with no provider. Select a slice; only components using it re-render.",
        label: "store.ts",
        lang: "ts",
        code: `import { create } from "@lacspace/store";

const useCounter = create<{ count: number; inc: () => void }>((set) => ({
  count: 0,
  inc: () => set((s) => ({ count: s.count + 1 })),
}));

function Counter() {
  const count = useCounter((s) => s.count);
  const inc = useCounter((s) => s.inc);
  return <button onClick={inc}>{count}</button>;
}`,
      },
      {
        id: "query",
        title: "Data fetching with a shared cache",
        pkgs: ["query"],
        blurb: "SWR-shaped: components using the same key share the cache, de-dupe requests and revalidate together.",
        label: "Profile.tsx",
        lang: "tsx",
        code: `import { useQuery } from "@lacspace/query";

function Profile() {
  const { data, error, isLoading } = useQuery(
    "/api/me",
    (url) => fetch(url as string).then((r) => r.json()),
  );
  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Something went wrong.</p>;
  return <h1>Hi, {data.name}</h1>;
}`,
      },
      {
        id: "theme",
        title: "Theming with no flash",
        pkgs: ["theme"],
        blurb: "A next-themes-lite: a tiny provider, a useTheme hook, and a no-flash inline script.",
        label: "app/layout.tsx",
        lang: "tsx",
        code: `import { ThemeProvider } from "@lacspace/theme";

export default function App({ children }: { children: React.ReactNode }) {
  return <ThemeProvider defaultTheme="system" enableSystem>{children}</ThemeProvider>;
}`,
      },
      {
        id: "hooks",
        title: "Essential hooks & UI",
        pkgs: ["hooks", "ui"],
        blurb:
          "@lacspace/hooks — useDebounce, useLocalStorage, useCopyToClipboard, useIntersectionObserver and 24 more. @lacspace/ui — scroll reveals, counters and a ⌘K palette.",
      },
    ],
  },
  {
    id: "resilience",
    label: "Resilience & speed",
    icon: "⚡",
    kit: "Resilience",
    intro: "Flaky third-party calls are a fact of life. Back off, cache, and de-dupe.",
    recipes: [
      {
        id: "retry-cache",
        title: "Retry with backoff + cache",
        pkgs: ["retry", "cache"],
        blurb: "retry adds exponential backoff with jitter and a circuit breaker; cache is an LRU + TTL with stale-while-revalidate.",
        label: "resilient.ts",
        lang: "ts",
        code: `import { retry } from "@lacspace/retry";
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
}`,
      },
    ],
  },
  {
    id: "scaffold",
    label: "Scaffold a whole app",
    icon: "🏗️",
    kit: "Ship",
    intro: "Don't start from an empty page. create-lacspace-app writes a finished Next.js app in ~0.12s — every page filled, SEO wired, a 26-component UI kit included.",
    recipes: [
      {
        id: "scaffold-cmd",
        title: "One command, a finished app",
        blurb: "Pick a template, recolour it with --theme, and grow it later with add.",
        label: "terminal",
        lang: "bash",
        code: `# scaffold from any of 8 templates, recoloured to your brand
npm create lacspace-app@latest my-app -- --template saas --theme lacspace

# grow an existing app — drop in prebuilt, themed sections
npx create-lacspace-app add pricing faq testimonials

cd my-app && npm run dev`,
      },
    ],
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: "🔌",
    kit: "Reference",
    intro: "Because the packages are isomorphic, they slot into whatever you're already using.",
    recipes: [
      {
        id: "integrations-table",
        title: "Where each package fits",
        rows: [
          ["Next.js (App Router)", "defineSite() for metadata + JSON-LD, @lacspace/headers in next.config, sitemap.ts / robots.ts route files, @lacspace/og for OG images."],
          ["Node backends", "jwt, password, mailer, rate-limit, webhooks, pdf, xlsx — no native addons, no headless browser."],
          ["Edge runtimes", "Web-Crypto packages (crypto, signed-url, otp, jwt) run wherever SubtleCrypto exists."],
          ["React apps", "store, query, theme, hooks, ui — SSR-safe, ship \"use client\" where needed."],
        ],
      },
    ],
  },
  {
    id: "upgrading",
    label: "Upgrading",
    icon: "⬆️",
    kit: "Reference",
    intro: "Packages follow semver. Minor and patch releases are safe anytime; breaking changes land only in majors.",
    recipes: [
      {
        id: "upgrade-cmd",
        title: "Keep current",
        label: "terminal",
        lang: "bash",
        code: `npm outdated                                   # what's behind
npm update                                     # upgrade within your ranges
npx npm-check-updates -f "@lacspace/*" -u && npm install   # jump to newest majors`,
        note: "Watch for EBADENGINE: the crypto-using packages moved their engines floor to Node 20. Bump your runtime to Node 20+ — the only environment change the ecosystem has ever required.",
      },
    ],
  },
  {
    id: "faq",
    label: "FAQ",
    icon: "❓",
    kit: "Reference",
    recipes: [
      {
        id: "faq-list",
        title: "Frequently asked",
        faqs: [
          { q: "Are the @lacspace packages really zero-dependency?", a: "Yes. Verify any of them with `npm view @lacspace/crypto dependencies`. The only dependencies you'll ever see are other @lacspace packages." },
          { q: "Do I have to use the whole ecosystem?", a: "No — each package stands alone. Install one, or scaffold a whole app with create-lacspace-app; both are first-class." },
          { q: "Can I use these on the edge / in the browser?", a: "Most packages are isomorphic and run in Node, the browser and edge runtimes. Anything cryptographic uses Web Crypto, which the edge provides. A few (mailer, pdf, xlsx) are server-side by nature." },
          { q: "What does it cost?", a: "Everything is free under the Lacspace Free Licence — a permissive, free-to-use licence. Use it in personal and commercial projects at no cost." },
        ],
      },
    ],
  },
];

// Every distinct @lacspace package referenced across the handbook — for the resources index.
export const MENTIONED_PKGS = Array.from(
  new Set(SECTIONS.flatMap((s) => s.recipes.flatMap((r) => r.pkgs ?? [])))
).sort();

export const RESOURCES = [
  { label: "All 63 packages", href: "/packages", icon: "📦" },
  { label: "Live playground", href: "/playground", icon: "🧪" },
  { label: "Compare vs the usual deps", href: "/compare", icon: "⚖️" },
  { label: "Live templates", href: "https://templates.lacspace.com", icon: "🖥️", external: true },
  { label: "PDF handbook", href: "https://lacspace.com/docs", icon: "📕", external: true },
  { label: "Per-package docs", href: "https://lacspace.com/docs", icon: "📖", external: true },
  { label: "GitHub", href: "https://github.com/lacspace/npm-packages", icon: "🐙", external: true },
  { label: "npm org", href: "https://www.npmjs.com/org/lacspace", icon: "▲", external: true },
];
