import { apiClient } from "./client";
import type { ApiResponse } from "./types";

export type User = {
  id: string;
  name: string;
  username: string | null;
  email: string;
  nim: string | null;
  role: string;
  status: boolean;
  clusterId: string | null;
  avatarUrl: string | null;
  avatarKey: string | null;
  createdAt: string;
  updatedAt: string;
};

/** Credentials login untuk Panitia (email + password) */
export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export function login(data: LoginInput): Promise<ApiResponse<User>> {
  return apiClient.post("/auth/login", data) as Promise<ApiResponse<User>>;
}

export function register(data: RegisterInput): Promise<ApiResponse<User>> {
  return apiClient.post("/auth/register", data) as Promise<ApiResponse<User>>;
}

export function getMe(): Promise<ApiResponse<User>> {
  return apiClient.get("/auth/me") as Promise<ApiResponse<User>>;
}

export function updateMe(data: { name?: string; avatarUrl?: string | null; avatarKey?: string | null }): Promise<ApiResponse<User>> {
  return apiClient.patch("/auth/me", data) as Promise<ApiResponse<User>>;
}

export function refresh(): Promise<void> {
  return apiClient.post("/auth/refresh") as Promise<void>;
}
