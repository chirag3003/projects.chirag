"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useTagsStore } from "@/lib/stores/use-tags-store"
import { useProjectsStore } from "@/lib/stores/use-projects-store"
import { ItemSearch } from "@/components/dashboard/item-search"
import { ItemListView } from "@/components/dashboard/item-list-view"
import { DeleteItemDialog } from "@/components/dashboard/delete-item-dialog"
import { EditItemDialog } from "@/components/dashboard/edit-item-dialog"
import { AddItemDialog, AddItemButton } from "@/components/dashboard/add-item-dialog"

export default function TagsPage() {
  const { toast } = useToast()
  const { tags, addTag, updateTag, deleteTag } = useTagsStore()
  const { projects } = useProjectsStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [tagToDelete, setTagToDelete] = useState<string | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [tagToEdit, setTagToEdit] = useState<string | null>(null)
  const [addDialogOpen, setAddDialogOpen] = useState(false)

  const filteredTags = tags.filter((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

  const getTagUsageCount = (tag: string) => {
    return projects.filter((project) => project.tags.includes(tag)).length
  }

  const handleDeleteClick = (tag: string) => {
    setTagToDelete(tag)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (tagToDelete) {
      deleteTag(tagToDelete)
      toast({
        title: "Tag deleted",
        description: `"${tagToDelete}" has been removed.`,
      })
      setTagToDelete(null)
      setDeleteDialogOpen(false)
    }
  }

  const handleEditClick = (tag: string) => {
    setTagToEdit(tag)
    setEditDialogOpen(true)
  }

  const handleEditSave = (oldTag: string, newTag: string) => {
    if (oldTag === newTag) {
      setEditDialogOpen(false)
      return
    }

    if (tags.includes(newTag)) {
      toast({
        title: "Tag already exists",
        description: "Please use a different name.",
        variant: "destructive",
      })
      return
    }

    updateTag(oldTag, newTag)
    toast({
      title: "Tag updated",
      description: `"${oldTag}" has been renamed to "${newTag}".`,
    })
    setTagToEdit(null)
    setEditDialogOpen(false)
  }

  const handleAddTag = (newTag: string) => {
    if (!newTag) {
      toast({
        title: "Tag name required",
        description: "Please enter a name for the tag.",
        variant: "destructive",
      })
      return
    }

    if (tags.includes(newTag)) {
      toast({
        title: "Tag already exists",
        description: "Please use a different name.",
        variant: "destructive",
      })
      return
    }

    addTag(newTag)
    toast({
      title: "Tag added",
      description: `"${newTag}" has been added to tags.`,
    })
    setAddDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tags</h1>
          <p className="text-muted-foreground">Manage project tags</p>
        </div>
        <AddItemButton onClick={() => setAddDialogOpen(true)} itemType="tag" />
      </div>

      <div className="flex items-center gap-2">
        <ItemSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search tags..." />
      </div>

      <ItemListView
        items={filteredTags}
        searchTerm={searchTerm}
        itemType="tag"
        getUsageCount={getTagUsageCount}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        onAddClick={() => setAddDialogOpen(true)}
      />

      <DeleteItemDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        itemName={tagToDelete}
        itemType="tag"
        usageCount={tagToDelete ? getTagUsageCount(tagToDelete) : 0}
        onConfirm={confirmDelete}
      />

      <EditItemDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        itemName={tagToEdit}
        itemType="tag"
        onSave={handleEditSave}
      />

      <AddItemDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} itemType="tag" onAdd={handleAddTag} />
    </div>
  )
}

