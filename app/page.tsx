'use client'

import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import TestimonialsDisplay from '@/components/testimonials-display'
import Accommodations from '@/components/accommodations'
import Experiences from '@/components/experiences'
import Gallery from '@/components/gallery'
import BookingCta from '@/components/booking-cta'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <TestimonialsDisplay />
      <Accommodations />
      <Experiences />
      <Gallery />
      <BookingCta />
      <Footer />
    </main>
  )
}
