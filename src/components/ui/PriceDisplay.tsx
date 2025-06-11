
import React from "react";
import { LeaseTerm, Product, StorageOption, ColorOption, DeviceCondition } from "../../types/product";
import SARSymbol from "./SARSymbol";
import TranslatableText from "./TranslatableText";
import { useLocalization } from "@/context/LocalizationContext";

interface PriceDisplayProps {
  product: Product;
  selectedStorage: StorageOption | null;
  selectedColor: ColorOption | null;
  selectedCondition: DeviceCondition;
  selectedLeaseTerm: LeaseTerm | null;
  showDiscountInfo?: boolean;
  price?: number;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  product,
  selectedStorage,
  selectedColor,
  selectedCondition,
  selectedLeaseTerm,
  showDiscountInfo = true,
  price: priceProp,
}) => {
  const { isArabic } = useLocalization();

  // Use the prop value if available instead of making another API call
  const finalPrice = priceProp !== undefined ? priceProp : calculateFallbackPrice();
  
  function calculateFallbackPrice() {
    const newDevicePrice = selectedLeaseTerm?.id === 'monthly' ? selectedStorage?.exactPrices?.monthly || product.basePrice :
                  selectedLeaseTerm?.id === '12month' ? selectedStorage?.exactPrices?.['12month'] || product.basePrice : 
                  selectedLeaseTerm?.id === '24month' ? selectedStorage?.exactPrices?.['24month'] || (product.basePrice * 0.75) : 
                  selectedLeaseTerm?.id === '36month' ? selectedStorage?.exactPrices?.['36month'] || (product.basePrice * 0.7) : 
                  product.basePrice;
    
    return selectedCondition === "refurbished" ? 
                  Math.ceil(newDevicePrice * 0.8) : 
                  Math.ceil(newDevicePrice);
  }

  const displayPrice = Math.ceil(finalPrice);
  
  const basePrice = product.basePrice;
  const hasDiscount = displayPrice < basePrice && selectedCondition === "new";

  const percentageOff = hasDiscount ? Math.round(((basePrice - displayPrice) / basePrice) * 100) : 0;

  const priceDisplay = isArabic ? (
    <>
      <span className="mx-1">شهريًا</span>
      {displayPrice}
      <SARSymbol className="h-5" />
    </>
  ) : (
    <>
      <SARSymbol className="h-5" />
      {displayPrice}
    </>
  );

  return (
    <div className="space-y-1">
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold flex items-center">
          {priceDisplay}
        </span>
        <span className="text-sm text-muted-foreground">
          {!isArabic && (
            <TranslatableText 
              text="/month" 
              translateKey="product.monthlyPriceUnit"
            />
          )}
        </span>
      </div>
      
      {showDiscountInfo && selectedLeaseTerm && (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {hasDiscount && (
              <div className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
                {percentageOff}% <TranslatableText text="off monthly" translateKey="product.offMonthly" />
              </div>
            )}
            {selectedCondition === "refurbished" && (
              <div className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full text-xs font-medium">
                {isArabic ? "توفير متجدد" : "Refurbished savings"}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceDisplay;
