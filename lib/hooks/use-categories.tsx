"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useProjects } from "@/lib/hooks/use-projects"

// Extract unique categories from projects
const extractUniqueCategories = (projects: any[]) => {
  const categoriesSet = new Set<string>()
  projects.forEach((project) => {
    project.categories.forEach((category: string) => {
      categoriesSet.add(category)
    })
  })
  return Array.from(categoriesSet).sort()
}

interface CategoriesContextType {
  categories: string[]
  addCategory: (category: string) => void
  updateCategory: (oldCategory: string, newCategory: string) => void
  deleteCategory: (category: string) => void
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined)

export function CategoriesProvider({ children }: { children: React.ReactNode }) {
  const { projects, updateProject } = useProjects()
  const [categories, setCategories] = useState<string[]>([])

  // Initialize categories from local storage or extract from projects
  useEffect(() => {
    const storedCategories = localStorage.getItem("dashboard_categories")
    if (storedCategories) {
      try {
        setCategories(JSON.parse(storedCategories))
      } catch (error) {
        console.error("Failed to parse stored categories", error)
        const extractedCategories = extractUniqueCategories(projects)
        setCategories(extractedCategories)
        localStorage.setItem("dashboard_categories", JSON.stringify(extractedCategories))
      }
    } else {
      const extractedCategories = extractUniqueCategories(projects)
      setCategories(extractedCategories)
      localStorage.setItem("dashboard_categories", JSON.stringify(extractedCategories))
    }
  }, [projects])

  const addCategory = (category: string) => {
    if (categories.includes(category)) return

    const newCategories = [...categories, category].sort()
    setCategories(newCategories)
    localStorage.setItem("dashboard_categories", JSON.stringify(newCategories))
  }

  const updateCategory = (oldCategory: string, newCategory: string) => {
    if (oldCategory === newCategory) return
    if (categories.includes(newCategory)) return

    // Update category in categories list
    const newCategories = categories.map((category) => (category === oldCategory ? newCategory : category)).sort()

    setCategories(newCategories)
    localStorage.setItem("dashboard_categories", JSON.stringify(newCategories))

    // Update category in all projects
    projects.forEach((project) => {
      if (project.categories.includes(oldCategory)) {
        const updatedCategories = project.categories.map((category) =>
          category === oldCategory ? newCategory : category,
        )

        updateProject(project.title, {
          ...project,
          categories: updatedCategories,
        })
      }
    })
  }

  const deleteCategory = (category: string) => {
    // Remove category from categories list
    const newCategories = categories.filter((c) => c !== category)
    setCategories(newCategories)
    localStorage.setItem("dashboard_categories", JSON.stringify(newCategories))

    // Remove category from all projects
    projects.forEach((project) => {
      if (project.categories.includes(category)) {
        const updatedCategories = project.categories.filter((c) => c !== category)

        updateProject(project.title, {
          ...project,
          categories: updatedCategories,
        })
      }
    })
  }

  return (
    <CategoriesContext.Provider value={{ categories, addCategory, updateCategory, deleteCategory }}>
      {children}
    </CategoriesContext.Provider>
  )
}

export function useCategories() {
  const context = useContext(CategoriesContext)
  if (context === undefined) {
    throw new Error("useCategories must be used within a CategoriesProvider")
  }
  return context
}

