export type PendingSubmission = {
  id: string;
  taskId: string;
  mabaName: string;
  taskTitle: string;
  clusterName: string | null;
  submittedAt: string;
};

export type DashboardTask = {
  id: string;
  title: string;
  status: "DRAFT" | "PUBLISHED";
  deadline: string;
  createdAt: string;
};

export type PanitiaDashboard = {
  totalMaba: number;
  totalSpv: number;
  totalClusters: number;
  totalTasks: number;
  totalDraftTasks: number;
  submissions: {
    pending: number;
    accepted: number;
    rejected: number;
  };
  participationRate: number;
  deadlinesToday: number;
  nearestDeadline: string | null;
  latestTasks: DashboardTask[];
  latestPending: PendingSubmission[];
};
