"use client"

import type React from "react"

import { AuthProvider } from "@/lib/hooks/use-auth"
import { ProjectsProvider } from "@/lib/hooks/use-projects"
import { CategoriesProvider } from "@/lib/hooks/use-categories"
import { TagsProvider } from "@/lib/hooks/use-tags"
import { ThemeProvider } from "@/components/theme-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <ProjectsProvider>
          <CategoriesProvider>
            <TagsProvider>{children}</TagsProvider>
          </CategoriesProvider>
        </ProjectsProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

