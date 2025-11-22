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
import { Search, Eye, Mail, Phone, Calendar, MessageSquare, CheckCircle, Loader2 } from 'lucide-react'
import { contactApi } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'

interface Contact {
  id: string
  fullName?: string
  name?: string
  email: string
  phone?: string
  subject: string
  message: string
  status?: string
  isRead?: boolean
  createdAt?: string
  date?: string
}

export default function ContactsPage() {
  const { toast } = useToast()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'read' | 'replied'>('all')
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    fetchContacts()
  }, [filterStatus])

  const fetchContacts = async () => {
    try {
      setIsLoading(true)
      const status = filterStatus === 'all' ? undefined : filterStatus
      const result = await contactApi.getAll({ status, page: 1, limit: 100 })
      
      if (result.success && result.data) {
        const contactsData = Array.isArray(result.data) ? result.data : result.data.contacts || []
        setContacts(contactsData.map((contact: any) => ({
          id: contact.id || contact._id,
          name: contact.fullName || contact.name,
          email: contact.email,
          phone: contact.phone || '',
          subject: contact.subject,
          message: contact.message,
          status: contact.status || (contact.isRead ? 'read' : 'new'),
          date: contact.createdAt ? new Date(contact.createdAt).toISOString().split('T')[0] : contact.date || '',
        })))
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to fetch contacts. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      (contact.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const getStatusBadge = (status: string) => {
    if (status === 'new') {
      return <Badge className="bg-blue-500/20 text-blue-700 dark:text-blue-400">New</Badge>
    } else if (status === 'read') {
      return <Badge className="bg-gray-500/20 text-gray-700 dark:text-gray-400">Read</Badge>
    }
    return <Badge className="bg-green-500/20 text-green-700 dark:text-green-400">Replied</Badge>
  }

  const handleMarkAsRead = async (id: string) => {
    setActionLoading(id)
    try {
      const result = await contactApi.markAsRead(id)
      if (result.success) {
        toast({
          title: 'Marked as Read',
          description: 'Contact has been marked as read.',
        })
        fetchContacts()
        if (selectedContact?.id === id) {
          setSelectedContact({ ...selectedContact, status: 'read' })
        }
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to mark as read.',
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
    if (!confirm('Are you sure you want to delete this contact?')) return
    
    setActionLoading(id)
    try {
      const result = await contactApi.delete(id)
      if (result.success) {
        toast({
          title: 'Contact Deleted',
          description: 'The contact has been deleted successfully.',
        })
        fetchContacts()
        if (selectedContact?.id === id) {
          setSelectedContact(null)
        }
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to delete contact.',
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

  const newContactsCount = contacts.filter((c) => c.status === 'new').length
  const readContactsCount = contacts.filter((c) => c.status === 'read').length
  const repliedContactsCount = contacts.filter((c) => c.status === 'replied').length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Contacts Management</h1>
        <p className="text-muted-foreground mt-1">View and manage all contact inquiries and messages</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-primary/20 hover:border-primary/50 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
            <MessageSquare className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contacts.length}</div>
            <p className="text-xs text-muted-foreground">All inquiries</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/50 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{newContactsCount}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/50 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Read</CardTitle>
            <MessageSquare className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{readContactsCount}</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/50 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Replied</CardTitle>
            <MessageSquare className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{repliedContactsCount}</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-primary/30">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, subject, or message..."
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
                variant={filterStatus === 'new' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('new')}
                className="min-w-[100px]"
              >
                New
              </Button>
              <Button
                variant={filterStatus === 'read' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('read')}
                className="min-w-[100px]"
              >
                Read
              </Button>
              <Button
                variant={filterStatus === 'replied' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('replied')}
                className="min-w-[100px]"
              >
                Replied
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contacts Table */}
      <Card className="border-primary/30 shadow-lg">
        <CardHeader>
          <CardTitle>Contact Inquiries ({filteredContacts.length})</CardTitle>
          <CardDescription>Manage all customer inquiries and messages</CardDescription>
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
                    <TableHead>Contact ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact Info</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No contacts found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredContacts.map((contact) => (
                      <TableRow key={contact.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{contact.id}</TableCell>
                        <TableCell className="font-medium">{contact.name}</TableCell>
                        <TableCell>
                          <div className="text-sm space-y-1">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs">{contact.email}</span>
                            </div>
                            {contact.phone && (
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs">{contact.phone}</span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{contact.subject}</TableCell>
                        <TableCell>
                          <p className="text-sm line-clamp-2 max-w-xs">{contact.message}</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            {contact.date}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(contact.status || 'new')}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedContact(contact)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Contact Details - {contact.id}</DialogTitle>
                                  <DialogDescription>Complete inquiry information</DialogDescription>
                                </DialogHeader>
                                {selectedContact && (
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Contact ID</label>
                                        <p className="font-medium">{selectedContact.id}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Date</label>
                                        <p className="font-medium">{selectedContact.date}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Name</label>
                                        <p className="font-medium">{selectedContact.name}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Status</label>
                                        <div className="mt-1">{getStatusBadge(selectedContact.status || 'new')}</div>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                                        <p className="font-medium">{selectedContact.email}</p>
                                      </div>
                                      {selectedContact.phone && (
                                        <div>
                                          <label className="text-sm font-medium text-muted-foreground">Phone</label>
                                          <p className="font-medium">{selectedContact.phone}</p>
                                        </div>
                                      )}
                                      <div className="col-span-2">
                                        <label className="text-sm font-medium text-muted-foreground">Subject</label>
                                        <p className="font-medium">{selectedContact.subject}</p>
                                      </div>
                                      <div className="col-span-2">
                                        <label className="text-sm font-medium text-muted-foreground">Message</label>
                                        <p className="font-medium mt-2 leading-relaxed whitespace-pre-wrap">{selectedContact.message}</p>
                                      </div>
                                    </div>
                                    <div className="flex gap-2 pt-4 border-t">
                                      {selectedContact.status === 'new' && (
                                        <Button
                                          variant="outline"
                                          onClick={() => handleMarkAsRead(selectedContact.id)}
                                          className="flex-1"
                                          disabled={actionLoading === selectedContact.id}
                                        >
                                          {actionLoading === selectedContact.id ? (
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                          ) : (
                                            <CheckCircle className="h-4 w-4 mr-2" />
                                          )}
                                          Mark as Read
                                        </Button>
                                      )}
                                      <Button
                                        variant="destructive"
                                        onClick={() => handleDelete(selectedContact.id)}
                                        className="flex-1"
                                        disabled={actionLoading === selectedContact.id}
                                      >
                                        {actionLoading === selectedContact.id ? (
                                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        ) : null}
                                        Delete
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                          </div>
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
