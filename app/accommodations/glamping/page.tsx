'use client'

import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { Check, Wifi, Utensils, Wind, Shield } from 'lucide-react'

export default function GlampingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold">Luxury Glamping Experience</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Premium safari-style tents combining adventure with five-star comfort
            </p>
            <p className="text-2xl font-bold text-primary">₹6,500 per night</p>
          </div>

          {/* Main Image */}
          <div className="relative h-96 sm:h-96 md:h-96 rounded-2xl overflow-hidden shadow-2xl mb-12">
            <img
              src="/placeholder.svg?height=600&width=1200"
              alt="Glamping Tent"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>

          {/* Description */}
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">About Our Glamping Tents</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Experience the perfect blend of adventure and comfort at Daraghar Maila. Our luxury glamping tents are designed to provide an unforgettable stay surrounded by pristine mountain beauty. Each tent is meticulously appointed with modern amenities while maintaining an authentic connection to nature.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Key Features</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    'En-suite bathrooms with hot water',
                    'King-size heated beds',
                    'Mountain-facing decks',
                    '24/7 concierge service',
                    'Premium toiletries',
                    'Climate control',
                    'LED lighting system',
                    'Sound system',
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
                        { icon: Wifi, text: 'High-speed WiFi' },
                        { icon: Utensils, text: 'Breakfast & dinner' },
                        { icon: Wind, text: 'Airport transfer' },
                        { icon: Shield, text: 'Travel insurance' },
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
                      Request Information
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Gallery</h2>
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
                    alt={`Glamping gallery ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4">In-Room Amenities</h3>
              <ul className="space-y-3">
                {[
                  'Premium bedding and pillows',
                  'Private bathroom with shower',
                  'Hot water 24/7',
                  'Hair dryer and toiletries',
                  'Work desk and charging station',
                  'Mini bar and tea/coffee station',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Property Facilities</h3>
              <ul className="space-y-3">
                {[
                  'Restaurant with organic cuisine',
                  'Bonfire lounge area',
                  'Yoga pavilion',
                  'Nature library',
                  'Adventure equipment rental',
                  'Guided hiking services',
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
            <h3 className="text-2xl font-bold mb-4">Ready to Book?</h3>
            <p className="text-muted-foreground mb-6">
              Start your luxury glamping adventure today. Limited availability during peak season.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Book Now
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
