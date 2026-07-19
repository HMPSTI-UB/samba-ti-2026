"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTasks,
  getTask,
  createTask,
  submitTask,
  getSubmissions,
  reviewSubmission,
} from "@/features/penugasan/api/tasks";
import type { CreateTaskInput } from "@/features/penugasan/types";

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
}

export function useTask(id: string) {
  return useQuery({
    queryKey: ["tasks", id],
    queryFn: () => getTask(id),
    enabled: !!id,
  });
}

export function useCreateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTaskInput) => createTask(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
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
    },
  });
}

export function useSubmissions() {
  return useQuery({
    queryKey: ["submissions"],
    queryFn: getSubmissions,
  });
}

export function useReviewSubmission() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status, feedback }: { id: string; status: "ACCEPTED" | "REJECTED"; feedback: string }) =>
      reviewSubmission(id, status, feedback),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["submissions"] });
    },
  });
}
