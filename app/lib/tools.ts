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
];

export const TOOLS_LIVE = TOOLS.filter((t) => t.status === "live");
export const TOOLS_SOON = TOOLS.filter((t) => t.status === "soon");

export function getTool(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
