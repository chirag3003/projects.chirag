"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { ExternalLink, X, User, Code, Briefcase, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { siteConfig } from "@/lib/configs/site"
import { projects } from "@/lib/configs/projects"
import { codepens } from "@/lib/configs/codepens"
import ProjectCard from "@/components/project-card"
import CodePenCard from "@/components/codepen-card"
import LoadingText from "@/components/loading-text"
import CategoryFilter from "@/components/category-filter"

// Create a unified type for items
type Item = ({ type: "project" } & (typeof projects)[0]) | ({ type: "codepen" } & (typeof codepens)[0])

export default function Home() {
  // Combine projects and codepens with type discriminator
  const allItems = useMemo(() => {
    const projectItems = projects.map((project) => ({ ...project, type: "project" as const }))
    const codepenItems = codepens.map((codepen) => ({ ...codepen, type: "codepen" as const }))

    // Interleave projects and codepens to ensure mixed content
    const combined = []
    const maxLength = Math.max(projectItems.length, codepenItems.length)

    for (let i = 0; i < maxLength; i++) {
      if (i < projectItems.length) combined.push(projectItems[i])
      if (i < codepenItems.length) combined.push(codepenItems[i])
    }

    return combined
  }, [])

  const featuredItems = useMemo(() => allItems.filter((item) => item.featured), [allItems])

  const allRegularItems = useMemo(() => allItems.filter((item) => !item.featured), [allItems])

  const ITEMS_PER_PAGE = 6
  const [visibleItems, setVisibleItems] = useState<typeof allRegularItems>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  // Extract all unique categories from all items
  const allCategories = useMemo(() => {
    const categoriesSet = new Set<string>()
    allItems.forEach((item) => {
      item.categories.forEach((category) => {
        categoriesSet.add(category)
      })
    })
    return Array.from(categoriesSet).sort()
  }, [allItems])

  // Filter items based on selected categories and search term
  const filteredItems = useMemo(() => {
    let filtered = allRegularItems

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((item) => item.categories.some((category) => selectedCategories.includes(category)))
    }

    // Apply search filter
    if (searchTerm.trim() !== "") {
      const search = searchTerm.toLowerCase().trim()
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(search) ||
          item.description.toLowerCase().includes(search) ||
          item.tags.some((tag) => tag.toLowerCase().includes(search)),
      )
    }

    return filtered
  }, [allRegularItems, selectedCategories, searchTerm])

  // Initialize items on first render
  useEffect(() => {
    setVisibleItems(allRegularItems.slice(0, ITEMS_PER_PAGE))
    setHasMore(allRegularItems.length > ITEMS_PER_PAGE)
  }, [allRegularItems])

  // Handle filter changes
  useEffect(() => {
    setCurrentPage(1)
    setVisibleItems(filteredItems.slice(0, ITEMS_PER_PAGE))
    setHasMore(filteredItems.length > ITEMS_PER_PAGE)
  }, [selectedCategories, searchTerm, filteredItems])

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

  const loadMoreItems = () => {
    setIsLoading(true)

    // Simulate loading delay
    setTimeout(() => {
      const nextPage = currentPage + 1
      const startIndex = currentPage * ITEMS_PER_PAGE
      const endIndex = nextPage * ITEMS_PER_PAGE
      const newItems = filteredItems.slice(startIndex, endIndex)

      setVisibleItems((prev) => [...prev, ...newItems])
      setCurrentPage(nextPage)
      setIsLoading(false)

      // Check if we've loaded all items
      if (endIndex >= filteredItems.length) {
        setHasMore(false)
      }
    }, 1500) // 1.5 second delay to show loading animation
  }

  // Render the appropriate card based on item type
  const renderItem = (item: Item, index: number) => {
    if (item.type === "project") {
      return (
        <ProjectCard
          key={`project-${index}`}
          title={item.title}
          description={item.description}
          image={item.image}
          tags={item.tags}
          demoUrl={item.demoUrl}
          repoUrl={item.repoUrl}
          stackblitzUrl={item.stackblitzUrl}
          featured={item.featured}
        />
      )
    } else {
      return (
        <CodePenCard
          key={`codepen-${index}`}
          title={item.title}
          description={item.description}
          thumbnail={item.thumbnail}
          tags={item.tags}
          penUrl={item.penUrl}
          featured={item.featured}
        />
      )
    }
  }

  return (
    <div className="min-h-screen bg-background pt-14">
      {" "}
      {/* Add padding-top equal to header height */}
      <main className="container max-w-screen-2xl px-4 sm:px-6 py-6 md:py-12">
        {/* Combined Hero & Bio Section */}
        <section className="py-10 md:py-16 lg:py-20 border-b">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">
              {/* Left side - Name and CTA */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:max-w-[45%]">
                <div className="space-y-3">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">{siteConfig.fullName}</h1>
                  <p className="text-xl text-muted-foreground">Full-Stack Web Developer</p>
                </div>
                <Button size="lg" className="h-12 px-8 text-base" asChild>
                  <Link
                    href={siteConfig.mainPortfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Visit My Portfolio
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Right side - Bio */}
              <div className="flex flex-col md:flex-row lg:flex-col items-center md:items-start gap-8 lg:max-w-[50%]">
                <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 bg-primary/10 rounded-full flex items-center justify-center lg:hidden">
                  <User className="w-12 h-12 md:w-14 md:h-14 text-primary" />
                </div>
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="hidden lg:flex flex-shrink-0 w-16 h-16 bg-primary/10 rounded-full items-center justify-center">
                      <User className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold">About Me</h2>
                  </div>
                  <p className="text-lg leading-relaxed text-muted-foreground">{siteConfig.bio}</p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Briefcase className="w-4 h-4 text-primary" />
                      <span>Full-Stack Developer</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Code className="w-4 h-4 text-primary" />
                      <span>Web Development</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Items */}
        {featuredItems.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="flex flex-col items-start gap-4 md:gap-8 max-w-[2000px] mx-auto">
              <div className="grid gap-1">
                <h2 className="text-3xl font-bold tracking-tight">Featured Work</h2>
                <p className="text-muted-foreground">Highlighted projects and CodePens I've created</p>
              </div>
              <div className="grid w-full gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-6 lg:gap-8">
                {featuredItems.map((item, index) => renderItem(item, index))}
              </div>
            </div>
          </section>
        )}

        {/* All Items */}
        <section className="py-12 md:py-16">
          <div className="flex flex-col items-start gap-4 md:gap-8 max-w-[2000px] mx-auto">
            <div className="grid gap-1">
              <h2 className="text-3xl font-bold tracking-tight">My Projects</h2>
              <p className="text-muted-foreground">Browse my complete collection of projects and CodePen experiments</p>
            </div>

            {/* Search Bar */}
            <div className="w-full mb-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search projects by title, description, or tags..."
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
              {visibleItems.length > 0 ? (
                visibleItems.map((item, index) => renderItem(item, index))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <p className="text-muted-foreground">
                    {searchTerm
                      ? `No items match your search for "${searchTerm}"${selectedCategories.length > 0 ? " with the selected categories." : "."}`
                      : "No items match the selected categories."}
                  </p>
                  <Button variant="outline" size="sm" onClick={clearAllFilters} className="mt-4">
                    Clear filters
                  </Button>
                </div>
              )}
            </div>

            {/* Load More Section */}
            {(hasMore || isLoading) && visibleItems.length > 0 && (
              <div className="w-full flex flex-col items-center justify-center py-8 mt-4">
                {isLoading ? (
                  <div className="flex flex-col items-center space-y-4">
                    <LoadingText />
                    <p className="text-muted-foreground text-sm">Loading more items...</p>
                  </div>
                ) : (
                  <Button onClick={loadMoreItems} variant="outline" size="lg" className="min-w-[200px]">
                    Load More
                  </Button>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container max-w-screen-2xl px-4 sm:px-6 flex h-14 items-center">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            View my complete portfolio at{" "}
            <Link
              href={siteConfig.mainPortfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4 hover:text-foreground"
            >
              {siteConfig.mainPortfolio.replace("https://", "")}
            </Link>
          </p>
          <div className="flex flex-1 items-center justify-end">
            <Button variant="ghost" size="sm" asChild>
              <Link
                href={siteConfig.mainPortfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <span>Portfolio</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}

