"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { X, Code, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { codepens } from "@/lib/configs/codepens"
import LoadingText from "@/components/loading-text"
import CategoryFilter from "@/components/category-filter"
import CodePenCard from "@/components/codepen-card"

export default function CodePensPage() {
  const featuredPens = useMemo(() => codepens.filter((pen) => pen.featured), [])
  const allRegularPens = useMemo(() => codepens.filter((pen) => !pen.featured), [])

  const PENS_PER_PAGE = 6
  const [visiblePens, setVisiblePens] = useState<typeof allRegularPens>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  // Extract all unique categories from codepens
  const allCategories = useMemo(() => {
    const categoriesSet = new Set<string>()
    codepens.forEach((pen) => {
      pen.categories.forEach((category) => {
        categoriesSet.add(category)
      })
    })
    return Array.from(categoriesSet).sort()
  }, [])

  // Filter codepens based on selected categories and search term
  const filteredPens = useMemo(() => {
    let filtered = allRegularPens

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((pen) => pen.categories.some((category) => selectedCategories.includes(category)))
    }

    // Apply search filter
    if (searchTerm.trim() !== "") {
      const search = searchTerm.toLowerCase().trim()
      filtered = filtered.filter(
        (pen) =>
          pen.title.toLowerCase().includes(search) ||
          pen.description.toLowerCase().includes(search) ||
          pen.tags.some((tag) => tag.toLowerCase().includes(search)),
      )
    }

    return filtered
  }, [allRegularPens, selectedCategories, searchTerm])

  // Initialize codepens on first render
  useEffect(() => {
    setVisiblePens(allRegularPens.slice(0, PENS_PER_PAGE))
    setHasMore(allRegularPens.length > PENS_PER_PAGE)
  }, [allRegularPens])

  // Handle filter changes
  useEffect(() => {
    // Only update if selectedCategories changes
    setCurrentPage(1)
    setVisiblePens(filteredPens.slice(0, PENS_PER_PAGE))
    setHasMore(filteredPens.length > PENS_PER_PAGE)
  }, [selectedCategories, searchTerm, filteredPens])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category)
      } else {
        return [...prev, category]
      }
    })
  }

  const clearCategories = () => {
    setSelectedCategories([])
  }

  const clearSearch = () => {
    setSearchTerm("")
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSearchTerm("")
  }

  const loadMorePens = () => {
    setIsLoading(true)

    // Simulate loading delay
    setTimeout(() => {
      const nextPage = currentPage + 1
      const startIndex = currentPage * PENS_PER_PAGE
      const endIndex = nextPage * PENS_PER_PAGE
      const newPens = filteredPens.slice(startIndex, endIndex)

      setVisiblePens((prev) => [...prev, ...newPens])
      setCurrentPage(nextPage)
      setIsLoading(false)

      // Check if we've loaded all codepens
      if (endIndex >= filteredPens.length) {
        setHasMore(false)
      }
    }, 1500) // 1.5 second delay to show loading animation
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-screen-2xl px-4 sm:px-6 py-6 md:py-12">
        {/* Hero Section */}
        <section className="py-10 md:py-16 lg:py-20 border-b">
          <div className="flex flex-col items-center text-center space-y-6 md:space-y-8 max-w-4xl mx-auto">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">CodePen Collection</h1>
              <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
                A dedicated showcase of my interactive code experiments and UI components created on CodePen.
              </p>
            </div>
            <Button size="lg" className="h-12 px-8 text-base" asChild>
              <Link
                href="https://codepen.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Code className="h-4 w-4" />
                Visit My CodePen Profile
              </Link>
            </Button>
          </div>
        </section>

        {/* Featured CodePens */}
        {featuredPens.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="flex flex-col items-start gap-4 md:gap-8 max-w-[2000px] mx-auto">
              <div className="grid gap-1">
                <h2 className="text-3xl font-bold tracking-tight">Featured CodePens</h2>
                <p className="text-muted-foreground">Highlighted CodePen experiments and demos</p>
              </div>
              <div className="grid w-full gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-6 lg:gap-8">
                {featuredPens.map((pen, index) => (
                  <CodePenCard
                    key={index}
                    title={pen.title}
                    description={pen.description}
                    thumbnail={pen.thumbnail}
                    tags={pen.tags}
                    penUrl={pen.penUrl}
                    featured
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All CodePens */}
        <section className="py-12 md:py-16">
          <div className="flex flex-col items-start gap-4 md:gap-8 max-w-[2000px] mx-auto">
            <div className="grid gap-1">
              <h2 className="text-3xl font-bold tracking-tight">All CodePens</h2>
              <p className="text-muted-foreground">Browse my complete collection of CodePen experiments</p>
            </div>

            {/* Search Bar */}
            <div className="w-full mb-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search CodePens by title, description, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11"
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="w-full">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-sm font-medium">Filter by category:</span>
                {(selectedCategories.length > 0 || searchTerm) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="h-7 px-2 text-xs font-normal text-muted-foreground hover:text-foreground"
                  >
                    Clear all filters
                    <X className="ml-1 h-3 w-3" />
                  </Button>
                )}
              </div>
              <CategoryFilter
                categories={allCategories}
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
              />
            </div>

            <div className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 sm:gap-6 lg:gap-8">
              {visiblePens.length > 0 ? (
                visiblePens.map((pen, index) => (
                  <CodePenCard
                    key={index}
                    title={pen.title}
                    description={pen.description}
                    thumbnail={pen.thumbnail}
                    tags={pen.tags}
                    penUrl={pen.penUrl}
                  />
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <p className="text-muted-foreground">
                    {searchTerm
                      ? `No CodePens match your search for "${searchTerm}"${selectedCategories.length > 0 ? " with the selected categories." : "."}`
                      : "No CodePens match the selected categories."}
                  </p>
                  <Button variant="outline" size="sm" onClick={clearAllFilters} className="mt-4">
                    Clear filters
                  </Button>
                </div>
              )}
            </div>

            {/* Load More Section */}
            {(hasMore || isLoading) && visiblePens.length > 0 && (
              <div className="w-full flex flex-col items-center justify-center py-8 mt-4">
                {isLoading ? (
                  <div className="flex flex-col items-center space-y-4">
                    <LoadingText />
                    <p className="text-muted-foreground text-sm">Loading amazing CodePens...</p>
                  </div>
                ) : (
                  <Button onClick={loadMorePens} variant="outline" size="lg" className="min-w-[200px]">
                    Load More CodePens
                  </Button>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

