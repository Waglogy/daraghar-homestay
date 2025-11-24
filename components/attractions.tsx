'use client'

import { MapPin } from 'lucide-react'

export default function Attractions() {
    const attractions = [
        "Banjhakri Falls",
        "Luing Garden",
        "Khel Maidan",
        "Ranka Monastery",
        "Mankhim Rai Mandir"
    ]

    return (
        <section className="py-16 bg-secondary/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Nearby Attractions</h2>
                    <p className="text-muted-foreground">Explore the beauty of Gangtok and its surroundings</p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                    {attractions.map((place, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-3 bg-background px-6 py-4 rounded-full shadow-sm border border-border hover:border-primary/50 transition-colors cursor-default"
                        >
                            <MapPin className="w-5 h-5 text-primary" />
                            <span className="font-medium">{place}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
