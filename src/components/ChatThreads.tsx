import React, { useState } from 'react';
import { MessageSquare, ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { useChatContext } from './ChatInterface';

const ChatThreads: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { chats, currentChatId, createNewChat, switchChat, deleteChat } = useChatContext();

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 bottom-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors z-50"
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      <div className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out z-40 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`} style={{ width: '280px' }}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <MessageSquare size={20} className="text-green-600" />
              Your Chats
            </h2>
            <button
              onClick={createNewChat}
              className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
              title="New Chat"
            >
              <Plus size={20} />
            </button>
          </div>
          
          <div className="space-y-2">
            {chats.map(chat => (
              <div
                key={chat.id}
                className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                  currentChatId === chat.id 
                    ? 'bg-green-50 text-green-700' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <button
                  onClick={() => switchChat(chat.id)}
                  className="flex-1 text-left"
                >
                  <p className="text-sm font-medium">{chat.name}</p>
                  <p className="text-xs text-gray-500">
                    {chat.messages.length} messages
                  </p>
                </button>
                <button
                  onClick={() => deleteChat(chat.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                  title="Delete chat"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatThreads;