
import React from "react";
import { useCheckout } from "@/context/CheckoutContext";
import TranslatableText from "@/components/ui/TranslatableText";
import { useLocalization } from "@/context/LocalizationContext";

const CheckoutSteps: React.FC = () => {
  const { currentStep } = useCheckout();
  const { isArabic } = useLocalization();

  return (
    <div className="flex flex-wrap items-center gap-2 mt-4 mb-6">
      <div className={`flex items-center ${currentStep >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
          1
        </div>
        <span className="ml-2 text-sm font-medium">
          <TranslatableText 
            text="Customer Information" 
            translateKey="checkout.customerInformation" 
          />
        </span>
      </div>
      <div className="w-10 h-0.5 mx-2 bg-muted hidden sm:block"></div>
      <div className={`flex items-center ${currentStep >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
          2
        </div>
        <span className="ml-2 text-sm font-medium">
          <TranslatableText 
            text="Protection Plan" 
            translateKey="checkout.protectionPlan" 
          />
        </span>
      </div>
      <div className="w-10 h-0.5 mx-2 bg-muted hidden sm:block"></div>
      <div className={`flex items-center ${currentStep >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
          3
        </div>
        <span className="ml-2 text-sm font-medium">
          <TranslatableText 
            text="Verification Documents" 
            translateKey="checkout.verificationDocuments" 
          />
        </span>
      </div>
      <div className="w-10 h-0.5 mx-2 bg-muted hidden sm:block"></div>
      <div className={`flex items-center ${currentStep >= 4 ? 'text-primary' : 'text-muted-foreground'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 4 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
          4
        </div>
        <span className="ml-2 text-sm font-medium">
          <TranslatableText 
            text="Review Order" 
            translateKey="checkout.orderReview" 
          />
        </span>
      </div>
    </div>
  );
};

export default CheckoutSteps;
