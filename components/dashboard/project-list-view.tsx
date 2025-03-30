"use client"

import { useRouter } from "next/navigation"
import { FolderKanban, Star, Pencil, Trash2, ChevronDown, Search } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import type { Project } from "@/lib/types"

interface ProjectListViewProps {
  projects: Project[]
  searchTerm: string
  onDeleteClick: (title: string) => void
}

export function ProjectListView({ projects, searchTerm, onDeleteClick }: ProjectListViewProps) {
  const router = useRouter()

  return (
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
          {projects.length > 0 ? (
            projects.map((project) => (
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
                        onClick={() => onDeleteClick(project.title)}
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
                    <Button variant="link" onClick={() => {}} className="mt-2">
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
  )
}

