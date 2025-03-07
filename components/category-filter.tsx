"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CategoryFilterProps {
  categories: string[]
  selectedCategories: string[]
  toggleCategory: (category: string) => void
}

export default function CategoryFilter({ categories, selectedCategories, toggleCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 pb-6">
      {categories.map((category) => (
        <Badge
          key={category}
          variant="outline"
          className={cn(
            "cursor-pointer hover:bg-muted transition-colors py-1.5 px-3 text-sm font-medium",
            selectedCategories.includes(category) && "bg-primary text-primary-foreground hover:bg-primary/90",
          )}
          onClick={() => toggleCategory(category)}
        >
          {category}
        </Badge>
      ))}
    </div>
  )
}

