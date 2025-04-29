import React from 'react';
import { Droplets, Trees as Tree, Wind } from 'lucide-react';

interface EcoMetricsProps {
  totalTokens: number;
}

const EcoMetrics: React.FC<EcoMetricsProps> = ({ totalTokens }) => {
  // Calculate metrics based on total tokens
  // These are example conversion rates - adjust based on actual AI model efficiency
  const treesSaved = (totalTokens * 0.0000005).toFixed(4);
  const waterSaved = (totalTokens * 0.001).toFixed(2); // Liters
  const co2Saved = (totalTokens * 0.0005).toFixed(2); // grams

  const metrics = [
    { icon: <Tree size={18} />, value: treesSaved, label: 'Trees Saved' },
    { icon: <Droplets size={18} />, value: `${waterSaved}L`, label: 'Water Saved' },
    { icon: <Wind size={18} />, value: `${co2Saved}g`, label: 'CO₂ Saved' },
  ];

  return (
    <div className="absolute left-4 top-4 bg-white rounded-lg shadow-md p-3">
      {metrics.map((metric, index) => (
        <div key={index} className="flex items-center gap-2 mb-2 last:mb-0">
          <span className="text-green-600">{metric.icon}</span>
          <div>
            <span className="font-semibold text-gray-800">{metric.value}</span>
            <span className="text-xs text-gray-500 ml-1">{metric.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EcoMetrics