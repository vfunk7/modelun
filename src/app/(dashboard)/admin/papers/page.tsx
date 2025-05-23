'use client';

import { useState, useEffect } from 'react';

interface PositionPaper {
  id: string;
  positionPaper: string | null;
  user: {
    name: string;
    email: string;
  };
  committee: {
    name: string;
  } | null;
  country: {
    name: string;
  } | null;
}

export default function AdminPapersPage() {
  const [papers, setPapers] = useState<PositionPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    try {
      const response = await fetch('/api/admin/papers', {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch position papers');
      }

      const data = await response.json();
      setPapers(data);
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

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Position Papers</h1>

          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/50 border-l-4 border-red-400">
              <p className="text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            {papers.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">No position papers submitted yet.</p>
            ) : (
              papers.map((paper) => (
                <div
                  key={paper.id}
                  className="border dark:border-gray-700 rounded-lg p-4 space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                        {paper.user.name}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {paper.user.email}
                      </p>
                    </div>
                    <div className="text-right">
                      {paper.committee && (
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Committee: {paper.committee.name}
                        </p>
                      )}
                      {paper.country && (
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Country: {paper.country.name}
                        </p>
                      )}
                    </div>
                  </div>
                  {paper.positionPaper ? (
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
                      <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                        {paper.positionPaper}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 italic">
                      No position paper submitted yet.
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 