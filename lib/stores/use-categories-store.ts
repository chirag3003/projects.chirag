import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { useProjectsStore } from "./use-projects-store"

// Extract unique categories from projects
const extractUniqueCategories = () => {
  const { projects } = useProjectsStore.getState()
  const categoriesSet = new Set<string>()

  projects.forEach((project) => {
    project.categories.forEach((category: string) => {
      categoriesSet.add(category)
    })
  })

  return Array.from(categoriesSet).sort()
}

interface CategoriesState {
  categories: string[]
  addCategory: (category: string) => void
  updateCategory: (oldCategory: string, newCategory: string) => void
  deleteCategory: (category: string) => void
  refreshCategories: () => void
}

export const useCategoriesStore = create<CategoriesState>()(
  persist(
    (set, get) => ({
      categories: extractUniqueCategories(),

      addCategory: (category: string) => {
        if (get().categories.includes(category)) return

        set((state) => ({
          categories: [...state.categories, category].sort(),
        }))
      },

      updateCategory: (oldCategory: string, newCategory: string) => {
        if (oldCategory === newCategory) return
        if (get().categories.includes(newCategory)) return

        // Update category in categories list
        set((state) => ({
          categories: state.categories.map((category) => (category === oldCategory ? newCategory : category)).sort(),
        }))

        // Update category in all projects
        const { projects } = useProjectsStore.getState()

        projects.forEach((project) => {
          if (project.categories.includes(oldCategory)) {
            const updatedCategories = project.categories.map((category) =>
              category === oldCategory ? newCategory : category,
            )

            useProjectsStore.getState().updateProject(project.id, {
              ...project,
              categories: updatedCategories,
            })
          }
        })
      },

      deleteCategory: (category: string) => {
        // Remove category from categories list
        set((state) => ({
          categories: state.categories.filter((c) => c !== category),
        }))

        // Remove category from all projects
        const { projects } = useProjectsStore.getState()

        projects.forEach((project) => {
          if (project.categories.includes(category)) {
            const updatedCategories = project.categories.filter((c) => c !== category)

            useProjectsStore.getState().updateProject(project.id, {
              ...project,
              categories: updatedCategories,
            })
          }
        })
      },

      refreshCategories: () => {
        set({ categories: extractUniqueCategories() })
      },
    }),
    {
      name: "categories-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

