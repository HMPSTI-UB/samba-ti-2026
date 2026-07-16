export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type LoginActionResult =
  | { success: true }
  | { success: false; message: string; errors?: Record<string, string[]> };
