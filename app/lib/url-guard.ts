import { lookup } from "node:dns/promises";

/**
 * Validate a user-supplied URL for the public scrape tester. Blocks anything
 * that isn't a normal public http(s) page — private/loopback/link-local IPs and
 * cloud metadata endpoints — to prevent SSRF. Returns a reason string when the
 * URL should be rejected, or null when it's allowed.
 */
export async function guardUrl(input: string): Promise<{ ok: true; url: URL } | { ok: false; reason: string }> {
  let url: URL;
  try {
    url = new URL(input.trim());
  } catch {
    return { ok: false, reason: "That doesn't look like a valid URL." };
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return { ok: false, reason: "Only http:// and https:// URLs are allowed." };
  }
  const host = url.hostname.toLowerCase();
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") || host.endsWith(".internal")) {
    return { ok: false, reason: "Local/internal hosts are not allowed." };
  }
  // Resolve every A/AAAA record and reject if ANY is private (guards DNS rebinding).
  let addrs: { address: string }[];
  try {
    addrs = await lookup(host, { all: true });
  } catch {
    return { ok: false, reason: "Could not resolve that host." };
  }
  for (const { address } of addrs) {
    if (isPrivateIp(address)) return { ok: false, reason: "That host resolves to a private address." };
  }
  return { ok: true, url };
}

function isPrivateIp(ip: string): boolean {
  // IPv6
  if (ip.includes(":")) {
    const v = ip.toLowerCase();
    if (v === "::1" || v === "::") return true;
    if (v.startsWith("fe80") || v.startsWith("fc") || v.startsWith("fd")) return true; // link-local, ULA
    // IPv4-mapped IPv6 (::ffff:a.b.c.d)
    const mapped = v.match(/::ffff:(\d+\.\d+\.\d+\.\d+)$/);
    if (mapped) return isPrivateIp(mapped[1]!);
    return false;
  }
  const parts = ip.split(".").map((n) => parseInt(n, 10));
  if (parts.length !== 4 || parts.some((n) => !Number.isFinite(n) || n < 0 || n > 255)) return true;
  const [a, b] = parts as [number, number, number, number];
  if (a === 0 || a === 10 || a === 127) return true; // this-network, private, loopback
  if (a === 169 && b === 254) return true; // link-local + cloud metadata (169.254.169.254)
  if (a === 172 && b >= 16 && b <= 31) return true; // private
  if (a === 192 && b === 168) return true; // private
  if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT
  if (a >= 224) return true; // multicast / reserved
  return false;
}
