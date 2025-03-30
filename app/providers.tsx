"use client"

import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      // Add suppressHydrationWarning to prevent hydration warnings
      suppressHydrationWarning
    >
      {children}
    </ThemeProvider>
  )
}

