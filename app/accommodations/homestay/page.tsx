'use client'

import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { Check, Users, Flame, BookOpen } from 'lucide-react'

export default function HomestayPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold">Authentic Homestay Experience</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience genuine Sikkimese hospitality and immerse yourself in local culture
            </p>
            <p className="text-2xl font-bold text-primary">₹3,500 per night</p>
          </div>

          {/* Main Image */}
          <div className="relative h-96 md:h-96 rounded-2xl overflow-hidden shadow-2xl mb-12">
            <img
              src="/placeholder.svg?height=600&width=1200"
              alt="Homestay"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>

          {/* Description */}
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">About Our Homestays</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Stay with local Sikkimese families and experience authentic mountain life. Our carefully selected homestays offer warm hospitality, home-cooked organic meals, and genuine cultural immersion. Wake up to mountain views, share stories with your host family, and create memories that last a lifetime.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">What to Expect</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    'Warm family atmosphere',
                    'Traditional Sikkimese meals',
                    'Organic home-grown produce',
                    'Local language learning',
                    'Village exploration tours',
                    'Cultural storytelling',
                    'Traditional cooking classes',
                    'Family bonding activities',
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Check size={20} className="text-primary flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div>
              <Card className="border-primary/30 shadow-xl sticky top-24">
                <CardContent className="p-8 space-y-6">
                  <div>
                    <h3 className="font-bold text-lg mb-4">What's Included</h3>
                    <div className="space-y-3">
                      {[
                        { icon: Users, text: 'Family welcome' },
                        { icon: Flame, text: '3 organic meals' },
                        { icon: BookOpen, text: 'Cultural tours' },
                        { icon: Users, text: 'English speaking guide' },
                      ].map((item, idx) => {
                        const Icon = item.icon
                        return (
                          <div key={idx} className="flex items-center gap-3">
                            <Icon size={18} className="text-primary flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{item.text}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <Link href="/booking" className="block w-full">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base font-semibold">
                      Book Your Stay
                    </Button>
                  </Link>

                  <Link href="/contact" className="block">
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
                      Ask Questions
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Photo Gallery</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                '/placeholder.svg?height=300&width=400',
                '/placeholder.svg?height=300&width=400',
                '/placeholder.svg?height=300&width=400',
                '/placeholder.svg?height=300&width=400',
              ].map((img, idx) => (
                <div key={idx} className="relative h-48 rounded-lg overflow-hidden group">
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`Homestay gallery ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Room Features</h3>
              <ul className="space-y-3">
                {[
                  'Comfortable private bedroom',
                  'Shared family bathroom',
                  'Traditional furnishings',
                  'Mountain views',
                  'Natural lighting',
                  'Quiet and peaceful setting',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Culinary Experience</h3>
              <ul className="space-y-3">
                {[
                  'Breakfast: Fresh local fruits & bread',
                  'Lunch: Traditional Sikkimese curry',
                  'Dinner: Home-cooked organic meals',
                  'Fresh milk and dairy from local farms',
                  'Herbal teas and local beverages',
                  'Special meals upon request',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Experience True Hospitality</h3>
            <p className="text-muted-foreground mb-6">
              Create unforgettable memories with local families. Book your homestay experience now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Reserve Homestay
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5">
                  Back Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
