"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  FolderKanban,
  ExternalLink,
  Github,
  Pencil,
  Trash2,
  MoreHorizontal,
  Search,
  PlusCircle,
  Play,
  Codepen,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Project } from "@/lib/types"

interface ProjectGridViewProps {
  projects: Project[]
  searchTerm: string
  onDeleteClick: (title: string) => void
  clearSearch: () => void
}

export function ProjectGridView({ projects, searchTerm, onDeleteClick, clearSearch }: ProjectGridViewProps) {
  const router = useRouter()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.length > 0 ? (
        projects.map((project) => (
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
              {project.stackblitzUrl && (
                <div className="absolute bottom-0 right-0 bg-blue-500/90 text-white py-1 px-2 m-2 rounded text-xs font-medium flex items-center">
                  <Play className="h-3 w-3 mr-1" />
                  StackBlitz
                </div>
              )}
              {project.codepenUrl && (
                <div className="absolute bottom-0 right-0 bg-black/90 text-white py-1 px-2 m-2 rounded text-xs font-medium flex items-center">
                  <Codepen className="h-3 w-3 mr-1" />
                  CodePen
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
                      onClick={() => onDeleteClick(project.title)}
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
              <Button variant="destructive" size="sm" onClick={() => onDeleteClick(project.title)}>
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
              <Button variant="outline" onClick={clearSearch}>
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
  )
}

