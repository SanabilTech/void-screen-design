
import React from "react";
import TranslatableText from "@/components/ui/TranslatableText";
import { 
  StorageOption, 
  ColorOption, 
  DeviceCondition, 
  LeaseTerm
} from "../../../types/product";

interface ProductDetailsProps {
  productName: string;
  productImageUrl: string;
  selectedStorage: StorageOption;
  selectedColor: ColorOption;
  selectedCondition: DeviceCondition;
  selectedLeaseTerm: LeaseTerm;
}

const ProductDetailsSection: React.FC<ProductDetailsProps> = ({
  productName,
  productImageUrl,
  selectedStorage,
  selectedColor,
  selectedCondition,
  selectedLeaseTerm,
}) => {
  return (
    <div className="bg-muted/20 rounded-lg p-4">
      <h3 className="font-medium text-sm mb-3">
        <TranslatableText text="Product Details" translateKey="checkout.productDetails" />
      </h3>
      
      <div className="flex items-center gap-3 mb-3">
        <img 
          src={productImageUrl} 
          alt={productName} 
          className="w-12 h-12 object-contain rounded-md bg-white p-1"
        />
        <div>
          <h4 className="font-medium text-sm">{productName}</h4>
          <p className="text-xs text-muted-foreground">
            {selectedStorage.capacity} · {selectedColor.name} · {selectedCondition === "new" ? 
              <TranslatableText text="New" translateKey="product.condition.new" /> : 
              <TranslatableText text="Refurbished" translateKey="product.condition.refurbished" />
            }
          </p>
        </div>
      </div>
      
      <div className="space-y-2 text-sm mt-4">
        <p>
          <span className="text-muted-foreground">
            <TranslatableText text="Lease Term:" translateKey="checkout.leaseTerm" />
          </span> {" "}
          <TranslatableText 
            text={selectedLeaseTerm.name}
            translateKey={`product.leaseTerms.${selectedLeaseTerm.id === "monthly" ? "monthly" : 
                           selectedLeaseTerm.id === "12month" ? "annual" :
                           selectedLeaseTerm.id === "24month" ? "twoYear" : "threeYear"}`} 
          />
        </p>
        <p>
          <span className="text-muted-foreground">
            <TranslatableText text="Description:" translateKey="checkout.description" />
          </span> {" "}
          <TranslatableText 
            text={selectedLeaseTerm.description}
            translateKey={`product.leaseTermDescriptions.${selectedLeaseTerm.id === "monthly" ? "monthly" : 
                            selectedLeaseTerm.id === "12month" ? "annual" :
                            selectedLeaseTerm.id === "24month" ? "twoYear" : "threeYear"}`} 
          />
        </p>
      </div>
    </div>
  );
};

export default ProductDetailsSection;
