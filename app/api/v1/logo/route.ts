/**
 * GET|POST /api/v1/logo — generate a logo from a name + keywords (no AI).
 * Params: name (required), keywords, engine, palette, font, shape, background,
 *         seed, size, format=svg|png|json
 * Returns image/svg+xml (default), image/png, or application/json.
 */
import { generateLogo, type LogoBrief } from "@lacspace/logo";
import { rasterizeSvg, encode } from "@lacspace/image";
import { CORS, guard, readParams, err, bin, optionsResponse } from "../_lib";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function OPTIONS() {
  return optionsResponse();
}

async function handle(req: Request): Promise<Response> {
  const blocked = guard(req);
  if (blocked) return blocked;

  const p = await readParams(req);
  if (!p.name || !p.name.trim()) return err(400, "missing_name", "A `name` is required.");

  const brief = { name: p.name, keywords: p.keywords } as Record<string, unknown>;
  for (const k of ["engine", "palette", "font", "shape", "background", "layout", "icon"]) {
    if (p[k]) brief[k] = p[k];
  }
  if (p.seed) brief.seed = Number(p.seed) || 0;

  let result;
  try {
    result = generateLogo(brief as unknown as LogoBrief);
  } catch (e) {
    return err(400, "generate_failed", e instanceof Error ? e.message : "Could not generate a logo for that brief.");
  }

  const format = (p.format || "svg").toLowerCase();

  if (format === "json") {
    return NextResponse.json(
      { svg: result.svg, width: result.width, height: result.height, engine: result.engine, palette: result.palette.id, icon: result.icon, mood: result.mood },
      { headers: CORS },
    );
  }

  if (format === "png") {
    const size = Math.min(2048, Math.max(64, Number(p.size) || 512));
    const w = size;
    const h = Math.round((size * result.height) / result.width);
    try {
      const surface = await rasterizeSvg(result.svg, { width: w, height: h });
      const out = await encode(surface, { format: "png" });
      return bin(out.bytes, "image/png", `${slug(p.name)}-logo.png`);
    } catch (e) {
      return err(500, "raster_failed", "Server-side PNG rasterization failed; request format=svg or try a simpler brief.");
    }
  }

  return bin(new TextEncoder().encode(result.svg), "image/svg+xml", `${slug(p.name)}-logo.svg`);
}

const slug = (s: string) => s.trim().replace(/\s+/g, "-").toLowerCase().replace(/[^a-z0-9-]/g, "") || "logo";

export const GET = handle;
export const POST = handle;
