"use client"

import { useState } from "react"
import { Tag, PlusCircle, Search, Pencil, Trash2, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useCategories } from "@/lib/hooks/use-categories"
import { useProjects } from "@/lib/hooks/use-projects"

export default function CategoriesPage() {
  const { toast } = useToast()
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories()
  const { projects } = useProjects()
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [categoryToEdit, setCategoryToEdit] = useState<string | null>(null)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [newCategory, setNewCategory] = useState("")

  const filteredCategories = categories.filter((category) => category.toLowerCase().includes(searchTerm.toLowerCase()))

  const getCategoryUsageCount = (category: string) => {
    return projects.filter((project) => project.categories.includes(category)).length
  }

  const handleDeleteClick = (category: string) => {
    setCategoryToDelete(category)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete)
      toast({
        title: "Category deleted",
        description: `"${categoryToDelete}" has been removed.`,
      })
      setCategoryToDelete(null)
      setDeleteDialogOpen(false)
    }
  }

  const handleEditClick = (category: string) => {
    setCategoryToEdit(category)
    setNewCategoryName(category)
    setEditDialogOpen(true)
  }

  const confirmEdit = () => {
    if (categoryToEdit && newCategoryName && categoryToEdit !== newCategoryName) {
      if (categories.includes(newCategoryName)) {
        toast({
          title: "Category already exists",
          description: "Please use a different name.",
          variant: "destructive",
        })
        return
      }

      updateCategory(categoryToEdit, newCategoryName)
      toast({
        title: "Category updated",
        description: `"${categoryToEdit}" has been renamed to "${newCategoryName}".`,
      })
      setCategoryToEdit(null)
      setEditDialogOpen(false)
    } else if (categoryToEdit === newCategoryName) {
      setEditDialogOpen(false)
    }
  }

  const handleAddCategory = () => {
    if (!newCategory) {
      toast({
        title: "Category name required",
        description: "Please enter a name for the category.",
        variant: "destructive",
      })
      return
    }

    if (categories.includes(newCategory)) {
      toast({
        title: "Category already exists",
        description: "Please use a different name.",
        variant: "destructive",
      })
      return
    }

    addCategory(newCategory)
    toast({
      title: "Category added",
      description: `"${newCategory}" has been added to categories.`,
    })
    setNewCategory("")
    setAddDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Manage project categories</p>
        </div>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>Create a new category for organizing projects.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="new-category">Category Name</Label>
                <Input
                  id="new-category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Web App"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCategory}>Add Category</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search categories..."
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
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category Name</TableHead>
              <TableHead className="w-[100px] text-center">Usage</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <TableRow key={category}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <span>{category}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{getCategoryUsageCount(category)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <ChevronDown className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditClick(category)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDeleteClick(category)}
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
                      <p>No categories match your search</p>
                      <Button variant="link" onClick={() => setSearchTerm("")} className="mt-2">
                        Clear search
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <Tag className="h-8 w-8 mb-2" />
                      <p>No categories found</p>
                      <Button variant="link" onClick={() => setAddDialogOpen(true)} className="mt-2">
                        Add your first category
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the category "{categoryToDelete}".
              {getCategoryUsageCount(categoryToDelete || "") > 0 && (
                <span className="block mt-2 font-semibold text-destructive">
                  Warning: This category is used by {getCategoryUsageCount(categoryToDelete || "")} projects. Deleting
                  it will remove it from those projects.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Update the category name.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-category">Category Name</Label>
              <Input
                id="edit-category"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Web App"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

