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
import { Star, Search, Eye, Trash2, Filter } from 'lucide-react'

// Mock data - in production this would come from an API
const reviews = [
  {
    id: 'R001',
    guestName: 'Priya Sharma',
    location: 'Delhi',
    rating: 5,
    text: 'An absolutely magical experience! The glamping setup was luxurious yet connected to nature. The bonfire nights were unforgettable, and the organic food was delicious.',
    date: '2024-11-10',
    status: 'published',
  },
  {
    id: 'R002',
    guestName: 'Rajesh Kumar',
    location: 'Mumbai',
    rating: 5,
    text: 'Best homestay experience ever. The warmth of the local family, cultural insights, and the serene mountain views made our trip truly special. Highly recommended!',
    date: '2024-11-08',
    status: 'published',
  },
  {
    id: 'R003',
    guestName: 'Anjali Patel',
    location: 'Bangalore',
    rating: 4,
    text: 'Wonderful place to escape the city chaos. The village tourism and nature trails were excellent. Great facilities and friendly staff. Would definitely come back!',
    date: '2024-11-05',
    status: 'published',
  },
  {
    id: 'R004',
    guestName: 'Vikram Singh',
    location: 'Pune',
    rating: 5,
    text: 'Daraghar Maila exceeded all expectations. The views, the activities, the food—everything was perfect. A true gem in Sikkim!',
    date: '2024-11-01',
    status: 'published',
  },
  {
    id: 'R005',
    guestName: 'Maya Desai',
    location: 'Ahmedabad',
    rating: 5,
    text: 'Perfect getaway with family! Kids loved the nature trails and cultural activities.',
    date: '2024-10-28',
    status: 'pending',
  },
  {
    id: 'R006',
    guestName: 'Arjun Nair',
    location: 'Kochi',
    rating: 4,
    text: 'Great place for a weekend retreat. The glamping experience was unique and memorable.',
    date: '2024-10-25',
    status: 'published',
  },
]

export default function ReviewsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRating, setFilterRating] = useState<'all' | '5' | '4' | '3' | '2' | '1'>('all')
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'pending'>('all')
  const [selectedReview, setSelectedReview] = useState<typeof reviews[0] | null>(null)

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.text.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRating = filterRating === 'all' || review.rating === parseInt(filterRating)
    const matchesStatus = filterStatus === 'all' || review.status === filterStatus
    return matchesSearch && matchesRating && matchesStatus
  })

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0'

  const getStatusBadge = (status: string) => {
    if (status === 'published') {
      return <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-700 dark:text-green-400">Published</span>
    }
    return <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-700 dark:text-yellow-400">Pending</span>
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      // In production, this would make an API call
      alert(`Review ${id} would be deleted here`)
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
              {reviews.filter((r) => r.status === 'published').length}
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
                  variant={filterStatus === 'published' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('published')}
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
                                      <Button className="flex-1">
                                        Publish Review
                                      </Button>
                                      <Button variant="outline" className="flex-1">
                                        Reject Review
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(review.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
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

