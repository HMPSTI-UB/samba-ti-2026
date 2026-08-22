"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAnnouncements,
  getUnreadCount,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  markAsRead,
} from "@/features/pengumuman/api/announcements";
import type { AnnouncementFilters, CreateAnnouncementInput } from "@/features/pengumuman/types";

export function useAnnouncements(filters: AnnouncementFilters, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["announcements", filters],
    queryFn: () => getAnnouncements(filters),
    enabled: options?.enabled,
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

export function useUpdateAnnouncement() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateAnnouncementInput }) =>
      updateAnnouncement(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["announcements"] });
      qc.invalidateQueries({ queryKey: ["announcements", "unread-count"] });
    },
  });
}

export function useDeleteAnnouncement() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteAnnouncement,
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
