import { Button, buttonVariants } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { ArrowTopRightIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

export default function Home() {
    return (
        <section className="min-h-screen bg-background p-24 pt-32">
            <h1 className="font-bold text-4xl mb-20">My Projects</h1>
            <div className="projects px-10">
                <Carousel>
                    <CarouselContent>
                        <CarouselItem className="basis-1/3">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Card Title</CardTitle>
                                    <CardDescription>
                                        Card Description
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="w-full bg-white/10 aspect-video rounded-xl overflow-hidden"></div>
                                    <p className="mt-5 mb-3">Tech Stack</p>
                                    <div className="tech-stacks flex flex-wrap">
                                        <div className="tech-stack p-2 px-4 rounded-lg bg-secondary text-secondary-foreground">
                                            JS
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex items-center justify-end">
                                    <Link
                                        href={''}
                                        className={cn(
                                            buttonVariants(),
                                            'font-semibold'
                                        )}
                                    >
                                        Visit Site{' '}
                                        <ArrowTopRightIcon
                                            className="ml-5"
                                            height={18}
                                            width={18}
                                        />
                                    </Link>
                                </CardFooter>
                            </Card>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Card Title</CardTitle>
                                    <CardDescription>
                                        Card Description
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="w-full bg-white/10 aspect-video rounded-xl overflow-hidden"></div>
                                    <p className="mt-5 mb-3">Tech Stack</p>
                                    <div className="tech-stacks flex flex-wrap">
                                        <div className="tech-stack p-2 px-4 rounded-lg bg-secondary text-secondary-foreground">
                                            JS
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex items-center justify-end">
                                    <Link
                                        href={''}
                                        className={cn(
                                            buttonVariants(),
                                            'font-semibold'
                                        )}
                                    >
                                        Visit Site{' '}
                                        <ArrowTopRightIcon
                                            className="ml-5"
                                            height={18}
                                            width={18}
                                        />
                                    </Link>
                                </CardFooter>
                            </Card>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Card Title</CardTitle>
                                    <CardDescription>
                                        Card Description
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="w-full bg-white/10 aspect-video rounded-xl overflow-hidden"></div>
                                    <p className="mt-5 mb-3">Tech Stack</p>
                                    <div className="tech-stacks flex flex-wrap">
                                        <div className="tech-stack p-2 px-4 rounded-lg bg-secondary text-secondary-foreground">
                                            JS
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex items-center justify-end">
                                    <Link
                                        href={''}
                                        className={cn(
                                            buttonVariants(),
                                            'font-semibold'
                                        )}
                                    >
                                        Visit Site{' '}
                                        <ArrowTopRightIcon
                                            className="ml-5"
                                            height={18}
                                            width={18}
                                        />
                                    </Link>
                                </CardFooter>
                            </Card>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Card Title</CardTitle>
                                    <CardDescription>
                                        Card Description
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="w-full bg-white/10 aspect-video rounded-xl overflow-hidden"></div>
                                    <p className="mt-5 mb-3">Tech Stack</p>
                                    <div className="tech-stacks flex flex-wrap">
                                        <div className="tech-stack p-2 px-4 rounded-lg bg-secondary text-secondary-foreground">
                                            JS
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex items-center justify-end">
                                    <Link
                                        href={''}
                                        className={cn(
                                            buttonVariants(),
                                            'font-semibold'
                                        )}
                                    >
                                        Visit Site{' '}
                                        <ArrowTopRightIcon
                                            className="ml-5"
                                            height={18}
                                            width={18}
                                        />
                                    </Link>
                                </CardFooter>
                            </Card>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Card Title</CardTitle>
                                    <CardDescription>
                                        Card Description
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="w-full bg-white/10 aspect-video rounded-xl overflow-hidden"></div>
                                    <p className="mt-5 mb-3">Tech Stack</p>
                                    <div className="tech-stacks flex flex-wrap">
                                        <div className="tech-stack p-2 px-4 rounded-lg bg-secondary text-secondary-foreground">
                                            JS
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex items-center justify-end">
                                    <Link
                                        href={''}
                                        className={cn(
                                            buttonVariants(),
                                            'font-semibold'
                                        )}
                                    >
                                        Visit Site{' '}
                                        <ArrowTopRightIcon
                                            className="ml-5"
                                            height={18}
                                            width={18}
                                        />
                                    </Link>
                                </CardFooter>
                            </Card>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Card Title</CardTitle>
                                    <CardDescription>
                                        Card Description
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="w-full bg-white/10 aspect-video rounded-xl overflow-hidden"></div>
                                    <p className="mt-5 mb-3">Tech Stack</p>
                                    <div className="tech-stacks flex flex-wrap">
                                        <div className="tech-stack p-2 px-4 rounded-lg bg-secondary text-secondary-foreground">
                                            JS
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex items-center justify-end">
                                    <Link
                                        href={''}
                                        className={cn(
                                            buttonVariants(),
                                            'font-semibold'
                                        )}
                                    >
                                        Visit Site{' '}
                                        <ArrowTopRightIcon
                                            className="ml-5"
                                            height={18}
                                            width={18}
                                        />
                                    </Link>
                                </CardFooter>
                            </Card>
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>
    )
}
