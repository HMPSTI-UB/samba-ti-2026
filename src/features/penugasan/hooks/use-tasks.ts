"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTasks,
  getTask,
  getTaskSubmissions,
  createTask,
  updateTask,
  deleteTask,
  submitTask,
  getSubmissions,
  reviewSubmission,
  getMyTasks,
  getMySubmission,
  getMemberTasks,
} from "@/features/penugasan/api/tasks";
import type { CreateTaskInput, UpdateTaskInput } from "@/features/penugasan/types";

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
}

export function useMyTasks() {
  return useQuery({
    queryKey: ["maba", "tasks"],
    queryFn: getMyTasks,
  });
}

export function useMemberTasks(mabaId: string) {
  return useQuery({
    queryKey: ["tasks", "member", mabaId],
    queryFn: () => getMemberTasks(mabaId),
    enabled: !!mabaId,
  });
}

export function useMySubmission(taskId: string) {
  return useQuery({
    queryKey: ["maba", "tasks", taskId, "my-submission"],
    queryFn: () => getMySubmission(taskId),
    enabled: !!taskId,
  });
}

export function useTask(id: string) {
  return useQuery({
    queryKey: ["tasks", id],
    queryFn: () => getTask(id),
    enabled: !!id,
  });
}

export function useTaskSubmissions(taskId: string, params?: { search?: string; clusterId?: string }) {
  return useQuery({
    queryKey: ["tasks", taskId, "submissions", params],
    queryFn: () => getTaskSubmissions(taskId, params),
    enabled: !!taskId,
  });
}

export function useCreateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTaskInput) => createTask(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
      qc.invalidateQueries({ queryKey: ["audit-logs"] });
    },
  });
}

export function useUpdateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateTaskInput) => updateTask(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
      qc.invalidateQueries({ queryKey: ["audit-logs"] });
    },
  });
}

export function useDeleteTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
      qc.invalidateQueries({ queryKey: ["audit-logs"] });
    },
  });
}

export function useSubmitTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: Record<string, string> }) =>
      submitTask(taskId, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
      qc.invalidateQueries({ queryKey: ["audit-logs"] });
      qc.invalidateQueries({ queryKey: ["maba", "tasks"] });
    },
  });
}

export function useSubmissions(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["submissions"],
    queryFn: getSubmissions,
    enabled: options?.enabled,
  });
}

export function useReviewSubmission() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ taskId, id, status, feedback }: { taskId: string; id: string; status: "ACCEPTED" | "REJECTED"; feedback: string }) =>
      reviewSubmission(taskId, id, status, feedback),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ["tasks", variables.taskId, "submissions"] });
      qc.invalidateQueries({ queryKey: ["submissions"] });
      qc.invalidateQueries({ queryKey: ["audit-logs"] });
      qc.invalidateQueries({ queryKey: ["tasks", "member"] });
    },
  });
}
