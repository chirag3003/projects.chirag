"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface ItemSearchProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  placeholder?: string
}

export function ItemSearch({ searchTerm, setSearchTerm, placeholder = "Search..." }: ItemSearchProps) {
  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className="pl-8"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-9 w-9"
          onClick={() => setSearchTerm("")}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
    </div>
  )
}

