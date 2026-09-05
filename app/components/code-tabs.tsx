"use client";

import { useState } from "react";
import { CodeBlock } from "./code-block";

type Tab = { id: string; label: string; icon: string; label2: string; lang: string; code: string };

const TABS: Tab[] = [
  {
    id: "auth", label: "Secure a login", icon: "🛡️", label2: "login.ts", lang: "ts",
    code: `import { verify, hash } from "@lacspace/password";
import { sign } from "@lacspace/jwt";

const ok = user && (await verify(password, user.passwordHash));
if (!ok) throw new Error("Invalid credentials");

return sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET!, {
  expiresIn: 3600, issuer: "lacspace",
});`,
  },
  {
    id: "seo", label: "Wire SEO", icon: "🔎", label2: "app/pricing/page.tsx", lang: "tsx",
    code: `import { site } from "@/lib/seo";

// canonical + Open Graph + Twitter + JSON-LD, in one call
const { metadata, jsonLd } = site.page({ title: "Pricing", path: "/pricing" });
export { metadata };`,
  },
  {
    id: "money", label: "Handle money", icon: "💰", label2: "money.ts", lang: "ts",
    code: `import { money } from "@lacspace/money";

money(19.99, "USD").multiply(3).format();      // "$59.97"
money(10, "USD").allocate([1, 1, 1])           // split a bill, lose no cent
  .map((m) => m.format());                     // ["$3.34","$3.33","$3.33"]`,
  },
  {
    id: "scaffold", label: "Scaffold an app", icon: "🚀", label2: "terminal", lang: "bash",
    code: `# a finished Next.js app, recoloured to your brand, in ~0.12s
npm create lacspace-app@latest my-app -- --template saas --theme lacspace

cd my-app && npm run dev`,
  },
];

export function CodeTabs() {
  const [active, setActive] = useState(TABS[0]!.id);
  const tab = TABS.find((t) => t.id === active)!;
  return (
    <div className="ct">
      <div className="ct-tabs" role="tablist">
        {TABS.map((t) => (
          <button key={t.id} role="tab" aria-selected={active === t.id} className={"ct-tab" + (active === t.id ? " on" : "")} onClick={() => setActive(t.id)}>
            <span aria-hidden>{t.icon}</span> {t.label}
          </button>
        ))}
      </div>
      <CodeBlock code={tab.code} label={tab.label2} lang={tab.lang} />
    </div>
  );
}
