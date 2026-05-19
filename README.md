# DSA Revision Tracker

Desktop app for tracking DSA problems with spaced repetition (2d → 7d → 21d → 60d → mastered). Built with **React + TypeScript + Vite** and packaged for **Linux (Fedora)** and **Windows** using **[Tauri 2](https://v2.tauri.app/)** (native WebView shell, small install size).

## Stack

| Layer | Technology |
|-------|------------|
| UI | React 18, TypeScript, Tailwind CSS, Recharts |
| Build | Vite |
| Desktop | Tauri 2 (Rust) |
| Data | `localStorage` (per install) |
| Backup | Native file dialogs on desktop; browser download in web dev |

## Prerequisites

### All platforms

- [Node.js](https://nodejs.org/) 18+
- [Rust](https://www.rust-lang.org/tools/install) (via [rustup](https://rustup.rs/))

### Fedora Linux (build from source)

```bash
sudo dnf install \
  webkit2gtk4.1-devel \
  libsoup3-devel \
  openssl-devel \
  curl \
  wget \
  file \
  libappindicator-gtk3-devel \
  librsvg2-devel \
  gcc \
  gcc-c++ \
  make
```

If `pkg-config` cannot find `javascriptcoregtk-4.1`, install `webkit2gtk4.1-devel` and retry the build.

### Windows (build from source)

- [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
- [WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/) (usually preinstalled on Windows 10/11)

## Development

Install dependencies:

```bash
npm install
```

### Desktop app (recommended)

```bash
npm run desktop:dev
```

### Web only (browser, no Tauri)

```bash
npm run dev
```

Open http://localhost:1420

## Build installers

```bash
npm run desktop:build
```

Artifacts are written to `src-tauri/target/release/bundle/`:

| OS | Outputs |
|----|---------|
| **Fedora / Linux** | `.rpm`, `.deb`, `.AppImage` |
| **Windows** | `.msi`, `.exe` (setup-nsis) |

### Cross-compile notes

- Build **Linux** packages on Fedora/Linux.
- Build **Windows** `.exe` / `.msi` on Windows (or use a Windows CI runner).
- Tauri does not require shipping Chromium; it uses the system WebView (WebKitGTK on Linux, WebView2 on Windows).

## Features

- **Day counter** — advance study day (+/− or `]` / `[`) with linked calendar date
- **Question table** — sort by due/overdue, color-coded rows
- **Spaced repetition** — 2d, 7d, 21d, 60d intervals
- **Filters & search** — topic, platform, difficulty, due today
- **Stats & charts** — totals, topic bar chart, difficulty pie chart
- **Backup** — export/import JSON via native file picker in the desktop app
- **Shortcuts** — `n` add question, `/` search, `]`/`[` day ±

## Data

Stored locally under the key `dsa-revision-tracker` in the app’s WebView storage. Use **Export JSON** before reinstalling or moving machines.

## Project layout

```
src/           React UI
src-tauri/     Tauri / Rust desktop shell
public/        Static assets
```
