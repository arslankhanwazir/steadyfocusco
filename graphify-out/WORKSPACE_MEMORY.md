# Workspace Memory
This file is maintained automatically by Code Janitor so Claude, Codex, Bob, and any other AI agent can reuse repo context without rescanning everything from scratch.
Generated: 2026-08-12T15:25:33.051Z
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
- Last activity: 2026-08-12T15:25:26.377Z
## Workspace Focus
- Active file in focus: src/pages/tools/morning-routine.astro
- Hottest files right now: src/pages/tools/brain-dump.astro (8), src/pages/tools/morning-routine.astro (7), src/pages/tools/weekly-reset.astro (5), src/layouts/Base.astro (3)
- Suggested starting points: src/pages/tools/morning-routine.astro, src/pages/tools/brain-dump.astro, src/pages/tools/weekly-reset.astro, src/layouts/Base.astro, src/pages/guides/[slug].astro, src/pages/index.astro
## Current Workspace
- Active file: src/pages/tools/morning-routine.astro
- Tracked files in snapshot: 115
- Top-level areas: pins-out (42), src (25), public (20), [root] (17), .astro (4), scripts (3), .github (2), bbb (2)
- Primary file types: .png (57), .astro (17), .json (6), .patch (5), .ts (5), .md (4), .mjs (3), .tsx (3)
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
- Remembered file snapshots: 42
- Working tree summary: 10 modifieds, 4 untrackeds
## Tracked Snapshots
- src/pages/tools/morning-routine.astro | 26 lines | 974 chars | hash 3a6db8abe09d
  Last snapshot: 2026-08-12T15:25:26.377Z
  Preview: "--- / import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import MorningRoutine from "../../components/MorningRoutine.tsx"; / import { webApplicationSchema } from..."
- src/pages/printables/[slug].astro | 58 lines | 1559 chars | hash fb86d12fad62
  Last snapshot: 2026-08-12T15:19:34.118Z
  Preview: "--- / import Base from "../../layouts/Base.astro"; / import { / printables, / toolBySlug, / etsyLink, / type Printable, / } from "../../data/site"; / import { productSchema } from "../../data/schema"; / export functio..."
- src/pages/guides/[slug].astro | 63 lines | 1672 chars | hash d3aa0a4b24d0
  Last snapshot: 2026-08-12T15:07:32.237Z
  Preview: "--- / import Base from "../../layouts/Base.astro"; / import { guides, etsyLink } from "../../data/site"; / import { articleSchema, breadcrumbSchema } from "../../data/schema"; / export function getStaticPaths() { / re..."
- src/pages/tools/weekly-reset.astro | 31 lines | 1059 chars | hash 0344c29bfc9b
  Last snapshot: 2026-08-12T15:05:55.871Z
  Preview: "--- / import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import WeeklyReset from "../../components/WeeklyReset.tsx"; / import { webApplicationSchema } from "../...."
- src/pages/tools/brain-dump.astro | 31 lines | 1054 chars | hash 04d98716cc1a
  Last snapshot: 2026-08-12T15:05:38.238Z
  Preview: "--- / import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import BrainDump from "../../components/BrainDump.tsx"; / import { webApplicationSchema } from "../../da..."
- README.md | 73 lines | 2533 chars | hash 1efa80f3cdf0
  Last snapshot: 2026-08-12T14:56:01.402Z
  Preview: "# SteadyFocusCo / A digital planning resource providing ADHD-friendly printable planners, free productivity tools, executive-function resources, student planning resources, and practical guides designed to reduce over..."
- src/pages/about.astro | 169 lines | 6566 chars | hash 0a55425f2e2c
  Last snapshot: 2026-08-12T14:15:51.429Z
  Preview: "--- / import Base from "../layouts/Base.astro"; / import { webPageSchema, breadcrumbSchema } from "../data/schema"; / const siteBase = new URL("/", Astro.site).toString().replace(/\/$/, ""); / const pageSchemas = webP..."
- src/pages/index.astro | 1289 lines | 35968 chars | hash 54d32f52da0c
  Last snapshot: 2026-08-12T14:14:35.206Z
  Preview: "--- / import Base from '../layouts/Base.astro'; / import { etsyLink } from '../data/site'; / import { webPageSchema } from '../data/schema'; / const tools = [ / { name: "Brain Dump", desc: "Clear the noise.", href: "/..."

## Recent Changes
### 2026-08-12T15:25:26.377Z | saved | src/pages/tools/morning-routine.astro
- Summary: Line 5: replaced 19 lines with 21 lines.
- Before: 24 lines | 944 chars | hash f77b0479bbcf | preview: "--- / import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import MorningRoutine from "../../components/MorningRoutine.tsx"; / import { webApplicationSchema } from..."
- After: 26 lines | 974 chars | hash 3a6db8abe09d | preview: "--- / import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import MorningRoutine from "../../components/MorningRoutine.tsx"; / import { webApplicationSchema } from..."
- Previous fragment: "import { webApplicationSchema } from "../../data/schema"; / const siteBase = new URL("/", Astro.site).toString().replace(/\/$/, ""); / <Base / title="Morning Routine Builder" /..."
- Current fragment: "import { webApplicationSchema } from "../../data/schema"; / const siteBase = new URL("/", Astro.site).toString().replace(/\/$/, ""); / const toolSchema = webApplicationSchema(si..."

### 2026-08-12T15:19:34.118Z | saved | src/pages/printables/[slug].astro
- Summary: Line 29: replaced 4 lines with 1 line.
- Before: 61 lines | 1,670 chars | hash 1589d7c74b6c | preview: "--- / import Base from "../../layouts/Base.astro"; / import { / printables, / toolBySlug, / etsyLink, / type Printable, / } from "../../data/site"; / import { productSchema } from "../../data/schema"; / export functio..."
- After: 58 lines | 1,559 chars | hash fb86d12fad62 | preview: "--- / import Base from "../../layouts/Base.astro"; / import { / printables, / toolBySlug, / etsyLink, / type Printable, / } from "../../data/site"; / import { productSchema } from "../../data/schema"; / export functio..."
- Previous fragment: "image: printable.image ?? null, / offerUrl: shopHref, / price: printable.price ?? null, / currency: printable.currency ?? null"
- Current fragment: "offerUrl: shopHref"

### 2026-08-12T15:07:32.237Z | saved | src/pages/guides/[slug].astro
- Summary: Line 28: replaced 27 lines with 25 lines.
- Before: 65 lines | 1,786 chars | hash 179fff7e7daa | preview: "--- / import Base from "../../layouts/Base.astro"; / import { guides, etsyLink } from "../../data/site"; / import { articleSchema, breadcrumbSchema } from "../../data/schema"; / export function getStaticPaths() { / re..."
- After: 63 lines | 1,672 chars | hash d3aa0a4b24d0 | preview: "--- / import Base from "../../layouts/Base.astro"; / import { guides, etsyLink } from "../../data/site"; / import { articleSchema, breadcrumbSchema } from "../../data/schema"; / export function getStaticPaths() { / re..."
- Previous fragment: "datePublished: guide.publishedAt ?? undefined, / dateModified: guide.updatedAt ?? undefined, / }; / const breadcrumbData = { / path: `/guides/${guide.slug}`, / }; / const articl..."
- Current fragment: "}; / const breadcrumbData = { / path: `/guides/${guide.slug}`, / }; / const articleSchemaData = articleSchema(siteBase, articleData); / const breadcrumbSchemaData = breadcrumbSc..."

### 2026-08-12T15:06:44.504Z | saved | src/pages/guides/[slug].astro
- Summary: Line 1: replaced 62 lines with 64 lines.
- Before: 63 lines | 1,779 chars | hash 54699ff701ad | preview: "import Base from "../../layouts/Base.astro"; / import { guides, etsyLink } from "../../data/site"; / import { articleSchema, breadcrumbSchema } from "../../data/schema"; / export function getStaticPaths() { / return g..."
- After: 65 lines | 1,786 chars | hash 179fff7e7daa | preview: "--- / import Base from "../../layouts/Base.astro"; / import { guides, etsyLink } from "../../data/site"; / import { articleSchema, breadcrumbSchema } from "../../data/schema"; / export function getStaticPaths() { / re..."
- Previous fragment: "import Base from "../../layouts/Base.astro"; / import { guides, etsyLink } from "../../data/site"; / import { articleSchema, breadcrumbSchema } from "../../data/schema"; / expor..."
- Current fragment: "--- / import Base from "../../layouts/Base.astro"; / import { guides, etsyLink } from "../../data/site"; / import { articleSchema, breadcrumbSchema } from "../../data/schema"; /..."

### 2026-08-12T15:06:15.251Z | saved | src/pages/printables/[slug].astro
- Summary: Line 1: replaced 58 lines with 60 lines.
- Before: 59 lines | 1,663 chars | hash ea7914df64df | preview: "import Base from "../../layouts/Base.astro"; / import { / printables, / toolBySlug, / etsyLink, / type Printable, / } from "../../data/site"; / import { productSchema } from "../../data/schema"; / export function getS..."
- After: 61 lines | 1,670 chars | hash 1589d7c74b6c | preview: "--- / import Base from "../../layouts/Base.astro"; / import { / printables, / toolBySlug, / etsyLink, / type Printable, / } from "../../data/site"; / import { productSchema } from "../../data/schema"; / export functio..."
- Previous fragment: "import Base from "../../layouts/Base.astro"; / import { / printables, / toolBySlug, / etsyLink, / type Printable, / } from "../../data/site"; / import { productSchema } from "....."
- Current fragment: "--- / import Base from "../../layouts/Base.astro"; / import { / printables, / toolBySlug, / etsyLink, / type Printable, / } from "../../data/site"; / import { productSchema } fr..."

### 2026-08-12T15:05:55.871Z | saved | src/pages/tools/weekly-reset.astro
- Summary: Line 1: replaced 28 lines with 30 lines.
- Before: 29 lines | 1,052 chars | hash d3ac3721554b | preview: "import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import WeeklyReset from "../../components/WeeklyReset.tsx"; / import { webApplicationSchema } from "../../data..."
- After: 31 lines | 1,059 chars | hash 0344c29bfc9b | preview: "--- / import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import WeeklyReset from "../../components/WeeklyReset.tsx"; / import { webApplicationSchema } from "../...."
- Previous fragment: "import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import WeeklyReset from "../../components/WeeklyReset.tsx"; / import {..."
- Current fragment: "--- / import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import WeeklyReset from "../../components/WeeklyReset.tsx"; / im..."

### 2026-08-12T15:05:38.238Z | saved | src/pages/tools/brain-dump.astro
- Summary: Line 1: replaced 28 lines with 30 lines.
- Before: 29 lines | 1,047 chars | hash d6f70a618218 | preview: "import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import BrainDump from "../../components/BrainDump.tsx"; / import { webApplicationSchema } from "../../data/sch..."
- After: 31 lines | 1,054 chars | hash 04d98716cc1a | preview: "--- / import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import BrainDump from "../../components/BrainDump.tsx"; / import { webApplicationSchema } from "../../da..."
- Previous fragment: "import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import BrainDump from "../../components/BrainDump.tsx"; / import { web..."
- Current fragment: "--- / import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import BrainDump from "../../components/BrainDump.tsx"; / import..."

### 2026-08-12T15:04:47.140Z | saved | src/pages/tools/morning-routine.astro
- Summary: Line 17: inserted 2 lines.
- Before: 23 lines | 907 chars | hash 664d9fd92373 | preview: "--- / import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import MorningRoutine from "../../components/MorningRoutine.tsx"; / import { webApplicationSchema } from..."
- After: 24 lines | 944 chars | hash f77b0479bbcf | preview: "--- / import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import MorningRoutine from "../../components/MorningRoutine.tsx"; / import { webApplicationSchema } from..."
- Current fragment: "path: "/tools/morning-routine","

### 2026-08-12T15:04:27.170Z | saved | src/pages/tools/morning-routine.astro
- Summary: Line 1: replaced 20 lines with 22 lines.
- Before: 21 lines | 900 chars | hash a49d54306f97 | preview: "import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import MorningRoutine from "../../components/MorningRoutine.tsx"; / import { webApplicationSchema } from "../...."
- After: 23 lines | 907 chars | hash 664d9fd92373 | preview: "--- / import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import MorningRoutine from "../../components/MorningRoutine.tsx"; / import { webApplicationSchema } from..."
- Previous fragment: "import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import MorningRoutine from "../../components/MorningRoutine.tsx"; / im..."
- Current fragment: "--- / import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import MorningRoutine from "../../components/MorningRoutine.tsx"..."

### 2026-08-12T14:56:01.402Z | saved | README.md
- Summary: Line 1: replaced 43 lines with 72 lines.
- Before: 44 lines | 1,601 chars | hash ac5807090cb6 | preview: "# Astro Starter Kit: Minimal / ```sh / npm create astro@latest -- --template minimal / ``` / > 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun! / ## 🚀 Project Structure / Inside of your Astro project, you'll..."
- After: 73 lines | 2,533 chars | hash 1efa80f3cdf0 | preview: "# SteadyFocusCo / A digital planning resource providing ADHD-friendly printable planners, free productivity tools, executive-function resources, student planning resources, and practical guides designed to reduce over..."
- Previous fragment: "Astro Starter Kit: Minimal / ```sh / npm create astro@latest -- --template minimal / ``` / > 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun! / ## 🚀 Project Structure..."
- Current fragment: "SteadyFocusCo / A digital planning resource providing ADHD-friendly printable planners, free productivity tools, executive-function resources, student planning resources, and pr..."

### 2026-08-12T14:55:40.119Z | saved | src/pages/tools/weekly-reset.astro
- Summary: Line 4: replaced 19 lines with 22 lines.
- Before: 26 lines | 1,025 chars | hash 1f98f21001f2 | preview: "import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import WeeklyReset from "../../components/WeeklyReset.tsx"; / import { webPageSchema, SITE_DESCRIPTION } from..."
- After: 29 lines | 1,052 chars | hash d3ac3721554b | preview: "import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import WeeklyReset from "../../components/WeeklyReset.tsx"; / import { webApplicationSchema } from "../../data..."
- Previous fragment: "import { webPageSchema, SITE_DESCRIPTION } from "../../data/schema"; / const siteBase = new URL("/", Astro.site).toString().replace(/\/$/, ""); / const pageSchema = webPageSchem..."
- Current fragment: "import { webApplicationSchema } from "../../data/schema"; / export function getStaticPaths() { / return []; / } / const siteBase = new URL("/", Astro.site).toString().replace(/\..."

### 2026-08-12T14:54:37.364Z | saved | src/pages/tools/brain-dump.astro
- Summary: Line 4: replaced 4 lines with 21 lines.
- Before: 12 lines | 457 chars | hash 7e6840058afc | preview: "import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import BrainDump from "../../components/BrainDump.tsx"; / <Base / title="Brain Dump tool" / description="Free..."
- After: 29 lines | 1,047 chars | hash d6f70a618218 | preview: "import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import BrainDump from "../../components/BrainDump.tsx"; / import { webApplicationSchema } from "../../data/sch..."
- Previous fragment: "<Base / title="Brain Dump tool" / description="Free brain dump tool: empty your head, then automatically sort every thought into Do Now, Deadline, Quick Task, Later, and Not Sur..."
- Current fragment: "import { webApplicationSchema } from "../../data/schema"; / export function getStaticPaths() { / return []; / } / const siteBase = new URL("/", Astro.site).toString().replace(/\..."

### 2026-08-12T14:53:21.633Z | saved | src/pages/guides/[slug].astro
- Summary: Line 1: replaced 154 lines with 63 lines.
- Before: 154 lines | 4,387 chars | hash 75a7870ce232 | preview: "--- / import Base from "../../layouts/Base.astro"; / import { guides, etsyLink } from "../../data/site"; / export function getStaticPaths() { / return guides.map((g) => ({ params: { slug: g.slug } })); / } / const { s..."
- After: 63 lines | 1,779 chars | hash 54699ff701ad | preview: "import Base from "../../layouts/Base.astro"; / import { guides, etsyLink } from "../../data/site"; / import { articleSchema, breadcrumbSchema } from "../../data/schema"; / export function getStaticPaths() { / return g..."
- Previous fragment: "--- / import Base from "../../layouts/Base.astro"; / import { guides, etsyLink } from "../../data/site"; / export function getStaticPaths() { / return guides.map((g) => ({ param..."
- Current fragment: "import Base from "../../layouts/Base.astro"; / import { guides, etsyLink } from "../../data/site"; / import { articleSchema, breadcrumbSchema } from "../../data/schema"; / expor..."

### 2026-08-12T14:51:20.258Z | saved | src/pages/printables/[slug].astro
- Summary: Line 1: replaced 365 lines with 59 lines.
- Before: 365 lines | 8,938 chars | hash 143cda39f4a6 | preview: "--- / import Base from "../../layouts/Base.astro"; / import { / printables, / toolBySlug, / etsyLink, / type Printable, / } from "../../data/site"; / export function getStaticPaths() { / return printables.map((p) => (..."
- After: 59 lines | 1,663 chars | hash ea7914df64df | preview: "import Base from "../../layouts/Base.astro"; / import { / printables, / toolBySlug, / etsyLink, / type Printable, / } from "../../data/site"; / import { productSchema } from "../../data/schema"; / export function getS..."
- Previous fragment: "--- / import Base from "../../layouts/Base.astro"; / import { / printables, / toolBySlug, / etsyLink, / type Printable, / } from "../../data/site"; / export function getStaticPa..."
- Current fragment: "import Base from "../../layouts/Base.astro"; / import { / printables, / toolBySlug, / etsyLink, / type Printable, / } from "../../data/site"; / import { productSchema } from "....."

### 2026-08-12T14:35:55.190Z | saved | README.md
- Summary: Line 1: replaced 43 lines with 72 lines.
- Before: 44 lines | 1,558 chars | hash e04b6352dd03 | preview: "# Astro Starter Kit: Minimal / ```sh / npm create astro@latest -- --template minimal / ``` / > 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun! / ## 🚀 Project Structure / Inside of your Astro project, you'll..."
- After: 73 lines | 2,461 chars | hash 436222edb04e | preview: "# SteadyFocusCo / A digital planning resource providing ADHD-friendly printable planners, free productivity tools, executive-function resources, student planning resources, and practical guides designed to reduce over..."
- Previous fragment: "Astro Starter Kit: Minimal / ```sh / npm create astro@latest -- --template minimal / ``` / > 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun! / ## 🚀 Project Structure..."
- Current fragment: "SteadyFocusCo / A digital planning resource providing ADHD-friendly printable planners, free productivity tools, executive-function resources, student planning resources, and pr..."


## Hot Files
- src/pages/tools/brain-dump.astro (8 tracked changes)
- src/pages/tools/morning-routine.astro (7 tracked changes)
- src/pages/tools/weekly-reset.astro (5 tracked changes)
- src/layouts/Base.astro (3 tracked changes)
- src/pages/guides/[slug].astro (3 tracked changes)
- src/pages/index.astro (3 tracked changes)
- src/pages/printables/[slug].astro (3 tracked changes)
- README.md (2 tracked changes)

## Git Snapshot
- Branch: main
- HEAD: 2026-08-12 69d89b2 fix: resolve remaining GEO schema errors
- Working tree summary: 10 modifieds, 4 untrackeds
- M .vscode/extensions.json
- M graphify-out/WORKSPACE_MEMORY.md
- M src/data/products.json
- M src/pages/about.astro
- M src/pages/guides/[slug].astro
- M src/pages/tools/brain-dump.astro
- M src/pages/tools/morning-routine.astro
- M src/pages/tools/weekly-reset.astro
- M workspace.json
- M workspacememory.md
- ?? 0001-chore-remove-stray-homepage-color-rebuild.patch-from.patch
- ?? 0001-fix-correct-same-zone-task-spacing-to-actually-clear.patch
- Additional git status lines were omitted for brevity.

## GitHub Snapshot
GitHub Repository: arslankhanwazir/steadyfocusco
Visibility: public | Default branch: main
Stars: 0 | Forks: 0 | Open issues: 0

Latest commit on main:
- 69d89b2 by Arslan Khan on 2026-08-12
  fix: resolve remaining GEO schema errors

URL: https://github.com/arslankhanwazir/steadyfocusco

## Graphify Snapshot
Graphify report not found. Generate Graphify output if you want architecture-aware memory excerpts here.

## Project Planner
- Project planner is not configured yet. Enable it in the chat panel to generate a time-based todo list and progress rescue briefs.

## Agent Notes
- If a future task asks what changed recently, start with `Recent Changes`, `Tracked Snapshots`, `Hot Files`, and `Git Snapshot`.
- If a future task asks how the project is organized, combine this file with `graphify-out/GRAPH_REPORT.md`.
- If a future task needs repository-level context, use `Package Snapshot`, the GitHub snapshot, and the Graphify snapshot before rescanning broad parts of the repo.
