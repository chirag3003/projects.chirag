"use client"

import { Tag, TagIcon, Search, Pencil, Trash2, ChevronDown } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ItemListViewProps {
  items: string[]
  searchTerm: string
  itemType: "category" | "tag"
  getUsageCount: (item: string) => number
  onEditClick: (item: string) => void
  onDeleteClick: (item: string) => void
  onAddClick: () => void
}

export function ItemListView({
  items,
  searchTerm,
  itemType,
  getUsageCount,
  onEditClick,
  onDeleteClick,
  onAddClick,
}: ItemListViewProps) {
  const IconComponent = itemType === "category" ? Tag : TagIcon
  const itemTypeName = itemType === "category" ? "category" : "tag"
  const itemTypeNamePlural = itemType === "category" ? "categories" : "tags"

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{itemType === "category" ? "Category Name" : "Tag Name"}</TableHead>
            <TableHead className="w-[100px] text-center">Usage</TableHead>
            <TableHead className="w-[100px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length > 0 ? (
            items.map((item) => (
              <TableRow key={item}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-4 w-4 text-muted-foreground" />
                    <span>{item}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">{getUsageCount(item)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <ChevronDown className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEditClick(item)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => onDeleteClick(item)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                {searchTerm ? (
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Search className="h-8 w-8 mb-2" />
                    <p>No {itemTypeNamePlural} match your search</p>
                    <Button variant="link" onClick={() => {}} className="mt-2">
                      Clear search
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <IconComponent className="h-8 w-8 mb-2" />
                    <p>No {itemTypeNamePlural} found</p>
                    <Button variant="link" onClick={onAddClick} className="mt-2">
                      Add your first {itemTypeName}
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

