
import React from "react";

interface SARSymbolProps {
  className?: string;
}

const SARSymbol: React.FC<SARSymbolProps> = ({ className = "" }) => {
  // We want the symbol on the left always, regardless of language direction
  return (
    <img 
      src="/lovable-uploads/7d6e7cc9-46fe-457e-a5c5-b9722f252b29.png" 
      alt="SAR" 
      className={`h-4 inline-block ${className}`}
      style={{ 
        marginBottom: "0.1em", 
        marginRight: "0.1em",
        order: 0 // Force the symbol to always be first in flex container
      }}
    />
  );
};

export default SARSymbol;
