"use client";

import { useEffect, useRef, useState } from "react";

// The hero's dev-native surprise: a terminal that types the one command, then
// shows the finished app appearing at our real speed. Copy always grabs the full
// command. Choreographed to start just after the logo begins building.
const CMD = "npm create lacspace-app@latest my-app";
const RESULT = ["✔ Created my-app — Next.js 15, SEO wired, zero deps", "✔ Ready in 0.12s → cd my-app && npm run dev"];

export function HeroCommand() {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const reduce = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setTyped(CMD);
      setDone(true);
      return;
    }
    let i = 0;
    const type = () => {
      i += 1;
      setTyped(CMD.slice(0, i));
      if (i < CMD.length) {
        // a touch of human jitter in the keystroke rhythm
        timers.current.push(setTimeout(type, 34 + Math.random() * 44));
      } else {
        timers.current.push(setTimeout(() => setDone(true), 260));
      }
    };
    timers.current.push(setTimeout(type, 900));
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CMD);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <div className="herocmd">
      <div className="hc-bar">
        <span className="dots" aria-hidden="true">
          <i style={{ background: "#ff5f57" }} />
          <i style={{ background: "#febc2e" }} />
          <i style={{ background: "#28c840" }} />
        </span>
        <span className="hc-label">Terminal — one command</span>
        <button className="copybtn" onClick={copy} aria-label="Copy the create command">
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <pre className="hc-pre" aria-label={CMD}>
        <code>
          <span className="hc-line">
            <span className="hc-prompt">$</span> {typed}
            <span className="hc-caret" data-done={done || undefined} />
          </span>
          <span className="hc-out" data-show={done || undefined}>
            {"\n"}
            {RESULT[0]}
            {"\n"}
            {RESULT[1]}
          </span>
        </code>
      </pre>
    </div>
  );
}
