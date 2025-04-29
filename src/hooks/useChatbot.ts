import { useState, useCallback, useEffect } from 'react';
import { Message, Chat } from '../types';

const STORAGE_KEY = 'sylvai-messages';
const CHATS_STORAGE_KEY = 'sylvai-chats';

// Rough estimate of tokens per word
const TOKENS_PER_WORD = 1.3;

// Calculate tokens for a given text
const calculateTokens = (text: string): number => {
  const words = text.trim().split(/\s+/).length;
  return Math.round(words * TOKENS_PER_WORD);
};

export const useChatbot = () => {
  const [chats, setChats] = useState<Chat[]>(() => {
    const stored = localStorage.getItem(CHATS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const [currentChatId, setCurrentChatId] = useState<string>('');
  
  const [messages, setMessages] = useState<Message[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    }
    return [];
  });
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const totalTokens = messages.reduce((sum, msg) => sum + (msg.tokens || 0), 0);

  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        content: 'Welcome to SylvAI! How can I help you today?',
        sender: 'bot',
        timestamp: new Date(),
        tokens: calculateTokens('Welcome to SylvAI! How can I help you today?')
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  useEffect(() => {
    if (chats.length === 0) {
      createNewChat();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(chats));
  }, [chats]);

  const createNewChat = useCallback(() => {
    const newChat: Chat = {
      id: `chat-${Date.now()}`,
      name: `New Chat ${chats.length + 1}`,
      messages: [],
      totalTokens: 0
    };
    
    setChats(prev => [...prev, newChat]);
    setCurrentChatId(newChat.id);
    setMessages([]);
  }, [chats.length]);

  const switchChat = useCallback((chatId: string) => {
    setCurrentChatId(chatId);
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      setMessages(chat.messages);
    }
  }, [chats]);

  // Update messages in both states
  const updateMessages = useCallback((newMessages: Message[]) => {
    setMessages(newMessages);
    if (currentChatId) {
      setChats(prev => prev.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, messages: newMessages, totalTokens: newMessages.reduce((sum, msg) => sum + (msg.tokens || 0), 0) }
          : chat
      ));
    }
  }, [currentChatId]);

  // Modify existing message handlers to use updateMessages
  const clearConversation = useCallback(() => {
    updateMessages([]);
  }, [updateMessages]);

  const sendMessage = useCallback(() => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      tokens: calculateTokens(inputValue)
    };

    updateMessages([...messages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        tokens: calculateTokens(botResponse)
      };

      updateMessages([...messages, userMessage, botMessage]);
      setIsLoading(false);
    }, 1000);
  }, [inputValue, messages, updateMessages]);

  const deleteChat = useCallback((chatId: string) => {
    // Remove the chat from the list
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    
    // If we're deleting the current chat, switch to another one
    if (chatId === currentChatId) {
      const remainingChats = chats.filter(chat => chat.id !== chatId);
      if (remainingChats.length > 0) {
        // Switch to the first remaining chat
        switchChat(remainingChats[0].id);
      } else {
        // If no chats remain, create a new one
        createNewChat();
      }
    }
  }, [chats, currentChatId, switchChat, createNewChat]);

  return {
    messages,
    inputValue,
    setInputValue,
    sendMessage,
    isLoading,
    clearConversation,
    isTyping,
    totalTokens,
    chats,
    currentChatId,
    createNewChat,
    switchChat,
    deleteChat // Add deleteChat to the returned object
  };
};

const getBotResponse = (message: string): string => {
  const responses = [
    "I'm SylvAI, your eco-friendly assistant. How can I help you today?",
    "That's an interesting question! I'll help you find a sustainable solution.",
    "I'm processing your request with renewable energy. Give me a moment...",
    "As an eco-conscious AI, I recommend considering environmental impact in your decisions.",
    "I'm here to help with sustainable solutions. What more would you like to know?",
  ];

  return responses[Math.floor(Math.random() * responses.length)];
};