"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface User {
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Default test user for development
const DEFAULT_USER = {
  email: "test@example.com",
  name: "Test User",
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(DEFAULT_USER) // Start with default user logged in

  // Initialize user from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("dashboard_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user", error)
        // Set default user for testing
        setUser(DEFAULT_USER)
        localStorage.setItem("dashboard_user", JSON.stringify(DEFAULT_USER))
      }
    } else {
      // Set default user for testing
      setUser(DEFAULT_USER)
      localStorage.setItem("dashboard_user", JSON.stringify(DEFAULT_USER))
    }
  }, [])

  const login = async (email: string, password: string) => {
    // In a real app, this would validate credentials with an API
    // For this demo, we'll accept any non-empty email/password
    if (email && password) {
      const user = { email, name: email.split("@")[0] }

      // Store user in localStorage first
      localStorage.setItem("dashboard_user", JSON.stringify(user))

      // Then update state
      setUser(user)

      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem("dashboard_user")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

