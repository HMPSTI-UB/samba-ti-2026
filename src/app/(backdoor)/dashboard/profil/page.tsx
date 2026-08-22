"use client";

import { ShieldCheck, BadgeCheck } from "lucide-react";
import { useUserStore } from "@/stores/user.store";
import AvatarUpload from "@/components/common/avatar-upload";
import ProfileForm from "@/components/common/profile-form";
import ChangePasswordForm from "@/components/common/change-password-form";

const ROLE_LABEL: Record<string, string> = {
  ADMIN: "Administrator",
  KADERISASI: "Kaderisasi",
  SPV: "Supervisor",
  MABA: "Mahasiswa Baru",
};

export default function PanitiaProfilPage() {
  const user = useUserStore((s) => s.user);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-soft-white">Profil</h1>
        <p className="text-sm text-muted-text mt-1">Kelola informasi profil dan foto profil Anda</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-card-bg p-6 flex flex-col items-center gap-4 self-start">
          <AvatarUpload />
          <div className="text-center">
            <p className="font-semibold text-soft-white">{user?.name}</p>
            <p className="text-xs text-muted-text">{user?.role ? ROLE_LABEL[user.role] ?? user.role : "-"}</p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <ProfileForm />

          <div className="rounded-xl border border-white/10 bg-card-bg p-6">
            <h2 className="mb-4 text-base font-bold text-soft-white">Detail Akun</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
                <ShieldCheck className="h-4 w-4 text-cosmic-purple shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] uppercase text-muted-text">Role</p>
                  <p className="truncate text-sm text-soft-white">{user?.role ? ROLE_LABEL[user.role] ?? user.role : "-"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
                <BadgeCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] uppercase text-muted-text">Status</p>
                  <p className="truncate text-sm text-soft-white">{user?.status ? "Aktif" : "Nonaktif"}</p>
                </div>
              </div>
            </div>
          </div>

          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}