import { useState } from "react";
import "./tools.css";
import { createWriter, today } from "./pdf";

// Etsy CTA — UTM: ?utm_source=site&utm_medium=tool&utm_campaign=weekly-reset
const ETSY_CTA =
  "https://steadyfocusco.etsy.com?utm_source=site&utm_medium=tool&utm_campaign=weekly-reset";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;
type Day = (typeof DAYS)[number] | "Unscheduled";

const DAY_KEYWORDS: Record<string, (typeof DAYS)[number]> = {
  mon: "Monday",
  monday: "Monday",
  tue: "Tuesday",
  tues: "Tuesday",
  tuesday: "Tuesday",
  wed: "Wednesday",
  weds: "Wednesday",
  wednesday: "Wednesday",
  thu: "Thursday",
  thur: "Thursday",
  thurs: "Thursday",
  thursday: "Thursday",
  fri: "Friday",
  friday: "Friday",
  sat: "Saturday",
  saturday: "Saturday",
  sun: "Sunday",
  sunday: "Sunday",
};

const PRIORITY_WORDS = ["important", "must", "priority", "urgent", "critical"];

interface WeekPlan {
  priorities: string[];
  days: Record<Day, string[]>;
}

const PLACEHOLDER = `*finish quarterly report
grocery shop on saturday
call the bank
team meeting monday
important: book dentist
reply to Sam
gym x3
laundry sunday
plan next week`;

function detectDay(text: string): (typeof DAYS)[number] | null {
  const words = text.toLowerCase().split(/[^a-z]+/);
  for (const w of words) {
    if (DAY_KEYWORDS[w]) return DAY_KEYWORDS[w];
  }
  return null;
}

function isPriority(raw: string): boolean {
  const t = raw.toLowerCase();
  return (
    raw.trim().startsWith("*") ||
    raw.includes("!") ||
    PRIORITY_WORDS.some((w) => t.includes(w))
  );
}

function clean(raw: string): string {
  return raw
    .replace(/^[-*•\d.)\]\s]+/, "")
    .replace(/^important:?\s*/i, "")
    .replace(/^priority:?\s*/i, "")
    .replace(/!+/g, "")
    .trim();
}

/** Pure builder so the sorting logic is easy to reason about / test. */
export function buildWeek(text: string): WeekPlan {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const days: Record<Day, string[]> = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
    Unscheduled: [],
  };
  const priorities: string[] = [];
  const leftovers: string[] = [];

  for (const raw of lines) {
    const label = clean(raw);
    if (!label) continue;
    if (isPriority(raw) && priorities.length < 3) priorities.push(label);

    const day = detectDay(raw);
    if (day) days[day].push(label);
    else leftovers.push(label);
  }

  // Spread day-less tasks evenly across Mon–Fri so no single day is a wall.
  leftovers.forEach((task, i) => {
    days[DAYS[i % 5]].push(task);
  });

  return { priorities, days };
}

export default function WeeklyReset() {
  const [text, setText] = useState("");
  const [plan, setPlan] = useState<WeekPlan | null>(null);

  const handleBuild = () => setPlan(buildWeek(text));
  const handleClear = () => {
    setText("");
    setPlan(null);
  };

  const handleDownload = async () => {
    if (!plan) return;
    const writer = await createWriter("Weekly Reset", `Planned on ${today()}`);
    writer.heading("This week's top 3");
    if (plan.priorities.length === 0) {
      writer.line("(none marked — add * or “important” next time)", {
        muted: true,
      });
    } else {
      plan.priorities.forEach((p, i) => writer.line(`${i + 1}. ${p}`));
    }
    writer.space(10);

    (Object.keys(plan.days) as Day[]).forEach((day) => {
      const items = plan.days[day];
      if (day === "Unscheduled" && items.length === 0) return;
      writer.subheading(day);
      if (items.length === 0) writer.line("—", { muted: true });
      else for (const item of items) writer.line(item, { bullet: true });
      writer.space(4);
    });

    writer.save("weekly-reset.pdf");
  };

  return (
    <div className="sf-tool">
      <label className="sf-field" htmlFor="wr-input">
        What needs to happen this week?
      </label>
      <p className="sf-hint">
        One thing per line. Mark your big ones with <code>*</code> or the word
        “important”. Mention a day (e.g. “call bank Monday”) and it'll land
        there — everything else gets spread across the week.
      </p>
      <textarea
        id="wr-input"
        className="sf-textarea"
        value={text}
        placeholder={PLACEHOLDER}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="sf-row">
        <button
          className="sf-btn sf-btn-primary"
          onClick={handleBuild}
          disabled={text.trim().length === 0}
        >
          Build my week
        </button>
        <button className="sf-btn" onClick={handleClear}>
          Clear
        </button>
      </div>

      {plan && (
        <div className="sf-results">
          <div className="sf-priorities">
            <h3>This week's top 3</h3>
            {plan.priorities.length === 0 ? (
              <p className="sf-empty">
                Nothing marked as a priority yet — add <code>*</code> or
                “important” to a line and rebuild.
              </p>
            ) : (
              <ol>
                {plan.priorities.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ol>
            )}
          </div>

          <div className="sf-week">
            {(Object.keys(plan.days) as Day[]).map((day) => {
              if (day === "Unscheduled" && plan.days[day].length === 0)
                return null;
              return (
                <div className="sf-day" key={day}>
                  <h4>{day}</h4>
                  {plan.days[day].length === 0 ? (
                    <p className="sf-empty">Free</p>
                  ) : (
                    <ul>
                      {plan.days[day].map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>

          <div className="sf-row">
            <button className="sf-btn sf-btn-dark" onClick={handleDownload}>
              ↓ Download my week as PDF
            </button>
          </div>

          <div className="sf-cta">
            <h3>Reset every week without retyping it</h3>
            <p>
              The ADHD Weekly Planner gives you this same layout as a reusable
              printable — priorities up top, a calm day-by-day grid underneath.
            </p>
            <a href={ETSY_CTA} target="_blank" rel="sponsored noopener">
              Get the weekly planner on Etsy ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
