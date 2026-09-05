import type { FeedOptions, FeedItem } from "@lacspace/rss";
import { CATALOG } from "./catalog";

const BASE = "https://developer.lacspace.com";
const UPDATED = new Date("2026-09-05");

export const FEED: FeedOptions = {
  title: "Lacspace Packages",
  link: BASE,
  description:
    "The @lacspace ecosystem — 80 zero-dependency, isomorphic TypeScript packages.",
  feedUrl: `${BASE}/rss.xml`,
  language: "en",
  updated: UPDATED,
  author: "Lacspace",
  copyright: `© ${UPDATED.getFullYear()} Lacspace · Lacspace Free Licence`,
};

export const FEED_ITEMS: FeedItem[] = CATALOG.flatMap((g) =>
  g.items.map((p) => ({
    title: `@lacspace/${p.n} v${p.v}`,
    link: `https://www.npmjs.com/package/@lacspace/${p.n}`,
    id: `@lacspace/${p.n}`,
    description: p.d,
    content: `<p>${p.d}</p><p><strong>${g.group}</strong> · <code>npm i @lacspace/${p.n}</code></p>`,
    author: "Lacspace",
    date: UPDATED,
    categories: [g.group],
  }))
);
