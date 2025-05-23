import { POST } from '../route'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

// Mock PrismaClient
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => ({
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    $transaction: jest.fn((callback) => callback({
      user: {
        create: jest.fn(),
      },
      delegateProfile: {
        create: jest.fn(),
      },
    })),
  })),
}))

// Mock bcrypt
jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword'),
}))

describe('Registration API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns 400 if required fields are missing', async () => {
    const request = new Request('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: '',
        email: '',
        password: '',
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
    expect(await response.text()).toBe('Missing required fields')
  })

  it('returns 400 if user already exists', async () => {
    const prisma = new PrismaClient()
    prisma.user.findUnique = jest.fn().mockResolvedValue({ id: '1', email: 'test@example.com' })

    const request = new Request('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
    expect(await response.text()).toBe('User already exists')
  })

  it('creates new user and delegate profile successfully', async () => {
    const prisma = new PrismaClient()
    prisma.user.findUnique = jest.fn().mockResolvedValue(null)
    prisma.user.create = jest.fn().mockResolvedValue({
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      role: 'DELEGATE',
    })

    const request = new Request('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        numberOfConferences: 2,
        awards: ['Best Delegate'],
        committeePreferences: ['WHA'],
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty('id')
    expect(data).toHaveProperty('name', 'Test User')
    expect(data).toHaveProperty('email', 'test@example.com')
    expect(data).not.toHaveProperty('password')
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10)
  })
}) 