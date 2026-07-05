# AGENTS.md — `src/hooks/` (Custom Hooks)

## What's here

| File | Export | Purpose |
|---|---|---|
| `use-landing-page.ts` | Animation variants | Framer Motion `variants` objects for landing page sections |

## Conventions

- One hook per file, named `use-<description>.ts`
- Custom hooks that return JSX/animation values, not components
- Use `'use client'` if the hook uses React state, effects, or browser APIs
- Hooks should be focused and composable — avoid large monolithic hooks

## When to add a hook

Extract a hook when:
- Logic is reused across multiple components
- A component has complex state logic that obscures the rendering code
- Animation variants need to be centralized (like the current pattern)

## Naming

- File: `use-<feature>.ts` (kebab-case)
- Export: `use<Feature>` (PascalCase prefixed with "use")
- Animation variant objects follow the same naming convention

## Important

Keep `use-landing-page.ts` as the central place for Framer Motion variants. If a new route needs its own animation logic, create a new hook file rather than bloating the existing one.
