import type { MetadataRoute } from "next";
import { toNextRobots } from "@lacspace/robots";

// Developer docs want to be found — by search engines AND by LLMs (see /llms.txt).
export default function robots(): MetadataRoute.Robots {
  return toNextRobots({
    groups: [{ userAgent: "*", allow: ["/"], disallow: ["/api"] }],
    sitemap: "https://developer.lacspace.com/sitemap.xml",
    host: "developer.lacspace.com",
  }) as MetadataRoute.Robots;
}
