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
    status: "soon",
    summary:
      "Track any URL, selector or JSON path on a schedule and get notified when it changes — price drops, new listings, status flips, content edits. Built on the scraper engine.",
    features: [
      { icon: "👀", title: "Watch anything", desc: "A page, a CSS selector, a JSON API field or an RSS feed." },
      { icon: "📈", title: "Change detection", desc: "Diff snapshots over time and surface exactly what moved." },
      { icon: "🔔", title: "Alerts", desc: "Webhook, email or a callback when a watch trips." },
    ],
    examples: [],
    useCases: ["Price + stock monitoring", "New-listing alerts", "Uptime / status watching", "Content-change tracking"],
    keywords: ["monitor", "change-detection", "watcher", "alerts"],
  },
  {
    slug: "enrich",
    name: "lacspace-enrich",
    tagline: "Turn a name or domain into a full contact + company profile.",
    icon: "🧬",
    grad: "#34D399,#2DD4BF",
    status: "soon",
    summary:
      "Given a business name, website or email, enrich it with socials, tech stack, addresses and public company data — from open sources, no paid API.",
    features: [
      { icon: "🏢", title: "Company data", desc: "Descriptions, locations and links from public sources." },
      { icon: "📇", title: "Contact enrichment", desc: "Emails, phones and social profiles from a domain." },
      { icon: "🧱", title: "Tech + signals", desc: "Best-effort tech-stack and platform detection." },
    ],
    examples: [],
    useCases: ["Enrich a lead list", "Qualify inbound sign-ups", "Build a company dataset"],
    keywords: ["enrichment", "company-data", "contact-enrichment"],
  },
  {
    slug: "extract",
    name: "lacspace-extract",
    tagline: "Pull tables and structured data out of PDFs and documents.",
    icon: "📄",
    grad: "#60A5FA,#6366F1",
    status: "soon",
    summary:
      "Extract tables, text and fields from PDFs, spreadsheets and documents into clean JSON/CSV/Excel — the same export pipeline as the rest of the toolkit.",
    features: [
      { icon: "📊", title: "Tables", desc: "Detect and lift tabular data into rows." },
      { icon: "🔤", title: "Text + fields", desc: "Structured text and key/value extraction." },
      { icon: "🔄", title: "Any format out", desc: "JSON, NDJSON, CSV or Excel." },
    ],
    examples: [],
    useCases: ["Invoice + statement data", "Report tables → spreadsheets", "Document datasets"],
    keywords: ["pdf", "table-extraction", "documents"],
  },
];

export const TOOLS_LIVE = TOOLS.filter((t) => t.status === "live");
export const TOOLS_SOON = TOOLS.filter((t) => t.status === "soon");

export function getTool(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
