'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === '/'

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    setIsOpen(false)

    if (isHomePage) {
      // If on home page, scroll to section
      const element = document.getElementById(sectionId)
      if (element) {
        const offset = 80 // Account for fixed navbar
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    } else {
      // If on other page, navigate to home with hash
      router.push(`/#${sectionId}`)
    }
  }

  // Handle hash on page load
  useEffect(() => {
    if (isHomePage && window.location.hash) {
      const hash = window.location.hash.substring(1)
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          const offset = 80
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - offset
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 100)
    }
  }, [isHomePage])

  type NavItem =
    | { label: string; href: string; isSection: false }
    | { label: string; href: string; isSection: true; sectionId: string }

  const navItems: NavItem[] = [
    { label: 'Home', href: '/', isSection: false },
    { label: 'Accommodations', href: '#accommodations', isSection: true, sectionId: 'accommodations' },
    { label: 'Experiences', href: '#experiences', isSection: true, sectionId: 'experiences' },
    { label: 'Gallery', href: '/gallery', isSection: false },
    { label: 'Reviews', href: '/testimonials', isSection: false },
    { label: 'Contact', href: '/contact', isSection: false },
  ]

  return (
    <nav className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg">
              D
            </div>
            <span className="hidden sm:inline-block text-lg font-bold text-primary">DARAMAILA FARMSTAY</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-1">
            {navItems.map((item) => (
              item.isSection ? (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleSectionClick(e, item.sectionId)}
                >
                  <Button variant="ghost" className="text-foreground hover:text-primary hover:bg-primary/5">
                    {item.label}
                  </Button>
                </a>
              ) : (
                <Link key={item.label} href={item.href}>
                  <Button variant="ghost" className="text-foreground hover:text-primary hover:bg-primary/5">
                    {item.label}
                  </Button>
                </Link>
              )
            ))}
          </div>

          {/* Book Button */}
          <div className="hidden md:block">
            <Link href="/booking">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-primary/5 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-border">
            {navItems.map((item) => (
              item.isSection ? (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleSectionClick(e, item.sectionId)}
                >
                  <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary hover:bg-primary/5">
                    {item.label}
                  </Button>
                </a>
              ) : (
                <Link key={item.label} href={item.href} onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary hover:bg-primary/5">
                    {item.label}
                  </Button>
                </Link>
              )
            ))}
            <Link href="/booking" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-2">
                Book Now
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
