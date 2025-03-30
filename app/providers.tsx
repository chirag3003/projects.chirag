"use client"

import type React from "react"

import { ProjectsProvider } from "@/lib/hooks/use-projects"
import { CategoriesProvider } from "@/lib/hooks/use-categories"
import { TagsProvider } from "@/lib/hooks/use-tags"
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
      <ProjectsProvider>
        <CategoriesProvider>
          <TagsProvider>{children}</TagsProvider>
        </CategoriesProvider>
      </ProjectsProvider>
    </ThemeProvider>
  )
}

