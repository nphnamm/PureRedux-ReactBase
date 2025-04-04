import React from 'react';
import { Link } from 'react-router-dom';

interface ChatConversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

const Chat: React.FC = () => {
  // Mock data - replace with actual data from your backend
  const conversations: ChatConversation[] = [
    {
      id: '1',
      title: 'Project Discussion',
      lastMessage: 'How can I help you with your project?',
      timestamp: '2024-03-22 10:00 AM',
    },
    {
      id: '2',
      title: 'Code Review',
      lastMessage: 'Let\'s review your code together.',
      timestamp: '2024-03-22 09:30 AM',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Chat Conversations</h1>
      <div className="grid gap-4">
        {conversations.map((conversation) => (
          <Link
            key={conversation.id}
            to={`/chat/${conversation.id}`}
            className="block p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-2">{conversation.title}</h2>
                <p className="text-gray-600">{conversation.lastMessage}</p>
              </div>
              <span className="text-sm text-gray-500">{conversation.timestamp}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Chat; 