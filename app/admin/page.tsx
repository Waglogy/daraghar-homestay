'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Users, CreditCard, Star, Calendar, Loader2 } from 'lucide-react'
import { bookingApi, guestApi, paymentApi, reviewApi, contactApi } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface DashboardStats {
  totalBookings: number
  totalGuests: number
  totalRevenue: number
  pendingBookings: number
  totalReviews: number
  averageRating: number
  totalContacts: number
  newContacts: number
  upcomingCheckIns: number
}

interface RecentBooking {
  id: string
  guestName: string
  checkIn: string
  checkOut: string
  accommodation: string
  status: string
  bookingReference?: string
}

export default function AdminDashboard() {
  const { toast } = useToast()
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    totalGuests: 0,
    totalRevenue: 0,
    pendingBookings: 0,
    totalReviews: 0,
    averageRating: 0,
    totalContacts: 0,
    newContacts: 0,
    upcomingCheckIns: 0,
  })
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)

      // Fetch all data in parallel
      const [bookingsResult, guestsResult, paymentsResult, reviewsResult, contactsResult] = await Promise.all([
        bookingApi.getAll({ page: 1, limit: 1000 }),
        guestApi.getAll({ page: 1, limit: 1000 }),
        paymentApi.getAll({ page: 1, limit: 1000 }),
        reviewApi.getAll({ page: 1, limit: 1000 }),
        contactApi.getAll({ page: 1, limit: 1000 }),
      ])

      // Process bookings
      let bookings: any[] = []
      if (bookingsResult.success && bookingsResult.data) {
        bookings = Array.isArray(bookingsResult.data) ? bookingsResult.data : bookingsResult.data.bookings || []
      }

      // Process guests
      let guests: any[] = []
      if (guestsResult.success && guestsResult.data) {
        guests = Array.isArray(guestsResult.data) ? guestsResult.data : guestsResult.data.guests || []
      }

      // Process payments
      let payments: any[] = []
      if (paymentsResult.success && paymentsResult.data) {
        payments = Array.isArray(paymentsResult.data) ? paymentsResult.data : paymentsResult.data.payments || []
      }

      // Process reviews
      let reviews: any[] = []
      if (reviewsResult.success && reviewsResult.data) {
        reviews = Array.isArray(reviewsResult.data) ? reviewsResult.data : reviewsResult.data.reviews || []
      }

      // Process contacts
      let contacts: any[] = []
      if (contactsResult.success && contactsResult.data) {
        contacts = Array.isArray(contactsResult.data) ? contactsResult.data : contactsResult.data.contacts || []
      }

      // Calculate statistics
      const totalBookings = bookings.length
      const pendingBookings = bookings.filter((b: any) => b.status === 'pending').length
      const totalGuests = guests.length
      const totalRevenue = payments
        .filter((p: any) => p.status === 'completed')
        .reduce((sum: number, p: any) => sum + (p.amount || 0), 0)
      const totalReviews = reviews.length
      const averageRating = reviews.length > 0
        ? reviews.reduce((sum: number, r: any) => sum + (r.rating || 0), 0) / reviews.length
        : 0
      const totalContacts = contacts.length
      const newContacts = contacts.filter((c: any) => c.status === 'new' || (!c.isRead && !c.status)).length

      // Calculate upcoming check-ins (bookings with check-in date in the future)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const upcomingCheckIns = bookings.filter((b: any) => {
        const checkInDate = b.checkInDate || b.checkIn
        if (!checkInDate) return false
        const checkIn = new Date(checkInDate)
        checkIn.setHours(0, 0, 0, 0)
        return checkIn >= today && (b.status === 'confirmed' || b.status === 'pending')
      }).length

      // Get recent bookings (last 5, sorted by creation date)
      const recent = bookings
        .sort((a: any, b: any) => {
          const dateA = new Date(a.createdAt || 0).getTime()
          const dateB = new Date(b.createdAt || 0).getTime()
          return dateB - dateA
        })
        .slice(0, 5)
        .map((booking: any) => ({
          id: booking.id || booking._id,
          guestName: booking.fullName || booking.guestName || 'N/A',
          checkIn: booking.checkInDate || booking.checkIn || 'N/A',
          checkOut: booking.checkOutDate || booking.checkOut || 'N/A',
          accommodation: booking.accommodationType || booking.accommodation || 'N/A',
          status: booking.status || 'pending',
          bookingReference: booking.bookingReference,
        }))

      setStats({
        totalBookings,
        totalGuests,
        totalRevenue,
        pendingBookings,
        totalReviews,
        averageRating: parseFloat(averageRating.toFixed(1)),
        totalContacts,
        newContacts,
        upcomingCheckIns,
      })

      setRecentBookings(recent)
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your homestay operations</p>
      </div>

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
              {stats.pendingBookings} pending approval
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
              From completed payments
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/50 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-primary fill-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageRating || '0.0'}</div>
            <p className="text-xs text-muted-foreground">
              Based on {stats.totalReviews} reviews
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card className="border-primary/30 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest booking requests and confirmations</CardDescription>
            </div>
            <Link href="/admin/bookings">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {recentBookings.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No bookings yet
            </div>
          ) : (
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
                            : booking.status === 'cancelled'
                            ? 'bg-red-500/20 text-red-700 dark:text-red-400'
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
                      {booking.bookingReference && (
                        <span className="text-primary">Ref: {booking.bookingReference}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
            <Link href="/admin/bookings?status=pending" className="mt-2 inline-block">
              <Button variant="link" size="sm" className="p-0 h-auto">
                View Pending →
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/50 transition-all">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{stats.totalReviews}</div>
            <p className="text-xs text-muted-foreground mt-2">Guest testimonials</p>
            <Link href="/admin/reviews" className="mt-2 inline-block">
              <Button variant="link" size="sm" className="p-0 h-auto">
                Manage Reviews →
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/50 transition-all">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Contact Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{stats.totalContacts}</div>
            <p className="text-xs text-muted-foreground mt-2">
              {stats.newContacts} new inquiries
            </p>
            <Link href="/admin/contacts" className="mt-2 inline-block">
              <Button variant="link" size="sm" className="p-0 h-auto">
                View Contacts →
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
