'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tent, Home, Wind } from 'lucide-react'

export default function Accommodations() {
  const accommodations = [
    {
      id: 1,
      title: 'Luxury Glamping Tents',
      description: 'Premium safari-style tents with all modern amenities',
      icon: Tent,
      features: ['En-suite bathrooms', 'Heated beds', 'Mountain views', '24/7 service'],
      price: '₹6,500/night',
      link: '/accommodations/glamping',
    },
    {
      id: 2,
      title: 'Authentic Homestays',
      description: 'Experience local culture with warm family hospitality',
      icon: Home,
      features: ['Organic meals', 'Local guides', 'Cultural immersion', 'Family rooms'],
      price: '₹3,500/night',
      link: '/accommodations/homestay',
    },
    {
      id: 3,
      title: 'Mountain Wellness Pods',
      description: 'Modern eco-friendly pods with panoramic views',
      icon: Wind,
      features: ['Sustainable design', 'Nature sounds', 'Meditation space', 'Sky windows'],
      price: '₹5,000/night',
      link: '/accommodations/pods',
    },
  ]

  return (
    <section id="accommodations" className="py-8 sm:py-12 md:py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 sm:space-y-3 mb-6 sm:mb-8 md:mb-12">
          <span className="inline-block text-primary font-semibold text-xs sm:text-sm uppercase tracking-widest">Accommodations</span>
          <h2 className="text-balance text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Choose Your Mountain Escape
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            From luxury glamping to authentic cultural experiences, find your perfect stay.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {accommodations.map((acc) => {
            const Icon = acc.icon
            return (
              <Card key={acc.id} className="group border-primary/20 hover:border-primary/50 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl">
                <div className="relative h-32 sm:h-40 md:h-48 bg-primary/5 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <Icon size={48} className="text-primary/40" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                </div>

                <CardHeader className="space-y-2 p-4 sm:p-6">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <CardTitle className="text-base sm:text-lg md:text-xl">{acc.title}</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">{acc.description}</CardDescription>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                      <Icon size={20} className="text-primary" />
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 p-4 sm:p-6 pt-0">
                  <div className="grid grid-cols-2 gap-2">
                    {acc.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                        <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-base sm:text-lg font-bold text-primary">{acc.price}</span>
                    <Link href={acc.link}>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-xs sm:text-sm">
                        Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center pt-6 sm:pt-8 md:pt-12">
          <Link href="/accommodations">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5">
              View All Accommodations
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
