<img width="1920" height="1080" alt="DSA Revision Tracker screenshot" src="https://github.com/user-attachments/assets/a364a6c8-3834-4bf0-9c01-c469e3e36919" />

# DSA Revision Tracker

A desktop-first app for tracking DSA interview problems with spaced repetition (2d → 7d → 21d → 60d → mastered). Built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Tauri 2**, with **JSON-based** local storage and backup.

**Repository:** [github.com/Anxhul10/dsa-revision-tracker](https://github.com/Anxhul10/dsa-revision-tracker)  
**Note:** This repository is currently **private**. Clone access requires permission from the owner.

---

## Installation

Install **Node.js 18+** and **npm** before cloning the project. These steps cover runtime prerequisites only.

### Linux

Tested on **Fedora Linux**. Should also work on Ubuntu, Debian, Arch Linux, Pop!_OS, and other modern distributions.

**Fedora / RHEL**

```bash
sudo dnf install nodejs npm
```

**Ubuntu / Debian**

```bash
sudo apt update
sudo apt install nodejs npm
```

**Arch Linux**

```bash
sudo pacman -S nodejs npm
```

Verify:

```bash
node --version
npm --version
```

> **Desktop builds (optional):** To compile the native app on Linux, also install [Rust](https://rustup.rs/) and Fedora build deps (`webkit2gtk4.1-devel`, `libsoup3-devel`, etc.). Web-only development needs only Node.js and npm.

### Windows

1. Download **Node.js LTS** from [nodejs.org](https://nodejs.org/).
2. Run the installer (include **npm** and “Add to PATH”).
3. Open **PowerShell** or **Command Prompt** and verify:

```powershell
node --version
npm --version
```

> **Desktop builds (optional):** Install [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) and [WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/) to run `npm run desktop:dev`.

### macOS

Install Node.js with [Homebrew](https://brew.sh/):

```bash
brew install node
```

Verify:

```bash
node --version
npm --version
```

> **Desktop builds (optional):** Install Rust via [rustup.rs](https://rustup.rs/) for the Tauri desktop shell on macOS.

---

## Development Setup

### Linux

```bash
git clone https://github.com/Anxhul10/dsa-revision-tracker.git
cd dsa-revision-tracker
npm install
```

**Web UI only**

```bash
npm run dev
```

**Full desktop app (Tauri)**

```bash
source "$HOME/.cargo/env"   # if Rust was just installed
npm run desktop:dev
```

### Windows

```powershell
git clone https://github.com/Anxhul10/dsa-revision-tracker.git
cd dsa-revision-tracker
npm install
```

**Web UI only**

```powershell
npm run dev
```

**Full desktop app (Tauri)**

```powershell
npm run desktop:dev
```

### macOS

```bash
git clone https://github.com/Anxhul10/dsa-revision-tracker.git
cd dsa-revision-tracker
npm install
```

**Web UI only**

```bash
npm run dev
```

**Full desktop app (Tauri)**

```bash
npm run desktop:dev
```

---

## Running the Project

| Command | What it does |
|---------|----------------|
| `npm run dev` | Starts the Vite dev server (browser) |
| `npm run desktop:dev` | Runs the Tauri desktop app with hot reload |
| `npm run build` | Production build of the frontend |
| `npm run desktop:build` | Builds installable desktop packages (`.rpm`, `.deb`, `.msi`, `.exe`) |

**Local URL (web dev):** [http://localhost:1420](http://localhost:1420)

Open that address in your browser after `npm run dev`. The desktop app opens its own window when you use `npm run desktop:dev`.

**Data:** Progress is stored locally (`localStorage`). Use **Export JSON** / **Import JSON** in the app to back up or move your data.

---

## License

This project is private. Licensing and redistribution terms are defined by the repository owner. Contact the maintainer for permission to use, fork, or distribute the code.
