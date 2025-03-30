"use client"

import { useState, useEffect } from "react"
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

interface EditItemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  itemName: string | null
  itemType: "category" | "tag"
  onSave: (oldName: string, newName: string) => void
}

export function EditItemDialog({ open, onOpenChange, itemName, itemType, onSave }: EditItemDialogProps) {
  const [newName, setNewName] = useState("")
  const itemTypeName = itemType === "category" ? "Category" : "Tag"

  useEffect(() => {
    if (open && itemName) {
      setNewName(itemName)
    }
  }, [open, itemName])

  const handleSave = () => {
    if (itemName && newName) {
      onSave(itemName, newName)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {itemTypeName}</DialogTitle>
          <DialogDescription>Update the {itemType} name.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-item">{itemTypeName} Name</Label>
            <Input
              id="edit-item"
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
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

