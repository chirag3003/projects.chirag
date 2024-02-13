import { cn } from '@/lib/utils'
import { ArrowTopRightIcon } from '@radix-ui/react-icons'
import React from 'react'
import { buttonVariants } from '../ui/button'
import { Link } from 'react-feather'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../ui/card'

interface WebsiteCardProps {
    title: string
    description: string
    techStack: string[]
    image: string
    link: string
}

function WebsiteCard({
    title,
    description,
    image,
    link,
    techStack,
}: WebsiteCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div
                    className="w-full bg-white/10 aspect-video rounded-xl overflow-hidden"
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                ></div>
                <p className="mt-5 mb-3">Tech Stack</p>
                <div className="tech-stacks flex flex-wrap">
                    {techStack.map((item, index) => (
                        <div
                            key={index}
                            className="tech-stack p-2 px-4 rounded-lg bg-secondary text-secondary-foreground"
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex items-center justify-end">
                <Link
                    href={link}
                    className={cn(buttonVariants(), 'font-semibold')}
                >
                    Visit Site
                    <ArrowTopRightIcon
                        className="ml-5"
                        height={18}
                        width={18}
                    />
                </Link>
            </CardFooter>
        </Card>
    )
}

export default WebsiteCard
