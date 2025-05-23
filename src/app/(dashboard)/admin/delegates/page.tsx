'use client';

import { useState, useEffect } from 'react';

interface Delegate {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  numberOfConferences: number;
  awards: string;
  committeePreferences: string;
  committee?: {
    id: string;
    name: string;
  };
  country?: {
    id: string;
    name: string;
  };
}

export default function DelegatesPage() {
  const [delegates, setDelegates] = useState<Delegate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchDelegates();
  }, []);

  const fetchDelegates = async () => {
    try {
      const response = await fetch('/api/admin/delegates');
      if (!response.ok) {
        throw new Error('Failed to fetch delegates');
      }
      const data = await response.json();
      setDelegates(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch delegates');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (delegateId: string) => {
    if (!confirm('Are you sure you want to delete this delegate? This action cannot be undone.')) {
      return;
    }

    setDeletingId(delegateId);
    try {
      const response = await fetch(`/api/admin/delegates/${delegateId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete delegate');
      }

      // Remove the deleted delegate from the list
      setDelegates(delegates.filter(d => d.id !== delegateId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete delegate');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Delegates</h1>
          <button
            onClick={async () => {
              const res = await fetch('/api/admin/delegates?format=csv');
              const blob = await res.blob();
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'delegates.csv';
              document.body.appendChild(a);
              a.click();
              a.remove();
              window.URL.revokeObjectURL(url);
            }}
            className="ml-4 px-4 py-2 bg-[#010f71] text-white rounded-md font-semibold shadow hover:bg-[#010f71]/90 transition"
          >
            Export to Google Sheets
          </button>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {delegates.map((delegate) => (
              <li key={delegate.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {delegate.user.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{delegate.user.email}</p>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <span>Previous Conferences: {delegate.numberOfConferences}</span>
                    </div>
                    <div className="mt-1">
                      <h4 className="text-sm font-medium text-gray-500">Awards:</h4>
                      <ul className="mt-1 text-sm text-gray-500 list-disc list-inside">
                        {JSON.parse(delegate.awards).map((award: string, index: number) => (
                          <li key={index}>{award}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-1">
                      <h4 className="text-sm font-medium text-gray-500">Committee Preferences:</h4>
                      <ol className="mt-1 text-sm text-gray-500 list-decimal list-inside">
                        {(() => {
                          let prefs: string[] = [];
                          try {
                            const parsed = JSON.parse(delegate.committeePreferences || '[]');
                            prefs = Array.isArray(parsed) ? parsed : [parsed];
                          } catch {
                            prefs = (delegate.committeePreferences || '').split(',');
                          }
                          prefs = prefs
                            .map((pref: string) =>
                              typeof pref === 'string'
                                ? pref.trim()
                                : ''
                            )
                            .filter((pref: string) => pref.length > 0 && pref.toLowerCase() !== 'null' && pref.toLowerCase() !== 'undefined');
                          if (prefs.length === 0) {
                            return <li className="italic text-gray-400">No preferences set</li>;
                          }
                          return prefs.map((pref: string, index: number) => (
                            <li key={index}>{index + 1}. {pref}</li>
                          ));
                        })()}
                      </ol>
                    </div>
                    <div className="mt-2">
                      <h4 className="text-sm font-medium text-gray-500">Current Assignment:</h4>
                      <div className="mt-1 text-sm text-gray-500">
                        <p>Committee: {delegate.committee?.name || 'Not assigned'}</p>
                        <p>Country: {delegate.country?.name || 'Not assigned'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <button
                      onClick={() => handleDelete(delegate.id)}
                      disabled={deletingId === delegate.id}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 disabled:opacity-50"
                    >
                      {deletingId === delegate.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 