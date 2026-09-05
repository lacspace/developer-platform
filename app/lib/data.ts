// Shared content for the Lacspace Templates / Developer platform.

export type Template = {
  key: string;
  name: string;
  emoji: string;
  grad: string;
  tagline: string;
  desc: string;
  pages: string[];
};

export const TEMPLATES: Template[] = [
  {
    key: "personal",
    name: "Personal",
    emoji: "👤",
    grad: "linear-gradient(135deg,#6366f1,#a855f7)",
    tagline: "Portfolio & developer presence",
    desc: "Projects, uses, work history, about, and a real Markdown blog. Ship your presence in minutes.",
    pages: ["Home", "Projects", "Work", "Uses", "Blog", "About", "Contact"],
  },
  {
    key: "business",
    name: "Business",
    emoji: "🏢",
    grad: "linear-gradient(135deg,#0ea5e9,#22d3ee)",
    tagline: "Agency & company site",
    desc: "Services, case-study work, pricing, and a team grid. Corporate, without the corporate-boring.",
    pages: ["Home", "Services", "Work", "Pricing", "Team", "About", "Contact"],
  },
  {
    key: "ecommerce",
    name: "Ecommerce",
    emoji: "🛍️",
    grad: "linear-gradient(135deg,#f43f5e,#fb923c)",
    tagline: "Storefront with a working cart",
    desc: "Product grid, collections, and a persisted cart. From browse to checkout intent, prebuilt.",
    pages: ["Home", "Shop", "Collections", "Product", "Cart", "About", "Contact"],
  },
  {
    key: "saas",
    name: "SaaS",
    emoji: "🚀",
    grad: "linear-gradient(135deg,#8b5cf6,#ec4899)",
    tagline: "Product landing page",
    desc: "Feature splits, a pricing table, integrations, and a changelog. The classic launch page, finished.",
    pages: ["Home", "Features", "Pricing", "Integrations", "Changelog", "About"],
  },
  {
    key: "blog",
    name: "Blog",
    emoji: "✍️",
    grad: "linear-gradient(135deg,#10b981,#34d399)",
    tagline: "A real Markdown blog",
    desc: "Posts from files, topic pages, a newsletter, and BlogPosting JSON-LD. Write and publish.",
    pages: ["Home", "Posts", "Topics", "Post", "Newsletter", "About"],
  },
  {
    key: "docs",
    name: "Docs",
    emoji: "📚",
    grad: "linear-gradient(135deg,#f59e0b,#fbbf24)",
    tagline: "Documentation site",
    desc: "Sidebar nav, on-page TOC, prev/next, search, an API reference, and a changelog.",
    pages: ["Home", "Guides", "API Reference", "Changelog", "Search"],
  },
  {
    key: "dashboard",
    name: "Dashboard",
    emoji: "📊",
    grad: "linear-gradient(135deg,#3b82f6,#6366f1)",
    tagline: "App shell & admin",
    desc: "Sidebar, stat cards, charts, analytics, and settings. The inside of a product, prebuilt.",
    pages: ["Overview", "Analytics", "Customers", "Billing", "Settings"],
  },
  {
    key: "restaurant",
    name: "Restaurant",
    emoji: "🍽️",
    grad: "linear-gradient(135deg,#ef4444,#f97316)",
    tagline: "Menu, bookings & events",
    desc: "Menu, reservations, gallery, and private events. A warm, appetite-first site that's ready to book.",
    pages: ["Home", "Menu", "Reservations", "Gallery", "Events", "About"],
  },
];

export type Kit = {
  name: string;
  icon: string;
  blurb: string;
  packages: { name: string; desc: string }[];
};

// Curated ecosystem — the full catalog is 63 packages on npm.
export const KITS: Kit[] = [
  {
    name: "Security Kit",
    icon: "🛡️",
    blurb: "Auth, crypto, and hardening — all over Web Crypto, never hand-rolled.",
    packages: [
      { name: "crypto", desc: "AES-256-GCM, PBKDF2, HMAC over Web Crypto" },
      { name: "password", desc: "PBKDF2 hashing with a portable PHC string" },
      { name: "jwt", desc: "HS256/384/512 with strict expiry/issuer checks" },
      { name: "webauthn", desc: "Passkeys / FaceID / fingerprint ceremonies" },
      { name: "otp", desc: "TOTP & HOTP, Google Authenticator compatible" },
      { name: "apikey", desc: "Prefixed high-entropy keys, store only the hash" },
      { name: "headers", desc: "Secure HTTP headers + a typed CSP builder" },
      { name: "rate-limit", desc: "Fixed / sliding window & token bucket" },
    ],
  },
  {
    name: "SEO Kit",
    icon: "🔎",
    blurb: "Configure once with defineSite() → metadata, JSON-LD, sitemap, robots, feeds.",
    packages: [
      { name: "seo", desc: "Typed metadata + schema.org JSON-LD builders" },
      { name: "sitemap", desc: "sitemap.xml, indexes, Next.js sitemaps" },
      { name: "robots", desc: "robots.txt with AI-crawler block presets" },
      { name: "og", desc: "Dynamic Open Graph share-card images" },
      { name: "rss", desc: "RSS 2.0, Atom & JSON Feed from one source" },
      { name: "llms-txt", desc: "Generate llms.txt (the llmstxt.org standard)" },
      { name: "slugify", desc: "Clean, transliterated SEO URL slugs" },
      { name: "site-verify", desc: "Search-engine verification tokens" },
    ],
  },
  {
    name: "React Kit",
    icon: "⚛️",
    blurb: "SSR-safe hooks, state, data fetching and theming — zero-dependency, tiny.",
    packages: [
      { name: "hooks", desc: "28 essential SSR-safe hooks" },
      { name: "store", desc: "Global state in ~1KB, no provider" },
      { name: "query", desc: "Data fetching with a shared cache (SWR-lite)" },
      { name: "theme", desc: "SSR-safe dark / light / system theme" },
      { name: "hotkeys", desc: "Combos, sequences and scopes" },
      { name: "virtual", desc: "Headless list virtualization" },
      { name: "ui", desc: "Scroll reveals, counters, ⌘K palette" },
    ],
  },
  {
    name: "App Kit",
    icon: "🧱",
    blurb: "The pieces every app repeats — validation, forms, money, IDs, dates.",
    packages: [
      { name: "validate", desc: "Typed schema validator with zod ergonomics" },
      { name: "form", desc: "FormData → typed, validated data + honeypot" },
      { name: "money", desc: "Integer minor units — no floating-point bugs" },
      { name: "id", desc: "UUID v4 / v7, Nano-ID-style, short codes" },
      { name: "markdown", desc: "Safe Markdown → HTML with GFM" },
      { name: "cache", desc: "In-memory LRU + TTL + stale-while-revalidate" },
      { name: "retry", desc: "Backoff + jitter, timeouts, circuit breaker" },
      { name: "humanize", desc: "Bytes, durations, relative time, ordinals" },
    ],
  },
  {
    name: "Backend Kit",
    icon: "⚙️",
    blurb: "Server plumbing without the servers — signed URLs, PDFs, webhooks.",
    packages: [
      { name: "signed-url", desc: "HMAC-signed, expiring URLs & magic links" },
      { name: "pdf", desc: "Real PDFs — invoices, receipts — zero deps" },
      { name: "webhooks", desc: "Sign, deliver & verify webhooks both ways" },
      { name: "idempotency", desc: "Exactly-once with an idempotency key" },
      { name: "env", desc: "Typed, validated environment variables" },
      { name: "redact", desc: "Mask secrets & PII before logging" },
      { name: "flags", desc: "Feature flags & A/B with no SaaS" },
      { name: "lock", desc: "Account lockout & brute-force protection" },
    ],
  },
  {
    name: "Mail Kit",
    icon: "✉️",
    blurb: "Send and validate email from a Node backend — no third-party SDK.",
    packages: [
      { name: "mailer", desc: "Zero-dependency SMTP client over net/tls" },
      { name: "email-templates", desc: "Responsive, dark-mode-aware HTML emails" },
      { name: "email-validate", desc: "Syntax + disposable / role detection" },
      { name: "email-verify", desc: "MX lookup + best-effort deliverability" },
    ],
  },
  {
    name: "StockKit",
    icon: "📈",
    blurb: "Everything a trading app needs — indicators, market math, a paper engine.",
    packages: [
      { name: "indicators", desc: "Streaming RSI, MACD, EMA, Bollinger, ATR…" },
      { name: "market", desc: "P&L, returns, CAGR, XIRR, tick rounding" },
      { name: "market-clock", desc: "Holiday-aware NSE/BSE trading clock" },
      { name: "paper-trade", desc: "Headless paper-trading engine" },
    ],
  },
  {
    name: "Core & Data",
    icon: "🧩",
    blurb: "The SDK, the HTTP client, analytics, and spreadsheet I/O.",
    packages: [
      { name: "sdk", desc: "High-level TypeScript SDK for Lacspace" },
      { name: "api", desc: "Isomorphic, zero-dependency HTTP client" },
      { name: "auth", desc: "Login, register, token, refresh flows" },
      { name: "analytics-lite", desc: "Cookieless, privacy-first web analytics" },
      { name: "xlsx", desc: "Write real .xlsx with zero dependencies" },
      { name: "csv", desc: "Correct RFC 4180 CSV parse & stringify" },
      { name: "color", desc: "Parse, convert & manipulate colours" },
      { name: "case", desc: "camelCase ↔ snake_case ↔ kebab-case" },
    ],
  },
];

export const STATS = {
  scaffold: "~0.15s",
  files: "70+",
  pages: "11",
  components: "26",
  templates: "8",
  packages: "63",
};
