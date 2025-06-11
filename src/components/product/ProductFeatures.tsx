
import React from "react";
import { CircleCheckBig } from "lucide-react";
import TranslatableText from "@/components/ui/TranslatableText";
import { useLocalization } from "@/context/LocalizationContext";

interface ProductFeaturesProps {
  features: string[];
}

const ProductFeatures: React.FC<ProductFeaturesProps> = ({ features }) => {
  const { t } = useLocalization();
  
  return (
    <div className="bg-[#ECF2EE] rounded-xl p-4 mt-6">
      <h3 className="font-medium mb-3">{t('product.features')}</h3>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-sm">
            <CircleCheckBig className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
            <TranslatableText text={feature} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductFeatures;
