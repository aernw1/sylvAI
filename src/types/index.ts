export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  tokens?: number;
}

export interface ChatContextType {
  messages: Message[];
  inputValue: string;
  setInputValue: (value: string) => void;
  sendMessage: () => void;
  isLoading: boolean;
  clearConversation: () => void;
  isTyping: boolean;
  totalTokens: number;
}

export interface EcoMetrics {
  treesSaved: number;
  waterSaved: number;
  co2Saved: number;
}