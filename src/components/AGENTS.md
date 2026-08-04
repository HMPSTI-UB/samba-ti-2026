# AGENTS.md — `src/components/` (Shared Components)

## Structure

```
components/
  ui/           # Foundation primitives — Button, Input, Select, Table, etc.
  common/       # Composed global components built from ui/ + custom logic
  layout/       # Global layout wrappers — Navbar, Footer, AppLayout, etc.
```

## Current files

### `common/`
| File | Component | Type |
|---|---|---|
| `star-background.tsx` | `StarBackground` | Client (CSS animation) |
| `cosmic-background.tsx` | `CosmicBackground` | Client (tsParticles) |
| `flying-rocket.tsx` | `FlyingRocket` | Client (three.js) |
| `sweet-alert.tsx` | `SweetAlert` | Client (success/error dialog with image + OK + auto-close) |
| `sweet-alert-provider.tsx` | `SweetAlertProvider` / `useSweetAlert` | Client (context `{ success, error }`; replaces sonner toaster) |
| `post-login-alert.tsx` | `PostLoginAlert` | Client (shows SweetAlert once after login) |
| `confirm-dialog.tsx` | `ConfirmDialog` | Client (generic confirmation dialog) |
| `avatar-upload.tsx` | `AvatarUpload` | Client (profile photo picker + preview + upload to S3 via presigned URL + `updateMe`) |

### `layout/`
| File | Component | Type |
|---|---|---|
| `navbar.tsx` | `Navbar` | Client |
| `footer.tsx` | `Footer` | Server |
| `notification-dropdown.tsx` | `NotificationDropdown` | Client (bell popover with recent announcements + mark read + mark all read + "Lihat Semua") |

## Conventions

- **File naming**: kebab-case (`first-second.tsx`) — Next.js native convention
- **Component naming**: PascalCase (the exported function/class), regardless of filename
- Components are **server by default** — only add `'use client'` when using hooks, events, or browser APIs
- One component per file
- Export as default
- Route-specific components go in `src/app/<route>/_components/`, not here

## When to put something where

| Where | What goes there |
|---|---|
| `ui/` | Pure primitives — no business logic, fully generic, reusable across any project |
| `common/` | Composed from `ui/` + custom logic — project-specific but cross-feature reusable |
| `layout/` | App shell components — headers, footers, sidebars, wrappers |

## Important

Check the `common/` and `layout/` folders before duplicating existing components.
