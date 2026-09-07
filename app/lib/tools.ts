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
    version: "1.6.0",
    summary:
      "Name a city, area and business type — it drives a real browser over Google Maps and collects each listing's name, phone, website, rating, review count, opening hours, price level, category tags, plus-code and social links, then exports to JSON, NDJSON, CSV or Excel. No paid Places API.",
    about:
      "lacspace-leads is a complete, keyless lead-generation tool. It sweeps whole cities neighbourhood-by-neighbourhood, verifies emails by MX lookup, normalises phones to E.164, and de-duplicates as it accumulates a master list across runs — everything a real prospecting workflow needs, from the terminal or as a typed library. It now captures opening hours, price level, review counts, business status and open-now, filters on all of them, resumes interrupted city sweeps, prints run-summary stats, and can pipe straight into lacspace-enrich.",
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
      { icon: "⏯️", title: "Resumable sweeps", desc: "--resume picks a long multi-area city sweep back up where it stopped — nothing re-scraped." },
      { icon: "🎚️", title: "Rich filters", desc: "--min-rating / --min-reviews / --open-now / --price / --category / --business-status narrow the list on the spot." },
      { icon: "📊", title: "Run summary", desc: "--summary prints per-run stats — totals, with-phone/email, average rating, dedupe hits." },
    ],
    examples: [
      { label: "Open-now + price tier, with stats", code: `npx lacspace-leads bars --city Pokhara \\\n  --open-now --price 2 --summary`, note: "Keeps places open right now at price level $$, then prints run-summary stats." },
      { label: "Resumable city sweep", code: `npx lacspace-leads cafes --city Kathmandu \\\n  --area "Thamel,Patan,Baneshwor" --resume -o sweep.csv`, note: "Interrupt it and re-run — --resume continues from the next area, nothing re-scraped." },
      { label: "Dedupe against a master file", code: `npx lacspace-leads gyms --city Lalitpur \\\n  --dedupe-across master.csv --append -o new.csv`, note: "Drops anything already in master.csv, appends only the genuinely new leads." },
      { label: "Pipe straight into lacspace-enrich", code: `npx lacspace-leads clinics --city Pokhara \\\n  --enrich-out sites.ndjson -o clinics.csv`, note: "Writes an NDJSON of sites ready for `lacspace-enrich --input`." },
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
    keywords: ["leads", "lead-generation", "google-maps", "prospecting", "b2b", "email-finder", "scraper", "open-now", "resume"],
  },
  {
    slug: "scraper",
    name: "lacspace-scraper",
    tagline: "Scrape structured data from any website — CSS selectors or auto-detect.",
    icon: "🕸️",
    grad: "#8B5CF6,#EC4899",
    status: "live",
    version: "0.2.0",
    summary:
      "Point it at any page or a list of sources and pull structured data — by CSS selectors or automatic detection (metadata, headings, links, images, emails, phones, tables, JSON-LD, OpenGraph). Paginate through listings, follow each result into its detail page, clean fields inline, crawl whole sites, render JS-heavy pages in a real browser, and export to JSON, NDJSON, CSV or Excel. Robots-aware.",
    about:
      "lacspace-scraper ships its own zero-dependency HTML parser and CSS-selector engine, so a fast static engine handles most sites with no browser at all — and an optional real-browser mode renders JavaScript apps when you need it. Extract exactly the fields you want with a selector schema, turn repeating cards into one record each, or let the auto-detectors grab everything a page exposes. It now follows pagination automatically, opens each list item's detail page to merge extra fields, transforms values inline (numbers, dates, regex, absolute URLs…), dedupes and limits output, rotates proxies with per-host rate limits, and can screenshot or PDF a page in browser mode.",
    install: "npx lacspace-scraper https://example.com --auto -f json",
    quickstart: "npm i lacspace-scraper",
    tryHref: "/tools/scraper/try",
    features: [
      { icon: "🎯", title: "Selector schema", desc: "Map fields to CSS selectors (text, @attributes, inner HTML, or all matches as an array)." },
      { icon: "🧩", title: "Repeating items", desc: "--item \".card\" yields one record per element — product grids, list rows, search results." },
      { icon: "📑", title: "Pagination", desc: "--paginate \"a.next\" follows the next-page link and accumulates every record, up to --max-pages." },
      { icon: "🔗", title: "Follow detail pages", desc: "--follow opens each result's link and merges fields scraped from the detail page into the record." },
      { icon: "🧪", title: "Field transforms", desc: "Clean inline with a pipe: --field \"price=.price | number\" — trim, date, regex, split, absolute URL and more." },
      { icon: "🔍", title: "Auto-detect", desc: "Metadata, headings, links, images, emails, phones, tables, JSON-LD, OpenGraph, feeds and readable text." },
      { icon: "🌐", title: "Static or browser", desc: "A fast zero-dependency engine by default; a real browser (--browser) with --scroll, --screenshot and --pdf." },
      { icon: "🗺️", title: "Crawl & sitemap", desc: "BFS crawl with depth/page limits, or seed the whole run straight from a sitemap.xml." },
      { icon: "🧹", title: "Dedupe & limit", desc: "--unique <field>, --dedupe and --limit keep the output clean; --header/--cookie/--proxy/--rate control the session." },
      { icon: "🔄", title: "Any format", desc: "JSON, NDJSON, CSV or Excel, plus a feed command for RSS/Atom/JSON Feed." },
    ],
    examples: [
      { label: "Paginate a product grid, clean prices", code: `npx lacspace-scraper https://shop.site/page/1 \\\n  --item ".product" --field "name=h3" --field "price=.price | number" \\\n  --paginate "a.pagination-next" --max-pages 10 -f csv`, note: "Follows every next page; prices come out as real numbers." },
      { label: "List → open each → merge detail fields", code: `npx lacspace-scraper https://jobs.site \\\n  --item ".job" --field "title=h2" --field "link=a@href" \\\n  --follow link --detail-field "salary=.salary" --unique link -f xlsx`, note: "Visits each job's page and merges its salary." },
      { label: "Scrape straight from a sitemap", code: `npx lacspace-scraper --sitemap https://blog.site/sitemap.xml \\\n  --auto metadata --dedupe --limit 100 -f ndjson`, note: "Seeds the URL list from the sitemap." },
      { label: "Render, scroll & screenshot", code: `npx lacspace-scraper https://app.site --browser \\\n  --scroll 8 --screenshot app.png --auto`, note: "Auto-scrolls a lazy page, then captures it." },
      { label: "Parse a feed", code: `npx lacspace-scraper feed https://blog.site/feed.xml -f xlsx`, note: "RSS, Atom or JSON Feed → rows." },
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
    keywords: ["scraper", "web-scraping", "crawler", "css-selector", "html-parser", "data-extraction", "pagination", "detail-scraping"],
  },
  {
    slug: "monitor",
    name: "lacspace-monitor",
    tagline: "Watch pages, APIs and feeds for changes — alert when something moves.",
    icon: "🔔",
    grad: "#FBBF24,#FB7185",
    status: "live",
    version: "0.2.0",
    summary:
      "Watch any web page, CSS selector, JSON API field or RSS/Atom feed — or a status code, header, response time, SSL expiry or availability — and get told when something moves. Condition-based alerts (dropped, above a threshold, contains a keyword), Slack/Discord/Telegram/email notifiers, a change-history log, snapshots + diffs on a schedule. Built on the scraper engine.",
    about:
      "The first run captures a baseline; every run after reports exactly what changed. Snapshots live in a small state file, so you can run it from cron or CI and it just works — or use --interval to keep it running. Watch a selector's text, a JSON path, a feed's new items, an HTTP status/header, response time, SSL certificate expiry or plain availability — and fire only when a --when condition is met (decreased, >100, contains:…), delivered to Slack, Discord, Telegram, email or any webhook, with every change appended to a history log.",
    install: "npx lacspace-monitor https://example.com --selector \".price\" --interval 5m",
    quickstart: "npm i lacspace-monitor",
    features: [
      { icon: "👀", title: "Watch anything", desc: "A page, a CSS selector's text/attribute, a JSON API field, or an RSS/Atom/JSON feed." },
      { icon: "📈", title: "Real diffs", desc: "Snapshots compared over time — you see the exact before → after, or the new feed items." },
      { icon: "🔔", title: "Webhook alerts", desc: "POST changes to any webhook, or handle them in code with the library." },
      { icon: "⏱️", title: "Schedule or loop", desc: "Run once from cron/CI (stateful), or keep running with --interval 30s/5m/1h." },
      { icon: "🗂️", title: "Config files", desc: "Define many watches in one JSON file with a shared webhook and state." },
      { icon: "🔄", title: "Export", desc: "Write results to JSON, NDJSON, CSV or Excel." },
      { icon: "🎯", title: "Condition alerts", desc: "--when \"decreased | >100 | contains:In stock\" fires only when the change matches — not on every diff." },
      { icon: "🔒", title: "SSL / uptime / latency", desc: "--status, --header, --response-time, --ssl-expiry and --availability watch more than page text." },
      { icon: "📣", title: "Anywhere notifiers", desc: "--slack, --discord, --telegram or --email (SMTP) — send the alert where your team already is." },
      { icon: "📜", title: "Change history", desc: "--history appends every change to an NDJSON log; keyword/regex content watch and --fail-on-change for CI." },
    ],
    examples: [
      { label: "Price drop → Slack", code: `npx lacspace-monitor https://shop.site/p \\\n  --selector ".price" --when decreased \\\n  --slack $SLACK_HOOK`, note: "Only pings when the price actually falls." },
      { label: "SSL expiry → email", code: `npx lacspace-monitor https://mysite.com \\\n  --ssl-expiry --when "<14" \\\n  --email you@x.com --smtp smtp.x.com:587`, note: "Emails you when the certificate has under 14 days left." },
      { label: "API health, every minute", code: `npx lacspace-monitor https://api.site/health \\\n  --status --when "!=200" \\\n  --discord $DISCORD_HOOK --interval 1m`, note: "Alerts to Discord the moment the endpoint stops returning 200." },
      { label: "Back-in-stock + history log", code: `npx lacspace-monitor https://shop.site/item \\\n  --contains "In stock" --history changes.ndjson`, note: "Watches for the keyword and records every change to NDJSON." },
      { label: "Use it as a library", code: `import { runChecks, loadState, saveState } from "lacspace-monitor";\n\nconst state = loadState(".lacspace-monitor.json");\nconst { results, state: next } = await runChecks(\n  [{ url: "https://example.com", selector: "h1", label: "Title" }], state);\nsaveState(".lacspace-monitor.json", next);` },
    ],
    useCases: ["Price + stock monitoring", "New-listing / new-post alerts", "API status & uptime watching", "Content-change tracking"],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-monitor", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-monitor", external: true },
    ],
    keywords: ["monitor", "change-detection", "watcher", "website-monitor", "price-monitor", "rss", "webhook", "uptime", "ssl-expiry"],
  },
  {
    slug: "enrich",
    name: "lacspace-enrich",
    tagline: "Turn a domain, URL or email into a full company + contact profile.",
    icon: "🧬",
    grad: "#34D399,#2DD4BF",
    status: "live",
    version: "0.2.0",
    summary:
      "Give it a domain, URL or email and it builds a profile from open sources — name, description, logo, emails, phones, socials, address and a categorized, versioned tech stack — plus DNS/MX/SPF/DMARC deliverability and RDAP registration when you ask. Guess a person's email from a pattern, download logos, discover key pages. No paid API. Batch a whole list and export to JSON/CSV/Excel.",
    about:
      "lacspace-enrich reads a company's public pages (and schema.org JSON-LD) to assemble a clean profile: who they are, how to reach them, and what they're built on. It reads Organization/LocalBusiness structured data heavily, falls back to the page, and checks /contact & /about for extra emails — then flattens everything into CRM-ready columns. It now resolves DNS/MX/SPF/DMARC/DKIM for deliverability, pulls registrar and registration dates over RDAP, guesses per-person emails from a known pattern, downloads favicons/logos, and discovers key pages (contact, about, careers, pricing, blog, status) — with --resume and --fields for big batches.",
    install: "npx lacspace-enrich acme.com",
    quickstart: "npm i lacspace-enrich",
    features: [
      { icon: "🏢", title: "Company profile", desc: "Name, description and logo from OpenGraph, JSON-LD or a cleaned page title." },
      { icon: "📇", title: "Contacts", desc: "Emails and phones from the home page plus /contact and /about." },
      { icon: "🔗", title: "8 socials", desc: "Facebook, Instagram, WhatsApp, LinkedIn, X, YouTube, TikTok, Telegram." },
      { icon: "📍", title: "Address", desc: "From schema.org PostalAddress when the site publishes it." },
      { icon: "🧱", title: "Tech stack", desc: "Detects WordPress, Shopify, Wix, Next.js, Cloudflare, GA and more — categorized, versioned, with confidence and source." },
      { icon: "📚", title: "Batch + export", desc: "Enrich a list of domains in parallel; CSV/Excel flattens socials into columns." },
      { icon: "📡", title: "DNS & deliverability", desc: "--dns resolves MX/SPF/DMARC/DKIM and MX-verifies the mail domain — know if email will actually land." },
      { icon: "🌐", title: "RDAP registration", desc: "--rdap pulls the registrar, creation/expiry dates and status straight from the registry." },
      { icon: "🎯", title: "Email-pattern guessing", desc: "guess \"Name\" domain infers an address from a known example — {first}.{last}, {f}{last} and friends." },
      { icon: "🗺️", title: "Page discovery", desc: "Finds contact/about/careers/pricing/blog/status pages; --assets downloads the favicon and logo." },
    ],
    examples: [
      { label: "DNS + RDAP profile", code: `npx lacspace-enrich acme.com --dns --rdap -v`, note: "Adds MX/SPF/DMARC deliverability and registrar/registration data." },
      { label: "Guess a person's email", code: `npx lacspace-enrich guess "Jane Doe" acme.com \\\n  --known "Bob Smith:bsmith@acme.com"`, note: "Infers Jane's address from the known pattern." },
      { label: "Bulk, resumable, to CSV", code: `npx lacspace-enrich --input domains.txt \\\n  --dns --resume --rate 800 -f csv -o out.csv`, note: "--resume continues an interrupted batch; --rate throttles requests." },
      { label: "Download logos", code: `npx lacspace-enrich acme.com --assets ./logos`, note: "Saves the favicon and logo into ./logos." },
      { label: "Use it as a library", code: `import { enrichDomain } from "lacspace-enrich";\nconst profile = await enrichDomain("acme.com", { dns: true, rdap: true });\n// { name, description, logo, emails, phones, socials, address, tech, dns, rdap }` },
    ],
    useCases: ["Enrich a lead or CRM list", "Qualify inbound sign-ups by domain", "Build a company dataset", "Pair with lacspace-leads for full records"],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-enrich", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-enrich", external: true },
    ],
    keywords: ["enrichment", "company-data", "contact-enrichment", "lead-enrichment", "tech-stack", "dns", "email-finder"],
  },
  {
    slug: "extract",
    name: "lacspace-extract",
    tagline: "Pull text and tables out of PDFs, HTML pages and spreadsheets.",
    icon: "📄",
    grad: "#60A5FA,#6366F1",
    status: "live",
    version: "0.2.0",
    summary:
      "Pull text and tables out of PDFs, Office docs (DOCX/PPTX/EPUB), HTML pages and spreadsheets into clean JSON, NDJSON, CSV, Excel, plain text or Markdown. A zero-dependency PDF text engine (page ranges, per-page, metadata), a zero-dep ZIP reader for Office formats, HTML <table> + readability extraction, and a page-tagged grep. No API keys.",
    about:
      "lacspace-extract ships its own zero-dependency PDF text engine — it inflates FlateDecode content streams and parses the text operators, so ordinary text-based PDFs turn straight into text (and best-effort tables), with page ranges, per-page output and document metadata. A zero-dep ZIP reader now pulls text out of DOCX, PPTX and EPUB files too; HTML pages extract <table>s or a readable article, and everything can come out as Markdown. --grep searches with page tags. Note: scanned/image PDFs need OCR and aren't supported; encrypted PDFs are detected and reported.",
    install: "npx lacspace-extract report.pdf",
    quickstart: "npm i lacspace-extract",
    features: [
      { icon: "📄", title: "PDF text", desc: "Zero-dependency engine: inflates FlateDecode + parses text operators. No OCR." },
      { icon: "📊", title: "Tables", desc: "Every HTML <table> → rows; PDF/text column-aligned tables best-effort." },
      { icon: "🧾", title: "Spreadsheets", desc: "Read CSV/TSV/Excel/JSON/NDJSON and convert between them." },
      { icon: "🔄", title: "Any format out", desc: "JSON, NDJSON, CSV, Excel or plain text." },
      { icon: "🧰", title: "Engines exported", desc: "extractPdfText, htmlTables and lineTables are yours to call directly." },
      { icon: "🪶", title: "Tiny + honest", desc: "No native deps; clear about scanned/image PDFs needing OCR." },
      { icon: "📝", title: "Office docs", desc: "DOCX, PPTX and EPUB text via a zero-dep ZIP reader — no native libraries." },
      { icon: "📑", title: "PDF pages & metadata", desc: "--pages 2-5, --per-page and --meta; encrypted PDFs are detected and flagged." },
      { icon: "🅼", title: "Markdown output", desc: "-f md emits clean Markdown — great for docs, notes and LLM ingestion." },
      { icon: "🔎", title: "Readability & grep", desc: "--readable pulls the main article from HTML; --grep searches with page-tagged, context lines." },
    ],
    examples: [
      { label: "PDF pages + grep", code: `npx lacspace-extract report.pdf \\\n  --pages 2-5 --grep "invoice" -i -C 1`, note: "Searches only pages 2–5, case-insensitive, 1 line of context, tagged by page." },
      { label: "DOCX → Markdown", code: `npx lacspace-extract notes.docx -f md -o notes.md`, note: "Zero-dep ZIP reader; clean Markdown out." },
      { label: "Slides text, per slide", code: `npx lacspace-extract deck.pptx --per-page`, note: "Emits the text of each slide separately." },
      { label: "Readable article → Markdown", code: `npx lacspace-extract article.html --readable -f md`, note: "Strips chrome and keeps just the article body." },
      { label: "Use it as a library", code: `import { extractFile, extractPdfText } from "lacspace-extract";\nconst { text, pageCount } = await extractFile("report.pdf", { pages: "2-5" });\nconst { tables } = await extractFile("page.html");` },
    ],
    useCases: ["Invoice & statement data", "Report tables → spreadsheets", "Scrape then extract linked PDFs", "Convert documents to datasets"],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-extract", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-extract", external: true },
    ],
    keywords: ["pdf", "pdf-text", "table-extraction", "documents", "html-tables", "data-extraction", "docx", "markdown"],
  },
  {
    slug: "inspect",
    name: "lacspace-inspect",
    tagline: "Audit any website — SEO, meta, social, security and more, graded A–F.",
    icon: "🔬",
    grad: "#38BDF8,#4d9fff",
    status: "live",
    version: "0.2.0",
    summary:
      "Point it at a URL and get a graded audit across eight categories — SEO & meta, Open Graph, structured data, content & accessibility, links, static performance, security headers and crawlability — each finding paired with a concrete fix. Crawl a whole site for a per-page leaderboard, save a baseline and fail CI on regressions, enforce performance budgets, and export Markdown or HTML reports. No API keys. Built on the scraper engine.",
    about:
      "lacspace-inspect fetches a page, parses it with the scraper engine, and runs opinionated checks in each category, rolling every finding up into a letter grade — and now suggests a concrete fix for each one. Crawl a whole site (--crawl --depth --max) for a per-page leaderboard plus site-wide duplicate-title and broken-link detection, save a --baseline and fail CI when the grade regresses, enforce --budget limits, and hand a PR a clean Markdown or HTML report. Eleven new checks (response time, gzip/brotli, http→https, www canonical, lazy images, rel=noopener, hreflang, thin content, apple-touch-icon and more) join the originals. Note: performance checks are static-HTML heuristics, not a runtime Lighthouse audit, and it reads server-rendered HTML.",
    install: "npx lacspace-inspect example.com",
    quickstart: "npm i lacspace-inspect",
    features: [
      { icon: "🔎", title: "8 graded categories", desc: "SEO/meta, social/OG, structured data, content + a11y, links, static perf, security headers, crawlability." },
      { icon: "🅰️", title: "One A–F grade", desc: "Every finding is scored and rolled up into a category grade and an overall grade." },
      { icon: "🚦", title: "CI gate", desc: "--min-grade B exits non-zero below the bar — fail the build on an SEO or security regression." },
      { icon: "🔗", title: "Broken-link scan", desc: "--links checks each link's status with a bounded, polite pool and grades redirects and 404s." },
      { icon: "🧱", title: "Tech sniff", desc: "Informational detection of the frameworks and services the page is built on." },
      { icon: "🧾", title: "JSON or terminal", desc: "A clean sectioned report by default, or --json for machine output." },
      { icon: "🛠️", title: "Fix suggestions", desc: "Every finding ships a concrete fix — not just what's wrong, but what to change." },
      { icon: "🕷️", title: "Whole-site crawl", desc: "--crawl --depth --max grades every page, with a leaderboard and site-wide duplicate-title/broken-link detection." },
      { icon: "📉", title: "Baseline & regressions", desc: "--save-baseline then --baseline exits non-zero when the grade regresses — CI catches slips." },
      { icon: "🎯", title: "Perf budgets", desc: "--budget \"html<100kb,scripts<10,requests<50\" fails when a page blows a size/count limit." },
    ],
    examples: [
      { label: "Markdown report for a PR", code: `npx lacspace-inspect https://example.com -f md -o report.md`, note: "A clean Markdown report to attach to a pull request (-f html for a standalone page)." },
      { label: "Crawl a whole site", code: `npx lacspace-inspect https://example.com \\\n  --crawl --depth 2 --max 25 --min-grade B`, note: "Per-page leaderboard + site-wide duplicate titles and broken links." },
      { label: "Fail CI on regressions", code: `npx lacspace-inspect https://example.com --save-baseline base.json\n# later:\nnpx lacspace-inspect https://example.com --baseline base.json`, note: "Exits non-zero the moment the grade drops below the saved baseline." },
      { label: "Enforce a performance budget", code: `npx lacspace-inspect https://example.com \\\n  --budget "html<100kb,scripts<10,requests<50"`, note: "Fails the build when a page exceeds any limit." },
      { label: "Use it as a library", code: `import { inspectUrl, analyzeHtml } from "lacspace-inspect";\nconst report = await inspectUrl("example.com");\n// analyzeHtml(html, { url }) runs the same checks with no network` },
    ],
    useCases: ["Pre-launch SEO & accessibility checks", "Guard metadata and security in CI", "Audit a list of pages", "Catch missing OG/JSON-LD before sharing a link"],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-inspect", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-inspect", external: true },
    ],
    keywords: ["seo", "website-audit", "lighthouse-alternative", "accessibility", "open-graph", "security-headers", "ci", "site-crawl", "performance-budget"],
  },
  {
    slug: "sql",
    name: "lacspace-sql",
    tagline: "Run SQL over your CSV, JSON, NDJSON and Excel files — no database.",
    icon: "🗃️",
    grad: "#4d9fff,#6366F1",
    status: "live",
    version: "0.2.0",
    summary:
      "Query data files with real SQL — now with JOINs across files, expressions and scalar functions, CASE WHEN, UNION and glob FROM — straight over CSV, JSON, NDJSON or Excel, with no database to set up and no API keys. Read from stdin, print an aligned table or Markdown, live-refresh with --watch, or export the result to any format in one step.",
    about:
      "lacspace-sql loads a file into memory and runs a genuine SQL engine over it — a tokenizer, parser and evaluator, not a regex. It now joins two files (INNER/LEFT/cross, aliases, qualified columns), evaluates arithmetic and scalar functions (UPPER/LOWER/TRIM/SUBSTR/CONCAT/COALESCE/ROUND/ABS…) with CASE WHEN, matches with BETWEEN/NOT IN/NOT LIKE/LIKE ESCAPE, combines result sets with UNION/UNION ALL, and reads a glob of files (`'./data/*.csv'`) or stdin as one table. Group and aggregate, order by multiple keys with NULLS FIRST/LAST, then print a table or Markdown or serialise to JSON/NDJSON/CSV/Excel — with --watch to re-run on change. Still one file per table; no subqueries or window functions yet.",
    install: `npx lacspace-sql "SELECT * FROM ./data.csv LIMIT 5"`,
    quickstart: "npm i lacspace-sql",
    features: [
      { icon: "🗃️", title: "Any data file", desc: "CSV, JSON, NDJSON or Excel — name the file right in the FROM clause." },
      { icon: "🧮", title: "Real SQL", desc: "SELECT, DISTINCT, WHERE (=, !=, <, LIKE, IN, IS NULL, AND/OR/NOT, parens), ORDER BY, LIMIT/OFFSET." },
      { icon: "📊", title: "Group & aggregate", desc: "GROUP BY with COUNT/SUM/AVG/MIN/MAX (and COUNT(DISTINCT)) plus HAVING." },
      { icon: "🔢", title: "Smart typing", desc: "Numeric strings compare numerically; columns match case-insensitively." },
      { icon: "🔄", title: "Query → convert", desc: "Pretty table by default, or -f json|ndjson|csv|md to export the result in one step." },
      { icon: "🧰", title: "Typed library", desc: "query() / runQuery() plus parseSql() for the AST — build on the engine." },
      { icon: "🔗", title: "Joins across files", desc: "INNER / LEFT / cross joins between two files, with aliases and qualified columns." },
      { icon: "🧮", title: "Expressions & CASE", desc: "Arithmetic + UPPER/LOWER/TRIM/SUBSTR/CONCAT/COALESCE/ROUND/ABS… and CASE WHEN in SELECT." },
      { icon: "🪄", title: "UNION & globs", desc: "UNION / UNION ALL, plus a glob FROM ('./exports/*.csv') or stdin read as one table." },
      { icon: "👁️", title: "Live --watch", desc: "Re-runs the query whenever the source file changes — a live view over your data." },
    ],
    examples: [
      { label: "Join two files", code: `lacspace-sql "SELECT u.name, o.amount, o.qty*o.price AS total \\\n  FROM users.csv u JOIN orders.json o ON u.id = o.user_id ORDER BY total DESC"`, note: "Joins a CSV and a JSON on a key, with a computed column." },
      { label: "CASE WHEN grading", code: `lacspace-sql "SELECT name, CASE WHEN revenue>=1000 THEN 'A' \\\n  WHEN revenue>=500 THEN 'B' ELSE 'C' END AS grade FROM ./leads.csv"`, note: "Bucket rows with a CASE expression." },
      { label: "Glob many files → Markdown", code: `lacspace-sql "SELECT city, COUNT(*) AS n FROM './exports/*.csv' \\\n  GROUP BY city ORDER BY n DESC" -f md`, note: "Reads every matching file as one table, emits a Markdown table." },
      { label: "From stdin", code: `cat leads.csv | lacspace-sql "SELECT UPPER(name) AS name FROM stdin \\\n  WHERE city='Kathmandu'" --stdin csv`, note: "Pipe data straight in as the `stdin` table." },
      { label: "Use it as a library", code: `import { query, runQuery } from "lacspace-sql";\nconst rows = await query("SELECT * FROM ./data.csv WHERE age >= 30");\n// or runQuery(sql, alreadyLoadedRows) — pure, no file I/O` },
    ],
    useCases: ["Explore a scraped or leads export", "Filter + reshape a CSV without a spreadsheet", "Aggregate data inside a shell script or CI", "Convert a file while you query it"],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-sql", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-sql", external: true },
    ],
    keywords: ["sql", "csv", "query", "json", "ndjson", "excel", "data", "join", "sql-on-csv"],
  },
  {
    slug: "cron",
    name: "lacspace-cron",
    tagline: "Explain, validate and preview cron expressions — in any timezone.",
    icon: "⏰",
    grad: "#F59E0B,#FBBF24",
    status: "live",
    version: "0.2.0",
    summary:
      "Turn a cron expression into plain English, validate it with field-specific errors, and preview the next N run times in any IANA timezone — now with advanced L/W/# day tokens, Jenkins H, @every intervals, past runs and windowed counts, DST warnings, .ics export and schedule-overlap checks. 5- and 6-field cron, names and macros, zero dependencies.",
    about:
      "lacspace-cron parses standard 5-field cron (and optional 6-field with seconds), explains it in a readable sentence, and computes the next runs using the built-in Intl API — so timezones, half-hour offsets and DST are handled correctly with no dependencies. It now understands the advanced day tokens L (last), W (nearest weekday) and # (nth weekday), Jenkins-style H (a seeded, deterministic spread, --seed), @every intervals and relative time, shows previous runs (--prev) or every run inside a window (--from/--to, --count-between), warns about DST skips/repeats, exports an .ics calendar (--ics), and compares two schedules for overlap. Great for double-checking a schedule before you ship it, or as a typed library inside your own scheduler.",
    install: `npx lacspace-cron "0 9 * * 1-5"`,
    quickstart: "npm i lacspace-cron",
    features: [
      { icon: "🗣️", title: "Plain English", desc: "\"0 9 * * 1-5\" → \"At 09:00, Monday through Friday.\"" },
      { icon: "✅", title: "Real validation", desc: "Field-specific errors (out of range, bad token) instead of a silently wrong schedule." },
      { icon: "⏰", title: "Next N runs", desc: "Preview the upcoming run times from now or any --from date." },
      { icon: "🌍", title: "Timezone-aware", desc: "Compute runs in any IANA zone via Intl — DST and odd offsets included." },
      { icon: "🧩", title: "Names & macros", desc: "JAN–DEC, SUN–SAT, and @daily / @hourly / @weekly / @monthly / @yearly." },
      { icon: "🧰", title: "Typed library", desc: "parseCron, explainCron, nextRuns, isValidCron and matchesCron." },
      { icon: "🗓️", title: "Advanced tokens (L/W/#/H)", desc: "Last day, nearest weekday, nth weekday, and Jenkins H spread — seeded and deterministic." },
      { icon: "🪟", title: "Runs in a window", desc: "Previous runs (--prev), every run between --from/--to, and --count-between totals." },
      { icon: "📆", title: ".ics export", desc: "--ics writes an .ics calendar of the upcoming runs — drop it into any calendar app." },
      { icon: "🌗", title: "DST-safe", desc: "Warns when a run is skipped or repeated across a DST change; compare checks two schedules for overlap." },
    ],
    examples: [
      { label: "Last Friday, relative", code: `lacspace-cron "0 9 * * 5L" --relative`, note: "Explains the 5L token and prints runs as \"in 3 days\" style." },
      { label: "Jenkins H spread", code: `lacspace-cron "H H(2-5) * * *" --seed nightly-etl`, note: "Deterministic H placement seeded by a name — same seed, same times." },
      { label: "@every interval", code: `lacspace-cron "@every 90s" --next 4`, note: "Fixed-interval schedules, not just cron fields." },
      { label: "Export a calendar", code: `lacspace-cron "0 9 * * 1-5" --next 10 --ics standup.ics`, note: "Writes the next 10 runs as an .ics file." },
      { label: "Check two schedules for overlap", code: `lacspace-cron compare "0 * * * *" "*/15 * * * *"`, note: "Reports when the two schedules fire at the same time." },
    ],
    useCases: ["Sanity-check a crontab before deploy", "Show the next run time in a dashboard", "Validate user-entered schedules", "Drive your own job scheduler"],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-cron", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-cron", external: true },
    ],
    keywords: ["cron", "crontab", "scheduler", "cron-parser", "timezone", "next-run", "ics", "jenkins-cron"],
  },
  {
    slug: "dotenv",
    name: "lacspace-dotenv",
    tagline: "Lint, diff, sync and type your .env files — and catch committed secrets.",
    icon: "🔑",
    grad: "#34D399,#10B981",
    status: "live",
    version: "0.2.0",
    summary:
      "Keep your .env files honest — lint, diff and sync against .env.example, resolve ${VAR} interpolation, spawn a command with the env loaded (run -- cmd), AES-256-GCM encrypt/decrypt for commit-safe secrets, build an env matrix across environments, and scan for committed secrets (AWS, Google, Stripe, OpenAI, SendGrid, Twilio, JWT, Slack, GitHub, DB URLs, private keys). Zero dependencies. A dev CLI, distinct from the runtime validator @lacspace/env.",
    about:
      "lacspace-dotenv is a dev CLI for your .env files. Its robust zero-dependency parser handles quotes, export, comments and multiline values, then powers a full toolkit: lint (catch mistakes and masked secrets, now with six more detectors and an --allow list), diff/sync and matrix (align .env with .env.example, or compare values across development/staging/production), ${VAR} interpolation with undefined/circular detection (--expand), run -- cmd to load env then spawn a process, encrypt/decrypt (AES-256-GCM, commit-safe), JSON/YAML export/import, init/redact generation and a pre-commit hook installer. Secret detection is heuristic — it flags patterns and always masks the value.",
    install: "npx lacspace-dotenv lint .env",
    quickstart: "npm i lacspace-dotenv",
    features: [
      { icon: "🔑", title: "Robust parser", desc: "Quotes, export, comments, empty values, = in values, multiline — zero deps." },
      { icon: "🧹", title: "Lint", desc: "Duplicate keys, spacing around =, non-UPPER_SNAKE names, empty values, trailing whitespace." },
      { icon: "🕵️", title: "Secret scanner", desc: "Flags AWS, JWT, Slack, GitHub and PEM keys committed to a .env — always masked." },
      { icon: "🔁", title: "Diff & sync", desc: ".env vs .env.example both ways; --write appends missing keys as placeholders only." },
      { icon: "🏷️", title: "Typed accessor", desc: "Generate an interface Env + a fail-fast reader from your keys." },
      { icon: "🚦", title: "CI gate", desc: "check fails the build when process.env is missing an example key." },
      { icon: "🧬", title: "Interpolation", desc: "Resolve ${VAR} references with undefined/circular detection — --expand shows the final values." },
      { icon: "▶️", title: "run -- cmd", desc: "Load one or more env files, then spawn your command with them in the environment." },
      { icon: "🔐", title: "Encrypt for commits", desc: "AES-256-GCM encrypt/decrypt with a key — commit an encrypted .env safely." },
      { icon: "🧮", title: "Env matrix", desc: "Compare development / staging / production side by side to catch missing or drifted keys." },
    ],
    examples: [
      { label: "Run a command with env loaded", code: `npx lacspace-dotenv run -e .env -e .env.local -- npm start`, note: "Layers both files, then spawns `npm start` with them in the environment." },
      { label: "Encrypt a .env for commit", code: `npx lacspace-dotenv encrypt .env --key "$DOTENV_KEY"`, note: "AES-256-GCM; decrypt with the same key at deploy time." },
      { label: "Compare across environments", code: `npx lacspace-dotenv matrix .env.development .env.staging .env.production`, note: "A side-by-side matrix that flags missing or drifted keys." },
      { label: "Resolve \${VAR} references", code: `npx lacspace-dotenv lint --expand .env`, note: "Interpolates references and flags undefined or circular ones." },
    ],
    useCases: ["Catch a secret before it's committed", "Keep .env.example in sync on a team", "Type-safe environment access", "Gate deploys on required env in CI"],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-dotenv", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-dotenv", external: true },
    ],
    keywords: ["dotenv", "env", "secrets", "env-lint", "dotenv-linter", "typed-env", "env-encrypt", "interpolation"],
  },
  {
    slug: "webhook",
    name: "lacspace-webhook",
    tagline: "Receive, inspect, verify and replay webhooks — locally.",
    icon: "🪝",
    grad: "#A855F7,#8B5CF6",
    status: "live",
    version: "0.2.0",
    summary:
      "A local webhook receiver, inspector and replayer — capture incoming webhooks on any method/path, watch them live in a web inspector UI, pretty-print JSON/form/text bodies, verify signatures with auto-detect (GitHub/Stripe/Shopify/Slack/Svix/HMAC/SHA1), mock responses, fan out to multiple targets, save to NDJSON and replay with filters and assertions. Zero dependencies. Local-only — pair with a tunnel for public delivery.",
    about:
      "lacspace-webhook stands up a tiny HTTP server that accepts anything and shows you exactly what arrived — headers, query and the parsed body — either in the terminal or in a live web inspector UI streamed over SSE. Verify signatures with the right scheme, or let --verify auto detect it (github/stripe/shopify/slack/svix/hmac/sha1, all timing-safe), return mocked responses from rule files, fan the request out to several local targets with retries, and save every hit to NDJSON so you can replay it later — filtered, transformed, and asserted (--expect-status / --expect-contains) for CI. Export any capture as a curl command. It's local-only; put a tunnel (cloudflared/ngrok) in front for public delivery.",
    install: "npx lacspace-webhook listen --port 4000",
    quickstart: "npm i lacspace-webhook",
    features: [
      { icon: "🪝", title: "Catch anything", desc: "Any method/path; JSON, form-urlencoded and text bodies parsed and pretty-printed." },
      { icon: "🔐", title: "Verify signatures", desc: "GitHub, Stripe and generic HMAC-SHA256 — timing-safe, with a clear ok/fail per request." },
      { icon: "➡️", title: "Forward & relay", desc: "--forward proxies the request to your local app and returns its response." },
      { icon: "💾", title: "Save + list", desc: "Append every hit to NDJSON, then list a capture with method, path and size." },
      { icon: "🔁", title: "Replay", desc: "Re-send any captured request to a target — reproduce a webhook on demand." },
      { icon: "🪶", title: "Zero deps", desc: "Just node:http + node:crypto, plus a typed library (createReceiver, verifySignature, replayRequests)." },
      { icon: "🖥️", title: "Live web inspector", desc: "--ui opens an SSE dashboard that streams each incoming hook in the browser as it lands." },
      { icon: "🎭", title: "Response mocking", desc: "--rules returns canned status/body per matched request — stand in for a real endpoint." },
      { icon: "🔎", title: "Auto signature-detect", desc: "--verify auto identifies github/stripe/shopify/slack/svix/hmac/sha1; export any hit as curl." },
      { icon: "🔀", title: "Fan-out & replay CI", desc: "Forward to multiple targets with --retry; replay with --filter/--transform and --expect assertions." },
    ],
    examples: [
      { label: "Live inspector UI", code: `npx lacspace-webhook listen --ui --save hooks.ndjson`, note: "Opens a browser dashboard that streams each hook over SSE, and saves them too." },
      { label: "Auto-verify any provider", code: `npx lacspace-webhook listen --secret "$SECRET" --verify auto`, note: "Detects github/stripe/shopify/slack/svix/hmac/sha1 automatically." },
      { label: "Mock responses from rules", code: `npx lacspace-webhook listen --rules rules.json`, note: "Returns the status/body each matching request should get." },
      { label: "Replay + assert in CI", code: `npx lacspace-webhook replay hooks.ndjson --to http://localhost:3000 \\\n  --filter method=POST --expect-status 200 --expect-contains ok`, note: "Filters, replays and asserts — exits non-zero on a mismatch." },
    ],
    useCases: ["Develop against Stripe/GitHub webhooks locally", "See exactly what a provider sends", "Reproduce a webhook without re-triggering it", "Verify signatures before trusting a payload"],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-webhook", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-webhook", external: true },
    ],
    keywords: ["webhook", "webhook-tester", "http-inspector", "stripe", "github-webhook", "replay", "hmac", "webhook-ui", "signature-verify"],
  },
  {
    slug: "har",
    name: "lacspace-har",
    tagline: "Analyze a browser .har export offline — waterfall, weight and waste.",
    icon: "🚦",
    grad: "#F43F5E,#FB923C",
    status: "live",
    version: "0.2.0",
    summary:
      "Drop in a browser .har export and get an offline performance read — totals, the slowest and largest requests, a request waterfall (ASCII or standalone HTML), first- vs third-party and MIME breakdowns, cache and compression wins, savings recommendations and flagged issues. Diff two HARs, gate a budget, filter by query, and redact for safe sharing. Nothing is uploaded. Zero dependencies.",
    about:
      "lacspace-har parses a HAR 1.2 export and turns it into a readable report: how many requests and bytes, where the time and weight went, how much is third-party, what came from cache, and how much compression saved (or could save). It now draws a request waterfall (ASCII in the terminal or a standalone HTML page), diffs two HARs to show what changed between before/after, gates a --budget for CI, filters requests with a query, suggests savings with rough web-vitals estimates, and can redact a HAR (strip cookies/auth/bodies) so it's safe to share. Everything runs locally — the HAR never leaves your machine. Summed phase times aren't wall-clock (requests overlap), and it's only as complete as the HAR your browser wrote.",
    install: "npx lacspace-har session.har",
    quickstart: "npm i lacspace-har",
    features: [
      { icon: "🚦", title: "Totals & timing", desc: "Request count, transfer + content bytes, DOMContentLoaded/load, and aggregated timing phases." },
      { icon: "🐌", title: "Slowest & largest", desc: "The top requests by time and by weight, with status and type." },
      { icon: "🌍", title: "1st vs 3rd party", desc: "Domain breakdown split by first- and third-party origin." },
      { icon: "🗜️", title: "Cache & compression", desc: "Cache hits, redirects, errors, and how many bytes compression saved." },
      { icon: "🚩", title: "Issue flags", desc: "Uncompressed text, oversized images, too many third parties, missing cache headers." },
      { icon: "🔒", title: "Offline & typed", desc: "Nothing uploaded; parseHar / analyzeHar / formatReport exported for your own tooling." },
      { icon: "📊", title: "Waterfall (ASCII/HTML)", desc: "--waterfall draws request timing in the terminal, or -f html for a standalone page." },
      { icon: "🔀", title: "Diff two HARs", desc: "diff a.har b.har surfaces what got bigger, slower or newly added between two captures." },
      { icon: "🎯", title: "Perf budgets", desc: "--budget \"js<300kb,requests<50,total<2mb\" fails CI when a capture exceeds a limit." },
      { icon: "🫥", title: "Redact for sharing", desc: "redact strips cookies, auth headers and bodies so a HAR is safe to hand over." },
    ],
    examples: [
      { label: "Standalone HTML report", code: `npx lacspace-har session.har -f html -o report.html`, note: "A shareable page with the waterfall and breakdowns." },
      { label: "ASCII waterfall", code: `npx lacspace-har session.har --waterfall --width 60`, note: "Request timing right in the terminal." },
      { label: "Diff before vs after", code: `npx lacspace-har diff before.har after.har`, note: "Shows what changed in weight and timing between two captures." },
      { label: "Budget gate for CI", code: `npx lacspace-har session.har \\\n  --budget "js<300kb,requests<50,total<2mb"`, note: "Exits non-zero when a capture blows the budget." },
      { label: "Redact for safe sharing", code: `npx lacspace-har redact session.har -o safe.har`, note: "Strips cookies, auth and bodies." },
    ],
    useCases: ["Triage a slow page load offline", "Quantify third-party weight", "Find uncompressed or oversized assets", "Turn a HAR into a shareable report"],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-har", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-har", external: true },
    ],
    keywords: ["har", "performance", "web-performance", "waterfall", "har-analyzer", "devtools", "har-diff", "performance-budget"],
  },
  {
    slug: "icon",
    name: "lacspace-icon",
    tagline: "One image → favicon, PWA, Apple-touch, .ico, OG image and manifest.",
    icon: "🖼️",
    grad: "#EC4899,#A855F7",
    status: "live",
    version: "0.2.0",
    summary:
      "Turn one source image — PNG or baseline JPEG — into a complete icon set: favicon PNGs, a multi-size .ico, Apple-touch and PWA/maskable icons, Apple splash screens, dark/light variants, an Open Graph image, a rich web manifest and the paste-ready <head> snippet. Shape controls (radius, circle, padding, scale) and a dominant-color theme, all from a zero-dependency codec — no web service, no upload — plus a check auditor for an existing site.",
    about:
      "lacspace-icon ships its own zero-dependency image codecs (PNG decode/encode plus a baseline-JPEG decoder), area-average resize and an .ico assembler, so it generates a full favicon/PWA/Apple-touch set, Apple splash screens, dark/light variants, a manifest and an OG image entirely on your machine — nothing is uploaded to a third-party generator. Point it at a square PNG or JPEG and it writes every size, the .ico, the manifest and the HTML to paste into <head>, with shape controls (--radius / --circle / --padding / --scale), a dominant-color theme, palette-optimized favicons and a richer manifest (--shortcut / --categories / --display…). The new check command audits a live site's icon/manifest setup. SVG (and emoji) sources need an installed browser to rasterize; without one it falls back to copying the SVG through with a clear note. Square in, square out.",
    install: "npx lacspace-icon logo.png",
    quickstart: "npm i lacspace-icon",
    features: [
      { icon: "🖼️", title: "Full set from one file", desc: "favicon-16/32/48, .ico, apple-touch-180, icon-192/512, maskable and an OG image." },
      { icon: "🪶", title: "Zero-dep PNG codec", desc: "Own decode/encode + area-average resize — no sharp, no native deps, no cloud." },
      { icon: "📑", title: "Manifest + snippet", desc: "Writes manifest.webmanifest and the exact <link>/<meta> tags to paste into <head>." },
      { icon: "🎴", title: "OG image", desc: "--og composites your icon onto a 1200×630 card on your background colour." },
      { icon: "🎭", title: "Maskable", desc: "--maskable renders a safe-zone-padded 512 icon for Android." },
      { icon: "🧰", title: "Typed library", desc: "decodePng, encodePng, resizeRgba, makeIco and generateIcons are all exported." },
      { icon: "🎞️", title: "JPEG or PNG in", desc: "A zero-dep baseline-JPEG decoder means a photo works as a source, not just a PNG." },
      { icon: "⭕", title: "Shape & padding", desc: "--radius, --circle, --padding and --scale shape the icon; a dominant-color theme is picked for you." },
      { icon: "🌓", title: "Apple splash + dark mode", desc: "--splash writes iOS launch screens; --auto-dark / --dark generate light and dark variants." },
      { icon: "🩺", title: "Setup auditor", desc: "check <url> reports what a live site is missing — favicon, apple-touch, manifest, sizes." },
    ],
    examples: [
      { label: "JPEG → full set + splash", code: `lacspace-icon photo.jpg --name "Lacspace" --og --splash`, note: "A photo becomes the whole icon set plus Apple splash screens." },
      { label: "Rounded maskable", code: `lacspace-icon logo.png --radius 22 --padding 10 --maskable`, note: "Rounded corners with safe-zone padding for Android." },
      { label: "Circle + dark mode", code: `lacspace-icon logo.png --circle --auto-dark`, note: "Circular icons plus automatic light/dark variants." },
      { label: "Audit a live site", code: `lacspace-icon check https://example.com --json`, note: "Reports missing favicons, apple-touch, manifest and sizes." },
      { label: "Use it as a library", code: `import { generateIcons } from "lacspace-icon";\nconst { files, snippet, manifest } =\n  generateIcons(pngBytes, { name: "My App", maskable: true, og: true });` },
    ],
    useCases: ["Ship a full favicon/PWA set in one command", "Generate icons in CI from a source logo", "Make an OG card without a design tool", "Avoid uploading your brand to an online generator"],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-icon", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-icon", external: true },
    ],
    keywords: ["favicon", "pwa", "icons", "manifest", "apple-touch-icon", "og-image", "png", "splash-screen", "dark-mode"],
  },
  {
    slug: "http",
    name: "lacspace-http",
    tagline: "Terminal API client + .http runner with assertions.",
    icon: "🌐",
    grad: "#4d9fff,#4d9fff",
    status: "live",
    version: "0.1.0",
    summary:
      "A keyless, zero-dependency command-line API client — a local Postman/httpie. Send requests with a friendly CLI, or run a .http/.rest file of named requests with {{variables}}, token capture-and-chaining and assertions. A failed assertion exits non-zero, so any .http file becomes a CI smoke test.",
    about:
      "lacspace-http does two jobs from one binary. Ad-hoc, it sends an HTTP request and pretty-prints the JSON with status, timing and size — with bearer/basic auth, query params, JSON/form bodies, redirect and size caps, and a --curl printer that masks secrets. As a runner, it parses the well-known .http format (the VS Code REST Client / JetBrains one), resolves {{variables}} from env files and captured values, chains a token from one response into the next, and checks @assert conditions on status, JSON body, headers and timing. Everything is built on the global fetch and Node built-ins — no dependencies, no account, no telemetry.",
    install: "npx lacspace-http https://httpbin.org/get",
    quickstart: "npm i lacspace-http",
    tryHref: "/tools/http/try",
    features: [
      { icon: "⚡", title: "Ad-hoc requests", desc: "GET/POST/… with headers, query, JSON (-j k=v, k:=raw), forms, bearer & basic auth." },
      { icon: "📄", title: ".http / .rest runner", desc: "Run a whole file of named requests in order, or one via --name." },
      { icon: "🔗", title: "Capture & chaining", desc: "# @capture token = body.$.access_token, reused as {{token}} downstream." },
      { icon: "✅", title: "Assertions = CI tests", desc: "Assert on status, JSON-path body, headers, time; a failure exits non-zero." },
      { icon: "🧩", title: "Variables & env files", desc: "{{var}} from http-client.env.json / .env / --var, plus system vars." },
      { icon: "🎨", title: "Nice output", desc: "Coloured status, pretty JSON, timing/size; --json machine record; NO_COLOR and pipe-safe." },
      { icon: "📋", title: "--curl printer", desc: "Copy-pasteable curl with credentials masked by default." },
    ],
    examples: [
      { label: "Quick GET", code: `npx lacspace-http https://httpbin.org/get`, note: "Pretty-prints JSON with status, timing and size." },
      { label: "POST JSON", code: `npx lacspace-http POST https://httpbin.org/post -j name=Ada -j admin:=true`, note: "-j is a string field; k:=v is a raw JSON value." },
      { label: "Auth + curl", code: `npx lacspace-http https://api.example.com/me -b "$TOKEN" --curl`, note: "Prints the equivalent curl; the token is masked." },
      { label: "Run a .http suite", code: `npx lacspace-http run api.http --env dev`, note: "Captures a login token, chains it, asserts responses." },
      { label: "CI smoke test", code: `npx lacspace-http run smoke.http --var host=http://localhost:3000`, note: "Exit code is non-zero if any assertion fails." },
    ],
    useCases: [
      "Poke an API quickly without opening Postman",
      "Smoke/contract tests in CI from a versioned .http file",
      "Auth flows that need a captured token",
      "Share a runnable request collection in the repo",
    ],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-http", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-http", external: true },
    ],
    keywords: ["http", "http-client", "rest-client", "api-client", "curl", "httpie", "postman", "http-file", "api-testing", "ci"],
  },
  {
    slug: "fake",
    name: "lacspace-fake",
    tagline: "Deterministic fake data → JSON, CSV or SQL inserts.",
    icon: "🎲",
    grad: "#4d9fff,#4d9fff",
    status: "live",
    version: "0.1.0",
    summary:
      "A keyless, zero-dependency fake and seed data generator. Describe a schema inline or as JSON and get N realistic rows out as JSON, NDJSON, CSV or ready-to-run SQL INSERTs. Deterministic with --seed and Nepal-aware with --locale ne.",
    about:
      "lacspace-fake turns a tiny schema into realistic test data — names, emails, phones, addresses, prices, timestamps, UUIDs and 60+ more generators — and prints it in whatever shape your workflow needs, including escaped SQL inserts that seed a database in one command. Every value is drawn from a seeded mulberry32 PRNG, so a fixed seed produces byte-identical output on every machine, ideal for reproducible fixtures and CI. It runs fully offline with no API key, no account and no telemetry, and it speaks a Nepal locale out of the box.",
    install: "npx lacspace-fake",
    quickstart: "npm i lacspace-fake",
    tryHref: "/tools/fake/try",
    features: [
      { icon: "🧬", title: "Schema-driven rows", desc: "Inline --fields string or a JSON schema file with nested objects and arrays." },
      { icon: "🌱", title: "Deterministic --seed", desc: "Same seed, byte-identical output, forever." },
      { icon: "🔄", title: "Four outputs", desc: "JSON, NDJSON, CSV (header row) and safe SQL INSERTs." },
      { icon: "🛡️", title: "Injection-safe SQL", desc: "String values are quote-escaped and identifiers quoted." },
      { icon: "🎛️", title: "60+ generators", desc: "person, internet, address, company, commerce, text, datetime, ids." },
      { icon: "🇳🇵", title: "Nepal locale", desc: "Nepali names, districts/provinces, NPR, +977 phones, PAN/VAT." },
      { icon: "🔒", title: "Zero-dep & offline", desc: "Nothing to audit, nothing phones home, no key." },
    ],
    examples: [
      { label: "Five users as JSON", code: `npx lacspace-fake --fields "id:autoincrement,name:fullName,email:email,age:int(18..65)" -n 5`, note: "Fields evaluate in order; email derives from the name." },
      { label: "Seed a table with SQL", code: `npx lacspace-fake --fields "id:autoincrement,name:fullName,role:oneOf(admin|user)" -n 100 -f sql --table users`, note: "Escaped INSERT INTO … VALUES ready to pipe into a DB." },
      { label: "JSON schema → CSV file", code: `npx lacspace-fake --schema users.json -n 50 -f csv -o users.csv`, note: "Nested objects/arrays supported." },
      { label: "Nepal locale", code: `npx lacspace-fake --fields "name:fullName,phone:phone,district:city" --locale ne -n 10`, note: "Romanized Nepali names + +977 mobiles." },
      { label: "Reproducible fixture", code: `npx lacspace-fake email -n 5 --seed 42`, note: "Same seed always yields the same five emails." },
      { label: "Discover generators", code: `npx lacspace-fake list`, note: "Every generator with a sample value." },
    ],
    useCases: [
      "Seed dev/test databases in one command",
      "Reproducible unit/integration test fixtures",
      "Demo and staging data",
      "Prototype a UI before a real backend exists",
    ],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-fake", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-fake", external: true },
    ],
    keywords: ["fake-data", "seed-data", "mock-data", "test-fixtures", "faker", "sql-insert", "csv", "deterministic", "nepal", "database-seeding"],
  },
  {
    slug: "deps",
    name: "lacspace-deps",
    tagline: "Audit licences, size & unused deps — a CI gate.",
    icon: "📦",
    grad: "#4d9fff,#4d9fff",
    status: "live",
    version: "0.1.0",
    summary:
      "Point lacspace-deps at any Node/JS project and it audits your whole supply chain in one offline pass — licences with an allow/deny policy, real install size, duplicate versions, and unused/missing dependencies scanned from your own source. It exits non-zero on policy violations, so it drops straight into CI. Keyless, zero-dependency, and fully local.",
    about:
      "Most projects don't really know what they ship. lacspace-deps reads package.json, the lockfile and your local node_modules and answers the questions that matter for supply-chain hygiene: are these licences allowed, what's bloating node_modules, which libraries are installed twice, what's declared but never imported (or imported but never declared), and — opt-in — what's fallen behind on the registry. Everything except the outdated check is pure filesystem work with no telemetry.",
    install: "npx lacspace-deps",
    quickstart: "npm i lacspace-deps",
    features: [
      { icon: "⚖️", title: "Licence policy gate", desc: "Classify every package and fail on a GPL-*/AGPL-* with --allow/--deny." },
      { icon: "📏", title: "Install-size report", desc: "Heaviest packages by real on-disk bytes + file counts, with a gzip estimate." },
      { icon: "👯", title: "Duplicate detection", desc: "Packages installed at multiple versions, with where each copy lives." },
      { icon: "🔍", title: "Unused & missing", desc: "Declared-but-never-imported and imported-but-undeclared deps from a source scan." },
      { icon: "📡", title: "Outdated (opt-in)", desc: "Registry latest-version diff flagging majors behind; the only online feature." },
      { icon: "🤖", title: "CI-ready output", desc: "Human, --json or -f md; non-zero exit on --fail-on categories." },
      { icon: "🔒", title: "Zero-dep & local", desc: "Keyless, no account, no telemetry; Node built-ins only." },
    ],
    examples: [
      { label: "Full audit", code: `npx lacspace-deps`, note: "Health score + every section for the current project." },
      { label: "Enforce a licence policy in CI", code: `npx lacspace-deps --allow "MIT,ISC,Apache-2.0,BSD-*" --deny "GPL-*,AGPL-*"`, note: "Exits 1 on a copyleft dependency." },
      { label: "Dead + undeclared deps", code: `npx lacspace-deps unused --fail-on unused,missing`, note: "Gate the build on hygiene." },
      { label: "What's bloating node_modules", code: `npx lacspace-deps size --top 15 --gzip`, note: "Heaviest packages by install size." },
      { label: "Duplicate versions", code: `npx lacspace-deps duplicates`, note: "Find the same library installed twice." },
      { label: "Markdown for a CI summary", code: `npx lacspace-deps -f md > deps-report.md`, note: "Drop into a job summary." },
    ],
    useCases: [
      "CI licence-compliance gate",
      "Pre-release supply-chain audit",
      "Trim node_modules bloat (size + duplicates)",
      "Catch dead/phantom dependencies during refactors",
    ],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-deps", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-deps", external: true },
    ],
    keywords: ["dependencies", "dependency-audit", "license-checker", "spdx", "supply-chain", "unused-dependencies", "depcheck", "outdated", "install-size", "ci"],
  },
  {
    slug: "json",
    name: "lacspace-json",
    tagline: "The friendly jq — query, convert, validate & merge.",
    icon: "🧾",
    grad: "#4d9fff,#4d9fff",
    status: "live",
    version: "0.1.0",
    summary:
      "A keyless, zero-dependency CLI and typed library for structured data. Query with a safe jq-style language, convert between JSON/YAML/TOML/CSV/NDJSON, validate against JSON Schema, diff and deep-merge. Reads files, globs or stdin; exits non-zero on failure so it slots into CI.",
    about:
      "lacspace-json gives you the 80% of jq you actually use — paths, select, map, sort_by, group_by, aggregates — plus first-class format conversion, JSON Schema validation, structural diff and deep merge, all behind one small binary with no dependencies. The query engine is a hand-written tokenizer→evaluator (no eval) and every object built from input is guarded against prototype pollution. Everything runs locally: no key, no account, no network, no telemetry.",
    install: "npx lacspace-json",
    quickstart: "npm i lacspace-json",
    tryHref: "/tools/json/try",
    features: [
      { icon: "🔎", title: "Safe jq-style query", desc: "paths, pipes, select, map, sort_by, group_by, aggregates; no eval." },
      { icon: "🔄", title: "5-format convert", desc: "JSON ⇄ YAML ⇄ TOML ⇄ CSV ⇄ NDJSON with auto-detection." },
      { icon: "✅", title: "JSON Schema validation", desc: "draft-07 subset with clear per-error paths, non-zero exit." },
      { icon: "📊", title: "Structural diff", desc: "added/removed/changed with dotted/bracket paths, coloured or --json." },
      { icon: "🧬", title: "Deep merge", desc: "N documents, array strategy concat/replace/by-key." },
      { icon: "🚰", title: "Pipe-friendly", desc: "reads stdin, --raw unquoted scalars, --get shorthand, --min/--sort-keys." },
      { icon: "🔒", title: "Zero deps, fully typed", desc: "dual ESM+CJS library sharing the CLI engine." },
    ],
    examples: [
      { label: "Filter + project", code: `cat users.json | lacspace-json -q '.users[] | select(.active) | .email' -r`, note: "jq-style query, unquoted for the shell." },
      { label: "TOML → YAML", code: `lacspace-json convert config.toml --to yaml`, note: "Auto-detects input from the extension." },
      { label: "CSV → JSON", code: `cat people.csv | lacspace-json convert --from csv --to json`, note: "Header row becomes object keys." },
      { label: "Validate", code: `lacspace-json validate user.json --schema user.schema.json`, note: "Exits 1 with per-error paths if invalid." },
      { label: "Diff", code: `lacspace-json diff old.yaml new.yaml`, note: "Works across formats too." },
      { label: "Merge by key", code: `lacspace-json merge base.json patch.json --array by-key --array-key id`, note: "Matches array items by id." },
    ],
    useCases: [
      "Explore & reshape API responses in the terminal",
      "Convert config between YAML/TOML/JSON in build scripts",
      "CI gate that validates data against a schema",
      "Review what changed between two config/data files",
    ],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-json", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-json", external: true },
    ],
    keywords: ["jq", "json", "yaml", "toml", "csv", "json-schema", "json-diff", "json-merge", "jsonpath", "convert"],
  },
  {
    slug: "qr",
    name: "lacspace-qr",
    tagline: "Zero-dep QR codes to terminal, SVG & PNG.",
    icon: "🔳",
    grad: "#4d9fff,#4d9fff",
    status: "live",
    version: "0.1.0",
    tryHref: "/tools/qr/try",
    summary:
      "A keyless, offline QR-code generator with a spec-correct encoder written from scratch — Reed–Solomon ECC, auto version/mode/mask selection, and three hand-written renderers. Presets for URL, WiFi, vCard, email, SMS and geo, plus batch mode. Zero runtime dependencies.",
    about:
      "lacspace-qr implements the full ISO/IEC 18004 QR pipeline — mode selection, character-count headers, Reed–Solomon error correction over GF(256), block interleaving, all function patterns, and penalty-scored data masking — with no third-party dependencies and no network calls. It renders scannable codes as terminal half-blocks, crisp SVG, or a real 8-bit RGBA PNG (encoded via the built-in node:zlib), and ships correctly-formatted payload builders so a WiFi or contact-card QR is one command away.",
    install: "npx lacspace-qr \"https://lacspace.com\"",
    quickstart: "npm i lacspace-qr",
    features: [
      { icon: "🧮", title: "From-scratch encoder", desc: "Spec-correct QR (L/M/Q/H ECC, versions 1–40), validated against published reference vectors." },
      { icon: "🖼️", title: "Three renderers", desc: "Terminal half-blocks, scalable SVG, and a hand-written PNG encoder." },
      { icon: "📇", title: "Payload presets", desc: "URL, WiFi, vCard, email, tel, SMS and geo, correctly formatted and escaped." },
      { icon: "🤖", title: "Auto everything", desc: "Smallest fitting version, most compact mode, and lowest-penalty mask, all overridable." },
      { icon: "📦", title: "Batch mode", desc: "One QR file per CSV/TXT row, named by an id column." },
      { icon: "🎨", title: "Styling", desc: "Custom fg/bg colours, rounded modules, quiet-zone control, transparent backgrounds." },
      { icon: "🔒", title: "Zero deps, offline", desc: "No API keys, no telemetry; node:zlib is the only built-in used." },
    ],
    examples: [
      { label: "Terminal QR", code: `npx lacspace-qr "https://lacspace.com"`, note: "Scans straight off the screen." },
      { label: "WiFi join code", code: `npx lacspace-qr wifi --ssid Home --password s3cret`, note: "WIFI:T:WPA;S:Home;P:s3cret;;" },
      { label: "Branded SVG", code: `npx lacspace-qr "https://x.com" -f svg -o qr.svg --fg "#4d9fff"`, note: "Crisp vector, custom colour." },
      { label: "vCard PNG", code: `npx lacspace-qr vcard --name "Ada" --tel +9779800000000 -f png -o ada.png`, note: "Real 8-bit RGBA PNG." },
      { label: "High ECC", code: `npx lacspace-qr "MISSION CRITICAL" --ecc H`, note: "~30% recovery." },
      { label: "Batch", code: `npx lacspace-qr --batch urls.csv --out-dir out -f png`, note: "One file per row." },
    ],
    useCases: [
      "WiFi/contact/URL QR codes for print & signage",
      "Embed QR generation in Node apps with no dependency risk",
      "Bulk QR generation from a spreadsheet",
      "Offline / air-gapped environments",
    ],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-qr", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-qr", external: true },
    ],
    keywords: ["qr", "qrcode", "qr-generator", "reed-solomon", "svg", "png", "wifi-qr", "vcard", "barcode", "offline"],
  },
  {
    slug: "svg",
    name: "lacspace-svg",
    tagline: "Optimize, convert & bundle SVGs — zero-dependency.",
    icon: "✏️",
    grad: "#4d9fff,#4d9fff",
    status: "live",
    version: "0.1.0",
    tryHref: "/tools/svg/try",
    summary:
      "A keyless, offline SVG toolkit. Minify/clean SVGs with an svgo-lite optimizer, convert them to React/JSX components or data: URIs, and bundle many files into one <symbol> sprite sheet. Hand-written parser, zero dependencies, nothing leaves your machine.",
    about:
      "lacspace-svg bundles the SVG chores every frontend hits — optimization, framework conversion, inlining and spriting — into one small package with no dependency tree and no upload-your-art web service. A tolerant, hand-written XML/SVG parser underpins a pipeline of lossless optimizations (strip cruft, prune unused ids, round precision, normalize colours), a JSX/React converter with TypeScript and ref forwarding, URL/base64 data-URI encoding, and a sprite builder — all runnable from the CLI, in CI, or as a fully-typed dual ESM/CJS library.",
    install: "npx lacspace-svg logo.svg -o logo.min.svg",
    quickstart: "npm i lacspace-svg",
    features: [
      { icon: "🧹", title: "Lossless optimizer", desc: "Strip comments/metadata/editor cruft, prune unused ids, round precision, normalize colours; reports bytes saved." },
      { icon: "⚛️", title: "SVG → React/JSX", desc: "camelCase attrs, style-object, self-closing voids, TypeScript + forwardRef." },
      { icon: "🔗", title: "Data-URI encoder", desc: "URL-encoded (smaller) or base64, optional CSS background-image wrap." },
      { icon: "🧩", title: "Sprite builder", desc: "Combine many SVGs into one <symbol> sheet with a <use> usage snippet." },
      { icon: "🛡️", title: "Safety inspector", desc: "Flags <script>, on* handlers and external hrefs without executing them." },
      { icon: "🔬", title: "Hand-written parser", desc: "Tolerant XML/SVG parse + serialize, round-trips real-world files." },
      { icon: "🔒", title: "Zero deps, offline", desc: "File/glob/stdin in, stdout/file out, CI-friendly non-zero exits." },
    ],
    examples: [
      { label: "Minify a logo", code: `npx lacspace-svg logo.svg -o logo.min.svg`, note: "Reports before/after bytes and % saved." },
      { label: "Optimize a folder", code: `npx lacspace-svg optimize "icons/*.svg" --out-dir dist --precision 2`, note: "Globs + per-file output." },
      { label: "SVG to a TS component", code: `npx lacspace-svg jsx logo.svg --name Logo --ts --ref`, note: "Typed, ref-forwarding React component." },
      { label: "CSS data-URI", code: `npx lacspace-svg data-uri icon.svg --css`, note: `background-image:url("…") ready to paste.` },
      { label: "Sprite sheet", code: `npx lacspace-svg sprite "icons/*.svg" -o sprite.svg`, note: "One symbol per file + usage snippet." },
      { label: "Inspect + audit", code: `npx lacspace-svg info suspicious.svg`, note: "Counts, dimensions, script/handler warnings." },
    ],
    useCases: [
      "Shrink icon/asset SVGs in a build or CI step",
      "Generate React icon components from designer exports",
      "Inline SVGs into CSS/HTML as data-URIs",
      "Bundle an icon set into one sprite sheet",
    ],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-svg", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-svg", external: true },
    ],
    keywords: ["svg", "svgo", "svg-optimizer", "svg-to-jsx", "svg-to-react", "data-uri", "svg-sprite", "svg-parser", "svg-minify", "react-svg"],
  },
  {
    slug: "i18n",
    name: "lacspace-i18n",
    tagline: "Lint, diff & sort your translation files — keyless.",
    icon: "🌍",
    grad: "#4d9fff,#4d9fff",
    status: "live",
    version: "0.1.0",
    summary:
      "A zero-dependency i18n linter that keeps a multi-language app's translations honest. It finds missing, empty and unused keys, diffs every locale against a base with a coverage score, and flags dropped {count} interpolations and broken ICU plurals. Runs fully offline and exits non-zero, so it drops straight into CI.",
    about:
      "Translations rot quietly — a new en key never lands in ne, a translator drops a placeholder, a deleted base key lingers in ten files, dead keys pile up. lacspace-i18n audits JSON (nested or flat), a YAML subset, and .properties in both en.json and namespaced en/common.json layouts, cross-references keys against your source for dead/undefined usages, checks {name}/{{name}}/printf/ICU placeholder consistency, and can sort, fill and prune files in place — all locally, no API key, no telemetry.",
    install: "npx lacspace-i18n ./locales",
    quickstart: "npm i lacspace-i18n",
    features: [
      { icon: "📊", title: "Coverage & diff", desc: "Per-locale % plus missing / extra / empty / identical keys against a base." },
      { icon: "🔤", title: "Interpolation & ICU check", desc: "Same placeholder set across locales; catches dropped {count} and malformed plurals." },
      { icon: "🧹", title: "Dead & undefined keys", desc: "Scan t()/<Trans>/$t in source to find unused and never-defined keys." },
      { icon: "🗂️", title: "Multi-format", desc: "JSON, a YAML subset, and .properties, flat or namespaced, compared as one key space." },
      { icon: "🔧", title: "Sort / fill / prune", desc: "Normalize files, add missing base keys with a marker, drop stale extras." },
      { icon: "🤖", title: "CI-ready", desc: "--fail-on missing,icu,undefined exits non-zero; --json / -f md output." },
      { icon: "🔒", title: "Keyless & zero-dep", desc: "No service, no parser to install, nothing sent anywhere." },
    ],
    examples: [
      { label: "Full audit", code: `npx lacspace-i18n ./locales --base en`, note: "Coverage bars + every problem class." },
      { label: "What's a translator missing", code: `npx lacspace-i18n missing ./locales --json`, note: `{ "ne": ["nav.about"] }` },
      { label: "Dead / undefined keys", code: `npx lacspace-i18n unused ./locales --src ./src --ignore "admin.*"`, note: "Cross-references code usage." },
      { label: "CI gate", code: `npx lacspace-i18n check ./locales --fail-on missing,icu,undefined`, note: "Exits 1 on problems." },
      { label: "Sync files", code: `npx lacspace-i18n sort ./locales --fill="[TODO]" --prune --write`, note: "Sort, fill, prune in place." },
    ],
    useCases: [
      "Block a release when a locale is incomplete or an ICU plural is broken",
      "Hand a translator the exact missing-key list",
      "Prune keys deleted from the base out of every locale",
      "Catch dropped {name}/{count} interpolations in PR review",
    ],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-i18n", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-i18n", external: true },
    ],
    keywords: ["i18n", "internationalization", "localization", "translation", "missing-keys", "icu", "icu-messageformat", "i18next", "vue-i18n", "react-intl"],
  },
  {
    slug: "changelog",
    name: "lacspace-changelog",
    tagline: "Conventional Commits → CHANGELOG + next semver.",
    icon: "📝",
    grad: "#4d9fff,#4d9fff",
    status: "live",
    version: "0.1.0",
    summary:
      "Turn your Conventional Commits into a grouped, linked CHANGELOG.md and let it compute the next semantic version for you. Keyless and fully local — it reads your git log and writes a file, with no account, service, or telemetry. The whole parse→bump→render core is pure, so it's fast and predictable in CI.",
    about:
      "lacspace-changelog reads the commits since your last version tag, parses them as Conventional Commits, and decides the next semver bump (breaking→major, feat→minor, fix/perf→patch, with sensible 0.x handling). It renders a Keep-a-Changelog-style section with commit, PR and compare links derived from your repository field, and prepends it to CHANGELOG.md. Separate version and notes commands make it a clean building block for CI pipelines and GitHub releases, and opt-in --bump/--commit/--tag flags can cut a release locally (it never pushes). Zero runtime dependencies.",
    install: "npx lacspace-changelog",
    quickstart: "npm i lacspace-changelog",
    features: [
      { icon: "🔢", title: "Next-version from commits", desc: "breaking→major, feat→minor, fix/perf→patch, 0.x-aware." },
      { icon: "🔗", title: "Grouped, linked changelog", desc: "Features/Fixes/Perf/BREAKING with commit, PR and compare URLs." },
      { icon: "🤖", title: "CI-native", desc: "version and notes subcommands plus --json on everything, non-zero exit on failure." },
      { icon: "🏷️", title: "Prereleases & overrides", desc: "--preid beta and --release-as major|minor|patch|<version>." },
      { icon: "🛡️", title: "Safe release actions", desc: "Opt-in --bump/--commit/--tag, printed as a plan, never pushes." },
      { icon: "📦", title: "Zero dependencies", desc: "Hand-written commit parser, semver engine and markdown renderer." },
      { icon: "🔐", title: "Injection-safe git", desc: "Every git call uses execFile with an arg array, never a shell string." },
    ],
    examples: [
      { label: "Preview the release", code: `npx lacspace-changelog preview`, note: "Range, commit counts and the computed bump — writes nothing." },
      { label: "Next version for CI", code: `VER=$(npx lacspace-changelog version)`, note: "Prints only the version, e.g. 1.3.0." },
      { label: "GitHub release body", code: `npx lacspace-changelog notes > NOTES.md`, note: "Just the new section, grouped and linked." },
      { label: "Write CHANGELOG.md", code: `npx lacspace-changelog`, note: "Prepends the new section below the header." },
      { label: "Beta prerelease", code: `npx lacspace-changelog version --preid beta`, note: "→ 1.3.0-beta.0, then beta.1…" },
      { label: "Cut a release", code: `npx lacspace-changelog --bump --commit --tag`, note: "Bumps package.json, commits, tags — never pushes." },
    ],
    useCases: [
      "Automate release notes in CI",
      "Decide the next semver number before publishing to npm",
      "Generate a GitHub release body",
      "Maintain a Keep-a-Changelog file without a heavy toolchain",
    ],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-changelog", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-changelog", external: true },
    ],
    keywords: ["changelog", "conventional-commits", "semver", "release-notes", "keep-a-changelog", "version-bump", "changelog-generator", "release-please", "standard-version", "ci"],
  },
  {
    slug: "schema",
    name: "lacspace-schema",
    tagline: "JSON → Schema → TypeScript types, and back.",
    icon: "🧬",
    grad: "#4d9fff,#4d9fff",
    status: "live",
    version: "0.1.0",
    tryHref: "/tools/schema/try",
    summary:
      "Infer a draft-07 JSON Schema from one or many JSON/NDJSON samples, then turn JSON or a schema into clean TypeScript types. Generate realistic example instances and diff two schemas for breaking changes. Keyless, offline, zero-dependency.",
    about:
      "lacspace-schema is a pure, dependency-free codegen toolkit for the JSON ⇄ Schema ⇄ TypeScript loop. Point it at a real API response to derive a merged draft-07 schema (required vs optional properties, unioned types, enum and format detection), generate idiomatic interface/type declarations from either JSON or a schema (with $ref and cycle support, JSDoc examples, and real TS enums), synthesize a valid example instance from any schema, and catch breaking API changes by diffing two schemas — all locally, with nothing sent anywhere.",
    install: "npx lacspace-schema infer data.json",
    quickstart: "npm i lacspace-schema",
    features: [
      { icon: "🔎", title: "Infer draft-07 schemas", desc: "Merge many JSON/NDJSON samples into one schema with required/optional detection." },
      { icon: "🧾", title: "JSON → TypeScript", desc: "Named root, extracted nested interfaces, unions, optionals, readonly, JSDoc." },
      { icon: "📐", title: "Schema → TypeScript", desc: "Walks $ref/enum/anyOf/const, cycle-safe, string-literal unions or TS enums." },
      { icon: "🎯", title: "Example generator", desc: "Minimal valid instance honouring required/enum/const/format/min-max." },
      { icon: "🔀", title: "Schema diff", desc: "Flags removed/type-changed/newly-required fields as breaking; exits non-zero in CI." },
      { icon: "🏷️", title: "Format & enum detection", desc: "email/date-time/date/uri/uuid/ipv4 formats, configurable enum threshold." },
      { icon: "🔒", title: "Zero-dependency & local", desc: "Node built-ins only; reads file, glob, or stdin; no telemetry." },
    ],
    examples: [
      { label: "Infer a schema from data", code: `echo '{"id":1,"email":"a@x.com"}' | npx lacspace-schema infer`, note: "Draft-07 schema with format:email detected." },
      { label: "JSON → TS types", code: `npx lacspace-schema types user.json --name User --jsdoc`, note: "Extracts nested interfaces and adds example JSDoc." },
      { label: "Schema → TS enums", code: `npx lacspace-schema types api.schema.json --from schema --enum`, note: "Resolves $ref (cycles safe); emits real TS enums." },
      { label: "Example from a schema", code: `npx lacspace-schema example user.schema.json`, note: "A minimal valid fixture instance." },
      { label: "Breaking-change diff in CI", code: `npx lacspace-schema diff v1.schema.json v2.schema.json`, note: "Exits 2 when a change breaks consumers." },
    ],
    useCases: [
      "Bootstrap types from a real API response",
      "Keep TS types in sync with a JSON Schema",
      "Generate fixtures/examples for docs and tests",
      "Guard an API contract in CI via schema diff",
    ],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-schema", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-schema", external: true },
    ],
    keywords: ["json-schema", "schema-inference", "json-to-typescript", "typescript-types", "codegen", "draft-07", "quicktype", "schema-diff", "ndjson", "type-inference"],
  },
  {
    slug: "size",
    name: "lacspace-size",
    tagline: "Bundle size in raw + gzip + brotli, with CI budgets.",
    icon: "📏",
    grad: "#4d9fff,#4d9fff",
    status: "live",
    version: "0.1.0",
    summary:
      "Measure any build output or dist directory as raw, gzip and brotli. Enforce per-file and total size budgets that gate CI, and diff each run against a saved baseline to catch size regressions in a PR. Fully offline and keyless — your bundles never leave the machine.",
    about:
      "lacspace-size is a zero-dependency bundle/build-output analyzer. Point it at files, a directory, or globs and it compresses each file with Node's built-in zlib to report raw, gzip and brotli sizes, a per-file table (sorted largest-first with % of total) and a by-extension rollup. Its headline feature is CI gating: --max and repeatable --budget exit non-zero when a budget is breached, and --save-baseline/--baseline plus --max-increase fail a pull request that grows the bundle. Human output is colorized; --json and -f md feed dashboards and PR comments.",
    install: "npx lacspace-size dist",
    quickstart: "npm i lacspace-size",
    features: [
      { icon: "🗜️", title: "Raw + gzip + brotli", desc: "Every file compressed independently via node:zlib, exactly as a CDN serves it." },
      { icon: "🚧", title: "Budgets that gate CI", desc: "Global --max and repeatable per-pattern --budget, non-zero exit on breach." },
      { icon: "📊", title: "Baseline diff", desc: "Snapshot a run, then report added/removed/grew/shrank files and total delta/%." },
      { icon: "📉", title: "Regression gate", desc: "--max-increase <size|%> fails a PR that grows the bundle." },
      { icon: "🧾", title: "Clean reporting", desc: "Sorted table + by-extension rollup, colorized, plus --json and Markdown." },
      { icon: "🔒", title: "Zero deps, offline", desc: "Nothing is uploaded; no key, no telemetry." },
      { icon: "🧩", title: "CLI + library", desc: "A typed dual ESM/CJS library sharing one engine." },
    ],
    examples: [
      { label: "Analyze a build dir", code: `npx lacspace-size dist`, note: "Raw/gzip/brotli table + by-extension totals." },
      { label: "Enforce budgets in CI", code: `npx lacspace-size "dist/**/*.js" --max 500kb --budget "*.css:50kb"`, note: "Exits non-zero if any budget is exceeded." },
      { label: "Save a baseline", code: `npx lacspace-size dist --save-baseline .size.json`, note: "Commit it on main." },
      { label: "Fail a PR regression", code: `npx lacspace-size dist --baseline .size.json --max-increase 5%`, note: "Fails if the total grew >5%." },
      { label: "Markdown PR comment", code: `npx lacspace-size dist -f md > size-report.md`, note: "Drop into a PR." },
    ],
    useCases: [
      "Gate PRs on bundle size in CI",
      "Track dist size over time with a committed baseline",
      "Audit which files/extensions dominate a build",
      "Produce a Markdown size report for review",
    ],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-size", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-size", external: true },
    ],
    keywords: ["bundle-size", "size-limit", "gzip-size", "brotli-size", "bundle-analyzer", "size-budget", "size-diff", "baseline", "ci", "regression"],
  },
  {
    slug: "mock",
    name: "lacspace-mock",
    tagline: "Keyless local mock REST + GraphQL API from a JSON file.",
    icon: "🎭",
    grad: "#4d9fff,#4d9fff",
    status: "live",
    version: "0.1.0",
    summary:
      "Stand up a realistic fake backend in one command. lacspace-mock auto-generates json-server-style CRUD routes from a plain JSON db — with pagination, sorting, filters and full-text search — plus custom templated routes, a minimal GraphQL endpoint, and switches to simulate slow or flaky networks. Zero dependencies, runs on localhost, nothing leaves your machine.",
    about:
      "Frontend teams shouldn't have to wait for a backend to exist. lacspace-mock reads a db.json and instantly serves REST CRUD for every collection, answers custom routes described in a small JSON config (templated with path params, request-body fields and a seeded faker), and resolves a pragmatic GraphQL subset — all on node:http with no runtime dependencies. Because the same engine is an importable, port-free library, it doubles as a test fixture: construct a request, assert the response, no sockets. Latency and error-rate knobs let you rehearse loading states and failure handling before you ever hit a real server.",
    install: "npx lacspace-mock --db db.json",
    quickstart: "npm i lacspace-mock",
    features: [
      { icon: "🔁", title: "Auto REST CRUD", desc: "Every JSON collection becomes GET/POST/PUT/PATCH/DELETE with proper status codes and headers." },
      { icon: "🔍", title: "Rich list queries", desc: "Pagination, multi-key sort, field filters, _gte/_lte/_ne/_like operators and full-text q." },
      { icon: "🧩", title: "Templated custom routes", desc: "{{params}}, {{query}}, {{body}}, {{repeat n}} and a seeded faker ({{fake.email}}, {{fake.uuid}}…)." },
      { icon: "🌩️", title: "Network simulation", desc: "Global/per-route delay (fixed or jitter) and an --error-rate chaos switch for random 500s." },
      { icon: "◈", title: "Minimal GraphQL", desc: "One POST /graphql resolves collection queries with id/limit args and nested field selection." },
      { icon: "🧪", title: "Library + CLI", desc: "A pure, port-free createEngine().handle() makes it unit-testable and embeddable." },
      { icon: "🔒", title: "Private by default", desc: "Binds to 127.0.0.1, CORS on, --write to persist, zero deps, no telemetry." },
    ],
    examples: [
      { label: "Serve a JSON db", code: `npx lacspace-mock --db db.json`, note: "CRUD for every collection at http://127.0.0.1:4000." },
      { label: "Filter, sort, paginate", code: `curl 'localhost:4000/users?role=admin&_sort=age&_order=desc&_limit=10'`, note: "operators, q, and X-Total-Count header included." },
      { label: "Custom + fake data", code: `npx lacspace-mock --config mock.config.json`, note: "templated routes with {{params}}, {{body}}, {{fake.*}}, {{repeat}}." },
      { label: "Rehearse a slow, flaky API", code: `npx lacspace-mock --db db.json --delay 50-400 --error-rate 0.1`, note: "jittered latency + 10% random 500s." },
      { label: "GraphQL over the db", code: `curl -X POST localhost:4000/graphql -d '{"query":"{ users(id:1){ id name } }"}'`, note: "pragmatic subset: id/limit args, nested selection." },
    ],
    useCases: [
      "Prototype a UI before the backend exists",
      "Deterministic API fixtures for integration tests",
      "Rehearse loading/error states with latency + chaos",
      "Local contract stubs for a third-party API",
    ],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-mock", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-mock", external: true },
    ],
    keywords: ["mock", "mock-server", "mock-api", "json-server", "fake-api", "api-mocking", "graphql", "crud", "prototyping", "fixtures"],
  },
  {
    slug: "license",
    name: "lacspace-license",
    tagline: "Generate, header & audit your project's licence.",
    icon: "⚖️",
    grad: "#4d9fff,#4d9fff",
    status: "live",
    version: "0.1.0",
    summary:
      "A keyless, zero-dependency licence manager for your codebase. It writes a filled LICENSE from any SPDX id, stamps idempotent per-file licence headers with the right comment syntax per language, and generates a THIRD-PARTY-NOTICES file from your dependencies. A check command gates CI so your LICENSE, package.json and headers never drift.",
    about:
      "Most projects get their licensing right once and then let it rot — the year in the header ages, a new file ships with no notice, package.json says MIT while the LICENSE file says something else. lacspace-license makes licence hygiene a one-command, CI-enforceable step. It embeds the full canonical texts of 12 common licences (plus the Lacspace Free Licence), fills your name and year, understands the comment syntax of 60+ file types, and never corrupts a file — headers are idempotent, shebang-safe and preserve your line endings. It runs entirely on local files with no network and no telemetry.",
    install: "npx lacspace-license init MIT",
    quickstart: "npm i lacspace-license",
    features: [
      { icon: "📄", title: "LICENSE generator", desc: "Filled from any SPDX id, author/year read from package.json." },
      { icon: "🖋️", title: "Per-file headers", desc: "Correct //, #, --, /* */, <!-- --> syntax per language." },
      { icon: "♻️", title: "Idempotent & safe", desc: "Re-runs are no-ops; shebang, EOL and final newline preserved." },
      { icon: "📚", title: "THIRD-PARTY-NOTICES", desc: "Grouped-by-licence md/txt from node_modules, --prod aware." },
      { icon: "🤖", title: "CI gate", desc: "check fails when LICENSE is missing, mismatched, or a header is absent." },
      { icon: "🔬", title: "Fuzzy detection", desc: "Identifies a LICENSE text tolerant of CRLF/whitespace." },
      { icon: "🔒", title: "Zero deps, offline", desc: "Full licence texts embedded; nothing leaves your machine." },
    ],
    examples: [
      { label: "Create a LICENSE", code: `npx lacspace-license init MIT --author "Lacspace" --year 2026`, note: "Author/year auto-read from package.json when omitted." },
      { label: "Stamp headers", code: `npx lacspace-license add "src/**/*.{ts,js}" --id MIT --write`, note: "Idempotent — running twice changes nothing." },
      { label: "Preview a diff", code: `npx lacspace-license add "src/**/*.ts" --dry-run`, note: "See what would change before writing." },
      { label: "Third-party notices", code: `npx lacspace-license notices --prod -o THIRD-PARTY-NOTICES.md`, note: "Grouped by licence, prod deps only." },
      { label: "CI gate", code: `npx lacspace-license check --require-headers`, note: "Exits non-zero on any violation." },
    ],
    useCases: [
      "Ship a correct LICENSE in seconds",
      "Enforce licence headers across a monorepo in CI",
      "Keep copyright years current",
      "Produce attribution/notices for a release",
    ],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/lacspace-license", external: true },
      { label: "Source", href: "https://github.com/lacspace/npm-packages/tree/main/lacspace-license", external: true },
    ],
    keywords: ["license", "licence", "spdx", "license-header", "license-generator", "third-party-notices", "license-check", "compliance", "attribution", "ci"],
  },
];

export const TOOLS_LIVE = TOOLS.filter((t) => t.status === "live");
export const TOOLS_SOON = TOOLS.filter((t) => t.status === "soon");

export function getTool(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
