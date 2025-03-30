"use client"

import type * as React from "react"
import { AlertCircle } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"

type EmbedType = "none" | "stackblitz" | "codepen"

interface EmbedTypeSelectorProps {
  embedType: EmbedType
  stackblitzUrl: string
  codepenUrl: string
  onEmbedTypeChange: (type: EmbedType) => void
  onStackblitzUrlChange: (url: string) => void
  onCodepenUrlChange: (url: string) => void
}

export function EmbedTypeSelector({
  embedType,
  stackblitzUrl,
  codepenUrl,
  onEmbedTypeChange,
  onStackblitzUrlChange,
  onCodepenUrlChange,
}: EmbedTypeSelectorProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === "stackblitzUrl") {
      onStackblitzUrlChange(value)
      if (value && embedType !== "stackblitz") {
        onEmbedTypeChange("stackblitz")
      }
    } else if (name === "codepenUrl") {
      onCodepenUrlChange(value)
      if (value && embedType !== "codepen") {
        onEmbedTypeChange("codepen")
      }
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Interactive Embed (Optional)</Label>
        <p className="text-xs text-muted-foreground mt-1 mb-2">Choose one type of interactive embed for your project</p>

        <RadioGroup
          value={embedType}
          onValueChange={(value) => onEmbedTypeChange(value as EmbedType)}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="embed-none" />
            <Label htmlFor="embed-none" className="cursor-pointer">
              None
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="stackblitz" id="embed-stackblitz" />
            <Label htmlFor="embed-stackblitz" className="cursor-pointer">
              StackBlitz
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="codepen" id="embed-codepen" />
            <Label htmlFor="embed-codepen" className="cursor-pointer">
              CodePen
            </Label>
          </div>
        </RadioGroup>
      </div>

      {embedType === "stackblitz" && (
        <div className="space-y-2">
          <Label htmlFor="stackblitzUrl">StackBlitz URL</Label>
          <Input
            id="stackblitzUrl"
            name="stackblitzUrl"
            value={stackblitzUrl}
            onChange={handleInputChange}
            placeholder="https://stackblitz.com/edit/project"
          />
        </div>
      )}

      {embedType === "codepen" && (
        <div className="space-y-2">
          <Label htmlFor="codepenUrl">CodePen URL</Label>
          <Input
            id="codepenUrl"
            name="codepenUrl"
            value={codepenUrl}
            onChange={handleInputChange}
            placeholder="https://codepen.io/username/pen/pen-id"
          />
        </div>
      )}

      {stackblitzUrl && codepenUrl && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>You can only provide either a StackBlitz URL or a CodePen URL, not both.</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

