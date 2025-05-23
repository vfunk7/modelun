import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, school, grade, numberOfConferences, committeePreferences } = body;
    if (!name || !email || !school || !grade) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    // Check for duplicate email
    const existing = await prisma.registration.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'A registration with this email already exists.' }, { status: 400 });
    }
    const registration = await prisma.registration.create({
      data: {
        name,
        email,
        school,
        grade,
        numberOfConferences: Number(numberOfConferences) || 0,
        committeePreferences,
      },
    });
    return NextResponse.json({ success: true, registration });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: (error as any)?.message || 'Registration failed' }, { status: 500 });
  }
} 