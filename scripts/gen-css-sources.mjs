/**
 * Inline the four published stylesheets into a TypeScript module.
 *
 * The CSS CDN route needs the bytes at request time. It cannot import them from
 * the packages: those ship `"use client"`, so importing their root from a
 * server route would hand back client references rather than the strings. And
 * reading node_modules from disk at runtime is not something a serverless
 * bundle can be relied on to carry. Inlining at build time removes both
 * problems — the CSS is simply part of the bundle.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const packs = ["components", "charts", "table", "date"];

const css = {};
const versions = {};
for (const pack of packs) {
  const dir = join(root, "node_modules", "@lacspace", pack);
  css[pack] = await readFile(join(dir, "dist/styles.css"), "utf8");
  versions[pack] = JSON.parse(await readFile(join(dir, "package.json"), "utf8")).version;
}

const out = `// GENERATED FILE — run scripts/gen-css-sources.mjs. Do not edit.
// The published stylesheets of the four kit packages, inlined so the CSS CDN
// route can serve them with no filesystem access at request time.

export const CSS_SOURCES: Record<string, string> = ${JSON.stringify(css, null, 0)};

export const CSS_VERSIONS: Record<string, string> = ${JSON.stringify(versions, null, 2)};
`;

await mkdir(join(root, "app/lib"), { recursive: true });
await writeFile(join(root, "app/lib/css-sources.generated.ts"), out);
const total = Object.values(css).reduce((n, s) => n + s.length, 0);
console.log(`inlined ${packs.length} stylesheets (${total} bytes):`, JSON.stringify(versions));
