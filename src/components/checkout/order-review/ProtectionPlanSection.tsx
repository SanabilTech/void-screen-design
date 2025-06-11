
import React from "react";
import TranslatableText from "@/components/ui/TranslatableText";

interface ProtectionPlanSectionProps {
  addProtection: boolean;
  protectionPrice: number;
}

const ProtectionPlanSection: React.FC<ProtectionPlanSectionProps> = ({
  addProtection,
  protectionPrice
}) => {
  return (
    <div className="bg-muted/20 rounded-lg p-4">
      <h3 className="font-medium text-sm mb-3">
        <TranslatableText text="Protection Plan" translateKey="checkout.protectionPlan" />
      </h3>
      <p className="text-sm">
        {addProtection 
          ? <TranslatableText 
              text={`Jihazi Protection Plan included (SAR ${protectionPrice}/month)`}
              arabicText={`خطة حماية جهازي مشمولة (${protectionPrice} ريال شهريًا)`}
            /> 
          : <TranslatableText 
              text="No protection plan selected" 
              translateKey="checkout.withoutProtection" 
            />
        }
      </p>
    </div>
  );
};

export default ProtectionPlanSection;
