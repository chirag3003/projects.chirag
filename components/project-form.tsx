"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { TagInput } from "@/components/tag-input"
import { CategorySelector } from "@/components/category-selector"
import { createProjectSchema, type CreateProjectInput } from "@/lib/schemas/project"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

interface ProjectFormProps {
  initialData?: Partial<CreateProjectInput>
  categories: string[]
  onSubmit: (project: CreateProjectInput) => void
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
  const [embedType, setEmbedType] = React.useState<"none" | "stackblitz" | "codepen">(
    initialData?.stackblitzUrl ? "stackblitz" : initialData?.codepenUrl ? "codepen" : "none",
  )

  const form = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      image: initialData?.image || "/placeholder.svg?height=400&width=600",
      demoUrl: initialData?.demoUrl || "https://example.com",
      repoUrl: initialData?.repoUrl || "https://github.com",
      stackblitzUrl: initialData?.stackblitzUrl || "",
      codepenUrl: initialData?.codepenUrl || "",
      featured: initialData?.featured || false,
      tags: initialData?.tags || [],
      categories: initialData?.categories || [],
    },
  })

  const handleEmbedTypeChange = (type: "none" | "stackblitz" | "codepen") => {
    setEmbedType(type)

    // Clear the URLs that aren't selected
    if (type === "none") {
      form.setValue("stackblitzUrl", "")
      form.setValue("codepenUrl", "")
    } else if (type === "stackblitz") {
      form.setValue("codepenUrl", "")
    } else if (type === "codepen") {
      form.setValue("stackblitzUrl", "")
    }
  }

  const handleFormSubmit = (data: CreateProjectInput) => {
    try {
      onSubmit(data)
    } catch (error) {
      console.error("Form submission error:", error)
      toast({
        title: "Error",
        description: "There was a problem saving your project.",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>
                    Project Title <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="E-commerce Platform" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>
                    Description <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="A full-featured e-commerce platform built with Next.js..."
                      className="min-h-[120px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="/placeholder.svg?height=400&width=600" />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">Leave default for a placeholder image</p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>
                      Categories <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <CategorySelector
                        value={field.value}
                        onChange={field.onChange}
                        options={categories}
                        placeholder="Select categories..."
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">Select from predefined categories</p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>
                      Tags <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <TagInput
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Add tag and press Enter..."
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">Press Enter to add a tag</p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Featured Status</FormLabel>
                    <div className="flex items-center space-x-2 pt-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} id="featured" />
                      </FormControl>
                      <label
                        htmlFor="featured"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Mark as featured project
                      </label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="demoUrl"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Demo URL</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://example.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="repoUrl"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Repository URL</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://github.com/username/repo" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <div>
                <Label>Interactive Embed (Optional)</Label>
                <p className="text-xs text-muted-foreground mt-1 mb-2">
                  Choose one type of interactive embed for your project
                </p>

                <div className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="embed-none"
                      name="embedType"
                      value="none"
                      checked={embedType === "none"}
                      onChange={() => handleEmbedTypeChange("none")}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="embed-none" className="cursor-pointer">
                      None
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="embed-stackblitz"
                      name="embedType"
                      value="stackblitz"
                      checked={embedType === "stackblitz"}
                      onChange={() => handleEmbedTypeChange("stackblitz")}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="embed-stackblitz" className="cursor-pointer">
                      StackBlitz
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="embed-codepen"
                      name="embedType"
                      value="codepen"
                      checked={embedType === "codepen"}
                      onChange={() => handleEmbedTypeChange("codepen")}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="embed-codepen" className="cursor-pointer">
                      CodePen
                    </Label>
                  </div>
                </div>
              </div>

              {embedType === "stackblitz" && (
                <FormField
                  control={form.control}
                  name="stackblitzUrl"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>StackBlitz URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://stackblitz.com/edit/project" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {embedType === "codepen" && (
                <FormField
                  control={form.control}
                  name="codepenUrl"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>CodePen URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://codepen.io/username/pen/pen-id" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard/projects")}>
              Cancel
            </Button>
            <Button type="submit">{submitButtonText}</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

