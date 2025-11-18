'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Users, MapPin } from 'lucide-react'

export default function BookingCta() {
  return (
    <section className="py-12 sm:py-20 md:py-32 bg-gradient-to-b from-background to-primary/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-balance text-2xl sm:text-3xl lg:text-4xl font-bold">
              Ready for Your Mountain Escape?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Book your stay at Daraghar Maila and embark on an unforgettable journey through pristine Himalayan beauty.
            </p>
            
            <div className="space-y-3 pt-2">
              {[
                { icon: Calendar, text: 'Flexible booking' },
                { icon: Users, text: 'Expert local guides' },
                { icon: MapPin, text: 'Best locations' },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/15 rounded-lg flex items-center justify-center">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <span className="text-foreground font-medium text-sm sm:text-base">{item.text}</span>
                  </div>
                )
              })}
            </div>

            <Link href="/booking">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
                Start Your Booking
              </Button>
            </Link>
          </div>

          <Card className="border-primary/30 shadow-2xl">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Quick Booking</h3>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-2">Check-in Date</label>
                  <input type="date" className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-2">Check-out Date</label>
                  <input type="date" className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-2">Guests</label>
                  <select className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm">
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3-4 Guests</option>
                    <option>5+ Guests</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-2">Type</label>
                  <select className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm">
                    <option>Glamping Tent</option>
                    <option>Homestay</option>
                    <option>Mountain Pod</option>
                  </select>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 font-semibold text-sm sm:text-base">
                  Check Availability
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
