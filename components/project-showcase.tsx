import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProjectShowcaseProps {
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl: string
  repoUrl: string
}

export default function ProjectShowcase({ title, description, image, tags, demoUrl, repoUrl }: ProjectShowcaseProps) {
  return (
    <Card className="overflow-hidden group h-full flex flex-col transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="mb-6 text-base">{description}</CardDescription>
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button asChild>
          <Link href={demoUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Live Demo
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={repoUrl} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" />
            View Code
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

