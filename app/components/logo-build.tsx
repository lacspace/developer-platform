// The Lacspace mark, crafting itself — the hero signature animation.
// Phase 1: the 12 network nodes pop in, in BFS order from the crown (the network
// grows head -> neck). Phase 2: the outer profile draws. Phase 3: every wire draws
// parent -> child with a signal pulse travelling along it. Phase 4: the real
// /icon.svg blooms in (pixel-identical), then a subtle breathe. Pure CSS
// (per-element --d delays), zero runtime JS, plays once on mount, honors
// prefers-reduced-motion. Node coords + edges are pixel-calibrated to the real
// artwork (brand/general/mark) — the 12 dots are uniform-size in the real mark.

// Outer head-profile silhouette (viewBox 0 0 281.25), from the master mark.
const ICON_PATH =
  "M 225.3125 104.605469 L 219.570312 75.960938 C 221.101562 75.199219 222.160156 73.644531 222.210938 71.832031 C 222.285156 69.203125 220.078125 66.925781 217.449219 66.925781 C 216.5 66.925781 215.617188 67.207031 214.875 67.683594 L 195.324219 49.761719 C 195.660156 49.042969 195.824219 48.230469 195.765625 47.371094 C 195.589844 45.03125 193.6875 43.132812 191.347656 42.972656 C 189.859375 42.871094 188.507812 43.453125 187.570312 44.433594 L 163.929688 32.128906 L 118.292969 44.390625 L 88.105469 55.425781 L 111.09375 161.695312 L 111.144531 161.9375 L 144.082031 206.863281 L 109.46875 251.328125 L 158.9375 235.476562 C 159.8125 236.597656 161.167969 237.3125 162.699219 237.3125 C 164.554688 237.3125 166.164062 236.253906 166.953125 234.699219 L 197.929688 239.363281 C 198.15625 241.933594 200.417969 243.914062 203.09375 243.6875 C 205.417969 243.488281 207.277344 241.578125 207.429688 239.25 C 207.609375 236.476562 205.414062 234.167969 202.675781 234.167969 C 202.660156 234.167969 202.640625 234.167969 202.625 234.167969 L 187.707031 187.429688 C 189.035156 186.582031 189.914062 185.09375 189.914062 183.394531 C 189.914062 181.503906 188.828125 179.871094 187.253906 179.101562 L 190.140625 164.816406 C 192.640625 164.699219 194.628906 162.613281 194.628906 160.050781 C 194.628906 159.269531 194.441406 158.53125 194.109375 157.878906 L 211.394531 142.507812 C 212.089844 142.917969 212.902344 143.160156 213.769531 143.160156 C 216.371094 143.160156 218.480469 141.023438 218.480469 138.390625 C 218.480469 136.976562 217.875 135.710938 216.910156 134.835938 L 224.570312 114.101562 C 224.738281 114.117188 224.910156 114.128906 225.082031 114.128906 C 227.714844 114.128906 229.847656 111.992188 229.847656 109.359375 C 229.847656 106.726562 227.835938 104.722656 225.3125 104.597656 Z";

// The 12 network nodes — pixel-calibrated to the real mark (viewBox 0 0 281.25).
// Detected as cyan-blob centres in brand/general/mark/png-transparent/*-2048.png.
const NODES: readonly [number, number][] = [
  [190.9, 47.7],  //  0 crown
  [217.3, 71.6],  //  1 top-right
  [172.8, 81.1],  //  2 upper hub
  [225.0, 109.3], //  3 far-right
  [189.8, 110.6], //  4 mid hub
  [213.7, 138.3], //  5 right-mid
  [168.0, 138.3], //  6 temple hub
  [189.8, 160.0], //  7 centre
  [147.6, 161.9], //  8 cheek edge
  [185.1, 183.3], //  9 lower centre
  [162.6, 232.5], // 10 jaw
  [202.6, 238.8], // 11 neck
];
// 15 connectors, verified by sampling the artwork along every node pair. Every
// node is wired; no orphan. (4-8 was rejected — node 6 lies on that line, so the
// real polyline is 4-6-8.)
const EDGES_RAW: readonly [number, number][] = [
  [0, 1], [0, 2], [1, 2], [1, 3], [2, 4], [3, 4], [3, 5], [4, 6],
  [5, 7], [6, 7], [6, 8], [7, 9], [8, 9], [9, 11], [10, 11],
];

// ============================================================================
// Intro timing (ms) — tune everything here. The component feeds these to the CSS
// as custom properties, so these constants are the single source of truth.
// ============================================================================
const DOT_STAGGER = 90;        // gap between each dot popping in (never random)
const DOT_DURATION = 360;      // each dot's soft-spring pop
const DOTS_PAUSE = 200;        // beat after the last dot, before wiring begins
const OUTLINE_DELAY = 550;     // outer profile begins drawing (overlaps the dots)
const OUTLINE_DURATION = 1650; // slow easeInOut draw of the head profile
const LINE_DURATION = 460;     // each connection draws this long (easeOut)
const LINE_STEP = 100;         // next line starts this long after the previous
                               //   (compressed cascade to hold the <4.5s budget;
                               //    raise toward ~0.6*LINE_DURATION for more air)
const SPARK_DURATION = 440;    // the signal pulse that fires when a line lands
const PRE_IGNITE_PAUSE = 150;  // beat before the ignition / fill phase
const IGNITE_DURATION = 640;
const RIPPLE_AFTER_IGNITE = 140;
const RIPPLE_DURATION = 620;
const IDLE_STEP = 5000;        // idle spark cadence (one wire at a time)

// Build the "birth order" (BFS from the crown) + orient/sort edges so the network
// grows outward and each wire lights up right as its far node arrives.
function craft() {
  const adj: number[][] = NODES.map(() => []);
  for (const [a, b] of EDGES_RAW) { adj[a]!.push(b); adj[b]!.push(a); }
  const birth: number[] = NODES.map(() => -1);
  const order: number[] = [];
  const q = [0];
  birth[0] = 0; order.push(0);
  while (q.length) {
    const n = q.shift()!;
    for (const m of adj[n]!.sort((x, y) => x - y)) {
      if (birth[m] === -1) { birth[m] = order.length; order.push(m); q.push(m); }
    }
  }
  // orient each edge source(earlier-born) -> target(later-born); the pulse flows this way
  const edges = EDGES_RAW.map(([a, b]) => (birth[a]! <= birth[b]! ? [a, b] : [b, a]) as [number, number]);
  // draw an edge as soon as its later node is born; ties broken by the earlier node
  edges.sort((e, f) =>
    Math.max(birth[e[0]]!, birth[e[1]]!) - Math.max(birth[f[0]]!, birth[f[1]]!) ||
    Math.min(birth[e[0]]!, birth[e[1]]!) - Math.min(birth[f[0]]!, birth[f[1]]!));
  return { birth, edges };
}
const { birth, edges } = craft();

// Phase 4 ignites from the centre node (7); clip-path/ignite origin in globals.css
// is 67.5% 57% = NODES[7] / 281.25. Idle loop travels one wire at a time, rotating
// across a spread of 6 connections (staggered so ~1 shows every ~5s → reads random).
const CENTER = NODES[7]!;
const IDLE_EDGES: readonly [number, number][] = [
  [0, 1], [2, 4], [3, 5], [6, 8], [7, 9], [9, 11],
];

// --- derived timeline ---
const N_DOTS = NODES.length;          // 12
const N_EDGES = EDGES_RAW.length;     // 15
const DOTS_END = (N_DOTS - 1) * DOT_STAGGER + DOT_DURATION;
const CONN_START = DOTS_END + DOTS_PAUSE;
const CONN_END = CONN_START + (N_EDGES - 1) * LINE_STEP + LINE_DURATION;
const IGNITE_DELAY = CONN_END + PRE_IGNITE_PAUSE;
const RIPPLE_DELAY = IGNITE_DELAY + RIPPLE_AFTER_IGNITE;
const CRAFTOUT_DELAY = RIPPLE_DELAY + 200;
const SHIMMER_DELAY = RIPPLE_DELAY + RIPPLE_DURATION - 40;
const BREATHE_DELAY = RIPPLE_DELAY + RIPPLE_DURATION + 120;
const IDLE_BASE = RIPPLE_DELAY + RIPPLE_DURATION + 700;
const edgeDelay = (i: number) => CONN_START + i * LINE_STEP;

const rootVars = {
  "--dot-dur": `${DOT_DURATION}ms`,
  "--outline-delay": `${OUTLINE_DELAY}ms`,
  "--outline-dur": `${OUTLINE_DURATION}ms`,
  "--line-dur": `${LINE_DURATION}ms`,
  "--spark-dur": `${SPARK_DURATION}ms`,
  "--ignite-delay": `${IGNITE_DELAY}ms`,
  "--ignite-dur": `${IGNITE_DURATION}ms`,
  "--ripple-delay": `${RIPPLE_DELAY}ms`,
  "--ripple-dur": `${RIPPLE_DURATION}ms`,
  "--craftout-delay": `${CRAFTOUT_DELAY}ms`,
  "--shimmer-delay": `${SHIMMER_DELAY}ms`,
  "--breathe-delay": `${BREATHE_DELAY}ms`,
} as React.CSSProperties;

export function LogoBuild({
  size,
  className = "",
}: {
  /** px size for a fixed instance (e.g. the nav); omit to use the CSS width (hero) */
  size?: number;
  className?: string;
} = {}) {
  const sizeStyle = size ? { width: size, height: size } : {};
  return (
    <div
      className={`logobuild ${className}`.trim()}
      role="img"
      aria-label="Lacspace"
      style={{ ...rootVars, ...sizeStyle }}
    >
      <svg className="lb-craft" viewBox="0 0 281.25 281.25" aria-hidden="true">
        <defs>
          <linearGradient id="lbg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0BB9D9" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        {/* Phase 2 — the outer profile draws */}
        <path className="lb-outline" d={ICON_PATH} pathLength={1} />
        {/* Phase 3 — connectors draw between every dot, parent -> child */}
        <g className="lb-edges">
          {edges.map(([a, b], i) => (
            <line
              key={`e${i}`}
              className="lb-edge"
              x1={NODES[a]![0]} y1={NODES[a]![1]}
              x2={NODES[b]![0]} y2={NODES[b]![1]}
              pathLength={1}
              style={{ "--d": `${edgeDelay(i)}ms` } as React.CSSProperties}
            />
          ))}
        </g>
        {/* Phase 3 — a signal pulse that fires when each wire lands */}
        <g className="lb-pulses">
          {edges.map(([a, b], i) => (
            <line
              key={`p${i}`}
              className="lb-pulse"
              x1={NODES[a]![0]} y1={NODES[a]![1]}
              x2={NODES[b]![0]} y2={NODES[b]![1]}
              pathLength={1}
              style={{ "--d": `${edgeDelay(i) + LINE_DURATION}ms` } as React.CSSProperties}
            />
          ))}
        </g>
        {/* Phase 1 — the 12 nodes appear in BFS order (crown -> neck) */}
        <g className="lb-nodes">
          {NODES.map(([x, y], i) => (
            <g key={`n${i}`} style={{ "--d": `${birth[i]! * DOT_STAGGER}ms` } as React.CSSProperties}>
              <circle className="lb-glow" cx={x} cy={y} r={7.2} />
              <circle className="lb-node" cx={x} cy={y} r={3.7} />
            </g>
          ))}
        </g>
        {/* Phase 4 — IGNITION: the centre node bursts as the last wire sparks */}
        <circle className="lb-ignite" cx={CENTER[0]} cy={CENTER[1]} r={5.2} />
      </svg>
      {/* Phase 4 — RIPPLE FILL: the real logo reveals from the centre node */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="lb-final" src="/icon.svg" alt="" width={281} height={281} />
      {/* Phase 4 — SHIMMER: one diagonal sweep, masked to the mark's silhouette */}
      <div className="lb-shimmer" aria-hidden="true" />
      {/* IDLE — a glowing dot travels one connection at a time */}
      <svg className="lb-idle" viewBox="0 0 281.25 281.25" aria-hidden="true">
        {IDLE_EDGES.map(([a, b], i) => (
          <line
            key={`i${i}`}
            className="lb-idlepulse"
            x1={NODES[a]![0]} y1={NODES[a]![1]}
            x2={NODES[b]![0]} y2={NODES[b]![1]}
            pathLength={1}
            style={{ "--d": `${IDLE_BASE + i * IDLE_STEP}ms` } as React.CSSProperties}
          />
        ))}
      </svg>
    </div>
  );
}
