import { clientApi } from "@/lib/api/client";

export type MabaExportItem = {
  id: string;
  name: string;
  username: string | null;
  email: string;
  nim: string | null;
  gender: string | null;
  status: boolean;
  clusterId: string | null;
  clusterName: string | null;
  createdAt: string;
};

export function getMabaExportData() {
  return clientApi.get<MabaExportItem[]>("/users/export/maba");
}

export function getMabaSeedData() {
  return clientApi.get<MabaExportItem[]>("/kaderisasi/export/maba-seed");
}

export function resetMabaData() {
  return clientApi.delete<{ message: string }>("/users/reset/maba");
}
