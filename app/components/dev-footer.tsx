export function DevFooter() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <div className="brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="brand-mark" src="/brand/mark.png" alt="Lacspace" width={26} height={26} />
              <span>Lacspace Developer</span>
            </div>
            <p>
              63 zero-dependency, isomorphic TypeScript packages, a scaffolding
              CLI, and the docs to build with them.
            </p>
            <span className="foot-made">Isomorphic · dual ESM + CJS · TypeScript strict</span>
          </div>

          <div className="foot-col">
            <h4>Build</h4>
            <a href="/packages">All 63 packages</a>
            <a href="/handbook">Developer handbook</a>
            <a href="/handbook#upgrading">Upgrade guide</a>
            <a href="/handbook#scaffold">Scaffold an app</a>
          </div>

          <div className="foot-col">
            <h4>Explore</h4>
            <a href="https://templates.lacspace.com" target="_blank" rel="noopener">Live templates</a>
            <a href="https://www.npmjs.com/org/lacspace" target="_blank" rel="noopener">npm org</a>
            <a href="https://github.com/lacspace/npm-packages" target="_blank" rel="noopener">GitHub</a>
            <a href="https://lacspace.com/docs" target="_blank" rel="noopener">lacspace.com/docs</a>
          </div>

          <div className="foot-col">
            <h4>Lacspace</h4>
            <a href="https://lacspace.com" target="_blank" rel="noopener">lacspace.com</a>
            <a href="https://lacspace.com/packages" target="_blank" rel="noopener">Package catalog</a>
            <a href="https://lacspace.com/licenses/lacspace-free-1.0" target="_blank" rel="noopener">Licence</a>
          </div>
        </div>

        <div className="foot-base">
          <span>© {year} Lacspace · Lacspace Free Licence</span>
          <span className="foot-links">
            <a href="https://templates.lacspace.com" target="_blank" rel="noopener">templates.lacspace.com</a>
            <a href="https://lacspace.com" target="_blank" rel="noopener">lacspace.com</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
