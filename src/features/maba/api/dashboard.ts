import { clientApi } from "@/lib/api/client";

export type MabaDashboardTask = {
  id: string;
  title: string;
  deadline: string;
};

export type MabaDashboard = {
  cluster: {
    id: string;
    name: string;
    spvName: string | null;
  } | null;
  totalTasks: number;
  doneCount: number;
  pendingCount: number;
  nearestDeadline: string | null;
  latestTasks: MabaDashboardTask[];
};

export function getMabaDashboard() {
  return clientApi.get<MabaDashboard>("/maba/dashboard");
}