"use server";

import { cookies } from "next/headers";
import { serverApi } from "@/lib/api/server";
import { ApiError } from "@/lib/api/errors";
import type { LoginPayload, LoginActionResult, AuthTokens } from "@/features/auth/types/action";

export async function loginAction(payload: LoginPayload): Promise<LoginActionResult> {
  try {
    const response = await serverApi.post<AuthTokens>("/auth/login", payload);

    const cookieStore = await cookies();
    const isProd = process.env.NODE_ENV === "production";

    cookieStore.set("access_token", response.data.accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    cookieStore.set("refresh_token", response.data.refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return { success: true };
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
