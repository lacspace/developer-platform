// Full @lacspace package catalog — generated from the monorepo (93 scoped packages).
// Plus 2 CLIs (create-lacspace-app, create-lacspace-seo) = 87 packages on npm.

export type Pkg = { n: string; v: string; d: string; kw: string[]; deps: number };
export type Group = { group: string; icon: string; items: Pkg[] };

export const CATALOG: Group[] = [
  {
    "group": "Core",
    "icon": "🧩",
    "items": [
      {
        "n": "analytics",
        "v": "2.0.7",
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
        "v": "1.0.3",
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
        "v": "2.1.4",
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
        "v": "2.1.4",
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
        "v": "1.1.4",
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
        "v": "1.1.2",
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
        "v": "2.1.2",
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
        "v": "1.2.2",
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
        "v": "1.1.4",
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
        "v": "1.1.4",
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
        "v": "1.4.0",
        "d": "JSON Web Tokens over Web Crypto — HS/RS/ES/EdDSA signing, JWK/JWKS with kid-based key rotation, and strict expiry/issuer/audience/subject/jti checks. Plus refresh-token rotation and CSRF tokens. Isomorphic — Node, edge, browser.",
        "kw": [
          "jwt",
          "jsonwebtoken",
          "hs256",
          "token",
          "auth",
          "csrf",
          "eddsa",
          "ed25519",
          "jwk",
          "jwks",
          "key-rotation",
          "oidc"
        ],
        "deps": 1
      },
      {
        "n": "lock",
        "v": "1.0.6",
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
        "v": "1.2.0",
        "d": "Orchestrate multi-factor auth — combine password + TOTP + passkeys into 2FA/3FA step-up flows with NIST assurance levels (AAL), now with factor enrollment flows, failed-attempt lockout, trusted-device tokens and recovery codes. Isomorphic (bar @lacspace/otp).",
        "kw": [
          "mfa",
          "2fa",
          "3fa",
          "multi-factor",
          "step-up-auth",
          "aal",
          "enrollment",
          "lockout",
          "trusted-device",
          "recovery-codes"
        ],
        "deps": 2
      },
      {
        "n": "otp",
        "v": "1.2.0",
        "d": "TOTP & HOTP two-factor auth, Google Authenticator compatible — generate secrets, compute/verify codes, parse and build otpauth:// QR URIs, and issue single-use recovery codes. Built on Web Crypto: Node, edge and browser. Zero-dependency, isomorphic.",
        "kw": [
          "otp",
          "totp",
          "hotp",
          "2fa",
          "two-factor",
          "authenticator",
          "otpauth-uri",
          "recovery-codes",
          "base32"
        ],
        "deps": 0
      },
      {
        "n": "password",
        "v": "1.1.0",
        "d": "Password hashing & verification — PBKDF2-HMAC-SHA256 (OWASP iterations, portable PHC string) plus a zxcvbn-style strength estimator, k-anonymity breach check, a configurable policy evaluator, and CSPRNG passphrase/password generators. Isomorphic over Web Crypto.",
        "kw": [
          "password",
          "hash",
          "pbkdf2",
          "password-hashing",
          "verify",
          "phc",
          "breach-check",
          "haveibeenpwned",
          "password-strength",
          "passphrase",
          "password-policy"
        ],
        "deps": 1
      },
      {
        "n": "rate-limit",
        "v": "1.1.4",
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
        "v": "1.0.6",
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
        "v": "1.1.2",
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
        "v": "1.3.2",
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
        "v": "1.1.2",
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
        "v": "1.3.2",
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
        "v": "1.3.2",
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
        "v": "1.7.2",
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
        "v": "1.2.2",
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
        "v": "1.2.2",
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
        "v": "1.1.2",
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
        "v": "1.0.3",
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
        "v": "1.0.3",
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
        "v": "1.0.3",
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
        "v": "1.1.2",
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
        "v": "1.0.4",
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
        "v": "1.0.3",
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
        "v": "1.0.3",
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
        "v": "1.0.3",
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
        "v": "1.0.3",
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
        "v": "1.0.3",
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
        "v": "1.0.6",
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
        "v": "1.0.4",
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
        "v": "1.0.3",
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
        "v": "1.0.3",
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
        "v": "1.0.3",
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
        "v": "1.0.3",
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
        "v": "1.0.3",
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
        "v": "1.0.3",
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
        "v": "1.0.3",
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
        "v": "1.0.3",
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
        "v": "1.0.3",
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
        "v": "1.0.3",
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
        "v": "1.0.3",
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
        "v": "1.0.7",
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
        "v": "1.0.7",
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
        "v": "1.0.7",
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
        "v": "1.1.1",
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
        "v": "1.1.4",
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
        "v": "1.1.5",
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
        "v": "1.0.7",
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
        "v": "1.1.5",
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
        "v": "1.1.2",
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
        "v": "1.1.1",
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
        "v": "1.1.3",
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
        "v": "1.1.4",
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
  },
  {
    "group": "Commerce & Ledger",
    "icon": "🛒",
    "items": [
      {
        "n": "cart",
        "v": "1.0.2",
        "d": "Headless, framework-agnostic shopping-cart engine — pure, immutable & serializable. Add/merge lines, set quantities, compute tax/discount/shipping totals in integer minor units. Isomorphic (Node, edge, browser).",
        "kw": ["cart", "shopping-cart", "ecommerce", "checkout", "totals", "headless"],
        "deps": 0
      },
      {
        "n": "inventory",
        "v": "1.0.2",
        "d": "Stock-tracking engine that prevents overselling — reserve, release, commit & restock over a plain { onHand, reserved } state. Immutable, bring-your-own-store, throws before it oversells. Isomorphic.",
        "kw": ["inventory", "stock", "reservation", "oversell", "ecommerce", "fulfilment"],
        "deps": 0
      },
      {
        "n": "commission",
        "v": "1.0.2",
        "d": "Commission & payout calculation engine — flat, percentage and marginal-tiered rules with min/cap, plus exact proportional split with remainder distribution. Integer minor units, zero floats. Isomorphic.",
        "kw": ["commission", "payout", "marketplace", "tiered", "revenue-share", "split"],
        "deps": 0
      },
      {
        "n": "settlement",
        "v": "1.0.2",
        "d": "Settlement, netting & reconciliation for multi-party payouts — net signed ledger entries per account, reconcile expected vs actual, and list payable positive balances. Integer minor units, pure functions. Isomorphic.",
        "kw": ["settlement", "netting", "reconciliation", "payouts", "multi-party", "fintech"],
        "deps": 0
      },
      {
        "n": "coupon",
        "v": "1.0.1",
        "d": "Discount & coupon engine — percent, fixed and free-shipping codes with validity windows, minimum-subtotal, discount caps and usage limits. Integer minor units, no float drift. Zero-dependency, isomorphic.",
        "kw": ["coupon", "discount", "promo-code", "voucher", "free-shipping", "checkout"],
        "deps": 0
      },
      {
        "n": "tax",
        "v": "1.0.1",
        "d": "VAT & sales-tax done right — exact integer minor-unit arithmetic (no float cents bugs), add/extract tax, inclusive & exclusive prices, compound taxes, half-up/bankers rounding. Isomorphic.",
        "kw": ["tax", "vat", "sales-tax", "gst", "tax-inclusive", "rounding"],
        "deps": 0
      },
      {
        "n": "ledger",
        "v": "1.0.1",
        "d": "A tiny double-entry ledger & wallet — balanced transactions, per-account balances and a trial balance that always sums to zero. Integer minor units, immutable ops, crypto-random ids. Isomorphic.",
        "kw": ["ledger", "double-entry", "accounting", "wallet", "trial-balance", "minor-units"],
        "deps": 0
      },
      {
        "n": "audit-log",
        "v": "1.1.1",
        "d": "Structured audit-trail toolkit — who did what, when, with before/after diffs, actor attribution and field-level redaction, plus a tamper-evident SHA-256 hash chain that proves the log was never altered. Zero-dependency, isomorphic.",
        "kw": ["audit-log", "audit-trail", "tamper-evident", "hash-chain", "compliance", "diff"],
        "deps": 0
      },
      {
        "n": "courier",
        "v": "1.0.2",
        "d": "Courier / last-mile delivery toolkit — canonical delivery state machine, Pathao (Nepal) adapter, and inbound webhook verification + status normalization. Zero-dependency, isomorphic.",
        "kw": ["courier", "logistics", "delivery", "pathao", "nepal", "webhook"],
        "deps": 0
      },
      {
        "n": "order",
        "v": "1.0.1",
        "d": "Headless order-lifecycle engine — an immutable order model with a state machine, order-number generation, line-item price snapshotting and timestamped status history. Integer minor units, zero-dependency, isomorphic.",
        "kw": ["order", "order-management", "ecommerce", "state-machine", "checkout", "fulfillment"],
        "deps": 0
      },
      {
        "n": "refund",
        "v": "1.0.2",
        "d": "Returns / RMA workflow and refund-calculation engine — partial refunds with correct tax apportionment, restocking fees, restock lists and a return state machine. Integer minor units, zero-dependency, isomorphic.",
        "kw": ["refund", "returns", "rma", "ecommerce", "partial-refund", "restock"],
        "deps": 0
      },
      {
        "n": "shipping",
        "v": "1.1.1",
        "d": "Checkout-time shipping-rate calculator — flat / weight / price / item rate tables by zone, free-shipping thresholds, surcharges and handling, returning sorted method quotes. Integer minor units, zero-dependency, isomorphic.",
        "kw": ["shipping", "shipping-rates", "ecommerce", "checkout", "free-shipping", "delivery"],
        "deps": 0
      },
      {
        "n": "invoice",
        "v": "1.0.2",
        "d": "Invoice model, numbering and tax-rollup engine — per-line and total calculation, tax grouped by rate, sequential invoice numbers, payment tracking and a render-ready row structure for PDF/XLSX. Integer minor units, zero-dependency, isomorphic.",
        "kw": ["invoice", "invoicing", "billing", "tax", "accounting", "ecommerce"],
        "deps": 0
      }
    ]
  },
  {
    "group": "Nepal Payments",
    "icon": "💳",
    "items": [
      {
        "n": "esewa",
        "v": "1.1.1",
        "d": "eSewa ePay v2 (Nepal) payment gateway toolkit over Web Crypto — HMAC-SHA256 signing, form building, response verification and transaction status checks. Zero-dependency, isomorphic.",
        "kw": ["nepal", "payment", "esewa", "epay-v2", "hmac-sha256", "web-crypto"],
        "deps": 0
      },
      {
        "n": "khalti",
        "v": "1.0.1",
        "d": "Khalti KPG-2 (ePayment API v2, Nepal) client — initiate payments, look up status, typed errors and Key auth over global fetch. Zero-dependency, isomorphic.",
        "kw": ["nepal", "payment", "khalti", "kpg-2", "epayment", "fetch"],
        "deps": 0
      },
      {
        "n": "connectips",
        "v": "1.0.1",
        "d": "Connect IPS (Nepal) merchant integration over Web Crypto — sign the redirect transaction token with your RSA private key and validate transactions server-to-server. Zero-dep, isomorphic.",
        "kw": ["connectips", "nepal", "payment", "nchl", "rsa-sha256", "web-crypto"],
        "deps": 0
      },
      {
        "n": "fonepay",
        "v": "1.0.1",
        "d": "Fonepay (Nepal) merchant redirect / Request-To-Pay over Web Crypto — HMAC-SHA512 sign the request DV and verify the response DV. Zero-dep, isomorphic.",
        "kw": ["fonepay", "nepal", "payment", "request-to-pay", "hmac-sha512", "web-crypto"],
        "deps": 0
      }
    ]
  },
  {
    "group": "AI Kit",
    "icon": "🤖",
    "items": [
      {
        "n": "ai",
        "v": "1.0.0",
        "d": "A tiny, provider-agnostic LLM chat client over fetch — one chat()/stream() API for OpenAI, Anthropic, Google Gemini and any OpenAI-compatible endpoint (Groq, Together, OpenRouter, Ollama). Bring your own key, no SDK, isomorphic.",
        "kw": ["ai", "llm", "chat", "openai", "anthropic", "claude", "gemini", "groq", "openrouter", "ollama"],
        "deps": 0
      },
      {
        "n": "prompt",
        "v": "1.0.0",
        "d": "A tiny, typed prompt-engineering toolkit — build, compose and render LLM prompts and chat messages with real type safety. Variable names are inferred from the template string, so .render() is type-checked. Zero-dependency, isomorphic.",
        "kw": ["ai", "llm", "prompt", "prompt-engineering", "prompt-template", "chat-messages", "few-shot", "template", "type-inference", "typescript"],
        "deps": 0
      },
      {
        "n": "tokenizer",
        "v": "1.0.0",
        "d": "A fast token estimator, LLM cost calculator and context-budget manager — good-enough GPT/Claude/Gemini token counts without the 3 MB tiktoken/wasm. Zero-dependency, isomorphic and fully typed.",
        "kw": ["tokenizer", "token-counter", "token-estimate", "llm", "ai", "prompt-engineering", "openai", "claude", "gpt", "cost-calculator"],
        "deps": 0
      },
      {
        "n": "json-repair",
        "v": "1.0.0",
        "d": "Extract and repair JSON from messy LLM output — strip code fences and prose, fix trailing commas, single quotes, unquoted keys and Python literals, and close truncated objects. Zero-dependency, isomorphic, typed.",
        "kw": ["json-repair", "json-parse", "extract-json", "llm", "ai", "openai", "prompt-engineering", "structured-output", "streaming-json", "partial-json"],
        "deps": 0
      },
      {
        "n": "chunk",
        "v": "1.0.0",
        "d": "A tiny text splitter for RAG and long-context prompts — recursive character, Markdown, code, sentence and paragraph chunking with overlap and a pluggable token-aware lengthFn. Zero-dependency, isomorphic.",
        "kw": ["chunk", "text-splitter", "chunking", "rag", "retrieval", "embeddings", "recursive-character-text-splitter", "markdown-splitter", "code-splitter", "ai"],
        "deps": 0
      },
      {
        "n": "stream",
        "v": "1.0.0",
        "d": "A zero-dependency, isomorphic parser for Server-Sent Events and streaming LLM responses — turn a fetch body into a clean async iterator of text and tool-call deltas, normalized across OpenAI and Anthropic. No SDK, keyless.",
        "kw": ["sse", "server-sent-events", "eventsource", "streaming", "llm", "openai", "anthropic", "chat-completion", "tool-calls", "async-iterator"],
        "deps": 0
      },
      {
        "n": "ai-tools",
        "v": "1.0.0",
        "d": "Define LLM function-calling / tool-use tools once and use them with any provider — generate the OpenAI, Anthropic or Google tool spec AND get a runtime dispatcher that validates arguments and calls your handler. Zero-dependency, keyless.",
        "kw": ["ai", "llm", "function-calling", "tool-use", "tool-calling", "agents", "openai", "anthropic", "gemini", "json-schema"],
        "deps": 0
      }
    ]
  },
  {
    "group": "Testing Kit",
    "icon": "🧪",
    "items": [
      {
        "n": "expect",
        "v": "1.0.0",
        "d": "A fluent assertion library that runs anywhere — deep-equal, async resolves/rejects, toThrow, asymmetric matchers (any/objectContaining/…) and expect.extend custom matchers. Throws a descriptive error, so it plugs into any runner or the browser. Zero-dependency, isomorphic.",
        "kw": ["expect", "assert", "assertion", "matchers", "deep-equal", "testing", "unit-testing", "vitest", "jest", "typescript"],
        "deps": 0
      },
      {
        "n": "spy",
        "v": "1.0.0",
        "d": "Spies, stubs, mocks and deterministic fake timers for any test runner or the browser — record calls, program returns/throws/resolves with once-queues, spyOn with call-through, and tick a fake clock. Zero-dependency, isomorphic.",
        "kw": ["spy", "stub", "mock", "mocking", "test-double", "fake-timers", "sinon", "vitest", "jest", "testing"],
        "deps": 0
      },
      {
        "n": "fixtures",
        "v": "1.0.0",
        "d": "Typed, deterministic test-data factories — define a factory once, then build realistic objects with sequences, traits, associations and transient params. Seed it and the same data comes out every run. Zero-dependency, isomorphic.",
        "kw": ["fixtures", "factory", "test-data", "factory-bot", "seed", "deterministic", "mock-data", "testing", "typescript", "isomorphic"],
        "deps": 0
      },
      {
        "n": "snapshot",
        "v": "1.0.0",
        "d": "Snapshot testing without a framework — a stable, deterministic value serializer (sorted keys, circular-safe, pluggable) plus inline and file (.snap) matchers. Isomorphic core, with a node subpath for filesystem snapshots. Zero-dependency.",
        "kw": ["snapshot", "snapshot-testing", "serialize", "pretty-format", "stable-stringify", "inline-snapshot", "toMatchSnapshot", "deterministic", "testing", "typescript"],
        "deps": 0
      }
    ]
  },
  {
    "group": "Dates & Time",
    "icon": "🕒",
    "items": [
      {
        "n": "datetime",
        "v": "1.0.0",
        "d": "An immutable date-time toolkit — arithmetic, start/end of unit, diff & breakdown, comparison, token format/parse and ISO — a tiny date-fns/dayjs with no dependencies. Zero-dependency, isomorphic.",
        "kw": ["date", "time", "datetime", "date-fns", "dayjs", "moment", "immutable", "format", "parse", "diff"],
        "deps": 0
      },
      {
        "n": "duration",
        "v": "1.0.0",
        "d": "A Duration type — parse, build, normalize and do arithmetic on ISO-8601 time spans, calendar-honest about months & years (never silently assumes a 30-day month). Pairs with @lacspace/humanize for display. Zero-dependency, isomorphic.",
        "kw": ["duration", "iso8601", "parse-duration", "time-span", "period", "date-math", "temporal", "immutable", "typescript", "isomorphic"],
        "deps": 0
      },
      {
        "n": "timezone",
        "v": "1.0.0",
        "d": "An IANA timezone toolkit built on Intl — DST-correct offsets, wall-clock parts, zoned↔UTC conversion and DST detection, with no bundled tz database so it stays tiny and always current. Zero-dependency, isomorphic.",
        "kw": ["timezone", "iana", "intl", "dst", "utc-offset", "zoned-time", "wall-clock", "convert-timezone", "typescript", "isomorphic"],
        "deps": 0
      },
      {
        "n": "interval",
        "v": "1.0.0",
        "d": "Time ranges, date iteration and business-day math — overlaps, merge, free/busy invert, eachDay/Week/Month, and add/subtract business days with weekend & holiday config. Zero-dependency, isomorphic.",
        "kw": ["interval", "date-range", "time-range", "overlap", "merge-intervals", "free-busy", "date-iteration", "business-days", "typescript", "isomorphic"],
        "deps": 0
      }
    ]
  }
];

export const CATALOG_TOTAL = 95;
