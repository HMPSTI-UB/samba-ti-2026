# SAMBA TI 2026 | ZENITH

Landing page for the PKKMB/OSPEK orientation event of the Information Technology department at Universitas Brawijaya.

**Tagline**: *"Zealous Evolution of New IT Heroes"*

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | **Next.js 16** (App Router) |
| Language | **TypeScript** (strict) |
| UI Library | **React 19** |
| Styling | **Tailwind CSS v4** |
| Animation | **Framer Motion**, **GSAP** |
| UI Primitives | **Radix UI** |
| HTTP Client | **Axios** |
| Server State | **@tanstack/react-query** |
| Auth | http-only cookies (JWT) |
| Icons | **Lucide React** |
| Fonts | **Orbitron** (headings), **Montserrat** (body) |

## Routes

| Route | Purpose |
|---|---|
| `/` | Countdown coming-soon page |
| `/coming-soon` | GSAP-animated coming-soon variant |
| `/staging` | Full marketing landing page |
| `/design-system` | Component gallery |
| `/*` | Custom 404 |

## Getting Started

```bash
# Copy environment variables
cp .env.example .env.local

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Design System

A living component gallery is available at `/design-system` featuring all UI components (Button, Input, Select, Checkbox, Switch, Dialog, Dropdown Menu, Toast).

Components live in `src/components/ui/` — built on Radix UI primitives with Tailwind CSS v4.
