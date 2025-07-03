import React from 'react';

const Logo = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizes[size]} bg-primary-600 rounded-lg flex items-center justify-center`}>
      <span className="text-white font-bold" style={{ 
        fontSize: size === 'sm' ? '1.5rem' : size === 'md' ? '2rem' : '2.5rem'
      }}>
        K
      </span>
    </div>
  );
};

export default Logo; 