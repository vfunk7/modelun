'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface DelegateProfile {
  id: string;
  numberOfConferences: number;
  awards: string | null;
  committeePreferences: string | null;
  committee: {
    id: string;
    name: string;
  } | null;
  country: {
    id: string;
    name: string;
  } | null;
}

interface PositionPaper {
  id: string;
  positionPaper: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function DelegateDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<DelegateProfile | null>(null);
  const [papers, setPapers] = useState<PositionPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
    fetchPapers();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/delegate/profile');
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      const data = await response.json();
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    }
  };

  const fetchPapers = async () => {
    try {
      const response = await fetch('/api/delegate/papers');
      if (!response.ok) {
        throw new Error('Failed to fetch position papers');
      }
      const data = await response.json();
      setPapers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch position papers');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Delegate Dashboard</h1>
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400">Please complete your profile first.</p>
              <button
                onClick={() => router.push('/delegate/profile')}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Complete Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Delegate Dashboard</h1>

          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/50 border-l-4 border-red-400">
              <p className="text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="border dark:border-gray-700 rounded-lg p-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Committee Assignment</h2>
              {profile.committee ? (
                <p className="text-gray-600 dark:text-gray-400">{profile.committee.name}</p>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic">Not assigned yet</p>
              )}
            </div>

            <div className="border dark:border-gray-700 rounded-lg p-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Country Assignment</h2>
              {profile.country ? (
                <p className="text-gray-600 dark:text-gray-400">{profile.country.name}</p>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic">Not assigned yet</p>
              )}
            </div>
          </div>

          <div className="border dark:border-gray-700 rounded-lg p-4 mb-8">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Committee Preferences</h2>
            {profile.committeePreferences ? (
              <div className="space-y-2">
                {profile.committeePreferences
                  .replace(/["\d.]/g, '') // Remove quotes, numbers, and dots
                  .split(',')
                  .map((pref, index) => (
                    <p key={index} className="text-gray-600 dark:text-gray-400">
                      {index + 1}. {pref.trim()}
                    </p>
                  ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">No preferences set</p>
            )}
          </div>

          <div className="border dark:border-gray-700 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Position Papers</h2>
            {papers.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 italic">No position papers submitted yet.</p>
            ) : (
              <div className="space-y-4">
                {papers.map((paper) => (
                  <div key={paper.id} className="border dark:border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Submitted: {new Date(paper.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Last updated: {new Date(paper.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {paper.positionPaper && (
                      <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-md">
                        <p className="text-gray-700 dark:text-gray-300">
                          Link to Position Paper: {paper.positionPaper}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          (Google Document with viewer permissions for all people with the link)
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4">
              <button
                onClick={() => router.push('/delegate/papers')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit Position Paper
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 