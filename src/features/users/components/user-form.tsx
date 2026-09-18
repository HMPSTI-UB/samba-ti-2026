"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import type { SafeUser } from "@/features/users/api/users";

const userFormSchema = z.object({
  name: z.string().min(2, "Minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(8, "Minimal 8 karakter").max(72).optional().or(z.literal("")),
  nim: z.string().regex(/^\d{15}$/, "NIM harus 15 digit angka").optional().or(z.literal("")),
  role: z.enum(["ADMIN", "KADERISASI", "SPV", "MABA"]),
});

type FormData = z.infer<typeof userFormSchema>;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingUser?: SafeUser | null;
  onSubmit: (data: FormData) => void;
  isPending?: boolean;
};

export default function UserFormDialog({ open, onOpenChange, editingUser, onSubmit, isPending }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: { name: "", email: "", password: "", nim: "", role: "MABA" },
  });

  useEffect(() => {
    if (open) {
      setShowPassword(false);
      if (editingUser) {
        reset({
          name: editingUser.name,
          email: editingUser.email,
          password: "",
          nim: editingUser.nim ?? "",
          role: editingUser.role as FormData["role"],
        });
      } else {
        reset({ name: "", email: "", password: "", nim: "", role: "MABA" });
      }
    }
  }, [open, editingUser, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title={editingUser ? "Edit User" : "Tambah User"}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Nama" placeholder="Nama lengkap" error={errors.name?.message} {...register("name")} />
          <Input label="Email" type="email" placeholder="email@example.com" error={errors.email?.message} {...register("email")} />
          
          <Input label="NIM (15 digit, hanya untuk MABA)" placeholder="245150200111001" error={errors.nim?.message} {...register("nim")} />
          
          <Input
            label={editingUser ? "Password Baru (kosongkan jika tidak ingin mengubah)" : "Password (kosongkan untuk auto-generate)"}
            type={showPassword ? "text" : "password"}
            placeholder="Minimal 8 karakter"
            error={errors.password?.message}
            rightIcon={
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword(!showPassword)}
                className="hover:text-soft-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
            {...register("password")}
          />

          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                label="Role"
                items={[
                  { value: "ADMIN", label: "Admin" },
                  { value: "KADERISASI", label: "Kaderisasi" },
                  { value: "SPV", label: "SPV" },
                  { value: "MABA", label: "MABA" },
                ]}
                value={field.value}
                onValueChange={field.onChange}
                error={errors.role?.message}
              />
            )}
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={isPending}>
              Batal
            </Button>
            <Button type="submit" variant="primary" loading={isPending} disabled={isPending}>
              {editingUser ? "Simpan" : "Tambah"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
