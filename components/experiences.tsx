'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Flame, Users, UtensilsCrossed, Mountain } from 'lucide-react'

export default function Experiences() {
  const experiences = [
    {
      icon: Flame,
      title: 'Bonfire Nights',
      description: 'Gather around traditional bonfires under the starlit sky, complete with local stories and music.',
    },
    {
      icon: Users,
      title: 'Village Tours',
      description: 'Immerse yourself in authentic Sikkimese village life with guided local experiences.',
    },
    {
      icon: UtensilsCrossed,
      title: 'Organic Cuisine',
      description: 'Farm-to-table dining featuring locally-sourced organic ingredients and traditional recipes.',
    },
    {
      icon: Mountain,
      title: 'Nature Trails',
      description: 'Expert-guided hiking through pristine forests, waterfalls, and hidden mountain valleys.',
    },
  ]

  return (
    <section id="experiences" className="py-8 sm:py-12 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-2 sm:space-y-3 mb-6 sm:mb-8 md:mb-12">
          <span className="inline-block text-primary font-semibold text-xs sm:text-sm uppercase tracking-widest">Experiences</span>
          <h2 className="text-balance text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Unforgettable Mountain Moments
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Create lasting memories with our curated experiences designed to connect you with nature and local culture.
          </p>
        </div>

        {/* Experience Grid */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {experiences.map((exp, idx) => {
            const Icon = exp.icon
            return (
              <Card
                key={idx}
                className="group border-primary/20 hover:border-primary/50 transition-all duration-300 overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 hover:shadow-xl"
              >
                <CardContent className="p-4 sm:p-6 md:p-8 flex gap-4 md:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-primary/15 rounded-lg flex items-center justify-center group-hover:bg-primary/25 transition-colors">
                      <Icon size={24} className="md:w-8 md:h-8 text-primary" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-1 md:space-y-2">
                    <h3 className="text-base sm:text-lg md:text-lg font-bold text-foreground">{exp.title}</h3>
                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">{exp.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
