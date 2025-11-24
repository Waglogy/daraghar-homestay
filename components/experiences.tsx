'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Flame, Users, UtensilsCrossed, Mountain, Car, MapPin, Ticket } from 'lucide-react'

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
          {[
            {
              icon: Mountain,
              title: 'Hammock, Swings & Garden',
              description: 'Lie back, listen to the wind in the trees, feel the cool breeze, and reconnect with nature.',
            },
            {
              icon: Flame, // Using Flame as a placeholder for spiritual/meditation if no better icon, or maybe something else
              title: 'Meditation & Spiritual Quiet',
              description: 'A serene spot beside Bar-Pipal trees and a small Krishna Mandir — ideal for morning meditation and reflection.',
            },
            {
              icon: Users, // Using Users for farming/animals? Or maybe something else.
              title: 'Cow & Goat Farming Tour',
              description: 'Watch cows being milked and goats grazing in our own farmland — perfect for families and curious travelers.',
            },
            {
              icon: UtensilsCrossed, // Placeholder for play area? Maybe Users is better here.
              title: 'Children’s Play Area',
              description: 'Swings, open spaces, carrom board, badminton, chess — safe and fun for all ages.',
            },
          ].map((exp, idx) => {
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

        {/* Explore Gangtok Section */}
        <div className="mt-20 sm:mt-32 space-y-12">
          <div className="text-center space-y-4">
            <span className="inline-block text-primary font-semibold text-xs sm:text-sm uppercase tracking-widest">Sightseeing</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Explore Gangtok & Beyond
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Daraghar Maila is perfectly situated to be your base for exploring the wonders of East Sikkim.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Banjhakri Falls",
                desc: "A shamanistic theme park with a beautiful waterfall, just a short drive away.",
                tag: "Nature"
              },
              {
                title: "Ranka Monastery",
                desc: "Experience spiritual serenity at this stunning monastery surrounded by forest.",
                tag: "Culture"
              },
              {
                title: "MG Marg & City",
                desc: "Walk the famous promenade, ride the ropeway, and shop for local souvenirs.",
                tag: "City Life"
              },
              {
                title: "Tsomgo Lake & Nathula",
                desc: "Take a day trip to the legendary high-altitude lake and the Indo-China border.",
                tag: "Adventure"
              }
            ].map((place, idx) => (
              <div key={idx} className="bg-card border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 group">
                <div className="mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {place.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{place.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {place.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Arrangements Banner */}
        <div className="mt-16 sm:mt-24">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">Hassle-Free Travel Arrangements</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              Don't worry about the roads. We provide comfortable vehicle arrangements for pick-up, drop-off, and sightseeing tours throughout Sikkim.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-foreground/80">
              <span className="flex items-center gap-2 bg-background px-4 py-2 rounded-full border border-border shadow-sm">
                <Car size={16} className="text-primary" /> Luxury Taxis
              </span>
              <span className="flex items-center gap-2 bg-background px-4 py-2 rounded-full border border-border shadow-sm">
                <MapPin size={16} className="text-primary" /> Local Guides
              </span>
              <span className="flex items-center gap-2 bg-background px-4 py-2 rounded-full border border-border shadow-sm">
                <Ticket size={16} className="text-primary" /> Permit Assistance
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
