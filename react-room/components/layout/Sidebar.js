import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Sidebar() {
  const { data: session } = useSession();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetchSessions();
    }
  }, [session]);

  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/sessions');
      if (response.ok) {
        const data = await response.json();
        setSessions(data.sessions);
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const createNewSession = async () => {
    try {
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `Session ${new Date().toLocaleDateString()}`,
        }),
      });
      
      if (response.ok) {
        const newSession = await response.json();
        setSessions([newSession, ...sessions]);
        // Redirect to the new session
        window.location.href = `/session/${newSession._id}`;
      }
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 h-screen">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Sessions</h2>
          <button
            onClick={createNewSession}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
          >
            New
          </button>
        </div>
        
        {loading ? (
          <div className="animate-pulse space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 bg-gray-200 rounded"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {sessions.map((session) => (
              <Link
                key={session._id}
                href={`/session/${session._id}`}
                className="block p-2 rounded hover:bg-gray-100 text-sm text-gray-700"
              >
                {session.name}
              </Link>
            ))}
            {sessions.length === 0 && (
              <p className="text-gray-500 text-sm">No sessions yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 