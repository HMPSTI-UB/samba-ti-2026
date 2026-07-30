export type Cluster = {
  id: string;
  name: string;
  slug: string;
  joinCode: string;
  whatsappGroupLink: string | null;
  spvId: string | null;
  spvName: string | null;
  memberCount: number;
  createdAt: string;
};

export type ClusterFormValues = {
  name: string;
  slug?: string;
  whatsappGroupLink?: string;
};

export type ClusterMember = {
  id: string;
  name: string;
  email: string;
  nim: string | null;
};
