import { atomResponse } from "@lacspace/rss";
import { FEED, FEED_ITEMS } from "../lib/feed";

export const dynamic = "force-static";

export function GET() {
  return atomResponse(FEED, FEED_ITEMS, {
    headers: { "cache-control": "public, max-age=3600, s-maxage=86400" },
  });
}
