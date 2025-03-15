"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useProjects } from "@/lib/hooks/use-projects"

// Extract unique tags from projects
const extractUniqueTags = (projects: any[]) => {
  const tagsSet = new Set<string>()
  projects.forEach((project) => {
    project.tags.forEach((tag: string) => {
      tagsSet.add(tag)
    })
  })
  return Array.from(tagsSet).sort()
}

interface TagsContextType {
  tags: string[]
  addTag: (tag: string) => void
  updateTag: (oldTag: string, newTag: string) => void
  deleteTag: (tag: string) => void
}

const TagsContext = createContext<TagsContextType | undefined>(undefined)

export function TagsProvider({ children }: { children: React.ReactNode }) {
  const { projects, updateProject } = useProjects()
  const [tags, setTags] = useState<string[]>([])

  // Initialize tags from local storage or extract from projects
  useEffect(() => {
    const storedTags = localStorage.getItem("dashboard_tags")
    if (storedTags) {
      try {
        setTags(JSON.parse(storedTags))
      } catch (error) {
        console.error("Failed to parse stored tags", error)
        const extractedTags = extractUniqueTags(projects)
        setTags(extractedTags)
        localStorage.setItem("dashboard_tags", JSON.stringify(extractedTags))
      }
    } else {
      const extractedTags = extractUniqueTags(projects)
      setTags(extractedTags)
      localStorage.setItem("dashboard_tags", JSON.stringify(extractedTags))
    }
  }, [projects])

  const addTag = (tag: string) => {
    if (tags.includes(tag)) return

    const newTags = [...tags, tag].sort()
    setTags(newTags)
    localStorage.setItem("dashboard_tags", JSON.stringify(newTags))
  }

  const updateTag = (oldTag: string, newTag: string) => {
    if (oldTag === newTag) return
    if (tags.includes(newTag)) return

    // Update tag in tags list
    const newTags = tags.map((tag) => (tag === oldTag ? newTag : tag)).sort()

    setTags(newTags)
    localStorage.setItem("dashboard_tags", JSON.stringify(newTags))

    // Update tag in all projects
    projects.forEach((project) => {
      if (project.tags.includes(oldTag)) {
        const updatedTags = project.tags.map((tag) => (tag === oldTag ? newTag : tag))

        updateProject(project.title, {
          ...project,
          tags: updatedTags,
        })
      }
    })
  }

  const deleteTag = (tag: string) => {
    // Remove tag from tags list
    const newTags = tags.filter((t) => t !== tag)
    setTags(newTags)
    localStorage.setItem("dashboard_tags", JSON.stringify(newTags))

    // Remove tag from all projects
    projects.forEach((project) => {
      if (project.tags.includes(tag)) {
        const updatedTags = project.tags.filter((t) => t !== tag)

        updateProject(project.title, {
          ...project,
          tags: updatedTags,
        })
      }
    })
  }

  return <TagsContext.Provider value={{ tags, addTag, updateTag, deleteTag }}>{children}</TagsContext.Provider>
}

export function useTags() {
  const context = useContext(TagsContext)
  if (context === undefined) {
    throw new Error("useTags must be used within a TagsProvider")
  }
  return context
}

