import React, { useState } from 'react';
import { ChevronDown, Trophy, Trees, Droplets, Wind } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  progress: number;
  target: number;
  unit: string;
}

interface AchievementsMenuProps {
  treesSaved: number;
  waterSaved: number;
  co2Saved: number;
}

const AchievementsMenu: React.FC<AchievementsMenuProps> = ({ treesSaved, waterSaved, co2Saved }) => {
  const [isOpen, setIsOpen] = useState(false);

  const achievements: Achievement[] = [
    {
      id: 'trees',
      name: 'Forest Guardian',
      description: 'Save trees through eco-friendly actions',
      icon: <Trees size={18} />,
      progress: treesSaved,
      target: 0.001, // Reduced from 0.01
      unit: 'trees'
    },
    {
      id: 'water',
      name: 'Water Savior',
      description: 'Conserve water resources',
      icon: <Droplets size={18} />,
      progress: waterSaved,
      target: 1, // Reduced from 10
      unit: 'L'
    },
    {
      id: 'co2',
      name: 'Carbon Reducer',
      description: 'Reduce carbon footprint',
      icon: <Wind size={18} />,
      progress: co2Saved,
      target: 0.5, // Reduced from 5
      unit: 'g'
    }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
      >
        <Trophy size={18} className="text-green-600" />
        <span className="text-sm text-green-700">Achievements</span>
        <ChevronDown
          size={16}
          className={`text-green-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Eco Achievements</h3>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">{achievement.icon}</span>
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">{achievement.name}</h4>
                    <p className="text-xs text-gray-500">{achievement.description}</p>
                  </div>
                </div>
                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-green-700">
                      {achievement.progress.toFixed(2)} {achievement.unit}
                    </span>
                    <span className="text-xs font-medium text-gray-500">
                      Target: {achievement.target} {achievement.unit}
                    </span>
                  </div>
                  <div className="overflow-hidden h-2 bg-gray-200 rounded">
                    <div
                      className="h-full bg-green-500 rounded transition-all duration-300"
                      style={{
                        width: `${Math.min((achievement.progress / achievement.target) * 100, 100)}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementsMenu;