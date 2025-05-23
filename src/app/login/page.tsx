"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/admin');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#010f71]/5 to-[#010f71]/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-[#010f71] mb-6 text-center font-['Roboto_Condensed']">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 font-['Roboto_Condensed']">Admin Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#010f71] focus:border-transparent font-['Roboto_Condensed']"
            />
          </div>
          {error && <div className="text-red-600 text-center font-['Roboto_Condensed']">{error}</div>}
          <button
            type="submit"
            className="w-full bg-[#010f71] text-white py-3 rounded-lg font-bold hover:bg-[#010f71]/90 transition font-['Roboto_Condensed']"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
} 