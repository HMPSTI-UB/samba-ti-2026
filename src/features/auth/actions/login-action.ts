"use server";

import { cookies } from "next/headers";
import { serverApi } from "@/lib/api/server";
import { ApiError } from "@/lib/api/errors";


type LoginPayload = {
  email: string;
  password: string;
};

type AuthTokens = {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
};

type LoginActionResult =
  | { success: true; user: AuthTokens["user"] }
  | { success: false; message: string; errors?: Record<string, string[]> };

export async function loginAction(payload: LoginPayload): Promise<LoginActionResult> {
  try {
    const response = await serverApi.post<AuthTokens>("/auth/login", payload);

    const cookieStore = await cookies();
    const isProd = process.env.NODE_ENV === "production";

    cookieStore.set("access_token", response.data.access_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15, // 15 menit
    });

    cookieStore.set("refresh_token", response.data.refresh_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 hari
    });

    return { success: true, user: response.data.user };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message,
        errors: error.hasValidationErrors() ? error.getAllFieldErrors() : undefined,
      };
    }

    return {
      success: false,
      message: "Koneksi ke server gagal. Coba lagi nanti.",
    };
  }
}
