/**
 * /components — the @lacspace UI gallery.
 *
 * Server component: metadata, JSON-LD, the page shell and the full export
 * reference. Everything interactive lives in ./gallery.tsx.
 *
 * The stylesheets are imported here, once, exactly as an app would:
 *   import "@lacspace/components/styles.css";
 * All four packages share the same --lac-* tokens, so importing them together
 * costs one theme, not four.
 */
import "@lacspace/components/styles.css";
import "@lacspace/charts/styles.css";
import "@lacspace/table/styles.css";
import "@lacspace/date/styles.css";
import "./gallery.css";

import { DevHeader } from "./dev-header";
import { DevFooter } from "./dev-footer";
import { Reveal } from "./reveal";
import { CodeBlock } from "./code-block";
import { Gallery } from "./gallery";
import { site } from "../lib/seo";

/* ==========================================================================
   The full export reference.

   Generated from each package's src/index.tsx export list and grouped by the
   module the exports come from, so nothing on npm is missing from this page.
   `components` counts the exports that are React components; `values` counts
   every runtime export (components, hooks, pure functions and constants);
   `types` counts the TypeScript types shipped alongside them.
   ========================================================================== */

type RefGroup = { t: string; v: string[]; y: string[] };
type RefPkg = {
  npm: string;
  blurb: string;
  components: number;
  values: number;
  types: number;
  groups: RefGroup[];
};

const REFERENCE: RefPkg[] = [
  {
    npm: "@lacspace/components",
    blurb: "Buttons, inputs, overlays, navigation, data display, layout and type — the whole application surface.",
    components: 96,
    values: 175,
    types: 159,
    groups: [
      {
        t: "Utilities & hooks",
        v: ["cx", "clamp", "percent", "useControllable", "useStableId"],
        y: ["Size", "Tone"],
      },
      {
        t: "Stylesheet",
        v: ["LacspaceStyles", "componentsCss"],
        y: [],
      },
      {
        t: "Actions",
        v: ["Button", "ButtonGroup", "IconButton"],
        y: ["ButtonProps", "ButtonGroupProps", "ButtonVariant", "IconButtonProps"],
      },
      {
        t: "Feedback",
        v: ["Spinner", "Skeleton", "Progress", "ProgressRing"],
        y: ["SpinnerProps", "SkeletonProps", "ProgressProps", "ProgressRingProps"],
      },
      {
        t: "Surfaces",
        v: ["Card", "CardHeader", "CardBody", "CardFooter", "CardTitle", "CardDescription", "Alert", "Badge"],
        y: ["CardProps", "AlertProps", "BadgeProps"],
      },
      {
        t: "Form basics",
        v: ["Field", "Label", "Input", "Textarea", "Select", "Checkbox", "Radio", "Switch"],
        y: ["FieldProps", "LabelProps", "InputProps", "TextareaProps", "SelectProps", "SelectOption", "CheckboxProps", "RadioProps", "SwitchProps"],
      },
      {
        t: "Overlays",
        v: ["Backdrop", "Modal", "ConfirmDialog", "Drawer", "Popover", "Tooltip", "Toast", "ToastProvider", "useToast", "positionFloating", "placementFits", "oppositePlacement", "nextFocusIndex", "toastReducer", "visibleToasts"],
        y: ["BackdropProps", "ModalProps", "ModalSize", "ConfirmDialogProps", "DrawerProps", "DrawerSide", "PopoverProps", "TooltipProps", "ToastProps", "ToastProviderProps", "ToastOptions", "ToastApi", "ToastPosition", "ToastRecord", "ToastState", "ToastAction", "Placement", "AnchorRect", "FloatingSize", "ViewportSize", "PositionOptions", "PositionResult"],
      },
      {
        t: "Navigation",
        v: ["Tabs", "TabList", "Tab", "TabPanel", "Accordion", "AccordionItem", "Breadcrumbs", "Pagination", "Stepper", "DropdownMenu", "NavList", "NavSection", "NavItem", "Toolbar", "ToolbarGroup", "ToolbarSeparator", "ELLIPSIS", "paginationRange", "collapseBreadcrumbs", "rovingIndex", "firstEnabledIndex", "lastEnabledIndex", "typeaheadBuffer", "typeaheadMatch", "deriveStepStates", "toggleAccordionValue"],
        y: ["TabsProps", "TabsVariant", "TabListProps", "TabProps", "TabPanelProps", "AccordionProps", "AccordionVariant", "AccordionItemProps", "BreadcrumbsProps", "BreadcrumbItem", "BreadcrumbSlot", "PaginationProps", "PaginationLabels", "PaginationSlot", "StepperProps", "StepItem", "StepState", "StepStateOptions", "DropdownMenuProps", "DropdownMenuItem", "DropdownMenuAction", "DropdownMenuSeparator", "DropdownMenuLabel", "NavListProps", "NavSectionProps", "NavItemProps", "ToolbarProps", "ToolbarGroupProps", "ToolbarSeparatorProps"],
      },
      {
        t: "Data display",
        v: ["Avatar", "AvatarGroup", "Stat", "Timeline", "TimelineItem", "DescriptionList", "EmptyState", "Tag", "TagInput", "Rating", "Kbd", "Code", "Snippet", "Divider", "Tree", "MetricBar", "AVATAR_COLOR_COUNT", "TAG_SEPARATORS", "initials", "colorIndexFor", "splitAvatarOverflow", "formatDelta", "deltaTone", "roundToHalf", "normalizeRating", "splitKeys", "splitTagInput", "mergeTags", "normalizeMetrics", "flattenTree"],
        y: ["AvatarProps", "AvatarGroupProps", "AvatarSize", "StatProps", "TimelineProps", "TimelineItemProps", "DescriptionListProps", "DescriptionItem", "EmptyStateProps", "TagProps", "TagInputProps", "RatingProps", "KbdProps", "CodeProps", "SnippetProps", "DividerProps", "TreeProps", "TreeNode", "MetricBarProps", "MetricItem", "AvatarOverflow", "DeltaDirection", "DeltaInfo", "FormatDeltaOptions", "MergeTagsOptions", "MergeTagsResult", "NormalizedMetric", "FlatTreeNode"],
      },
      {
        t: "Layout",
        v: ["Stack", "HStack", "VStack", "Grid", "GridItem", "Container", "Section", "Spacer", "Center", "AspectRatio", "ScrollArea", "Sticky", "Panel", "spaceToken", "lengthToken", "gridTemplate", "spanValue", "resolveResponsive", "responsiveVars", "ratioToPercent", "scrollEdges"],
        y: ["StackProps", "StackDirection", "GridProps", "GridItemProps", "ContainerProps", "ContainerSize", "SectionProps", "SpacerProps", "CenterProps", "AspectRatioProps", "ScrollAreaProps", "StickyProps", "PanelProps", "Breakpoint", "Responsive", "ResponsiveMap", "SpaceValue", "ScrollEdgeState"],
      },
      {
        t: "Typography",
        v: ["Text", "Heading", "Prose", "Blockquote", "Highlight", "Truncate", "truncateMiddle", "splitHighlight"],
        y: ["TextProps", "TextSize", "TextTone", "TextWeight", "HeadingProps", "HeadingLevel", "ProseProps", "BlockquoteProps", "HighlightProps", "TruncateProps", "HighlightPart"],
      },
      {
        t: "Advanced form controls",
        v: ["Slider", "NumberInput", "PinInput", "Combobox", "MultiSelect", "SearchInput", "PasswordInput", "FileDrop", "ColorInput", "RadioGroup", "CheckboxGroup", "ToggleGroup", "Fieldset", "snapToStep", "sliderValueToPercent", "percentToSliderValue", "orderThumbs", "setThumbValue", "moveThumb", "nearestThumb", "decimalPlaces", "roundTo", "clampNumber", "parseNumericInput", "formatNumberValue", "groupThousands", "stepNumber", "pinPattern", "padPin", "distributePin", "firstEmptyPinIndex", "defaultComboboxFilter", "filterOptions", "moveHighlight", "nextEnabledIndex", "scorePassword", "COMMON_PASSWORDS", "matchesAccept", "validateFiles", "formatBytes", "isValidHex", "normalizeHex", "hexWithoutAlpha", "toggleSelection", "debounce"],
        y: ["SliderProps", "SliderValue", "SliderMark", "SliderScale", "NumberInputProps", "NumberFormatOptions", "NumberStepOptions", "PinInputProps", "PinType", "ComboboxProps", "ComboboxOption", "MultiSelectProps", "SearchInputProps", "PasswordInputProps", "PasswordStrength", "FileDropProps", "FileLike", "FileRejection", "FileRejectionReason", "FileValidationOptions", "ColorInputProps", "RadioGroupProps", "CheckboxGroupProps", "ChoiceOption", "ToggleGroupProps", "ToggleGroupItem", "ToggleSelectionOptions", "FieldsetProps", "Debounced"],
      },
    ],
  },
  {
    npm: "@lacspace/charts",
    blurb: "Real SVG marks: line, area, bar, pie, donut, sparkline, gauge, heatmap, radar, funnel and candlestick. No canvas, no D3.",
    components: 19,
    values: 60,
    types: 39,
    groups: [
      {
        t: "Utilities & hooks",
        v: ["cx", "classes", "clamp", "percent", "useStableId"],
        y: ["Size", "Tone"],
      },
      {
        t: "Stylesheet",
        v: ["LacspaceChartStyles", "chartsCss"],
        y: [],
      },
      {
        t: "Scales, geometry & formatting",
        v: ["extent", "padDegenerate", "niceNum", "niceTicks", "niceDomain", "roundToStep", "sum", "linearScale", "bandScale", "plotArea", "DEFAULT_MARGIN", "stackSeries", "stackExtent", "linePath", "smoothPath", "areaPath", "polygonPath", "roundedBarPath", "polarPoint", "arcPath", "pieSlices", "gaugeAngle", "DEFAULT_PALETTE", "colorAt", "parseHex", "mixColor", "heatColor", "formatNumber", "formatPercent", "describeSeries", "nearestPoint", "ohlcExtent", "candleDirection", "funnelStages", "calendarCells"],
        y: ["Point", "LinearScale", "BandScale", "Margin", "Plot", "StackBand", "Slice", "Hit", "Candle", "FunnelStage", "CalendarCell"],
      },
      {
        t: "Shared chart parts",
        v: ["ChartFrame", "ChartGrid", "ChartAxis", "ChartLegend", "ChartTooltip", "ChartDataTable"],
        y: ["Series", "ChartBaseProps", "ChartFrameProps", "ChartGridProps", "ChartAxisProps", "AxisTick", "ChartLegendProps", "LegendItem", "ChartTooltipProps", "TooltipRow", "ChartDataTableProps"],
      },
      {
        t: "Line & area",
        v: ["LineChart", "AreaChart"],
        y: ["CartesianChartProps", "AreaChartProps"],
      },
      {
        t: "Bars",
        v: ["BarChart"],
        y: ["BarChartProps"],
      },
      {
        t: "Pie & donut",
        v: ["PieChart", "DonutChart"],
        y: ["PieChartProps", "DonutChartProps", "PieDatum"],
      },
      {
        t: "Sparklines",
        v: ["Sparkline", "SparkBars"],
        y: ["SparklineProps", "SparkBarsProps"],
      },
      {
        t: "Gauge",
        v: ["Gauge"],
        y: ["GaugeProps", "GaugeBand"],
      },
      {
        t: "Heatmap",
        v: ["Heatmap"],
        y: ["HeatmapProps"],
      },
      {
        t: "Radar",
        v: ["RadarChart"],
        y: ["RadarChartProps"],
      },
      {
        t: "Funnel",
        v: ["FunnelChart"],
        y: ["FunnelChartProps", "FunnelDatum"],
      },
      {
        t: "Candlestick",
        v: ["CandlestickChart"],
        y: ["CandlestickChartProps"],
      },
    ],
  },
  {
    npm: "@lacspace/table",
    blurb: "Sorting, filtering, search, pagination, selection, resizing, pinning and CSV export — with the whole engine exported as pure functions.",
    components: 17,
    values: 87,
    types: 59,
    groups: [
      {
        t: "The table",
        v: ["DataTable"],
        y: ["DataTableProps", "RowDetailContext"],
      },
      {
        t: "Headless engine hook",
        v: ["useTable", "inferRowId"],
        y: ["UseTableOptions", "TableInstance", "TableRowModel", "ExportScope"],
      },
      {
        t: "Table parts",
        v: ["Table", "TableScroll", "TableCaption", "THead", "TBody", "TFoot", "Tr", "Th", "Td", "TableToolbar", "TableSearch", "TableCheckbox", "TableColumnsMenu", "TablePagination", "TableEmpty"],
        y: ["TableProps", "TableScrollProps", "TableCaptionProps", "TrProps", "ThProps", "TdProps", "PinProps", "Density", "TableToolbarProps", "TableSearchProps", "TableCheckboxProps", "TableColumnsMenuProps", "ColumnToggle", "TablePaginationProps", "PaginationLabels", "TableEmptyProps"],
      },
      {
        t: "Column builders",
        v: ["defineColumn", "defineColumns", "resolveColumn", "resolveColumns", "columnReader", "sortFieldsFrom", "filterFieldsFrom", "exportColumnsFrom", "textColumn", "numberColumn", "currencyColumn", "dateColumn", "badgeColumn", "booleanColumn", "linkColumn", "actionsColumn", "customColumn", "formatNumber", "formatCurrency", "formatDate", "toDate", "DEFAULT_COLUMN_WIDTH"],
        y: ["ColumnDef", "AnyColumn", "CommonColumnOptions", "ResolvedColumn", "CellContext", "FooterContext", "TextColumnOptions", "NumberColumnOptions", "CurrencyColumnOptions", "DateColumnOptions", "BadgeColumnOptions", "BooleanColumnOptions", "LinkColumnOptions", "ActionsColumnOptions", "CustomColumnOptions", "RowAction", "NumberFormatOptions", "CurrencyFormatOptions", "DateFormatOptions"],
      },
      {
        t: "Engine — pure functions",
        v: ["isBlank", "toNumber", "toText", "defaultCompare", "sortRows", "sortDirectionOf", "sortIndexOf", "cycleSort", "isNumberRange", "isEmptyFilter", "matchesFilter", "matchesQuery", "filterRows", "searchableIds", "pageCount", "clampPage", "pageSlice", "pageRange", "pageForSizeChange", "pageTokens", "toggleSelected", "setSelection", "selectionMode", "isIndeterminate", "pruneSelection", "clampColumnWidth", "resizeColumn", "pinnedOffsets", "MIN_COLUMN_WIDTH", "MAX_COLUMN_WIDTH", "aggregate", "numericValues", "neutraliseFormula", "escapeCell", "toDelimited", "toCsv", "toTsv", "exportRows", "downloadCsv", "FORMULA_PREFIXES"],
        y: ["SortDirection", "SortRule", "SortState", "SortField", "NumberRange", "FilterValue", "FilterField", "FilterOptions", "PageToken", "SelectionState", "SelectionMode", "AggregateFn", "ExportColumn", "ExportOptions", "DelimitedOptions"],
      },
      {
        t: "Stylesheet",
        v: ["TableStyles", "tableCss"],
        y: [],
      },
      {
        t: "Utilities & hooks",
        v: ["cx", "classes", "clamp", "useControllable", "useStableId"],
        y: ["Size", "Tone", "Align"],
      },
    ],
  },
  {
    npm: "@lacspace/date",
    blurb: "Calendar, date, range, month, year, time and date-time pickers plus a scheduler grid, over a tested date engine with no moment, date-fns or dayjs.",
    components: 11,
    values: 96,
    types: 26,
    groups: [
      {
        t: "Stylesheet",
        v: ["DateStyles", "dateCss"],
        y: [],
      },
      {
        t: "Utilities & hooks",
        v: ["cx", "classes", "clamp", "useControllable", "useStableId"],
        y: ["Size"],
      },
      {
        t: "Calendar family",
        v: ["Calendar", "MonthPicker", "YearPicker", "WeekPicker", "useDayFocus"],
        y: ["CalendarProps", "DayRuleProps", "MonthPickerProps", "YearPickerProps", "WeekPickerProps"],
      },
      {
        t: "Picker family",
        v: ["DatePicker", "DateRangePicker", "DateTimePicker"],
        y: ["DatePickerProps", "DateRangePickerProps", "DateTimePickerProps", "PickerBaseProps"],
      },
      {
        t: "Time",
        v: ["TimePicker"],
        y: ["TimePickerProps"],
      },
      {
        t: "Schedule",
        v: ["ScheduleGrid"],
        y: ["ScheduleGridProps"],
      },
      {
        t: "Relative time",
        v: ["RelativeTime"],
        y: ["RelativeTimeProps"],
      },
      {
        t: "Date engine — pure functions",
        v: ["makeDate", "cloneDate", "isValidDate", "isLeapYear", "daysInMonth", "startOfDay", "endOfDay", "startOfWeek", "endOfWeek", "startOfMonth", "endOfMonth", "startOfYear", "endOfYear", "addDays", "addWeeks", "addMonths", "addYears", "addMinutes", "addHours", "isSameDay", "isSameMonth", "isSameYear", "isSameWeek", "compareDay", "isBeforeDay", "isAfterDay", "diffInDays", "diffInMonths", "clampDate", "monthGrid", "weekdayOrder", "eachDayOfInterval", "weekDays", "isoWeekNumber", "nextFocusFromKey", "isCompleteRange", "normalizeRange", "isInRange", "isRangeStart", "isRangeEnd", "previewRange", "isInPreviewRange", "nightsBetween", "isRangeAllowed", "selectRangeDate", "defaultPresets", "isDateDisabled", "isMonthDisabled", "isYearDisabled", "nextEnabledDate", "resolveLocale", "formatIntl", "monthNames", "weekdayNames", "fullDateLabel", "monthLabel", "formatDate", "parseDate", "utcStamp", "getTimeValue", "setTimeValue", "roundToStep", "floorToStep", "normalizeTime", "to12Hour", "from12Hour", "stepTimePart", "formatTimeValue", "parseTimeText", "daySlots", "scheduleDays", "slotKey", "hasSlot", "toggleSlot", "relativeParts", "relativeFallback", "formatRelative", "relativeRefreshMs"],
        y: ["Weekday", "CalendarDay", "MonthGridOptions", "DateRange", "CompleteRange", "RangeLimits", "RangePreset", "DisabledRules", "TimeValue", "TimeSteps", "SlotSpec", "RelativeUnit", "RelativeParts"],
      },
    ],
  },
];

const TOTAL_COMPONENTS = REFERENCE.reduce((n, p) => n + p.components, 0);
const TOTAL_EXPORTS = REFERENCE.reduce((n, p) => n + p.values + p.types, 0);

const INSTALL = "npm i @lacspace/components @lacspace/charts @lacspace/table @lacspace/date";

const seo = site.page({
  title: `${TOTAL_COMPONENTS} React components, zero dependencies`,
  path: "/components",
  description:
    `The @lacspace UI gallery: ${TOTAL_COMPONENTS} dependency-free React components across @lacspace/components, ` +
    "charts, table and date — every one live on this page, themed end to end by --lac-* CSS variables. " +
    "No Tailwind, no CSS-in-JS, server-render safe, accessible by construction.",
  keywords: [
    "react component library",
    "zero dependency react components",
    "css variable theming",
    "headless ui alternative",
    "shadcn alternative",
    "react charts without d3",
    "react data table",
    "react date picker",
    "@lacspace/components",
  ],
});

export const metadata = seo.metadata;

/** A word-wrapped row of export names, kept as real text so it is searchable. */
function Names({ names, kind }: { names: string[]; kind: "value" | "type" }) {
  if (names.length === 0) {
    return <span className="lacx-empty-names">—</span>;
  }
  const isComponent = (n: string) => /^[A-Z]/.test(n) && !/^[A-Z0-9_]+$/.test(n);
  return (
    <div className="lacx-names">
      {names.map((n) => (
        <code
          key={n}
          data-kind={kind === "type" ? "type" : isComponent(n) ? "component" : "fn"}
        >
          {n}
        </code>
      ))}
    </div>
  );
}

export default function ComponentsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }}
      />
      <div className="aurora" />
      <div className="grid-bg" />
      <DevHeader />

      <main className="wrap">
        {/* ---- Hero: deliberately short. The components start one scroll down. */}
        <section className="sec" style={{ paddingTop: 44, paddingBottom: 4 }}>
          <div className="sec-head center" style={{ marginBottom: 0 }}>
            <div className="eyebrow">UI kit</div>
            <h2 style={{ fontSize: "clamp(1.9rem, 5vw, 3rem)" }}>
              {TOTAL_COMPONENTS} components, <span className="grad">zero dependencies</span>
            </h2>
            <p>
              Four packages, one theme. React is the only peer — no clsx, no floating-ui, no
              animation library, no Tailwind and no CSS-in-JS runtime. Every colour, radius,
              control height and typeface is a <code>--lac-*</code> variable you can redefine in
              one line, and every component on this page is the real thing, rendered live.
            </p>
          </div>

          <div className="lacx-hero-stats">
            {REFERENCE.map((p) => (
              <span key={p.npm}>
                <b>{p.components}</b> {p.npm.replace("@lacspace/", "")}
              </span>
            ))}
            <span>
              <b>0</b> runtime dependencies
            </span>
            <span>
              <b>{TOTAL_EXPORTS}</b> exports in all
            </span>
          </div>

          <div style={{ maxWidth: 720, margin: "22px auto 0" }}>
            <CodeBlock label="terminal" code={INSTALL} />
          </div>

          <div className="cta" style={{ justifyContent: "center", marginTop: 18 }}>
            <a
              className="btn btn-primary"
              href="https://www.npmjs.com/package/@lacspace/components"
              target="_blank"
              rel="noopener"
            >
              @lacspace/components on npm ↗
            </a>
            <a className="btn btn-ghost" href="/packages">
              All packages
            </a>
            <a
              className="btn btn-ghost"
              href="https://github.com/lacspace/npm-packages"
              target="_blank"
              rel="noopener"
            >
              Source ↗
            </a>
          </div>
        </section>

        {/* ---- Everything live. */}
        <Gallery />

        {/* ---- The full export reference. */}
        <section className="lacx-sec" id="reference">
          <Reveal className="lacx-sec-head">
            <div className="eyebrow">Full reference</div>
            <h2>
              Every export, <span className="grad">nothing hidden</span>
            </h2>
            <p>
              {TOTAL_COMPONENTS} React components plus the hooks, pure functions, constants and
              TypeScript types that ship beside them — {TOTAL_EXPORTS} exports across the four
              packages. The logic behind each component (pagination ranges, slider snapping, sort
              comparators, month grids) is exported on its own, so you can use it with no React at
              all.
            </p>
          </Reveal>

          {REFERENCE.map((p) => (
            <Reveal key={p.npm} className="lacx-ref-pkg">
              <h3>{p.npm}</h3>
              <div className="lacx-ref-meta">
                {p.components} components · {p.values} runtime exports · {p.types} types
              </div>
              <p>{p.blurb}</p>
              <table className="lacx-ref-table">
                <thead>
                  <tr>
                    <th scope="col">Group</th>
                    <th scope="col">Exports</th>
                  </tr>
                </thead>
                <tbody>
                  {p.groups.map((g) => (
                    <tr key={g.t}>
                      <th scope="row">{g.t}</th>
                      <td>
                        <Names names={g.v} kind="value" />
                        {g.y.length > 0 && (
                          <div style={{ marginTop: 8 }}>
                            <Names names={g.y} kind="type" />
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          ))}
        </section>

        <Reveal className="cta-band" style={{ marginTop: 56 }}>
          <div className="eyebrow">Start with one line</div>
          <h2>
            Install it, then <span className="grad">restyle it</span>
          </h2>
          <p>
            Import the stylesheet once, redefine the variables you care about, and ship. The
            licence is the Lacspace Free Licence v1.0 — use it, modify it, ship it commercially.
          </p>
          <div className="cta" style={{ justifyContent: "center" }}>
            <a className="btn btn-primary" href="/handbook">
              Read the handbook →
            </a>
            <a className="btn btn-ghost" href="/licenses/lacspace-free-1.0">
              The licence
            </a>
          </div>
        </Reveal>
      </main>

      <DevFooter />
    </>
  );
}
