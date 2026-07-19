import { clientApi } from "@/lib/api/client";
import type { Task, Submission, CreateTaskInput } from "@/features/penugasan/types";

export function getTasks() {
  return clientApi.get<Task[]>("/tasks");
}

export function getTask(id: string) {
  return clientApi.get<Task>(`/tasks/${id}`);
}

export function createTask(data: CreateTaskInput) {
  return clientApi.post<Task>("/kaderisasi/tasks", data);
}

export function submitTask(taskId: string, data: Record<string, string>) {
  return clientApi.post<{ message: string }>(`/tasks/${taskId}/submit`, data);
}

export function getSubmissions() {
  return clientApi.get<Submission[]>("/spv/tasks/submissions");
}

export function reviewSubmission(id: string, status: "ACCEPTED" | "REJECTED", feedback: string) {
  return clientApi.patch<{ message: string }>(`/spv/tasks/submissions/${id}`, { status, feedback });
}
