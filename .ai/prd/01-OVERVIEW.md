# SAMBA TI 2026 | ZENITH — Project Overview

**Tagline**: *"Zealous Evolution of New IT Heroes"*

A landing/coming-soon website for the PKKMB/OSPEK orientation event of the Information Technology department at **Universitas Brawijaya**.

## Event Details

| Item | Detail |
|---|---|
| Event | SAMBA TI 2026 |
| Theme | ZENITH — Zealous Evolution of New IT Heroes |
| Start Date | August 22, 2026 |
| Audience | Incoming IT freshmen at Universitas Brawijaya |

### Event Phases

| Phase | Theme | Date | Description |
|---|---|---|---|
| NEBULA | Birth of Stars | Aug 12 | Registration opens |
| FUSION | Collision of Ideas | Aug 26 | Collaborative sessions |
| SUPERNOVA | Explosion of Brilliance | Sep 15 | Peak events & competitions |
| ZENITH | The Apex | TBD | Finale & celebration |

## Tech Stack

**Next.js 16** (App Router) · **React 19** · **TypeScript** (strict) · **Tailwind CSS v4** · **Framer Motion** · **Three.js** · **tsParticles**

### Key Libraries
- **Axios** + **@tanstack/react-query** — API consumption
- **Lucide React** — Icons
- **Orbitron / Montserrat** — Google Fonts
- **clsx** + **tailwind-merge** — Class utilities

### State & Data
- **TanStack Query** for server state
- **Http-only cookies** for auth tokens
- **Server Actions** for login/logout

## Core Routes

| Route | Purpose | Status |
|---|---|---|
| `/` | Countdown coming-soon page | ✅ Live |
| `/staging` | Full marketing landing page | ✅ Live |
| `/auth/login` | Login page | 🔜 Planned |
| `/portal` | Participant portal | 🔜 Planned |
| `/*` | Custom 404 | ✅ Live |

## Feature Scope

### Delivered
- Countdown timer to August 22, 2026
- Full landing page with Hero, About, Timeline, Vision/Mission, Outcomes, CTA
- Cosmic animated backgrounds (CSS stars, tsParticles, Three.js rocket)
- Responsive glassmorphism UI
- Axios + TanStack Query infrastructure
- Http-only cookie auth pattern (scaffolded)

### Planned
- Auth flow (login, register, logout)
- Participant portal `/portal`
- Dashboard for registered participants
- Event schedule management

## Project Structure

```
src/
  app/              # Next.js App Router pages & layouts
  components/       # Shared components (ui/, common/, layout/)
  features/         # Feature-based modules (auth/)
  hooks/            # Shared custom hooks
  constant/         # Static data (phases, outcomes, missions)
  lib/              # API layer (types, errors, client, query)
  actions/          # Server Actions (future)

.ai/                # AI documentation
  prd/              # PRDs and project docs
  updates/          # Session logs
  skills/           # Agent skills
```

## Architectural Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Auth tokens | http-only cookies | XSS-safe, never accessible to JS |
| API proxy | Next.js API route (`src/app/api/[[...path]]/route.ts`) | Avoids CORS, same-origin requests |
| State management | TanStack Query | Server cache, dedup, background refetch |
| Styling | Tailwind v4 | Utility-first, no runtime CSS-in-JS |
| Components | Feature-based + shared | Co-located feature code, shared primitives in `ui/` |
| File naming | kebab-case | Matches Next.js native convention |

## Skills

Skills for AI agents are stored in `.ai/skills/<name>/SKILL.md`.

| Skill | Description |
|---|---|
| `api-pattern` | Axios + TanStack Query + auth + error handling |
