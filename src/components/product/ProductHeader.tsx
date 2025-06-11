
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Laptop, Smartphone } from "lucide-react";
import TranslatableText from "@/components/ui/TranslatableText";
import { DeviceType, ProductCondition } from "@/types/product";

interface ProductHeaderProps {
  brand: string;
  type: DeviceType;
  name: string;
  name_ar?: string;
  description: string;
  description_ar?: string;
  availableConditions: ProductCondition[];
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ 
  brand, 
  type, 
  name, 
  name_ar,
  description,
  description_ar,
  availableConditions
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 flex-wrap">
        <Badge>
          <TranslatableText text={brand} />
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1">
          {type === "smartphone" ? (
            <>
              <Smartphone className="h-3 w-3" />
              <TranslatableText text="Phone" />
            </>
          ) : (
            <>
              <Laptop className="h-3 w-3" />
              <TranslatableText text="Laptop" />
            </>
          )}
        </Badge>
        
        {availableConditions.map(condition => 
          condition.isAvailable && (
            <Badge 
              key={condition.condition}
              variant={condition.condition === "new" ? "success" : "warning"}
            >
              <TranslatableText 
                text={condition.condition === "new" ? "Brand New" : "Refurbished"} 
                translateKey={`product.condition.${condition.condition === "new" ? "brandNew" : "refurbished"}`} 
              />
            </Badge>
          )
        )}
      </div>
      
      <h1 className="text-3xl font-bold">
        <TranslatableText text={name} name_ar={name_ar} />
      </h1>
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">
          <TranslatableText text="Product Description" translateKey="product.descriptionHeader" />
        </h3>
        <div className="prose prose-sm max-w-none">
          <TranslatableText 
            text={description} 
            description_ar={description_ar}
            as="p" 
          />
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
