const COLS: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "All 63 packages", href: "/packages" },
      { label: "Developer handbook", href: "/handbook" },
      { label: "Live playground", href: "/playground" },
      { label: "Compare", href: "/compare" },
      { label: "Scaffold an app", href: "/handbook#scaffold" },
      { label: "Live templates", href: "https://templates.lacspace.com", external: true },
    ],
  },
  {
    title: "Kits",
    links: [
      { label: "Security Kit", href: "/packages?kit=Security+Kit" },
      { label: "SEO Kit", href: "/packages?kit=SEO+Kit" },
      { label: "React Kit", href: "/packages?kit=React+Kit" },
      { label: "App & Utils Kit", href: "/packages?kit=App+%26+Utils+Kit" },
      { label: "Backend Kit", href: "/packages?kit=Backend+Kit" },
      { label: "StockKit", href: "/packages?kit=StockKit" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "https://lacspace.com/docs", external: true },
      { label: "PDF handbook", href: "https://lacspace.com/docs", external: true },
      { label: "GitHub", href: "https://github.com/lacspace/npm-packages", external: true },
      { label: "npm org", href: "https://www.npmjs.com/org/lacspace", external: true },
      { label: "Articles", href: "https://lacspace.com/articles", external: true },
      { label: "Upgrade guide", href: "/handbook#upgrading" },
    ],
  },
  {
    title: "Lacspace",
    links: [
      { label: "lacspace.com", href: "https://lacspace.com", external: true },
      { label: "Products", href: "https://lacspace.com/products", external: true },
      { label: "About", href: "https://lacspace.com/about", external: true },
      { label: "Contact", href: "https://lacspace.com/contact", external: true },
      { label: "Licence", href: "https://lacspace.com/licenses/lacspace-free-1.0", external: true },
      { label: "Brand", href: "https://lacspace.com/brand", external: true },
    ],
  },
];

export function DevFooter() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid foot-grid5">
          <div className="foot-brand">
            <div className="brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="brand-mark" src="/brand/mark.png" alt="Lacspace" width={26} height={26} />
              <span>Lacspace Developer</span>
            </div>
            <p>63 zero-dependency, isomorphic TypeScript packages, a scaffolding CLI, and the docs to build with them.</p>
            <div className="foot-badges">
              <span>Isomorphic</span><span>ESM + CJS</span><span>TypeScript</span><span>0 deps</span>
            </div>
          </div>

          {COLS.map((c) => (
            <div className="foot-col" key={c.title}>
              <h4>{c.title}</h4>
              {c.links.map((l) => (
                <a key={l.label} href={l.href} {...(l.external ? { target: "_blank", rel: "noopener" } : {})}>
                  {l.label}{l.external && <span aria-hidden> ↗</span>}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="foot-base">
          <span>© {year} Lacspace · Lacspace Free Licence</span>
          <span className="foot-links">
            <a href="https://templates.lacspace.com" target="_blank" rel="noopener">templates.lacspace.com</a>
            <a href="https://lacspace.com" target="_blank" rel="noopener">lacspace.com</a>
            <a href="https://github.com/lacspace/npm-packages" target="_blank" rel="noopener">GitHub</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
