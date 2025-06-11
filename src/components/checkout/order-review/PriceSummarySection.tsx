
import React from "react";
import { Separator } from "@/components/ui/separator";
import TranslatableText from "@/components/ui/TranslatableText";
import { PriceWithSymbol } from "./OrderSummaryItem";
import OrderSummaryItem from "./OrderSummaryItem";

interface PriceSummarySectionProps {
  basePrice: number;
  protectionPrice: number;
  totalPrice: number;
  addProtection: boolean;
}

const PriceSummarySection: React.FC<PriceSummarySectionProps> = ({
  basePrice,
  protectionPrice,
  totalPrice,
  addProtection
}) => {
  return (
    <div className="bg-muted/20 rounded-lg p-4">
      <h3 className="font-medium text-sm mb-3">
        <TranslatableText text="Price Summary" translateKey="checkout.priceSummary" />
      </h3>
      <div className="space-y-2 text-sm">
        <OrderSummaryItem 
          label="Monthly lease:"
          translateKey="checkout.monthlyLease"
          value={<PriceWithSymbol price={basePrice} />}
        />
        
        <OrderSummaryItem 
          label="Protection plan:"
          translateKey="checkout.protectionPlan"
          value={addProtection ? (
            <PriceWithSymbol price={protectionPrice} />
          ) : (
            <TranslatableText text="Not added" translateKey="checkout.notAdded" />
          )}
        />
        
        <Separator className="my-2" />
        
        <div className="flex justify-between font-medium">
          <span>
            <TranslatableText text="Total monthly:" translateKey="checkout.totalMonthly" />
          </span>
          <PriceWithSymbol price={totalPrice} />
        </div>
      </div>
    </div>
  );
};

export default PriceSummarySection;
