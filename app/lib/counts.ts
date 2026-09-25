/**
 * The catalog size as a plain literal.
 *
 * The header and footer are client components and sit on every page, so if they
 * read the count from `lib/catalog.ts` the whole 1,600-line catalog is pulled
 * into the browser bundle — it cost 22 kB on every route when it was tried.
 * This module exists so that never happens again.
 *
 * It is not a second source of truth: `lib/catalog.ts` counts the real data and
 * throws at build time if this number disagrees with it.
 */
export const PACKAGE_COUNT = 131;
