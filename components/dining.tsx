'use client'

import { UtensilsCrossed, Coffee } from 'lucide-react'

export default function Dining() {
    const dinnerMenu = [
        { name: 'Rice', desc: 'Steamed local rice' },
        { name: 'Paile Dal', desc: 'Traditional lentil soup' },
        { name: 'Seasonal Sabji', desc: 'Fresh green vegetables from garden' },
        { name: 'Potato Curry', desc: 'Spiced local potatoes' },
        { name: 'Fresh Curd', desc: 'Homemade organic curd' },
        { name: 'Green Salad', desc: 'Fresh organic mix' },
        { name: 'Chicken / Mutton', desc: 'Available on special order' },
    ]

    const breakfastMenu = [
        { name: 'Sel Roti', desc: 'Traditional sweet rice bread' },
        { name: 'Aloo Dum', desc: 'Spiced potato curry' },
        { name: 'Seasonal Sabji', desc: 'Fresh morning vegetables' },
        { name: 'Curd', desc: 'Homemade organic curd' },
        { name: 'Pickle', desc: 'Traditional Sikkimese pickle' },
        { name: 'Milk Tea', desc: 'Fresh local milk tea' },
        { name: 'Bread/Toast', desc: 'Freshly baked bread' },
    ]

    return (
        <section id="dining" className="py-8 sm:py-12 md:py-16 bg-background relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=2000&q=80"
                    alt="Fresh Green Vegetables Background"
                    className="w-full h-full object-cover opacity-25"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background/50" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center space-y-2 mb-6 sm:mb-8">
                    <span className="inline-block text-primary font-semibold text-xs sm:text-sm uppercase tracking-widest">
                        Dining
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                        Traditional Organic Meals
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
                        Savor authentic Sikkimese cuisine prepared with love and organic ingredients from our garden.
                    </p>
                </div>

                {/* Pricing Banner */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8 text-center">
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-1">
                        ₹1500 per person
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                        Includes both Dinner and Breakfast
                    </p>
                </div>

                {/* Menu Cards */}
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Dinner Card */}
                    <div className="group relative h-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                        <div className="relative bg-card border border-primary/20 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                            {/* Card Header */}
                            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <UtensilsCrossed className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold text-foreground">Village Dinner</h3>
                                    <p className="text-xs text-muted-foreground">Local Organic Village Feast</p>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="space-y-2 mb-4 flex-grow">
                                {dinnerMenu.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-2 group/item">
                                        <div className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0 group-hover/item:scale-150 transition-transform" />
                                        <div className="flex-1">
                                            <p className="font-semibold text-foreground text-xs sm:text-sm">{item.name}</p>
                                            <p className="text-[10px] sm:text-xs text-muted-foreground">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer Note */}
                            <div className="pt-3 border-t border-border/50 mt-auto">
                                <p className="text-[10px] sm:text-xs text-muted-foreground italic text-center">
                                    &quot;Our dinner is 100% organic and cooked in true Sikkimese village style.&quot;
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Breakfast Card */}
                    <div className="group relative h-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                        <div className="relative bg-card border border-primary/20 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                            {/* Card Header */}
                            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                                    <Coffee className="w-5 h-5 text-accent" />
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold text-foreground">Morning Delight</h3>
                                    <p className="text-xs text-muted-foreground">Wholesome Sikkimese Morning</p>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="space-y-2 mb-4 flex-grow">
                                {breakfastMenu.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-2 group/item">
                                        <div className="w-1 h-1 rounded-full bg-accent mt-1.5 flex-shrink-0 group-hover/item:scale-150 transition-transform" />
                                        <div className="flex-1">
                                            <p className="font-semibold text-foreground text-xs sm:text-sm">{item.name}</p>
                                            <p className="text-[10px] sm:text-xs text-muted-foreground">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer Note */}
                            <div className="pt-3 border-t border-border/50 mt-auto">
                                <p className="text-[10px] sm:text-xs text-muted-foreground italic text-center">
                                    &quot;Start your day with authentic flavors and wholesome nutrition.&quot;
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
