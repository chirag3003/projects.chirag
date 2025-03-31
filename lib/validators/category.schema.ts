import { z } from "zod";

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Category = z.infer<typeof categorySchema>;

export const categoriesRespSchema = z.object({
  categories: z.array(categorySchema),
});
export type CategoriesResp = z.infer<typeof categoriesRespSchema>;
