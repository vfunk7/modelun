"use client";
import { useState } from 'react';

interface Registration {
  id: string;
  name: string;
  email: string;
  school: string;
  grade: string;
  numberOfConferences: number;
  committeePreferences: string;
  createdAt?: string;
}

export default function AdminRegistrationsTable({ registrations: initialRegistrations }: { registrations: Registration[] }) {
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const res = await fetch('/api/registrations', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setRegistrations(registrations.filter((reg) => reg.id !== id));
      setMessage('Registration deleted successfully.');
    } else {
      setMessage('Failed to delete registration.');
    }
    setDeletingId(null);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleExportCSV = async () => {
    const res = await fetch('/api/registrations?format=csv');
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'registrations.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold font-['Roboto_Condensed']">Registrations</h2>
        <button
          onClick={handleExportCSV}
          className="px-4 py-2 bg-[#010f71] text-white rounded-md font-semibold shadow hover:bg-[#010f71]/90 transition font-['Roboto_Condensed']"
        >
          Export CSV
        </button>
      </div>
      {message && <div className="mb-4 text-center text-[#010f71] font-bold font-['Roboto_Condensed']">{message}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-[900px] border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-[#f5f7fa]">
              <th className="p-2 border font-['Roboto_Condensed']">Name</th>
              <th className="p-2 border font-['Roboto_Condensed']">Email</th>
              <th className="p-2 border font-['Roboto_Condensed']">School</th>
              <th className="p-2 border font-['Roboto_Condensed']">Grade</th>
              <th className="p-2 border font-['Roboto_Condensed']">Conferences</th>
              <th className="p-2 border font-['Roboto_Condensed']">1st Preference</th>
              <th className="p-2 border font-['Roboto_Condensed']">2nd Preference</th>
              <th className="p-2 border font-['Roboto_Condensed']">3rd Preference</th>
              <th className="p-2 border font-['Roboto_Condensed']">Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => {
              let prefs: string[] = [];
              try {
                prefs = JSON.parse(reg.committeePreferences || '[]');
              } catch {
                prefs = [];
              }
              return (
                <tr key={reg.id}>
                  <td className="p-2 border font-['Roboto_Condensed']">{reg.name}</td>
                  <td className="p-2 border font-['Roboto_Condensed']">{reg.email}</td>
                  <td className="p-2 border font-['Roboto_Condensed']">{reg.school}</td>
                  <td className="p-2 border font-['Roboto_Condensed']">{reg.grade}</td>
                  <td className="p-2 border font-['Roboto_Condensed']">{reg.numberOfConferences}</td>
                  <td className="p-2 border font-['Roboto_Condensed']">{prefs[0] || ''}</td>
                  <td className="p-2 border font-['Roboto_Condensed']">{prefs[1] || ''}</td>
                  <td className="p-2 border font-['Roboto_Condensed']">{prefs[2] || ''}</td>
                  <td className="p-2 border font-['Roboto_Condensed']">
                    <button
                      onClick={() => handleDelete(reg.id)}
                      disabled={deletingId === reg.id}
                      className="text-red-600 hover:underline font-bold disabled:opacity-50"
                    >
                      {deletingId === reg.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
} 