import { useState } from "react";
import "./tools.css";
import { createWriter, today } from "./pdf";

// Etsy CTA — UTM: ?utm_source=site&utm_medium=tool&utm_campaign=morning-routine
const ETSY_CTA =
  "https://steadyfocusco.etsy.com?utm_source=site&utm_medium=tool&utm_campaign=morning-routine";

interface StepRule {
  order: number;
  dur: number; // minutes
  match: string[];
}

// Canonical morning order. Each user line is matched to the first rule whose
// keywords appear in it; unmatched steps keep their typed order at the end.
const RULES: StepRule[] = [
  { order: 1, dur: 0, match: ["wake", "alarm", "get up", "out of bed"] },
  { order: 2, dur: 2, match: ["water", "hydrate", "drink"] },
  { order: 3, dur: 5, match: ["bathroom", "toilet", "loo"] },
  { order: 4, dur: 10, match: ["shower", "bath"] },
  {
    order: 5,
    dur: 5,
    match: ["teeth", "brush", "skincare", "wash face", "face"],
  },
  { order: 6, dur: 5, match: ["dress", "clothes", "outfit", "get changed"] },
  {
    order: 7,
    dur: 1,
    match: ["meds", "medication", "vitamin", "pill", "adhd med"],
  },
  {
    order: 8,
    dur: 20,
    match: [
      "exercise",
      "workout",
      "gym",
      "run",
      "walk",
      "stretch",
      "yoga",
      "movement",
    ],
  },
  {
    order: 9,
    dur: 10,
    match: [
      "meditate",
      "breathe",
      "breath",
      "journal",
      "gratitude",
      "pray",
      "mindful",
    ],
  },
  {
    order: 10,
    dur: 15,
    match: ["breakfast", "eat", "coffee", "tea", "food", "smoothie", "cook"],
  },
  {
    order: 11,
    dur: 5,
    match: [
      "plan",
      "review",
      "calendar",
      "to-do",
      "todo",
      "brain dump",
      "priorit",
    ],
  },
  {
    order: 12,
    dur: 0,
    match: ["commute", "leave", "drive", "out the door", "work", "school"],
  },
];

const DEFAULT_ORDER = 50;
const DEFAULT_DUR = 10;

interface Step {
  label: string;
  start: number; // minutes from midnight
  dur: number;
}

const PLACEHOLDER = `wake up
drink water
take meds
shower
get dressed
10 min stretch
coffee + breakfast
plan my day
leave for work`;

function classify(label: string): { order: number; dur: number } {
  const t = label.toLowerCase();
  for (const rule of RULES) {
    if (rule.match.some((m) => t.includes(m))) {
      return { order: rule.order, dur: rule.dur };
    }
  }
  return { order: DEFAULT_ORDER, dur: DEFAULT_DUR };
}

// Pull an explicit duration out of a line like "10 min stretch" / "stretch 15m".
function explicitDuration(label: string): number | null {
  const m = label.match(/(\d{1,3})\s?(min|mins|minutes|m)\b/i);
  if (m) return parseInt(m[1], 10);
  return null;
}

function parseWake(input: string): number {
  const s = input.trim().toLowerCase();
  const m = s.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/);
  if (!m) return 7 * 60;
  let h = parseInt(m[1], 10);
  const min = m[2] ? parseInt(m[2], 10) : 0;
  const mer = m[3];
  if (mer === "pm" && h < 12) h += 12;
  if (mer === "am" && h === 12) h = 0;
  if (h > 23) h = 7;
  return h * 60 + min;
}

function fmt(minutes: number): string {
  const h24 = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  const mer = h24 >= 12 ? "PM" : "AM";
  let h = h24 % 12;
  if (h === 0) h = 12;
  return `${h}:${m.toString().padStart(2, "0")} ${mer}`;
}

/** Pure builder: text + wake time -> ordered, time-boxed steps. */
export function buildRoutine(text: string, wake: string): Step[] {
  const lines = text
    .split("\n")
    .map((l) => l.replace(/^[-*•\d.)\]\s]+/, "").trim())
    .filter(Boolean);

  const enriched = lines.map((label, i) => {
    const { order, dur } = classify(label);
    const explicit = explicitDuration(label);
    return { label, order, dur: explicit ?? dur, seq: i };
  });

  // Stable sort by canonical order, then original typing order.
  enriched.sort((a, b) => a.order - b.order || a.seq - b.seq);

  let cursor = parseWake(wake);
  return enriched.map((e) => {
    const step: Step = { label: e.label, start: cursor, dur: e.dur };
    cursor += e.dur;
    return step;
  });
}

export default function MorningRoutine() {
  const [text, setText] = useState("");
  const [wake, setWake] = useState("7:00");
  const [steps, setSteps] = useState<Step[] | null>(null);

  const handleBuild = () => setSteps(buildRoutine(text, wake));
  const handleClear = () => {
    setText("");
    setSteps(null);
  };

  const totalMin = steps ? steps.reduce((n, s) => n + s.dur, 0) : 0;
  const endTime = steps && steps.length ? fmt(steps[0].start + totalMin) : null;

  const handleDownload = async () => {
    if (!steps) return;
    const writer = await createWriter(
      "Morning Routine",
      `Built on ${today()} · starts ${fmt(parseWake(wake))}`,
    );
    for (const s of steps) {
      writer.line(
        `${fmt(s.start)}   ${s.label}${s.dur ? `   (${s.dur} min)` : ""}`,
      );
    }
    writer.space(8);
    writer.line(`Done by about ${endTime}.`, { muted: true });
    writer.save("morning-routine.pdf");
  };

  return (
    <div className="sf-tool">
      <label className="sf-field" htmlFor="mr-input">
        What do you want your morning to include?
      </label>
      <p className="sf-hint">
        List the steps in any order — one per line. You can add a time like “10
        min stretch”. We'll put them in a sensible order and stamp start times.
      </p>
      <textarea
        id="mr-input"
        className="sf-textarea"
        value={text}
        placeholder={PLACEHOLDER}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="sf-row">
        <label htmlFor="mr-wake" style={{ fontWeight: 700 }}>
          I wake up at
        </label>
        <input
          id="mr-wake"
          className="sf-input"
          type="text"
          inputMode="numeric"
          value={wake}
          size={6}
          onChange={(e) => setWake(e.target.value)}
        />
        <button
          className="sf-btn sf-btn-primary"
          onClick={handleBuild}
          disabled={text.trim().length === 0}
        >
          Build my routine
        </button>
        <button className="sf-btn" onClick={handleClear}>
          Clear
        </button>
      </div>

      {steps && (
        <div className="sf-results">
          <p className="sf-hint">
            {steps.length} steps · about {totalMin} minutes · done by{" "}
            <strong>{endTime}</strong>.
          </p>
          <ol className="sf-steps">
            {steps.map((s, i) => (
              <li className="sf-step" key={i}>
                <span className="sf-time">{fmt(s.start)}</span>
                <span className="sf-label">{s.label}</span>
                {s.dur > 0 && <span className="sf-dur">{s.dur} min</span>}
              </li>
            ))}
          </ol>

          <div className="sf-row">
            <button className="sf-btn sf-btn-dark" onClick={handleDownload}>
              ↓ Download routine as PDF
            </button>
          </div>

          <div className="sf-cta">
            <h3>Keep the routine where you'll see it</h3>
            <p>
              The ADHD Morning Routine Checklist is a printable, tick-as-you-go
              version — stick it on the mirror or fridge so the sequence isn't
              something you have to remember.
            </p>
            <a href={ETSY_CTA} target="_blank" rel="sponsored noopener">
              Get the morning checklist on Etsy ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
