/**
 * GET /css/v1 — the component kit as a themed stylesheet.
 *
 * Rewritten from /css/v1 in next.config.mjs, so the public URL has no /api in
 * it. `v1` pins the major version of the kit: the bytes behind a given query
 * string may gain fixes, but nothing in it will break a page that already
 * links to it.
 */
import { CSS_SOURCES, CSS_VERSIONS } from "../../../lib/css-sources.generated";
import { buildCss, canonicalQuery, parseRequest, PACKS, type Pack } from "../../../lib/css-cdn";

// A stylesheet every page of a site waits on belongs as close to the reader as
// possible; the handler is pure string work over Web APIs, so it runs on the edge.
export const runtime = "edge";

const sources = CSS_SOURCES as Record<Pack, string>;
const versions = CSS_VERSIONS as Record<Pack, string>;

/** A weak hash of the inputs — enough to answer "has this changed?". */
function etagOf(input: string): string {
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;
  for (let i = 0; i < input.length; i += 1) {
    const c = input.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 16777619) >>> 0;
    h2 = Math.imul(h2 + c, 2246822519) >>> 0;
  }
  return `W/"${h1.toString(36)}${h2.toString(36)}"`;
}

export function GET(request: Request): Response {
  const url = new URL(request.url);
  const req = parseRequest(url.searchParams);
  const query = canonicalQuery(req);

  // The response depends only on the canonical query and the package versions,
  // so both are the whole cache key.
  const stamp = PACKS.map((p) => `${p}@${versions[p] ?? "?"}`).join(",");
  const etag = etagOf(`${query}|${stamp}`);

  const headers: Record<string, string> = {
    "content-type": "text/css; charset=utf-8",
    // Long at the edge, short in the browser: a fix reaches everyone on the
    // next purge without anybody holding a stale file for a year.
    "cache-control": "public, max-age=3600, s-maxage=604800, stale-while-revalidate=86400",
    etag,
    vary: "Accept-Encoding",
    "access-control-allow-origin": "*",
    "x-content-type-options": "nosniff",
    "x-lacspace-css": stamp,
  };

  if (request.headers.get("if-none-match") === etag) {
    return new Response(null, { status: 304, headers });
  }

  const css = buildCss({ req, sources, versions });
  headers["content-length"] = String(new TextEncoder().encode(css).byteLength);
  return new Response(css, { status: 200, headers });
}

export function OPTIONS(): Response {
  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, OPTIONS",
      "access-control-max-age": "86400",
    },
  });
}
