'use client'

import Image from 'next/image'
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
      price: '₹1,500 / person',
      link: '/accommodations/glamping',
      image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Authentic Homestays',
      description: 'Experience local culture with warm family hospitality',
      icon: Home,
      features: ['Organic meals', 'Local guides', 'Cultural immersion', 'Family rooms'],
      price: '₹1,500 / person',
      link: '/accommodations/homestay',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Mountain Wellness Pods',
      description: 'Modern eco-friendly pods with panoramic views',
      icon: Wind,
      features: ['Sustainable design', 'Nature sounds', 'Meditation space', 'Sky windows'],
      price: '₹1,500 / person',
      link: '/accommodations/pods',
      image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80'
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
              <Card key={acc.id} className="group border-primary/20 hover:border-primary/50 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl flex flex-col">
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <Image
                    src={acc.image}
                    alt={acc.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white flex items-center gap-2">
                    <div className="p-2 bg-primary/20 backdrop-blur-sm rounded-lg">
                      <Icon size={20} className="text-white" />
                    </div>
                  </div>
                </div>

                <CardHeader className="space-y-2 p-4 sm:p-6 pb-2">
                  <CardTitle className="text-base sm:text-lg md:text-xl">{acc.title}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm line-clamp-2">{acc.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 p-4 sm:p-6 pt-0 flex-1 flex flex-col justify-between">
                  <div className="grid grid-cols-2 gap-2">
                    {acc.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                        <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                    <div className="flex flex-col">
                      <span className="text-lg sm:text-xl font-bold text-primary">{acc.price}</span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Includes Meals</span>
                    </div>
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
