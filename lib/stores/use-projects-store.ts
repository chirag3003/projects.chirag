import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { v4 as uuidv4 } from "uuid"
import { projects as initialProjects } from "@/lib/configs/projects"
import type { Project, CreateProjectInput } from "@/lib/schemas/project"

// Convert initial projects to match the new schema
const convertedInitialProjects: Project[] = initialProjects.map((project) => ({
  ...project,
  id: uuidv4(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}))

interface ProjectsState {
  projects: Project[]
  addProject: (project: CreateProjectInput) => void
  updateProject: (id: string, updatedProject: CreateProjectInput) => void
  deleteProject: (id: string) => void
  getProjectById: (id: string) => Project | undefined
  getProjectByTitle: (title: string) => Project | undefined
}

export const useProjectsStore = create<ProjectsState>()(
  persist(
    (set, get) => ({
      projects: convertedInitialProjects,

      addProject: (projectInput: CreateProjectInput) => {
        const newProject: Project = {
          ...projectInput,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        set((state) => ({
          projects: [...state.projects, newProject],
        }))
      },

      updateProject: (id: string, updatedProjectInput: CreateProjectInput) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id
              ? {
                  ...project,
                  ...updatedProjectInput,
                  updatedAt: new Date().toISOString(),
                }
              : project,
          ),
        }))
      },

      deleteProject: (id: string) => {
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
        }))
      },

      getProjectById: (id: string) => {
        return get().projects.find((project) => project.id === id)
      },

      getProjectByTitle: (title: string) => {
        return get().projects.find((project) => project.title === title)
      },
    }),
    {
      name: "projects-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

