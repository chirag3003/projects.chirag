"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
import { Command as CommandPrimitive } from "cmdk"

type MultiSelectProps = {
  value: string[]
  onValueChange: (value: string[]) => void
  placeholder?: string
  children: React.ReactNode
}

export function MultiSelect({ value, onValueChange, placeholder = "Select items", children }: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")

  const handleUnselect = React.useCallback(
    (item: string) => {
      onValueChange(value.filter((i) => i !== item))
    },
    [value, onValueChange],
  )

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "" && value.length > 0) {
            handleUnselect(value[value.length - 1])
          }
        }
        // This is not a default behavior of the <input /> field
        if (e.key === "Escape") {
          input.blur()
        }
      }
    },
    [value, handleUnselect],
  )

  const selectables = React.useMemo(() => {
    return React.Children.toArray(children)
      .filter(React.isValidElement)
      .flatMap((child) => {
        if (child.type === CommandGroup) {
          return React.Children.toArray(child.props.children)
            .filter(React.isValidElement)
            .filter((groupChild) => groupChild.type === CommandItem)
        }
        if (child.type === CommandItem) {
          return child
        }
        return []
      })
      .filter(React.isValidElement)
      .filter((child) => {
        const childValue = child.props.value
        return !value.includes(childValue)
      })
  }, [children, value])

  return (
    <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {value.map((item) => (
            <Badge key={item} variant="secondary" className="rounded-sm px-1 font-normal">
              {item}
              <button
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUnselect(item)
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onClick={() => handleUnselect(item)}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={value.length === 0 ? placeholder : undefined}
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div className="absolute top-0 z-10 w-full max-w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full max-h-[200px] overflow-auto">
              {selectables.map((child) => {
                return React.cloneElement(child as React.ReactElement, {
                  onSelect: (value: string) => {
                    onValueChange([...value, value])
                    setInputValue("")
                  },
                  onMouseDown: (e: React.MouseEvent) => {
                    e.preventDefault()
                    e.stopPropagation()
                  },
                  className: "cursor-pointer",
                })
              })}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  )
}

export const MultiSelectTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => <button ref={ref} className={className} {...props} />,
)
MultiSelectTrigger.displayName = "MultiSelectTrigger"

export const MultiSelectContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={className} {...props} />,
)
MultiSelectContent.displayName = "MultiSelectContent"

export const MultiSelectItem = React.forwardRef<
  React.ElementRef<typeof CommandItem>,
  React.ComponentPropsWithoutRef<typeof CommandItem>
>(({ className, ...props }, ref) => <CommandItem ref={ref} className={className} {...props} />)
MultiSelectItem.displayName = "MultiSelectItem"

export const MultiSelectValue = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => <span ref={ref} className={className} {...props} />,
)
MultiSelectValue.displayName = "MultiSelectValue"

