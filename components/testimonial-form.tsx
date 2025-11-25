'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { reviewApi } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'
import GalleryPopup from '@/components/gallery-popup'

export default function TestimonialForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    rating: 5,
    message: '',
  })
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    location: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showGalleryPopup, setShowGalleryPopup] = useState(false)

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

      case 'location':
        if (value.trim() && value.trim().length < 2) {
          return 'Location must be at least 2 characters long'
        }
        if (value.trim().length > 50) {
          return 'Location must not exceed 50 characters'
        }
        return ''

      case 'message':
        if (value.trim().length < 20) {
          return 'Review must be at least 20 characters long'
        }
        if (value.trim().length > 1000) {
          return 'Review must not exceed 1000 characters'
        }
        return ''

      default:
        return ''
    }
  }

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleBlur = (name: string, value: string) => {
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const validateForm = (): boolean => {
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      location: validateField('location', formData.location),
      message: validateField('message', formData.message),
    }

    setErrors(newErrors)

    // Check if there are any errors
    return !Object.values(newErrors).some(error => error !== '')
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
      const result = await reviewApi.create({
        fullName: formData.name.trim(),
        email: formData.email.trim(),
        location: formData.location.trim() || 'Not specified',
        review: formData.message.trim(),
        rating: formData.rating,
      })

      if (result.success) {
        toast({
          title: 'Review Submitted Successfully!',
          description: 'Thank you for your review! It will be published after approval.',
        })
        setFormData({ name: '', email: '', location: '', rating: 5, message: '' })
        setErrors({ name: '', email: '', location: '', message: '' })
        // Show gallery popup after a short delay
        setTimeout(() => {
          setShowGalleryPopup(true)
        }, 1000)
      } else {
        toast({
          title: 'Failed to Submit Review',
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
    <div className="bg-card rounded-xl shadow-lg border border-border/50 p-8 max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-foreground mb-2">Share Your Experience</h3>
      <p className="text-muted-foreground mb-8">
        We'd love to hear about your stay at DARAMAILA FARMSTAY. Your feedback helps us improve and helps other travelers discover us!
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onBlur={(e) => handleBlur('name', e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary/50'
                } bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2`}
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {formData.name.length}/50 characters
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={(e) => handleBlur('email', e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary/50'
                } bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2`}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Location (City)
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            onBlur={(e) => handleBlur('location', e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border ${errors.location ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary/50'
              } bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2`}
            placeholder="Your city"
          />
          {errors.location && (
            <p className="text-red-500 text-xs mt-1">{errors.location}</p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            {formData.location.length}/50 characters
          </p>
        </div>

        {/* Star Rating */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-4">
            Rate Your Experience *
          </label>
          <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({ ...formData, rating: star })}
                className="transition-transform hover:scale-110"
              >
                <Star
                  size={32}
                  className={`cursor-pointer transition-all ${star <= formData.rating
                    ? 'fill-primary text-primary'
                    : 'text-muted-foreground hover:text-primary'
                    }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Your Review *
          </label>
          <textarea
            required
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            onBlur={(e) => handleBlur('message', e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary/50'
              } bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 resize-none`}
            placeholder="Share your experience, highlights, and recommendations..."
            rows={6}
          />
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">{errors.message}</p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            {formData.message.length}/1000 characters
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit Your Review'}
        </Button>
      </form>

      <GalleryPopup open={showGalleryPopup} onOpenChange={setShowGalleryPopup} />
    </div>
  )
}
