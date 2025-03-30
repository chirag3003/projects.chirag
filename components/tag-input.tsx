"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface TagInputProps {
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  className?: string
  maxTags?: number
  disabled?: boolean
}

export function TagInput({
  value = [],
  onChange,
  placeholder = "Add tag...",
  className,
  maxTags,
  disabled = false,
}: TagInputProps) {
  const [inputValue, setInputValue] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault()
      addTag(inputValue)
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      removeTag(value.length - 1)
    }
  }

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim()
    if (!trimmedTag) return

    // Check if tag already exists
    if (value.includes(trimmedTag)) {
      // Flash the duplicate tag
      const tagElements = containerRef.current?.querySelectorAll(".tag-badge")
      const index = value.findIndex((t) => t === trimmedTag)
      if (tagElements && tagElements[index]) {
        tagElements[index].classList.add("animate-pulse")
        setTimeout(() => {
          tagElements[index].classList.remove("animate-pulse")
        }, 1000)
      }
      return
    }

    // Check if we've reached the maximum number of tags
    if (maxTags && value.length >= maxTags) return

    onChange([...value, trimmedTag])
    setInputValue("")
  }

  const removeTag = (index: number) => {
    const newTags = [...value]
    newTags.splice(index, 1)
    onChange(newTags)
  }

  const handleContainerClick = () => {
    inputRef.current?.focus()
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex flex-wrap gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        className,
        disabled && "opacity-50 cursor-not-allowed",
      )}
      onClick={handleContainerClick}
    >
      {value.map((tag, index) => (
        <Badge key={`${tag}-${index}`} variant="secondary" className="tag-badge px-2 py-1 h-7 text-xs font-normal">
          {tag}
          {!disabled && (
            <button
              type="button"
              className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onClick={(e) => {
                e.stopPropagation()
                removeTag(index)
              }}
              aria-label={`Remove ${tag}`}
            >
              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </Badge>
      ))}
      <Input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={value.length === 0 ? placeholder : ""}
        className="flex-1 min-w-[120px] border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        disabled={disabled || (maxTags !== undefined && value.length >= maxTags)}
      />
    </div>
  )
}

