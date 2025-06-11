
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CircleCheckBig, ShieldCheck, ShieldX } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TranslatableText from "@/components/ui/TranslatableText";
import { useLocalization } from "@/context/LocalizationContext";
import SARSymbol from "@/components/ui/SARSymbol";

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
  const { isArabic } = useLocalization();

  const handleContinue = () => {
    if (selection !== null) {
      onSelect(selection);
    }
  };

  // Custom price display component with proper RTL handling
  const PriceDisplay = ({ price }: { price: number }) => {
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
        <Card 
          className={`cursor-pointer border-2 transition-all ${
            selection === true ? 'border-primary' : 'border-border hover:border-primary/30'
          }`}
          onClick={() => setSelection(true)}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-base">
                <TranslatableText text="With Protection" translateKey="checkout.withProtection" />
              </CardTitle>
              {selection === true && (
                <CircleCheckBig className="h-5 w-5 text-primary" />
              )}
            </div>
            <CardDescription>
              <TranslatableText text="Jihazi Protection Plan" translateKey="checkout.jihaziProtectionPlan" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-3 mb-3">
              <ShieldCheck className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <PriceDisplay price={protectionPrice} />
                <p className="text-xs text-muted-foreground mt-1">
                  <TranslatableText text="Added to your monthly payment" translateKey="checkout.addedToMonthlyPayment" />
                </p>
              </div>
            </div>
            <ul className="space-y-2 text-sm mt-4">
              <li className="flex items-start gap-2">
                <CircleCheckBig className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <span>
                  <TranslatableText text="Accidental damage protection" translateKey="checkout.accidentalDamageProtection" />
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CircleCheckBig className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <span>
                  <TranslatableText text="Priority replacement service" translateKey="checkout.priorityReplacementService" />
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CircleCheckBig className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <span>
                  <TranslatableText text="24/7 technical support" translateKey="checkout.technicalSupport" />
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card 
          className={`cursor-pointer border-2 transition-all ${
            selection === false ? 'border-primary' : 'border-border hover:border-primary/30'
          }`}
          onClick={() => setSelection(false)}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-base">
                <TranslatableText text="Without Protection" translateKey="checkout.withoutProtection" />
              </CardTitle>
              {selection === false && (
                <CircleCheckBig className="h-5 w-5 text-primary" />
              )}
            </div>
            <CardDescription>
              <TranslatableText text="Standard Coverage Only" translateKey="checkout.standardCoverageOnly" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-3 mb-3">
              <ShieldX className="h-8 w-8 text-muted-foreground flex-shrink-0" />
              <div>
                <PriceDisplay price={0} />
                <p className="text-xs text-muted-foreground mt-1">
                  <TranslatableText text="No additional cost" translateKey="checkout.noAdditionalCost" />
                </p>
              </div>
            </div>
            <ul className="space-y-2 text-sm mt-4">
              <li className="flex items-start gap-2">
                <CircleCheckBig className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">
                  <TranslatableText text="Manufacturer warranty only" translateKey="checkout.manufacturerWarrantyOnly" />
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CircleCheckBig className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">
                  <TranslatableText text="Standard support channels" translateKey="checkout.standardSupportChannels" />
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CircleCheckBig className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">
                  <TranslatableText text="You pay for repairs or replacements" translateKey="checkout.youPayForRepairs" />
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
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
