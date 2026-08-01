"use server";

import { cookies } from "next/headers";
import { serverApi } from "@/lib/api/server";
import { ApiError } from "@/lib/api/errors";
import type { LoginPayload, LoginActionResult, AuthTokens } from "@/features/auth/types/action";

export async function loginAction(payload: LoginPayload): Promise<LoginActionResult> {
  try {
    const response = await serverApi.post<AuthTokens>("/auth/login", {
      identifier: payload.identifier,
      password: payload.password,
    });

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

export async function logoutAction(): Promise<{ success: boolean; message?: string }> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (accessToken) {
      await serverApi.post("/auth/logout", undefined, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    }

    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");

    return { success: true };
  } catch {
    return { success: false, message: "Gagal logout" };
  }
}
