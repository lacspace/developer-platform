// Generated from the monorepo — per-package exports + a usage example.
export type PkgDetail = { exports: string[]; usage: string };
export const DETAILS: Record<string, PkgDetail> = {
 "analytics": {
  "exports": [
   "LacspaceAnalytics",
   "createAnalytics"
  ],
  "usage": "import { LacspaceAnalytics } from \"@lacspace/analytics\";\n\nconst analytics = new LacspaceAnalytics({ baseURL: \"https://api.lacspace.com/api\" });\n\nawait analytics.track(\"product_viewed\", { id: \"p_123\", price: 499 });"
 },
 "analytics-lite": {
  "exports": [
   "createAnalytics"
  ],
  "usage": "import { createAnalytics } from \"@lacspace/analytics-lite\";\n\nconst analytics = createAnalytics({\n  endpoint: \"/api/collect\",  // your own collector\n  siteId: \"acme\",\n});\n\nanalytics.pageview();                       // manual page view\nanalytics.track(\"signup\", { plan: \"pro\" }); // custom event\nconst stop = analytics.autoTrack();         // auto page views on route change (SPA)"
 },
 "api": {
  "exports": [
   "LacspaceApi",
   "LacspaceApiError",
   "createApi",
   "isApiError"
  ],
  "usage": "import { LacspaceApi } from \"@lacspace/api\";\n\nconst api = new LacspaceApi({\n  baseURL: \"https://api.lacspace.com/api\",\n  apiKey: \"your-token\", // optional\n});\n\nconst products = await api.get<Product[]>(\"products\");"
 },
 "apikey": {
  "exports": [
   "ApiKeyError",
   "authenticateApiKey",
   "expressApiKey",
   "extractApiKey",
   "generateApiKey",
   "hashApiKey",
   "isValidKeyFormat",
   "parseApiKey",
   "verifyApiKey"
  ],
  "usage": "import { generateApiKey, verifyApiKey } from \"@lacspace/apikey\";\n\n// on create — show `key` to the user ONCE, store the rest\nconst { key, hash, prefix, last4 } = await generateApiKey({ prefix: \"lac_live\" });\n// key:  \"lac_live_9f8a…\"   (return to user, never store)\n// hash: \"3b2c…\"            (store this), prefix, last4 for display\n\n// on each request\nconst presented = req.headers[\"x-api-key\"];\nif (await verifyApiKey(presented, storedHash)) { /* authorized */ }"
 },
 "auth": {
  "exports": [
   "LacspaceAuth",
   "createAuth",
   "localStorageTokenStorage",
   "memoryTokenStorage"
  ],
  "usage": "import { LacspaceAuth } from \"@lacspace/auth\";\n\nconst auth = new LacspaceAuth({ baseURL: \"https://api.lacspace.com/api\" });\n\nconst { token, user } = await auth.login({ email: \"you@shop.com\", password: \"••••••••\" });\nconst me = await auth.me();   // already authenticated\nawait auth.logout();"
 },
 "cache": {
  "exports": [
   "createCache",
   "memoize"
  ],
  "usage": "import { createCache } from \"@lacspace/cache\";\n\nconst cache = createCache<User>({ max: 500, ttl: 60_000 });\n\ncache.set(\"a\", user);\ncache.get(\"a\");        // user  (or undefined once expired)\ncache.has(\"a\");        // true\ncache.size;            // 1"
 },
 "case": {
  "exports": [
   "camelCase",
   "capitalize",
   "changeCase",
   "constantCase",
   "dotCase",
   "kebabCase",
   "pascalCase",
   "pathCase",
   "sentenceCase",
   "snakeCase",
   "titleCase",
   "words"
  ],
  "usage": "import { camelCase, snakeCase, kebabCase, constantCase, titleCase, changeCase } from \"@lacspace/case\";\n\ncamelCase(\"foo_bar-baz\");        // \"fooBarBaz\"\nsnakeCase(\"fooBarBaz\");          // \"foo_bar_baz\"\nkebabCase(\"XMLHttpRequest\");     // \"xml-http-request\"\nconstantCase(\"fooBar\");          // \"FOO_BAR\"\ntitleCase(\"hello_world\");        // \"Hello World\"\n\nchangeCase(\"fooBar\", \"kebab\");   // \"foo-bar\"   ← pick the case at runtime"
 },
 "color": {
  "exports": [
   "alpha",
   "contrast",
   "darken",
   "desaturate",
   "grayscale",
   "hslToRgb",
   "isDark",
   "isReadable",
   "lighten",
   "luminance",
   "mix",
   "parse",
   "readableTextColor",
   "rotate",
   "saturate",
   "toHex",
   "toHsl",
   "toHslObject",
   "toRgb"
  ],
  "usage": "import { toHsl, lighten, mix, alpha } from \"@lacspace/color\";\n\ntoHsl(\"#ff0000\");            // \"hsl(0, 100%, 50%)\"\nlighten(\"#2563eb\", 15);      // a lighter blue\nmix(\"#000000\", \"#ffffff\");   // \"#808080\"\nalpha(\"#2563eb\", 0.2);       // \"rgba(37, 99, 235, 0.2)\""
 },
 "crypto": {
  "exports": [
   "Keyring",
   "constantTimeEqual",
   "decrypt",
   "decryptBytes",
   "decryptWithPassword",
   "deriveBits",
   "digest",
   "encrypt",
   "encryptWithPassword",
   "fromBase64url",
   "fromHex",
   "generateKey",
   "hkdf",
   "hmac",
   "hmacVerify",
   "randomBytes",
   "sha256",
   "toBase64url",
   "toHex"
  ],
  "usage": "import { generateKey, encrypt, decrypt } from \"@lacspace/crypto\";\n\nconst key = generateKey();                 // 256-bit base64url key — store securely\nconst blob = await encrypt(\"card: 4242…\", key);\n// \"v1:<iv>:<ciphertext+tag>\"  — safe to store in Mongo / S3\nconst plain = await decrypt(blob, key);    // \"card: 4242…\""
 },
 "csv": {
  "exports": [
   "parse",
   "parseAuto",
   "stringify"
  ],
  "usage": "import { parse } from \"@lacspace/csv\";\n\nparse(\"name,note\\nAda,\\\"says \\\"\\\"hi\\\"\\\", and, more\\\"\");\n// [{ name: \"Ada\", note: 'says \"hi\", and, more' }]\n\nparse<{ id: string; qty: string }>(csvText);        // typed objects\nparse(csvText, { header: false });                  // string[][]"
 },
 "email-templates": {
  "exports": [
   "alertEmail",
   "button",
   "code",
   "defaultTheme",
   "divider",
   "escapeHtml",
   "heading",
   "html",
   "image",
   "invoiceEmail",
   "keyValue",
   "list",
   "otpEmail",
   "render",
   "spacer",
   "text",
   "welcomeEmail"
  ],
  "usage": "import { otpEmail, welcomeEmail, alertEmail, invoiceEmail } from \"@lacspace/email-templates\";\n\nconst html = otpEmail({\n  code: \"482913\",\n  brandName: \"Lacspace\",\n  expiresMinutes: 10,\n});\n\nwelcomeEmail({ name: \"Aayush\", ctaLabel: \"Open dashboard\", ctaHref: \"https://one.lacspace.com\" });\nalertEmail({ title: \"Server is back up\", message: \"api.lacspace.com recovered at 14:32.\" });\ninvoiceEmail({\n  heading: \"Payment receipt\",\n  rows: [[\"Plan\", \"Pro\"], [\"Period\", \"Aug 2026\"]],\n  total: [\"Total\", \"₹1,499.00\"],\n  ctaHref: \"https://one.lacspace.com/invoices/123\",\n});"
 },
 "email-validate": {
  "exports": [
   "DISPOSABLE_DOMAINS",
   "FREE_PROVIDERS",
   "ROLE_LOCALS",
   "isDisposable",
   "isFreeProvider",
   "isRoleAddress",
   "isValidEmail",
   "normalizeEmail",
   "suggestEmail",
   "validateEmail"
  ],
  "usage": "import { validateEmail } from \"@lacspace/email-validate\";\n\nvalidateEmail(\"john.doe+news@gmial.com\");\n// {\n//   valid: true,\n//   normalized: \"john.doe@gmial.com\",\n//   local: \"john.doe+news\",\n//   domain: \"gmial.com\",\n//   disposable: false,\n//   role: false,\n//   free: false,\n//   suggestion: \"john.doe+news@gmail.com\"   // ← typo caught\n// }\n\nvalidateEmail(\"test@mailinator.com\").disposable; // true\nvalidateEmail(\"info@lacspace.com\").role;          // true\nvalidateEmail(\"nope@@bad\").valid;                 // false"
 },
 "email-verify": {
  "exports": [
   "resolveMx",
   "smtpCheck",
   "verifyEmail"
  ],
  "usage": "import { verifyEmail } from \"@lacspace/email-verify\";\n\nawait verifyEmail(\"someone@gmail.com\");\n// {\n//   email: \"someone@gmail.com\",\n//   valid: true,\n//   syntax: true,\n//   disposable: false,\n//   role: false,\n//   mxFound: true,\n//   mxRecords: [{ exchange: \"gmail-smtp-in.l.google.com\", priority: 5 }, …],\n//   smtp: \"unknown\"   // Gmail greylists probes — expected\n// }\n\n// MX-only (fast, reliable, no port-25 needed) — great default in cloud/serverless\nawait verifyEmail(email, { checkSmtp: false });"
 },
 "env": {
  "exports": [
   "EnvError",
   "bool",
   "createEnv",
   "email",
   "int",
   "json",
   "num",
   "oneOf",
   "port",
   "str",
   "url"
  ],
  "usage": "// env.ts\nimport { createEnv, str, port, url, bool, oneOf } from \"@lacspace/env\";\n\nexport const env = createEnv({\n  NODE_ENV: oneOf([\"development\", \"production\", \"test\"], { default: \"development\" }),\n  PORT: port({ default: 3000 }),\n  DATABASE_URL: url(),\n  SMTP_HOST: str(),\n  SMTP_PORT: port({ default: 587 }),\n  DEBUG: bool({ default: false }),\n  ADMIN_EMAILS: str({ optional: true }),\n});"
 },
 "flags": {
  "exports": [
   "Flags",
   "bucket",
   "isEnabled",
   "percentage",
   "variant"
  ],
  "usage": "import { Flags } from \"@lacspace/flags\";\n\n// Config — load from JSON / env / DB, hot-swap with flags.update(...)\nexport const flags = new Flags({\n  \"new-dashboard\": { rollout: 25 },                              // 25% of users\n  \"beta\": { rules: [{ when: { plan: \"pro\" }, value: true }] },   // pro users only\n  \"eu-feature\": { rules: [{ when: { country: { in: [\"DE\", \"FR\"] } }, value: true }] },\n  \"checkout-exp\": {                                              // A/B test\n    type: \"variant\",\n    variants: [{ key: \"control\", weight: 1 }, { key: \"one-click\", weight: 1 }],\n  },\n});\n\n// Evaluate — synchronous, stable per user\nflags.isEnabled(\"new-dashboard\", { key: user.id });                       // boolean\nflags.isEnabled(\"beta\", { key: user.id, attributes: { plan: user.plan } });\nflags.variant(\"checkout-exp\", { key: user.id });                          // \"control\" | \"one-click\""
 },
 "form": {
  "exports": [
   "createForm",
   "formDataToObject",
   "handleForm",
   "honeypotProps",
   "timestampValue"
  ],
  "usage": "// app/actions.ts\n\"use server\";\nimport { createForm } from \"@lacspace/form\";\nimport { v } from \"@lacspace/validate\";\n\nconst contact = createForm({\n  schema: v.object({\n    name: v.string().min(2),\n    email: v.string().email(),\n    message: v.string().min(10),\n  }),\n  honeypot: \"company\",   // hidden field bots fill; humans never see it\n  minSubmitMs: 800,      // reject sub-second (bot-speed) submissions\n});\n\nexport async function submit(prev: unknown, formData: FormData) {\n  const r = contact.action(prev, formData);\n  if (!r.ok) return r;              // { errors, values } → re-render form\n  await sendEmail(r.data);          // ✅ { name, email, message } fully typed\n  return { ok: true as const };\n}"
 },
 "headers": {
  "exports": [
   "applyHeaders",
   "csp",
   "expressSecurityHeaders",
   "generateNonce",
   "securityHeaders",
   "strictCsp",
   "toNextHeaders"
  ],
  "usage": "import { securityHeaders, csp } from \"@lacspace/headers\";\n\nconst headers = securityHeaders({\n  contentSecurityPolicy: {\n    defaultSrc: [\"'self'\"],\n    scriptSrc: [\"'self'\", \"https://cdn.example.com\"],\n    imgSrc: [\"'self'\", \"data:\", \"https:\"],\n    upgradeInsecureRequests: true,\n  },\n});\n// { \"Strict-Transport-Security\": \"max-age=15552000; includeSubDomains\",\n//   \"X-Content-Type-Options\": \"nosniff\", \"X-Frame-Options\": \"SAMEORIGIN\",\n//   \"Referrer-Policy\": \"strict-origin-when-cross-origin\", \"Content-Security-Policy\": \"…\" }\n\n// apply in any framework\nfor (const [k, v] of Object.entries(headers)) res.setHeader(k, v);"
 },
 "hooks": {
  "exports": [
   "useCopyToClipboard",
   "useCounter",
   "useDebounce",
   "useDebouncedCallback",
   "useDisclosure",
   "useDocumentTitle",
   "useEventListener",
   "useHover",
   "useIdle",
   "useIntersectionObserver",
   "useInterval",
   "useIsMounted",
   "useIsomorphicLayoutEffect",
   "useKeyPress",
   "useLocalStorage",
   "useLockBodyScroll",
   "useMediaQuery",
   "useMountEffect",
   "useOnClickOutside",
   "useOnlineStatus",
   "usePrevious",
   "useScrollPosition",
   "useSessionStorage",
   "useThrottle",
   "useTimeout",
   "useToggle",
   "useUpdateEffect",
   "useWindowSize"
  ],
  "usage": "import { useLocalStorage } from \"@lacspace/hooks\";\n\nfunction ThemeToggle() {\n  const [theme, setTheme] = useLocalStorage(\"theme\", \"light\");\n  return (\n    <button onClick={() => setTheme((t) => (t === \"light\" ? \"dark\" : \"light\"))}>\n      {theme}\n    </button>\n  );\n}"
 },
 "hotkeys": {
  "exports": [
   "disableScope",
   "enableScope",
   "formatHotkey",
   "isMac",
   "isScopeActive",
   "matchesHotkey",
   "parseHotkey",
   "toggleScope",
   "useHotkeys",
   "useHotkeysScopes"
  ],
  "usage": "import { useState } from \"react\";\nimport { useHotkeys, formatHotkey } from \"@lacspace/hotkeys\";\n\nfunction App() {\n  const [open, setOpen] = useState(false);\n\n  // ⌘K on mac, Ctrl+K elsewhere. preventDefault is on by default.\n  useHotkeys(\"mod+k\", () => setOpen((v) => !v));\n\n  return (\n    <>\n      <button onClick={() => setOpen(true)}>\n        Search <kbd>{formatHotkey(\"mod+k\")}</kbd>\n      </button>\n      {open && <CommandPalette onClose={() => setOpen(false)} />}\n    </>\n  );\n}"
 },
 "humanize": {
  "exports": [
   "bytes",
   "compact",
   "duration",
   "list",
   "number",
   "ordinal",
   "parseBytes",
   "plural",
   "pluralize",
   "relativeTime",
   "titleCase",
   "truncate"
  ],
  "usage": "import { bytes, duration, relativeTime, compact, ordinal, pluralize, list } from \"@lacspace/humanize\";\n\nbytes(1536);                       // \"1.5 KB\"\nduration(90061000);                // \"1d 1h\"\nrelativeTime(Date.now() - 3.6e6);  // \"1 hour ago\"\ncompact(1234567);                  // \"1.2M\"\nordinal(21);                       // \"21st\"\npluralize(3, \"city\");              // \"3 cities\"\nlist([\"red\", \"green\", \"blue\"]);    // \"red, green and blue\""
 },
 "id": {
  "exports": [
   "id",
   "isUuid",
   "nanoid",
   "shortId",
   "uuidVersion",
   "uuidv4",
   "uuidv7",
   "uuidv7Time"
  ],
  "usage": "import { uuidv4, uuidv7, nanoid, shortId, id } from \"@lacspace/id\";\n\nuuidv4();          // \"f47ac10b-58cc-4372-a567-0e02b2c3d479\"\nuuidv7();          // \"0192e7a1-3c2f-7abc-8def-1234567890ab\"  ← sorts by time\nnanoid();          // \"V1StGXR8_Z5jdHi6B-myT\"\nshortId();         // \"Ab3xK9_p\"\nid(\"user\");        // \"user_9f8c1a3e7b2d4f6a\""
 },
 "idempotency": {
  "exports": [
   "Idempotency",
   "IdempotencyConflictError",
   "IdempotencyKeyReuseError",
   "MemoryIdempotencyStore",
   "ReplayedError",
   "fingerprint",
   "idempotent"
  ],
  "usage": "import { idempotent } from \"@lacspace/idempotency\";\n\n// in a POST handler — the client sends an Idempotency-Key header\nconst key = request.headers.get(\"idempotency-key\")!;\n\nconst { value, replayed } = await idempotent(key, () => chargeCard(order));\n// first request: runs chargeCard, stores the result   → replayed: false\n// any retry with the same key: returns the SAME result → replayed: true (no second charge)\n\nreturn Response.json(value);"
 },
 "indicators": {
  "exports": [
   "ADX",
   "ATR",
   "BollingerBands",
   "CandleAggregator",
   "EMA",
   "MACD",
   "RSI",
   "SMA",
   "Stochastic",
   "Supertrend",
   "VWAP",
   "WMA",
   "adx",
   "atr",
   "bollinger",
   "crossedAbove",
   "crossedBelow",
   "detectPatterns",
   "ema",
   "macd",
   "rsi",
   "sma",
   "supertrend",
   "wma"
  ],
  "usage": "import { RSI, MACD } from \"@lacspace/indicators\";\n\nconst rsi = new RSI(14);\nconst macd = new MACD(12, 26, 9);\n\n// wire straight into your tick feed\nsocket.on(\"ltp\", (price) => {\n  const r = rsi.next(price);       // O(1) — no array recompute\n  const m = macd.next(price);\n  if (r !== null && r > 70) console.log(\"overbought\", r.toFixed(1));\n  if (m) console.log(\"histogram\", m.histogram.toFixed(2));\n});"
 },
 "jwt": {
  "exports": [
   "JwtError",
   "authenticate",
   "clearAuthCookie",
   "createRemoteJWKS",
   "csrfToken",
   "decode",
   "expressJwt",
   "extractBearer",
   "importJwk",
   "importPkcs8",
   "importSpki",
   "issueTokenPair",
   "randomToken",
   "rotateRefreshToken",
   "sign",
   "toAuthCookie",
   "verify",
   "verifyRefreshToken"
  ],
  "usage": "import { sign, verify, JwtError } from \"@lacspace/jwt\";\n\nconst token = await sign({ sub: \"user_1\", role: \"admin\" }, process.env.JWT_SECRET!, {\n  expiresIn: 3600,           // seconds\n  issuer: \"lacspace\",\n});\n\ntry {\n  const payload = await verify(token, process.env.JWT_SECRET!, { issuer: \"lacspace\" });\n  payload.sub;  // \"user_1\"\n} catch (e) {\n  if (e instanceof JwtError) console.log(e.code); // \"expired\" | \"signature\" | …\n}"
 },
 "llms-txt": {
  "exports": [
   "llmsFullTxt",
   "llmsFullTxtResponse",
   "llmsTxt",
   "llmsTxtFromRoutes",
   "llmsTxtFromSitemap",
   "llmsTxtResponse",
   "parseLlmsTxt"
  ],
  "usage": "import { llmsTxt } from \"@lacspace/llms-txt\";\n\nconst txt = llmsTxt({\n  title: \"Lacspace\",\n  summary: \"Open-source TypeScript packages and products.\",\n  details: \"Zero-dependency, isomorphic, Lacspace-Free-Licensed.\",\n  sections: [\n    {\n      title: \"Docs\",\n      links: [\n        { title: \"npm Packages\", url: \"https://lacspace.com/packages\", notes: \"20 packages\" },\n        { title: \"SDK\", url: \"https://www.npmjs.com/package/@lacspace/sdk\" },\n      ],\n    },\n  ],\n});"
 },
 "lock": {
  "exports": [
   "Lockout",
   "MemoryLockStore",
   "lockout"
  ],
  "usage": "import { lockout } from \"@lacspace/lock\";\n\nconst guard = lockout({ maxAttempts: 5, baseDelayMs: 60_000, maxDelayMs: 3_600_000 });\n\n// before checking the password\nconst status = await guard.check(email);\nif (status.locked) throw new Error(`Too many attempts. Try again in ${Math.ceil(status.retryAfterMs / 1000)}s`);\n\nif (await verifyPassword(input, stored)) {\n  await guard.reset(email);          // success — clear strikes\n} else {\n  const s = await guard.record(email); // failure — may lock\n  throw new Error(s.locked ? \"Account temporarily locked.\" : `${s.remaining} attempts left`);\n}"
 },
 "mailer": {
  "exports": [
   "Mailer",
   "SmtpError",
   "createMailer",
   "mailerFromEnv",
   "presets"
  ],
  "usage": "import { createMailer, presets } from \"@lacspace/mailer\";\n\nconst mail = createMailer(\n  presets.hostinger({ user: \"no-reply@lacspace.com\", pass: process.env.SMTP_PASS! }),\n);\n\nawait mail.send({\n  to: \"customer@example.com\",\n  subject: \"Welcome to Lacspace ✨\",\n  html: \"<h1>You're in!</h1><p>Thanks for signing up.</p>\",\n  text: \"You're in! Thanks for signing up.\",\n});"
 },
 "markdown": {
  "exports": [
   "extractHeadings",
   "markdownToHtml",
   "slugify"
  ],
  "usage": "import { markdownToHtml, extractHeadings, slugify } from \"@lacspace/markdown\";\n\nconst html = markdownToHtml(`\n# Getting started\n\nSome **bold** text, a [link](https://lacspace.com) and \\`inline code\\`.\n\n- a list\n  - that nests\n- [x] and task items\n\n| Feature | Status |\n| ------- | :----: |\n| Tables  |   ✅   |\n\n\\`\\`\\`ts\nconst x = 1;\n\\`\\`\\`\n`);"
 },
 "market": {
  "exports": [
   "IN_DISCOUNT_BROKER",
   "averagePrice",
   "blackScholes",
   "cagr",
   "changePercent",
   "charges",
   "circuitLimits",
   "formatCompactINR",
   "formatINR",
   "impliedVolatility",
   "maxDrawdown",
   "pnl",
   "pnlPercent",
   "positionSize",
   "roundToTick",
   "sharpe",
   "simpleReturns",
   "sortino",
   "volatility",
   "xirr"
  ],
  "usage": "import { charges } from \"@lacspace/market\";\n\ncharges({ segment: \"intraday\", buy: 100, sell: 102, qty: 500 });\n// {\n//   turnover: 101000, brokerage: 30.3, stt: 12.75, exchangeTxn: 3,\n//   sebi: 0.1, stamp: 1.5, gst: 6.01, dp: 0,\n//   totalCharges: 53.66, grossPnl: 1000, netPnl: 946.34, breakeven: 0.11\n// }\n\ncharges({ segment: \"delivery\", buy: 1000, sell: 1100, qty: 10 });\ncharges({ segment: \"options\", buy: 120, sell: 150, qty: 75 });"
 },
 "market-clock": {
  "exports": [
   "BSE",
   "MarketClock",
   "NSE",
   "createClock"
  ],
  "usage": "import { MarketClock, NSE } from \"@lacspace/market-clock\";\n\nconst nse = new MarketClock(NSE);\n\nnse.isOpen();        // true / false, right now (IST-correct from any timezone)\nnse.status();        // \"open\" | \"pre-open\" | \"closed\"\nnse.isHoliday();     // is today an exchange holiday?\n\nnse.nextOpen();      // Date — next session open\nnse.nextClose();     // Date — next session close\nnse.msToClose();     // ms remaining until close (0 if not open)"
 },
 "mfa": {
  "exports": [
   "AAL",
   "MfaSession",
   "assuranceLevel",
   "mfaSession",
   "verifyBackupCodeFactor",
   "verifyPasskeyFactor",
   "verifyPasswordFactor",
   "verifyTotpFactor"
  ],
  "usage": "import { mfaSession } from \"@lacspace/mfa\";\n\nconst session = mfaSession({\n  factors: [\n    { id: \"password\", type: \"knowledge\" },\n    { id: \"totp\", type: \"possession\" },\n    { id: \"passkey\", type: \"inherence\" },\n  ],\n  policy: { minFactors: 2, minAAL: 2 },\n});\n\nsession.markVerified(\"password\");\nsession.satisfied;          // false — one factor\n\nsession.markVerified(\"totp\");\nsession.satisfied;          // true\nsession.aal;                // 2\n\n// require the strongest assurance (adds a passkey → AAL3)\nconst step3 = session.state(); // { satisfied, aal, needFactors, needTypes, verifiedFactors }"
 },
 "money": {
  "exports": [
   "Money",
   "decimalsFor",
   "money",
   "sumMoney"
  ],
  "usage": "import { money, Money } from \"@lacspace/money\";\n\nconst price = money(19.99, \"USD\");   // 1999 minor units, exact\nprice.multiply(3).format();          // \"$59.97\"\nprice.add(money(5, \"USD\"));          // $24.99\nmoney(9.99, \"USD\").add(money(1, \"EUR\")); // ❌ throws: currency mismatch\n\n// Split a bill three ways — the cent doesn't vanish\nmoney(10, \"USD\").allocate([1, 1, 1]).map((m) => m.format());\n// [\"$3.34\", \"$3.33\", \"$3.33\"]   (sum is exactly $10.00)\n\n// Zero-decimal & 3-decimal currencies handled automatically\nmoney(1000, \"JPY\").format(\"ja-JP\"); // \"￥1,000\"\nmoney(1.5, \"BHD\").toMinor();        // 1500  (BHD has 3 decimals)"
 },
 "nepali-date": {
  "exports": [
   "BS_MAX_YEAR",
   "BS_MIN_YEAR",
   "NEPALI_MONTHS",
   "NEPALI_MONTHS_NP",
   "NEPALI_WEEKDAYS",
   "NEPALI_WEEKDAYS_NP",
   "NepaliDate",
   "adToBs",
   "bsToAd",
   "fromDevanagari",
   "toDevanagari"
  ],
  "usage": "import { NepaliDate } from \"@lacspace/nepali-date\";\n\nconst today = new NepaliDate();\ntoday.toString();               // \"2083-05-06\"\ntoday.format(\"D MMMM, YYYY\");   // \"6 Bhadra, 2083\"\ntoday.formatNepali();           // \"२०८३ भदौ ६, शनिबार\"\n\n// AD → BS   (build AD dates with local parts)\nnew NepaliDate(new Date(2024, 3, 13)).toString(); // \"2081-01-01\"\n\n// BS → AD\nconst d = new NepaliDate(2081, 1, 1).toAD();\n`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; // \"2024-4-13\""
 },
 "nepali-utils": {
  "exports": [
   "DISTRICTS",
   "LAND_UNIT_SQM",
   "PROVINCES",
   "amountInWords",
   "amountInWordsNepali",
   "convertLand",
   "districtsByProvince",
   "findDistrict",
   "formatBigha",
   "formatCompactNPR",
   "formatNPR",
   "formatRopani",
   "fromDevanagari",
   "getCarrier",
   "groupNepali",
   "isValidLandline",
   "isValidNepaliMobile",
   "isValidPAN",
   "isValidVAT",
   "landToSqMeters",
   "normalizeMobile",
   "numberToWords",
   "numberToWordsNepali",
   "parseNPR",
   "sqMetersToBigha",
   "sqMetersToRopani",
   "toDevanagari",
   "ungroupNepali"
  ],
  "usage": "import { formatNPR, groupNepali, toDevanagari, fromDevanagari } from \"@lacspace/nepali-utils\";\n\nformatNPR(1234567.5);                                    // \"Rs. 12,34,567.50\"\nformatNPR(1234567.5, { symbol: \"रू \", devanagari: true }); // \"रू १२,३४,५६७.५०\"\nformatNPR(50000, { decimals: 0, symbol: \"\" });           // \"50,000\"\n\ngroupNepali(1234567);   // \"12,34,567\"  (South-Asian grouping)\ntoDevanagari(\"2081\");   // \"२०८१\"\nfromDevanagari(\"२०८१\"); // \"2081\""
 },
 "next": {
  "exports": [
   "authGuard",
   "clearAuthCookie",
   "createServerClient",
   "getAuthToken",
   "getCsrfToken",
   "routeHandler",
   "serverActionClient",
   "setAuthCookie",
   "setCsrfCookie",
   "verifyCsrf",
   "withAuth",
   "withCsrf"
  ],
  "usage": "import { createServerClient } from \"@lacspace/next\";\n\nexport default async function DashboardPage() {\n  const lac = await createServerClient({ baseURL: \"https://api.lacspace.com/api\" });\n  const products = await lac.ecommerce.getProducts(); // token applied from the cookie\n  return <ProductGrid products={products} />;\n}"
 },
 "og": {
  "exports": [
   "fitFontSize",
   "ogArticle",
   "ogCard",
   "ogCardMinimal",
   "ogCardSplit",
   "ogProduct",
   "ogSvg",
   "ogSvgDataUri",
   "ogThemes"
  ],
  "usage": "// app/og/route.tsx\nimport { ImageResponse } from \"next/og\";\nimport { ogCard } from \"@lacspace/og\";\n\nexport const runtime = \"edge\";\n\nexport function GET(req: Request) {\n  const title = new URL(req.url).searchParams.get(\"title\") ?? \"My site\";\n  return new ImageResponse(\n    ogCard({\n      title,\n      eyebrow: \"Guide\",\n      subtitle: \"my-site.com\",\n      logo: \"M\",\n      from: \"#22d3ee\",\n      to: \"#6366f1\",\n    }) as any,\n    { width: 1200, height: 630 },\n  );\n}"
 },
 "otp": {
  "exports": [
   "base32Decode",
   "base32Encode",
   "generateBackupCodes",
   "generateSecret",
   "hotp",
   "keyuri",
   "setupTotp",
   "timeRemaining",
   "totp",
   "verifyBackupCode",
   "verifyHotp",
   "verifyTotp",
   "verifyTotpOnce"
  ],
  "usage": "import { generateSecret, keyuri } from \"@lacspace/otp\";\n\nconst secret = generateSecret();            // store this (encrypted) against the user\nconst uri = keyuri({ secret, label: \"user@lacspace.com\", issuer: \"Lacspace\" });\n// otpauth://totp/Lacspace:user@lacspace.com?secret=…&issuer=Lacspace&algorithm=SHA1&digits=6&period=30\n// → render `uri` as a QR code for the user to scan"
 },
 "paper-trade": {
  "exports": [
   "PaperAccount"
  ],
  "usage": "import { PaperAccount } from \"@lacspace/paper-trade\";\n\nconst acct = new PaperAccount({ cash: 100_000 });\n\n// feed prices (from your ticker / websocket), then trade\nacct.mark({ RELIANCE: 2900 });\nacct.buy(\"RELIANCE\", { qty: 10 });     // market buy — fills at 2900\n\nacct.mark({ RELIANCE: 2950 });         // price moves up\nacct.unrealizedPnl;                    // 500\nacct.summary().equity;                 // 100500 (cash + market value)\n\nacct.sell(\"RELIANCE\", { qty: 10 });    // book the profit\nacct.realizedPnl;                      // 500"
 },
 "password": {
  "exports": [
   "hash",
   "needsRehash",
   "strength",
   "verify"
  ],
  "usage": "import { hash, verify, needsRehash, strength } from \"@lacspace/password\";\n\nconst stored = await hash(\"correct horse battery staple\");\n// \"$pbkdf2-sha256$i=600000$<salt>$<hash>\"  — store this string\n\nawait verify(\"correct horse battery staple\", stored); // true\nawait verify(\"wrong\", stored);                          // false\n\nif (needsRehash(stored)) { /* re-hash with current params after a successful login */ }\n\nstrength(\"password\");        // { score: 0, warnings: [\"This is a very common password.\"] }\nstrength(\"Tr0ub4dour&3xy\");  // { score: 4, warnings: [] }"
 },
 "pdf": {
  "exports": [
   "PdfDocument",
   "formatMoney",
   "invoice",
   "receipt",
   "textWidth"
  ],
  "usage": "import { invoice } from \"@lacspace/pdf\";\nimport { writeFileSync } from \"node:fs\";\n\nconst bytes = invoice({\n  brand: \"Lacspace\",\n  number: \"INV-1024\",\n  date: \"2026-08-23\",\n  dueDate: \"2026-09-06\",\n  from: { name: \"Lacspace Corporation\", lines: [\"Global HQ\"], email: \"billing@lacspace.com\" },\n  to:   { name: \"Acme Pvt. Ltd.\", lines: [\"Kathmandu, Nepal\"], email: \"accounts@acme.com\" },\n  items: [\n    { description: \"Custom software development\", quantity: 1, rate: 4500 },\n    { description: \"AI chatbot integration\",      quantity: 2, rate: 750 },\n  ],\n  currency: \"$\", taxRate: 13, discount: 200,\n  notes: \"Payment due within 14 days.\",\n});\n\nwriteFileSync(\"invoice.pdf\", bytes);           // Node\n// or in a route handler:\nreturn new Response(bytes, { headers: { \"content-type\": \"application/pdf\" } });"
 },
 "query": {
  "exports": [
   "clearQueryCache",
   "getQueryData",
   "mutate",
   "prefetchQuery",
   "setQueryData",
   "useMutation",
   "useQuery"
  ],
  "usage": "import { useQuery } from \"@lacspace/query\";\n\nfunction Profile() {\n  const { data, error, isLoading } = useQuery(\n    \"/api/me\",\n    (url) => fetch(url as string).then((r) => r.json())\n  );\n\n  if (isLoading) return <p>Loading…</p>;\n  if (error) return <p>Something went wrong.</p>;\n  return <h1>Hi, {data.name}</h1>;\n}"
 },
 "rate-limit": {
  "exports": [
   "MemoryStore",
   "RateLimiter",
   "checkRequest",
   "expressRateLimit",
   "ipKeyFromRequest",
   "rateLimit",
   "rateLimitHeaders",
   "rateLimitResponse",
   "withRateLimit"
  ],
  "usage": "import { rateLimit } from \"@lacspace/rate-limit\";\n\nconst limiter = rateLimit({ limit: 10, windowMs: 60_000, algorithm: \"sliding\" });\n\nconst { success, remaining, retryAfter } = await limiter.check(ip);\nif (!success) throw new Error(`Rate limited. Retry in ${retryAfter}s`);"
 },
 "react": {
  "exports": [
   "LacspaceApiError",
   "LacspaceProvider",
   "useAuth",
   "useLacspace",
   "useQuery"
  ],
  "usage": "import { LacspaceProvider } from \"@lacspace/react\";\n\nexport function App() {\n  return (\n    <LacspaceProvider options={{ baseURL: \"https://api.lacspace.com/api\" }}>\n      <Routes />\n    </LacspaceProvider>\n  );\n}"
 },
 "redact": {
  "exports": [
   "SENSITIVE_KEYS",
   "createRedactor",
   "maskEmail",
   "maskString",
   "redact",
   "redactString"
  ],
  "usage": "import { redact, redactString, createRedactor } from \"@lacspace/redact\";\n\nredact({\n  email: \"jane@example.com\",\n  password: \"hunter2\",\n  headers: { authorization: \"Bearer eyJhbG.eyJz.sig\" },\n  card: \"4242 4242 4242 4242\",\n});\n// { email: \"j•••@example.com\", password: \"[REDACTED]\",\n//   headers: { authorization: \"[REDACTED]\" }, card: \"[REDACTED]\" }\n\nredactString(\"token=eyJhbG.eyJz.sig for user a@b.com\");\n// \"token=[REDACTED_JWT] for user a•••@b.com\"\n\n// bind once, use as a logger serializer\nconst scrub = createRedactor({ keys: [\"x-internal-token\"] });\nlogger.info(scrub(requestContext));"
 },
 "retry": {
  "exports": [
   "AbortError",
   "CircuitBreaker",
   "CircuitOpenError",
   "TimeoutError",
   "backoff",
   "retry",
   "retryWithTimeout",
   "withTimeout"
  ],
  "usage": "import { retry } from \"@lacspace/retry\";\n\nconst data = await retry(() => fetch(url).then((r) => r.json()), {\n  retries: 4,\n  minDelay: 300,\n  shouldRetry: (err) => isTransient(err),   // don't retry 4xx\n  onRetry: (err, attempt, delay) => log.warn(`retry ${attempt} in ${delay}ms`),\n});"
 },
 "robots": {
  "exports": [
   "AI_BOTS",
   "AI_TRAINING_BOTS",
   "aiPolicy",
   "allowSearchBlockTraining",
   "blockAiBots",
   "blockAll",
   "envRobots",
   "isAllowed",
   "metaRobots",
   "nextjsRobots",
   "parseRobots",
   "robots",
   "robotsForSite",
   "shopifyRobots",
   "stackRobots",
   "toNextRobots",
   "wordpressRobots",
   "xRobotsTag"
  ],
  "usage": "import { robots } from \"@lacspace/robots\";\n\nrobots({\n  groups: [\n    { userAgent: \"*\", disallow: [\"/admin\", \"/api\"], allow: [\"/api/public\"] },\n    { userAgent: \"Googlebot\", disallow: [] }, // allow all\n  ],\n  sitemap: \"https://lacspace.com/sitemap.xml\",\n  host: \"lacspace.com\",\n});"
 },
 "rss": {
  "exports": [
   "atom",
   "atomResponse",
   "feedForSite",
   "jsonFeed",
   "jsonFeedResponse",
   "podcastRss",
   "podcastRssResponse",
   "rss",
   "rssResponse"
  ],
  "usage": "import { rss, atom, jsonFeed } from \"@lacspace/rss\";\n\nconst feed = {\n  title: \"Lacspace Blog\",\n  link: \"https://lacspace.com/blog\",\n  description: \"Product updates and engineering notes.\",\n  feedUrl: \"https://lacspace.com/rss.xml\",\n  language: \"en\",\n};\n\nconst items = [\n  {\n    title: \"Launching the SEO Kit\",\n    link: \"https://lacspace.com/blog/seo-kit\",\n    content: \"<p>Six new packages…</p>\",\n    author: \"Lumi AI\",\n    date: new Date(\"2026-08-22\"),\n    categories: [\"release\"],\n  },\n];\n\nrss(feed, items);       // RSS 2.0 XML string\natom(feed, items);      // Atom 1.0 XML string\njsonFeed(feed, items);  // JSON Feed 1.1 object"
 },
 "sdk": {
  "exports": [
   "LacspaceAnalytics",
   "LacspaceApi",
   "LacspaceApiError",
   "LacspaceAuth",
   "LacspaceSDK",
   "createAnalytics",
   "createApi",
   "createAuth",
   "createClient",
   "isApiError",
   "localStorageTokenStorage",
   "memoryTokenStorage"
  ],
  "usage": "import { LacspaceSDK } from \"@lacspace/sdk\";\n\nconst lac = new LacspaceSDK({ baseURL: \"https://api.lacspace.com/api\" });\n\n// 1 · Authenticate — the token is stored and reused everywhere\nconst { user } = await lac.auth.login({ email: \"you@shop.com\", password: \"••••••••\" });\n\n// 2 · E-commerce helpers\nconst products = await lac.ecommerce.getProducts();\nawait lac.ecommerce.addToCart({ productId: products[0]!.id, quantity: 1 });\nconst { orderId } = await lac.ecommerce.checkout(\"cart_123\");\n\n// 3 · Track what happened\nawait lac.analytics.track(\"checkout_completed\", { orderId });"
 },
 "seo": {
  "exports": [
   "article",
   "auditHtml",
   "blogPosting",
   "breadcrumb",
   "breadcrumbFromPath",
   "collectionPage",
   "course",
   "defineSite",
   "event",
   "excerpt",
   "faqPage",
   "graph",
   "howTo",
   "hreflang",
   "imageObject",
   "itemList",
   "jobPosting",
   "jsonLd",
   "jsonLdScript",
   "lintSeo",
   "localBusiness",
   "metaDescription",
   "newsArticle",
   "ogImageUrl",
   "organization",
   "person",
   "product",
   "profilePage",
   "qaPage",
   "readingTime",
   "recipe",
   "review",
   "seoMetadata",
   "softwareApp",
   "softwareSourceCode",
   "stripMarkdown",
   "videoObject",
   "webPage",
   "website"
  ],
  "usage": "// app/pricing/page.tsx\nimport { seoMetadata } from \"@lacspace/seo\";\n\nexport const metadata = seoMetadata({\n  title: \"Pricing — Lacspace\",\n  description: \"Simple, transparent plans.\",\n  canonical: \"/pricing\",\n  image: \"https://lacspace.com/og/pricing.png\",\n  baseUrl: \"https://lacspace.com\",\n});"
 },
 "signed-url": {
  "exports": [
   "isValid",
   "magicLink",
   "readMagicLink",
   "sign",
   "signUrl",
   "verify",
   "verifyUrl"
  ],
  "usage": "import { sign, verify } from \"@lacspace/signed-url\";\n\n// e.g. a password-reset link\nconst token = await sign({ userId: 42, action: \"reset\" }, {\n  secret: process.env.LINK_SECRET!,\n  expiresIn: 3600, // seconds\n});\n\nconst r = await verify<{ userId: number; action: string }>(token, { secret: process.env.LINK_SECRET! });\nif (r.valid) {\n  grantReset(r.data.userId);\n} else {\n  // r.reason → \"malformed\" | \"bad-signature\" | \"expired\"\n}"
 },
 "site-verify": {
  "exports": [
   "VERIFICATION_PROVIDERS",
   "allVerifications",
   "nextVerification",
   "toNextVerification",
   "verificationFile",
   "verificationFileResponse",
   "verificationMeta",
   "verificationMetaHtml",
   "verificationTag"
  ],
  "usage": "import { verificationMeta, verificationMetaHtml } from \"@lacspace/site-verify\";\n\nverificationMeta({ google: \"abc123\", bing: \"XYZ789\", pinterest: \"pin456\" });\n// [{ name: \"google-site-verification\", content: \"abc123\" },\n//  { name: \"msvalidate.01\", content: \"XYZ789\" },\n//  { name: \"p:domain_verify\", content: \"pin456\" }]\n\nverificationMetaHtml({ google: \"abc123\" });\n// <meta name=\"google-site-verification\" content=\"abc123\" />"
 },
 "sitemap": {
  "exports": [
   "imageSitemap",
   "newsSitemap",
   "sitemap",
   "sitemapForSite",
   "sitemapIndex",
   "sitemapStylesheet",
   "splitSitemaps",
   "toNextSitemap",
   "videoSitemap"
  ],
  "usage": "import { sitemap } from \"@lacspace/sitemap\";\n\nconst xml = sitemap([\n  { loc: \"https://lacspace.com/\", changefreq: \"daily\", priority: 1.0, lastmod: new Date() },\n  { loc: \"https://lacspace.com/packages\", changefreq: \"weekly\", priority: 0.8 },\n  {\n    loc: \"https://lacspace.com/blog/launch\",\n    images: [{ loc: \"https://lacspace.com/og/launch.png\", title: \"Launch\" }],\n    alternates: [{ hreflang: \"ne\", href: \"https://lacspace.com/ne/blog/launch\" }],\n  },\n]);"
 },
 "slugify": {
  "exports": [
   "slugify",
   "slugifyFilename",
   "slugifyPath",
   "uniqueSlug"
  ],
  "usage": "import { slugify, uniqueSlug } from \"@lacspace/slugify\";\n\nslugify(\"Héllo, World! — 2026\");            // \"hello-world-2026\"\nslugify(\"StockYatra: Paper Trading\");        // \"stockyatra-paper-trading\"\nslugify(\"Über Café\", { separator: \"_\" });    // \"uber_cafe\"\nslugify(\"A very long article title here\", { maxLength: 15 }); // \"a-very-long\" (word boundary)\n\nuniqueSlug(\"Hello\", new Set([\"hello\", \"hello-2\"])); // \"hello-3\""
 },
 "store": {
  "exports": [
   "create",
   "createStore",
   "persist",
   "shallow"
  ],
  "usage": "import { create } from \"@lacspace/store\";\n\nconst useCounter = create<{\n  count: number;\n  inc: () => void;\n  dec: () => void;\n  reset: () => void;\n}>((set) => ({\n  count: 0,\n  inc: () => set((s) => ({ count: s.count + 1 })),\n  dec: () => set((s) => ({ count: s.count - 1 })),\n  reset: () => set({ count: 0 }),\n}));\n\nfunction Counter() {\n  const count = useCounter((s) => s.count);\n  const inc = useCounter((s) => s.inc);\n  return <button onClick={inc}>Count: {count}</button>;\n}"
 },
 "theme": {
  "exports": [
   "ThemeProvider",
   "getThemeScript",
   "useTheme"
  ],
  "usage": "import { ThemeProvider } from \"@lacspace/theme\";\n\nexport default function App({ children }: { children: React.ReactNode }) {\n  return (\n    <ThemeProvider defaultTheme=\"system\" enableSystem>\n      {children}\n    </ThemeProvider>\n  );\n}"
 },
 "ui": {
  "exports": [
   "CommandPalette",
   "Counter",
   "GradientText",
   "Marquee",
   "Reveal",
   "TiltCard",
   "Typewriter",
   "cn",
   "useInView",
   "usePrefersReducedMotion"
  ],
  "usage": "import { Reveal, Counter, GradientText, TiltCard, Marquee, Typewriter, CommandPalette } from \"@lacspace/ui\";\n\n// Fade + slide in on scroll (stagger with `delay`)\n<Reveal delay={0.1}><h2>It just appears, beautifully.</h2></Reveal>\n\n// Count up when it enters the viewport\n<Counter value={12480} suffix=\"+\" />       // 12,480+\n\n// Gradient (optionally animated) text\n<GradientText from=\"#22d3ee\" to=\"#6366f1\" animate>Lacspace</GradientText>\n\n// 3D tilt toward the cursor\n<TiltCard className=\"rounded-2xl border p-6\">Hover me</TiltCard>\n\n// Infinite logo / testimonial strip\n<Marquee speed={20} pauseOnHover><Logo/><Logo/><Logo/></Marquee>\n\n// Rotating headline\n<Typewriter words={[\"faster\", \"safer\", \"beautifully\"]} />\n\n// ⌘K / Ctrl-K command palette\n<CommandPalette\n  items={[\n    { id: \"home\", label: \"Go home\", shortcut: \"G H\", onSelect: () => router.push(\"/\") },\n    { id: \"docs\", label: \"Read the "
 },
 "validate": {
  "exports": [
   "BooleanSchema",
   "NumberSchema",
   "ObjectSchema",
   "Schema",
   "StringSchema",
   "ValidationError",
   "v"
  ],
  "usage": "import { v, type Infer } from \"@lacspace/validate\";\n\nconst User = v.object({\n  name: v.string().min(2).trim(),\n  email: v.string().email().toLowerCase(),\n  age: v.coerce.number().int().min(0).optional(),\n  role: v.enum([\"admin\", \"user\"]).default(\"user\"),\n  tags: v.array(v.string()).max(10).default([]),\n});\n\ntype User = Infer<typeof User>;\n//   ^ { name: string; email: string; role: \"admin\" | \"user\"; tags: string[]; age?: number }\n\nUser.parse(input);      // ✅ returns typed data, or throws ValidationError\nUser.safeParse(input);  // ✅ { success: true, data } | { success: false, error }"
 },
 "virtual": {
  "exports": [
   "useVirtualizer"
  ],
  "usage": "import { useRef } from \"react\";\nimport { useVirtualizer } from \"@lacspace/virtual\";\n\nfunction BigList({ rows }: { rows: string[] }) {\n  const parentRef = useRef<HTMLDivElement>(null);\n\n  const virtualizer = useVirtualizer({\n    count: rows.length,\n    getScrollElement: () => parentRef.current,\n    estimateSize: () => 44, // best guess before measuring\n    overscan: 8,\n  });\n\n  return (\n    <div ref={parentRef} style={{ height: 480, overflow: \"auto\" }}>\n      {/* inner spacer: full scrollable size */}\n      <div\n        style={{\n          height: virtualizer.getTotalSize(),\n          position: \"relative\",\n          width: \"100%\",\n        }}\n      >\n        {virtualizer.getVirtualItems().map((item) => (\n          <div\n            key={item.key}\n            data-index={item.index}\n            ref={virtualizer.measureElement}\n            style={{\n              position: \"absolute\",\n         "
 },
 "webauthn": {
  "exports": [
   "fromBase64url",
   "generateAuthenticationOptions",
   "generateChallenge",
   "generateRegistrationOptions",
   "isPlatformAuthenticatorAvailable",
   "isWebAuthnSupported",
   "startAuthentication",
   "startRegistration",
   "toBase64url",
   "verifyAuthentication",
   "verifyRegistration"
  ],
  "usage": "// --- server: create options ---\nimport { generateRegistrationOptions, generateChallenge } from \"@lacspace/webauthn\";\nconst challenge = generateChallenge();               // store in the session\nconst options = generateRegistrationOptions({ rpName: \"Lacspace\", rpID: \"lacspace.com\", userID, userName, challenge });\n\n// --- browser ---\nimport { startRegistration } from \"@lacspace/webauthn\";\nconst response = await startRegistration(options);   // FaceID / fingerprint prompt → JSON\n\n// --- server: verify + store ---\nimport { verifyRegistration } from \"@lacspace/webauthn\";\nconst { credentialId, publicKey, algorithm, counter } = await verifyRegistration({\n  attestationObject: response.attestationObject,\n  clientDataJSON: response.clientDataJSON,\n  expectedChallenge: challenge, expectedOrigin: \"https://lacspace.com\", expectedRPID: \"lacspace.com\",\n});\n// store { credentialId, publicKey (JWK), al"
 },
 "webhooks": {
  "exports": [
   "MemoryIdempotencyStore",
   "deliver",
   "isDuplicate",
   "isValid",
   "newId",
   "sign",
   "signHeaders",
   "verify",
   "verifyGitHub",
   "verifyShopify",
   "verifyStripe"
  ],
  "usage": "import { verify } from \"@lacspace/webhooks\";\n\n// in your route — use the RAW request body, not the parsed JSON\nconst rawBody = await request.text();\nconst r = await verify(rawBody, request.headers.get(\"webhook-signature\"), {\n  secret: process.env.WEBHOOK_SECRET!,\n  toleranceSec: 300, // reject anything older than 5 min (replay protection)\n});\n\nif (!r.valid) return new Response(`rejected: ${r.reason}`, { status: 400 });\n// r.reason ∈ \"no-signature\" | \"bad-format\" | \"bad-signature\" | \"timestamp-out-of-tolerance\""
 },
 "cart": {
  "exports": ["createCart", "addItem", "setQty", "removeItem", "findItem", "itemCount", "totals", "clear"],
  "usage": "import { createCart, addItem, setQty, totals } from \"@lacspace/cart\";\n\nlet cart = createCart({ currency: \"NPR\" });\ncart = addItem(cart, { id: \"sku_1\", name: \"Dhaka Topi\", price: 120000, qty: 1 }); // paisa\ncart = setQty(cart, \"sku_1\", 2);\n\nconst t = totals(cart, { taxRate: 0.13, shipping: 10000 });\n// { subtotal, tax, shipping, discount, total } — all integer minor units, no float drift"
 },
 "inventory": {
  "exports": ["createStock", "reserve", "release", "commit", "restock", "adjust", "available", "isLow", "isOutOfStock", "InventoryError"],
  "usage": "import { createStock, reserve, commit, available, InventoryError } from \"@lacspace/inventory\";\n\nlet stock = createStock({ onHand: 10 });\nstock = reserve(stock, 2);   // checkout hold — THROWS InventoryError before it oversells\nstock = commit(stock, 2);    // order paid: reserved -> fulfilled\n\navailable(stock);            // 8  (onHand minus still-reserved)"
 },
 "commission": {
  "exports": ["commission", "split"],
  "usage": "import { commission, split } from \"@lacspace/commission\";\n\n// tiered marketplace take-rate, capped\nconst fee = commission({ type: \"tiered\", cap: 100000, tiers: [\n  { upTo: 500000, rate: 0.10 },\n  { rate: 0.08 },\n] }, 800000);\n\n// pay 3 sellers exactly — no paisa created or lost\nconst shares = split(100000, [{ id: \"a\", weight: 1 }, { id: \"b\", weight: 1 }, { id: \"c\", weight: 1 }]);\n// 33334 | 33333 | 33333"
 },
 "settlement": {
  "exports": ["settle", "netFor", "reconcile", "payouts"],
  "usage": "import { settle, payouts, reconcile } from \"@lacspace/settlement\";\n\nconst ledger = settle([\n  { account: \"seller_1\", amount: 45000 },\n  { account: \"seller_1\", amount: -500 },   // a refund nets against the payout\n  { account: \"platform\", amount: 5500 },\n]);\n\npayouts(ledger);   // only positive balances, ready to disburse\nreconcile(ledger, { seller_1: 44500 });  // expected vs actual, flags discrepancies"
 },
 "coupon": {
  "exports": ["validateCoupon", "applyCoupon"],
  "usage": "import { validateCoupon, applyCoupon } from \"@lacspace/coupon\";\n\nconst coupon = { code: \"DASHAIN\", type: \"percent\", value: 15, minSubtotal: 200000, cap: 50000 };\n\nconst check = validateCoupon(coupon, { subtotal: 350000, now: Date.now() });\nif (check.ok) {\n  const { discount, total } = applyCoupon(coupon, 350000); // discount capped at 50000\n}"
 },
 "tax": {
  "exports": ["tax", "addTax", "extractTax", "compound", "RATES"],
  "usage": "import { addTax, extractTax, RATES } from \"@lacspace/tax\";\n\naddTax(100000, RATES.NP_VAT);      // 113000  — adds 13% VAT (integer paisa)\nextractTax(113000, RATES.NP_VAT);  // { net: 100000, tax: 13000 } — from a VAT-inclusive price\n// RATES also ships IN_GST, EU_VAT, UK_VAT presets"
 },
 "ledger": {
  "exports": ["createLedger", "post", "postMany", "balance", "statement", "trialBalance"],
  "usage": "import { createLedger, post, balance, trialBalance } from \"@lacspace/ledger\";\n\nlet book = createLedger();\nbook = post(book, { memo: \"Order #1001\", lines: [\n  { account: \"cash\",        debit: 113000 },\n  { account: \"sales\",       credit: 100000 },\n  { account: \"vat_payable\", credit: 13000 },\n] });\n\nbalance(book, \"cash\");   // 113000\ntrialBalance(book);      // every account — always sums to zero"
 },
 "audit-log": {
  "exports": ["auditEvent", "diff", "redactEvent", "formatEvent", "createAuditor", "REDACTED"],
  "usage": "import { createAuditor } from \"@lacspace/audit-log\";\n\nconst audit = createAuditor({ redact: [\"password\", \"token\"] });\n\nconst evt = audit.record({\n  actor:  { id: \"admin_2\", role: \"admin\" },\n  action: \"product.price.update\",\n  target: \"sku_1\",\n  before: { price: 1200 },\n  after:  { price: 999 },\n});\n// evt.changes -> [{ field: \"price\", from: 1200, to: 999 }] — who did what, attributed"
 },
 "courier": {
  "exports": ["createPathaoAdapter", "transition", "canTransition", "isTerminal", "normalizePathaoStatus", "parsePathaoWebhook", "verifyPathaoWebhook", "verifyWebhookSignature", "DELIVERY_TRANSITIONS", "PATHAO_STATUS_MAP", "CourierError"],
  "usage": "import { createPathaoAdapter, verifyPathaoWebhook, parsePathaoWebhook } from \"@lacspace/courier\";\n\nconst pathao = createPathaoAdapter({ clientId, clientSecret, username, password, storeId: 42 });\n\nconst shipment = await pathao.createOrder({\n  recipientName: \"Sita\", recipientPhone: \"98xxxxxxxx\",\n  recipientAddress: \"Baneshwor, KTM\", amountToCollect: 250000, itemQuantity: 1,\n});\n\n// inbound webhook -> canonical status, no more manual clicking\nif (verifyPathaoWebhook({ headerSecret: req.headers[\"x-pathao-signature\"], expectedSecret })) {\n  const evt = parsePathaoWebhook(req.body); // { status: \"delivered\", consignmentId, ... }\n}"
 },
 "esewa": {
  "exports": ["signPayment", "buildForm", "verifyResponse", "checkStatus", "ESEWA_TEST_SECRET", "ESEWA_TEST_PRODUCT_CODE"],
  "usage": "import { buildForm, verifyResponse } from \"@lacspace/esewa\";\n\n// 1) redirect the buyer — POST form.fields to form.action\nconst form = buildForm({ amount: \"1000\", productCode: \"EPAYTEST\", successUrl, failureUrl, secret });\n\n// 2) on return, verify the signed payload against YOUR order amount\nconst res = verifyResponse(base64Data, secret);\n// { verified, status, transactionUuid, totalAmount }"
 },
 "khalti": {
  "exports": ["initiate", "lookup", "KhaltiError"],
  "usage": "import { initiate, lookup } from \"@lacspace/khalti\";\n\nconst { payment_url, pidx } = await initiate({\n  returnUrl, websiteUrl, amount: 100000, // paisa\n  purchaseOrderId: \"order_1\", purchaseOrderName: \"Colour order\",\n}, { secretKey, env: \"test\" });\n\n// verify server-to-server before fulfilling\nconst status = await lookup(pidx, { secretKey, env: \"test\" }); // \"Completed\" | \"Pending\" | ..."
 },
 "connectips": {
  "exports": ["signToken", "buildForm", "validateTxn", "verifyToken"],
  "usage": "import { signToken, buildForm, validateTxn } from \"@lacspace/connectips\";\n\n// sign the redirect token with your RSA (PKCS#8) private key\nconst token = await signToken(\n  { merchantId, appId, appName, txnId, txnDate, txnAmount, referenceId, remarks },\n  privateKeyPkcs8Pem,\n);\nconst form = buildForm({ /* merchant fields + token */ }); // POST to Connect IPS\n\n// confirm server-to-server\nconst ok = await validateTxn({ merchantId, appId, referenceId, txnAmount }, credentials);"
 },
 "fonepay": {
  "exports": ["signRequest", "buildRedirect", "verifyResponse"],
  "usage": "import { buildRedirect, verifyResponse } from \"@lacspace/fonepay\";\n\n// HMAC-SHA512 signed Request-To-Pay redirect\nconst redirect = buildRedirect({ amt: \"1000\", pid: \"order_1\", prn: \"ref_1\", ru: returnUrl, merchantCode }, secret);\n// send the buyer to redirect.url\n\n// on return, verify the response DV\nconst res = await verifyResponse(query, secret); // { verified, status }"
 },
 "xlsx": {
  "exports": [
   "Workbook",
   "aoaToXlsx",
   "columnLetter",
   "jsonToXlsx",
   "readWorkbook",
   "xlsxToJson",
   "sheetToJson",
   "sheetToAoa"
  ],
  "usage": "import { jsonToXlsx } from \"@lacspace/xlsx\";\nimport { writeFileSync } from \"node:fs\";\n\nconst bytes = jsonToXlsx([\n  { name: \"Ada Lovelace\", signups: 12, active: true, joined: new Date(\"2026-01-15\") },\n  { name: \"Alan Turing\",  signups: 7,  active: false, joined: new Date(\"2026-02-01\") },\n]);\n\nwriteFileSync(\"users.xlsx\", bytes);                 // Node\n// or serve a download:\nreturn new Response(bytes, {\n  headers: {\n    \"content-type\": \"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet\",\n    \"content-disposition\": 'attachment; filename=\"users.xlsx\"',\n  },\n});\n\n// ...and READ one back — bulk import from an uploaded sheet.\n// Handles real Excel exports (STORE + DEFLATE), shared strings and dates.\nconst rows = await xlsxToJson(bytes);\n// [{ name: \"Ada Lovelace\", signups: 12, active: true, joined: <Date> }, ...]"
 }
};
