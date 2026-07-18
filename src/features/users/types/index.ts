export type UserFilters = {
  search?: string;
  role?: string;
  status?: boolean;
  page: number;
  limit: number;
};

export type UserFormValues = {
  name: string;
  email: string;
  password?: string;
  nim?: string;
  role: "ADMIN" | "KADERISASI" | "SPV" | "MABA";
};

export type UserRow = {
  id: string;
  name: string;
  email: string;
  nim: string | null;
  role: string;
  status: boolean;
  clusterId: string | null;
  createdAt: string;
  updatedAt: string;
};
