
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PriceDisplay from "@/components/ui/PriceDisplay";
import { 
  StorageOption, 
  ColorOption, 
  DeviceCondition, 
  LeaseTerm,
  Product
} from "@/types/product";
import { useLocalization } from "@/context/LocalizationContext";
import BusinessOrdersBox from "./BusinessOrdersBox";

interface ProductPriceSectionProps {
  product: Product;
  selectedStorage: StorageOption | null;
  selectedColor: ColorOption | null;
  selectedCondition: DeviceCondition;
  selectedLeaseTerm: LeaseTerm | null;
  isPriceLoading: boolean;
  databasePrice?: number;
  onCheckout: () => void;
  availableConditions: DeviceCondition[];
}

const ProductPriceSection: React.FC<ProductPriceSectionProps> = ({
  product,
  selectedStorage,
  selectedColor,
  selectedCondition,
  selectedLeaseTerm,
  isPriceLoading,
  databasePrice,
  onCheckout,
  availableConditions
}) => {
  const { t } = useLocalization();
  
  const filteredConditions = availableConditions.length;
  
  return (
    <div className="space-y-6">
      {selectedStorage && selectedColor && selectedLeaseTerm && (
        <div className={isPriceLoading ? "opacity-50" : ""}>
          <PriceDisplay
            product={product}
            selectedStorage={selectedStorage}
            selectedColor={selectedColor}
            selectedCondition={selectedCondition}
            selectedLeaseTerm={selectedLeaseTerm}
            price={databasePrice}
          />
          {isPriceLoading && (
            <p className="text-xs text-muted-foreground mt-1">{t('product.loadingPrice')}</p>
          )}
        </div>
      )}
      
      <Button 
        id="continue_checkout"
        size="lg" 
        className="w-full premium-button"
        onClick={onCheckout}
        disabled={!selectedStorage || !selectedColor || !selectedLeaseTerm || isPriceLoading || filteredConditions === 0}
      >
        {t('checkout.title')}
      </Button>
      
      <BusinessOrdersBox />
    </div>
  );
};

export default ProductPriceSection;
