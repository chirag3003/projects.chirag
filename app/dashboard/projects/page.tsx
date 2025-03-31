"use client";

import { useState } from "react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ProjectSearch } from "@/components/dashboard/project-search";
import { ProjectListView } from "@/components/dashboard/project-list-view";
import { ProjectGridView } from "@/components/dashboard/project-grid-view";
import { DeleteProjectDialog } from "@/components/dashboard/delete-project-dialog";
import { ViewToggle } from "@/components/dashboard/view-toggle";
import { useDeleteProject, useProjects } from "@/hooks/project.hooks";

export default function ProjectsPage() {
  const { toast } = useToast();
  const { mutateAsync: deleteProject } = useDeleteProject();
  const { data: projects } = useProjects();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const filteredProjects = projects?.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      project.categories.some((category) =>
        category.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleDeleteClick = (id: string) => {
    setProjectToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (projectToDelete) {
      const projectTitle =
        projects?.find((p) => p.id === projectToDelete)?.title || "Project";
      deleteProject(projectToDelete);
      toast({
        title: "Project deleted",
        description: `"${projectTitle}" has been removed.`,
      });
      setProjectToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const clearSearch = () => setSearchTerm("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage your portfolio projects
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/projects/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Project
          </Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <ProjectSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>

      {viewMode === "list" ? (
        <ProjectListView
          projects={filteredProjects ?? []}
          searchTerm={searchTerm}
          onDeleteClick={handleDeleteClick}
        />
      ) : (
        <ProjectGridView
          projects={filteredProjects ?? []}
          searchTerm={searchTerm}
          onDeleteClick={handleDeleteClick}
          clearSearch={clearSearch}
        />
      )}

      {projectToDelete && (
        <DeleteProjectDialog
          key={projectToDelete}
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          projectId={projectToDelete}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
