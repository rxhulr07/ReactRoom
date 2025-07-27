import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleGetStarted = () => {
    if (session) {
      // Create a new session and redirect to it
      fetch('/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `Session ${new Date().toLocaleDateString()}`,
        }),
      })
      .then(response => response.json())
      .then(newSession => {
        router.push(`/session/${newSession._id}`);
      })
      .catch(error => {
        console.error('Error creating session:', error);
      });
    } else {
      // Redirect to sign in
      router.push('/auth/signin');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              React Room
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              AI-Powered Component Generator
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Create, preview, and export React components using natural language. 
              Your AI assistant will generate clean, modern components with CSS styling.
            </p>
          </div>

          <div className="space-y-6">
            <button
              onClick={handleGetStarted}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              {session ? 'Start Creating' : 'Get Started'}
            </button>

            {!session && (
              <p className="text-gray-500">
                Sign in to start creating components with AI
              </p>
            )}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-3xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2">Chat with AI</h3>
              <p className="text-gray-600">
                Describe your component in natural language and let AI generate it for you.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-3xl mb-4">👁️</div>
              <h3 className="text-xl font-semibold mb-2">Live Preview</h3>
              <p className="text-gray-600">
                See your components rendered in real-time with instant updates.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-3xl mb-4">💾</div>
              <h3 className="text-xl font-semibold mb-2">Save & Export</h3>
              <p className="text-gray-600">
                Save your work and export clean, production-ready code.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
