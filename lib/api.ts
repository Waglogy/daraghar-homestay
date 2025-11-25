const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://homesaty-backend-dgm.vercel.app/api'

// Auth utilities
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('authToken')
}

export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token)
  }
}

export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken')
  }
}

// API request helper
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; message?: string; error?: string }> {
  try {
    const token = getAuthToken()
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    // Convert options.headers to plain object if it exists
    if (options.headers) {
      if (options.headers instanceof Headers) {
        options.headers.forEach((value, key) => {
          headers[key] = value
        })
      } else if (Array.isArray(options.headers)) {
        options.headers.forEach(([key, value]) => {
          headers[key] = value
        })
      } else {
        Object.assign(headers, options.headers)
      }
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.message || `HTTP error! status: ${response.status}`,
        message: data.message,
      }
    }

    return {
      success: true,
      data: data.data || data,
      message: data.message,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    }
  }
}

// Admin APIs
export const adminApi = {
  register: async (name: string, email: string, password: string) => {
    return apiRequest<{ token: string }>('/admin/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    })
  },

  login: async (email: string, password: string) => {
    const result = await apiRequest<{ token: string }>('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    if (result.success && result.data?.token) {
      setAuthToken(result.data.token)
    }
    return result
  },

  getProfile: async () => {
    return apiRequest('/admin/profile', {
      method: 'GET',
    })
  },
}

// Contact APIs
export const contactApi = {
  create: async (data: {
    fullName: string
    email: string
    subject: string
    message: string
  }) => {
    return apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  getAll: async (params?: { page?: number; limit?: number; status?: string }) => {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.status) queryParams.append('status', params.status)

    const query = queryParams.toString()
    return apiRequest(`/contact${query ? `?${query}` : ''}`, {
      method: 'GET',
    })
  },

  getById: async (id: string) => {
    return apiRequest(`/contact/${id}`, {
      method: 'GET',
    })
  },

  update: async (id: string, data: { status?: string; isRead?: boolean }) => {
    return apiRequest(`/contact/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  markAsRead: async (id: string) => {
    return apiRequest(`/contact/${id}/read`, {
      method: 'PATCH',
    })
  },

  delete: async (id: string) => {
    return apiRequest(`/contact/${id}`, {
      method: 'DELETE',
    })
  },
}

// Review APIs
export const reviewApi = {
  create: async (data: {
    fullName: string
    email: string
    location: string
    review: string
    rating: number
  }) => {
    return apiRequest('/review', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  getApproved: async (params?: { page?: number; limit?: number }) => {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())

    const query = queryParams.toString()
    return apiRequest<any>(`/review/approved${query ? `?${query}` : ''}`, {
      method: 'GET',
    })
  },

  getAll: async (params?: { status?: string; page?: number; limit?: number }) => {
    const queryParams = new URLSearchParams()
    if (params?.status) queryParams.append('status', params.status)
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())

    const query = queryParams.toString()
    return apiRequest<any>(`/review${query ? `?${query}` : ''}`, {
      method: 'GET',
    })
  },

  getById: async (id: string) => {
    return apiRequest(`/review/${id}`, {
      method: 'GET',
    })
  },

  update: async (id: string, data: { status?: string; isApproved?: boolean }) => {
    return apiRequest(`/review/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  approve: async (id: string) => {
    return apiRequest(`/review/${id}/approve`, {
      method: 'PATCH',
    })
  },

  reject: async (id: string) => {
    return apiRequest(`/review/${id}/reject`, {
      method: 'PATCH',
    })
  },

  delete: async (id: string) => {
    return apiRequest(`/review/${id}`, {
      method: 'DELETE',
    })
  },
}

// Booking APIs
export const bookingApi = {
  create: async (data: {
    fullName: string
    email: string
    phoneNumber: string
    checkInDate: string
    checkOutDate: string
    numberOfGuests: number
    accommodationType: string
    specialRequests?: string
  }) => {
    return apiRequest('/booking', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  getByReference: async (reference: string) => {
    return apiRequest(`/booking/reference/${reference}`, {
      method: 'GET',
    })
  },

  getAll: async (params?: { status?: string; page?: number; limit?: number }) => {
    const queryParams = new URLSearchParams()
    if (params?.status) queryParams.append('status', params.status)
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())

    const query = queryParams.toString()
    return apiRequest<any>(`/booking${query ? `?${query}` : ''}`, {
      method: 'GET',
    })
  },

  getById: async (id: string, email?: string) => {
    const query = email ? `?email=${encodeURIComponent(email)}` : ''
    return apiRequest(`/booking/${id}${query}`, {
      method: 'GET',
    })
  },

  update: async (id: string, data: { status?: string }) => {
    return apiRequest(`/booking/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  confirm: async (id: string) => {
    return apiRequest(`/booking/${id}/confirm`, {
      method: 'PATCH',
    })
  },

  cancel: async (id: string) => {
    return apiRequest(`/booking/${id}/cancel`, {
      method: 'PATCH',
    })
  },

  delete: async (id: string) => {
    return apiRequest(`/booking/${id}`, {
      method: 'DELETE',
    })
  },
}

// Guest APIs
export const guestApi = {
  create: async (data: {
    fullName: string
    email: string
    phone: string
    address?: string
    visitDate: string
    accommodationType: string
    notes?: string
  }) => {
    return apiRequest('/guest', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  getAll: async (params?: { status?: string; page?: number; limit?: number }) => {
    const queryParams = new URLSearchParams()
    if (params?.status) queryParams.append('status', params.status)
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())

    const query = queryParams.toString()
    return apiRequest<any>(`/guest${query ? `?${query}` : ''}`, {
      method: 'GET',
    })
  },

  getStatistics: async () => {
    return apiRequest('/guest/statistics', {
      method: 'GET',
    })
  },

  getById: async (id: string) => {
    return apiRequest(`/guest/${id}`, {
      method: 'GET',
    })
  },

  update: async (id: string, data: { status?: string; notes?: string }) => {
    return apiRequest(`/guest/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  delete: async (id: string) => {
    return apiRequest(`/guest/${id}`, {
      method: 'DELETE',
    })
  },
}

// Payment APIs
export const paymentApi = {
  create: async (data: {
    bookingId: string
    guestName: string
    amount: number
    paymentDate: string
    paymentMethod: string
    referenceTransactionId?: string
    description?: string
    status?: string
  }) => {
    return apiRequest('/payment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  getAll: async (params?: { status?: string; page?: number; limit?: number }) => {
    const queryParams = new URLSearchParams()
    if (params?.status) queryParams.append('status', params.status)
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())

    const query = queryParams.toString()
    return apiRequest<any>(`/payment${query ? `?${query}` : ''}`, {
      method: 'GET',
    })
  },

  getStatistics: async (params?: { startDate?: string; endDate?: string }) => {
    const queryParams = new URLSearchParams()
    if (params?.startDate) queryParams.append('startDate', params.startDate)
    if (params?.endDate) queryParams.append('endDate', params.endDate)

    const query = queryParams.toString()
    return apiRequest(`/payment/statistics${query ? `?${query}` : ''}`, {
      method: 'GET',
    })
  },

  getByBookingId: async (bookingId: string) => {
    return apiRequest(`/payment/booking/${bookingId}`, {
      method: 'GET',
    })
  },

  getById: async (id: string) => {
    return apiRequest(`/payment/${id}`, {
      method: 'GET',
    })
  },

  update: async (id: string, data: { status?: string; description?: string }) => {
    return apiRequest(`/payment/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  delete: async (id: string) => {
    return apiRequest(`/payment/${id}`, {
      method: 'DELETE',
    })
  },
}

