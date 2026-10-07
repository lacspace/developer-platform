// Generated from the monorepo — per-package exports + a usage example.
export type PkgDetail = { exports: string[]; usage: string };
export const DETAILS: Record<string, PkgDetail> = {
 "country": {
  "exports": [
   "country",
   "countries",
   "isCountryCode",
   "countryName",
   "alpha2ToAlpha3",
   "alpha3ToAlpha2",
   "numericToAlpha2",
   "callingCode",
   "countriesByCallingCode",
   "callingCodes",
   "countriesUsing",
   "countriesInRegion",
   "searchCountries",
   "flagEmoji",
   "normalizeName"
  ],
  "usage": "import { country, countriesUsing, flagEmoji } from \"@lacspace/country\";\n\ncountry(\"Nepal\");        // { alpha2: \"NP\", alpha3: \"NPL\", numeric: \"524\", callingCodes: [\"977\"], currencies: [\"NPR\"], … }\ncountriesUsing(\"EUR\");   // 35 countries\nflagEmoji(\"in\");         // \"🇮🇳\""
 },
 "currency": {
  "exports": [
   "currency",
   "currencies",
   "isCurrencyCode",
   "currencyName",
   "currencySymbol",
   "minorUnits",
   "toMinor",
   "fromMinor",
   "formatCurrency",
   "FUND_CODES"
  ],
  "usage": "import { minorUnits, toMinor, formatCurrency } from \"@lacspace/currency\";\n\nminorUnits(\"JPY\");                                   // 0\ntoMinor(19.99, \"USD\");                               // 1999\nformatCurrency(1234.5, \"EUR\", { locale: \"de\" });    // \"1.234,50 €\""
 },
 "iban": {
  "exports": [
   "parseIban",
   "isValidIban",
   "generateIban",
   "formatIban",
   "electronicIban",
   "ibanCountries",
   "ibanLength",
   "exampleIban",
   "mod97",
   "SEPA",
   "parseBic",
   "isValidBic",
   "isValidIsin",
   "isinCheckDigit"
  ],
  "usage": "import { parseIban, generateIban, isValidIsin } from \"@lacspace/iban\";\n\nparseIban(\"GB82 WEST 1234 5698 7654 32\");\n// { valid: true, country: \"GB\", bankCode: \"WEST\", branchCode: \"123456\", accountNumber: \"98765432\", sepa: true, … }\ngenerateIban(\"DE\", \"370400440532013000\"); // \"DE89370400440532013000\"\nisValidIsin(\"US0378331005\");              // true"
 },
 "tax-id": {
  "exports": [
   "validateTaxId",
   "isValidTaxId",
   "TAX_ID_COUNTRIES",
   "validateVat",
   "isValidVat",
   "VAT_COUNTRIES",
   "isValidGstin",
   "isValidPan",
   "isValidAbn",
   "isValidAcn",
   "isValidTfn",
   "isValidIrd",
   "isValidBn",
   "isValidEin",
   "isValidCpf",
   "isValidCnpj",
   "isValidCuit",
   "isValidRut",
   "isValidRfc",
   "isValidNepalPan",
   "isValidUen",
   "isValidNpwp",
   "isValidKrBrn",
   "isValidJpCorporateNumber",
   "isValidZaTaxNumber",
   "luhn"
  ],
  "usage": "import { validateTaxId, isValidVat, isValidGstin } from \"@lacspace/tax-id\";\n\nvalidateTaxId(\"DE136695976\");\n// { valid: true, country: \"DE\", type: \"vat\", strength: \"checksum\", normalized: \"DE136695976\" }\nvalidateTaxId(\"27AAPFU0939F1ZV\", { country: \"IN\" }); // { valid: true, type: \"gstin\", … }\nisValidVat(\"BE 0428.759.497\");                       // true"
 },
 "phone": {
  "exports": [
   "parsePhone",
   "isValidPhone",
   "formatPhone",
   "phoneCountry",
   "RULED_COUNTRIES"
  ],
  "usage": "import { parsePhone, formatPhone, phoneCountry } from \"@lacspace/phone\";\n\nparsePhone(\"+977 980-123-4567\");\n// { valid: true, country: \"NP\", e164: \"+9779801234567\", international: \"+977 980 123 4567\", type: \"mobile\", … }\nparsePhone(\"(202) 456-1111\", { defaultCountry: \"US\" }).e164; // \"+12024561111\"\nphoneCountry(\"+1 416 555 0123\");                              // \"CA\""
 },
 "postal-code": {
  "exports": [
   "validatePostalCode",
   "isValidPostalCode",
   "formatPostalCode",
   "hasPostalCodes",
   "examplePostalCode",
   "postalCodeCountries"
  ],
  "usage": "import { validatePostalCode, formatPostalCode, hasPostalCodes } from \"@lacspace/postal-code\";\n\nvalidatePostalCode(\"sw1a 1aa\", \"GB\"); // { valid: true, normalized: \"SW1A 1AA\" }\nformatPostalCode(\"k1a0b1\", \"CA\");     // \"K1A 0B1\"\nhasPostalCodes(\"AE\");                 // false"
 },
 "logo": {
  "exports": [
   "generateLogo",
   "generateLogoSet",
   "suggest",
   "tokenize",
   "initials",
   "PALETTES",
   "FONTS",
   "ICONS",
   "MOODS"
  ],
  "usage": "import { generateLogo, generateLogoSet } from \"@lacspace/logo\";\n\n// One brief → an on-brand SVG logo (no AI)\nconst { svg, palette, icon } = generateLogo({\n  name: \"Kopi House\",\n  keywords: \"coffee, cozy, artisanal, warm\",\n});\n// svg → a complete <svg> string (☕ mark, warm amber palette, emblem)\n\n// 12 reproducible concepts to choose from\nconst concepts = generateLogoSet({ name: \"Orbit Labs\", keywords: \"ai, network, fast\" });\n\n// Force any choice\ngenerateLogo({ name: \"Aurelia\", palette: \"royal-gold\", engine: \"emblem\", icon: \"crown\" });"
 },
 "image": {
  "exports": [
   "Surface",
   "gradient",
   "radial",
   "pattern",
   "encode",
   "fit",
   "encodePng",
   "encodeJpeg",
   "rasterizeSvg",
   "parseSize",
   "formatBytes",
   "parseColor"
  ],
  "usage": "import { gradient, encode, fit, formatBytes } from \"@lacspace/image\";\n\nconst bg = gradient(1200, 630, {\n  angle: 90,\n  stops: [{ offset: 0, color: \"#22d3ee\" }, { offset: 1, color: \"#6366f1\" }],\n}).pattern(\"dots\", { size: 32 });\n\n// Export in any format\nconst png = await encode(bg, { format: \"png\" });\n\n// …or hit an exact file-size budget\nconst small = await fit(bg, { format: \"jpeg\", maxSize: \"120kb\" });\nconsole.log(formatBytes(small.size), \"at q\", small.quality);"
 },
 "brand": {
  "exports": [
   "mark",
   "iconTile",
   "craftMark",
   "pulseMark",
   "floatMark",
   "revealMark",
   "shimmerMark",
   "installable",
   "faviconDataUri",
   "webManifest",
   "brandCss",
   "COLORS",
   "GUIDELINES",
   "ASSETS"
  ],
  "usage": "import { mark, craftMark, installable, brandCss } from \"@lacspace/brand\";\n\n// The Lacspace mark, self-contained — no fonts, no deps\nlogoEl.innerHTML = mark({ size: 256, variant: \"fullcolor\" });\n\n// The signature self-crafting hero animation (pure CSS, zero JS)\nheroEl.innerHTML = craftMark({ size: 320 });\n\n// Make Lacspace installable as a favicon / PWA app-icon\nconst { headLinks, manifest, dataUri } = installable({ base: \"/brand/\", name: \"Lacspace\" });\n\n// Palette as CSS variables\ndocument.head.insertAdjacentHTML(\"beforeend\", `<style>${brandCss()}</style>`);"
 },
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
   "JsonTransport",
   "Mailer",
   "MailerPool",
   "MemoryTransport",
   "MessageBuilder",
   "SmtpError",
   "buildMime",
   "createJsonTransport",
   "createMailer",
   "createMailerPool",
   "createMemoryTransport",
   "createMessage",
   "createTransport",
   "decodeEntities",
   "encodeMimeWord",
   "formatAddress",
   "formatAddressList",
   "htmlToText",
   "invalidAddresses",
   "isValidEmail",
   "mailerFromEnv",
   "parseAddress",
   "parseAddressList",
   "preheader",
   "presets",
   "previewText",
   "sendBatch",
   "shouldRetrySend"
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
  "exports": ["auditEvent", "diff", "redactEvent", "formatEvent", "createAuditor", "REDACTED", "createSealedLog", "sealEvent", "appendToChain", "createChain", "verifyChain", "GENESIS_HASH", "AuditError"],
  "usage": "import { auditEvent, createSealedLog, diff } from \"@lacspace/audit-log\";\n\n// who did what, with a before/after diff and redaction\nconst evt = auditEvent({\n  actor:  { id: \"admin_2\", type: \"admin\" },\n  action: \"product.price.update\",\n  target: { type: \"product\", id: \"sku_1\" },\n  changes: diff({ price: 1200 }, { price: 999 }),\n});\n\n// seal it into a tamper-evident SHA-256 hash chain\nconst log = createSealedLog();\nawait log.append(evt);\nawait log.verify();   // { valid: true, length: 1 }\n// edit any stored entry and re-verify -> { valid: false, brokenAt, reason } — proof it was altered"
 },
 "courier": {
  "exports": ["createPathaoAdapter", "transition", "canTransition", "isTerminal", "normalizePathaoStatus", "parsePathaoWebhook", "verifyPathaoWebhook", "verifyWebhookSignature", "DELIVERY_TRANSITIONS", "PATHAO_STATUS_MAP", "CourierError"],
  "usage": "import { createPathaoAdapter, verifyPathaoWebhook, parsePathaoWebhook } from \"@lacspace/courier\";\n\nconst pathao = createPathaoAdapter({ clientId, clientSecret, username, password, storeId: 42 });\n\nconst shipment = await pathao.createOrder({\n  recipientName: \"Sita\", recipientPhone: \"98xxxxxxxx\",\n  recipientAddress: \"Baneshwor, KTM\", amountToCollect: 250000, itemQuantity: 1,\n});\n\n// inbound webhook -> canonical status, no more manual clicking\nif (verifyPathaoWebhook({ headerSecret: req.headers[\"x-pathao-signature\"], expectedSecret })) {\n  const evt = parsePathaoWebhook(req.body); // { status: \"delivered\", consignmentId, ... }\n}"
 },
 "order": {
  "exports": ["createOrder", "transition", "addLine", "removeLine", "updateQty", "canTransition", "isTerminal", "canCancel", "canRefund", "canShip", "canFulfill", "orderNumber", "randomOrderId", "ORDER_TRANSITIONS", "OrderError"],
  "usage": "import { createOrder, transition, orderNumber } from \"@lacspace/order\";\n\nlet order = createOrder({\n  number: orderNumber(1042),          // \"ORD-20260905-1042\"\n  currency: \"NPR\",\n  customer: { id: \"cus_1\", name: \"Sita\" },\n  lines: [{ id: \"l1\", sku: \"NP-1\", name: \"Dhaka Topi\", unitPrice: 120000, qty: 2, taxRate: 0.13 }],\n  shipping: 10000,\n});\n\norder = transition(order, \"placed\");\norder = transition(order, \"paid\", { note: \"eSewa ref 9x...\" });\n// order.history is a timestamped audit trail; line prices are snapshotted; totals in integer paisa"
 },
 "refund": {
  "exports": ["createReturn", "transition", "refundAmount", "restockItems", "validateReturn", "canTransition", "isTerminal", "RETURN_TRANSITIONS", "RefundError"],
  "usage": "import { createReturn, refundAmount, restockItems, transition } from \"@lacspace/refund\";\n\nlet rma = createReturn({ orderId: \"ORD-1042\", items: [\n  { lineId: \"l1\", sku: \"NP-1\", qty: 1, unitPrice: 120000, taxRate: 0.13, reason: \"size\", restock: true },\n] });\nrma = transition(rma, \"approved\");\n\nconst money = refundAmount(rma.items, { restockingPct: 0.10 });\n// { subtotal: 120000, tax: 15600, restockingFee: 12000, shipping: 0, total: 123600 }\nconst restock = restockItems(rma.items); // [{ sku: \"NP-1\", qty: 1 }] -> feed @lacspace/inventory"
 },
 "shipping": {
  "exports": ["resolveZone", "rateForMethod", "quoteShipping", "cheapestQuote", "freeShippingRemaining", "ShippingError"],
  "usage": "import { quoteShipping, cheapestQuote } from \"@lacspace/shipping\";\n\nconst methods = [\n  { id: \"std\", label: \"Standard\", strategy: \"weight\", freeOver: 500000, bands: [\n    { min: 0, max: 1000, cost: 8000 }, { min: 1000, cost: 12000 },\n  ] },\n  { id: \"exp\", label: \"Express\", strategy: \"flat\", flat: 25000, etaDays: [1, 2] },\n];\n\nconst quotes = quoteShipping(methods, { weight: 750, subtotal: 300000 });\n// sorted cheapest-first: [{ methodId: \"std\", cost: 8000 }, { methodId: \"exp\", cost: 25000 }]\nconst best = cheapestQuote(methods, { weight: 750, subtotal: 600000 }); // std, free (over 5,000)"
 },
 "invoice": {
  "exports": ["createInvoice", "recordPayment", "markVoid", "markIssued", "isOverdue", "invoiceNumber", "renderRows", "InvoiceError"],
  "usage": "import { createInvoice, recordPayment, invoiceNumber } from \"@lacspace/invoice\";\n\nlet inv = createInvoice({\n  number: invoiceNumber(123),         // \"INV-2026-000123\"\n  currency: \"NPR\",\n  seller: { name: \"Lacspace\", taxId: \"PAN123\" },\n  buyer:  { name: \"Sita Rai\" },\n  lines: [{ description: \"Dhaka Topi\", qty: 2, unitPrice: 120000, taxRate: 0.13 }],\n});\n// inv.taxSummary groups tax by rate; inv.totals.balanceDue in integer paisa\ninv = recordPayment(inv, 271200);     // status -> \"paid\", balanceDue -> 0"
 },
 "esewa": {
  "exports": ["signPayment", "buildForm", "verifyResponse", "checkStatus", "paisaToRupees", "ESEWA_TEST_SECRET", "ESEWA_TEST_PRODUCT_CODE"],
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
 },
 "logger": {
  "exports": [
   "createLogger",
   "jsonConsole",
   "prettyConsole",
   "memory",
   "serializeError",
   "toObject",
   "LEVELS"
  ],
  "usage": "import { createLogger } from \"@lacspace/logger\";\n\nconst log = createLogger({\n  level: \"info\",\n  bindings: { service: \"api\" },   // added to every line\n  redact: [\"password\", \"*.token\"], // secrets never reach the logs\n});\n\nlog.info(\"server started\", { port: 3000 });\n// {\"level\":\"info\",\"time\":1700000000000,\"msg\":\"server started\",\"service\":\"api\",\"port\":3000}\n\n// a per-request child logger inherits bindings + transports\nconst reqLog = log.child({ reqId: \"abc123\" });\nreqLog.warn(\"slow query\", { ms: 1200 });\n\n// a log below the active level costs nothing — the record is never built\nlog.debug(\"skipped\");"
 },
 "result": {
  "exports": [
   "ok",
   "err",
   "some",
   "none",
   "fromNullable",
   "isOk",
   "isErr",
   "map",
   "andThen",
   "unwrap",
   "unwrapOr",
   "match",
   "trySync",
   "tryAsync",
   "okOr",
   "all"
  ],
  "usage": "import { trySync, match, all, ok, err } from \"@lacspace/result\";\n\n// wrap throwing code — errors become values, not exceptions\nconst parsed = trySync(() => JSON.parse(input)); // Result<any, Error>\n\nconst message = match(parsed, {\n  ok: (v) => `parsed: ${JSON.stringify(v)}`,\n  err: (e) => `bad json: ${e.message}`,\n});\n\n// chain fallible steps; the first Err short-circuits\nconst combined = all([ok(1), ok(2), ok(3)]); // Ok([1, 2, 3])\nconst stopped = all([ok(1), err(\"nope\"), ok(3)]); // Err(\"nope\")\n\n// async, too\nconst res = await tryAsync(() => fetch(url).then((r) => r.json()));"
 },
 "events": {
  "exports": [
   "createEmitter"
  ],
  "usage": "import { createEmitter } from \"@lacspace/events\";\n\n// declare the events map — on/emit are now compile-time checked\ntype Events = { login: { userId: string }; logout: void };\nconst bus = createEmitter<Events>();\n\nconst off = bus.on(\"login\", ({ userId }) => console.log(\"welcome\", userId));\nbus.emit(\"login\", { userId: \"u_1\" }); // ✓ payload type enforced\noff(); // unsubscribe\n\nbus.once(\"logout\", () => console.log(\"bye\"));\nconst next = await bus.waitFor(\"login\"); // resolves on the next emit\n\n// a throwing listener never blocks the others — errors are isolated"
 },
 "queue": {
  "exports": [
   "createQueue",
   "AbortError",
   "QueueClearedError"
  ],
  "usage": "import { createQueue } from \"@lacspace/queue\";\n\n// run at most 2 tasks at once\nconst queue = createQueue({ concurrency: 2 });\n\nconst results = await Promise.all(\n  urls.map((u) => queue.add(() => fetch(u).then((r) => r.json()))),\n);\n\n// higher priority jumps the line; a rejected task never stalls the queue\nqueue.add(fetchCritical, { priority: 10 });\n\nconsole.log(queue.pending, queue.size); // running, waiting\nawait queue.onIdle(); // resolves when fully drained"
 },
 "scheduler": {
  "exports": [
   "createScheduler",
   "parseDuration",
   "nextCronRun",
   "matchesCron"
  ],
  "usage": "import { createScheduler } from \"@lacspace/scheduler\";\n\nconst jobs = createScheduler({\n  onError: (err, name) => console.error(`job ${name} failed`, err),\n});\n\n// every 30 seconds (duration strings or ms)\njobs.every(\"30s\", () => refreshCache());\n\n// standard 5-field cron — 09:00 on weekdays\njobs.cron(\"0 9 * * 1-5\", () => sendDigest());\n\n// one-shots\njobs.after(\"5m\", () => cleanupTemp());\njobs.at(new Date(\"2026-12-31T23:59:00\"), () => rollOver());\n\n// overlap:false (default) means an async job never runs over itself\njobs.every(\"1m\", syncOrders, { overlap: false });\njobs.stop(); // pause everything"
 },
 "machine": {
  "exports": [
   "createMachine",
   "assign",
   "interpret",
   "createActor"
  ],
  "usage": "import { createMachine, assign, interpret } from \"@lacspace/machine\";\n\nconst toggle = createMachine<{ count: number }, { type: \"TOGGLE\" }>({\n  initial: \"inactive\",\n  context: { count: 0 },\n  states: {\n    inactive: { on: { TOGGLE: { target: \"active\", actions: assign((c) => ({ count: c.count + 1 })) } } },\n    active: { on: { TOGGLE: \"inactive\" } },\n  },\n});\n\n// pure — great for reducers/tests\nconst next = toggle.transition(toggle.initialState, { type: \"TOGGLE\" });\nnext.value;         // \"active\"\nnext.context.count; // 1\n\n// or run it as a live actor\nconst actor = interpret(toggle).start();\nactor.subscribe((s) => console.log(s.value));\nactor.send({ type: \"TOGGLE\" });"
 },
 "formula": {
  "exports": [
   "compile",
   "run",
   "check",
   "references",
   "computeColumn",
   "tableScope",
   "registerFunction",
   "describeFunction",
   "FUNCTIONS",
   "FUNCTION_NAMES",
   "FUNCTION_DOCS",
   "AGGREGATES"
  ],
  "usage": "import { compile, computeColumn, check } from \"@lacspace/formula\";\n\nconst rows = [\n  { item: \"Shirt\",  qty: 2, rate: 850,  cost: 600 },\n  { item: \"Jacket\", qty: 1, rate: 2400, cost: 1900 },\n  { item: \"Scarf\",  qty: 5, rate: 450,  cost: 300 },\n];\n\n// one formula, evaluated down a whole table\ncomputeColumn(\"=qty * rate\", rows);                 // [1700, 2400, 2250]\ncomputeColumn(\"=(rate - cost) / rate * 100\", rows); // margins per row\ncomputeColumn(\"=rate / SUM(rate) * 100\", rows);     // bare names read the row, SUM(rate) reads the column\n\n// compile once, run anywhere — no eval, ever\nconst margin = compile(\"=IF(rate = 0, 0, (rate - cost) / rate * 100)\");\nmargin({ field: (n) => rows[0][n], column: (n) => rows.map((r) => r[n]) });\n\n// validate as the user types\ncheck(\"=1+2 3\"); // { ok: false, error: 'Unexpected \"3\"', position: 4 }"
 },
 "convert": {
  "exports": [
   "convert",
   "detect",
   "parseInput",
   "serialize",
   "toExcel",
   "fromExcel",
   "flatten",
   "unflatten",
   "inferTypes",
   "inferSchema",
   "parseLines",
   "transformTable"
  ],
  "usage": "import { convert, detect, toExcel, fromExcel } from \"@lacspace/convert\";\n\n// JSON → a real .xlsx (one sheet per key, nested objects flattened to columns)\nconst xlsx = await convert(orders, { to: \"xlsx\", sheet: \"Orders\", flatten: true });\n\n// Excel → JSON rows (input format auto-detected; numbers, booleans and dates typed)\nconst rows = await convert(xlsxBytes, { to: \"json\" });\n\n// CSV → Markdown table, keeping only two columns\nconst md = await convert(csvText, { from: \"csv\", to: \"markdown\", columns: [\"name\", \"total\"] });\n\n// …or SQL INSERTs with a CREATE TABLE\nconst sql = await convert(rows, { to: \"sql\", tableName: \"orders\", ddl: true });\n\ndetect(csvText); // \"csv\""
 },
 "components": {
  "exports": [
     "AVATAR_COLOR_COUNT",
     "Accordion",
     "AccordionItem",
     "Alert",
     "AspectRatio",
     "Avatar",
     "AvatarGroup",
     "Backdrop",
     "Badge",
     "Blockquote",
     "Breadcrumbs",
     "Button",
     "ButtonGroup",
     "COMMON_PASSWORDS",
     "Card",
     "CardBody",
     "CardDescription",
     "CardFooter",
     "CardHeader",
     "CardTitle",
     "Center",
     "Checkbox",
     "CheckboxGroup",
     "Code",
     "ColorInput",
     "Combobox",
     "ConfirmDialog",
     "Container",
     "DescriptionList",
     "Divider",
     "Drawer",
     "DropdownMenu",
     "ELLIPSIS",
     "EmptyState",
     "Field",
     "Fieldset",
     "FileDrop",
     "Grid",
     "GridItem",
     "HStack",
     "Heading",
     "Highlight",
     "IconButton",
     "Input",
     "Kbd",
     "Label",
     "LacspaceStyles",
     "MetricBar",
     "Modal",
     "MultiSelect",
     "NavItem",
     "NavList",
     "NavSection",
     "NumberInput",
     "Pagination",
     "Panel",
     "PasswordInput",
     "PinInput",
     "Popover",
     "Progress",
     "ProgressRing",
     "Prose",
     "Radio",
     "RadioGroup",
     "Rating",
     "ScrollArea",
     "SearchInput",
     "Section",
     "Select",
     "Skeleton",
     "Slider",
     "Snippet",
     "Spacer",
     "Spinner",
     "Stack",
     "Stat",
     "Stepper",
     "Sticky",
     "Switch",
     "TAG_SEPARATORS",
     "Tab",
     "TabList",
     "TabPanel",
     "Tabs",
     "Tag",
     "TagInput",
     "Text",
     "Textarea",
     "Timeline",
     "TimelineItem",
     "Toast",
     "ToastProvider",
     "ToggleGroup",
     "Toolbar",
     "ToolbarGroup",
     "ToolbarSeparator",
     "Tooltip",
     "Tree",
     "Truncate",
     "VStack",
     "clamp",
     "clampNumber",
     "collapseBreadcrumbs",
     "colorIndexFor",
     "componentsCss",
     "cx",
     "debounce",
     "decimalPlaces",
     "defaultComboboxFilter",
     "deltaTone",
     "deriveStepStates",
     "distributePin",
     "filterOptions",
     "firstEmptyPinIndex",
     "firstEnabledIndex",
     "flattenTree",
     "formatBytes",
     "formatDelta",
     "formatNumberValue",
     "gridTemplate",
     "groupThousands",
     "hexWithoutAlpha",
     "initials",
     "isValidHex",
     "lastEnabledIndex",
     "lengthToken",
     "matchesAccept",
     "mergeTags",
     "moveHighlight",
     "moveThumb",
     "nearestThumb",
     "nextEnabledIndex",
     "nextFocusIndex",
     "normalizeHex",
     "normalizeMetrics",
     "normalizeRating",
     "oppositePlacement",
     "orderThumbs",
     "padPin",
     "paginationRange",
     "parseNumericInput",
     "percent",
     "percentToSliderValue",
     "pinPattern",
     "placementFits",
     "positionFloating",
     "ratioToPercent",
     "resolveResponsive",
     "responsiveVars",
     "roundTo",
     "roundToHalf",
     "rovingIndex",
     "scorePassword",
     "scrollEdges",
     "setThumbValue",
     "sliderValueToPercent",
     "snapToStep",
     "spaceToken",
     "spanValue",
     "splitAvatarOverflow",
     "splitHighlight",
     "splitKeys",
     "splitTagInput",
     "stepNumber",
     "toastReducer",
     "toggleAccordionValue",
     "toggleSelection",
     "truncateMiddle",
     "typeaheadBuffer",
     "typeaheadMatch",
     "useControllable",
     "useStableId",
     "useToast",
     "validateFiles",
     "visibleToasts"
  ],
  "usage": "import \"@lacspace/components/styles.css\";\nimport { Button, Card, CardBody, Field, Input, useToast } from \"@lacspace/components\";\n\nfunction SignIn() {\n  const { toast } = useToast();\n  return (\n    <Card>\n      <CardBody>\n        <Field label=\"Email\" hint=\"We never share it.\">\n          {({ id, describedBy }) => (\n            <Input id={id} aria-describedby={describedBy} type=\"email\" placeholder=\"you@company.com\" />\n          )}\n        </Field>\n        <Button full onClick={() => toast(\"Check your inbox\")}>Continue</Button>\n      </CardBody>\n    </Card>\n  );\n}"
 },
 "charts": {
  "exports": [
     "AreaChart",
     "BarChart",
     "CandlestickChart",
     "ChartAxis",
     "ChartDataTable",
     "ChartFrame",
     "ChartGrid",
     "ChartLegend",
     "ChartTooltip",
     "DEFAULT_MARGIN",
     "DEFAULT_PALETTE",
     "DonutChart",
     "FunnelChart",
     "Gauge",
     "Heatmap",
     "LacspaceChartStyles",
     "LineChart",
     "PieChart",
     "RadarChart",
     "SparkBars",
     "Sparkline",
     "arcPath",
     "areaPath",
     "bandScale",
     "calendarCells",
     "candleDirection",
     "chartsCss",
     "clamp",
     "classes",
     "colorAt",
     "cx",
     "describeSeries",
     "extent",
     "formatNumber",
     "formatPercent",
     "funnelStages",
     "gaugeAngle",
     "heatColor",
     "linePath",
     "linearScale",
     "mixColor",
     "nearestPoint",
     "niceDomain",
     "niceNum",
     "niceTicks",
     "ohlcExtent",
     "padDegenerate",
     "parseHex",
     "percent",
     "pieSlices",
     "plotArea",
     "polarPoint",
     "polygonPath",
     "roundToStep",
     "roundedBarPath",
     "smoothPath",
     "stackExtent",
     "stackSeries",
     "sum",
     "useStableId"
  ],
  "usage": "import { LineChart } from \"@lacspace/charts\";\nimport \"@lacspace/charts/styles.css\";\n\n<LineChart\n  labels={months}\n  series={[\n    { name: \"MRR\", data: mrr },\n    { name: \"Plan\", data: plan, dashed: true },\n  ]}\n  curve\n  dots\n  tooltip\n  responsive\n  dataTable\n  formatValue={(n) => \"$\" + n + \"k\"}\n/>\n\n// Or place the marks yourself — the scale maths is exported on its own:\nimport { linearScale, niceTicks, linePath } from \"@lacspace/charts\";"
 },
 "table": {
  "exports": [
     "DEFAULT_COLUMN_WIDTH",
     "DataTable",
     "FORMULA_PREFIXES",
     "MAX_COLUMN_WIDTH",
     "MIN_COLUMN_WIDTH",
     "TBody",
     "TFoot",
     "THead",
     "Table",
     "TableCaption",
     "TableCheckbox",
     "TableColumnsMenu",
     "TableEmpty",
     "TablePagination",
     "TableScroll",
     "TableSearch",
     "TableStyles",
     "TableToolbar",
     "Td",
     "Th",
     "Tr",
     "actionsColumn",
     "aggregate",
     "badgeColumn",
     "booleanColumn",
     "clamp",
     "clampColumnWidth",
     "clampPage",
     "classes",
     "columnReader",
     "currencyColumn",
     "customColumn",
     "cx",
     "cycleSort",
     "dateColumn",
     "defaultCompare",
     "defineColumn",
     "defineColumns",
     "downloadCsv",
     "escapeCell",
     "exportColumnsFrom",
     "exportRows",
     "filterFieldsFrom",
     "filterRows",
     "formatCurrency",
     "formatDate",
     "formatNumber",
     "inferRowId",
     "isBlank",
     "isEmptyFilter",
     "isIndeterminate",
     "isNumberRange",
     "linkColumn",
     "matchesFilter",
     "matchesQuery",
     "neutraliseFormula",
     "numberColumn",
     "numericValues",
     "pageCount",
     "pageForSizeChange",
     "pageRange",
     "pageSlice",
     "pageTokens",
     "pinnedOffsets",
     "pruneSelection",
     "resizeColumn",
     "resolveColumn",
     "resolveColumns",
     "searchableIds",
     "selectionMode",
     "setSelection",
     "sortDirectionOf",
     "sortFieldsFrom",
     "sortIndexOf",
     "sortRows",
     "tableCss",
     "textColumn",
     "toCsv",
     "toDate",
     "toDelimited",
     "toNumber",
     "toText",
     "toTsv",
     "toggleSelected",
     "useControllable",
     "useStableId",
     "useTable"
  ],
  "usage": "import { DataTable, textColumn, badgeColumn, currencyColumn, dateColumn } from \"@lacspace/table\";\nimport \"@lacspace/table/styles.css\";\n\n<DataTable<Account>\n  caption=\"Account book\"\n  data={accounts}\n  getRowId={(row) => row.id}\n  columns={[\n    textColumn<Account>(\"account\", { header: \"Account\", key: \"account\", pinned: \"left\", width: 200 }),\n    badgeColumn<Account>(\"status\", {\n      header: \"Status\",\n      key: \"status\",\n      tones: { active: \"success\", trial: \"info\", past_due: \"warning\", churned: \"danger\" },\n    }),\n    currencyColumn<Account>(\"mrr\", { header: \"MRR\", key: \"mrr\", currency: \"USD\", aggregate: \"sum\" }),\n    dateColumn<Account>(\"renews\", { header: \"Renews\", key: \"renews\" }),\n  ]}\n  defaultSort={[{ id: \"mrr\", direction: \"desc\" }]}\n  searchable\n  selectable\n  exportable\n  columnMenu\n  stickyHeader\n/>\n\n// Want your own markup? Same engine, no UI:\nconst table = useTable<Account>({ data: accounts, columns, getRowId: (r) => r.id });"
 },
 "date": {
  "exports": [
     "Calendar",
     "DatePicker",
     "DateRangePicker",
     "DateStyles",
     "DateTimePicker",
     "MonthPicker",
     "RelativeTime",
     "ScheduleGrid",
     "TimePicker",
     "WeekPicker",
     "YearPicker",
     "addDays",
     "addHours",
     "addMinutes",
     "addMonths",
     "addWeeks",
     "addYears",
     "clamp",
     "clampDate",
     "classes",
     "cloneDate",
     "compareDay",
     "cx",
     "dateCss",
     "daySlots",
     "daysInMonth",
     "defaultPresets",
     "diffInDays",
     "diffInMonths",
     "eachDayOfInterval",
     "endOfDay",
     "endOfMonth",
     "endOfWeek",
     "endOfYear",
     "floorToStep",
     "formatDate",
     "formatIntl",
     "formatRelative",
     "formatTimeValue",
     "from12Hour",
     "fullDateLabel",
     "getTimeValue",
     "hasSlot",
     "isAfterDay",
     "isBeforeDay",
     "isCompleteRange",
     "isDateDisabled",
     "isInPreviewRange",
     "isInRange",
     "isLeapYear",
     "isMonthDisabled",
     "isRangeAllowed",
     "isRangeEnd",
     "isRangeStart",
     "isSameDay",
     "isSameMonth",
     "isSameWeek",
     "isSameYear",
     "isValidDate",
     "isYearDisabled",
     "isoWeekNumber",
     "makeDate",
     "monthGrid",
     "monthLabel",
     "monthNames",
     "nextEnabledDate",
     "nextFocusFromKey",
     "nightsBetween",
     "normalizeRange",
     "normalizeTime",
     "parseDate",
     "parseTimeText",
     "previewRange",
     "relativeFallback",
     "relativeParts",
     "relativeRefreshMs",
     "resolveLocale",
     "roundToStep",
     "scheduleDays",
     "selectRangeDate",
     "setTimeValue",
     "slotKey",
     "startOfDay",
     "startOfMonth",
     "startOfWeek",
     "startOfYear",
     "stepTimePart",
     "to12Hour",
     "toggleSlot",
     "useControllable",
     "useDayFocus",
     "useStableId",
     "utcStamp",
     "weekDays",
     "weekdayNames",
     "weekdayOrder"
  ],
  "usage": "import { DatePicker, DateRangePicker, defaultPresets } from \"@lacspace/date\";\nimport \"@lacspace/date/styles.css\";\n\n<DatePicker\n  format=\"dd/MM/yyyy\"\n  weekStartsOn={1}\n  clearable\n  showTodayButton\n  onChange={setDay}\n  onInvalidInput={(text) => console.warn(\"could not read\", text)}\n/>\n\n<DateRangePicker\n  numberOfMonths={2}\n  minNights={1}\n  presets={defaultPresets()}\n  separator=\" – \"\n  onChange={setRange}\n/>"
 },
 "oauth": {
  "exports": [
   "createOAuthClient",
   "OAuthError",
   "google",
   "github",
   "microsoft",
   "apple",
   "createAppleClientSecret",
   "gitlab",
   "discord",
   "slack",
   "linkedin",
   "facebook",
   "x",
   "spotify",
   "twitch",
   "notion",
   "oidc",
   "auth0",
   "okta",
   "keycloak",
   "cognito",
   "oauth2",
   "providers",
   "discover",
   "oidcProfile",
   "generateCodeVerifier",
   "codeChallengeS256",
   "generateState",
   "generateNonce",
   "accessTokenHash"
  ],
  "usage": "import { createOAuthClient, google } from \"@lacspace/oauth\";\n\nconst client = createOAuthClient(google({ clientId, clientSecret, redirectUri: \"https://app.example.com/auth/google/callback\" }));\n\n// 1. redirect — store state, codeVerifier and nonce (e.g. @lacspace/session's OAuth state store)\nconst { url, state, codeVerifier, nonce } = await client.authorizationUrl({ prompt: \"select_account\" });\n\n// 2. callback — state ✓ PKCE ✓ nonce ✓ ID token verified over JWKS ✓\nconst tokens  = await client.handleCallback(req.url, { state, codeVerifier, nonce });\nconst profile = await client.userInfo(tokens);\n// { id: \"1088…\", email: \"ada@example.com\", emailVerified: true, name: \"Ada Lovelace\", picture: \"https://…\" }\n\n// any OIDC issuer: oidc({ issuer: \"https://acme.eu.auth0.com/\", clientId, clientSecret, redirectUri })"
 },
 "session": {
  "exports": [
   "createCookieSession",
   "createOAuthStateStore",
   "createCsrf",
   "parseCookies",
   "serializeCookie",
   "clearCookie",
   "getCookie",
   "cookieHeaderOf",
   "setFlash",
   "takeFlash",
   "constantTimeEqual",
   "randomBytes",
   "toBase64url",
   "fromBase64url"
  ],
  "usage": "import { createCookieSession, createOAuthStateStore, createCsrf } from \"@lacspace/session\";\n\nconst sessions = createCookieSession<{ userId: string }>({ secrets: [process.env.SESSION_SECRET!], rolling: true });\n\nconst s = await sessions.read(request);             // Cookie header, Web Request or Node req — never throws\nif (!s.data) return unauthorized(s.reason);           // \"missing\" | \"tampered\" | \"expired\" | …\nheaders.append(\"set-cookie\", await sessions.commit({ userId: \"u1\" }));   // __Host-session=v1.… AES-256-GCM\nheaders.append(\"set-cookie\", sessions.destroy());\n\nconst oauthState = createOAuthStateStore({ secrets: [SECRET] });   // 10-minute { state, codeVerifier, nonce }\nconst csrf = createCsrf({ secrets: [SECRET] });                    // tokens bound to s.id"
 },
 "condense": {
  "exports": [
   "condense",
   "splitSentences"
  ],
  "usage": "import { condense } from \"@lacspace/condense\";\n\nconst digest = condense(\n  [\n    { text: kathmanduPost, label: \"Kathmandu Post\" },\n    { text: himalayanTimes, label: \"Himalayan Times\" },\n    { text: onlineKhabar, label: \"Online Khabar\" },\n  ],\n  { tokenBudget: 1500, gazetteer: [\"Nepal Rastra Bank\", \"\\u0928\\u0947\\u092a\\u093e\\u0932 \\u0930\\u093e\\u0937\\u094d\\u091f\\u094d\\u0930 \\u092c\\u0948\\u0902\\u0915\"] },\n);\n\ndigest.text;       // kept sentences grouped per source under [S1 Kathmandu Post] headers\ndigest.tokens;     // \\u2264 tokenBudget\ndigest.droppedDup; // near-duplicate sentences removed across sources\n// Feed digest.text to the model instead of six full articles."
 },
 "screen": {
  "exports": [
   "createScreen",
   "screenText"
  ],
  "usage": "import { createScreen } from \"@lacspace/screen\";\n\nconst screen = createScreen({\n  dimensions: {\n    death:    { terms: [\"died\", \"killed\", \"\\u092e\\u0943\\u0924\\u094d\\u092f\\u0941\"] },\n    minor:    { terms: [\"child\", \"\\u092c\\u093e\\u0932\\u092c\\u093e\\u0932\\u093f\\u0915\\u093e\"], forceReview: true },\n    hate:     { terms: [/* your list */], weight: 3, forceBlock: true },\n  },\n  negations: [\"no\", \"not\", \"-\\u0928\", \"-\\u0928\\u0928\\u094d\"],\n  gazetteer: [\"\\u0915\\u093e\\u0920\\u092e\\u093e\\u0921\\u094c\\u0902\"],\n  thresholds: { clear: 0, review: 1, block: 5 },\n});\n\nconst r = screen(storyText);\nr.decision; // \"clear\" | \"review\" | \"block\"\nif (r.decision === \"review\") await askTheModel(storyText); // only the uncertain ones reach the LLM"
 },
 "keyphrase": {
  "exports": [
   "keyphrase",
   "toHashtag",
   "ENGLISH_STOPWORDS",
   "NEPALI_STOPWORDS"
  ],
  "usage": "import { keyphrase } from \"@lacspace/keyphrase\";\n\nconst r = keyphrase(articleText, {\n  gazetteer: [\"Nepal Rastra Bank\", \"\\u0928\\u0947\\u092a\\u093e\\u0932 \\u0930\\u093e\\u0937\\u094d\\u091f\\u094d\\u0930 \\u092c\\u0948\\u0902\\u0915\"],\n  categories: { economy: [\"rate\", \"inflation\", \"bank\"], sports: [\"match\", \"goal\"] },\n});\nr.tags;       // [\"policy interest rate\", \"central bank\", ...]\nr.hashtags;   // [\"#PolicyInterestRate\", ...]\nr.entities;   // [{ text: \"Nepal Rastra Bank\", count: 2 }]\nr.categories; // [{ category: \"economy\", score: 4 }]  — auto-detects en/ne"
 },
 "llm-cache": {
  "exports": [
   "createLlmCache",
   "memoryStore",
   "contentHash"
  ],
  "usage": "import { createLlmCache, memoryStore } from \"@lacspace/llm-cache\";\n\nconst cache = createLlmCache({ store: memoryStore(), ttlMs: 86_400_000, promptVersion: \"v3\" });\n\nconst pack = await cache.wrap(\n  { input: condensedSources, model: \"gemini\", variant: { lang: \"ne\" } },\n  () => callGemini(condensedSources),   // only runs on a miss\n  { staleIfError: true },               // 429? serve the last good result\n);\ncache.stats(); // { hits, misses, sets }"
 },
 "keypool": {
  "exports": [
   "createKeypool",
   "kvStore"
  ],
  "usage": "import { createKeypool } from \"@lacspace/keypool\";\n\nconst pool = createKeypool({\n  keys: [\n    { id: \"gem-1\", provider: \"gemini\", secret: process.env.GEMINI_1! },\n    { id: \"gem-2\", provider: \"gemini\", secret: process.env.GEMINI_2! },\n  ],\n  providerLimits: { gemini: { rpm: 15, rpd: 1500, tpm: 1_000_000 } },\n});\n\nconst picked = await pool.pick(\"gemini\", \"gemini-2.0-flash\", estTokens);\nif (!picked) throw new Error(\"all keys cooling down\");\nconst res = await callGemini(picked.secret, prompt);\nawait pool.report(picked.id, { ok: true, tokens: res.usage.total, model: \"gemini-2.0-flash\" });"
 },
 "translit": {
  "exports": [
   "transliterate",
   "matchName",
   "nameVariants",
   "stripHonorifics",
   "normalizeName",
   "phoneticKey",
   "scriptRatio",
   "dominantScript",
   "looksLikeName",
   "isCommonWord",
   "devanagariToLatin",
   "latinToDevanagari",
   "detectScript"
  ],
  "usage": "import { matchName, looksLikeName, dominantScript } from \"@lacspace/translit\";\n\nmatchName(\"Ram Chandra Poudel\", \"\\u0930\\u093e\\u092e\\u091a\\u0928\\u094d\\u0926\\u094d\\u0930 \\u092a\\u094c\\u0921\\u0947\\u0932\").match; // true\nmatchName(\"Laxmi\", \"\\u0932\\u0915\\u094d\\u0937\\u094d\\u092e\\u0940\").match; // true (x = क्ष cluster)\nlooksLikeName(\"india west indies\").isName; // false — don't transliterate this\nmatchName(a, b, { requireName: true }).match; // gated: both sides must look like a name"
 },
 "factcheck-lite": {
  "exports": [
   "extractClaims",
   "verify",
   "extractNumeric",
   "extractDates",
   "normalizeDigits"
  ],
  "usage": "import { verify, extractClaims } from \"@lacspace/factcheck-lite\";\n\nconst r = verify(generatedArticle, sourceTexts, { numberTolerance: 0 });\nr.ok;          // false if any figure is unsupported\nr.mismatches;  // [{ type: \"percentage\", value: 6.5, nearest: 5.5, note }]\n// 12 crore == १२ करोड == 120,000,000 all compare equal; entities matched across scripts via @lacspace/translit"
 },
 "trend-detect": {
  "exports": [
   "detectTrends",
   "EN_STOP",
   "NE_STOP"
  ],
  "usage": "import { detectTrends } from \"@lacspace/trend-detect\";\n\nconst trends = detectTrends(items, { windowHours: 24, baselineHours: 168, minCount: 3, topK: 20 });\n// items: { text, at, category?, terms?, id? }[]\n// → [{ term: \"flood\", recent: 12, baseline: 1.2, z: 6.4, growth: 5.5, score: 34.1, category, items }]"
 },
 "feed-reader": {
  "exports": [
   "parseFeed",
   "discoverFeeds",
   "commonFeedPaths",
   "scoreFeedHealth",
   "readFeed",
   "feedFetchAllowed",
   "parseRobots",
   "isAllowed",
   "toISO"
  ],
  "usage": "import { discoverFeeds, readFeed, feedFetchAllowed } from \"@lacspace/feed-reader\";\n\nconst feeds = discoverFeeds(html, \"https://example.com/\");\nif (feedFetchAllowed(feeds[0].href, robotsTxt, \"MyBot\")) {\n  const body = await fetch(feeds[0].href).then(r => r.text());\n  const { feed, health } = readFeed(body);\n  // health → { score, status, ageHours, postsPerDay, duplicateRatio, spike, reasons }\n}"
 },
 "datecheck": {
  "exports": [
   "extractPublishedDate",
   "textStaleness",
   "assessFreshness",
   "assessFreshnessWithAI",
   "freshnessPrompt",
   "parseAnyDate",
   "bsToAd",
   "adToBs",
   "normalizeDigits"
  ],
  "usage": "import { extractPublishedDate, assessFreshness, bsToAd } from \"@lacspace/datecheck\";\n\nextractPublishedDate(html, url).publishedAt; // reads JSON-LD / meta / <time> / URL / byline, incl. Bikram Sambat\nassessFreshness({ html, text, url, feedDate, now: new Date(), maxAgeHours: 48 }).verdict; // \"fresh\" | \"stale\" | \"unknown\"\nbsToAd(2083, 6, 16); // → 2026-10-02 (AD)\n// fail-closed: no date + no signal = \"unknown\", never silently fresh"
 },
 "marketwrap": {
  "exports": [
   "NEPALI_NAMES",
   "describe",
   "groupSouthAsian",
   "marketWrap",
   "rupeesInWords",
   "signedPct",
   "toDevanagari"
  ],
  "usage": "import { marketWrap } from \"@lacspace/marketwrap\";\n\nconst w = marketWrap({\n  index: { name: \"NEPSE\", close: 2587.25, change: -11.9, pct: -0.45 },\n  breadth: { up: 95, down: 238, flat: 23 },\n  turnoverRs: 4293774181,\n  sectors: [{ name: \"Mutual Fund\", pct: 0.2 }, { name: \"Trading\", pct: -0.96 }],\n  gainers: [{ symbol: \"SBLD89\", pct: 8.8 }],\n  losers: [{ symbol: \"SINDU\", pct: -8.55 }],\n});\n\nw.en;\n// NEPSE fell 11.90 points (−0.45%) to 2,587.25. Decliners led 238 to 95. Turnover Rs 4.29 arba.\n// Mutual Fund was the best sector (+0.20%), Trading the weakest (−0.96%).\nw.ne;\n// नेप्से ११.९० अंक (−०.४५%) घटेर २,५८७.२५ मा बन्द भयो। २३८ कम्पनीको शेयरमूल्य घट्यो भने ९५ को बढ्यो र २३ को स्थिर रह्यो।\n// कारोबार रकम रु ४.२९ अर्ब रह्यो। उपसमूहतर्फ म्युचुअल फन्ड (+०.२०%) सबैभन्दा राम्रो र व्यापार (−०.९६%) सबैभन्दा कमजोर रह्यो।\nw.headline; // { en: \"NEPSE down 11.90 points\", ne: \"नेप्से ११.९० अंकले घट्यो\" }\nw.facts;    // direction, points, pct, breadth leader, turnover, best/worst sector, top movers"
 },
 "patterns": {
  "exports": [
   "atr",
   "chartPatterns",
   "describe",
   "elliott",
   "harmonics",
   "kagi",
   "pointFigure",
   "rma",
   "sessionVolumeProfiles",
   "swings",
   "tpoProfiles",
   "trueRange",
   "volumeProfile"
  ],
  "usage": "import { swings, chartPatterns, harmonics, elliott, tpoProfiles } from \"@lacspace/patterns\";\n\n// bars: { time (unix seconds), open, high, low, close, volume }[]\nswings(bars, 2);                // { piv: [{ i, p, hi }], tail, atr }: zigzag confirmed at k × ATR(14)\nchartPatterns(bars).found;      // [\"Double bottom\", \"Double bottom\", \"Range (rectangle)\"]\nharmonics(bars).hits;           // [{ name: \"Gartley\", bull, pts: [X,A,B,C,D], forming }]\nelliott(bars).paths;            // labelled impulse (0)…(5), then (a)(b)(c); wave-5 target zone\ntpoProfiles(bars, 24, 5);       // market profile per session: rows with letters, POC, 70% value area, initial balance"
 },
 "portfolio": {
  "exports": [
   "analyzePortfolio",
   "beta",
   "describe",
   "hhi",
   "maxDrawdown"
  ],
  "usage": "import { analyzePortfolio } from \"@lacspace/portfolio\";\n\nconst r = analyzePortfolio(\n  {\n    holdings: [{ symbol: \"NABIL\", qty: 100, wacc: 540 }, { symbol: \"UPPER\", qty: 200, wacc: 180 }],\n    prices: { NABIL: [{ date: \"2026-10-01\", close: 532 }, …], UPPER: [...] }, // daily closes\n    index: [{ date: \"2026-10-01\", close: 2587.25 }, …],                        // NEPSE, for beta\n    sectors: { NABIL: \"Banking\", UPPER: \"Hydropower\" },\n  },\n  { periodsPerYear: 240, riskFree: 0 },\n);\n\nr.holdings;      // [{ symbol, sector, qty, wacc, last, cost, value, weight, pnl, pnlPct }] by value\nr.totals;        // { cost, value, pnl, pnlPct }: unrealised P/L vs WACC\nr.hhi;           // concentration on market-value weights, 0–10,000 (10,000 = one stock)\nr.effectiveHoldings; // 10,000 / HHI\nr.sectorWeights; // [{ sector, value, weight }]\nr.history;       // [{ date, value }]: current holdings valued on past closes\nr.risk;          // { volatility, maxDrawdown, drawdownPeak, drawdownTrough, sharpe, sortino,\n                 //   beta, correlation, periodReturn, indexReturn, days, betaDays }"
 },
 "rules": {
  "exports": [
   "OPERAND_KINDS",
   "OPS",
   "STRATEGY_TEMPLATES",
   "backtestRules",
   "cleanRules",
   "condToText",
   "defaultOperand",
   "describe",
   "describeCond",
   "describeOperand",
   "describeRules",
   "evaluate",
   "operandSeries",
   "operandToText",
   "parseRules",
   "rulesStrategy",
   "rulesToText",
   "runBacktest",
   "screen"
  ],
  "usage": "import { cleanRules, evaluate, backtestRules, screen, describeRules } from \"@lacspace/rules\";\n\nconst rules = cleanRules({\n  name: \"EMA cross with RSI filter\",\n  entry: { mode: \"all\", conds: [\n    { a: { k: \"ema\", n: 20 }, op: \"crossAbove\", b: { k: \"ema\", n: 50 } },\n    { a: { k: \"rsi\", n: 14 }, op: \">\", b: { k: \"num\", v: 50 } },\n  ] },\n  exit: { mode: \"any\", conds: [{ a: { k: \"ema\", n: 20 }, op: \"crossBelow\", b: { k: \"ema\", n: 50 } }] },\n  stopAtr: 2,\n}); // → Rules | null (null when there's no valid entry condition)\n\ndescribeRules(rules!); // \"Buy when EMA 20 crosses above EMA 50 and RSI 14 is above 50; sell when …; stop 2 × ATR below entry.\"\nevaluate(rules!, bars); // { entry: boolean[], exit: boolean[], atr, need }, read on each candle's close"
 },
 "nepal-holidays": {
  "exports": [
   "YEARS_AVAILABLE",
   "_printedSaturdays",
   "_rows",
   "adToBS",
   "bsToAD",
   "describe",
   "holidays",
   "holidaysOn",
   "isHoliday",
   "source",
   "upcoming"
  ],
  "usage": "import { holidays, holidaysOn, isHoliday, upcoming } from \"@lacspace/nepal-holidays\";\n\nholidays(2083, { scope: \"national\" });\n// [{ id: \"new-year\", name: { en: \"Nepali New Year\", ne: \"नव वर्ष\" }, kind: \"public-holiday\", category: \"festival\",\n//    scope: \"national\", dateBS: \"2083-01-01\", dateAD: \"2026-04-14\", days: 1, section: \"2.1(क)\", source: {…} }, …]\n\nholidaysOn(\"2026-10-20\");            // [Dashain: 2083-06-31 → 2083-07-06, 17–23 Oct 2026, 7 days]\nisHoliday(\"2026-10-24\");             // { holiday: true, saturday: true, holidays: [] }\nupcoming(\"2026-10-05\", 3);           // Ghatasthapana, Dashain, Tihar\nholidays(2083, { district: \"Parsa\", scope: \"regional\" }); // Fagu Purnima on Chait 8 (Terai)"
 },
 "preeti": {
  "exports": [
   "convertMixed",
   "describe",
   "looksLikePreeti",
   "preetiToUnicode",
   "unicodeToPreeti"
  ],
  "usage": "import { preetiToUnicode, unicodeToPreeti, looksLikePreeti } from \"@lacspace/preeti\";\n\npreetiToUnicode(\"g]kfn ;/sf/sf k|wfgdGqLn] cfly{s ;'wf/sf] 3f]if0ff ug'{eof] .\");\n// \"नेपाल सरकारका प्रधानमन्त्रीले आर्थिक सुधारको घोषणा गर्नुभयो ।\"\n\nunicodeToPreeti(\"निर्माण\");    // \"lgdf{0f\"  (paste into a document set in Preeti)\nlooksLikePreeti(\"g]kfn\");     // true: offer to convert pasted legacy text"
 },
 "nepali-typing": {
  "exports": [
   "buildLexicon",
   "createTyper",
   "describe",
   "devKey",
   "latinKey",
   "phonetic",
   "suggest",
   "toDevanagari"
  ],
  "usage": "import { suggest, toDevanagari, createTyper, buildLexicon } from \"@lacspace/nepali-typing\";\n\nsuggest(\"sarkar\");        // [\"सरकार\", \"सर्कर\", \"सरकारी\", …]\nsuggest(\"kathmandu\");     // [\"काठमाडौं\", …]\nsuggest(\"netaharulai\");   // [\"नेताहरूलाई\", …]  (typed case endings)\ntoDevanagari(\"NEPSE aaja 20 ankale badhyo\");  // \"NEPSE आज २० अंकले बढ्यो\"\ntoDevanagari(\"mero desh nepal ho.\");          // \"मेरो देश नेपाल हो।\""
 },
 "nepali-match": {
  "exports": [
   "POSTPOSITIONS",
   "VERSION",
   "contains",
   "createMatcher",
   "districtTerms",
   "findTerms",
   "near",
   "normaliseNe",
   "normalizeNe",
   "prepare",
   "sentenceSpans",
   "splitSuffix"
  ],
  "usage": "import { createMatcher, districtTerms, near, normaliseNe } from \"@lacspace/nepali-match\";\n\nconst areas = createMatcher(districtTerms());\nareas.ids(\"चितवनमा बाढी, झापाको मेचीनगरमा पहिरो\");   // [\"chitwan\", \"jhapa\"]\nareas.test(\"दुई पर्वतारोही बेपत्ता\");                  // false\nareas.find(\"काठमाण्डौबाटै आएका\")[0];\n// { id: \"kathmandu\", term: \"काठमाण्डौ\", lang: \"ne\", index: 0, end: 13, text: \"काठमाण्डौबाटै\", suffix: \"बाटै\" }\n\nconst exam = [\"परीक्षा\", \"नतिजा\", \"विज्ञापन\", \"exam\", \"result\"];\nnear(\"लोकसेवा आयोगले निजामती विधेयकमा राय दियो\", \"लोकसेवा\", exam, 60);   // null: not exam news\nnear(\"लोकसेवा आयोगको खरिदार परीक्षाको नतिजा\", \"लोकसेवा\", exam, 60);    // { a, b, gap }\n\ncreateMatcher([{ id: \"see\", en: \"SEE\", ne: \"एसईई\" }]).test(\"Come and see\");   // false\nnormaliseNe(\"काठमाडौँ\") === normaliseNe(\"काठमाडौं\");                          // true"
 },
 "sourcewatch": {
  "exports": [
   "DEFAULT_USER_AGENT",
   "botBlockReason",
   "check",
   "checkAll",
   "classifyError",
   "decodeEntities",
   "extractText",
   "fnv1a64",
   "htmlToText",
   "isPdf",
   "isPlaceholder",
   "jsAppReason",
   "legacyFontFamily",
   "matchExpect",
   "normalise",
   "pdfFonts",
   "pdfInfo",
   "pdfText",
   "placeholderReason",
   "summarize",
   "tlsKindOf"
  ],
  "usage": "import { check, checkAll, summarize } from \"@lacspace/sourcewatch\";\n\nconst r = await check({ id: \"water-helpline\", url: \"https://nwc.gov.np\", expect: \"1145\" });\n// { ok: true, status: 200, kind: \"html\", found: true, matched: [\"1145\"], missing: [],\n//   snippet: \"…प्रेष विज्ञप्ति 1145 मा सम्पर्कका लागि अनुरोध…\", contentHash: \"590bd7c96affa346\", ms: 1222, … }\n\nconst results = await checkAll([\n  { id: \"short-codes\", url: \"https://nta.gov.np/uploads/contents/National%20Numbering%20Allocation%20Plan.pdf\", expect: [\"100\", \"101\", \"102\"] },\n  { id: \"eoc\", url: \"http://neoc.gov.np\", expect: \"1149\" },                       // → placeholder_page (\"this is test\")\n  { id: \"results\", url: \"https://neb.gov.np\", expect: /results?/i, prevHash: lastRun.results },\n], { concurrency: 4 });\n\nsummarize(results); // { total: 3, ok: 2, failed: 1, changed: 0, byError: { placeholder_page: 1 } }"
 },
 "gov-notices": {
  "exports": [
   "ADAPTERS",
   "DEFAULT_USER_AGENT",
   "SOURCES",
   "VERSION",
   "adapterFor",
   "applyDetail",
   "attachmentType",
   "cleanTitle",
   "completeTitle",
   "completeTitles",
   "conditional",
   "dedupe",
   "fetchNotices",
   "genericParse",
   "getSource",
   "hashId",
   "isResult",
   "isTruncated",
   "needsDetail",
   "newSince",
   "parseBsDate",
   "parseDate",
   "parseDetail",
   "parseHTML",
   "parseNotices",
   "queryAll",
   "queryOne",
   "tag",
   "titleLang",
   "toAsciiDigits"
  ],
  "usage": "import { fetchNotices, newSince, isResult } from \"@lacspace/gov-notices\";\n\n// Load these from your store. Use an empty set on the first run.\nconst seen: Set<string> = await loadSeenIds();\nconst prev = await loadValidators(\"neb\"); // { etag?, lastModified?, contentHash? }\n\nconst r = await fetchNotices(\"neb\", { etag: prev.etag, lastModified: prev.lastModified });\nif (!r.notModified && r.contentHash !== prev.contentHash) {\n  for (const n of newSince(r.notices, seen)) {\n    if (isResult(n)) await alert(`Results out: ${n.title} (${n.dateBs}) ${n.url}`);\n    seen.add(n.id);\n  }\n}\nawait saveValidators(\"neb\", { etag: r.etag, lastModified: r.lastModified, contentHash: r.contentHash });\nawait saveSeenIds(seen);"
 },
 "imap": {
  "exports": [
   "ImapAuthError",
   "ImapClient",
   "ImapCommandError",
   "ImapError",
   "ImapNetworkError",
   "ImapProtocolError",
   "ResponseFramer",
   "SPECIAL_USE_NAMES",
   "buildSearch",
   "createImapClient",
   "decodeModifiedUtf7",
   "decodeWords",
   "encodeModifiedUtf7",
   "expandSequenceSet",
   "parseBodyStructure",
   "parseEnvelope",
   "parseImapResponse",
   "sortUidsDesc",
   "uidRange"
  ],
  "usage": "import { createImapClient } from \"@lacspace/imap\";\n\nconst imap = createImapClient({\n  host: \"imap.hostinger.com\",                       // port 993, TLS by default\n  auth: { user: \"chandan@lacspace.com\", pass: process.env.IMAP_PASS! },\n});\nawait imap.connect();\n\nconst boxes = await imap.listMailboxes();\n// [{ path: \"INBOX\", specialUse: \"\\\\Inbox\", … }, { path: \"Sent\", specialUse: \"\\\\Sent\", subscribed: true, … }, …]\nconst sent = boxes.find((b) => b.specialUse === \"\\\\Sent\");\n\nconst inbox = await imap.select(\"INBOX\");          // { exists, uidValidity, uidNext, highestModseq?, … }\n\nconst uids = imap.sortUidsDesc(await imap.search({ unseen: true, since: new Date(\"2026-10-01\") }));\n\nfor await (const msg of imap.fetch(uids.slice(0, 50), { envelope: true, flags: true, bodyStructure: true })) {\n  console.log(msg.uid, msg.envelope?.from[0]?.address, msg.envelope?.subject); // RFC 2047 already decoded\n}\n\n// fetch one text part by partId (from bodyStructure, see @lacspace/mime findTextParts)\nconst [m] = await imap.fetchAll([uids[0]!], { bodyParts: [\"1.1\"] });\nconst raw = m!.parts[\"1.1\"];                          // Uint8Array, still transfer-encoded\n\nawait imap.store([uids[0]!], { add: [\"\\\\Seen\"] });   // mark seen\n\n// live updates until aborted\nconst ac = new AbortController();\nawait imap.idle({ signal: ac.signal, onEvent: (e) => console.log(e.type, e) }); // exists | expunge | fetch | recent | flags\n\nawait imap.logout();"
 },
 "mime": {
  "exports": [
   "MailHeaders",
   "MimeError",
   "buildMime",
   "decodeBase64",
   "decodeCharset",
   "decodePart",
   "decodeQuotedPrintable",
   "decodeWords",
   "encodeBase64",
   "encodeHeader",
   "encodeQuotedPrintable",
   "encodeWord",
   "findTextParts",
   "foldText",
   "formatAddress",
   "formatAddressList",
   "forwardSubject",
   "generateMessageId",
   "guessContentType",
   "listAttachments",
   "normalizeCharset",
   "parseAddress",
   "parseAddressList",
   "parseBodyStructure",
   "parseDate",
   "parseHeaderParams",
   "parseHeaders",
   "parseMessageIds",
   "parseMime",
   "replyHeaders",
   "replySubject",
   "rfc2822Date",
   "wrap76"
  ],
  "usage": "import { parseMime, buildMime, replyHeaders, parseBodyStructure, findTextParts, listAttachments, decodePart } from \"@lacspace/mime\";\n\nconst mail = parseMime(rawBytesOrString);\nmail.from;            // { name: \"Rām Bahādur\", address: \"ram@gmail.com\" }\nmail.subject;         // \"नमस्ते दुनिया\"   (RFC 2047, split multibyte joined)\nmail.html ?? mail.text;\nmail.inline;          // cid images from multipart/related → [{ contentId, content, … }]\nmail.attachments;     // [{ partId: \"2\", filename: \"Q3 Report.pdf\", size, content: Uint8Array }, …]\nmail.listUnsubscribe; // { urls: [\"https://…\"], mailto: \"mailto:…\", oneClick: true }\n\n// Lazy webmail: classify from BODYSTRUCTURE, then fetch by partId.\nconst tree = parseBodyStructure(fetchResult.bodyStructure); // object from @lacspace/imap, or the raw IMAP string\nconst { text, html } = findTextParts(tree);                 // e.g. html.partId === \"1.2\"\nconst body = decodePart(await fetchPart(html.partId), html); // transfer-decoded + charset → string\nlistAttachments(tree);                                      // [{ partId: \"2\", filename, size, isInline }, …]\n\n// Reply\nconst raw = buildMime({ from: \"me@lacspace.com\", to: mail.from!, text: \"Thanks!\", ...replyHeaders(mail) });"
 },
 "mail-sanitize": {
  "exports": [
   "ALLOWED_TAGS",
   "DATA_BACKGROUND_ATTR",
   "DATA_SRC_ATTR",
   "PLACEHOLDER_GIF",
   "TRACKER_HOSTS",
   "TRACKER_PATHS",
   "decodeEntities",
   "escapeAttr",
   "escapeText",
   "htmlToText",
   "isTrackerUrl",
   "sanitizeEmailHtml",
   "snippet",
   "textToHtml"
  ],
  "usage": "import { sanitizeEmailHtml, htmlToText, textToHtml, snippet } from \"@lacspace/mail-sanitize\";\n\nconst r = sanitizeEmailHtml(message.html, {\n  cidMap: { \"image001.png@01D9A1B2.3C4D5E60\": \"/api/messages/42/parts/2\" },\n});\n// r.html            safe markup, with one scoped <style> first\n// r.blockedCount    3 remote images replaced by placeholders\n// r.hasRemoteContent true → show the \"Load images\" bar\n// r.trackers        [\"https://…list-manage.com/track/open.php?u=…\"]\n// r.links           [{ href: \"https://…\", text: \"Read more\" }]\n\nsnippet(message.html);                     // \"Hello Asha, here is what is new this month — three…\"\ntextToHtml(message.text);                  // escaped, <br>, linkified, \"> \" lines in <blockquote>"
 },
 "dkim": {
  "exports": [
   "DEFAULT_SIGNED_HEADERS",
   "DkimError",
   "canonicalizeBody",
   "canonicalizeHeader",
   "chunkTxt",
   "dkimDnsRecord",
   "ed25519SeedToPkcs8",
   "fromDomainOf",
   "generateKeyPair",
   "importPrivateKey",
   "parseDkimKey",
   "parseDkimSignature",
   "parseTagList",
   "signHeader",
   "signMessage",
   "stripSignatureValue",
   "toPem",
   "verifyMessage"
  ],
  "usage": "import { signMessage, verifyMessage, generateKeyPair } from \"@lacspace/dkim\";\n\nconst signed = await signMessage(rawMime, {\n  domain: \"example.com\",\n  selector: \"mail2026\",\n  privateKey: process.env.DKIM_PRIVATE_KEY!, // PKCS#8 PEM\n});\n// \"DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed; d=example.com; s=mail2026; t=…;\\r\\n h=from:to:subject:date:message-id:from; bh=…; b=…\\r\\n\" + rawMime\n\nconst { pass, results } = await verifyMessage(incomingRaw);\n// pass: true when at least one signature verifies AND its d= aligns with the From domain\n// results: [{ domain: \"example.com\", selector: \"mail2026\", algorithm: \"rsa-sha256\", status: \"pass\",\n//             aligned: true, canonicalization: \"relaxed/relaxed\", signedHeaders: [...], bodyHashOk: true, keyBits: 2048 }]"
 },
 "mail-dns": {
  "exports": [
   "CHECK_LABELS",
   "COMMON_DKIM_SELECTORS",
   "PROVIDERS",
   "SCORE_WEIGHTS",
   "STATUS_CREDIT",
   "STATUS_TEXT",
   "base64ToBytes",
   "buildDkim",
   "buildDmarc",
   "buildMtaStsPolicy",
   "buildSpf",
   "buildTlsRpt",
   "checkDomain",
   "cidrMatch",
   "countSpfLookups",
   "detectProviders",
   "dohResolver",
   "evaluateSpf",
   "expectedMxHosts",
   "explain",
   "explainReport",
   "externalReportDomains",
   "findSpfRecords",
   "generateRecords",
   "ipFamily",
   "isDmarcRecord",
   "isNullMx",
   "mxMatchesPattern",
   "nodeResolver",
   "normalizeDkimPublicKey",
   "parseBimi",
   "parseDkimKey",
   "parseDmarc",
   "parseDohAnswer",
   "parseIp4",
   "parseIp6",
   "parseMtaStsPolicy",
   "parseMtaStsTxt",
   "parseSpf",
   "parseTlsRpt",
   "parseTxtData",
   "pickResolver",
   "primaryDkim",
   "providerDkimSelectors",
   "providerMx",
   "rsaModulusBits",
   "scoreChecks",
   "splitTxt",
   "toZoneFile",
   "uncoveredMx"
  ],
  "usage": "import { generateRecords, checkDomain, explain } from \"@lacspace/mail-dns\";\n\nconst setup = {\n  domain: \"acme.com\",\n  mailHost: \"mx1.mail.lacspace.com\",\n  spfInclude: [\"_spf.mail.lacspace.com\"],\n  dkim: { selector: \"lac1\", publicKey: \"MIIBIjANBgkq...\" },   // base64, PEM, or a full v=DKIM1 value\n  dmarc: { policy: \"none\", rua: [\"dmarc@acme.com\"] },\n  mtaSts: { mode: \"testing\", policyHost: \"mta-sts.mail.lacspace.com\" },\n  tlsRpt: { rua: [\"tls@acme.com\"] },\n};\n\nconst { records, mtaStsPolicyFile, notes } = generateRecords(setup);\n// [{ type: \"MX\",  name: \"@\", fqdn: \"acme.com\", value: \"mx1.mail.lacspace.com\", priority: 10, ttl: 3600, required: true, purpose: \"Delivers email for acme.com to ...\" },\n//  { type: \"TXT\", name: \"@\", value: \"v=spf1 include:_spf.mail.lacspace.com ~all\", ... },\n//  { type: \"TXT\", name: \"lac1._domainkey\", value: \"v=DKIM1; k=rsa; p=MIIB...\", chunks: [/* ≤255-char strings */] },\n//  { type: \"TXT\", name: \"_dmarc\", value: \"v=DMARC1; p=none; rua=mailto:dmarc@acme.com\" },\n//  { type: \"TXT\", name: \"_mta-sts\", value: \"v=STSv1; id=1f3a9c...\" }, { type: \"CNAME\", name: \"mta-sts\", ... },\n//  { type: \"TXT\", name: \"_smtp._tls\", value: \"v=TLSRPTv1; rua=mailto:tls@acme.com\" }]\n\nconst report = await checkDomain(\"acme.com\", { expect: setup });\nreport.ok;      // true when MX, SPF, DKIM and DMARC all work\nreport.score;   // 0–100\nreport.fixes;   // [\"Add an MX record at @ pointing to mx1.mail.lacspace.com with priority 10.\", ...]\nexplain(report.checks.spf);\n// Allowed senders (SPF): Broken: this needs fixing.\n// - Your SPF record has 12 DNS lookups; the limit is 10, so receivers will treat it as broken. ..."
 },
 "mail-auth": {
  "exports": [
   "FREE_MAIL_DOMAINS",
   "RISK_THRESHOLDS",
   "SIGNAL_WEIGHTS",
   "assessRisk",
   "decodePunycode",
   "editDistance",
   "hasMixedScript",
   "isFreeMail",
   "isWholeScriptConfusable",
   "lookalikeOf",
   "parseAuthenticationResults",
   "registrableDomain",
   "skeleton",
   "toUnicodeDomain"
  ],
  "usage": "import { parseAuthenticationResults, assessRisk } from \"@lacspace/mail-auth\";\n\nconst auth = parseAuthenticationResults(\n  { authenticationResults: headers.getAll(\"Authentication-Results\"), receivedSpf: headers.getAll(\"Received-SPF\") },\n  { trustedAuthservIds: [\"mx1.yourmail.com\"] }, // only YOUR server's header\n);\n// { spf: \"pass\", dkim: \"pass\", dmarc: \"fail\", dmarcPolicy: \"reject\", headerFrom: \"lacsp4ce.com\", authservId: \"mx1.yourmail.com\", … }\n\nconst risk = assessRisk({\n  from: { name: \"Lacspace Billing\", address: \"billing@lacsp4ce.com\" },\n  replyTo: [{ address: \"lacspace.billing@gmail.com\" }],\n  subject: \"[EXTERNAL] Updated bank details\",\n  snippet: \"Our bank details have changed, please pay the attached invoice urgently.\",\n  auth,\n  recipientDomain: \"lacspace.com\",\n  knownContacts: addressBook,             // [{ name, address }]\n  links,                                  // [{ href, text }] from your HTML sanitizer\n});\n// { level: \"high\", score: 100, reasons: [\n//   \"The sender's address (billing@lacsp4ce.com) looks like lacspace.com but is a different domain.\",\n//   \"It failed lacsp4ce.com's anti-forgery check (DMARC), so it may not really be from them.\",\n//   \"It urgently asks for a payment or new bank details. Confirm with the sender by phone before paying.\",\n//   … ], signals: [{ code: \"lookalike.from\", weight: 50, detail: \"lacspace.com\" }, …] }"
 },
 "unsubscribe": {
  "exports": [
   "ONE_CLICK_BODY",
   "decodeEncodedWords",
   "getHeader",
   "isOneClickPost",
   "isPrivateHost",
   "isPrivateIPv4",
   "isPrivateIPv6",
   "isPrivateIp",
   "mailtoUnsubscribe",
   "oneClickUnsubscribe",
   "parseListHeaders",
   "parseListId",
   "parseListUnsubscribe",
   "parseListUrls",
   "parseMailto",
   "unsubscribeOptions"
  ],
  "usage": "import { unsubscribeOptions, oneClickUnsubscribe, parseListUnsubscribe, parseListId } from \"@lacspace/unsubscribe\";\n\nparseListUnsubscribe(\n  \"<mailto:leave@news.example.com?subject=unsubscribe>, <https://news.example.com/u/abc>\",\n  \"List-Unsubscribe=One-Click\",\n);\n// { https: [\"https://news.example.com/u/abc\"], http: [],\n//   mailto: [{ to: \"leave@news.example.com\", subject: \"unsubscribe\" }], oneClick: true, raw: \"…\" }\n\nparseListId(\"Weekly Digest <digest.example.com>\"); // { name: \"Weekly Digest\", id: \"digest.example.com\" }\n\nunsubscribeOptions(message.headers);\n// { method: \"one-click\", url: \"https://news.example.com/u/abc\", listId: {…}, listUnsubscribe: {…} }\n\nawait oneClickUnsubscribe(\"https://news.example.com/u/abc\"); // { ok: true, status: 200 }"
 },
 "ics": {
  "exports": [
   "DEFAULT_PRODID",
   "WINDOWS_TIMEZONES",
   "buildCancelIcs",
   "buildIcs",
   "buildReplyIcs",
   "buildVTimezone",
   "escapeText",
   "fold",
   "parseContentLine",
   "parseDateTime",
   "parseDuration",
   "parseIcs",
   "parseIcsEvent",
   "replyEmail",
   "resolveZone",
   "unescapeText",
   "unfold"
  ],
  "usage": "import { parseIcsEvent, replyEmail, buildIcs } from \"@lacspace/ics\";\n\nconst ev = parseIcsEvent(icsText);\n// { uid: \"040000008200E…\", sequence: 2, summary: \"Sprint review\",\n//   start: \"2026-10-20T08:15:00Z\", end: \"2026-10-20T09:15:00Z\", allDay: false,\n//   startTzid: \"Nepal Standard Time\", organizer: { name: \"Shrestha, Anil\", address: \"anil@contoso.com\" },\n//   attendees: [{ name: \"Sita Rai\", address: \"sita@contoso.com\", role: \"REQ-PARTICIPANT\", partstat: \"NEEDS-ACTION\", rsvp: true }],\n//   conference: \"https://teams.microsoft.com/l/meetup-join/…\", alarms: [{ action: \"DISPLAY\", trigger: \"-PT15M\" }], … }\n\nconst rsvp = replyEmail(ev!, { address: \"sita@contoso.com\" }, \"ACCEPTED\");\n// { subject: \"Accepted: Sprint review\", to: \"anil@contoso.com\", text, ics,\n//   contentType: \"text/calendar; method=REPLY; charset=UTF-8\", filename: \"invite.ics\" }"
 },
 "triage": {
  "exports": [
   "NOTICE_PATTERNS",
   "SENSITIVE_DEFAULT",
   "describe",
   "registrableDomain",
   "roundups",
   "triage"
  ],
  "usage": "import { triage, roundups } from \"@lacspace/triage\";\n\nconst decisions = triage(candidates, {\n  now: Date.now(),\n  freshnessHours: { default: 48, weather: 12, nepse: 24 },\n  slots: { perHour: { en: 3, ne: 3 }, usedThisHour: { en: 1, ne: 0 } },\n  quotas: { sports: 1 },\n});\n// [{ id, action: \"write_now\" | \"queue\" | \"drop\", priority, reasons, roundup?, independentSources, expiresAt }]\n\nroundups(decisions); // { \"nepse-notices\": [\"bonus-1\", \"right-2\"] }"
 },
 "sensitivity": {
  "exports": [
   "CATEGORIES",
   "classify",
   "describe"
  ],
  "usage": "import { classify } from \"@lacspace/sensitivity\";\n\nclassify({ lang: \"en\", title: \"MP Ansari Highlights Irregularities at National Medical College\", text });\n// { categories: [\"named_individual\"], confidence: \"certain\", hits: [...], scores: {...}, reasons: [] }\n\nclassify({ lang: \"ne\", title: \"राष्ट्रपतिद्वारा संघीय संसदको चालू अधिवेशन अन्त्य\", text });\n// { categories: [], confidence: \"certain\", ... }  → skip the model\n\nclassify({ lang: \"en\", title: \"Supreme Court Orders Strict Enforcement of Plastic Bag Ban\", text });\n// { categories: [\"court\"], confidence: \"unsure\", reasons: [\"court: policy ruling or no case/charge words\"] }  → ask the model"
 },
 "packfix": {
  "exports": [
   "describe",
   "fix",
   "overlap",
   "parseFailure",
   "replaceSentence",
   "sentences",
   "splitSentences"
  ],
  "usage": "import { fix, replaceSentence } from \"@lacspace/packfix\";\n\nconst r = fix(pack, [\n  \"names: names not in sources or gazetteer: Provincial Traffic Police Office, Sagarmatha Sambaad\",\n  \"plagiarism: 8-gram overlap 8.27% (limit 3%)\",\n  \"tone: banned phrases: explosive\",\n], sources);\n\nr.pack;      // explosive knock → aggressive knock; entities cleaned\nr.fixed;     // ['names: \"Provincial Traffic Police Office\" is a descriptive phrase, not a name', 'tone: \"explosive\" replaced 1×', …]\nr.remaining; // ['names: names not in sources or gazetteer: Sagarmatha Sambaad', 'plagiarism: …']\nr.rewrite;   // [{ id: \"body.2.3\", reason: \"names\", text, detail }, { id: \"body.1.0\", reason: \"plagiarism\", … }]\n\n// one small model call per sentence, then put it back\nlet p = r.pack;\nfor (const w of r.rewrite) p = replaceSentence(p, w.id, await rewriteOneSentence(w));"
 },
 "datanews": {
  "exports": [
   "KINDS",
   "describe",
   "formatBigMoney",
   "formatNumber",
   "render",
   "renderBoth",
   "toDevanagari"
  ],
  "usage": "import { render, renderBoth } from \"@lacspace/datanews\";\n\nrender(\"gold_silver\", {\n  gold: { perTola: 294800, prev: 293300 },\n  silver: { perTola: 4425, prev: 4400 },\n}, { lang: \"en\", date: \"2026-10-04\" }).headline;\n// Gold rises Rs 1,500 to Rs 294,800 per tola; silver at Rs 4,425\n\nrender(\"gold_silver\", { gold: { perTola: 294800, prev: 293300 } }, { lang: \"ne\" }).headline;\n// सुनको भाउ तोलामा १,५०० रुपैयाँले बढेर २,९४,८०० रुपैयाँ पुग्यो\n\nconst { en, ne } = renderBoth(\"nepse_close\", {\n  index: 2683, change: -12.4, changePct: -0.46, turnover: 4123456789, volume: 9876543,\n  gainers: [{ symbol: \"SBLD89\", pct: 8.8 }], losers: [{ symbol: \"SINDU\", pct: -8.55 }],\n}, { date: \"2026-10-04\" });\nen.headline; // NEPSE falls 12.4 points to 2,683 as turnover crosses Rs 4 billion\nne.headline; // नेप्से १२.४ अंकले घटेर २,६८३ मा, कारोबार ४ अर्ब नाघ्यो\nen.body;     // [\"The Nepal Stock Exchange (NEPSE) index fell 12.4 points, or 0.46%, to close at 2,683 on 4 October 2026.\", ...]"
 },
 "conductor": {
  "exports": [
   "autoBind",
   "catalogue",
   "catalogueForPrompt",
   "describe",
   "execute",
   "planPrompt",
   "shortName",
   "validate",
   "validatePlan"
  ],
  "usage": "import * as quizpoll from \"@lacspace/quizpoll\";\nimport * as hookwriter from \"@lacspace/hookwriter\";\nimport { catalogue, planPrompt, validatePlan, execute, autoBind } from \"@lacspace/conductor\";\n\nconst cat = catalogue([quizpoll, hookwriter]);           // merge every describe()\nconst prompt = planPrompt(\"Make a quiz and an Instagram caption for this story\", cat, { maxChars: 4000 });\nconst plan = JSON.parse(await llm(prompt));              // your model, any provider\n\nconst errors = validatePlan(plan, cat);                  // unknown commands, missing inputs, bad refs\u2026\nif (errors.length) throw new Error(errors.map((e) => e.message).join(\"; \"));\n\nconst run = await execute(plan, {\n  catalogue: cat,\n  handlers: { ...autoBind(quizpoll, quizpoll.describe()), ...autoBind(hookwriter, hookwriter.describe()) },\n  timeoutMs: 10_000,\n  budgetMs: 60_000,\n});\nrun.outputs; // { \"<step id>\": output, \u2026 }"
 },
 "quizpoll": {
  "exports": [
   "describe",
   "numberDistractors",
   "quizpoll",
   "typedEntities"
  ],
  "usage": "import { quizpoll } from \"@lacspace/quizpoll\";\n\nconst q = quizpoll(articleText, { maxQuiz: 4, maxPolls: 2, seed: 42 });\nq.quiz[0]\n// { kind: \"number\", question: \"खाली ठाउँ भर्नुहोस्: बैंकहरूले कर्जामा लिने ब्याजदर ____ माथि लैजान पाउने छैनन्\",\n//   options: [{ text: \"१३ प्रतिशत\" }, { text: \"१२ प्रतिशत\", correct: true }, { text: \"११ प्रतिशत\" }, { text: \"१४ प्रतिशत\" }],\n//   answerIndex: 1, explanation: \"उत्तर: १२ प्रतिशत\", source: \"…\",\n//   fits: { \"instagram-poll\": false, \"instagram-quiz\": true, youtube: true, x: true, facebook: true, telegram: true } }\nq.polls        // opinion polls from safe templates (no claims): \"यसबारे तपाईंको धारणा के छ?\" राम्रो निर्णय / गलत निर्णय / थाहा छैन\nq.didYouKnow   // \"थाहा छ? …\" cards from the figure sentences"
 },
 "commentguard": {
  "exports": [
   "LEXICONS",
   "PATTERNS",
   "check",
   "describe",
   "moderate"
  ],
  "usage": "import { moderate } from \"@lacspace/commentguard\";\n\nmoderate(\"Join telegram group bit.ly/x, subscribe my channel\").action;   // \"hide\" (link-spam)\nmoderate(\"his number is 9812345678 call him\").categories.doxxing;         // > 0.6, pii.phones\nmoderate(\"great report, thank you!\").action;                              // \"allow\"\n\nmoderate(\"where can I read the full story?\", {\n  faqs: [{ match: [\"where\", \"kaha\", \"कहाँ\"], reply: { en: \"Link in bio.\", ne: \"बायोको लिंकमा।\" } }],\n  lang: \"en\",\n}).suggestedReply;  // \"Link in bio.\"  (suggested only for clean comments)"
 },
 "extractive": {
  "exports": [
   "AMBIGUOUS_OUTLETS",
   "NE_CASE",
   "OUTLETS",
   "ROMAN_CASE",
   "brief",
   "describe",
   "headlineCandidates",
   "keyFacts",
   "mentionsOutlet",
   "scrubSources",
   "splitSentences",
   "summarize",
   "textrank",
   "tokenize"
  ],
  "usage": "import { brief, summarize, keyFacts } from \"@lacspace/extractive\";\n\nconst b = brief(longArticle);\n// → {\n//   summary: \"…3–4 central sentences…\",\n//   headlineCandidates: [\"…\", \"…\"],\n//   keyphrases: [\"policy rate\", \"inflation\", …],\n//   hashtags: [\"#policyrate\", …],\n//   keyFacts: { numbers, amounts, percentages, dates, entities },\n//   sentenceCount: 18\n// }\n// Feed `b` to your writer instead of the full text — same facts, tiny prompt.\n\nsummarize(article, { maxSentences: 3 }).summary;   // extractive summary\nkeyFacts(article).percentages;                      // the hard figures to preserve"
 }
};
