import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface User {
  email: string
  name: string
}

interface AuthState {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

// Default test user for development
const DEFAULT_USER = {
  email: "test@example.com",
  name: "Test User",
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: DEFAULT_USER, // Start with default user logged in for development

      login: async (email: string, password: string) => {
        // In a real app, this would validate credentials with an API
        // For this demo, we'll accept any non-empty email/password
        if (email && password) {
          const user = { email, name: email.split("@")[0] }
          set({ user })
          return true
        }
        return false
      },

      logout: () => {
        set({ user: null })
      },
    }),
    {
      name: "auth-storage", // name of the item in storage
      storage: createJSONStorage(() => localStorage), // use localStorage
    },
  ),
)

