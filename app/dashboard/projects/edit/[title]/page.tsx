"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/multi-select"
import { useToast } from "@/components/ui/use-toast"
import { useProjects } from "@/lib/hooks/use-projects"
import { useCategories } from "@/lib/hooks/use-categories"
import { useTags } from "@/lib/hooks/use-tags"
import { Loader2 } from "lucide-react"

export default function EditProjectPage({ params }: { params: { title: string } }) {
  const router = useRouter()
  const { toast } = useToast()

  // Add loading states to handle potential undefined values
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

  const [formData, setFormData] = useState<{
    title: string
    description: string
    image: string
    demoUrl: string
    repoUrl: string
    stackblitzUrl: string
    featured: boolean
    selectedCategories: string[]
    selectedTags: string[]
  }>({
    title: "",
    description: "",
    image: "",
    demoUrl: "",
    repoUrl: "",
    stackblitzUrl: "",
    featured: false,
    selectedCategories: [],
    selectedTags: [],
  })

  useEffect(() => {
    // Set loading to false after a short delay to ensure contexts are loaded
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoading && project) {
      setFormData({
        title: project.title,
        description: project.description,
        image: project.image || "",
        demoUrl: project.demoUrl || "",
        repoUrl: project.repoUrl || "",
        stackblitzUrl: project.stackblitzUrl || "",
        featured: project.featured || false,
        selectedCategories: project.categories || [],
        selectedTags: project.tags || [],
      })
    } else if (!isLoading && !project) {
      // If project not found, redirect to projects page
      toast({
        title: "Project not found",
        description: "The project you're trying to edit doesn't exist",
        variant: "destructive",
      })
      router.push("/dashboard/projects")
    }
  }, [project, router, toast, isLoading])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, featured: checked }))
  }

  const handleCategoriesChange = (value: string[]) => {
    setFormData((prev) => ({ ...prev, selectedCategories: value }))
  }

  const handleTagsChange = (value: string[]) => {
    setFormData((prev) => ({ ...prev, selectedTags: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.title) {
      toast({
        title: "Validation Error",
        description: "Project title is required",
        variant: "destructive",
      })
      return
    }

    if (formData.selectedCategories.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please select at least one category",
        variant: "destructive",
      })
      return
    }

    if (formData.selectedTags.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please select at least one tag",
        variant: "destructive",
      })
      return
    }

    // Update project
    updateProject(decodedTitle, {
      title: formData.title,
      description: formData.description,
      image: formData.image,
      tags: formData.selectedTags,
      categories: formData.selectedCategories,
      demoUrl: formData.demoUrl,
      repoUrl: formData.repoUrl,
      stackblitzUrl: formData.stackblitzUrl || undefined,
      featured: formData.featured,
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

      <form onSubmit={handleSubmit} className="w-full max-w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Edit the information about your project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">
                Project Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="E-commerce Platform"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="A full-featured e-commerce platform built with Next.js..."
                className="min-h-[120px]"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="/placeholder.svg?height=400&width=600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categories">
                  Categories <span className="text-destructive">*</span>
                </Label>
                <MultiSelect
                  value={formData.selectedCategories}
                  onValueChange={handleCategoriesChange}
                  placeholder="Select categories"
                >
                  <MultiSelectTrigger className="w-full">
                    <MultiSelectValue placeholder="Select categories" />
                  </MultiSelectTrigger>
                  <MultiSelectContent>
                    {categories.map((category) => (
                      <MultiSelectItem key={category} value={category}>
                        {category}
                      </MultiSelectItem>
                    ))}
                  </MultiSelectContent>
                </MultiSelect>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">
                  Tags <span className="text-destructive">*</span>
                </Label>
                <MultiSelect value={formData.selectedTags} onValueChange={handleTagsChange} placeholder="Select tags">
                  <MultiSelectTrigger className="w-full">
                    <MultiSelectValue placeholder="Select tags" />
                  </MultiSelectTrigger>
                  <MultiSelectContent>
                    {tags.map((tag) => (
                      <MultiSelectItem key={tag} value={tag}>
                        {tag}
                      </MultiSelectItem>
                    ))}
                  </MultiSelectContent>
                </MultiSelect>
              </div>

              <div className="space-y-2">
                <Label htmlFor="featured">Featured Status</Label>
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox id="featured" checked={formData.featured} onCheckedChange={handleCheckboxChange} />
                  <label
                    htmlFor="featured"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Mark as featured project
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="demoUrl">Demo URL</Label>
                <Input
                  id="demoUrl"
                  name="demoUrl"
                  value={formData.demoUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="repoUrl">Repository URL</Label>
                <Input
                  id="repoUrl"
                  name="repoUrl"
                  value={formData.repoUrl}
                  onChange={handleInputChange}
                  placeholder="https://github.com/username/repo"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stackblitzUrl">StackBlitz URL (optional)</Label>
                <Input
                  id="stackblitzUrl"
                  name="stackblitzUrl"
                  value={formData.stackblitzUrl}
                  onChange={handleInputChange}
                  placeholder="https://stackblitz.com/edit/project"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard/projects")}>
              Cancel
            </Button>
            <Button type="submit">Update Project</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

