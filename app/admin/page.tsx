'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Users, CreditCard, Star, TrendingUp, Calendar, Phone, MessageSquare } from 'lucide-react'

// Mock data - in production this would come from an API
const stats = {
  totalBookings: 124,
  totalGuests: 312,
  totalRevenue: 845000,
  pendingBookings: 8,
  totalReviews: 89,
  averageRating: 4.7,
  totalContacts: 156,
  upcomingCheckIns: 12,
}

const recentBookings = [
  {
    id: '1',
    guestName: 'Priya Sharma',
    checkIn: '2024-12-15',
    checkOut: '2024-12-18',
    accommodation: 'Luxury Glamping Tent',
    status: 'confirmed',
    totalAmount: 19500,
  },
  {
    id: '2',
    guestName: 'Rajesh Kumar',
    checkIn: '2024-12-16',
    checkOut: '2024-12-19',
    accommodation: 'Authentic Homestay',
    status: 'pending',
    totalAmount: 10500,
  },
  {
    id: '3',
    guestName: 'Anjali Patel',
    checkIn: '2024-12-20',
    checkOut: '2024-12-23',
    accommodation: 'Mountain Wellness Pod',
    status: 'confirmed',
    totalAmount: 15000,
  },
]

export default function AdminDashboard() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-primary/20 hover:border-primary/50 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/50 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalGuests}</div>
            <p className="text-xs text-muted-foreground">
              {stats.upcomingCheckIns} upcoming check-ins
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/50 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              +18% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/50 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-primary fill-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageRating}</div>
            <p className="text-xs text-muted-foreground">
              Based on {stats.totalReviews} reviews
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card className="border-primary/30 shadow-lg">
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>Latest booking requests and confirmations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{booking.guestName}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        booking.status === 'confirmed'
                          ? 'bg-green-500/20 text-green-700 dark:text-green-400'
                          : 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{booking.accommodation}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {booking.checkIn} - {booking.checkOut}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">{formatCurrency(booking.totalAmount)}</p>
                  <p className="text-xs text-muted-foreground">Total amount</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-primary/20 hover:border-primary/50 transition-all">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Pending Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{stats.pendingBookings}</div>
            <p className="text-xs text-muted-foreground mt-2">Requires attention</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/50 transition-all">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{stats.totalReviews}</div>
            <p className="text-xs text-muted-foreground mt-2">Guest testimonials</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/50 transition-all">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Contact Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{stats.totalContacts}</div>
            <p className="text-xs text-muted-foreground mt-2">Unanswered inquiries</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

