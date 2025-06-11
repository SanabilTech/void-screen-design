
import React, { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomerInformationForm from "@/components/checkout/CustomerInformationForm";
import ProtectionPlanSelector from "@/components/checkout/protection-plan/ProtectionPlanSelector";
import VerificationDocuments from "@/components/checkout/VerificationDocuments";
import OrderReview from "@/components/checkout/OrderReview";
import CheckoutSteps from "@/components/checkout/CheckoutSteps";
import OrderSummary from "@/components/checkout/OrderSummary";
import { CheckoutProvider, useCheckout } from "@/context/CheckoutContext";
import { useFunnelTracking } from "@/hooks/useFunnelTracking";
import TranslatableText from "@/components/ui/TranslatableText";
import { useLocalization } from "@/context/LocalizationContext";

const CheckoutPageContent: React.FC = () => {
  const { 
    checkoutConfig, 
    currentStep, 
    customerInfo,
    addProtection,
    isSubmitting,
    protectionPrice,
    totalPrice,
    handleCustomerInfoSubmit, 
    handleProtectionSelection,
    handleVerificationDocuments,
    handlePlaceOrder, 
    handleBackClick
  } = useCheckout();
  
  const { trackFunnelStep } = useFunnelTracking();
  const { isArabic } = useLocalization();
  
  // Track each step of the checkout process
  useEffect(() => {
    if (checkoutConfig) {
      if (currentStep === 1) {
        trackFunnelStep('customerInfo');
      } else if (currentStep === 2) {
        trackFunnelStep('protectionPlan');
      } else if (currentStep === 3) {
        trackFunnelStep('verificationDocuments');
      } else if (currentStep === 4) {
        trackFunnelStep('review');
      }
    }
  }, [currentStep, checkoutConfig, trackFunnelStep]);

  if (!checkoutConfig) {
    return (
      <div className="flex flex-col min-h-screen pt-24 md:pt-28">
        <div className="container-wide py-6">
          <div className="text-center py-20">
            <p className="text-muted-foreground">Loading checkout...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pt-24 md:pt-28">
      <div className="container max-w-4xl py-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground"
          onClick={handleBackClick}
        >
          <ArrowLeft className="h-4 w-4" />
          {currentStep > 1 ? (
            <TranslatableText text="Back" translateKey="checkout.back" />
          ) : (
            <TranslatableText text="Return to Product" translateKey="checkout.returnToProduct" />
          )}
        </Button>

        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            <TranslatableText text="Checkout" translateKey="checkout.title" />
          </h1>
          <CheckoutSteps />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {currentStep === 1 && (
              <CustomerInformationForm onSubmit={handleCustomerInfoSubmit} />
            )}
            
            {currentStep === 2 && (
              <ProtectionPlanSelector 
                productPrice={checkoutConfig.price}
                onSelect={handleProtectionSelection}
              />
            )}
            
            {currentStep === 3 && (
              <VerificationDocuments 
                onContinue={handleVerificationDocuments}
              />
            )}
            
            {currentStep === 4 && (
              <OrderReview 
                checkoutConfig={checkoutConfig}
                customerInfo={customerInfo!}
                addProtection={addProtection}
                protectionPrice={protectionPrice}
                totalPrice={totalPrice}
                onPlaceOrder={handlePlaceOrder}
                isSubmitting={isSubmitting}
              />
            )}
          </div>
          
          <div className="md:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckoutPage: React.FC = () => {
  const { trackFunnelStep } = useFunnelTracking();
  
  // Track page view when the component mounts
  useEffect(() => {
    trackFunnelStep('checkout');
  }, [trackFunnelStep]);
  
  return (
    <CheckoutProvider>
      <CheckoutPageContent />
    </CheckoutProvider>
  );
};

export default CheckoutPage;
