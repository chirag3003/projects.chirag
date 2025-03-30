"use client"

import * as React from "react"
import { X, Check, ChevronsUpDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface CategorySelectorProps {
  value: string[]
  onChange: (value: string[]) => void
  options: string[]
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function CategorySelector({
  value = [],
  onChange,
  options,
  placeholder = "Select categories...",
  className,
  disabled = false,
}: CategorySelectorProps) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (selectedValue: string) => {
    if (value.includes(selectedValue)) {
      // If already selected, remove it
      onChange(value.filter((v) => v !== selectedValue))
    } else {
      // Otherwise add it
      onChange([...value, selectedValue])
    }
  }

  const handleRemove = (category: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(value.filter((v) => v !== category))
  }

  // Filter out options that are already selected
  const availableOptions = options.filter((option) => !value.includes(option))

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between h-auto min-h-10 px-3 py-2",
            "text-left font-normal",
            !value.length && "text-muted-foreground",
            className,
          )}
          disabled={disabled}
        >
          <div className="flex flex-wrap gap-1.5 mr-2">
            {value.length > 0 ? (
              value.map((category) => (
                <Badge key={category} variant="secondary" className="px-2 py-1 h-7 text-xs font-normal">
                  {category}
                  {!disabled && (
                    <button
                      type="button"
                      className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onClick={(e) => handleRemove(category, e)}
                      aria-label={`Remove ${category}`}
                    >
                      <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    </button>
                  )}
                </Badge>
              ))
            ) : (
              <span>{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder="Search categories..." />
          <CommandList>
            <CommandEmpty>No categories found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={() => {
                    handleSelect(option)
                    // Keep the popover open for multiple selections
                    // setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value.includes(option) ? "opacity-100" : "opacity-0")} />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

