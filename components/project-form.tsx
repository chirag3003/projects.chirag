"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { TagInput } from "@/components/tag-input"
import { CategorySelector } from "@/components/category-selector"
import { EmbedTypeSelector } from "@/components/embed-type-selector"
import type { Project } from "@/lib/types"

interface ProjectFormProps {
  initialData?: Partial<Project>
  categories: string[]
  onSubmit: (
    project: Omit<Project, "stackblitzUrl" | "codepenUrl"> & {
      stackblitzUrl: string
      codepenUrl: string
    },
  ) => void
  submitButtonText: string
  title: string
  description: string
}

export function ProjectForm({
  initialData,
  categories,
  onSubmit,
  submitButtonText,
  title,
  description,
}: ProjectFormProps) {
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = React.useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    image: initialData?.image || "/placeholder.svg?height=400&width=600",
    demoUrl: initialData?.demoUrl || "",
    repoUrl: initialData?.repoUrl || "",
    stackblitzUrl: initialData?.stackblitzUrl || "",
    codepenUrl: initialData?.codepenUrl || "",
    featured: initialData?.featured || false,
    selectedCategories: initialData?.categories || [],
    selectedTags: initialData?.tags || [],
    embedType: initialData?.stackblitzUrl
      ? "stackblitz"
      : initialData?.codepenUrl
        ? "codepen"
        : ("none" as "none" | "stackblitz" | "codepen"),
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

  const handleEmbedTypeChange = (type: "none" | "stackblitz" | "codepen") => {
    setFormData((prev) => ({
      ...prev,
      embedType: type,
      // Clear the URLs that aren't selected
      stackblitzUrl: type === "stackblitz" ? prev.stackblitzUrl : "",
      codepenUrl: type === "codepen" ? prev.codepenUrl : "",
    }))
  }

  const handleStackblitzUrlChange = (url: string) => {
    setFormData((prev) => ({ ...prev, stackblitzUrl: url }))
  }

  const handleCodepenUrlChange = (url: string) => {
    setFormData((prev) => ({ ...prev, codepenUrl: url }))
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
        description: "Please add at least one tag",
        variant: "destructive",
      })
      return
    }

    // Submit the project
    onSubmit({
      title: formData.title,
      description: formData.description,
      image: formData.image,
      tags: formData.selectedTags,
      categories: formData.selectedCategories,
      demoUrl: formData.demoUrl || "https://example.com",
      repoUrl: formData.repoUrl || "https://github.com",
      stackblitzUrl: formData.stackblitzUrl,
      codepenUrl: formData.codepenUrl,
      featured: formData.featured,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
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
              <CategorySelector
                value={formData.selectedCategories}
                onChange={handleCategoriesChange}
                options={categories}
                placeholder="Select categories..."
              />
              <p className="text-xs text-muted-foreground">Select from predefined categories</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">
                Tags <span className="text-destructive">*</span>
              </Label>
              <TagInput
                value={formData.selectedTags}
                onChange={handleTagsChange}
                placeholder="Add tag and press Enter..."
              />
              <p className="text-xs text-muted-foreground">Press Enter to add a tag</p>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>

          <EmbedTypeSelector
            embedType={formData.embedType}
            stackblitzUrl={formData.stackblitzUrl}
            codepenUrl={formData.codepenUrl}
            onEmbedTypeChange={handleEmbedTypeChange}
            onStackblitzUrlChange={handleStackblitzUrlChange}
            onCodepenUrlChange={handleCodepenUrlChange}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/projects")}>
            Cancel
          </Button>
          <Button type="submit">{submitButtonText}</Button>
        </CardFooter>
      </Card>
    </form>
  )
}

