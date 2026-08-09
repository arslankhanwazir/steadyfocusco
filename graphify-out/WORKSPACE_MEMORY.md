# Workspace Memory
This file is maintained automatically by Code Janitor so Claude, Codex, Bob, and any other AI agent can reuse repo context without rescanning everything from scratch.
Generated: 2026-08-09T21:23:21.721Z
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
- Last activity: 2026-08-09T21:23:18.971Z
## Workspace Focus
- Active file in focus: src/pages/guides/[slug].astro
- Hottest files right now: .env.example (1), .gitignore (1), astro.config.mjs (1), package.json (1)
- Suggested starting points: src/pages/guides/[slug].astro, .env.example, .gitignore, astro.config.mjs, package.json, scripts/sync-etsy-products.js
## Current Workspace
- Active file: src/pages/guides/[slug].astro
- Tracked files in snapshot: 41
- Top-level areas: src (23), [root] (11), .astro (4), public (2), scripts (1)
- Primary file types: .astro (16), .json (6), .md (4), .ts (4), .tsx (3), .css (1), .example (1), .ico (1)
- Key files: .gitignore, AGENTS.md, README.md, package-lock.json, package.json, tsconfig.json
## Package Snapshot
- Package: steadyfocusco v0.0.1
- Package manager: not declared
- Scripts: dev, sync:etsy, prebuild, build, preview, astro
- Runtime dependencies: @astrojs/react, @astrojs/sitemap, @types/react, @types/react-dom, astro, jspdf, react, react-dom
- Dev dependencies: none declared
## Current Stack
- Logged change events: 27
- Change mix: save (27)
- Remembered file snapshots: 26
- Working tree summary: fatal: not a git repository (or any of the parent directories): .git
## Tracked Snapshots
- src/pages/guides/[slug].astro | 133 lines | 3367 chars | hash db7f2ae66e4a
  Last snapshot: 2026-08-09T21:23:18.971Z
  Preview: "--- / import Base from "../../layouts/Base.astro"; / import { guides, etsyLink } from "../../data/site"; / export function getStaticPaths() { / return guides.map((g) => ({ params: { slug: g.slug } })); / } / const { s..."
- src/pages/guides/index.astro | 111 lines | 2723 chars | hash 6a192779d530
  Last snapshot: 2026-08-09T21:22:28.012Z
  Preview: "--- / import Base from "../../layouts/Base.astro"; / import { guides } from "../../data/site"; / --- / <Base / title="Guides" / description="Plain-language guides for ADHD planning, student study habits, and productiv..."
- src/pages/printables/[slug].astro | 365 lines | 8904 chars | hash 1ccca702e68e
  Last snapshot: 2026-08-09T21:12:21.487Z
  Preview: "--- / import Base from "../../layouts/Base.astro"; / import { / printables, / toolBySlug, / etsyLink, / type Printable, / } from "../../data/site"; / export function getStaticPaths() { / return printables.map((p) => (..."
- src/pages/printables/index.astro | 107 lines | 2557 chars | hash 11ec215e23d4
  Last snapshot: 2026-08-09T21:11:23.537Z
  Preview: "--- / import Base from "../../layouts/Base.astro"; / import { printables } from "../../data/site"; / --- / <Base / title="Free printables" / description="Free, printable planning sheets for overwhelmed minds — brain d..."
- src/pages/shop.astro | 249 lines | 6130 chars | hash a4c1d17abe07
  Last snapshot: 2026-08-09T21:10:42.245Z
  Preview: "--- / import Base from "../layouts/Base.astro"; / import { etsyLink, ETSY_SHOP_URL } from "../data/site"; / import productData from "../data/products.json"; / interface Product { / listing_id: number | null; / title:..."
- .env.example | 25 lines | 947 chars | hash cec0171d7b52
  Last snapshot: 2026-08-09T21:09:33.848Z
  Preview: "# SteadyFocusCo — environment variables / # Copy this file to `.env` and fill in real values. `.env` is gitignored. / # / # The Etsy sync is READ-ONLY and only displays our own shop's ACTIVE listings. / # It never pro..."
- .gitignore | 26 lines | 260 chars | hash fb459322e8f5
  Last snapshot: 2026-08-09T21:09:09.283Z
  Preview: "# build output / dist/ / .output/ / # dependencies / node_modules/ / # astro / .astro/ / # secrets — never commit / .env / .env.* / !.env.example / # logs / os / npm-debug.log* / *.log / .DS_Store / Thumbs.db / # edit..."
- package.json | 26 lines | 604 chars | hash d903233fa0a5
  Last snapshot: 2026-08-09T21:08:46.715Z
  Preview: "{ / "name": "steadyfocusco", / "type": "module", / "version": "0.0.1", / "engines": { / "node": ">=22.12.0" / }, / "scripts": { / "dev": "astro dev", / "sync:etsy": "node scripts/sync-etsy-products.js", / "prebuild":..."

## Recent Changes
### 2026-08-09T21:23:18.971Z | saved | src/pages/guides/[slug].astro
- Summary: Line 1: inserted 133 lines.
- Before: 0 lines | 0 chars | hash empty
- After: 133 lines | 3,367 chars | hash db7f2ae66e4a | preview: "--- / import Base from "../../layouts/Base.astro"; / import { guides, etsyLink } from "../../data/site"; / export function getStaticPaths() { / return guides.map((g) => ({ params: { slug: g.slug } })); / } / const { s..."
- Current fragment: "--- / import Base from "../../layouts/Base.astro"; / import { guides, etsyLink } from "../../data/site"; / export function getStaticPaths() { / return guides.map((g) => ({ param..."

### 2026-08-09T21:22:28.012Z | saved | src/pages/guides/index.astro
- Summary: Line 1: inserted 111 lines.
- Before: 0 lines | 0 chars | hash empty
- After: 111 lines | 2,723 chars | hash 6a192779d530 | preview: "--- / import Base from "../../layouts/Base.astro"; / import { guides } from "../../data/site"; / --- / <Base / title="Guides" / description="Plain-language guides for ADHD planning, student study habits, and productiv..."
- Current fragment: "--- / import Base from "../../layouts/Base.astro"; / import { guides } from "../../data/site"; / --- / <Base / title="Guides" / description="Plain-language guides for ADHD plann..."

### 2026-08-09T21:12:21.487Z | saved | src/pages/printables/[slug].astro
- Summary: Line 1: inserted 365 lines.
- Before: 0 lines | 0 chars | hash empty
- After: 365 lines | 8,904 chars | hash 1ccca702e68e | preview: "--- / import Base from "../../layouts/Base.astro"; / import { / printables, / toolBySlug, / etsyLink, / type Printable, / } from "../../data/site"; / export function getStaticPaths() { / return printables.map((p) => (..."
- Current fragment: "--- / import Base from "../../layouts/Base.astro"; / import { / printables, / toolBySlug, / etsyLink, / type Printable, / } from "../../data/site"; / export function getStaticPa..."

### 2026-08-09T21:11:23.537Z | saved | src/pages/printables/index.astro
- Summary: Line 1: inserted 107 lines.
- Before: 0 lines | 0 chars | hash empty
- After: 107 lines | 2,557 chars | hash 11ec215e23d4 | preview: "--- / import Base from "../../layouts/Base.astro"; / import { printables } from "../../data/site"; / --- / <Base / title="Free printables" / description="Free, printable planning sheets for overwhelmed minds — brain d..."
- Current fragment: "--- / import Base from "../../layouts/Base.astro"; / import { printables } from "../../data/site"; / --- / <Base / title="Free printables" / description="Free, printable plannin..."

### 2026-08-09T21:10:42.245Z | saved | src/pages/shop.astro
- Summary: Line 1: inserted 249 lines.
- Before: 0 lines | 0 chars | hash empty
- After: 249 lines | 6,130 chars | hash a4c1d17abe07 | preview: "--- / import Base from "../layouts/Base.astro"; / import { etsyLink, ETSY_SHOP_URL } from "../data/site"; / import productData from "../data/products.json"; / interface Product { / listing_id: number | null; / title:..."
- Current fragment: "--- / import Base from "../layouts/Base.astro"; / import { etsyLink, ETSY_SHOP_URL } from "../data/site"; / import productData from "../data/products.json"; / interface Product..."

### 2026-08-09T21:09:33.848Z | saved | .env.example
- Summary: Line 1: inserted 25 lines.
- Before: 0 lines | 0 chars | hash empty
- After: 25 lines | 947 chars | hash cec0171d7b52 | preview: "# SteadyFocusCo — environment variables / # Copy this file to `.env` and fill in real values. `.env` is gitignored. / # / # The Etsy sync is READ-ONLY and only displays our own shop's ACTIVE listings. / # It never pro..."
- Current fragment: "# SteadyFocusCo — environment variables / # Copy this file to `.env` and fill in real values. `.env` is gitignored. / # / # The Etsy sync is READ-ONLY and only displays our own..."

### 2026-08-09T21:09:09.283Z | saved | .gitignore
- Summary: Line 1: inserted 26 lines.
- Before: 0 lines | 0 chars | hash empty
- After: 26 lines | 260 chars | hash fb459322e8f5 | preview: "# build output / dist/ / .output/ / # dependencies / node_modules/ / # astro / .astro/ / # secrets — never commit / .env / .env.* / !.env.example / # logs / os / npm-debug.log* / *.log / .DS_Store / Thumbs.db / # edit..."
- Current fragment: "# build output / dist/ / .output/ / # dependencies / node_modules/ / # astro / .astro/ / # secrets — never commit / .env / .env.* / !.env.example / # logs / os / npm-debug.log*..."

### 2026-08-09T21:08:46.715Z | saved | package.json
- Summary: Line 10: replaced 16 lines with 17 lines.
- Before: 25 lines | 496 chars | hash 2ee21c52898d | preview: "{ / "name": "steadyfocusco", / "type": "module", / "version": "0.0.1", / "engines": { / "node": ">=22.12.0" / }, / "scripts": { / "dev": "astro dev", / "build": "astro build", / "preview": "astro preview", / "astro":..."
- After: 26 lines | 604 chars | hash d903233fa0a5 | preview: "{ / "name": "steadyfocusco", / "type": "module", / "version": "0.0.1", / "engines": { / "node": ">=22.12.0" / }, / "scripts": { / "dev": "astro dev", / "sync:etsy": "node scripts/sync-etsy-products.js", / "prebuild":..."
- Previous fragment: "build": "astro build", / "preview": "astro preview", / "astro": "astro" / }, / "dependencies": { / "@astrojs/react": "^6.0.2", / "@astrojs/sitemap": "^3.7.3", / "@types/react":..."
- Current fragment: "sync:etsy": "node scripts/sync-etsy-products.js", / "prebuild": "node scripts/sync-etsy-products.js", / "build": "astro build", / "preview": "astro preview", / "astro": "astro"..."

### 2026-08-09T21:08:07.844Z | saved | scripts/sync-etsy-products.js
- Summary: Line 1: inserted 199 lines.
- Before: 0 lines | 0 chars | hash empty
- After: 199 lines | 6,870 chars | hash b82a041567d8 | preview: "#!/usr/bin/env node / // Read-only Etsy shop sync (Etsy Open API v3). / // / // POLICY: This script only READS and DISPLAYS our own shop's ACTIVE listings. / // It never touches checkout/payment. Every product link on..."
- Current fragment: "#!/usr/bin/env node / // Read-only Etsy shop sync (Etsy Open API v3). / // / // POLICY: This script only READS and DISPLAYS our own shop's ACTIVE listings. / // It never touches..."

### 2026-08-09T21:06:48.173Z | saved | src/pages/tools/index.astro
- Summary: Saved without a textual diff.
- Before: 129 lines | 3,003 chars | hash ff2ac0542d08 | preview: "--- / import Base from "../../layouts/Base.astro"; / import { tools } from "../../data/site"; / const live = tools.filter((t) => t.status === "live"); / const planned = tools.filter((t) => t.status === "planned"); / -..."
- After: 129 lines | 3,003 chars | hash ff2ac0542d08 | preview: "--- / import Base from "../../layouts/Base.astro"; / import { tools } from "../../data/site"; / const live = tools.filter((t) => t.status === "live"); / const planned = tools.filter((t) => t.status === "planned"); / -..."

### 2026-08-09T21:06:14.532Z | saved | src/pages/tools/morning-routine.astro
- Summary: Line 1: inserted 15 lines.
- Before: 0 lines | 0 chars | hash empty
- After: 15 lines | 493 chars | hash 05c2fac16b31 | preview: "--- / import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import MorningRoutine from "../../components/MorningRoutine.tsx"; / --- / <Base / title="Morning Routine..."
- Current fragment: "--- / import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import MorningRoutine from "../../components/MorningRoutine.tsx"..."

### 2026-08-09T21:05:51.146Z | saved | src/pages/tools/weekly-reset.astro
- Summary: Line 1: inserted 15 lines.
- Before: 0 lines | 0 chars | hash empty
- After: 15 lines | 474 chars | hash e589a5cabbf2 | preview: "--- / import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import WeeklyReset from "../../components/WeeklyReset.tsx"; / --- / <Base / title="Weekly Reset tool" /..."
- Current fragment: "--- / import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import WeeklyReset from "../../components/WeeklyReset.tsx"; / --..."

### 2026-08-09T21:05:27.983Z | saved | src/pages/tools/brain-dump.astro
- Summary: Line 1: inserted 15 lines.
- Before: 0 lines | 0 chars | hash empty
- After: 15 lines | 469 chars | hash 103bc4443951 | preview: "--- / import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import BrainDump from "../../components/BrainDump.tsx"; / --- / <Base / title="Brain Dump tool" / descri..."
- Current fragment: "--- / import Base from "../../layouts/Base.astro"; / import ToolShell from "../../components/ToolShell.astro"; / import BrainDump from "../../components/BrainDump.tsx"; / --- /..."

### 2026-08-09T21:05:03.419Z | saved | src/components/ToolShell.astro
- Summary: Line 1: inserted 125 lines.
- Before: 0 lines | 0 chars | hash empty
- After: 125 lines | 2,784 chars | hash f2e1b2818b72 | preview: "--- / import { / toolBySlug, / guides, / printables, / type Tool, / } from "../data/site"; / interface Props { / slug: string; / } / const { slug } = Astro.props; / const tool = toolBySlug(slug) as Tool; / // Find sup..."
- Current fragment: "--- / import { / toolBySlug, / guides, / printables, / type Tool, / } from "../data/site"; / interface Props { / slug: string; / } / const { slug } = Astro.props; / const tool =..."

### 2026-08-09T21:04:26.961Z | saved | src/components/MorningRoutine.tsx
- Summary: Saved without a textual diff.
- Before: 276 lines | 7,816 chars | hash 1b23fc7eb687 | preview: "import { useState } from "react"; / import "./tools.css"; / import { createWriter, today } from "./pdf"; / // Etsy CTA — UTM: ?utm_source=site&utm_medium=tool&utm_campaign=morning-routine / const ETSY_CTA = / "https:/..."
- After: 276 lines | 7,816 chars | hash 1b23fc7eb687 | preview: "import { useState } from "react"; / import "./tools.css"; / import { createWriter, today } from "./pdf"; / // Etsy CTA — UTM: ?utm_source=site&utm_medium=tool&utm_campaign=morning-routine / const ETSY_CTA = / "https:/..."


## Hot Files
- .env.example (1 tracked changes)
- .gitignore (1 tracked changes)
- astro.config.mjs (1 tracked changes)
- package.json (1 tracked changes)
- scripts/sync-etsy-products.js (1 tracked changes)
- src/components/BrainDump.tsx (1 tracked changes)
- src/components/ClusterHub.astro (1 tracked changes)
- src/components/MorningRoutine.tsx (1 tracked changes)

## Git Snapshot
- fatal: not a git repository (or any of the parent directories): .git

## GitHub Snapshot
GitHub context unavailable: Could not determine the GitHub repository from origin remote: fatal: not a git repository (or any of the parent directories): .git

## Graphify Snapshot
Graphify report not found. Generate Graphify output if you want architecture-aware memory excerpts here.

## Project Planner
- Project planner is not configured yet. Enable it in the chat panel to generate a time-based todo list and progress rescue briefs.

## Agent Notes
- If a future task asks what changed recently, start with `Recent Changes`, `Tracked Snapshots`, `Hot Files`, and `Git Snapshot`.
- If a future task asks how the project is organized, combine this file with `graphify-out/GRAPH_REPORT.md`.
- If a future task needs repository-level context, use `Package Snapshot`, the GitHub snapshot, and the Graphify snapshot before rescanning broad parts of the repo.
