"use client"

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

interface DeleteItemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  itemName: string | null
  itemType: "category" | "tag"
  usageCount: number
  onConfirm: () => void
}

export function DeleteItemDialog({
  open,
  onOpenChange,
  itemName,
  itemType,
  usageCount,
  onConfirm,
}: DeleteItemDialogProps) {
  const itemTypeName = itemType === "category" ? "category" : "tag"

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the {itemTypeName} "{itemName}".
            {usageCount > 0 && (
              <span className="block mt-2 font-semibold text-destructive">
                Warning: This {itemTypeName} is used by {usageCount} projects. Deleting it will remove it from those
                projects.
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

