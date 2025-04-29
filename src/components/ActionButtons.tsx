import React from 'react';
import { 
  Image, 
  Search, 
  Lightbulb, 
  Newspaper, 
  Users
} from 'lucide-react';

const ActionButtons: React.FC = () => {
  const buttons = [
    { icon: <Image size={20} />, label: "Create images" },
    { icon: <Search size={20} />, label: "Research" },
    { icon: <Lightbulb size={20} />, label: "How to" },
    { icon: <Newspaper size={20} />, label: "Latest News" },
    { icon: <Users size={20} />, label: "Personas" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 my-4 px-4">
      {buttons.map((button, index) => (
        <button
          key={index}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-sm text-gray-700"
        >
          <span className="text-green-600">{button.icon}</span>
          <span>{button.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ActionButtons;