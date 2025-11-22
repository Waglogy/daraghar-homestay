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
import { Star, Search, Eye, Trash2, Filter, Loader2, Check, X } from 'lucide-react'
import { reviewApi } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'

interface Review {
  id: string
  fullName?: string
  guestName?: string
  email?: string
  location: string
  rating: number
  review?: string
  text?: string
  status: string
  createdAt?: string
  date?: string
}

export default function ReviewsPage() {
  const { toast } = useToast()
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRating, setFilterRating] = useState<'all' | '5' | '4' | '3' | '2' | '1'>('all')
  const [filterStatus, setFilterStatus] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all')
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    fetchReviews()
  }, [filterStatus])

  const fetchReviews = async () => {
    try {
      setIsLoading(true)
      const status = filterStatus === 'all' ? undefined : filterStatus === 'approved' ? 'approved' : filterStatus
      const result = await reviewApi.getAll({ status, page: 1, limit: 100 })
      
      if (result.success && result.data) {
        const reviewsData = Array.isArray(result.data) ? result.data : result.data.reviews || []
        setReviews(reviewsData.map((review: any) => ({
          id: review.id || review._id,
          guestName: review.fullName || review.guestName,
          email: review.email,
          location: review.location || '',
          rating: review.rating || 5,
          text: review.review || review.text || '',
          status: review.status || (review.isApproved ? 'approved' : 'pending'),
          date: review.createdAt ? new Date(review.createdAt).toISOString().split('T')[0] : review.date || '',
        })))
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to fetch reviews. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      (review.guestName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (review.location || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (review.text || '').toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRating = filterRating === 'all' || review.rating === parseInt(filterRating)
    return matchesSearch && matchesRating
  })

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0'

  const getStatusBadge = (status: string) => {
    if (status === 'approved' || status === 'published') {
      return <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-700 dark:text-green-400">Published</span>
    } else if (status === 'rejected') {
      return <span className="px-2 py-1 text-xs rounded-full bg-red-500/20 text-red-700 dark:text-red-400">Rejected</span>
    }
    return <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-700 dark:text-yellow-400">Pending</span>
  }

  const handleApprove = async (id: string) => {
    setActionLoading(id)
    try {
      const result = await reviewApi.approve(id)
      if (result.success) {
        toast({
          title: 'Review Approved',
          description: 'The review has been approved and published.',
        })
        fetchReviews()
        if (selectedReview?.id === id) {
          setSelectedReview({ ...selectedReview, status: 'approved' })
        }
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to approve review.',
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

  const handleReject = async (id: string) => {
    if (!confirm('Are you sure you want to reject this review?')) return
    
    setActionLoading(id)
    try {
      const result = await reviewApi.reject(id)
      if (result.success) {
        toast({
          title: 'Review Rejected',
          description: 'The review has been rejected.',
        })
        fetchReviews()
        if (selectedReview?.id === id) {
          setSelectedReview({ ...selectedReview, status: 'rejected' })
        }
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to reject review.',
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
    if (!confirm('Are you sure you want to delete this review? This action cannot be undone.')) return
    
    setActionLoading(id)
    try {
      const result = await reviewApi.delete(id)
      if (result.success) {
        toast({
          title: 'Review Deleted',
          description: 'The review has been deleted successfully.',
        })
        fetchReviews()
        if (selectedReview?.id === id) {
          setSelectedReview(null)
        }
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to delete review.',
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
        <h1 className="text-3xl font-bold text-foreground">Reviews Management</h1>
        <p className="text-muted-foreground mt-1">View and manage guest reviews and testimonials</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-primary/20 hover:border-primary/50 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <Star className="h-4 w-4 text-primary fill-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviews.length}</div>
            <p className="text-xs text-muted-foreground">All guest reviews</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/50 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-primary fill-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating}</div>
            <div className="flex gap-1 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < Math.round(parseFloat(averageRating)) ? 'fill-primary text-primary' : 'text-muted-foreground'}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/50 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Star className="h-4 w-4 text-primary fill-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reviews.filter((r) => r.status === 'approved' || r.status === 'published').length}
            </div>
            <p className="text-xs text-muted-foreground">Live reviews</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/50 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Star className="h-4 w-4 text-primary fill-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reviews.filter((r) => r.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-primary/30">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by guest name, location, or review text..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Rating:</span>
                <Button
                  variant={filterRating === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterRating('all')}
                >
                  All
                </Button>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <Button
                    key={rating}
                    variant={filterRating === rating.toString() ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterRating(rating.toString() as any)}
                  >
                    {rating} <Star className="h-3 w-3 ml-1 fill-current" />
                  </Button>
                ))}
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm font-medium">Status:</span>
                <Button
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('all')}
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === 'approved' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('approved')}
                >
                  Published
                </Button>
                <Button
                  variant={filterStatus === 'pending' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('pending')}
                >
                  Pending
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews Table */}
      <Card className="border-primary/30 shadow-lg">
        <CardHeader>
          <CardTitle>Guest Reviews ({filteredReviews.length})</CardTitle>
          <CardDescription>Manage and moderate guest testimonials</CardDescription>
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
                    <TableHead>Review ID</TableHead>
                    <TableHead>Guest</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Review</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReviews.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No reviews found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredReviews.map((review) => (
                      <TableRow key={review.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{review.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{review.guestName}</div>
                            <div className="text-xs text-muted-foreground">{review.location}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={i < review.rating ? 'fill-primary text-primary' : 'text-muted-foreground'}
                              />
                            ))}
                            <span className="ml-1 text-sm font-medium">{review.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm line-clamp-2 max-w-md">{review.text}</p>
                        </TableCell>
                        <TableCell className="text-sm">{review.date}</TableCell>
                        <TableCell>{getStatusBadge(review.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedReview(review)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Review Details - {review.id}</DialogTitle>
                                  <DialogDescription>Complete review information</DialogDescription>
                                </DialogHeader>
                                {selectedReview && (
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Review ID</label>
                                        <p className="font-medium">{selectedReview.id}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Date</label>
                                        <p className="font-medium">{selectedReview.date}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Guest Name</label>
                                        <p className="font-medium">{selectedReview.guestName}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Location</label>
                                        <p className="font-medium">{selectedReview.location}</p>
                                      </div>
                                      {selectedReview.email && (
                                        <div>
                                          <label className="text-sm font-medium text-muted-foreground">Email</label>
                                          <p className="font-medium">{selectedReview.email}</p>
                                        </div>
                                      )}
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Rating</label>
                                        <div className="flex gap-1 items-center mt-1">
                                          {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                              key={i}
                                              size={20}
                                              className={i < selectedReview.rating ? 'fill-primary text-primary' : 'text-muted-foreground'}
                                            />
                                          ))}
                                          <span className="ml-2 text-lg font-bold">{selectedReview.rating} / 5</span>
                                        </div>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Status</label>
                                        <div className="mt-1">{getStatusBadge(selectedReview.status)}</div>
                                      </div>
                                      <div className="col-span-2">
                                        <label className="text-sm font-medium text-muted-foreground">Review Text</label>
                                        <p className="font-medium mt-2 leading-relaxed">{selectedReview.text}</p>
                                      </div>
                                    </div>
                                    {selectedReview.status === 'pending' && (
                                      <div className="flex gap-2 pt-4 border-t">
                                        <Button 
                                          className="flex-1"
                                          onClick={() => handleApprove(selectedReview.id)}
                                          disabled={actionLoading === selectedReview.id}
                                        >
                                          {actionLoading === selectedReview.id ? (
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                          ) : (
                                            <Check className="h-4 w-4 mr-2" />
                                          )}
                                          Approve Review
                                        </Button>
                                        <Button 
                                          variant="outline" 
                                          className="flex-1"
                                          onClick={() => handleReject(selectedReview.id)}
                                          disabled={actionLoading === selectedReview.id}
                                        >
                                          {actionLoading === selectedReview.id ? (
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                          ) : (
                                            <X className="h-4 w-4 mr-2" />
                                          )}
                                          Reject Review
                                        </Button>
                                      </div>
                                    )}
                                    <div className="flex gap-2 pt-4 border-t">
                                      <Button
                                        variant="destructive"
                                        className="flex-1"
                                        onClick={() => handleDelete(selectedReview.id)}
                                        disabled={actionLoading === selectedReview.id}
                                      >
                                        {actionLoading === selectedReview.id ? (
                                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        ) : (
                                          <Trash2 className="h-4 w-4 mr-2" />
                                        )}
                                        Delete Review
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
