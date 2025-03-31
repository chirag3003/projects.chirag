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
  loading: boolean;
  login: (user: UserResp, token: string) => Promise<boolean>;
  logout: () => void;
  setLoading: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null, // Start with default user logged in for development
      token: null,
      loading: true,
      login: async (user: UserResp, token: string) => {
        // In a real app, this would validate credentials with an API
        // For this demo, we'll accept any non-empty email/password
        localStorage.setItem("token", token);
        set({ user, token });
        return true;
      },

      setLoading: (state: boolean) => {
        set({
          loading: state,
        });
      },

      logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null });
      },
    }),
    {
      name: "auth-storage", // name of the item in storage
      storage: createJSONStorage(() => localStorage), // use localStorage
      onRehydrateStorage: (state) => {
        // This will be called when the store is rehydrated
        // You can use this to perform any actions after rehydration
        console.log("Rehydrated auth store:", state);
        return (state, error) => {
          if (error) {
            console.error("Error rehydrating auth store:", error);
          } else {
            state?.setLoading(false)
          }
        };
      },
    }
  )
);
