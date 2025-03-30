"use client"

import { LayoutGrid, LayoutList } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ViewToggleProps {
  viewMode: "list" | "grid"
  setViewMode: (mode: "list" | "grid") => void
}

export function ViewToggle({ viewMode, setViewMode }: ViewToggleProps) {
  return (
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
  )
}

