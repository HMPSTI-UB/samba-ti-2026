import { ApiError } from "./errors";
import type { ApiResponse, PaginatedResponse } from "./types";

type FetchOptions = {
  headers?: Record<string, string>;
  cache?: RequestCache;
  revalidate?: number | false;
  next?: { revalidate?: number | false };
};

function getBaseUrl(): string {
  const url = process.env.API_URL ?? "http://localhost:8000";
  return url.replace(/\/+$/, "");
}


async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  options?: FetchOptions,
): Promise<T> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/${path.replace(/^\//, "")}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options?.headers,
  };

  const fetchInit: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache: options?.cache,
    next: options?.next,
  };

  const res = await fetch(url, fetchInit);
  const json = await res.json();

  if (!res.ok) {
    throw new ApiError(
      {
        success: false,
        message: json.message ?? "Request failed",
        errors: json.errors,
      },
      res.status,
    );
  }

  return json as T;
}


export const serverApi = {
  get: <T>(path: string, options?: FetchOptions) =>
    request<ApiResponse<T>>("GET", path, undefined, options),

  post: <T>(path: string, body?: unknown, options?: FetchOptions) =>
    request<ApiResponse<T>>("POST", path, body, options),

  put: <T>(path: string, body?: unknown, options?: FetchOptions) =>
    request<ApiResponse<T>>("PUT", path, body, options),

  patch: <T>(path: string, body?: unknown, options?: FetchOptions) =>
    request<ApiResponse<T>>("PATCH", path, body, options),

  delete: <T>(path: string, options?: FetchOptions) =>
    request<ApiResponse<T>>("DELETE", path, undefined, options),

  getPaginated: <T>(path: string, options?: FetchOptions) =>
    request<PaginatedResponse<T>>("GET", path, undefined, options),
};
