import React from 'react';
import { Message as MessageType } from '../types';
import { Bot, User } from 'lucide-react';

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div 
      className={`flex items-start gap-3 mb-4 animate-fadeIn ${isBot ? '' : 'flex-row-reverse'}`}
    >
      <div 
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isBot ? 'bg-green-100' : 'bg-gray-100'
        }`}
      >
        {isBot ? (
          <Bot size={18} className="text-green-600" />
        ) : (
          <User size={18} className="text-gray-600" />
        )}
      </div>
      
      <div 
        className={`py-3 px-4 rounded-2xl max-w-[80%] md:max-w-[70%] ${
          isBot 
            ? 'bg-white border border-green-100 text-gray-800' 
            : 'bg-green-600 text-white ml-auto'
        }`}
      >
        <p className="leading-relaxed">{message.content}</p>
      </div>
    </div>
  );
};

export default Message;