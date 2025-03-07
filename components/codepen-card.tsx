import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Code } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CodePenCardProps {
  title: string
  description: string
  thumbnail: string
  tags: string[]
  penUrl: string
  featured?: boolean
}

export default function CodePenCard({
  title,
  description,
  thumbnail,
  tags,
  penUrl,
  featured = false,
}: CodePenCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden group h-full flex flex-col transition-all duration-300 hover:shadow-md",
        featured && "border-primary/20",
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <Link
            href={penUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/90 backdrop-blur-sm text-primary-foreground hover:bg-primary transition-colors duration-200 shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out"
            aria-label="View on CodePen"
          >
            <Code className="h-5 w-5" />
          </Link>
        </div>
        {featured && (
          <div className="absolute top-0 left-0 bg-primary text-primary-foreground py-1 px-3 text-xs font-medium">
            Featured
          </div>
        )}
        <div className="absolute bottom-0 right-0 bg-background/80 backdrop-blur-sm py-1 px-2 m-2 rounded text-xs font-medium flex items-center">
          <Code className="h-3 w-3 mr-1" />
          CodePen
        </div>
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
      <CardFooter className="pt-2 pb-4">
        <Link
          href={penUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center"
        >
          View on CodePen
          <ExternalLink className="ml-2 h-3.5 w-3.5" />
        </Link>
      </CardFooter>
    </Card>
  )
}

