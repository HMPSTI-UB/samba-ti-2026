"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSweetAlert } from "@/components/common/sweet-alert-provider";
import { uploadFileToS3 } from "@/lib/api/upload";
import { updateMe } from "@/lib/api/auth";
import { useUserStore } from "@/stores/user.store";

export default function AvatarUpload() {
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);
  const { success: alertSuccess, error: alertError } = useSweetAlert();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const initial = user?.name?.charAt(0)?.toUpperCase() ?? "U";

  function handleSelect(f: File) {
    if (!f.type.startsWith("image/")) {
      alertError("File harus berupa gambar");
      return;
    }
    if (f.size > 2 * 1024 * 1024) {
      alertError("Ukuran foto maksimal 2MB");
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function handleSave() {
    if (!file) return;
    setUploading(true);
    try {
      const { key, publicUrl } = await uploadFileToS3(file, "avatars");
      const res = await updateMe({ avatarKey: key, avatarUrl: publicUrl });
      setUser(res.data);
      setFile(null);
      setPreview(null);
      alertSuccess("Foto profil berhasil diubah");
    } catch (err) {
      alertError(err instanceof Error ? err.message : "Gagal mengunggah foto");
    } finally {
      setUploading(false);
    }
  }

  function handleCancel() {
    setFile(null);
    setPreview(null);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-slate-600/50">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Preview" className="h-full w-full object-cover" />
          ) : user?.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt={user.name}
              width={112}
              height={112}
              unoptimized
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-4xl font-semibold text-soft-white">{initial}</span>
          )}
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-sun-gold text-black shadow transition-colors hover:bg-yellow-500 disabled:opacity-50"
        >
          <Camera className="h-4 w-4" />
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleSelect(f); }}
        />
      </div>

      {preview && (
        <div className="flex items-center gap-2">
          <Button type="button" variant="primary" size="sm" onClick={handleSave} loading={uploading} disabled={uploading}>
            Simpan Foto
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={handleCancel} disabled={uploading}>
            Batal
          </Button>
        </div>
      )}
    </div>
  );
}
