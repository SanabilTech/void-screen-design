
import React from "react";
import ProductCertificationBadge from "../ui/ProductCertificationBadge";

interface ProductImageDisplayProps {
  imageUrl: string;
  productName: string;
}

const ProductImageDisplay: React.FC<ProductImageDisplayProps> = ({ 
  imageUrl, 
  productName 
}) => {
  return (
    <div className="lg:sticky lg:top-28 h-fit">
      <div className="rounded-2xl p-8 flex flex-col items-center justify-center">
        <img 
          src={imageUrl} 
          alt={productName} 
          className="max-w-full max-h-96 object-contain animate-float" 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== "/placeholder.svg") {
              console.error(`Image failed to load: ${target.src}`);
              target.src = "/placeholder.svg";
            }
          }}
        />
        <div className="mt-4">
          <ProductCertificationBadge />
        </div>
      </div>
    </div>
  );
};

export default ProductImageDisplay;
