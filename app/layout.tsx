import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { site } from "./lib/seo";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.config.url),
  // site.meta()/site.page() already brand each title ("X · Lacspace Developer"),
  // so no template here — otherwise the brand would be appended twice.
  title: {
    default: "Lacspace Developer Platform — 63 packages, one CLI, real docs",
    template: "%s",
  },
  description: site.config.description,
  applicationName: "Lacspace Developer",
  keywords: [
    "Lacspace",
    "npm packages",
    "TypeScript SDK",
    "zero-dependency",
    "create-lacspace-app",
    "Next.js",
    "isomorphic",
    "developer platform",
  ],
  authors: [{ name: "Lacspace", url: "https://lacspace.com" }],
  creator: "Lacspace",
  publisher: "Lacspace",
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/rss.xml",
      "application/atom+xml": "/atom.xml",
      "application/feed+json": "/feed.json",
    },
  },
  openGraph: {
    type: "website",
    url: site.config.url,
    siteName: "Lacspace Developer",
    title: "Lacspace Developer Platform — 63 packages, one CLI, real docs",
    description: site.config.description,
    images: [
      { url: "/brand/og-default.png", width: 1200, height: 630, alt: "Lacspace Developer Platform" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@lacspace",
    creator: "@lacspace",
    title: "Lacspace Developer Platform",
    description: site.config.description,
    images: ["/brand/og-default.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(site.rootJsonLd()) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
