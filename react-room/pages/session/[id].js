import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Layout from '../../components/layout/Layout';
import ChatPanel from '../../components/chat/ChatPanel';
import ComponentPreview from '../../components/preview/ComponentPreview';

export default function SessionPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession();
  const [sessionData, setSessionData] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentCode, setCurrentCode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && session) {
      fetchSessionData();
    }
  }, [id, session]);

  const fetchSessionData = async () => {
    try {
      const response = await fetch(`/api/sessions/${id}`);
      if (response.ok) {
        const data = await response.json();
        setSessionData(data.session);
        setChatHistory(data.session.chatHistory || []);
        setCurrentCode(data.session.currentCode || null);
      } else if (response.status === 404) {
        router.push('/');
      }
    } catch (error) {
      console.error('Error fetching session:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMessageSent = async (message) => {
    const newChatHistory = [...chatHistory, message];
    setChatHistory(newChatHistory);
    
    // Auto-save session
    await saveSession(newChatHistory, currentCode);
  };

  const handleCodeGenerated = async (code) => {
    setCurrentCode(code);
    
    // Add AI response to chat history
    const aiMessage = {
      role: 'assistant',
      content: 'I\'ve generated the component based on your request. You can see it in the preview area.',
      timestamp: new Date().toISOString(),
    };
    
    const newChatHistory = [...chatHistory, aiMessage];
    setChatHistory(newChatHistory);
    
    // Auto-save session
    await saveSession(newChatHistory, code);
  };

  const saveSession = async (chatHistory, code) => {
    try {
      await fetch(`/api/sessions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatHistory,
          currentCode: code,
        }),
      });
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/');
    return null;
  }

  if (!sessionData) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500">Session not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex h-screen">
        {/* Main Preview Area */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">
              {sessionData.name}
            </h1>
          </div>
          <div className="flex-1">
            <ComponentPreview 
              code={currentCode} 
              onCodeChange={setCurrentCode}
            />
          </div>
        </div>
        
        {/* Chat Panel */}
        <div className="w-96">
          <ChatPanel
            sessionId={id}
            onCodeGenerated={handleCodeGenerated}
            chatHistory={chatHistory}
            onMessageSent={handleMessageSent}
          />
        </div>
      </div>
    </Layout>
  );
} 