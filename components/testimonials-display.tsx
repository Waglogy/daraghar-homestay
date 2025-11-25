'use client'

import { Star, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { reviewApi } from '@/lib/api'

interface Testimonial {
  id: string
  name: string
  location: string
  rating: number
  text: string
  date: string
}

// Fallback sample data removed to rely on backend

export default function TestimonialsDisplay() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [reviews, setReviews] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await reviewApi.getApproved({ limit: 8 })
        if (response.success && Array.isArray(response.data)) {
          const mappedReviews = response.data.map((r: any) => ({
            id: r._id || r.id || Math.random().toString(),
            name: r.fullName || 'Guest',
            location: r.location || 'India',
            rating: r.rating || 5,
            text: r.review || '',
            date: r.createdAt || new Date().toISOString(),
          }))
          setReviews(mappedReviews)
        }
      } catch (error) {
        console.error('Failed to fetch reviews:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)

    if (isMobile && reviews.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length)
      }, 5000)
      return () => {
        clearInterval(interval)
        window.removeEventListener('resize', checkMobile)
      }
    }
    return () => window.removeEventListener('resize', checkMobile)
  }, [isMobile, reviews.length])

  const nextSlide = () => {
    if (reviews.length === 0) return
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevSlide = () => {
    if (reviews.length === 0) return
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <section className="py-8 sm:py-12 md:py-20 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-2 sm:space-y-3 mb-6 sm:mb-8 md:mb-12">
          <span className="inline-block text-primary font-semibold text-xs sm:text-sm uppercase tracking-widest">Guest Stories</span>
          <h2 className="text-balance text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            What Our Guests Say
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Real experiences from travelers who&apos;ve discovered the magic of DARAMAILA FARMSTAY.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Empty State */}
        {!loading && reviews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No reviews yet. Be the first to share your story!</p>
          </div>
        )}

        {/* Testimonials - Grid on Desktop, Carousel on Mobile */}
        {!loading && reviews.length > 0 && (
          <>
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              {reviews.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-card rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 md:p-6 border border-border/50 hover:border-primary/30"
                >
                  {/* Rating */}
                  <div className="flex gap-1 mb-3 md:mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={`md:w-4 md:h-4 ${i < testimonial.rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-foreground text-xs md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-4">
                    {testimonial.text}
                  </p>

                  {/* Guest Info */}
                  <div className="border-t border-border/50 pt-3 md:pt-4 space-y-0.5 md:space-y-1">
                    <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden relative mb-6">
              <div className="bg-card rounded-lg shadow-lg p-4 border border-border/50 min-h-[280px] flex flex-col justify-between">
                {/* Rating */}
                <div>
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < reviews[currentIndex].rating ? 'fill-primary text-primary' : 'text-muted-foreground'}
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-foreground text-sm leading-relaxed mb-3">
                    {reviews[currentIndex].text}
                  </p>
                </div>

                {/* Guest Info */}
                <div className="border-t border-border/50 pt-3 space-y-0.5">
                  <p className="font-semibold text-foreground text-sm">{reviews[currentIndex].name}</p>
                  <p className="text-xs text-muted-foreground">{reviews[currentIndex].location}</p>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-2 justify-center mt-4">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex gap-1 items-center px-4">
                  {reviews.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-primary w-6' : 'bg-primary/30 w-2'
                        }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </>
        )}

        {/* Link to testimonials page */}
        <div className="text-center">
          <a
            href="/testimonials"
            className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm md:text-base shadow-lg transition-colors"
          >
            Read All Reviews & Share Your Experience
          </a>
        </div>
      </div>
    </section>
  )
}
