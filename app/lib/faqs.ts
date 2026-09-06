/**
 * The Lacspace developer FAQ — one source of truth, rendered on /faq (with
 * FAQPage JSON-LD for rich results) and mirrored into the monorepo README and
 * the create-lacspace-app README. Answers are plain strings; `backticks` mark
 * inline code for the page renderer and are stripped for the JSON-LD text.
 */

export interface Faq {
  q: string;
  a: string;
}
export interface FaqGroup {
  category: string;
  items: Faq[];
}

export const FAQ_GROUPS: FaqGroup[] = [
  {
    category: "Getting started",
    items: [
      {
        q: "What is the Lacspace developer platform?",
        a: "It's a free ecosystem for JavaScript and TypeScript developers: a library of more than 75 zero-dependency `@lacspace` packages, a set of standalone command-line tools, and `create-lacspace-app` — a CLI that scaffolds a finished Next.js app. Everything is documented at developer.lacspace.com and published openly to npm.",
      },
      {
        q: "Are the Lacspace packages and tools really free?",
        a: "Yes. Every open package and tool is published to npm under the permissive Lacspace Free Licence v1.0 — free to use, ship, modify and use commercially, with no fees, seats or usage metering. There's no paid tier waiting to switch on.",
      },
      {
        q: "Do I need an API key, account or sign-up to use them?",
        a: "No. There are no API keys, tokens, accounts or dashboards. You install a package or run a tool with `npx` and it works offline — nothing to register for and nothing metered.",
      },
      {
        q: "What's the difference between the packages, the tools and create-lacspace-app?",
        a: "The `@lacspace/*` packages are libraries you import into your own code (auth, SEO, money, dates, crypto and more). The tools are standalone programs you run from your terminal (scrape a site, audit SEO, analyse a HAR, generate icons). And `create-lacspace-app` is a scaffolder that generates a complete Next.js project pre-wired with the best of both.",
      },
      {
        q: "Which runtimes and platforms are supported?",
        a: "The `@lacspace` libraries are isomorphic — they run in Node.js, the browser, edge runtimes and serverless functions, anywhere modern JavaScript runs. The command-line tools and CLIs need Node.js 20 or newer.",
      },
      {
        q: "Are the packages written in TypeScript and fully typed?",
        a: "Yes. Everything is authored in strict TypeScript and ships hand-checked type declarations, so you get autocomplete and type safety out of the box — whether you write TypeScript or plain JavaScript.",
      },
      {
        q: "Do the packages add dependencies or bloat my bundle?",
        a: "The `@lacspace` libraries are zero-dependency and tree-shakeable, so you only ship what you import and never inherit a dependency tree. The standalone tools keep dependencies minimal too — most are zero-dependency, a few build on the shared scraper engine, and only lacspace-leads drives a real browser.",
      },
      {
        q: "ESM or CommonJS?",
        a: "Both. Every library ships a dual ESM + CommonJS build with correct `exports` maps, so `import` and `require` both work across Node, bundlers and frameworks.",
      },
    ],
  },
  {
    category: "The @lacspace packages",
    items: [
      {
        q: "How many @lacspace packages are there and what do they cover?",
        a: "There are more than 75 packages, grouped into kits: Core, Security, SEO, React, App & Utils, Backend, Data, Commerce & Ledger, Stock, Mail, Web and regional payments. Between them they cover authentication, JWTs, crypto, validation, forms, SEO metadata, sitemaps, Open Graph images, money, dates, CSV/Excel, caching, rate-limiting and much more.",
      },
      {
        q: "How do I install an @lacspace package?",
        a: "With your package manager, for example `npm i @lacspace/seo` (or `pnpm add` / `yarn add`). Each package page on developer.lacspace.com/packages shows the exact install command, the API and copy-paste examples.",
      },
      {
        q: "Which package should I use for a given job?",
        a: "The developer handbook and the per-package reference at developer.lacspace.com/docs include a \"which package for what\" guide that maps common needs (auth, payments, SEO, dates, PDFs, validation) to the right package.",
      },
      {
        q: "Are the packages production-ready?",
        a: "Yes — they're versioned with semver, covered by tests, and already power Lacspace's own products and this developer platform, which dogfoods the SEO, OG, sitemap, robots and RSS packages.",
      },
      {
        q: "Do they work with Next.js, React and other frameworks?",
        a: "Yes. Because the libraries are framework-agnostic and isomorphic, they work with Next.js, Remix, Astro, SvelteKit, Express, plain Node and the browser. The React Kit adds React-specific hooks and components, and there's a dedicated Next.js helper package.",
      },
      {
        q: "Is there documentation for each package?",
        a: "Yes. Every package has a reference page, there's a full developer handbook with runnable recipes, a downloadable PDF handbook, and a live in-browser playground for several utilities — all at developer.lacspace.com/docs.",
      },
      {
        q: "How do @lacspace packages compare to popular alternatives?",
        a: "Many are focused, zero-dependency takes on well-known libraries — for example a Zod-style validator, a Dinero-style money package, an SWR-style data-fetching hook and a jsonwebtoken-style JWT package — built to be smaller and dependency-free. The /compare page lines them up side by side.",
      },
    ],
  },
  {
    category: "The developer tools",
    items: [
      {
        q: "What developer tools does Lacspace offer?",
        a: "Twelve free, keyless tools: lacspace-leads (Google Maps lead finder), lacspace-scraper (website scraper), lacspace-monitor (change & uptime monitor), lacspace-enrich (company & contact enrichment), lacspace-extract (PDF/DOCX/HTML extraction), lacspace-sql (SQL over data files), lacspace-inspect (site audit), lacspace-cron (cron toolkit), lacspace-dotenv (.env toolkit), lacspace-webhook (webhook receiver), lacspace-har (HAR analyser) and lacspace-icon (favicon/PWA generator).",
      },
      {
        q: "How do I run a tool without installing it?",
        a: "Use `npx`, for example `npx lacspace-inspect example.com` or `npx lacspace-scraper https://site.com --auto`. Each tool's page at developer.lacspace.com/tools lists its commands and examples. You can also install one globally with `npm i -g <tool>`.",
      },
      {
        q: "Are the tools a CLI or a library?",
        a: "Both. Every tool is a command-line program and a fully-typed library, so you can run it from your terminal or import the same engine into your own code.",
      },
      {
        q: "Which formats can the tools export?",
        a: "JSON, NDJSON, CSV and Excel, with a built-in converter between all four. Several tools also emit Markdown, HTML reports, .ics calendars or images depending on the job.",
      },
      {
        q: "Can I try a tool without installing anything?",
        a: "Yes — the scraper has a hosted live tester at developer.lacspace.com/tools/scraper/try that runs in your browser exactly as it would locally, including the equivalent CLI command.",
      },
      {
        q: "Do the tools send my data anywhere?",
        a: "No. The tools run on your machine, use only the open web and open data sources, and have no telemetry or accounts. Your inputs and outputs stay local.",
      },
      {
        q: "Why is lacspace-leads local-only and not a hosted button?",
        a: "lacspace-leads drives a real browser over Google Maps, so it runs on your own machine. Hosting it as a public button would breach Google's Terms of Service and can't run inside a serverless function — so it stays a one-command local tool.",
      },
      {
        q: "Is scraping and lead-finding done responsibly?",
        a: "The tools are robots.txt-aware where it matters and support polite delays, jitter, rate-limits, retries and a custom User-Agent. You're responsible for using them within each site's terms and applicable law — they're built to scrape considerately.",
      },
      {
        q: "Can I use the tools in CI/CD pipelines?",
        a: "Yes, that's a first-class use case. lacspace-inspect has `--min-grade` and `--budget` gates, lacspace-har has performance budgets, lacspace-monitor has `--fail-on-change`, and lacspace-dotenv has a `check` gate and a pre-commit hook — all exit non-zero on failure so they slot straight into CI.",
      },
    ],
  },
  {
    category: "create-lacspace-app",
    items: [
      {
        q: "What is create-lacspace-app?",
        a: "It's a scaffolding CLI that writes a complete, production-ready Next.js 15 + Tailwind app in seconds — pre-wired with Lacspace SEO, security headers, robots.txt, a sitemap, a working contact form, a ⌘K command palette, dynamic Open Graph images and a CI workflow.",
      },
      {
        q: "How do I scaffold a new app?",
        a: "Run `npx create-lacspace-app` and follow the prompts, or pass a name and template directly, e.g. `npx create-lacspace-app my-site --template saas`. It installs dependencies and gives you a running app.",
      },
      {
        q: "What templates are included?",
        a: "Seven finished templates: personal, business, ecommerce, SaaS, blog (a real Markdown blog), docs (a real Markdown docs site) and marketplace. Each is a complete Next.js app you can deploy as-is or customise.",
      },
      {
        q: "What comes pre-wired in a generated app?",
        a: "SEO metadata and JSON-LD via @lacspace/seo, a dynamic OG image endpoint via @lacspace/og, security headers, robots.txt and a sitemap, a typed contact form with a honeypot, a ⌘K command palette, and a GitHub Actions workflow that gates on an SEO crawl grade.",
      },
      {
        q: "Do I need to know the Lacspace packages to use it?",
        a: "No. The generated app works out of the box and you can build normally. The Lacspace packages are already wired in where they help, and you can lean on them more as you go — or not at all.",
      },
      {
        q: "Are there ready-made live templates I can preview?",
        a: "Yes — every template is deployed and browsable at templates.lacspace.com, so you can see the finished result before you scaffold.",
      },
    ],
  },
  {
    category: "Licensing & usage",
    items: [
      {
        q: "What licence are the packages and tools under?",
        a: "The open packages and tools ship under the Lacspace Free Licence v1.0 — a short, permissive, own-branded licence. The full text is at developer.lacspace.com/licenses/lacspace-free-1.0.",
      },
      {
        q: "Can I use them in commercial and closed-source projects?",
        a: "Yes. The Free Licence permits commercial use, private and closed-source use, modification and redistribution, with no royalties. Just keep the licence notice.",
      },
      {
        q: "How does the Lacspace Free Licence compare to MIT?",
        a: "It's permissive in the same spirit as MIT and BSD — use, modify and ship freely, including commercially — but it's Lacspace's own branded licence rather than MIT itself. In practice it imposes no more restrictions than a typical permissive open-source licence.",
      },
      {
        q: "Is there a catch — will Lacspace start charging later?",
        a: "No. The open packages and tools are free under the Free Licence, and a published version stays under the licence it shipped with. Some separate Lacspace products are commercial, but the developer packages and tools here are free.",
      },
    ],
  },
  {
    category: "Support & staying updated",
    items: [
      {
        q: "Where do I find the docs and the source code?",
        a: "Docs live at developer.lacspace.com/docs (plus a downloadable PDF handbook), and the source for the packages and tools is on GitHub at github.com/lacspace/npm-packages.",
      },
      {
        q: "How do I report a bug or request a feature?",
        a: "Open an issue on the GitHub repository at github.com/lacspace/npm-packages/issues. Include the package or tool name, its version, and a minimal reproduction so it can be triaged quickly.",
      },
      {
        q: "How do I keep up with new packages, tools and versions?",
        a: "Watch the GitHub repository, follow the @lacspace org on npm at npmjs.com/org/lacspace, and check the developer platform — new packages and tool versions flow onto the site automatically.",
      },
      {
        q: "Can I contribute or suggest a new package or tool?",
        a: "Yes — ideas and contributions are welcome via GitHub issues and pull requests. Tell us what you'd automate next; several tools started as exactly that kind of request.",
      },
    ],
  },
];

export const FAQS: Faq[] = FAQ_GROUPS.flatMap((g) => g.items);
export const FAQ_COUNT = FAQS.length;

/** Plain-text answer (strip inline-code backticks) for JSON-LD / plain contexts. */
export function faqPlain(a: string): string {
  return a.replace(/`/g, "");
}
