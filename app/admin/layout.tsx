'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Home, BookOpen, Users, MessageSquare, Phone, CreditCard, Star, LayoutDashboard, LogOut } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const menuItems = [
  {
    title: 'Dashboard',
    url: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Bookings',
    url: '/admin/bookings',
    icon: BookOpen,
  },
  {
    title: 'Guests',
    url: '/admin/guests',
    icon: Users,
  },
  {
    title: 'Payments',
    url: '/admin/payments',
    icon: CreditCard,
  },
  {
    title: 'Reviews',
    url: '/admin/reviews',
    icon: Star,
  },
  {
    title: 'Contacts',
    url: '/admin/contacts',
    icon: Phone,
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [adminEmail, setAdminEmail] = useState<string | null>(null)

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      if (typeof window === 'undefined') return
      
      const authStatus = localStorage.getItem('admin_authenticated')
      const email = localStorage.getItem('admin_email')
      
      if (authStatus === 'true') {
        setIsAuthenticated(true)
        setAdminEmail(email)
      } else {
        setIsAuthenticated(false)
        setAdminEmail(null)
        // Redirect to login if not authenticated (except if already on login page)
        if (pathname !== '/admin/login') {
          router.push('/admin/login')
        }
      }
      setIsLoading(false)
    }

    checkAuth()

    // Listen for storage changes (e.g., when user logs in/out in another tab)
    const handleStorageChange = () => {
      checkAuth()
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [router, pathname])

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_authenticated')
      localStorage.removeItem('admin_email')
    }
    setIsAuthenticated(false)
    setAdminEmail(null)
    router.push('/admin/login')
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // If not authenticated and not on login page, don't render the layout
  // (the redirect will happen in useEffect)
  if (!isAuthenticated && pathname !== '/admin/login') {
    return null
  }

  // If on login page, render children without sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <SidebarProvider>
      <Sidebar variant="inset">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              <div className="flex items-center gap-2 px-2 py-2">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg">
                  D
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-primary text-sm">Daraghar Maila</span>
                  <span className="text-xs text-muted-foreground">Admin Panel</span>
                </div>
              </div>
            </SidebarGroupLabel>
            <SidebarGroupContent className="pt-4">
              <SidebarMenu>
                {menuItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.url
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.title}
                      >
                        <Link href={item.url}>
                          <Icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <div className="border-t border-sidebar-border p-4 space-y-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Back to Home">
                <Link href="/">
                  <Home />
                  <span>Back to Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-foreground">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {adminEmail && (
              <span>{adminEmail}</span>
            )}
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 overflow-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}