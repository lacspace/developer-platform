"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { LogoBuild } from "./logo-build";

type Item = { label: string; href: string; desc?: string; external?: boolean };
type Column = { title: string; items: Item[] };
type Chip = { label: string; href: string };
type Menu = {
  label: string;
  href?: string;
  /** A plain one-column dropdown. */
  items?: Item[];
  /** A wide multi-column panel. Used by Components. */
  columns?: Column[];
  /** Monospace shortcut row pinned under the columns. */
  chipsTitle?: string;
  chips?: Chip[];
};

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
    label: "Components",
    href: "/components",
    columns: [
      {
        title: "Browse the kit",
        items: [
          { label: "The gallery", href: "/components", desc: "143 components, all live on one page" },
          { label: "Live theme editor", href: "/components#theme", desc: "Restyle every preview from four variables" },
          { label: "Install & packages", href: "/components#install", desc: "One line for all four" },
          { label: "Full export reference", href: "/components#reference", desc: "Every name in all four packages" },
        ],
      },
      {
        title: "By category",
        items: [
          { label: "Actions & buttons", href: "/components#actions" },
          { label: "Forms & inputs", href: "/components#forms" },
          { label: "Overlays & dialogs", href: "/components#overlays" },
          { label: "Navigation", href: "/components#navigation" },
          { label: "Data display", href: "/components#data" },
          { label: "Feedback & status", href: "/components#feedback" },
          { label: "Layout & typography", href: "/components#layout" },
        ],
      },
      {
        title: "Data, tables & dates",
        items: [
          { label: "Charts", href: "/components#charts", desc: "19 SVG charts — line to candlestick" },
          { label: "Data tables", href: "/components#tables", desc: "Sort, filter, page, select, export" },
          { label: "Date & time pickers", href: "/components#dates", desc: "Calendar, range, schedule grid" },
        ],
      },
      {
        title: "Docs & source",
        items: [
          { label: "Developer handbook", href: "/handbook", desc: "Guides & runnable recipes" },
          { label: "Documentation home", href: "/docs", desc: "Start here" },
          { label: "Free Licence v1.0", href: "/licenses/lacspace-free-1.0", desc: "Use it, ship it, modify it" },
          { label: "Source on GitHub", href: "https://github.com/lacspace/npm-packages/tree/main/components", desc: "components · charts · table · date", external: true },
          { label: "@lacspace/components on npm", href: "https://www.npmjs.com/package/@lacspace/components", desc: "Install from the registry", external: true },
        ],
      },
    ],
    chipsTitle: "Most used",
    chips: [
      { label: "Button", href: "/components#c-button" },
      { label: "Input", href: "/components#c-input" },
      { label: "Select", href: "/components#c-select" },
      { label: "Combobox", href: "/components#c-combobox" },
      { label: "Modal", href: "/components#c-modal" },
      { label: "Drawer", href: "/components#c-drawer" },
      { label: "Toast", href: "/components#c-toast" },
      { label: "Tabs", href: "/components#c-tabs" },
      { label: "DataTable", href: "/components#c-datatable" },
      { label: "DatePicker", href: "/components#c-datepicker" },
      { label: "LineChart", href: "/components#c-linechart" },
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

function ext(i: { external?: boolean }) {
  return i.external ? { target: "_blank", rel: "noopener" } : {};
}

function MenuLink({ i }: { i: Item }) {
  return (
    <a href={i.href} {...ext(i)} className="nav-menu-a">
      <span className="nav-menu-t">
        {i.label}
        {i.external && <span aria-hidden className="ext"> ↗</span>}
      </span>
      {i.desc && <span className="nav-menu-d">{i.desc}</span>}
    </a>
  );
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
          {MENUS.map((m) => {
            const active = m.href ? pathname === m.href || pathname.startsWith(`${m.href}/`) : false;
            return (
            <div className="nav-item" key={m.label} data-mega={m.columns ? "" : undefined}>
              {m.href ? (
                <a href={m.href} className="nav-trigger" data-active={active || undefined}>{m.label} <span aria-hidden className="caret">▾</span></a>
              ) : (
                <button className="nav-trigger" aria-haspopup="true">{m.label} <span aria-hidden className="caret">▾</span></button>
              )}
              <div className="nav-menu" data-mega={m.columns ? "" : undefined}>
                <div className="nav-menu-card">
                  {m.items?.map((i) => (
                    <MenuLink key={i.label} i={i} />
                  ))}

                  {m.columns && (
                    <div className="nav-mega">
                      {m.columns.map((c) => (
                        <div className="nav-mega-col" key={c.title}>
                          <span className="nav-mega-h">{c.title}</span>
                          {c.items.map((i) => (
                            <MenuLink key={i.label} i={i} />
                          ))}
                        </div>
                      ))}
                    </div>
                  )}

                  {m.chips && (
                    <div className="nav-chips">
                      <span className="nav-chips-h">{m.chipsTitle}</span>
                      <div className="nav-chips-row">
                        {m.chips.map((c) => (
                          <a key={c.label} href={c.href} className="nav-chip">
                            {c.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            );
          })}
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
            // The drawer staggers its rows with --i, so every row needs the next
            // index in document order — including the flattened mega columns.
            let k = 0;
            const nx = () => {
              const v = k;
              k += 1;
              return v;
            };
            const row = (i: Item) => (
              <a
                key={i.label}
                href={i.href}
                onClick={() => setOpen(false)}
                style={{ "--i": nx() } as React.CSSProperties}
                {...ext(i)}
              >
                {i.label}
                {i.external && <span aria-hidden> ↗</span>}
              </a>
            );
            return (
              <>
                {MENUS.map((m) => (
                  <div key={m.label} className="mm-group">
                    <div className="mm-h" style={{ "--i": nx() } as React.CSSProperties}>{m.label}</div>
                    {m.href && m.columns && (
                      <a
                        href={m.href}
                        onClick={() => setOpen(false)}
                        style={{ "--i": nx() } as React.CSSProperties}
                      >
                        Open {m.label.toLowerCase()} →
                      </a>
                    )}
                    {m.items?.map(row)}
                    {m.columns?.map((c) => (
                      <div key={c.title} className="mm-sub">
                        <div className="mm-sub-h" style={{ "--i": nx() } as React.CSSProperties}>{c.title}</div>
                        {c.items.map(row)}
                      </div>
                    ))}
                    {m.chips && (
                      <div className="mm-chips" style={{ "--i": nx() } as React.CSSProperties}>
                        {m.chips.map((c) => (
                          <a key={c.label} href={c.href} onClick={() => setOpen(false)} className="mm-chip">
                            {c.label}
                          </a>
                        ))}
                      </div>
                    )}
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
