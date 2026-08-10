# Workspace Memory
This file is maintained automatically by Code Janitor so Claude, Codex, Bob, and any other AI agent can reuse repo context without rescanning everything from scratch.
Generated: 2026-08-10T00:16:36.793Z
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
- Last activity: 2026-08-10T00:16:34.098Z
## Workspace Focus
- Active file in focus: .gitignore
- Hottest files right now: src/layouts/Base.astro (11), src/pages/shop.astro (3), .gitignore (2), astro.config.mjs (2)
- Suggested starting points: .gitignore, src/layouts/Base.astro, src/pages/shop.astro, astro.config.mjs, package.json, src/pages/guides/[slug].astro
## Current Workspace
- Active file: .gitignore
- Tracked files in snapshot: 98
- Top-level areas: pins-out (42), src (24), [root] (14), public (12), .astro (4), scripts (2)
- Primary file types: .png (51), .astro (17), .json (6), .md (4), .ts (4), .tsx (3), .mjs (2), [no extension] (2)
- Key files: .gitignore, AGENTS.md, README.md, package-lock.json, package.json, tsconfig.json
## Package Snapshot
- Package: steadyfocusco v0.0.1
- Package manager: not declared
- Scripts: dev, sync:etsy, prebuild, build, preview, astro, pins
- Runtime dependencies: @astrojs/react, @astrojs/sitemap, @types/react, @types/react-dom, astro, jspdf, react, react-dom, sharp
- Dev dependencies: none declared
## Current Stack
- Logged change events: 40
- Change mix: save (40)
- Remembered file snapshots: 29
- Working tree summary: 6 modifieds, 1 untracked
## Tracked Snapshots
- .gitignore | 29 lines | 293 chars | hash 4a2ad0bea3f9
  Last snapshot: 2026-08-10T00:16:34.098Z
  Preview: "# build output / dist/ / .output/ / # generated assets / pins-out/ / # dependencies / node_modules/ / # astro / .astro/ / # secrets — never commit / .env / .env.* / !.env.example / # logs / os / npm-debug.log* / *.log..."
- package.json | 29 lines | 675 chars | hash 25a4b7e4097e
  Last snapshot: 2026-08-10T00:15:02.721Z
  Preview: "{ / "name": "steadyfocusco", / "type": "module", / "version": "0.0.1", / "engines": { / "node": ">=22.12.0" / }, / "scripts": { / "dev": "astro dev", / "sync:etsy": "node scripts/sync-etsy-products.js", / "prebuild":..."
- scripts/generate-pins.mjs | 346 lines | 10801 chars | hash 1446f58418b4
  Last snapshot: 2026-08-10T00:14:38.254Z
  Preview: "#!/usr/bin/env node / /** / * SteadyFocusCo Pinterest Pin Generator / * / * Generates 1000×1500 PNG pins for guides, tools, and printables. / * Reads content from src/data/site.ts and outputs to pins-out/. / */ / impo..."
- src/layouts/Base.astro | 175 lines | 5920 chars | hash 8bcabde454dd
  Last snapshot: 2026-08-10T00:02:19.055Z
  Preview: "--- / interface Props { / title: string; / description?: string; / image?: string; / noindex?: boolean; / } / const { / title, / description = "Planning and organization for overwhelmed minds.", / image = "/og-default..."
- src/pages/printables/[slug].astro | 365 lines | 8938 chars | hash 143cda39f4a6
  Last snapshot: 2026-08-09T23:52:45.393Z
  Preview: "--- / import Base from "../../layouts/Base.astro"; / import { / printables, / toolBySlug, / etsyLink, / type Printable, / } from "../../data/site"; / export function getStaticPaths() { / return printables.map((p) => (..."
- src/pages/guides/[slug].astro | 133 lines | 3401 chars | hash 8c17dea9f74b
  Last snapshot: 2026-08-09T23:51:55.003Z
  Preview: "--- / import Base from "../../layouts/Base.astro"; / import { guides, etsyLink } from "../../data/site"; / export function getStaticPaths() { / return guides.map((g) => ({ params: { slug: g.slug } })); / } / const { s..."
- src/components/MorningRoutine.tsx | 276 lines | 7852 chars | hash fa7188534064
  Last snapshot: 2026-08-09T23:51:06.567Z
  Preview: "import { useState } from "react"; / import "./tools.css"; / import { createWriter, today } from "./pdf"; / import { etsyLink } from "../data/site"; / // Etsy CTA — UTM: utm_source=site&utm_medium=tool&utm_campaign=mor..."
- src/components/WeeklyReset.tsx | 247 lines | 7018 chars | hash 6a287040489f
  Last snapshot: 2026-08-09T23:50:23.098Z
  Preview: "import { useState } from "react"; / import "./tools.css"; / import { createWriter, today } from "./pdf"; / import { etsyLink } from "../data/site"; / // Etsy CTA — UTM: utm_source=site&utm_medium=tool&utm_campaign=wee..."

## Recent Changes
### 2026-08-10T00:16:34.098Z | saved | .gitignore
- Summary: Line 5: inserted 4 lines.
- Before: 26 lines | 260 chars | hash fb459322e8f5 | preview: "# build output / dist/ / .output/ / # dependencies / node_modules/ / # astro / .astro/ / # secrets — never commit / .env / .env.* / !.env.example / # logs / os / npm-debug.log* / *.log / .DS_Store / Thumbs.db / # edit..."
- After: 29 lines | 293 chars | hash 4a2ad0bea3f9 | preview: "# build output / dist/ / .output/ / # generated assets / pins-out/ / # dependencies / node_modules/ / # astro / .astro/ / # secrets — never commit / .env / .env.* / !.env.example / # logs / os / npm-debug.log* / *.log..."
- Current fragment: "generated assets / pins-out/ / #"

### 2026-08-10T00:15:02.721Z | saved | package.json
- Summary: Line 14: inserted 2 lines.
- Before: 28 lines | 629 chars | hash a949c8817e42 | preview: "{ / "name": "steadyfocusco", / "type": "module", / "version": "0.0.1", / "engines": { / "node": ">=22.12.0" / }, / "scripts": { / "dev": "astro dev", / "sync:etsy": "node scripts/sync-etsy-products.js", / "prebuild":..."
- After: 29 lines | 675 chars | hash 25a4b7e4097e | preview: "{ / "name": "steadyfocusco", / "type": "module", / "version": "0.0.1", / "engines": { / "node": ">=22.12.0" / }, / "scripts": { / "dev": "astro dev", / "sync:etsy": "node scripts/sync-etsy-products.js", / "prebuild":..."
- Current fragment: ", / "pins": "node scripts/generate-pins.mjs""

### 2026-08-10T00:14:38.254Z | saved | scripts/generate-pins.mjs
- Summary: Line 1: inserted 346 lines.
- Before: 0 lines | 0 chars | hash empty
- After: 346 lines | 10,801 chars | hash 1446f58418b4 | preview: "#!/usr/bin/env node / /** / * SteadyFocusCo Pinterest Pin Generator / * / * Generates 1000×1500 PNG pins for guides, tools, and printables. / * Reads content from src/data/site.ts and outputs to pins-out/. / */ / impo..."
- Current fragment: "#!/usr/bin/env node / /** / * SteadyFocusCo Pinterest Pin Generator / * / * Generates 1000×1500 PNG pins for guides, tools, and printables. / * Reads content from src/data/site...."

### 2026-08-10T00:02:19.055Z | saved | src/layouts/Base.astro
- Summary: Line 49: inserted 5 lines.
- Before: 171 lines | 5,686 chars | hash a776dfd396d1 | preview: "--- / interface Props { / title: string; / description?: string; / image?: string; / noindex?: boolean; / } / const { / title, / description = "Planning and organization for overwhelmed minds.", / image = "/og-default..."
- After: 175 lines | 5,920 chars | hash 8bcabde454dd | preview: "--- / interface Props { / title: string; / description?: string; / image?: string; / noindex?: boolean; / } / const { / title, / description = "Planning and organization for overwhelmed minds.", / image = "/og-default..."
- Current fragment: "<!-- Cloudflare Web Analytics --> / <script type='module' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "5e5fa2e52ce84f5787ee32beab26f06d"}..."

### 2026-08-09T23:52:45.393Z | saved | src/pages/printables/[slug].astro
- Summary: Line 151: inserted 1 line.
- Before: 365 lines | 8,904 chars | hash 1ccca702e68e | preview: "--- / import Base from "../../layouts/Base.astro"; / import { / printables, / toolBySlug, / etsyLink, / type Printable, / } from "../../data/site"; / export function getStaticPaths() { / return printables.map((p) => (..."
- After: 365 lines | 8,938 chars | hash 143cda39f4a6 | preview: "--- / import Base from "../../layouts/Base.astro"; / import { / printables, / toolBySlug, / etsyLink, / type Printable, / } from "../../data/site"; / export function getStaticPaths() { / return printables.map((p) => (..."
- Current fragment: "data-analytics-event="etsy_click""

### 2026-08-09T23:51:55.003Z | saved | src/pages/guides/[slug].astro
- Summary: Line 52: inserted 1 line.
- Before: 133 lines | 3,367 chars | hash db7f2ae66e4a | preview: "--- / import Base from "../../layouts/Base.astro"; / import { guides, etsyLink } from "../../data/site"; / export function getStaticPaths() { / return guides.map((g) => ({ params: { slug: g.slug } })); / } / const { s..."
- After: 133 lines | 3,401 chars | hash 8c17dea9f74b | preview: "--- / import Base from "../../layouts/Base.astro"; / import { guides, etsyLink } from "../../data/site"; / export function getStaticPaths() { / return guides.map((g) => ({ params: { slug: g.slug } })); / } / const { s..."
- Current fragment: "data-analytics-event="etsy_click""

### 2026-08-09T23:51:06.567Z | saved | src/components/MorningRoutine.tsx
- Summary: Line 4: replaced 264 lines with 264 lines.
- Before: 276 lines | 7,816 chars | hash 1b23fc7eb687 | preview: "import { useState } from "react"; / import "./tools.css"; / import { createWriter, today } from "./pdf"; / // Etsy CTA — UTM: ?utm_source=site&utm_medium=tool&utm_campaign=morning-routine / const ETSY_CTA = / "https:/..."
- After: 276 lines | 7,852 chars | hash fa7188534064 | preview: "import { useState } from "react"; / import "./tools.css"; / import { createWriter, today } from "./pdf"; / import { etsyLink } from "../data/site"; / // Etsy CTA — UTM: utm_source=site&utm_medium=tool&utm_campaign=mor..."
- Previous fragment: "// Etsy CTA — UTM: ?utm_source=site&utm_medium=tool&utm_campaign=morning-routine / const ETSY_CTA = / "https://steadyfocusco.etsy.com?utm_source=site&utm_medium=tool&utm_campaig..."
- Current fragment: "import { etsyLink } from "../data/site"; / // Etsy CTA — UTM: utm_source=site&utm_medium=tool&utm_campaign=morning-routine / const ETSY_CTA = etsyLink({ medium: "tool", campaign..."

### 2026-08-09T23:50:23.098Z | saved | src/components/WeeklyReset.tsx
- Summary: Line 4: replaced 235 lines with 235 lines.
- Before: 247 lines | 6,982 chars | hash fff64dcbf283 | preview: "import { useState } from "react"; / import "./tools.css"; / import { createWriter, today } from "./pdf"; / // Etsy CTA — UTM: ?utm_source=site&utm_medium=tool&utm_campaign=weekly-reset / const ETSY_CTA = / "https://st..."
- After: 247 lines | 7,018 chars | hash 6a287040489f | preview: "import { useState } from "react"; / import "./tools.css"; / import { createWriter, today } from "./pdf"; / import { etsyLink } from "../data/site"; / // Etsy CTA — UTM: utm_source=site&utm_medium=tool&utm_campaign=wee..."
- Previous fragment: "// Etsy CTA — UTM: ?utm_source=site&utm_medium=tool&utm_campaign=weekly-reset / const ETSY_CTA = / "https://steadyfocusco.etsy.com?utm_source=site&utm_medium=tool&utm_campaign=w..."
- Current fragment: "import { etsyLink } from "../data/site"; / // Etsy CTA — UTM: utm_source=site&utm_medium=tool&utm_campaign=weekly-reset / const ETSY_CTA = etsyLink({ medium: "tool", campaign: "..."

### 2026-08-09T23:49:48.695Z | saved | src/components/BrainDump.tsx
- Summary: Line 4: replaced 242 lines with 242 lines.
- Before: 254 lines | 6,579 chars | hash fa5c3a7207a0 | preview: "import { useState } from "react"; / import "./tools.css"; / import { createWriter, today } from "./pdf"; / // Etsy CTA — UTM per spec: ?utm_source=site&utm_medium=tool&utm_campaign=brain-dump / const ETSY_CTA = / "htt..."
- After: 254 lines | 6,615 chars | hash 2b79eeadb893 | preview: "import { useState } from "react"; / import "./tools.css"; / import { createWriter, today } from "./pdf"; / import { etsyLink } from "../data/site"; / // Etsy CTA — UTM per spec: utm_source=site&utm_medium=tool&utm_cam..."
- Previous fragment: "// Etsy CTA — UTM per spec: ?utm_source=site&utm_medium=tool&utm_campaign=brain-dump / const ETSY_CTA = / "https://steadyfocusco.etsy.com?utm_source=site&utm_medium=tool&utm_cam..."
- Current fragment: "import { etsyLink } from "../data/site"; / // Etsy CTA — UTM per spec: utm_source=site&utm_medium=tool&utm_campaign=brain-dump / const ETSY_CTA = etsyLink({ medium: "tool", camp..."

### 2026-08-09T23:49:28.717Z | saved | src/pages/shop.astro
- Summary: Line 36: replaced 59 lines with 49 lines.
- Before: 261 lines | 6,536 chars | hash f6d9d3f658e8 | preview: "--- / import Base from "../layouts/Base.astro"; / import { etsyLink, ETSY_SHOP_URL } from "../data/site"; / import productData from "../data/products.json"; / interface Product { / listing_id: number | null; / title:..."
- After: 251 lines | 6,183 chars | hash f6d894cd78bb | preview: "--- / import Base from "../layouts/Base.astro"; / import { etsyLink, ETSY_SHOP_URL } from "../data/site"; / import productData from "../data/products.json"; / interface Product { / listing_id: number | null; / title:..."
- Previous fragment: "function trackClicks(e: React.MouseEvent<HTMLAnchorElement>) { / const el = e.currentTarget; / if (typeof (window as any).plausible === "function") { / (window as any).plausible..."
- Current fragment: "--- / <Base / title="Shop" / description="Browse SteadyFocusCo's ADHD and student planning printables. Every purchase happens securely on Etsy — this page just shows what's in t..."

### 2026-08-09T23:49:08.062Z | saved | src/pages/shop.astro
- Summary: Line 35: replaced 48 lines with 60 lines.
- Before: 249 lines | 6,130 chars | hash a4c1d17abe07 | preview: "--- / import Base from "../layouts/Base.astro"; / import { etsyLink, ETSY_SHOP_URL } from "../data/site"; / import productData from "../data/products.json"; / interface Product { / listing_id: number | null; / title:..."
- After: 261 lines | 6,536 chars | hash f6d9d3f658e8 | preview: "--- / import Base from "../layouts/Base.astro"; / import { etsyLink, ETSY_SHOP_URL } from "../data/site"; / import productData from "../data/products.json"; / interface Product { / listing_id: number | null; / title:..."
- Previous fragment: "--- / <Base / title="Shop" / description="Browse SteadyFocusCo's ADHD and student planning printables. Every purchase happens securely on Etsy — this page just shows what's in t..."
- Current fragment: "function trackClicks(e: React.MouseEvent<HTMLAnchorElement>) { / const el = e.currentTarget; / if (typeof (window as any).plausible === "function") { / (window as any).plausible..."

### 2026-08-09T23:48:51.484Z | saved | src/layouts/Base.astro
- Summary: Line 92: replaced 1 line with 1 line.
- Before: 171 lines | 5,600 chars | hash 2d5bc16a73fe | preview: "--- / interface Props { / title: string; / description?: string; / image?: string; / noindex?: boolean; / } / const { / title, / description = "Planning and organization for overwhelmed minds.", / image = "/og-default..."
- After: 171 lines | 5,686 chars | hash a776dfd396d1 | preview: "--- / interface Props { / title: string; / description?: string; / image?: string; / noindex?: boolean; / } / const { / title, / description = "Planning and organization for overwhelmed minds.", / image = "/og-default..."
- Previous fragment: "" target="_blank" rel="sponsored noopener"
- Current fragment: "?utm_source=site&utm_medium=footer&utm_campaign=site" target="_blank" rel="sponsored noopener" data-analytics-event="etsy_click"

### 2026-08-09T23:48:23.695Z | saved | src/pages/index.astro
- Summary: Line 3: replaced 55 lines with 56 lines.
- Before: 113 lines | 5,011 chars | hash 0dbb2eb13c7e | preview: "--- / import Base from '../layouts/Base.astro'; / const intents = [ / { label: "Clear my head", href: "/tools/brain-dump" }, / { label: "Plan my week", href: "/tools/weekly-reset" }, / { label: "Get schoolwork done",..."
- After: 114 lines | 5,110 chars | hash 7676942640c4 | preview: "--- / import Base from '../layouts/Base.astro'; / import { etsyLink } from '../data/site'; / const intents = [ / { label: "Clear my head", href: "/tools/brain-dump" }, / { label: "Plan my week", href: "/tools/weekly-r..."
- Previous fragment: "const intents = [ / { label: "Clear my head", href: "/tools/brain-dump" }, / { label: "Plan my week", href: "/tools/weekly-reset" }, / { label: "Get schoolwork done", href: "/st..."
- Current fragment: "import { etsyLink } from '../data/site'; / const intents = [ / { label: "Clear my head", href: "/tools/brain-dump" }, / { label: "Plan my week", href: "/tools/weekly-reset" }, /..."

### 2026-08-09T23:38:02.086Z | saved | src/layouts/Base.astro
- Summary: Line 58: replaced 8 lines with 8 lines.
- Before: 171 lines | 5,600 chars | hash b910ee82481d | preview: "--- / interface Props { / title: string; / description?: string; / image?: string; / noindex?: boolean; / } / const { / title, / description = "Planning and organization for overwhelmed minds.", / image = "/og-default..."
- After: 171 lines | 5,600 chars | hash 2d5bc16a73fe | preview: "--- / interface Props { / title: string; / description?: string; / image?: string; / noindex?: boolean; / } / const { / title, / description = "Planning and organization for overwhelmed minds.", / image = "/og-default..."
- Previous fragment: "about">About</a> / <a href="/tools">Tools</a> / <a href="/adhd">ADHD</a> / <a href="/students">Students</a> / <a href="/productivity">Productivity</a> / <a href="/printables">Fr..."
- Current fragment: "tools">Tools</a> / <a href="/adhd">ADHD</a> / <a href="/students">Students</a> / <a href="/productivity">Productivity</a> / <a href="/printables">Free printables</a> / <a href="..."

### 2026-08-09T23:33:15.144Z | saved | src/layouts/Base.astro
- Summary: Line 84: replaced 13 lines with 13 lines.
- Before: 171 lines | 5,596 chars | hash 0152c3c7bf06 | preview: "--- / interface Props { / title: string; / description?: string; / image?: string; / noindex?: boolean; / } / const { / title, / description = "Planning and organization for overwhelmed minds.", / image = "/og-default..."
- After: 171 lines | 5,600 chars | hash b910ee82481d | preview: "--- / interface Props { / title: string; / description?: string; / image?: string; / noindex?: boolean; / } / const { / title, / description = "Planning and organization for overwhelmed minds.", / image = "/og-default..."
- Previous fragment: "<div> / <h3>About</h3> / <a href="/about">About SteadyFocusCo</a> / </div> / <div> / <h3>Free tools</h3> / <a href="/tools/brain-dump">Brain dump tool</a> / <a href="/tools/week..."
- Current fragment: "<div> / <h3>Free tools</h3> / <a href="/tools/brain-dump">Brain dump tool</a> / <a href="/tools/weekly-reset">Weekly reset</a> / <a href="/printables">All printables</a> / </div..."


## Hot Files
- src/layouts/Base.astro (11 tracked changes)
- src/pages/shop.astro (3 tracked changes)
- .gitignore (2 tracked changes)
- astro.config.mjs (2 tracked changes)
- package.json (2 tracked changes)
- src/pages/guides/[slug].astro (2 tracked changes)
- src/pages/printables/[slug].astro (2 tracked changes)
- .env.example (1 tracked changes)

## Git Snapshot
- Branch: main
- HEAD: 2026-08-10 12b55be Add Cloudflare Web Analytics tracking
- Working tree summary: 6 modifieds, 1 untracked
- M .gitignore
- M graphify-out/WORKSPACE_MEMORY.md
- M package-lock.json
- M package.json
- M workspace.json
- M workspacememory.md
- ?? scripts/generate-pins.mjs

## GitHub Snapshot
GitHub Repository: arslankhanwazir/steadyfocusco
Visibility: public | Default branch: main
Stars: 0 | Forks: 0 | Open issues: 0

Latest commit on main:
- 12b55be by Arslan Khan on 2026-08-10
  Add Cloudflare Web Analytics tracking

URL: https://github.com/arslankhanwazir/steadyfocusco

## Graphify Snapshot
Graphify report not found. Generate Graphify output if you want architecture-aware memory excerpts here.

## Project Planner
- Project planner is not configured yet. Enable it in the chat panel to generate a time-based todo list and progress rescue briefs.

## Agent Notes
- If a future task asks what changed recently, start with `Recent Changes`, `Tracked Snapshots`, `Hot Files`, and `Git Snapshot`.
- If a future task asks how the project is organized, combine this file with `graphify-out/GRAPH_REPORT.md`.
- If a future task needs repository-level context, use `Package Snapshot`, the GitHub snapshot, and the Graphify snapshot before rescanning broad parts of the repo.
