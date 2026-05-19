# DSA Revision Tracker

A minimal single-page app to track DSA problems with spaced repetition (2d → 7d → 21d → 60d → mastered).

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Recharts
- localStorage persistence

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Features

- **Day counter** — manually advance your study day (+/− or `]` / `[`)
- **Question table** — sort by due/overdue first, color-coded rows
- **Spaced repetition** — 2d, 7d, 21d, 60d intervals; mark reviewed to advance
- **Filters & search** — topic, platform, difficulty, due today; `/` focuses search
- **Stats & charts** — totals, topic bar chart, difficulty pie chart
- **Backup** — export/import JSON
- **Shortcuts** — `n` add question, `/` search, `]`/`[` day ±

## Data

Stored under `localStorage` key `dsa-revision-tracker`.
# dsa-revision-tracker
