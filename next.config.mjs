/** @type {import('next').NextConfig} */
const nextConfig = {
  // The CSS CDN is served from /css/v1 — a stylesheet people paste into a
  // <link>, so it should not have /api in the middle of it. beforeFiles keeps
  // it ahead of the /css page that documents it.
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/css/v1", destination: "/api/css/v1" },
        { source: "/css/preview", destination: "/api/css/preview" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
