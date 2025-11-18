'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <div className="relative pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-24 md:pb-32 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/placeholder.svg?height=800&width=1920&query=lush green mountains near Gangtok Sikkim)',
          opacity: 0.4,
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/80 via-background/50 to-background" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 sm:space-y-8">
          {/* Badge */}
          <div className="inline-block">
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs sm:text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Himalayan Hospitality
            </span>
          </div>

          {/* Main Heading */}
          <div className="space-y-2 sm:space-y-4">
            <h1 className="text-balance text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight">
              <span className="text-foreground">Discover </span>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Mountain Magic
              </span>
              <span className="text-foreground"> in Sikkim</span>
            </h1>
            <p className="text-balance text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Experience luxury camping, authentic homestays, and pristine village experiences nestled in the heart of the Eastern Himalayas near Gangtok.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-3 sm:pt-4">
            <Link href="/booking">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl gap-2 w-full sm:w-auto">
                Explore Stays <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="#accommodations">
              <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/5 text-primary w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-8 pt-6 sm:pt-8 md:pt-12 border-t border-border/50">
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-lg sm:text-2xl md:text-3xl font-bold text-primary">50+</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Premium Rooms</p>
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-lg sm:text-2xl md:text-3xl font-bold text-primary">2500m</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Altitude</p>
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-lg sm:text-2xl md:text-3xl font-bold text-primary">4.9★</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Guest Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
