import React, { useState } from 'react';
import { MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';

interface Thread {
  id: string;
  title: string;
  date: string;
}

const ChatThreads: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const threads: Thread[] = [
    { id: '1', title: 'SylvAI Eco-Friendly Chatbot Interface', date: 'Today' },
    { id: '2', title: 'Sustainable Development Discussion', date: 'Today' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-40 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors z-50"
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      <div className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out z-40 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`} style={{ width: '280px' }}>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MessageSquare size={20} className="text-green-600" />
            Your Chats
          </h2>
          
          <div className="space-y-2">
            {threads.map(thread => (
              <button
                key={thread.id}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <p className="text-sm text-gray-500">{thread.date}</p>
                <p className="text-sm font-medium text-gray-800">{thread.title}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatThreads;