"use client"

import { useEffect, useState } from "react"

export default function LoadingText() {
  const [dots, setDots] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return ""
        return prev + "."
      })
    }, 300)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        <div className="h-12 w-12 rounded-full border-4 border-muted-foreground/30 border-t-primary animate-spin"></div>
        <span className="sr-only">Loading</span>
      </div>
      <span className="ml-3 text-lg font-medium min-w-[80px]">
        Loading<span className="inline-block w-[24px] text-left">{dots}</span>
      </span>
    </div>
  )
}

