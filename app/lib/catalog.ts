// Full @lacspace package catalog — generated from the monorepo (61 scoped packages).
// Plus 2 CLIs (create-lacspace-app, create-lacspace-seo) = 63 packages on npm.

export type Pkg = { n: string; v: string; d: string };
export type Group = { group: string; items: Pkg[] };

export const CATALOG: Group[] = [
  {
    "group": "Core",
    "items": [
      {
        "n": "analytics",
        "v": "2.0.5",
        "d": "Event tracking for Lacspace platforms — batching and an offline queue."
      },
      {
        "n": "analytics-lite",
        "v": "1.0.1",
        "d": "Privacy-first, cookieless web analytics — page views and custom events sent to your own endpoint. No cookies, no localStorage IDs, no cross-site tracking, no consent banner. Respects Do-Not-Track, auto-tracks SPA navigation, uses sendBeacon. Zero-dependency, isomorphic."
      },
      {
        "n": "api",
        "v": "2.1.2",
        "d": "Lightweight, zero-dependency, isomorphic TypeScript HTTP client for Lacspace APIs."
      },
      {
        "n": "auth",
        "v": "2.1.2",
        "d": "Authentication flows (login, register, token, refresh) for Lacspace APIs."
      },
      {
        "n": "next",
        "v": "1.1.2",
        "d": "Next.js App Router integration for the Lacspace SDK — authenticated server client from cookies, Route Handler & Server Action wrappers, cookie helpers and a middleware auth guard."
      },
      {
        "n": "react",
        "v": "1.1.0",
        "d": "React hooks and provider for the Lacspace SDK — useAuth, useQuery, useLacspace."
      },
      {
        "n": "sdk",
        "v": "2.1.0",
        "d": "High-level TypeScript SDK for Lacspace — api, auth, analytics and e-commerce in one client."
      }
    ]
  },
  {
    "group": "Security Kit",
    "items": [
      {
        "n": "apikey",
        "v": "1.2.0",
        "d": "Issue & verify API keys the right way — prefixed high-entropy keys, store only the SHA-256 hash, constant-time verify, last-4 display. Isomorphic over Web Crypto."
      },
      {
        "n": "crypto",
        "v": "1.1.2",
        "d": "Safe, boring cryptography over Web Crypto — authenticated AES-256-GCM, PBKDF2 key derivation, SHA-256, HMAC, secure random and constant-time compare. Isomorphic (Node, edge, browser, RN)."
      },
      {
        "n": "headers",
        "v": "1.1.2",
        "d": "Secure HTTP headers & a typed Content-Security-Policy builder — HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy. Framework-agnostic + Next.js. Zero-dependency, isomorphic."
      },
      {
        "n": "jwt",
        "v": "1.3.0",
        "d": "JSON Web Tokens (HS256/384/512) with strict expiry/issuer/audience checks + secure random & CSRF tokens. Isomorphic over Web Crypto — Node, edge, browser."
      },
      {
        "n": "lock",
        "v": "1.0.4",
        "d": "Account lockout & brute-force protection (server lock) — N-strikes, exponential backoff, self-resetting window, pluggable store. Zero-dependency, isomorphic."
      },
      {
        "n": "mfa",
        "v": "1.1.2",
        "d": "Orchestrate multi-factor auth — combine password + TOTP + passkeys into 2FA/3FA step-up flows with NIST assurance levels (AAL). Zero-dependency (bar @lacspace/otp), isomorphic."
      },
      {
        "n": "otp",
        "v": "1.1.2",
        "d": "TOTP & HOTP two-factor auth, Google Authenticator compatible — generate secrets, compute/verify codes and build otpauth:// QR URIs. Built on Web Crypto: runs on Node, edge and browser. Zero-dependency, isomorphic."
      },
      {
        "n": "password",
        "v": "1.0.4",
        "d": "Password hashing & verification — PBKDF2-HMAC-SHA256 (OWASP iterations) with a portable PHC string + a strength estimator. Isomorphic over Web Crypto."
      },
      {
        "n": "rate-limit",
        "v": "1.1.2",
        "d": "Framework-agnostic rate limiting — fixed-window, sliding-window and token-bucket over a pluggable store, with standard RateLimit-* headers. For API routes, middleware and edge. Zero-dependency, isomorphic."
      },
      {
        "n": "redact",
        "v": "1.0.4",
        "d": "Redact secrets & PII from strings and objects before logging — masks sensitive keys and patterns (JWTs, API keys, emails, cards, IPs). Safe AWS/Mongo logs. Zero-dependency, isomorphic."
      },
      {
        "n": "webauthn",
        "v": "1.1.0",
        "d": "Passkeys / biometric (FaceID, fingerprint, security keys) — browser ceremony helpers + server challenge, options and assertion verification (ES256/RS256) over Web Crypto. Zero-dependency, isomorphic."
      }
    ]
  },
  {
    "group": "SEO Kit",
    "items": [
      {
        "n": "llms-txt",
        "v": "1.3.0",
        "d": "Generate and parse llms.txt and llms-full.txt (the llmstxt.org standard) — a Markdown map of your site for LLMs. Zero-dependency, isomorphic."
      },
      {
        "n": "og",
        "v": "1.1.0",
        "d": "Dynamic Open Graph images — a share-card design system you configure once and call per page. Produces a next/og element tree AND a zero-dependency SVG from the same options, with auto-fitting titles, presets, badges and gradients. Zero-dependency, isomorphic."
      },
      {
        "n": "robots",
        "v": "1.3.0",
        "d": "Build and parse robots.txt — typed per-user-agent rules, AI-crawler block presets (GPTBot, ClaudeBot, CCBot, Google-Extended), sitemap refs and Next.js robots.ts output. Zero-dependency, isomorphic."
      },
      {
        "n": "rss",
        "v": "1.3.0",
        "d": "Generate RSS 2.0, Atom 1.0 and JSON Feed 1.1 from one set of items — content syndication for blogs and news. Zero-dependency, isomorphic."
      },
      {
        "n": "seo",
        "v": "1.7.0",
        "d": "Typed metadata + JSON-LD for modern web apps — schema.org builders (Organization, Article, Product, FAQ, Breadcrumb), a Next.js App Router Metadata helper, the defineSite() SEO Autopilot engine, and an on-page SEO auditor with a CI sitemap crawler that fails the build when SEO regresses (`npx @lacspace/seo audit <url>` / `crawl <site> --min-grade A`). Zero-dependency, isomorphic."
      },
      {
        "n": "site-verify",
        "v": "1.2.0",
        "d": "Search-engine site verification — meta tags, Next.js verification metadata and file tokens for Google Search Console, Bing, Yandex, Baidu, Pinterest, Ahrefs, Facebook & more. Zero-dependency, isomorphic."
      },
      {
        "n": "sitemap",
        "v": "1.2.0",
        "d": "Generate sitemap.xml, sitemap indexes and Next.js sitemaps — image/video/news extensions, hreflang alternates, auto-split at 50k URLs. Zero-dependency, isomorphic."
      },
      {
        "n": "slugify",
        "v": "1.1.0",
        "d": "Turn any text into a clean, SEO-friendly URL slug — transliterates diacritics, collapses separators, and guarantees uniqueness against an existing set. Zero-dependency, isomorphic."
      }
    ]
  },
  {
    "group": "React Kit",
    "items": [
      {
        "n": "hooks",
        "v": "1.0.1",
        "d": "Essential, SSR-safe React hooks — useLocalStorage, useDebounce, useMediaQuery, useOnClickOutside, useCopyToClipboard and 20+ more. Zero-dependency, fully typed, isomorphic."
      },
      {
        "n": "hotkeys",
        "v": "1.0.1",
        "d": "Ergonomic keyboard shortcuts for React — combos (mod+k), key sequences (g then d), scopes, and pretty display formatting (⌘K). SSR-safe, respects form fields, zero-dependency, fully typed."
      },
      {
        "n": "query",
        "v": "1.0.1",
        "d": "Tiny data fetching for React with a shared cache, request de-duplication, stale-while-revalidate, focus/reconnect revalidation, and mutations. useQuery + useMutation in ~2KB. Zero-dependency, SSR-safe, fully typed."
      },
      {
        "n": "store",
        "v": "1.1.0",
        "d": "Minimal global state for React in ~1KB — create a store, use selectors, no provider. Built on useSyncExternalStore with a persist middleware and shallow equality. Zero-dependency, SSR-safe, fully typed."
      },
      {
        "n": "theme",
        "v": "1.0.2",
        "d": "SSR-safe dark / light / system theme for React — a tiny ThemeProvider, a useTheme hook, and a no-flash inline script. Persists to storage, follows the OS, toggles a class or data-attribute. Zero-dependency, framework-agnostic, fully typed."
      },
      {
        "n": "ui",
        "v": "1.0.1",
        "d": "A tiny, dependency-free React kit that makes a page feel alive — scroll reveals, animated counters, gradient text, tilt cards, marquees, a typewriter and a ⌘K command palette. No animation library, no CSS import. Respects prefers-reduced-motion; Tailwind-friendly."
      },
      {
        "n": "virtual",
        "v": "1.0.1",
        "d": "Headless list virtualization for React — render only the rows in view, with fixed or dynamically-measured sizes, overscan, and scroll-to-index. useVirtualizer in ~2KB. Zero-dependency, SSR-safe, fully typed."
      }
    ]
  },
  {
    "group": "App & Utils Kit",
    "items": [
      {
        "n": "cache",
        "v": "1.0.1",
        "d": "A tiny in-memory cache — LRU eviction, per-entry TTL and stale-while-revalidate, plus wrap()/memoize() to cache any async function with in-flight de-duplication. Zero-dependency, isomorphic."
      },
      {
        "n": "case",
        "v": "1.0.1",
        "d": "Convert strings between cases — camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, Title Case, Sentence case. Handles acronyms & numbers. Zero-dependency, isomorphic."
      },
      {
        "n": "color",
        "v": "1.0.1",
        "d": "Parse, convert, manipulate and check colours — hex/rgb/hsl, lighten/darken/mix/alpha, and WCAG contrast for accessible palettes. Zero-dependency, isomorphic."
      },
      {
        "n": "env",
        "v": "1.0.4",
        "d": "Typed, validated environment variables — declare a schema, validate process.env at boot, get a typed frozen object or a clear fail-fast error. A zero-dependency t3-env / envalid alternative."
      },
      {
        "n": "flags",
        "v": "1.0.2",
        "d": "Feature flags & A/B experiments with no SaaS and no infrastructure — deterministic bucketing (same user always gets the same result), targeting rules, percentage rollouts and weighted variants. Synchronous, zero-dependency, isomorphic."
      },
      {
        "n": "form",
        "v": "1.0.1",
        "d": "End-to-end form handling for the server — turn FormData into typed, validated data with a honeypot + timing spam guard, and get back your data or per-field errors ready to re-render. Shaped for Next.js Server Actions. Zero-dependency, isomorphic."
      },
      {
        "n": "humanize",
        "v": "1.0.1",
        "d": "Turn machine values into human-readable text — bytes, durations, relative time, ordinals, plurals, compact numbers and grammatical lists. Zero-dependency, isomorphic."
      },
      {
        "n": "id",
        "v": "1.0.1",
        "d": "Unique IDs done right — UUID v4, time-sortable UUID v7, Nano-ID-style and short URL-safe codes. Cryptographically random (Web Crypto), zero-dependency, isomorphic."
      },
      {
        "n": "markdown",
        "v": "1.0.1",
        "d": "A small, safe Markdown → HTML renderer — headings with anchor ids, nested & task lists, fenced code, blockquotes, GFM tables, images and links. HTML in the source is escaped. Includes extractHeadings() for a table of contents. Zero-dependency, isomorphic."
      },
      {
        "n": "money",
        "v": "1.0.1",
        "d": "Money done right — integer minor units (no floating-point cent bugs), currency-safe arithmetic, remainder-preserving allocation/split, and localized formatting via Intl. Zero-dependency, isomorphic."
      },
      {
        "n": "retry",
        "v": "1.0.1",
        "d": "Resilience for flaky calls — retry with exponential backoff & jitter, per-call timeouts, and a circuit breaker. Zero-dependency, isomorphic."
      },
      {
        "n": "validate",
        "v": "1.0.1",
        "d": "A tiny, typed schema validator — the ergonomics of zod (parse/safeParse, object/array/enum/union, coercion, type inference) in a zero-dependency, isomorphic package. Great for forms, API bodies, env and query strings."
      }
    ]
  },
  {
    "group": "Backend Kit",
    "items": [
      {
        "n": "idempotency",
        "v": "1.0.1",
        "d": "Make any operation exactly-once with an idempotency key — replay stored results on retries, safe under concurrency, with optional request fingerprinting. Framework-agnostic, pluggable store, zero-dependency, isomorphic."
      },
      {
        "n": "pdf",
        "v": "1.0.1",
        "d": "Generate real PDFs — invoices, receipts & documents — with zero dependencies and no headless browser. Accurate text layout, auto page-breaks, batteries-included invoice() & receipt() generators. Isomorphic (Node, edge, browser)."
      },
      {
        "n": "signed-url",
        "v": "1.0.1",
        "d": "HMAC-signed, expiring URLs & tokens over Web Crypto — secure download links, magic-login links, unsubscribe links and one-time-action tokens. Tamper-proof, timing-safe, zero-config. Isomorphic (Node, edge, browser)."
      },
      {
        "n": "webhooks",
        "v": "1.0.1",
        "d": "The webhook toolkit for both directions — sign & deliver outgoing webhooks with retries, and verify incoming ones (timing-safe, replay-protected) with Stripe / GitHub / Shopify presets. Plus event ids & idempotency. One internal dependency (@lacspace/crypto), isomorphic."
      }
    ]
  },
  {
    "group": "Mail Kit",
    "items": [
      {
        "n": "email-templates",
        "v": "1.0.5",
        "d": "Compose bulletproof, responsive, dark-mode-aware HTML emails from simple blocks — buttons, OTP codes, invoices — with ready-made OTP/welcome/alert/invoice templates. Zero-dependency, isomorphic."
      },
      {
        "n": "email-validate",
        "v": "1.0.5",
        "d": "Smart email validation — syntax, disposable/temp-mail detection, role & free-provider flags, Gmail normalization and 'did you mean?' typo suggestions. Zero-dependency, isomorphic."
      },
      {
        "n": "email-verify",
        "v": "1.0.5",
        "d": "Best-effort email deliverability checks for Node — syntax + disposable, MX record lookup and an optional SMTP RCPT probe (no mail sent). Zero npm dependencies."
      },
      {
        "n": "mailer",
        "v": "1.0.6",
        "d": "A tiny zero-dependency SMTP client for Node backends — send email over raw net/tls with STARTTLS, AUTH, attachments and provider presets (Hostinger, Gmail, Outlook, Zoho…). One-line setup."
      }
    ]
  },
  {
    "group": "StockKit",
    "items": [
      {
        "n": "indicators",
        "v": "1.1.2",
        "d": "Streaming technical indicators (RSI, MACD, EMA, Bollinger, ATR, Supertrend, ADX, VWAP) with O(1) incremental updates for live price feeds. Zero-dependency."
      },
      {
        "n": "market",
        "v": "1.1.3",
        "d": "Stock-market money math — P&L, returns, CAGR, XIRR, tick-size rounding, circuit limits, position sizing and an Indian brokerage & charges calculator (STT, GST, SEBI, stamp). Zero-dependency."
      },
      {
        "n": "market-clock",
        "v": "1.0.5",
        "d": "Holiday-aware, timezone-correct trading clock — is NSE/BSE open now, next open/close, pre-open, holidays. Bring your own exchange spec. Zero-dependency."
      },
      {
        "n": "paper-trade",
        "v": "1.1.3",
        "d": "Headless paper-trading engine — virtual wallet, market/limit/stop orders that fill against live prices, positions, holdings and live P&L. The simulator core behind StockYatra. Zero-dependency."
      }
    ]
  },
  {
    "group": "Data Kit",
    "items": [
      {
        "n": "csv",
        "v": "1.1.0",
        "d": "Correct, RFC 4180 CSV parsing & stringifying — quoted fields, escaped quotes, newlines in cells, CRLF, custom delimiters and typed row objects. Zero-dependency, isomorphic."
      },
      {
        "n": "xlsx",
        "v": "1.0.1",
        "d": "Write real Excel (.xlsx) files with zero dependencies and no headless browser — objects or arrays to a workbook, correct types (string/number/boolean/Date), bold headers, column widths, multiple sheets. Isomorphic (Node, edge, browser)."
      }
    ]
  },
  {
    "group": "Nepal Toolkit",
    "items": [
      {
        "n": "nepali-date",
        "v": "1.1.1",
        "d": "Bikram Sambat (BS) ↔ Gregorian (AD) date conversion — zero-dependency, isomorphic, with Nepali formatting."
      },
      {
        "n": "nepali-utils",
        "v": "1.1.2",
        "d": "Everyday Nepal helpers — NPR currency formatting, Devanagari numerals, amount-in-words, validators, provinces. Zero-dependency."
      }
    ]
  }
];

export const CATALOG_TOTAL = 63;
