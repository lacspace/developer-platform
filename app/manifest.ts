import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lacspace Developer Platform",
    short_name: "Lacspace Dev",
    description:
      "80 zero-dependency TypeScript packages, a scaffolding CLI, and the docs to build with them.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A101C",
    theme_color: "#0A101C",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    categories: ["developer", "productivity", "technology"],
  };
}
