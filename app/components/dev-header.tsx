"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { LogoBuild } from "./logo-build";

type Item = { label: string; href: string; desc?: string; external?: boolean };
type Menu = { label: string; href?: string; items: Item[] };

const MENUS: Menu[] = [
  {
    label: "Packages",
    href: "/packages",
    items: [
      { label: "All 121 packages", href: "/packages", desc: "The full catalog" },
      { label: "Core Runtime Kit", href: "/packages?kit=Core+Runtime+Kit", desc: "logger · result · events · queue · scheduler · machine" },
      { label: "Sheets Kit", href: "/packages?kit=Sheets+Kit", desc: "formula · xlsx · csv · convert" },
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
    label: "Tools",
    href: "/tools",
    items: [
      { label: "All developer tools", href: "/tools", desc: "27 free, keyless CLIs + libraries" },
      { label: "Media API (hosted)", href: "/media-api", desc: "Logos, images & brand kits over HTTP" },
      { label: "lacspace-scraper", href: "/tools/scraper", desc: "Scrape any website → JSON/CSV/Excel" },
      { label: "lacspace-sql", href: "/tools/sql", desc: "SQL over CSV/JSON/Excel files" },
      { label: "lacspace-inspect", href: "/tools/inspect", desc: "Website audit, graded A–F" },
      { label: "Try the scraper live", href: "/tools/scraper/try", desc: "Run it in your browser" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Scaffold an app", href: "/create-app", desc: "create-lacspace-app" },
      { label: "Live templates", href: "https://templates.lacspace.com", desc: "8 finished Next.js apps", external: true },
      { label: "Free Licence", href: "/licenses/lacspace-free-1.0", desc: "Permissive — use, ship, modify" },
      { label: "FAQ", href: "/faq", desc: "Answers about packages & tools" },
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
  const [tick, setTick] = useState(0);
  const pathname = usePathname();

  // Loop the crafting mark in the nav: re-mount it every ~9s to replay the build.
  useEffect(() => {
    const reduce =
      typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => setTick((t) => t + 1), 9000);
    return () => clearInterval(id);
  }, []);

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll + close on Escape while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="nav">
      <div className="wrap nav-inner">
        <a className="brand" href="/" onClick={() => setOpen(false)}>
          <LogoBuild key={tick} size={26} className="navmark" />
          <span>Lacspace <span className="brand-sub brand-devs">Devs</span></span>
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
      </header>

      {/* Backdrop — tap to close */}
      <div
        className="mm-backdrop"
        data-open={open || undefined}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-in drawer (always in the DOM so it can animate both ways) */}
      <aside className="mobile-menu" data-open={open || undefined} aria-hidden={!open}>
        <div className="mm-top">
          <span className="mm-title">Menu</span>
          <button className="mm-close" aria-label="Close menu" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>
        <nav className="mm-scroll">
          {(() => {
            let k = 0;
            const nx = () => {
              const v = k;
              k += 1;
              return v;
            };
            return (
              <>
                {MENUS.map((m) => (
                  <div key={m.label} className="mm-group">
                    <div className="mm-h" style={{ "--i": nx() } as React.CSSProperties}>{m.label}</div>
                    {m.items.map((i) => (
                      <a
                        key={i.label}
                        href={i.href}
                        onClick={() => setOpen(false)}
                        style={{ "--i": nx() } as React.CSSProperties}
                        {...ext(i)}
                      >
                        {i.label}{i.external && <span aria-hidden> ↗</span>}
                      </a>
                    ))}
                  </div>
                ))}
                <a
                  className="mm-cta"
                  href="/playground"
                  onClick={() => setOpen(false)}
                  style={{ "--i": nx() } as React.CSSProperties}
                >
                  Playground ▸
                </a>
              </>
            );
          })()}
        </nav>
      </aside>
    </>
  );
}
