"use client";

import { useState } from "react";
import { Mail, AtSign, ShieldCheck, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/stores/user.store";
import { useSweetAlert } from "@/components/common/sweet-alert-provider";
import { updateMe } from "@/lib/api/auth";
import AvatarUpload from "@/components/common/avatar-upload";
import ChangePasswordForm from "@/components/common/change-password-form";

const ROLE_LABEL: Record<string, string> = {
  ADMIN: "Administrator",
  KADERISASI: "Kaderisasi",
  SPV: "Supervisor",
  MABA: "Mahasiswa Baru",
};

export default function PanitiaProfilPage() {
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);
  const { success: alertSuccess, error: alertError } = useSweetAlert();

  const [name, setName] = useState(user?.name ?? "");
  const [savingName, setSavingName] = useState(false);

  async function handleSaveName() {
    const trimmed = name.trim();
    if (!trimmed) {
      alertError("Nama tidak boleh kosong");
      return;
    }
    setSavingName(true);
    try {
      const res = await updateMe({ name: trimmed });
      setUser(res.data);
      alertSuccess("Nama berhasil diubah");
    } catch (err) {
      alertError(err instanceof Error ? err.message : "Gagal mengubah nama");
    } finally {
      setSavingName(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-soft-white">Profil</h1>
        <p className="text-sm text-muted-text mt-1">Kelola informasi profil dan foto profil Anda</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-card-bg p-6 flex flex-col items-center gap-4">
          <AvatarUpload />
          <div className="text-center">
            <p className="font-semibold text-soft-white">{user?.name}</p>
            <p className="text-xs text-muted-text">{user?.role ? ROLE_LABEL[user.role] ?? user.role : "-"}</p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-white/10 bg-card-bg p-6 space-y-4">
            <h2 className="text-base font-bold text-soft-white">Informasi Akun</h2>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-text">Nama Lengkap</label>
              <div className="flex gap-2">
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama lengkap" />
                <Button type="button" variant="primary" onClick={handleSaveName} loading={savingName} disabled={savingName}>
                  Simpan
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
                <Mail className="h-4 w-4 text-supernova-orange shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] uppercase text-muted-text">Email</p>
                  <p className="truncate text-sm text-soft-white">{user?.email ?? "-"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
                <AtSign className="h-4 w-4 text-electric-blue shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] uppercase text-muted-text">Username</p>
                  <p className="truncate text-sm text-soft-white">{user?.username ?? "-"}</p>
                </div>
              </div>
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
