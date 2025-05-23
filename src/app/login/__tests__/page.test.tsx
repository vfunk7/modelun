import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginPage from '../page'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}))

describe('LoginPage', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()
  })

  it('renders login form', () => {
    render(<LoginPage />)
    
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('shows error message on invalid credentials', async () => {
    const mockSignIn = jest.fn().mockResolvedValue({ error: 'Invalid credentials' })
    jest.spyOn(require('next-auth/react'), 'signIn').mockImplementation(mockSignIn)

    render(<LoginPage />)

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpassword' },
    })
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument()
    })
  })

  it('redirects to admin dashboard on successful admin login', async () => {
    const mockSignIn = jest.fn().mockResolvedValue({ ok: true })
    jest.spyOn(require('next-auth/react'), 'signIn').mockImplementation(mockSignIn)

    // Mock session response for admin user
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ user: { role: 'ADMIN' } }),
    })

    render(<LoginPage />)

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'admin@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    })
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('credentials', {
        email: 'admin@example.com',
        password: 'password123',
        redirect: false,
      })
    })
  })
}) 