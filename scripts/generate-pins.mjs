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

function wrapText(text, maxWidth, fontSize, font) {
  // Simple word-based wrapping
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = testLine.length * fontSize * 0.5; // Approximate width

    if (testWidth > maxWidth && currentLine) {
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
  const { title, description, slug } = content;

  // Generate variant-specific headline
  let headline;
  switch (variant) {
    case "a":
      headline = title;
      break;
    case "b":
      // Question variant
      headline = `Why Is ${title.replace(/^(How to|A|The)/i, "").trim()}?`;
      break;
    case "c":
      // Benefit/outcome variant
      headline = `A Simple Way to ${description.split(".")[0].toLowerCase()}`;
      break;
  }

  // Truncate headline if too long
  headline = truncateText(headline, 60);

  // Wrap headline into 2-4 lines
  const headlineLines = wrapText(headline, 800, 56, "serif");

  // Truncate description
  const shortDesc = truncateText(description, 120);

  // Build scatter motif (5 scattered dots transitioning to line)
  const scatterY = 280;
  const scatterElements = [];
  for (let i = 0; i < 5; i++) {
    const x = 200 + i * 150 + (Math.random() - 0.5) * 40;
    const y = scatterY + (Math.random() - 0.5) * 20;
    scatterElements.push(
      `<circle cx="${x}" cy="${y}" r="4" fill="${COLORS.accent}" opacity="0.6"/>`,
    );
  }

  // Headline Y position
  const headlineStartY = 380;
  const lineHeight = 70;

  // Build headline text lines
  const headlineElements = headlineLines
    .map(
      (line, i) =>
        `<text x="100" y="${headlineStartY + i * lineHeight}" font-family="Georgia, serif" font-size="56" font-weight="bold" fill="${COLORS.ink}">${line}</text>`,
    )
    .join("\n    ");

  // Description Y position
  const descY = headlineStartY + headlineLines.length * lineHeight + 40;

  // Wrap description
  const descLines = wrapText(shortDesc, 800, 24, "sans-serif");

  const descElements = descLines
    .map(
      (line, i) =>
        `<text x="100" y="${descY + i * 36}" font-family="system-ui, sans-serif" font-size="24" fill="${COLORS.ink}" opacity="0.8">${line}</text>`,
    )
    .join("\n    ");

  // Construct SVG
  const svg = `<svg width="${PIN_WIDTH}" height="${PIN_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="${PIN_WIDTH}" height="${PIN_HEIGHT}" fill="${COLORS.background}"/>
  
  <!-- Eyebrow -->
  <text x="100" y="120" font-family="system-ui, sans-serif" font-size="20" font-weight="700" fill="${COLORS.accent}" letter-spacing="0.1em">${category.toUpperCase()}</text>
  
  <!-- Scatter motif -->
  ${scatterElements.join("\n  ")}
  
  <!-- Clean underline beneath headline -->
  <line x1="100" y1="${headlineStartY + headlineLines.length * lineHeight + 20}" x2="300" y2="${headlineStartY + headlineLines.length * lineHeight + 20}" stroke="${COLORS.pop}" stroke-width="3"/>
  
  <!-- Headline -->
  ${headlineElements}
  
  <!-- Description -->
  ${descElements}
  
  <!-- Bottom brand lockup -->
  <text x="100" y="${PIN_HEIGHT - 80}" font-family="system-ui, sans-serif" font-size="18" fill="${COLORS.ink}" opacity="0.6">steadyfocusco.com</text>
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
  const categoryMap = {
    guide: "Guide",
    tool: "Free Tool",
    printable: "Printable",
  };

  const category = categoryMap[type] || "Content";
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
