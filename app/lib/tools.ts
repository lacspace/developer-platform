/**
 * The Lacspace developer TOOLS catalog — standalone CLIs/libraries (distinct
 * from the @lacspace package library). Data-driven so /tools and /tools/[slug]
 * render from one source, and future tools slot in by adding an entry.
 */

export interface ToolExample {
  label: string;
  code: string;
  note?: string;
}
export interface ToolFeature {
  icon: string;
  title: string;
  desc: string;
}
export interface ToolLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface Tool {
  slug: string;
  /** npm package / command name. */
  name: string;
  tagline: string;
  icon: string;
  /** CSS gradient `from,to`. */
  grad: string;
  status: "live" | "soon";
  version?: string;
  /** One-paragraph summary. */
  summary: string;
  /** Longer "what it does" copy for the detail page. */
  about?: string;
  install?: string;
  quickstart?: string;
  /** Path to an in-browser live tester, when the tool has one. */
  tryHref?: string;
  /** True when the tool can't be a hosted live runner (needs a local browser). */
  localOnly?: boolean;
  /** Why it's local-only + how to run it (shown as a callout). */
  localNote?: string;
  features: ToolFeature[];
  examples: ToolExample[];
  useCases: string[];
  links?: ToolLink[];
  keywords?: string[];
}

export const TOOLS: Tool[] = [
  {
    slug: "leads",
    name: "lacspace-leads",
    tagline: "Find local-business leads from Google Maps — free, no API keys.",
    icon: "📍",
    grad: "#2DD4BF,#3B82F6",
    status: "live",
    version: "1.5.0",
    summary:
      "Name a city, area and business type — it drives a real browser over Google Maps and collects each listing's name, phone, website, rating, address, email and social links, then exports to JSON, NDJSON, CSV or Excel. No paid Places API.",
    about:
      "lacspace-leads is a complete, keyless lead-generation tool. It sweeps whole cities neighbourhood-by-neighbourhood, verifies emails by MX lookup, normalises phones to E.164, and de-duplicates as it accumulates a master list across runs — everything a real prospecting workflow needs, from the terminal or as a typed library.",
    install: "npx lacspace-leads restaurants --city Kathmandu --area Baneshwor -f xlsx",
    quickstart: "npm i lacspace-leads",
    localOnly: true,
    localNote:
      "lacspace-leads drives a real browser over Google Maps, so it runs on your machine — not as a hosted button here (that would break Google's Terms and can't run in a serverless function). It's one command to try locally, no setup.",
    features: [
      { icon: "🏙️", title: "City sweep", desc: "Comma-separate areas/types and it runs each search, then merges and de-duplicates into one list." },
      { icon: "📮", title: "Verified emails", desc: "Visit each website to find an email, then MX-verify the domain — keep only deliverable contacts." },
      { icon: "🔗", title: "8 social networks", desc: "Facebook, Instagram, WhatsApp, LinkedIn, X, YouTube, TikTok and Telegram from the business site." },
      { icon: "📞", title: "E.164 phones", desc: "Normalise every phone to +CC… with one flag — CRM-ready out of the box." },
      { icon: "🧭", title: "Radius search", desc: "Centre on a coordinate and keep only what's within range, sorted nearest-first." },
      { icon: "📚", title: "Master list", desc: "--append merges each run into your file and de-duplicates, so daily runs build one clean database." },
      { icon: "🗂️", title: "Saved campaigns", desc: "Describe repeatable searches + shared options in one --config JSON file; run them on a schedule." },
      { icon: "🎛️", title: "Deep controls", desc: "Presets, filters (incl. has-contact / name-exclude), sort, proxy, retries, jitter, concurrency and callbacks." },
      { icon: "🔄", title: "Any format", desc: "JSON, NDJSON, CSV or Excel — plus a built-in converter between all four, both ways." },
    ],
    examples: [
      { label: "Sweep a whole city, best-reviewed first", code: `npx lacspace-leads cafes --city Kathmandu \\\n  --area "Thamel,Baneshwor,Patan" \\\n  --country NP --sort reviews --desc -f xlsx`, note: "Runs three searches, merges + de-duplicates, normalises phones to +977…, sorts by reviews." },
      { label: "Outreach list, deliverable emails only", code: `npx lacspace-leads "dental clinic" --city Pokhara \\\n  --preset outreach --verify-emails --has-valid-email -f csv`, note: "Keeps only leads whose email passed an MX check." },
      { label: "Everything within 1.5 km of a point", code: `npx lacspace-leads salons \\\n  --near "27.7172,85.3240" --radius 1.5km -f csv`, note: "Adds a distanceKm column, sorted nearest-first." },
      { label: "Run a saved campaign", code: `# campaign.json → { "searches":[…], "country":"NP",\n#   "verifyEmails":true, "out":"master.xlsx", "append":true }\nnpx lacspace-leads --config campaign.json`, note: "Repeatable multi-search runs — pair with cron or CI for weekly sweeps." },
      { label: "Use it as a library", code: `import { searchLeads, serialize } from "lacspace-leads";\n\nconst leads = await searchLeads({\n  city: "Kathmandu", type: "restaurants", limit: 40,\n  enrich: true, country: "NP", headless: true,\n});\nconst { data } = serialize(leads, "csv");` },
    ],
    useCases: [
      "Build a prospect list for cold outreach or field sales",
      "Map every business of a type across a city",
      "Enrich an existing list with phones, emails and socials",
      "Keep a living, de-duplicated master database updated daily",
    ],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-leads", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-leads", external: true },
    ],
    keywords: ["leads", "lead-generation", "google-maps", "prospecting", "b2b", "email-finder", "scraper"],
  },
  {
    slug: "scraper",
    name: "lacspace-scraper",
    tagline: "Scrape structured data from any website — CSS selectors or auto-detect.",
    icon: "🕸️",
    grad: "#8B5CF6,#EC4899",
    status: "live",
    version: "0.1.0",
    summary:
      "Point it at any page or a list of sources and pull structured data — by CSS selectors or automatic detection (metadata, headings, links, images, emails, phones, tables, JSON-LD, OpenGraph). Crawl whole sites, render JS-heavy pages in a real browser, and export to JSON, NDJSON, CSV or Excel. Robots-aware.",
    about:
      "lacspace-scraper ships its own zero-dependency HTML parser and CSS-selector engine, so a fast static engine handles most sites with no browser at all — and an optional real-browser mode renders JavaScript apps when you need it. Extract exactly the fields you want with a selector schema, turn repeating cards into one record each, or let the auto-detectors grab everything a page exposes.",
    install: "npx lacspace-scraper https://example.com --auto -f json",
    quickstart: "npm i lacspace-scraper",
    tryHref: "/tools/scraper/try",
    features: [
      { icon: "🎯", title: "Selector schema", desc: "Map fields to CSS selectors (text, @attributes, inner HTML, or all matches as an array)." },
      { icon: "🧩", title: "Repeating items", desc: "--item \".card\" yields one record per element — product grids, list rows, search results." },
      { icon: "🔍", title: "Auto-detect", desc: "Metadata, headings, links, images, emails, phones, tables, JSON-LD, OpenGraph, feeds and readable text." },
      { icon: "🌐", title: "Static or browser", desc: "A fast zero-dependency engine by default; a real browser (--browser) for JavaScript-rendered sites." },
      { icon: "🗺️", title: "Crawl a site", desc: "Follow links breadth-first with depth/page limits, seed from a sitemap, stay same-origin." },
      { icon: "🤖", title: "Polite by default", desc: "Respects robots.txt, with delay, jitter, retries, concurrency and a custom User-Agent." },
      { icon: "🧰", title: "Parser included", desc: "The HTML parser + CSS-selector engine are exported — use them on any HTML string, no network." },
      { icon: "🔄", title: "Any format", desc: "JSON, NDJSON, CSV or Excel, plus a built-in converter between all four." },
    ],
    examples: [
      { label: "Grab everything a page exposes", code: `npx lacspace-scraper https://example.com --auto -f json`, note: "Title, meta, headings, links, images, OpenGraph, JSON-LD…" },
      { label: "Scrape a product grid to Excel", code: `npx lacspace-scraper https://shop.site \\\n  --item ".product-card" \\\n  --field "name=h3" --field "price=.price" --field "url=a@href" -f xlsx`, note: "One row per product card." },
      { label: "Crawl a docs site, keep text", code: `npx lacspace-scraper crawl https://docs.site \\\n  --depth 2 --limit 40 --auto metadata,text -f ndjson`, note: "BFS crawl, robots-aware, metadata + readable text per page." },
      { label: "Use the parser directly", code: `import { parseHTML, applySchemaItems } from "lacspace-scraper";\n\nconst root = parseHTML(html);\nconst rows = applySchemaItems(root, ".product",\n  { name: "h3", price: ".price", url: { selector: "a", attr: "@href" } });` },
    ],
    useCases: [
      "Turn any website's listings into a spreadsheet",
      "Monitor prices, jobs, listings or catalog changes",
      "Build a dataset from a site's sitemap",
      "Extract metadata, tables or JSON-LD at scale",
    ],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-scraper", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-scraper", external: true },
    ],
    keywords: ["scraper", "web-scraping", "crawler", "css-selector", "html-parser", "data-extraction"],
  },
  {
    slug: "monitor",
    name: "lacspace-monitor",
    tagline: "Watch pages, APIs and feeds for changes — alert when something moves.",
    icon: "🔔",
    grad: "#FBBF24,#FB7185",
    status: "live",
    version: "0.1.0",
    summary:
      "Watch any web page, CSS selector, JSON API field or RSS/Atom feed and get told when something moves — a price drop, a new listing, a status flip, a fresh post. Snapshots + diffs on a schedule, webhook alerts, export to JSON/CSV/Excel. Built on the scraper engine.",
    about:
      "The first run captures a baseline; every run after reports exactly what changed. Snapshots live in a small state file, so you can run it from cron or CI and it just works — or use --interval to keep it running. Watch a selector's text, a JSON path, or a feed's new items, and POST changes to a webhook.",
    install: "npx lacspace-monitor https://example.com --selector \".price\" --interval 5m",
    quickstart: "npm i lacspace-monitor",
    features: [
      { icon: "👀", title: "Watch anything", desc: "A page, a CSS selector's text/attribute, a JSON API field, or an RSS/Atom/JSON feed." },
      { icon: "📈", title: "Real diffs", desc: "Snapshots compared over time — you see the exact before → after, or the new feed items." },
      { icon: "🔔", title: "Webhook alerts", desc: "POST changes to any webhook, or handle them in code with the library." },
      { icon: "⏱️", title: "Schedule or loop", desc: "Run once from cron/CI (stateful), or keep running with --interval 30s/5m/1h." },
      { icon: "🗂️", title: "Config files", desc: "Define many watches in one JSON file with a shared webhook and state." },
      { icon: "🔄", title: "Export", desc: "Write results to JSON, NDJSON, CSV or Excel." },
    ],
    examples: [
      { label: "Watch a price, check every 10 minutes", code: `npx lacspace-monitor https://shop.site/product \\\n  --selector ".price" --interval 10m \\\n  --webhook https://hooks.mysite.com/price`, note: "Baseline now; later runs report before → after and POST the change." },
      { label: "Watch a JSON API field", code: `npx lacspace-monitor https://api.site/status --json data.status --interval 1m`, note: "Dot/bracket paths: data.items[0].price" },
      { label: "New items in a feed", code: `npx lacspace-monitor https://blog.site/rss.xml --feed --label "Blog posts"`, note: "Reports the new item ids/links since last check." },
      { label: "Use it as a library", code: `import { runChecks, loadState, saveState } from "lacspace-monitor";\n\nconst state = loadState(".lacspace-monitor.json");\nconst { results, state: next } = await runChecks(\n  [{ url: "https://example.com", selector: "h1", label: "Title" }], state);\nsaveState(".lacspace-monitor.json", next);` },
    ],
    useCases: ["Price + stock monitoring", "New-listing / new-post alerts", "API status & uptime watching", "Content-change tracking"],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-monitor", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-monitor", external: true },
    ],
    keywords: ["monitor", "change-detection", "watcher", "website-monitor", "price-monitor", "rss", "webhook"],
  },
  {
    slug: "enrich",
    name: "lacspace-enrich",
    tagline: "Turn a domain, URL or email into a full company + contact profile.",
    icon: "🧬",
    grad: "#34D399,#2DD4BF",
    status: "live",
    version: "0.1.0",
    summary:
      "Give it a domain, URL or email and it builds a profile from open sources — name, description, logo, emails, phones, socials, address and tech stack — no paid API. Batch a whole list and export to JSON/CSV/Excel. Built on the scraper engine.",
    about:
      "lacspace-enrich reads a company's public pages (and schema.org JSON-LD) to assemble a clean profile: who they are, how to reach them, and what they're built on. It reads Organization/LocalBusiness structured data heavily, falls back to the page, and checks /contact & /about for extra emails — then flattens everything into CRM-ready columns.",
    install: "npx lacspace-enrich acme.com",
    quickstart: "npm i lacspace-enrich",
    features: [
      { icon: "🏢", title: "Company profile", desc: "Name, description and logo from OpenGraph, JSON-LD or a cleaned page title." },
      { icon: "📇", title: "Contacts", desc: "Emails and phones from the home page plus /contact and /about." },
      { icon: "🔗", title: "8 socials", desc: "Facebook, Instagram, WhatsApp, LinkedIn, X, YouTube, TikTok, Telegram." },
      { icon: "📍", title: "Address", desc: "From schema.org PostalAddress when the site publishes it." },
      { icon: "🧱", title: "Tech stack", desc: "Detects WordPress, Shopify, Wix, Next.js, Cloudflare, GA and more." },
      { icon: "📚", title: "Batch + export", desc: "Enrich a list of domains in parallel; CSV/Excel flattens socials into columns." },
    ],
    examples: [
      { label: "Enrich one company", code: `npx lacspace-enrich stripe.com`, note: "→ name, description, logo, emails, phones, socials, address, tech." },
      { label: "From an email, to CSV", code: `npx lacspace-enrich jane@acme.com -f csv`, note: "The email's domain is profiled." },
      { label: "A whole list into a spreadsheet", code: `npx lacspace-enrich --input domains.txt -f xlsx -o companies.xlsx`, note: "Each social network becomes its own column." },
      { label: "Use it as a library", code: `import { enrichDomain } from "lacspace-enrich";\nconst profile = await enrichDomain("acme.com");\n// { name, description, logo, emails, phones, socials, address, tech }` },
    ],
    useCases: ["Enrich a lead or CRM list", "Qualify inbound sign-ups by domain", "Build a company dataset", "Pair with lacspace-leads for full records"],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-enrich", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-enrich", external: true },
    ],
    keywords: ["enrichment", "company-data", "contact-enrichment", "lead-enrichment", "tech-stack"],
  },
  {
    slug: "extract",
    name: "lacspace-extract",
    tagline: "Pull text and tables out of PDFs, HTML pages and spreadsheets.",
    icon: "📄",
    grad: "#60A5FA,#6366F1",
    status: "live",
    version: "0.1.0",
    summary:
      "Pull text and tables out of PDFs, HTML pages and spreadsheets into clean JSON, NDJSON, CSV or Excel. A zero-dependency PDF text engine (no OCR needed for text PDFs), HTML <table> extraction, and CSV/Excel reading. No API keys.",
    about:
      "lacspace-extract ships its own zero-dependency PDF text engine — it inflates FlateDecode content streams and parses the text operators, so ordinary text-based PDFs turn straight into text (and best-effort tables). HTML <table>s become header-keyed rows, and spreadsheets/CSV convert between formats — all through the same export pipeline as the rest of the toolkit. Note: scanned/image PDFs need OCR and aren't supported.",
    install: "npx lacspace-extract report.pdf",
    quickstart: "npm i lacspace-extract",
    features: [
      { icon: "📄", title: "PDF text", desc: "Zero-dependency engine: inflates FlateDecode + parses text operators. No OCR." },
      { icon: "📊", title: "Tables", desc: "Every HTML <table> → rows; PDF/text column-aligned tables best-effort." },
      { icon: "🧾", title: "Spreadsheets", desc: "Read CSV/TSV/Excel/JSON/NDJSON and convert between them." },
      { icon: "🔄", title: "Any format out", desc: "JSON, NDJSON, CSV, Excel or plain text." },
      { icon: "🧰", title: "Engines exported", desc: "extractPdfText, htmlTables and lineTables are yours to call directly." },
      { icon: "🪶", title: "Tiny + honest", desc: "No native deps; clear about scanned/image PDFs needing OCR." },
    ],
    examples: [
      { label: "PDF → text", code: `npx lacspace-extract report.pdf            # print the text\nnpx lacspace-extract report.pdf -o report.txt`, note: "Text-based PDFs (FlateDecode). Scanned PDFs need OCR — not supported." },
      { label: "PDF statement → table as Excel", code: `npx lacspace-extract statement.pdf --tables -f xlsx -o statement.xlsx`, note: "Best-effort, column-aligned tables." },
      { label: "HTML table → CSV", code: `npx lacspace-extract prices.html -f csv -o prices.csv`, note: "Every <table> becomes header-keyed rows." },
      { label: "Use it as a library", code: `import { extractFile, extractPdfText } from "lacspace-extract";\nconst { text, pageCount } = await extractFile("report.pdf");\nconst { tables } = await extractFile("page.html");` },
    ],
    useCases: ["Invoice & statement data", "Report tables → spreadsheets", "Scrape then extract linked PDFs", "Convert documents to datasets"],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-extract", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-extract", external: true },
    ],
    keywords: ["pdf", "pdf-text", "table-extraction", "documents", "html-tables", "data-extraction"],
  },
  {
    slug: "inspect",
    name: "lacspace-inspect",
    tagline: "Audit any website — SEO, meta, social, security and more, graded A–F.",
    icon: "🔬",
    grad: "#38BDF8,#4d9fff",
    status: "live",
    version: "0.1.0",
    summary:
      "Point it at a URL and get a graded audit across eight categories — SEO & meta, Open Graph, structured data, content & accessibility, links, static performance, security headers and crawlability — with an overall A–F grade and a --min-grade gate that fails your CI below the bar. No API keys. Built on the scraper engine.",
    about:
      "lacspace-inspect fetches a page, parses it with the scraper engine, and runs opinionated checks in each category, rolling every finding up into a letter grade. Run it by hand for a quick read, add --links for a bounded broken-link scan, or wire --min-grade into CI so a regression in metadata, structured data or security headers fails the build. Note: performance checks are static-HTML heuristics, not a runtime Lighthouse audit, and it reads server-rendered HTML.",
    install: "npx lacspace-inspect example.com",
    quickstart: "npm i lacspace-inspect",
    features: [
      { icon: "🔎", title: "8 graded categories", desc: "SEO/meta, social/OG, structured data, content + a11y, links, static perf, security headers, crawlability." },
      { icon: "🅰️", title: "One A–F grade", desc: "Every finding is scored and rolled up into a category grade and an overall grade." },
      { icon: "🚦", title: "CI gate", desc: "--min-grade B exits non-zero below the bar — fail the build on an SEO or security regression." },
      { icon: "🔗", title: "Broken-link scan", desc: "--links checks each link's status with a bounded, polite pool and grades redirects and 404s." },
      { icon: "🧱", title: "Tech sniff", desc: "Informational detection of the frameworks and services the page is built on." },
      { icon: "🧾", title: "JSON or terminal", desc: "A clean sectioned report by default, or --json for machine output." },
    ],
    examples: [
      { label: "Audit a site", code: `npx lacspace-inspect example.com`, note: "Sectioned report across every category + an overall grade." },
      { label: "Verbose + live link check", code: `npx lacspace-inspect https://example.com --links --verbose`, note: "Also grades broken and redirected links." },
      { label: "Fail CI below grade B", code: `npx lacspace-inspect https://example.com --min-grade B`, note: "Exit non-zero when the grade drops — drop it into a CI step." },
      { label: "Use it as a library", code: `import { inspectUrl, analyzeHtml } from "lacspace-inspect";\nconst report = await inspectUrl("example.com");\n// analyzeHtml(html, { url }) runs the same checks with no network` },
    ],
    useCases: ["Pre-launch SEO & accessibility checks", "Guard metadata and security in CI", "Audit a list of pages", "Catch missing OG/JSON-LD before sharing a link"],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-inspect", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-inspect", external: true },
    ],
    keywords: ["seo", "website-audit", "lighthouse-alternative", "accessibility", "open-graph", "security-headers", "ci"],
  },
  {
    slug: "sql",
    name: "lacspace-sql",
    tagline: "Run SQL over your CSV, JSON, NDJSON and Excel files — no database.",
    icon: "🗃️",
    grad: "#4d9fff,#6366F1",
    status: "live",
    version: "0.1.0",
    summary:
      "Query data files with real SQL — SELECT, WHERE, ORDER BY, GROUP BY and COUNT/SUM/AVG/MIN/MAX — straight over CSV, JSON, NDJSON or Excel, with no database to set up and no API keys. Print an aligned table or export the result to any format in one step.",
    about:
      "lacspace-sql loads a file into memory and runs a genuine SQL engine over it — a tokenizer, parser and evaluator, not a regex. Filter with the full WHERE vocabulary (comparisons, LIKE, IN, IS NULL, AND/OR/NOT and parentheses), group and aggregate, order and paginate, then print a table or serialise the rows to JSON/NDJSON/CSV/Excel. It reuses the scraper's file I/O, so the same query works across every format. v0.1.0 is single-table and read-only (no JOIN or writes yet).",
    install: `npx lacspace-sql "SELECT * FROM ./data.csv LIMIT 5"`,
    quickstart: "npm i lacspace-sql",
    features: [
      { icon: "🗃️", title: "Any data file", desc: "CSV, JSON, NDJSON or Excel — name the file right in the FROM clause." },
      { icon: "🧮", title: "Real SQL", desc: "SELECT, DISTINCT, WHERE (=, !=, <, LIKE, IN, IS NULL, AND/OR/NOT, parens), ORDER BY, LIMIT/OFFSET." },
      { icon: "📊", title: "Group & aggregate", desc: "GROUP BY with COUNT/SUM/AVG/MIN/MAX (and COUNT(DISTINCT)) plus HAVING." },
      { icon: "🔢", title: "Smart typing", desc: "Numeric strings compare numerically; columns match case-insensitively." },
      { icon: "🔄", title: "Query → convert", desc: "Pretty table by default, or -f json|ndjson|csv to export the result in one step." },
      { icon: "🧰", title: "Typed library", desc: "query() / runQuery() plus parseSql() for the AST — build on the engine." },
    ],
    examples: [
      { label: "Filter + sort a CSV", code: `lacspace-sql "SELECT name, city FROM ./leads.csv \\\n  WHERE city LIKE 'K%' ORDER BY name"`, note: "The full WHERE vocabulary over a plain file." },
      { label: "Group & aggregate", code: `lacspace-sql "SELECT city, COUNT(*) AS n, AVG(revenue) AS avg \\\n  FROM ./leads.csv GROUP BY city ORDER BY n DESC"` },
      { label: "Query one format, export another", code: `lacspace-sql "SELECT name,email FROM contacts.json \\\n  WHERE email IS NOT NULL" -f csv -o contacts.csv`, note: "Reads JSON, writes CSV." },
      { label: "Use it as a library", code: `import { query, runQuery } from "lacspace-sql";\nconst rows = await query("SELECT * FROM ./data.csv WHERE age >= 30");\n// or runQuery(sql, alreadyLoadedRows) — pure, no file I/O` },
    ],
    useCases: ["Explore a scraped or leads export", "Filter + reshape a CSV without a spreadsheet", "Aggregate data inside a shell script or CI", "Convert a file while you query it"],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-sql", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-sql", external: true },
    ],
    keywords: ["sql", "csv", "query", "json", "ndjson", "excel", "data"],
  },
  {
    slug: "cron",
    name: "lacspace-cron",
    tagline: "Explain, validate and preview cron expressions — in any timezone.",
    icon: "⏰",
    grad: "#F59E0B,#FBBF24",
    status: "live",
    version: "0.1.0",
    summary:
      "Turn a cron expression into plain English, validate it with field-specific errors, and preview the next N run times in any IANA timezone. 5- and 6-field cron, names and macros, zero dependencies.",
    about:
      "lacspace-cron parses standard 5-field cron (and optional 6-field with seconds), explains it in a readable sentence, and computes the next runs using the built-in Intl API — so timezones, half-hour offsets and DST are handled correctly with no dependencies. Great for double-checking a schedule before you ship it, or as a typed library inside your own scheduler. Advanced L/W/# modifiers aren't supported yet (they error clearly).",
    install: `npx lacspace-cron "0 9 * * 1-5"`,
    quickstart: "npm i lacspace-cron",
    features: [
      { icon: "🗣️", title: "Plain English", desc: "\"0 9 * * 1-5\" → \"At 09:00, Monday through Friday.\"" },
      { icon: "✅", title: "Real validation", desc: "Field-specific errors (out of range, bad token) instead of a silently wrong schedule." },
      { icon: "⏰", title: "Next N runs", desc: "Preview the upcoming run times from now or any --from date." },
      { icon: "🌍", title: "Timezone-aware", desc: "Compute runs in any IANA zone via Intl — DST and odd offsets included." },
      { icon: "🧩", title: "Names & macros", desc: "JAN–DEC, SUN–SAT, and @daily / @hourly / @weekly / @monthly / @yearly." },
      { icon: "🧰", title: "Typed library", desc: "parseCron, explainCron, nextRuns, isValidCron and matchesCron." },
    ],
    examples: [
      { label: "Explain + preview", code: `lacspace-cron "0 9 * * 1-5"`, note: "Prints the description and the next 5 runs." },
      { label: "Every 15 minutes, 4 runs", code: `lacspace-cron "*/15 * * * *" --next 4` },
      { label: "In a specific timezone", code: `lacspace-cron "0 0 1 * *" --tz America/New_York`, note: "Next monthly run in that zone." },
      { label: "Use it as a library", code: `import { explainCron, nextRuns } from "lacspace-cron";\nexplainCron("@daily"); // "At 00:00, every day."\nnextRuns("0 9 * * 1-5", { tz: "Asia/Kathmandu", count: 3 });` },
    ],
    useCases: ["Sanity-check a crontab before deploy", "Show the next run time in a dashboard", "Validate user-entered schedules", "Drive your own job scheduler"],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-cron", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-cron", external: true },
    ],
    keywords: ["cron", "crontab", "scheduler", "cron-parser", "timezone", "next-run"],
  },
  {
    slug: "dotenv",
    name: "lacspace-dotenv",
    tagline: "Lint, diff, sync and type your .env files — and catch committed secrets.",
    icon: "🔑",
    grad: "#34D399,#10B981",
    status: "live",
    version: "0.1.0",
    summary:
      "Keep your .env files honest — lint for duplicates, spacing and naming slips, diff and sync against .env.example, generate a typed env accessor, and scan for committed secrets (AWS, JWT, Slack, GitHub, private keys). Zero dependencies. A dev CLI, distinct from the runtime validator @lacspace/env.",
    about:
      "lacspace-dotenv is a dev CLI for your .env files. Its robust zero-dependency parser handles quotes, export, comments and multiline values, then powers five commands: lint (catch mistakes and masked secrets), diff/sync (keep .env and .env.example aligned, writing placeholders only), types (generate a typed Env accessor), and check (a CI gate that fails when process.env is missing keys from your example). Secret detection is heuristic — it flags patterns and always masks the value.",
    install: "npx lacspace-dotenv lint .env",
    quickstart: "npm i lacspace-dotenv",
    features: [
      { icon: "🔑", title: "Robust parser", desc: "Quotes, export, comments, empty values, = in values, multiline — zero deps." },
      { icon: "🧹", title: "Lint", desc: "Duplicate keys, spacing around =, non-UPPER_SNAKE names, empty values, trailing whitespace." },
      { icon: "🕵️", title: "Secret scanner", desc: "Flags AWS, JWT, Slack, GitHub and PEM keys committed to a .env — always masked." },
      { icon: "🔁", title: "Diff & sync", desc: ".env vs .env.example both ways; --write appends missing keys as placeholders only." },
      { icon: "🏷️", title: "Typed accessor", desc: "Generate an interface Env + a fail-fast reader from your keys." },
      { icon: "🚦", title: "CI gate", desc: "check fails the build when process.env is missing an example key." },
    ],
    examples: [
      { label: "Lint your .env", code: `npx lacspace-dotenv lint .env`, note: "Mistakes plus any committed secrets (masked)." },
      { label: "Diff against the example", code: `npx lacspace-dotenv diff .env .env.example` },
      { label: "Sync missing keys (placeholders)", code: `npx lacspace-dotenv sync .env .env.example --write`, note: "Only writes placeholder values, never real ones." },
      { label: "Generate a typed env module", code: `npx lacspace-dotenv types .env.example -o src/env.ts`, note: "interface Env + a fail-fast accessor." },
    ],
    useCases: ["Catch a secret before it's committed", "Keep .env.example in sync on a team", "Type-safe environment access", "Gate deploys on required env in CI"],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-dotenv", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-dotenv", external: true },
    ],
    keywords: ["dotenv", "env", "secrets", "env-lint", "dotenv-linter", "typed-env"],
  },
  {
    slug: "webhook",
    name: "lacspace-webhook",
    tagline: "Receive, inspect, verify and replay webhooks — locally.",
    icon: "🪝",
    grad: "#A855F7,#8B5CF6",
    status: "live",
    version: "0.1.0",
    summary:
      "A local webhook receiver, inspector and replayer — capture incoming webhooks on any method/path, pretty-print JSON/form/text bodies, verify GitHub/Stripe/HMAC signatures, forward to your local app, save to NDJSON and replay any request. Zero dependencies. Local-only — pair with a tunnel for public delivery.",
    about:
      "lacspace-webhook stands up a tiny HTTP server that accepts anything and shows you exactly what arrived — headers, query and the parsed body. Verify signatures with the right scheme (GitHub sha256, Stripe t=/v1=, or generic HMAC-SHA256, all timing-safe), forward the request to your running app and relay its response, and save every hit to an NDJSON file so you can replay it later — perfect for reproducing a provider's webhook without re-triggering it. It's local-only; put a tunnel (cloudflared/ngrok) in front for public delivery.",
    install: "npx lacspace-webhook listen --port 4000",
    quickstart: "npm i lacspace-webhook",
    features: [
      { icon: "🪝", title: "Catch anything", desc: "Any method/path; JSON, form-urlencoded and text bodies parsed and pretty-printed." },
      { icon: "🔐", title: "Verify signatures", desc: "GitHub, Stripe and generic HMAC-SHA256 — timing-safe, with a clear ok/fail per request." },
      { icon: "➡️", title: "Forward & relay", desc: "--forward proxies the request to your local app and returns its response." },
      { icon: "💾", title: "Save + list", desc: "Append every hit to NDJSON, then list a capture with method, path and size." },
      { icon: "🔁", title: "Replay", desc: "Re-send any captured request to a target — reproduce a webhook on demand." },
      { icon: "🪶", title: "Zero deps", desc: "Just node:http + node:crypto, plus a typed library (createReceiver, verifySignature, replayRequests)." },
    ],
    examples: [
      { label: "Listen and save", code: `npx lacspace-webhook listen --port 4000 --save hooks.ndjson` },
      { label: "Verify Stripe signatures", code: `npx lacspace-webhook listen --secret whsec_… --verify stripe`, note: "Shows verified/failed per request (timing-safe)." },
      { label: "Forward to your app", code: `npx lacspace-webhook listen --forward http://localhost:3000/api/webhook`, note: "Relays your app's response back to the caller." },
      { label: "Replay a capture", code: `npx lacspace-webhook replay hooks.ndjson \\\n  --to http://localhost:3000 --delay 250` },
    ],
    useCases: ["Develop against Stripe/GitHub webhooks locally", "See exactly what a provider sends", "Reproduce a webhook without re-triggering it", "Verify signatures before trusting a payload"],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-webhook", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-webhook", external: true },
    ],
    keywords: ["webhook", "webhook-tester", "http-inspector", "stripe", "github-webhook", "replay", "hmac"],
  },
  {
    slug: "har",
    name: "lacspace-har",
    tagline: "Analyze a browser .har export offline — waterfall, weight and waste.",
    icon: "🚦",
    grad: "#F43F5E,#FB923C",
    status: "live",
    version: "0.1.0",
    summary:
      "Drop in a browser .har export and get an offline performance read — totals, the slowest and largest requests, first- vs third-party and MIME breakdowns, cache and compression wins, and flagged issues. Nothing is uploaded. Zero dependencies.",
    about:
      "lacspace-har parses a HAR 1.2 export and turns it into a readable report: how many requests and bytes, where the time and weight went, how much is third-party, what came from cache, and how much compression saved (or could save). It flags heuristic issues like large uncompressed text, oversized images, too many third parties and missing cache headers. Everything runs locally — the HAR never leaves your machine. Summed phase times aren't wall-clock (requests overlap), and it's only as complete as the HAR your browser wrote.",
    install: "npx lacspace-har session.har",
    quickstart: "npm i lacspace-har",
    features: [
      { icon: "🚦", title: "Totals & timing", desc: "Request count, transfer + content bytes, DOMContentLoaded/load, and aggregated timing phases." },
      { icon: "🐌", title: "Slowest & largest", desc: "The top requests by time and by weight, with status and type." },
      { icon: "🌍", title: "1st vs 3rd party", desc: "Domain breakdown split by first- and third-party origin." },
      { icon: "🗜️", title: "Cache & compression", desc: "Cache hits, redirects, errors, and how many bytes compression saved." },
      { icon: "🚩", title: "Issue flags", desc: "Uncompressed text, oversized images, too many third parties, missing cache headers." },
      { icon: "🔒", title: "Offline & typed", desc: "Nothing uploaded; parseHar / analyzeHar / formatReport exported for your own tooling." },
    ],
    examples: [
      { label: "Analyze a HAR", code: `npx lacspace-har session.har`, note: "Totals, slowest/largest, domain split, wins and issues." },
      { label: "Top 20 by resource type", code: `npx lacspace-har session.har --top 20 --by type` },
      { label: "Break down by status", code: `npx lacspace-har session.har --by status` },
      { label: "JSON for tooling", code: `npx lacspace-har session.har --json -o report.json` },
    ],
    useCases: ["Triage a slow page load offline", "Quantify third-party weight", "Find uncompressed or oversized assets", "Turn a HAR into a shareable report"],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-har", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-har", external: true },
    ],
    keywords: ["har", "performance", "web-performance", "waterfall", "har-analyzer", "devtools"],
  },
  {
    slug: "icon",
    name: "lacspace-icon",
    tagline: "One image → favicon, PWA, Apple-touch, .ico, OG image and manifest.",
    icon: "🖼️",
    grad: "#EC4899,#A855F7",
    status: "live",
    version: "0.1.0",
    summary:
      "Turn one source image into a complete icon set — favicon PNGs, a multi-size .ico, Apple-touch and PWA/maskable icons, an Open Graph image, a web manifest and the paste-ready <head> snippet. A zero-dependency PNG codec does it all locally — no web service, no upload.",
    about:
      "lacspace-icon ships its own zero-dependency PNG codec (decode, area-average resize, encode) plus an .ico assembler, so it generates a full favicon/PWA/Apple-touch set, a manifest and an OG image entirely on your machine — nothing is uploaded to a third-party generator. Point it at a square PNG and it writes every size, the .ico, the manifest and the HTML to paste into <head>. SVG (and emoji) sources need an installed browser to rasterize; without one it falls back to copying the SVG through with a clear note. PNG sources only for raster; square in, square out.",
    install: "npx lacspace-icon logo.png",
    quickstart: "npm i lacspace-icon",
    features: [
      { icon: "🖼️", title: "Full set from one file", desc: "favicon-16/32/48, .ico, apple-touch-180, icon-192/512, maskable and an OG image." },
      { icon: "🪶", title: "Zero-dep PNG codec", desc: "Own decode/encode + area-average resize — no sharp, no native deps, no cloud." },
      { icon: "📑", title: "Manifest + snippet", desc: "Writes manifest.webmanifest and the exact <link>/<meta> tags to paste into <head>." },
      { icon: "🎴", title: "OG image", desc: "--og composites your icon onto a 1200×630 card on your background colour." },
      { icon: "🎭", title: "Maskable", desc: "--maskable renders a safe-zone-padded 512 icon for Android." },
      { icon: "🧰", title: "Typed library", desc: "decodePng, encodePng, resizeRgba, makeIco and generateIcons are all exported." },
    ],
    examples: [
      { label: "Generate the set", code: `npx lacspace-icon logo.png`, note: "Writes the full set into ./icons and prints the <head> snippet." },
      { label: "Full PWA set", code: `npx lacspace-icon logo.png --out public \\\n  --name "Lacspace" --short "Lac" --maskable --og` },
      { label: "Custom colours", code: `npx lacspace-icon logo.png --bg "#ffffff" --theme "#111827"` },
      { label: "Use it as a library", code: `import { generateIcons } from "lacspace-icon";\nconst { files, snippet, manifest } =\n  generateIcons(pngBytes, { name: "My App", maskable: true, og: true });` },
    ],
    useCases: ["Ship a full favicon/PWA set in one command", "Generate icons in CI from a source logo", "Make an OG card without a design tool", "Avoid uploading your brand to an online generator"],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-icon", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-icon", external: true },
    ],
    keywords: ["favicon", "pwa", "icons", "manifest", "apple-touch-icon", "og-image", "png"],
  },
];

export const TOOLS_LIVE = TOOLS.filter((t) => t.status === "live");
export const TOOLS_SOON = TOOLS.filter((t) => t.status === "soon");

export function getTool(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
