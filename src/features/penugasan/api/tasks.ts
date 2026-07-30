import { clientApi } from "@/lib/api/client";
import type { Task, Submission, CreateTaskInput, UpdateTaskInput } from "@/features/penugasan/types";

export function getTasks() {
  return clientApi.get<Task[]>("/tasks");
}

export function getTask(id: string) {
  return clientApi.get<Task>(`/tasks/${id}`);
}

export function createTask(data: CreateTaskInput) {
  return clientApi.post<Task>("/tasks", data);
}

export function updateTask(data: UpdateTaskInput) {
  const { id, ...body } = data;
  return clientApi.patch<Task>(`/tasks/${id}`, body);
}

export function deleteTask(id: string) {
  return clientApi.delete<{ message: string }>(`/tasks/${id}`);
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
