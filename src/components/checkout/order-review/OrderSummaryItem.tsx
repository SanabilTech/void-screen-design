
import React from "react";
import { useLocalization } from "@/context/LocalizationContext";
import SARSymbol from "@/components/ui/SARSymbol";
import TranslatableText from "@/components/ui/TranslatableText";

interface PriceWithSymbolProps {
  price: number;
}

export const PriceWithSymbol: React.FC<PriceWithSymbolProps> = ({ price }) => {
  const { isArabic } = useLocalization();
  
  if (isArabic) {
    return (
      <span className="flex items-center">
        <span className="mx-1">شهريًا</span>
        <span>{price}</span>
        <SARSymbol />
      </span>
    );
  }
  return (
    <span className="flex items-center">
      <SARSymbol /> {price}{isArabic ? " شهريًا" : "/mo"}
    </span>
  );
};

interface OrderSummaryItemProps {
  label: string;
  translateKey: string;
  value: React.ReactNode;
}

const OrderSummaryItem: React.FC<OrderSummaryItemProps> = ({ 
  label,
  translateKey,
  value
}) => {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">
        <TranslatableText text={label} translateKey={translateKey} />
      </span>
      <span>{value}</span>
    </div>
  );
};

export default OrderSummaryItem;
