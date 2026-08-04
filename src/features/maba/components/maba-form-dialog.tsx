"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type { SafeUser } from "@/features/users/api/users";

const mabaFormSchema = z.object({
  name: z.string().min(2, "Minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  nim: z.string().regex(/^\d{15}$/, "NIM harus 15 digit angka").optional().or(z.literal("")),
  gender: z.enum(["L", "P"]).optional().or(z.literal("")),
  username: z
    .string()
    .min(3, "Minimal 3 karakter")
    .regex(/^[a-z0-9_.]+$/, "Hanya huruf kecil, angka, titik, dan underscore")
    .optional()
    .or(z.literal("")),
  password: z.string().min(8, "Minimal 8 karakter").max(72).optional().or(z.literal("")),
  status: z.enum(["true", "false"]),
});

export type MabaFormData = z.infer<typeof mabaFormSchema>;

function normalizeGender(gender: string | null): "" | "L" | "P" {
  const n = gender?.trim().toUpperCase();
  if (n === "P" || n === "PEREMPUAN") return "P";
  if (n === "L" || n === "LAKI_LAKI") return "L";
  return "";
}

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingMaba?: SafeUser | null;
  onSubmit: (data: MabaFormData) => void;
  isPending?: boolean;
};

export default function MabaFormDialog({ open, onOpenChange, editingMaba, onSubmit, isPending }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<MabaFormData>({
    resolver: zodResolver(mabaFormSchema),
    defaultValues: { name: "", email: "", nim: "", gender: "", username: "", password: "", status: "true" },
  });

  useEffect(() => {
    if (open) {
      if (editingMaba) {
        reset({
          name: editingMaba.name,
          email: editingMaba.email,
          nim: editingMaba.nim ?? "",
          gender: normalizeGender(editingMaba.gender),
          username: editingMaba.username ?? "",
          password: "",
          status: editingMaba.status ? "true" : "false",
        });
      } else {
        reset({ name: "", email: "", nim: "", gender: "", username: "", password: "", status: "true" });
      }
    }
  }, [open, editingMaba, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title={editingMaba ? "Edit MABA" : "Tambah MABA"}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Nama" placeholder="Nama lengkap" error={errors.name?.message} {...register("name")} />
          <Input label="Email" type="email" placeholder="email@example.com" error={errors.email?.message} {...register("email")} />
          <Input label="NIM (15 digit)" placeholder="245150200111001" error={errors.nim?.message} {...register("nim")} />
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select
                label="Jenis Kelamin"
                items={[
                  { value: "", label: "—" },
                  { value: "L", label: "Laki-laki" },
                  { value: "P", label: "Perempuan" },
                ]}
                value={field.value}
                onValueChange={field.onChange}
                error={errors.gender?.message}
              />
            )}
          />
          <Input
            label="Username (opsional)"
            placeholder="contoh: johndoe"
            error={errors.username?.message}
            {...register("username")}
          />
          {!editingMaba && (
            <Input
              label="Password (kosongkan untuk default = NIM)"
              type="password"
              placeholder="Minimal 8 karakter"
              error={errors.password?.message}
              {...register("password")}
            />
          )}
          {editingMaba && (
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  label="Status"
                  items={[
                    { value: "true", label: "Aktif" },
                    { value: "false", label: "Nonaktif" },
                  ]}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.status?.message}
                />
              )}
            />
          )}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={isPending}>
              Batal
            </Button>
            <Button type="submit" variant="primary" loading={isPending} disabled={isPending}>
              {editingMaba ? "Simpan" : "Tambah"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
