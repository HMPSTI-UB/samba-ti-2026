import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

type TokenState = {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (tokens: Tokens) => void;
  setAccessToken: (accessToken: string) => void;
  clearTokens: () => void;
};

export const useTokenStore = create<TokenState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setTokens: ({ accessToken, refreshToken }) =>
        set({ accessToken, refreshToken }),
      setAccessToken: (accessToken) => set({ accessToken }),
      clearTokens: () => set({ accessToken: null, refreshToken: null }),
    }),
    {
      name: "token-storage",
    },
  ),
);
