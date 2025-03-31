"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useCategoriesStore } from "@/lib/stores/use-categories-store";
import { useProjectsStore } from "@/lib/stores/use-projects-store";
import { ItemSearch } from "@/components/dashboard/item-search";
import { ItemListView } from "@/components/dashboard/item-list-view";
import { DeleteItemDialog } from "@/components/dashboard/delete-item-dialog";
import { EditItemDialog } from "@/components/dashboard/edit-item-dialog";
import {
  AddItemDialog,
  AddItemButton,
} from "@/components/dashboard/add-item-dialog";
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
} from "@/hooks/category.hooks";
import { Category } from "@/lib/validators/category.schema";

export default function CategoriesPage() {
  const { toast } = useToast();
  const { updateCategory } = useCategoriesStore();
  const { mutateAsync: addCategory } = useCreateCategory();
  const { mutateAsync: deleteCategory } = useDeleteCategory();
  const { data: categories } = useCategories();
  const { projects } = useProjectsStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<string | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const filteredCategories = categories?.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryUsageCount = (category: string) => {
    return projects.filter((project) => project.categories.includes(category))
      .length;
  };

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete.id);
      toast({
        title: "Category deleted",
        description: `"${categoryToDelete}" has been removed.`,
      });
      setCategoryToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleEditClick = (category: string) => {
    setCategoryToEdit(category);
    setEditDialogOpen(true);
  };

  const handleEditSave = (oldCategory: string, newCategory: string) => {
    if (oldCategory === newCategory) {
      setEditDialogOpen(false);
      return;
    }
    const categoryPresent = categories?.find((cat) => cat.name === newCategory);
    if (categoryPresent) {
      toast({
        title: "Category already exists",
        description: "Please use a different name.",
        variant: "destructive",
      });
      return;
    }

    updateCategory(oldCategory, newCategory);
    toast({
      title: "Category updated",
      description: `"${oldCategory}" has been renamed to "${newCategory}".`,
    });
    setCategoryToEdit(null);
    setEditDialogOpen(false);
  };

  const handleAddCategory = (newCategory: string) => {
    if (!newCategory) {
      toast({
        title: "Category name required",
        description: "Please enter a name for the category.",
        variant: "destructive",
      });
      return;
    }

    const categoryPresent = categories?.find((cat) => cat.name === newCategory);
    if (categoryPresent) {
      toast({
        title: "Category already exists",
        description: "Please use a different name.",
        variant: "destructive",
      });
      return;
    }

    addCategory(newCategory);
    toast({
      title: "Category added",
      description: `"${newCategory}" has been added to categories.`,
    });
    setAddDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Manage project categories</p>
        </div>
        <AddItemButton
          onClick={() => setAddDialogOpen(true)}
          itemType="category"
        />
      </div>

      <div className="flex items-center gap-2">
        <ItemSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search categories..."
        />
      </div>

      <ItemListView
        items={filteredCategories ?? []}
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
        itemName={categoryToDelete?.name ?? ""}
        itemType="category"
        usageCount={0}
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
  );
}
