import { clientApi } from "./client";
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

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

/** Login (identifier = email / NIM / username) */
export type LoginInput = {
  identifier: string;
  password: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export function login(data: LoginInput): Promise<ApiResponse<AuthTokens>> {
  return clientApi.post<AuthTokens>("/auth/login", data);
}

export function register(data: RegisterInput): Promise<ApiResponse<User>> {
  return clientApi.post<User>("/auth/register", data);
}

export function getMe(): Promise<ApiResponse<User>> {
  return clientApi.get<User>("/auth/me");
}

export function updateMe(data: { name?: string; avatarUrl?: string | null; avatarKey?: string | null }): Promise<ApiResponse<User>> {
  return clientApi.patch<User>("/auth/me", data);
}

export function logout(): Promise<ApiResponse<null>> {
  return clientApi.post<null>("/auth/logout");
}
