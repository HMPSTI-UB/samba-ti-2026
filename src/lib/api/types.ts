export type ApiResponse<T> = {
  success: true;
  message: string;
  data: T;
};

export type PaginatedResponse<T> = {
  success: true;
  message: string;
  data: T[];
  pagination: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
};
