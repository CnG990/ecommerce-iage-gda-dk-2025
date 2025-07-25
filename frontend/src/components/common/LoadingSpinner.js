import React from 'react';

const LoadingSpinner = ({ size = 'md', text = '' }) => {
  try {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-8 h-8',
      lg: 'w-12 h-12',
      xl: 'w-16 h-16'
    };

    return (
      <div className="flex flex-col items-center justify-center">
        <div className={`${sizeClasses[size] || sizeClasses.md} animate-spin`}>
          <div className="border-4 border-primary-200 border-t-primary-600 rounded-full w-full h-full"></div>
        </div>
        {text && (
          <p className="mt-2 text-sm text-gray-600">{text}</p>
        )}
      </div>
    );
  } catch (error) {
    console.error('Erreur dans LoadingSpinner:', error);
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="w-8 h-8 animate-spin">
          <div className="border-4 border-gray-200 border-t-gray-600 rounded-full w-full h-full"></div>
        </div>
        <p className="mt-2 text-sm text-gray-600">Chargement...</p>
      </div>
    );
  }
};

export default LoadingSpinner; 