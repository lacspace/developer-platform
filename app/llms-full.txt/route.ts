import { llmsFullTxtResponse } from "@lacspace/llms-txt";
import { CATALOG } from "../lib/catalog";
import { DETAILS } from "../lib/pkg-detail";

export const dynamic = "force-static";

export function GET() {
  const sections = CATALOG.flatMap((g) =>
    g.items.map((p) => {
      const d = DETAILS[p.n];
      const parts = [p.d];
      if (d?.exports.length) parts.push(`Exports: ${d.exports.join(", ")}.`);
      if (d?.usage) parts.push("```ts\n" + d.usage + "\n```");
      parts.push(`Install: npm i @lacspace/${p.n}`);
      return {
        title: `@lacspace/${p.n} (${g.group})`,
        url: `https://developer.lacspace.com/packages/${p.n}`,
        content: parts.join("\n\n"),
      };
    })
  );
  return llmsFullTxtResponse(
    {
      title: "Lacspace Developer Platform — full package reference",
      summary:
        "Every @lacspace package: description, exports, a usage example and the install command. Zero-dependency, isomorphic TypeScript; free under the Lacspace Free Licence.",
      sections,
    },
    { headers: { "cache-control": "public, max-age=3600, s-maxage=86400" } }
  );
}
