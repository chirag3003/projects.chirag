import { z } from "zod"

export const createProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().url("Image must be a valid URL"),
  tags: z.array(z.string()).nonempty("Tags must contain at least one item"),
  categories: z.array(z.string()).nonempty("Categories must contain at least one item"),
  demoUrl: z.string().url("Demo URL must be a valid URL"),
  repoUrl: z.string().url("Repository URL must be a valid URL"),
  stackblitzUrl: z.string().url("Stackblitz URL must be a valid URL").optional(),
  codepenUrl: z.string().url("Codepen URL must be a valid URL").optional(),
  featured: z.boolean().optional().default(false),
})

export type CreateProjectInput = z.infer<typeof createProjectSchema>

export const projectSchema = createProjectSchema.extend({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Project = z.infer<typeof projectSchema>

