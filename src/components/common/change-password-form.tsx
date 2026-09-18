"use client";

import { useState } from "react";
import { KeyRound, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSweetAlert } from "@/components/common/sweet-alert-provider";
import { updateMe } from "@/lib/api/auth";

export default function ChangePasswordForm() {
  const { success: alertSuccess, error: alertError } = useSweetAlert();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!currentPassword.trim()) next.currentPassword = "Password saat ini wajib diisi";
    if (!newPassword) next.newPassword = "Password baru wajib diisi";
    else if (newPassword.length < 8) next.newPassword = "Password baru minimal 8 karakter";
    if (!confirmPassword) next.confirmPassword = "Konfirmasi password wajib diisi";
    else if (newPassword && confirmPassword !== newPassword) next.confirmPassword = "Konfirmasi password tidak cocok";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function reset() {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrors({});
  }

  async function handleSubmit() {
    if (!validate()) return;
    setSaving(true);
    try {
      await updateMe({ currentPassword, newPassword, confirmPassword });
      reset();
      alertSuccess("Password berhasil diubah");
    } catch (err) {
      alertError(err instanceof Error ? err.message : "Gagal mengubah password");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-xl border border-white/10 bg-card-bg p-6 space-y-4">
      <div className="flex items-center gap-2">
        <KeyRound className="h-5 w-5 text-electric-blue" />
        <h2 className="text-base font-bold text-soft-white">Ubah Password</h2>
      </div>

      <div className="space-y-4">
        <Input
          label="Password Saat Ini"
          type={showCurrent ? "text" : "password"}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Masukkan password saat ini"
          error={errors.currentPassword}
          autoComplete="current-password"
          rightIcon={
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowCurrent(!showCurrent)}
              className="hover:text-soft-white transition-colors"
            >
              {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />
        <Input
          label="Password Baru"
          type={showNew ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Minimal 8 karakter"
          error={errors.newPassword}
          helperText="Gunakan minimal 8 karakter"
          autoComplete="new-password"
          rightIcon={
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowNew(!showNew)}
              className="hover:text-soft-white transition-colors"
            >
              {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />
        <Input
          label="Konfirmasi Password Baru"
          type={showConfirm ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Ulangi password baru"
          error={errors.confirmPassword}
          autoComplete="new-password"
          rightIcon={
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowConfirm(!showConfirm)}
              className="hover:text-soft-white transition-colors"
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />
      </div>

      <div className="flex justify-end">
        <Button type="button" variant="primary" onClick={handleSubmit} loading={saving} disabled={saving}>
          Simpan Password
        </Button>
      </div>
    </div>
  );
}
