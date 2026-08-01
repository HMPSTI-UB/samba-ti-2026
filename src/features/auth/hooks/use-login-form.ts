"use client";

import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginSchema, type LoginFormData } from "@/features/auth/validation/login-schema";
import { useLogin } from "@/features/auth/hooks/use-login";
import { getMe } from "@/lib/api/auth";
import { useUserStore } from "@/stores/user.store";
import { ROLE_ROUTES } from "@/constant/roles";

function normalizeRole(role: string): string {
  return role.toLowerCase();
}

export function useLoginForm() {
  const formId = useId();
  const router = useRouter();
  const setUser = useUserStore((s) => s.setUser);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: "", password: "" },
  });

  const { login, isPending } = useLogin();

  function onSubmit(data: LoginFormData) {
    login(data, {
      onSuccess: async (result) => {
        if (!result.success) {
          if (result.errors) {
            for (const [field, messages] of Object.entries(result.errors)) {
              setError(field as keyof LoginFormData, {
                message: messages[0],
              });
            }
          }
          toast.error(result.message);
        } else {
          toast.success("Login berhasil!", {
            description: "Mengarahkan ke dashboard...",
          });

          const userResponse = await getMe();
          if (!userResponse.success) {
            toast.error("Gagal mengambil data user");
            return;
          }

          setUser(userResponse.data);

          const route = ROLE_ROUTES[normalizeRole(userResponse.data.role)] || ROLE_ROUTES.mahasiswa;
          router.push(route);
        }
      },
      onError: () => {
        toast.error("Terjadi kesalahan", {
          description: "Tidak dapat terhubung ke server.",
        });
      },
    });
  }

  return {
    formId,
    register,
    handleSubmit,
    errors,
    onSubmit,
    isPending,
    showPassword,
    togglePassword: () => setShowPassword((v) => !v),
  };
}
