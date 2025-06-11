
import React from "react";
import { useLocalization } from "@/context/LocalizationContext";
import SARSymbol from "@/components/ui/SARSymbol";

interface PriceDisplayProps {
  price: number;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ price }) => {
  const { isArabic } = useLocalization();
  
  if (isArabic) {
    return (
      <p className="text-sm font-medium flex items-center">
        <span className="mx-1">شهريًا</span>
        <span className="ml-1">{price}</span>
        <SARSymbol />
      </p>
    );
  }
  
  return (
    <p className="text-sm font-medium flex items-center">
      <SARSymbol />
      <span className="mr-1">{price}</span>
      <span>/month</span>
    </p>
  );
};

export default PriceDisplay;
