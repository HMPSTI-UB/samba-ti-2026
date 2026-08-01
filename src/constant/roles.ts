export const ROLES = {
  MAHASISWA: "mahasiswa",
  SPV: "spv",
  KADERISASI: "kaderisasi",
  ADMIN: "admin",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_ROUTES: Record<string, string> = {
  [ROLES.MAHASISWA]: "/app/dashboard",
  [ROLES.SPV]: "/dashboard",
  [ROLES.KADERISASI]: "/dashboard",
  [ROLES.ADMIN]: "/dashboard",
};

export const DEFAULT_ROLE = ROLES.MAHASISWA;
export const DEFAULT_ROUTE = ROLE_ROUTES[DEFAULT_ROLE];
