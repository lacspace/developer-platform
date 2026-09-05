import { defineSite } from "@lacspace/seo";

/**
 * One brand config → every page's metadata + JSON-LD is a one-liner.
 * This site dogfoods @lacspace/seo (defineSite), @lacspace/og, @lacspace/sitemap,
 * @lacspace/robots, @lacspace/rss and @lacspace/llms-txt.
 */
export const site = defineSite({
  name: "Lacspace Developer",
  url: "https://developer.lacspace.com",
  description:
    "63 zero-dependency, isomorphic TypeScript packages, the create-lacspace-app CLI, and the docs to build with them.",
  logo: "https://developer.lacspace.com/icon-512.png",
  twitter: "lacspace",
  ogImage: "/og",
  defaultImage: "/brand/og-default.png",
  searchUrl: "https://developer.lacspace.com/packages?q={search_term_string}",
});
