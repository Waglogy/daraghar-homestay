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
import { Search, UserPlus, Eye, Calendar, MapPin, Phone, Mail } from 'lucide-react'

// Mock data - in production this would come from an API
const guests = [
  {
    id: 'G001',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 9876543210',
    address: '123 Main Street, Delhi, 110001',
    visitDate: '2024-12-15',
    accommodation: 'Luxury Glamping Tent',
    totalVisits: 2,
    lastVisit: '2024-12-15',
    status: 'current',
  },
  {
    id: 'G002',
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    phone: '+91 9876543211',
    address: '456 Park Avenue, Mumbai, 400001',
    visitDate: '2024-12-16',
    accommodation: 'Authentic Homestay',
    totalVisits: 1,
    lastVisit: '2024-12-16',
    status: 'upcoming',
  },
  {
    id: 'G003',
    name: 'Anjali Patel',
    email: 'anjali@example.com',
    phone: '+91 9876543212',
    address: '789 MG Road, Bangalore, 560001',
    visitDate: '2024-11-20',
    accommodation: 'Mountain Wellness Pod',
    totalVisits: 3,
    lastVisit: '2024-11-20',
    status: 'past',
  },
  {
    id: 'G004',
    name: 'Vikram Singh',
    email: 'vikram@example.com',
    phone: '+91 9876543213',
    address: '321 Church Street, Pune, 411001',
    visitDate: '2024-12-25',
    accommodation: 'Luxury Glamping Tent',
    totalVisits: 1,
    lastVisit: '2024-12-25',
    status: 'upcoming',
  },
  {
    id: 'G005',
    name: 'Maya Desai',
    email: 'maya@example.com',
    phone: '+91 9876543214',
    address: '654 Gandhi Road, Ahmedabad, 380001',
    visitDate: '2024-12-10',
    accommodation: 'Authentic Homestay',
    totalVisits: 1,
    lastVisit: '2024-12-10',
    status: 'past',
  },
]

export default function GuestsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGuest, setSelectedGuest] = useState<typeof guests[0] | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newGuest, setNewGuest] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    visitDate: '',
    accommodation: 'glamping',
  })

  const filteredGuests = guests.filter(
    (guest) =>
      guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    if (status === 'current') {
      return <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-400">Current</span>
    } else if (status === 'upcoming') {
      return <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-700 dark:text-green-400">Upcoming</span>
    }
    return <span className="px-2 py-1 text-xs rounded-full bg-gray-500/20 text-gray-700 dark:text-gray-400">Past</span>
  }

  const handleAddGuest = () => {
    // In production, this would make an API call
    alert('Guest registration would be added here')
    setIsAddDialogOpen(false)
    setNewGuest({
      name: '',
      email: '',
      phone: '',
      address: '',
      visitDate: '',
      accommodation: 'glamping',
    })
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
          <DialogContent className="max-w-md">
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
                  placeholder="Guest name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Email *</label>
                <Input
                  type="email"
                  value={newGuest.email}
                  onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                  placeholder="guest@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Phone *</label>
                <Input
                  type="tel"
                  value={newGuest.phone}
                  onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                  placeholder="+91 9876543210"
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
                  <option value="glamping">Luxury Glamping Tent</option>
                  <option value="homestay">Authentic Homestay</option>
                  <option value="pod">Mountain Wellness Pod</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleAddGuest} className="flex-1">
                  Register Guest
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
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guest ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Visit Date</TableHead>
                  <TableHead>Accommodation</TableHead>
                  <TableHead>Total Visits</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGuests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
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
                      <TableCell>{guest.totalVisits}</TableCell>
                      <TableCell>{getStatusBadge(guest.status)}</TableCell>
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
                                  <div className="col-span-2">
                                    <label className="text-sm font-medium text-muted-foreground">Address</label>
                                    <p className="font-medium">{selectedGuest.address}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Visit Date</label>
                                    <p className="font-medium">{selectedGuest.visitDate}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Accommodation</label>
                                    <p className="font-medium">{selectedGuest.accommodation}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Total Visits</label>
                                    <p className="font-medium">{selectedGuest.totalVisits}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Last Visit</label>
                                    <p className="font-medium">{selectedGuest.lastVisit}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                                    <div className="mt-1">{getStatusBadge(selectedGuest.status)}</div>
                                  </div>
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
        </CardContent>
      </Card>
    </div>
  )
}

