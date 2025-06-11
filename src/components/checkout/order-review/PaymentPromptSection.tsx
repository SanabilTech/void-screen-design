
import React from "react";
import TranslatableText from "@/components/ui/TranslatableText";

interface PaymentPromptSectionProps {
  termsAgreed: boolean;
  setTermsAgreed: (agreed: boolean) => void;
}

const PaymentPromptSection: React.FC<PaymentPromptSectionProps> = ({
  termsAgreed,
  setTermsAgreed
}) => {
  return (
    <button 
      id="confirm_click"
      className="animated-border rounded-lg p-5 overflow-hidden relative bg-white w-full text-left cursor-pointer hover:bg-muted/5 transition-colors"
      onClick={() => setTermsAgreed(!termsAgreed)}
    >
      <div className="flex items-center gap-4">
        <img 
          src="/lovable-uploads/5273a17f-74dd-44ea-bb62-a84a1b5f740b.png" 
          alt="Payment card" 
          className="w-16 h-16 object-contain"
        />
        <p className="text-sm text-primary">
          <TranslatableText 
            text="You will be prompted to complete payment after submitting this order. A representative may contact you to finalize the leasing details."
            translateKey="checkout.paymentPrompt"
          />
        </p>
      </div>
      
      <div className="mt-4 flex items-center space-x-2">
        <div className={`w-5 h-5 border-2 rounded-sm flex items-center justify-center ${termsAgreed ? 'bg-primary border-primary' : 'border-gray-300'}`}>
          {termsAgreed && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <span 
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          <TranslatableText 
            text="I agree to complete the payment process after order submission"
            translateKey="checkout.agreeToPayment" 
          />
        </span>
      </div>
    </button>
  );
};

export default PaymentPromptSection;
