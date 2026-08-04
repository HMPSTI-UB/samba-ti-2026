"use client";

import Image from "next/image";
import { useUserStore } from "@/stores/user.store";

export default function UserMenu() {
  const user = useUserStore((s) => s.user);
  const initial = user?.name?.charAt(0)?.toUpperCase() ?? "U";

  return (
    <div className="flex items-center gap-[18px]">
      <div className="flex flex-col items-end leading-tight">
        <span className="text-sm font-medium text-soft-white">{user?.name ?? "User"}</span>
        <span className="text-xs text-muted-text capitalize">{user?.role ?? "-"}</span>
      </div>
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
    </div>
  );
}
