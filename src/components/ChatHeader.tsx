import React from 'react';
import { Leaf, Trash2 } from 'lucide-react';

interface ChatHeaderProps {
  onClear: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClear }) => {
  return (
    <div className="text-center mb-8 pt-8 md:pt-12 relative">
      <div className="flex items-center justify-center gap-2 mb-2">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 flex items-center">
          <span className="text-green-600 mr-2"><Leaf size={28} /></span>
          SylvAI
        </h1>
      </div>
      <p className="text-xl md:text-2xl text-gray-600 font-light">
        How can I help you today?
      </p>
      <button
        onClick={onClear}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-red-500 transition-colors"
        title="Clear conversation"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default ChatHeader