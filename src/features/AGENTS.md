# AGENTS.md — `src/features/` (Feature-Based Modules)

## Purpose

Features group domain-specific code by business capability, keeping components, hooks, and API logic colocated rather than scattered across type-based folders.

## Structure

```
features/<feature-name>/
  api/            # API layer — server actions (action.ts) & client fetch helpers
  components/     # Feature-specific React components (client & server)
  hooks/          # Feature-specific custom hooks
  types/          # TypeScript types for this feature
  validation/     # Zod / validation schemas (if needed)
```

## When to scope inside a feature vs use shared folders

| Put in feature folder | Put in shared folder |
|---|---|
| Only used by this feature | Used by 2+ features |
| Tightly coupled to the domain | Generic utility (e.g., `cn()`, date formatters) |
| Feature-specific types/constants | Shared constants (`src/constant/`) |
| API/action logic for this feature | Shared components (`src/components/`) |

## Conventions

- One feature per folder — no cross-feature imports from other features' `hooks/` or `components/`
- A feature's `components/` folder may have sub-folders if complex
- Feature names are singular, lowercase, kebab-case if multiple words: `user-profile/`
- Each feature folder has its own `.gitkeep` to preserve the directory on GitHub (remove once files exist)
- **Server Actions** go in `api/action.ts` with `'use server'` directive
- **Client fetch helpers** go in separate files within `api/` (e.g., `api/client.ts`)
- **Types** must be in separate files under `types/`, never inline with functions
