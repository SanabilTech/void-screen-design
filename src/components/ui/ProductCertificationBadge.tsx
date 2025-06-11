
import React from "react";

const ProductCertificationBadge: React.FC = () => {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <img 
        src="/lovable-uploads/90c95109-9027-482a-a34e-83d95c31d21c.png" 
        alt="Certification Badge" 
        className="w-5 h-5 object-contain"
      />
      <span className="text-xs font-medium">Certified product</span>
    </div>
  );
};

export default ProductCertificationBadge;
