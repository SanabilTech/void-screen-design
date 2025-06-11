
import React from "react";
import { CircleCheckBig } from "lucide-react";
import TranslatableText from "@/components/ui/TranslatableText";

interface ProtectionFeatureListProps {
  features: {
    text: string;
    translateKey: string;
  }[];
  isActive: boolean;
}

const ProtectionFeatureList: React.FC<ProtectionFeatureListProps> = ({ 
  features,
  isActive
}) => {
  return (
    <ul className="space-y-2 text-sm mt-4">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start gap-2">
          <CircleCheckBig 
            className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
              isActive ? 'text-primary' : 'text-muted-foreground'
            }`} 
          />
          <span className={!isActive ? 'text-muted-foreground' : ''}>
            <TranslatableText 
              text={feature.text} 
              translateKey={feature.translateKey} 
            />
          </span>
        </li>
      ))}
    </ul>
  );
};

export default ProtectionFeatureList;
