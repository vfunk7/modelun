'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

interface Paper {
  id: string;
  content: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  delegateProfile: {
    user: {
      name: string;
      email: string;
    };
    assignedCommittee: {
      name: string;
    };
    assignedCountry: {
      name: string;
    };
  };
}

interface PaperListProps {
  papers: Paper[];
}

export default function PaperList({ papers: initialPapers }: PaperListProps) {
  const [papers, setPapers] = useState(initialPapers);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const handleStatusChange = async (paperId: string, newStatus: string) => {
    try {
      setLoading(paperId);
      const response = await fetch('/api/admin/papers/status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paperId,
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="mt-8">
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                Delegate
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Committee
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Country
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Last Updated
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {papers.map((paper) => (
              <tr key={paper.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                  <div className="font-medium text-gray-900">{paper.delegateProfile.user.name}</div>
                  <div className="text-gray-500">{paper.delegateProfile.user.email}</div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {paper.delegateProfile.assignedCommittee.name}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {paper.delegateProfile.assignedCountry.name}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <select
                    value={paper.status}
                    onChange={(e) => handleStatusChange(paper.id, e.target.value)}
                    disabled={loading === paper.id}
                    className={`rounded-md text-sm ${
                      paper.status === 'APPROVED'
                        ? 'text-green-800 bg-green-100'
                        : paper.status === 'REJECTED'
                        ? 'text-red-800 bg-red-100'
                        : 'text-yellow-800 bg-yellow-100'
                    }`}
                  >
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {formatDistanceToNow(new Date(paper.updatedAt), { addSuffix: true })}
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <button
                    onClick={() => setSelectedPaper(paper)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paper View Modal */}
      {selectedPaper && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">
                  Position Paper - {selectedPaper.delegateProfile.assignedCountry.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedPaper.delegateProfile.user.name} - {selectedPaper.delegateProfile.assignedCommittee.name}
                </p>
              </div>
              <button
                onClick={() => setSelectedPaper(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-4">
              <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700">
                {selectedPaper.content}
              </pre>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  handleStatusChange(selectedPaper.id, 'APPROVED');
                  setSelectedPaper(null);
                }}
                className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Approve
              </button>
              <button
                onClick={() => {
                  handleStatusChange(selectedPaper.id, 'REJECTED');
                  setSelectedPaper(null);
                }}
                className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Reject
              </button>
              <button
                onClick={() => setSelectedPaper(null)}
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 