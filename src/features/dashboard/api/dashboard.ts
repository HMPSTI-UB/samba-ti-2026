import { clientApi } from "@/lib/api/client";
import type { PanitiaDashboard } from "@/features/dashboard/types";

export function getPanitiaDashboard() {
  return clientApi.get<PanitiaDashboard>("/kaderisasi/dashboard");
}
