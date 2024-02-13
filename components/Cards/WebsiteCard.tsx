import { cn } from '@/lib/utils'
import {
    ArrowTopRightIcon,
    CodeIcon,
    GitHubLogoIcon,
} from '@radix-ui/react-icons'
import React from 'react'
import { buttonVariants } from '../ui/button'
import Link from 'next/link'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../ui/card'
import { GitHub } from 'react-feather'

function WebsiteCard({
    title,
    description,
    image,
    link,
    techStack,
    code,
    github,
}: IWebsiteCard) {
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
                <div className="tech-stacks flex flex-wrap gap-2">
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
            <CardFooter className="flex items-center justify-end gap-2">
                {github && (
                    <Link
                        href={github}
                        className={cn(
                            buttonVariants({
                                variant: 'outline',
                                size: 'icon',
                            }),
                            'font-semibold'
                        )}
                        target="_blank"
                        referrerPolicy="no-referrer"
                    >
                        <GitHub height={25} width={25} />
                    </Link>
                )}
                {code && (
                    <Link
                        href={code}
                        className={cn(buttonVariants(), 'font-semibold')}
                        target="_blank"
                        referrerPolicy="no-referrer"
                    >
                        View Code
                        <ArrowTopRightIcon
                            className="ml-5"
                            height={18}
                            width={18}
                        />
                    </Link>
                )}
                {link && (
                    <Link
                        href={link}
                        className={cn(buttonVariants(), 'font-semibold')}
                        target="_blank"
                        referrerPolicy="no-referrer"
                    >
                        Visit Site
                        <ArrowTopRightIcon
                            className="ml-5"
                            height={18}
                            width={18}
                        />
                    </Link>
                )}
            </CardFooter>
        </Card>
    )
}

export default WebsiteCard
