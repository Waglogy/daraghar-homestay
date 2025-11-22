'use client'

import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { bookingApi } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'
import GalleryPopup from '@/components/gallery-popup'

export default function BookingPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '2',
    accommodation: 'glamping',
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showGalleryPopup, setShowGalleryPopup] = useState(false)

  // Check for pre-filled data from Quick Booking form
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const quickBookingData = localStorage.getItem('quickBookingData')
      if (quickBookingData) {
        try {
          const data = JSON.parse(quickBookingData)
          if (data.fromQuickBooking) {
            // Pre-fill the form with Quick Booking data
            setFormData(prev => ({
              ...prev,
              checkIn: data.checkIn || prev.checkIn,
              checkOut: data.checkOut || prev.checkOut,
              guests: data.guests || prev.guests,
              accommodation: data.accommodation || prev.accommodation,
            }))
            
            // Show a toast message
            toast({
              title: 'Quick Booking Details Loaded',
              description: 'Your selected dates and preferences have been pre-filled. Please complete the remaining details.',
            })
            
            // Clear the data after using it
            localStorage.removeItem('quickBookingData')
          }
        } catch (err) {
          console.error('Error parsing quick booking data:', err)
          localStorage.removeItem('quickBookingData')
        }
      }
    }
  }, [toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const getAccommodationType = (value: string) => {
    const mapping: Record<string, string> = {
      glamping: 'Luxury Glamping Tent',
      homestay: 'Authentic Homestay',
      pod: 'Mountain Wellness Pod',
    }
    return mapping[value] || value
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await bookingApi.create({
        fullName: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
        checkInDate: formData.checkIn,
        checkOutDate: formData.checkOut,
        numberOfGuests: parseInt(formData.guests) || 2,
        accommodationType: getAccommodationType(formData.accommodation),
        specialRequests: formData.specialRequests || undefined,
      })

      if (result.success) {
        const bookingRef = result.data?.booking?.bookingReference || 'N/A'
        toast({
          title: 'Booking Request Submitted!',
          description: `Your booking request has been received. Booking Reference: ${bookingRef}. We will contact you shortly.`,
        })
        // Reset form
        setFormData({
          checkIn: '',
          checkOut: '',
          guests: '2',
          accommodation: 'glamping',
          name: '',
          email: '',
          phone: '',
          specialRequests: '',
        })
        // Show gallery popup after a short delay
        setTimeout(() => {
          setShowGalleryPopup(true)
        }, 1000)
      } else {
        toast({
          title: 'Failed to Submit Booking',
          description: result.error || 'Please try again later.',
          variant: 'destructive',
        })
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold">Book Your Stay</h1>
            <p className="text-muted-foreground text-lg">
              Reserve your perfect mountain getaway at Daraghar Maila
            </p>
          </div>

          <Card className="border-primary/30 shadow-2xl">
            <CardHeader>
              <CardTitle>Booking Form</CardTitle>
              <CardDescription>Fill in your details to reserve your accommodation</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-foreground">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="space-y-4 border-t border-border pt-6">
                  <h3 className="font-bold text-lg text-foreground">Booking Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Check-in Date *</label>
                      <input
                        type="date"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Check-out Date *</label>
                      <input
                        type="date"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Number of Guests *</label>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="5+">5+ Guests</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Accommodation Type *</label>
                      <select
                        name="accommodation"
                        value={formData.accommodation}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="glamping">Luxury Glamping Tent - ₹6,500/night</option>
                        <option value="homestay">Authentic Homestay - ₹3,500/night</option>
                        <option value="pod">Mountain Wellness Pod - ₹5,000/night</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                <div className="space-y-4 border-t border-border pt-6">
                  <h3 className="font-bold text-lg text-foreground">Additional Information</h3>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Special Requests</label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Any special dietary needs, accessibility requirements, or activities you'd like to arrange?"
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="border-t border-border pt-6 flex flex-col sm:flex-row gap-4">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base font-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Submitting...' : 'Submit Booking Request'}
                  </Button>
                  <Link href="/" className="flex-1">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full border-primary text-primary hover:bg-primary/5 py-6 text-base"
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                  </Link>
                </div>

                <p className="text-sm text-muted-foreground text-center pt-4">
                  We will confirm your booking within 24 hours via email and phone.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
      
      <GalleryPopup open={showGalleryPopup} onOpenChange={setShowGalleryPopup} />
    </main>
  )
}
