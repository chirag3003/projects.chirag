"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FolderKanban, Tag, ListFilter, Settings, LogOut, Menu, X } from "lucide-react"
import { useAuth } from "@/lib/hooks/use-auth"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user && pathname !== "/dashboard/login") {
      router.push("/dashboard/login")
    }
  }, [user, pathname, router])

  // Close sidebar when navigating on mobile
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false)
    }
  }, [pathname, isMobile])

  const handleLogout = () => {
    logout()
    router.push("/dashboard/login")
  }

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Projects", href: "/dashboard/projects", icon: FolderKanban },
    { name: "Categories", href: "/dashboard/categories", icon: ListFilter },
    { name: "Tags", href: "/dashboard/tags", icon: Tag },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  // If on login page, just show the login form
  if (pathname === "/dashboard/login") {
    return <div className="min-h-screen">{children}</div>
  }

  return (
    <div className="flex h-screen max-h-screen overflow-hidden">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-40 h-16 border-b border-border bg-background/80 backdrop-blur-md flex items-center px-4 md:px-6">
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            className="mr-2"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl font-bold md:hidden">Dashboard</h1>

          <div className="flex items-center ml-auto gap-4">
            <div className="text-sm text-muted-foreground hidden md:block">
              Logged in as <span className="font-medium text-foreground">{user?.name || "User"}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="h-8">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-background border-r border-border transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ top: "64px", height: "calc(100% - 64px)" }}
      >
        <div className="flex h-full flex-col overflow-y-auto">
          <div className="flex h-16 items-center justify-center border-b border-border px-4 md:h-16 md:border-b-0 hidden md:flex">
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>

          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Overlay to close sidebar on mobile */}
      {isSidebarOpen && isMobile && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden w-full mt-16">
        <main className="flex-1 overflow-y-auto p-4 md:p-6 w-full max-w-full">
          <div className="mx-auto w-full max-w-full overflow-x-hidden">{children}</div>
        </main>
      </div>
    </div>
  )
}

