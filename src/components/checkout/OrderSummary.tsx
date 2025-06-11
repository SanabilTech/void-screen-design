import React from "react";
import { useCheckout } from "@/context/CheckoutContext";
import { Separator } from "@/components/ui/separator";
import SARSymbol from "@/components/ui/SARSymbol";
import { useLocalization } from "@/context/LocalizationContext";
import TranslatableText from "@/components/ui/TranslatableText";

const OrderSummary: React.FC = () => {
  const { checkoutConfig, currentStep, addProtection, protectionPrice, totalPrice } = useCheckout();
  const { isArabic } = useLocalization();

  if (!checkoutConfig) return null;

  // Create a consistent price display component to ensure SAR is always left-aligned
  const PriceWithSymbol = ({ price }: { price: number }) => {
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

  return (
    <div className="bg-muted/20 rounded-xl p-5 sticky top-28">
      <h2 className="font-medium mb-4">
        <TranslatableText text="Order Summary" translateKey="checkout.summary" />
      </h2>
      
      <div className="flex items-center gap-3 mb-4">
        <img 
          src={checkoutConfig.productImageUrl} 
          alt={checkoutConfig.productName} 
          className="w-16 h-16 object-contain rounded-md bg-white p-1"
        />
        <div>
          <h3 className="font-medium text-sm">{checkoutConfig.productName}</h3>
          <p className="text-xs text-muted-foreground">
            {checkoutConfig.selectedStorage.capacity} · {checkoutConfig.selectedColor.name} · {checkoutConfig.selectedCondition === "new" ? "New" : "Refurbished"}
          </p>
          <p className="text-xs text-muted-foreground">
            {checkoutConfig.selectedLeaseTerm.name} lease
          </p>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span><TranslatableText text="Monthly lease:" translateKey="checkout.monthlyLease" /></span>
          <PriceWithSymbol price={checkoutConfig.price} />
        </div>
        
        {currentStep >= 2 && (
          <div className="flex justify-between">
            <span><TranslatableText text="Protection plan:" translateKey="checkout.protectionPlan" /></span>
            <span>{addProtection ? (
              <PriceWithSymbol price={protectionPrice} />
            ) : (
              <TranslatableText text="Not added" translateKey="checkout.notAdded" />
            )}</span>
          </div>
        )}
        
        {currentStep >= 2 && (
          <>
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <span><TranslatableText text="Total monthly:" translateKey="checkout.totalMonthly" /></span>
              <PriceWithSymbol price={totalPrice} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
