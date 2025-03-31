import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserResp } from "../validators/user.schema";

interface User {
  email: string;
  name: string;
}

interface AuthState {
  user: UserResp | null;
  token: string | null;
  login: (user: UserResp, token: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null, // Start with default user logged in for development
      token: null,
      login: async (user: UserResp, token: string) => {
        // In a real app, this would validate credentials with an API
        // For this demo, we'll accept any non-empty email/password
        set({ user, token });
        return true;
      },

      logout: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: "auth-storage", // name of the item in storage
      storage: createJSONStorage(() => localStorage), // use localStorage
    }
  )
);
