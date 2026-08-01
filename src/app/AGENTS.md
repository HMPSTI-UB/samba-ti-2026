# AGENTS.md — `src/app/` (App Router)

## What's here

Next.js App Router pages, layouts, and route-level files:

- `layout.tsx` — Root layout (fonts, metadata, global background)
- `globals.css` — Tailwind v4 + custom CSS tokens
- `page.tsx` — Countdown coming-soon page at `/`
- `not-found.tsx` — Custom 404 page
- `auth/` — Auth shell (login, register) at `/auth/*`
- `(maba)/app/` — MABA (mahasiswa baru) app at `/app/*` — `dashboard`, `tugas`
- `(backdoor)/dashboard/` — Panitia admin area at `/dashboard/*` — `admin`, `spv`, `kaderisasi`, `users`, `clusters`, `tugas`, `pengumuman`

### Route groups (access by role, enforced in `src/proxy.ts`)

| URL prefix | Role | Folder |
|---|---|---|
| `/app/*` | MABA only | `(maba)/app/` |
| `/dashboard/*` | Panitia only (ADMIN/KADERISASI/SPV) | `(backdoor)/dashboard/` |

## Conventions

- Use `layout.tsx` for shared layouts and metadata exports
- Route `page.tsx` files should be thin — delegate sections to `_components/` folders
- Add `'use client'` only when the route needs client-side interactivity
- Metadata exported from `layout.tsx` (use `generateMetadata` for dynamic routes)
- Route groups `(group)` should be used for layout isolation if needed

## Adding a new route

1. Create folder `src/app/<route>/`
2. Add `page.tsx` — default export the page component
3. If the route needs sections, create `_components/` as a private folder
4. Update `AGENTS.md` in `src/app/` to list the new route

## Important

Always read the root `AGENTS.md` for the full tech stack — Next.js 16 has breaking changes from standard Next.js conventions.
