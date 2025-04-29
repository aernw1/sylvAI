import React, { createContext, useContext } from 'react';
import { ChatContextType } from '../types';
import { useChatbot } from '../hooks/useChatbot';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ActionButtons from './ActionButtons';
import Footer from './Footer';
import EcoMetrics from './EcoMetrics';
import ChatThreads from './ChatThreads';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

const ChatInterface: React.FC = () => {
  const chatbot = useChatbot();
  
  return (
    <ChatContext.Provider value={chatbot}>
      <div className="flex flex-col h-screen bg-gray-50">
        <EcoMetrics totalTokens={chatbot.totalTokens} />
        <ChatThreads />
        <ChatHeader onClear={chatbot.clearConversation} />
        
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full overflow-hidden">
          <MessageList 
            messages={chatbot.messages} 
            isTyping={chatbot.isTyping}
          />
          
          <ActionButtons />
          
          <MessageInput 
            value={chatbot.inputValue}
            onChange={chatbot.setInputValue}
            onSend={chatbot.sendMessage}
            isLoading={chatbot.isLoading}
          />
          
          <Footer />
        </div>
      </div>
    </ChatContext.Provider>
  );
};

export default ChatInterface;