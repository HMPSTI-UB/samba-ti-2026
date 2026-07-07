"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { loginAction } from "@/features/auth/actions/login-action";

type LoginInput = {
  email: string;
  password: string;
};

type FieldErrors = Record<string, string[]>;

export function useLogin() {
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const mutation = useMutation({
    mutationFn: (data: LoginInput) => loginAction(data),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Login berhasil!", {
          description: "Mengarahkan ke dashboard...",
        });
        // Redirect ke portal setelah login berhasil
        router.push("/portal");
      } else {
        // Server mengembalikan error terstruktur
        if (result.errors) {
          setFieldErrors(result.errors);
        }
        toast.error("Login gagal", {
          description: result.message,
        });
      }
    },
    onError: () => {
      toast.error("Terjadi kesalahan", {
        description: "Tidak dapat terhubung ke server.",
      });
    },
    onMutate: () => {
      // Reset field errors setiap kali submit baru
      setFieldErrors({});
    },
  });

  const getFieldError = (field: string): string | undefined =>
    fieldErrors[field]?.[0];

  return {
    login: mutation.mutate,
    isPending: mutation.isPending,
    getFieldError,
  };
}
