'use client'

import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Tent, Home, Wind, Star } from 'lucide-react'

export default function AccommodationsPage() {
  const accommodations = [
    {
      id: 1,
      title: 'Luxury Glamping Tents',
      description: 'Premium safari-style tents with all modern amenities',
      icon: Tent,
      price: '₹6,500',
      rating: '4.9',
      reviews: '487',
      image: '/placeholder.svg?height=400&width=500',
      link: '/accommodations/glamping',
      highlights: ['En-suite bathrooms', 'Heated beds', 'Mountain views', '24/7 service'],
    },
    {
      id: 2,
      title: 'Authentic Homestays',
      description: 'Experience local culture with warm family hospitality',
      icon: Home,
      price: '₹3,500',
      rating: '4.8',
      reviews: '342',
      image: '/placeholder.svg?height=400&width=500',
      link: '/accommodations/homestay',
      highlights: ['Organic meals', 'Local guides', 'Cultural immersion', 'Family rooms'],
    },
    {
      id: 3,
      title: 'Mountain Wellness Pods',
      description: 'Modern eco-friendly pods with panoramic views',
      icon: Wind,
      price: '₹5,000',
      rating: '4.7',
      reviews: '256',
      image: '/placeholder.svg?height=400&width=500',
      link: '/accommodations/pods',
      highlights: ['Sustainable', 'Meditation space', 'Sky windows', 'Nature sounds'],
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold">All Accommodations</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose from our carefully curated selection of premium stays
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {accommodations.map((acc) => {
              const Icon = acc.icon
              return (
                <Card key={acc.id} className="group border-primary/20 hover:border-primary/50 transition-all overflow-hidden shadow-lg hover:shadow-2xl">
                  <div className="relative h-48 bg-primary/5 overflow-hidden">
                    <img
                      src={acc.image || "/placeholder.svg"}
                      alt={acc.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl">{acc.title}</CardTitle>
                        <CardDescription>{acc.description}</CardDescription>
                      </div>
                      <div className="p-2 bg-primary/10 rounded-lg ml-2">
                        <Icon size={24} className="text-primary" />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 pt-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className="fill-primary text-primary" />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">({acc.reviews} reviews)</span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      {acc.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {highlight}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div>
                        <span className="text-2xl font-bold text-primary">{acc.price}</span>
                        <span className="text-xs text-muted-foreground">/night</span>
                      </div>
                      <Link href={acc.link}>
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                          Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-16 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Not sure which to choose?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Contact our team and we'll help you find the perfect accommodation based on your preferences and travel style.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Contact Us for Recommendations
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
