"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAnnouncements,
  getUnreadCount,
  createAnnouncement,
  markAsRead,
} from "@/features/pengumuman/api/announcements";
import type { AnnouncementFilters, CreateAnnouncementInput } from "@/features/pengumuman/types";

export function useAnnouncements(filters: AnnouncementFilters) {
  return useQuery({
    queryKey: ["announcements", filters],
    queryFn: () => getAnnouncements(filters),
  });
}

export function useUnreadCount() {
  return useQuery({
    queryKey: ["announcements", "unread-count"],
    queryFn: getUnreadCount,
    refetchInterval: 30_000,
  });
}

export function useCreateAnnouncement() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateAnnouncementInput) => createAnnouncement(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["announcements"] });
      qc.invalidateQueries({ queryKey: ["announcements", "unread-count"] });
    },
  });
}

export function useMarkAsRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => markAsRead(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["announcements"] });
      qc.invalidateQueries({ queryKey: ["announcements", "unread-count"] });
    },
  });
}
