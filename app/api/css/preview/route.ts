/**
 * GET /css/preview — a tiny HTML document that links the CDN stylesheet.
 *
 * The builder embeds this in an iframe. It could have rendered React previews
 * inline instead, but that would prove the wrong thing: the claim is "one link
 * tag in a plain HTML page", so the demo is a plain HTML page with one link tag
 * and no JavaScript at all.
 */
import { canonicalQuery, parseRequest } from "../../../lib/css-cdn";

// A stylesheet every page of a site waits on belongs as close to the reader as
// possible; the handler is pure string work over Web APIs, so it runs on the edge.
export const runtime = "edge";

export function GET(request: Request): Response {
  const url = new URL(request.url);
  const req = parseRequest(url.searchParams);
  // Re-serialised from the parsed request, so nothing a caller sent is echoed.
  const href = `/css/v1${canonicalQuery(req) ? `?${canonicalQuery(req)}` : ""}`;
  const rootClass = req.dark === "class" ? ` class="${req.darkClass}"` : "";
  const rootAttr = req.dark === "attr" ? ` data-theme="dark"` : "";

  const html = `<!doctype html>
<html lang="en"${rootClass}${rootAttr}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Lacspace CSS preview</title>
<link rel="stylesheet" href="${href}">
<style>
  html { color-scheme: light dark; }
  body { margin: 0; padding: 22px; background: var(--lac-bg); font-family: var(--lac-font); }
  .row { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-bottom: 16px; }
  .grid { display: grid; gap: 16px; grid-template-columns: minmax(0, 1fr); }
  @media (min-width: 620px) { .grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); } }
</style>
</head>
<body class="lac">
  <div class="row">
    <button class="lac lac-btn" data-variant="solid" data-size="md">Save changes</button>
    <button class="lac lac-btn" data-variant="outline" data-size="md">Cancel</button>
    <button class="lac lac-btn" data-variant="soft" data-tone="danger" data-size="md">Delete</button>
    <button class="lac lac-btn" data-variant="ghost" data-size="sm">Ghost</button>
  </div>

  <div class="row">
    <span class="lac lac-badge" data-tone="success" data-variant="soft"><span class="lac-badge-dot"></span>Live</span>
    <span class="lac lac-badge" data-tone="warning" data-variant="soft">Pending</span>
    <span class="lac lac-badge" data-tone="info" data-variant="soft">Beta</span>
    <span class="lac lac-badge" data-tone="default" data-variant="outline">Draft</span>
  </div>

  <div class="grid">
    <div class="lac lac-card">
      <div class="lac-card-header">
        <h3 class="lac-card-title">Account</h3>
        <p class="lac-card-desc">No React, no npm, no build step.</p>
      </div>
      <div class="lac-card-body">
        <div class="lac lac-field">
          <label class="lac lac-label" for="e">Work email</label>
          <input class="lac lac-input" id="e" data-size="md" value="you@company.com">
          <span class="lac lac-hint">We never share it.</span>
        </div>
        <div class="lac lac-field" style="margin-top:14px">
          <label class="lac lac-label" for="p">Plan</label>
          <select class="lac lac-select" id="p" data-size="md"><option>Pro</option><option>Team</option></select>
        </div>
        <div style="margin-top:16px">
          <button class="lac lac-btn" data-variant="solid" data-size="md" data-full="true" style="width:100%">Continue</button>
        </div>
      </div>
    </div>

    <div>
      <div class="lac lac-alert" data-tone="info" style="margin-bottom:16px">
        <div style="min-width:0;flex:1">
          <p class="lac-alert-title">Themed at the edge</p>
          <div class="lac-alert-body">Every value in this frame came from the query string.</div>
        </div>
      </div>
      <div class="lac lac-card">
        <div class="lac-card-body">
          <label class="lac lac-check"><input type="checkbox" checked><span>Email me about updates</span></label>
          <label class="lac lac-check" style="margin-top:10px"><input type="checkbox"><span>Share anonymous usage</span></label>
          <div class="lac lac-progress" role="progressbar" aria-valuenow="64" aria-valuemin="0" aria-valuemax="100" style="margin-top:18px">
            <div class="lac-progress-bar" style="width:64%"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=600, s-maxage=86400",
      "x-robots-tag": "noindex",
    },
  });
}
