import React from 'react';

const Logo = ({ size = 'large', showText = true, className = '' }) => {
  const sizeClasses = {
    small: 'h-8 w-8',
    medium: 'h-12 w-12', 
    large: 'h-16 w-16',
    xlarge: 'h-24 w-24'
  };

  const textSizes = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-4xl',
    xlarge: 'text-5xl'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {/* Star icon */}
      <span className="text-blue-600 mr-3 text-5xl">⭐</span>
      
      {/* Logo Image - will show if logo.png exists, fallback to paddle emoji */}
      <div className="relative mr-3">
        <img 
          src="/logo.png" 
          alt="Lone Star Table Tennis Academy Logo"
          className={`${sizeClasses[size]} object-contain`}
          onError={(e) => {
            // Fallback to emoji if logo.png doesn't exist
            e.target.style.display = 'none';
            e.target.nextElementSibling.style.display = 'block';
          }}
        />
        <span 
          className={`${textSizes[size]} text-orange-500 hidden`}
          style={{ display: 'none' }}
        >
          🏓
        </span>
      </div>

      {/* Text */}
      {showText && (
        <h1 className={`${textSizes[size]} font-bold text-gray-900`}>
          Lone Star Table Tennis Academy
        </h1>
      )}

      {/* Paddle emoji */}
      <span className="text-orange-500 ml-3 text-3xl">🏓</span>
    </div>
  );
};

export default Logo;