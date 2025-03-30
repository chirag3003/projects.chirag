"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

interface AddItemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  itemType: "category" | "tag"
  onAdd: (name: string) => void
}

export function AddItemDialog({ open, onOpenChange, itemType, onAdd }: AddItemDialogProps) {
  const [newName, setNewName] = useState("")
  const itemTypeName = itemType === "category" ? "Category" : "Tag"

  const handleAdd = () => {
    if (newName) {
      onAdd(newName)
      setNewName("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New {itemTypeName}</DialogTitle>
          <DialogDescription>Create a new {itemType} for organizing projects.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="new-item">{itemTypeName} Name</Label>
            <Input
              id="new-item"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder={itemType === "category" ? "Web App" : "React"}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAdd}>Add {itemTypeName}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function AddItemButton({
  onClick,
  itemType,
}: {
  onClick: () => void
  itemType: "category" | "tag"
}) {
  return (
    <Button onClick={onClick}>
      <PlusCircle className="mr-2 h-4 w-4" />
      Add {itemType === "category" ? "Category" : "Tag"}
    </Button>
  )
}

