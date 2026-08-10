# Workspace Memory
This file is maintained automatically by Code Janitor so Claude, Codex, Bob, and any other AI agent can reuse repo context without rescanning everything from scratch.
Generated: 2026-08-10T10:21:58.855Z
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
- Last activity: 2026-08-10T10:21:55.743Z
## Workspace Focus
- Active file in focus: src/pages/index.astro
- Hottest files right now: src/pages/index.astro (13), src/layouts/Base.astro (12), astro.config.mjs (2), scripts/generate-pins.mjs (2)
- Suggested starting points: src/pages/index.astro, src/layouts/Base.astro, astro.config.mjs, scripts/generate-pins.mjs, src/pages/shop.astro, .gitignore
## Current Workspace
- Active file: src/pages/index.astro
- Tracked files in snapshot: 99
- Top-level areas: pins-out (42), src (25), [root] (14), public (12), .astro (4), scripts (2)
- Primary file types: .png (51), .astro (17), .json (6), .ts (5), .md (4), .tsx (3), .mjs (2), [no extension] (2)
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
- Remembered file snapshots: 30
- Working tree summary: 6 modifieds, 1 untracked
## Tracked Snapshots
- src/pages/index.astro | 674 lines | 16298 chars | hash 4d62c724beab
  Last snapshot: 2026-08-10T10:21:55.743Z
  Preview: "--- / import Base from '../layouts/Base.astro'; / import { etsyLink } from '../data/site'; / const tools = [ / { name: "Brain Dump", desc: "Clear the noise.", href: "/tools/brain-dump", tag: "ADHD" }, / { name: "Weekl..."
- src/components/Hero3D.ts | 336 lines | 10866 chars | hash edc2e797f06b
  Last snapshot: 2026-08-10T10:08:07.220Z
  Preview: "// Three.js hero scene: a persistent "thought cloud" with floating task objects. / // Scattered state -> organized zones (DO NOW / DEADLINE / LATER) -> hold -> return. / // Fully self-contained, GPU-accelerated, respe..."
- src/layouts/Base.astro | 379 lines | 8472 chars | hash bb69a176e591
  Last snapshot: 2026-08-10T01:51:42.943Z
  Preview: "--- / interface Props { / title: string; / description?: string; / image?: string; / noindex?: boolean; / } / const { / title, / description = "Planning and organization for overwhelmed minds.", / image = "/og-default..."
- scripts/generate-pins.mjs | 478 lines | 15189 chars | hash c6679cf02fd1
  Last snapshot: 2026-08-10T00:21:50.923Z
  Preview: "#!/usr/bin/env node / /** / * SteadyFocusCo Pinterest Pin Generator / * / * Generates 1000×1500 PNG pins for guides, tools, and printables. / * Reads content from src/data/site.ts and outputs to pins-out/. / */ / impo..."
- .gitignore | 29 lines | 293 chars | hash 4a2ad0bea3f9
  Last snapshot: 2026-08-10T00:16:34.098Z
  Preview: "# build output / dist/ / .output/ / # generated assets / pins-out/ / # dependencies / node_modules/ / # astro / .astro/ / # secrets — never commit / .env / .env.* / !.env.example / # logs / os / npm-debug.log* / *.log..."
- package.json | 29 lines | 675 chars | hash 25a4b7e4097e
  Last snapshot: 2026-08-10T00:15:02.721Z
  Preview: "{ / "name": "steadyfocusco", / "type": "module", / "version": "0.0.1", / "engines": { / "node": ">=22.12.0" / }, / "scripts": { / "dev": "astro dev", / "sync:etsy": "node scripts/sync-etsy-products.js", / "prebuild":..."
- src/pages/printables/[slug].astro | 365 lines | 8938 chars | hash 143cda39f4a6
  Last snapshot: 2026-08-09T23:52:45.393Z
  Preview: "--- / import Base from "../../layouts/Base.astro"; / import { / printables, / toolBySlug, / etsyLink, / type Printable, / } from "../../data/site"; / export function getStaticPaths() { / return printables.map((p) => (..."
- src/pages/guides/[slug].astro | 133 lines | 3401 chars | hash 8c17dea9f74b
  Last snapshot: 2026-08-09T23:51:55.003Z
  Preview: "--- / import Base from "../../layouts/Base.astro"; / import { guides, etsyLink } from "../../data/site"; / export function getStaticPaths() { / return guides.map((g) => ({ params: { slug: g.slug } })); / } / const { s..."

## Recent Changes
### 2026-08-10T10:21:55.743Z | saved | src/pages/index.astro
- Summary: Line 666: removed 4 lines.
- Before: 677 lines | 16,336 chars | hash 343389669a26 | preview: "--- / import Base from '../layouts/Base.astro'; / import { etsyLink } from '../data/site'; / const tools = [ / { name: "Brain Dump", desc: "Clear the noise.", href: "/tools/brain-dump", tag: "ADHD" }, / { name: "Weekl..."
- After: 674 lines | 16,298 chars | hash 4d62c724beab | preview: "--- / import Base from '../layouts/Base.astro'; / import { etsyLink } from '../data/site'; / const tools = [ / { name: "Brain Dump", desc: "Clear the noise.", href: "/tools/brain-dump", tag: "ADHD" }, / { name: "Weekl..."
- Previous fragment: "thought { / transition: none; / } / ."

### 2026-08-10T10:21:25.955Z | saved | src/pages/index.astro
- Summary: Line 637: removed 8 lines.
- Before: 684 lines | 16,447 chars | hash 31d62348df34 | preview: "--- / import Base from '../layouts/Base.astro'; / import { etsyLink } from '../data/site'; / const tools = [ / { name: "Brain Dump", desc: "Clear the noise.", href: "/tools/brain-dump", tag: "ADHD" }, / { name: "Weekl..."
- After: 677 lines | 16,336 chars | hash 343389669a26 | preview: "--- / import Base from '../layouts/Base.astro'; / import { etsyLink } from '../data/site'; / const tools = [ / { name: "Brain Dump", desc: "Clear the noise.", href: "/tools/brain-dump", tag: "ADHD" }, / { name: "Weekl..."
- Previous fragment: "stage-sorter { / grid-template-columns: 1fr; / gap: 0.75rem; / } / .sorter-col { / min-height: auto; / } / ."

### 2026-08-10T10:20:55.398Z | saved | src/pages/index.astro
- Summary: Line 279: replaced 94 lines with 11 lines.
- Before: 767 lines | 18,612 chars | hash f161ff202bc0 | preview: "--- / import Base from '../layouts/Base.astro'; / import { etsyLink } from '../data/site'; / const tools = [ / { name: "Brain Dump", desc: "Clear the noise.", href: "/tools/brain-dump", tag: "ADHD" }, / { name: "Weekl..."
- After: 684 lines | 16,447 chars | hash 31d62348df34 | preview: "--- / import Base from '../layouts/Base.astro'; / import { etsyLink } from '../data/site'; / const tools = [ / { name: "Brain Dump", desc: "Clear the noise.", href: "/tools/brain-dump", tag: "ADHD" }, / { name: "Weekl..."
- Previous fragment: "stage */ / .hero-stage { / position: relative; / height: 560px; / perspective: 1200px; / } / .stage-glow { / position: absolute; / inset: 0; / background: radial-gradient(ellips..."
- Current fragment: "3D stage */ / .hero-stage { / position: relative; / height: 560px; / border-radius: 32px; / overflow: hidden; / } / .hero-stage canvas { / display: block; / width: 100%; / heigh..."

### 2026-08-10T10:11:49.380Z | saved | src/pages/index.astro
- Summary: Line 162: replaced 46 lines with 8 lines.
- Before: 805 lines | 20,067 chars | hash 80c0f4e40da7 | preview: "--- / import Base from '../layouts/Base.astro'; / import { etsyLink } from '../data/site'; / const tools = [ / { name: "Brain Dump", desc: "Clear the noise.", href: "/tools/brain-dump", tag: "ADHD" }, / { name: "Weekl..."
- After: 767 lines | 18,612 chars | hash f161ff202bc0 | preview: "--- / import Base from '../layouts/Base.astro'; / import { etsyLink } from '../data/site'; / const tools = [ / { name: "Brain Dump", desc: "Clear the noise.", href: "/tools/brain-dump", tag: "ADHD" }, / { name: "Weekl..."
- Previous fragment: "is:inline> / // ---- Hero thought-sorting animation ---- / document.addEventListener('DOMContentLoaded', () => { / const stage = document.getElementById('stage'); / if (!stage)..."
- Current fragment: "> / import { initHero3D } from '../components/Hero3D'; / // ---- Persistent 3D hero visual ---- / const container = document.getElementById('hero3d'); / if (container) { / initH..."

### 2026-08-10T10:10:42.705Z | saved | src/pages/index.astro
- Summary: Line 33: replaced 28 lines with 2 lines.
- Before: 831 lines | 21,135 chars | hash e29befa48040 | preview: "--- / import Base from '../layouts/Base.astro'; / import { etsyLink } from '../data/site'; / const tools = [ / { name: "Brain Dump", desc: "Clear the noise.", href: "/tools/brain-dump", tag: "ADHD" }, / { name: "Weekl..."
- After: 805 lines | 20,067 chars | hash 80c0f4e40da7 | preview: "--- / import Base from '../layouts/Base.astro'; / import { etsyLink } from '../data/site'; / const tools = [ / { name: "Brain Dump", desc: "Clear the noise.", href: "/tools/brain-dump", tag: "ADHD" }, / { name: "Weekl..."
- Previous fragment: "Immersive thought-sorting environment --> / <div class="hero-stage" id="stage" aria-label="Interactive thought sorting demonstration"> / <div class="stage-glow"></div> / <div cl..."
- Current fragment: "Persistent 3D thought-cloud visual (Three.js) --> / <div class="hero-stage" id="hero3d" aria-label="Interactive 3D thought sorting demonstration">"

### 2026-08-10T10:08:07.220Z | saved | src/components/Hero3D.ts
- Summary: Line 1: inserted 336 lines.
- Before: 0 lines | 0 chars | hash empty
- After: 336 lines | 10,866 chars | hash edc2e797f06b | preview: "// Three.js hero scene: a persistent "thought cloud" with floating task objects. / // Scattered state -> organized zones (DO NOW / DEADLINE / LATER) -> hold -> return. / // Fully self-contained, GPU-accelerated, respe..."
- Current fragment: "// Three.js hero scene: a persistent "thought cloud" with floating task objects. / // Scattered state -> organized zones (DO NOW / DEADLINE / LATER) -> hold -> return. / // Full..."

### 2026-08-10T02:01:17.976Z | saved | src/pages/index.astro
- Summary: Line 5: replaced 678 lines with 824 lines.
- Before: 685 lines | 16,505 chars | hash 50494a6556dd | preview: "--- / import Base from '../layouts/Base.astro'; / import { etsyLink } from '../data/site'; / const intents = [ / { label: "Clear my head", href: "/tools/brain-dump" }, / { label: "Plan my week", href: "/tools/weekly-r..."
- After: 831 lines | 21,135 chars | hash e29befa48040 | preview: "--- / import Base from '../layouts/Base.astro'; / import { etsyLink } from '../data/site'; / const tools = [ / { name: "Brain Dump", desc: "Clear the noise.", href: "/tools/brain-dump", tag: "ADHD" }, / { name: "Weekl..."
- Previous fragment: "intents = [ / { label: "Clear my head", href: "/tools/brain-dump" }, / { label: "Plan my week", href: "/tools/weekly-reset" }, / { label: "Get schoolwork done", href: "/students..."
- Current fragment: "tools = [ / { name: "Brain Dump", desc: "Clear the noise.", href: "/tools/brain-dump", tag: "ADHD" }, / { name: "Weekly Reset", desc: "Turn a scattered week into a clear plan.",..."

### 2026-08-10T01:54:40.129Z | saved | src/pages/index.astro
- Summary: Line 511: replaced 1 line with 1 line.
- Before: 685 lines | 16,499 chars | hash a8cbbdb85f70 | preview: "--- / import Base from '../layouts/Base.astro'; / import { etsyLink } from '../data/site'; / const intents = [ / { label: "Clear my head", href: "/tools/brain-dump" }, / { label: "Plan my week", href: "/tools/weekly-r..."
- After: 685 lines | 16,505 chars | hash 50494a6556dd | preview: "--- / import Base from '../layouts/Base.astro'; / import { etsyLink } from '../data/site'; / const intents = [ / { label: "Clear my head", href: "/tools/brain-dump" }, / { label: "Plan my week", href: "/tools/weekly-r..."
- Previous fragment: "bg-warm"
- Current fragment: "primary-light"

### 2026-08-10T01:54:04.022Z | saved | src/pages/index.astro
- Summary: Line 568: replaced 3 lines with 5 lines.
- Before: 683 lines | 16,417 chars | hash f536dfc8d43d | preview: "--- / import Base from '../layouts/Base.astro'; / import { etsyLink } from '../data/site'; / const intents = [ / { label: "Clear my head", href: "/tools/brain-dump" }, / { label: "Plan my week", href: "/tools/weekly-r..."
- After: 685 lines | 16,499 chars | hash a8cbbdb85f70 | preview: "--- / import Base from '../layouts/Base.astro'; / import { etsyLink } from '../data/site'; / const intents = [ / { label: "Clear my head", href: "/tools/brain-dump" }, / { label: "Plan my week", href: "/tools/weekly-r..."
- Previous fragment: "bg-warm); / border-radius: 24px; / padding: 3.5rem"
- Current fragment: "card); / border: 1px solid var(--border); / border-radius: 24px; / padding: 3.5rem; / box-shadow: 0 24px 60px rgba(28, 29, 31, 0.06)"

### 2026-08-10T01:53:30.001Z | saved | src/pages/index.astro
- Summary: Line 258: replaced 4 lines with 4 lines.
- Before: 683 lines | 16,395 chars | hash f5325fe8fd58 | preview: "--- / import Base from '../layouts/Base.astro'; / import { etsyLink } from '../data/site'; / const intents = [ / { label: "Clear my head", href: "/tools/brain-dump" }, / { label: "Plan my week", href: "/tools/weekly-r..."
- After: 683 lines | 16,417 chars | hash f536dfc8d43d | preview: "--- / import Base from '../layouts/Base.astro'; / import { etsyLink } from '../data/site'; / const intents = [ / { label: "Clear my head", href: "/tools/brain-dump" }, / { label: "Plan my week", href: "/tools/weekly-r..."
- Previous fragment: "0.9fr 1.1fr; / gap: 4rem; / align-items: center; / min-height: 80vh"
- Current fragment: "minmax(0, 0.9fr) minmax(0, 1.1fr); / gap: 4rem; / align-items: center; / min-height: auto"

### 2026-08-10T01:51:42.943Z | saved | src/layouts/Base.astro
- Summary: Line 297: removed 2 lines.
- Before: 380 lines | 8,504 chars | hash 0e9fe1710eaa | preview: "--- / interface Props { / title: string; / description?: string; / image?: string; / noindex?: boolean; / } / const { / title, / description = "Planning and organization for overwhelmed minds.", / image = "/og-default..."
- After: 379 lines | 8,472 chars | hash bb69a176e591 | preview: "--- / interface Props { / title: string; / description?: string; / image?: string; / noindex?: boolean; / } / const { / title, / description = "Planning and organization for overwhelmed minds.", / image = "/og-default..."
- Previous fragment: "margin-top: var(--space-2xl);"

### 2026-08-10T01:49:28.622Z | saved | src/layouts/Base.astro
- Summary: Line 240: replaced 10 lines with 11 lines.
- Before: 379 lines | 8,480 chars | hash 2a0637d7591b | preview: "--- / interface Props { / title: string; / description?: string; / image?: string; / noindex?: boolean; / } / const { / title, / description = "Planning and organization for overwhelmed minds.", / image = "/og-default..."
- After: 380 lines | 8,504 chars | hash 0e9fe1710eaa | preview: "--- / interface Props { / title: string; / description?: string; / image?: string; / noindex?: boolean; / } / const { / title, / description = "Planning and organization for overwhelmed minds.", / image = "/og-default..."
- Previous fragment: "2.5rem; / } / .site-header nav a { / color: var(--ink-soft); / text-decoration: none; / font-weight: 500; / font-size: 0.9rem; / transition: color var(--duration-fast) ease; / p..."
- Current fragment: "1.5rem; / } / .site-header nav a { / color: var(--ink-soft); / text-decoration: none; / font-weight: 500; / font-size: 0.85rem; / transition: color var(--duration-fast) ease; /..."

### 2026-08-10T01:49:03.768Z | saved | src/layouts/Base.astro
- Summary: Line 57: replaced 14 lines with 16 lines.
- Before: 377 lines | 8,423 chars | hash 3baf2c944f75 | preview: "--- / interface Props { / title: string; / description?: string; / image?: string; / noindex?: boolean; / } / const { / title, / description = "Planning and organization for overwhelmed minds.", / image = "/og-default..."
- After: 379 lines | 8,480 chars | hash 2a0637d7591b | preview: "--- / interface Props { / title: string; / description?: string; / image?: string; / noindex?: boolean; / } / const { / title, / description = "Planning and organization for overwhelmed minds.", / image = "/og-default..."
- Previous fragment: "a href="/" class="brand"> / <img src="/logo.png" alt="SteadyFocusCo" class="brand-logo" /> / <span class="brand-text">SteadyFocus<span>Co</span></span> / </a> / <nav> / <a href=..."
- Current fragment: "div class="site-header-inner"> / <a href="/" class="brand"> / <img src="/logo.png" alt="SteadyFocusCo" class="brand-logo" /> / <span class="brand-text">SteadyFocus<span>Co</span..."

### 2026-08-10T01:39:29.047Z | saved | src/pages/index.astro
- Summary: Line 6: replaced 220 lines with 678 lines.
- Before: 225 lines | 8,863 chars | hash cb3adaf533df | preview: "--- / import Base from '../layouts/Base.astro'; / import { etsyLink } from '../data/site'; / const intents = [ / { label: "Clear my head", href: "/tools/brain-dump", icon: "brain" }, / { label: "Plan my week", href: "..."
- After: 683 lines | 16,395 chars | hash f5325fe8fd58 | preview: "--- / import Base from '../layouts/Base.astro'; / import { etsyLink } from '../data/site'; / const intents = [ / { label: "Clear my head", href: "/tools/brain-dump" }, / { label: "Plan my week", href: "/tools/weekly-r..."
- Previous fragment: ", icon: "brain" }, / { label: "Plan my week", href: "/tools/weekly-reset", icon: "calendar" }, / { label: "Get schoolwork done", href: "/students", icon: "school" }, / { label:..."
- Current fragment: "}, / { label: "Plan my week", href: "/tools/weekly-reset" }, / { label: "Get schoolwork done", href: "/students" }, / { label: "Build a routine", href: "/tools/morning-routine"..."

### 2026-08-10T01:29:43.814Z | saved | src/layouts/Base.astro
- Summary: Line 312: removed 2 lines.
- Before: 378 lines | 8,426 chars | hash b11b5bcfb16a | preview: "--- / interface Props { / title: string; / description?: string; / image?: string; / noindex?: boolean; / } / const { / title, / description = "Planning and organization for overwhelmed minds.", / image = "/og-default..."
- After: 377 lines | 8,423 chars | hash 3baf2c944f75 | preview: "--- / interface Props { / title: string; / description?: string; / image?: string; / noindex?: boolean; / } / const { / title, / description = "Planning and organization for overwhelmed minds.", / image = "/og-default..."
- Previous fragment: "}"


## Hot Files
- src/pages/index.astro (13 tracked changes)
- src/layouts/Base.astro (12 tracked changes)
- astro.config.mjs (2 tracked changes)
- scripts/generate-pins.mjs (2 tracked changes)
- src/pages/shop.astro (2 tracked changes)
- .gitignore (1 tracked changes)
- package.json (1 tracked changes)
- src/components/BrainDump.tsx (1 tracked changes)

## Git Snapshot
- Branch: main
- HEAD: 2026-08-10 2767022 Premium art-directed homepage redesign
- Working tree summary: 6 modifieds, 1 untracked
- M graphify-out/WORKSPACE_MEMORY.md
- M package-lock.json
- M package.json
- M src/pages/index.astro
- M workspace.json
- M workspacememory.md
- ?? src/components/Hero3D.ts

## GitHub Snapshot
GitHub Repository: arslankhanwazir/steadyfocusco
Visibility: public | Default branch: main
Stars: 0 | Forks: 0 | Open issues: 0

Latest commit on main:
- 2767022 by Arslan Khan on 2026-08-10
  Premium art-directed homepage redesign

URL: https://github.com/arslankhanwazir/steadyfocusco

## Graphify Snapshot
Graphify report not found. Generate Graphify output if you want architecture-aware memory excerpts here.

## Project Planner
- Project planner is not configured yet. Enable it in the chat panel to generate a time-based todo list and progress rescue briefs.

## Agent Notes
- If a future task asks what changed recently, start with `Recent Changes`, `Tracked Snapshots`, `Hot Files`, and `Git Snapshot`.
- If a future task asks how the project is organized, combine this file with `graphify-out/GRAPH_REPORT.md`.
- If a future task needs repository-level context, use `Package Snapshot`, the GitHub snapshot, and the Graphify snapshot before rescanning broad parts of the repo.
