import { DevHeader } from "../../../components/dev-header";
import { DevFooter } from "../../../components/dev-footer";
import { Reveal } from "../../../components/reveal";
import { site } from "../../../lib/seo";
import { TRY_CSS } from "../../try-css";
import { ExcelTry } from "./excel-try";

const seo = site.page({
  title: "JSON to Excel, Excel to JSON & more — try lacspace-excel live",
  path: "/tools/excel/try",
  description:
    "Convert JSON, CSV, YAML, Markdown or SQL to a real .xlsx and back, inspect any workbook, add a formula column with 110+ Excel-style functions, or download one of 17 ready-to-fill templates (invoice, inventory, payroll…). Runs entirely in your browser — nothing is uploaded.",
  keywords: ["json to excel", "excel to json", "csv to xlsx", "xlsx to csv", "excel converter online", "excel formula online", "excel templates", "invoice template", "live", "playground"],
});
export const metadata = seo.metadata;

export default function ExcelTryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }} />
      <style dangerouslySetInnerHTML={{ __html: TRY_CSS }} />
      <div className="aurora" />
      <div className="grid-bg" />
      <DevHeader />

      <main className="wrap">
        <section className="hero" style={{ paddingBottom: 8 }}>
          <Reveal><a href="/tools/excel" className="pd-back">← lacspace-excel</a></Reveal>
          <Reveal delay={40}><span className="pill" style={{ marginTop: 14 }}><span className="live" /> Live · runs in your browser</span></Reveal>
          <Reveal delay={80}><h1>Try <span className="grad">excel</span> live</h1></Reveal>
          <Reveal delay={120}>
            <p className="sub">
              Convert JSON, CSV, YAML, Markdown or SQL to a real <span className="mono">.xlsx</span> and back,
              inspect a workbook, add a formula column, or download a ready-to-fill template. It runs the
              published <span className="mono">@lacspace/convert</span>, <span className="mono">@lacspace/formula</span> and{" "}
              <span className="mono">lacspace-excel</span> engines entirely in your browser — nothing is uploaded.
            </p>
          </Reveal>
        </section>

        <section className="sec" style={{ paddingTop: 24 }}>
          <Reveal><ExcelTry /></Reveal>
          <p className="pt-note">
            Your data never leaves your machine. The CLI adds stdin/stdout piping, dedupe, split/merge and a function reference.
          </p>
        </section>

        <section className="sec">
          <Reveal className="cta" style={{ justifyContent: "center" }}>
            <a className="btn btn-primary" href="https://www.npmjs.com/package/lacspace-excel" target="_blank" rel="noopener">Install from npm ↗</a>
            <a className="btn btn-ghost" href="/tools/excel">Read the full docs</a>
            <a className="btn btn-ghost" href="/packages/formula">Formula reference</a>
          </Reveal>
        </section>
      </main>

      <DevFooter />
    </>
  );
}
