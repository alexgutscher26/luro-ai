import '@testing-library/jest-dom'
import 'jest-axe/extend-expect'
import { setupTest, cleanupTest } from './src/__tests__/utils/setup-tests'

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Setup before each test
beforeEach(() => {
  setupTest()
})

// Cleanup after each test
afterEach(() => {
  cleanupTest()
})

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn()
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  }
}))

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  }
}))

// Mock Clerk
jest.mock('@clerk/nextjs', () => ({
  useAuth: () => ({
    isSignedIn: true,
    isLoaded: true,
    user: {
      id: 'user_123',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe'
    }
  }),
  useUser: () => ({
    user: {
      id: 'user_123',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe'
    },
    isLoaded: true
  }),
  ClerkProvider: ({ children }) => children,
  SignInButton: ({ children }) => <button>{children}</button>,
  SignUpButton: ({ children }) => <button>{children}</button>,
  UserButton: () => <button>User Menu</button>
}))
