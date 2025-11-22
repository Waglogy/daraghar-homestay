'use client'

import { useState, useEffect } from 'react'
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
import { Calendar, Search, Eye, Check, X, Loader2 } from 'lucide-react'
import { bookingApi } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'

interface Booking {
  id: string
  bookingReference?: string
  fullName?: string
  guestName?: string
  email: string
  phoneNumber?: string
  phone?: string
  checkInDate?: string
  checkIn?: string
  checkOutDate?: string
  checkOut?: string
  numberOfGuests?: number
  guests?: number
  accommodationType?: string
  accommodation?: string
  specialRequests?: string
  status: string
  createdAt?: string
  totalAmount?: number
  accommodationPrice?: number
  nights?: number
}

export default function BookingsPage() {
  const { toast } = useToast()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'confirmed' | 'pending' | 'cancelled'>('all')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    fetchBookings()
  }, [filterStatus])

  const fetchBookings = async () => {
    try {
      setIsLoading(true)
      const status = filterStatus === 'all' ? undefined : filterStatus
      const result = await bookingApi.getAll({ status, page: 1, limit: 100 })
      
      if (result.success && result.data) {
        const bookingsData = Array.isArray(result.data) ? result.data : result.data.bookings || []
        setBookings(bookingsData.map((booking: any) => ({
          id: booking.id || booking._id,
          bookingReference: booking.bookingReference,
          guestName: booking.fullName || booking.guestName,
          email: booking.email,
          phone: booking.phoneNumber || booking.phone,
          checkIn: booking.checkInDate || booking.checkIn,
          checkOut: booking.checkOutDate || booking.checkOut,
          guests: booking.numberOfGuests || booking.guests,
          accommodation: booking.accommodationType || booking.accommodation,
          specialRequests: booking.specialRequests,
          status: booking.status,
          createdAt: booking.createdAt,
        })))
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to fetch bookings. Please try again.',
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

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      (booking.guestName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (booking.id || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (booking.bookingReference || '').toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const getStatusBadge = (status: string) => {
    if (status === 'confirmed') {
      return <Badge className="bg-green-500/20 text-green-700 dark:text-green-400">Confirmed</Badge>
    } else if (status === 'cancelled') {
      return <Badge className="bg-red-500/20 text-red-700 dark:text-red-400">Cancelled</Badge>
    }
    return <Badge className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-400">Pending</Badge>
  }

  const handleConfirm = async (id: string) => {
    setActionLoading(id)
    try {
      const result = await bookingApi.confirm(id)
      if (result.success) {
        toast({
          title: 'Booking Confirmed',
          description: 'The booking has been confirmed successfully.',
        })
        fetchBookings()
        if (selectedBooking?.id === id) {
          setSelectedBooking({ ...selectedBooking, status: 'confirmed' })
        }
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to confirm booking.',
          variant: 'destructive',
        })
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      })
    } finally {
      setActionLoading(null)
    }
  }

  const handleCancel = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return
    
    setActionLoading(id)
    try {
      const result = await bookingApi.cancel(id)
      if (result.success) {
        toast({
          title: 'Booking Cancelled',
          description: 'The booking has been cancelled successfully.',
        })
        fetchBookings()
        if (selectedBooking?.id === id) {
          setSelectedBooking({ ...selectedBooking, status: 'cancelled' })
        }
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to cancel booking.',
          variant: 'destructive',
        })
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      })
    } finally {
      setActionLoading(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking? This action cannot be undone.')) return
    
    setActionLoading(id)
    try {
      const result = await bookingApi.delete(id)
      if (result.success) {
        toast({
          title: 'Booking Deleted',
          description: 'The booking has been deleted successfully.',
        })
        fetchBookings()
        if (selectedBooking?.id === id) {
          setSelectedBooking(null)
        }
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to delete booking.',
          variant: 'destructive',
        })
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      })
    } finally {
      setActionLoading(null)
    }
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
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : (
            <div className="rounded-md border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Guest Name</TableHead>
                    <TableHead>Check-in / Check-out</TableHead>
                    <TableHead>Accommodation</TableHead>
                    <TableHead>Guests</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No bookings found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBookings.map((booking) => (
                      <TableRow key={booking.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">
                          {booking.bookingReference || booking.id}
                        </TableCell>
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
                        </TableCell>
                        <TableCell>{booking.guests}</TableCell>
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
                                <DialogTitle>Booking Details - {booking.bookingReference || booking.id}</DialogTitle>
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
                                      <p className="font-medium">{selectedBooking.phone || 'N/A'}</p>
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
                                      <label className="text-sm font-medium text-muted-foreground">Booking Reference</label>
                                      <p className="font-medium">{selectedBooking.bookingReference || 'N/A'}</p>
                                    </div>
                                    <div className="col-span-2">
                                      <label className="text-sm font-medium text-muted-foreground">Accommodation</label>
                                      <p className="font-medium">{selectedBooking.accommodation}</p>
                                    </div>
                                    {selectedBooking.specialRequests && (
                                      <div className="col-span-2">
                                        <label className="text-sm font-medium text-muted-foreground">Special Requests</label>
                                        <p className="font-medium">{selectedBooking.specialRequests}</p>
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex gap-2 pt-4 border-t">
                                    {selectedBooking.status === 'pending' && (
                                      <>
                                        <Button 
                                          className="flex-1"
                                          onClick={() => handleConfirm(selectedBooking.id)}
                                          disabled={actionLoading === selectedBooking.id}
                                        >
                                          {actionLoading === selectedBooking.id ? (
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                          ) : (
                                            <Check className="h-4 w-4 mr-2" />
                                          )}
                                          Confirm Booking
                                        </Button>
                                        <Button 
                                          variant="destructive" 
                                          className="flex-1"
                                          onClick={() => handleCancel(selectedBooking.id)}
                                          disabled={actionLoading === selectedBooking.id}
                                        >
                                          {actionLoading === selectedBooking.id ? (
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                          ) : (
                                            <X className="h-4 w-4 mr-2" />
                                          )}
                                          Cancel Booking
                                        </Button>
                                      </>
                                    )}
                                    <Button 
                                      variant="outline" 
                                      className="flex-1"
                                      onClick={() => handleDelete(selectedBooking.id)}
                                      disabled={actionLoading === selectedBooking.id}
                                    >
                                      {actionLoading === selectedBooking.id ? (
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                      ) : null}
                                      Delete
                                    </Button>
                                  </div>
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
          )}
        </CardContent>
      </Card>
    </div>
  )
}
