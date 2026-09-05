"use client";

import { useState } from "react";

const LINKS = [
  { href: "/#surfaces", label: "Platform" },
  { href: "/packages", label: "Packages" },
  { href: "/handbook", label: "Handbook" },
  { href: "https://templates.lacspace.com", label: "Templates", external: true },
];

export function DevHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a className="brand" href="/" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="brand-mark" src="/brand/mark.png" alt="Lacspace" width={26} height={26} />
          <span>
            Lacspace <span className="brand-sub">Developer</span>
          </span>
        </a>

        <nav className="nav-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} {...(l.external ? { target: "_blank", rel: "noopener" } : {})}>
              {l.label}
            </a>
          ))}
          <a className="nav-cta" href="https://www.npmjs.com/org/lacspace" target="_blank" rel="noopener">
            npm org ↗
          </a>
        </nav>

        <button
          className="burger"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span data-open={open} />
          <span data-open={open} />
          <span data-open={open} />
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              {...(l.external ? { target: "_blank", rel: "noopener" } : {})}
            >
              {l.label}
            </a>
          ))}
          <a href="https://www.npmjs.com/org/lacspace" target="_blank" rel="noopener" onClick={() => setOpen(false)}>
            npm org ↗
          </a>
        </div>
      )}
    </header>
  );
}
