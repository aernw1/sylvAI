import React from 'react';
import { Leaf, Trash2, Sun, Moon } from 'lucide-react';

interface ChatHeaderProps {
  onClear: () => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClear, darkMode, setDarkMode }) => {
  return (
    <div className="text-center mb-8 pt-8 md:pt-12 relative">
      <div className="flex items-center justify-center gap-2 mb-2">
        <h1 className={`text-2xl md:text-3xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'} flex items-center`}>
          <span className="text-green-400 mr-2"><Leaf size={28} /></span>
          SylvAI
        </h1>
      </div>
      <p className={`text-xl md:text-2xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} font-light`}>
        How can I help you today?
      </p>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full transition-colors ${
            darkMode 
              ? 'text-yellow-400 hover:bg-gray-800' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button
          onClick={onClear}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          title="Clear conversation"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;