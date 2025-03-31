"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { ProjectForm } from "@/components/project-form";
import { CreateProjectInput } from "@/lib/validators/project.schema";
import { useProject, useUpdateProject } from "@/hooks/project.hooks";
import { useCategories } from "@/hooks/category.hooks";

export default function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const router = useRouter();
  const { toast } = useToast();

  const { mutateAsync: updateProject } = useUpdateProject(id);
  const { data: categories } = useCategories();

  const { data: project, isLoading } = useProject(id);

  useEffect(() => {
    if (!isLoading && !project) {
      // If project not found, redirect to projects page
      toast({
        title: "Project not found",
        description: "The project you're trying to edit doesn't exist",
        variant: "destructive",
      });
      router.push("/dashboard/projects");
    }
  }, [project, router, toast, isLoading]);

  const handleSubmit = (projectData: CreateProjectInput) => {
    updateProject(projectData);

    toast({
      title: "Project updated",
      description: "Your project has been updated successfully",
    });

    router.push("/dashboard/projects");
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-medium">Loading project data...</p>
        </div>
      </div>
    );
  }

  // If project is not found after loading
  if (!project) {
    return null;
  }

  return (
    <div className="space-y-6 w-full max-w-full overflow-hidden">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
        <p className="text-muted-foreground">
          Update the details of your project
        </p>
      </div>

      <ProjectForm
        initialData={project}
        categories={categories?.map((cat) => cat.name) || []}
        onSubmit={handleSubmit}
        submitButtonText="Update Project"
        title="Project Details"
        description="Edit the information about your project"
      />
    </div>
  );
}
