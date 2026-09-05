"use client";

import { useState } from "react";

type Item = { label: string; href: string; desc?: string; external?: boolean };
type Menu = { label: string; href?: string; items: Item[] };

const MENUS: Menu[] = [
  {
    label: "Packages",
    href: "/packages",
    items: [
      { label: "All 76 packages", href: "/packages", desc: "The full catalog" },
      { label: "Security Kit", href: "/packages?kit=Security+Kit", desc: "crypto · jwt · otp · passkeys" },
      { label: "SEO Kit", href: "/packages?kit=SEO+Kit", desc: "seo · sitemap · robots · og" },
      { label: "React Kit", href: "/packages?kit=React+Kit", desc: "store · query · theme · hooks" },
      { label: "App & Utils Kit", href: "/packages?kit=App+%26+Utils+Kit", desc: "validate · money · id · cache" },
      { label: "Backend Kit", href: "/packages?kit=Backend+Kit", desc: "signed-url · pdf · webhooks" },
      { label: "Mail Kit", href: "/packages?kit=Mail+Kit", desc: "mailer · templates · validate" },
      { label: "StockKit", href: "/packages?kit=StockKit", desc: "indicators · market · paper-trade" },
      { label: "Commerce & Ledger", href: "/packages?kit=Commerce+%26+Ledger", desc: "cart · inventory · commission · tax" },
      { label: "Nepal Payments", href: "/packages?kit=Nepal+Payments", desc: "esewa · khalti · connectips · fonepay" },
    ],
  },
  {
    label: "Docs",
    href: "/docs",
    items: [
      { label: "Documentation home", href: "/docs", desc: "Start here" },
      { label: "Developer handbook", href: "/handbook", desc: "Guides & runnable recipes" },
      { label: "Live playground", href: "/playground", desc: "Run any package in your browser" },
      { label: "Compare", href: "/compare", desc: "@lacspace vs the usual deps" },
      { label: "PDF handbook", href: "/docs/pdf", desc: "Download the full guide" },
      { label: "Upgrade guide", href: "/handbook#upgrading", desc: "Semver & migration" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Scaffold an app", href: "/create-app", desc: "create-lacspace-app" },
      { label: "Live templates", href: "https://templates.lacspace.com", desc: "8 finished Next.js apps", external: true },
      { label: "Free Licence", href: "/licenses/lacspace-free-1.0", desc: "Permissive — use, ship, modify" },
      { label: "GitHub", href: "https://github.com/lacspace/npm-packages", desc: "Source & issues", external: true },
      { label: "npm org", href: "https://www.npmjs.com/org/lacspace", desc: "All packages on npm", external: true },
      { label: "lacspace.com", href: "https://lacspace.com", desc: "The company", external: true },
    ],
  },
];

function ext(i: Item) {
  return i.external ? { target: "_blank", rel: "noopener" } : {};
}

export function DevHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a className="brand" href="/" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="brand-mark" src="/brand/mark.png" alt="Lacspace" width={26} height={26} />
          <span>Lacspace <span className="brand-sub">Developer</span></span>
        </a>

        <nav className="nav-links nav-drop">
          {MENUS.map((m) => (
            <div className="nav-item" key={m.label}>
              {m.href ? (
                <a href={m.href} className="nav-trigger">{m.label} <span aria-hidden className="caret">▾</span></a>
              ) : (
                <button className="nav-trigger" aria-haspopup="true">{m.label} <span aria-hidden className="caret">▾</span></button>
              )}
              <div className="nav-menu">
                <div className="nav-menu-card">
                  {m.items.map((i) => (
                    <a key={i.label} href={i.href} {...ext(i)} className="nav-menu-a">
                      <span className="nav-menu-t">{i.label}{i.external && <span aria-hidden className="ext"> ↗</span>}</span>
                      {i.desc && <span className="nav-menu-d">{i.desc}</span>}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <a className="nav-cta" href="/playground">Playground ▸</a>
        </nav>

        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <span data-open={open} /><span data-open={open} /><span data-open={open} />
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          {MENUS.map((m) => (
            <div key={m.label} className="mm-group">
              <div className="mm-h">{m.label}</div>
              {m.items.map((i) => (
                <a key={i.label} href={i.href} onClick={() => setOpen(false)} {...ext(i)}>
                  {i.label}{i.external && <span aria-hidden> ↗</span>}
                </a>
              ))}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
