import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  id: string;
  name: string;
  username: string | null;
  email: string;
  nim: string | null;
  gender: string | null;
  role: string;
  status: boolean;
  clusterId: string | null;
  avatarUrl: string | null;
  avatarKey: string | null;
  createdAt: string;
  updatedAt: string;
};

type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      clearUser: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "user-storage",
    },
  ),
);
