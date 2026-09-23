/**
 * The CSS CDN — the component kit as a stylesheet you can <link> to, themed at
 * the edge.
 *
 * The kit is already built entirely on `--lac-*` variables, so a theme is just
 * one extra block of declarations. That means we can serve a *branded* build of
 * it from a URL, with no npm, no bundler and no build step — which reaches the
 * enormous audience that never installs a React package: plain HTML, WordPress,
 * Rails, Django, Laravel.
 *
 * Everything in this module is a pure function of the query string, so the
 * response is fully cacheable and testable without a server.
 *
 * SECURITY: not one character of user input is ever echoed into the CSS. Every
 * value is parsed into a number or matched against an allowlist and re-emitted
 * from our own literals. A stylesheet served from our own origin that let a
 * caller inject arbitrary declarations would be a defacement vector.
 */

/* ------------------------------------------------------------------ *
 * What can be asked for
 * ------------------------------------------------------------------ */

/** The component stylesheet is authored in numbered parts; each is a family. */
export const PARTS = ["base", "overlay", "navigation", "display", "form", "layout"] as const;
export type Part = (typeof PARTS)[number];

/** Part name → the source file it was concatenated from. `base` is mandatory. */
const PART_FILE: Record<Part, string> = {
  base: "00-base.css",
  overlay: "10-overlay.css",
  navigation: "20-navigation.css",
  display: "30-display.css",
  form: "40-form.css",
  layout: "50-layout.css",
};

export const PACKS = ["components", "charts", "table", "date"] as const;
export type Pack = (typeof PACKS)[number];

/**
 * How the caller's app switches to dark.
 *
 * - `media` — the kit's own behaviour: the OS preference, overridable with a
 *   `data-theme` attribute.
 * - `class` — a `.dark` class on any ancestor. What Tailwind projects use, and
 *   what our own scaffolder generates.
 * - `attr` — only an explicit `data-theme="dark"`; ignores the OS.
 * - `off` — light only. Half the file, for a site that has no dark mode.
 */
export const DARK_MODES = ["media", "class", "attr", "off"] as const;
export type DarkMode = (typeof DARK_MODES)[number];

/** Font stacks we are willing to emit. Never the caller's own text. */
const FONTS = {
  system: { stack: `ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`, google: null },
  inter: { stack: `"Inter", ui-sans-serif, system-ui, sans-serif`, google: "Inter:wght@400;500;600;700" },
  manrope: { stack: `"Manrope", ui-sans-serif, system-ui, sans-serif`, google: "Manrope:wght@400;500;600;700" },
  "space-grotesk": { stack: `"Space Grotesk", ui-sans-serif, system-ui, sans-serif`, google: "Space+Grotesk:wght@400;500;600;700" },
  "dm-sans": { stack: `"DM Sans", ui-sans-serif, system-ui, sans-serif`, google: "DM+Sans:wght@400;500;600;700" },
  sora: { stack: `"Sora", ui-sans-serif, system-ui, sans-serif`, google: "Sora:wght@400;500;600;700" },
  serif: { stack: `ui-serif, Georgia, "Times New Roman", serif`, google: null },
  mono: { stack: `ui-monospace, SFMono-Regular, Menlo, monospace`, google: null },
} as const;

export type FontKey = keyof typeof FONTS;
export const FONT_KEYS = Object.keys(FONTS) as FontKey[];

/** A fully-validated request. Nothing downstream re-checks anything. */
export interface CssRequest {
  packs: Pack[];
  parts: Part[];
  dark: DarkMode;
  darkClass: string;
  accent: string | null;
  radius: number | null;
  control: number | null;
  font: FontKey | null;
  webfont: boolean;
  minify: boolean;
}

/* ------------------------------------------------------------------ *
 * Parsing — every branch ends in one of our own values
 * ------------------------------------------------------------------ */

const list = (raw: string | null): string[] =>
  (raw ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

/** `#abc` / `abc` / `#aabbcc` → `#aabbcc`, or null. Nothing else is accepted. */
export function parseHex(raw: string | null): string | null {
  if (!raw) return null;
  const hex = raw.trim().replace(/^#/, "").toLowerCase();
  if (/^[0-9a-f]{3}$/.test(hex)) {
    const [r, g, b] = [hex[0], hex[1], hex[2]];
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  if (/^[0-9a-f]{6}$/.test(hex)) return `#${hex}`;
  return null;
}

function parseInt_(raw: string | null, min: number, max: number): number | null {
  if (!raw) return null;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n) || n < min || n > max) return null;
  return n;
}

const truthy = (raw: string | null): boolean =>
  raw !== null && raw !== "0" && raw.toLowerCase() !== "false";

/** Turn a query string into a request. Unknown or malformed values fall back. */
export function parseRequest(params: URLSearchParams): CssRequest {
  const askedPacks = list(params.get("packs") ?? params.get("pack")).filter((p): p is Pack =>
    (PACKS as readonly string[]).includes(p),
  );
  const askedParts = list(params.get("only") ?? params.get("parts")).filter((p): p is Part =>
    (PARTS as readonly string[]).includes(p),
  );
  const darkRaw = (params.get("dark") ?? "").toLowerCase();
  const dark = (DARK_MODES as readonly string[]).includes(darkRaw) ? (darkRaw as DarkMode) : "media";
  const darkClassRaw = params.get("darkClass") ?? params.get("dark-class") ?? "";
  const fontRaw = (params.get("font") ?? "").toLowerCase();

  return {
    packs: askedPacks.length ? unique(askedPacks) : ["components"],
    // `base` holds the tokens every other part refers to, so it is never optional.
    parts: askedParts.length ? unique<Part>(["base", ...askedParts]) : [...PARTS],
    dark,
    darkClass: /^[a-z][a-z0-9_-]{0,30}$/i.test(darkClassRaw) ? darkClassRaw : "dark",
    accent: parseHex(params.get("accent")),
    radius: parseInt_(params.get("radius"), 0, 40),
    control: parseInt_(params.get("control"), 24, 72),
    font: (FONT_KEYS as string[]).includes(fontRaw) ? (fontRaw as FontKey) : null,
    webfont: truthy(params.get("webfont")),
    minify: params.get("pretty") === null,
  };
}

function unique<T>(items: T[]): T[] {
  return [...new Set(items)];
}

/** The canonical query string for a request — the cache key, and what the builder shows. */
export function canonicalQuery(req: CssRequest): string {
  const q = new URLSearchParams();
  if (req.packs.length !== 1 || req.packs[0] !== "components") q.set("packs", req.packs.join(","));
  if (req.parts.length !== PARTS.length) q.set("only", req.parts.filter((p) => p !== "base").join(","));
  if (req.dark !== "media") q.set("dark", req.dark);
  if (req.darkClass !== "dark") q.set("darkClass", req.darkClass);
  if (req.accent) q.set("accent", req.accent);
  if (req.radius !== null) q.set("radius", String(req.radius));
  if (req.control !== null) q.set("control", String(req.control));
  if (req.font) q.set("font", req.font);
  if (req.webfont) q.set("webfont", "1");
  if (!req.minify) q.set("pretty", "1");
  return q.toString();
}

/* ------------------------------------------------------------------ *
 * A small, string-aware CSS walker
 * ------------------------------------------------------------------ */

/**
 * Strip comments without touching quoted text.
 *
 * Naive comment removal breaks on `content: "/*"`, and our own stylesheet
 * documents its theme selectors *inside* comments — so a later search for
 * `[data-theme="dark"]` would match the prose and mangle the file.
 */
export function stripComments(css: string): string {
  let out = "";
  let i = 0;
  while (i < css.length) {
    const ch = css[i]!;
    if (ch === '"' || ch === "'") {
      const quote = ch;
      let j = i + 1;
      while (j < css.length && css[j] !== quote) j += css[j] === "\\" ? 2 : 1;
      out += css.slice(i, Math.min(j + 1, css.length));
      i = j + 1;
      continue;
    }
    if (ch === "/" && css[i + 1] === "*") {
      const end = css.indexOf("*/", i + 2);
      i = end === -1 ? css.length : end + 2;
      continue;
    }
    out += ch;
    i += 1;
  }
  return out;
}

interface Block {
  /** Everything before the `{` — a selector list or an at-rule prelude. */
  prelude: string;
  /** Everything between the braces. */
  body: string;
  start: number;
  end: number;
}

/** Walk the top-level blocks of a stylesheet, brace- and string-aware. */
export function topLevelBlocks(css: string): Block[] {
  const blocks: Block[] = [];
  let i = 0;
  let preludeStart = 0;
  while (i < css.length) {
    const ch = css[i]!;
    if (ch === '"' || ch === "'") {
      const quote = ch;
      i += 1;
      while (i < css.length && css[i] !== quote) i += css[i] === "\\" ? 2 : 1;
      i += 1;
      continue;
    }
    if (ch === "{") {
      const prelude = css.slice(preludeStart, i).trim();
      let depth = 1;
      let j = i + 1;
      while (j < css.length && depth > 0) {
        const c = css[j]!;
        if (c === '"' || c === "'") {
          const quote = c;
          j += 1;
          while (j < css.length && css[j] !== quote) j += css[j] === "\\" ? 2 : 1;
        } else if (c === "{") depth += 1;
        else if (c === "}") depth -= 1;
        j += 1;
      }
      blocks.push({ prelude, body: css.slice(i + 1, j - 1), start: preludeStart, end: j });
      i = j;
      preludeStart = j;
      continue;
    }
    i += 1;
  }
  return blocks;
}

/* ------------------------------------------------------------------ *
 * The transforms
 * ------------------------------------------------------------------ */

/** Keep only the requested families. `base` carries the tokens, so it always stays. */
export function subset(css: string, parts: Part[]): string {
  const wanted = new Set(parts.map((p) => PART_FILE[p]));
  const pieces = css.split(/\/\* ---- (\S+) ---- \*\//);
  // Nothing matched — the stylesheet is not part-marked (charts, table, date).
  if (pieces.length < 3) return css;
  let out = "";
  for (let i = 1; i < pieces.length; i += 2) {
    if (wanted.has(pieces[i]!)) out += pieces[i + 1] ?? "";
  }
  return out;
}

/**
 * Re-point the kit's dark theme at whatever the caller's app already uses.
 *
 * This is the part that makes the endpoint worth having. A stylesheet whose
 * dark mode follows the OS is useless to an app with its own toggle — the two
 * disagree the moment somebody on a dark laptop picks light.
 */
export function applyDarkMode(css: string, mode: DarkMode, darkClass: string): string {
  if (mode === "media") return css;

  const blocks = topLevelBlocks(css);
  let out = "";
  let cursor = 0;
  for (const block of blocks) {
    const isOsDark =
      block.prelude.startsWith("@media") && /prefers-color-scheme\s*:\s*dark/.test(block.prelude);
    const isAttrDark = block.prelude.includes('[data-theme="dark"]');
    if (!isOsDark && !isAttrDark) continue;

    out += css.slice(cursor, block.start);
    cursor = block.end;

    // The OS block only ever holds the same dark tokens, so any mode that is
    // driven by the app drops it — keeping it is exactly the bug where a light
    // app on a dark laptop renders dark components.
    if (isOsDark) continue;
    if (mode === "off") continue;
    const prelude =
      mode === "class" ? block.prelude.replaceAll('[data-theme="dark"]', `.${darkClass}`) : block.prelude;
    out += `${prelude}{${block.body}}`;
  }
  out += css.slice(cursor);
  return out;
}

/** Relative luminance, so a caller's accent gets readable text on top of it. */
function luminance(hex: string): number {
  const channel = (v: number): number => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const n = hex.slice(1);
  const r = Number.parseInt(n.slice(0, 2), 16);
  const g = Number.parseInt(n.slice(2, 4), 16);
  const b = Number.parseInt(n.slice(4, 6), 16);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/**
 * The caller's theme, as one block of declarations.
 *
 * The tripled `:root` is deliberate. The kit redefines these same tokens inside
 * its dark blocks, and those are more specific than a bare `:root` — without
 * the extra weight, a caller's accent would silently vanish in dark mode.
 */
export function themeBlock(req: CssRequest): string {
  const decls: string[] = [];

  if (req.accent) {
    const a = req.accent;
    decls.push(`--lac-accent:${a}`);
    decls.push(`--lac-accent-hover:color-mix(in oklab,${a} 86%,#000)`);
    decls.push(`--lac-accent-active:color-mix(in oklab,${a} 74%,#000)`);
    decls.push(`--lac-accent-soft:color-mix(in oklab,${a} 14%,transparent)`);
    decls.push(`--lac-accent-ring:color-mix(in oklab,${a} 38%,transparent)`);
    // Pick the label colour the accent can actually carry.
    decls.push(`--lac-accent-fg:${luminance(a) > 0.45 ? "#0a0a0f" : "#ffffff"}`);
    decls.push(`--lac-fg-on-accent:${luminance(a) > 0.45 ? "#0a0a0f" : "#ffffff"}`);
  }

  if (req.radius !== null) {
    const r = req.radius;
    decls.push(`--lac-radius:${r}px`);
    decls.push(`--lac-radius-sm:${Math.max(0, Math.round(r * 0.6))}px`);
    decls.push(`--lac-radius-lg:${Math.round(r * 1.45)}px`);
    decls.push(`--lac-radius-xl:${Math.round(r * 2)}px`);
  }

  if (req.control !== null) {
    const h = req.control;
    decls.push(`--lac-control-h-sm:${Math.round(h * 0.82)}px`);
    decls.push(`--lac-control-h-md:${h}px`);
    decls.push(`--lac-control-h-lg:${Math.round(h * 1.18)}px`);
  }

  if (req.font) decls.push(`--lac-font:${FONTS[req.font].stack}`);

  return decls.length ? `:root:root:root{${decls.join(";")}}` : "";
}

/** The Google Fonts import for a requested webfont, or "". */
export function fontImport(req: CssRequest): string {
  if (!req.font || !req.webfont) return "";
  const spec = FONTS[req.font].google;
  if (!spec) return "";
  // @import has to come before every rule, which is why this is prepended last.
  return `@import url("https://fonts.googleapis.com/css2?family=${spec}&display=swap");\n`;
}

/* ------------------------------------------------------------------ *
 * Minifying
 * ------------------------------------------------------------------ */

/**
 * A conservative, string-aware minifier: collapse whitespace, drop the spaces
 * around punctuation and the last semicolon in a block. It never touches the
 * inside of a quoted string, so `content: "→ "` survives.
 */
export function minify(css: string): string {
  let out = "";
  let i = 0;
  while (i < css.length) {
    const ch = css[i]!;
    if (ch === '"' || ch === "'") {
      const quote = ch;
      let j = i + 1;
      while (j < css.length && css[j] !== quote) j += css[j] === "\\" ? 2 : 1;
      out += css.slice(i, Math.min(j + 1, css.length));
      i = j + 1;
      continue;
    }
    if (/\s/.test(ch)) {
      // One space is enough, and only where it could still separate two tokens.
      let j = i;
      while (j < css.length && /\s/.test(css[j]!)) j += 1;
      const prev = out[out.length - 1] ?? "";
      const next = css[j] ?? "";
      if (prev && next && !"{};:,>+~()".includes(prev) && !"{};:,>+~()".includes(next)) out += " ";
      i = j;
      continue;
    }
    if (ch === ";") {
      // Drop `;}` and runs of semicolons.
      let j = i;
      while (j < css.length && /[\s;]/.test(css[j]!)) j += 1;
      if (css[j] === "}") {
        i = j;
        continue;
      }
      out += ";";
      i = j;
      continue;
    }
    out += ch;
    i += 1;
  }
  return out.trim();
}

/* ------------------------------------------------------------------ *
 * Putting it together
 * ------------------------------------------------------------------ */

export interface BuildInput {
  req: CssRequest;
  /** The published stylesheet of each pack, by name. */
  sources: Record<Pack, string>;
  /** Package versions, for the banner and the ETag. */
  versions: Record<Pack, string>;
}

/** Build the stylesheet for one request. Pure: same input, same bytes. */
export function buildCss({ req, sources, versions }: BuildInput): string {
  const chunks: string[] = [];
  for (const pack of req.packs) {
    // Subset FIRST: the part markers are comments, so stripping them first
    // would leave nothing to slice on and quietly serve the whole file.
    const raw = sources[pack] ?? "";
    const scoped = pack === "components" ? subset(raw, req.parts) : raw;
    chunks.push(applyDarkMode(stripComments(scoped), req.dark, req.darkClass));
  }
  chunks.push(themeBlock(req));

  const body = req.minify ? minify(chunks.join("\n")) : chunks.join("\n");
  const stamp = req.packs.map((p) => `${p}@${versions[p] ?? "?"}`).join(" ");
  const banner = `/*! Lacspace CSS — ${stamp} · developer.lacspace.com/css · Lacspace Free Licence v1.0 */\n`;
  return fontImport(req) + banner + body + "\n";
}
