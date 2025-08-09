// Mock user data
export const mockUser = {
  id: 'user_123',
  email: 'test@example.com',
  firstName: 'John',
  lastName: 'Doe',
  imageUrl: 'https://example.com/avatar.jpg',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01')
}

// Mock authentication data
export const mockAuth = {
  isSignedIn: true,
  isLoaded: true,
  user: mockUser,
  signOut: () => Promise.resolve(),
  signIn: () => Promise.resolve()
}

// Mock form data
export const mockSignInData = {
  email: 'test@example.com',
  password: 'password123'
}

export const mockSignUpData = {
  email: 'newuser@example.com',
  password: 'password123',
  firstName: 'Jane',
  lastName: 'Smith'
}

// Mock API responses
export const mockApiResponse = {
  success: {
    status: 200,
    data: { message: 'Success' },
    ok: true
  },
  error: {
    status: 400,
    data: { error: 'Bad Request' },
    ok: false
  },
  unauthorized: {
    status: 401,
    data: { error: 'Unauthorized' },
    ok: false
  }
}

// Mock dashboard data
export const mockDashboardData = {
  stats: {
    totalUsers: 1250,
    activeUsers: 890,
    revenue: 45000,
    growth: 12.5
  },
  recentActivity: [
    {
      id: '1',
      type: 'user_signup',
      message: 'New user registered',
      timestamp: new Date('2024-01-15T10:30:00Z')
    },
    {
      id: '2',
      type: 'payment',
      message: 'Payment received',
      timestamp: new Date('2024-01-15T09:15:00Z')
    }
  ]
}

// Mock navigation data
export const mockNavigation = {
  currentPath: '/',
  previousPath: null,
  isLoading: false
}