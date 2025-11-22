'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Users, MapPin, CheckCircle2, Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function BookingCta() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '3-4 Guests',
    type: 'Homestay',
  })
  const [isChecking, setIsChecking] = useState(false)
  const [showAvailability, setShowAvailability] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckAvailability = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate dates
    if (!formData.checkIn || !formData.checkOut) {
      return
    }

    const checkInDate = new Date(formData.checkIn)
    const checkOutDate = new Date(formData.checkOut)
    
    if (checkOutDate <= checkInDate) {
      alert('Check-out date must be after check-in date')
      return
    }

    setIsChecking(true)
    
    // Simulate API call to check availability
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsChecking(false)
    setShowAvailability(true)
  }

  const handleBookNow = () => {
    // Map accommodation type
    const accommodationMap: Record<string, string> = {
      'Glamping Tent': 'glamping',
      'Homestay': 'homestay',
      'Mountain Pod': 'pod',
    }

    // Map guests to number
    const guestsMap: Record<string, string> = {
      '1 Guest': '1',
      '2 Guests': '2',
      '3-4 Guests': '3',
      '5+ Guests': '5',
    }

    // Store data in localStorage to pre-fill booking form
    const bookingData = {
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      guests: guestsMap[formData.guests] || '2',
      accommodation: accommodationMap[formData.type] || 'glamping',
      fromQuickBooking: true, // Flag to indicate coming from Quick Booking
    }

    localStorage.setItem('quickBookingData', JSON.stringify(bookingData))
    
    // Redirect to booking page
    router.push('/booking')
  }

  return (
    <>
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
                <form onSubmit={handleCheckAvailability} className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-2">Check-in Date *</label>
                    <input 
                      type="date" 
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-2">Check-out Date *</label>
                    <input 
                      type="date" 
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleChange}
                      required
                      min={formData.checkIn || new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-2">Guests *</label>
                    <select 
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    >
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3-4 Guests</option>
                      <option>5+ Guests</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-2">Type *</label>
                    <select 
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    >
                      <option>Glamping Tent</option>
                      <option>Homestay</option>
                      <option>Mountain Pod</option>
                    </select>
                  </div>
                  <Button 
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 font-semibold text-sm sm:text-base"
                    disabled={isChecking}
                  >
                    {isChecking ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin inline" />
                        Checking...
                      </>
                    ) : (
                      'Check Availability'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Availability Dialog */}
      <Dialog open={showAvailability} onOpenChange={setShowAvailability}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Booking Available!
            </DialogTitle>
            <DialogDescription>
              Great news! We have availability for your selected dates.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-primary/5 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Check-in:</span>
                <span className="font-medium">{formData.checkIn ? new Date(formData.checkIn).toLocaleDateString('en-GB') : ''}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Check-out:</span>
                <span className="font-medium">{formData.checkOut ? new Date(formData.checkOut).toLocaleDateString('en-GB') : ''}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Guests:</span>
                <span className="font-medium">{formData.guests}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Accommodation:</span>
                <span className="font-medium">{formData.type}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Complete your booking by filling in your personal details.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowAvailability(false)}
                className="flex-1"
              >
                Close
              </Button>
              <Button
                onClick={handleBookNow}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Book Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
