"use client";

/**
 * /components — the data-visualisation third of the gallery.
 *
 * Every preview on this page is the real package rendering real props: nothing
 * here is a screenshot, a mock or a hand-drawn SVG. All numbers belong to
 * "Meridian Cloud", an invented company used purely as sample data.
 */

import { useEffect, useMemo, useState, type ReactNode } from "react";

import {
  AreaChart,
  BarChart,
  CandlestickChart,
  DonutChart,
  FunnelChart,
  Gauge,
  Heatmap,
  LineChart,
  PieChart,
  RadarChart,
  SparkBars,
  Sparkline,
  type Candle,
} from "@lacspace/charts";

import {
  DataTable,
  actionsColumn,
  badgeColumn,
  booleanColumn,
  currencyColumn,
  dateColumn,
  linkColumn,
  numberColumn,
  textColumn,
  useTable,
  type AnyColumn,
} from "@lacspace/table";

import {
  Calendar,
  DatePicker,
  DateRangePicker,
  DateTimePicker,
  MonthPicker,
  RelativeTime,
  ScheduleGrid,
  TimePicker,
  WeekPicker,
  YearPicker,
  addDays,
  addHours,
  addMinutes,
  defaultPresets,
  formatDate,
  formatTimeValue,
  makeDate,
  nightsBetween,
  startOfDay,
  startOfWeek,
  type CompleteRange,
  type DateRange,
  type TimeValue,
} from "@lacspace/date";

import { CodeBlock } from "./code-block";
import { cardAnchor } from "./gallery";

import "@lacspace/charts/styles.css";
import "@lacspace/table/styles.css";
import "@lacspace/date/styles.css";
import "./gallery-dataviz.css";

/* ==========================================================================
   Sample data — Meridian Cloud, a company that does not exist
   ========================================================================== */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Monthly recurring revenue, in thousands of US dollars. */
const MRR = [182, 191, 206, 214, 233, 248, 259, 277, 296, 311, 329, 348];
/** The board plan for the same year. */
const PLAN = [180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345];

const WORKSPACES = [1490, 1522, 1561, 1588, 1612, 1659, 1688, 1717, 1745, 1781, 1809, 1842];
const LATENCY_P95 = [268, 259, 255, 247, 243, 238, 232, 229, 226, 221, 218, 214];
const NET_NEW_SEATS = [42, 38, -12, 55, 61, -8, 74, 88, 66, 91, -15, 103];

const WEEK_LABELS = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];
const SESSIONS = [
  { name: "Organic", data: [8.2, 8.9, 9.4, 10.1, 10.8, 11.6, 12.1, 12.9] },
  { name: "Direct", data: [4.1, 4.3, 4.4, 4.8, 5.0, 5.2, 5.5, 5.9] },
  { name: "Referral", data: [1.8, 2.0, 2.3, 2.2, 2.6, 2.9, 3.1, 3.4] },
  { name: "Paid", data: [2.9, 3.4, 3.1, 3.8, 3.2, 2.7, 2.4, 2.1] },
];

const QUARTERS = ["Q1", "Q2", "Q3", "Q4"];
const BOOKINGS = [
  { name: "FY25", data: [412, 468, 501, 588] },
  { name: "FY26", data: [503, 574, 662, 741] },
];

const REFERRERS = ["devblog.example", "newsletter", "conference", "partner site", "forum"];
const REFERRER_SIGNUPS = [{ name: "Signups", data: [412, 318, 244, 171, 96] }];

const TRAFFIC_SOURCES = [
  { label: "Organic search", value: 42.4 },
  { label: "Direct", value: 23.8 },
  { label: "Referral", value: 15.1 },
  { label: "Social", value: 11.3 },
  { label: "Paid", value: 7.4 },
];

const ORDERS_BY_REGION = [
  { label: "Asia-Pacific", value: 5120 },
  { label: "Europe", value: 3980 },
  { label: "North America", value: 3240 },
  { label: "Latin America", value: 1180 },
  { label: "Middle East & Africa", value: 760 },
];

const TICKET_HOURS = ["00", "03", "06", "09", "12", "15", "18", "21"];
const TICKET_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TICKET_MATRIX = [
  [3, 2, 6, 24, 31, 27, 14, 7],
  [2, 1, 7, 28, 34, 29, 16, 6],
  [4, 2, 8, 31, 38, 33, 18, 9],
  [3, 3, 9, 29, 36, 30, 17, 8],
  [5, 2, 7, 26, 30, 22, 12, 6],
  [2, 1, 3, 9, 12, 10, 6, 4],
  [1, 1, 2, 6, 9, 8, 5, 3],
];

/** A year of deploy counts, generated deterministically so SSR and the client agree. */
const DEPLOYS = (() => {
  const out: Array<{ date: string; value: number }> = [];
  const start = Date.UTC(2025, 9, 1);
  for (let i = 0; i < 358; i += 1) {
    const day = new Date(start + i * 86400000);
    const weekday = day.getUTCDay();
    const weekend = weekday === 0 || weekday === 6;
    const value = weekend ? (i * 7919) % 3 : 1 + ((i * 7919) % 11);
    if (value === 0 && i % 3 !== 0) continue;
    out.push({ date: day.toISOString().slice(0, 10), value });
  }
  return out;
})();

const SCORECARD_AXES = ["Throughput", "Latency", "DX", "Docs", "Security", "Cost"];
const SCORECARD = [
  { name: "Meridian Cloud", data: [8.6, 7.9, 9.1, 8.2, 8.8, 6.4] },
  { name: "Category median", data: [6.8, 7.1, 6.2, 5.9, 7.4, 7.6] },
];

const SIGNUP_FUNNEL = [
  { label: "Visited pricing", value: 48200 },
  { label: "Started signup", value: 19140 },
  { label: "Verified email", value: 12380 },
  { label: "Created a project", value: 4380 },
  { label: "Converted to paid", value: 1120 },
];
const FUNNEL_RAMP = ["#4d9fff", "#3f8ae0", "#3376c2", "#2762a4", "#1b4e86"];

/** Five sessions of a made-up ticker. */
const TICKER_WEEK: Candle[] = [
  { label: "Mon", open: 128.4, high: 131.2, low: 127.1, close: 130.6 },
  { label: "Tue", open: 130.6, high: 134.8, low: 130.0, close: 134.1 },
  { label: "Wed", open: 134.1, high: 135.0, low: 129.3, close: 130.2 },
  { label: "Thu", open: 130.2, high: 132.6, low: 128.8, close: 132.0 },
  { label: "Fri", open: 132.0, high: 136.4, low: 131.7, close: 135.9 },
];

const money = (n: number) => "$" + n.toFixed(2);
const thousands = (n: number) => n.toFixed(1) + "k";
const percent = (n: number) => n.toFixed(0) + "%";
const counts = (n: number) => n.toLocaleString("en-US");

/* ==========================================================================
   Shared preview card
   ========================================================================== */

function Preview({
  name,
  tag,
  when,
  code,
  span = false,
  fill = true,
  popover = false,
  scroll = false,
  readout,
  children,
}: {
  name: string;
  tag: string;
  when: string;
  code: string;
  span?: boolean;
  fill?: boolean;
  popover?: boolean;
  scroll?: boolean;
  readout?: ReactNode;
  children: ReactNode;
}) {
  const [showCode, setShowCode] = useState(false);
  const vizClass =
    "dv-viz" +
    (fill && !popover && !scroll ? " fill" : "") +
    (popover ? " open" : "") +
    (scroll ? " scroll" : "");

  return (
    <article id={cardAnchor(name)} className={span ? "dv-card span" : "dv-card"}>
      <div className={vizClass}>{children}</div>
      {readout ? <div className="dv-readout">{readout}</div> : null}
      <div className="dv-head">
        <h3 className="dv-name">{name}</h3>
        <span className="dv-tag">{tag}</span>
      </div>
      <p className="dv-when">{when}</p>
      <button
        type="button"
        className="dv-toggle"
        aria-expanded={showCode}
        onClick={() => setShowCode((v) => !v)}
      >
        {showCode ? "Hide usage" : "Show usage"}
      </button>
      {showCode ? <CodeBlock code={code} lang="tsx" label="tsx" /> : null}
    </article>
  );
}

function SectionHead({ id, eyebrow, title, blurb }: { id: string; eyebrow: string; title: string; blurb: string }) {
  return (
    <div className="sec-head" id={id}>
      <div className="eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      <p>{blurb}</p>
    </div>
  );
}

/* ==========================================================================
   1 — Charts
   ========================================================================== */

const SNIP_SPARK = `import { Sparkline, SparkBars } from "@lacspace/charts";

<Sparkline data={mrrByMonth} width={160} height={40} area curve lastDot responsive />
<SparkBars data={netNewSeats} width={160} height={40} highlightLast negativeColor="#f87171" responsive />`;

const SNIP_LINE = `import { LineChart } from "@lacspace/charts";

<LineChart
  labels={months}
  series={[
    { name: "MRR", data: mrr },
    { name: "Plan", data: plan, dashed: true },
  ]}
  curve
  dots
  tooltip
  responsive
  dataTable
  formatValue={(n) => "$" + n + "k"}
/>`;

const SNIP_AREA = `import { AreaChart } from "@lacspace/charts";

<AreaChart
  labels={weeks}
  series={sessionsByChannel}
  stacked
  curve
  tooltip
  responsive
  formatValue={(n) => n.toFixed(1) + "k"}
/>`;

const SNIP_BAR = `import { BarChart } from "@lacspace/charts";

<BarChart
  labels={["Q1", "Q2", "Q3", "Q4"]}
  series={[
    { name: "FY25", data: [412, 468, 501, 588] },
    { name: "FY26", data: [503, 574, 662, 741] },
  ]}
  tooltip
  responsive
/>`;

const SNIP_BAR_H = `<BarChart
  labels={referrers}
  series={[{ name: "Signups", data: signups }]}
  orientation="horizontal"
  valueLabels
  legend={false}
  responsive
  margin={{ left: 120 }}
/>`;

const SNIP_PIE = `import { PieChart } from "@lacspace/charts";

<PieChart
  data={[
    { label: "Organic search", value: 42.4 },
    { label: "Direct", value: 23.8 },
  ]}
  sliceLabels
  tooltip
  responsive
/>`;

const SNIP_DONUT = `import { DonutChart } from "@lacspace/charts";

<DonutChart
  data={ordersByRegion}
  center={<><strong>14,280</strong><span>orders</span></>}
  tooltip
  responsive
/>`;

const SNIP_GAUGE = `import { Gauge } from "@lacspace/charts";

<Gauge
  value={68}
  caption="Error budget consumed"
  bands={[
    { from: 0, to: 60, color: "#34d399", label: "healthy" },
    { from: 60, to: 85, color: "#fbbf24", label: "watch" },
    { from: 85, to: 100, color: "#f87171", label: "critical" },
  ]}
  responsive
/>`;

const SNIP_HEAT_MATRIX = `import { Heatmap } from "@lacspace/charts";

<Heatmap
  rows={["Mon", "Tue", "Wed"]}
  columns={["00", "03", "06"]}
  data={[[3, 2, 6], [2, 1, 7], [4, 2, 8]]}
  from="#0f1b2d"
  to="#4d9fff"
  tooltip
/>`;

const SNIP_HEAT_CAL = `<Heatmap
  variant="calendar"
  values={[{ date: "2026-03-14", value: 5 }]}
  from="#0f1b2d"
  to="#4d9fff"
  tooltip
/>`;

const SNIP_RADAR = `import { RadarChart } from "@lacspace/charts";

<RadarChart
  axes={["Throughput", "Latency", "DX", "Docs", "Security", "Cost"]}
  series={[
    { name: "Meridian Cloud", data: [8.6, 7.9, 9.1, 8.2, 8.8, 6.4] },
    { name: "Category median", data: [6.8, 7.1, 6.2, 5.9, 7.4, 7.6] },
  ]}
  maxValue={10}
  ringLabels
  responsive
/>`;

const SNIP_FUNNEL = `import { FunnelChart } from "@lacspace/charts";

<FunnelChart
  stages={[
    { label: "Visited pricing", value: 48200 },
    { label: "Started signup", value: 19140 },
    { label: "Converted to paid", value: 1120 },
  ]}
  conversion
  showShare
  responsive
/>`;

const SNIP_CANDLE = `import { CandlestickChart } from "@lacspace/charts";

<CandlestickChart
  data={[{ label: "Mon", open: 128.4, high: 131.2, low: 127.1, close: 130.6 }]}
  tooltip
  responsive
  formatValue={(n) => "$" + n.toFixed(2)}
/>`;

function ChartsSection() {
  return (
    <section className="sec" id="charts">
      <SectionHead
        id="charts-head"
        eyebrow="@lacspace/charts"
        title="Twelve chart types, zero dependencies"
        blurb="Real SVG — every mark is an element with a class and a data-* attribute. No canvas, no D3, no chart engine. Hover the line, bar, pie, donut, heatmap and candlestick charts: the tooltips are live."
      />

      <p className="dv-note">
        <span aria-hidden>▲</span>
        <span>
          <b>Fictional sample data.</b> Every figure on this page belongs to &ldquo;Meridian Cloud&rdquo;, an
          invented company used to demonstrate the components. None of it describes Lacspace or any real customer.
        </span>
      </p>

      <div className="dv-grid two">
        {/* Sparklines, in the place they actually belong: beside a number. */}
        <Preview
          span
          name="Sparkline · SparkBars"
          tag="inline"
          when="A trend at the size of a word — put it beside the number it describes, never on its own."
          code={SNIP_SPARK}
        >
          <div className="dv-stats">
            <div className="dv-stat">
              <span className="dv-stat-k">MRR</span>
              <span className="dv-stat-v">$348k</span>
              <span className="dv-stat-d up">+5.8% MoM</span>
              <div className="dv-stat-s">
                <Sparkline data={MRR} width={160} height={40} area curve lastDot responsive label="MRR, last 12 months" />
              </div>
            </div>
            <div className="dv-stat">
              <span className="dv-stat-k">Active workspaces</span>
              <span className="dv-stat-v">1,842</span>
              <span className="dv-stat-d up">+33 this month</span>
              <div className="dv-stat-s">
                <Sparkline data={WORKSPACES} width={160} height={40} curve lastDot responsive label="Active workspaces, last 12 months" />
              </div>
            </div>
            <div className="dv-stat">
              <span className="dv-stat-k">Net new seats / wk</span>
              <span className="dv-stat-v">103</span>
              <span className="dv-stat-d up">3 down weeks in 12</span>
              <div className="dv-stat-s">
                <SparkBars
                  data={NET_NEW_SEATS}
                  width={160}
                  height={40}
                  highlightLast
                  negativeColor="#f87171"
                  responsive
                  label="Net new seats per week"
                />
              </div>
            </div>
            <div className="dv-stat">
              <span className="dv-stat-k">p95 API latency</span>
              <span className="dv-stat-v">214 ms</span>
              <span className="dv-stat-d up">−54 ms this year</span>
              <div className="dv-stat-s">
                <Sparkline data={LATENCY_P95} width={160} height={40} area curve lastDot responsive label="p95 latency, last 12 months" />
              </div>
            </div>
          </div>
        </Preview>

        <Preview
          name="LineChart"
          tag="tooltip on"
          when="A continuous measure over time, and how it tracked against the plan. Hover for the nearest point."
          code={SNIP_LINE}
        >
          <LineChart
            labels={MONTHS}
            series={[
              { name: "MRR", data: MRR },
              { name: "Plan", data: PLAN, dashed: true },
            ]}
            width={640}
            height={300}
            curve
            dots
            tooltip
            responsive
            dataTable
            formatValue={(n) => "$" + n + "k"}
          />
        </Preview>

        <Preview
          name="AreaChart"
          tag="stacked"
          when="What makes up a total. Stack when the parts sum to something meaningful; leave it overlapping to compare them."
          code={SNIP_AREA}
        >
          <AreaChart
            labels={WEEK_LABELS}
            series={SESSIONS}
            width={640}
            height={300}
            stacked
            curve
            tooltip
            responsive
            formatValue={thousands}
          />
        </Preview>

        <Preview
          name="BarChart"
          tag="grouped"
          when="Compare discrete buckets side by side. Two or more series group automatically; add `stacked` for composition."
          code={SNIP_BAR}
        >
          <BarChart
            labels={QUARTERS}
            series={BOOKINGS}
            width={640}
            height={300}
            tooltip
            responsive
            formatValue={(n) => "$" + n + "k"}
          />
        </Preview>

        <Preview
          name="BarChart · horizontal"
          tag="ranked"
          when="Long category names, ranked. Horizontal bars give the labels room that a rotated x axis never does."
          code={SNIP_BAR_H}
        >
          <BarChart
            labels={REFERRERS}
            series={REFERRER_SIGNUPS}
            width={640}
            height={300}
            orientation="horizontal"
            valueLabels
            legend={false}
            responsive
            margin={{ left: 120 }}
          />
        </Preview>

        <Preview
          name="PieChart"
          tag="tooltip on"
          when="Parts of one whole, when there are five or fewer of them and the shares are far apart."
          code={SNIP_PIE}
        >
          <PieChart
            data={TRAFFIC_SOURCES}
            width={360}
            height={300}
            sliceLabels
            tooltip
            responsive
            formatValue={percent}
          />
        </Preview>

        <Preview
          name="DonutChart"
          tag="centre slot"
          when="The same question as a pie, but the hole carries the number the chart is really about."
          code={SNIP_DONUT}
        >
          <DonutChart
            data={ORDERS_BY_REGION}
            width={360}
            height={300}
            tooltip
            responsive
            formatValue={counts}
            center={
              <>
                <strong>14,280</strong>
                <span>orders</span>
              </>
            }
          />
        </Preview>

        <Preview
          name="Gauge"
          tag="bands"
          when="One number against the range it is allowed to be in. Without threshold bands a gauge is just a number in a circle."
          code={SNIP_GAUGE}
        >
          <Gauge
            value={68}
            width={340}
            height={230}
            caption="Error budget consumed"
            formatValue={percent}
            responsive
            bands={[
              { from: 0, to: 60, color: "#34d399", label: "healthy" },
              { from: 60, to: 85, color: "#fbbf24", label: "watch" },
              { from: 85, to: 100, color: "#f87171", label: "critical" },
            ]}
          />
        </Preview>

        <Preview
          name="Heatmap · matrix"
          tag="tooltip on"
          when="Two categorical axes and one measure — support load by weekday and hour, cohorts, correlations."
          code={SNIP_HEAT_MATRIX}
          fill={false}
          scroll
        >
          <Heatmap
            rows={TICKET_DAYS}
            columns={TICKET_HOURS}
            data={TICKET_MATRIX}
            from="#0f1b2d"
            to="#4d9fff"
            tooltip
            formatValue={(n) => n + " tickets"}
            label="Support tickets by weekday and hour"
          />
        </Preview>

        <Preview
          span
          name="Heatmap · calendar"
          tag="scrolls sideways"
          when="A year of a daily count. Kept at its natural cell size and scrolled rather than squashed, because a 2px cell says nothing."
          code={SNIP_HEAT_CAL}
          fill={false}
          scroll
        >
          <Heatmap
            variant="calendar"
            values={DEPLOYS}
            from="#0f1b2d"
            to="#4d9fff"
            tooltip
            formatValue={(n) => n + " deploys"}
            label="Deploys per day over the last year"
          />
        </Preview>

        <Preview
          name="RadarChart"
          tag="scorecard"
          when="Several things scored on the same axes. The floor stays at zero — a truncated radar exaggerates by area."
          code={SNIP_RADAR}
        >
          <RadarChart
            axes={SCORECARD_AXES}
            series={SCORECARD}
            width={400}
            height={340}
            maxValue={10}
            ringLabels
            responsive
          />
        </Preview>

        <Preview
          name="FunnelChart"
          tag="conversion"
          when="How many made it to each step and where they left. Width is the share of the first stage; the rate beside it is against the previous one."
          code={SNIP_FUNNEL}
        >
          <FunnelChart
            stages={SIGNUP_FUNNEL}
            width={460}
            height={320}
            colors={FUNNEL_RAMP}
            responsive
            formatValue={counts}
          />
        </Preview>

        <Preview
          name="CandlestickChart"
          tag="tooltip on"
          when="Open, high, low and close per period. Hover a candle for the full OHLC."
          code={SNIP_CANDLE}
        >
          <CandlestickChart
            data={TICKER_WEEK}
            width={600}
            height={300}
            tooltip
            responsive
            upColor="#34d399"
            downColor="#f87171"
            formatValue={money}
            label="MRDN, one trading week (fictional)"
          />
        </Preview>
      </div>
    </section>
  );
}

/* ==========================================================================
   2 — Data table
   ========================================================================== */

interface Account {
  id: string;
  account: string;
  plan: "starter" | "growth" | "scale" | "enterprise";
  status: "active" | "trial" | "past_due" | "churned";
  seats: number;
  mrr: number;
  renews: Date;
  autoRenew: boolean;
  owner: string;
  region: string;
}

const ACCOUNT_NAMES = [
  "Alder & Finch", "Beacon Freight", "Cobalt Studio", "Dunmore Health", "Everline Media",
  "Fernwood Labs", "Glasshouse Co", "Harbourline", "Ironvale Group", "Juniper Bay",
  "Kestrel Works", "Lumen Partners", "Marrow & Co", "Northgate Union", "Oakfield Digital",
  "Pinecrest Foods", "Quaystone", "Redwing Logistics", "Saltmarsh Bank", "Thornbury Rail",
  "Umbra Interactive", "Vantage Peak", "Westbrook Legal", "Xenith Robotics", "Yarrow Textiles",
  "Zephyr Grid", "Ambercroft", "Blackwater Marine", "Clearwater Dental", "Drayton Motors",
  "Elmhurst Realty", "Foxglove Retail", "Granite Row", "Hollow Pine", "Inkwell Press",
  "Jetstream Air", "Kiln & Coal", "Larkspur Health", "Mistral Energy", "Nettlebed Farms",
];

const PLANS = ["starter", "growth", "scale", "enterprise"] as const;
const STATUSES = ["active", "active", "active", "trial", "past_due", "churned"] as const;
const OWNERS = ["A. Rahman", "J. Okafor", "M. Silva", "P. Novak", "T. Andersen", "R. Iyer"];
const REGIONS = ["APAC", "EMEA", "AMER", "LATAM"];
const UNIT_PRICE: Record<Account["plan"], number> = { starter: 9, growth: 19, scale: 34, enterprise: 58 };

const ACCOUNTS: Account[] = ACCOUNT_NAMES.map((account, i) => {
  const plan = PLANS[(i * 3 + 1) % PLANS.length];
  const status = STATUSES[(i * 5 + 2) % STATUSES.length];
  const seats = 8 + ((i * 17) % 240);
  return {
    id: "ACC-" + (1042 + i * 7),
    account,
    plan,
    status,
    seats,
    mrr: status === "churned" ? 0 : seats * UNIT_PRICE[plan],
    renews: makeDate(2026, (i * 5) % 12, 1 + ((i * 11) % 27)),
    autoRenew: status !== "churned" && i % 5 !== 3,
    owner: OWNERS[i % OWNERS.length] as string,
    region: REGIONS[i % REGIONS.length] as string,
  };
});

const SNIP_TABLE = `import { DataTable, textColumn, badgeColumn, currencyColumn, dateColumn } from "@lacspace/table";
import "@lacspace/table/styles.css";

<DataTable<Account>
  caption="Account book"
  data={accounts}
  getRowId={(row) => row.id}
  columns={[
    textColumn<Account>("account", { header: "Account", key: "account", pinned: "left", width: 200 }),
    badgeColumn<Account>("status", {
      header: "Status",
      key: "status",
      tones: { active: "success", trial: "info", past_due: "warning", churned: "danger" },
    }),
    currencyColumn<Account>("mrr", { header: "MRR", key: "mrr", currency: "USD", aggregate: "sum" }),
    dateColumn<Account>("renews", { header: "Renews", key: "renews" }),
  ]}
  defaultSort={[{ id: "mrr", direction: "desc" }]}
  searchable
  selectable
  exportable
  columnMenu
  stickyHeader
  maxHeight={460}
  density="compact"
/>`;

interface Agent {
  id: string;
  agent: string;
  resolved: number;
  csat: number;
  firstReply: number;
}

const AGENTS: Agent[] = [
  { id: "ag-01", agent: "Priya Sharma", resolved: 284, csat: 4.8, firstReply: 6 },
  { id: "ag-02", agent: "Tomas Berg", resolved: 251, csat: 4.6, firstReply: 8 },
  { id: "ag-03", agent: "Leila Haddad", resolved: 243, csat: 4.9, firstReply: 5 },
  { id: "ag-04", agent: "Daniel Okoro", resolved: 229, csat: 4.4, firstReply: 11 },
  { id: "ag-05", agent: "Mei Chen", resolved: 218, csat: 4.7, firstReply: 7 },
  { id: "ag-06", agent: "Owen Pryce", resolved: 197, csat: 4.2, firstReply: 14 },
  { id: "ag-07", agent: "Sofia Ruiz", resolved: 186, csat: 4.5, firstReply: 9 },
  { id: "ag-08", agent: "Jonas Vetter", resolved: 174, csat: 4.1, firstReply: 16 },
  { id: "ag-09", agent: "Nadia Petrova", resolved: 168, csat: 4.6, firstReply: 8 },
  { id: "ag-10", agent: "Kwame Mensah", resolved: 155, csat: 4.3, firstReply: 12 },
  { id: "ag-11", agent: "Hana Ito", resolved: 149, csat: 4.8, firstReply: 6 },
  { id: "ag-12", agent: "Ruben Castro", resolved: 132, csat: 4.0, firstReply: 18 },
];

const AGENT_COLUMNS: Array<AnyColumn<Agent>> = [
  textColumn<Agent>("agent", { header: "Agent", key: "agent" }),
  numberColumn<Agent>("resolved", { header: "Resolved", key: "resolved", locale: "en-US" }),
  numberColumn<Agent>("csat", { header: "CSAT", key: "csat", locale: "en-US", decimals: 1 }),
];

const MAX_RESOLVED = Math.max(...AGENTS.map((a) => a.resolved));

const SORT_BUTTONS: Array<{ id: string; label: string }> = [
  { id: "agent", label: "Name" },
  { id: "resolved", label: "Resolved" },
  { id: "csat", label: "CSAT" },
];

const SNIP_HEADLESS = `import { useTable, textColumn, numberColumn } from "@lacspace/table";

const table = useTable<Agent>({
  data: agents,
  columns: [
    textColumn<Agent>("agent", { key: "agent" }),
    numberColumn<Agent>("resolved", { key: "resolved" }),
    numberColumn<Agent>("csat", { key: "csat", decimals: 1 }),
  ],
  getRowId: (row) => row.id,
  defaultSort: [{ id: "resolved", direction: "desc" }],
  defaultPageSize: 5,
});

// …then render whatever you like:
<input value={table.query} onChange={(e) => table.setQuery(e.target.value)} />
<button onClick={() => table.toggleSort("csat")}>CSAT</button>
<ul>
  {table.rows.map((model) => (
    <li key={model.id} onClick={() => table.toggleRowSelected(model.id)}>
      {model.row.agent} — {model.row.resolved}
    </li>
  ))}
</ul>
<button disabled={!table.canNextPage} onClick={table.nextPage}>
  Next — {table.range.from}–{table.range.to} of {table.range.total}
</button>`;

function HeadlessLeaderboard() {
  const table = useTable<Agent>({
    data: AGENTS,
    columns: AGENT_COLUMNS,
    getRowId: (row) => row.id,
    locale: "en-US",
    defaultSort: [{ id: "resolved", direction: "desc" }],
    defaultPageSize: 5,
  });

  return (
    <div className="dv-head-demo">
      <div className="dv-controls">
        <input
          className="dv-input"
          value={table.query}
          onChange={(e) => table.setQuery(e.target.value)}
          placeholder="Filter agents…"
          aria-label="Filter agents"
        />
        {SORT_BUTTONS.map((b) => {
          const dir = table.sortDirection(b.id);
          return (
            <button
              key={b.id}
              type="button"
              className="dv-sort"
              data-active={dir !== false}
              onClick={() => table.toggleSort(b.id)}
            >
              {b.label} {dir === "asc" ? "▲" : dir === "desc" ? "▼" : "↕"}
            </button>
          );
        })}
      </div>

      <ul className="dv-lead">
        {table.rows.map((model) => (
          <li key={model.id}>
            <button
              type="button"
              className="dv-leadrow"
              data-selected={model.selected}
              aria-pressed={model.selected}
              onClick={() => table.toggleRowSelected(model.id)}
            >
              <span className="dv-rank">{model.index + 1 + table.pageIndex * table.pageSize}</span>
              <span className="dv-agent">
                <span className="dv-agent-n">{model.row.agent}</span>
                <span className="dv-meter">
                  <i style={{ width: Math.round((model.row.resolved / MAX_RESOLVED) * 100) + "%" }} />
                </span>
              </span>
              <span className="dv-num">
                <b>{model.row.resolved}</b> · {model.row.csat.toFixed(1)}★
              </span>
            </button>
          </li>
        ))}
      </ul>

      {table.rows.length === 0 ? <p className="dv-when">No agent matches that filter.</p> : null}

      <div className="dv-pager">
        <button type="button" onClick={table.previousPage} disabled={!table.canPreviousPage}>
          ← Prev
        </button>
        <button type="button" onClick={table.nextPage} disabled={!table.canNextPage}>
          Next →
        </button>
        <span className="sp">
          {table.range.from}–{table.range.to} of {table.range.total}
          {table.selected.length > 0 ? " · " + table.selected.length + " picked" : ""}
        </span>
      </div>
    </div>
  );
}

function TableSection() {
  const [selected, setSelected] = useState<string[]>([]);
  const [log, setLog] = useState<string>("");

  const columns = useMemo<Array<AnyColumn<Account>>>(
    () => [
      textColumn<Account>("account", {
        header: "Account",
        key: "account",
        pinned: "left",
        width: 200,
        getSearchText: (row) => row.account + " " + row.id,
      }),
      badgeColumn<Account>("plan", {
        header: "Plan",
        key: "plan",
        width: 120,
        labels: { starter: "Starter", growth: "Growth", scale: "Scale", enterprise: "Enterprise" },
        tones: { starter: "default", growth: "info", scale: "accent", enterprise: "success" },
      }),
      badgeColumn<Account>("status", {
        header: "Status",
        key: "status",
        width: 120,
        labels: { active: "Active", trial: "Trial", past_due: "Past due", churned: "Churned" },
        tones: { active: "success", trial: "info", past_due: "warning", churned: "danger" },
      }),
      numberColumn<Account>("seats", {
        header: "Seats",
        key: "seats",
        width: 100,
        locale: "en-US",
        aggregate: "sum",
      }),
      currencyColumn<Account>("mrr", {
        header: "MRR",
        key: "mrr",
        width: 130,
        currency: "USD",
        locale: "en-US",
        decimals: 0,
        aggregate: "sum",
      }),
      dateColumn<Account>("renews", {
        header: "Renews",
        key: "renews",
        width: 140,
        locale: "en-GB",
        format: { day: "2-digit", month: "short", year: "numeric" },
      }),
      booleanColumn<Account>("autoRenew", {
        header: "Auto-renew",
        name: "Auto-renew",
        key: "autoRenew",
        width: 120,
        align: "center",
        trueLabel: "Yes",
        falseLabel: "No",
      }),
      textColumn<Account>("region", { header: "Region", key: "region", width: 110, defaultHidden: true }),
      linkColumn<Account>("owner", {
        header: "Owner",
        key: "owner",
        width: 150,
        href: (row) => "#account-" + row.id,
      }),
      actionsColumn<Account>("actions", {
        header: "",
        name: "Actions",
        width: 140,
        actions: [
          { label: "Nudge", onSelect: (row) => setLog("Renewal nudge queued for " + row.account) },
          {
            label: "Pause",
            tone: "danger",
            disabled: (row) => row.status === "churned",
            onSelect: (row) => setLog("Billing paused on " + row.account),
          },
        ],
      }),
    ],
    [],
  );

  return (
    <section className="sec" id="tables">
      <SectionHead
        id="tables-head"
        eyebrow="@lacspace/table"
        title="A data table that actually does the work"
        blurb="Sorting, global search, pagination, row selection, column show/hide, pinned columns, expandable rows, footer totals and a real CSV download — all of it live below, on 40 rows of invented account data."
      />

      <div className="dv-tablewrap">
        <DataTable<Account>
          caption="Meridian Cloud — sample account book"
          captionVisible={false}
          data={ACCOUNTS}
          columns={columns}
          getRowId={(row) => row.id}
          getRowLabel={(row) => row.account}
          locale="en-US"
          defaultSort={[{ id: "mrr", direction: "desc" }]}
          defaultPageSize={10}
          pageSizeOptions={[10, 25, 40]}
          density="compact"
          striped
          stickyHeader
          maxHeight={460}
          layout="fixed"
          searchable
          searchPlaceholder="Search account, owner or id…"
          columnMenu
          columnMenuLabel="Columns"
          exportable
          exportLabel="Export CSV"
          exportFilename="meridian-accounts.csv"
          selectable
          onSelectedChange={(next) => setSelected([...next])}
          renderDetail={({ row, collapse }) => (
            <div className="dv-readout">
              <span>
                <b>{row.account}</b> · {row.id}
              </span>
              <span>
                Region <b>{row.region}</b>
              </span>
              <span>
                Owner <b>{row.owner}</b>
              </span>
              <span>
                Seats <b>{row.seats}</b> on <b>{row.plan}</b>
              </span>
              <button type="button" className="dv-toggle" onClick={collapse}>
                Close
              </button>
            </div>
          )}
        />

        <div className="dv-bar">
          <span>
            Selected: <b>{selected.length}</b> of {ACCOUNTS.length}
          </span>
          <span>Click a row&rsquo;s chevron to expand it. Shift-click a header for a second sort key.</span>
          {log ? <span className="dv-log">{log}</span> : null}
        </div>
      </div>

      <div className="dv-grid two" style={{ marginTop: 18 }}>
        <Preview
          name="DataTable"
          tag="above"
          when="The batteries-included table: pass data and columns, switch the features on with booleans."
          code={SNIP_TABLE}
          fill={false}
        >
          <p className="dv-when" style={{ margin: 0 }}>
            The table above is this snippet, with a few more columns. Column helpers carry the read, so sorting,
            search, footer totals and the CSV export are all written once.
          </p>
        </Preview>

        <Preview
          name="useTable"
          tag="headless"
          when="The same engine with no markup. Search, sort, paginate and select — rendered as a list instead of a table."
          code={SNIP_HEADLESS}
          fill={false}
        >
          <HeadlessLeaderboard />
        </Preview>
      </div>
    </section>
  );
}

/* ==========================================================================
   3 — Dates
   ========================================================================== */

const SNIP_CALENDAR = `import { Calendar } from "@lacspace/date";
import "@lacspace/date/styles.css";

<Calendar
  value={day}
  onChange={setDay}
  weekStartsOn={1}
  fixedWeeks
  showWeekNumbers
  disabledWeekdays={[0, 6]}
/>`;

const SNIP_DATEPICKER = `import { DatePicker } from "@lacspace/date";

<DatePicker
  format="dd/MM/yyyy"
  weekStartsOn={1}
  clearable
  showTodayButton
  onChange={setDay}
  onInvalidInput={(text) => console.warn("could not read", text)}
/>`;

const SNIP_RANGE = `import { DateRangePicker, defaultPresets } from "@lacspace/date";

<DateRangePicker
  numberOfMonths={2}
  weekStartsOn={1}
  minNights={1}
  presets={defaultPresets()}
  separator=" – "
  onChange={(range) => setRange(range)}
/>`;

const SNIP_TIME = `import { TimePicker } from "@lacspace/date";

<TimePicker label="Start time" use12Hour minuteStep={15} value={time} onChange={setTime} />`;

const SNIP_DATETIME = `import { DateTimePicker } from "@lacspace/date";

<DateTimePicker format="yyyy-MM-dd HH:mm" minuteStep={15} clearable onChange={setWhen} />`;

const SNIP_MONTHYEAR = `import { MonthPicker, YearPicker } from "@lacspace/date";

<MonthPicker defaultYear={2026} monthFormat="short" onChange={setMonth} />
<YearPicker pageSize={12} onChange={setYear} />`;

const SNIP_WEEK = `import { WeekPicker } from "@lacspace/date";

<WeekPicker weekStartsOn={1} onChange={(week) => setWeek(week)} /> // { start, end }`;

const SNIP_SCHEDULE = `import { ScheduleGrid } from "@lacspace/date";

<ScheduleGrid
  startDate={monday}
  days={5}
  startHour={9}
  endHour={15}
  slotMinutes={60}
  multiple
  maxSelected={3}
  isSlotDisabled={(slot) => slot.getHours() === 12}
  onChange={setSlots}
/>`;

const SNIP_RELATIVE = `import { RelativeTime } from "@lacspace/date";

<RelativeTime value={event.createdAt} cutoffDays={30} absoluteFormat="d MMM yyyy" />`;

const FALLBACK_TODAY = makeDate(2026, 8, 23);

function DatesSection() {
  const [now, setNow] = useState<Date | null>(null);
  const [today, setToday] = useState<Date>(FALLBACK_TODAY);

  const [day, setDay] = useState<Date | null>(null);
  const [picked, setPicked] = useState<Date | null>(null);
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  const [time, setTime] = useState<TimeValue | null>(null);
  const [when, setWhen] = useState<Date | null>(null);
  const [month, setMonth] = useState<Date | null>(null);
  const [year, setYear] = useState<Date | null>(null);
  const [week, setWeek] = useState<CompleteRange | null>(null);
  const [slots, setSlots] = useState<Date[]>([]);

  useEffect(() => {
    const stamp = new Date();
    setNow(stamp);
    setToday(startOfDay(stamp));
  }, []);

  const mounted = now !== null;
  const weekStart = useMemo(() => startOfWeek(today, 1), [today]);
  const nights = range.start && range.end ? nightsBetween(range.start, range.end) : 0;

  /** Placeholder with the same footprint, so nothing jumps when the pickers mount. */
  const skeleton = <div className="dv-skel" aria-hidden />;

  return (
    <section className="sec" id="dates">
      <SectionHead
        id="dates-head"
        eyebrow="@lacspace/date"
        title="Every date field, and no date library"
        blurb="Calendars, pickers, ranges with presets, a time picker, a booking grid and a self-updating “3 minutes ago” — with the full WAI-ARIA keyboard pattern and not one runtime dependency. Click anything below; it all works."
      />

      <div className="dv-grid two">
        <Preview
          name="Calendar"
          tag="keyboard grid"
          when="A month grid on the page rather than in a popover. Arrows move a day, PageUp/PageDown a month, Enter selects."
          code={SNIP_CALENDAR}
          fill={false}
          readout={
            <span>
              Selected: <b>{day ? formatDate(day, "EEEE d MMMM yyyy") : "nothing yet"}</b>
            </span>
          }
        >
          {mounted ? (
            <Calendar
              value={day}
              onChange={setDay}
              weekStartsOn={1}
              fixedWeeks
              showWeekNumbers
              clearOnReselect
              disabledWeekdays={[0, 6]}
              size="sm"
            />
          ) : (
            skeleton
          )}
        </Preview>

        <Preview
          name="DatePicker"
          tag="typeable"
          when="A real input plus a popover. Typed text is parsed against `format`, and 31/02 is rejected rather than rolled forward."
          code={SNIP_DATEPICKER}
          popover
          readout={
            <span>
              Value: <b>{picked ? formatDate(picked, "yyyy-MM-dd") : "null"}</b>
            </span>
          }
        >
          {mounted ? (
            <DatePicker
              value={picked}
              onChange={setPicked}
              format="dd/MM/yyyy"
              weekStartsOn={1}
              clearable
              showTodayButton
              min={makeDate(today.getFullYear() - 2, 0, 1)}
              max={makeDate(today.getFullYear() + 2, 11, 31)}
              placeholder="dd/MM/yyyy"
            />
          ) : (
            skeleton
          )}
        </Preview>

        <Preview
          name="DateRangePicker"
          tag="presets"
          when="Two months, a hover preview and the reporting shortcuts you would otherwise write by hand every time."
          code={SNIP_RANGE}
          popover
          readout={
            <>
              <span>
                Start: <b>{range.start ? formatDate(range.start, "yyyy-MM-dd") : "—"}</b>
              </span>
              <span>
                End: <b>{range.end ? formatDate(range.end, "yyyy-MM-dd") : "—"}</b>
              </span>
              <span>
                Nights: <b>{nights}</b>
              </span>
            </>
          }
        >
          {mounted ? (
            <DateRangePicker
              value={range}
              onChange={setRange}
              numberOfMonths={2}
              weekStartsOn={1}
              minNights={1}
              presets={defaultPresets()}
              separator=" – "
              clearable
            />
          ) : (
            skeleton
          )}
        </Preview>

        <Preview
          name="TimePicker"
          tag="spinbuttons"
          when="Hours, minutes and an optional AM/PM toggle, each segment its own spinbutton. Type 09, or step with the arrow keys."
          code={SNIP_TIME}
          fill={false}
          readout={
            <span>
              Value: <b>{time ? formatTimeValue(time) : "null"}</b>
            </span>
          }
        >
          {mounted ? (
            <TimePicker label="Start time" use12Hour minuteStep={15} value={time} onChange={setTime} />
          ) : (
            skeleton
          )}
        </Preview>

        <Preview
          name="DateTimePicker"
          tag="one field"
          when="A day and a time in one popover. Picking a day keeps the time already chosen, and vice versa."
          code={SNIP_DATETIME}
          popover
          readout={
            <span>
              Value: <b>{when ? formatDate(when, "yyyy-MM-dd HH:mm") : "null"}</b>
            </span>
          }
        >
          {mounted ? (
            <DateTimePicker
              value={when}
              onChange={setWhen}
              format="yyyy-MM-dd HH:mm"
              weekStartsOn={1}
              minuteStep={15}
              clearable
              placeholder="yyyy-MM-dd HH:mm"
            />
          ) : (
            skeleton
          )}
        </Preview>

        <Preview
          name="MonthPicker"
          tag="12 cells"
          when="A reporting period, not a day. Yields the 1st of the month at midnight, so it stores and compares cleanly."
          code={SNIP_MONTHYEAR}
          fill={false}
          readout={
            <span>
              Value: <b>{month ? formatDate(month, "MMMM yyyy") : "null"}</b>
            </span>
          }
        >
          {mounted ? (
            <MonthPicker value={month} onChange={setMonth} monthFormat="short" size="sm" />
          ) : (
            skeleton
          )}
        </Preview>

        <Preview
          name="YearPicker"
          tag="paged"
          when="A page of years, anchored to the selection rather than to this decade — which is what a date-of-birth field needs."
          code={SNIP_MONTHYEAR}
          fill={false}
          readout={
            <span>
              Value: <b>{year ? formatDate(year, "yyyy") : "null"}</b>
            </span>
          }
        >
          {mounted ? <YearPicker value={year} onChange={setYear} pageSize={12} size="sm" /> : skeleton}
        </Preview>

        <Preview
          name="WeekPicker"
          tag="whole rows"
          when="“Week ending 14 March” fields. Click any day and it takes the whole week; hovering previews the row."
          code={SNIP_WEEK}
          fill={false}
          readout={
            <span>
              Week:{" "}
              <b>
                {week
                  ? formatDate(week.start, "d MMM") + " – " + formatDate(week.end, "d MMM yyyy")
                  : "nothing yet"}
              </b>
            </span>
          }
        >
          {mounted ? (
            <WeekPicker value={week} onChange={setWeek} weekStartsOn={1} fixedWeeks size="sm" />
          ) : (
            skeleton
          )}
        </Preview>

        <Preview
          span
          name="ScheduleGrid"
          tag="booking"
          when="Days across, times down, every cell a real button. Lunch is blocked and you can hold at most three slots."
          code={SNIP_SCHEDULE}
          fill={false}
          readout={
            <>
              <span>
                Chosen: <b>{slots.length}</b> / 3
              </span>
              {slots.length > 0 ? (
                <span>
                  {slots
                    .slice()
                    .sort((a, b) => a.getTime() - b.getTime())
                    .map((s) => formatDate(s, "EEE HH:mm"))
                    .join(", ")}
                </span>
              ) : (
                <span>Click a slot to book it.</span>
              )}
            </>
          }
        >
          {mounted ? (
            <ScheduleGrid
              startDate={weekStart}
              days={5}
              startHour={9}
              endHour={15}
              slotMinutes={60}
              value={slots}
              onChange={setSlots}
              multiple
              maxSelected={3}
              isSlotDisabled={(slot) => slot.getHours() === 12}
              size="sm"
            />
          ) : (
            skeleton
          )}
        </Preview>

        <Preview
          name="RelativeTime"
          tag="self-updating"
          when="“3 minutes ago”, kept current — every second while it is seconds, hourly once it is days. Hydration-safe by construction."
          code={SNIP_RELATIVE}
          fill={false}
        >
          {now ? (
            <ul className="dv-relative">
              <li>
                <span>Deploy finished</span>
                <RelativeTime value={addMinutes(now, -4)} cutoffDays={30} absoluteFormat="d MMM yyyy" />
              </li>
              <li>
                <span>Invoice INV-4471 paid</span>
                <RelativeTime value={addHours(now, -5)} cutoffDays={30} absoluteFormat="d MMM yyyy" />
              </li>
              <li>
                <span>Workspace created</span>
                <RelativeTime value={addDays(now, -2)} cutoffDays={30} absoluteFormat="d MMM yyyy" />
              </li>
              <li>
                <span>Plan upgraded to Scale</span>
                <RelativeTime value={addDays(now, -9)} cutoffDays={30} absoluteFormat="d MMM yyyy" />
              </li>
              <li>
                <span>Account opened</span>
                <RelativeTime value={addDays(now, -64)} cutoffDays={30} absoluteFormat="d MMM yyyy" />
              </li>
            </ul>
          ) : (
            skeleton
          )}
        </Preview>
      </div>
    </section>
  );
}

/* ==========================================================================
   Export
   ========================================================================== */

export function DataVizSections() {
  return (
    <div className="dv">
      <ChartsSection />
      <TableSection />
      <DatesSection />
    </div>
  );
}
