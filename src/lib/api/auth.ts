import { apiClient } from "./client";
import type { ApiResponse } from "./types";

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

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

export function refresh(): Promise<void> {
  return apiClient.post("/auth/refresh") as Promise<void>;
}
