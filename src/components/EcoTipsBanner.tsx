import React, { useState, useEffect } from 'react';

const ecoTips = [
  "Save water by turning off the tap while brushing your teeth.",
  "Switch off lights when leaving a room.",
  "Eat local, seasonal foods to reduce your carbon footprint.",
  "Unplug electronic devices when not in use to save energy.",
  "Choose reusable bags instead of plastic when shopping.",
  "Take shorter showers to conserve water.",
  "Recycle paper, plastic, and glass whenever possible.",
  "Plant trees or support reforestation initiatives.",
  "Use public transportation, bike, or walk instead of driving alone.",
  "Buy second-hand clothes or donate old clothes instead of throwing them away.",
  "Opt for energy-efficient appliances to reduce your carbon footprint.",
  "Reduce meat consumption to lower your environmental impact.",
  "Compost organic waste to enrich the soil and reduce landfill use.",
  "Support brands that prioritize sustainability and ethical practices."
];

const EcoTipsBanner: React.FC = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentTipIndex((prevIndex) => (prevIndex + 1) % ecoTips.length);
        setIsVisible(true);
      }, 500);
    }, 10000); // Changed from 60000 to 10000 (10 seconds)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-green-50 shadow-sm">
      <div
        className={`
          max-w-4xl mx-auto py-2 px-4 text-center text-sm text-green-700 font-sans
          transition-opacity duration-500 ease-in-out
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <span className="inline-block mr-2">🌱</span>
        {ecoTips[currentTipIndex]}
      </div>
    </div>
  );
};

export default EcoTipsBanner;