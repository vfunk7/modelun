'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface PositionPaper {
  positionPaper: string | null;
}

export default function PapersPage() {
  const router = useRouter();
  const [positionPaper, setPositionPaper] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [link, setLink] = useState('');

  useEffect(() => {
    fetchPositionPaper();
  }, []);

  const fetchPositionPaper = async () => {
    try {
      const response = await fetch('/api/delegate/papers', {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch position paper');
      }
      const data: PositionPaper = await response.json();
      setPositionPaper(data.positionPaper);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch position paper');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/delegate/papers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit position paper');
      }

      router.push('/delegate');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit position paper');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Submit Position Paper</h1>

          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/50 border-l-4 border-red-400">
              <p className="text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {positionPaper ? (
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Current Position Paper</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Link to Position Paper: {positionPaper}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                (Google Document with viewer permissions for all people with the link)
              </p>
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400 mb-6">No position paper uploaded yet.</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="link" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Google Docs Link
              </label>
              <input
                type="text"
                id="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://docs.google.com/document/d/..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                required
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Please provide a link to your position paper in Google Docs with viewer permissions enabled for all people with the link.
              </p>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 