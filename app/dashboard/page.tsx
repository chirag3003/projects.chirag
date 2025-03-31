"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FolderKanban, Tag, BarChart3, TrendingUp, Clock } from "lucide-react";
import { useProjectsStore } from "@/lib/stores/use-projects-store";
import { useCategoriesStore } from "@/lib/stores/use-categories-store";
import { useTagsStore } from "@/lib/stores/use-tags-store";
import { useProjects } from "@/hooks/project.hooks";
import { useCategories } from "@/hooks/category.hooks";

export default function DashboardPage() {
  const { data: projects } = useProjects();
  const { data: categories } = useCategories();
  const { tags } = useTagsStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const featuredProjects = projects?.filter((project) => project.featured);
  const recentProjects = [...(projects ?? [])]
    .sort((a, b) => {
      // Sort by creation date, newest first
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your project management system
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects?.length ?? 0}</div>
            <p className="text-xs text-muted-foreground">
              {featuredProjects?.length ?? 0} featured
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories?.length ?? 0}</div>
            <p className="text-xs text-muted-foreground">
              Used for project organization
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tags</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tags.length}</div>
            <p className="text-xs text-muted-foreground">
              Used for project filtering
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Featured Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(projects?.length ?? 0) > 0
                ? `${Math.round(
                    ((featuredProjects?.length ?? 0) / projects!.length) * 100
                  )}%`
                : "0%"}
            </div>
            <p className="text-xs text-muted-foreground">
              Projects marked as featured
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Recent Projects</span>
          </TabsTrigger>
          <TabsTrigger value="featured" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Featured Projects</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>
                Your most recently added projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentProjects.length > 0 ? (
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <FolderKanban className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{project.title}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {project.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {project.featured && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            Featured
                          </span>
                        )}
                        {project.categories[0] && (
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">
                            {project.categories[0]}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No projects found.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="featured" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Featured Projects</CardTitle>
              <CardDescription>
                Projects marked as featured on your site
              </CardDescription>
            </CardHeader>
            <CardContent>
              {featuredProjects && featuredProjects.length > 0 ? (
                <div className="space-y-4">
                  {featuredProjects.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <FolderKanban className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{project.title}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {project.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          Featured
                        </span>
                        {project.categories[0] && (
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">
                            {project.categories[0]}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No featured projects found.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Project statistics and metrics</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Analytics dashboard coming soon
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
