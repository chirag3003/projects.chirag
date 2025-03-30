import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { useProjectsStore } from "./use-projects-store"

// Extract unique tags from projects
const extractUniqueTags = () => {
  const { projects } = useProjectsStore.getState()
  const tagsSet = new Set<string>()

  projects.forEach((project) => {
    project.tags.forEach((tag: string) => {
      tagsSet.add(tag)
    })
  })

  return Array.from(tagsSet).sort()
}

interface TagsState {
  tags: string[]
  addTag: (tag: string) => void
  updateTag: (oldTag: string, newTag: string) => void
  deleteTag: (tag: string) => void
  refreshTags: () => void
}

export const useTagsStore = create<TagsState>()(
  persist(
    (set, get) => ({
      tags: extractUniqueTags(),

      addTag: (tag: string) => {
        if (get().tags.includes(tag)) return

        set((state) => ({
          tags: [...state.tags, tag].sort(),
        }))
      },

      updateTag: (oldTag: string, newTag: string) => {
        if (oldTag === newTag) return
        if (get().tags.includes(newTag)) return

        // Update tag in tags list
        set((state) => ({
          tags: state.tags.map((tag) => (tag === oldTag ? newTag : tag)).sort(),
        }))

        // Update tag in all projects
        const { projects } = useProjectsStore.getState()

        projects.forEach((project) => {
          if (project.tags.includes(oldTag)) {
            const updatedTags = project.tags.map((tag) => (tag === oldTag ? newTag : tag))

            useProjectsStore.getState().updateProject(project.id, {
              ...project,
              tags: updatedTags,
            })
          }
        })
      },

      deleteTag: (tag: string) => {
        // Remove tag from tags list
        set((state) => ({
          tags: state.tags.filter((t) => t !== tag),
        }))

        // Remove tag from all projects
        const { projects } = useProjectsStore.getState()

        projects.forEach((project) => {
          if (project.tags.includes(tag)) {
            const updatedTags = project.tags.filter((t) => t !== tag)

            useProjectsStore.getState().updateProject(project.id, {
              ...project,
              tags: updatedTags,
            })
          }
        })
      },

      refreshTags: () => {
        set({ tags: extractUniqueTags() })
      },
    }),
    {
      name: "tags-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

