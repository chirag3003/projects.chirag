"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import type { Project } from "@/lib/types"
import { projects as initialProjects } from "@/lib/configs/projects"

interface ProjectsContextType {
  projects: Project[]
  addProject: (project: Project) => void
  updateProject: (title: string, updatedProject: Project) => void
  deleteProject: (title: string) => void
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined)

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])

  // Initialize projects from local storage or default data
  useEffect(() => {
    const storedProjects = localStorage.getItem("dashboard_projects")
    if (storedProjects) {
      try {
        setProjects(JSON.parse(storedProjects))
      } catch (error) {
        console.error("Failed to parse stored projects", error)
        setProjects(initialProjects)
        localStorage.setItem("dashboard_projects", JSON.stringify(initialProjects))
      }
    } else {
      setProjects(initialProjects)
      localStorage.setItem("dashboard_projects", JSON.stringify(initialProjects))
    }
  }, [])

  const addProject = (project: Project) => {
    const newProjects = [...projects, project]
    setProjects(newProjects)
    localStorage.setItem("dashboard_projects", JSON.stringify(newProjects))
  }

  const updateProject = (title: string, updatedProject: Project) => {
    const newProjects = projects.map((project) => (project.title === title ? updatedProject : project))
    setProjects(newProjects)
    localStorage.setItem("dashboard_projects", JSON.stringify(newProjects))
  }

  const deleteProject = (title: string) => {
    const newProjects = projects.filter((project) => project.title !== title)
    setProjects(newProjects)
    localStorage.setItem("dashboard_projects", JSON.stringify(newProjects))
  }

  return (
    <ProjectsContext.Provider value={{ projects, addProject, updateProject, deleteProject }}>
      {children}
    </ProjectsContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectsContext)
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectsProvider")
  }
  return context
}

