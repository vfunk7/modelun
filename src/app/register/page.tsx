"use client";
import { useState } from 'react';
import Link from 'next/link';

const committees = [
  'Security Council',
  'Economic and Social Council',
  'Historical Crisis',
  'Commission on Crime Prevention and Criminal Justice',
  'Special Political and Decolonization Committee',
  'Human Rights Committee (Middle School Only)',
  'International Criminal Police Organization',
  'World Health Assembly'
];

const grades = [
  '6th Grade',
  '7th Grade',
  '8th Grade',
  '9th Grade',
  '10th Grade',
  '11th Grade',
  '12th Grade',
];

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    school: '',
    grade: '',
    numberOfConferences: '',
    committeePreference1: '',
    committeePreference2: '',
    committeePreference3: '',
  });
  const [status, setStatus] = useState<'idle'|'success'|'error'>('idle');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setError('');
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        school: form.school,
        grade: form.grade,
        numberOfConferences: parseInt(form.numberOfConferences) || 0,
        committeePreferences: JSON.stringify([
          form.committeePreference1,
          form.committeePreference2,
          form.committeePreference3,
        ].filter(Boolean)),
      }),
    });
    if (res.ok) {
      setStatus('success');
      setForm({
        name: '', email: '', school: '', grade: '', numberOfConferences: '',
        committeePreference1: '', committeePreference2: '', committeePreference3: ''
      });
    } else {
      setStatus('error');
      const data = await res.json().catch(() => ({}));
      setError(data.error || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#010f71]/5 to-[#010f71]/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-[#010f71] mb-6 text-center font-['Roboto_Condensed']">Register for DragonMUN</h1>
        <p className="text-gray-600 mb-8 text-center font-['Roboto_Condensed']">Join us for an unforgettable Model United Nations experience.</p>
        {status === 'success' ? (
          <div className="text-green-700 text-center font-bold font-['Roboto_Condensed'] text-xl py-8">Registration successful! Thank you for signing up.</div>
        ) : status === 'error' ? (
          <div className="text-red-700 text-center font-bold font-['Roboto_Condensed'] text-xl py-8">{error}</div>
        ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 font-['Roboto_Condensed']">Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} required placeholder="Full Name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#010f71] focus:border-transparent font-['Roboto_Condensed']" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 font-['Roboto_Condensed']">Email</label>
            <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="Email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#010f71] focus:border-transparent font-['Roboto_Condensed']" />
          </div>
          <div>
            <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1 font-['Roboto_Condensed']">School</label>
            <input name="school" value={form.school} onChange={handleChange} required placeholder="School" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#010f71] focus:border-transparent font-['Roboto_Condensed']" />
          </div>
          <div>
            <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1 font-['Roboto_Condensed']">Grade</label>
            <select name="grade" value={form.grade} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#010f71] focus:border-transparent font-['Roboto_Condensed']">
              <option value="">Select grade</option>
              {grades.map((grade) => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="numberOfConferences" className="block text-sm font-medium text-gray-700 mb-1 font-['Roboto_Condensed']">Number of MUN Conferences Attended</label>
            <input name="numberOfConferences" value={form.numberOfConferences} onChange={handleChange} required type="number" min="0" placeholder="Number of MUN Conferences Attended" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#010f71] focus:border-transparent font-['Roboto_Condensed']" />
          </div>
          <div>
            <label htmlFor="committeePreference1" className="block text-sm font-medium text-gray-700 mb-1 font-['Roboto_Condensed']">1st Committee Preference</label>
            <select name="committeePreference1" value={form.committeePreference1} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#010f71] focus:border-transparent font-['Roboto_Condensed']">
              <option value="">Select a committee</option>
              {committees.map((committee) => (
                <option key={committee} value={committee}>{committee}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="committeePreference2" className="block text-sm font-medium text-gray-700 mb-1 font-['Roboto_Condensed']">2nd Committee Preference</label>
            <select name="committeePreference2" value={form.committeePreference2} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#010f71] focus:border-transparent font-['Roboto_Condensed']">
              <option value="">Select a committee</option>
              {committees.map((committee) => (
                <option key={committee} value={committee}>{committee}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="committeePreference3" className="block text-sm font-medium text-gray-700 mb-1 font-['Roboto_Condensed']">3rd Committee Preference</label>
            <select name="committeePreference3" value={form.committeePreference3} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#010f71] focus:border-transparent font-['Roboto_Condensed']">
              <option value="">Select a committee</option>
              {committees.map((committee) => (
                <option key={committee} value={committee}>{committee}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="w-full bg-[#010f71] text-white py-3 rounded-lg font-bold hover:bg-[#010f71]/90 transition font-['Roboto_Condensed']">Submit Registration</button>
        </form>
        )}
        <div className="mt-8 text-center">
          <Link href="/admin" className="text-[#010f71] hover:underline font-['Roboto_Condensed'] text-sm">Log in as Admin to View Registrations</Link>
        </div>
      </div>
    </div>
  );
} 