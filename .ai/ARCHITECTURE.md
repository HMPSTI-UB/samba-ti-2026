# Architecture — SAMBA TI 2026 | ZENITH

## Framework

**Next.js 16** with **App Router**. This version has breaking changes from standard Next.js — always read `node_modules/next/dist/docs/` before writing code.

## Route Design

| Route | File | Purpose |
|---|---|---|
| `/` | `src/app/page.tsx` | Countdown coming-soon page |
| `/staging` | `src/app/staging/page.tsx` | Full marketing landing page |
| `/*` | `src/app/not-found.tsx` | Custom 404 page |

## Project Structure

```
src/
  app/
    layout.tsx          # Root layout — fonts, metadata, global BG
    globals.css         # Tailwind v4 + custom CSS tokens
    page.tsx            # Countdown route
    not-found.tsx       # 404 page
    staging/
      page.tsx          # Full landing page
      _components/      # Section components scoped to /staging
  components/           # Shared/reusable components
  constant/
    index.ts            # PHASES, OUTCOMES, MANIFESTO, MISSIONS data
  hooks/
    use-landing-page.ts # Framer Motion animation variants
```

## Component Tree (Landing Page)

```
RootLayout
├── StarBackground        (CSS animated starfield, always on)
├── CosmicBackground      (tsParticles, interactive)
├── FlyingRocket          (orbiting rocket animation)
└── StagingPage
    ├── Navbar
    ├── Hero
    ├── About
    ├── JourneyTimeline   (PHASES data)
    ├── VisionMission     (MISSIONS, MANIFESTO data)
    ├── HeroOutcomes      (OUTCOMES data)
    ├── CTASection
    └── Footer
```

## Data Flow

- Static data lives in `src/constant/index.ts`
- Components import data directly (no API layer yet)
- Framer Motion variants defined in `src/hooks/use-landing-page.ts`
- No state management library — local state + React hooks only

## Future API Considerations

- Portal (`/portal`) will eventually need API routes
- Possible authentication flow for participant registration
- Consider Next.js API routes under `src/app/api/` when needed
