'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Accommodations', href: '#accommodations' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Reviews', href: '/testimonials' },
    { label: 'Contact', href: '/contact' },
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
            <span className="hidden sm:inline-block text-lg font-bold text-primary">Daraghar Maila</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-1">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href}>
                <Button variant="ghost" className="text-foreground hover:text-primary hover:bg-primary/5">
                  {item.label}
                </Button>
              </Link>
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
              <Link key={item.label} href={item.href} onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary hover:bg-primary/5">
                  {item.label}
                </Button>
              </Link>
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
