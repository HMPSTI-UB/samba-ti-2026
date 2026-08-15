"use client";

import { useCallback, useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useUserStore, type User } from "@/stores/user.store";
import { useTokenStore } from "@/stores/token.store";
import { getMe } from "@/lib/api/auth";
import { ROLE_ROUTES } from "@/constant/roles";

function roleRoute(role: string): string {
  return ROLE_ROUTES[role.toLowerCase()] ?? ROLE_ROUTES.mahasiswa;
}

export default function LoginGuard({ children }: { children: ReactNode }) {
  const router = useRouter();

  const redirectIfAuthenticated = useCallback(async () => {
    const accessToken = useTokenStore.getState().accessToken;
    const storeUser = useUserStore.getState().user;

    // Tanpa token, tidak ada yang bisa di-redirect — bersihkan user basi (kalau ada)
    // supaya tidak terjebak loop login ↔ dashboard.
    if (!accessToken) {
      if (storeUser) useUserStore.getState().clearUser();
      return;
    }

    if (storeUser) {
      router.replace(roleRoute(storeUser.role));
      return;
    }

    try {
      const res = await getMe();
      if (!res.success || !res.data) return;
      useUserStore.getState().setUser(res.data);
      router.replace(roleRoute(res.data.role));
    } catch {
      // token invalid/expired — biarkan tetap di halaman login
    }
  }, [router]);

  useEffect(() => {
    redirectIfAuthenticated();
    const onShow = (event: PageTransitionEvent) => {
      if (event.persisted) redirectIfAuthenticated();
    };
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, [redirectIfAuthenticated]);

  return <>{children}</>;
}
