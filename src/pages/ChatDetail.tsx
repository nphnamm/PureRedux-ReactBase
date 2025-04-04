import React from 'react';
import { useParams } from 'react-router-dom';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

const ChatDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock data - replace with actual data from your backend
  const messages: Message[] = [
    {
      id: '1',
      content: 'Hi, I need help with my React project.',
      sender: 'user',
      timestamp: '10:00 AM',
    },
    {
      id: '2',
      content: 'Of course! I\'d be happy to help. What specific aspects of your React project would you like to discuss?',
      sender: 'ai',
      timestamp: '10:01 AM',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Conversation #{id}</h1>
        
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-4 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p>{message.content}</p>
                <span className={`text-sm ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                } block mt-2`}>
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail; 