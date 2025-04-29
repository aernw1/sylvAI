import { useState, useCallback, useEffect } from 'react';
import { Message } from '../types';

const STORAGE_KEY = 'sylvai-messages';

// Rough estimate of tokens per word
const TOKENS_PER_WORD = 1.3;

// Calculate tokens for a given text
const calculateTokens = (text: string): number => {
  const words = text.trim().split(/\s+/).length;
  return Math.round(words * TOKENS_PER_WORD);
};

export const useChatbot = () => {
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    setIsTyping(inputValue.length > 0);
  }, [inputValue]);

  const clearConversation = useCallback(() => {
    setMessages([]);
  }, []);

  const sendMessage = useCallback(() => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      tokens: calculateTokens(inputValue)
    };

    setMessages((prev) => [...prev, userMessage]);
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

      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  }, [inputValue]);

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

  return {
    messages,
    inputValue,
    setInputValue,
    sendMessage,
    isLoading,
    clearConversation,
    isTyping,
    totalTokens
  };
};