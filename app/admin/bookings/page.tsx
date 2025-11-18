'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Calendar, Search, Eye, Check, X } from 'lucide-react'

// Mock data - in production this would come from an API
const bookings = [
  {
    id: 'BK001',
    guestName: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 9876543210',
    checkIn: '2024-12-15',
    checkOut: '2024-12-18',
    guests: 2,
    accommodation: 'Luxury Glamping Tent',
    accommodationPrice: 6500,
    nights: 3,
    totalAmount: 19500,
    status: 'confirmed',
    specialRequests: 'Need early check-in if possible',
    createdAt: '2024-12-01',
  },
  {
    id: 'BK002',
    guestName: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    phone: '+91 9876543211',
    checkIn: '2024-12-16',
    checkOut: '2024-12-19',
    guests: 4,
    accommodation: 'Authentic Homestay',
    accommodationPrice: 3500,
    nights: 3,
    totalAmount: 10500,
    status: 'pending',
    specialRequests: 'Vegetarian meals required',
    createdAt: '2024-12-02',
  },
  {
    id: 'BK003',
    guestName: 'Anjali Patel',
    email: 'anjali@example.com',
    phone: '+91 9876543212',
    checkIn: '2024-12-20',
    checkOut: '2024-12-23',
    guests: 2,
    accommodation: 'Mountain Wellness Pod',
    accommodationPrice: 5000,
    nights: 3,
    totalAmount: 15000,
    status: 'confirmed',
    specialRequests: '',
    createdAt: '2024-12-03',
  },
  {
    id: 'BK004',
    guestName: 'Vikram Singh',
    email: 'vikram@example.com',
    phone: '+91 9876543213',
    checkIn: '2024-12-25',
    checkOut: '2024-12-28',
    guests: 3,
    accommodation: 'Luxury Glamping Tent',
    accommodationPrice: 6500,
    nights: 3,
    totalAmount: 19500,
    status: 'pending',
    specialRequests: 'Celebrating anniversary',
    createdAt: '2024-12-04',
  },
  {
    id: 'BK005',
    guestName: 'Maya Desai',
    email: 'maya@example.com',
    phone: '+91 9876543214',
    checkIn: '2024-12-10',
    checkOut: '2024-12-12',
    guests: 5,
    accommodation: 'Authentic Homestay',
    accommodationPrice: 3500,
    nights: 2,
    totalAmount: 7000,
    status: 'confirmed',
    specialRequests: 'Family with kids',
    createdAt: '2024-11-28',
  },
]

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'confirmed' | 'pending'>('all')
  const [selectedBooking, setSelectedBooking] = useState<typeof bookings[0] | null>(null)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    if (status === 'confirmed') {
      return <Badge className="bg-green-500/20 text-green-700 dark:text-green-400">Confirmed</Badge>
    }
    return <Badge className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-400">Pending</Badge>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Bookings Management</h1>
        <p className="text-muted-foreground mt-1">View and manage all guest bookings</p>
      </div>

      {/* Filters */}
      <Card className="border-primary/30">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or booking ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('all')}
                className="min-w-[100px]"
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'pending' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('pending')}
                className="min-w-[100px]"
              >
                Pending
              </Button>
              <Button
                variant={filterStatus === 'confirmed' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('confirmed')}
                className="min-w-[100px]"
              >
                Confirmed
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card className="border-primary/30 shadow-lg">
        <CardHeader>
          <CardTitle>All Bookings ({filteredBookings.length})</CardTitle>
          <CardDescription>Complete list of bookings and their details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Guest Name</TableHead>
                  <TableHead>Check-in / Check-out</TableHead>
                  <TableHead>Accommodation</TableHead>
                  <TableHead>Guests</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No bookings found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBookings.map((booking) => (
                    <TableRow key={booking.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{booking.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{booking.guestName}</div>
                          <div className="text-xs text-muted-foreground">{booking.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <div>
                            <div>{booking.checkIn}</div>
                            <div className="text-xs text-muted-foreground">{booking.checkOut}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{booking.accommodation}</div>
                        <div className="text-xs text-muted-foreground">{booking.nights} nights</div>
                      </TableCell>
                      <TableCell>{booking.guests}</TableCell>
                      <TableCell className="font-semibold">{formatCurrency(booking.totalAmount)}</TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedBooking(booking)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Booking Details - {booking.id}</DialogTitle>
                              <DialogDescription>Complete information about this booking</DialogDescription>
                            </DialogHeader>
                            {selectedBooking && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Guest Name</label>
                                    <p className="font-medium">{selectedBooking.guestName}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                                    <p className="font-medium">{selectedBooking.email}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                                    <p className="font-medium">{selectedBooking.phone}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                                    <div className="mt-1">{getStatusBadge(selectedBooking.status)}</div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Check-in</label>
                                    <p className="font-medium">{selectedBooking.checkIn}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Check-out</label>
                                    <p className="font-medium">{selectedBooking.checkOut}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Number of Guests</label>
                                    <p className="font-medium">{selectedBooking.guests}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Nights</label>
                                    <p className="font-medium">{selectedBooking.nights}</p>
                                  </div>
                                  <div className="col-span-2">
                                    <label className="text-sm font-medium text-muted-foreground">Accommodation</label>
                                    <p className="font-medium">{selectedBooking.accommodation}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {formatCurrency(selectedBooking.accommodationPrice)} per night
                                    </p>
                                  </div>
                                  {selectedBooking.specialRequests && (
                                    <div className="col-span-2">
                                      <label className="text-sm font-medium text-muted-foreground">Special Requests</label>
                                      <p className="font-medium">{selectedBooking.specialRequests}</p>
                                    </div>
                                  )}
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Total Amount</label>
                                    <p className="text-2xl font-bold text-primary">
                                      {formatCurrency(selectedBooking.totalAmount)}
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Booking Date</label>
                                    <p className="font-medium">{selectedBooking.createdAt}</p>
                                  </div>
                                </div>
                                {selectedBooking.status === 'pending' && (
                                  <div className="flex gap-2 pt-4 border-t">
                                    <Button className="flex-1">
                                      <Check className="h-4 w-4 mr-2" />
                                      Confirm Booking
                                    </Button>
                                    <Button variant="destructive" className="flex-1">
                                      <X className="h-4 w-4 mr-2" />
                                      Cancel Booking
                                    </Button>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

