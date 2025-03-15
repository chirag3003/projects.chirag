"use client"

import type React from "react"

import { useState } from "react"
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

export default function NewProjectPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { addProject } = useProjects()
  const { categories } = useCategories()
  const { tags } = useTags()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "/placeholder.svg?height=400&width=600",
    demoUrl: "",
    repoUrl: "",
    stackblitzUrl: "",
    featured: false,
    selectedCategories: [] as string[],
    selectedTags: [] as string[],
  })

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

    // Add project
    addProject({
      title: formData.title,
      description: formData.description,
      image: formData.image,
      tags: formData.selectedTags,
      categories: formData.selectedCategories,
      demoUrl: formData.demoUrl || "https://example.com",
      repoUrl: formData.repoUrl || "https://github.com",
      stackblitzUrl: formData.stackblitzUrl || undefined,
      featured: formData.featured,
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

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Enter the information about your project</CardDescription>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="/placeholder.svg?height=400&width=600"
                />
                <p className="text-xs text-muted-foreground">Leave default for a placeholder image</p>
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
                  <MultiSelectTrigger>
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
                  <MultiSelectTrigger>
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <Button type="submit">Create Project</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

