# Lacspace Developer Platform — `developer.lacspace.com`

The developer home for Lacspace: 63 zero-dependency, isomorphic TypeScript
packages, the `create-lacspace-app` CLI, and the docs to build with them.

## Pages

- **Platform hub** (`/`) — packages, docs, handbook, scaffold, deployed apps, integrations.
- **Packages** (`/packages`) — the full 63-package catalog, grouped by kit.
- **Handbook** (`/handbook`) — install, use, integrate, upgrade, compare.
- **Compare** (`/compare`) — `@lacspace` vs the usual dependencies.
- **Playground** (`/playground`) — run the packages live in the browser.

## Stack

- Next.js 15 · React 19 · hand-written CSS design system (`app/globals.css`)
- **Dogfoods** `@lacspace/seo`, `@lacspace/og`, `@lacspace/sitemap`,
  `@lacspace/robots`, `@lacspace/rss`, `@lacspace/llms-txt` for the full SEO layer
  (`defineSite`, dynamic OG at `/og`, `sitemap.xml`, `robots.txt`, `llms.txt`,
  `rss.xml` / `atom.xml` / `feed.json`, JSON-LD).
- The playground runs `@lacspace/{slugify,money,case,humanize,color,id}` in the browser.
- Brand: Lacspace mark, Space Grotesk + Inter, signature cyan→blue→violet gradient.

## Develop

```bash
npm install
npm run dev
```

Sibling of [Lacspace Templates](https://templates.lacspace.com).
Free under the Lacspace Free Licence.
