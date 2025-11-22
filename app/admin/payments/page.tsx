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
import { Search, Plus, Eye, Calendar, CreditCard, Loader2 } from 'lucide-react'
import { paymentApi } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'

interface Payment {
  id: string
  bookingId: string
  guestName: string
  amount: number
  paymentDate?: string
  date?: string
  paymentMethod?: string
  method?: string
  status: string
  referenceTransactionId?: string
  reference?: string
  description?: string
}

export default function PaymentsPage() {
  const { toast } = useToast()
  const [payments, setPayments] = useState<Payment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all')
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [newPayment, setNewPayment] = useState({
    bookingId: '',
    guestName: '',
    amount: '',
    date: '',
    method: 'UPI',
    reference: '',
    description: '',
  })
  const [submitLoading, setSubmitLoading] = useState(false)

  useEffect(() => {
    fetchPayments()
  }, [filterStatus])

  const fetchPayments = async () => {
    try {
      setIsLoading(true)
      const status = filterStatus === 'all' ? undefined : filterStatus
      const result = await paymentApi.getAll({ status, page: 1, limit: 100 })
      
      if (result.success && result.data) {
        const paymentsData = Array.isArray(result.data) ? result.data : result.data.payments || []
        setPayments(paymentsData.map((payment: any) => {
          // Handle bookingId - it might be an object (populated) or a string
          let bookingId = ''
          if (payment.bookingId) {
            if (typeof payment.bookingId === 'object') {
              // If it's an object, try to get the ID or bookingReference
              bookingId = payment.bookingId.bookingReference || payment.bookingId.id || payment.bookingId._id || ''
            } else {
              bookingId = payment.bookingId
            }
          }

          return {
            id: payment.id || payment._id,
            bookingId: bookingId,
            guestName: payment.guestName || '',
            amount: payment.amount || 0,
            date: payment.paymentDate || payment.date || '',
            method: payment.paymentMethod || payment.method || '',
            status: payment.status || 'pending',
            reference: payment.referenceTransactionId || payment.reference || '',
            description: payment.description || '',
          }
        }))
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to fetch payments. Please try again.',
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

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      (payment.guestName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (payment.bookingId || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (payment.id || '').toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const totalRevenue = payments
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0)

  const pendingAmount = payments
    .filter((p) => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0)

  const getStatusBadge = (status: string) => {
    if (status === 'completed') {
      return <Badge className="bg-green-500/20 text-green-700 dark:text-green-400">Completed</Badge>
    }
    return <Badge className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-400">Pending</Badge>
  }

  const handleAddPayment = async () => {
    if (!newPayment.bookingId || !newPayment.guestName || !newPayment.amount || !newPayment.date) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      })
      return
    }

    setSubmitLoading(true)
    try {
      const result = await paymentApi.create({
        bookingId: newPayment.bookingId,
        guestName: newPayment.guestName,
        amount: parseFloat(newPayment.amount),
        paymentDate: newPayment.date,
        paymentMethod: newPayment.method,
        referenceTransactionId: newPayment.reference || undefined,
        description: newPayment.description || undefined,
        status: 'completed',
      })

      if (result.success) {
        toast({
          title: 'Payment Recorded',
          description: 'Payment has been recorded successfully.',
        })
        setIsAddDialogOpen(false)
        setNewPayment({
          bookingId: '',
          guestName: '',
          amount: '',
          date: '',
          method: 'UPI',
          reference: '',
          description: '',
        })
        fetchPayments()
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to record payment.',
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
    if (!confirm('Are you sure you want to delete this payment record?')) return
    
    setActionLoading(id)
    try {
      const result = await paymentApi.delete(id)
      if (result.success) {
        toast({
          title: 'Payment Deleted',
          description: 'The payment record has been deleted successfully.',
        })
        fetchPayments()
        if (selectedPayment?.id === id) {
          setSelectedPayment(null)
        }
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to delete payment.',
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
          <h1 className="text-3xl font-bold text-foreground">Payments Management</h1>
          <p className="text-muted-foreground mt-1">Track and manage all payment transactions</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Payment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Payment</DialogTitle>
              <DialogDescription>Record a new payment transaction</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Booking ID *</label>
                <Input
                  value={newPayment.bookingId}
                  onChange={(e) => setNewPayment({ ...newPayment, bookingId: e.target.value })}
                  placeholder="BK001"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Guest Name *</label>
                <Input
                  value={newPayment.guestName}
                  onChange={(e) => setNewPayment({ ...newPayment, guestName: e.target.value })}
                  placeholder="Guest name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Amount (₹) *</label>
                <Input
                  type="number"
                  value={newPayment.amount}
                  onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Payment Date *</label>
                <Input
                  type="date"
                  value={newPayment.date}
                  onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Payment Method *</label>
                <select
                  value={newPayment.method}
                  onChange={(e) => setNewPayment({ ...newPayment, method: e.target.value })}
                  className="w-full h-9 px-3 rounded-md border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="UPI">UPI</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cash">Cash</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Reference/Transaction ID</label>
                <Input
                  value={newPayment.reference}
                  onChange={(e) => setNewPayment({ ...newPayment, reference: e.target.value })}
                  placeholder="Transaction reference"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Input
                  value={newPayment.description}
                  onChange={(e) => setNewPayment({ ...newPayment, description: e.target.value })}
                  placeholder="Payment description"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1" disabled={submitLoading}>
                  Cancel
                </Button>
                <Button onClick={handleAddPayment} className="flex-1" disabled={submitLoading}>
                  {submitLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Recording...
                    </>
                  ) : (
                    'Add Payment'
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Revenue Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-primary/20 hover:border-primary/50 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">All completed payments</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/50 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            <CreditCard className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {formatCurrency(pendingAmount)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting payment</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/50 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payments.length}</div>
            <p className="text-xs text-muted-foreground mt-1">All payment records</p>
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
                placeholder="Search by guest name, booking ID, or payment ID..."
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
                variant={filterStatus === 'completed' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('completed')}
                className="min-w-[100px]"
              >
                Completed
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card className="border-primary/30 shadow-lg">
        <CardHeader>
          <CardTitle>Payment Records ({filteredPayments.length})</CardTitle>
          <CardDescription>Complete list of all payment transactions</CardDescription>
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
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Guest Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No payments found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPayments.map((payment) => (
                      <TableRow key={payment.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{payment.id}</TableCell>
                        <TableCell>{payment.bookingId}</TableCell>
                        <TableCell className="font-medium">{payment.guestName}</TableCell>
                        <TableCell className="font-semibold">{formatCurrency(payment.amount)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            {payment.date}
                          </div>
                        </TableCell>
                        <TableCell>{payment.method}</TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedPayment(payment)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Payment Details - {payment.id}</DialogTitle>
                                <DialogDescription>Complete payment transaction information</DialogDescription>
                              </DialogHeader>
                              {selectedPayment && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Payment ID</label>
                                      <p className="font-medium">{selectedPayment.id}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Booking ID</label>
                                      <p className="font-medium">{selectedPayment.bookingId}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Guest Name</label>
                                      <p className="font-medium">{selectedPayment.guestName}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Payment Date</label>
                                      <p className="font-medium">{selectedPayment.date}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Payment Method</label>
                                      <p className="font-medium">{selectedPayment.method}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Status</label>
                                      <div className="mt-1">{getStatusBadge(selectedPayment.status)}</div>
                                    </div>
                                    {selectedPayment.reference && (
                                      <div className="col-span-2">
                                        <label className="text-sm font-medium text-muted-foreground">Reference/Transaction ID</label>
                                        <p className="font-medium">{selectedPayment.reference}</p>
                                      </div>
                                    )}
                                    {selectedPayment.description && (
                                      <div className="col-span-2">
                                        <label className="text-sm font-medium text-muted-foreground">Description</label>
                                        <p className="font-medium">{selectedPayment.description}</p>
                                      </div>
                                    )}
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Amount</label>
                                      <p className="text-2xl font-bold text-primary">
                                        {formatCurrency(selectedPayment.amount)}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex gap-2 pt-4 border-t">
                                    <Button
                                      variant="destructive"
                                      className="flex-1"
                                      onClick={() => handleDelete(selectedPayment.id)}
                                      disabled={actionLoading === selectedPayment.id}
                                    >
                                      {actionLoading === selectedPayment.id ? (
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                      ) : null}
                                      Delete Payment
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
