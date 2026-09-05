import { DevHeader } from "../components/dev-header";
import { DevFooter } from "../components/dev-footer";
import { HandbookApp } from "./handbook-app";
import { site } from "../lib/seo";

const FAQ = [
  {
    question: "Are the @lacspace packages really zero-dependency?",
    answer:
      "Yes. Verify any of them with `npm view @lacspace/crypto dependencies`. The only dependencies you'll ever see are other @lacspace packages.",
  },
  {
    question: "Do I have to use the whole ecosystem?",
    answer:
      "No — each package stands alone. Install one, or scaffold a whole app with create-lacspace-app; both are first-class.",
  },
  {
    question: "Can I use these on the edge / in the browser?",
    answer:
      "Most packages are isomorphic and run in Node, the browser and edge runtimes. Anything cryptographic uses Web Crypto, which the edge provides.",
  },
  {
    question: "What does it cost?",
    answer:
      "Everything is free under the Lacspace Free Licence — a permissive, free-to-use licence. Use it in personal and commercial projects at no cost.",
  },
];

const seo = site.faq(FAQ, {
  title: "Developer Handbook",
  path: "/handbook",
  description:
    "The interactive guide to the Lacspace ecosystem — search, filter and copy real recipes for secure auth, SEO, backend, money, data, React and resilience across 63 zero-dependency TypeScript packages.",
});
export const metadata = seo.metadata;

export default function Handbook() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }}
      />
      <div className="aurora" />
      <DevHeader />
      <main className="wrap">
        <section className="sec" style={{ paddingTop: 48 }}>
          <div className="sec-head" style={{ marginBottom: 18 }}>
            <div className="eyebrow">Developer Handbook</div>
            <h2>Build with the Lacspace ecosystem</h2>
            <p className="hb-lead">
              Search it, filter by kit, switch your package manager, and copy real
              recipes — every snippet is accurate API from the packages themselves.
            </p>
          </div>
          <HandbookApp />
        </section>
      </main>
      <DevFooter />
    </>
  );
}
