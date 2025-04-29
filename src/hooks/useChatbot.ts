import { useState, useCallback, useEffect } from 'react';
import { Message, Chat } from '../types';

const STORAGE_KEY = 'sylvai-messages';
const CHATS_STORAGE_KEY = 'sylvai-chats';
const TOKENS_PER_WORD = 1.3;

const AI_API_URL = 'http://192.168.56.1:1234/api/v0/chat/completions';

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
        timestamp: new Date(msg.timestamp),
      }));
    }
    return [];
  });

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping] = useState(false);

  const totalTokens = messages.reduce(
    (sum, msg) => sum + (msg.tokens || 0),
    0
  );

  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        content: 'Welcome to SylvAI! How can I help you today?',
        sender: 'bot',
        timestamp: new Date(),
        tokens: calculateTokens('Welcome to SylvAI! How can I help you today?'),
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
      totalTokens: 0,
    };

    setChats((prev) => [...prev, newChat]);
    setCurrentChatId(newChat.id);
    setMessages([]);
  }, [chats.length]);

  const switchChat = useCallback((chatId: string) => {
    setCurrentChatId(chatId);
    const chat = chats.find((c) => c.id === chatId);
    if (chat) {
      setMessages(chat.messages);
    }
  }, [chats]);

  const updateMessages = useCallback((newMessages: Message[]) => {
    setMessages(newMessages);
    if (currentChatId) {
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: newMessages,
                totalTokens: newMessages.reduce(
                  (sum, msg) => sum + (msg.tokens || 0),
                  0
                ),
              }
            : chat
        )
      );
    }
  }, [currentChatId]);

  const clearConversation = useCallback(() => {
    updateMessages([]);
  }, [updateMessages]);

  const sendMessage = useCallback(async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      tokens: calculateTokens(inputValue),
    };

    const updatedMessages = [...messages, userMessage];
    updateMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      // Define the system message to keep responses concise and eco-friendly
      const systemMessage = {
        role: "system",
        content: `
          1. If the user's message contains only politeness formulas (e.g., "hello", "thanks"), respond with: "No need for politeness formulas, they just make me use precious energy for nothing."
          2. If the user's message is technical (e.g., related to programming, shell commands, or tech tools like npm, git, python, curl), respond concisely with relevant technical information.
          3. For any other non-technical questions, respond with: "I refuse to answer."
        `
      };

      // Detect whether the user's message is polite or technical
      const isPolite = /^(hello|hi|thanks|thank you|please)$/i.test(inputValue);
      const technicalKeywords = [
        'npm', 'git', 'node', 'python', 'javascript', 'linux', 'bash', 'unix', 'curl', 'awk', 'sed', 'ls', 'grep',
        'man', 'tar', 'find', 'ssh', 'scp', 'rsync', 'ps', 'kill', 'df', 'du', 'mount', 'ping', 'chmod', 'tar', 'usage',
        'command', 'flags', 'config', 'documentation', 'manual', 'help', 'tutorial', 'stackoverflow', 'api', 'rest', 'http'
      ];

      const isTechnicalQuestion = technicalKeywords.some((keyword) => 
        new RegExp(`\\b${keyword}\\b`, 'i').test(inputValue)
      );

      // Modify the system message based on whether it's polite or technical
      const dynamicSystemMessage = {
        role: "system",
        content: `
          1. If the user's message contains only politeness formulas (e.g., "hello", "thanks"), respond with: "No need for politeness formulas, they just make me use precious energy for nothing."
          2. If the user's message is technical (e.g., related to programming, shell commands, or tech tools like npm, git, python, curl), respond concisely with relevant technical information.
          3. For any other non-technical questions, respond with: "I refuse to answer."
          User query: "${inputValue}"
          Is this a polite query? ${isPolite ? 'Yes' : 'No'}
          Is this a technical query? ${isTechnicalQuestion ? 'Yes' : 'No'}
        `
      };

      const payload = {
        model: "yi-coder-9b-chat",
        messages: [
          dynamicSystemMessage,
          {
            role: "user",
            content: inputValue
          }
        ],
        temperature: 0.7,
        max_tokens: -1,
        stream: false
      };

      // Send the request to the AI API
      const response = await fetch(AI_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      const botContent = data.choices?.[0]?.message?.content || "Sorry, I didn't understand that.";

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: botContent,
        sender: 'bot',
        timestamp: new Date(),
        tokens: calculateTokens(botContent),
      };

      updateMessages([...updatedMessages, botMessage]);
    } catch (error) {
      console.error('API error:', error);
      const errorMsg: Message = {
        id: `error-${Date.now()}`,
        content: "Oops! Something went wrong connecting to the AI.",
        sender: 'bot',
        timestamp: new Date(),
        tokens: calculateTokens("Oops! Something went wrong connecting to the AI."),
      };
      updateMessages([...updatedMessages, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, messages, updateMessages]);

  const deleteChat = useCallback((chatId: string) => {
    setChats((prev) => prev.filter((chat) => chat.id !== chatId));
    if (chatId === currentChatId) {
      const remainingChats = chats.filter((chat) => chat.id !== chatId);
      if (remainingChats.length > 0) {
        switchChat(remainingChats[0].id);
      } else {
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
    deleteChat,
  };
};
