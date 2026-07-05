import axios from "axios";
import { ApiError } from "./errors";
import type { ApiResponse, PaginatedResponse } from "./types";

const apiClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: () => void;
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

apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<void>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => apiClient(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await apiClient.post("/auth/refresh");
        processQueue(null);
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
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

const clientApi = {
  get: <T>(path: string) =>
    apiClient.get(path) as Promise<ApiResponse<T>>,

  post: <T>(path: string, body?: unknown) =>
    apiClient.post(path, body) as Promise<ApiResponse<T>>,

  put: <T>(path: string, body?: unknown) =>
    apiClient.put(path, body) as Promise<ApiResponse<T>>,

  patch: <T>(path: string, body?: unknown) =>
    apiClient.patch(path, body) as Promise<ApiResponse<T>>,

  delete: <T>(path: string) =>
    apiClient.delete(path) as Promise<ApiResponse<T>>,

  getPaginated: <T>(path: string) =>
    apiClient.get(path) as Promise<PaginatedResponse<T>>,
};

export { apiClient, clientApi };
