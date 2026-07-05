# AGENTS.md — `src/lib/` (API Layer)

## Architecture Overview

```
src/lib/
  api/
    types.ts     # Standard API response shapes
    errors.ts    # ApiError class (holds field-level validation errors)
    client.ts    # Axios instance with interceptors (client components only)
    server.ts    # fetch-based client for server components (RSC)
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
import { clientApi } from "./client";
import type { ApiResponse, PaginatedResponse } from "./types";

export type Event = {
  id: string;
  name: string;
  date: string;
  phase: "nebula" | "fusion" | "supernova" | "zenith";
};

export function getEvents(): Promise<PaginatedResponse<Event>> {
  return clientApi.getPaginated<Event>("/events");
}

export function getEvent(id: string): Promise<ApiResponse<Event>> {
  return clientApi.get<Event>(`/events/${id}`);
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

## Server API Client (`server.ts`)

For **Server Components** (RSC), use `serverApi` — a `fetch`-based wrapper that calls the backend directly via `API_URL` (skipping the `/api` proxy).

```typescript
// src/lib/api/events.ts (server-compatible)
import { serverApi } from "@/lib/api/server";
import type { ApiResponse, PaginatedResponse } from "./types";

export type Event = {
  id: string;
  name: string;
  date: string;
  phase: "nebula" | "fusion" | "supernova" | "zenith";
};

export function getEvents(): Promise<PaginatedResponse<Event>> {
  return serverApi.getPaginated<Event>("/events");
}

export function getEvent(id: string): Promise<ApiResponse<Event>> {
  return serverApi.get<Event>(`/events/${id}`);
}
```

### Usage in a Server Component

```typescript
import { getEvents } from "@/lib/api/events";

export default async function EventsPage() {
  const { data, pagination } = await getEvents();
  return <EventList events={data} totalPages={pagination.total_pages} />;
}
```

### Available methods

| Method | Returns | Description |
|---|---|---|
| `get<T>(path)` | `Promise<ApiResponse<T>>` | GET request |
| `post<T>(path, body?)` | `Promise<ApiResponse<T>>` | POST request |
| `put<T>(path, body?)` | `Promise<ApiResponse<T>>` | PUT request |
| `patch<T>(path, body?)` | `Promise<ApiResponse<T>>` | PATCH request |
| `delete<T>(path)` | `Promise<ApiResponse<T>>` | DELETE request |
| `getPaginated<T>(path)` | `Promise<PaginatedResponse<T>>` | Paginated GET |

### Options

```typescript
// Cache control (Next.js data cache)
serverApi.get<Event>("/events", {
  cache: "force-cache",            // default
  next: { revalidate: 60 },        // ISR: revalidate every 60s
});

// Custom headers (e.g. for cookie forwarding)
serverApi.get<Event>("/events", {
  headers: { cookie: cookies().toString() },
});
```

### When to use which

| Client | Where | Transport | Base URL | 401 handling |
|---|---|---|---|---|
| `apiClient` (`client.ts`) | Client components (`"use client"`) | Axios | `/api` (proxy) | Auto-refresh + redirect |
| `serverApi` (`server.ts`) | Server components (RSC) | `fetch` | `API_URL` (direct) | Throw `ApiError` only |

## Env Variable

| Variable | Purpose |
|---|---|
| `API_URL` | Backend base URL (e.g. `http://localhost:8000`) |

Set in `.env.local` (already gitignored by `.env*` pattern).

## Conventions

- One file per resource in `src/lib/api/`
- Client functions use `clientApi` (typed wrapper around Axios); server functions use `serverApi`
- Type the response with `ApiResponse<T>` or `PaginatedResponse<T>`
- For mutations, always handle `ApiError` to support validation errors
- Query keys should be structured arrays: `["events"]`, `["events", id]`, `["users", "me"]`
- Prefer `useQuery` for reads, `useMutation` for writes
