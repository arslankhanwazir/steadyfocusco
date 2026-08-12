# Workspace Memory
This file is maintained automatically by Code Janitor so Claude, Codex, Bob, and any other AI agent can reuse repo context without rescanning everything from scratch.
Generated: 2026-08-12T22:07:57.949Z
Workspace: website
Workspace root: f:\etsy\website
Refresh reason: tracked-change
Output path: graphify-out/WORKSPACE_MEMORY.md
Shared mirror: workspacememory.md
Structured manifest: workspace.json
## Handoff Guidance
- Read `graphify-out/GRAPH_REPORT.md` first when the request is about architecture, dependencies, file ownership, or codebase navigation.
- Use this memory file and the workspace-root `workspacememory.md` mirror for recent activity, hot files, Git-aware status, and GitHub-enriched project context.
- Use the workspace-root `workspace.json` file when an AI agent wants machine-readable repo metadata, file inventory, package details, and Git/Graphify summaries without rescanning the repository.
- Refresh this file with the `Code Janitor: Refresh Workspace Memory` command after significant edits or branch changes.
## Repository Blueprint
- Audience: any AI agent working in this repository can treat this file as the current handoff ledger.
- Graphify report: not available yet
- Graphify graph: not available yet
- Last activity: 2026-08-12T22:07:53.980Z
## Workspace Focus
- Active file in focus: src/pages/tools/weekly-reset.astro
- Hottest files right now: src/pages/printables/[slug].astro (10), src/pages/guides/[slug].astro (7), src/data/schema.ts (4), src/pages/tools/brain-dump.astro (4)
- Suggested starting points: src/pages/tools/weekly-reset.astro, src/pages/printables/[slug].astro, src/pages/guides/[slug].astro, src/data/schema.ts, src/pages/tools/brain-dump.astro, src/pages/tools/morning-routine.astro
## Current Workspace
- Active file: src/pages/tools/weekly-reset.astro
- Tracked files in snapshot: 117
- Top-level areas: pins-out (42), src (26), public (21), [root] (17), .astro (4), scripts (3), .github (2), bbb (2)
- Primary file types: .png (57), .astro (18), .json (6), .patch (5), .ts (5), .md (4), .mjs (3), .tsx (3)
- Key files: .gitignore, AGENTS.md, README.md, package-lock.json, package.json, tsconfig.json
## Package Snapshot
- Package: steadyfocusco v0.0.1
- Package manager: not declared
- Scripts: dev, sync:etsy, prebuild, build, preview, astro, pins
- Runtime dependencies: @astrojs/react, @astrojs/sitemap, @types/react, @types/react-dom, astro, jspdf, react, react-dom, sharp, three
- Dev dependencies: @types/three
## Current Stack
- Logged change events: 40
- Change mix: save (40)
- Remembered file snapshots: 43
- Working tree summary: 7 modifieds, 1 added, 5 conflicteds
## Tracked Snapshots
- src/pages/tools/weekly-reset.astro | 156 lines | 7279 chars | hash c9480ba5a463
  Last snapshot: 2026-08-12T22:07:53.980Z
  Preview: "--- / import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import WeeklyReset from "../../components/WeeklyReset.tsx"; / import { webApplicationSchema, breadcrumbS..."
- src/pages/tools/brain-dump.astro | 228 lines | 7612 chars | hash 651f317933f3
  Last snapshot: 2026-08-12T22:07:14.821Z
  Preview: "--- / import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import BrainDump from "../../components/BrainDump.tsx"; / import { webApplicationSchema, breadcrumbSchem..."
- src/pages/printables/[slug].astro | 163 lines | 8405 chars | hash a0f968e851c3
  Last snapshot: 2026-08-12T22:03:27.682Z
  Preview: "--- / import Base from "../../layouts/Base.astro"; / import { printables, toolBySlug, etsyLink, guides } from "../../data/site"; / import type { Printable } from "../../data/site"; / import { productSchema } from "../..."
- src/pages/guides/[slug].astro | 322 lines | 16517 chars | hash d9003c8acabe
  Last snapshot: 2026-08-12T22:00:46.502Z
  Preview: "--- / import Base from "../../layouts/Base.astro"; / import { / guides, / etsyLink, / toolBySlug, / toolsForCluster, / } from "../../data/site"; / import { articleSchema, breadcrumbSchema } from "../../data/schema"; /..."
- src/data/schema.ts | 214 lines | 6816 chars | hash 1e035880ee17
  Last snapshot: 2026-08-12T21:57:00.347Z
  Preview: "// Centralized JSON-LD schema builders for SteadyFocusCo. / // / // Every builder returns schema.org objects which can be joined into a / // connected graph via stable @id references, so the brand, website, pages, / /..."
- README.md | 107 lines | 4959 chars | hash e98430f31df4
  Last snapshot: 2026-08-12T21:25:04.322Z
  Preview: "# SteadyFocusCo / ADHD-friendly planners, printable productivity resources, and free tools designed to reduce overwhelm and make planning easier. / SteadyFocusCo is a digital planning and productivity resource for peo..."
- src/pages/404.astro | 103 lines | 2739 chars | hash ef263a85b9bf
  Last snapshot: 2026-08-12T21:24:27.314Z
  Preview: "--- / import Base from "../layouts/Base.astro"; / // 404 page — intentionally noindex so it never appears in search results. / --- / <Base / title="Page not found" / description="The page you're looking for couldn't b..."
- src/pages/tools/morning-routine.astro | 145 lines | 6773 chars | hash 54939ef28442
  Last snapshot: 2026-08-12T21:23:57.135Z
  Preview: "--- / import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import MorningRoutine from "../../components/MorningRoutine.tsx"; / import { webApplicationSchema, bread..."

## Recent Changes
### 2026-08-12T22:07:53.980Z | saved | src/pages/tools/weekly-reset.astro
- Summary: Line 22: replaced 143 lines with 135 lines.
- Before: 164 lines | 7,442 chars | hash a023f7ae7d4d | preview: "--- / import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import WeeklyReset from "../../components/WeeklyReset.tsx"; / import { webApplicationSchema, breadcrumbS..."
- After: 156 lines | 7,279 chars | hash c9480ba5a463 | preview: "--- / import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import WeeklyReset from "../../components/WeeklyReset.tsx"; / import { webApplicationSchema, breadcrumbS..."
- Previous fragment: "<<<<<<< HEAD / ======= / const toolBreadcrumb = breadcrumbSchema(siteBase, [ / { name: "Home", path: "/" }, / { name: "Tools", path: "/tools" }, / { name: "Weekly Reset", path:..."
- Current fragment: "const toolBreadcrumb = breadcrumbSchema(siteBase, [ / { name: "Home", path: "/" }, / { name: "Tools", path: "/tools" }, / { name: "Weekly Reset", path: "/tools/weekly-reset" },..."

### 2026-08-12T22:07:14.821Z | saved | src/pages/tools/brain-dump.astro
- Summary: Line 22: replaced 215 lines with 207 lines.
- Before: 236 lines | 7,775 chars | hash 002855d717cc | preview: "--- / import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import BrainDump from "../../components/BrainDump.tsx"; / import { webApplicationSchema, breadcrumbSchem..."
- After: 228 lines | 7,612 chars | hash 651f317933f3 | preview: "--- / import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import BrainDump from "../../components/BrainDump.tsx"; / import { webApplicationSchema, breadcrumbSchem..."
- Previous fragment: "<<<<<<< HEAD / ======= / const toolBreadcrumb = breadcrumbSchema(siteBase, [ / { name: "Home", path: "/" }, / { name: "Tools", path: "/tools" }, / { name: "Brain Dump", path: "/..."
- Current fragment: "const toolBreadcrumb = breadcrumbSchema(siteBase, [ / { name: "Home", path: "/" }, / { name: "Tools", path: "/tools" }, / { name: "Brain Dump", path: "/tools/brain-dump" }, / ])..."

### 2026-08-12T22:03:27.682Z | saved | src/pages/printables/[slug].astro
- Summary: Line 74: replaced 171 lines with 90 lines.
- Before: 244 lines | 13,949 chars | hash a08dff3feb03 | preview: "--- / import Base from "../../layouts/Base.astro"; / import { printables, toolBySlug, etsyLink, guides } from "../../data/site"; / import type { Printable } from "../../data/site"; / import { productSchema } from "../..."
- After: 163 lines | 8,405 chars | hash a0f968e851c3 | preview: "--- / import Base from "../../layouts/Base.astro"; / import { printables, toolBySlug, etsyLink, guides } from "../../data/site"; / import type { Printable } from "../../data/site"; / import { productSchema } from "../..."
- Previous fragment: "--- / const content = printableContent[printable.slug] ?? null; / const relatedGuides = guides.filter((g) => / g.clusters.some((c) => printable.clusters.includes(c)), / ); / ---..."
- Current fragment: "const content = printableContent[printable.slug] ?? null; / const relatedGuides = guides.filter((g) => / g.clusters.some((c) => printable.clusters.includes(c)), / ); / --- / <Ba..."

### 2026-08-12T22:02:53.982Z | saved | src/pages/printables/[slug].astro
- Summary: Line 124: replaced 4 lines with 79 lines.
- Before: 169 lines | 8,497 chars | hash 8613d894a72b | preview: "--- / import Base from "../../layouts/Base.astro"; / import { printables, toolBySlug, etsyLink, guides } from "../../data/site"; / import type { Printable } from "../../data/site"; / import { productSchema } from "../..."
- After: 244 lines | 13,949 chars | hash a08dff3feb03 | preview: "--- / import Base from "../../layouts/Base.astro"; / import { printables, toolBySlug, etsyLink, guides } from "../../data/site"; / import type { Printable } from "../../data/site"; / import { productSchema } from "../..."
- Previous fragment: "</article> / <<<<<<< HEAD / </Bas"
- Current fragment: "{ / relatedGuides.length > 0 && ( / <aside class="related"> / <h2>Related guides</h2> / <div class="related-grid"> / {relatedGuides.map((g) => ( / <a class="rel-card" href={`/gu..."

### 2026-08-12T22:00:46.502Z | saved | src/pages/guides/[slug].astro
- Summary: Line 29: replaced 334 lines with 294 lines.
- Before: 362 lines | 17,860 chars | hash d3ba65364e8a | preview: "--- / import Base from "../../layouts/Base.astro"; / import { / guides, / etsyLink, / toolBySlug, / toolsForCluster, / } from "../../data/site"; / import { articleSchema, breadcrumbSchema } from "../../data/schema"; /..."
- After: 322 lines | 16,517 chars | hash d9003c8acabe | preview: "--- / import Base from "../../layouts/Base.astro"; / import { / guides, / etsyLink, / toolBySlug, / toolsForCluster, / } from "../../data/site"; / import { articleSchema, breadcrumbSchema } from "../../data/schema"; /..."
- Previous fragment: "`You can do a brain dump on paper, or use the free SteadyFocusCo brain dump tool. It takes the thoughts you type and automatically sorts them into Do Now, Deadline, Quick Task,..."
- Current fragment: ""You can do a brain dump on paper, or use the free SteadyFocusCo brain dump tool. It takes the thoughts you type and automatically sorts them into Do Now, Deadline, Quick Task,..."

### 2026-08-12T21:58:11.422Z | saved | src/pages/guides/[slug].astro
- Summary: Line 231: replaced 2 lines with 34 lines.
- Before: 330 lines | 16,676 chars | hash 3af1a83fd16a | preview: "--- / import Base from "../../layouts/Base.astro"; / import { / guides, / etsyLink, / toolBySlug, / toolsForCluster, / } from "../../data/site"; / import { articleSchema, breadcrumbSchema } from "../../data/schema"; /..."
- After: 362 lines | 17,860 chars | hash d3ba65364e8a | preview: "--- / import Base from "../../layouts/Base.astro"; / import { / guides, / etsyLink, / toolBySlug, / toolsForCluster, / } from "../../data/site"; / import { articleSchema, breadcrumbSchema } from "../../data/schema"; /..."
- Previous fragment: "<<<<<<< HEAD / ---"
- Current fragment: "const content = guideContent[guide.slug] ?? { sections: [] }; / // Related guides from the same cluster(s), excluding the current one. / const relatedGuides = guides / .filter((..."

### 2026-08-12T21:57:00.347Z | saved | src/data/schema.ts
- Summary: Line 26: replaced 23 lines with 12 lines.
- Before: 225 lines | 7,179 chars | hash 5a0c13c69efe | preview: "// Centralized JSON-LD schema builders for SteadyFocusCo. / // / // Every builder returns schema.org objects which can be joined into a / // connected graph via stable @id references, so the brand, website, pages, / /..."
- After: 214 lines | 6,816 chars | hash 1e035880ee17 | preview: "// Centralized JSON-LD schema builders for SteadyFocusCo. / // / // Every builder returns schema.org objects which can be joined into a / // connected graph via stable @id references, so the brand, website, pages, / /..."
- Previous fragment: "// Official Etsy shop — a real, owned property of the brand. / sameAs: ["https://steadyfocusco.etsy.com"], / >>>>>>> 2c17bad (Complete SEO and GEO optimization) / }; / } / /** T..."
- Current fragment: "/** The brand — the shared root of the schema graph. */ / export function organizationSchema(base: string) { / return { / "@context": "https://schema.org", / "@type": "Organizat..."

### 2026-08-12T21:54:44.108Z | saved | src/data/schema.ts
- Summary: Line 26: replaced 17 lines with 19 lines.
- Before: 223 lines | 7,173 chars | hash 959355333fc7 | preview: "// Centralized JSON-LD schema builders for SteadyFocusCo. / // / // Every builder returns schema.org objects which can be joined into a / // connected graph via stable @id references, so the brand, website, pages, / /..."
- After: 225 lines | 7,179 chars | hash 5a0c13c69efe | preview: "// Centralized JSON-LD schema builders for SteadyFocusCo. / // / // Every builder returns schema.org objects which can be joined into a / // connected graph via stable @id references, so the brand, website, pages, / /..."
- Previous fragment: "/** The brand — the shared root of the schema graph. */ / export function organizationSchema(base: string) { / return { / "@context": "https://schema.org", / "@type": "Organizat..."
- Current fragment: "// Official Etsy shop — a real, owned property of the brand. / sameAs: ["https://steadyfocusco.etsy.com"], / >>>>>>> 2c17bad (Complete SEO and GEO optimization) / }; / } / /** T..."

### 2026-08-12T21:53:41.150Z | saved | src/data/schema.ts
- Summary: Line 35: replaced 3 lines with 8 lines.
- Before: 218 lines | 6,941 chars | hash 2a96896fdbb5 | preview: "// Centralized JSON-LD schema builders for SteadyFocusCo. / // / // Every builder returns schema.org objects which can be joined into a / // connected graph via stable @id references, so the brand, website, pages, / /..."
- After: 223 lines | 7,173 chars | hash 959355333fc7 | preview: "// Centralized JSON-LD schema builders for SteadyFocusCo. / // / // Every builder returns schema.org objects which can be joined into a / // connected graph via stable @id references, so the brand, website, pages, / /..."
- Previous fragment: "description: SITE_DESCRIPTION, / <<<<<<< HEAD / sameAs: [ETSY_SHOP_URL],"
- Current fragment: "// Official Etsy shop — a real, owned property of the brand. / sameAs: ["https://steadyfocusco.etsy.com"], / >>>>>>> 2c17bad (Complete SEO and GEO optimization) / }; / descripti..."

### 2026-08-12T21:46:24.757Z | saved | src/pages/guides/[slug].astro
- Summary: Line 7: removed 2 lines.
- Before: 324 lines | 16,540 chars | hash 4a584f76dd75 | preview: "--- / import Base from "../../layouts/Base.astro"; / import { / guides, / etsyLink, / toolBySlug, / guidesForCluster, / toolsForCluster, / } from "../../data/site"; / import { articleSchema, breadcrumbSchema } from "...."
- After: 323 lines | 16,519 chars | hash a7d4b33ff643 | preview: "--- / import Base from "../../layouts/Base.astro"; / import { / guides, / etsyLink, / toolBySlug, / toolsForCluster, / } from "../../data/site"; / import { articleSchema, breadcrumbSchema } from "../../data/schema"; /..."
- Previous fragment: "guidesForCluster,"

### 2026-08-12T21:40:01.917Z | saved | src/pages/printables/[slug].astro
- Summary: Line 7: replaced 1 line with 7 lines.
- Before: 157 lines | 8,275 chars | hash d75e6acef01e | preview: "--- / import Base from "../../layouts/Base.astro"; / import { printables, toolBySlug, etsyLink, guides } from "../../data/site"; / import type { Printable } from "../../data/site"; / import { productSchema } from "../..."
- After: 163 lines | 8,405 chars | hash a0f968e851c3 | preview: "--- / import Base from "../../layouts/Base.astro"; / import { printables, toolBySlug, etsyLink, guides } from "../../data/site"; / import type { Printable } from "../../data/site"; / import { productSchema } from "../..."
- Previous fragment: "const printableContent"
- Current fragment: "interface PrintableContent { / whatItIs: string; / howToUse: string; / tips: string[]; / } / const printableContent: Record<string, PrintableContent>"

### 2026-08-12T21:29:20.796Z | saved | src/pages/printables/[slug].astro
- Summary: Line 7: replaced 268 lines with 151 lines.
- Before: 274 lines | 9,015 chars | hash f862b6a6ad3f | preview: "--- / import Base from "../../layouts/Base.astro"; / import { printables, toolBySlug, etsyLink, guides } from "../../data/site"; / import type { Printable } from "../../data/site"; / import { productSchema } from "../..."
- After: 157 lines | 8,275 chars | hash d75e6acef01e | preview: "--- / import Base from "../../layouts/Base.astro"; / import { printables, toolBySlug, etsyLink, guides } from "../../data/site"; / import type { Printable } from "../../data/site"; / import { productSchema } from "../..."
- Previous fragment: "// Per-printable editorial content — practical, useful, and grounded in what / // each sheet actually does. No invented claims. / const printableContent = { / "adhd-brain-dump":..."
- Current fragment: "const printableContent = { / "adhd-brain-dump": { / whatItIs: "The ADHD Brain Dump Sheet is a one-page, reusable template for getting scattered thoughts out of your head and ont..."

### 2026-08-12T21:27:12.365Z | saved | src/pages/printables/[slug].astro
- Summary: Line 9: removed 4 lines.
- Before: 277 lines | 9,096 chars | hash ccedb7f490e5 | preview: "--- / import Base from "../../layouts/Base.astro"; / import { printables, toolBySlug, etsyLink, guides } from "../../data/site"; / import type { Printable } from "../../data/site"; / import { productSchema } from "../..."
- After: 274 lines | 9,015 chars | hash f862b6a6ad3f | preview: "--- / import Base from "../../layouts/Base.astro"; / import { printables, toolBySlug, etsyLink, guides } from "../../data/site"; / import type { Printable } from "../../data/site"; / import { productSchema } from "../..."
- Previous fragment: ": Record< / string, / { whatItIs: string; howToUse: string; tips: string[] } / >"

### 2026-08-12T21:26:11.697Z | saved | src/pages/printables/[slug].astro
- Summary: Line 3: replaced 7 lines with 2 lines.
- Before: 282 lines | 9,078 chars | hash 9014bb483c58 | preview: "--- / import Base from "../../layouts/Base.astro"; / import { / printables, / toolBySlug, / etsyLink, / guides, / type Printable, / } from "../../data/site"; / import { productSchema } from "../../data/schema"; / // P..."
- After: 277 lines | 9,096 chars | hash ccedb7f490e5 | preview: "--- / import Base from "../../layouts/Base.astro"; / import { printables, toolBySlug, etsyLink, guides } from "../../data/site"; / import type { Printable } from "../../data/site"; / import { productSchema } from "../..."
- Previous fragment: "printables, / toolBySlug, / etsyLink, / guides, / type Printable,"
- Current fragment: "printables, toolBySlug, etsyLink, guides } from "../../data/site"; / import type { Printable"

### 2026-08-12T21:25:04.322Z | saved | README.md
- Summary: Line 3: replaced 70 lines with 104 lines.
- Before: 73 lines | 2,533 chars | hash 1efa80f3cdf0 | preview: "# SteadyFocusCo / A digital planning resource providing ADHD-friendly printable planners, free productivity tools, executive-function resources, student planning resources, and practical guides designed to reduce over..."
- After: 107 lines | 4,959 chars | hash e98430f31df4 | preview: "# SteadyFocusCo / ADHD-friendly planners, printable productivity resources, and free tools designed to reduce overwhelm and make planning easier. / SteadyFocusCo is a digital planning and productivity resource for peo..."
- Previous fragment: "digital planning resource providing ADHD-friendly printable planners, free productivity tools, executive-function resources, student planning resources, and practical guides des..."
- Current fragment: "DHD-friendly planners, printable productivity resources, and free tools designed to reduce overwhelm and make planning easier. / SteadyFocusCo is a digital planning and producti..."


## Hot Files
- src/pages/printables/[slug].astro (10 tracked changes)
- src/pages/guides/[slug].astro (7 tracked changes)
- src/data/schema.ts (4 tracked changes)
- src/pages/tools/brain-dump.astro (4 tracked changes)
- src/pages/tools/morning-routine.astro (4 tracked changes)
- src/pages/tools/weekly-reset.astro (4 tracked changes)
- README.md (3 tracked changes)
- src/layouts/Base.astro (2 tracked changes)

## Git Snapshot
- Branch: HEAD
- HEAD: 2026-08-12 142bd8f Add ETSY_SHOP_URL to organization schema
- Working tree summary: 7 modifieds, 1 added, 5 conflicteds
- M  README.md
- MM graphify-out/WORKSPACE_MEMORY.md
- M  src/data/products.json
- UU src/data/schema.ts
- M  src/layouts/Base.astro
- A  src/pages/404.astro
- UU src/pages/guides/[slug].astro
- UU src/pages/printables/[slug].astro
- UU src/pages/tools/brain-dump.astro
- M  src/pages/tools/morning-routine.astro
- UU src/pages/tools/weekly-reset.astro
- MM workspace.json
- Additional git status lines were omitted for brevity.

## GitHub Snapshot
GitHub Repository: arslankhanwazir/steadyfocusco
Visibility: public | Default branch: main
Stars: 0 | Forks: 0 | Open issues: 0

Latest commit on main:
- 142bd8f by arslankhanwazir on 2026-08-12
  Add ETSY_SHOP_URL to organization schema

URL: https://github.com/arslankhanwazir/steadyfocusco

## Graphify Snapshot
Graphify report not found. Generate Graphify output if you want architecture-aware memory excerpts here.

## Project Planner
- Project planner is not configured yet. Enable it in the chat panel to generate a time-based todo list and progress rescue briefs.

## Agent Notes
- If a future task asks what changed recently, start with `Recent Changes`, `Tracked Snapshots`, `Hot Files`, and `Git Snapshot`.
- If a future task asks how the project is organized, combine this file with `graphify-out/GRAPH_REPORT.md`.
- If a future task needs repository-level context, use `Package Snapshot`, the GitHub snapshot, and the Graphify snapshot before rescanning broad parts of the repo.
