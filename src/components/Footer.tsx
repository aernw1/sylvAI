import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="text-center text-xs text-gray-500 py-4 mt-2">
      <p>
        By messaging SylvAI, you agree to our{' '}
        <a href="#" className="text-green-600 hover:underline">Terms</a>
        {' '}and{' '}
        <a href="#" className="text-green-600 hover:underline">Privacy Policy</a>.
      </p>
    </div>
  );
};

export default Footer;