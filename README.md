# SteadyFocusCo

ADHD-friendly planners, printable productivity resources, and free tools designed to reduce overwhelm and make planning easier.

SteadyFocusCo is a digital planning and productivity resource for people who find traditional planning systems overwhelming. It provides ADHD-friendly printable planners, free interactive tools, executive-function resources, student planning resources, and practical guides — all built around the idea that organization should work _with_ how your brain actually functions, not against it.

**Website:** https://steadyfocusco.relaxin.workers.dev/
**Etsy shop:** https://steadyfocusco.etsy.com/

---

## What the site provides

- **Free interactive tools** — browser-based, private, no sign-up:
  - [Brain Dump](https://steadyfocusco.relaxin.workers.dev/tools/brain-dump) — empty your head and auto-sort thoughts into Do Now, Deadline, Quick Task, Later, and Not Sure.
  - [Weekly Reset](https://steadyfocusco.relaxin.workers.dev/tools/weekly-reset) — turn a scattered week into a calm plan with top-3 priorities and a day-by-day grid.
  - [Morning Routine Builder](https://steadyfocusco.relaxin.workers.dev/tools/morning-routine) — build a short, realistic morning sequence with start times.
- **Free printables** — reusable one-page sheets (brain dump, weekly reset, homework checklist, morning checklist) you can print at home or annotate digitally.
- **Practical guides** — plain-language articles on ADHD planning, weekly planning, study skills, routines, and executive function.
- **Printable planners** — matching, reusable planners sold through the SteadyFocusCo Etsy shop. All purchases happen on Etsy; the site never processes payments.

## Content categories

- **ADHD planning** — routines and systems built around how an ADHD brain works.
- **Students** — homework, study planning, and breaking big assignments into startable steps.
- **Productivity** — weekly planning, prioritization, and routines that don't rely on willpower.

## Technology stack

- [Astro](https://astro.build) — static site generation
- [React](https://react.dev) — interactive tool islands
- [jsPDF](https://github.com/parallax/jsPDF) — client-side PDF export for the tools
- [Three.js](https://threejs.org) — hero visuals
- [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) — sitemap generation
- [Cloudflare Workers](https://workers.cloudflare.com) — deployment (via `wrangler.jsonc`)

## Project structure

```text
/
├── public/
│   ├── favicon.svg
│   ├── logo.png
│   ├── llms.txt          # LLM-friendly site overview
│   ├── robots.txt
│   └── products/         # product imagery
├── scripts/
│   ├── sync-etsy-products.js   # build-time Etsy shop sync (read-only)
│   ├── etsy-oauth.mjs          # OAuth token helper (developer tool)
│   └── generate-pins.mjs       # Pinterest pin generator
├── src/
│   ├── components/
│   │   ├── BrainDump.tsx
│   │   ├── WeeklyReset.tsx
│   │   ├── MorningRoutine.tsx
│   │   ├── ToolShell.astro
│   │   └── ClusterHub.astro
│   ├── data/
│   │   ├── site.ts       # single source of truth for tools/guides/printables
│   │   ├── schema.ts     # JSON-LD schema builders
│   │   └── products.json # synced Etsy products (seed committed)
│   ├── layouts/
│   │   └── Base.astro    # global layout + SEO head
│   └── pages/
│       ├── index.astro
│       ├── adhd.astro
│       ├── students.astro
│       ├── productivity.astro
│       ├── about.astro
│       ├── shop.astro
│       ├── 404.astro
│       ├── guides/
│       ├── printables/
│       └── tools/
└── package.json
```

## Development

```bash
npm install        # install dependencies
npm run dev        # start local dev server at localhost:4321
npm run build      # build production site to ./dist/
npm run preview    # preview the production build locally
```

The build runs `scripts/sync-etsy-products.js` first (via `prebuild`). If Etsy credentials are not configured, the committed seed `src/data/products.json` is used so the build always succeeds.

### Etsy shop sync (optional)

The shop page pulls active listings from the SteadyFocusCo Etsy shop at build time. To enable live sync, set these in a local `.env` (gitignored):

- `ETSY_API_KEY`
- `ETSY_SHARED_SECRET`
- `ETSY_ACCESS_TOKEN`
- `ETSY_SHOP_ID` (or `ETSY_SHOP_NAME`)

See `scripts/sync-etsy-products.js` and `scripts/etsy-oauth.mjs` for details. Never commit `.env` or any credentials.

## Deployment

The site is deployed to Cloudflare Workers. The `wrangler.jsonc` config serves the `./dist/` output. The canonical production URL is configured in `astro.config.mjs` via the `SITE_URL` environment variable (defaults to `https://steadyfocusco.relaxin.workers.dev`).

## License

All content and code in this repository are © SteadyFocusCo. The printable planners are sold through the SteadyFocusCo Etsy shop.
