export type Cluster = {
  id: string;
  name: string;
  slug: string;
  joinCode: string;
  clusterNumber: number | null;
  clusterMeaning: string | null;
  whatsappGroupLink: string | null;
  spvId: string | null;
  spvName: string | null;
  memberCount: number;
  createdAt: string;
};

export type ClusterFormValues = {
  name: string;
  slug?: string;
  clusterNumber?: number | null;
  clusterMeaning?: string | null;
  whatsappGroupLink?: string;
};

export type ClusterMember = {
  id: string;
  name: string;
  email: string;
  nim: string | null;
};

export type ClusterMemberProgress = {
  id: string;
  name: string;
  username: string | null;
  email: string;
  nim: string | null;
  gender: string | null;
  role: string;
  status: boolean;
  clusterId: string | null;
  createdAt: string;
  updatedAt: string;
  doneCount: number;
  pendingCount: number;
};

export type ClusterDetail = {
  cluster: Cluster;
  totalTasks: number;
  members: ClusterMemberProgress[];
};

export type PublicCluster = {
  id: string;
  name: string;
  slug: string;
  clusterNumber: number | null;
  clusterMeaning: string | null;
  spvName: string | null;
  memberCount: number | string;
  createdAt: string;
};

export type PublicClusterMember = {
  id: string;
  name: string;
  nim: string | null;
  gender: string | null;
};

export type PublicClusterDetail = {
  cluster: PublicCluster;
  members: PublicClusterMember[];
};
