import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { password } = await request.json();
  
  if (password === 'dragonmun2024') {
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_session', 'valid', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });
    return response;
  }
  
  return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
} 