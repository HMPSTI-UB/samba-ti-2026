"use client";

import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { loginSchema, type LoginFormData } from "@/features/auth/validation/login-schema";
import { useLogin } from "@/features/auth/hooks/use-login";
import { getMe } from "@/lib/api/auth";
import { ROLE_ROUTES } from "@/constant/roles";

export function useLoginForm() {
  const formId = useId();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
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

          const userResponse = await queryClient.fetchQuery({
            queryKey: ["user"],
            queryFn: getMe,
          });

          const route = ROLE_ROUTES[userResponse.data.role] || ROLE_ROUTES.mahasiswa;
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
