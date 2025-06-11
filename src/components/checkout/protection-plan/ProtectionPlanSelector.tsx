
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import TranslatableText from "@/components/ui/TranslatableText";
import ProtectionPlanCard from "./ProtectionPlanCard";

interface ProtectionPlanSelectorProps {
  productPrice: number;
  onSelect: (includeProtection: boolean) => void;
}

const ProtectionPlanSelector: React.FC<ProtectionPlanSelectorProps> = ({ 
  productPrice, 
  onSelect 
}) => {
  const [selection, setSelection] = useState<boolean | null>(null);
  const protectionPrice = Math.ceil(productPrice * 0.1); // 10% of the monthly price

  const handleContinue = () => {
    if (selection !== null) {
      onSelect(selection);
    }
  };

  const withProtectionFeatures = [
    {
      text: "Accidental damage protection",
      translateKey: "checkout.accidentalDamageProtection"
    },
    {
      text: "Priority replacement service",
      translateKey: "checkout.priorityReplacementService"
    },
    {
      text: "24/7 technical support",
      translateKey: "checkout.technicalSupport"
    }
  ];

  const withoutProtectionFeatures = [
    {
      text: "Manufacturer warranty only",
      translateKey: "checkout.manufacturerWarrantyOnly"
    },
    {
      text: "Standard support channels",
      translateKey: "checkout.standardSupportChannels"
    },
    {
      text: "You pay for repairs or replacements",
      translateKey: "checkout.youPayForRepairs"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-lg font-medium mb-4">
          <TranslatableText text="Jihazi Protection" translateKey="checkout.jihaziProtection" />
        </h2>
        <p className="text-muted-foreground text-sm mb-6">
          <TranslatableText 
            text="Protect your device against accidental damage and more for a small monthly fee." 
            translateKey="checkout.protectYourDevice" 
          />
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProtectionPlanCard
          isSelected={selection === true}
          title="With Protection"
          titleKey="checkout.withProtection"
          description="Jihazi Protection Plan"
          descriptionKey="checkout.jihaziProtectionPlan"
          price={protectionPrice}
          priceDescription="Added to your monthly payment"
          priceDescriptionKey="checkout.addedToMonthlyPayment"
          features={withProtectionFeatures}
          icon="shield-check"
          onSelect={() => setSelection(true)}
        />
        
        <ProtectionPlanCard
          isSelected={selection === false}
          title="Without Protection"
          titleKey="checkout.withoutProtection"
          description="Standard Coverage Only"
          descriptionKey="checkout.standardCoverageOnly"
          price={0}
          priceDescription="No additional cost"
          priceDescriptionKey="checkout.noAdditionalCost"
          features={withoutProtectionFeatures}
          icon="shield-x"
          onSelect={() => setSelection(false)}
        />
      </div>
      
      <Button 
        id="checkout_review"
        onClick={handleContinue} 
        disabled={selection === null}
        className="w-full premium-button mt-4"
      >
        <TranslatableText text="Continue to Review" translateKey="checkout.continueToReview" />
      </Button>
    </div>
  );
};

export default ProtectionPlanSelector;
