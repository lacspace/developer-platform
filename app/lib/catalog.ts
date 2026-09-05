// Full @lacspace package catalog — generated from the monorepo (61 scoped packages).
// Plus 2 CLIs (create-lacspace-app, create-lacspace-seo) = 63 packages on npm.

export type Pkg = { n: string; v: string; d: string; kw: string[]; deps: number };
export type Group = { group: string; icon: string; items: Pkg[] };

export const CATALOG: Group[] = [
  {
    "group": "Core",
    "icon": "🧩",
    "items": [
      {
        "n": "analytics",
        "v": "2.0.5",
        "d": "Event tracking for Lacspace platforms — batching and an offline queue.",
        "kw": [
          "lacspace",
          "analytics",
          "tracking",
          "events",
          "typescript",
          "web-analytics"
        ],
        "deps": 1
      },
      {
        "n": "analytics-lite",
        "v": "1.0.1",
        "d": "Privacy-first, cookieless web analytics — page views and custom events sent to your own endpoint. No cookies, no localStorage IDs, no cross-site tracking, no consent banner. Respects Do-Not-Track, auto-tracks SPA navigation, uses sendBeacon. Zero-dependency, isomorphic.",
        "kw": [
          "analytics",
          "web-analytics",
          "privacy",
          "cookieless",
          "gdpr",
          "no-cookies"
        ],
        "deps": 0
      },
      {
        "n": "api",
        "v": "2.1.2",
        "d": "Lightweight, zero-dependency, isomorphic TypeScript HTTP client for Lacspace APIs.",
        "kw": [
          "lacspace",
          "api",
          "http-client",
          "fetch",
          "isomorphic",
          "typescript"
        ],
        "deps": 0
      },
      {
        "n": "auth",
        "v": "2.1.2",
        "d": "Authentication flows (login, register, token, refresh) for Lacspace APIs.",
        "kw": [
          "lacspace",
          "auth",
          "authentication",
          "login",
          "jwt",
          "typescript"
        ],
        "deps": 1
      },
      {
        "n": "next",
        "v": "1.1.2",
        "d": "Next.js App Router integration for the Lacspace SDK — authenticated server client from cookies, Route Handler & Server Action wrappers, cookie helpers and a middleware auth guard.",
        "kw": [
          "nextjs",
          "next",
          "app-router",
          "server-components",
          "server-actions",
          "middleware"
        ],
        "deps": 1
      },
      {
        "n": "react",
        "v": "1.1.0",
        "d": "React hooks and provider for the Lacspace SDK — useAuth, useQuery, useLacspace.",
        "kw": [
          "lacspace",
          "react",
          "hooks",
          "sdk",
          "useauth",
          "typescript"
        ],
        "deps": 1
      },
      {
        "n": "sdk",
        "v": "2.1.0",
        "d": "High-level TypeScript SDK for Lacspace — api, auth, analytics and e-commerce in one client.",
        "kw": [
          "lacspace",
          "sdk",
          "ecommerce",
          "auth",
          "analytics",
          "typescript"
        ],
        "deps": 3
      }
    ]
  },
  {
    "group": "Security Kit",
    "icon": "🛡️",
    "items": [
      {
        "n": "apikey",
        "v": "1.2.0",
        "d": "Issue & verify API keys the right way — prefixed high-entropy keys, store only the SHA-256 hash, constant-time verify, last-4 display. Isomorphic over Web Crypto.",
        "kw": [
          "api-key",
          "apikey",
          "token",
          "secret",
          "auth",
          "hashing"
        ],
        "deps": 1
      },
      {
        "n": "crypto",
        "v": "1.1.2",
        "d": "Safe, boring cryptography over Web Crypto — authenticated AES-256-GCM, PBKDF2 key derivation, SHA-256, HMAC, secure random and constant-time compare. Isomorphic (Node, edge, browser, RN).",
        "kw": [
          "crypto",
          "aes",
          "aes-256-gcm",
          "encryption",
          "web-crypto",
          "pbkdf2"
        ],
        "deps": 0
      },
      {
        "n": "headers",
        "v": "1.1.2",
        "d": "Secure HTTP headers & a typed Content-Security-Policy builder — HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy. Framework-agnostic + Next.js. Zero-dependency, isomorphic.",
        "kw": [
          "security-headers",
          "csp",
          "content-security-policy",
          "hsts",
          "helmet",
          "http-headers"
        ],
        "deps": 0
      },
      {
        "n": "jwt",
        "v": "1.3.0",
        "d": "JSON Web Tokens (HS256/384/512) with strict expiry/issuer/audience checks + secure random & CSRF tokens. Isomorphic over Web Crypto — Node, edge, browser.",
        "kw": [
          "jwt",
          "jsonwebtoken",
          "hs256",
          "token",
          "auth",
          "csrf"
        ],
        "deps": 1
      },
      {
        "n": "lock",
        "v": "1.0.4",
        "d": "Account lockout & brute-force protection (server lock) — N-strikes, exponential backoff, self-resetting window, pluggable store. Zero-dependency, isomorphic.",
        "kw": [
          "account-lockout",
          "brute-force",
          "login-security",
          "lockout",
          "backoff",
          "auth"
        ],
        "deps": 0
      },
      {
        "n": "mfa",
        "v": "1.1.2",
        "d": "Orchestrate multi-factor auth — combine password + TOTP + passkeys into 2FA/3FA step-up flows with NIST assurance levels (AAL). Zero-dependency (bar @lacspace/otp), isomorphic.",
        "kw": [
          "mfa",
          "2fa",
          "3fa",
          "multi-factor",
          "step-up-auth",
          "aal"
        ],
        "deps": 2
      },
      {
        "n": "otp",
        "v": "1.1.2",
        "d": "TOTP & HOTP two-factor auth, Google Authenticator compatible — generate secrets, compute/verify codes and build otpauth:// QR URIs. Built on Web Crypto: runs on Node, edge and browser. Zero-dependency, isomorphic.",
        "kw": [
          "otp",
          "totp",
          "hotp",
          "2fa",
          "two-factor",
          "authenticator"
        ],
        "deps": 0
      },
      {
        "n": "password",
        "v": "1.0.4",
        "d": "Password hashing & verification — PBKDF2-HMAC-SHA256 (OWASP iterations) with a portable PHC string + a strength estimator. Isomorphic over Web Crypto.",
        "kw": [
          "password",
          "hash",
          "pbkdf2",
          "password-hashing",
          "verify",
          "phc"
        ],
        "deps": 1
      },
      {
        "n": "rate-limit",
        "v": "1.1.2",
        "d": "Framework-agnostic rate limiting — fixed-window, sliding-window and token-bucket over a pluggable store, with standard RateLimit-* headers. For API routes, middleware and edge. Zero-dependency, isomorphic.",
        "kw": [
          "rate-limit",
          "rate-limiter",
          "throttle",
          "token-bucket",
          "sliding-window",
          "middleware"
        ],
        "deps": 0
      },
      {
        "n": "redact",
        "v": "1.0.4",
        "d": "Redact secrets & PII from strings and objects before logging — masks sensitive keys and patterns (JWTs, API keys, emails, cards, IPs). Safe AWS/Mongo logs. Zero-dependency, isomorphic.",
        "kw": [
          "redact",
          "mask",
          "pii",
          "secrets",
          "logging",
          "sanitize-logs"
        ],
        "deps": 0
      },
      {
        "n": "webauthn",
        "v": "1.1.0",
        "d": "Passkeys / biometric (FaceID, fingerprint, security keys) — browser ceremony helpers + server challenge, options and assertion verification (ES256/RS256) over Web Crypto. Zero-dependency, isomorphic.",
        "kw": [
          "webauthn",
          "passkey",
          "fido2",
          "biometric",
          "faceid",
          "fingerprint"
        ],
        "deps": 0
      }
    ]
  },
  {
    "group": "SEO Kit",
    "icon": "🔎",
    "items": [
      {
        "n": "llms-txt",
        "v": "1.3.0",
        "d": "Generate and parse llms.txt and llms-full.txt (the llmstxt.org standard) — a Markdown map of your site for LLMs. Zero-dependency, isomorphic.",
        "kw": [
          "llms-txt",
          "llms-full-txt",
          "llmstxt",
          "ai-seo",
          "llm",
          "generative-engine-optimization"
        ],
        "deps": 0
      },
      {
        "n": "og",
        "v": "1.1.0",
        "d": "Dynamic Open Graph images — a share-card design system you configure once and call per page. Produces a next/og element tree AND a zero-dependency SVG from the same options, with auto-fitting titles, presets, badges and gradients. Zero-dependency, isomorphic.",
        "kw": [
          "og-image",
          "open-graph",
          "opengraph",
          "social-image",
          "social-card",
          "next-og"
        ],
        "deps": 0
      },
      {
        "n": "robots",
        "v": "1.3.0",
        "d": "Build and parse robots.txt — typed per-user-agent rules, AI-crawler block presets (GPTBot, ClaudeBot, CCBot, Google-Extended), sitemap refs and Next.js robots.ts output. Zero-dependency, isomorphic.",
        "kw": [
          "robots-txt",
          "robots",
          "seo",
          "crawler",
          "gptbot",
          "ai-crawler"
        ],
        "deps": 0
      },
      {
        "n": "rss",
        "v": "1.3.0",
        "d": "Generate RSS 2.0, Atom 1.0 and JSON Feed 1.1 from one set of items — content syndication for blogs and news. Zero-dependency, isomorphic.",
        "kw": [
          "rss",
          "atom",
          "json-feed",
          "feed",
          "feed-generator",
          "syndication"
        ],
        "deps": 0
      },
      {
        "n": "seo",
        "v": "1.7.0",
        "d": "Typed metadata + JSON-LD for modern web apps — schema.org builders (Organization, Article, Product, FAQ, Breadcrumb), a Next.js App Router Metadata helper, the defineSite() SEO Autopilot engine, and an on-page SEO auditor with a CI sitemap crawler that fails the build when SEO regresses (`npx @lacspace/seo audit <url>` / `crawl <site> --min-grade A`). Zero-dependency, isomorphic.",
        "kw": [
          "seo",
          "json-ld",
          "structured-data",
          "schema-org",
          "next-metadata",
          "opengraph"
        ],
        "deps": 0
      },
      {
        "n": "site-verify",
        "v": "1.2.0",
        "d": "Search-engine site verification — meta tags, Next.js verification metadata and file tokens for Google Search Console, Bing, Yandex, Baidu, Pinterest, Ahrefs, Facebook & more. Zero-dependency, isomorphic.",
        "kw": [
          "site-verification",
          "google-search-console",
          "bing-webmaster",
          "yandex",
          "seo",
          "meta-verification"
        ],
        "deps": 0
      },
      {
        "n": "sitemap",
        "v": "1.2.0",
        "d": "Generate sitemap.xml, sitemap indexes and Next.js sitemaps — image/video/news extensions, hreflang alternates, auto-split at 50k URLs. Zero-dependency, isomorphic.",
        "kw": [
          "sitemap",
          "sitemap-xml",
          "sitemap-generator",
          "seo",
          "next-sitemap",
          "hreflang"
        ],
        "deps": 0
      },
      {
        "n": "slugify",
        "v": "1.1.0",
        "d": "Turn any text into a clean, SEO-friendly URL slug — transliterates diacritics, collapses separators, and guarantees uniqueness against an existing set. Zero-dependency, isomorphic.",
        "kw": [
          "slugify",
          "slug",
          "url-slug",
          "seo",
          "transliterate",
          "permalink"
        ],
        "deps": 0
      }
    ]
  },
  {
    "group": "React Kit",
    "icon": "⚛️",
    "items": [
      {
        "n": "hooks",
        "v": "1.0.1",
        "d": "Essential, SSR-safe React hooks — useLocalStorage, useDebounce, useMediaQuery, useOnClickOutside, useCopyToClipboard and 20+ more. Zero-dependency, fully typed, isomorphic.",
        "kw": [
          "react",
          "react-hooks",
          "hooks",
          "uselocalstorage",
          "usedebounce",
          "usemediaquery"
        ],
        "deps": 0
      },
      {
        "n": "hotkeys",
        "v": "1.0.1",
        "d": "Ergonomic keyboard shortcuts for React — combos (mod+k), key sequences (g then d), scopes, and pretty display formatting (⌘K). SSR-safe, respects form fields, zero-dependency, fully typed.",
        "kw": [
          "react",
          "hotkeys",
          "keyboard-shortcuts",
          "usehotkeys",
          "keybindings",
          "shortcuts"
        ],
        "deps": 0
      },
      {
        "n": "query",
        "v": "1.0.1",
        "d": "Tiny data fetching for React with a shared cache, request de-duplication, stale-while-revalidate, focus/reconnect revalidation, and mutations. useQuery + useMutation in ~2KB. Zero-dependency, SSR-safe, fully typed.",
        "kw": [
          "react",
          "data-fetching",
          "usequery",
          "usemutation",
          "swr",
          "react-query"
        ],
        "deps": 0
      },
      {
        "n": "store",
        "v": "1.1.0",
        "d": "Minimal global state for React in ~1KB — create a store, use selectors, no provider. Built on useSyncExternalStore with a persist middleware and shallow equality. Zero-dependency, SSR-safe, fully typed.",
        "kw": [
          "react",
          "state-management",
          "store",
          "usesyncexternalstore",
          "zustand",
          "selector"
        ],
        "deps": 0
      },
      {
        "n": "theme",
        "v": "1.0.2",
        "d": "SSR-safe dark / light / system theme for React — a tiny ThemeProvider, a useTheme hook, and a no-flash inline script. Persists to storage, follows the OS, toggles a class or data-attribute. Zero-dependency, framework-agnostic, fully typed.",
        "kw": [
          "react",
          "theme",
          "dark-mode",
          "light-mode",
          "next-themes",
          "usetheme"
        ],
        "deps": 0
      },
      {
        "n": "ui",
        "v": "1.0.1",
        "d": "A tiny, dependency-free React kit that makes a page feel alive — scroll reveals, animated counters, gradient text, tilt cards, marquees, a typewriter and a ⌘K command palette. No animation library, no CSS import. Respects prefers-reduced-motion; Tailwind-friendly.",
        "kw": [
          "react",
          "react-components",
          "animation",
          "scroll-reveal",
          "count-up",
          "gradient-text"
        ],
        "deps": 0
      },
      {
        "n": "virtual",
        "v": "1.0.1",
        "d": "Headless list virtualization for React — render only the rows in view, with fixed or dynamically-measured sizes, overscan, and scroll-to-index. useVirtualizer in ~2KB. Zero-dependency, SSR-safe, fully typed.",
        "kw": [
          "react",
          "virtualization",
          "virtual-list",
          "usevirtualizer",
          "windowing",
          "react-virtual"
        ],
        "deps": 0
      }
    ]
  },
  {
    "group": "App & Utils Kit",
    "icon": "🧱",
    "items": [
      {
        "n": "cache",
        "v": "1.0.1",
        "d": "A tiny in-memory cache — LRU eviction, per-entry TTL and stale-while-revalidate, plus wrap()/memoize() to cache any async function with in-flight de-duplication. Zero-dependency, isomorphic.",
        "kw": [
          "cache",
          "lru",
          "lru-cache",
          "ttl",
          "stale-while-revalidate",
          "swr"
        ],
        "deps": 0
      },
      {
        "n": "case",
        "v": "1.0.1",
        "d": "Convert strings between cases — camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, Title Case, Sentence case. Handles acronyms & numbers. Zero-dependency, isomorphic.",
        "kw": [
          "case",
          "camelcase",
          "pascalcase",
          "snakecase",
          "kebabcase",
          "constantcase"
        ],
        "deps": 0
      },
      {
        "n": "color",
        "v": "1.0.1",
        "d": "Parse, convert, manipulate and check colours — hex/rgb/hsl, lighten/darken/mix/alpha, and WCAG contrast for accessible palettes. Zero-dependency, isomorphic.",
        "kw": [
          "color",
          "colour",
          "hex",
          "rgb",
          "hsl",
          "wcag"
        ],
        "deps": 0
      },
      {
        "n": "env",
        "v": "1.0.4",
        "d": "Typed, validated environment variables — declare a schema, validate process.env at boot, get a typed frozen object or a clear fail-fast error. A zero-dependency t3-env / envalid alternative.",
        "kw": [
          "env",
          "environment-variables",
          "dotenv",
          "env-validation",
          "t3-env",
          "envalid"
        ],
        "deps": 0
      },
      {
        "n": "flags",
        "v": "1.0.2",
        "d": "Feature flags & A/B experiments with no SaaS and no infrastructure — deterministic bucketing (same user always gets the same result), targeting rules, percentage rollouts and weighted variants. Synchronous, zero-dependency, isomorphic.",
        "kw": [
          "feature-flags",
          "feature-toggle",
          "feature-flag",
          "ab-testing",
          "a-b-testing",
          "experiments"
        ],
        "deps": 0
      },
      {
        "n": "form",
        "v": "1.0.1",
        "d": "End-to-end form handling for the server — turn FormData into typed, validated data with a honeypot + timing spam guard, and get back your data or per-field errors ready to re-render. Shaped for Next.js Server Actions. Zero-dependency, isomorphic.",
        "kw": [
          "form",
          "form-handling",
          "form-validation",
          "formdata",
          "server-actions",
          "nextjs"
        ],
        "deps": 0
      },
      {
        "n": "humanize",
        "v": "1.0.1",
        "d": "Turn machine values into human-readable text — bytes, durations, relative time, ordinals, plurals, compact numbers and grammatical lists. Zero-dependency, isomorphic.",
        "kw": [
          "humanize",
          "pretty-bytes",
          "format-bytes",
          "duration",
          "relative-time",
          "time-ago"
        ],
        "deps": 0
      },
      {
        "n": "id",
        "v": "1.0.1",
        "d": "Unique IDs done right — UUID v4, time-sortable UUID v7, Nano-ID-style and short URL-safe codes. Cryptographically random (Web Crypto), zero-dependency, isomorphic.",
        "kw": [
          "uuid",
          "uuidv4",
          "uuidv7",
          "uuid-v7",
          "nanoid",
          "short-id"
        ],
        "deps": 0
      },
      {
        "n": "markdown",
        "v": "1.0.1",
        "d": "A small, safe Markdown → HTML renderer — headings with anchor ids, nested & task lists, fenced code, blockquotes, GFM tables, images and links. HTML in the source is escaped. Includes extractHeadings() for a table of contents. Zero-dependency, isomorphic.",
        "kw": [
          "markdown",
          "md",
          "markdown-to-html",
          "marked-alternative",
          "gfm",
          "table-of-contents"
        ],
        "deps": 0
      },
      {
        "n": "money",
        "v": "1.0.1",
        "d": "Money done right — integer minor units (no floating-point cent bugs), currency-safe arithmetic, remainder-preserving allocation/split, and localized formatting via Intl. Zero-dependency, isomorphic.",
        "kw": [
          "money",
          "currency",
          "dinero-alternative",
          "minor-units",
          "cents",
          "decimal"
        ],
        "deps": 0
      },
      {
        "n": "retry",
        "v": "1.0.1",
        "d": "Resilience for flaky calls — retry with exponential backoff & jitter, per-call timeouts, and a circuit breaker. Zero-dependency, isomorphic.",
        "kw": [
          "retry",
          "backoff",
          "exponential-backoff",
          "jitter",
          "timeout",
          "circuit-breaker"
        ],
        "deps": 0
      },
      {
        "n": "validate",
        "v": "1.0.1",
        "d": "A tiny, typed schema validator — the ergonomics of zod (parse/safeParse, object/array/enum/union, coercion, type inference) in a zero-dependency, isomorphic package. Great for forms, API bodies, env and query strings.",
        "kw": [
          "validation",
          "schema",
          "validator",
          "zod-alternative",
          "zod-lite",
          "type-inference"
        ],
        "deps": 0
      }
    ]
  },
  {
    "group": "Backend Kit",
    "icon": "⚙️",
    "items": [
      {
        "n": "idempotency",
        "v": "1.0.1",
        "d": "Make any operation exactly-once with an idempotency key — replay stored results on retries, safe under concurrency, with optional request fingerprinting. Framework-agnostic, pluggable store, zero-dependency, isomorphic.",
        "kw": [
          "idempotency",
          "idempotency-key",
          "idempotent",
          "exactly-once",
          "deduplication",
          "dedupe"
        ],
        "deps": 0
      },
      {
        "n": "pdf",
        "v": "1.0.1",
        "d": "Generate real PDFs — invoices, receipts & documents — with zero dependencies and no headless browser. Accurate text layout, auto page-breaks, batteries-included invoice() & receipt() generators. Isomorphic (Node, edge, browser).",
        "kw": [
          "pdf",
          "pdf-generator",
          "invoice",
          "invoice-pdf",
          "receipt",
          "pdf-invoice"
        ],
        "deps": 0
      },
      {
        "n": "signed-url",
        "v": "1.0.1",
        "d": "HMAC-signed, expiring URLs & tokens over Web Crypto — secure download links, magic-login links, unsubscribe links and one-time-action tokens. Tamper-proof, timing-safe, zero-config. Isomorphic (Node, edge, browser).",
        "kw": [
          "signed-url",
          "signed-token",
          "hmac",
          "expiring-url",
          "presigned-url",
          "magic-link"
        ],
        "deps": 1
      },
      {
        "n": "webhooks",
        "v": "1.0.1",
        "d": "The webhook toolkit for both directions — sign & deliver outgoing webhooks with retries, and verify incoming ones (timing-safe, replay-protected) with Stripe / GitHub / Shopify presets. Plus event ids & idempotency. One internal dependency (@lacspace/crypto), isomorphic.",
        "kw": [
          "webhook",
          "webhooks",
          "webhook-signature",
          "verify-webhook",
          "sign-webhook",
          "stripe-webhook"
        ],
        "deps": 1
      }
    ]
  },
  {
    "group": "Mail Kit",
    "icon": "✉️",
    "items": [
      {
        "n": "email-templates",
        "v": "1.0.5",
        "d": "Compose bulletproof, responsive, dark-mode-aware HTML emails from simple blocks — buttons, OTP codes, invoices — with ready-made OTP/welcome/alert/invoice templates. Zero-dependency, isomorphic.",
        "kw": [
          "email-template",
          "html-email",
          "responsive-email",
          "transactional-email",
          "email-builder",
          "otp-email"
        ],
        "deps": 0
      },
      {
        "n": "email-validate",
        "v": "1.0.5",
        "d": "Smart email validation — syntax, disposable/temp-mail detection, role & free-provider flags, Gmail normalization and 'did you mean?' typo suggestions. Zero-dependency, isomorphic.",
        "kw": [
          "email-validation",
          "email-validator",
          "disposable-email",
          "temp-mail",
          "email-typo",
          "did-you-mean"
        ],
        "deps": 0
      },
      {
        "n": "email-verify",
        "v": "1.0.5",
        "d": "Best-effort email deliverability checks for Node — syntax + disposable, MX record lookup and an optional SMTP RCPT probe (no mail sent). Zero npm dependencies.",
        "kw": [
          "email-verification",
          "email-verify",
          "mx-lookup",
          "smtp-check",
          "deliverability",
          "mailbox-exists"
        ],
        "deps": 1
      },
      {
        "n": "mailer",
        "v": "1.0.6",
        "d": "A tiny zero-dependency SMTP client for Node backends — send email over raw net/tls with STARTTLS, AUTH, attachments and provider presets (Hostinger, Gmail, Outlook, Zoho…). One-line setup.",
        "kw": [
          "smtp",
          "email",
          "mailer",
          "send-email",
          "nodemailer-alternative",
          "hostinger"
        ],
        "deps": 0
      }
    ]
  },
  {
    "group": "StockKit",
    "icon": "📈",
    "items": [
      {
        "n": "indicators",
        "v": "1.1.2",
        "d": "Streaming technical indicators (RSI, MACD, EMA, Bollinger, ATR, Supertrend, ADX, VWAP) with O(1) incremental updates for live price feeds. Zero-dependency.",
        "kw": [
          "technical-indicators",
          "trading",
          "stock-market",
          "rsi",
          "macd",
          "ema"
        ],
        "deps": 0
      },
      {
        "n": "market",
        "v": "1.1.3",
        "d": "Stock-market money math — P&L, returns, CAGR, XIRR, tick-size rounding, circuit limits, position sizing and an Indian brokerage & charges calculator (STT, GST, SEBI, stamp). Zero-dependency.",
        "kw": [
          "stock-market",
          "trading",
          "brokerage-calculator",
          "stt",
          "pnl",
          "xirr"
        ],
        "deps": 0
      },
      {
        "n": "market-clock",
        "v": "1.0.5",
        "d": "Holiday-aware, timezone-correct trading clock — is NSE/BSE open now, next open/close, pre-open, holidays. Bring your own exchange spec. Zero-dependency.",
        "kw": [
          "market-hours",
          "trading-hours",
          "stock-market",
          "nse",
          "bse",
          "market-open"
        ],
        "deps": 0
      },
      {
        "n": "paper-trade",
        "v": "1.1.3",
        "d": "Headless paper-trading engine — virtual wallet, market/limit/stop orders that fill against live prices, positions, holdings and live P&L. The simulator core behind StockYatra. Zero-dependency.",
        "kw": [
          "paper-trading",
          "trading-simulator",
          "stock-market",
          "virtual-trading",
          "backtesting",
          "portfolio"
        ],
        "deps": 0
      }
    ]
  },
  {
    "group": "Data Kit",
    "icon": "🧮",
    "items": [
      {
        "n": "csv",
        "v": "1.1.0",
        "d": "Correct, RFC 4180 CSV parsing & stringifying — quoted fields, escaped quotes, newlines in cells, CRLF, custom delimiters and typed row objects. Zero-dependency, isomorphic.",
        "kw": [
          "csv",
          "csv-parser",
          "csv-parse",
          "csv-stringify",
          "rfc4180",
          "tsv"
        ],
        "deps": 0
      },
      {
        "n": "xlsx",
        "v": "1.0.1",
        "d": "Write real Excel (.xlsx) files with zero dependencies and no headless browser — objects or arrays to a workbook, correct types (string/number/boolean/Date), bold headers, column widths, multiple sheets. Isomorphic (Node, edge, browser).",
        "kw": [
          "xlsx",
          "excel",
          "excel-export",
          "xlsx-writer",
          "spreadsheet",
          "export-to-excel"
        ],
        "deps": 0
      }
    ]
  },
  {
    "group": "Nepal Toolkit",
    "icon": "🇳🇵",
    "items": [
      {
        "n": "nepali-date",
        "v": "1.1.1",
        "d": "Bikram Sambat (BS) ↔ Gregorian (AD) date conversion — zero-dependency, isomorphic, with Nepali formatting.",
        "kw": [
          "nepali-date",
          "bikram-sambat",
          "bs-date",
          "nepali-calendar",
          "bs-ad-converter",
          "nepal"
        ],
        "deps": 0
      },
      {
        "n": "nepali-utils",
        "v": "1.1.2",
        "d": "Everyday Nepal helpers — NPR currency formatting, Devanagari numerals, amount-in-words, validators, provinces. Zero-dependency.",
        "kw": [
          "nepal",
          "nepali",
          "npr",
          "currency",
          "devanagari",
          "amount-in-words"
        ],
        "deps": 0
      }
    ]
  }
];

export const CATALOG_TOTAL = 63;
