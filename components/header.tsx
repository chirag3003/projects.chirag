"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Github, Menu, X, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"
import { siteConfig } from "@/lib/configs/site"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Close menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!isOpen) return

      const sidepanel = document.getElementById("mobile-sidepanel")

      if (sidepanel && !sidepanel.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [isOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-lg">{siteConfig.fullName}</span>
            <span className="hidden font-medium text-muted-foreground md:inline-block">/ {siteConfig.title}</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 md:gap-6">
          <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            My Projects
          </Link>
          <Link
            href="/codepens"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            CodePens
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="hidden md:flex items-center">
            <Link
              href={siteConfig.mainPortfolio}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Portfolio
            </Link>
          </nav>
          <ThemeToggle />
          <Button variant="ghost" size="icon" asChild className="hidden md:flex">
            <Link href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isOpen && <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden" aria-hidden="true" />}

      {/* Mobile Side Panel */}
      <div
        id="mobile-sidepanel"
        className={cn(
          "fixed top-0 right-0 z-[60] h-screen w-3/4 max-w-xs bg-background border-l shadow-lg md:hidden transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 h-14 border-b">
            <span className="font-bold text-lg">{siteConfig.name}</span>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close menu">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex flex-col p-4 space-y-6 flex-grow">
            <Link
              href="/"
              className="text-base font-medium hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              My Projects
            </Link>
            <Link
              href="/codepens"
              className="text-base font-medium hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              CodePens
            </Link>
            <Link
              href={siteConfig.mainPortfolio}
              target="_blank"
              rel="noreferrer"
              className="text-base font-medium hover:text-primary transition-colors flex items-center"
              onClick={() => setIsOpen(false)}
            >
              Portfolio
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-medium hover:text-primary transition-colors flex items-center"
              onClick={() => setIsOpen(false)}
            >
              GitHub
              <Github className="ml-2 h-4 w-4" />
            </Link>
          </nav>

          <div className="mt-auto border-t p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} {siteConfig.fullName}
              </span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

