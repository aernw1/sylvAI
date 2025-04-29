import React from 'react';
import { Message as MessageType } from '../types';
import { Bot, User } from 'lucide-react';

interface MessageProps {
  message: MessageType;
  darkMode: boolean;
}

const Message: React.FC<MessageProps> = ({ message, darkMode }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div 
      className={`flex items-start gap-3 mb-4 animate-fadeIn ${isBot ? '' : 'flex-row-reverse'}`}
    >
      <div 
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isBot 
            ? darkMode ? 'bg-green-900' : 'bg-green-100'
            : darkMode ? 'bg-gray-800' : 'bg-gray-200'
        }`}
      >
        {isBot ? (
          <Bot size={18} className={darkMode ? 'text-green-400' : 'text-green-600'} />
        ) : (
          <User size={18} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
        )}
      </div>
      
      <div 
        className={`py-3 px-4 rounded-2xl max-w-[80%] md:max-w-[70%] ${
          isBot 
            ? darkMode 
              ? 'bg-gray-800 border border-gray-700 text-gray-100' 
              : 'bg-white border border-gray-200 text-gray-900'
            : 'bg-green-600 text-white ml-auto'
        }`}
      >
        <p className="leading-relaxed">{message.content}</p>
      </div>
    </div>
  );
};

export default Message;