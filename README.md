# SteadyFocusCo

A digital planning resource providing ADHD-friendly printable planners, free productivity tools, executive-function resources, student planning resources, and practical guides designed to reduce overwhelm and make planning easier to follow.

## Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       ├── index.astro
│       ├── adhd.astro
│       ├── students.astro
│       ├── productivity.astro
│       ├── guides/
│       │   └── [slug].astro
│       ├── about.astro
│       └── tools/
│           ├── brain-dump.astro
│           ├── weekly-reset.astro
│           └── morning-routine.astro
│       └── printables/
│           └── [slug].astro
├── src/
│   ├── components/
│   │   ├── Base.astro
│       ├── ClusterHub.astro
│       ├── BrainDump.tsx
│       ├── WeeklyReset.tsx
│       ├── MorningRoutine.tsx
│       └── ToolShell.astro
│   ├── data/
│   │   ├── schema.ts
│   │   ├── site.ts
│   │   └── products.json
│   └── layouts/
│       └── Base.astro
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── logo.png
│   └── llms.txt
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!
