"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useCategories } from "@/lib/hooks/use-categories"
import { useProjects } from "@/lib/hooks/use-projects"
import { ItemSearch } from "@/components/dashboard/item-search"
import { ItemListView } from "@/components/dashboard/item-list-view"
import { DeleteItemDialog } from "@/components/dashboard/delete-item-dialog"
import { EditItemDialog } from "@/components/dashboard/edit-item-dialog"
import { AddItemDialog, AddItemButton } from "@/components/dashboard/add-item-dialog"

export default function CategoriesPage() {
  const { toast } = useToast()
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories()
  const { projects } = useProjects()
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [categoryToEdit, setCategoryToEdit] = useState<string | null>(null)
  const [addDialogOpen, setAddDialogOpen] = useState(false)

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
    setEditDialogOpen(true)
  }

  const handleEditSave = (oldCategory: string, newCategory: string) => {
    if (oldCategory === newCategory) {
      setEditDialogOpen(false)
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

    updateCategory(oldCategory, newCategory)
    toast({
      title: "Category updated",
      description: `"${oldCategory}" has been renamed to "${newCategory}".`,
    })
    setCategoryToEdit(null)
    setEditDialogOpen(false)
  }

  const handleAddCategory = (newCategory: string) => {
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
    setAddDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Manage project categories</p>
        </div>
        <AddItemButton onClick={() => setAddDialogOpen(true)} itemType="category" />
      </div>

      <div className="flex items-center gap-2">
        <ItemSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search categories..." />
      </div>

      <ItemListView
        items={filteredCategories}
        searchTerm={searchTerm}
        itemType="category"
        getUsageCount={getCategoryUsageCount}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        onAddClick={() => setAddDialogOpen(true)}
      />

      <DeleteItemDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        itemName={categoryToDelete}
        itemType="category"
        usageCount={categoryToDelete ? getCategoryUsageCount(categoryToDelete) : 0}
        onConfirm={confirmDelete}
      />

      <EditItemDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        itemName={categoryToEdit}
        itemType="category"
        onSave={handleEditSave}
      />

      <AddItemDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        itemType="category"
        onAdd={handleAddCategory}
      />
    </div>
  )
}

