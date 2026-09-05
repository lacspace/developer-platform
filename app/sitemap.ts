import type { MetadataRoute } from "next";
import { toNextSitemap } from "@lacspace/sitemap";
import { CATALOG } from "./lib/catalog";

const BASE = "https://developer.lacspace.com";
const LASTMOD = new Date("2026-09-05");

const PKG_URLS = CATALOG.flatMap((g) =>
  g.items.map((p) => ({
    loc: `${BASE}/packages/${p.n}`,
    changefreq: "monthly" as const,
    priority: 0.6,
    lastmod: LASTMOD,
  }))
);

export default function sitemap(): MetadataRoute.Sitemap {
  return toNextSitemap([
    { loc: `${BASE}/`, changefreq: "weekly", priority: 1.0, lastmod: LASTMOD },
    { loc: `${BASE}/packages`, changefreq: "weekly", priority: 0.9, lastmod: LASTMOD },
    { loc: `${BASE}/handbook`, changefreq: "weekly", priority: 0.9, lastmod: LASTMOD },
    { loc: `${BASE}/compare`, changefreq: "monthly", priority: 0.7, lastmod: LASTMOD },
    { loc: `${BASE}/playground`, changefreq: "monthly", priority: 0.7, lastmod: LASTMOD },
    ...PKG_URLS,
  ]) as MetadataRoute.Sitemap;
}
