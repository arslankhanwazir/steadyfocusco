// Shared site data + helpers.
// Single source of truth for tools, guides, printables, products and the
// UTM-tagged Etsy linking rules. Pillar/guide/printable pages are generated
// from this file so the Product <-> Website map stays consistent.

export type Cluster = "adhd" | "students" | "productivity";

/** Canonical Etsy shop landing page (real shop, used for shop-level links). */
export const ETSY_SHOP_URL = "https://steadyfocusco.etsy.com";

export interface UtmOptions {
  /** utm_medium — where the click originates (tool, shop, guide, printable...). */
  medium: string;
  /** utm_campaign — the specific tool/page driving the click. */
  campaign: string;
  /** Destination. Defaults to the shop landing page. Pass a real listing URL when known. */
  url?: string;
}

/**
 * Build a UTM-tagged outbound Etsy link.
 * All money links keep utm_source=site and land on Etsy (never a local cart).
 */
export function etsyLink({
  medium,
  campaign,
  url = ETSY_SHOP_URL,
}: UtmOptions): string {
  const params = new URLSearchParams({
    utm_source: "site",
    utm_medium: medium,
    utm_campaign: campaign,
  });
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}${params.toString()}`;
}

export interface Tool {
  slug: string;
  name: string;
  tagline: string;
  clusters: Cluster[];
  /** utm_campaign used by this tool's Etsy CTA. */
  utmCampaign: string;
  /** Human label of the matching Etsy product(s). */
  relatedProduct: string;
  status: "live" | "planned";
}

export const tools: Tool[] = [
  {
    slug: "brain-dump",
    name: "Brain Dump",
    tagline:
      "Empty your head onto the page, then let it sort itself into what to do now, what has a deadline, and what can wait.",
    clusters: ["adhd", "productivity"],
    utmCampaign: "brain-dump",
    relatedProduct: "ADHD Brain Dump Printable",
    status: "live",
  },
  {
    slug: "weekly-reset",
    name: "Weekly Reset",
    tagline:
      "Turn a scattered week into one calm plan — sort everything into days and priorities in a couple of minutes.",
    clusters: ["productivity", "adhd"],
    utmCampaign: "weekly-reset",
    relatedProduct: "ADHD Weekly Planner for Adults",
    status: "live",
  },
  {
    slug: "morning-routine",
    name: "Morning Routine Builder",
    tagline:
      "Build a short, realistic morning sequence you'll actually keep — ordered and time-boxed for you.",
    clusters: ["adhd", "productivity"],
    utmCampaign: "morning-routine",
    relatedProduct: "ADHD Morning Routine Checklist",
    status: "live",
  },
  {
    slug: "homework-breakdown",
    name: "Homework Breakdown",
    tagline: "Break a big assignment into small, do-able steps.",
    clusters: ["students"],
    utmCampaign: "homework-breakdown",
    relatedProduct: "ADHD Student Planner Bundle",
    status: "planned",
  },
  {
    slug: "task-prioritizer",
    name: "Task Prioritizer",
    tagline: "Sort a messy to-do list by what actually matters first.",
    clusters: ["productivity"],
    utmCampaign: "task-prioritizer",
    relatedProduct: "Executive Function Planner",
    status: "planned",
  },
];

export interface Guide {
  slug: string;
  title: string;
  description: string;
  clusters: Cluster[];
  relatedTool?: string;
  relatedPrintable?: string;
  relatedProduct: string;
}

export const guides: Guide[] = [
  {
    slug: "how-to-brain-dump-when-overwhelmed",
    title: "How to brain dump when you're overwhelmed",
    description:
      "A simple, no-pressure way to get everything out of your head and turn the pile into a plan.",
    clusters: ["adhd", "productivity"],
    relatedTool: "brain-dump",
    relatedPrintable: "adhd-brain-dump",
    relatedProduct: "ADHD Brain Dump Printable",
  },
  {
    slug: "weekly-planning-with-adhd",
    title: "Weekly planning with ADHD (that actually sticks)",
    description:
      "Why traditional weekly planning fails ADHD brains, and a lighter reset routine that works with how you think.",
    clusters: ["adhd", "productivity"],
    relatedTool: "weekly-reset",
    relatedPrintable: "weekly-reset-sheet",
    relatedProduct: "ADHD Weekly Planner for Adults",
  },
  {
    slug: "breaking-down-a-big-assignment",
    title: "Breaking down a big assignment",
    description:
      "How to take an assignment that feels impossible and split it into steps small enough to start.",
    clusters: ["students"],
    relatedTool: "homework-breakdown",
    relatedPrintable: "homework-checklist",
    relatedProduct: "ADHD Homework Tracker Printable",
  },
  {
    slug: "why-traditional-planners-dont-work",
    title: "Why traditional planners don't work for ADHD",
    description:
      "The reasons standard planners get abandoned by week two — and what to look for instead.",
    clusters: ["adhd", "productivity"],
    relatedProduct: "ADHD Student Planner Bundle",
  },
  {
    slug: "adhd-morning-routine-ideas",
    title: "ADHD morning routine ideas",
    description:
      "Realistic morning routine building blocks you can mix into a sequence that fits your actual mornings.",
    clusters: ["adhd"],
    relatedTool: "morning-routine",
    relatedPrintable: "morning-checklist",
    relatedProduct: "ADHD Morning Routine Checklist",
  },
  {
    slug: "how-to-stop-procrastinating-on-homework",
    title: "How to stop procrastinating on homework",
    description:
      "Procrastination is usually overwhelm in disguise. Here's how to lower the starting cost of a task.",
    clusters: ["students"],
    relatedTool: "homework-breakdown",
    relatedProduct: "ADHD Study Planner PDF",
  },
  {
    slug: "executive-function-explained",
    title: "Executive function, explained simply",
    description:
      "What executive function actually is, why it makes planning hard, and small supports that help.",
    clusters: ["productivity", "adhd"],
    relatedProduct: "Executive Function Planner PDF",
  },
];

export interface Printable {
  slug: string;
  title: string;
  description: string;
  clusters: Cluster[];
  relatedTool?: string;
  relatedProduct: string;
}

export const printables: Printable[] = [
  {
    slug: "adhd-brain-dump",
    title: "ADHD Brain Dump Sheet",
    description:
      "A one-page, reusable brain dump template with sorting columns for Do Now, Deadlines, Quick, and Later.",
    clusters: ["adhd", "productivity"],
    relatedTool: "brain-dump",
    relatedProduct: "ADHD Brain Dump Printable",
  },
  {
    slug: "weekly-reset-sheet",
    title: "Weekly Reset Sheet",
    description:
      "A gentle one-page weekly planner: three priorities, a day-by-day grid, and a small wins box.",
    clusters: ["productivity", "adhd"],
    relatedTool: "weekly-reset",
    relatedProduct: "ADHD Weekly Planner for Adults",
  },
  {
    slug: "homework-checklist",
    title: "Homework / Assignment Checklist",
    description:
      "A step-by-step assignment checklist that breaks a big task into small, checkable pieces.",
    clusters: ["students"],
    relatedTool: "homework-breakdown",
    relatedProduct: "ADHD Homework Tracker Printable",
  },
  {
    slug: "morning-checklist",
    title: "Morning Routine Checklist",
    description:
      "A short, tick-as-you-go morning checklist you can fill in with your own steps.",
    clusters: ["adhd"],
    relatedTool: "morning-routine",
    relatedProduct: "ADHD Morning Routine Checklist",
  },
];

// Cluster metadata for the pillar pages.
export const clusterMeta: Record<
  Cluster,
  { title: string; blurb: string; intro: string }
> = {
  adhd: {
    title: "ADHD",
    blurb:
      "Planning, routines, and systems built around how an ADHD brain actually works — not against it.",
    intro:
      "Traditional productivity advice assumes a brain that starts tasks on command and remembers what it can't see. These tools and guides take the opposite approach: get it out of your head, make the next step obvious, and lower the cost of starting.",
  },
  students: {
    title: "Students",
    blurb:
      "Homework, study planning, and getting assignments done without the last-minute spiral.",
    intro:
      "Big assignments feel impossible because they're one giant undefined blob. The student tools and guides here focus on breaking work into small, startable steps and keeping track of what's due without living in a state of low-grade panic.",
  },
  productivity: {
    title: "Productivity",
    blurb:
      "Weekly planning, prioritising, and routines that don't rely on willpower you don't have.",
    intro:
      "Productivity here isn't about doing more — it's about reducing friction. Reset your week in a couple of minutes, decide what actually matters first, and build routines that run on autopilot instead of motivation.",
  },
};

export function toolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}
export function guidesForCluster(cluster: Cluster): Guide[] {
  return guides.filter((g) => g.clusters.includes(cluster));
}
export function toolsForCluster(cluster: Cluster): Tool[] {
  return tools.filter((t) => t.clusters.includes(cluster));
}
export function printablesForCluster(cluster: Cluster): Printable[] {
  return printables.filter((p) => p.clusters.includes(cluster));
}
