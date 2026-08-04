import { clientApi } from "@/lib/api/client";
import type { Task, Submission, CreateTaskInput, UpdateTaskInput, MabaTask, MySubmission, MemberTasksData } from "@/features/penugasan/types";

export function getTasks() {
  return clientApi.get<Task[]>("/tasks");
}

export function getMemberTasks(mabaId: string) {
  return clientApi.get<MemberTasksData>(`/tasks/member/${mabaId}/tasks`);
}

export function getMyTasks() {
  return clientApi.get<MabaTask[]>("/maba/tasks");
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

export function getMySubmission(taskId: string) {
  return clientApi.get<MySubmission | null>(`/tasks/${taskId}/my-submission`);
}

export function getSubmissions() {
  return clientApi.get<Submission[]>("/spv/tasks/submissions");
}

export function getTaskSubmissions(taskId: string, params?: { search?: string; clusterId?: string }) {
  const searchParams = new URLSearchParams();
  if (params?.search) searchParams.set("search", params.search);
  if (params?.clusterId) searchParams.set("clusterId", params.clusterId);
  return clientApi.get<Submission[]>(`/tasks/${taskId}/submissions?${searchParams.toString()}`);
}

export function reviewSubmission(taskId: string, submissionId: string, status: "ACCEPTED" | "REJECTED", feedback: string) {
  return clientApi.patch<{ message: string }>(`/tasks/${taskId}/submissions/${submissionId}`, { status, feedback });
}
