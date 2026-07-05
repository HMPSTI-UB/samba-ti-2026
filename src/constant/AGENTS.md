# AGENTS.md — `src/constant/` (Data Constants)

## What's here

`index.ts` — Static data definitions used across the app:

| Export | Type | Description |
|---|---|---|
| `PHASES` | Array of phase objects | Event timeline phases (NEBULA, FUSION, SUPERNOVA, ZENITH) |
| `OUTCOMES` | Array of outcome objects | 6 expected participant outcomes |
| `MANIFESTO` | Array of value objects | Core values (Adaptive, Integrity, Creative, etc.) |
| `MISSIONS` | Array of mission objects | 5 event missions |

## Conventions

- All data is fully typed (no `any`)
- Use `as const` for literal arrays when values are fixed
- Keep data in plain objects/arrays — no class instances
- Dates stored as strings in ISO format or readable format
- Each data set has a corresponding TypeScript type defined inline

## Adding new data

1. Add the typed data array/object to `index.ts`
2. Export it as a named export
3. Update this `AGENTS.md` to list the new export

## Important

Do not duplicate constant data across components. If multiple components need the same data, it belongs here.
