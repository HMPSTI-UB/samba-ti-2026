"use client";

import { useMutation } from "@tanstack/react-query";
import { loginAction } from "@/features/auth/api/action";

export function useLogin() {
  const mutation = useMutation({
    mutationFn: loginAction,
  });

  return {
    login: mutation.mutate,
    isPending: mutation.isPending,
  };
}
