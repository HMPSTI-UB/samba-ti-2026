import { clientApi } from "@/lib/api/client";
import type { SystemSettings, UpdateSettingsInput } from "@/features/settings/types";

export function getSettings() {
  return clientApi.get<SystemSettings>("/kaderisasi/settings");
}

export function updateSettings(data: UpdateSettingsInput) {
  return clientApi.patch<SystemSettings>("/kaderisasi/settings", data);
}
