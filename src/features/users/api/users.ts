import { clientApi } from "@/lib/api/client";

export type SafeUser = {
  id: string;
  name: string;
  username: string | null;
  email: string;
  nim: string | null;
  gender: string | null;
  role: string;
  status: boolean;
  clusterId: string | null;
  avatarUrl: string | null;
  avatarKey: string | null;
  createdAt: string;
  updatedAt: string;
};

export type GetUsersResponse = {
  data: SafeUser[];
  total: number;
  page: number;
  limit: number;
};

export function getUsers(params: {
  search?: string;
  role?: string;
  status?: string;
  clusterId?: string;
  page: number;
  limit: number;
}) {
  const searchParams = new URLSearchParams();
  if (params.search) searchParams.set("search", params.search);
  if (params.role) searchParams.set("role", params.role);
  if (params.status !== undefined && params.status !== "") searchParams.set("status", params.status);
  if (params.clusterId) searchParams.set("clusterId", params.clusterId);
  searchParams.set("page", String(params.page));
  searchParams.set("limit", String(params.limit));

  return clientApi.get<GetUsersResponse>(`/users?${searchParams.toString()}`);
}

export function createUser(data: {
  name: string;
  email: string;
  password?: string;
  nim?: string;
  gender?: "L" | "P";
  username?: string;
  role: string;
}) {
  return clientApi.post<{ data: { user: SafeUser; plainPassword: string } }>("/users", data);
}

export function updateUser(
  id: string,
  data: { name?: string; email?: string; username?: string; gender?: "L" | "P" | null; status?: boolean },
) {
  return clientApi.patch<{ data: SafeUser }>(`/users/${id}`, data);
}

export function updateUserRole(id: string, role: "SPV" | "MABA") {
  return clientApi.patch<{ data: SafeUser }>(`/users/${id}/role`, { role });
}

export function deleteUser(id: string) {
  return clientApi.delete<{ message: string }>(`/users/${id}`);
}
