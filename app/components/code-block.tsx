"use client";

import { useState } from "react";

export function CodeBlock({
  code,
  label,
  lang = "bash",
}: {
  code: string;
  label?: string;
  lang?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked — no-op */
    }
  };

  return (
    <div className="codewrap">
      <div className="codebar">
        <span className="dots">
          <i style={{ background: "#ff5f57" }} />
          <i style={{ background: "#febc2e" }} />
          <i style={{ background: "#28c840" }} />
        </span>
        <span className="codelabel">{label ?? lang}</span>
        <button className="copybtn" onClick={copy} aria-label="Copy code">
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <pre className="codepre">
        <code>{code}</code>
      </pre>
    </div>
  );
}
