/**
 * GET|POST /api/v1/image — generate a raster image without AI.
 * Params: width, height, type=gradient|radial|pattern|mesh|placeholder,
 *         colors (comma hex), angle, pattern (checker|grid|dots|stripes|noise),
 *         seed, format=png|jpeg|webp, maxSize (e.g. "200kb" — binary-search to fit).
 */
import { gradient, radial, pattern, mesh, placeholder, encode, fit, type Surface } from "@lacspace/image";
import { guard, readParams, err, bin, optionsResponse } from "../_lib";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function OPTIONS() {
  return optionsResponse();
}

type PatternKind = "checker" | "grid" | "dots" | "stripes" | "noise";
const PATTERNS: PatternKind[] = ["checker", "grid", "dots", "stripes", "noise"];

async function handle(req: Request): Promise<Response> {
  const blocked = guard(req);
  if (blocked) return blocked;

  const p = await readParams(req);
  const w = clamp(Number(p.width) || 1200, 16, 4096);
  const h = clamp(Number(p.height) || 630, 16, 4096);
  const type = (p.type || "gradient").toLowerCase();
  const colors = (p.colors || "#0BB9D9,#3B82F6,#7C3AED").split(",").map((c) => c.trim()).filter(Boolean);
  const stops = colors.map((color, i) => ({ offset: colors.length === 1 ? 1 : i / (colors.length - 1), color }));
  const seed = p.seed ?? p.name ?? "lacspace";

  let surface: Surface;
  try {
    if (type === "radial") surface = radial(w, h, { stops });
    else if (type === "pattern") {
      const kind = (PATTERNS.includes(p.pattern as PatternKind) ? p.pattern : "dots") as PatternKind;
      surface = pattern(w, h, colors[0] || "#0BB9D9", kind, { color: colors[1] || "#3B82F6" });
    } else if (type === "mesh") surface = mesh(w, h, { seed });
    else if (type === "placeholder") surface = placeholder(w, h, { seed });
    else surface = gradient(w, h, { angle: Number(p.angle) || 90, stops });
  } catch (e) {
    return err(400, "build_failed", e instanceof Error ? e.message : "Could not build that image.");
  }

  const format = ((["png", "jpeg", "jpg", "webp"].includes((p.format || "").toLowerCase()) ? p.format : "png") as string)
    .toLowerCase()
    .replace("jpg", "jpeg") as "png" | "jpeg" | "webp";

  try {
    const out = p.maxSize
      ? await fit(surface, { format, maxSize: p.maxSize })
      : await encode(surface, { format, quality: p.quality ? Number(p.quality) : undefined });
    return bin(out.bytes, `image/${format === "jpeg" ? "jpeg" : format}`, `lacspace-image.${format === "jpeg" ? "jpg" : format}`);
  } catch (e) {
    return err(500, "encode_failed", e instanceof Error ? e.message : "Encoding failed.");
  }
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, Math.round(v)));

export const GET = handle;
export const POST = handle;
