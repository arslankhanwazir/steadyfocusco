# Workspace Memory
This file is maintained automatically by Code Janitor so Claude, Codex, Bob, and any other AI agent can reuse repo context without rescanning everything from scratch.
Generated: 2026-08-09T23:30:53.453Z
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
- Last activity: 2026-08-09T23:30:50.975Z
## Workspace Focus
- Active file in focus: src/layouts/Base.astro
- Hottest files right now: src/layouts/Base.astro (7), astro.config.mjs (3), src/data/products.json (2), .env.example (1)
- Suggested starting points: src/layouts/Base.astro, astro.config.mjs, src/data/products.json, .env.example, .gitignore, package.json
## Current Workspace
- Active file: src/layouts/Base.astro
- Tracked files in snapshot: 55
- Top-level areas: src (24), [root] (14), public (12), .astro (4), scripts (1)
- Primary file types: .astro (17), .png (9), .json (6), .md (4), .ts (4), .tsx (3), [no extension] (2), .css (1)
- Key files: .gitignore, AGENTS.md, README.md, package-lock.json, package.json, tsconfig.json
## Package Snapshot
- Package: steadyfocusco v0.0.1
- Package manager: not declared
- Scripts: dev, sync:etsy, prebuild, build, preview, astro
- Runtime dependencies: @astrojs/react, @astrojs/sitemap, @types/react, @types/react-dom, astro, jspdf, react, react-dom
- Dev dependencies: none declared
## Current Stack
- Logged change events: 37
- Change mix: save (37)
- Remembered file snapshots: 27
- Working tree summary: 4 modifieds, 1 untracked
## Tracked Snapshots
- src/layouts/Base.astro | 168 lines | 5544 chars | hash d3ebdd08b4d4
  Last snapshot: 2026-08-09T23:30:50.975Z
  Preview: "--- / interface Props { / title: string; / description?: string; / image?: string; / noindex?: boolean; / } / const { / title, / description = "Planning and organization for overwhelmed minds.", / image = "/og-default..."
- src/pages/about.astro | 80 lines | 2379 chars | hash fff9ab106247
  Last snapshot: 2026-08-09T23:30:34.873Z
  Preview: "--- / import Base from "../layouts/Base.astro"; / --- / <Base / title="About SteadyFocusCo" / description="Planning and organization tools for overwhelmed minds. SteadyFocusCo creates printable planners and free digit..."
- astro.config.mjs | 18 lines | 560 chars | hash 66865e2d14b1
  Last snapshot: 2026-08-09T23:12:44.953Z
  Preview: "// @ts-check / import { defineConfig } from "astro/config"; / import react from "@astrojs/react"; / import sitemap from "@astrojs/sitemap"; / // Canonical production URL. Used by @astrojs/sitemap and Open Graph tags...."
- src/data/products.json | 80 lines | 3070 chars | hash 795c1c2e0e15
  Last snapshot: 2026-08-09T22:18:11.614Z
  Preview: "{ / "source": "seed", / "shop": "steadyfocusco", / "syncedAt": null, / "note": "Fallback seed used when the Etsy API sync has not run (no credentials). Titles/prices are from the shop's own listing list; image is null..."
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

## Recent Changes
### 2026-08-09T23:30:50.975Z | saved | src/layouts/Base.astro
- Summary: Line 58: replaced 20 lines with 22 lines.
- Before: 166 lines | 5,483 chars | hash 90884aa250a0 | preview: "--- / interface Props { / title: string; / description?: string; / image?: string; / noindex?: boolean; / } / const { / title, / description = "Planning and organization for overwhelmed minds.", / image = "/og-default..."
- After: 168 lines | 5,544 chars | hash d3ebdd08b4d4 | preview: "--- / interface Props { / title: string; / description?: string; / image?: string; / noindex?: boolean; / } / const { / title, / description = "Planning and organization for overwhelmed minds.", / image = "/og-default..."
- Previous fragment: "tools">Tools</a> / <a href="/adhd">ADHD</a> / <a href="/students">Students</a> / <a href="/productivity">Productivity</a> / <a href="/printables">Free printables</a> / <a href="..."
- Current fragment: "about">About</a> / <a href="/tools">Tools</a> / <a href="/adhd">ADHD</a> / <a href="/students">Students</a> / <a href="/productivity">Productivity</a> / <a href="/printables">Fr..."

### 2026-08-09T23:30:34.873Z | saved | src/pages/about.astro
- Summary: Line 1: inserted 80 lines.
- Before: 0 lines | 0 chars | hash empty
- After: 80 lines | 2,379 chars | hash fff9ab106247 | preview: "--- / import Base from "../layouts/Base.astro"; / --- / <Base / title="About SteadyFocusCo" / description="Planning and organization tools for overwhelmed minds. SteadyFocusCo creates printable planners and free digit..."
- Current fragment: "--- / import Base from "../layouts/Base.astro"; / --- / <Base / title="About SteadyFocusCo" / description="Planning and organization tools for overwhelmed minds. SteadyFocusCo c..."

### 2026-08-09T23:25:07.743Z | saved | src/layouts/Base.astro
- Summary: Line 62: replaced 19 lines with 21 lines.
- Before: 164 lines | 5,424 chars | hash e3a4137688aa | preview: "--- / interface Props { / title: string; / description?: string; / image?: string; / noindex?: boolean; / } / const { / title, / description = "Planning and organization for overwhelmed minds.", / image = "/og-default..."
- After: 166 lines | 5,483 chars | hash 90884aa250a0 | preview: "--- / interface Props { / title: string; / description?: string; / image?: string; / noindex?: boolean; / } / const { / title, / description = "Planning and organization for overwhelmed minds.", / image = "/og-default..."
- Previous fragment: "shop">Shop</a> / <a href="/printables">Free printables</a> / </nav> / </header> / <main> / <slot /> / </main> / <footer class="site-footer"> / <div class="footer-grid"> / <div>..."
- Current fragment: "printables">Free printables</a> / <a href="/guides">Guides</a> / <a href="/shop">Shop</a> / </nav> / </header> / <main> / <slot /> / </main> / <footer class="site-footer"> / <di..."

### 2026-08-09T23:12:44.953Z | saved | astro.config.mjs
- Summary: Saved without a textual diff.
- Before: 18 lines | 560 chars | hash 66865e2d14b1 | preview: "// @ts-check / import { defineConfig } from "astro/config"; / import react from "@astrojs/react"; / import sitemap from "@astrojs/sitemap"; / // Canonical production URL. Used by @astrojs/sitemap and Open Graph tags...."
- After: 18 lines | 560 chars | hash 66865e2d14b1 | preview: "// @ts-check / import { defineConfig } from "astro/config"; / import react from "@astrojs/react"; / import sitemap from "@astrojs/sitemap"; / // Canonical production URL. Used by @astrojs/sitemap and Open Graph tags...."

### 2026-08-09T23:11:30.558Z | saved | astro.config.mjs
- Summary: Line 10: replaced 1 line with 1 line.
- Before: 17 lines | 542 chars | hash 42d22fe6dc71 | preview: "// @ts-check / import { defineConfig } from "astro/config"; / import react from "@astrojs/react"; / import sitemap from "@astrojs/sitemap"; / // Canonical production URL. Used by @astrojs/sitemap and Open Graph tags...."
- After: 17 lines | 558 chars | hash 2255055001ac | preview: "// @ts-check / import { defineConfig } from "astro/config"; / import react from "@astrojs/react"; / import sitemap from "@astrojs/sitemap"; / // Canonical production URL. Used by @astrojs/sitemap and Open Graph tags...."
- Previous fragment: "com"
- Current fragment: "relaxin.workers.dev"

### 2026-08-09T23:07:51.429Z | saved | src/layouts/Base.astro
- Summary: Saved without a textual diff.
- Before: 164 lines | 5,424 chars | hash e3a4137688aa | preview: "--- / interface Props { / title: string; / description?: string; / image?: string; / noindex?: boolean; / } / const { / title, / description = "Planning and organization for overwhelmed minds.", / image = "/og-default..."
- After: 164 lines | 5,424 chars | hash e3a4137688aa | preview: "--- / interface Props { / title: string; / description?: string; / image?: string; / noindex?: boolean; / } / const { / title, / description = "Planning and organization for overwhelmed minds.", / image = "/og-default..."

### 2026-08-09T23:07:48.746Z | saved | src/layouts/Base.astro
- Summary: Line 23: inserted 2 lines.
- Before: 163 lines | 5,327 chars | hash 3eefbe2eebf1 | preview: "--- / interface Props { / title: string; / description?: string; / image?: string; / noindex?: boolean; / } / const { / title, / description = "Planning and organization for overwhelmed minds.", / image = "/og-default..."
- After: 164 lines | 5,424 chars | hash e3a4137688aa | preview: "--- / interface Props { / title: string; / description?: string; / image?: string; / noindex?: boolean; / } / const { / title, / description = "Planning and organization for overwhelmed minds.", / image = "/og-default..."
- Current fragment: "name="google-site-verification" content="QJ02ejQK4bJekfic7ioaURgpabVe2ZKv5xawxMWiic8" /> / <meta"

### 2026-08-09T22:27:04.885Z | saved | src/layouts/Base.astro
- Summary: Line 61: inserted 2 lines.
- Before: 162 lines | 5,299 chars | hash 55fe1049d438 | preview: "--- / interface Props { / title: string; / description?: string; / image?: string; / noindex?: boolean; / } / const { / title, / description = "Planning and organization for overwhelmed minds.", / image = "/og-default..."
- After: 163 lines | 5,327 chars | hash 3eefbe2eebf1 | preview: "--- / interface Props { / title: string; / description?: string; / image?: string; / noindex?: boolean; / } / const { / title, / description = "Planning and organization for overwhelmed minds.", / image = "/og-default..."
- Current fragment: "shop">Shop</a> / <a href="/"

### 2026-08-09T22:18:11.614Z | saved | src/data/products.json
- Summary: Line 12: replaced 64 lines with 64 lines.
- Before: 80 lines | 2,852 chars | hash 210f5913e839 | preview: "{ / "source": "seed", / "shop": "steadyfocusco", / "syncedAt": null, / "note": "Fallback seed used when the Etsy API sync has not run (no credentials). Titles/prices are from the shop's own listing list; image is null..."
- After: 80 lines | 3,070 chars | hash 795c1c2e0e15 | preview: "{ / "source": "seed", / "shop": "steadyfocusco", / "syncedAt": null, / "note": "Fallback seed used when the Etsy API sync has not run (no credentials). Titles/prices are from the shop's own listing list; image is null..."
- Previous fragment: "null, / "url": "https://steadyfocusco.etsy.com", / "cluster": "students" / }, / { / "listing_id": null, / "title": "ADHD Brain Dump Printable (Homework Reset System)", / "price"..."
- Current fragment: ""/products/bundle.png", / "url": "https://steadyfocusco.etsy.com", / "cluster": "students" / }, / { / "listing_id": null, / "title": "ADHD Brain Dump Printable (Homework Reset S..."

### 2026-08-09T22:17:48.237Z | saved | src/layouts/Base.astro
- Summary: Line 51: replaced 78 lines with 83 lines.
- Before: 157 lines | 5,082 chars | hash 8500ecb91573 | preview: "--- / interface Props { / title: string; / description?: string; / image?: string; / noindex?: boolean; / } / const { / title, / description = "Planning and organization for overwhelmed minds.", / image = "/og-default..."
- After: 162 lines | 5,299 chars | hash 55fe1049d438 | preview: "--- / interface Props { / title: string; / description?: string; / image?: string; / noindex?: boolean; / } / const { / title, / description = "Planning and organization for overwhelmed minds.", / image = "/og-default..."
- Previous fragment: "<header class="site-header"> / <a href="/" class="brand">SteadyFocus<span>Co</span></a> / <nav> / <a href="/tools">Tools</a> / <a href="/adhd">ADHD</a> / <a href="/students">Stu..."
- Current fragment: "<header class="site-header"> / <a href="/" class="brand"> / <img src="/logo.png" alt="SteadyFocusCo" class="brand-logo" /> / <span class="brand-text">SteadyFocus<span>Co</span><..."

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


## Hot Files
- src/layouts/Base.astro (7 tracked changes)
- astro.config.mjs (3 tracked changes)
- src/data/products.json (2 tracked changes)
- .env.example (1 tracked changes)
- .gitignore (1 tracked changes)
- package.json (1 tracked changes)
- scripts/sync-etsy-products.js (1 tracked changes)
- src/components/BrainDump.tsx (1 tracked changes)

## Git Snapshot
- Branch: main
- HEAD: 2026-08-10 c9aee4a add guides link to nav and footer
- Working tree summary: 4 modifieds, 1 untracked
- M graphify-out/WORKSPACE_MEMORY.md
- M src/layouts/Base.astro
- M workspace.json
- M workspacememory.md
- ?? src/pages/about.astro

## GitHub Snapshot
GitHub Repository: arslankhanwazir/steadyfocusco
Visibility: public | Default branch: main
Stars: 0 | Forks: 0 | Open issues: 0

Latest commit on main:
- c9aee4a by Arslan Khan on 2026-08-09
  add guides link to nav and footer

URL: https://github.com/arslankhanwazir/steadyfocusco

## Graphify Snapshot
Graphify report not found. Generate Graphify output if you want architecture-aware memory excerpts here.

## Project Planner
- Project planner is not configured yet. Enable it in the chat panel to generate a time-based todo list and progress rescue briefs.

## Agent Notes
- If a future task asks what changed recently, start with `Recent Changes`, `Tracked Snapshots`, `Hot Files`, and `Git Snapshot`.
- If a future task asks how the project is organized, combine this file with `graphify-out/GRAPH_REPORT.md`.
- If a future task needs repository-level context, use `Package Snapshot`, the GitHub snapshot, and the Graphify snapshot before rescanning broad parts of the repo.
