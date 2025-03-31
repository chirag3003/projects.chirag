"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { X, Code, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingText from "@/components/loading-text";
import CategoryFilter from "@/components/category-filter";
import ProjectCard from "@/components/project-card";
import { Project } from "@/lib/validators/project.schema";

interface CodePensPageProps {
  projects: Project[];
}

export default function CodePensPage({ projects }: CodePensPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

// Filter projects to only include those with a codepenUrl
const codepens = projects.filter((project) => project.codepenUrl);

const featuredPens = codepens.filter((pen) => pen.featured);
const allRegularPens = codepens.filter((pen) => !pen.featured);

  // Extract all unique categories from codepens
  const allCategories = useMemo(() => {
    const categoriesSet = new Set<string>();
    codepens.forEach((pen) => {
      pen.categories.forEach((category) => {
        categoriesSet.add(category);
      });
    });
    return Array.from(categoriesSet).sort();
  }, [codepens]);

  // Filter codepens based on selected categories and search term
  const filteredPens = useMemo(() => {
    let filtered = allRegularPens;

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((pen) =>
        pen.categories.some((category) => selectedCategories.includes(category))
      );
    }

    // Apply search filter
    if (searchTerm.trim() !== "") {
      const search = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (pen) =>
          pen.title.toLowerCase().includes(search) ||
          pen.description.toLowerCase().includes(search) ||
          pen.tags.some((tag) => tag.toLowerCase().includes(search))
      );
    }

    return filtered;
  }, [allRegularPens, selectedCategories, searchTerm]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-background pt-14">
      <main className="container max-w-screen-2xl px-4 sm:px-6 py-6 md:py-12">
        {/* Hero Section */}
        <section className="py-10 md:py-16 lg:py-20 border-b">
          <div className="flex flex-col items-center text-center space-y-6 md:space-y-8 max-w-4xl mx-auto">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                CodePen Collection
              </h1>
              <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
                A dedicated showcase of my interactive code experiments and UI
                components created on CodePen.
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
                <h2 className="text-3xl font-bold tracking-tight">
                  Featured CodePens
                </h2>
                <p className="text-muted-foreground">
                  Highlighted CodePen experiments and demos
                </p>
              </div>
              <div className="grid w-full gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-6 lg:gap-8">
                {featuredPens.map((project) => (
                  <ProjectCard
                    key={project.id}
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    tags={project.tags}
                    demoUrl={project.demoUrl}
                    repoUrl={project.repoUrl}
                    stackblitzUrl={project.stackblitzUrl}
                    codepenUrl={project.codepenUrl}
                    featured={project.featured}
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
              <h2 className="text-3xl font-bold tracking-tight">
                All CodePens
              </h2>
              <p className="text-muted-foreground">
                Browse my complete collection of CodePen experiments
              </p>
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
              {filteredPens.length > 0 ? (
                filteredPens.map((project) => (
                  <ProjectCard
                    key={project.id}
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    tags={project.tags}
                    demoUrl={project.demoUrl}
                    repoUrl={project.repoUrl}
                    stackblitzUrl={project.stackblitzUrl}
                    codepenUrl={project.codepenUrl}
                    featured={project.featured}
                  />
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <p className="text-muted-foreground">
                    {searchTerm
                      ? `No CodePens match your search for "${searchTerm}"${
                          selectedCategories.length > 0
                            ? " with the selected categories."
                            : "."
                        }`
                      : "No CodePens match the selected categories."}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAllFilters}
                    className="mt-4"
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
