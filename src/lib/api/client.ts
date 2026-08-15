import axios from "axios";
import { ApiError } from "./errors";
import { useTokenStore } from "@/stores/token.store";
import { useUserStore } from "@/stores/user.store";
import type { ApiResponse, PaginatedResponse } from "./types";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"
).replace(/\/+$/, "");

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const accessToken = useTokenStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (error: unknown) => void;
}> = [];

function processQueue(error: unknown) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });
  failedQueue = [];
}

function redirectToLogin() {
  if (typeof window !== "undefined" && !window.location.pathname.startsWith("/auth/")) {
    window.location.href = "/auth/login";
  }
}

apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    const isAuthEndpoint =
      originalRequest?.url?.includes("/auth/login") ||
      originalRequest?.url?.includes("/auth/refresh");

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => apiClient(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = useTokenStore.getState().refreshToken;
        if (!refreshToken) {
          useTokenStore.getState().clearTokens();
          useUserStore.getState().clearUser();
          redirectToLogin();
          throw new ApiError(
            { success: false, message: "Session berakhir, silakan login ulang" },
            401,
          );
        }

        const res = (await apiClient.post(
          "/auth/refresh",
          { refreshToken },
        )) as unknown as ApiResponse<{ accessToken: string; refreshToken: string }>;

        useTokenStore.getState().setTokens(res.data);
        processQueue(null);
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        useTokenStore.getState().clearTokens();
        useUserStore.getState().clearUser();
        redirectToLogin();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response) {
      throw new ApiError(
        {
          success: false,
          message: error.response.data?.message ?? "Terjadi kesalahan",
          errors: error.response.data?.errors,
        },
        error.response.status,
      );
    }

    throw new ApiError(
      {
        success: false,
        message: error.message ?? "Koneksi gagal",
      },
      0,
    );
  },
);

type ClientApiOptions = {
  timeout?: number;
};

const clientApi = {
  get: <T>(path: string, options?: ClientApiOptions) =>
    apiClient.get(path, { timeout: options?.timeout }) as Promise<ApiResponse<T>>,

  post: <T>(path: string, body?: unknown, options?: ClientApiOptions) =>
    apiClient.post(path, body, { timeout: options?.timeout }) as Promise<ApiResponse<T>>,

  put: <T>(path: string, body?: unknown, options?: ClientApiOptions) =>
    apiClient.put(path, body, { timeout: options?.timeout }) as Promise<ApiResponse<T>>,

  patch: <T>(path: string, body?: unknown, options?: ClientApiOptions) =>
    apiClient.patch(path, body, { timeout: options?.timeout }) as Promise<ApiResponse<T>>,

  delete: <T>(path: string, options?: ClientApiOptions) =>
    apiClient.delete(path, { timeout: options?.timeout }) as Promise<ApiResponse<T>>,

  getPaginated: <T>(path: string, options?: ClientApiOptions) =>
    apiClient.get(path, { timeout: options?.timeout }) as Promise<PaginatedResponse<T>>,
};

export { apiClient, clientApi };
