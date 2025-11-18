'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Gallery() {
  const images = [
    {
      title: 'Mountain Views',
      span: 'col-span-2 row-span-2',
    },
    {
      title: 'Glamping Setup',
    },
    {
      title: 'Bonfire Gathering',
    },
    {
      title: 'Local Culture',
      span: 'col-span-2',
    },
    {
      title: 'Organic Meals',
    },
    {
      title: 'Forest Trails',
    },
  ]

  return (
    <section className="py-8 sm:py-12 md:py-20 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 sm:space-y-3 mb-6 sm:mb-8 md:mb-12">
          <span className="inline-block text-primary font-semibold text-xs sm:text-sm uppercase">Gallery</span>
          <h2 className="text-balance text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Visual Journey
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Step into Daraghar Maila through stunning photography.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 md:mb-12">
          {images.map((item, idx) => (
            <div key={idx} className={`relative group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all ${item.span || ''} h-40 sm:h-48 md:h-64 bg-gradient-to-br from-primary/20 to-accent/20`}>
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-primary/40 font-semibold">{item.title}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                <p className="text-white font-semibold p-3 sm:p-4 text-sm sm:text-base">{item.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/gallery">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg gap-2">
              View Full Gallery <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
