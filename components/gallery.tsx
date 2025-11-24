'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Gallery() {
  const images = [
    {
      title: 'Mountain Views',
      span: 'col-span-2 row-span-2',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Glamping Setup',
      image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Bonfire Gathering',
      image: 'https://images.unsplash.com/photo-1525811902-f2342640856e?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Village Life',
      span: 'col-span-2',
      image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Organic Meals',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Forest Trails',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Tea Gardens',
      span: 'row-span-2',
      image: 'https://images.unsplash.com/photo-1563789031959-4c02bcb41319?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Prayer Flags',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Rhododendron Blooms',
      image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Local Cuisine',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Meditation Space',
      span: 'col-span-2',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Monastery Views',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80'
    },
  ]

  return (
    <section className="py-8 sm:py-12 md:py-20 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=2000&q=80"
          alt="Sikkim Village Background"
          className="w-full h-full object-cover opacity-15"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 sm:space-y-3 mb-6 sm:mb-8 md:mb-12">
          <span className="inline-block text-primary font-semibold text-xs sm:text-sm uppercase">Gallery</span>
          <h2 className="text-balance text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Visual Journey
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Step into Daraghar Maila through stunning photography.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 mb-8 md:mb-12 auto-rows-[160px] sm:auto-rows-[200px] md:auto-rows-[240px]">
          {images.map((item, idx) => (
            <div key={idx} className={`relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ${item.span || ''}`}>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-semibold text-sm sm:text-base drop-shadow-lg">{item.title}</p>
                <div className="w-12 h-0.5 bg-primary mt-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
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
