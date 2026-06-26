# 187WEBdesign

**Make killer websites.** A heavily-documented, full-stack [Next.js](https://nextjs.org) starter that ships the **187WEBdesign** skill — an opinionated playbook for websites that win awards *and* convert — and then **proves it**: the live demo site you build from this repo is itself a reference implementation of every principle in the skill.

![License](https://img.shields.io/badge/license-MIT-2440E6)
![Next.js](https://img.shields.io/badge/Next.js-15-11131A)
![React](https://img.shields.io/badge/React-19-11131A)
![TypeScript](https://img.shields.io/badge/TypeScript-5-2440E6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-2440E6)
![Prisma](https://img.shields.io/badge/Prisma-6-11131A)

> "187" is the attitude: every element earns its place or it gets cut.

---

## What this is

This repository is **two things in one**:

1. **A reusable skill** — `/.claude/skills/187webdesign/` is a portable, tool-agnostic design playbook for [Claude Code](https://claude.com/claude-code). Drop it into any project and Claude will design and critique web pages against an award-winning rubric, a 12-point principle set, and a 50-point pre-ship audit.
2. **A full-stack starter that demonstrates it** — a real Next.js + Prisma app whose marketing page is built to pass that exact checklist: fast (Core Web Vitals), accessible (WCAG 2.2 AA), responsive, and conversion-minded. Clone it and start shipping, or read it as a worked example.

The demo isn't decoration — it's **evidence**. The hero is a thesis, the "scoring lens" section *is* the rubric the skill designs to, and the footer reminds you the page was built to its own checklist.

## Two ways to use it

### A) Just the skill (drop-in)

```bash
# from the root of any project you use with Claude Code
cp -r path/to/187webdesign/.claude/skills/187webdesign .claude/skills/
```

Claude Code auto-discovers it. Then ask things like *"design an award-caliber hero for X"* or *"critique this landing page against the rubric"* and the skill activates. See [`.claude/skills/187webdesign/SKILL.md`](./.claude/skills/187webdesign/SKILL.md).

### B) The full starter (clone & build)

```bash
git clone https://github.com/lumenhelixsolutions/187webdesign.git
cd 187webdesign
npm install
npm run dev          # http://localhost:3000
```

That's it — the showcase runs immediately in **preview mode** (no database required). Wire a database when you want to persist leads (see [Quick start](#quick-start)).

## Features

- ⚡ **Next.js 15 (App Router) + React 19 + TypeScript** — server components, route handlers, and a typed end-to-end.
- 🎨 **Token-driven design system** — semantic color/space/type tokens in CSS variables, consumed by Tailwind. One source of visual truth.
- 🧱 **Real backend** — Prisma + PostgreSQL, validated API routes (`/api/lead`, `/api/health`), and a `docker-compose` Postgres for local dev.
- 🛟 **Graceful degradation** — runs with **no** database (preview mode) so the first `npm run dev` is frictionless.
- ♿ **Accessibility built in** — semantic landmarks, skip link, visible focus, keyboard operability, `prefers-reduced-motion`, labeled inputs.
- 🏎️ **Performance by default** — text-based LCP hero, zero raster images (SVG/CSS visuals), `next/font` with `display: swap`, motion that can't cause layout shift.
- 🎬 **Purposeful motion** — one orchestrated hero load-in + scroll reveals, all reduced-motion aware.
- 🐳 **Deploy anywhere** — Vercel one-click *or* a multi-stage `Dockerfile` (standalone output).
- 📚 **Documented to death** — this README plus four focused guides in [`/docs`](./docs).

## Tech stack

| Layer       | Choice                                  | Why |
|-------------|------------------------------------------|-----|
| Framework   | Next.js 15 (App Router)                  | Full-stack React: UI + API in one deploy |
| Language    | TypeScript (strict)                      | Catch mistakes before users do |
| Styling     | Tailwind CSS 3 + CSS variable tokens     | Utility speed with a real token system |
| Database    | PostgreSQL via Prisma 6                  | Typed schema, easy local + prod parity |
| Validation  | Zod                                      | One schema shared by API and client |
| Fonts       | Space Grotesk (display) + Inter (body)   | Two families, self-hosted via `next/font` |
| Tooling     | ESLint, Prettier, GitHub Actions CI      | Lint + typecheck + build on every push |

## Quick start

**Prerequisites:** Node.js ≥ 18.18, npm. (Docker optional, only for the local database.)

```bash
# 1. Install
npm install

# 2. (optional) start a local Postgres and point the app at it
cp .env.example .env
docker compose up -d        # provisions Postgres matching .env
npm run db:push             # create tables from prisma/schema.prisma
npm run db:seed             # (optional) a few sample leads

# 3. Run
npm run dev                 # http://localhost:3000
```

Skip step 2 entirely for a quick look — the app runs in preview mode and the lead form acknowledges submissions without persisting them.

## Project structure

```
187webdesign/
├─ .claude/skills/187webdesign/   # ← the portable skill (the star of the show)
│  ├─ SKILL.md                    #   the system: rubric, 12 principles, workflow
│  └─ references/CHECKLIST.md     #   the 50-point pre-ship audit
├─ app/                           # Next.js App Router
│  ├─ layout.tsx                  #   fonts, metadata, skip link, header/footer
│  ├─ page.tsx                    #   the showcase (composed from sections)
│  ├─ not-found.tsx               #   a designed 404
│  ├─ icon.svg                    #   favicon
│  ├─ opengraph-image.tsx         #   dynamic social card
│  └─ api/
│     ├─ lead/route.ts            #   POST: validated + persisted; GET: count
│     └─ health/route.ts          #   liveness probe
├─ components/                    # design-system primitives + sections
│  ├─ Button.tsx  Container.tsx  Section.tsx  Reveal.tsx
│  ├─ Hero.tsx  ScoringLens.tsx  LeadForm.tsx
│  └─ SiteHeader.tsx  SiteFooter.tsx  Logo.tsx
├─ lib/
│  ├─ content.ts                  #   page copy/data as one typed source
│  ├─ db.ts                       #   lazy Prisma singleton (null-safe)
│  └─ validation.ts              #   Zod schemas
├─ prisma/                        # schema + seed
├─ docs/                          # getting-started, architecture, design-system, deployment
├─ docker-compose.yml             # local Postgres
├─ Dockerfile                     # production image (standalone)
└─ tailwind.config.ts            # tokens → utilities
```

## The skill

The heart of the repo. [`SKILL.md`](./.claude/skills/187webdesign/SKILL.md) encodes:

- **The scoring lens** — how awards are actually judged: Design 40% · Usability 30% · Creativity 20% · Content 10%.
- **12 core principles** — from "win the first 5 seconds" to "convert, don't just impress."
- **A workflow** — research → direction → wireframe → tokens → build → critique → QA.
- **A 50-point pre-ship checklist** — [`CHECKLIST.md`](./.claude/skills/187webdesign/references/CHECKLIST.md).

It's intentionally tool-agnostic: the principles hold whether you build in React, plain HTML/CSS, Framer, or Webflow.

## Design system at a glance

Tokens live in [`app/globals.css`](./app/globals.css) and are surfaced to Tailwind in [`tailwind.config.ts`](./tailwind.config.ts). Full reference: [`docs/DESIGN-SYSTEM.md`](./docs/DESIGN-SYSTEM.md).

| Token        | Value      | Role |
|--------------|------------|------|
| `bg`         | `#FAFAF7`  | Warm paper background (the 60%) |
| `ink`        | `#11131A`  | Primary text / dark surfaces |
| `muted`      | `#5B6170`  | Secondary text (AA on `bg`) |
| `accent`     | `#2440E6`  | Electric "blueprint" blue — actions only (the 10%) |
| `line`       | `#DDDBD2`  | Hairlines / blueprint rules |

Spacing rides Tailwind's 4/8px scale (matching the skill's 8px rhythm). Type is a fluid modular scale via `clamp()`.

## Scripts

| Script              | Does |
|---------------------|------|
| `npm run dev`       | Start the dev server |
| `npm run build`     | `prisma generate` + production build |
| `npm start`         | Run the production build |
| `npm run lint`      | ESLint (next/core-web-vitals) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format`    | Prettier write |
| `npm run db:push`   | Sync schema → database |
| `npm run db:migrate`| Create a migration |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:seed`   | Seed sample leads |

## API

| Route          | Method | Behavior |
|----------------|--------|----------|
| `/api/lead`    | `POST` | Validates `{ email, message? }` with Zod, persists a `Lead`. Preview mode (no DB) acknowledges without saving. |
| `/api/lead`    | `GET`  | Returns `{ count }` for the social-proof counter (`null` with no DB). |
| `/api/health`  | `GET`  | `{ status, database, timestamp }` for uptime checks. |

## Deployment

- **Vercel:** import the repo, set `DATABASE_URL` (and `NEXT_PUBLIC_SITE_URL`), deploy. Run `prisma migrate deploy` against your database.
- **Docker:** `docker build -t 187webdesign . && docker run -p 3000:3000 -e DATABASE_URL=... 187webdesign`.

Full guide: [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md).

## Docs

- [Getting started](./docs/GETTING-STARTED.md) — environment, database, day-to-day workflow.
- [Architecture](./docs/ARCHITECTURE.md) — how the pieces fit and why.
- [Design system](./docs/DESIGN-SYSTEM.md) — tokens, type, spacing, motion, components.
- [Deployment](./docs/DEPLOYMENT.md) — Vercel, Docker, databases, env.

## Contributing

PRs welcome. The one house rule: **run the [pre-ship checklist](./.claude/skills/187webdesign/references/CHECKLIST.md) before you call a UI change done.** See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

[MIT](./LICENSE) © 2026 Lumen Helix Solutions.
