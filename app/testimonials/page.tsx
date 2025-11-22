'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import TestimonialForm from '@/components/testimonial-form'
import { Star } from 'lucide-react'
import { reviewApi } from '@/lib/api'

interface Testimonial {
  id: string
  fullName?: string
  name?: string
  location: string
  rating: number
  review?: string
  text?: string
  createdAt?: string
  date?: string
}

export default function TestimonialsPage() {
  const [allTestimonials, setAllTestimonials] = useState<Testimonial[]>([])
  const [sortBy, setSortBy] = useState<'recent' | 'rating'>('recent')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true)
        const result = await reviewApi.getApproved({ page: 1, limit: 50 })
        if (result.success && result.data) {
          const reviews = Array.isArray(result.data) ? result.data : result.data.reviews || []
          setAllTestimonials(reviews.map((review: any) => ({
            id: review.id || review._id,
            name: review.fullName || review.name,
            location: review.location || '',
            rating: review.rating || 5,
            text: review.review || review.text || '',
            date: review.createdAt ? new Date(review.createdAt).toISOString().split('T')[0] : review.date || new Date().toISOString().split('T')[0],
          })))
        }
      } catch (err) {
        console.error('Error fetching reviews:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [])

  const sortedTestimonials = [...allTestimonials].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.date || '').getTime() - new Date(a.date || '').getTime()
    }
    return b.rating - a.rating
  })

  const averageRating = allTestimonials.length > 0
    ? (allTestimonials.reduce((sum, t) => sum + t.rating, 0) / allTestimonials.length).toFixed(1)
    : '0.0'

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-balance text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Guest Testimonials
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Real experiences from travelers who discovered the magic of Daraghar Maila.
          </p>

          <div className="flex gap-8 justify-center flex-wrap">
            <div className="space-y-1">
              <p className="text-3xl font-bold text-primary">{allTestimonials.length}+</p>
              <p className="text-muted-foreground">Guest Reviews</p>
            </div>
            <div className="space-y-1">
              <div className="flex gap-1 justify-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={24}
                    className={i < Math.round(parseFloat(averageRating)) ? 'fill-primary text-primary' : 'text-muted-foreground'}
                  />
                ))}
              </div>
              <p className="text-muted-foreground">{averageRating} Stars Average</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 justify-center mb-12">
            <button
              onClick={() => setSortBy('recent')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                sortBy === 'recent'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-card border border-border text-foreground hover:bg-muted'
              }`}
            >
              Most Recent
            </button>
            <button
              onClick={() => setSortBy('rating')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                sortBy === 'rating'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-card border border-border text-foreground hover:bg-muted'
              }`}
            >
              Highest Rated
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading reviews...</p>
            </div>
          ) : sortedTestimonials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No reviews available yet. Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
              {sortedTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-border/50 hover:border-primary/30">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={18} className={i < testimonial.rating ? 'fill-primary text-primary' : 'text-muted-foreground'} />
                    ))}
                  </div>

                  <p className="text-foreground text-base leading-relaxed mb-6">
                    {testimonial.text}
                  </p>

                  <div className="border-t border-border/50 pt-4 flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.date ? new Date(testimonial.date).toLocaleDateString() : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="border-t border-border/50 my-16" />

          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold">Share Your Story</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Have you experienced the magic of Daraghar Maila? We would love to hear your story!
              </p>
            </div>
            <TestimonialForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
