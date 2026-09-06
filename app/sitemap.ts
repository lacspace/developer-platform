import type { MetadataRoute } from "next";
import { toNextSitemap } from "@lacspace/sitemap";
import { CATALOG } from "./lib/catalog";
import { TOOLS } from "./lib/tools";

const BASE = "https://developer.lacspace.com";
const LASTMOD = new Date("2026-09-06");

const TOOL_URLS = TOOLS.map((t) => ({
  loc: `${BASE}/tools/${t.slug}`,
  changefreq: "weekly" as const,
  priority: t.status === "live" ? 0.8 : 0.5,
  lastmod: LASTMOD,
}));

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
    { loc: `${BASE}/tools`, changefreq: "weekly", priority: 0.9, lastmod: LASTMOD },
    ...TOOL_URLS,
    { loc: `${BASE}/tools/scraper/try`, changefreq: "monthly", priority: 0.7, lastmod: LASTMOD },
    { loc: `${BASE}/docs`, changefreq: "weekly", priority: 0.9, lastmod: LASTMOD },
    { loc: `${BASE}/handbook`, changefreq: "weekly", priority: 0.9, lastmod: LASTMOD },
    { loc: `${BASE}/create-app`, changefreq: "weekly", priority: 0.9, lastmod: LASTMOD },
    { loc: `${BASE}/compare`, changefreq: "monthly", priority: 0.7, lastmod: LASTMOD },
    { loc: `${BASE}/faq`, changefreq: "monthly", priority: 0.7, lastmod: LASTMOD },
    { loc: `${BASE}/playground`, changefreq: "monthly", priority: 0.7, lastmod: LASTMOD },
    { loc: `${BASE}/licenses`, changefreq: "monthly", priority: 0.6, lastmod: LASTMOD },
    { loc: `${BASE}/licenses/lacspace-free-1.0`, changefreq: "monthly", priority: 0.6, lastmod: LASTMOD },
    ...PKG_URLS,
  ]) as MetadataRoute.Sitemap;
}
