'use client'

import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Testimonial {
  id: string
  name: string
  location: string
  rating: number
  text: string
  date: string
}

// Sample testimonials data - in production this would come from a database
const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    location: 'Delhi',
    rating: 5,
    text: 'An absolutely magical experience! The glamping setup was luxurious yet connected to nature. The bonfire nights were unforgettable, and the organic food was delicious.',
    date: '2024-11-10',
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    location: 'Mumbai',
    rating: 5,
    text: 'Best homestay experience ever. The warmth of the local family, cultural insights, and the serene mountain views made our trip truly special. Highly recommended!',
    date: '2024-11-08',
  },
  {
    id: '3',
    name: 'Anjali Patel',
    location: 'Bangalore',
    rating: 4,
    text: 'Wonderful place to escape the city chaos. The village tourism and nature trails were excellent. Great facilities and friendly staff. Would definitely come back!',
    date: '2024-11-05',
  },
  {
    id: '4',
    name: 'Vikram Singh',
    location: 'Pune',
    rating: 5,
    text: 'Daraghar Maila exceeded all expectations. The views, the activities, the food—everything was perfect. A true gem in Sikkim!',
    date: '2024-11-01',
  },
]

export default function TestimonialsDisplay() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)

    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 5000)
      return () => {
        clearInterval(interval)
        window.removeEventListener('resize', checkMobile)
      }
    }
    return () => window.removeEventListener('resize', checkMobile)
  }, [isMobile])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
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
            Real experiences from travelers who've discovered the magic of Daraghar Maila.
          </p>
        </div>

        {/* Testimonials - Grid on Desktop, Carousel on Mobile */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {testimonials.map((testimonial) => (
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
                    className={i < testimonials[currentIndex].rating ? 'fill-primary text-primary' : 'text-muted-foreground'}
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-foreground text-sm leading-relaxed mb-3">
                {testimonials[currentIndex].text}
              </p>
            </div>

            {/* Guest Info */}
            <div className="border-t border-border/50 pt-3 space-y-0.5">
              <p className="font-semibold text-foreground text-sm">{testimonials[currentIndex].name}</p>
              <p className="text-xs text-muted-foreground">{testimonials[currentIndex].location}</p>
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
              {testimonials.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'bg-primary w-6' : 'bg-primary/30 w-2'
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
