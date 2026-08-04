import { clientApi } from "@/lib/api/client";

export type ImportUserResult = {
  name: string;
  email: string;
  nim: string;
  password: string;
  gender: string | null;
};

export type ImportMabaRow = {
  name: string;
  nim: string;
  email: string;
  gender: string;
  username?: string;
  status?: string | boolean;
  clusterName?: string;
};

export type ImportMabaResult = {
  created: number;
  skipped: number;
  errors: { row: number; reason: string }[];
  users: ImportUserResult[];
};

export function importMaba(rows: ImportMabaRow[], options?: { seed?: boolean }) {
  return clientApi.post<ImportMabaResult>("/clusters/import/maba", { rows, seed: options?.seed ?? false });
}
