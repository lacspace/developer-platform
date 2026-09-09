/**
 * GET|POST /api/v1/brand-kit — a whole brand identity as a downloadable ZIP.
 * Params: name (required), keywords, seed.
 * Returns application/zip: svg/ lockups + favicon, png/ rasters, brand.css, colors.json, README.
 */
import { generateBrandKit, type LogoBrief } from "@lacspace/logo";
import { rasterizeSvg, encode } from "@lacspace/image";
import { guard, readParams, err, bin, optionsResponse, zip, str } from "../_lib";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function OPTIONS() {
  return optionsResponse();
}

async function png(svg: string, size: number): Promise<Uint8Array | null> {
  try {
    // derive height from the svg's viewBox aspect
    const m = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
    const aw = m ? Number(m[1]) : size;
    const ah = m ? Number(m[2]) : size;
    const w = size;
    const h = Math.round((size * ah) / aw);
    const surface = await rasterizeSvg(svg, { width: w, height: h });
    const out = await encode(surface, { format: "png" });
    return out.bytes;
  } catch {
    return null;
  }
}

async function handle(req: Request): Promise<Response> {
  const blocked = guard(req);
  if (blocked) return blocked;

  const p = await readParams(req);
  if (!p.name || !p.name.trim()) return err(400, "missing_name", "A `name` is required.");

  const brief: LogoBrief = { name: p.name, keywords: p.keywords };
  if (p.seed) brief.seed = Number(p.seed) || 0;

  let kit;
  try {
    kit = generateBrandKit(brief);
  } catch (e) {
    return err(400, "generate_failed", e instanceof Error ? e.message : "Could not generate a brand kit for that brief.");
  }

  const [pPrimary, pStacked, pMark, pWordmark, pMono, pIcon512, pIcon256] = await Promise.all([
    png(kit.primary.svg, 1600), png(kit.stacked.svg, 1024), png(kit.mark.svg, 1024),
    png(kit.wordmark.svg, 1600), png(kit.mono.svg, 1024), png(kit.mark.svg, 512), png(kit.mark.svg, 256),
  ]);

  const files: { name: string; data: Uint8Array }[] = [
    { name: "svg/logo-primary.svg", data: str(kit.primary.svg) },
    { name: "svg/logo-stacked.svg", data: str(kit.stacked.svg) },
    { name: "svg/logo-mark.svg", data: str(kit.mark.svg) },
    { name: "svg/logo-wordmark.svg", data: str(kit.wordmark.svg) },
    { name: "svg/logo-mono.svg", data: str(kit.mono.svg) },
    { name: "svg/favicon.svg", data: str(kit.favicon.svg) },
    { name: "brand.css", data: str(kit.css) },
    { name: "colors.json", data: str(JSON.stringify(kit.colors, null, 2)) },
    { name: "README.txt", data: str(`${kit.name} brand kit — generated with the Lacspace Media API (no AI).\n\nPalette: ${kit.palette.name}\nType: ${kit.font.display} / ${kit.font.body}\n\nsvg/  scalable lockups + favicon\npng/  transparent rasters (1600px lockups, 1024/512/256 icons)\n`) },
  ];
  for (const [name, data] of [
    ["png/logo-primary.png", pPrimary], ["png/logo-stacked.png", pStacked], ["png/logo-mark.png", pMark],
    ["png/logo-wordmark.png", pWordmark], ["png/logo-mono.png", pMono], ["png/icon-512.png", pIcon512], ["png/icon-256.png", pIcon256],
  ] as const) {
    if (data) files.push({ name, data });
  }

  return bin(zip(files), "application/zip", `${slug(p.name)}-brand-kit.zip`);
}

const slug = (s: string) => s.trim().replace(/\s+/g, "-").toLowerCase().replace(/[^a-z0-9-]/g, "") || "brand";

export const GET = handle;
export const POST = handle;
