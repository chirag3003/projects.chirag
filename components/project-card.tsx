import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, Star, Play, Codepen } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl: string
  repoUrl: string
  stackblitzUrl?: string
  codepenUrl?: string
  featured?: boolean
}

export default function ProjectCard({
  title,
  description,
  image,
  tags,
  demoUrl,
  repoUrl,
  stackblitzUrl,
  codepenUrl,
  featured = false,
}: ProjectCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden group h-full flex flex-col transition-all duration-300 hover:shadow-md",
        featured && "border-primary/20",
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <div className="flex gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <Link
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background hover:text-primary transition-colors duration-200 shadow-md"
              aria-label="View code on GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/90 backdrop-blur-sm text-primary-foreground hover:bg-primary transition-colors duration-200 shadow-md"
              aria-label="View live demo"
            >
              <ExternalLink className="h-5 w-5" />
            </Link>
            {stackblitzUrl && (
              <Link
                href={stackblitzUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500/90 backdrop-blur-sm text-white hover:bg-blue-500 transition-colors duration-200 shadow-md"
                aria-label="Run in StackBlitz"
              >
                <Play className="h-5 w-5" />
              </Link>
            )}
            {codepenUrl && (
              <Link
                href={codepenUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-10 w-10 rounded-full bg-black/90 backdrop-blur-sm text-white hover:bg-black transition-colors duration-200 shadow-md"
                aria-label="View on CodePen"
              >
                <Codepen className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
        {featured && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1.5">
            <Star className="h-3.5 w-3.5 fill-current" />
          </div>
        )}
        {stackblitzUrl && (
          <div className="absolute bottom-0 right-0 bg-blue-500/90 text-white py-1 px-2 m-2 rounded text-xs font-medium flex items-center">
            <Play className="h-3 w-3 mr-1" />
            StackBlitz
          </div>
        )}
        {codepenUrl && (
          <div className="absolute bottom-0 right-0 bg-black/90 text-white py-1 px-2 m-2 rounded text-xs font-medium flex items-center">
            <Codepen className="h-3 w-3 mr-1" />
            CodePen
          </div>
        )}
      </div>
      <CardHeader className={cn("pb-2", featured && "pt-4")}>
        <CardTitle className={cn("text-lg", featured && "text-xl")}>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className={cn("mb-4 line-clamp-3 text-sm", featured && "text-base line-clamp-4")}>
          {description}
        </CardDescription>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant={featured ? "default" : "secondary"}
              className={cn(
                "text-xs font-normal",
                featured && "bg-primary/10 text-primary hover:bg-primary/20 border-0",
              )}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      {featured && (
        <CardFooter className="pt-2 pb-4 px-4 sm:px-6">
          <div className="flex items-center justify-between w-full gap-4">
            <Link
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <span className="mr-2 h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <ExternalLink className="h-3.5 w-3.5" />
              </span>
              Live Demo
            </Link>
            {stackblitzUrl ? (
              <Link
                href={stackblitzUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors"
              >
                <span className="mr-2 h-7 w-7 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                  <Play className="h-3.5 w-3.5" />
                </span>
                Run in StackBlitz
              </Link>
            ) : codepenUrl ? (
              <Link
                href={codepenUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center text-sm font-medium text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                <span className="mr-2 h-7 w-7 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                  <Codepen className="h-3.5 w-3.5" />
                </span>
                View on CodePen
              </Link>
            ) : (
              <>
                <div className="h-8 w-px bg-border"></div>
                <Link
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="mr-2 h-7 w-7 rounded-full bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                    <Github className="h-3.5 w-3.5" />
                  </span>
                  View Code
                </Link>
              </>
            )}
          </div>
        </CardFooter>
      )}
      {!featured && (stackblitzUrl || codepenUrl) && (
        <CardFooter className="pt-2 pb-4">
          {stackblitzUrl && (
            <Link
              href={stackblitzUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors flex items-center"
            >
              <Play className="mr-2 h-3.5 w-3.5" />
              Run in StackBlitz
            </Link>
          )}
          {codepenUrl && (
            <Link
              href={codepenUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors flex items-center"
            >
              <Codepen className="mr-2 h-3.5 w-3.5" />
              View on CodePen
            </Link>
          )}
        </CardFooter>
      )}
    </Card>
  )
}

