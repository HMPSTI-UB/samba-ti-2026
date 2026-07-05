# SAMBA TI 2026 | ZENITH — Project Overview

A landing/coming-soon website for the PKKMB/OSPEK orientation event of the Information Technology department at Universitas Brawijaya.

**Tagline**: *"Zealous Evolution of New IT Heroes"*

## Core Routes

| Route | Purpose |
|---|---|
| `/` | Countdown coming-soon page |
| `/staging` | Full marketing landing page |
| `/*` | Custom 404 |

## Stack at a Glance

| Layer | Technology |
|---|---|
| Framework | **Next.js 16** (App Router) |
| Language | **TypeScript** (strict) |
| UI Library | **React 19** |
| Styling | **Tailwind CSS v4** |
| Animation | **Framer Motion** |
| 3D / Visuals | **Three.js**, @react-three/fiber, @react-three/drei |
| Particles | **tsParticles**, @tsparticles/react |
| HTTP Client | **Axios** (with 401 auto-refresh interceptor) |
| Server State | **@tanstack/react-query** |
| Auth | http-only cookies (JWT) |
| Icons | **Lucide React** |
| Fonts | **Orbitron** (headings), **Montserrat** (body) via next/font |

### Path Alias
- `@/` → `./src/*`

## Critical Instructions for AI Agents

1. **ALWAYS read `.ai/` docs first** — Start with `.ai/prd/01-OVERVIEW.md`, `.ai/ARCHITECTURE.md`, and check `.ai/skills/` for relevant skills before making any changes
2. **Check folder-level AGENTS.md** — Each key folder (`src/app/`, `src/components/`, `src/constant/`, `src/hooks/`, `src/features/`, `src/lib/`) has its own `AGENTS.md` with folder-specific conventions
3. **Next.js 16 has breaking changes** — Do NOT rely on pre-2026 Next.js knowledge. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
4. **Log session updates** — After completing a task, write a brief update in `.ai/updates/` with filename `YYYY-MM-DD-HHmm.md` summarizing what was done
5. **Package manager**: npm

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
