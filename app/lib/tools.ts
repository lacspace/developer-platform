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
];

export const TOOLS_LIVE = TOOLS.filter((t) => t.status === "live");
export const TOOLS_SOON = TOOLS.filter((t) => t.status === "soon");

export function getTool(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
