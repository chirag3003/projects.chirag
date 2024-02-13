import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '../ui/carousel'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../ui/card'
import { Link } from 'react-feather'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'
import { ArrowTopRightIcon } from '@radix-ui/react-icons'
import WebsiteCard from '../Cards/WebsiteCard'

interface ProjectsSectionProps {
    title: string
    projects: IWebsiteCard[]
}

function ProjectsSection({ title, projects }: ProjectsSectionProps) {
    return (
        <section className="md:min-h-screen bg-background lg:p-24 lg:pt-32 px-5 py-10">
            <h1 className="font-bold text-4xl mb-12">{title}</h1>
            <div className="projects px-10">
                <Carousel>
                    <CarouselContent>
                        {projects.map((project, index) => {
                            return (
                                <CarouselItem
                                    key={index}
                                    className="md:basis-1/2 lg:basis-1/3"
                                >
                                    <WebsiteCard {...project} />
                                </CarouselItem>
                            )
                        })}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>
    )
}

export default ProjectsSection
