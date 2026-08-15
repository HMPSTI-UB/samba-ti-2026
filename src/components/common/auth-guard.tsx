"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/stores/user.store";
import { useTokenStore } from "@/stores/token.store";
import { getMe } from "@/lib/api/auth";
import { ROLE_ROUTES } from "@/constant/roles";
import { Loader2 } from "lucide-react";

const PANITIA_ROLES = ["ADMIN", "KADERISASI", "SPV"];

const SPV_ALLOWED_PATHS = [
  "/dashboard",
  "/dashboard/cluster",
  "/dashboard/pengumuman",
  "/dashboard/profil",
];

function isSpvAllowedPath(pathname: string): boolean {
  return (
    SPV_ALLOWED_PATHS.includes(pathname) ||
    pathname.startsWith("/dashboard/cluster/")
  );
}

export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function verify() {
      const token = useTokenStore.getState().accessToken;
      if (!token) {
        useUserStore.getState().clearUser();
        const loginUrl = `/auth/login?redirect=${encodeURIComponent(pathname)}`;
        router.replace(loginUrl);
        return;
      }

      let user = useUserStore.getState().user;
      if (!user) {
        try {
          const res = await getMe();
          if (cancelled) return;
          if (!res.success || !res.data) throw new Error("user not found");
          user = res.data;
          useUserStore.getState().setUser(user);
        } catch {
          if (cancelled) return;
          useTokenStore.getState().clearTokens();
          useUserStore.getState().clearUser();
          router.replace(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
          return;
        }
      }

      const role = user.role.toUpperCase();
      const isMaba = role === "MABA";
      const isPanitia = PANITIA_ROLES.includes(role);
      const isMabaPage = pathname.startsWith("/app");
      const isDashboardPage = pathname.startsWith("/dashboard");

      if (isMabaPage && !isMaba) {
        router.replace(ROLE_ROUTES.mahasiswa === pathname ? "/dashboard" : ROLE_ROUTES.mahasiswa);
        return;
      }
      if (isDashboardPage && !isPanitia) {
        router.replace("/app/dashboard");
        return;
      }
      if (isDashboardPage && role === "SPV" && !isSpvAllowedPath(pathname)) {
        router.replace("/dashboard/cluster");
        return;
      }

      if (!cancelled) setChecking(false);
    }

    verify();
    return () => {
      cancelled = true;
    };
  }, [pathname, router]);

  if (checking) {
    return (
      <div className="flex h-screen items-center justify-center bg-deep-space">
        <Loader2 className="h-8 w-8 animate-spin text-electric-blue" />
      </div>
    );
  }

  return <>{children}</>;
}
