import { Inter } from 'next/font/google'

import './globals.css'
import { Toaster } from 'react-hot-toast'
import { Metadata } from 'next'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: "Chirag's Projects",
    description: 'Projects made by Chirag Bhalotia',
    authors: [
        {
            name: 'Chirag Bhalotia',
            url: 'https://chirag.codes',
        },
        {
            name: 'Chirag Bhalotia',
            url: 'https://github.com/chirag3003',
        },
    ],
}

interface RootLayoutProps {
    children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body className={`${inter.className} text-text`}>
                <Navbar />
                <main>{children}</main>
                <Toaster />
            </body>
        </html>
    )
}
