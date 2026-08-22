"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/user.store";
import { useSweetAlert } from "@/components/common/sweet-alert-provider";
import { updateMe } from "@/lib/api/auth";

export default function ProfileForm() {
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);
  const { success: alertSuccess, error: alertError } = useSweetAlert();

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [username, setUsername] = useState(user?.username ?? "");
  const [gender, setGender] = useState(user?.gender ?? "");
  const [nim, setNim] = useState(user?.nim ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Nama tidak boleh kosong";
    if (!email.trim()) next.email = "Email tidak boleh kosong";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Email tidak valid";
    if (!username.trim()) next.username = "Username tidak boleh kosong";
    else if (!/^[a-z0-9_.]{3,50}$/.test(username.trim())) {
      next.username = "Minimal 3 karakter; hanya huruf kecil, angka, titik, underscore";
    }
    if (nim.trim() && !/^\d{15}$/.test(nim.trim())) next.nim = "NIM harus 15 digit angka";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSave() {
    if (!validate()) return;
    setSaving(true);
    try {
      const res = await updateMe({
        name: name.trim(),
        email: email.trim(),
        username: username.trim(),
        gender: gender === "" ? null : (gender as "L" | "P"),
        nim: nim.trim() || undefined,
      });
      setUser(res.data);
      alertSuccess("Profil berhasil diperbarui");
    } catch (err) {
      alertError(err instanceof Error ? err.message : "Gagal memperbarui profil");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-xl border border-white/10 bg-card-bg p-6 space-y-4">
      <h2 className="text-base font-bold text-soft-white">Informasi Akun</h2>

      <div className="space-y-4">
        <Input
          label="Nama Lengkap"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama lengkap"
          error={errors.name}
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@contoh.com"
          error={errors.email}
        />
        <Input
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          error={errors.username}
          helperText="Huruf kecil, angka, titik, underscore — dipakai untuk login"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label="Jenis Kelamin"
            items={[
              { value: "", label: "Tidak diisi" },
              { value: "L", label: "Laki-laki" },
              { value: "P", label: "Perempuan" },
            ]}
            value={gender}
            onValueChange={setGender}
          />
          <Input
            label="NIM"
            value={nim}
            onChange={(e) => setNim(e.target.value)}
            placeholder="15 digit NIM"
            error={errors.nim}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="button" variant="primary" onClick={handleSave} loading={saving} disabled={saving}>
          Simpan Profil
        </Button>
      </div>
    </div>
  );
}