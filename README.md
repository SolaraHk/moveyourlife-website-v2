# MoveYourLife Website v2

Public prototype website for MoveYourLife HK, built with React + Vite and motion-led beauty / wellness landing page interactions.

## Tech stack

- Vite + React
- GSAP / Motion / Framer Motion style interactions
- Lenis smooth scroll
- Static assets under `public/`

## Local development

```bash
npm install
npm run dev
```

Default dev server:

```text
http://127.0.0.1:5180/
```

## Production build

```bash
npm run build
```

Build output is generated into `dist/` and is intentionally not committed.

## Local deploy helper

```bash
npm run deploy
```

This runs `deploy.sh`, rebuilds the site, and syncs `dist/` into the local preview serving folder for `https://myl2.inexadesk.com`.

## Project notes

- Canonical local source: `/Users/book/Documents/moveyourlife-website-v2`
- Internal notes, local config, generated builds, and dependencies are excluded from git via `.gitignore`.
- Public-facing assets and source code only are intended to be committed.
