'use client'

import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Image, X } from 'lucide-react'

interface GalleryPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function GalleryPopup({ open, onOpenChange }: GalleryPopupProps) {
  const router = useRouter()

  const handleViewGallery = () => {
    onOpenChange(false)
    router.push('/gallery')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
            <Image className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-center text-2xl">
            Explore Our Gallery
          </DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            Thank you for your submission! While you wait, why not take a moment to explore the breathtaking beauty of Daraghar Maila through our photo gallery?
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Discover stunning views, luxurious accommodations, and unforgettable experiences captured by our guests.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Maybe Later
            </Button>
            <Button
              onClick={handleViewGallery}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              View Gallery
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


