"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ProjectForm } from "@/components/project-form";
import { useCreateProject } from "@/hooks/project.hooks";
import { CreateProjectInput } from "@/lib/validators/project.schema";
import { useCategories } from "@/hooks/category.hooks";

export default function NewProjectPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { mutateAsync: addProject } = useCreateProject();
  const { data: categories } = useCategories();

  const handleSubmit = async (projectData: CreateProjectInput) => {
    try {
      await addProject(projectData);
      toast({
        title: "Project created",
        description: "Your new project has been added successfully",
      });
      router.push("/dashboard/projects");
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Project</h1>
        <p className="text-muted-foreground">
          Create a new project to showcase in your portfolio
        </p>
      </div>

      <ProjectForm
        categories={categories?.map(cat => cat.name) || []}
        onSubmit={handleSubmit}
        submitButtonText="Create Project"
        title="Project Details"
        description="Enter the information about your project"
      />
    </div>
  );
}
