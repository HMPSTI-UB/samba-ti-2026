"use client";

import { useMutation } from "@tanstack/react-query";
import { login } from "@/lib/api/auth";
import { useTokenStore } from "@/stores/token.store";

export function useLogin() {
  const mutation = useMutation({
    mutationFn: async (payload: { identifier: string; password: string }) => {
      const res = await login(payload);
      useTokenStore.getState().setTokens(res.data);
      return res;
    },
  });

  return {
    login: mutation.mutate,
    isPending: mutation.isPending,
  };
}
