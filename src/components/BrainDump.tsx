import { useState } from "react";
import "./tools.css";
import { createWriter, today } from "./pdf";
import { etsyLink } from "../data/site";

// Etsy CTA — UTM per spec: utm_source=site&utm_medium=tool&utm_campaign=brain-dump
const ETSY_CTA = etsyLink({ medium: "tool", campaign: "brain-dump" });

type Bucket = "now" | "deadline" | "quick" | "later" | "unsure";

interface Category {
  key: Bucket;
  label: string;
  blurb: string;
}

const CATEGORIES: Category[] = [
  { key: "now", label: "Do Now", blurb: "Urgent — start today" },
  { key: "deadline", label: "Deadline", blurb: "Has a date attached" },
  { key: "quick", label: "Quick Task", blurb: "2–5 minutes, just do it" },
  { key: "later", label: "Later", blurb: "Someday / not this week" },
  { key: "unsure", label: "Not Sure", blurb: "Needs a decision" },
];

const NOW = [
  "now",
  "asap",
  "urgent",
  "today",
  "tonight",
  "important",
  "critical",
  "emergency",
  "!!",
];
const DEADLINE = [
  "due",
  "deadline",
  "by ",
  "before ",
  "appointment",
  "appt",
  "meeting",
  "tomorrow",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
  "next week",
  "this week",
  "january",
  "february",
  "march",
  "april",
  "may ",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
const QUICK = [
  "email",
  "call",
  "text",
  "reply",
  "respond",
  "pay",
  "book",
  "buy",
  "send",
  "order",
  "renew",
  "schedule",
  "reschedule",
  "cancel",
  "confirm",
  "sign",
  "print",
];
const LATER = [
  "someday",
  "eventually",
  "maybe",
  "later",
  "sometime",
  "one day",
  "when i ",
  "research",
  "read ",
  "watch ",
  "learn ",
  "explore",
  "look into",
];

const has = (text: string, words: string[]) =>
  words.some((w) => text.includes(w));
// crude date pattern like 12/5, 3:30, 5pm
const hasDateish = (text: string) =>
  /\b\d{1,2}([:/]\d{1,2})\b/.test(text) || /\b\d{1,2}\s?(am|pm)\b/.test(text);

/** Pure, testable categoriser for a single line. */
export function categorize(rawLine: string): Bucket {
  const text = rawLine.toLowerCase().trim();
  if (!text) return "unsure";
  if (has(text, NOW)) return "now";
  if (has(text, DEADLINE) || hasDateish(text)) return "deadline";
  if (has(text, LATER)) return "later";
  const wordCount = text.split(/\s+/).length;
  if (has(text, QUICK) || wordCount <= 3) return "quick";
  return "unsure";
}

function parseLines(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.replace(/^[-*•\d.)\]\s]+/, "").trim())
    .filter((l) => l.length > 0);
}

type Sorted = Record<Bucket, string[]>;

const PLACEHOLDER = `things I need to do this week
email professor about the deadline
call dentist
laundry
finish history essay due friday
someday learn to cook
buy birthday gift
that thing I keep forgetting`;

export default function BrainDump() {
  const [text, setText] = useState("");
  const [sorted, setSorted] = useState<Sorted | null>(null);

  const handleSort = () => {
    const lines = parseLines(text);
    const result: Sorted = {
      now: [],
      deadline: [],
      quick: [],
      later: [],
      unsure: [],
    };
    for (const line of lines) result[categorize(line)].push(line);
    setSorted(result);
  };

  const handleClear = () => {
    setText("");
    setSorted(null);
  };

  const handleDownload = async () => {
    if (!sorted) return;
    const writer = await createWriter("Brain Dump", `Sorted on ${today()}`);
    for (const cat of CATEGORIES) {
      const items = sorted[cat.key];
      writer.heading(`${cat.label}  (${items.length})`);
      if (items.length === 0) {
        writer.line("— nothing here —", { muted: true });
      } else {
        for (const item of items) writer.line(item, { bullet: true });
      }
      writer.space(8);
    }
    writer.save("brain-dump.pdf");
  };

  const total = sorted
    ? Object.values(sorted).reduce((n, arr) => n + arr.length, 0)
    : 0;

  return (
    <div className="sf-tool">
      <label className="sf-field" htmlFor="bd-input">
        What's taking up space in your head?
      </label>
      <p className="sf-hint">
        Dump it all out — one thought per line. Don't organise it, that's this
        tool's job. Then hit “Sort it for me”.
      </p>
      <textarea
        id="bd-input"
        className="sf-textarea"
        value={text}
        placeholder={PLACEHOLDER}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="sf-row">
        <button
          className="sf-btn sf-btn-primary"
          onClick={handleSort}
          disabled={text.trim().length === 0}
        >
          Sort it for me
        </button>
        <button className="sf-btn" onClick={handleClear}>
          Clear
        </button>
      </div>

      {sorted && (
        <div className="sf-results">
          <p className="sf-hint">
            Sorted {total} {total === 1 ? "item" : "items"}. Nothing's lost —
            everything landed in a bucket.
          </p>
          <div className="sf-cols">
            {CATEGORIES.map((cat) => (
              <div className={`sf-col ${cat.key}`} key={cat.key}>
                <h3>{cat.label}</h3>
                <span className="sf-count">{cat.blurb}</span>
                {sorted[cat.key].length === 0 ? (
                  <p className="sf-empty">Nothing here.</p>
                ) : (
                  <ul>
                    {sorted[cat.key].map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="sf-row">
            <button className="sf-btn sf-btn-dark" onClick={handleDownload}>
              ↓ Download as PDF
            </button>
          </div>

          <div className="sf-cta">
            <h3>Want a reusable version you can print again and again?</h3>
            <p>
              The ADHD Brain Dump printable turns this exact flow into a
              one-page sheet you can fill in by hand any time your head's full.
            </p>
            <a
              href={ETSY_CTA}
              target="_blank"
              rel="sponsored noopener"
              data-analytics-event="etsy_click"
            >
              Get the printable on Etsy ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
