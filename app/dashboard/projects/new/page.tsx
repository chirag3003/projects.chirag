"use client"

import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { useProjects } from "@/lib/hooks/use-projects"
import { useCategories } from "@/lib/hooks/use-categories"
import { useTags } from "@/lib/hooks/use-tags"
import { ProjectForm } from "@/components/project-form"

export default function NewProjectPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { addProject } = useProjects()
  const { categories } = useCategories()
  const { tags } = useTags()

  const handleSubmit = (projectData: any) => {
    addProject({
      ...projectData,
      stackblitzUrl: projectData.stackblitzUrl || undefined,
      codepenUrl: projectData.codepenUrl || undefined,
    })

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

