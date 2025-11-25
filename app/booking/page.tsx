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
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '',
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

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (value.trim().length < 3) {
          return 'Name must be at least 3 characters long'
        }
        if (value.trim().length > 50) {
          return 'Name must not exceed 50 characters'
        }
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          return 'Name should only contain letters and spaces'
        }
        return ''

      case 'email':
        if (!value.trim()) {
          return 'Email is required'
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value.trim())) {
          return 'Please enter a valid email address'
        }
        return ''

      case 'phone':
        if (!value.trim()) {
          return 'Phone number is required'
        }
        // Remove spaces, dashes, and +91 prefix for validation
        const cleanPhone = value.replace(/[\s\-+]/g, '').replace(/^91/, '')
        if (!/^\d{10}$/.test(cleanPhone)) {
          return 'Please enter a valid 10-digit phone number'
        }
        return ''

      case 'checkIn':
        if (!value) {
          return 'Check-in date is required'
        }
        const checkInDate = new Date(value)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        if (checkInDate < today) {
          return 'Check-in date cannot be in the past'
        }
        return ''

      case 'checkOut':
        if (!value) {
          return 'Check-out date is required'
        }
        if (formData.checkIn && value) {
          const checkIn = new Date(formData.checkIn)
          const checkOut = new Date(value)
          if (checkOut <= checkIn) {
            return 'Check-out date must be after check-in date'
          }
        }
        return ''

      case 'guests':
        const guestCount = parseInt(value)
        if (isNaN(guestCount) || guestCount < 1) {
          return 'At least 1 guest is required'
        }
        if (guestCount > 20) {
          return 'Maximum 20 guests allowed. For larger groups, please contact us directly.'
        }
        return ''

      case 'specialRequests':
        if (value.trim().length > 500) {
          return 'Special requests must not exceed 500 characters'
        }
        return ''

      default:
        return ''
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }

    // Re-validate check-out date when check-in changes
    if (name === 'checkIn' && formData.checkOut) {
      const checkOutError = validateField('checkOut', formData.checkOut)
      setErrors(prev => ({ ...prev, checkOut: checkOutError }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const validateForm = (): boolean => {
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
      checkIn: validateField('checkIn', formData.checkIn),
      checkOut: validateField('checkOut', formData.checkOut),
      guests: validateField('guests', formData.guests),
      specialRequests: validateField('specialRequests', formData.specialRequests),
    }

    setErrors(newErrors)

    // Check if there are any errors
    return !Object.values(newErrors).some(error => error !== '')
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

    // Validate all fields before submission
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors in the form before submitting.',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)

    try {
      const result = await bookingApi.create({
        fullName: formData.name.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phone.trim(),
        checkInDate: formData.checkIn,
        checkOutDate: formData.checkOut,
        numberOfGuests: parseInt(formData.guests) || 2,
        accommodationType: getAccommodationType(formData.accommodation),
        specialRequests: formData.specialRequests.trim() || undefined,
      })

      if (result.success) {
        const bookingRef = (result.data as any)?.booking?.bookingReference || 'N/A'
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
        setErrors({
          name: '',
          email: '',
          phone: '',
          checkIn: '',
          checkOut: '',
          guests: '',
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
              Reserve your perfect mountain getaway at DARAMAILA FARMSTAY
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
                        onBlur={handleBlur}
                        required
                        className={`w-full px-4 py-2 rounded-lg border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary'
                          } bg-input text-foreground focus:outline-none focus:ring-2`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {formData.name.length}/50 characters
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary'
                          } bg-input text-foreground focus:outline-none focus:ring-2`}
                        placeholder="Enter your email address"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={`w-full px-4 py-2 rounded-lg border ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary'
                          } bg-input text-foreground focus:outline-none focus:ring-2`}
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                      )}
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
                        onBlur={handleBlur}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full px-4 py-2 rounded-lg border ${errors.checkIn ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary'
                          } bg-input text-foreground focus:outline-none focus:ring-2`}
                      />
                      {errors.checkIn && (
                        <p className="text-red-500 text-xs mt-1">{errors.checkIn}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Check-out Date *</label>
                      <input
                        type="date"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        min={formData.checkIn || new Date().toISOString().split('T')[0]}
                        className={`w-full px-4 py-2 rounded-lg border ${errors.checkOut ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary'
                          } bg-input text-foreground focus:outline-none focus:ring-2`}
                      />
                      {errors.checkOut && (
                        <p className="text-red-500 text-xs mt-1">{errors.checkOut}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Number of Guests *</label>
                      <input
                        type="number"
                        name="guests"
                        min="1"
                        max="20"
                        value={formData.guests}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={`w-full px-4 py-2 rounded-lg border ${errors.guests ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary'
                          } bg-input text-foreground focus:outline-none focus:ring-2`}
                      />
                      {errors.guests && (
                        <p className="text-red-500 text-xs mt-1">{errors.guests}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Accommodation Type *</label>
                      <select
                        name="accommodation"
                        value={formData.accommodation}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="glamping">Luxury Glamping Tent</option>
                        <option value="homestay">Authentic Homestay</option>
                        <option value="pod">Mountain Wellness Pod</option>
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
                      onBlur={handleBlur}
                      rows={4}
                      className={`w-full px-4 py-2 rounded-lg border ${errors.specialRequests ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary'
                        } bg-input text-foreground focus:outline-none focus:ring-2`}
                      placeholder="Any special dietary needs, accessibility requirements, or activities you'd like to arrange?"
                    />
                    {errors.specialRequests && (
                      <p className="text-red-500 text-xs mt-1">{errors.specialRequests}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.specialRequests.length}/500 characters
                    </p>
                  </div>
                </div>

                {/* Price Calculation */}
                {formData.checkIn && formData.checkOut && formData.guests && (
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-2">
                    <h4 className="font-semibold text-foreground">Estimated Total</h4>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Rate per person</span>
                      <span>₹1,500 / night</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Duration</span>
                      <span>
                        {Math.max(0, Math.ceil((new Date(formData.checkOut).getTime() - new Date(formData.checkIn).getTime()) / (1000 * 60 * 60 * 24)))} nights
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Guests</span>
                      <span>{formData.guests} persons</span>
                    </div>
                    <div className="border-t border-primary/20 pt-2 flex justify-between font-bold text-lg text-primary">
                      <span>Total Payble Amount</span>
                      <span>
                        ₹{(
                          Math.max(0, Math.ceil((new Date(formData.checkOut).getTime() - new Date(formData.checkIn).getTime()) / (1000 * 60 * 60 * 24))) *
                          parseInt(formData.guests || '0') *
                          1500
                        ).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      * Includes dinner and breakfast. Payment to be made at the property.
                    </p>
                  </div>
                )}

                {/* Submit */}
                <div className="border-t border-border pt-6 flex flex-col sm:flex-row gap-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base font-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Submitting...' : 'Confirm Booking'}
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
