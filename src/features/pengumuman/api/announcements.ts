import { clientApi } from "@/lib/api/client";
import type { PaginatedAnnouncements, PaginatedPublicAnnouncements, CreateAnnouncementInput, AnnouncementRow } from "@/features/pengumuman/types";

export function getAnnouncements(params: { page: number; limit: number; unreadOnly?: boolean }) {
  const searchParams = new URLSearchParams();
  searchParams.set("page", String(params.page));
  searchParams.set("limit", String(params.limit));
  if (params.unreadOnly) searchParams.set("unreadOnly", "true");

  return clientApi.get<PaginatedAnnouncements>(`/announcements?${searchParams.toString()}`);
}

export function getPublicAnnouncements(params: { page: number; limit: number }) {
  const searchParams = new URLSearchParams();
  searchParams.set("page", String(params.page));
  searchParams.set("limit", String(params.limit));

  return clientApi.get<PaginatedPublicAnnouncements>(
    `/public/announcements?${searchParams.toString()}`,
  );
}

export function getUnreadCount() {
  return clientApi.get<{ unreadCount: number }>("/announcements/unread-count");
}

export function createAnnouncement(data: CreateAnnouncementInput) {
  return clientApi.post<AnnouncementRow>("/announcements", data);
}

export function markAsRead(id: string) {
  return clientApi.patch<{ message: string }>(`/announcements/${id}/read`);
}
