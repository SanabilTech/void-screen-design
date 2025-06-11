
import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'light', className = '' }) => {
  // Using the uploaded logo image
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/lovable-uploads/de6f8fd5-0520-4a6f-bfbc-127da0265bce.png" 
        alt="Jihazi Logo" 
        className={`h-8 w-auto ${className}`}
      />
    </div>
  );
};

export default Logo;
