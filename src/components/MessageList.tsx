import React, { useRef, useEffect } from 'react';
import { Message as MessageType } from '../types';
import Message from './Message';
import { Loader2 } from 'lucide-react';

interface MessageListProps {
  messages: MessageType[];
  isTyping: boolean;
  darkMode: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isTyping, darkMode }) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Scroll to bottom when messages change or typing status changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);
  
  return (
    <div className="flex-1 overflow-y-auto px-4 py-2">
      <div className="max-w-3xl mx-auto">
        {messages.map((message) => (
          <Message key={message.id} message={message} darkMode={darkMode} />
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 text-gray-500 animate-pulse pl-11 mt-2">
            <Loader2 size={16} className="animate-spin" />
            <span className="text-sm">Typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList