import { FREE_LICENCE_TEXT } from "../../../lib/licence";

// Raw, verbatim licence text — the copy-paste / curl source of truth.
export function GET() {
  return new Response(FREE_LICENCE_TEXT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
