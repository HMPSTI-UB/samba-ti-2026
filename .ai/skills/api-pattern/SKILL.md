---
name: api-pattern
description: >
  Guides agents on the SAMBA TI 2026 API consumption pattern:
  Axios + TanStack Query + http-only cookie auth.
  Use when creating API functions, writing queries/mutations,
  handling errors, or dealing with auth tokens.
---

# API Pattern — SAMBA TI 2026

## File Map

| File | Purpose |
|---|---|
| `src/lib/api/types.ts` | `ApiResponse<T>`, `PaginatedResponse<T>`, `ApiErrorResponse` |
| `src/lib/api/errors.ts` | `ApiError` class with validation error helpers |
| `src/lib/api/client.ts` | Axios instance + 401 refresh interceptor |
| `src/lib/api/auth.ts` | Auth API stubs (`login`, `register`, `getMe`, `refresh`) |
| `src/lib/query-client.ts` | `makeQueryClient()` factory + `getQueryClient()` singleton |
| `src/lib/query-provider.tsx` | `'use client'` — wraps app root with `QueryClientProvider` |

## Standard API Shapes

```typescript
// Single resource
ApiResponse<User>
// { success: true, message: "...", data: { id, name, email } }

// Paginated list
PaginatedResponse<Event>
// { success: true, message: "...", data: [...], pagination: { page, per_page, total, total_pages } }

// Error
ApiErrorResponse
// { success: false, message: "...", errors?: { field: ["msg1", "msg2"] } }
```

## ApiError Class

The Axios interceptor throws `ApiError` on every 4xx/5xx response.

| Method/Prop | Returns | Description |
|---|---|---|
| `error.status` | `number` | HTTP status (0 for network errors) |
| `error.message` | `string` | Server error message |
| `hasValidationErrors()` | `boolean` | Whether server returned field errors |
| `getFieldError("email")` | `string \| null` | First error for a specific field |
| `getAllFieldErrors()` | `Record<string, string[]>` | All field-level errors |

## Axios Client (`src/lib/api/client.ts`)

- `baseURL: "/api"` — proxied via Next.js API route (`src/app/api/[[...path]]/route.ts`) to the actual backend
- `withCredentials: true` — cookies sent automatically with every request
- Auto-unwraps `response.data` so callers get the parsed body directly

**401 auto-refresh flow:**
```
Request → 401 → interceptor calls POST /api/auth/refresh
  ├─ success → sets new http-only cookie → retries original request
  └─ fails → window.location.href = "/auth/login"
```
Concurrent requests during refresh are queued and retried automatically.

## Creating New API Functions

One file per resource in `src/lib/api/`:

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

## TanStack Query Usage

### useQuery (reads)

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

**Query key convention:** structured arrays — `["events"]`, `["events", id]`, `["users", "me"]`.

### useMutation (writes)

```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useCreateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateEventInput) => apiClient.post("/events", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}
```

### Query client singleton

For invalidating from outside a component:

```typescript
import { getQueryClient } from "@/lib/query-client";
getQueryClient().invalidateQueries({ queryKey: ["events"] });
```

## Validation Error Rendering

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

## Auth Flow Summary

1. Client calls Server Action (`loginAction`) with credentials
2. Server Action calls backend, gets JWT
3. Server sets `access_token` + `refresh_token` as http-only cookies
4. Client-side Axios requests include cookies via `withCredentials: true`
5. On 401 → interceptor calls `POST /api/auth/refresh`
6. If refresh fails → redirected to `/auth/login`

**Tokens never reach client JavaScript.**
