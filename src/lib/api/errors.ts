import type { ApiErrorResponse } from "./types";

export class ApiError extends Error {
  status: number;
  errors: Record<string, string[]>;
  raw: ApiErrorResponse;

  constructor(response: ApiErrorResponse, status: number) {
    super(response.message);
    this.name = "ApiError";
    this.status = status;
    this.errors = response.errors ?? {};
    this.raw = response;
  }

  hasValidationErrors(): boolean {
    return Object.keys(this.errors).length > 0;
  }

  getFieldError(field: string): string | null {
    const messages = this.errors[field];
    return messages && messages.length > 0 ? messages[0] : null;
  }

  getAllFieldErrors(): Record<string, string[]> {
    return this.errors;
  }
}
