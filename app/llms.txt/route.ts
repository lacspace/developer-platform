import { llmsTxtResponse } from "@lacspace/llms-txt";
import { CATALOG } from "../lib/catalog";

export const dynamic = "force-static";

export function GET() {
  return llmsTxtResponse(
    {
      title: "Lacspace Developer Platform",
      summary:
        "63 zero-dependency, isomorphic TypeScript packages, the create-lacspace-app CLI, and the docs to build with them.",
      details:
        "All packages are published under the @lacspace npm org, ship dual ESM + CJS with TypeScript types, and are free under the Lacspace Free Licence. Anything cryptographic uses Web Crypto.",
      sections: [
        {
          title: "Start here",
          links: [
            { title: "Developer handbook", url: "https://developer.lacspace.com/handbook", notes: "install, use, integrate, upgrade" },
            { title: "All packages", url: "https://developer.lacspace.com/packages", notes: "the full 63-package catalog" },
            { title: "Live templates", url: "https://templates.lacspace.com", notes: "8 finished Next.js apps" },
            { title: "create-lacspace-app", url: "https://www.npmjs.com/package/create-lacspace-app", notes: "scaffold a finished app" },
          ],
        },
        ...CATALOG.map((g) => ({
          title: g.group,
          links: g.items.map((p) => ({
            title: `@lacspace/${p.n}`,
            url: `https://www.npmjs.com/package/@lacspace/${p.n}`,
            notes: p.d,
          })),
        })),
      ],
    },
    { headers: { "cache-control": "public, max-age=3600, s-maxage=86400" } }
  );
}
