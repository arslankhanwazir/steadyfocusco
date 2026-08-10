#!/usr/bin/env node

/**
 * SteadyFocusCo Pinterest Pin Generator
 *
 * Generates 1000×1500 PNG pins for guides, tools, and printables.
 * Reads content from src/data/site.ts and outputs to pins-out/.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

// ─── Configuration ───────────────────────────────────────────────────────────

const PIN_WIDTH = 1000;
const PIN_HEIGHT = 1500;
const OUTPUT_DIR = path.join(process.cwd(), "pins-out");

// Design system colors
const COLORS = {
  background: "#F6F1E8",
  ink: "#2A3439",
  accent: "#8FA88B",
  pop: "#D98E3F",
};

// ─── Variant Templates ───────────────────────────────────────────────────────
// Manual variants for better quality headlines

const VARIANT_TEMPLATES = {
  // Guides
  "how-to-brain-dump-when-overwhelmed": {
    a: "How to Brain Dump When You're Overwhelmed",
    b: "What's the Best Way to Brain Dump When Overwhelmed?",
    c: "A Simple Method to Clear Your Head When Overwhelmed",
  },
  "weekly-planning-with-adhd": {
    a: "Weekly Planning with ADHD (That Actually Sticks)",
    b: "Why Does Traditional Weekly Planning Fail ADHD Brains?",
    c: "Weekly Planning That Actually Works with ADHD",
  },
  "breaking-down-a-big-assignment": {
    a: "Breaking Down a Big Assignment",
    b: "How Do You Break Down an Impossible Assignment?",
    c: "Turn Big Assignments into Small, Doable Steps",
  },
  "why-traditional-planners-dont-work": {
    a: "Why Traditional Planners Don't Work for ADHD",
    b: "Why Do Standard Planners Get Abandoned by Week Two?",
    c: "Planners That Actually Work for ADHD Brains",
  },
  "adhd-morning-routine-ideas": {
    a: "ADHD Morning Routine Ideas",
    b: "What Are Realistic ADHD Morning Routine Ideas?",
    c: "Morning Routines That Actually Work for ADHD",
  },
  "how-to-stop-procrastinating-on-homework": {
    a: "How to Stop Procrastinating on Homework",
    b: "Why Do I Keep Procrastinating on Homework?",
    c: "Lower the Starting Cost of Any Assignment",
  },
  "executive-function-explained": {
    a: "Executive Function, Explained Simply",
    b: "What Is Executive Function and Why Does It Matter?",
    c: "Small Supports That Help with Executive Function",
  },
  // Tools
  "brain-dump": {
    a: "Brain Dump Tool",
    b: "How Do You Empty Your Head When It's Too Full?",
    c: "Get Everything Out of Your Head in Minutes",
  },
  "weekly-reset": {
    a: "Weekly Reset Tool",
    b: "How Do You Turn a Scattered Week into a Plan?",
    c: "Reset Your Week in Just a Few Minutes",
  },
  "morning-routine": {
    a: "Morning Routine Builder",
    b: "How Do You Build a Morning Routine You'll Actually Keep?",
    c: "Build a Realistic Morning Sequence That Sticks",
  },
  // Printables
  "adhd-brain-dump": {
    a: "ADHD Brain Dump Sheet",
    b: "What's the Best Way to Brain Dump on Paper?",
    c: "A Reusable Brain Dump Template That Works",
  },
  "weekly-reset-sheet": {
    a: "Weekly Reset Sheet",
    b: "How Do You Plan a Week Without Feeling Overwhelmed?",
    c: "A Gentle Weekly Planner That Keeps You on Track",
  },
  "homework-checklist": {
    a: "Homework / Assignment Checklist",
    b: "How Do You Break Down a Big Assignment?",
    c: "Turn Any Assignment into Small, Checkable Steps",
  },
  "morning-checklist": {
    a: "Morning Routine Checklist",
    b: "What's the Best Way to Remember Your Morning Routine?",
    c: "A Simple Checklist for Mornings That Work",
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SITE_DATA_PATH = path.join(ROOT, "src", "data", "site.ts");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function truncateText(text, maxLen) {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen - 3).trim() + "...";
}

function wrapText(text, maxWidth, fontSize) {
  // Approximate character width for better wrapping
  const avgCharWidth = fontSize * 0.55;
  const maxCharsPerLine = Math.floor(maxWidth / avgCharWidth);

  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;

    if (testLine.length > maxCharsPerLine && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines.slice(0, 4); // Max 4 lines
}

// ─── SVG Generation ──────────────────────────────────────────────────────────

function createPinSVG(content, variant, category) {
  const { title, description, slug, clusters } = content;

  // Get variant headline from templates or fallback
  const templates = VARIANT_TEMPLATES[slug];
  let headline;
  if (templates && templates[variant]) {
    headline = templates[variant];
  } else {
    // Fallback to generic transformation
    switch (variant) {
      case "a":
        headline = title;
        break;
      case "b":
        headline = `What Are ${title.replace(/^(How to|A|The)/i, "").trim()}?`;
        break;
      case "c":
        headline = `A Simple Way to ${description.split(".")[0].toLowerCase()}`;
        break;
    }
  }

  // Truncate headline if too long
  headline = truncateText(headline, 80);

  // Wrap headline into 2-4 lines
  const headlineLines = wrapText(headline, 800, 52);

  // Truncate description
  const shortDesc = truncateText(description, 150);

  // Wrap description
  const descLines = wrapText(shortDesc, 800, 22);

  // Calculate positions
  const eyebrowY = 100;
  const scatterY = 180;
  const headlineStartY = 280;
  const lineHeight = 64;
  const descY = headlineStartY + headlineLines.length * lineHeight + 50;
  const underlineY = headlineStartY + headlineLines.length * lineHeight + 10;

  // Build scatter motif (7 scattered dots)
  const scatterElements = [];
  for (let i = 0; i < 7; i++) {
    const x = 150 + i * 120 + (Math.random() - 0.5) * 30;
    const y = scatterY + (Math.random() - 0.5) * 25;
    scatterElements.push(
      `<circle cx="${x}" cy="${y}" r="5" fill="${COLORS.accent}" opacity="0.5"/>`,
    );
  }

  // Calculate underline width based on headline width
  const headlineWidth = Math.max(
    ...headlineLines.map((line) => line.length * 26),
  );
  const underlineWidth = Math.min(headlineWidth, 600);

  // Build headline text lines
  const headlineElements = headlineLines
    .map(
      (line, i) =>
        `<text x="100" y="${headlineStartY + i * lineHeight}" font-family="Georgia, 'Times New Roman', serif" font-size="52" font-weight="bold" fill="${COLORS.ink}">${line}</text>`,
    )
    .join("\n    ");

  // Build description text lines
  const descElements = descLines
    .map(
      (line, i) =>
        `<text x="100" y="${descY + i * 32}" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" font-size="22" fill="${COLORS.ink}" opacity="0.75">${line}</text>`,
    )
    .join("\n    ");

  // Bottom decorative element - larger scatter motif
  const bottomScatterY = PIN_HEIGHT - 200;
  const bottomScatter = [];
  for (let i = 0; i < 5; i++) {
    const x = 200 + i * 150 + (Math.random() - 0.5) * 40;
    const y = bottomScatterY + (Math.random() - 0.5) * 30;
    bottomScatter.push(
      `<circle cx="${x}" cy="${y}" r="6" fill="${COLORS.accent}" opacity="0.3"/>`,
    );
  }

  // Construct SVG
  const svg = `<svg width="${PIN_WIDTH}" height="${PIN_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="${PIN_WIDTH}" height="${PIN_HEIGHT}" fill="${COLORS.background}"/>
  
  <!-- Eyebrow - show cluster/category -->
  <text x="100" y="${eyebrowY}" font-family="system-ui, sans-serif" font-size="18" font-weight="700" fill="${COLORS.accent}" letter-spacing="0.15em">${category.toUpperCase()}</text>
  
  <!-- Top scatter motif -->
  ${scatterElements.join("\n  ")}
  
  <!-- Clean underline beneath headline -->
  <line x1="100" y1="${underlineY}" x2="${100 + underlineWidth}" y2="${underlineY}" stroke="${COLORS.pop}" stroke-width="4" stroke-linecap="round"/>
  
  <!-- Headline -->
  ${headlineElements}
  
  <!-- Description -->
  ${descElements}
  
  <!-- Bottom scatter motif (decorative) -->
  ${bottomScatter.join("\n  ")}
  
  <!-- Bottom brand lockup -->
  <text x="100" y="${PIN_HEIGHT - 80}" font-family="system-ui, sans-serif" font-size="16" font-weight="600" fill="${COLORS.ink}" opacity="0.5">steadyfocusco.com</text>
</svg>`;

  return svg;
}

// ─── Data Loading ─────────────────────────────────────────────────────────────

async function loadSiteData() {
  // Read the site.ts file as text
  const content = fs.readFileSync(SITE_DATA_PATH, "utf-8");

  // Extract data using regex (simple parsing without executing the file)
  const guidesMatch = content.match(
    /export const guides: Guide\[\] = (\[[\s\S]*?\]);/,
  );
  const toolsMatch = content.match(
    /export const tools: Tool\[\] = (\[[\s\S]*?\]);/,
  );
  const printablesMatch = content.match(
    /export const printables: Printable\[\] = (\[[\s\S]*?\]);/,
  );

  if (!guidesMatch || !toolsMatch || !printablesMatch) {
    throw new Error("Could not parse site.ts data");
  }

  // Parse JSON-like data (simplified - assumes valid structure)
  const guides = eval(guidesMatch[1]);
  const tools = eval(toolsMatch[1]);
  const printables = eval(printablesMatch[1]);

  return { guides, tools, printables };
}

// ─── Pin Generation ───────────────────────────────────────────────────────────

async function generatePin(content, type, variant) {
  // Get primary cluster for category label
  const clusters = content.clusters || [];
  const category = clusters.length > 0 ? clusters[0].toUpperCase() : "CONTENT";

  const slug = content.slug;
  const filename = `${type}-${slug}-${variant}.png`;
  const filepath = path.join(OUTPUT_DIR, filename);

  // Generate SVG
  const svg = createPinSVG(content, variant, category);

  // Convert SVG to PNG using sharp
  const pngBuffer = await sharp(Buffer.from(svg))
    .png()
    .resize(PIN_WIDTH, PIN_HEIGHT)
    .toBuffer();

  // Write file
  fs.writeFileSync(filepath, pngBuffer);

  return {
    filename,
    filepath,
    size: pngBuffer.length,
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("\nSteadyFocusCo Pinterest Generator\n");
  console.log("=".repeat(50));

  try {
    // Load data
    const { guides, tools, printables } = await loadSiteData();

    // Print summary
    console.log(`\nGuides: ${guides.length}`);
    console.log(`Tools: ${tools.length}`);
    console.log(`Printables: ${printables.length}`);
    console.log(
      `Total content items: ${guides.length + tools.length + printables.length}`,
    );
    console.log(`Variants per item: 3`);
    console.log(
      `Total pins: ${(guides.length + tools.length + printables.length) * 3}`,
    );

    // Ensure output directory exists
    ensureDir(OUTPUT_DIR);

    // Track results
    let generated = 0;
    let failed = 0;
    const failures = [];

    // Generate pins for guides
    console.log(`\nGenerating guide pins...`);
    for (const guide of guides) {
      if (!guide.title || !guide.description || !guide.slug) {
        console.log(`WARNING: Skipping guide - missing required data`);
        failed++;
        failures.push({ item: guide.slug, reason: "missing required data" });
        continue;
      }

      for (const variant of ["a", "b", "c"]) {
        try {
          await generatePin(guide, "guide", variant);
          generated++;
        } catch (err) {
          console.log(
            `ERROR: Failed to generate pin for ${guide.slug}-${variant}: ${err.message}`,
          );
          failed++;
          failures.push({
            item: `${guide.slug}-${variant}`,
            reason: err.message,
          });
        }
      }
    }

    // Generate pins for tools (only live tools)
    console.log(`Generating tool pins...`);
    for (const tool of tools.filter((t) => t.status === "live")) {
      if (!tool.name || !tool.tagline || !tool.slug) {
        console.log(
          `WARNING: Skipping tool ${tool.slug} - missing required data`,
        );
        failed++;
        failures.push({ item: tool.slug, reason: "missing required data" });
        continue;
      }

      const toolContent = {
        slug: tool.slug,
        title: tool.name,
        description: tool.tagline,
        clusters: tool.clusters,
      };

      for (const variant of ["a", "b", "c"]) {
        try {
          await generatePin(toolContent, "tool", variant);
          generated++;
        } catch (err) {
          console.log(
            `ERROR: Failed to generate pin for ${tool.slug}-${variant}: ${err.message}`,
          );
          failed++;
          failures.push({
            item: `${tool.slug}-${variant}`,
            reason: err.message,
          });
        }
      }
    }

    // Generate pins for printables
    console.log(`Generating printable pins...`);
    for (const printable of printables) {
      if (!printable.title || !printable.description || !printable.slug) {
        console.log(
          `WARNING: Skipping printable ${printable.slug} - missing required data`,
        );
        failed++;
        failures.push({
          item: printable.slug,
          reason: "missing required data",
        });
        continue;
      }

      for (const variant of ["a", "b", "c"]) {
        try {
          await generatePin(printable, "printable", variant);
          generated++;
        } catch (err) {
          console.log(
            `ERROR: Failed to generate pin for ${printable.slug}-${variant}: ${err.message}`,
          );
          failed++;
          failures.push({
            item: `${printable.slug}-${variant}`,
            reason: err.message,
          });
        }
      }
    }

    // Print results
    console.log(`\n${"=".repeat(50)}`);
    console.log(`Generated: ${generated}`);
    console.log(`Failed: ${failed}`);
    console.log(`Output: ${OUTPUT_DIR}`);

    if (failures.length > 0) {
      console.log(`\nFailures:`);
      for (const failure of failures) {
        console.log(`  - ${failure.item}: ${failure.reason}`);
      }
    }

    console.log("");
  } catch (err) {
    console.error(`FATAL: ${err.message}`);
    process.exit(1);
  }
}

// Run
main();
