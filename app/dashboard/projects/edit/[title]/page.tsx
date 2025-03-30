"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { useProjects } from "@/lib/hooks/use-projects"
import { useCategories } from "@/lib/hooks/use-categories"
import { useTags } from "@/lib/hooks/use-tags"
import { Loader2 } from "lucide-react"
import { ProjectForm } from "@/components/project-form"

export default function EditProjectPage({ params }: { params: { title: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)

  // Safely access hooks with error handling
  const projectsContext = useProjects()
  const categoriesContext = useCategories()
  const tagsContext = useTags()

  // Safely destructure values with fallbacks
  const { projects = [], updateProject = () => {} } = projectsContext || {}
  const { categories = [] } = categoriesContext || {}
  const { tags = [] } = tagsContext || {}

  const decodedTitle = decodeURIComponent(params.title)
  const project = projects.find((p) => p.title === decodedTitle)

  useEffect(() => {
    // Set loading to false after a short delay to ensure contexts are loaded
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoading && !project) {
      // If project not found, redirect to projects page
      toast({
        title: "Project not found",
        description: "The project you're trying to edit doesn't exist",
        variant: "destructive",
      })
      router.push("/dashboard/projects")
    }
  }, [project, router, toast, isLoading])

  const handleSubmit = (projectData: any) => {
    updateProject(decodedTitle, {
      ...projectData,
      stackblitzUrl: projectData.stackblitzUrl || undefined,
      codepenUrl: projectData.codepenUrl || undefined,
    })

    toast({
      title: "Project updated",
      description: "Your project has been updated successfully",
    })

    router.push("/dashboard/projects")
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-medium">Loading project data...</p>
        </div>
      </div>
    )
  }

  // If project is not found after loading
  if (!project) {
    return null
  }

  return (
    <div className="space-y-6 w-full max-w-full overflow-hidden">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
        <p className="text-muted-foreground">Update the details of your project</p>
      </div>

      <ProjectForm
        initialData={project}
        categories={categories}
        onSubmit={handleSubmit}
        submitButtonText="Update Project"
        title="Project Details"
        description="Edit the information about your project"
      />
    </div>
  )
}

