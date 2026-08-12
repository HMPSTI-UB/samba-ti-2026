"use client";

import { useCallback, useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useUserStore, type User } from "@/stores/user.store";
import { ROLE_ROUTES } from "@/constant/roles";

function roleRoute(role: string): string {
  return ROLE_ROUTES[role.toLowerCase()] ?? ROLE_ROUTES.mahasiswa;
}

export default function LoginGuard({ children }: { children: ReactNode }) {
  const router = useRouter();

  const redirectIfAuthenticated = useCallback(async () => {
    const storeUser = useUserStore.getState().user;
    if (storeUser) {
      router.replace(roleRoute(storeUser.role));
      return;
    }

    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (!res.ok) return;
      const body = (await res.json()) as {
        success: boolean;
        data?: User | null;
      };
      if (!body.success || !body.data) return;
      useUserStore.getState().setUser(body.data);
      router.replace(roleRoute(body.data.role));
    } catch {
      // koneksi/network error — biarkan tetap di halaman login
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
