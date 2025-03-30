"use client"

import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { useCategoriesStore } from "@/lib/stores/use-categories-store"
import { useProjectsStore } from "@/lib/stores/use-projects-store"
import { ProjectForm } from "@/components/project-form"
import type { CreateProjectInput } from "@/lib/schemas/project"

export default function NewProjectPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { addProject } = useProjectsStore()
  const { categories } = useCategoriesStore()

  const handleSubmit = (projectData: CreateProjectInput) => {
    addProject(projectData)

    toast({
      title: "Project created",
      description: "Your new project has been added successfully",
    })

    router.push("/dashboard/projects")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Project</h1>
        <p className="text-muted-foreground">Create a new project to showcase in your portfolio</p>
      </div>

      <ProjectForm
        categories={categories}
        onSubmit={handleSubmit}
        submitButtonText="Create Project"
        title="Project Details"
        description="Enter the information about your project"
      />
    </div>
  )
}

