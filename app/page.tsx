'use client'

import { useEffect } from 'react'
import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import OurStory from '@/components/our-story'
import Accommodations from '@/components/accommodations'
import Experiences from '@/components/experiences'
import Dining from '@/components/dining'
import Attractions from '@/components/attractions'
import TestimonialsDisplay from '@/components/testimonials-display'
import Gallery from '@/components/gallery'
import BookingCta from '@/components/booking-cta'
import Footer from '@/components/footer'

export default function Home() {
  // Handle hash navigation when coming from other pages
  useEffect(() => {
    const handleHashNavigation = () => {
      if (window.location.hash) {
        const hash = window.location.hash.substring(1)
        setTimeout(() => {
          const element = document.getElementById(hash)
          if (element) {
            const offset = 80 // Account for fixed navbar
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - offset
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
          }
        }, 300) // Small delay to ensure page is rendered
      }
    }

    handleHashNavigation()

    // Also handle hash changes
    window.addEventListener('hashchange', handleHashNavigation)
    return () => window.removeEventListener('hashchange', handleHashNavigation)
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <OurStory />
      <Accommodations />
      <BookingCta />
      <Dining />
      <Experiences />
      <TestimonialsDisplay />
      <Gallery />
      <Footer />
    </main>
  )
}
