"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  FolderKanban,
  PlusCircle,
  Search,
  Star,
  Pencil,
  Trash2,
  ChevronDown,
  X,
  LayoutGrid,
  LayoutList,
  ExternalLink,
  Github,
  MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useProjects } from "@/lib/hooks/use-projects"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProjectsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { projects, deleteProject } = useProjects()
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      project.categories.some((category) => category.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleDeleteClick = (title: string) => {
    setProjectToDelete(title)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (projectToDelete) {
      deleteProject(projectToDelete)
      toast({
        title: "Project deleted",
        description: `"${projectToDelete}" has been removed.`,
      })
      setProjectToDelete(null)
      setDeleteDialogOpen(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/projects/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Project
          </Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-9 w-9"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
            className="h-9 w-9"
          >
            <LayoutList className="h-4 w-4" />
            <span className="sr-only">List view</span>
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
            className="h-9 w-9"
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="sr-only">Grid view</span>
          </Button>
        </div>
      </div>

      {viewMode === "list" ? (
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px] min-w-[200px]">Project</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="w-[100px] text-center">Featured</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <TableRow key={project.title}>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{project.title}</span>
                        <span className="text-xs text-muted-foreground line-clamp-1">{project.description}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {project.categories.map((category) => (
                          <Badge key={category} variant="outline" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {project.featured ? (
                        <div className="flex justify-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <Star className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <ChevronDown className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => router.push(`/dashboard/projects/edit/${encodeURIComponent(project.title)}`)}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDeleteClick(project.title)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    {searchTerm ? (
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Search className="h-8 w-8 mb-2" />
                        <p>No projects match your search</p>
                        <Button variant="link" onClick={() => setSearchTerm("")} className="mt-2">
                          Clear search
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <FolderKanban className="h-8 w-8 mb-2" />
                        <p>No projects found</p>
                        <Button variant="link" asChild className="mt-2">
                          <Link href="/dashboard/projects/new">Create your first project</Link>
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <Card
                key={project.title}
                className="overflow-hidden group h-full flex flex-col transition-all duration-300 hover:shadow-md"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg?height=200&width=400"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="flex gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                      <Link
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background hover:text-primary transition-colors duration-200 shadow-md"
                        aria-label="View code on GitHub"
                      >
                        <Github className="h-5 w-5" />
                      </Link>
                      <Link
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/90 backdrop-blur-sm text-primary-foreground hover:bg-primary transition-colors duration-200 shadow-md"
                        aria-label="View live demo"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </Link>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="flex items-center justify-center h-10 w-10 rounded-full bg-secondary/90 backdrop-blur-sm text-secondary-foreground hover:bg-secondary transition-colors duration-200 shadow-md"
                        onClick={() => router.push(`/dashboard/projects/edit/${encodeURIComponent(project.title)}`)}
                        aria-label="Edit project"
                      >
                        <Pencil className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  {project.featured && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1.5">
                      <Star className="h-3.5 w-3.5 fill-current" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => router.push(`/dashboard/projects/edit/${encodeURIComponent(project.title)}`)}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDeleteClick(project.title)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="mb-4 line-clamp-3 text-sm">{project.description}</CardDescription>
                  <div className="flex flex-wrap gap-1.5">
                    {project.categories.map((category) => (
                      <Badge key={category} variant="outline" className="text-xs font-normal">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-2 pb-4 flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/dashboard/projects/edit/${encodeURIComponent(project.title)}`)}
                  >
                    <Pencil className="mr-2 h-3.5 w-3.5" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(project.title)}>
                    <Trash2 className="mr-2 h-3.5 w-3.5" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              {searchTerm ? (
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <Search className="h-12 w-12 mb-4" />
                  <h3 className="text-lg font-medium mb-1">No projects match your search</h3>
                  <p className="text-sm text-muted-foreground mb-4">Try adjusting your search terms</p>
                  <Button variant="outline" onClick={() => setSearchTerm("")}>
                    Clear search
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <FolderKanban className="h-12 w-12 mb-4" />
                  <h3 className="text-lg font-medium mb-1">No projects found</h3>
                  <p className="text-sm text-muted-foreground mb-4">Get started by creating your first project</p>
                  <Button asChild>
                    <Link href="/dashboard/projects/new">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create Project
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the project "{projectToDelete}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

