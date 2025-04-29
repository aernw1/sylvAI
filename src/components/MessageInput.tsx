import React, { KeyboardEvent, useState, useEffect } from 'react';
import { SendHorizontal, Loader2, Wind } from 'lucide-react';

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
  darkMode: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  value, 
  onChange, 
  onSend,
  isLoading,
  darkMode
}) => {
  const [estimatedCO2, setEstimatedCO2] = useState(0);

  useEffect(() => {
    // Estimate CO2 based on character count (simplified calculation)
    const estimatedTokens = value.length / 4; // Rough estimate of tokens
    const co2PerToken = 0.0005; // Same rate as used in EcoMetrics
    setEstimatedCO2(estimatedTokens * co2PerToken);
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className={`p-4 border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} relative`}>
      <div className="max-w-3xl mx-auto flex items-center relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What do you want to know?"
          className={`w-full py-3 px-4 pr-32 rounded-full border ${
            darkMode 
              ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400' 
              : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
          } focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all`}
          disabled={isLoading}
        />
        {value.length > 0 && (
          <div className={`absolute right-14 flex items-center gap-1 px-2 py-1 rounded-full ${
            darkMode ? 'bg-gray-700 text-green-400' : 'bg-green-50 text-green-600'
          }`}>
            <Wind size={14} />
            <span className="text-xs">{estimatedCO2.toFixed(3)}g CO₂</span>
          </div>
        )}
        <button
          onClick={onSend}
          disabled={!value.trim() || isLoading}
          className={`absolute right-3 p-2 rounded-full ${
            value.trim() && !isLoading
              ? 'bg-green-600 text-white hover:bg-green-700' 
              : darkMode ? 'bg-gray-600 text-gray-400' : 'bg-gray-200 text-gray-400'
          } transition-all`}
        >
          {isLoading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <SendHorizontal size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

export default MessageInput;