
import React, { createContext, useContext } from "react";
import { CheckoutContextType } from "@/types/checkout";
import { useCheckoutConfig } from "@/hooks/useCheckoutConfig";
import { useCheckoutSteps } from "@/hooks/useCheckoutSteps";
import { useOrderPlacement } from "@/hooks/useOrderPlacement";
import { useLocalization } from "./LocalizationContext";

const CheckoutContext = createContext<CheckoutContextType | null>(null);

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
};

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { checkoutConfig } = useCheckoutConfig();
  const { 
    currentStep, 
    customerInfo, 
    addProtection,
    nationalIdFile,
    salaryCertificateFile,
    setCurrentStep,
    setCustomerInfo,
    setAddProtection,
    handleCustomerInfoSubmit,
    handleProtectionSelection,
    handleVerificationDocuments,
    handleBackClick
  } = useCheckoutSteps();
  
  const { placeOrder, isSubmitting } = useOrderPlacement();

  const handlePlaceOrder = async () => {
    if (!checkoutConfig || !customerInfo || !nationalIdFile || !salaryCertificateFile) return;
    await placeOrder(
      checkoutConfig,
      customerInfo,
      nationalIdFile,
      salaryCertificateFile,
      addProtection
    );
  };

  const protectionPrice = checkoutConfig && addProtection ? Math.ceil(checkoutConfig.price * 0.1) : 0;
  const totalPrice = checkoutConfig ? checkoutConfig.price + protectionPrice : 0;

  const value = {
    checkoutConfig,
    currentStep,
    customerInfo,
    addProtection,
    isSubmitting,
    nationalIdFile,
    salaryCertificateFile,
    protectionPrice,
    totalPrice,
    setCurrentStep,
    setCustomerInfo,
    setAddProtection,
    handleCustomerInfoSubmit,
    handleProtectionSelection,
    handleVerificationDocuments,
    handlePlaceOrder,
    handleBackClick
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};
