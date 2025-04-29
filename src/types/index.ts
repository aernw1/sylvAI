export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  tokens?: number;
}

export interface Chat {
  id: string;
  name: string;
  messages: Message[];
  totalTokens: number;
}

export interface ChatContextType {
  chats: Chat[];
  currentChatId: string;
  messages: Message[];
  inputValue: string;
  setInputValue: (value: string) => void;
  sendMessage: () => void;
  isLoading: boolean;
  clearConversation: () => void;
  isTyping: boolean;
  totalTokens: number;
  createNewChat: () => void;
  switchChat: (chatId: string) => void;
  deleteChat: (chatId: string) => void;
}

export interface EcoMetrics {
  treesSaved: number;
  waterSaved: number;
  co2Saved: number;
}