<img width="1920" height="1080" alt="DSA Revision Tracker screenshot" src="https://github.com/user-attachments/assets/a364a6c8-3834-4bf0-9c01-c469e3e36919" />

# DSA Revision Tracker

DSA Revision Tracker is a local-first spaced repetition app for interview prep. It tracks coding questions and theory notes separately, supports normal revision schedules and custom loop schedules, and can run as either a browser-based Vite app or a native Linux desktop app with Tauri 2.

Repository: [github.com/Anxhul10/dsa-revision-tracker](https://github.com/Anxhul10/dsa-revision-tracker)

## Features

- Track coding questions with title, problem link, platform, topic, and difficulty.
- Track theory notes with title and notes link.
- Separate collapsible `Questions` and `Theory` sections.
- Dashboard cards for total questions, due today, completed, top topic, and theory count.
- Normal coding question revision schedule: `2d -> 7d -> 21d -> 60d -> Mastered`.
- Normal theory revision schedule: `2d -> 7d -> 21d -> 30d -> 60d -> Mastered`.
- Loop mode for questions and theory notes, where the item repeats every custom number of days.
- Edit any question after adding it.
- Delete questions from the edit modal.
- Mark items as reviewed and automatically schedule their next review.
- Filters for questions by search, topic, platform, difficulty, and due/overdue state.
- JSON export/import backup.
- Local storage only. Your data stays on your machine unless you export it.

## Examples

### Normal Question

If today is Day `1` and you add:

```text
Title: Two Sum
Link: https://leetcode.com/problems/two-sum/
Platform: LeetCode
Topic: Arrays
Difficulty: Easy
Loop: off
```

The first review is scheduled for Day `3` because `1 + 2 = 3`.

After reviewing, it follows:

```text
Day 3  -> next Day 10  (3 + 7)
Day 10 -> next Day 31  (10 + 21)
Day 31 -> next Day 91  (31 + 60)
Day 91 -> Mastered
```

### Loop Question

If today is Day `64`, you add a question with Loop enabled and `Review every days = 1`, it is first due on Day `65`.

If you click `Reviewed` while current day is still Day `64`, the next review becomes Day `66`, because the app uses the later of current day and scheduled review day:

```text
max(64, 65) + 1 = 66
```

### Theory Note

If today is Day `1` and you add:

```text
Title: Graph traversal notes
Link to notes: https://...
Revision mode: Normal
```

The theory item is reviewed on:

```text
Day 3, Day 10, Day 31, Day 61, Day 121, then Mastered
```

## Requirements

For web development:

- Node.js 18+
- npm

For the native desktop app:

- Node.js 18+
- npm
- Rust toolchain
- Tauri Linux system dependencies

Install Rust with:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
```

## Linux Setup

The desktop app uses Tauri 2. Tauri 2 requires WebKitGTK 4.1 on Linux. The dependency commands below follow the official Tauri v2 Linux prerequisites.

### Ubuntu / Debian / Linux Mint / Pop!_OS / Kali

Kali is Debian-based, so use the Debian/Ubuntu dependency set.

```bash
sudo apt update
sudo apt install -y nodejs npm
sudo apt install -y libwebkit2gtk-4.1-dev \
  build-essential \
  curl \
  wget \
  file \
  libxdo-dev \
  libssl-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev
```

If your distro ships an old Node.js version, install Node.js LTS from NodeSource or `nvm`, then verify:

```bash
node --version
npm --version
```

### Fedora

```bash
sudo dnf install -y nodejs npm
sudo dnf install -y webkit2gtk4.1-devel \
  openssl-devel \
  curl \
  wget \
  file \
  libappindicator-gtk3-devel \
  librsvg2-devel \
  libxdo-devel
sudo dnf group install -y "c-development"
```

### Arch Linux / Manjaro / EndeavourOS

```bash
sudo pacman -Syu
sudo pacman -S --needed nodejs npm rustup
rustup default stable
sudo pacman -S --needed \
  webkit2gtk-4.1 \
  base-devel \
  curl \
  wget \
  file \
  openssl \
  appmenu-gtk-module \
  libappindicator-gtk3 \
  librsvg \
  xdotool
```

### openSUSE

```bash
sudo zypper refresh
sudo zypper install nodejs npm
sudo zypper install webkit2gtk3-devel \
  libopenssl-devel \
  curl \
  wget \
  file \
  libappindicator3-1 \
  librsvg-devel
sudo zypper install -t pattern devel_basis
```

### Alpine

```bash
sudo apk add nodejs npm
sudo apk add \
  build-base \
  webkit2gtk-4.1-dev \
  curl \
  wget \
  file \
  openssl \
  libayatana-appindicator-dev \
  librsvg \
  font-dejavu
```

## Install and Run From Source

Clone and install dependencies:

```bash
git clone https://github.com/Anxhul10/dsa-revision-tracker.git
cd dsa-revision-tracker
npm install
```

Run in the browser:

```bash
npm run dev
```

Open:

```text
http://localhost:1420
```

Run the Linux desktop app:

```bash
npm run desktop:dev
```

Build the frontend:

```bash
npm run build
```

Build desktop packages:

```bash
npm run desktop:build
```

Build only the portable Linux AppImage:

```bash
npm run desktop:appimage
```

Generated Linux packages are placed under:

```text
src-tauri/target/release/bundle/
```

The AppImage is created at:

```text
src-tauri/target/release/bundle/appimage/
```

### Running the AppImage on Linux

Make it executable and run it:

```bash
chmod +x "src-tauri/target/release/bundle/appimage/<generated-file>.AppImage"
./"src-tauri/target/release/bundle/appimage/<generated-file>.AppImage"
```

The same AppImage can be copied to most x86_64 Linux distributions, including Ubuntu, Debian, Kali, Fedora, Arch, and openSUSE. Some systems need FUSE support to launch AppImages. On Ubuntu/Debian/Kali, install it with:

```bash
sudo apt update
sudo apt install libfuse2
```

On newer Ubuntu releases where `libfuse2` is unavailable, try:

```bash
sudo apt install libfuse2t64
```

AppImages are architecture-specific. Build an x86_64 AppImage on an x86_64 machine; ARM users need an ARM build. For the widest compatibility, build on an older supported Linux distribution because the binary depends on the build system's glibc baseline.

## Installing Built Packages

### Debian / Ubuntu / Kali `.deb`

```bash
sudo dpkg -i "src-tauri/target/release/bundle/deb/<generated-file>.deb"
sudo apt --fix-broken install
```

### Fedora `.rpm`

```bash
sudo dnf install "src-tauri/target/release/bundle/rpm/<generated-file>.rpm"
```

### Arch Linux

This project currently builds standard Tauri Linux bundles such as `.deb` and `.rpm`. On Arch, the simplest development flow is:

```bash
npm run desktop:dev
```

For local release use, run the binary from:

```text
src-tauri/target/release/
```

## App Workflow

1. Click the floating `+` button.
2. Choose `Normal Mode` for coding questions or `Theory Mode` for notes.
3. Fill in the form.
4. Use `Reviewed` when the item is done for the current revision.
5. Collapse or expand `Questions` and `Theory` sections by clicking their headers.
6. Use `Export JSON` to back up progress.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite web dev server |
| `npm run desktop:dev` | Start Tauri desktop app |
| `npm run build` | Type-check and build frontend |
| `npm run desktop:build` | Build desktop release bundles |
| `npm run desktop:appimage` | Build the portable Linux AppImage |
| `npm run desktop:build:ci` | Build Tauri binary without bundling |

## Troubleshooting

### `webkit2gtk-4.1` package not found

Use a distro release that provides WebKitGTK 4.1. For Debian-based systems, Ubuntu 22.04+ or Debian 12+ are safer baselines for Tauri 2.

### `cargo` command not found

Rust is missing or the shell environment was not loaded:

```bash
source "$HOME/.cargo/env"
```

### App builds but does not open on Linux

Make sure the Tauri system dependencies for your distro are installed, especially WebKitGTK, OpenSSL development headers, `libxdo`, and appindicator packages.

## References

- Tauri v2 Linux prerequisites: <https://v2.tauri.app/start/prerequisites/>
- Tauri Debian packaging notes: <https://v2.tauri.app/distribute/debian/>

## License

This project is private. Licensing and redistribution terms are defined by the repository owner.
