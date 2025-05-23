import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminRegistrationsTable from '../../components/AdminRegistrationsTable';

async function getRegistrations() {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const res = await fetch(`${protocol}://${host}/api/registrations`, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return data.registrations || [];
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  
  if (!session || session.value !== 'valid') {
    redirect('/login');
  }

  const registrations = await getRegistrations();

  return (
    <div className="max-w-4xl mx-auto p-8 font-['Roboto_Condensed']">
      <h1 className="text-3xl font-bold mb-6 text-[#010f71]">Admin Panel</h1>
      <form action="/api/logout" method="POST" className="mb-8">
        <button type="submit" className="bg-[#010f71] text-white px-4 py-2 rounded font-bold hover:bg-[#010f71]/90 transition font-['Roboto_Condensed']">Log Out</button>
      </form>
      <AdminRegistrationsTable registrations={registrations} />
    </div>
  );
} 