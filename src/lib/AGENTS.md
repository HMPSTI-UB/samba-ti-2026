# AGENTS.md — `src/lib/` (API Layer)

## Architecture Overview

```
src/lib/
  api/
    types.ts     # Standard API response shapes
    errors.ts    # ApiError class (holds field-level validation errors)
    client.ts    # Axios instance with interceptors
    auth.ts      # Auth API function stubs (login, register, getMe)
  query-client.ts   # TanStack QueryClient factory
  query-provider.tsx # React provider wrapping the app
```

**Token strategy**: http-only cookies (set by Server Actions). Client never sees the token.

## Standard API Shapes (`api/types.ts`)

```typescript
// Single resource
ApiResponse<User>
// → { success: true, message: "...", data: { id, name, ... } }

// Paginated list
PaginatedResponse<Event>
// → { success: true, message: "...", data: [...], pagination: { page, per_page, total, total_pages } }

// Error
ApiErrorResponse
// → { success: false, message: "...", errors?: { field: ["msg1", "msg2"] } }
```

## Creating a New API Function

Add a file in `src/lib/api/` — each resource gets its own file:

```typescript
// src/lib/api/events.ts
import { apiClient } from "./client";
import type { ApiResponse, PaginatedResponse } from "./types";

export type Event = {
  id: string;
  name: string;
  date: string;
  phase: "nebula" | "fusion" | "supernova" | "zenith";
};

export function getEvents(): Promise<PaginatedResponse<Event>> {
  return apiClient.get("/events") as Promise<PaginatedResponse<Event>>;
}

export function getEvent(id: string): Promise<ApiResponse<Event>> {
  return apiClient.get(`/events/${id}`) as Promise<ApiResponse<Event>>;
}
```

The Axios interceptor auto-unwraps `response.data`, so callers receive the parsed body directly.

## Using TanStack Query in Components

```typescript
"use client";

import { useQuery } from "@tanstack/react-query";
import { getEvents } from "@/lib/api/events";

function EventList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  if (isLoading) return <p>Loading...</p>;
  return data.data.map((event) => <div key={event.id}>{event.name}</div>);
}
```

### Mutation + Validation Error Handling

```typescript
import { useMutation } from "@tanstack/react-query";
import { ApiError } from "@/lib/api/errors";
import { login } from "@/lib/api/auth";

function LoginForm() {
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const mutation = useMutation({
    mutationFn: () => login({ email, password }),
    onError: (error) => {
      if (error instanceof ApiError && error.hasValidationErrors()) {
        setErrors(error.getAllFieldErrors());
      } else {
        // toast or generic message
      }
    },
  });

  return (
    <form onSubmit={...}>
      <input name="email" />
      {errors.email && <p className="text-red-400">{errors.email[0]}</p>}
      <input name="password" />
      {errors.password && <p className="text-red-400">{errors.password[0]}</p>}
    </form>
  );
}
```

### Error Handling Utilities on `ApiError`

| Method | Returns | Description |
|---|---|---|
| `hasValidationErrors()` | `boolean` | True if server returned field errors |
| `getFieldError(field)` | `string \| null` | First error message for a field |
| `getAllFieldErrors()` | `Record<string, string[]>` | All field errors |
| `.status` | `number` | HTTP status code (0 for network errors) |
| `.message` | `string` | Server error message |

## 401 Auto-Refresh Flow

```
Request → 401 → interceptor calls POST /api/auth/refresh
  ├─ success → retries original request
  └─ fails → window.location.href = "/auth/login"
```

Queued requests during refresh are held and retried automatically.

## Env Variable

| Variable | Purpose |
|---|---|
| `API_URL` | Backend base URL (e.g. `http://localhost:8000`) |

Set in `.env.local` (already gitignored by `.env*` pattern).

## Conventions

- One file per resource in `src/lib/api/`
- Each function uses `apiClient` (the shared Axios instance)
- Type the response with `ApiResponse<T>` or `PaginatedResponse<T>`
- Cast with `as Promise<...>` since the interceptor returns `response.data`
- For mutations, always handle `ApiError` to support validation errors
- Query keys should be structured arrays: `["events"]`, `["events", id]`, `["users", "me"]`
- Prefer `useQuery` for reads, `useMutation` for writes
