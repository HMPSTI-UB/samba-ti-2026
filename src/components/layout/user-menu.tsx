"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, UserRound } from "lucide-react";
import { useUserStore } from "@/stores/user.store";
import { useTokenStore } from "@/stores/token.store";
import { logout as logoutApi } from "@/lib/api/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserMenu() {
  const router = useRouter();
  const user = useUserStore((s) => s.user);
  const clearUser = useUserStore((s) => s.clearUser);
  const initial = user?.name?.charAt(0)?.toUpperCase() ?? "U";
  const isMaba = user?.role.toUpperCase() === "MABA";
  const profilUrl = isMaba ? "/app/profil" : "/dashboard/profil";

  async function handleLogout() {
    try {
      await logoutApi();
    } catch {
      // tetap lanjut logout lokal walau server gagal
    }
    useTokenStore.getState().clearTokens();
    clearUser();
    router.push("/auth/login");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Menu profil"
          className="flex items-center gap-[18px] rounded-full outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
        >
          <span className="hidden flex-col items-end leading-tight md:flex">
            <span className="text-sm font-medium text-soft-white">{user?.name ?? "User"}</span>
            <span className="text-xs text-muted-text capitalize">{user?.role ?? "-"}</span>
          </span>
          {user?.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt={user.name}
              width={34}
              height={34}
              unoptimized
              className="h-[34px] w-[34px] shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-slate-500/60 text-sm font-semibold text-soft-white">
              {initial}
            </div>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8} className="w-56">
        <div className="flex flex-col gap-1 px-3 py-3 md:hidden">
          <span className="text-sm font-semibold text-soft-white">{user?.name ?? "User"}</span>
          <span className="text-xs text-muted-text capitalize">{user?.role ?? "-"}</span>
        </div>
        <DropdownMenuSeparator className="md:hidden" />

        <DropdownMenuItem asChild>
          <Link href={profilUrl} className="cursor-pointer">
            <UserRound size={16} className="text-muted-text" />
            Profil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={handleLogout}
          className="cursor-pointer text-destructive data-[highlighted]:bg-destructive/10"
        >
          <LogOut size={16} />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
