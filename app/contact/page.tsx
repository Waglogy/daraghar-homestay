'use client'

import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useState } from 'react'
import { contactApi } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'
import GalleryPopup from '@/components/gallery-popup'

export default function ContactPage() {
  const { toast } = useToast()
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showGalleryPopup, setShowGalleryPopup] = useState(false)

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (value.trim().length < 3) {
          return 'Name must be at least 3 characters long'
        }
        if (value.trim().length > 50) {
          return 'Name must not exceed 50 characters'
        }
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          return 'Name should only contain letters and spaces'
        }
        return ''

      case 'email':
        if (!value.trim()) {
          return 'Email is required'
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value.trim())) {
          return 'Please enter a valid email address'
        }
        return ''

      case 'subject':
        if (value.trim().length < 3) {
          return 'Subject must be at least 3 characters long'
        }
        if (value.trim().length > 100) {
          return 'Subject must not exceed 100 characters'
        }
        return ''

      case 'message':
        if (value.trim().length < 10) {
          return 'Message must be at least 10 characters long'
        }
        if (value.trim().length > 1000) {
          return 'Message must not exceed 1000 characters'
        }
        return ''

      default:
        return ''
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactForm(prev => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const validateForm = (): boolean => {
    const newErrors = {
      name: validateField('name', contactForm.name),
      email: validateField('email', contactForm.email),
      subject: validateField('subject', contactForm.subject),
      message: validateField('message', contactForm.message),
    }

    setErrors(newErrors)

    // Check if there are any errors
    return !Object.values(newErrors).some(error => error !== '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields before submission
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors in the form before submitting.',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)

    try {
      const result = await contactApi.create({
        fullName: contactForm.name.trim(),
        email: contactForm.email.trim(),
        subject: contactForm.subject.trim(),
        message: contactForm.message.trim(),
      })

      if (result.success) {
        toast({
          title: 'Message Sent Successfully!',
          description: 'We have received your message and will get back to you soon.',
        })
        setContactForm({
          name: '',
          email: '',
          subject: '',
          message: '',
        })
        setErrors({
          name: '',
          email: '',
          subject: '',
          message: '',
        })
        // Show gallery popup after a short delay
        setTimeout(() => {
          setShowGalleryPopup(true)
        }, 1000)
      } else {
        toast({
          title: 'Failed to Send Message',
          description: result.error || 'Please try again later.',
          variant: 'destructive',
        })
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold">Get in Touch</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Contact us anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold">Contact Information</h2>

              {[
                {
                  icon: MapPin,
                  title: 'Location',
                  content: 'DARAMAILA FARMSTAY, Gangtok, Sikkim - 737101',
                },
                {
                  icon: Phone,
                  title: 'Phone',
                  content: '+91 9876 543 210',
                  href: 'tel:+919876543210',
                },
                {
                  icon: Mail,
                  title: 'Email',
                  content: 'info@daramailafarmstay.com',
                  href: 'mailto:info@daramailafarmstay.com',
                },
                {
                  icon: Clock,
                  title: 'Working Hours',
                  content: 'Monday - Sunday: 8:00 AM - 10:00 PM',
                },
              ].map((item, idx) => {
                const Icon = item.icon
                const content = item.href ? (
                  <a href={item.href} className="text-primary hover:underline">
                    {item.content}
                  </a>
                ) : (
                  item.content
                )

                return (
                  <Card key={idx} className="border-primary/20 hover:border-primary/50 transition-all">
                    <CardContent className="p-6 flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary/15 rounded-lg flex items-center justify-center">
                          <Icon size={24} className="text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                        <p className="text-muted-foreground">{content}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-primary/30 shadow-2xl">
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>We'll respond within 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={contactForm.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={`w-full px-4 py-2 rounded-lg border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary'
                          } bg-input text-foreground focus:outline-none focus:ring-2`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {contactForm.name.length}/50 characters
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary'
                          } bg-input text-foreground focus:outline-none focus:ring-2`}
                        placeholder="Enter your email address"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Subject *</label>
                      <input
                        type="text"
                        name="subject"
                        value={contactForm.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={`w-full px-4 py-2 rounded-lg border ${errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary'
                          } bg-input text-foreground focus:outline-none focus:ring-2`}
                        placeholder="Enter subject"
                      />
                      {errors.subject && (
                        <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {contactForm.subject.length}/100 characters
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                      <textarea
                        name="message"
                        value={contactForm.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        rows={6}
                        className={`w-full px-4 py-2 rounded-lg border ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary'
                          } bg-input text-foreground focus:outline-none focus:ring-2`}
                        placeholder="Write your message here..."
                      />
                      {errors.message && (
                        <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {contactForm.message.length}/1000 characters
                      </p>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base font-semibold"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <GalleryPopup open={showGalleryPopup} onOpenChange={setShowGalleryPopup} />
    </main>
  )
}
