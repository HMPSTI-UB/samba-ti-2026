# AGENTS.md — `src/features/` (Feature-Based Modules)

## Purpose

Features group domain-specific code by business capability, keeping components, hooks, and actions colocated rather than scattered across type-based folders.

## Structure

```
features/<feature-name>/
  components/     # Feature-specific React components (client & server)
  hooks/          # Feature-specific custom hooks
  actions/        # Next.js Server Actions for this feature
```

## When to scope inside a feature vs use shared folders

| Put in feature folder | Put in shared folder |
|---|---|
| Only used by this feature | Used by 2+ features |
| Tightly coupled to the domain | Generic utility (e.g., `cn()`, date formatters) |
| Feature-specific types/constants | Shared constants (`src/constant/`) |
| Server Actions for this feature | Shared components (`src/components/`) |

## Conventions

- One feature per folder — no cross-feature imports from other features' `hooks/` or `components/`
- A feature's `components/` folder may have sub-folders if complex
- Feature names are singular, lowercase, kebab-case if multiple words: `user-profile/`
- Each feature folder has its own `.gitkeep` to preserve the directory on GitHub (remove once files exist)
- Server Actions in `actions/` use `'use server'` directive
