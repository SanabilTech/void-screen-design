
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheckBig, ShieldCheck, ShieldX } from "lucide-react";
import TranslatableText from "@/components/ui/TranslatableText";
import PriceDisplay from "./PriceDisplay";
import ProtectionFeatureList from "./ProtectionFeatureList";

interface ProtectionPlanCardProps {
  isSelected: boolean;
  title: string;
  titleKey: string;
  description: string;
  descriptionKey: string;
  price: number;
  priceDescription: string;
  priceDescriptionKey: string;
  features: {
    text: string;
    translateKey: string;
  }[];
  icon: "shield-check" | "shield-x";
  onSelect: () => void;
}

const ProtectionPlanCard: React.FC<ProtectionPlanCardProps> = ({
  isSelected,
  title,
  titleKey,
  description,
  descriptionKey,
  price,
  priceDescription,
  priceDescriptionKey,
  features,
  icon,
  onSelect
}) => {
  return (
    <Card 
      className={`cursor-pointer border-2 transition-all ${
        isSelected ? 'border-primary' : 'border-border hover:border-primary/30'
      }`}
      onClick={onSelect}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">
            <TranslatableText text={title} translateKey={titleKey} />
          </CardTitle>
          {isSelected && (
            <CircleCheckBig className="h-5 w-5 text-primary" />
          )}
        </div>
        <CardDescription>
          <TranslatableText text={description} translateKey={descriptionKey} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-3 mb-3">
          {icon === "shield-check" ? (
            <ShieldCheck className="h-8 w-8 text-primary flex-shrink-0" />
          ) : (
            <ShieldX className="h-8 w-8 text-muted-foreground flex-shrink-0" />
          )}
          <div>
            <PriceDisplay price={price} />
            <p className="text-xs text-muted-foreground mt-1">
              <TranslatableText 
                text={priceDescription} 
                translateKey={priceDescriptionKey} 
              />
            </p>
          </div>
        </div>
        <ProtectionFeatureList 
          features={features} 
          isActive={icon === "shield-check"}
        />
      </CardContent>
    </Card>
  );
};

export default ProtectionPlanCard;
