import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Parser } from 'json2csv';
import { format } from 'date-fns';

const prisma = new PrismaClient();
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const registrations = await prisma.registration.findMany({ orderBy: { createdAt: 'desc' } });
  if (searchParams.get('format') === 'csv') {
    // Explicitly construct export data with only the desired fields
    const data = registrations.map((reg) => {
      let prefs: string[] = [];
      try {
        prefs = JSON.parse(reg.committeePreferences || '[]');
      } catch {
        prefs = [];
      }
      return {
        name: reg.name,
        email: reg.email,
        school: reg.school,
        grade: reg.grade,
        numberOfConferences: reg.numberOfConferences,
        '1st Preference': prefs[0] || '',
        '2nd Preference': prefs[1] || '',
        '3rd Preference': prefs[2] || '',
        createdAt: reg.createdAt ? format(new Date(reg.createdAt), 'yyyy-MM-dd HH:mm:ss') : '',
      };
    });
    const parser = new Parser({ fields: ['name', 'email', 'school', 'grade', 'numberOfConferences', '1st Preference', '2nd Preference', '3rd Preference', 'createdAt'] });
    const csv = parser.parse(data);
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="registrations.csv"',
      },
    });
  }
  return NextResponse.json({ registrations });
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    await prisma.registration.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
} 