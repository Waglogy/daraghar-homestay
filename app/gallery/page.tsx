'use client'

import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function GalleryPage() {
  const galleryItems = [
    { title: 'Mountain Sunrise', category: 'Nature', image: '/sunrise-over-mountain-peaks.jpg' },
    { title: 'Glamping Interior', category: 'Accommodation', image: '/luxurious-tent-interior.jpg' },
    { title: 'Village Market', category: 'Culture', image: '/local-market-village.jpg' },
    { title: 'Organic Harvest', category: 'Food', image: '/fresh-organic-vegetables-harvest.jpg' },
    { title: 'Night Sky', category: 'Nature', image: '/stars-and-milky-way-night-sky.jpg' },
    { title: 'Local Family', category: 'Culture', image: '/traditional-sikkimese-family.jpg' },
    { title: 'Mountain Trail', category: 'Adventure', image: '/placeholder.svg?height=500&width=600' },
    { title: 'Evening Bonfire', category: 'Experiences', image: '/placeholder.svg?height=500&width=600' },
    { title: 'Tea Plantation', category: 'Nature', image: '/placeholder.svg?height=500&width=600' },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold">Gallery</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore the beauty of Daraghar Maila through our photography collection
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {galleryItems.map((item, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all">
                <div className="h-80 overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-xl">{item.title}</h3>
                  <p className="text-background/80 text-sm">{item.category}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-12">
            <Link href="/">
              <Button size="lg" variant="outline" className="border-primary text-primary">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
