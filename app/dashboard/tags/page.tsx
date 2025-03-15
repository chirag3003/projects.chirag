"use client"

import { useState } from "react"
import { TagIcon, PlusCircle, Search, Pencil, Trash2, ChevronDown, X } from "lucide-react"
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
import { useTags } from "@/lib/hooks/use-tags"
import { useProjects } from "@/lib/hooks/use-projects"

export default function TagsPage() {
  const { toast } = useToast()
  const { tags, addTag, updateTag, deleteTag } = useTags()
  const { projects } = useProjects()
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [tagToDelete, setTagToDelete] = useState<string | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [tagToEdit, setTagToEdit] = useState<string | null>(null)
  const [newTagName, setNewTagName] = useState("")
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [newTag, setNewTag] = useState("")

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
    setNewTagName(tag)
    setEditDialogOpen(true)
  }

  const confirmEdit = () => {
    if (tagToEdit && newTagName && tagToEdit !== newTagName) {
      if (tags.includes(newTagName)) {
        toast({
          title: "Tag already exists",
          description: "Please use a different name.",
          variant: "destructive",
        })
        return
      }

      updateTag(tagToEdit, newTagName)
      toast({
        title: "Tag updated",
        description: `"${tagToEdit}" has been renamed to "${newTagName}".`,
      })
      setTagToEdit(null)
      setEditDialogOpen(false)
    } else if (tagToEdit === newTagName) {
      setEditDialogOpen(false)
    }
  }

  const handleAddTag = () => {
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
    setNewTag("")
    setAddDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tags</h1>
          <p className="text-muted-foreground">Manage project tags</p>
        </div>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Tag
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Tag</DialogTitle>
              <DialogDescription>Create a new tag for organizing projects.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="new-tag">Tag Name</Label>
                <Input id="new-tag" value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="React" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTag}>Add Tag</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tags..."
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
              <TableHead>Tag Name</TableHead>
              <TableHead className="w-[100px] text-center">Usage</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTags.length > 0 ? (
              filteredTags.map((tag) => (
                <TableRow key={tag}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <TagIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{tag}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{getTagUsageCount(tag)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <ChevronDown className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditClick(tag)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDeleteClick(tag)}
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
                      <p>No tags match your search</p>
                      <Button variant="link" onClick={() => setSearchTerm("")} className="mt-2">
                        Clear search
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <TagIcon className="h-8 w-8 mb-2" />
                      <p>No tags found</p>
                      <Button variant="link" onClick={() => setAddDialogOpen(true)} className="mt-2">
                        Add your first tag
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
              This will permanently delete the tag "{tagToDelete}".
              {getTagUsageCount(tagToDelete || "") > 0 && (
                <span className="block mt-2 font-semibold text-destructive">
                  Warning: This tag is used by {getTagUsageCount(tagToDelete || "")} projects. Deleting it will remove
                  it from those projects.
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
            <DialogTitle>Edit Tag</DialogTitle>
            <DialogDescription>Update the tag name.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-tag">Tag Name</Label>
              <Input
                id="edit-tag"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="React"
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

