"use client";

/**
 * The live half of /components.
 *
 * Every preview on this page is the real component from the published package,
 * rendered with real state — a Switch that toggles, a Modal that opens, a
 * Slider you can drag. Nothing here is a screenshot or a re-implementation.
 *
 * The whole gallery sits inside one themed container. The theme editor writes
 * --lac-* custom properties onto that container's inline style, so turning a
 * knob restyles all of it at once. The overlays (Modal, Drawer, Popover,
 * Tooltip, Toast) are portalled into the same container through their
 * `container` prop, which is the only way a portalled dialog can inherit a
 * scoped theme instead of the document root's.
 */

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Reveal } from "./reveal";
import { CodeBlock } from "./code-block";
import { DataVizSections } from "./gallery-dataviz";
import {
  Accordion,
  AccordionItem,
  Alert,
  AspectRatio,
  Avatar,
  AvatarGroup,
  Badge,
  Blockquote,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Center,
  Checkbox,
  CheckboxGroup,
  Code,
  ColorInput,
  Combobox,
  ConfirmDialog,
  Container,
  DescriptionList,
  Divider,
  Drawer,
  DropdownMenu,
  EmptyState,
  Field,
  Fieldset,
  FileDrop,
  Grid,
  GridItem,
  HStack,
  Heading,
  Highlight,
  IconButton,
  Input,
  Kbd,
  Label,
  MetricBar,
  Modal,
  MultiSelect,
  NavItem,
  NavList,
  NavSection,
  NumberInput,
  Pagination,
  Panel,
  PasswordInput,
  PinInput,
  Popover,
  Progress,
  ProgressRing,
  Prose,
  Radio,
  RadioGroup,
  Rating,
  ScrollArea,
  SearchInput,
  Section,
  Select,
  Skeleton,
  Slider,
  Snippet,
  Spacer,
  Spinner,
  Stack,
  Stat,
  Stepper,
  Sticky,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Tag,
  TagInput,
  Text,
  Textarea,
  Timeline,
  TimelineItem,
  Toast,
  ToastProvider,
  ToggleGroup,
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  Tooltip,
  Tree,
  Truncate,
  VStack,
  normalizeHex,
  useToast,
} from "@lacspace/components";
import type { SliderValue } from "@lacspace/components";

/* ==========================================================================
   Theme plumbing
   ========================================================================== */

/** The element every portalled overlay is rendered into, so it inherits the theme. */
const PortalContext = createContext<HTMLElement | null>(null);
const usePortal = () => useContext(PortalContext);

type PreviewTheme = "light" | "dark";

const FONTS = [
  {
    key: "system",
    label: "System",
    // What the preview actually renders with…
    live: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    // …and the portable form we print in the copyable CSS.
    css: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
  },
  { key: "inter", label: "Inter", live: "var(--font-body), system-ui, sans-serif", css: '"Inter", system-ui, sans-serif' },
  { key: "grotesk", label: "Grotesk", live: "var(--font-display), system-ui, sans-serif", css: '"Space Grotesk", system-ui, sans-serif' },
  { key: "serif", label: "Serif", live: 'Georgia, "Times New Roman", serif', css: 'Georgia, "Times New Roman", serif' },
  { key: "mono", label: "Mono", live: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace", css: "ui-monospace, SFMono-Regular, Menlo, monospace" },
] as const;

const SWATCHES = ["#4d9fff", "#7c3aed", "#0f766e", "#e11d48", "#f59e0b", "#22c55e", "#ec4899", "#64748b"];

const DEFAULTS = { accent: "#4d9fff", radius: 10, control: 38, font: "system", theme: "dark" as PreviewTheme };

/** `#abc` / `ABCDEF` / `#12345678` → `[r, g, b]`, falling back to the brand blue. */
function toRgb(input: string): [number, number, number] {
  const hex = normalizeHex(input) ?? DEFAULTS.accent;
  const n = hex.replace("#", "").slice(0, 6);
  return [parseInt(n.slice(0, 2), 16), parseInt(n.slice(2, 4), 16), parseInt(n.slice(4, 6), 16)];
}

const clamp255 = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
const hex2 = (n: number) => clamp255(n).toString(16).padStart(2, "0");

/** Move a colour towards white (`amount > 0`) or black (`amount < 0`), 0-1. */
function shift(input: string, amount: number): string {
  const [r, g, b] = toRgb(input);
  const target = amount >= 0 ? 255 : 0;
  const t = Math.abs(amount);
  return `#${hex2(r + (target - r) * t)}${hex2(g + (target - g) * t)}${hex2(b + (target - b) * t)}`;
}

function rgba(input: string, alpha: number): string {
  const [r, g, b] = toRgb(input);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Relative luminance, so the label on an accent-filled button stays readable. */
function luminance(input: string): number {
  const channel = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const [r, g, b] = toRgb(input);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/* ==========================================================================
   Page furniture
   ========================================================================== */

/**
 * Deep-link id for one component card: "DatePicker" -> "c-datepicker".
 * The header's "most used" shortcuts and any doc link point straight at these,
 * so a component can be linked to without scrolling the whole category.
 */
export function cardAnchor(name: string): string {
  return `c-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

function Demo({
  name,
  about,
  code,
  children,
  span,
  wide,
  center,
  pop,
}: {
  name: string;
  about: string;
  code: string;
  children: ReactNode;
  span?: 2;
  wide?: boolean;
  center?: boolean;
  pop?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <article
      id={cardAnchor(name)}
      className="lacx-card"
      data-span={span}
      data-wide={wide || undefined}
      data-pop={pop || undefined}
    >
      <div className="lacx-card-head">
        <h3 className="lacx-card-name">{name}</h3>
        <button
          type="button"
          className="lacx-toggle"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Hide" : "Code"}
        </button>
      </div>
      <p className="lacx-card-about">{about}</p>
      <div className="lacx-stage" data-center={center || undefined}>
        {children}
      </div>
      {open && (
        <div className="lacx-snip">
          <Snippet code={code} multiline />
        </div>
      )}
    </article>
  );
}

function Cat({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro: string;
  children: ReactNode;
}) {
  const count = Array.isArray(children) ? children.flat().length : 1;
  return (
    <section className="lacx-sec" id={id}>
      <Reveal className="lacx-sec-head">
        <div className="eyebrow">{eyebrow}</div>
        <h2>
          {title} <span className="lacx-count">· {count} live</span>
        </h2>
        <p>{intro}</p>
      </Reveal>
      <div className="lacx-grid">{children}</div>
    </section>
  );
}

function Ico({ d, size = 16 }: { d: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

const PATH = {
  plus: "M12 5v14M5 12h14",
  search: "M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16zM21 21l-4.2-4.2",
  trash: "M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3",
  star: "M12 4l2.4 4.9 5.4.8-3.9 3.8.9 5.3L12 16.3 7.2 18.8l.9-5.3L4.2 9.7l5.4-.8z",
  check: "M4 12.5l5 5L20 6.5",
  bell: "M18 9a6 6 0 1 0-12 0c0 6-2 7-2 7h16s-2-1-2-7M13.7 20a2 2 0 0 1-3.4 0",
};

/* ==========================================================================
   The theme editor — the centrepiece.

   Its controls are the library's own ColorInput, Slider and ToggleGroup, so
   the thing that restyles the gallery is itself part of the gallery.
   ========================================================================== */

type ThemeState = {
  accent: string;
  radius: number;
  control: number;
  font: string;
  theme: PreviewTheme;
};

function ThemeEditor({
  state,
  set,
  css,
}: {
  state: ThemeState;
  set: (patch: Partial<ThemeState>) => void;
  css: string;
}) {
  return (
    <div className="lacx-editor">
      <div>
        <div className="lacx-editor-head">
          <h3 className="lacx-editor-title">Restyle every preview on this page</h3>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => set({ ...DEFAULTS })}
          >
            Reset
          </Button>
        </div>

        <div className="lacx-knobs">
          <div>
            <div className="lacx-knob-label">
              <span>Accent</span>
              <code>--lac-accent</code>
            </div>
            <ColorInput
              value={state.accent}
              onChange={(v) => set({ accent: v })}
              presets={SWATCHES}
              aria-label="Accent colour"
            />
          </div>

          <div>
            <div className="lacx-knob-label">
              <span>Corner radius</span>
              <code>--lac-radius: {state.radius}px</code>
            </div>
            <Slider
              min={0}
              max={24}
              step={1}
              value={state.radius}
              onChange={(v) => set({ radius: typeof v === "number" ? v : v[0] })}
              label="Corner radius"
              formatValue={(v) => `${v}px`}
              marks={[0, 6, 12, 18, 24]}
            />
          </div>

          <div>
            <div className="lacx-knob-label">
              <span>Control height</span>
              <code>--lac-control-h-md: {state.control}px</code>
            </div>
            <Slider
              min={28}
              max={56}
              step={2}
              value={state.control}
              onChange={(v) => set({ control: typeof v === "number" ? v : v[0] })}
              label="Control height"
              formatValue={(v) => `${v}px`}
              marks={[28, 38, 46, 56]}
            />
          </div>

          <div>
            <div className="lacx-knob-label">
              <span>Typeface</span>
              <code>--lac-font</code>
            </div>
            <ToggleGroup
              label="Typeface"
              type="single"
              size="sm"
              value={[state.font]}
              onChange={(v) => v[0] && set({ font: v[0] })}
              items={FONTS.map((f) => ({ value: f.key, label: f.label }))}
            />
          </div>

          <div>
            <div className="lacx-knob-label">
              <span>Preview theme</span>
              <code>data-theme</code>
            </div>
            <ToggleGroup
              label="Preview theme"
              type="single"
              size="sm"
              value={[state.theme]}
              onChange={(v) => v[0] && set({ theme: v[0] as PreviewTheme })}
              items={[
                { value: "dark", label: "Dark" },
                { value: "light", label: "Light" },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="lacx-editor-out">
        <CodeBlock code={css} label="your-app.css" lang="css" />
        <p className="lacx-editor-note">
          That block is the whole integration. Paste it into your own stylesheet
          and every component below — buttons, inputs, dialogs, tabs, charts,
          tables, date pickers — follows it. No config file, no theme provider,
          no rebuild. The same four variables are what this page writes onto the
          preview container as you drag.
        </p>
      </div>
    </div>
  );
}

/* ==========================================================================
   Actions
   ========================================================================== */

function ButtonDemo() {
  const [busy, setBusy] = useState(false);
  return (
    <div className="lacx-col">
      <div className="lacx-row">
        <Button variant="solid">Solid</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="soft">Soft</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="lacx-row">
        <Button
          loading={busy}
          onClick={() => {
            setBusy(true);
            setTimeout(() => setBusy(false), 1400);
          }}
        >
          {busy ? "Saving" : "Click to load"}
        </Button>
        <Button tone="danger" variant="soft">
          Delete
        </Button>
        <Button size="sm" startIcon={<Ico d={PATH.plus} size={14} />}>
          New
        </Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  );
}

function ActionsSection() {
  return (
    <Cat
      id="actions"
      eyebrow="Actions"
      title={<>Buttons that don&apos;t <span className="grad">jump</span></>}
      intro="Five visual weights, three sizes, a danger tone and a loading state that keeps the label in place so the button never changes width mid-click."
    >
      <Demo
        name="Button"
        about="The button. Variants, tones, sizes, icons and a non-shifting loading state."
        code={`<Button variant="solid">Save</Button>
<Button variant="outline">Cancel</Button>
<Button tone="danger" variant="soft">Delete</Button>
<Button loading={saving}>Save</Button>`}
        span={2}
      >
        <ButtonDemo />
      </Demo>

      <Demo
        name="IconButton"
        about="A square button holding one icon. The `label` prop is required — an icon alone has no accessible name."
        code={`<IconButton label="Add item" icon={<PlusIcon />} />
<IconButton label="Search" icon={<SearchIcon />} variant="soft" />
<IconButton label="Delete" icon={<TrashIcon />} tone="danger" variant="ghost" />`}
      >
        <div className="lacx-row">
          <IconButton label="Add item" icon={<Ico d={PATH.plus} />} />
          <IconButton label="Search" icon={<Ico d={PATH.search} />} variant="soft" />
          <IconButton label="Notifications" icon={<Ico d={PATH.bell} />} variant="outline" />
          <IconButton label="Delete" icon={<Ico d={PATH.trash} />} tone="danger" variant="ghost" />
        </div>
      </Demo>

      <Demo
        name="ButtonGroup"
        about="Joins buttons into one segmented control and squares off the inner corners."
        code={`<ButtonGroup>
  <Button variant="outline">Day</Button>
  <Button variant="outline">Week</Button>
  <Button variant="outline">Month</Button>
</ButtonGroup>`}
      >
        <ButtonGroup>
          <Button variant="outline">Day</Button>
          <Button variant="outline">Week</Button>
          <Button variant="outline">Month</Button>
        </ButtonGroup>
      </Demo>
    </Cat>
  );
}

/* ==========================================================================
   Forms — the basics
   ========================================================================== */

function SwitchDemo() {
  const [on, setOn] = useState(true);
  return (
    <div className="lacx-col">
      <Switch checked={on} onChange={setOn} label="Email notifications" />
      <Switch defaultChecked={false} label="Weekly digest" />
      <p className="lacx-note">State: {on ? "on" : "off"}</p>
    </div>
  );
}

function CheckboxDemo() {
  const [all, setAll] = useState(false);
  const [one, setOne] = useState(true);
  return (
    <div className="lacx-col">
      <Checkbox
        label="Select every row"
        checked={all}
        indeterminate={!all && one}
        onChange={(e) => {
          setAll(e.target.checked);
          setOne(e.target.checked);
        }}
      />
      <Checkbox label="Invoice #1043" checked={one} onChange={(e) => setOne(e.target.checked)} />
      <Checkbox label="Invoice #1044 (locked)" disabled />
    </div>
  );
}

function RadioDemo() {
  const [plan, setPlan] = useState("pro");
  return (
    <div className="lacx-col">
      {["starter", "pro", "scale"].map((p) => (
        <Radio
          key={p}
          name="lacx-plan"
          value={p}
          checked={plan === p}
          onChange={() => setPlan(p)}
          label={p[0].toUpperCase() + p.slice(1)}
        />
      ))}
    </div>
  );
}

function FormsSection() {
  return (
    <Cat
      id="forms"
      eyebrow="Forms"
      title={<>The controls you use <span className="grad">every day</span></>}
      intro="Labels, hints, errors and aria wiring handled for you. Field hands its children the ids for aria-describedby and aria-invalid already correct — the part hand-rolled forms get wrong."
    >
      <Demo
        name="Field"
        about="Label, control, hint and error in the right order, wired together. Pass the render-prop children and the ids arrive correct."
        code={`<Field label="Email" hint="We never share it." required>
  {({ id, describedBy }) => (
    <Input id={id} aria-describedby={describedBy} type="email" placeholder="you@company.com" />
  )}
</Field>`}
        span={2}
      >
        <div className="lacx-col">
          <Field label="Email" hint="We never share it." required>
            {({ id, describedBy }) => (
              <Input id={id} aria-describedby={describedBy} type="email" placeholder="you@company.com" />
            )}
          </Field>
          <Field label="Workspace" error="That name is already taken.">
            {({ id, describedBy, invalid }) => (
              <Input id={id} aria-describedby={describedBy} invalid={invalid} defaultValue="lacspace" />
            )}
          </Field>
        </div>
      </Demo>

      <Demo
        name="Input"
        about="A text input with adornments that sit inside the field — the padding adjusts so text never slides under the icon."
        code={`<Input placeholder="Search packages" startAdornment={<SearchIcon />} />
<Input defaultValue="4200" startAdornment="Rs" endAdornment="/mo" />
<Input invalid defaultValue="not-an-email" />`}
      >
        <div className="lacx-col">
          <Input placeholder="Search packages" startAdornment={<Ico d={PATH.search} size={15} />} />
          <Input defaultValue="4200" startAdornment="Rs" endAdornment="/mo" />
          <Input invalid defaultValue="not-an-email" aria-label="Invalid example" />
        </div>
      </Demo>

      <Demo
        name="Textarea"
        about="A multi-line input on the same tokens as Input, with the same invalid state."
        code={`<Textarea rows={3} placeholder="What changed in this release?" />`}
      >
        <Textarea rows={3} placeholder="What changed in this release?" aria-label="Release notes" />
      </Demo>

      <Demo
        name="Select"
        about="A native select, styled. Native is deliberate — on a phone it opens the platform picker."
        code={`<Select
  placeholder="Choose a region"
  options={[
    { value: "ap-south-1", label: "Mumbai" },
    { value: "eu-west-1", label: "Ireland" },
  ]}
/>`}
        pop
      >
        <Select
          aria-label="Region"
          defaultValue="ap-south-1"
          options={[
            { value: "ap-south-1", label: "Mumbai · ap-south-1" },
            { value: "eu-west-1", label: "Ireland · eu-west-1" },
            { value: "us-east-1", label: "N. Virginia · us-east-1" },
            { value: "sa-east-1", label: "São Paulo (soon)", disabled: true },
          ]}
        />
      </Demo>

      <Demo
        name="Checkbox"
        about="Including the indeterminate state, applied as a DOM property through a ref — it cannot be set as an attribute."
        code={`<Checkbox label="Select every row" checked={all} indeterminate={some} onChange={…} />`}
      >
        <CheckboxDemo />
      </Demo>

      <Demo
        name="Radio"
        about="One radio, for when you are laying the group out yourself. RadioGroup below does it for you."
        code={`<Radio name="plan" value="pro" checked={plan === "pro"} onChange={…} label="Pro" />`}
      >
        <RadioDemo />
      </Demo>

      <Demo
        name="Switch"
        about="A role=switch button rather than a styled checkbox, so the state is announced as on/off."
        code={`const [on, setOn] = useState(true);

<Switch checked={on} onChange={setOn} label="Email notifications" />`}
      >
        <SwitchDemo />
      </Demo>

      <Demo
        name="Fieldset"
        about="A real <fieldset>/<legend> pair with a hint and one error covering the whole group."
        code={`<Fieldset legend="Billing address" hint="Used on every invoice.">
  <Input placeholder="Street" />
  <Input placeholder="City" />
</Fieldset>`}
      >
        <Fieldset legend="Billing address" hint="Used on every invoice.">
          <div className="lacx-col">
            <Input placeholder="Street" aria-label="Street" />
            <Input placeholder="City" aria-label="City" />
          </div>
        </Fieldset>
      </Demo>

      <Demo
        name="Label"
        about="The standalone label, with the required asterisk — for controls you are wiring up by hand."
        code={`<Label htmlFor="api-key" required>API key</Label>
<Input id="api-key" defaultValue="lac_live_…" />`}
      >
        <div className="lacx-col">
          <Label htmlFor="lacx-api-key" required>
            API key
          </Label>
          <Input id="lacx-api-key" defaultValue="lac_live_9f2c…" />
        </div>
      </Demo>
    </Cat>
  );
}

/* ==========================================================================
   Forms — the advanced controls
   ========================================================================== */

function SliderDemo() {
  const [one, setOne] = useState<SliderValue>(40);
  const [range, setRange] = useState<SliderValue>([20, 70]);
  return (
    <div className="lacx-col" style={{ gap: 26 }}>
      <Slider
        value={one}
        onChange={setOne}
        label="Volume"
        tooltip
        formatValue={(v) => `${v}%`}
      />
      <Slider
        value={range}
        onChange={setRange}
        label="Price"
        marks={[0, 25, 50, 75, 100]}
        formatValue={(v) => `$${v}`}
      />
      <p className="lacx-note">
        {typeof one === "number" ? one : one[0]}% · $
        {Array.isArray(range) ? `${range[0]}–${range[1]}` : range}
      </p>
    </div>
  );
}

function PinDemo() {
  const [pin, setPin] = useState("");
  const [done, setDone] = useState(false);
  return (
    <div className="lacx-col">
      <PinInput
        length={6}
        value={pin}
        onChange={(v) => {
          setPin(v);
          if (v.length < 6) setDone(false);
        }}
        onComplete={() => setDone(true)}
        label="One-time code"
        autoComplete="one-time-code"
      />
      <p className="lacx-note">{done ? "Complete — this is where you'd submit." : "Type or paste six digits."}</p>
    </div>
  );
}

function SearchDemo() {
  const [q, setQ] = useState("");
  return (
    <div className="lacx-col">
      <SearchInput
        placeholder="Search 143 components"
        onSearch={setQ}
        debounceMs={300}
        clearable
        aria-label="Search components"
      />
      <p className="lacx-note">{q ? `Debounced query: "${q}"` : "onSearch fires 300ms after you stop typing."}</p>
    </div>
  );
}

function FileDropDemo() {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <div className="lacx-col">
      <FileDrop
        accept=".png,.jpg,.pdf"
        multiple
        maxSize={2 * 1024 * 1024}
        maxFiles={3}
        value={files}
        onChange={setFiles}
      />
      <p className="lacx-note">{files.length ? `${files.length} file(s) held in state.` : "Drop files, or click to pick."}</p>
    </div>
  );
}

function AdvancedFormsSection() {
  return (
    <Cat
      id="advanced"
      eyebrow="Forms · advanced"
      title={<>The ones people reach for a <span className="grad">library</span> to get</>}
      intro="Sliders with two thumbs, a combobox with real typeahead, a password meter you can swap the scorer on, a file drop that validates before it accepts. All of it keyboard-operable, none of it pulling in a dependency."
    >
      <Demo
        name="Slider"
        about="One thumb or two, marks, a value bubble and PageUp/PageDown. Drag it."
        code={`const [price, setPrice] = useState<SliderValue>([20, 70]);

<Slider value={price} onChange={setPrice} marks={[0, 25, 50, 75, 100]} formatValue={(v) => \`$\${v}\`} />`}
        span={2}
      >
        <SliderDemo />
      </Demo>

      <Demo
        name="NumberInput"
        about="Steppers, precision, thousands grouping and clamp-on-blur. null is an empty field, which is not the same as 0."
        code={`<NumberInput defaultValue={1250} min={0} max={9999} step={50} thousands stepper label="Seats" />`}
      >
        <NumberInput
          defaultValue={1250}
          min={0}
          max={9999}
          step={50}
          thousands
          stepper
          label="Seats"
          hint="Grouped while the field is not focused."
        />
      </Demo>

      <Demo
        name="PinInput"
        about="One box per digit, with paste-to-fill, backspace-to-previous and an onComplete callback."
        code={`<PinInput length={6} onComplete={(code) => verify(code)} autoComplete="one-time-code" />`}
      >
        <PinDemo />
      </Demo>

      <Demo
        name="Combobox"
        about="Type to filter, arrow to choose. Swap the matching rule for fuzzy or server-side search."
        code={`<Combobox
  label="Package"
  options={[{ value: "seo", label: "@lacspace/seo" }]}
  onChange={setValue}
/>`}
        pop
      >
        <Combobox
          label="Package"
          placeholder="Start typing…"
          options={[
            { value: "seo", label: "@lacspace/seo", description: "Metadata + JSON-LD" },
            { value: "components", label: "@lacspace/components", description: "This library" },
            { value: "charts", label: "@lacspace/charts", description: "SVG charts" },
            { value: "table", label: "@lacspace/table", description: "Data table" },
            { value: "date", label: "@lacspace/date", description: "Pickers" },
          ]}
        />
      </Demo>

      <Demo
        name="MultiSelect"
        about="The same listbox, holding several picks as removable chips, with an optional ceiling."
        code={`<MultiSelect
  label="Kits"
  defaultValue={["seo"]}
  max={3}
  options={[{ value: "seo", label: "SEO Kit" }]}
/>`}
        pop
      >
        <MultiSelect
          label="Kits"
          defaultValue={["seo"]}
          max={3}
          options={[
            { value: "seo", label: "SEO Kit" },
            { value: "security", label: "Security Kit" },
            { value: "react", label: "React Kit" },
            { value: "mail", label: "Mail Kit" },
            { value: "commerce", label: "Commerce & Ledger" },
          ]}
        />
      </Demo>

      <Demo
        name="SearchInput"
        about="A magnifier, a clear button and a debounced onSearch that also fires immediately on clear and on Enter."
        code={`<SearchInput onSearch={run} debounceMs={300} clearable placeholder="Search" />`}
      >
        <SearchDemo />
      </Demo>

      <Demo
        name="PasswordInput"
        about="Show/hide plus a strength meter whose scorer you can replace with your own."
        code={`<PasswordInput label="Password" strength showSuggestions />`}
      >
        <PasswordInput
          label="Password"
          defaultValue="hunter2"
          strength
          showSuggestions
          hint="Try typing — the meter is plain, predictable arithmetic."
        />
      </Demo>

      <Demo
        name="FileDrop"
        about="Drag, drop, validate. Rejections come back with a reason each instead of vanishing."
        code={`<FileDrop accept=".png,.jpg,.pdf" multiple maxSize={2_000_000} onChange={setFiles} />`}
      >
        <FileDropDemo />
      </Demo>

      <Demo
        name="ColorInput"
        about="A swatch, a hex field and one-click presets. Emits normalised #rrggbb whatever you type."
        code={`<ColorInput defaultValue="#4d9fff" presets={["#4d9fff", "#7c3aed", "#0f766e"]} label="Brand" />`}
      >
        <ColorInput
          defaultValue="#7c3aed"
          presets={SWATCHES}
          label="Brand colour"
          hint="Also accepts #abc and ABCDEF."
        />
      </Demo>

      <Demo
        name="RadioGroup"
        about="Options as data, with a secondary hint line per option and arrow-key roving."
        code={`<RadioGroup
  label="Plan"
  defaultValue="pro"
  options={[{ value: "pro", label: "Pro", hint: "Everything in Starter, plus SSO" }]}
/>`}
      >
        <RadioGroup
          label="Plan"
          defaultValue="pro"
          options={[
            { value: "starter", label: "Starter", hint: "One project" },
            { value: "pro", label: "Pro", hint: "Unlimited projects, SSO" },
            { value: "scale", label: "Scale", hint: "Dedicated support" },
          ]}
        />
      </Demo>

      <Demo
        name="CheckboxGroup"
        about="The multi-pick equivalent, with a max that simply ignores ticks past the limit."
        code={`<CheckboxGroup label="Notify me about" defaultValue={["deploys"]} options={…} />`}
      >
        <CheckboxGroup
          label="Notify me about"
          defaultValue={["deploys"]}
          options={[
            { value: "deploys", label: "Deploys" },
            { value: "errors", label: "Errors" },
            { value: "billing", label: "Billing" },
          ]}
        />
      </Demo>

      <Demo
        name="ToggleGroup"
        about="A segmented control, single or multiple. Icon-only segments require an ariaLabel."
        code={`<ToggleGroup
  label="View"
  type="single"
  defaultValue={["grid"]}
  items={[{ value: "grid", label: "Grid" }, { value: "list", label: "List" }]}
/>`}
      >
        <div className="lacx-col">
          <ToggleGroup
            label="View"
            type="single"
            defaultValue={["grid"]}
            items={[
              { value: "grid", label: "Grid" },
              { value: "list", label: "List" },
              { value: "board", label: "Board" },
            ]}
          />
          <ToggleGroup
            label="Text style"
            type="multiple"
            size="sm"
            defaultValue={["bold"]}
            items={[
              { value: "bold", label: "B" },
              { value: "italic", label: "I" },
              { value: "under", label: "U" },
            ]}
          />
        </div>
      </Demo>
    </Cat>
  );
}

/* ==========================================================================
   Overlays

   Every one of these portals out of the card. They are given `container` so
   they land inside the themed wrapper and pick up the accent, radius and font
   you chose above — a portalled dialog that ignores a scoped theme is the
   classic bug this prop exists to avoid.
   ========================================================================== */

function ModalDemo() {
  const [open, setOpen] = useState(false);
  const portal = usePortal();
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        container={portal}
        title="Rotate API key"
        description="The old key stops working the moment the new one is issued."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Rotate key</Button>
          </>
        }
      >
        <Text as="p" tone="muted">
          Focus is trapped while this is open, Escape closes it, the rest of the page is
          aria-hidden, and focus goes back to the button that opened it.
        </Text>
      </Modal>
    </>
  );
}

function ConfirmDemo() {
  const [open, setOpen] = useState(false);
  const [gone, setGone] = useState(false);
  const portal = usePortal();
  return (
    <div className="lacx-col">
      <Button tone="danger" variant="soft" onClick={() => setOpen(true)}>
        Delete workspace
      </Button>
      <p className="lacx-note">{gone ? "Deleted — after a 1.2s round trip." : "The confirm button waits for the promise."}</p>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        container={portal}
        tone="danger"
        title="Delete “lacspace-prod”?"
        message="Every deployment, log and secret in it goes with it. This cannot be undone."
        confirmLabel="Delete it"
        onConfirm={() =>
          new Promise<void>((resolve) =>
            setTimeout(() => {
              setGone(true);
              resolve();
            }, 1200),
          )
        }
      />
    </div>
  );
}

function DrawerDemo() {
  const [open, setOpen] = useState(false);
  const portal = usePortal();
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open filters
      </Button>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        container={portal}
        side="right"
        size="min(380px, 90vw)"
        title="Filters"
        footer={<Button full onClick={() => setOpen(false)}>Apply</Button>}
      >
        <div className="lacx-col">
          <CheckboxGroup
            label="Status"
            defaultValue={["live"]}
            options={[
              { value: "live", label: "Live" },
              { value: "draft", label: "Draft" },
              { value: "archived", label: "Archived" },
            ]}
          />
          <Divider />
          <Slider defaultValue={[10, 80]} label="Score" />
        </div>
      </Drawer>
    </>
  );
}

function ToastDemo() {
  const { toast } = useToast();
  return (
    <div className="lacx-col">
      <div className="lacx-row">
        <Button
          size="sm"
          onClick={() =>
            toast({ title: "Deployed", description: "lacspace-prod · 1.4s", tone: "success" })
          }
        >
          Success
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            toast({
              title: "Build failed",
              description: "Exit code 1 in step “typecheck”.",
              tone: "danger",
              duration: 0,
            })
          }
        >
          Sticky error
        </Button>
      </div>
      <Toast title="Copied to clipboard" description="Rendered inline, no queue needed." tone="info" />
    </div>
  );
}

function OverlaysSection() {
  const portal = usePortal();
  return (
    <Cat
      id="overlays"
      eyebrow="Overlays"
      title={<>Dialogs that behave like <span className="grad">dialogs</span></>}
      intro="Trapped focus, Escape to close, focus handed back where it came from, and the page behind marked aria-hidden. They portal out of their container, so nothing with overflow: hidden can ever clip them."
    >
      <Demo
        name="Modal"
        about="A real dialog: dimmed page, trapped focus, scroll lock, and nothing rendered at all on the server."
        code={`const [open, setOpen] = useState(false);

<Modal open={open} onOpenChange={setOpen} title="Rotate API key" footer={<Button>Rotate</Button>}>
  <p>The old key stops working immediately.</p>
</Modal>`}
        center
      >
        <ModalDemo />
      </Demo>

      <Demo
        name="ConfirmDialog"
        about="The are-you-sure, with the async case handled: the button stays busy until onConfirm settles, and a rejection leaves the dialog open."
        code={`<ConfirmDialog
  open={open}
  onOpenChange={setOpen}
  tone="danger"
  message="This cannot be undone."
  onConfirm={() => api.delete(id)}
/>`}
      >
        <ConfirmDemo />
      </Demo>

      <Demo
        name="Drawer"
        about="A panel from any edge, with identical focus and escape rules to Modal — from the keyboard they are the same thing."
        code={`<Drawer open={open} onOpenChange={setOpen} side="right" size="min(380px, 90vw)" title="Filters">
  …
</Drawer>`}
        center
      >
        <DrawerDemo />
      </Demo>

      <Demo
        name="Popover"
        about="Anchored to its trigger, position: fixed and portalled, so it flips instead of running off screen — and is never clipped by a table or a card."
        code={`<Popover trigger="Columns" placement="bottom">
  <CheckboxGroup label="Visible columns" options={columns} />
</Popover>`}
        center
      >
        <Popover trigger="Columns ▾" placement="bottom" container={portal}>
          <div style={{ minWidth: 180 }}>
            <CheckboxGroup
              label="Visible columns"
              defaultValue={["name", "status"]}
              options={[
                { value: "name", label: "Name" },
                { value: "status", label: "Status" },
                { value: "owner", label: "Owner" },
              ]}
            />
          </div>
        </Popover>
      </Demo>

      <Demo
        name="Tooltip"
        about="Appears on hover and on keyboard focus — focus is the half everyone forgets. The tip never takes pointer events."
        code={`<Tooltip content="Runs on every push">
  <Button variant="outline">Auto-deploy</Button>
</Tooltip>`}
        center
      >
        <div className="lacx-row">
          <Tooltip content="Runs on every push to main" container={portal}>
            <Button variant="outline">Hover me</Button>
          </Tooltip>
          <Tooltip content="Also works on Tab" placement="right" container={portal}>
            <Button variant="ghost">Or focus me</Button>
          </Tooltip>
        </div>
      </Demo>

      <Demo
        name="Toast"
        about="A queue, not a cap: extra toasts wait for a slot, timers pause while you hover, and duration 0 stays until dismissed."
        code={`const { toast } = useToast();

toast({ title: "Deployed", description: "lacspace-prod · 1.4s", tone: "success" });`}
      >
        <ToastDemo />
      </Demo>
    </Cat>
  );
}

/* ==========================================================================
   Navigation
   ========================================================================== */

function PaginationDemo() {
  const [page, setPage] = useState(5);
  return (
    <div className="lacx-col">
      <Pagination totalPages={12} page={page} onChange={setPage} showFirstLast siblings={1} />
      <p className="lacx-note">Page {page} of 12 — the control keeps its width as you move.</p>
    </div>
  );
}

function StepperDemo() {
  const [active, setActive] = useState(1);
  return (
    <div className="lacx-col">
      <Stepper
        clickable
        active={active}
        onChange={setActive}
        label="Onboarding"
        steps={[
          { label: "Account", description: "Email verified" },
          { label: "Workspace", description: "Name and region" },
          { label: "Billing", description: "Card on file" },
          { label: "Invite", description: "Your team" },
        ]}
      />
      <p className="lacx-note">Click a completed step to go back.</p>
    </div>
  );
}

function NavListDemo() {
  const [current, setCurrent] = useState("packages");
  const item = (id: string, label: string, badge?: string) => (
    <NavItem
      key={id}
      active={current === id}
      badge={badge}
      onClick={() => setCurrent(id)}
    >
      {label}
    </NavItem>
  );
  return (
    <NavList label="Docs navigation" size="sm">
      <NavSection title="Start here">
        {item("install", "Installation")}
        {item("theming", "Theming", "new")}
      </NavSection>
      <NavSection title="Reference">
        {item("packages", "Packages", "143")}
        {item("cli", "CLI")}
      </NavSection>
    </NavList>
  );
}

function NavigationSection() {
  return (
    <Cat
      id="navigation"
      eyebrow="Navigation"
      title={<>Getting around, with the <span className="grad">keyboard rules</span> intact</>}
      intro="Arrow keys, Home and End, typeahead in menus, roving tabindex in toolbars, and a pager whose buttons do not shuffle under your cursor. The logic behind each one is exported as a pure function too."
    >
      <Demo
        name="Tabs"
        about="Tabs holds the state, TabList the strip, Tab a trigger, TabPanel the content — and panels may live anywhere below."
        code={`<Tabs defaultValue="overview" variant="line">
  <TabList label="Project sections">
    <Tab value="overview">Overview</Tab>
    <Tab value="logs" badge="3">Logs</Tab>
  </TabList>
  <TabPanel value="overview">…</TabPanel>
</Tabs>`}
        span={2}
      >
        <Tabs defaultValue="overview" variant="line">
          <TabList label="Project sections">
            <Tab value="overview">Overview</Tab>
            <Tab value="logs" badge="3">
              Logs
            </Tab>
            <Tab value="settings">Settings</Tab>
          </TabList>
          <TabPanel value="overview">
            <Text as="p" tone="muted">Arrow keys move between tabs; the panel follows.</Text>
          </TabPanel>
          <TabPanel value="logs">
            <Text as="p" tone="muted">Three warnings in the last hour.</Text>
          </TabPanel>
          <TabPanel value="settings">
            <Text as="p" tone="muted">Use activation=&quot;manual&quot; when a panel costs a fetch.</Text>
          </TabPanel>
        </Tabs>
      </Demo>

      <Demo
        name="Accordion"
        about="Panels animate with grid-template-rows 0fr→1fr, so the height is the browser's problem — no measuring, no ResizeObserver."
        code={`<Accordion defaultValue={["a"]} multiple>
  <AccordionItem value="a" title="Is it really zero-dependency?" meta="Yes">
    React is the only peer.
  </AccordionItem>
</Accordion>`}
        span={2}
      >
        <Accordion defaultValue={["a"]} variant="divided">
          <AccordionItem value="a" title="Is it really zero-dependency?" meta="Yes">
            <Text as="p" tone="muted">React is the only peer. No clsx, no floating-ui, no animation library.</Text>
          </AccordionItem>
          <AccordionItem value="b" title="Does it need Tailwind?" description="Short answer: no">
            <Text as="p" tone="muted">One plain stylesheet, imported once. Every value in it is a CSS variable.</Text>
          </AccordionItem>
          <AccordionItem value="c" title="Can I server-render it?">
            <Text as="p" tone="muted">Nothing touches window during render, so yes — straight from a server component.</Text>
          </AccordionItem>
        </Accordion>
      </Demo>

      <Demo
        name="Breadcrumbs"
        about="Too long a trail collapses behind a … that expands in place, so the hidden crumbs stay reachable."
        code={`<Breadcrumbs
  maxItems={4}
  items={[{ label: "Home", href: "/" }, { label: "Components" }]}
/>`}
      >
        <Breadcrumbs
          maxItems={4}
          items={[
            { label: "Home", href: "/" },
            { label: "Packages", href: "/packages" },
            { label: "Handbook", href: "/handbook" },
            { label: "Components", href: "/components" },
            { label: "Breadcrumbs" },
          ]}
        />
      </Demo>

      <Demo
        name="Pagination"
        about="The visible window comes from the exported paginationRange(), so the width is stable while you page through the middle."
        code={`<Pagination totalPages={12} page={page} onChange={setPage} showFirstLast />`}
      >
        <PaginationDemo />
      </Demo>

      <Demo
        name="Stepper"
        about="Done, current, upcoming and error states, derived by the exported deriveStepStates() so a summary elsewhere agrees with it."
        code={`<Stepper clickable active={step} onChange={setStep} steps={[{ label: "Account" }, { label: "Billing" }]} />`}
        span={2}
      >
        <StepperDemo />
      </Demo>

      <Demo
        name="DropdownMenu"
        about="Full menu keyboard support — Up/Down, Home/End, Escape back to the trigger, and typeahead that cycles on a repeated letter."
        code={`<DropdownMenu
  trigger="Actions"
  triggerLabel="Row actions"
  items={[
    { kind: "label", label: "This deployment" },
    { label: "Redeploy", shortcut: "⌘R", onSelect: redeploy },
    { kind: "separator" },
    { label: "Delete", danger: true, onSelect: remove },
  ]}
/>`}
        pop
      >
        <MenuDemo />
      </Demo>

      <Demo
        name="NavList"
        about="A sidebar, composed from NavSection and NavItem. An item with no href renders a real button, not an inert link."
        code={`<NavList label="Docs">
  <NavSection title="Reference">
    <NavItem href="/packages" active badge="143">Packages</NavItem>
  </NavSection>
</NavList>`}
      >
        <NavListDemo />
      </Demo>

      <Demo
        name="Toolbar"
        about="One tab stop for the whole bar; the arrow keys move inside it. That is the ARIA toolbar pattern."
        code={`<Toolbar label="Formatting">
  <ToolbarGroup label="Text">
    <IconButton label="Bold" icon={<B />} variant="ghost" />
  </ToolbarGroup>
  <ToolbarSeparator />
</Toolbar>`}
        span={2}
      >
        <Toolbar label="Formatting">
          <ToolbarGroup label="Text style">
            <IconButton label="Bold" icon={<b>B</b>} variant="ghost" size="sm" />
            <IconButton label="Italic" icon={<i>I</i>} variant="ghost" size="sm" />
            <IconButton label="Underline" icon={<u>U</u>} variant="ghost" size="sm" />
          </ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarGroup label="Insert">
            <IconButton label="Add block" icon={<Ico d={PATH.plus} />} variant="ghost" size="sm" />
            <IconButton label="Find" icon={<Ico d={PATH.search} />} variant="ghost" size="sm" />
          </ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarGroup label="Danger">
            <IconButton label="Delete block" icon={<Ico d={PATH.trash} />} variant="ghost" size="sm" tone="danger" />
          </ToolbarGroup>
        </Toolbar>
      </Demo>
    </Cat>
  );
}

/* ==========================================================================
   Data display
   ========================================================================== */

function RatingDemo() {
  const [value, setValue] = useState(3.5);
  return (
    <div className="lacx-col">
      <Rating value={value} onChange={setValue} allowHalf allowClear label="Overall rating" />
      <Rating value={4} readOnly size="sm" label="Average rating" />
      <p className="lacx-note">{value ? `${value} out of 5` : "Cleared"}</p>
    </div>
  );
}

function TagInputDemo() {
  const [tags, setTags] = useState(["react", "zero-dependency"]);
  const [rejected, setRejected] = useState<string[]>([]);
  return (
    <div className="lacx-col">
      <TagInput
        value={tags}
        onChange={setTags}
        onReject={setRejected}
        max={6}
        label="Topics"
        placeholder="Type and press Enter"
      />
      <p className="lacx-note">
        {rejected.length ? `Rejected: ${rejected.join(", ")}` : `${tags.length} of 6 — paste a comma-separated list to add several.`}
      </p>
    </div>
  );
}

function TreeDemo() {
  const [selected, setSelected] = useState<string | null>("index");
  return (
    <div className="lacx-col">
      <Tree
        label="Project files"
        defaultExpandedIds={["src"]}
        selectedId={selected}
        onSelect={(id) => setSelected(id)}
        nodes={[
          {
            id: "src",
            label: "src",
            children: [
              { id: "index", label: "index.tsx" },
              { id: "button", label: "button.tsx" },
              {
                id: "styles",
                label: "styles",
                children: [
                  { id: "base", label: "00-base.css" },
                  { id: "form", label: "40-form.css" },
                ],
              },
            ],
          },
          { id: "readme", label: "README.md" },
        ]}
      />
      <p className="lacx-note">Selected: {selected ?? "nothing"}</p>
    </div>
  );
}

function TagDemo() {
  const [tags, setTags] = useState(["design", "docs", "infra"]);
  return (
    <div className="lacx-col">
      <div className="lacx-row">
        <Tag tone="success">live</Tag>
        <Tag tone="warning" variant="outline">beta</Tag>
        <Tag tone="accent" variant="solid">new</Tag>
        <Tag disabled>locked</Tag>
      </div>
      <div className="lacx-row">
        {tags.map((t) => (
          <Tag key={t} onRemove={() => setTags((list) => list.filter((x) => x !== t))}>
            {t}
          </Tag>
        ))}
        {tags.length === 0 && (
          <Button size="sm" variant="ghost" onClick={() => setTags(["design", "docs", "infra"])}>
            Put them back
          </Button>
        )}
      </div>
    </div>
  );
}

function MenuDemo() {
  const [chosen, setChosen] = useState<string | null>(null);
  return (
    <div className="lacx-col">
      <DropdownMenu
        trigger="Actions ▾"
        triggerLabel="Row actions"
        items={[
          { kind: "label", label: "This deployment" },
          { label: "Redeploy", shortcut: "⌘R", onSelect: () => setChosen("Redeploy") },
          { label: "View logs", shortcut: "⌘L", onSelect: () => setChosen("View logs") },
          { kind: "separator" },
          { label: "Promote to production", onSelect: () => setChosen("Promote to production") },
          { label: "Delete", danger: true, onSelect: () => setChosen("Delete") },
        ]}
      />
      <p className="lacx-note">{chosen ? `Chose: ${chosen}` : "Open it and type “d” — typeahead jumps to Delete."}</p>
    </div>
  );
}

function DataDisplaySection() {
  return (
    <Cat
      id="data"
      eyebrow="Data display"
      title={<>Showing the <span className="grad">numbers</span> and the people behind them</>}
      intro="Avatars that survive a 404, a KPI block that knows a rise in churn is bad news, a breakdown whose bars and percentages measure different things on purpose, and a tree with the full ARIA keyboard pattern."
    >
      <Demo
        name="Avatar"
        about="Initials are always rendered underneath; the image simply stops covering them when it fails. No layout shift, nothing to configure."
        code={`<Avatar name="Ada Byron Lovelace" status="online" />
<Avatar name="Grace Hopper" shape="square" size="lg" />`}
      >
        <div className="lacx-row">
          <Avatar name="Ada Byron Lovelace" size="sm" />
          <Avatar name="Grace Hopper" status="online" />
          <Avatar name="Katherine Johnson" shape="square" size="lg" />
          <Avatar name="Alan Turing" status="busy" size="xl" />
        </div>
      </Demo>

      <Demo
        name="AvatarGroup"
        about="Overlapping faces with a real +N element — not a pseudo-element, so it survives copy-paste and screen readers."
        code={`<AvatarGroup max={3} total={42}>
  <Avatar name="Ada Lovelace" />
  <Avatar name="Grace Hopper" />
</AvatarGroup>`}
      >
        <AvatarGroup max={3} total={42}>
          <Avatar name="Ada Lovelace" />
          <Avatar name="Grace Hopper" />
          <Avatar name="Katherine Johnson" />
          <Avatar name="Alan Turing" />
          <Avatar name="Margaret Hamilton" />
        </AvatarGroup>
      </Demo>

      <Demo
        name="Stat"
        about="A KPI block. invertDelta exists because the arrow and the colour are different questions — churn up is a rise and bad news."
        code={`<Stat label="Monthly churn" value="2.1%" delta={0.4} invertDelta comparison="vs last 30 days" />`}
        span={2}
      >
        <div className="lacx-row" style={{ gap: 26 }}>
          <Stat label="Downloads" value="412,908" delta={12.5} comparison="vs last 30 days" />
          <Stat label="Monthly churn" value="2.1%" delta={0.4} invertDelta comparison="vs last 30 days" />
          <Stat label="Open issues" value="7" delta={0} comparison="unchanged" />
        </div>
      </Demo>

      <Demo
        name="Timeline"
        about="An <ol>, because the order carries meaning. The connector is drawn by CSS, so items of any height stay joined."
        code={`<Timeline>
  <TimelineItem title="Published" time="2m ago" tone="success" />
  <TimelineItem title="Review" time="Pending" pending />
</Timeline>`}
      >
        <Timeline>
          <TimelineItem title="v1.0.0 published" time="2 minutes ago" tone="success" />
          <TimelineItem title="Typecheck passed" time="4 minutes ago" tone="info" />
          <TimelineItem title="Docs deploy" time="Queued" pending />
        </Timeline>
      </Demo>

      <Demo
        name="DescriptionList"
        about="A real <dl>, each pair wrapped in a div so the label and value stay associated for assistive tech."
        code={`<DescriptionList
  divided
  items={[{ label: "Licence", value: "Lacspace Free Licence v1.0" }]}
/>`}
      >
        <DescriptionList
          divided
          items={[
            { label: "Version", value: "1.0.0" },
            { label: "Licence", value: "Lacspace Free Licence v1.0" },
            { label: "Dependencies", value: "0" },
            { label: "Peer", value: "react >= 18" },
          ]}
        />
      </Demo>

      <Demo
        name="EmptyState"
        about="The nothing-here-yet panel. action is a slot, so two buttons or a file input fit without a prop for each."
        code={`<EmptyState
  bordered
  title="No deployments yet"
  description="Push to main and one appears here."
  action={<Button size="sm">Read the guide</Button>}
/>`}
      >
        <EmptyState
          bordered
          size="sm"
          icon="📦"
          title="No deployments yet"
          description="Push to main and one appears here."
          action={<Button size="sm">Read the guide</Button>}
        />
      </Demo>

      <Demo
        name="Tag"
        about="A chip whose remove control is a real button with its own label — announced as “Remove design”, not as an anonymous ×."
        code={`<Tag tone="success" onRemove={() => drop("live")}>live</Tag>`}
      >
        <TagDemo />
      </Demo>

      <Demo
        name="TagInput"
        about="Type a tag, press Enter. Paste a spreadsheet column, get one tag per line. Backspace on an empty field removes the last."
        code={`<TagInput value={tags} onChange={setTags} max={6} label="Topics" />`}
      >
        <TagInputDemo />
      </Demo>

      <Demo
        name="Rating"
        about="Halves are a clipped copy of the same glyph, so a custom icon gets halves free. Interactive ratings are a real slider role."
        code={`<Rating value={value} onChange={setValue} allowHalf allowClear label="Overall rating" />`}
      >
        <RatingDemo />
      </Demo>

      <Demo
        name="Kbd"
        about="cmd+k becomes two caps and a separator, because one cap reading “cmd+k” lies about which keys you press."
        code={`<Kbd keys="cmd+k" />
<Kbd keys="ctrl+shift+p" />`}
      >
        <div className="lacx-row">
          <Kbd keys="cmd+k" />
          <Kbd keys="ctrl+shift+p" />
          <Kbd keys="esc" />
        </div>
      </Demo>

      <Demo
        name="Code"
        about="Inline code, for a flag or a path inside a sentence."
        code={`Run <Code>npx create-lacspace-app</Code> to scaffold one.`}
      >
        <Text as="p">
          Pass <Code>--fullstack</Code> to <Code>create-lacspace-app</Code>, or{" "}
          <Code tone="danger">--force</Code> to overwrite.
        </Text>
      </Demo>

      <Demo
        name="Snippet"
        about="A code block with a copy button. The prompt is rendered but never copied, so “$ npm i” puts “npm i” on the clipboard."
        code={`<Snippet code="npm i @lacspace/components" prompt="$" />`}
      >
        <Snippet code="npm i @lacspace/components" prompt="$" />
      </Demo>

      <Demo
        name="Divider"
        about="With a label it stays a separator for assistive tech and grows two line segments around the text."
        code={`<Divider label="or" />
<Divider variant="dashed" />`}
      >
        <div className="lacx-col" style={{ width: "100%" }}>
          <Button variant="outline" full>
            Continue with email
          </Button>
          <Divider label="or" />
          <Button variant="ghost" full>
            Use a passkey
          </Button>
        </div>
      </Demo>

      <Demo
        name="Tree"
        about="The ARIA tree pattern in full: Right opens then steps in, Left closes then steps out, and only one row is tabbable."
        code={`<Tree label="Project files" nodes={nodes} selectedId={selected} onSelect={setSelected} />`}
      >
        <TreeDemo />
      </Demo>

      <Demo
        name="MetricBar"
        about="Bars scale to the largest row so the smallest stays visible; the percentage is that row's share of the total. Confusing the two is why dashboards show bars adding to 130%."
        code={`<MetricBar showShare items={[{ label: "Direct", value: 4120 }, { label: "Search", value: 2880 }]} />`}
        span={2}
      >
        <MetricBar
          showShare
          items={[
            { label: "npm", value: 41208 },
            { label: "GitHub", value: 18840, tone: "info" },
            { label: "Docs site", value: 9210, tone: "success" },
            { label: "Other", value: 1180, tone: "warning" },
          ]}
        />
      </Demo>
    </Cat>
  );
}

/* ==========================================================================
   Feedback
   ========================================================================== */

function ProgressDemo() {
  const [value, setValue] = useState(38);
  return (
    <div className="lacx-col">
      <Progress value={value} label="Upload progress" />
      <Progress tone="success" value={100} label="Finished" />
      <Progress label="Working" />
      <div className="lacx-row">
        <Button size="sm" variant="outline" onClick={() => setValue((v) => Math.max(0, v - 20))}>
          −20
        </Button>
        <Button size="sm" variant="outline" onClick={() => setValue((v) => Math.min(100, v + 20))}>
          +20
        </Button>
        <Text size="sm" tone="muted">{value}% · the third bar has no value, so it is honestly indeterminate</Text>
      </div>
    </div>
  );
}

function FeedbackSection() {
  return (
    <Cat
      id="feedback"
      eyebrow="Feedback"
      title={<>Telling people what is <span className="grad">happening</span></>}
      intro="A spinner that inherits the text colour, skeletons shaped like the paragraph they stand in for, and a progress bar that admits when it does not know how long something will take."
    >
      <Demo
        name="Spinner"
        about="One element, sized from the current font by default so it sits on the text baseline."
        code={`<Spinner />
<Spinner size={28} label="Loading deployments" />`}
      >
        <div className="lacx-row">
          <Text size="sm">Inline <Spinner /> with text</Text>
          <Spinner size={22} label="Loading" />
          <Spinner size={30} label={null} />
        </div>
      </Demo>

      <Demo
        name="Skeleton"
        about="With lines it renders a paragraph shape, the last line shortened — which reads as text far better than equal-width bars."
        code={`<Skeleton circle width={40} height={40} />
<Skeleton lines={3} />`}
      >
        <div className="lacx-row" style={{ alignItems: "flex-start", flexWrap: "nowrap" }}>
          <Skeleton circle width={40} height={40} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <Skeleton lines={3} />
          </div>
        </div>
      </Demo>

      <Demo
        name="Progress"
        about="With no value it animates indefinitely — the honest way to show work of unknown length."
        code={`<Progress value={38} label="Upload progress" />
<Progress label="Working" /> {/* indeterminate */}`}
        span={2}
      >
        <ProgressDemo />
      </Demo>

      <Demo
        name="ProgressRing"
        about="The compact circular form, for dashboards and cards."
        code={`<ProgressRing value={72} showValue label="Coverage" />`}
      >
        <div className="lacx-row">
          <ProgressRing value={72} showValue label="Coverage" />
          <ProgressRing value={38} size={56} thickness={6} showValue label="Budget used" />
          <ProgressRing value={100} size={36} label="Done" />
        </div>
      </Demo>

      <Demo
        name="Alert"
        about="Anything with the danger tone gets role=alert so it is announced immediately; quieter tones stay polite."
        code={`<Alert tone="warning" title="Key expires in 3 days" action={<Button size="sm">Rotate</Button>}>
  Rotate it before Friday.
</Alert>`}
        span={2}
      >
        <div className="lacx-col">
          <Alert tone="info" title="Heads up" icon="ℹ️">
            The stylesheet is imported once, anywhere in your app.
          </Alert>
          <Alert
            tone="warning"
            title="Key expires in 3 days"
            action={<Button size="sm" variant="outline">Rotate</Button>}
          >
            Rotate it before Friday or deploys will start failing.
          </Alert>
          <Alert tone="danger" title="Build failed">
            Exit code 1 in step “typecheck”.
          </Alert>
          <Alert tone="success" title="Published to npm" />
        </div>
      </Demo>

      <Demo
        name="Badge"
        about="A small status pill for table cells, list rows and headers — soft or outline, with an optional status dot."
        code={`<Badge tone="success" dot>Live</Badge>
<Badge tone="warning" variant="outline">Draft</Badge>`}
      >
        <div className="lacx-row">
          <Badge tone="success" dot>
            Live
          </Badge>
          <Badge tone="warning" variant="outline">
            Draft
          </Badge>
          <Badge tone="danger" dot>
            Failing
          </Badge>
          <Badge tone="accent">v1.0.0</Badge>
          <Badge>Neutral</Badge>
        </div>
      </Demo>
    </Cat>
  );
}

/* ==========================================================================
   Layout
   ========================================================================== */

function LayoutSection() {
  return (
    <Cat
      id="layout"
      eyebrow="Layout"
      title={<>Primitives instead of a <span className="grad">utility class soup</span></>}
      intro="Responsive props take a breakpoint map — { base: 'column', md: 'row' } is the classic stacked-on-phones layout and costs no JavaScript. The maths behind each one (spaceToken, gridTemplate, ratioToPercent, scrollEdges) is exported too."
    >
      <Demo
        name="Card"
        about="A bordered surface, plus the parts — CardHeader, CardTitle, CardDescription, CardBody, CardFooter."
        code={`<Card>
  <CardHeader>
    <CardTitle>Pro</CardTitle>
    <CardDescription>Everything in Starter, plus SSO.</CardDescription>
  </CardHeader>
  <CardBody>…</CardBody>
  <CardFooter><Button full>Choose Pro</Button></CardFooter>
</Card>`}
      >
        <Card style={{ width: "100%" }}>
          <CardHeader>
            <CardTitle>Pro</CardTitle>
            <CardDescription>Everything in Starter, plus SSO.</CardDescription>
          </CardHeader>
          <CardBody>
            <Text size="sm" tone="muted">Unlimited projects and a 99.9% uptime target.</Text>
          </CardBody>
          <CardFooter>
            <Button full>Choose Pro</Button>
          </CardFooter>
        </Card>
      </Demo>

      <Demo
        name="Panel"
        about="A titled region, optionally collapsible. The body stays mounted and is hidden, so form state and scroll position survive a collapse."
        code={`<Panel collapsible title="Advanced" description="Rarely needed." actions={<Badge>3</Badge>}>
  …
</Panel>`}
      >
        <Panel
          collapsible
          title="Advanced"
          description="Rarely needed, never hidden."
          actions={<Badge tone="accent">3</Badge>}
          style={{ width: "100%" }}
        >
          <Text size="sm" tone="muted">Click the header. The content below is hidden, not unmounted.</Text>
        </Panel>
      </Demo>

      <Demo
        name="Stack · HStack · VStack"
        about="One-dimensional layout with a gap from the shared scale, and an optional divider between children."
        code={`<Stack direction={{ base: "column", md: "row" }} gap={3} divider>
  <div>One</div>
  <div>Two</div>
</Stack>`}
      >
        <div className="lacx-col" style={{ width: "100%" }}>
          <HStack gap={2} wrap>
            <Badge>one</Badge>
            <Badge>two</Badge>
            <Badge>three</Badge>
          </HStack>
          <VStack gap={2} divider align="stretch">
            <Text size="sm">Divided</Text>
            <Text size="sm">vertical</Text>
            <Text size="sm">stack</Text>
          </VStack>
        </div>
      </Demo>

      <Demo
        name="Grid · GridItem"
        about="Give it minColWidth and it reflows on its own container width with no breakpoints at all."
        code={`<Grid minColWidth={120} gap={2}>
  <GridItem span="full">Header</GridItem>
  <div>Cell</div>
</Grid>`}
      >
        <Grid minColWidth={90} gap={2} style={{ width: "100%" }}>
          <GridItem span="full">
            <span className="lacx-swatch" style={{ height: 26 }} />
          </GridItem>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <span key={n} className="lacx-swatch" style={{ height: 34 }} />
          ))}
        </Grid>
      </Demo>

      <Demo
        name="Container"
        about="Width-limited, gutter-aware page column. Border-box throughout, so nesting one inside another cannot double the padding."
        code={`<Container size="sm">…page content…</Container>`}
      >
        <div className="lacx-box" style={{ width: "100%" }}>
          <Container size="xs" style={{ background: "var(--lac-accent-soft)", borderRadius: "var(--lac-radius)" }}>
            <Text size="sm" tone="muted">size=&quot;xs&quot; inside a dashed parent</Text>
          </Container>
        </div>
      </Demo>

      <Demo
        name="Section"
        about="A titled band with consistent rhythm. The heading gets a stable id and is referenced by aria-labelledby, so the landmark is actually labelled."
        code={`<Section title="Deployments" description="Last 30 days." actions={<Button size="sm">New</Button>}>
  …
</Section>`}
      >
        <Section
          level={4}
          space="none"
          title="Deployments"
          description="Last 30 days."
          actions={<Button size="sm" variant="ghost">New</Button>}
          style={{ width: "100%" }}
        >
          <Text size="sm" tone="muted">Content sits under a properly labelled region.</Text>
        </Section>
      </Demo>

      <Demo
        name="Center"
        about="Centres its children, with a minHeight for heroes and empty states. The layout job everybody rewrites — here once."
        code={`<Center minHeight="100vh">…</Center>`}
      >
        <Center minHeight={90} className="lacx-box" style={{ width: "100%" }}>
          <Badge tone="accent">Dead centre</Badge>
        </Center>
      </Demo>

      <Demo
        name="AspectRatio"
        about="Content is absolutely positioned and clipped, so an image or iframe that reports its own size cannot push the box out of ratio."
        code={`<AspectRatio ratio="16/9" rounded>
  <img src="/cover.jpg" alt="" />
</AspectRatio>`}
      >
        <AspectRatio ratio="16/9" rounded style={{ width: "100%" }}>
          <span className="lacx-swatch" />
        </AspectRatio>
      </Demo>

      <Demo
        name="ScrollArea · Sticky"
        about="Edge shadows toggled by data attributes, so they cost no extra DOM — and a Sticky header that actually sticks inside it."
        code={`<ScrollArea maxHeight={160} thin>
  <Sticky top={0} surface>Header</Sticky>
  …rows…
</ScrollArea>`}
      >
        <ScrollArea maxHeight={150} thin style={{ width: "100%" }}>
          <Sticky top={0} surface zIndex={1}>
            <Text size="sm" weight="semibold" as="div" style={{ padding: "6px 0" }}>
              Sticky header
            </Text>
          </Sticky>
          <div className="lacx-col" style={{ gap: 6 }}>
            {Array.from({ length: 12 }, (_, i) => (
              <Text key={i} size="sm" tone="muted">
                Row {i + 1} — scroll to see the edge shadows appear.
              </Text>
            ))}
          </div>
        </ScrollArea>
      </Demo>

      <Demo
        name="Spacer"
        about="Empty space. With no size it flexes, pushing its siblings to the ends of the row."
        code={`<HStack>
  <Text>Total</Text>
  <Spacer />
  <Text mono>$1,204.00</Text>
</HStack>`}
      >
        <HStack align="center" style={{ width: "100%" }}>
          <Text size="sm">Total</Text>
          <Spacer />
          <Text size="sm" mono weight="semibold">
            $1,204.00
          </Text>
        </HStack>
      </Demo>
    </Cat>
  );
}

/* ==========================================================================
   Typography
   ========================================================================== */

function HighlightDemo() {
  const [query, setQuery] = useState("zero");
  return (
    <div className="lacx-col">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type to mark"
        aria-label="Highlight query"
        size="sm"
      />
      <Text as="p">
        <Highlight
          text="Zero-dependency React components: no Tailwind, no CSS-in-JS, zero runtime deps."
          query={query}
        />
      </Text>
    </div>
  );
}

function TypographySection() {
  return (
    <Cat
      id="typography"
      eyebrow="Typography"
      title={<>Text with the <span className="grad">scale built in</span></>}
      intro="A heading whose tag and whose size are two separate decisions, a Prose block that styles markup you did not author, and a middle-ellipsis that keeps the informative half of a path."
    >
      <Demo
        name="Text"
        about="Sizes, tones, weights, truncation, line clamping and a tabular mono option for anything in a column."
        code={`<Text as="p" size="sm" tone="muted">Supporting copy.</Text>
<Text mono weight="semibold">lac_live_9f2c</Text>
<Text lines={2}>A long paragraph clamped to two lines…</Text>`}
      >
        <div className="lacx-col">
          <Text as="p" size="lg">Large body copy.</Text>
          <Text as="p" tone="muted">Muted supporting copy.</Text>
          <Text as="p" size="sm" tone="danger" weight="semibold">Small, danger, semibold.</Text>
          <Text as="p" mono>lac_live_9f2c4a81</Text>
          <Text as="p" caps size="xs" tone="faint">Eyebrow label</Text>
          <Text as="p" lines={2}>
            Clamped to two lines with an ellipsis on the last one, which is what you want in a card
            where the copy is out of your control and the row heights are not.
          </Text>
        </div>
      </Demo>

      <Demo
        name="Heading"
        about="level is the tag, size is the look. Coupling them is how pages end up with an h4 before an h2."
        code={`<Heading level={3} size={2}>Looks like an h2, is an h3</Heading>`}
      >
        <div className="lacx-col" style={{ gap: 6 }}>
          <Heading level={3} size="display">Display</Heading>
          <Heading level={3} size={2}>Size 2, tag h3</Heading>
          <Heading level={4} size={4} tone="muted">Size 4, muted</Heading>
        </div>
      </Demo>

      <Demo
        name="Prose"
        about="Styles raw markup you did not author — rendered Markdown, a CMS field, an email body — without adding a single class to it."
        code={`<Prose dangerouslySetInnerHTML={{ __html: renderedMarkdown }} />`}
      >
        <Prose size="sm">
          <h3>Theming</h3>
          <p>
            Override any variable in your own CSS. The ones most people touch are{" "}
            <code>--lac-accent</code> and <code>--lac-radius</code>.
          </p>
          <ul>
            <li>No class names are added to your HTML.</li>
            <li>Line length is constrained to a reading measure.</li>
          </ul>
        </Prose>
      </Demo>

      <Demo
        name="Blockquote"
        about="A quotation with its attribution marked up as a footer/cite pair, the way HTML intends."
        code={`<Blockquote variant="pull" attribution="Ada Lovelace" meta="1843">
  …
</Blockquote>`}
      >
        <Blockquote tone="accent" attribution="The README" meta="@lacspace/components">
          Restyled by variables, not by forking.
        </Blockquote>
      </Demo>

      <Demo
        name="Highlight"
        about="Real <mark> elements, matched with indexOf rather than a RegExp — so a query full of dots and brackets matches literally instead of exploding."
        code={`<Highlight text={result.title} query={query} />`}
      >
        <HighlightDemo />
      </Demo>

      <Demo
        name="Truncate"
        about="Middle-ellipsis for ids, hashes and paths. CSS text-overflow can only cut the end, which destroys the half that identifies the thing."
        code={`<Truncate text="/Users/ada/projects/lacspace/src/components/index.tsx" max={34} />`}
      >
        <div className="lacx-col">
          <Truncate text="/Users/ada/projects/lacspace/src/components/index.tsx" max={34} />
          <Truncate text="9f2c4a8117be4d0fa6c3e5b21d7f8a90" max={20} />
        </div>
      </Demo>
    </Cat>
  );
}

/* ==========================================================================
   The gallery itself
   ========================================================================== */

const JUMPS = [
  { href: "#theme", label: "Theme editor" },
  { href: "#actions", label: "Actions" },
  { href: "#forms", label: "Forms" },
  { href: "#advanced", label: "Advanced forms" },
  { href: "#overlays", label: "Overlays" },
  { href: "#navigation", label: "Navigation" },
  { href: "#data", label: "Data display" },
  { href: "#feedback", label: "Feedback" },
  { href: "#layout", label: "Layout" },
  { href: "#typography", label: "Typography" },
  { href: "#reference", label: "Full reference" },
];

export function Gallery() {
  /* The themed container, held in state rather than a ref so that the moment
     it exists every portalled overlay re-renders into it. */
  const [portal, setPortal] = useState<HTMLDivElement | null>(null);
  const [state, setState] = useState<ThemeState>({
    accent: DEFAULTS.accent,
    radius: DEFAULTS.radius,
    control: DEFAULTS.control,
    font: DEFAULTS.font,
    theme: DEFAULTS.theme,
  });

  const set = (patch: Partial<ThemeState>) => setState((s) => ({ ...s, ...patch }));

  const { vars, css } = useMemo(() => {
    const dark = state.theme === "dark";
    const accent = normalizeHex(state.accent) ?? DEFAULTS.accent;
    const font = FONTS.find((f) => f.key === state.font) ?? FONTS[0];

    /* The accent's companions are derived rather than asked for: nobody wants
       to pick five colours to change one. Hover and active move towards the
       background, the soft and ring tints are the same hue at low alpha, and
       the foreground flips on luminance so a yellow accent does not end up
       with white text on it. */
    const hover = shift(accent, dark ? 0.14 : -0.1);
    const active = shift(accent, dark ? 0.26 : -0.2);
    const soft = rgba(accent, dark ? 0.16 : 0.12);
    const ring = rgba(accent, 0.42);
    const onAccent = luminance(accent) > 0.45 ? "#06131f" : "#ffffff";

    const vars = {
      "--lac-accent": accent,
      "--lac-accent-hover": hover,
      "--lac-accent-active": active,
      "--lac-accent-soft": soft,
      "--lac-accent-ring": ring,
      "--lac-accent-fg": onAccent,
      "--lac-fg-on-accent": onAccent,
      "--lac-radius": `${state.radius}px`,
      "--lac-radius-sm": `${Math.max(0, Math.round(state.radius * 0.6))}px`,
      "--lac-radius-lg": `${state.radius + 4}px`,
      "--lac-control-h-md": `${state.control}px`,
      "--lac-control-h-sm": `${Math.max(24, state.control - 8)}px`,
      "--lac-control-h-lg": `${state.control + 8}px`,
      "--lac-font": font.live,
    } as CSSProperties;

    const css = `:root {
  --lac-accent: ${accent};
  --lac-radius: ${state.radius}px;
  --lac-control-h-md: ${state.control}px;
  --lac-font: ${font.css};

  /* derived from the accent — optional, but this is what keeps
     hover, focus rings and button labels readable */
  --lac-accent-hover: ${hover};
  --lac-accent-soft: ${soft};
  --lac-accent-ring: ${ring};
  --lac-accent-fg: ${onAccent};
}`;

    return { vars, css };
  }, [state]);

  return (
    <PortalContext.Provider value={portal}>
      <nav className="lacx-jump" aria-label="Component categories">
        {JUMPS.map((j) => (
          <a key={j.href} href={j.href}>
            {j.label}
          </a>
        ))}
      </nav>

      <div className="lacx-theme" data-theme={state.theme} style={vars} ref={setPortal}>
        <ToastProvider container={portal} position="bottom-right" maxVisible={3}>
          <section className="lacx-sec" id="theme">
            <Reveal className="lacx-sec-head">
              <div className="eyebrow">Live theme</div>
              <h2>
                Change four variables, <span className="grad">change everything</span>
              </h2>
              <p>
                These knobs write <code>--lac-*</code> custom properties onto one container&apos;s
                inline style. Everything below it — including the dialogs, which are portalled into
                that same container — follows. No rebuild, no theme provider, no forked components.
              </p>
            </Reveal>
            <Reveal>
              <ThemeEditor state={state} set={set} css={css} />
            </Reveal>
          </section>

          <ActionsSection />
          <FormsSection />
          <AdvancedFormsSection />
          <OverlaysSection />
          <NavigationSection />
          <DataDisplaySection />
          <FeedbackSection />

          {/* ----------------------------------------------------------------
              Data-visualisation slot. @lacspace/charts, @lacspace/table and
              @lacspace/date are covered by ./gallery-dataviz, which renders
              inside this same themed container and so inherits the accent,
              radius and font chosen above.
              ---------------------------------------------------------------- */}
          <DataVizSections />

          <LayoutSection />
          <TypographySection />
        </ToastProvider>
      </div>
    </PortalContext.Provider>
  );
}
