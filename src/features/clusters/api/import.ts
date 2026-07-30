import { clientApi } from "@/lib/api/client";

export type ImportUserResult = {
  name: string;
  email: string;
  nim: string;
  password: string;
  gender: string | null;
};

export type ImportMabaResult = {
  created: number;
  skipped: number;
  errors: { row: number; reason: string }[];
  users: ImportUserResult[];
};

export function importMaba(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return clientApi.post<ImportMabaResult>("/clusters/import/maba", formData);
}
