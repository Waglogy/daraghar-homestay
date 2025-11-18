'use client'

import { useState } from 'react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import TestimonialForm from '@/components/testimonial-form'
import { Star } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  location: string
  rating: number
  text: string
  date: string
}

export default function TestimonialsPage() {
  const allTestimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      location: 'Delhi',
      rating: 5,
      text: 'An absolutely magical experience! The glamping setup was luxurious and the bonfire nights were unforgettable.',
      date: '2024-11-10',
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      location: 'Mumbai',
      rating: 5,
      text: 'Best homestay experience ever. The warmth of the local family and mountain views made our trip truly special.',
      date: '2024-11-08',
    },
    {
      id: '3',
      name: 'Anjali Patel',
      location: 'Bangalore',
      rating: 4,
      text: 'Wonderful place to escape the city chaos. The village tourism and nature trails were excellent.',
      date: '2024-11-05',
    },
    {
      id: '4',
      name: 'Vikram Singh',
      location: 'Pune',
      rating: 5,
      text: 'Daraghar Maila exceeded all expectations. The views, activities, and food were all perfect.',
      date: '2024-11-01',
    },
    {
      id: '5',
      name: 'Maya Desai',
      location: 'Ahmedabad',
      rating: 5,
      text: 'Perfect getaway with family! Kids loved the nature trails and cultural activities.',
      date: '2024-10-28',
    },
    {
      id: '6',
      name: 'Arjun Nair',
      location: 'Kochi',
      rating: 4,
      text: 'Great place for a weekend retreat. The glamping experience was unique and memorable.',
      date: '2024-10-25',
    },
    {
      id: '7',
      name: 'Sneha Gupta',
      location: 'Jaipur',
      rating: 5,
      text: 'Amazing bonfire nights and delicious organic meals. The homestay felt like staying with family.',
      date: '2024-10-20',
    },
    {
      id: '8',
      name: 'Aditya Verma',
      location: 'Lucknow',
      rating: 5,
      text: 'One of the best experiences of my life. The natural beauty and luxury are unbeatable.',
      date: '2024-10-15',
    },
  ]

  const [sortBy, setSortBy] = useState<'recent' | 'rating'>('recent')

  const sortedTestimonials = [...allTestimonials].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
    return b.rating - a.rating
  })

  const averageRating = (
    allTestimonials.reduce((sum, t) => sum + t.rating, 0) / allTestimonials.length
  ).toFixed(1)

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
                    {new Date(testimonial.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

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
