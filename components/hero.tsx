'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <div className="relative pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-24 md:pb-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80"
          alt="DARAMAILA FARMSTAY Background"
          className="w-full h-full object-cover opacity-50"
        />
        {/* Gradient Overlay - merged into this container to ensure correct stacking */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 sm:space-y-8">
          {/* Badge */}
          <div className="inline-block animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs sm:text-sm font-medium backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Lower Luing, Gangtok
            </span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4 sm:space-y-6 animate-fade-in-up delay-100">
            <h1 className="text-balance text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground drop-shadow-sm">
              DARAMAILA FARMSTAY
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 font-light text-muted-foreground">
                Homestay & Glamping
              </span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-light text-primary/90 italic font-serif">
              &quot;Where the hills whisper stories of our ancestors.&quot;
            </p>
            <p className="text-balance text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
              A peaceful retreat nestled in the sunny slopes of Lower Luing, where time slows down and nature breathes life into every moment.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-6 sm:pt-8 animate-fade-in-up delay-200">
            <Link href="/booking">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl gap-2 w-full sm:w-auto text-lg h-12 px-8">
                Book Your Stay <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="#our-story">
              <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/5 text-primary w-full sm:w-auto text-lg h-12 px-8 backdrop-blur-sm">
                Our Story
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-8 pt-8 sm:pt-12 md:pt-16 border-t border-border/50 max-w-4xl mx-auto animate-fade-in-up delay-300">
            <div className="space-y-1">
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary">Plastic-Free</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Environment</p>
            </div>
            <div className="space-y-1">
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary">Organic</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Sikkimese Cuisine</p>
            </div>
            <div className="space-y-1">
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary">Village Life</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Authentic Experience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
