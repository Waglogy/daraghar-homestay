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
import { Search, UserPlus, Eye, Calendar, MapPin, Phone, Mail, Loader2 } from 'lucide-react'
import { guestApi } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'

interface Guest {
  id: string
  fullName?: string
  name?: string
  email: string
  phone: string
  address?: string
  visitDate: string
  accommodationType?: string
  accommodation?: string
  status?: string
  notes?: string
  createdAt?: string
}

export default function GuestsPage() {
  const { toast } = useToast()
  const [guests, setGuests] = useState<Guest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [newGuest, setNewGuest] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    visitDate: '',
    accommodation: 'Luxury Glamping Tent',
    notes: '',
  })
  const [submitLoading, setSubmitLoading] = useState(false)

  useEffect(() => {
    fetchGuests()
  }, [])

  const fetchGuests = async () => {
    try {
      setIsLoading(true)
      const result = await guestApi.getAll({ page: 1, limit: 100 })

      if (result.success && result.data) {
        const guestsData = Array.isArray(result.data) ? result.data : result.data.guests || []
        setGuests(guestsData.map((guest: any) => ({
          id: guest.id || guest._id,
          name: guest.fullName || guest.name,
          email: guest.email,
          phone: guest.phone,
          address: guest.address || '',
          visitDate: guest.visitDate || '',
          accommodation: guest.accommodationType || guest.accommodation || '',
          status: guest.status || 'active',
          notes: guest.notes || '',
        })))
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to fetch guests. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filteredGuests = guests.filter(
    (guest) =>
      (guest.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (guest.id || '').toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    if (status === 'active' || status === 'current') {
      return <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-400">Current</span>
    } else if (status === 'upcoming') {
      return <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-700 dark:text-green-400">Upcoming</span>
    }
    return <span className="px-2 py-1 text-xs rounded-full bg-gray-500/20 text-gray-700 dark:text-gray-400">Past</span>
  }

  const handleAddGuest = async () => {
    if (!newGuest.name || !newGuest.email || !newGuest.phone || !newGuest.visitDate) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      })
      return
    }

    setSubmitLoading(true)
    try {
      const result = await guestApi.create({
        fullName: newGuest.name,
        email: newGuest.email,
        phone: newGuest.phone,
        address: newGuest.address || undefined,
        visitDate: newGuest.visitDate,
        accommodationType: newGuest.accommodation,
        notes: newGuest.notes || undefined,
      })

      if (result.success) {
        toast({
          title: 'Guest Registered',
          description: 'Guest has been registered successfully.',
        })
        setIsAddDialogOpen(false)
        setNewGuest({
          name: '',
          email: '',
          phone: '',
          address: '',
          visitDate: '',
          accommodation: 'Luxury Glamping Tent',
          notes: '',
        })
        fetchGuests()
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to register guest.',
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
      setSubmitLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this guest?')) return

    setActionLoading(id)
    try {
      const result = await guestApi.delete(id)
      if (result.success) {
        toast({
          title: 'Guest Deleted',
          description: 'The guest has been deleted successfully.',
        })
        fetchGuests()
        if (selectedGuest?.id === id) {
          setSelectedGuest(null)
        }
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to delete guest.',
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Guests Management</h1>
          <p className="text-muted-foreground mt-1">Register and manage guest information</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <UserPlus className="h-4 w-4 mr-2" />
              Register New Guest
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Register New Guest</DialogTitle>
              <DialogDescription>Add a new guest who visited the homestay</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Full Name *</label>
                <Input
                  value={newGuest.name}
                  onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                  placeholder="Enter guest name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Email *</label>
                <Input
                  type="email"
                  value={newGuest.email}
                  onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Phone *</label>
                <Input
                  type="tel"
                  value={newGuest.phone}
                  onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Address</label>
                <Input
                  value={newGuest.address}
                  onChange={(e) => setNewGuest({ ...newGuest, address: e.target.value })}
                  placeholder="Complete address"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Visit Date *</label>
                <Input
                  type="date"
                  value={newGuest.visitDate}
                  onChange={(e) => setNewGuest({ ...newGuest, visitDate: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Accommodation Type *</label>
                <select
                  value={newGuest.accommodation}
                  onChange={(e) => setNewGuest({ ...newGuest, accommodation: e.target.value })}
                  className="w-full h-9 px-3 rounded-md border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Luxury Glamping Tent">Luxury Glamping Tent</option>
                  <option value="Authentic Homestay">Authentic Homestay</option>
                  <option value="Mountain Wellness Pod">Mountain Wellness Pod</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Notes</label>
                <Input
                  value={newGuest.notes}
                  onChange={(e) => setNewGuest({ ...newGuest, notes: e.target.value })}
                  placeholder="Additional notes"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1" disabled={submitLoading}>
                  Cancel
                </Button>
                <Button onClick={handleAddGuest} className="flex-1" disabled={submitLoading}>
                  {submitLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    'Register Guest'
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="border-primary/30">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or guest ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Guests Table */}
      <Card className="border-primary/30 shadow-lg">
        <CardHeader>
          <CardTitle>Registered Guests ({filteredGuests.length})</CardTitle>
          <CardDescription>Complete list of guests who visited the homestay</CardDescription>
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
                    <TableHead>Guest ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Visit Date</TableHead>
                    <TableHead>Accommodation</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGuests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No guests found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredGuests.map((guest) => (
                      <TableRow key={guest.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{guest.id}</TableCell>
                        <TableCell className="font-medium">{guest.name}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                              {guest.email}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              {guest.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            {guest.visitDate}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{guest.accommodation}</TableCell>
                        <TableCell>{getStatusBadge(guest.status || 'active')}</TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedGuest(guest)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Guest Details - {guest.name}</DialogTitle>
                                <DialogDescription>Complete guest information</DialogDescription>
                              </DialogHeader>
                              {selectedGuest && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Guest ID</label>
                                      <p className="font-medium">{selectedGuest.id}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                                      <p className="font-medium">{selectedGuest.name}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                                      <p className="font-medium">{selectedGuest.email}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Phone</label>
                                      <p className="font-medium">{selectedGuest.phone}</p>
                                    </div>
                                    {selectedGuest.address && (
                                      <div className="col-span-2">
                                        <label className="text-sm font-medium text-muted-foreground">Address</label>
                                        <p className="font-medium">{selectedGuest.address}</p>
                                      </div>
                                    )}
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Visit Date</label>
                                      <p className="font-medium">{selectedGuest.visitDate}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Accommodation</label>
                                      <p className="font-medium">{selectedGuest.accommodation}</p>
                                    </div>
                                    {selectedGuest.notes && (
                                      <div className="col-span-2">
                                        <label className="text-sm font-medium text-muted-foreground">Notes</label>
                                        <p className="font-medium">{selectedGuest.notes}</p>
                                      </div>
                                    )}
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Status</label>
                                      <div className="mt-1">{getStatusBadge(selectedGuest.status || 'active')}</div>
                                    </div>
                                  </div>
                                  <div className="flex gap-2 pt-4 border-t">
                                    <Button
                                      variant="destructive"
                                      className="flex-1"
                                      onClick={() => handleDelete(selectedGuest.id)}
                                      disabled={actionLoading === selectedGuest.id}
                                    >
                                      {actionLoading === selectedGuest.id ? (
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                      ) : null}
                                      Delete Guest
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
